import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { DatePicker} from 'antd';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCoupon, getCoupons, removeCoupon } from "../../../functions/coupon";
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';

function CreateCouponPage() {
    const [name, setname] = useState("");
    const [expiry, setexpiry] = useState("");
    const [discount, setdiscount] = useState("");
    const [coupons, setcoupons] = useState([]);
    const [loading, setloading] = useState(false);
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadAllCoupons()
    }, [])

    const loadAllCoupons = () => {
        getCoupons().then((res) => setcoupons(res.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setloading(true)
        // console.log("expiry", expiry);
        // console.log("discount", discount);
        // console.log("name", name);
        createCoupon({name, expiry, discount}, user.token)
        .then((res) => {
            setloading(false)
            setname("");
            setexpiry("")
            setdiscount("")
            loadAllCoupons();
            toast.success(`Coupon "${name}" is created.`)
        })
        .catch((err) => {
            console.log('Create coupon error', err)           
            toast.error(`Coupon "${name}" is not created, try again.`)
            setloading(false)
        })
    }

    const handleRemove = (id) => {
        if(window.confirm("Do you want to Delete this item?")) {
            setloading(true);
            removeCoupon(id, user.token)
            .then(res => {
                setloading(false);
                toast.success(`${res.data.name} deleted!`)
                loadAllCoupons();
            })
            .catch(err => {
                setloading(false);
                if(err.response.status === 400) {
                toast.error(err.response.data);
                }
            })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div>
                <AdminNav name="coupon" />
                </div>
                <div className="col">
                    <div className="container pr-5 pl-5 pb-0 pt-5"><h2  style={{color: '#1890ff'}}>Create a new Coupon</h2>
                    <hr />
                    <form onSubmit={handleSubmit}>
                    <div className="form-group p-3">
                        <label>Name</label>
                        <input type="text" style={{width:'70%'}} autoFocus className="form-control input-sm" required value={name} onChange={e => setname(e.target.value)} /> 
                        <br />
                        <label>Discount (in %)</label>
                        <Tooltip
                            trigger={['focus']}
                            title="Enter a number"
                            placement="leftTop"
                            overlayClassName="numeric-input"
                        >
                            <input type="text" style={{width:'70%'}} autoFocus className="form-control input-sm" required value={discount} onChange={e => setdiscount(e.target.value)} />
                        </Tooltip>
                        <br />
                        <label>Expiry Date</label>
                        <br />
                        <DatePicker showToday={true} className="form-control mt-3 mb-4"  style={{width:'70%'}} placeholder="Select a Date" required value={expiry} size="large" onChange={(date) => setexpiry(date)} />
                        {/* <input type="text" style={{width:'70%'}} autoFocus className="form-control input-sm" required value={name} onChange={e => setname(e.target.value)} />  */}
                        <br />
                        {loading ? (<button className="btn btn-dark btn-raised"><LoadingOutlined /></button>) : (<button className="btn btn-dark btn-raised">Save</button>)}
                    </div>
                    </form>
                    </div>
                    <br />
                    <div className="container-fluid pr-5 pl-5 pb-5 pt-0">
                    <h2 style={{color: '#1890ff'}}>List of Categories</h2>               
                    <hr />
                    <br />
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Valid Till</th>
                        <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {coupons.map((s) => (
                            <tr>
                            <th scope="row"  key={s._id}>{s.name}</th>
                            <th scope="row" >{s.discount}%</th>
                            <th scope="row" >{new Date(s.expiry).toLocaleDateString('en-GB')}</th>
                            <td onClick={() => handleRemove(s._id)}><DeleteOutlined className="text-danger pointer" /></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage
