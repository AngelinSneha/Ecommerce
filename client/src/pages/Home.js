import  React, {useEffect, useState} from 'react'
import CarouselHome from '../components/cards/CarouselHome';
import Jumbotron from '../components/cards/Jumbotron';
import MultipleCarousel from '../components/cards/MultipleCarousel';
import CategoryList from '../components/category/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import SubList from '../components/sub/SubList';

function Home() {
    
    return (
        <div>
            <div className="m-5 display-3 text-danger font-weight-bold text-center" style={{backgroundColor:'white'}}>
                <Jumbotron text={['The Sale Has Just Started!', 'All Top Brands at Low Cost!', 'Just for You!']} />
            </div>
            <CarouselHome />
            <NewArrivals />
            <BestSellers />
            <MultipleCarousel />
            <CategoryList />
            <SubList />
        </div>
    )
}

export default Home
