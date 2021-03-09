import { LoadingOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from 'react'
import AdminProductCard from '../../../components/cards/AdminProductCard';
import AdminNav from "../../../components/nav/AdminNav";
import {getProductsByCount} from "../../../functions/product"

function AllProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

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

    return (
        <div className="container-fluid">
            <div className="row">
            <div>
            <AdminNav name="dashboard"/>
            </div>
                <div className="col">
                {loading? (<h2 className="text-danger"><LoadingOutlined /></h2>):(<h3 className="p-4" style={{color: '#1890ff'}} >All Products</h3>)}
                   <div className="row">
                    {products.map((product)=> (
                            <div key={product._id}  className="col-md-4 pb-3"><AdminProductCard product={product} /></div>
                        ))}
                   </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts
