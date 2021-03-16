import React, { useEffect, useState } from "react";
import { getProduct, productStar, getRelated } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import BreadCrumbs from "../components/cards/BreadCrumbs";
import {useSelector} from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import LoadingCard from "../components/cards/LoadingCard";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;
  const {user} = useSelector((state) => ({...state}));

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });

    const onStarClick = (newRating, name) => {
      setStar(newRating);
      console.table(newRating, star);
      productStar(name, newRating, user.token).then((res) => {
        console.log("rating clicked", res.data);
        loadSingleProduct(); // if you want to show updated rating in real time
      }).catch((err) => console.log('error --->', err));
    };

  return (
    <div className="container-fluid">
    <BreadCrumbs product={product} />
      <div className="row pt-4">
        <SingleProduct product={product} star={star} onStarClick={onStarClick} />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
          {loading?(<LoadingCard count={3} />):(<div className="row">
                    {related && related.length ? (related.map((product) => (
                        <div key={product._id} className="col-md-4 mb-3">
                            <ProductCard product={product} />
                        </div>
                    ))):(<h6 className="text-center text-danger col" >Sorry, No Related Products found!</h6>)}
          </div>)}
          {/* {JSON.stringify(related)} */}
        </div>
      </div>
    </div>
  );
};

export default Product;
