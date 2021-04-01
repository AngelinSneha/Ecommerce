import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { Divider } from 'antd';
import laptop from "../images/laptop.jpg";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import ModalImage from "react-modal-image";
import { userCart } from "../functions/user"
import {CloseCircleOutlined, DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons"

function Cart({ history }) {
    const [colors, setcolors] = useState(['Green', 'Blue', 'Black', 'Brown', 'Red', 'white', 'purple', 'yellow'])
    const {user, cart, COD} = useSelector(state => ({...state}));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((cur, next) => {
            return cur+next.count * next.price
        }, 0)
    }
    const saveOrderToDb = () => {
            // console.log("cart", JSON.stringify(cart, null, 4));
            userCart(cart, user.token)
              .then((res) => {
                console.log("CART POST RES", res);
                if (res.data.ok) history.push("/checkout");
              })
              .catch((err) => console.log("cart save err", err));
    };

    const saveCashOrderToDb = () => {
        dispatch({
            type: "COD",
            payload: true
        })
        userCart(cart, user.token)
              .then((res) => {
                console.log("CART POST RES", res);
                if (res.data.ok) history.push("/checkout");
              })
              .catch((err) => console.log("cart save err", err));       
    }
    
    const handleRemove = (id) => {
        console.log("delete ---", id);
        let cart=[]
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product, i) => {
                if(product._id === id) {
                    cart.splice(i, 1)
                }
            })
            console.log("Cart remove", cart);
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type:"ADD_TO_CART",
                payload: cart,

            })
        }
    }

    return (
        <div className="container-fluid pb-0 ">
        <div className="pt-4 h3 font-weight-bold">Shopping Cart</div>
        {cart.length && cart.length>1 ?(<i>You have {cart.length} products in your Cart.</i>):(<i>You have {cart.length} product in your Cart.</i>)}
            <div className="row">
                <div className="col-md-8 mb-5">
                <hr />
                {!cart.length ? (
                <div className="text-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCyV6BbCtazkTWEagE_jq1LYjxe_SeeDM3Xw&usqp=CAU" />
                    <h6 className="m-4">Check out your Wishlist or <Link to="/shop" >continue shopping</Link>.</h6>
                </div>):(
                    <table className="table">
                    <thead className="thead-dark">
                    <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    {/* <th scope="col">Brand</th> */}
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((c, i) => (
                        <tr key={i}>
                        <td>
                            <div style={{'width':'5rem', "height": "auto"}}>
                                {c.images.length? (<ModalImage hideDownload={true} showRotate={true} large={c.images[0].url} small={c.images[0].url} />):(<ModalImage showRotate={true} hideDownload={true} large={laptop} small={laptop} />)}
                            </div>
                        </td>
                        <td>{c.title}</td>
                        {/* <td>{c.brand}</td> */}
                        <td>
                            <select name="color" id="" className="form-control" onChange={(e) => {
                                console.log('Color change', e.target.value);
                                let cart = [];
                                if(typeof window !== 'undefined') {
                                    if(localStorage.getItem('cart')) {
                                        cart = JSON.parse(localStorage.getItem('cart'));
                                    }
                                    cart.map((product, i) => {
                                        if(product._id === c._id) {
                                            cart[i].color = e.target.value
                                        }
                                    })
                                    console.log("Cart updated color", cart);
                                    localStorage.setItem('cart', JSON.stringify(cart));
                                    dispatch({
                                        type:"ADD_TO_CART",
                                        payload: cart,

                                    })
                                }
                            }}>
                                {c.color? (<option value={c.color} > {c.color} </option>):(<option>Select a Color</option>)}
                                {colors.filter((p) => p !== c.color).map((p) => <option value={p} key={p} >{p}</option>)}
                            </select>
                        </td>
                        <td className="text-center">
                            <input type="number" className="form-control" value={c.count} onChange={(e) => {
                                console.log('available quantity', c.quantity)
                                let count = e.target.value<1 ? (1):(e.target.value)
                                if(count > c.quantity) {
                                    toast.error(`Sorry, We have only a quantity of "${c.quantity}" available right now!`)
                                    return;
                                }
                                let cart=[]
                                if(typeof window !== 'undefined') {
                                    if(localStorage.getItem('cart')) {
                                        cart = JSON.parse(localStorage.getItem('cart'));
                                    }
                                    cart.map((product, i) => {
                                        if(product._id === c._id) {
                                            cart[i].count = count
                                        }
                                    })
                                    console.log("Cart updated count", cart);
                                    localStorage.setItem('cart', JSON.stringify(cart));
                                    dispatch({
                                        type:"ADD_TO_CART",
                                        payload: cart,

                                    })
                                }
                            }} />
                        </td>
                        <td>{(c.shipping === 'Yes') ? (
                                <div className="text-center text-success"><CheckCircleOutlined  /></div>
                            ) :(
                                <div className="text-center text-danger"><CloseCircleOutlined  /></div>

                            )
                            }</td>
                        <td className="text-center text-danger pointer"><DeleteOutlined onClick={() => handleRemove(c._id)} /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                )}
                </div>
                <div className="col-md-4 mb-4">
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
                    <hr />
                    {user? (
                        <div className="text-center" >
                        <button disabled={cart.length<1} onClick={saveOrderToDb} className="mb-3 btn btn-danger btn-raised btn-sm mt-2">
                            <Link style={{'color':'white'}} to="/checkout">Proceed to Checkout</Link>
                        </button>
                        <Divider plain >or</Divider>
                        <button disabled={cart.length<1} onClick={saveCashOrderToDb} className="mb-5 btn btn-primary btn-raised btn-sm mt-2">
                            <Link style={{'color':'white'}} to="/checkout">Pay Cash On Delivery</Link>
                        </button>
                        </div>
                    ):(
                        <button className="btn btn-danger btn-raised btn-sm mt-2 mb-5">
                            <Link style={{color:"white"}} to={{
                                pathname:"/login",
                                state:{ from:"cart" }
                            }}>
                                Login to Checkout
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart
