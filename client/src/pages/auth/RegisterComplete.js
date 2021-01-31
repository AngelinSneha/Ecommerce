import React, {useState, useEffect} from 'react';
import {auth} from "../../firebase";
import {toast} from 'react-toastify';

function RegisterComplete({history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            toast.error('Email and Password is required.');
            return;
        }
        if(password.length < 6 ) {
            toast.error('Password must be ateast 6 characters long.');
            return;
        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            console.log("Result:", result);

            if(result.user.emailVerified) {
                window.localStorage.removeItem('emailForRegistration');
                let user = auth.currentUser
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                console.log("user", user, "idTokenResult", idTokenResult);
                 history.push('/');
            }

        } catch(error) {
            console.log("error: ", error);
            toast.error(error.message);
        }
    }

    return (
        <div>
            <div className="container p-5">
                <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Complete your Registration</h1>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <input disabled type="email" value={email} className="form-control m-3" />
                        <input type="password" value={password} className="form-control m-3" onChange={(e) => setPassword(e.target.value)} autoFocus placeholder="Password" />
                        <br />
                        <button type="submit" className="float-right btn btn-primary btn-raised" >Complete Registeration</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete
