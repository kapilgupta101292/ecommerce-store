import React from 'react';
import {Form, Input, TextArea, Button, Image, Message, Header, Icon}
from 'semantic-ui-react'


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

  function handleChange(event) {
    const {name, value, files} = event.target;
    if (name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0]}));
      setMediaPreview(window.URL.createObjectURL(files[0]));

    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value}))
    }
    console.log(product);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(product); 
    setProduct(INITIAL_PRODUCT);
    setSuccess(true);
  }

  return <>
    <Header as="h2" block>
      <Icon name="add" color="orange"/>Create New Product
    </Header>
    <Form success={success} onSubmit={handleSubmit}>
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
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"/>
    </Form>  
  </>;
}

export default CreateProduct;
