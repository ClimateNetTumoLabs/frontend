import React from "react";
import styles from './Team.module.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import erikImage from '../../assets/images/team_members/erik.png';
import hovoImage from '../../assets/images/team_members/hovo.png';
import marinaImage from '../../assets/images/team_members/marina.png';
import arsenImage from '../../assets/images/team_members/arsen.png';
import vaheImage from '../../assets/images/team_members/vahe.png';

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

const list_of_members = {
    "1" : {
        "Name": "Erik",
        "Social": [
            { "icon": "fa-github", "link": "https://github.com/eriktumosaryan" },
            { "icon": " fa-linkedin", "link": "https://www.linkedin.com/in/erik-saryan-88383a169/" }
        ],
        "Position": "IoT Specialist",
        "Image" : erikImage
    },
    "2" : {
        "Name": "Hovhannes",
        "Social": [
            { "icon": "fa-github", "link": "facebook-hov" },
            { "icon": " fa-linkedin", "link": "instagram-hov" }
        ],
        "Position": "Software Engineer",
        "Image" : hovoImage
    },
    "3" : {
        "Name": "Marina",
        "Social": [
            { "icon": "fa-github", "link": "facebook-hov" },
            { "icon": " fa-linkedin", "link": "instagram-hov" }
        ],
        "Position": "Backend Developer",
        "Image" : marinaImage
    },
    "4" : {
        "Name": "Arsen",
        "Social": [
            { "icon": "fa-github", "link": "facebook-hov" },
            { "icon": " fa-linkedin", "link": "instagram-hov" }
        ],
        "Position": "DevOps",
        "Image" : arsenImage
    },
    "5" : {
        "Name": "Vahe",
        "Social": [
            { "icon": "fa-github", "link": "facebook-hov" },
            { "icon": " fa-linkedin", "link": "instagram-hov" }
        ],
        "Position": "FronEnd Developer",
        "Image" : vaheImage
    }
}

const Team = () => {
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
                {Object.keys(list_of_members).map((key, index) => (
                    <div key={key} className={styles.team_item}>
                         <div className={styles.team_member_image_block}>
                             <div className={styles.img_container}>
                                 <img src={list_of_members[key].Image} alt={list_of_members[key].Name} />
                             </div>
                             <div className={styles.icon_section}>
                                 {list_of_members[key].Social.map((socialItem, item) => (
                                     <a href={socialItem.link}>
                                         <i key={socialItem.icon} className={`fab ${socialItem.icon.toLowerCase()} icon ${styles.hovicon} ${styles.effect}`}></i>
                                     </a>
                                 ))}
                             </div>
                         </div>
                        <div className={styles.info}>
                            <h3>{list_of_members[key].Name}</h3>
                            <p>{list_of_members[key].Position}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default Team