import React, {useState} from 'react'
import { Card, Tabs } from "antd";
import { ShoppingCartOutlined, HeartTwoTone, StarTwoTone } from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import laptop from "../../images/laptop.jpg"
import ProductListItems from './ProductListItems';
import StarRatings from 'react-star-ratings';

const {TabPane} = Tabs;

function SingleProduct({product}) {
    const {title,description, images, _id} = product;
    const [rating, setRating] = useState(0);
    return (
        <>
            <div className="col-md-7">
            {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
            </Carousel>: <Card
            cover={
                <img className="mb-3 card-image" src={laptop} />
            }
             />}
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
            <StarRatings
            name={_id}
            className="text-center"
            rating={2}
            starRatedColor="red"
            changeRating={(newrating, name) => console.log("new rating",newrating, 'name', name)}
            numberOfStars={5}
            isSelectable={true}
            />
            <Card
                actions={[
                    <><ShoppingCartOutlined className="text-success" key="cart" />Add to Cart</>,
                    <><HeartTwoTone  twoToneColor="#eb2f96" key="heart" />Add to Wishlist</>,
                    <><StarTwoTone twoToneColor="#d4af37" />Leave Rating</>,
                ]}
            >
                <ProductListItems product={product} />
            </Card>
            </div>
        </>
    )
}

export default SingleProduct
