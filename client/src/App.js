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
import {currentUser} from "./functions/auth"
import {useDispatch} from "react-redux";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoutes";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(async (user) => {
       if(user) {
         const idTokenResult = await user.getIdTokenResult();
          console.log("user", user);
          currentUser(idTokenResult.token)
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
              }
          )
          .catch(err => console.log(err));
       }
     })
     return () => unsubscribe();
   }, [dispatch])

  return (
    <>
    <Header />
    <ToastContainer />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot/password" component={ForgotPassword} />
      <Route exact path="/register" component={Register} />
      <UserRoute exact path="/user/history" component={History} />
      <UserRoute exact path="/user/password" component={Password} />
      <UserRoute exact path="/user/wishlist" component={Wishlist} />
      <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      <AdminRoute exact path="/admin/category" component={CategoryCreate} />
      <Route exact path="/register/complete" component={RegisterComplete} />
      <Route exact path="/" component={Home} />
    </Switch>
    </>
  );
}

export default App;