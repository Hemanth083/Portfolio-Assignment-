import "./resume.css";
import { ProgressBar, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const Resume = ({ useData }) => {
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
        <div className={`slide-in-left ${animationTriggered ? 'show' : ''}`}>
            <div className="w-100 h-100 pt-5  d-flex align-items-start resumeAlign justify-content-center bg-dark">
                <div style={{ width: "60%" }} className="d-flex resumeElemennt align-items-start justify-content-start flex-column">
                    <h1 className="w-75 mb-5 border-bottom text-secondary heading">Education</h1>
                    <div className="d-flex align-items-center justify-content-center flex-column education w-75">
                        <div className="bg-black mt-3 bg-opacity-75 p-4">
                            <h2 className="header fs-5">AMC Engineering College (2020, 2024)</h2>
                            <h3 className="header fs-1">Computer Science</h3>
                            <p className="header text-secondary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates optio sapiente repudiandae sint non distinctio facere consequatur consequuntur doloribus quod amet, delectus dicta, quae fugiat, magnam vero dolores beatae reiciendis.</p>
                        </div>
                        <div className="bg-black bg-opacity-50 mt-3 p-4">
                            <h2 className="header fs-5">Oxford Engineering (2018, 2020)</h2>
                            <h3 className="header fs-1">2nd PUC</h3>
                            <p className="header text-secondary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates optio sapiente repudiandae sint non distinctio facere consequatur consequuntur doloribus quod amet, delectus dicta, quae fugiat, magnam vero dolores beatae reiciendis.</p>
                        </div>
                        <div className="bg-black mt-3 bg-opacity-25 p-4">
                            <h2 className="header fs-5">St'Miras High School (2010, 2018)</h2>
                            <h3 className="header fs-1">10th</h3>
                            <p className="header text-secondary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates optio sapiente repudiandae sint non distinctio facere consequatur consequuntur doloribus quod amet, delectus dicta, quae fugiat, magnam vero dolores beatae reiciendis.</p>
                        </div>
                    </div>
                    <Button type="text" className="bg-danger border-dark mt-5 downloadCV">Download CV</Button>
                </div>
                <div style={{ width: '30%' }} className="resumeSkills">
                    <h2 className="header resumeSkills mb-5 border-bottom h-100 text-start">Skills</h2>
                    {useData && useData.user && useData.user.skills && useData.user.skills.map((skill, index) => (
                        <div key={index} className="d-flex align-items-start flex-column w-100 justify-content-center">
                            <p style={{ marginBottom: "0" }} className="header">{skill.name}</p>
                            <ProgressBar className="w-100 mb-3" key={index} now={skill.percentage} label={`${skill.percentage}%`} variant='secondary' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resume;
