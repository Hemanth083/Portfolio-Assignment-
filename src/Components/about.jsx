import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import "./styles.css";
import { CSSTransition } from 'react-transition-group';

const About = () => {
    const [userData, setUserData] = useState(null);
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae");
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
        window.scrollTo(0, 0);

    }, []); // Run once on mount to fetch user data

    useEffect(() => {
        // Set interval for changing Carousel index if userData and services are available
        if (userData && userData.user && userData.user.services) {
            const interval = setInterval(() => {
                setCurrentServiceIndex(prevIndex => (prevIndex + 1) % userData.user.services.length);
            }, 2300); // Change the duration as needed

            return () => clearInterval(interval);
        }
    }, [userData]); // Run whenever userData changes

    return (
        <div style={{ height: "2200px" }} className={`fade-in-left ${userData ? 'show' : ''}`}>
            <div className="d-flex flex-row about">
                {userData && userData.user && userData.user.about && (
                    <div className="bg-dark text-white Image-Container d-flex align-items-center about-Container justify-content-center flex-row w-100">
                        <div className="w-50 h-100 cropped-image-container d-flex align-items-center justify-content-center">
                            <img className="img-fluid mainImage" width="100%" height="auto" src={userData.user.about.avatar.url} alt="Avatar" />
                        </div>
                        <div className="about-content w-50 h-50 d-flex align-items-center justify-content-center">
                            <div className="w-75 d-flex align-items-start justify-content-start flex-column">
                                <p className="text-secondary modal-title paragraph">{userData.user.about.title}</p>
                                <h1 className="display-1 Name">{userData.user.about.name}</h1>
                                <p className="text-secondary paragraph">{userData.user.about.description}</p>
                                <div className="social-media justify-content-between align-items-center d-flex mt-3">
                                    {userData.user.social_handles && userData.user.social_handles.map((social, index) => (
                                        <div className="Social-images" key={index}>
                                            <img className="MediaImage" width="45px" src={social.image.url} alt={`Social Image ${index}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="WhatIDo w-100 bg-white  d-flex align-items-center flex-column justify-content-top pt-5">
                <h1 className="heading text-start w-75 border-bottom Wahat">What <span className="I">I</span> Do</h1>
                {userData && userData.user && userData.user.services && (
                    <Carousel
                        className='carousel-container mb-5 ' // Apply CSS class for styling
                        interval={null} // Disable automatic sliding
                        activeIndex={currentServiceIndex}
                        onSelect={() => { }}>
                        {userData.user.services.map((service, index) => (
                            <Carousel.Item key={index}>
                                <div className="w-10 h-25  service-container">
                                    <img className='ImageServices' src={service.image.url} alt={`Service Image ${index}`} />
                                    <div className="service-overlay w-100 h-100  d-flex">
                                        <div className='w-75 h-75 d-flex justify-content-between  flex-column  '>
                                            <h2>{service.name}</h2>
                                            <p>{service.desc}</p>
                                            <p>Cost : {service.charge}</p>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}
                <div className='d-flex flex-column align-items-center bg-dark  justify-content-center w-100'>
                    <h1 className="heading text-start w-75 border-bottom mt-5 text-white ">Testimonials</h1>
                    {userData && userData.user && userData.user.testimonials && userData.user.testimonials.map((person, index) => (
                        <div className='d-flex w-75  mb-4 mt-5 align-items-center justify-content-between testimonials ' key={index}>
                            <img src={person.image.url} width='250px' alt={`Testimonial Image ${index}`} />
                            <p className='TestimonialText' style={{ width: "70%" }}>{person.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
