// import React, {useEffect, useState} from 'react'
// import { getProduct } from "../functions/product";
// import { Breadcrumb } from 'antd';
// import SingleProduct from '../components/cards/SingleProduct';

// const  Product = ({match}) => {
//     const [product, setProduct] = useState({});
//     const { slug } = match.params;

//     useEffect(() => {
//         loadSingleProduct()
//     }, [slug])

//     const loadSingleProduct = () => {
//         getProduct(slug).then((res) => {
//             setProduct(res.data)
//             console.log(res.data)
//         }).catch(err => console.log("SINGLE PRODUCT ERR ----> ", err));    
//     }

//     return (
//         <div className="container-fluid">
        // <Breadcrumb className="pt-4">
        //     <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
        //     <Breadcrumb.Item>
        //     <a href="">{product.category}</a>
        //     </Breadcrumb.Item>
        //     <Breadcrumb.Item>
        //     <a href="">{product.subs}</a>
        //     </Breadcrumb.Item>
        //     <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
        // </Breadcrumb>
//             <div className="row pt-4">
//                 <SingleProduct product={product} />
//             </div>
//             <div className="row">
//                 <div className="col text-center pt-5 pb-5">
//                 <hr />
//                     <h4>Related Products</h4>
//                     <hr />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Product

import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
