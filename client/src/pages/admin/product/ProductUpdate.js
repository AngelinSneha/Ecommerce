import React, {useEffect, useState} from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import Fileupload from '../../../components/forms/Fileupload'
import {LoadingOutlined} from '@ant-design/icons';
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { updateProduct } from "../../../functions/product";
const initialState = {
    title:'',
    description:'',
    price:'',
    category:"",
    subs:[],
    shipping:'',
    quantity:'',
    images:[],
    colors: ['Green', 'Blue', 'Black', 'Brown', 'Red', 'white', 'purple', 'yellow'],
    brands: ['Clothes', 'Earphones', 'Laptop', 'Mobile', 'TV', 'Watch'],
    color:'',
    brand:''
}
function ProductUpdate({match, history}) {
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([])
    const {user} = useSelector((state) => ({...state}));
    const {slug} = match.params;
    const [loading, setLoading] = useState(false);
    const [subOptions, setSubOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [arrayOfSubIds, setArrayOfSubIds] = useState([])
    useEffect(() => {
        loadProduct();
        loadCategories();
    }, [])

    const loadProduct = () => {
        getProduct(slug)
        .then(p => {
            // console.log('single product', p);
            setValues({...values, ...p.data})
            // getCategorySubs(p.data.category._id)
            // .then(res => {
            //     setSubOptions(res.data)
            // })
            if(p && p.data && p.data.category) {
                getCategorySubs(p.data.category._id).then((res) => {
                    setSubOptions(res.data); // on first load, show default subs
                });
            }
            let arr = [];
            if(p && p.data && p.data.subs) {
                p.data.subs.map(p => {
                    arr.push(p._id)
                })
            }
            console.log("ARR", arr);
            setArrayOfSubIds((prev) => arr)
        })
    }
    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values,subs:[]});

        setSelectedCategory(e.target.value)

        getCategorySubs(e.target.value).then((res) => {
        console.log("SUB OPTIONS ON CATEGORY CLICK", res);
        setSubOptions(res.data);
        });
        console.log("EXISTING CATEGORY VALUES.CATEGORY",values.category);
        if(values.category._id === e.target.value) {
            loadProduct();
        }
        setArrayOfSubIds([]);
    }

    const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        // setLoading(true);

        values.subs = arrayOfSubIds;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // toast.error(err.response.data.err);
      });
    }
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
        // console.log(e.target.name, "----------", e.target.value);
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
                            Updating a Product
                            {/* {JSON.stringify(values)} */}
                        </h2>
                        <hr />
                        <div className="p-3">
                            {loading? (<LoadingOutlined className="text-danger h1" />):(
                                <Fileupload values={values} setValues={setValues} setLoading={setLoading} />)
                            }
                        </div>
                        <ProductUpdateForm
                            handleChange={handleChange} 
                            handleSubmit={handleSubmit}
                            setValues={setValues}
                            values={values}  
                            categories={categories}
                            subOptions={subOptions}
                            selectedCategory={selectedCategory}
                            arrayOfSubIds={arrayOfSubIds}
                            setArrayOfSubIds={setArrayOfSubIds}
                            handleCategoryChange={handleCategoryChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
