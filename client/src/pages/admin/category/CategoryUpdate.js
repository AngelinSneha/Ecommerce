import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { updateCategory, getCategory} from "../../../functions/category";
import Categoryform from "../../../components/forms/Categoryform";

function CategoryUpdate({history, match}) {
    const {user} = useSelector((state) => ({...state}))
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategory();
    }, [])

    const loadCategory = () => {
        getCategory(match.params.slug).then((c) => {
            setName(c.data.name)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(match.params.slug, {name}, user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" is created.`)
            history.push("/admin/category");
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) {
                toast.error(err.response.data);
            }
        })
    }

   
    

    return (
        <div className="container-fluid">
            <div className="row">
            <div>
            <AdminNav name="category" />
            </div>
                <div className="col">
                <div className="container p-5"><h2  style={{color: '#1890ff'}}>Update Category</h2>
                <br />
                <Categoryform loading={loading} setName={setName} name={name}  handleSubmit={handleSubmit}  />
                </div>
                <hr />
                </div>
            </div>
        </div>
    )
}


export default CategoryUpdate;
