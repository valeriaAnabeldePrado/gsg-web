import React from "react";
import EmblaCarousel from "./embla-carousel";
import "./embla.css";

const Carousel = () => {
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return <EmblaCarousel slides={SLIDES} options={OPTIONS} />;
};

export default Carousel;
