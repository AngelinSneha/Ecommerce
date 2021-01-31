import React,{useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import RegisterComplete from "./pages/auth/RegisterComplete";
import {auth} from "./firebase";
import {useDispatch} from "react-redux";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(async (user) => {
       if(user) {
         const idTokenResult = await user.getIdTokenResult();
          console.log("user", user);
         dispatch({
           type:'LOGGED_IN_USER',
           payload: {
              email:user.email,
              token:idTokenResult.token
           }
         });
       }
     })
     return () => unsubscribe();
   }, [])

  return (
    <>
    <Header />
    <ToastContainer />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot/password" component={ForgotPassword} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/register/complete" component={RegisterComplete} />
      <Route exact path="/" component={Home} />
    </Switch>
    </>
  );
}

export default App;