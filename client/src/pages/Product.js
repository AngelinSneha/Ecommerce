import React, {useEffect, useState} from 'react'
import { getProduct } from "../functions/product";
import { Breadcrumb } from 'antd';
import SingleProduct from '../components/cards/SingleProduct';

function Product({match}) {
    const [product, setProduct] = useState({})
    const {slug} = match.params;

    useEffect(() => {
        loadSingleProduct()
    }, [slug])

    const loadSingleProduct = () => {
        getProduct(slug).then(res => setProduct(res.data)).catch(err => console.log('Single Product ERR ----', err))
    }

    return (
        <div className="container-fluid">
        <Breadcrumb className="pt-4">
            <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
            <Breadcrumb.Item>
            <a href="">{product.title}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
            <a href="">{product.title}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
        </Breadcrumb>
            <div className="row pt-4">
                <SingleProduct product={product} />
            </div>
            <div className="row">
                <div>Related Products</div>
            </div>
        </div>
    )
}

export default Product
