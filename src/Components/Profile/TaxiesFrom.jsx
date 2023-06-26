import React, { useState, useEffect } from "react";
import { CircularProgress, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import close from "../../assets/Icons/close.svg";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref as soreRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import TaxiComp from "./TaxiComp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function TaxiesFrom() {
  const notify = () => toast();
  const lkProvince = [
    "Western Province",
    "Central Province",
    "Eastern Province",
    "Northern Province",
    "North Central Province",
    "North Western Province",
    "Sabaragamuwa Province",
    "Southern Province",
    "Uva Province",
  ];
  const LKdistricts = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];
  const [Name, setName] = useState("");
  const [province, setprovince] = useState("");
  const [district, setDistrict] = useState("");
  const [inputimg, setInputImg] = useState(null);
  const [inputError, setinputError] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [travelA, settravelA] = useState("");
  const [travelAials, settravelAeias] = useState([]);
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setprovince(event.target.value);
  };
  const handledistrict = (event) => {
    setDistrict(event.target.value);
  };

  const handletravel = (event) => {
    const value = event.target.value;
    settravelA(event.target.value);
    if (!travelAials.includes(value)) {
      settravelAeias((prevArray) => [...prevArray, value]);
    }
  };
  const addTaxit = async () => {
    if (
      Name.length > 0 &&
      province.length > 0 &&
      district.length > 0 &&
      inputimg &&
      travelAials.length > 0 &&
      mobile.length > 0
    ) {
      setLoading(true);
      try {
        const db = getFirestore();
        const docRef = await addDoc(collection(db, "Taxie"), {
          Name: Name,
          province: province,
          district: district,
          Travel: travelAials,
          mobile: mobile,
          userId: userId,
        });
        const storage = getStorage();
        const hotelStoreRef = soreRef(
          storage,
          `/Taxie/${docRef["id"]}/${inputimg.name}`
        );

        const snapshot = await uploadBytes(hotelStoreRef, inputimg);
        const downloadURL = await getDownloadURL(snapshot.ref);
        await updateDoc(doc(db, "Taxie", docRef.id), {
          Img: downloadURL,
          Id: docRef.id,
        });
        toast.success("Item added", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);

        //reset inputdata
        setName("");
        setMobile("");
        setprovince("");
        setDistrict("");

        setInputImg(null);
        settravelAeias([]);
        settravelA("");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setinputError(false);
      setLoading(false);
    } else {
      setinputError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);
  console.log(travelAials);
  return (
    <div>
      {" "}
      <div className="max-w-screen-xl m-auto">
        <TextField
          style={{ marginTop: "2rem" }}
          onChange={(e) => setName(e.target.value)}
          className="w-96"
          id="outlined-basic"
          label="Taxies Name"
          type="text"
          variant="outlined"
          value={name}
        />{" "}
        <TextField
          style={{ margin: "1rem 0", display: "block" }}
          onChange={(e) => setMobile(e.target.value)}
          className="w-96"
          id="outlined-basic"
          label="Contact Number"
          type="number"
          variant="outlined"
          value={mobile}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Base Province</InputLabel>
          <Select
            style={{ width: "300px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={province}
            label="Province"
            onChange={handleChange}
          >
            {lkProvince.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "1rem" }}>
          <InputLabel id="demo-simple-select-label">Base District</InputLabel>
          <Select
            style={{ width: "300px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={district}
            label="Province"
            onChange={handledistrict}
          >
            {LKdistricts.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          style={{ width: "300px", marginTop: "1rem" }}
          onChange={(e) => {
            const file = e.target.files[0];

            // Check if the selected file is an image
            if (file && file.type.startsWith("image/")) {
              setInputImg(file);

              setImgError(false);
            } else {
              setInputImg(null);
              setImgError(true);
            }
          }}
          className="w-full"
          id="outlined-basic"
          type="file"
          accept="image/*"
          variant="outlined"
        />
        {inputError ? (
          <span className="text-red-600 font-bold italic">
            ** Fill All The Inputs **
          </span>
        ) : (
          <></>
        )}
        <div>
          <div className=" flex flex-wrap">
            {travelAials.map((e, index) => (
              <div className="flex m-2 bg-slate-300 items-center">
                <h3 className=" px-4 font-semibold">{e}</h3>
                <button
                  onClick={() => {
                    const updatedArray = [...travelAials];
                    updatedArray.splice(index, 1);

                    settravelAeias(updatedArray);
                  }}
                >
                  <img className="w-8 bg-red-400" src={close} />
                </button>
              </div>
            ))}
          </div>
          <FormControl fullWidth style={{ margin: "1rem 0" }}>
            <InputLabel id="demo-simple-select-label">
              Select Travel Arias
            </InputLabel>
            <Select
              style={{ width: "300px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={travelA}
              label="Select Travel Arias"
              onChange={handletravel}
            >
              {LKdistricts.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* <div className="flex flex-col w-96">
 
    <button onClick={addDishe} className="p-4 my-2 bg-red-400">
      Add
    </button>
  </div> */}
        {loading ? (
          <CircularProgress />
        ) : (
          <button onClick={addTaxit} className="px-4 py-2 bg-green-600">
            Add Taxi
          </button>
        )}
      </div>
      <TaxiComp uid={userId} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}
