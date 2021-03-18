import  React, {useEffect, useState} from 'react'
import {getProducts, getProductsCount} from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from 'antd';

function NewArrivals() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        loadAllProducts()
    }, [page]);

    useEffect(() => {
        getProductsCount().then(res => setProductsCount(res.data)).catch()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProducts('createdAt','desc',page)
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
        <div>
            <div className="container">
            <h3 className="pt-4" style={{'color':'#001529', 'marginBottom':'4px'}}>New Arrivals</h3>
            <i className='text-danger'>Explore all our latest collections</i>
            <hr />
            {loading?(<LoadingCard count={3} />):(<div className="row">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-4 mb-3">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>)}
            </div>
            <div className="row">
                <nav className="col-md-4 offset-md-4 text-center p-3">
                <Pagination 
                    current={page} 
                    total={(productsCount/3)*10} 
                    onChange={(value) => setPage(value)}  
                />
                </nav>
            </div>
        </div>
    )
}

export default NewArrivals
