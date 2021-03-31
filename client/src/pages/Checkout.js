import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyCart, saveUserAddress, appliedCoupon,createCashOrderForUser  } from "../functions/user";
import { getCoupons } from "../functions/coupon"
import { Input,Tooltip } from 'antd';

const { TextArea } = Input;

const Checkout = ({history}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setaddress] = useState("");
  const [addressSaved, setaddressSaved] = useState(false);
  const [coupon, setcoupon] = useState('');
  const [coupons, setcoupons] = useState([])
  const [totAfterDiscount, settotAfterDiscount] = useState(0);
  const [discountError, setdiscountError] = useState('')

  const dispatch = useDispatch();
  const { user, COD} = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  useEffect(() => {
    loadAllCouponsForCart();
  }, []);

  const loadAllCouponsForCart = () => {
    getCoupons().then((res) => {
      setcoupons(res.data);
      console.log(coupons);
    }).catch((err) => {
      console.log('get coupon error', err);
    })
  }

  const emptyCartValue = () => {
    if(typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: []
    })
    emptyCart(user.token)
    .then((res) => {
      setProducts([])
      setTotal(0)
      settotAfterDiscount(0)
      setcoupon("")
      toast.success("Your Cart is empty, You can continue Shopping.");
      history.push("/shop");
    }
    )
  };
  const saveAddressToDb = () => {
    console.log('address', address)
    saveUserAddress(user.token, address).then((res) => {
      if(res.data.ok) {
        setaddressSaved(true)
        toast.success('Your Address is Saved')
      }
    })
  }

  const applyDiscountCoupon = () => {
    // console.log("send coupon to backend --> ", coupon);
    appliedCoupon(user.token, coupon)
    .then((res) => {
      console.log('RES ON COUPON APPLIED', res.data);
      if (res.data) {
        settotAfterDiscount(res.data)
        dispatch({
          type: "COUPON_APPLIED",
          payload: true
        })
      }
      if (res.data.err) {
        setdiscountError(res.data.err)
        dispatch({
          type: "COUPON_APPLIED",
          payload: false
        })
      }
    })
  }

  const applyCoupon = () => (
    <>
      <select value={coupon} className="custom-select" onChange={(e) =>{
         setcoupon(e.target.value)
         setdiscountError("")
         }}>
          <option>Select a Coupon Code</option>
          {coupons.map((c) => (
            <option value={c.name}>{c.name}</option>
          ))}
      </select>
      {/* <Input className="form-control" value={coupon} placeholder="Enter the Coupon Code" type="text" onChange={(e) =>{
         setcoupon(e.target.value)
         setdiscountError("")
         }} /> */}
      <button onClick={applyDiscountCoupon} className="btn btn-dark btn-raised mt-3">Apply Coupon</button>
    </>

  )

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      // console.log('coupon val: ----> ',couponTrueOrFalse)
      console.log('user cash order created res', res);

      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyCart(user.token);

        toast.success("Your Order has been Placed! Thank You for ordering with Us.🎉")
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    })
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="m-4">
        <h4>Delivery Address</h4>
        <hr />
        <TextArea value={address} rows={4} onChange={(e) => setaddress(e.target.value)} placeholder="Enter your Address" showCount maxLength={200} allowClear={true} />
        <p className="text-danger "><i>Please enter your Address before placing an Order*</i></p>
        <button className="btn btn-dark btn-raised mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>We have got Offers for you!</h4>
        <br />
        {applyCoupon()}
        <br />
        {discountError && <i className="text-danger mt-4">{discountError}</i>}
      </div>
        </div>

      <div className="col-md-6">
        <h4 className="mt-4">Order Summary</h4>
        <hr />

        <table className="table">
                                <thead className="thead-dark">
                                <tr>
                                {/* <th scope="col"></th> */}
                                </tr>
                                </thead>
                                <tbody>
                                     {products.map((c, i) => (
                            
                                    <tr key={i}>
                                        <td>
                                        {c.product.title} ({c.color})
                                        </td> 
                                        <td>
                                        x
                                        </td>
                                        <td>
                                        {c.count}
                                        </td>
                                        <td>
                                        ₹ {c.product.price * c.count}
                                        </td>
                                    </tr>
                               
                                        ))}
                    <tr>
                        <th>Total</th>
                        <td></td>
                        <td></td>
                        <th>₹ {total}.00</th>
                    </tr>
                    { totAfterDiscount>0?
                      (<>
                      <br />
                      <img style={{height:"5rem"}} src="https://cdn.dribbble.com/users/424937/screenshots/6660260/01-account-created-dribbble.gif" />
                      <p><i className="text-success h6 pl-2" >Hurray, Discount Applied!</i></p>
                      <p className="text-success pl-2" ><i>Promo - ({coupon})</i></p>
                        <tr className="h5">
                        <th>Grand Total</th>
                        <td></td>
                        <td></td>
                        <th>₹ {totAfterDiscount}</th>
                    </tr></>):("")
                    }
                    </tbody>
                            </table>

        <div className="row">
          <div className="col-md-6">
            {COD ? (<button onClick={createCashOrder} className="mb-4 ml-1 btn btn-raised btn-primary" disabled={!addressSaved || !products.length}>Place Order</button>): (<button onClick={()=> history.push("/payment")} className="mb-4 ml-1 btn btn-raised btn-primary" disabled={!addressSaved || !products.length}>Place Order</button>)}
          </div>

          <div className="col-md-6">
            <button disabled={!products.length} onClick={emptyCartValue} className="mb-4 btn btn-raised btn-danger">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;