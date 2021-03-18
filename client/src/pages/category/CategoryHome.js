import React, {useState, useEffect} from 'react'
import {getCategory} from "../../functions/category"
import ProductCard from "../../components/cards/ProductCard";
import {LoadingOutlined} from "@ant-design/icons"

function CategoryHome({ match }) {
    const [category, setcategory] = useState({});
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {slug} = match.params;

    useEffect(() => {
        setLoading(true)
        getCategory(slug).then((res) => {
            console.log(JSON.stringify(res.data.category, null, 4))
            setcategory(res.data.category)
            setproducts(res.data.products)
            setLoading(false)
            
        }).catch(err => {
            console.log("getERROR --> ",err)
            setLoading(false)
        })
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {loading? (<h4 className="text-center font-weight-bold p-4"><LoadingOutlined /></h4>): (
                        <h4 className="text-center font-weight-bold p-4">{products.length} products available in the category of "{category.name}"</h4>
                    )}
                </div>
                <div className="row">
                    {products.map((p) => (
                    <div className="col" key={p._id}>
                        <ProductCard product={p} />
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryHome