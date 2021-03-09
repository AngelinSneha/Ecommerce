import { LoadingOutlined } from '@ant-design/icons';
import React, { useState} from 'react'
import AdminNav from "../../components/nav/AdminNav";

function AdminDashboard() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    return (
        <div className="container-fluid">
            <div className="row">
            <div>
            <AdminNav name="dashboard"/>
            </div>
                <div className="col">
                {loading? (<h2 className="text-danger"><LoadingOutlined /></h2>):(<h3 >Admin Dashboard Page</h3>)} 
                </div>
                <hr />
            </div>
        </div>
    )
}

export default AdminDashboard
