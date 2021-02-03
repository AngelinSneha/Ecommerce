import React from 'react'
import AdminNav from "../../components/nav/AdminNav";

function AdminDashboard() {
    return (
        <div className="container-fluid">
            <div className="row">
            <div>
            <AdminNav name="dashboard"/>
            </div>
                <div className="col">
                    Admin Dashboard Page
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
