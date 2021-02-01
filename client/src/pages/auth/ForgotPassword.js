import React, {useState, useEffect} from 'react';
import {auth} from "../../firebase";
import {toast} from 'react-toastify';
import { useSelector } from "react-redux";
const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}))
    useEffect(() => {
        if(user && user.token) history.push("/");
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            //after regiter
            url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            // to prevent user to register in one device and then complete register in another device
            handleCodeInApp:true
        }
        await auth.sendPasswordResetEmail(email, config)
        .then(()=> {
            setEmail('')
            setLoading(false)
            toast.success("Check your mail to reset your password")
        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.message);
            console.log('error message in forgot password');
        })
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {!loading ? (<h2>Forgot Password?</h2>):(<h2 className="text-danger" >Loading...</h2>)}
            <i style={{color:"#ff4646"}}>Enter your Email Id so that we can send you a reset link!</i>
            <br />
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" autoFocus placeholder="Enter your email Id" value={email} className="form-control " />
                        {/* <input type="password" value={password} className="form-control m-3" onChange={(e) => setPassword(e.target.value)} autoFocus placeholder="Password" /> */}
                        <br />
                        {!email? (  
                            <button type="submit" disabled={!email} className="float-right btn btn-secondary btn-raised" >Submit</button>
                        ): (
                            <button type="submit" className="float-right btn btn-dark btn-raised" >Submit</button>
                        )}
                        
            </form>
        </div>
    )
}
export default ForgotPassword;