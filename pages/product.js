import axios from 'axios';
function Product() {
  return <>product</>;
}

Product.getInitialProps = async ({query: {_id}}) => {
  const url='http://localhost:300/api/product/';
  
}


export default Product;
