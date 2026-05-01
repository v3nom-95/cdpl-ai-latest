import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" style={{ background: '#fff', padding: '100px 0 50px', borderTop: '1px solid #f0f0f0' }}>
            <div className="container footer-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="footer-section">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '2rem', color: '#000' }}>CDPL</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1.2rem' }}><Link href="/" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>Home</Link></li>
                        <li style={{ marginBottom: '1.2rem' }}><Link href="/about" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>Company Overview</Link></li>
                        <li style={{ marginBottom: '1.2rem' }}><Link href="/about#leadership" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>Leadership</Link></li>
                        <li style={{ marginBottom: '1.2rem' }}><Link href="/contact" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>Contact</Link></li>
                        <li style={{ marginBottom: '1.2rem' }}><Link href="/resources" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>Resources</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '2rem', color: '#000' }}>PRODUCTS</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1.2rem' }}><Link href="/mas" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>Major Aerospace Systems (MAS)</Link></li>
                        <li style={{ marginBottom: '1.2rem' }}><Link href="/mms" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>Major Marine Systems (MMS)</Link></li>
                        <li style={{ marginBottom: '1.2rem' }}><Link href="/mgs" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>Major Ground Systems (MGS)</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '2rem', color: '#000' }}>CONTACT US</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1.2rem' }}><a href="tel:+919494949698" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>+91 9494949698</a></li>
                        <li style={{ marginBottom: '1.2rem' }}><a href="mailto:info@cdpl.ai" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>info@cdpl.ai</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '2rem', color: '#000' }}>LEGAL</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1.2rem' }}><Link href="/privacy-policy" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>Privacy Policy</Link></li>
                        <li style={{ marginBottom: '1.2rem' }}><Link href="/terms-of-service" style={{ color: '#666', fontSize: '0.95rem', textDecoration: 'none' }}>Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className="copyright" style={{ marginTop: '5rem', textAlign: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '30px' }}>
                <p style={{ color: '#999', fontSize: '0.85rem' }}>© {currentYear} Chakravyuha Dynamics Pvt Ltd. | Air · Sea · Land Autonomy.</p>
            </div>
        </footer>
    );
}
