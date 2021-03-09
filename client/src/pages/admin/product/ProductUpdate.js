import React, {useEffect, useState} from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { getProduct } from "../../../functions/product";
import Productform from "../../../components/forms/Productform";
import Fileupload from '../../../components/forms/Fileupload'
import {LoadingOutlined} from '@ant-design/icons';
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

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
function ProductUpdate({match}) {
    const [values, setValues] = useState(initialState);
    const {user} = useSelector((state) => ({...state}));
    const {slug} = match.params;
    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = () => {
        getProduct(slug)
        .then(p => {
            // console.log('single product', p);
            setValues({...values, ...p.data})
        })
        .catch(err => {

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // createProduct(values, user.token)
        // .then(res => {
        //     console.log(res);
        //     // toast.success(`"${res.data.title}" is created`);
        //     window.alert(`"${res.data.title}" is created`)
        //     window.location.reload();
        // })
        // .catch(err => {
        //     console.log(err);
        //     if(err.response.status === 400) {
        //         toast.error(err.response.data);
        //     }
        // })
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
                            {JSON.stringify(values)}
                        </h2>
                        <hr />
                        <ProductUpdateForm
                            handleChange={handleChange} 
                            handleSubmit={handleSubmit}
                            setValues={setValues}
                            values={values}  
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
