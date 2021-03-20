import React, {useState, useEffect} from 'react'
import { fetchProductsByFilter, getProductsByCount } from "../functions/product";
import { useSelector, useDispatch} from "react-redux";
import {getCategories} from "../functions/category"
import {getSubs} from "../functions/sub"
import { LoadingOutlined, BgColorsOutlined, TransactionOutlined, DollarOutlined, StarOutlined, DownSquareOutlined } from '@ant-design/icons';
import ProductCard from '../components/cards/ProductCard';
import { Checkbox } from 'antd';
import { Radio } from 'antd';
import { Menu, Slider } from 'antd';
import Star from '../components/forms/Star';
const {SubMenu, ItemGroup} = Menu;

function Shop() {
    const [products, setproducts] = useState([]);
    const [star, setStar] = useState('');
    const [sub, setSub] = useState('');
    const [subs, setSubs] = useState([]);
    const [categories, setcategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [color, setColor] = useState(['Green', 'Blue', 'Black', 'Brown', 'Red', 'white', 'purple', 'yellow']);
    const [brand, setbrand] = useState(['Clothes', 'Earphones', 'Laptop', 'Mobile', 'TV', 'Watch'])
    const [shipping, setshipping] = useState(['Yes', 'No'])
    const [price, setprice] = useState([0, 200000]);
    const [ok, setOk] = useState(false);
    const [loading, setloading] = useState(false);
    const {search} = useSelector((state) => ({...state}));
    const { text } = search;
    const dispatch = useDispatch();

    useEffect(() => {
        loadAllProducts();
        getCategories().then((res) => {
            setcategories(res.data);
        })
        getSubs().then((res) => {
            setSubs(res.data);
        })
    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
          setproducts(res.data);
        });
      };

    // const fetchCategories = () => {
    //     getCategories().then((res) => {
    //         setcategories(res.data);
    //     })
    // }

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

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ''}
        });
        setprice([0,200000]);
        setCategoryIds([]);
        setStar("");
        setSub("");
        setprice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

    const showSubs = () =>
    subs.map((c) => (
      <div onClick={() => handleSub(c)} style={{'cursor':'pointer'}} className="p-1 m-1 badge badge-secondary" key={c._id}>
          {c.name}
      </div>
    ));

    const handleSub = (s) => {
        // console.log('SUB ',s);
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ''}
        });
        setprice([0,200000]);
        setCategoryIds([]);
        setStar('');
        setSub(s);
        fetchProducts({ subs: s })
    }

    const handleStarClick = (num) => {
        // console.log(num);
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ''}
        });
        setprice([0,200000]);
        setCategoryIds([]);
        setSub("");
        setStar(num);
        fetchProducts({ stars: num })
        // console.log(star);
    }

    const showStars = () => (
        <div className="pb-2 pl-4 pr-4" >
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    );

    const showBrand = () => brand.map((b) => <Radio classNam="pb-1 pl-1 pr-4" value={b} name={b} checked={b === brand} onChange={handleBrand}>{b}</Radio>)

    const showShipping = () => {
        //
    }
    const showColors = () => {
        //
    }

    const handleCheck = (e) => {
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
        setprice([0, 200000]);
        setStar("");
        setSub("");
        // console.log(e.target.value);
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1
    
        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
          inTheState.push(justChecked);
        } else {
          // if found pull out one item from index
          inTheState.splice(foundInTheState, 1);
        }
    
        setCategoryIds(inTheState);
        // console.log(inTheState);
        fetchProducts({ category: inTheState });
      };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <h4 className="mt-4 mb-4">Filter/Search</h4>
                    <hr />
                    <Menu defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']} mode="inline">
                        <SubMenu key="1" title={<span className="h6"><DollarOutlined /> Price</span>} >
                            <div>
                                <Slider max="200000" className="mr-4 ml-4" tipFormatter={(v) => `₹ ${v}`} range value={price} onChange={handleSlider} />
                            </div>
                        </SubMenu>
                        <SubMenu key="2" title={<span className="h6"><DownSquareOutlined /> Category</span>} >
                                <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
                        </SubMenu>
                        <SubMenu key="3" title={<span className="h6"><StarOutlined /> Rating</span>} >
                                <div style={{ maringTop: "-10px" }}>{showStars()}</div>
                        </SubMenu>
                        <SubMenu key="4" title={<span className="h6"><DownSquareOutlined /> Sub Category</span>} >
                                <div className="pl-4 pr-4" style={{ maringTop: "-10px" }}>{showSubs()}</div>
                        </SubMenu>
                        <SubMenu key="5" title={<span className="h6"><DownSquareOutlined /> Brand</span>} >
                                <div className="pl-4 pr-4" style={{ maringTop: "-10px" }}>{showBrand()}</div>
                        </SubMenu>
                        <SubMenu key="6" title={<span className="h6"><BgColorsOutlined /> Color</span>} >
                                <div className="pl-4 pr-4" style={{ maringTop: "-10px" }}>{showColors()}</div>
                        </SubMenu>
                        <SubMenu key="7" title={<span className="h6"><TransactionOutlined /> Shipping</span>} >
                                <div className="pl-4 pr-4" style={{ maringTop: "-10px" }}>{showShipping()}</div>
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
