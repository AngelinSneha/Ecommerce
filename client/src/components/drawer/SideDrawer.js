import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { Drawer, Button } from 'antd';
import laptop from "../../images/laptop.jpg";

function SideDrawer() {
    const {drawer, cart} = useSelector(state => ({...state}));
    const dispatch = useDispatch();
    
    const getTotal = () => {
        return cart.reduce((cur, next) => {
            return cur+next.count * next.price
        }, 0)
    }

    return (
        <Drawer
            className="text-center"
            onClose = {() => 
                dispatch({
                type: "SET_VISIBLE",
                payload: false
            })
            }
            visible={drawer}
            title={cart.length<2 ?(`Your Cart has ${cart.length} Item`):(`Your Cart has ${cart.length} Items`)}
        >
            {
                cart.map((p) => (
                    <div key={p._id} className="row" >
                        <div className="col">
                            {p.images[0]? (
                                <>
                                <img src={p.images[0].url} style={{'width':'100%', 'height':'4rem', 'objectFit': 'cover'}} />
                                <p className="text-center bg-secondary text-light">{p.title}</p>
                                <p style={{'marginTop':'-1rem'}} className="text-center bg-secondary text-light">₹ {p.price} x {p.count} = ₹ {p.price * p.count}</p>
                                </>
                            ):(
                                <>
                                <img src={laptop} style={{'width':'100%', 'height':'50px', 'objectFit': 'cover'}} />
                                <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                                <p style={{'marginTop':'-1rem'}} className="text-center bg-secondary text-light">₹ {p.price} x {p.count} = ₹ {p.price * p.count}</p>
                                </>
                            )}
                        </div>
                    </div>
                ))
            }
            <hr />
            <h6>Total: ₹ {getTotal()}</h6>
            <a href="/cart" onClick={() => 
                dispatch({
                type: "SET_VISIBLE",
                payload: false
            })
            } className="btn btn-primary btn-raised">Go to Cart</a>
        </Drawer>
    )
}

export default SideDrawer
