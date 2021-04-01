import { LoadingOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import AdminProductCard from '../../../components/cards/AdminProductCard';
import AdminNav from "../../../components/nav/AdminNav";
import {getProductsByCount, removeProduct} from "../../../functions/product"

function AllProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state) => ({...state}))
    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(100)
        .then(res => {
            setProducts(res.data)
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    const handleRemove = (slug) => {
        let answer = window.confirm('Do you want to delete this Item?');
        if(answer) {
            setLoading(true);
            removeProduct(slug, user.token)
            .then(res => {
                setLoading(false);
                loadAllProducts();
                toast.success(`${res.data.title} deleted!`)
            })
            .catch((err) => {
                setLoading(false);
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
            <AdminNav name="productsList"/>
            </div>
                <div className="col mb-5">
                {loading? (<h2 className="text-danger"><LoadingOutlined /></h2>):(<h3 className="p-3" style={{color: '#1890ff'}} >All Products</h3>)}
                <hr />
                   <div className="row">
                    {products.map((product)=> (
                            <div key={product._id}  className="col-md-4 mb-3">
                                <AdminProductCard product={product} handleRemove={handleRemove} />
                            </div>
                        ))}
                   </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts
