import React, {useState, useEffect} from 'react'
import { fetchProductsByFilter, getProductsByCount } from "../functions/product";
import { useSelector, useDispatch} from "react-redux"
import { LoadingOutlined } from '@ant-design/icons';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider } from 'antd';
const {SubMenu, ItemGroup} = Menu;

function Shop() {
    const [products, setproducts] = useState([]);
    const [price, setprice] = useState([0, 60000])
    const [ok, setOk] = useState(false)
    const [loading, setloading] = useState(false);
    const {search} = useSelector((state) => ({...state}))
    const { text } = search;
    const dispatch = useDispatch();

    useEffect(() => {
        loadAllProducts();
    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
          setproducts(res.data);
        });
      };

    //load all products default(1)
    const loadAllProducts = () => {
        setloading(true)
        getProductsByCount(12)
        .then((p) => {
            setproducts(p.data)
            setloading(false)
        })
        .catch((err) => {
            console.log("Shop -->", err);
            setloading(false)
        })
    }

    //load all products based on input (2)
    useEffect(() => {
        const delayed = setTimeout(() => {
          fetchProducts({ query: text });
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);
    

    //load products based on price (3)
    useEffect(() => {
        // productBasedOnPrice(price)
        console.log('request ok')
        fetchProducts({price})
        
    }, [ok])

//     const productBasedOnPrice = (price) => {
// //
//     }

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ''}
        })
        setprice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <h4 className="mt-4 mb-4">Filter/Search</h4>
                    <hr />
                    <Menu defaultOpenKeys={['1', '2', '3']} mode="inline">
                        <SubMenu key="1" title={<span className="h6">Price</span>} >
                            <div>
                                <Slider max="200000" className="mr-4 ml-4" tipFormatter={(v) => `₹ ${v}`} range value={price} onChange={handleSlider} />
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9">
                        <h3 className="mt-4 mb-4">Products</h3>
                        <hr />
                    {products.length<1 && <i className="text-danger">No Products found!</i>}
                    <div className="row pb-5">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-4 mt-3">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
