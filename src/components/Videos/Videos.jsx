import React from 'react';
import styles from './Videos.module.css';
import { useTranslation } from "react-i18next";

function VideoItem({ src }) {
    return (
        <iframe
            width="426"
            height="240"
            src={src}
            title="YouTube video player"
            allowFullScreen
        />
    );
}

function Videos() {
    const { t } = useTranslation();
    const videoUrls = [
        "https://www.youtube.com/embed/VuWNqQF1fgs",
        "https://www.youtube.com/embed/dhRydUGKB5U",
        "https://www.youtube.com/embed/PDk8alIMWOw",
        "https://www.youtube.com/embed/q6xyRU-Ux-g",
        "https://www.youtube.com/embed/Zfda9yZjapE",
        "https://www.youtube.com/embed/EeiyPYogiG0"
    ];

    return (
        <section id="videos" className={`container mb-2 col-md-8 col-12 ${styles.section}`}>
            <h2 className={styles.subTitles}>{t('diy.tabs.asmtitle')}</h2>
            <div className={styles.videos}>
                {videoUrls.map((url, index) => (
                    <VideoItem key={index} src={url} />
                ))}
            </div>
        </section>
    );
}

export default Videos;
