'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCategories from '../components/ProductCategories';
// import Resources from '../components/Resources';
import Footer from '../components/Footer';
import News from '../components/News';

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <ProductCategories />
            {/* <Resources /> */}
            <News />
            <Footer />
        </>
    );
}
