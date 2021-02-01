import React, {useState, useEffect} from 'react';
import {auth} from "../../firebase";
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";

function Register({history}) {
    const [email, setEmail] = useState('');
    const {user} = useSelector((state) => ({...state}));
    useEffect(() => {
        if(user && user.token) history.push("/");
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            //after regiter
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            // to prevent user to register in one device and then complete register in another device
            handleCodeInApp:true
        }
        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`Email is set to ${email}, Click the link in your mail to complete the registration.`);
        //local storage
        window.localStorage.setItem('emailForRegistration', email);
        setEmail("");
    }

    return (
        <div>
            <div className="container p-5">
                <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Register To Join Us!</h1>
                    <i style={{color:"#ff4646"}}>10% OFF on all products for new Users*</i>
                    <br />
                    <br />
                    <br />
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Enter your Email Id" autoFocus type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <br />
                        <button type="submit" className="float-right btn btn-dark btn-raised" >Register</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Register
