import React, { useEffect, useState } from 'react';
import './project.css';

const Skills = ({ useData }) => {
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
        <div className={`w-100  mb-5 d-flex align-items-center justify-content-center bg-dark slide-in-left ${animationTriggered ? 'show' : ''}`}>
            <div style={{ width: '80%' }}>
                <h1 className="header fs-1 pt-5 pd-5 border-bottom">Skills</h1>
                {useData && useData.user && useData.user.skills ? (
                    <div className="skills-container">
                        {useData.user.skills.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <img loading='lazy' src={skill.image.url} alt={`Skill ${index}`} />
                                <div className="skill-label w-100 h-100 text-center"><p className='header fs-3'>{skill.name}</p></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading skills...</p>
                )}
            </div>
        </div>
    );
};

export default Skills;
