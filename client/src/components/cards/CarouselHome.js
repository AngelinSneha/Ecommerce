import React from 'react'
import { Carousel } from 'antd';
import { Link } from "react-router-dom";
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
                <Link to={`/category/laptop`}><img src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/CEPC/storage/2020/May/Desktop_Header_ClearanceStore.jpg" style={{'height': '15rem',  'width': '100%'}} /></Link>
                </div>
                <div>
                <Link to={`/category/tv`}><img src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/TV/SmartTV/PC/smart-tv_PC_5_image._CB482882344_.jpg" style={{'height': '15rem',  'width': '100%'}} /></Link>
                </div>
                <div>
                <Link to={`/category/clothes`}><img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Fashion/Event/SS21Flip/Mens_Fashion/Top_Banner/V1/4pc_2.jpg" style={{'height': '15rem',  'width': '100%'}} /></Link>
                </div>
            </Carousel>
        </div>
    )
}

export default CarouselHome
