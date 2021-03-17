import  React, {useEffect, useState} from 'react'
import Jumbotron from '../components/cards/Jumbotron';
import CategoryList from '../components/category/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import SubList from '../components/sub/SubList';

function Home() {
    
    return (
        <div>
            <div className="jumbotron display-3 text-danger font-weight-bold text-center" style={{backgroundColor:'#eff8ff'}}>
                <Jumbotron text={['The Sale Has Just Started!', 'All Top Brands at Low Cost!', 'Just for You!']} />
            </div>
            <NewArrivals />
            <BestSellers />
            <CategoryList />
            <SubList />
        </div>
    )
}

export default Home
