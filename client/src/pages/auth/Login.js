import React, {useState, useEffect} from 'react';
import {auth, googleAuthProvider} from "../../firebase";
import {toast} from 'react-toastify';
import {Button} from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import {createOrUpdateUser} from "../../functions/auth";


function Login({history}) {
    const [email, setEmail] = useState('angelinsneha91@gmail.com');
    const [password, setPassword] = useState('angelin@');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}))
    const dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        if(res.data.role === "admin") {
            history.push("/admin/dashboard");
        } else {
            history.push("/user/history");
        }
    }

    useEffect(() => {
        if(user && user.token) history.push("/");
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(email, password);
        try {
           const result = await auth.signInWithEmailAndPassword(email, password);
           console.log(result);
           const {user} = result;
           const idTokenResult = await user.getIdTokenResult();
           createOrUpdateUser(idTokenResult.token)
           .then(
               (res) => {
                dispatch({
                    type:'LOGGED_IN_USER',
                    payload: {
                        name:res.data.name,
                       email:res.data.email,
                       token:idTokenResult.token,
                       role:res.data.role,
                       _id: res.data._id
                    }
                  });
                  roleBasedRedirect(res);
               }
           )
           .catch(err => console.log(err));
        //   history.push("/");
        }
        catch(error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    }
    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
        .then(async (result) => {
            const {user} = result
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
           .then(
               (res) => {
                dispatch({
                    type:'LOGGED_IN_USER',
                    payload: {
                        name:res.data.name,
                       email:res.data.email,
                       token:idTokenResult.token,
                       role:res.data.role,
                       _id: res.data._id
                    }
                  })
                  roleBasedRedirect(res);
               }
           )
           .catch(err => console.log(err));
            // history.push("/");
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.message);
        });
    };

    return (
        <div>
            <div className="container p-5">
                <div className="row">
                <div className="col-md-6 offset-md-3">
                <h2>Sign-In</h2>
                     <br />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="email" value={email} className="form-control m-3" onChange={(e) => setEmail(e.target.value)} autoFocus placeholder="Email Id" />
                        </div>
                        <div className="form-group">
                        <input type="password" value={password} className="form-control m-3" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </div>
                        <br />
                        {!loading ? 
                            (
                                <Button onClick={handleSubmit} style={{backgroundColor:'#001529', color:"white"}} disabled={!email || password.length<6} icon={<MailOutlined />} block shape='round' size="large" className="mb-3">
                                Login with your Email/Password
                                </Button>
                            ):(
                                    <Button style={{backgroundColor:'#001529'}} block shape='round' className="mb-3">
                                    <LoadingOutlined />
                                    </Button>
                            )
                        }
                        
                        <Button onClick={googleLogin} size="large"  icon={<GoogleOutlined />} type="danger" block shape='round' className="mb-3">Login with Google</Button>
                        <Link to="/forgot/password" className="float-right" style={{color:'black'}}>Forgot password?</Link>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login

