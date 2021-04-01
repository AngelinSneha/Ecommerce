import React, {useState, useEffect} from 'react'
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { Card } from 'antd';
import laptop from "../../images/laptop.jpg";

function Wishlist() {
    const [wishlist, setwishlist] = useState([])
    const {user, cart} = useSelector(state => ({...state}) );
    const dispatch = useDispatch();

    useEffect(() => {
        loadWishlist()
    }, []);

    const loadWishlist = () => {
        getWishlist(user.token).then((res) => {
            console.log(res);
            setwishlist(res.data.wishlist)
        }).catch((err) => ("error while loading the wishlist", err))
    }

    const handleRemove = (productId) => {
        removeWishlist(productId, user.token).then(res => {
            loadWishlist();
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
            <div>
            <UserNav name="wishlist" />
            </div>
                <div className="col">
                    <h3 className="text-center p-5">Your Wishlist</h3>
                    {wishlist.map(p => (
                        <div key={p._id} className="pb-3">
                                <Card hoverable={true} >
                                <Link to={`/product/${p.slug}`}>
                                <img className="p-1" style={{height:"5rem",width:"auto" ,objectFit:"cover"}} src={p.images && p.images.length? p.images[0].url : laptop} />
                                <span style={{marginLeft:"2rem", color:"black"}} className="h5">{p.title} - Rs {p.price}</span>{"\n"}
                                </Link>
                                <span onClick={() => handleRemove(p._id)} className="float-right text-danger mt-4">Remove from Wishlist</span>
                                </Card>
                        </div>
                    ))}
                </div>
                <hr />
            </div>
        </div>
    )
}

export default Wishlist
