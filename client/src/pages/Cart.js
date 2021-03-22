import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import laptop from "../images/laptop.jpg";
import { Link } from "react-router-dom";
import ModalImage from "react-modal-image";

function Cart() {
    const [colors, setcolors] = useState(['Green', 'Blue', 'Black', 'Brown', 'Red', 'white', 'purple', 'yellow'])
    const {user, cart} = useSelector(state => ({...state}));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((cur, next) => {
            return cur+next.count * next.price
        }, 0)
    }

    // const handleColorChange = (e) => {
    //     let cart = [];
    //     if(typeof window !== 'undefined') {
    //         if(localStorage.getItem('cart')) {
    //             cart = JSON.parse(localStorage.getItem('cart'));
    //         }
    //         cart.map((product, i) => {
    //             if(p._id) {

    //             }
    //         })
    //     }
    // }

    const saveOrderToDb = () => {

    }

    return (
        <div className="container-fluid pb-0 ">
        <div className="pt-4 h3 font-weight-bold">Shopping Cart</div>
        {cart.length && cart.length>1 ?(<i>You have {cart.length} products in your Cart.</i>):(<i>You have {cart.length} product in your Cart.</i>)}
            <div className="row">
                <div className="col-md-8">
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
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((c, i) => (
                        <tr>
                        <td key={i}>
                            <div style={{'width':'100px', "height": "auto"}}>
                                {c.images.length? (<ModalImage hideDownload={true} showRotate={true} large={c.images[0].url} small={c.images[0].url} />):(<ModalImage showRotate={true} hideDownload={true} large={laptop} small={laptop} />)}
                            </div>
                        </td>
                        <td>{c.title}</td>
                        <td>{c.brand}</td>
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
                        <td>{c.count}</td>
                        <td>{c.shipping}</td>
                        <td>X</td>
                        {/* <td><Link to={`/admin/category/${c.slug}`}></Link></td>
                        <td ></td> */}
                        </tr>
                    ))}
                    </tbody>
                </table>
                )}
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
                            
                                    <tr>
                                        <td key={i}>
                                        {c.title}
                                        </td> 
                                        <td key={i}>
                                        x
                                        </td>
                                        <td key={i}>
                                        {c.count}
                                        </td>
                                        <td key={i}>
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
                        <button disabled={!cart.length} onClick={saveOrderToDb} className="mb-4 btn btn-danger btn-raised btn-sm mt-2">Proceed to Checkout</button>
                    ):(
                        <button className="btn btn-danger btn-sm mt-2 mb-4">
                            <Link to={{
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
