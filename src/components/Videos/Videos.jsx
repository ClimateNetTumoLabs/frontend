import React, {useState} from "react";
import styles from "./Videos.module.css";
import { useTranslation } from "react-i18next";
import Loader from "react-js-loader";

function VideoItem({ src, onLoad }) {
    return (
        <iframe
            width="426"
            height="240"
            src={src}
            title="YouTube video player"
            allowFullScreen
            onLoad={onLoad}
        />
    );
}

function Videos() {
    const { t } = useTranslation();
    const [loadedVideos, setLoadedVideos] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const videoUrls = [
        "https://www.youtube.com/embed/N49blz2DgQs",
        "https://www.youtube.com/embed/dxPIET6XfwY",
        "https://www.youtube.com/embed/ZcX6-r9DRKQ",
        "https://www.youtube.com/embed/S3IDfitBtuA",
        "https://www.youtube.com/embed/9SejlR-vPhY",
        "https://www.youtube.com/embed/YHpYE7WvYas",
        "https://www.youtube.com/embed/XIqDQbgPmSY",
    ];

    const handleVideoLoad = () => {
        setLoadedVideos(prev => {
            const newCount = prev + 1;
            if (newCount === videoUrls.length) {
                setIsLoading(false);
            }
            return newCount;
        });
    };

    return (
        <section id="videos" className={`container mb-2 col-sm-8 col-12 ${styles.section}`}>
            <h2 className={styles.subTitles}>{t("diy.tabs.asmtitle")}</h2>
            {isLoading && (
                <div className={styles.loader}>
                    <Loader
                        type="spinner"
                        bgColor="#FFFFFF"
                        color="#FFFFFF"
                        size={70}
                    />
                </div>
            )}
            <div className={styles.videos} style={{ display: isLoading ? 'none' : '' }}>
                {videoUrls.map((url, index) => (
                    <div key={index} className="col-md-6 col-12">
                        <VideoItem src={url} onLoad={handleVideoLoad} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Videos;