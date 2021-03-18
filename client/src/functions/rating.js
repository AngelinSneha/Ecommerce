import React from 'react'
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
    if(p && p.ratings) {
        let ratingsArray = p && p.ratings
        console.log("ratingsArray",ratingsArray);
        let total = []
        let length = ratingsArray.length
        console.log("length",length);
        ratingsArray.map((r) => total.push(r.star))
        console.log("total",total)
        let totalReduce = total.reduce((p, n) => p+n, 0)
        console.log("totalReduce",totalReduce);
        let highest = length * 5;
        console.log("highest",highest);
        let totalResult = (totalReduce * 5)/highest;
        console.log("totalResult",totalResult);

        return (
            <div className="pt-3">
                <span>
                    <StarRating starDimension="20px" starSpacing="2px" editing={false} starRatedColor="red" rating={totalResult} />{" "}({length})
                </span>
            </div>
        )
    }
}
