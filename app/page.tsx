import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCategories from '../components/ProductCategories';
import GlobeMap from '../components/GlobeMap';
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
                    <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Our Reach</h2>
                    <GlobeMap height={620} showTitle={false} />
                </div>
            </section>
            <PhotoGallery />
            <News />
            <Testimonials />
            <Footer />
        </>
    );
}
