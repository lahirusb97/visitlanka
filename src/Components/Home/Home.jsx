import React, { useState, useRef, useEffect } from "react";
import HeroSlider, { Slide, ButtonsNav, Overlay, Nav } from "hero-slider";
import banner from "../../assets/Hero/banner.jpg";
import banner1 from "../../assets/Hero/banner1.jpg";
import banner2 from "../../assets/Hero/banner2.jpg";
import homepin from "../../assets/Icons/homepin.svg";
import hotel from "../../assets/Icons/hotel.svg";
import local_taxi from "../../assets/Icons/local_taxi.svg";
import Populer from "./Populer";
import Servicess from "./Servicess";
import { TextField } from "@mui/material";
import Aboutlk from "./Aboutlk";
import Footer from "../Footer";
import Button from "@mui/material/Button";

export default function Home() {
  const refSearch = useRef(null);
  const [search, setSearch] = useState("");

  const mainSearch = () => {
    if (search.length > 0) {
    }
    refSearch.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {}, []);

  return (
    <div>
      <HeroSlider
        height={"60vh"}
        autoplay
        controller={{
          initialSlide: 1,
          slidingDuration: 500,
          slidingDelay: 100,

          onBeforeSliding: (previousSlide, nextSlide) =>
            console.debug(
              "onBeforeSliding(previousSlide, nextSlide): ",
              previousSlide,
              nextSlide
            ),
          onAfterSliding: (nextSlide) =>
            console.debug("onAfterSliding(nextSlide): ", nextSlide),
        }}
      >
        <Overlay>
          <div className="flex w-full h-full justify-center items-center text-center">
            <div>
              <h1 className="text-4xl md:text-8xl font-bold text-white">
                Welcome to Sri Lanka
              </h1>
              <h3 className="text-2xl md:text-4xl text-white py-4">
                What is Your destination?
              </h3>
              <div className="flex justify-center">
                <TextField
                  id="filled-basic"
                  label="Enter District"
                  variant="filled"
                  style={{ background: "white", width: "300px" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  onClick={mainSearch}
                  className="bg-mpurple px-6 py-3 font-semibold text-white "
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </Overlay>
        <Slide>
          <div className="relative">
            <img src={banner} className="object-cover bg-center w-full" />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
          </div>
        </Slide>
        <Slide>
          <div className="relative">
            <img src={banner1} className="object-cover bg-center w-full" />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
          </div>
        </Slide>
        <Slide>
          <div className="relative">
            <img src={banner2} className="object-cover bg-center w-full" />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
          </div>
        </Slide>
        <Nav />
      </HeroSlider>
      <div className="bg-bggray flex items-center justify-center px-4 flex-wrap ">
        <div className="flex items-center ">
          <img src={homepin} className="w-16 mx-2" />
          <div>
            <h1 className="font-bold text-xl">7000+ DESTINATIONS</h1>
            <p className="font-semibold text-lg text-textgray">
              300,000 Sights, Attractions, Events & Activities
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <img src={local_taxi} className="w-16 mx-2" />
          <div>
            <h1 className="font-bold text-xl">7000+ DESTINATIONS</h1>
            <p className="font-semibold text-lg text-textgray">
              300,000 Sights, Attraction s, Events & Activities
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <img src={hotel} className="w-16 mx-2" />
          <div>
            <h1 className="font-bold text-xl">7000+ DESTINATIONS</h1>
            <p className="font-semibold text-lg text-textgray">
              300,000 Sights, Attractions, Events & Activities
            </p>
          </div>
        </div>
      </div>
      <Populer />
      <div ref={refSearch}>
        <Servicess searchKey={search} search={search} setSearch={setSearch} />
      </div>
      <Aboutlk />
      <input className="flex justify-center m-8" placeholder="name" />
      <Footer />
    </div>
  );
}
