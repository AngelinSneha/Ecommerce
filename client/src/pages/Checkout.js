import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {getUserCart} from "../functions/user"

function Checkout() {
    const [products, setproducts] = useState([]);
    const [total, settotal] = useState(0)
    const {user, cart} = useSelector(state => ({...state}));
    const dispatch = useDispatch();

    useEffect(() => {
        getUseCart(user.token).then((res) => 
            console.log()
        )
        return () => {
            cleanup
        }
    }, [input])

    const getTotal = () => {
        return cart.reduce((cur, next) => {
            return cur+next.count * next.price
        }, 0)
    }

    const saveAddressToDb = () => {

    }

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br />
                Text Area
                <button className="btn btn-dark mt-2 btn-raised" onClick={saveAddressToDb}>Save</button>
                <hr />
                <h4>Got Coupon</h4>
                <br />
                coupon, button
            </div>
            <div className="col-md-4">
                <div className="pt-4 h3">Order Summary</div>
                    <hr />
                    <table className="table">
                       <thead className="thead-dark">
                                <tr>
                                {/* <th scope="col"></th> */}
                                </tr>
                        </thead>
                        <tbody>
                            {cart.map((c, i) => (
                            
                                    <tr key={i}>
                                        <td>
                                        {c.title}
                                        </td> 
                                        <td>
                                        x
                                        </td>
                                        <td>
                                        {c.count}
                                        </td>
                                        <td>
                                        ₹ {c.price * c.count}
                                        </td>
                                    </tr>
                               
                            ))}
                                    <tr>
                                        <th>Total</th>
                                        <td></td>
                                        <td></td>
                                        <th>₹ {getTotal()}</th>
                                    </tr>
                        </tbody>
                    </table>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary" >Place Order</button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-primary" >Empty Cart</button>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Checkout
