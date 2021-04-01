import React, {useState, useEffect} from 'react'
import {getSub} from "../../functions/sub"
import ProductCard from "../../components/cards/ProductCard";
import {LoadingOutlined} from "@ant-design/icons"

function SubHome({ match }) {
    const [sub, setSub] = useState({});
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {slug} = match.params;

    useEffect(() => {
        setLoading(true)
        getSub(slug).then((res) => {
            console.log(JSON.stringify(res.data, null, 4))
            setSub(res.data.sub)
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
                <h2 className="text-center m-4">{sub.name}</h2>
                    <img style={{'height': '15rem',  'width': '100%'}} src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/CEPC/storage/2020/May/Desktop_Header_ClearanceStore.jpg" />
                    {loading? (<h4 className="text-center font-weight-bold p-4"><LoadingOutlined /></h4>): (
                        <><p className="h5 pt-5 pl-4">{products.length} Products Available</p><hr />
                        </>
                    )}
                </div>
            </div>
                <div className="row mb-5">
                    {products.map((p) => (
                    <div className="col-md-4 mb-4 mt-2" key={p._id}>
                        <ProductCard product={p} />
                    </div>
                    ))}
                </div>
        </div>
    )
}

export default SubHome
