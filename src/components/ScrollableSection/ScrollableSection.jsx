import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Element, scroller } from 'react-scroll';
import { debounce } from "lodash"

const ScrollableSection = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const lastScrollPositionRef = useRef(window.pageYOffset || document.documentElement.scrollTop);
  const [animationSectionInView, setAnimationSectionInView] = useState(true);

  const handleScroll = useCallback(debounce((event) => {

    const animationSection = sectionRef.current;
    const rect = animationSection.getBoundingClientRect();
    const elementHeight = rect.bottom - rect.top;
    const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0 && (rect.bottom - rect.top) >= (elementHeight);
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const newScrollDirection = currentScrollPosition <= lastScrollPositionRef.current ? 'up' : 'down';
    const bottomVisible = rect.bottom < window.innerHeight;
    
    setAnimationSectionInView(isVisible);
    
    if (bottomVisible && newScrollDirection === 'down') {
      return;
    }
    
    if (!isVisible ) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    if (newScrollDirection === 'down') {
      const container3Bottom = document.getElementById('container-3')?.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;
      const offset = container3Bottom - viewportHeight;

      scroller.scrollTo('container-3', {
        duration: 1,
        delay: 0,
        smooth: true,
        offset: offset,
      });
    } else if (newScrollDirection === 'up') {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    lastScrollPositionRef.current = currentScrollPosition;
  }, 100), []);

  useEffect(() => {
    const handleScrollMemoized = handleScroll;

    window.addEventListener("scroll", handleScrollMemoized, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScrollMemoized);
    };
  }, [handleScroll]);

  

  return (
    <div ref={sectionRef}>
      <div className={styles.animation_block}>
        <ScrollContainer ref={containerRef}>
          <Element name="container-0">
            <ScrollPage className={`${styles.animation} ${styles.zero_animation}`}>
              <Animator
                animation={Move(0, -1000,)}
                className={styles.customAnimation}
              >
                <h1>
                  A pioneering hyper-local, student-led climate observatory. Our mission is to empower the next generation and raise awareness through real-time data tracking, all while making a significant contribution to mitigating climate change. We're dedicated to advocating for climate action beyond borders, because the challenges we face are global in nature.
                </h1>
              </Animator>
            </ScrollPage>
          </Element>
          <Element name="container-1">
            <ScrollPage className={`${styles.animation} ${styles.first_animation}`}>
              <Animator
                animation={batch(
                  Sticky(),
                  Fade(),
                  Move()
                )}
              >
                <h1>Unlock the Power of Weather Insights</h1>
              </Animator>
            </ScrollPage>
          </Element>
          <Element name="container-2">
            <ScrollPage className={styles.animation} id="container-2">
              <Animator
                animation={batch(
                  Sticky(),
                  FadeIn(),
                  ZoomIn(
                    {
                      from: {
                        transform: 'scale(0)',
                      },
                      to: {
                        transform: 'scale(1)',
                      },
                      transition: {
                        duration: 0.5,
                        ease: 'ease-in-out',
                      },
                    }
                  ),
                  Move(0, -200)
                )}
              >
                <h1>Powered by TUMO Labs</h1>
              </Animator>
            </ScrollPage>
          </Element>
          <Element name="container-3">
            <ScrollPage className={styles.animation} duration={100} id="container-3">
              <Animator
                className={styles.third_animation}
                animation={batch(
                  StickyOut(),
                  FadeOut(),
                  Move(0, -200)
                )}
              >
                <h1>Explore Climate Data</h1>
              </Animator>
            </ScrollPage>
          </Element>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default ScrollableSection;