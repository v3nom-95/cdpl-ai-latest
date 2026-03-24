'use client';

import React, { useState } from 'react';

export default function ProductRequest({ productName }) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            product: productName,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            requestType: formData.get('requestType')
        };
        
        console.log('Sending request to info@cdpl.ai:', data);
        setStatus('SUBMITTED');
        setTimeout(() => setStatus(''), 3000);
        setIsOpen(false);
    };

    return (
        <div className="product-request-wrapper">
            <div className="dropdown" style={{ position: 'relative' }}>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="btn btn-primary"
                    style={{ minWidth: '280px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    REQUEST INFO / QUOTE
                    <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                </button>

                {isOpen && (
                    <div className="dropdown-panel" style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        background: '#fff',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                        zIndex: 1000,
                        padding: '2rem',
                        marginTop: '0.5rem',
                        border: '1px solid #f1f5f9'
                    }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <select name="requestType" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', background: '#f8fafc', fontWeight: 'bold' }}>
                                <option value="quotation">Request Quotation</option>
                                <option value="document">Request / Download Document</option>
                            </select>
                            <input type="text" name="name" placeholder="FULL NAME" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                            <input type="email" name="email" placeholder="EMAIL ADDRESS" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                            <input type="tel" name="phone" placeholder="PHONE NUMBER" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                                SUBMIT REQUEST
                            </button>
                        </form>
                    </div>
                )}
            </div>
            {status === 'SUBMITTED' && (
                <div style={{ marginTop: '1rem', color: 'var(--accent-primary)', fontWeight: 'bold', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    [ SYSTEM_STATUS: REQUEST_SENT_TO_INFO@CDPL.AI ]
                </div>
            )}
        </div>
    );
}
