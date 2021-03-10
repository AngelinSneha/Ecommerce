import  React, {useEffect, useState} from 'react'
import {getProductsByCount} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from '../components/cards/Jumbotron';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(3)
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
            <div className="jumbotron display-3 font-weight-bold text-center" style={{backgroundColor:'#eff8ff'}}>
                <Jumbotron text={["You're at the right Place!", 'The Sale Just Started!', 'All Top brands at low costs!', 'Just for You!']} />
            </div>
            <div className="container">
                <div className="row">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-4">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
