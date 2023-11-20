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
  StickyOut,
} from "react-scroll-motion";
import styles from "./ScrollableSection.module.css";

const ScrollableSection = () => {
  return (
    <div className={styles.animation_block}>
      <ScrollContainer>
        <ScrollPage className={`${styles.animation} ${styles.first_animation}`}>
          <Animator animation={batch(Sticky(), Fade(), Move())}>
            <h1>Unlock the Power of Weather Insights</h1>
          </Animator>
        </ScrollPage>
        <ScrollPage className={styles.animation}>
          <Animator
            animation={batch(Sticky(), FadeIn(), ZoomIn(), Move(0, -200))}>
            <h1>Powered by TUMO Labs</h1>
          </Animator>
        </ScrollPage>
        <ScrollPage className={styles.animation}>
          <Animator
            className={styles.third_animation}
            animation={batch(StickyOut(), FadeOut(), Move(0, -200))}
          >
            <h1>Explore Climate Data</h1>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </div>
  );
};

export default ScrollableSection;
