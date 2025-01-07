import React, { Component } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";

const getTouches = (evt) => {
  return evt.touches || evt.originalEvent.touches;
};

export default class Example extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    enableSwipe: true,
    config: config.molasses,
  };

  slides = [
    {
      key: 1,
      content: (
        <img
          src="https://images-in-website.s3.us-east-1.amazonaws.com/Banner/box_and_device.png"
          alt="1"
          style={{ width: "90%", height: "500px", objectFit: "cover" }}
        />
      ),
    },
    {
      key: 2,
      content: (
        <img
          src="https://images-in-website.s3.us-east-1.amazonaws.com/Banner/tumo_koghb.jpeg"
          alt="2"
          style={{ width: "90%", height: "500px", objectFit: "cover" }}
        />
      ),
    },
    {
      key: 3,
      content: (
        <img
          src="https://picsum.photos/600/803/?random"
          alt="3"
          style={{ width: "90%", height: "500px", objectFit: "cover" }}
        />
      ),
    },
  ].map((slide, index) => {
    return { ...slide, onClick: () => this.setState({ goToSlide: index }) };
  });

  componentDidMount() {
    this.autoplayInterval = setInterval(() => {
      this.setState((prevState) => ({
        goToSlide: (prevState.goToSlide + 1) % this.slides.length,
      }));
    }, 3000); // Change slide every 3 seconds
  }

  componentWillUnmount() {
    clearInterval(this.autoplayInterval);
  }

  handleTouchStart = (evt) => {
    if (!this.state.enableSwipe) return;

    const firstTouch = getTouches(evt)[0];
    this.setState({ xDown: firstTouch.clientX, yDown: firstTouch.clientY });
  };

  handleTouchMove = (evt) => {
    if (!this.state.enableSwipe || (!this.state.xDown && !this.state.yDown)) return;

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.state.xDown - xUp;
    let yDiff = this.state.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        this.setState({ goToSlide: this.state.goToSlide + 1, xDown: null, yDown: null });
      } else {
        this.setState({ goToSlide: this.state.goToSlide - 1, xDown: null, yDown: null });
      }
    }
  };

  render() {
    return (
      <div
        style={{ width: "100%", height: "500px", margin: "0 auto" }}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
      >
        <Carousel
          slides={this.slides}
          goToSlide={this.state.goToSlide}
          offsetRadius={this.state.offsetRadius}
          showNavigation={false}
          animationConfig={this.state.config}
         
        />
      </div>
    );
  }
}
