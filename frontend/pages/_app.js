import App from "next/app";
import Layout from '../components/_App/Layout'
import {destroyCookie, parseCookies} from 'nookies'
import {redirectUser} from '../utils/auth';
import axios from 'axios';
import Router from 'next/router';
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const {token} = parseCookies(ctx);
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (!token) {
      const isProtectedRoute = ctx.pathname === '/account'
                                || ctx.pathname === '/create';
      if(isProtectedRoute)  {
        redirectUser(ctx, '/login');
      }
     } else {
        try {
          const payload = { headers: {Authorization: token}}
          const url = `${baseUrl}/api/account`
          const response = await axios.get(url, payload);
          const user = response.data;
          const isRoot = user.role === 'root';
          const isAdmin = user.role === 'admin';
          // if authenticated, but not of the role 'admin' or 'root'
          // redirect from '/create' page
          
          const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname === '/create'
          if (isNotPermitted) {
            redirectUser(ctx, '/');
          }
          pageProps.user = user;
        } catch (error) {
          console.error("Error getting current user", error);
          destroyCookie(ctx,"token");
          redirectUser(ctx, "/login");
        }
    }
    return {pageProps}
  }

  componentDidMount() {
     window.addEventListener('storage', this.syncLogout)
  }

  syncLogout = event => {
    if (event.key === 'logout') {
      Router.push('/login');
    }
  }


  render() {
    const { Component, pageProps } = this.props;
    return <Layout {...pageProps}>
      <Component { ...pageProps }/>
    </Layout>;
  }
}

export default MyApp;
