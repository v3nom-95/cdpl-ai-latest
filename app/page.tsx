'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCategories from '../components/ProductCategories';
import DeploymentMap from '../components/DeploymentMap';
import Footer from '../components/Footer';
import News from '../components/News';
import PhotoGallery from '../components/PhotoGallery';
import Testimonials from '../components/Testimonials';

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <ProductCategories />
            <section style={{ padding: '80px 0', background: '#fff' }}>
                <div className="container">
                    <DeploymentMap />
                </div>
            </section>
            <PhotoGallery />
            <News />
            <Testimonials />
            <Footer />
        </>
    );
}
