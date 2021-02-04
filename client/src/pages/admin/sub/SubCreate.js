import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {  getCategories} from "../../../functions/category";
import { createSub, getSubs, removeSub } from "../../../functions/sub";
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Categoryform from "../../../components/forms/Categoryform";
import LocalSearch from '../../../components/forms/LocalSearch';

function SubCreate() {
    const {user} = useSelector((state) => ({...state}))
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, [])

    const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const loadSubs = () =>
    getSubs().then((s) => setSubs(s.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createSub({name, parent:category}, user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" is created.`)
            loadSubs();
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
            removeSub(slug, user.token)
            .then(res => {
                setLoading(false);
                toast.success(`${res.data.name} deleted!`)
                loadSubs();
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
                <AdminNav name="sub" />
                </div>
                <div className="col">
                <div className="container p-5"><h2  style={{color: '#1890ff'}}>Create a new SubCategory</h2>
                <br />
                <div className="p-3">
                <label><b>Category Name</b></label>
                    <select onChange={(e) => setCategory(e.target.value)} style={{color:'#001529', width:'70%'}} class="form-control" aria-label="Category">
                        <option>Select a Category</option>
                        {categories.length>0 && categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                    </select>
                    </div>
                <Categoryform loading={loading} setName={setName} name={name}  handleSubmit={handleSubmit}  />
                </div>
                <hr />
                <div className="container-fluid p-5">
                <h2 style={{color: '#1890ff'}}>List of SubCategories</h2>
                <br />
                <LocalSearch keyword={keyword} setKeyword={setKeyword} placeholder="Enter the Subcategory name" />
                
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
                    {subs.filter(searched(keyword)).map((s) => (
                        <tr>
                        <th scope="row" key={s._id}>{s.name}</th>
                        <td><Link to={`/admin/sub/${s.slug}`}><EditOutlined className="text-primary" /></Link></td>
                        <td onClick={() => handleRemove(s.slug)}><DeleteOutlined className="text-danger" /></td>
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

export default SubCreate

