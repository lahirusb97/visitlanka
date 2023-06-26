import React, { useEffect, useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField } from "@mui/material";
import LocationsForm from "./LocationsForm";
import HotelForm from "./HotelForm";
import TaxiesFrom from "./TaxiesFrom";
export default function Profile() {
  const [value, setValue] = useState("Locations");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="pt-20 max-w-screen-lg m-auto">
      <div className="flex justify-center mt-12">
        <FormControl>
          <FormLabel
            style={{ color: "gray", fontWeight: "bold" }}
            className="text-center"
            id="demo-controlled-radio-buttons-group"
          >
            Select Your Service
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
        {value === "Locations" ? (
          <LocationsForm />
        ) : value === "Taxies" ? (
          <TaxiesFrom />
        ) : (
          <HotelForm />
        )}
      </div>
    </div>
  );
}
