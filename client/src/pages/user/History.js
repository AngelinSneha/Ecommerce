import React, {useState, useEffect} from 'react'
import UserNav from "../../components/nav/UserNav";
import { getUserorders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import {toast} from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

function History() {
    const [orders, setorders] = useState([])
    const { user} = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllOrders();
    }, []);

    const loadAllOrders = () => {
        getUserorders(user.token).then((res) =>{ 
            console.log(JSON.stringify(res.data, null, 4))
            setorders(res.data)
        })
    }

    const showOrderInTable = (order) => (
     <table className="table">
        <thead className="thead-dark">
        <tr>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
        <th scope="col">Brand</th>
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
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>{p.product.shipping === "Yes"? <CheckCircleOutlined className="text-success" />:<CloseCircleOutlined className="text-danger" /> }</td>
            </tr>
        ))}
        </tbody>
     </table>
    )

    const showDownloadLink = (order) => (
        <PDFDownloadLink document={
            <Document>
                <Page size="A4" >
                    <View>

                    </View>
                </Page>
            </Document>
        } 
        fileName="Invoice.pdf"
        className="btn btn-sm btn-block btn-outline-dark">
            Download PDF
        </PDFDownloadLink>
    )

    const showEachOrder = () => orders.map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                <ShowPaymentInfo order={order} />
                {showOrderInTable(order)}
                <div className="row">
                    <div className="col">
                        <div>{showDownloadLink(order)}</div>
                    </div>
                </div>
            </div>
        ))

    return (
        <div className="container-fluid">
            <div className="row">
            <div>
            <UserNav name="history" />
            </div>
                <div className="col text-center">
                    <h4 className="pt-5">{orders.length>0? "Your Purchase History":"You have not purchased any Item yet.😟"}</h4>
                    {showEachOrder()}
                </div>
                <hr />
            </div>
        </div>
    )
}

export default History;
