import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>CDPL</h3>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">Company Overview</Link></li>
                        <li><Link href="/about#leadership">Leadership</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><Link href="/resources">Resources</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Products</h3>
                    <ul>
                        <li><Link href="/products">All Products</Link></li>
                        <li><Link href="/mas">Major Aerospace Systems (MAS)</Link></li>
                        <li><Link href="/mms">Major Marine Systems (MMS)</Link></li>
                        <li><Link href="/mgs">Major Ground Systems (MGS)</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><a href="tel:+91 9494949698">+91 9494949698</a></li>
                        <li><a href="mailto:info@cdpl.ai">info@cdpl.ai</a></li>
                        <li></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li><Link href="/#privacy">Privacy Policy</Link></li>
                        <li><Link href="/#terms">Terms of Service</Link></li>
                    </ul>
                </div>

                <div className="copyright">
                    <p>&copy; {currentYear} Chakravyuh Dynamics Pvt Ltd. | Air · Sea · Land Autonomy.</p>
                </div>
            </div>
        </footer>
    );
};
