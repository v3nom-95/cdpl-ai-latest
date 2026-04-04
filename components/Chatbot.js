"use client";
import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { products } from '../app/products/productData';
import Link from 'next/link';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ 
        role: 'bot', 
        text: "Welcome to CDPL Intelligence. How can I assist you with our autonomous technology today?"
      }]);
    }
  }, [messages.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const processQuery = (query) => {
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      let actionObj = null;
      let productCard = null;
      const lowerInput = query.toLowerCase();
      
      let foundProductKey = null;
      let foundProduct = null;
      
      for (const [key, prod] of Object.entries(products)) {
        if (lowerInput.includes(key.toLowerCase()) || lowerInput.includes(prod.name.toLowerCase()) || (prod.nickname && lowerInput.includes(prod.nickname.toLowerCase()))) {
          foundProductKey = key;
          foundProduct = prod;
          break;
        }
      }

      if (lowerInput.includes('raven')) {
          botResponse = `RAVEN is our high-fidelity MAS Simulator utilized for advanced pilot training.`;
          actionObj = { type: 'link', label: 'Contact on WhatsApp', href: 'https://wa.me/919494949698', external: true };
      } else if (foundProduct) {
        botResponse = `I found detailed specifications for the ${foundProduct.name} platform:`;
        productCard = {
            name: foundProduct.name,
            tagline: foundProduct.tagline,
            description: foundProduct.description,
            image: foundProduct.galleryImages?.[0] || '',
            link: `/products/${foundProductKey}`
        };
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botResponse = "Hello! I can help you find information about our autonomous systems like BARD, STINGER, or HORIZON-VTOL. What are you looking for?";
      } else if (lowerInput.includes('contact') || lowerInput.includes('support')) {
        botResponse = `Please reach out to our team on WhatsApp for custom configurations, mission specs, or enterprise inquiries.`;
        actionObj = { type: 'link', label: 'Chat on WhatsApp', href: 'https://wa.me/919494949698', external: true };
      } else {
        botResponse = "I couldn't locate specific details for that query. Would you prefer to speak directly with our team on WhatsApp?";
        actionObj = { type: 'link', label: 'Chat on WhatsApp', href: 'https://wa.me/919494949698', external: true };
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse, action: actionObj, productCard }]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    processQuery(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const quickActions = ["Tell me about BARD", "STINGER Interceptor", "Contact Us"];

  return (
    <div className={`premium-chat-wrapper ${isOpen ? 'active' : ''}`}>
      {isOpen && (
        <div className="premium-chat-window">
            <div className="premium-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src="/images/cdplfav.png" alt="CDPL Header Logo" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'contain', padding: '2px', backgroundColor: 'transparent', border: 'none' }} />
                  <div>
                    <h3 className="premium-header-title">CDPL Assistant</h3>
                    <div className="premium-header-status">
                      <span className="status-dot"></span> Online
                    </div>
                  </div>
                </div>
                <button className="premium-close" onClick={toggleChat} aria-label="Close chat">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            
            <div className="premium-messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`premium-msg-row ${msg.role}`}>
                        {msg.role === 'bot' && (
                            <div className="bot-avatar">
                                <img src="/images/cdplfav.png" alt="CDPL Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', padding: '2px', backgroundColor: 'transparent' }} />
                            </div>
                        )}
                        <div className={`premium-msg-bubble ${msg.role}`}>
                            <div className="premium-msg-text">{msg.text}</div>
                            
                            {msg.productCard && (
                                <div className="bot-product-card">
                                    {msg.productCard.image && (
                                        <img src={msg.productCard.image} alt={msg.productCard.name} className="bot-product-image" />
                                    )}
                                    <div className="bot-product-info">
                                        <h4>{msg.productCard.name}</h4>
                                        <span className="bot-product-tagline">{msg.productCard.tagline}</span>
                                        <p>{msg.productCard.description}</p>
                                        <Link href={msg.productCard.link} className="bot-product-link">
                                            Explore Platform →
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {msg.action && (
                                msg.action.external ? (
                                    <a href={msg.action.href} target="_blank" rel="noopener noreferrer" className="bot-action-btn">
                                        {msg.action.label}
                                    </a>
                                ) : (
                                    <Link href={msg.action.href} className="bot-action-btn">
                                        {msg.action.label}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="premium-msg-row bot">
                        <div className="bot-avatar">
                            <img src="/images/cdplfav.png" alt="CDPL" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', padding: '2px', backgroundColor: 'transparent' }} />
                        </div>
                        <div className="premium-msg-bubble bot typing-bubble">
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="premium-quick-actions">
                {quickActions.map(action => (
                    <button key={action} className="premium-chip" onClick={() => processQuery(action)}>
                        {action}
                    </button>
                ))}
            </div>

            <div className="premium-inputbox">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about our autonomous systems..."
                />
                <button onClick={handleSend} className="premium-send-btn" disabled={!input.trim()}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
      )}

      <button className="premium-toggle" onClick={toggleChat} aria-label="Toggle chat">
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <path d="M8 9h8"></path>
                <path d="M8 13h6"></path>
            </svg>
          )}
      </button>
    </div>
  );
}
