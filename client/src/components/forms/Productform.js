import React from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

function Productform({handleChange, handleSubmit, values, handleCategoryChange, setValues, subOptions, showSub}) {
    const children = [];
    const {title, description, price, categories, category, subs, shipping, quantity, images, color, colors} = values;
    return (
        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                            <label><b>Product Title</b></label>
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
                            <label><b>Color</b></label>
                            <select name="color" style={{width:'70%'}} className="form-control" onChange={handleChange}>
                                <option>Please Select a value</option>  
                                {colors.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            </div>
                            {/* <div className="form-group">
                            <label><b>Brand</b></label>
                            <select name="brand" style={{width:'70%'}} className="form-control" onChange={handleChange}>
                                <option>Please Select a value</option>  
                                {brands.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                            </div> */}
                            <div>
                            <label><b>Category</b></label>
                            <select name="category" onChange={handleCategoryChange} style={{color:'#001529', width:'70%'}} className="form-control" aria-label="category">
                                <option>Select a Category</option>
                                {categories.length>0 && categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                            </select>
                            </div>
                            <br />
                            {showSub && (<div className="form-group">
                                <label><b>SubCategories</b></label>
                                <br />
                                <br />
                                <Select
                                    className="form-control"
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '70%' }}
                                    placeholder="Please select"
                                    value={subs}
                                    onChange={value => setValues({...values,subs:value})}
                                    >
                                    {subOptions && subOptions.map((s) => (<Option key={s._id} value={s._id}>{s.name}</Option>))}
                                </Select>
                            </div>)}
                            <button className="btn btn-dark btn-raised">Save</button>
                        </form>
    )
}

export default Productform
