import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {  getCategories} from "../../../functions/category";
import { updateSub, getSubs, removeSub, getSub } from "../../../functions/sub";
import Categoryform from "../../../components/forms/Categoryform";

function SubCreate({match, history}) {
    const {user} = useSelector((state) => ({...state}))
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState('');

    useEffect(() => {
        loadCategories();
        loadSub();
    }, [])

    const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const loadSub = () =>
    getSub(match.params.slug).then((s) =>{ 
        setName(s.data.name);
        setParent(s.data.parent);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSub(match.params.slug, {name, parent}, user.token)
        .then(res => {
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" is updated.`)
            history.push('/admin/sub');
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
                <AdminNav name="sub" />
                </div>
                <div className="col">
                <div className="container p-5"><h2  style={{color: '#1890ff'}}>Create a new SubCategory</h2>
                <br />
                <div className="p-3">
                <label><b>Category Name</b></label>
                    <select onChange={(e) => setParent(e.target.value)} style={{color:'#001529', width:'70%'}} class="form-control" aria-label="Category">
                        <option>Select a Category</option>
                        {categories.length>0 && categories.map((c) => (<option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>))}
                    </select>
                    </div>
                <Categoryform loading={loading} setName={setName} name={name}  handleSubmit={handleSubmit}  />
                </div>
                </div>
            </div>
        </div>
    )
}

export default SubCreate
