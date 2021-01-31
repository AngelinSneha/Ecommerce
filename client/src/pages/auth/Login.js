import React, {useState, useEffect} from 'react';
import {auth, googleAuthProvider} from "../../firebase";
import {toast} from 'react-toastify';
import {Button} from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

function Login({history}) {
    const [email, setEmail] = useState('angelinsneha91@gmail.com');
    const [password, setPassword] = useState('angu7223');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}))
    const dispatch = useDispatch();

    useEffect(() => {
        if(user && user.token) history.push("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(email, password);
        try {
           const result = await auth.signInWithEmailAndPassword(email, password);
           console.log(result);
           const {user} = result;
           const idTokenResult = await user.getIdTokenResult();
           dispatch({
            type:'LOGGED_IN_USER',
            payload: {
               email:user.email,
               token:idTokenResult.token
            }
          });
          history.push("/");
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
            dispatch({
                type:'LOGGED_IN_USER',
                payload: {
                   email:user.email,
                   token:idTokenResult.token
                }
            });
            history.push("/");
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
                    {!loading ? (<h4>Login</h4>):(<h4 className="text-danger" >Loading...</h4>)}
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="email" value={email} className="form-control m-3" onChange={(e) => setEmail(e.target.value)} autoFocus placeholder="Email Id" />
                        </div>
                        <div className="form-group">
                        <input type="password" value={password} className="form-control m-3" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </div>
                        <br />
                        <Button onClick={handleSubmit} size="large" disabled={!email || password.length<6} icon={<MailOutlined />} type="primary" block shape='round' className="mb-3">Login with your Email/Password</Button>
                        
                        <Button onClick={googleLogin} size="large" icon={<GoogleOutlined />} type="danger" block shape='round' className="mb-3">Login with Google</Button>
                        <Link to="/forgot/password" className="float-right text-danger">Forgot password?</Link>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login
