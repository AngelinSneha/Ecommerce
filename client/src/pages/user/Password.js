import React, {useState} from 'react'
import UserNav from "../../components/nav/UserNav";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import { LoadingOutlined } from '@ant-design/icons';

function Password() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(password);
        await auth.currentUser.updatePassword(password)
        .then(() => {
            setLoading(false);
            setPassword("");
            toast.success('Password Updated');
        })
        .catch((err) => {
            setLoading(false);
            toast.error(err.message);
        })
    }

    const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit} className="m-4">
        <fieldset class="form-group">
            <label for="Password" class="bmd-label-floating">New Password</label>
            <input style={{width:'60%'}} type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={loading} autoFocus className="form-control" />
            <span class="bmd-help">We'll never share your email with anyone else.</span>
        </fieldset>
        {!loading ? (<button className="btn btn-dark btn-raised" disabled={!password ||password.length < 6 || loading}>Submit</button>):(<button className="btn btn-dark btn-raised"><LoadingOutlined /> Loading</button>)}
    </form>
    );

    return (
        <div className="container-fluid">
        <div className="row">
        <div>
        <UserNav name="password" />
        </div>
            <div className="col">
            <div className="p-4"><h2>Password Update</h2><i className="text-danger">Please enter a new Password.</i></div>
                {passwordUpdateForm()}
            </div>
        </div>
    </div>
    )
}

export default Password
