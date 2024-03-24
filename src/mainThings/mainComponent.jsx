import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import "./mainComponent.css"; // Import your CSS file with NavButtons styles
import About from '../Components/about';
import Resume from '../Components/resume';
import Projects from '../Components/project';
import axios from 'axios';
import Skills from '../Components/skills';
import Contact from '../Components/contact';
import menu from '../assets/menu.svg';

function MainComponent() {
    const [currentPage, setCurrentPage] = useState("About");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showMenu, setShowMenu] = useState(false); // State to control menu visibility

    const handleNavClick = (page) => {
        setCurrentPage(page);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
        // You can add additional logic here to toggle background color if needed
    };

    useEffect(() => {
        axios.get("https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae")
            .then(response => {
                // Set the fetched data
                setData(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(error => {
                // Set error state if request fails
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className=" d-flex flex-row mainContainer">
            <Navbar className="flex-column align-items-center justify-content-center nav fixed-top" bg="dark" variant="dark">
                {data && data.user && data.user.about && (
                    <img src={data.user.about.avatar.url} className='rounded-5 logo' width="70px" height="auto" alt="" />
                )}

                <Nav className="d-flex w-100 justify-content-center align-items-center links flex-column h-75 ">
                    <Nav.Link onClick={() => handleNavClick('About')} className={`NavButtons ${currentPage === 'About' ? 'active' : ''}`} href="#about">About</Nav.Link>
                    <Nav.Link onClick={() => handleNavClick('Resume')} className='NavButtons' href="#resume">Resume</Nav.Link>
                    <Nav.Link onClick={() => { handleNavClick('Project') }} className='NavButtons' href="#projects">Projects</Nav.Link>
                    <Nav.Link onClick={() => { handleNavClick("Skills") }} className='NavButtons' href="#skills">Skills</Nav.Link>
                    <Nav.Link onClick={() => { handleNavClick("Contact") }} className='NavButtons' href="#contact">Contact</Nav.Link>
                </Nav>

            </Navbar>

            {/* Menu Content */}
            {showMenu && (
                <div className="menu-content">
                    {/* Close Button */}
                    <button className="close-button" onClick={() => setShowMenu(false)}>
                        &times;
                    </button>
                    {/* Menu Items */}
                    <div className="menu-items">
                        <Nav.Link onClick={() => handleNavClick('About')} className={`NavButtons ${currentPage === 'About' ? 'active' : ''}`} href="#about">About</Nav.Link>
                        <Nav.Link onClick={() => handleNavClick('Resume')} className={`NavButtons ${currentPage === 'Resume' ? 'active' : ''}`} href="#resume">Resume</Nav.Link>
                        <Nav.Link onClick={() => handleNavClick('Projects')} className={`NavButtons ${currentPage === 'Projects' ? 'active' : ''}`} href="#projects">Projects</Nav.Link>
                        <Nav.Link onClick={() => handleNavClick('Skills')} className={`NavButtons ${currentPage === 'Skills' ? 'active' : ''}`} href="#skills">Skills</Nav.Link>
                        <Nav.Link onClick={() => handleNavClick('Contact')} className={`NavButtons ${currentPage === 'Contact' ? 'active' : ''}`} href="#contact">Contact</Nav.Link>
                    </div>
                </div>
            )}

            <div className='Content'>
                {currentPage === "About" && <About userData={data} />}
                {currentPage === "Resume" && <Resume useData={data} />}
                {currentPage === "Project" && <Projects useData={data} />}
                {currentPage === "Skills" && <Skills useData={data} />}
                {currentPage === "Contact" && <Contact useData={data} />}
            </div>

            {/* Menu Icon */}
            <img src={menu} alt="Menu" className="menu-icon" onClick={() => setShowMenu(!showMenu)} />

        </div>
    );
}

export default MainComponent;
