'use client';

import React, { useState } from 'react';

export default function ProductRequest({ productName }) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('TRANSMITTING...');
        
        const formData = new FormData(e.target);
        formData.append("access_key", "21d20e0a-b1c6-4345-ba1e-95bb42b5b932");
        formData.append("subject", `New Product Request: ${productName}`);
        formData.append("product_requested", productName);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                setStatus('SUCCESS: REQUEST_SENT');
                setTimeout(() => setStatus(''), 5000);
                setIsOpen(false);
                e.target.reset();
            } else {
                console.error("Submission Error", result);
                setStatus('FAILED: RETRY_LATER');
            }
        } catch (error) {
            console.error("Network Error", error);
            setStatus('NETWORK_ERROR');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="product-request-wrapper" style={{ position: 'relative', display: 'inline-block', zIndex: 100 }}>
            <div className="dropdown" style={{ position: 'relative' }}>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="btn btn-primary"
                    style={{ 
                        minWidth: '280px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '1.2rem 2rem',
                        fontSize: '0.85rem',
                        fontWeight: '800',
                        letterSpacing: '1px',
                        borderRadius: '4px'
                    }}
                >
                    REQUEST QUOTATION / INFO
                    <span style={{ marginLeft: '1rem', transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                </button>

                {isOpen && (
                    <div className="dropdown-panel" style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        minWidth: '320px',
                        background: '#fff',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.25)',
                        zIndex: 1000,
                        padding: '2.5rem',
                        marginTop: '1rem',
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        animation: 'slideDown 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}>
                        <h4 style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', marginBottom: '1.5rem', letterSpacing: '2px', fontFamily: 'var(--font-mono)' }}>[ RFQ_SUBMISSION ]</h4>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <select name="requestType" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', background: '#f8fafc', fontWeight: 'bold', fontSize: '0.85rem' }}>
                                <option value="quotation">Request Quotation</option>
                                <option value="document">Request / Download Document</option>
                            </select>
                            <input type="text" name="name" placeholder="NAME" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                            <input type="email" name="email" placeholder="EMAIL ID" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                            <input type="tel" name="phone" placeholder="PHONE NUMBER" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '1rem', opacity: isSubmitting ? 0.7 : 1 }}>
                                {isSubmitting ? 'TRANSMITTING...' : 'SEND REQUEST'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
            {status && (
                <div style={{ 
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '100%',
                    padding: '1rem',
                    background: status.includes('FAILED') || status.includes('ERROR') ? '#e11d48' : 'var(--accent-primary)',
                    color: status.includes('FAILED') || status.includes('ERROR') ? '#fff' : '#000',
                    fontWeight: '800',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    textAlign: 'center',
                    borderRadius: '4px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}>
                    [ {status} ]
                </div>
            )}

            <style jsx>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
