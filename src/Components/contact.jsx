import React, { useEffect, useState } from 'react';
import './project.css';
import { Form, Button } from 'react-bootstrap';

const Contact = ({ useData }) => {
    const [animationTriggered, setAnimationTriggered] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Trigger the animation after a delay to ensure the component is mounted
        const animationTimeout = setTimeout(() => {
            setAnimationTriggered(true);
        }, 100);
        // Clear the timeout on component unmount
        return () => clearTimeout(animationTimeout);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div style={{ height: '100vh' }} className={`w-100 bg-dark d-flex align-items-center flex-column justify-content-start slide-in-left ${animationTriggered ? 'show' : ''}`}>
            <div style={{ width: '80%' }}>
                <h1 className='header mt-5 mb-5 border-bottom'>Contact</h1>
                {useData && useData.user && useData.user.about && (
                    <div className={`d-flex align-items-center justify-content-between mb-5 ${menuOpen ? 'menu-open' : ''} AlignCOntact  flex-row`}>
                        <div className='d-flex  flex-column'>
                            <h3 className='header'>Phone Number:</h3>
                            <p style={{ color: "salmon" }}>{useData.user.about.phoneNumber}</p>
                        </div>
                        <div className='d-flex flex-column'>
                            <h3 className='header'>Address:</h3>
                            <p style={{ color: "salmon" }}>{useData.user.about.address}</p>
                        </div>
                        <div className='d-flex flex-column'>
                            <h3 className='header'>Email:</h3>
                            <p style={{ color: "salmon" }}>{useData.user.email}</p>
                        </div>
                    </div>
                )}
            </div>
            <Form style={{ width: '80%' }}>
                <div className={`d-flex flex-row w-100 ${menuOpen ? 'menu-open' : ''}`}>
                    <div className='w-50 mr-4'>
                        <Form.Group controlId="formFullName">
                            <Form.Control required className='mb-4 inputfield' type="text" placeholder="Full Name" />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Control required className='mb-4 t inputfield' type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group controlId="formSubject">
                            <Form.Control required className="mb-5 inputfield" type="text" placeholder="Subject" />
                        </Form.Group>
                        <Button
                            style={{
                                background: "transparent",
                                borderRadius: "0px",
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                borderTop: "2px solid salmon",
                                borderBottom: "2px solid salmon",
                                borderLeft: "2px solid transparent",
                                borderRight: "2px solid transparent"
                            }}
                            variant="primary"
                            type="submit"
                            className='button  text-secondary '
                        >
                            Send Message
                        </Button>
                    </div>
                    <div className='w-50'>
                        <Form.Group controlId="formMessage">
                            <Form.Control as="textarea" rows={6} placeholder="Enter your message" className='inputfield' />
                        </Form.Group>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default Contact;
