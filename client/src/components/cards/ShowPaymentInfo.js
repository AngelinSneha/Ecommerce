import React from 'react'
import { Collapse, Space } from 'antd';

const { Panel } = Collapse;

function ShowPaymentInfo({order, showStatus, collapseValue}) {
    return (
        <div>
            <Space direction="vertical">
                <Collapse collapsible="header" bordered={false} >
                <Panel header="Payment Information" key="1">
                <table className="table table-hover" >
                <thead>
                    <tr>
                    <th scope="col"><b>Order id</b></th>
                    <th scope="col"><b>Currency</b></th>
                    <th scope="col"><b>Amount</b></th>
                    <th scope="col"><b>Method</b></th>
                    <th scope="col"><b>Payment</b></th>
                    <th scope="col"><b>Ordered on</b></th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={order.paymentIntent.id}>
                    <td>{order.paymentIntent.id}</td>
                    <td>{order.paymentIntent.currency.toUpperCase()}</td>
                    <td>{(order.paymentIntent.amount /= 100).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR"
                    })}</td>
                    <td>{order.paymentIntent.payment_method_types[0]}</td>
                    <td>{order.paymentIntent.status.toUpperCase()}</td>
                    <td>{new Date(order.paymentIntent.created * 1000).toLocaleString()}</td>
                    </tr>
                </tbody>
                </table>
                {showStatus && (<h4 className="badge">STATUS: {order.orderStatus}</h4>)}
                </Panel>
                </Collapse>
            </Space>
        </div>
    )
}

export default ShowPaymentInfo
