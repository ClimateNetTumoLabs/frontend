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
        "https://www.youtube.com/embed/N49blz2DgQs",
        "https://www.youtube.com/embed/dxPIET6XfwY",
        "https://www.youtube.com/embed/ZcX6-r9DRKQ",
        "https://www.youtube.com/embed/S3IDfitBtuA",
        "https://www.youtube.com/embed/9SejlR-vPhY",
        "https://www.youtube.com/embed/YHpYE7WvYas",
        "https://www.youtube.com/embed/XIqDQbgPmSY"
    ];

    return (
        <section id="videos" className={`container mb-2 col-sm-8 col-12 ${styles.section}`}>
            <h2 className={styles.subTitles}>{t('diy.tabs.asmtitle')}</h2>
            <div className={styles.videos}>
                {videoUrls.map((url, index) => (
                    <div className={'col-md-6 col-12'}>
                        <VideoItem  key={index} src={url} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Videos;
