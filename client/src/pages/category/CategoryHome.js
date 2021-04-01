import React, {useState, useEffect} from 'react'
import {getCategory} from "../../functions/category"
import ProductCard from "../../components/cards/ProductCard";
import {LoadingOutlined} from "@ant-design/icons"
import ll from "../../images/ll.jpg"

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
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12">
                    <h2 className="text-center m-4">{category.name}</h2>
                    <img style={{'height': '15rem',  'width': '100%'}} src={ll} />
                    {loading? (<h4 className="text-center font-weight-bold p-4"><LoadingOutlined /></h4>): (
                        <><p className="h5 pt-5 pl-4">{products.length} Products Available</p><hr />
                        </>
                    )}
                </div>
                <div className="row mb-5">
                    {products.map((p) => (
                    <div className="col-md-4 mb-3 mt-2" key={p._id}>
                        <ProductCard product={p} />
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryHome
