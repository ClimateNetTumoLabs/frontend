import React, { useState, useEffect } from "react";
import styles from './Team.module.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";
import "../../i18n";

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
    const { t } = useTranslation();
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetch('/api/participants/')
            .then(response => response.json())
            .then(data => setParticipants(data))
            .catch(error => console.error('Error fetching participants:', error));
    }, []);

    return (
        <div className={styles.team_section}>
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
                {participants.map((participant) => (
                    <div key={participant.id} className={styles.team_item}>
                         <div className={styles.team_member_image_block}>
                             <div className={styles.img_container}>
                                 {participant.image_url && (
                                     <img loading="lazy" src={participant.image_url} alt={participant.name} />
                                 )}
                             </div>
                             <div className={styles.icon_section}>
                                 {participant.github_link && (
                                     <a href={participant.github_link} target="_blank" rel="noreferrer">
                                         <i className={`fab fa-github icon ${styles.hovicon} ${styles.effect}`}></i>
                                     </a>
                                 )}
                                 {participant.linkedin_link && (
                                     <a href={participant.linkedin_link} target="_blank" rel="noreferrer">
                                         <i className={`fab fa-linkedin icon ${styles.hovicon} ${styles.effect}`}></i>
                                     </a>
                                 )}
                             </div>
                         </div>
                        <div className={styles.info}>
                            <h3>{participant.name}</h3>
                            <p>{participant.job}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default Team;
