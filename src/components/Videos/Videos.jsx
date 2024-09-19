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
        "https://www.youtube.com/embed/C0n0P9NOhfE",
        "https://www.youtube.com/embed/7zOt3_UaqwU",
        "https://www.youtube.com/embed/pW5IYh4hQFU",
        "https://www.youtube.com/embed/3kp3A7_Rvk4",
        "https://www.youtube.com/embed/IlhG887PGi8",
        "https://www.youtube.com/embed/m74jJkplO84",
        "https://www.youtube.com/embed/kCacM60Wsno"
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
