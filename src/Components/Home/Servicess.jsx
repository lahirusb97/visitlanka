import React, { useEffect, useState } from "react";
import central from "../../assets/ProvinceMap/Central_Province.svg";
import Eastern_Province from "../../assets/ProvinceMap/Eastern_Province.svg";
import North_Central from "../../assets/ProvinceMap/North_Central.svg";
import North_Western from "../../assets/ProvinceMap/North_Western.svg";
import Northern from "../../assets/ProvinceMap/Northern.svg";
import Sabaragamuwa from "../../assets/ProvinceMap/Sabaragamuwa.svg";
import Southern from "../../assets/ProvinceMap/Southern.svg";
import Uva from "../../assets/ProvinceMap/Uva.svg";
import Western_Province from "../../assets/ProvinceMap/Western_Province.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField } from "@mui/material";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import HotelCard from "../Services/HotelCard";
import LocationCard from "../Services/LocationCard";
import TaxiCard from "../Services/TaxiCard";
export default function Servicess({
  searchKey,

  search,
  setSearch,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [select, setSelect] = useState(0);
  const [value, setValue] = useState("Locations");
  // const [search, setSearch] = useState("");

  const [locationData, setLocationData] = useState([]);
  const [taxiData, setTaxiData] = useState([]);
  const [hotelsData, setHotelsData] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [filtertaxi, setFiltertaxi] = useState([]);
  const [filterHotel, setFilterHotel] = useState([]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: windowWidth > 1500 ? 9 : windowWidth > 600 ? 6 : 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const province = [
    {
      Name: "Central",
      Img: central,
    },
    {
      Name: "Eastern",
      Img: Eastern_Province,
    },
    {
      Name: "North Central",
      Img: North_Central,
    },
    {
      Name: "North Western",
      Img: North_Western,
    },
    {
      Name: "Northern",
      Img: Northern,
    },
    {
      Name: "Sabaragamuwa",
      Img: Sabaragamuwa,
    },
    {
      Name: "Southern",
      Img: Southern,
    },
    {
      Name: "Uva",
      Img: Uva,
    },
    {
      Name: "Western",
      Img: Western_Province,
    },
  ];

  useEffect(() => {
    if (search.length === 0) {
      const db = getFirestore();
      const collectionRef = collection(db, "Location");

      onSnapshot(collectionRef, (snapshot) => {
        const items = [];

        snapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setLocationData(items);
        setFilterLocation(items);
      });

      const collectionRef2 = collection(db, "Taxie");

      onSnapshot(collectionRef2, (snapshot) => {
        const items = [];

        snapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setTaxiData(items);
        setFiltertaxi(items);
      });

      const collectionRef3 = collection(db, "Hotel");

      onSnapshot(collectionRef3, (snapshot) => {
        const items = [];

        snapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setHotelsData(items);
        setFilterHotel(items);
      });
      //
    }
  }, [search]);
  useEffect(() => {
    if (search.length > 0) {
    } else {
      setFilterHotel(hotelsData);
      setFilterLocation(locationData);
      setFiltertaxi(taxiData);
    }
  }, [search]);

  const handleSearch = () => {
    const specificDistrictData = Object.values(locationData).filter(
      (item) => item.district === search.toLowerCase()
    );
    setFilterLocation(specificDistrictData);

    const specificDistrictData2 = Object.values(taxiData).filter(
      (item) => item.district === search.toLowerCase()
    );

    setFiltertaxi(specificDistrictData2);

    const specificDistrictData3 = Object.values(hotelsData).filter(
      (item) => item.district === search.toLowerCase()
    );

    setFilterHotel(specificDistrictData3);
  };

  return (
    <div>
      <h1 className="text-center p-4 mt-4 text-2xl font-semibold text-textgray">
        Find Services & Location
      </h1>
      <div>
        <Slider {...settings}>
          {province.map((e, i) => (
            <div
              key={"s" + i}
              onClick={() => {
                setSearch("");

                setSelect(i);
                const specificDistrictData = Object.values(locationData).filter(
                  (item) => item.province === e["Name"].toLowerCase()
                );
                setFilterLocation(specificDistrictData);

                const specificDistrictData2 = Object.values(taxiData).filter(
                  (item) => item.province === e["Name"].toLowerCase()
                );

                setFiltertaxi(specificDistrictData2);

                const specificDistrictData3 = Object.values(hotelsData).filter(
                  (item) => item.province === e["Name"].toLowerCase()
                );

                setFilterHotel(specificDistrictData3);
              }}
              className={`p-4 h-52 ${
                select === i ? "bg-white text-black" : "bg-gray-800 text-white"
              } `}
            >
              <img src={e["Img"]} className="w-28 m-auto" />
              <h1 className="font-semibold text-center">
                {e["Name"]} Province
              </h1>
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex justify-center mt-12">
        <FormControl>
          <FormLabel
            style={{ color: "gray", fontWeight: "bold" }}
            className="text-center"
            id="demo-controlled-radio-buttons-group"
          >
            Filter
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="Locations"
              control={<Radio />}
              label="Locations"
            />
            <FormControlLabel
              value="Taxies"
              control={<Radio />}
              label="Taxies"
            />
            <FormControlLabel
              value="Hotels"
              control={<Radio />}
              label="Hotels"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div>
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
            onClick={handleSearch}
            className="bg-mpurple px-6 py-3 font-semibold text-white"
          >
            Search
          </button>
        </div>
        <div className="flex flex-wrap w-full justify-center">
          {value === "Hotels"
            ? filterHotel.map((e, i) => (
                <div key={"s" + i}>
                  <HotelCard data={e} />
                </div>
              ))
            : value === "Locations"
            ? filterLocation.map((e, i) => (
                <div key={"s" + i}>
                  <LocationCard data={e} />
                </div>
              ))
            : filtertaxi.map((e, i) => (
                <div key={"s" + i}>
                  <TaxiCard data={e} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
