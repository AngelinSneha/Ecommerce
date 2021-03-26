import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { createCategory, getCategories, removeCategory } from "../../../functions/category";
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Categoryform from "../../../components/forms/Categoryform";
import LocalSearch from '../../../components/forms/LocalSearch';

function CategoryCreate() {
    const {user} = useSelector((state) => ({...state}))
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');

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
            loadCategories();
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) {
                toast.error(err.response.data);
            }
        })
    }

    const handleRemove = async (slug) => {
        // let answer = window.confirm("Do you want to Delete this item?");
        // console.log(answer, slug);
        if(window.confirm("Do you want to Delete this item?")) {
            setLoading(true);
            removeCategory(slug, user.token)
            .then(res => {
                setLoading(false);
                toast.success(`${res.data.name} deleted!`)
                loadCategories();
            })
            .catch(err => {
                setLoading(false);
                if(err.response.status === 400) {
                toast.error(err.response.data);
                }
            })
        }
    }

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    return (
        <div className="container-fluid">
            <div className="row">
                <div>
                <AdminNav name="category" />
                </div>
                <div className="col">
                <div className="container p-5"><h2  style={{color: '#1890ff'}}>Create a new Category</h2>
                <hr />
                <Categoryform loading={loading} setName={setName} name={name}  handleSubmit={handleSubmit}  />
                </div>
                <div className="container-fluid pr-5 pl-5 pb-5 pt-0">
                <h2 style={{color: '#1890ff'}}>List of Categories</h2>               
                <hr />
                <LocalSearch keyword={keyword} setKeyword={setKeyword} placeholder="Enter the category" />
                
                <br />
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.filter(searched(keyword)).map((c) => (
                        <tr>
                        <th scope="row" key={c._id}>{c.name}</th>
                        <td><Link to={`/admin/category/${c.slug}`}><EditOutlined className="text-primary" /></Link></td>
                        <td onClick={() => handleRemove(c.slug)}><DeleteOutlined className="text-danger" /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate
