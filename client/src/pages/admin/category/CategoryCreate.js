import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { LoadingOutlined } from '@ant-design/icons';
import { createCategory, getCategories, removeCategory } from "../../../functions/category";

function CategoryCreate() {
    const {user} = useSelector((state) => ({...state}))
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({name}, user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" is created.`)
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) {
                toast.error(err.response.data);
            }
        })
    }

    const categoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group m-3">
                <label>Name</label>
                <input type="text" style={{width:'60%'}} autoFocus className="form-control input-sm" required value={name} onChange={e => setName(e.target.value)} /> 
                <br />
                {loading ? (<button className="btn btn-dark btn-raised"><LoadingOutlined /></button>) : (<button className="btn btn-dark btn-raised">Save</button>)}
            </div>
        </form>
    )

    return (
        <div className="container-fluid">
            <div className="row">
            <div>
            <AdminNav name="category" />
            </div>
                <div className="col">
                <div className="container m-5"><h2>Create a new Category</h2>
                <br />
                {categoryForm()}
                </div>
                <hr />
                {JSON.stringify(categories)}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate
