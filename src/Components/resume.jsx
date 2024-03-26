import "./resume.css";
import { ProgressBar, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';

const Resume = () => {
    const [userData, setUserData] = useState(null);
    const [animationTriggered, setAnimationTriggered] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae");
                setUserData(response.data);
                setAnimationTriggered(true);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
        // window.scrollTo(0, 0);

    }, []);

    const formatYear = (year) => {
        // Extract only the date part
        return year.substring(0, 10);
    };

    return (
        <div className={`h-100 slide-in-left ${animationTriggered ? 'show' : ''}`}>
            <div className="w-100 h-100 pt-3 d-flex align-items-start gap-5  resumeAlign justify-content-center bg-dark">
                <div style={{ width: "60%" }} className="d-flex resumeElemennt align-items-start justify-content-start flex-column">
                    <h1 className="w-75 mb-5 border-bottom text-secondary heading">Education</h1>
                    <div className="w-100 d-flex align-items-center justify-content-center flex-column education w-75">
                        {userData && userData.user && userData.user.timeline && userData.user.timeline.map((item, index) => {
                            if (item.forEducation) {
                                return (
                                    <div className={`bg-black width mt-3 ${index % 2 === 0 ? 'bg-opacity-25' : 'bg-opacity-50'} p-4`} key={index}>
                                        <h2 className="header fs-5">{item.company_name} ({formatYear(item.startDate)}, {formatYear(item.endDate)})</h2>
                                        <h3 className="header fs-1">{item.jobTitle}</h3>
                                        <p className="header text-secondary">{item.summary}</p>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <h1 className="w-75 mb-5 mt-5  border-bottom text-secondary heading">Experience</h1>
                    <div className="w-100 d-flex align-items-center justify-content-center flex-column education w-75">
                        {/* Fetch and display experience data using a timeline component */}
                        {userData && userData.user && userData.user.timeline && userData.user.timeline.map((item, index) => {
                            if (!item.forEducation) {
                                return (
                                    <div className={`bg-black width mt-3 ${index % 2 === 0 ? 'bg-opacity-50' : 'bg-opacity-25'} p-4`} key={index}>
                                        <h2 className="header fs-5">{item.company_name} ({formatYear(item.startDate)}, {formatYear(item.endDate)})</h2>
                                        <h3 className="header fs-1">{item.jobTitle}</h3>
                                        <p className="header text-secondary">{item.summary}</p>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                </div>
                <div style={{ width: '30%' }} className="resumeSkills">
                    <h2 className="header resumeSkills mb-5 border-bottom h-100 text-start">Skills</h2>
                    {userData && userData.user && userData.user.skills && userData.user.skills.map((skill, index) => (
                        <div key={index} className="d-flex align-items-start flex-column w-100 justify-content-center">
                            <p style={{ marginBottom: "0" }} className="header">{skill.name}</p>
                            <ProgressBar
                                className="w-100 mb-3 salmon-progress-bar"
                                key={index}
                                now={skill.percentage}
                                label={`${skill.percentage}%`}
                            />
                        </div>
                    ))}
                </div>

            </div>
            <div className=" w-100 text-center bg-dark  ">
                <Button type="text" className="  bg-danger border-dark mt-5 downloadCV">Download CV</Button>
            </div>
        </div>
    );
};

export default Resume;
