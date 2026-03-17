'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './News.css';

const newsData = [
    {
        id: 1,
        title: "2026 UMEX",
        image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "DEFEXPO 2026",
        image: "https://images.unsplash.com/photo-1563539745-f0ea9fbcebaf?w=1200&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "AERO INDIA NEXT",
        image: "https://images.unsplash.com/photo-1559685936-e04f4460f488?w=1200&auto=format&fit=crop"
    }
];

export default function News() {
    return (
        <section id="news" className="news-section">
            <div className="news-header-container">
                <h2 className="news-title">NEWS</h2>
                <div className="news-line"></div>
            </div>

            <div className="swiper-section-wrapper">
                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={1.5}
                    centeredSlides={true}
                    spaceBetween={50}
                    loop={true}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    pagination={{ 
                        el: '.news-pagination', 
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + ' custom-bullet"></span>';
                        }
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.1,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 1.5,
                            spaceBetween: 40
                        },
                        1024: {
                            slidesPerView: 1.8,
                            spaceBetween: 50
                        }
                    }}
                    className="news-swiper"
                >
                    {newsData.map((item) => (
                        <SwiperSlide key={item.id} className="news-slide">
                            {({ isActive }) => (
                                <div className={`slide-content ${isActive ? 'active-slide' : ''}`}>
                                    <div className="image-wrapper">
                                        <div 
                                            className="news-image bg-cover" 
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                    </div>
                                    <div className="slide-card">
                                        <h3>{item.title}</h3>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}

                    <div className="swiper-button-prev-custom">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="swiper-button-next-custom">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                </Swiper>
                <div className="pagination-container">
                    <div className="news-pagination"></div>
                </div>
            </div>
        </section>
    );
}
