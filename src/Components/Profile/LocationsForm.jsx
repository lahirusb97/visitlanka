import React, { useState, useEffect } from "react";
import { CircularProgress, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
import ServiceComp from "./ServiceComp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LocationsForm() {
  const lkProvince = [
    "Western",
    "Central",
    "Eastern",
    "Northern",
    "North Central",
    "North Western",
    "Sabaragamuwa",
    "Southern",
    "Uva",
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
  const [inputError, setinputE] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [discription, setDiscription] = useState("");
  const [imgError2, setImgError2] = useState(false);
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

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
  const handleChange = (event) => {
    setprovince(event.target.value);
  };
  const handledistrict = (event) => {
    setDistrict(event.target.value);
  };

  const addLocation = async () => {
    if (
      Name.length > 0 &&
      province.length > 0 &&
      district.length > 0 &&
      inputimg &&
      discription.length > 0 &&
      address.length > 0
    ) {
      setLoading(true);

      try {
        const db = getFirestore();
        const docRef = await addDoc(collection(db, "Location"), {
          Name: Name.toLowerCase(),
          province: province.toLowerCase(),
          district: district.toLowerCase(),
          discription: discription.toLowerCase(),
          address: address.toLowerCase(),
          userId: userId,
        });
        const storage = getStorage();
        const hotelStoreRef = soreRef(
          storage,
          `/Location/${docRef["id"]}/${inputimg.name}`
        );

        const snapshot = await uploadBytes(hotelStoreRef, inputimg);
        const downloadURL = await getDownloadURL(snapshot.ref);
        await updateDoc(doc(db, "Location", docRef.id), {
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

        setinputE(false);
        setAddress("");
        setDiscription("");
        setDistrict("");
        setprovince("");
        setName("");
        setInputImg(null);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setinputE(false);
      setLoading(false);
    } else {
      setinputE(true);
      setLoading(false);
    }
  };
  return (
    <div className="max-w-screen-xl m-auto">
      <TextField
        style={{ margin: "1rem 0" }}
        onChange={(e) => setName(e.target.value)}
        className="w-96"
        id="outlined-basic"
        label="Location Name"
        type="text"
        variant="outlined"
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Province</InputLabel>
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
        <InputLabel id="demo-simple-select-label">Select District</InputLabel>
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
            console.log("Invalid file format. Please select an image.");
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
      <textarea
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        className="w-full border p-3 border-gray-400 h-28 rounded-md my-"
      ></textarea>
      <textarea
        onChange={(e) => setDiscription(e.target.value)}
        placeholder="Description"
        className="w-full border p-3 border-gray-400 rounded-md my-2 h-80"
      ></textarea>

      {loading ? (
        <CircularProgress />
      ) : (
        <button onClick={addLocation} className="px-4 py-2 bg-green-600">
          Add Location
        </button>
      )}
      <h1 className="text-textgray font-semibold text-2xl text-center">
        Manage Services
      </h1>
      <ServiceComp uid={userId} />
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
