import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { createProduct } from "../../../functions/product";
import Productform from "../../../components/forms/Productform";
import { getCategories, getCategorySubs } from "../../../functions/category";
import Fileupload from '../../../components/forms/Fileupload'
import {LoadingOutlined} from '@ant-design/icons';

const initialState = {
    title:'',
    description:'',
    price:'',
    category:'',
    categories:[],
    subs:[],
    shipping:'',
    quantity:'',
    images:[],
    colors: ['Green', 'Blue', 'Black', 'Brown', 'Red', 'white', 'purple', 'yellow'],
    brands: ['Clothes', 'Earphones', 'Laptop', 'Mobile', 'TV', 'Watch'],
    color:'',
    brand:''
}

function ProductCreate() {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () =>
    getCategories().then((c) => setValues({...values, categories: c.data}));

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
        .then(res => {
            console.log(res);
            // toast.success(`"${res.data.title}" is created`);
            window.alert(`"${res.data.title}" is created`)
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            if(err.response.status === 400) {
                toast.error(err.response.data);
            }
        })
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
        // console.log(e.target.name, "----------", e.target.value);
    }
    
    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values,subs:[], category: e.target.value });
        getCategorySubs(e.target.value).then((res) => {
        console.log("SUB OPTIONS ON CATGORY CLICK", res);
        setSubOptions(res.data);
        });
        setShowSub(true);
    }
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div>
                <AdminNav name="createproduct" />
                </div>
                <div className="col">
                    <div className="container p-5">
                        <h2  style={{color: '#1890ff'}}>
                            Create a new Product
                        </h2>
                        {JSON.stringify(values.images)}
                        <div className="p-3">
                            {loading? (<LoadingOutlined className="text-danger h1" />):(
                                <Fileupload values={values} setValues={setValues} setLoading={setLoading} />)
                            }
                        </div>
                        <Productform setValues={setValues} subOptions={subOptions} showSub={showSub} values={values} handleCategoryChange={handleCategoryChange} handleChange={handleChange} handleSubmit={handleSubmit}/> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;
