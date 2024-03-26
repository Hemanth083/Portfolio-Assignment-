import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown, Modal } from 'react-bootstrap'; // Assuming you are using react-bootstrap
import "./project.css";
import Resume from './resume';

const Projects = ({ useData }) => {
    const [animationTriggered, setAnimationTriggered] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [uniqueTechStacks, setUniqueTechStacks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const animationTimeout = setTimeout(() => {
            setAnimationTriggered(true);
        }, 100);
        // Clear the timeout on component unmount
        return () => clearTimeout(animationTimeout);
    }, []);

    useEffect(() => {
        if (useData && useData.user && useData.user.projects) {
            const techStacks = useData.user.projects.reduce((stacks, project) => {
                project.techStack.forEach(tech => {
                    const existingStackIndex = stacks.findIndex(item => item.tech === tech);
                    if (existingStackIndex !== -1) {
                        stacks[existingStackIndex].count++;
                    } else {
                        stacks.push({ tech, count: 1 });
                    }
                });
                return stacks;
            }, []);
            setUniqueTechStacks(techStacks);
        }
    }, [useData]);

    const filterProjectsByTech = (tech) => {
        if (useData && useData.user && useData.user.projects) {
            const filtered = useData.user.projects.filter(project =>
                project.techStack.includes(tech)
            );
            setFilteredProjects(filtered);
        }
    };

    const resetFilter = () => {
        setFilteredProjects([]);
    };

    const openModal = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProject(null);
    };

    return (
        <div style={{ height: "auto" }} className={`slide-in-left ${animationTriggered ? 'show' : ''}`}>
            <div className="w-100 bg-dark p-5 d-flex flex-column align-items-center justify-content-center">
                <Container>
                    <h1 className="header border-bottom mb-5">Projects</h1>
                    <div className="mb-3  w-100 d-flex align-items-center  justify-content-center  flex-row  pt-4  pb-4  ">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="  bg-transparent  border-light   custom-dropdown-toggle">
                                Filter by Technology
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="custom-dropdown-menu bg-white ">
                                {uniqueTechStacks.map((stack, index) => (
                                    <Dropdown.Item key={index} onClick={() => filterProjectsByTech(stack.tech)}>
                                        {`${stack.tech} (${stack.count})`}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button onClick={resetFilter} type="button" className="ms-4 bg-transparent  border-light  custom-button">Reset</Button>
                    </div>
                    <Row>
                        {(
                            (filteredProjects.length > 0 ? filteredProjects : (useData && useData.user && useData.user.projects) ? useData.user.projects : [])
                                .slice()
                                .reverse()
                                .map((project, index) => (
                                    <Col key={index} md={6} className="mb-4">
                                        <div className="curser project-image-container h-75" onClick={() => openModal(project)}>
                                            <img className="img-fluid project-image" src={project.image.url} alt={`Project ${index}`} />
                                        </div>
                                        <div className="h-25 pt-3 pl-3 bg-black rounded-3 opacity-50">
                                            <p className="header">{project.techStack.join(', ')}</p>
                                            <h1 className="header">{project.title}</h1>
                                        </div>
                                    </Col>
                                ))
                        )}
                    </Row>

                </Container>
            </div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProject && selectedProject.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className=' bg-dark d-flex w-100 align-items-center  justify-content-center  flex-column '>
                    {selectedProject && (
                        <>
                            <img width='70%' src={selectedProject.image.url}></img>
                            <p className=' mt-4  text-white'>Tech Stack: {selectedProject.techStack.join(', ')}</p>
                            {/* <p className='text-white'>Link: <a href={selectedProject.liveurl} rel="noopener noreferrer">{}</a></p> */}
                            <p style={{ textAlign: "justify" }} className=' w-100 text-white'>{selectedProject.description}</p>
                            <button style={{ borderBottom: "2px solid salmon", borderTop: "2px solid salmon", borderLeft: "2px solid transparent", borderRight: "2px solid transparent" }} className='button w-25  bg-transparent  text-white  '>Live</button>

                        </>
                    )}
                </Modal.Body>

            </Modal>
        </div>
    );
};

export default Projects;
