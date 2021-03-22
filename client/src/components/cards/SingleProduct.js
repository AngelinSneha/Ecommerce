import React, {useState} from 'react'
import { Card, Tabs, Tooltip } from "antd";
import { ShoppingCartOutlined, HeartTwoTone } from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import laptop from "../../images/laptop.jpg"
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch, useSelector} from "react-redux";

const {TabPane} = Tabs;

function SingleProduct({product, onStarClick, star}) {
    const {title,description, images, _id} = product;
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
        }
    }
    
    return (
        <>
            <div className="col-md-7">
            {images && images.length ? (<Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
            </Carousel>): (<Card
            hoverable
            cover={
                <img className="mb-3 card-image" src={laptop} />
            }
             />)}
             <Tabs type="card">
                <TabPane tab="Description" key="1" >
                    { description && description }
                </TabPane>
                <TabPane tab="More" key="2" >
                    Call us on <a href="tel:91-9999999999">9999999999</a> to know more about this product.
                </TabPane>
             </Tabs>
            </div>
            <div className="col-md-5">
            <h1 className="">{title}</h1>
             <div>{product && product.ratings && product.ratings.length > 0? (<div className="text-center pb-3">{showAverage(product)}</div>):(<div className="text-center pt-1 pb-3">No rating yet</div>)}</div>       
            <Card
                actions={[
                    <Tooltip title={tooltip}><a onClick={handleAddToCart}><ShoppingCartOutlined className="text-success" /><p>Add to Cart</p></a></Tooltip>,
                    <><HeartTwoTone  twoToneColor="#eb2f96" key="heart" />Add to Wishlist</>,
                    <RatingModal>
                        <StarRating
                            name={_id}
                            numberOfStars={5}
                            rating={star}
                            changeRating={onStarClick}
                            isSelectable={true}
                            starRatedColor="red"
                        />
                    </RatingModal>
                ]}
            >
                <ProductListItems product={product} />
            </Card>
            </div>
        </>
    )
}

export default SingleProduct
