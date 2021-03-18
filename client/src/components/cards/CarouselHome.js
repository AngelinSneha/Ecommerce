import React from 'react'
import { Carousel } from 'antd';
import { Link } from "react-router-dom";
import ll from "../../images/ll.jpg"
function CarouselHome() {
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
    return (
        <div>
            <Carousel autoplay>
                <div>
                {/* <h3 style={contentStyle}>1</h3> */}
                <Link to={`/category/laptop`}><img src={ll} style={{'height': '15rem',  'width': '100%'}} /></Link>
                </div>
                <div>
                <Link to={`/category/earphones`}><img src="https://m.media-amazon.com/images/S/stores-image-uploads-eu-prod/c/AmazonStores/A21TJRUUN4KGV/348dcf12461d4942304396bfe4430286.w3000.h1200._SX1280_SY487_.jpg" style={{'height': '15rem',  'width': '100%'}} /></Link>
                </div>
                <div>
                <Link to={`/category/clothes`}><img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Fashion/Event/SS21Flip/Mens_Fashion/Top_Banner/V1/4pc_2.jpg" style={{'height': '15rem',  'width': '100%'}} /></Link>
                </div>
            </Carousel>
        </div>
    )
}

export default CarouselHome
