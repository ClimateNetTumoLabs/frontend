import React from 'react';
import styles from './Videos.module.css';

function Videos() {
    return (
    <section id="videos" className={styles.section}>
        <h2 className={styles.subTitles}>Videos of Assembling</h2>
        <div className={styles.videos}>
          <iframe
            width="426"
            height="240"
            src="https://www.youtube.com/embed/EeiyPYogiG0"
            title="YouTube video player"
            allowFullScreen>
          </iframe>
          <iframe
            width="426"
            height="240"
            src="https://www.youtube.com/embed/EeiyPYogiG0"
            title="YouTube video player"
            allowFullScreen>
          </iframe>
          <iframe
            width="426"
            height="240"
            src="https://www.youtube.com/embed/EeiyPYogiG0"
            title="YouTube video player"
            allowFullScreen>
          </iframe>
          <iframe
            width="426"
            height="240"
            src="https://www.youtube.com/embed/EeiyPYogiG0"
            title="YouTube video player"
            allowFullScreen>
          </iframe>
          <iframe
            width="426"
            height="240"
            src="https://www.youtube.com/embed/EeiyPYogiG0"
            title="YouTube video player"
            allowFullScreen>
          </iframe>
          <iframe
            width="426"
            height="240"
            src="https://www.youtube.com/embed/EeiyPYogiG0"
            title="YouTube video player"
            allowFullScreen>
          </iframe>
        </div>
      </section>
      )
    }

export default Videos;
