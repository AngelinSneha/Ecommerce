import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";

function LoadingToRedirect() {
    const [count, setCount] = useState(5);
    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(()=> {
            setCount((currentCount) => --currentCount);
        }, 1000);
        count === 0 && history.push("/");
        return () => {
            clearInterval(interval);
        }
    }, [count, history])

    return (
        <div className="container p-5 text-center">
            <h1 className="text-danger">Kindly login to access this page</h1>
            <h3>Redirecting you in {count} seconds...</h3>
        </div>
    )
}

export default LoadingToRedirect;
