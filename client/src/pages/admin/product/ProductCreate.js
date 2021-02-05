import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { createProduct } from "../../../functions/product";

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
    const {title, description, price, categories, category, subs, shipping, quantity, images, color, colors, brands, brand} = values;
    
    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleChange = (e) => {
        // e.target.name
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
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                            <label><b>Title</b></label>
                            <input type="text" name="title" style={{width:'70%'}} className="form-control" value={title} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                            <label><b>Description</b></label>
                            <input type="text" name="description" style={{width:'70%'}} className="form-control" value={description} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                            <label><b>Price</b></label>
                            <input type="text" name="price" style={{width:'70%'}} className="form-control" value={price} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                            <label><b>Shipping</b></label>
                            <select name="shipping" style={{width:'70%'}} className="form-control" onChange={handleChange}>
                                <option>Please Select a value</option>  
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                            </div>
                            <div className="form-group">
                            <label><b>Quantity</b></label>
                            <input type="text" name="quantity" style={{width:'70%'}} className="form-control" value={quantity} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                            <label>Color</label>
                            <select name="color" style={{width:'70%'}} className="form-control" onChange={handleChange}>
                                <option>Please Select a value</option>  
                                {colors.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            </div>
                            <div className="form-group">
                            <label><b>Category</b></label>
                            <select name="brand" style={{width:'70%'}} className="form-control" onChange={handleChange}>
                                <option>Please Select a value</option>  
                                {brands.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                            </div>
                            <button className="btn btn-dark btn-raised">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;
