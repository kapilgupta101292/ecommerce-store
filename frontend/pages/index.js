import React from 'react'
import axios from 'axios'
import ProductList from '../components/Index/ProductList';
import ProductPagination from '../components/Index/ProductPagination';
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;

function Home({products, totalPages}) {
   return (<><ProductList products={products}/>
    <ProductPagination totalPages={totalPages}/>
    </>
   );
}

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page :"1";
  const size = 9;
  const url = `${baseUrl}/api/products`
  const payload = {params: {page, size}}
  const response = await axios.get(url, payload)
  return response.data;
  
}

export default Home;
