import React from 'react'
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from '../cards/ShowPaymentInfo';
import {Card} from "antd";

function Orders({handleStatusChange, orders}) {
    const showOrderInTable = (order) => (
        <table className="table">
           <thead className="thead-dark">
           <tr>
           <th scope="col">Title</th>
           <th scope="col">Price (in INR)</th>
           {/* <th scope="col">Brand</th> */}
           <th scope="col">Color</th>
           <th scope="col">Count</th>
           <th scope="col">Shipping</th>
           </tr>
           </thead>
           <tbody>
           {order.products.map((p, i) => (
               <tr key={i}>
               <td><b>{p.product.title}</b></td>
               <td>{p.product.price}</td>
               {/* <td>{p.product.brand}</td> */}
               <td>{p.color}</td>
               <td>{p.count}</td>
               <td>{p.product.shipping === "Yes"? <CheckCircleOutlined className="text-success" />:<CloseCircleOutlined className="text-danger" /> }</td>
               </tr>
           ))}
           </tbody>
        </table>
       )
    return (
        <>
            {orders.map((order) => (
                <div key={order._id} className="row ml-2 mb-5 card">
                 <Card>
                 <ShowPaymentInfo order={order} showStatus={false}  />
                    {showOrderInTable(order)}
                    <div className='row'>
                        <div className="col-md-4 h5 pl-4">
                            Delivery Status:
                        </div>
                        <div className="col-md-8">
                            <select defaultValue={order.orderStatus} className="custom-select" onChange={e => handleStatusChange(order._id, e.target.value)}>
                                <option value="Cash On Delivery">Cash On Delivery</option>
                                <option value="Processing">Processing</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                 </Card>
                 {/* </div> */}
                </div>
            ))}
        </>
    )
}

export default Orders
