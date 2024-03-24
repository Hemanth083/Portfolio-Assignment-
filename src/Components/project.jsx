import { Container, Row, Col } from 'react-bootstrap';
import "./project.css"
import { useState, useEffect } from 'react';

const Projects = ({ useData }) => {
    const [animationTriggered, setAnimationTriggered] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Trigger the animation after a delay to ensure the component is mounted
        const animationTimeout = setTimeout(() => {
            setAnimationTriggered(true);
        }, 100);
        // Clear the timeout on component unmount
        return () => clearTimeout(animationTimeout);
    }, []);

    return (
        <div style={{ height: "2200px" }} className={`slide-in-left ${animationTriggered ? 'show' : ''}`}>
            <div className="w-100 bg-dark p-5 d-flex flex-column align-items-center justify-content-center">
                <Container>
                    <h1 className="header border-bottom mb-5">Projects</h1>
                    <Row>
                        {useData && useData.user && useData.user.projects && useData.user.projects.map((project, index) => (
                            <Col key={index} md={6} className="mb-4">
                                <div className="curser project-image-container h-75">
                                    <img className="img-fluid project-image" src={project.image.url} alt={`Project ${index}`} />
                                </div>
                                <div className="h-25 pt-3 pl-3 bg-black rounded-3 opacity-50">
                                    <p className="header">Reactjs, Nextjs, Mern, CSS</p>
                                    <h1 className="header">{project.title}</h1>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Projects;
