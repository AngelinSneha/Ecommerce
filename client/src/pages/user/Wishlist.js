import React from 'react'
import UserNav from "../../components/nav/UserNav";

function Wishlist() {
    return (
        <div className="container-fluid">
            <div className="row">
            <div>
            <UserNav name="wishlist" />
            </div>
                <div className="col">
                    User wishlist Page
                </div>
            </div>
        </div>
    )
}

export default Wishlist
