import React from "react";
import HeroSlider, { Slide, ButtonsNav, Nav, Overlay } from "hero-slider";

export default function HeroSection() {
  return (
    <div>
      <HeroSlider
        orientation="horizontal"
        initialSlide={1}
        onBeforeChange={(previousSlide, nextSlide) =>
          console.log("onBeforeChange", previousSlide, nextSlide)
        }
        onChange={(nextSlide) => console.log("onChange", nextSlide)}
        onAfterChange={(nextSlide) => console.log("onAfterChange", nextSlide)}
        style={{
          backgroundColor: "#000",
        }}
        settings={{
          slidingDuration: 500,
          slidingDelay: 100,
          shouldAutoplay: true,
          shouldDisplayButtons: true,
          autoplayDuration: 5000,
          height: "50vh",
        }}
      ></HeroSlider>
    </div>
  );
}
