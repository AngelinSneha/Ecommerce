import React from 'react'
import { Card } from 'antd';
import laptop from "../../images/laptop.jpg";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
const {Meta} = Card;
function AdminProductCard({product}) {
    const {title, description, images} = product
    return (
        <Card
            cover={
                <img className="p-1" style={{height:"150px" ,objectFit:"cover"}} src={images && images.length? images[0].url : laptop} />
            }
            actions={[
                <EditOutlined key="edit" className="text-warning" />,
                <DeleteOutlined key="delete" className="text-danger" />
            ]}
        >
           <Meta title={title} description={`${description  && description.substring(0,40)}...`} />
        </Card>
    )
}

export default AdminProductCard
