'use client';

import React from 'react';

const testimonials = [
  {
    name: "Lt. Gen. Vikram Singh (Retd)",
    organization: "Defense Strategy Hub",
    feedback: "The BARD system is a force multiplier on the tactical edge. The modularity and software-defined autonomy provide unparalleled flexibility for multi-domain missions."
  },
  {
    name: "Rajesh Khanna",
    organization: "National Disaster Response Force (NDRF)",
    feedback: "Chakravyuha Dynamics' systems were instrumental during the recent coastal mapping. Their drone endurance and clear HD feed enabled rapid coordination."
  },
  {
    name: "Anand Malik",
    organization: "Logistics Partner",
    feedback: "Exceptional engineering and dedicated support. The HORIZON VTOL has transformed our long-range surveillance efficiency across difficult terrains."
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials-section bg-dark-soft">
      <div className="container">
        <h2 className="section-title">Voices From The Field</h2>
        <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginTop: '4rem' }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <span className="quote-mark">"</span>
              <p className="feedback-text">{t.feedback}</p>
              <div className="client-info">
                {t.organization && <span className="client-org">{t.organization}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .testimonial-card {
          padding: 3rem 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          transition: all 0.3s ease;
        }
        .testimonial-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--accent-primary);
          transform: translateY(-5px);
        }
        .quote-mark {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 3rem;
          color: var(--accent-primary);
          opacity: 0.3;
          font-family: serif;
        }
        .feedback-text {
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        .client-info {
          display: flex;
          flex-direction: column;
        }
        .client-name {
          font-weight: 700;
          color: #fff;
          font-size: 1rem;
        }
        .client-org {
          font-size: 0.8rem;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 0.2rem;
        }
      `}</style>
    </section>
  );
}
