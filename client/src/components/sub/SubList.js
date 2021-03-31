import React, { useState, useEffect} from 'react'
import 'react-awesome-button/dist/themes/theme-blue.css';
import {  AwesomeButton } from 'react-awesome-button';
import {LoadingOutlined} from "@ant-design/icons"
import { getSubs } from "../../functions/sub";
// import Laptop from "../../images/Laptop.jpg";
import { Card } from 'antd';

const { Meta } = Card;

function SubList() {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs().then((c) => {
            setSubs(c.data)
            setLoading(false);
        }).catch((err) => {
            console.log("ERROR ---> ", err);
            setLoading(false);
        })
    }, []);

    const showSubs = () => subs.map(c => (
        <div key={c._id} className=" col-xs-6 col-sm-4 col-md-2 mb-5">
        <AwesomeButton
      type="secondary"
      style={{'color':'black'}}
      href={`/sub/${c.slug}`}
      className="aws-btn mb-3"
    >
      <i style={{'color':'#000'}}>{c.name}</i>
    </AwesomeButton>
      </div>
    ))
    return (
        <div className = "container">
        <h4 className="text-center p-5" style={{'color':'#001529}'}} >Shop By Sub - Category</h4>
            <div className="row">
                {loading?(<h4 className="text-center"><LoadingOutlined  /></h4>):(showSubs())}
            </div>
        </div>
    )
}

export default SubList
