import React, { useState, useEffect} from 'react'
import {LoadingOutlined} from "@ant-design/icons"
import { getCategories } from "../../functions/category";
import 'react-awesome-button/dist/themes/theme-blue.css';
import {  AwesomeButton } from 'react-awesome-button';
// import Laptop from "../../images/Laptop.jpg";


function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories().then((c) => {
            setCategories(c.data)
            setLoading(false);
        }).catch((err) => {
            console.log("ERROR ---> ", err);
            setLoading(false);
        })
    }, []);

    const showCategories = () => categories.map(c => (
        <div key={c._id} className="col-xs-6 col-sm-4 col-md-2 mb-3">
      <AwesomeButton
      type="secondary"
      style={{'color':'black'}}
      href={`/category/${c.slug}`}
      className="aws-btn"
    >
      <i style={{'color':'#000'}}>{c.name}</i>
    </AwesomeButton>
      </div>
    ))
    return (
        <div className = "container">
        <h4 className="text-center p-5" style={{'color':'#001529}'}} >Shop By Category</h4>
            <div className="row">
                {loading?(<h4 className="text-center"><LoadingOutlined  /></h4>):(showCategories())}
            </div>
        </div>
    )
}

export default CategoryList
