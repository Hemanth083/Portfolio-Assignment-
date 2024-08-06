import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown, Modal } from 'react-bootstrap';
import "./project.css";
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"
import img5 from "../assets/img5.png"

const localData = {
    user: {
        projects: [
            {
                title: "NorthStar",
                techStack: ["React", "HTML", "JavaScipt", "CSS", "Redux"],
                image: { url: 'https://my-portfolio-mu-blond.vercel.app/assets/northstar.png' },
                description: "NoethStar is a React and Redux-driven cloth shopping site, provides a user-friendly interface with a diverse range of clothing items. Key features include a dynamic shopping cart, secure user authentication, and efficient state management with Redux. The platform ensures a responsive design for seamless browsing across devices, offering a modern and enjoyable shopping experience.",
                liveurl: "https://north-star-react-app.vercel.app/"
            },
            {
                title: "Maa Foundation",
                techStack: ["React", "JavaScipt", "CSS", "Tailwind CSS", "GitHub"],
                image: { url: img3 },
                description: "This project is built Women's Empowerment ",
                liveurl: "https://maa-foundation.vercel.app"
            },
            {
                title: "PokeWorld",
                techStack: ["React", "JavaScipt", "CSS", "Axios", "Bootstrap"],
                image: { url: img1 },
                description: "This Application is build to display a list of pokimons using pokiAPI",
                liveurl: "https://poke-world-delta.vercel.app/"
            },

            {
                title: "Recipe Book",
                techStack: ["React", "JavaScipt", "CSS", "Axios", "Bootstrap"],
                image: { url: img4 },
                description: "This Application is build to display a list of Recipes using RecipeAPI where we can search Recipes based on the dish name",
                liveurl: "https://recipe-book-amber.vercel.app/"
            },
            {
                title: "RomiFinance",
                techStack: ["CSS", "HTML"],
                image: { url: img2 },
                description: "A simple HTML and CSS project for finance",
                liveurl: "https://romi-finance-lyart.vercel.app/"
            },
            {
                title: "Old Portfolio",
                techStack: ["JavaScript", "CSS", "HTML"],
                image: { url: img5 },
                description: "This is my previous Portfolio where it's also responsive and user-friendly ",
                liveurl: "https://my-portfolio-mu-blond.vercel.app/"
            },
        ]
    }
};

const Projects = () => {
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
        return () => clearTimeout(animationTimeout);
    }, []);

    useEffect(() => {
        if (localData && localData.user && localData.user.projects) {
            const techStacks = localData.user.projects.reduce((stacks, project) => {
                project.techStack.forEach(tech => {
                    const existingStack = stacks.find(item => item.tech === tech);
                    if (existingStack) {
                        existingStack.count++;
                    } else {
                        stacks.push({ tech, count: 1 });
                    }
                });
                return stacks;
            }, []);
            setUniqueTechStacks(techStacks);
        }
    }, []);

    const filterProjectsByTech = (tech) => {
        if (localData && localData.user && localData.user.projects) {
            const filtered = localData.user.projects.filter(project =>
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
                    <div className="mb-3 w-100 d-flex align-items-center justify-content-center flex-row pt-4 pb-4">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="bg-transparent border-light custom-dropdown-toggle">
                                Filter by Technology
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="custom-dropdown-menu bg-white">
                                {uniqueTechStacks.map((stack, index) => (
                                    <Dropdown.Item key={index} onClick={() => filterProjectsByTech(stack.tech)}>
                                        {`${stack.tech} (${stack.count})`}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button onClick={resetFilter} type="button" className="ms-4 bg-transparent border-light custom-button">Reset</Button>
                    </div>
                    <Row>
                        {(
                            (filteredProjects.length > 0 ? filteredProjects : (localData && localData.user && localData.user.projects) ? localData.user.projects : [])
                                .reverse()
                                .map((project, index) => (
                                    <Col key={index} md={6} className="mb-5">
                                        <div className="curser project-image-container " style={{ height: "70%" }} onClick={() => openModal(project)}>
                                            <img className="img-fluid project-image" src={project.image.url} alt={`Project ${index}`} />
                                        </div>
                                        <div className=" h-25 pt-3 pl-3 pb-5 bg-black rounded-1 titlr opacity-50">
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
                <Modal.Body className='bg-dark d-flex w-100 align-items-center justify-content-center flex-column'>
                    {selectedProject && (
                        <>
                            <img width='70%' src={selectedProject.image.url} alt="Selected Project"></img>
                            <p className='mt-4 text-white'>Tech Stack: {selectedProject.techStack.join(', ')}</p>
                            <p style={{ textAlign: "justify" }} className='w-100 text-white'>{selectedProject.description}</p>
                            <a href={selectedProject.liveurl} className='button w-25 bg-transparent text-white text-center text-decoration-none' style={{ borderBottom: "2px solid salmon", borderTop: "2px solid salmon", borderLeft: "2px solid transparent", borderRight: "2px solid transparent" }} target="_blank" rel="noopener noreferrer">Live</a>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Projects;
