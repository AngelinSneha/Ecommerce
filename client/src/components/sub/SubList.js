import React, { useState, useEffect} from 'react'
import { Link } from "react-router-dom";
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
        <div class="col-md-2 mb-2">
        <Link to={`/sub/${c.slug}`}><Card
        key={c._id}
        hoverable
        className="p-1" 
        title={c.name}
        style={{height:"150px" ,objectFit:"cover"}} 
        // cover={<img src="../../images/Laptop.jpg" />}
      >
        <small className="mb-2"><i>Check out our lastest collection on  {c.name}...</i></small>
      </Card>
      </Link>
      </div>
    ))
    return (
        <div className = "container">
        <h4 className="text-center font-weight-bold p-4">SHOP BY SUBCATEGORY</h4>
            <div className="row">
                {loading?(<h4 className="text-center"><LoadingOutlined  /></h4>):(showSubs())}
            </div>
        </div>
    )
}

export default SubList
