import React from 'react'
import {Button, Form, Icon, Message, Segment} from 'semantic-ui-react'
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import { handleLogin } from '../utils/auth';

import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;
const INITIAL_USER = {
  email: '',
  password: '',
}

function Login() {

  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');  
  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    setDisabled(!!!isUser);
  }, [user]);

  function handleChange(event) {
     const {name, value} = event.target;
     setUser(prevState => ({ ...prevState, [name]: value}))
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError('')
      const url = `${baseUrl}/api/login`;
      const payload = {...user}
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch(error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Message
      attached
      icon="privacy"
      header="Welcome Back!"
      content="Login in with email and password"
      color="blue"
    />
    <Form error={Boolean(error)} 
      loading={loading} 
      onSubmit={handleSubmit}>
        <Message
          error
          header="Ooops!"
          content={error}
        />

      <Segment>
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button
          disabled={disabled || loading}
          icon="sign in"
          type="submit"
          color="orange"
          content="Login"
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help"/>
        New User? {" "}
        <Link href="/signup">
          <a>Sign up here</a>
        </Link>{" "} instead.
    </Message>
  </>;
}

export default Login;
