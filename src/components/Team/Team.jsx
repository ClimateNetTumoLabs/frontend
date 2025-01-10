import React, { useEffect, useState } from "react";
import styles from './Team.module.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { Helmet } from "react-helmet"; // Import React Helmet

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1600 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 1600, min: 1024 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
};

const Team = () => {
    const { i18n } = useTranslation(); // Get i18n instance for current language
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        fetch('/api/teamMember/')
            .then(response => response.json())
            .then(data => setTeamMembers(data))
            .catch(error => console.error('Error fetching team members:', error));
    }, []);

    // Determine the Open Graph meta information for the first team member
    const ogImageUrl = teamMembers.length > 0 && teamMembers[0].image ? teamMembers[0].image : 'https://your-default-image-url.com/default-image.jpg';
    const ogTitle = "Our Team"; // You can also fetch this from your backend if needed
    const ogDescription = "Meet our talented team members.";

    return (
        <div className={styles.team_section}>
            {/* React Helmet for Dynamic Meta Injection */}
         

            <Carousel
                responsive={responsive}
                autoPlaySpeed={4000}
                autoPlay={true}
                keyBoardControl={true}
                customTransition="all 700ms"
                containerClass="team-member-carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                infinite={true}
                showDots={true}
                dotListClass="team_member_dot_section"
                itemClass="carousel-item-padding-40-px"
            >
                {teamMembers.map((member) => (
                    <div key={member.generated_id} className={styles.team_item}>
                        <div className={styles.team_member_image_block}>
                            <div className={styles.img_container}>
                                {member.image && (
                                    
                                    <>
                                    <Helmet>
                                        <meta property="og:title" content={ogTitle} />
                                        <meta property="og:description" content={ogDescription} />
                                        <meta property="og:image" content={'htpps://climatenet.am' +  member.image ?? ''} />
                                        <meta property="og:image:width" content="425" />
                                        <meta property="og:image:height" content="425" />
                                    </Helmet>
                                    <img loading="lazy" src={member.image} alt={member.name} />
                                    </>
                                )}
                            </div>
                            <div className={styles.icon_section}>
                                {member.github_link && (
                                    <a href={member.github_link} target="_blank" rel="noreferrer">
                                        <i className={`fab fa-github icon ${styles.hovicon} ${styles.effect}`}></i>
                                    </a>
                                )}
                                {member.linkedin_link && (
                                    <a href={member.linkedin_link} target="_blank" rel="noreferrer">
                                        <i className={`fab fa-linkedin icon ${styles.hovicon} ${styles.effect}`}></i>
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className={styles.info}>
                            <h3>{member[i18n.language === 'hy' ? 'name_hy' : 'name_en']}</h3>
                            <p>{member[i18n.language === 'hy' ? 'position_hy' : 'position_en']}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Team;
