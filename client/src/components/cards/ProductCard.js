import React from 'react'
import { Card } from 'antd';
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";
import {ShoppingCartOutlined, EyeTwoTone} from "@ant-design/icons"
import { showAverage } from "../../functions/rating";
const {Meta} = Card;

function ProductCard({product}) {
    const {title, price, description, images, slug} = product
    return (
        <>
        <Link to={`/product/${slug}`}>
        <Card
        hoverable
            cover={
                <img className="p-1" style={{height:"150px" ,objectFit:"cover"}} src={images && images.length? images[0].url : laptop} />
            }
            actions={[
                <Link to={`/product/${slug}`}><EyeTwoTone /><p>View Product</p></Link>,
                <Link to={`/product/${slug}`}><ShoppingCartOutlined className="text-success" /><p>Add to Cart</p></Link>
            ]}
        >
           <Meta title={`${title}  -  ₹${price}`} description={`${description  && description.substring(0,40)}...`} />
           <p>{product && product.ratings && product.ratings.length > 0? (showAverage(product)):(<div className="pt-2 pb-2 text-danger"><i>No rating yet!</i></div>)}</p>
        </Card>
        </Link>
        </>
    )
}

export default ProductCard
