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
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 200000]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState("");
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState("");
    const [brands, setBrands] = useState([
        'Clothes', 'Earphones', 'Laptop', 'Mobile', 'TV', 'Watch'
    ]);
    const [brand, setBrand] = useState("");
    const [colors, setColors] = useState([
        'Green', 'Blue', 'Black', 'Brown', 'Red', 'white', 'purple', 'yellow'
    ]);
    const [color, setColor] = useState("");
    const [shipping, setShipping] = useState("");
  
    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;
  
    useEffect(() => {
      loadAllProducts();
      // fetch categories
      getCategories().then((res) => setCategories(res.data));
      // fetch subcategories
      getSubs().then((res) => setSubs(res.data));
    }, []);
  
    const fetchProducts = (arg) => {
      fetchProductsByFilter(arg).then((res) => {
        setProducts(res.data);
      });
    };
  
    // 1. load products by default on page load
    const loadAllProducts = () => {
      getProductsByCount(12).then((p) => {
        setProducts(p.data);
        setLoading(false);
      });
    };
  
    // 2. load products on user search input
    useEffect(() => {
      const delayed = setTimeout(() => {
        fetchProducts({ query: text });
      }, 300);
      if(!text) {
        loadAllProducts();
      }
      return () => clearTimeout(delayed);
    }, [text]);
  
    // 3. load products based on price range
    useEffect(() => {
      console.log("ok to request");
      fetchProducts({ price });
    }, [ok]);
  
    const handleSlider = (value) => {
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
  
      // reset
      setCategoryIds([]);
      setPrice(value);
      setStar("");
      setSub("");
      setBrand("");
      setColor("");
      setShipping("");
      setTimeout(() => {
        setOk(!ok);
      }, 300);
    };
  
    // 4. load products based on category
    // show categories in a list of checkbox
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
  
    // handle check for categories
    const handleCheck = (e) => {
      // reset
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setPrice([0, 0]);
      setStar("");
      setSub("");
      setBrand("");
      setColor("");
      setShipping("");
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
  
    // 5. show products by star rating
    const handleStarClick = (num) => {
      // console.log(num);
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setPrice([0, 0]);
      setCategoryIds([]);
      setStar(num);
      setSub("");
      setBrand("");
      setColor("");
      setShipping("");
      fetchProducts({ stars: num });
    };
  
    const showStars = () => (
      <div className="pr-4 pl-4 pb-2">
        <Star starClick={handleStarClick} numberOfStars={5} />
        <Star starClick={handleStarClick} numberOfStars={4} />
        <Star starClick={handleStarClick} numberOfStars={3} />
        <Star starClick={handleStarClick} numberOfStars={2} />
        <Star starClick={handleStarClick} numberOfStars={1} />
      </div>
    );
  
    // 6. show products by sub category
    const showSubs = () =>
      subs.map((s) => (
        <div
          key={s._id}
          onClick={() => handleSub(s)}
          className="p-1 m-1 badge badge-secondary"
          style={{ cursor: "pointer" }}
        >
          {s.name}
        </div>
      ));
  
    const handleSub = (sub) => {
      // console.log("SUB", sub);
      setSub(sub);
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setPrice([0, 0]);
      setCategoryIds([]);
      setStar("");
      setBrand("");
      setColor("");
      setShipping("");
      fetchProducts({ sub });
    };
  
    // 7. show products based on brand name
    const showBrands = () =>
      brands.map((b) => (
        <Radio
          value={b}
          name={b}
          checked={b === brand}
          onChange={handleBrand}
          className="pb-1 pl-4 pr-4"
        >
          {b}
        </Radio>
      ));
  
    const handleBrand = (e) => {
      setSub("");
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setPrice([0, 0]);
      setCategoryIds([]);
      setStar("");
      setColor("");
      setBrand(e.target.value);
      setShipping("");
      fetchProducts({ brand: e.target.value });
    };

      const showColors = () =>
      colors.map((c) => (
        <Radio
          value={c}
          name={c}
          checked={c === color}
          onChange={handleColor}
          className="pb-1 pl-4 pr-4"
        >
          {c}
        </Radio>
      ));

      const handleColor = (e) => {
        setSub("");
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setBrand("");
        setColor(e.target.value);
        setShipping("");
        fetchProducts({ color: e.target.value });
      };

      const showShipping = () => (
        <>
          <Checkbox
            className="pb-2 pl-4 pr-4"
            onChange={handleShippingchange}
            value="Yes"
            checked={shipping === "Yes"}
          >
            Yes
          </Checkbox>
    
          <Checkbox
            className="pb-2 pl-4 pr-4"
            onChange={handleShippingchange}
            value="No"
            checked={shipping === "No"}
          >
            No
          </Checkbox>
        </>
      );

      const handleShippingchange = (e) => {
        setSub("");
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setBrand("");
        setColor("");
        setShipping(e.target.value);
        fetchProducts({ shipping: e.target.value });
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
                                <div className="pr-4" style={{ maringTop: "-10px" }} >{showBrands()}</div>
                        </SubMenu>
                        <SubMenu key="6" title={<span className="h6"><BgColorsOutlined /> Color</span>} >
                                <div className="pr-4" style={{ maringTop: "-10px" }}>{showColors()}</div>
                        </SubMenu>
                        <SubMenu key="7" title={<span className="h6"><TransactionOutlined /> Shipping</span>} >
                                <div className="pr-4" style={{ maringTop: "-10px" }}>{showShipping()}</div>
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
