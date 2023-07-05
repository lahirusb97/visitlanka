import React, { useEffect, useState } from "react";
import close from "../../assets/Icons/close.svg";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";
import {
  getFirestore,
  doc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
export default function TaxiComp({ uid }) {
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
  const [open, setOpen] = useState(false);
  const [taxie, setTaxie] = useState([]);
  //

  const [name, setName] = useState("");
  const [province, setprovince] = useState("");
  const [district, setDistrict] = useState("");
  const [inputimg, setInputImg] = useState(null);
  const [inputError, setinputE] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [selectBox, setSelectBox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [travelA, settravelA] = useState("");
  const [travelAials, settravelAeias] = useState([]);
  const [mobile, setMobile] = useState("");

  //
  //SHow DAta
  useEffect(() => {
    const locationDAta = () => {
      const db = getFirestore();
      const collectionRef = query(
        collection(db, "Taxie"),
        where("userId", "==", uid)
      );

      onSnapshot(collectionRef, (snapshot) => {
        const items = [];

        snapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setTaxie(items);
      });
    };
    locationDAta();
  }, [uid]);
  const handleClickOpen = async (data) => {
    setSelectBox(data);
    setOpen(true);
    setName(data["Name"]);
    settravelAeias(data["Travel"]);
    setDistrict(data["district"]);
    setprovince(data["province"]);
    setMobile(data["mobile"]);
  };
  const handleDelete = async (data) => {
    const db = getFirestore();
    const storage = getStorage();
    const desertRef = storageRef(storage, data["Img"]);
    const removeDoc = async () => {
      await deleteDoc(doc(db, "Taxie", data["Id"]));
    };

    deleteObject(desertRef)
      .then(() => {
        removeDoc();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handletravel = (event) => {
    const value = event.target.value;
    settravelA(event.target.value);
    if (!travelAials.includes(value)) {
      settravelAeias((prevArray) => [...prevArray, value]);
    }
  };
  const editTaxiDAta = async () => {
    if (
      name.length > 0 &&
      province.length > 0 &&
      district.length > 0 &&
      mobile.length > 0
    ) {
      try {
        setLoading(true);
        const db = getFirestore();
        const dbref = doc(db, "Taxie", selectBox["Id"]);
        const docRef = await updateDoc(dbref, {
          Name: name.toLowerCase(),
          province: province.toLowerCase(),
          district: district.toLowerCase(),
          Travel: travelAials.toLowerCase(),
          mobile: mobile,
        });

        if (inputimg) {
          const storage = getStorage();
          const desertRef = storageRef(storage, selectBox["Img"]);
          await deleteObject(desertRef);

          const productStorageRef = storageRef(
            storage,
            `/Taxie/${selectBox["Id"]}/${inputimg.name}`
          );

          const snapshot = await uploadBytes(productStorageRef, inputimg);

          const downloadURL = await getDownloadURL(snapshot.ref);

          await updateDoc(doc(db, "Taxie", selectBox["Id"]), {
            Img: downloadURL,
          });
        }

        setOpen(false);
        setinputE(false);
        setLoading(false);
      } catch (error) {
        console.error(error.messages);
        setLoading(false);
      }
    } else {
      setinputE(true);
      setLoading(false);
    }
  };
  const handledistrict = (event) => {
    setDistrict(event.target.value);
  };
  const handleChange = (event) => {
    setprovince(event.target.value);
  };
  return (
    <div className="flex flex-wrap">
      {taxie.map((data, i) => (
        <div key={"q" + i} className="w-96 h-80 shadow-md p-2 m-4">
          <img src={data["Img"]} className="w-60 h-60 object-cover m-auto" />
          <h1 className="text-center font-bold text-lg">{data["Name"]}</h1>
          <div className="flex w-full justify-center">
            <button
              onClick={() => {
                handleDelete(data);
              }}
              className="px-4 py-2 bg-slate-900 text-white"
            >
              Remove
            </button>
            <button
              onClick={() => {
                handleClickOpen(data);
              }}
              className="px-4 py-2 bg-slate-500 text-white"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      <div>
        <Dialog
          disableBackdropClick={false}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Edit Location Data"}
          </DialogTitle>
          <DialogContent>
            <div className="m-2">
              <TextField
                style={{ width: "300px", margin: ".5rem 0" }}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                id="outlined-basic"
                label="Taxi Name"
                type="text"
                variant="outlined"
                value={name}
              />{" "}
              <TextField
                style={{ margin: "1rem 0" }}
                onChange={(e) => setMobile(e.target.value)}
                className="w-96"
                id="outlined-basic"
                label="Contact Number"
                type="number"
                variant="outlined"
                value={mobile}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Base Province
                </InputLabel>
                <Select
                  style={{ width: "300px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={province}
                  label="Province"
                  onChange={(e) => {
                    setprovince(e.target.value);
                  }}
                >
                  {lkProvince.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth style={{ marginTop: "1rem" }}>
                <InputLabel id="demo-simple-select-label">
                  Base District
                </InputLabel>
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
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button onClick={editTaxiDAta}>Edit</Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
