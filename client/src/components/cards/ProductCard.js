import React, {useState} from 'react'
import { Card, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";
import {ShoppingCartOutlined, EyeTwoTone} from "@ant-design/icons"
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch, useSelector} from "react-redux";

const {Meta} = Card;

function ProductCard({product}) {
    const [tooltip, settooltip] = useState('Click to Add to Cart');
    const {user, cart} = useSelector(state => ({...state}) );
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        let cart = [];
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.push({
                ...product,
                count:1
            });

            let unique = _.uniqWith(cart, _.isEqual)
            console.log('unique', unique);
            localStorage.setItem("cart", JSON.stringify(unique));
            settooltip('Added to cart');

            dispatch({
                type: "ADD_TO_CART",
                payload: unique
            })

            dispatch({
                type: "SET_VISIBLE",
                payload: true
            })
        }
    }

    const {title, price, description, images, slug} = product
    return (
        <>
        {/* <Link to={`/product/${slug}`}> */}
        <Card
        // hoverable
            cover={
                <img className="p-1" style={{height:"150px" ,objectFit:"cover"}} src={images && images.length? images[0].url : laptop} />
            }
            actions={[
                <Link to={`/product/${slug}`}><EyeTwoTone /><p>View Product</p></Link>,
                <Tooltip title={tooltip}><a onClick={handleAddToCart}><ShoppingCartOutlined className="text-success" /><p>Add to Cart</p></a></Tooltip>
            ]}
        >
           <Meta title={`${title}  -  ₹${price}`} description={`${description  && description.substring(0,40)}...`} />
           <p>{product && product.ratings && product.ratings.length > 0? (showAverage(product)):(<div className="pt-2 pb-2 text-danger"><i>No rating yet!</i></div>)}</p>
        </Card>
        {/* </Link> */}
        </>
    )
}

export default ProductCard
