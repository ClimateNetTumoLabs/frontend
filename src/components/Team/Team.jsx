import React from "react";
import styles from './Team.module.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import hovoImage from '../../assets/TeamMembers/hovo.png';
import marinaImage from '../../assets/TeamMembers/marina.png';
import arsenImage from '../../assets/TeamMembers/arsen.png';
import vaheImage from '../../assets/TeamMembers/vahe.png';
import sonaImage from '../../assets/TeamMembers/sona.png';
import sofiImage from '../../assets/TeamMembers/sofi.png';
import karenImage from '../../assets/TeamMembers/karen.png';
import arevikImage from '../../assets/TeamMembers/arevik.png';
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

    const list_of_members = {
        "2" : {
            "Name": t('teamMembers.2.name'),
            "Social": [
                { "icon": "fa-github", "link": "https://github.com/ApinHovo" },
                { "icon": " fa-linkedin", "link": "https://www.linkedin.com/in/hovhannes-apinyan/" }
            ],
            "Position": t('teamMembers.2.position'),
            "Image" : hovoImage
        },
        "7" : {
            "Name": t('teamMembers.6.name'),
            "Social": [
                { "icon": "fa-github", "link": "https://github.com/Ssofi1a" },
                { "icon": " fa-linkedin", "link": "https://www.linkedin.com/in/sofi-abovyan-a9557025a" }
            ],
            "Position": t('teamMembers.6.position'),
            "Image" : sofiImage
        },
        "8" : {
            "Name": t('teamMembers.3.name'),
            "Social": [
                { "icon": "fa-github", "link": "https://github.com/M-Marina4" },
                { "icon": " fa-linkedin", "link": "https://www.linkedin.com/in/marina-melkonyan-650586245/" }
            ],
            "Position": t('teamMembers.3.position'),
            "Image" : marinaImage
        },
        "5" : {
            "Name": t('teamMembers.7.name'),
            "Social": [
                { "icon": "fa-github", "link": "https://github.com/sarzumanyan" },
                { "icon": " fa-linkedin", "link": "https://www.linkedin.com/in/sona-arzumanyan-857517273/" }
            ],
            "Position": t('teamMembers.7.position'),
            "Image" : sonaImage
        },
        "4" : {
            "Name": t('teamMembers.4.name'),
            "Social": [
                { "icon": "fa-github", "link": "https://github.com/Arsen-1" },
                { "icon": " fa-linkedin", "link": "https://www.linkedin.com/in/arsen-gevorgyan-a650671a8/" }
            ],
            "Position": t('teamMembers.4.position'),
            "Image" : arsenImage
        },
        "9" : {
            "Name": t('teamMembers.8.name'),
            "Social": [
                { "icon": "fa-github", "link": "https://github.com/KarenDanielyan" },
                { "icon": " fa-linkedin", "link": "https://www.linkedin.com/in/karen-danielyan-723812124/" }
            ],
            "Position": t('teamMembers.8.position'),
            "Image" : karenImage
        },
        "6" : {
            "Name": t('teamMembers.5.name'),
            "Social": [
                { "icon": "fa-github", "link": "https://github.com/vahkhachatryan" },
                { "icon": " fa-linkedin", "link": "https://www.linkedin.com/in/vahe-khachatryan-711a2823a/" }
            ],
            "Position": t('teamMembers.5.position'),
            "Image" : vaheImage
        },
        "3" : {
            "Name": t('teamMembers.9.name'),
            "Social": [
                { "icon": "fa-github", "link": "https://github.com/areviksol" },
                { "icon": " fa-linkedin", "link": "https://www.linkedin.com/in/arevik-mkrtchyan-b2b979223/" }
            ],
            "Position": t('teamMembers.9.position'),
            "Image" : arevikImage
        }
    }

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
                                 <img loading="lazy" src={list_of_members[key].Image} alt={list_of_members[key].Name} />
                             </div>
                             <div className={styles.icon_section}>
                                 {list_of_members[key].Social.map((socialItem) => (
                                     <a key={socialItem.icon} href={socialItem.link} target="_blank" rel="noreferrer">
                                         <i className={`fab ${socialItem.icon.toLowerCase()} icon ${styles.hovicon} ${styles.effect}`}></i>
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

export default Team;
