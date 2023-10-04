import React from "react";
import {
  Animator,
  batch,
  MoveOut,
  ScrollContainer,
  ScrollPage,
  Sticky,
  Fade,
  StickyIn,
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
        <ScrollPage className={styles.animation}>
          <Animator animation={batch(Sticky(), Fade(), Move())}>
            <h1>Unlock the Power of Weather Insights</h1>
          </Animator>
        </ScrollPage>
        <ScrollPage className={styles.animation}>
          <Animator
            animation={batch(Sticky(), FadeIn(), ZoomIn(), Move(0, -200))}
          >
            <h1>Tumo Labs</h1>
          </Animator>
        </ScrollPage>
        <ScrollPage className={styles.animation}>
          <Animator
            className={styles.third_animation}
            animation={batch(StickyOut(), FadeOut(), Move())}
          >
            <h1>Get Ready to Explore Weather in a Whole New Way</h1>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </div>
  );
};

export default ScrollableSection;
