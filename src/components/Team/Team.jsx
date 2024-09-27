import React, {useEffect, useState} from "react";
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
    const [teamMember, setTeamMember] = useState([]);

    useEffect(() => {
        fetch('/api/teamMember/')
            .then(response => response.json())
            .then(data => setTeamMember(data))
            .catch(error => console.error('Error fetching team members:', error));
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
                {teamMember.map((teamMember) => (
                    <div key={teamMember.generated_id} className={styles.team_item}>
                        <div className={styles.team_member_image_block}>
                            <div className={styles.img_container}>
                                {teamMember.image && (
                                    <img loading="lazy" src={teamMember.image} alt={teamMember.name}/>
                                )}
                            </div>
                            <div className={styles.icon_section}>
                            {teamMember.github_link && (
                                <a href={teamMember.github_link} target="_blank" rel="noreferrer">
                                    <i className={`fab fa-github icon ${styles.hovicon} ${styles.effect}`}></i>
                                </a>
                            )}
                            {teamMember.linkedin_link && (
                                <a href={teamMember.linkedin_link} target="_blank" rel="noreferrer">
                                    <i className={`fab fa-linkedin icon ${styles.hovicon} ${styles.effect}`}></i>
                                </a>
                            )}
                            </div>
                        </div>
                        <div className={styles.info}>
                            <h3>{teamMember.name}</h3>
                            <p>{teamMember.position}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default Team;
