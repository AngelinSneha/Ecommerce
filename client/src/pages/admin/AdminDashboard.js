import { LoadingOutlined } from '@ant-design/icons';
import React, { useState, useEffect} from 'react'
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, updateOrderStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify";
import Orders from '../../components/order/Orders';

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orders, setorders] = useState([]);
    const { user} = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllOrders();
    }, []);

    const loadAllOrders = () => {
        getOrders(user.token).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setorders(res.data)
        }).catch((err) => console.log('admin dashboard -->', err))
    };

    const handleStatusChange = (orderId, orderStatus) => {
        updateOrderStatus(orderId, orderStatus, user.token).then((res) => {
            toast.success('Status Updated.');
            loadAllOrders();
        }).catch((err) => console.log('update status', err))
    }

    return (
        <div className="container-fluid">
            <div className="row">
            <div>
            <AdminNav name="dashboard"/>
            </div>
                <div className="col-md-8">
                {loading? (<h2 className="text-danger"><LoadingOutlined /></h2>):(<h3 style={{color: "rgb(24, 144, 255)"}} className="m-4" >All Orders</h3>)} 
                <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </div>
                <hr />
            </div>
        </div>
    )
}

export default AdminDashboard
