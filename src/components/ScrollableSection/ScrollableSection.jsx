import React from "react";
import {
  Animator,
  batch,
  ScrollContainer,
  ScrollPage,
  Sticky,
  Fade,
  FadeIn,
  ZoomIn,
  FadeOut,
  Move,
  StickyOut, MoveOut,
} from "react-scroll-motion";
import styles from "./ScrollableSection.module.css";
import { useTranslation } from "react-i18next";
import  "../../i18n";

const ScrollableSection = () => {
      const { t } = useTranslation();
  return (
      <div className={styles.animation_block}>
        <ScrollContainer>
          <ScrollPage className={`${styles.animation} ${styles.zero_animation}`}>
            <Animator animation={MoveOut(0, -1000)}>
              <h2>{t('scrollableSection.section1')} </h2>
            </Animator>
          </ScrollPage>
          <ScrollPage className={`${styles.animation} ${styles.first_animation}`}>
            <Animator animation={batch(Sticky(), Fade(), Move())}>
              <h2>{t('scrollableSection.section2')}</h2>
            </Animator>
          </ScrollPage>
          <ScrollPage className={`${styles.animation} ${styles.second_animation}`}>
            <Animator animation={batch(Sticky(), FadeIn(), ZoomIn(), Move(0, -200))}>
              <h2>{t('scrollableSection.section3')}</h2>
            </Animator>
          </ScrollPage>
          <ScrollPage className={styles.animation}>
            <Animator
              className={styles.third_animation}
              animation={batch(StickyOut(), FadeOut(), Move(0, -200))}>
              <h2>{t('scrollableSection.section4')}</h2>
            </Animator>
          </ScrollPage>
        </ScrollContainer>
      </div>
  );
};

export default ScrollableSection;