import React from 'react';
import {Form, Input, TextArea, Button, Image, Message, Header, Icon}
from 'semantic-ui-react'
import axios from 'axios';
import catchErrors from '../utils/catchErrors'

import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;
const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: "",
}

function CreateProduct() {

  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    setDisabled(!!!isProduct);
  }, [product])

  function handleChange(event) {
    const {name, value, files} = event.target;
    if (name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0]}));
      setMediaPreview(window.URL.createObjectURL(files[0]));

    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value}))
    }
  }

  async function handleImageUpload() {
    const data = new FormData()
    data.append('file', product.media);
    data.append('upload_preset', 'my app');
    data.append('cloud_name', 'kapilguptansit');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setError('')
      setLoading(true);
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      
      const {name, price, description} = product;
      const payload = {
        name,
        price,
        description,
        mediaUrl
      };
      const response = await axios.post(url, payload);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Header as="h2" block>
      <Icon name="add" color="orange"/>Create New Product
    </Header>
    <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
    <Message 
        error
        header="Oops!"
        content={error}
       />
    <Message 
       success
       icon="check" 
       header="Success"
       content="Your product has been posted"
      />
      <Form.Group widths="equal">
      <Form.Field
          control={Input}
          name="name"
          label="Name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
          />
      <Form.Field
          control={Input}
          name="price"
          label="Price"
          placeholder="Price"
          min="0.00"
          step="0.01"
          value={product.price}
          onChange={handleChange}
          type="number"/>
      <Form.Field
          control={Input}
          name="media"
          type="file"
          content="Select Image"
          onChange={handleChange}
          label="Media"
          accept="image/*"/>
    </Form.Group>
      <Image src={mediaPreview} rounded centered size="small"/>
      <Form.Field
          control={TextArea}
          name="description"
          value={product.description}
          onChange={handleChange}
          label="Description"
          placeholder="Description"/>
      <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"/>
    </Form>  
  </>;
}

export default CreateProduct;
