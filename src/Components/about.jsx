import { useState, useEffect } from 'react';
import myImage from '../assets/myImage.jpg';
import './styles.css';
import gitLogo from "../assets/gitHubLogo.png";
import linked from "../assets/linked.webp";
import x from "../assets/x.webp";
import insta from '../assets/insta.webp';
import webDev from '../assets/images.png';

const localData = {
    user: {
        about: {
            phoneNumber: '123-456-7890',
            address: '123 Main St, Anytown, USA',
        },
        email: 'example@example.com',
        social_handles: [
            { image: { url: gitLogo }, link: 'https://github.com/hemanth083' },
            {
                image: { url: insta }, link: 'https://www.instagram.com/_____.hemanth._____/'
            },
            { image: { url: x }, link: 'https://x.com/Hemanth__N' },
            { image: { url: linked }, link: 'https://www.linkedin.com/in/hemanth-n-45b165278/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
        ],
        services: [
            { image: { url: webDev }, name: 'Front-End development', desc: 'I build applications', charge: '$100' },
        ],
    },
};

const About = () => {
    const [userData, setUserData] = useState(localData);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ height: 'auto' }} className={`fade-in-left ${userData ? 'show' : ''}`}>
            <div className="d-flex flex-row about">
                {userData && userData.user && userData.user.about && (
                    <div className="bg-dark text-white Image-Container d-flex align-items-center about-Container justify-content-center flex-row w-100">
                        <div className="w-50 h-100 cropped-image-container d-flex align-items-center justify-content-center">
                            <img className="img-fluid mainImage" width="100%" height="auto" src={myImage} alt="Avatar" />
                        </div>
                        <div className="about-content w-50 h-50 d-flex align-items-center justify-content-center">
                            <div className="w-75 d-flex align-items-start justify-content-start flex-column">
                                <p className="text-secondary modal-title paragraph">Front-end developer</p>
                                <h1 className="display-1 Name">Hemanth</h1>
                                <p className="text-secondary paragraph">
                                    I am Hemanth, a frontend web developer skilled in HTML, CSS, JavaScript, and React with proficiency in state management using Redux. I specialize in building responsive websites with visually appealing designs. With expertise in JavaScript frameworks, particularly React and Redux, I excel in creating dynamic and interactive web applications. I take pride in consistently exceeding client expectations with my exceptional frontend development abilities.
                                </p>
                                <div className="social-media justify-content-between align-items-center d-flex mt-3">
                                    {userData.user.social_handles.map((social, index) => (
                                        <div className="Social-images z-3" key={index}>
                                            <a href={social.link} target="_blank" rel="noopener noreferrer">
                                                <img className="MediaImage" width="20px" height="auto" src={social.image.url} alt={`Social Image ${index}`} />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="WhatIDo w-100 bg-white d-flex align-items-center flex-column justify-content-top pt-5">
                <div className="d-flex flex-column pb-5 align-items-center bg-dark justify-content-center w-100">
                    <h1 className="heading text-start bg-white p-3 w-75 border-bottom Wahat">What <span className="I">I</span> Do</h1>
                    {userData && userData.user && userData.user.services && userData.user.services.map((service, index) => (
                        <div className="d-flex w-75 mb-4 mt-5 align-items-center justify-content-between flex-row Services-animation" key={index}>
                            <div>
                                <img src={service.image.url} width="250px" alt={`Service Image ${index}`} />
                            </div>
                            <div style={{ width: '100%' }} className="d-flex h-100 align-items-center justify-content-center flex-column">
                                <p className="TestimonialText w-75">{service.name}</p>
                                <p className="TestimonialText text-secondary w-75">{service.desc}</p>
                                <p className="TestimonialText text-secondary w-75">{service.charge}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
