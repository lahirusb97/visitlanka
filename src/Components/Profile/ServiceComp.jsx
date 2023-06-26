import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, TextField } from "@mui/material";

import {
  getFirestore,
  doc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import LazyLoad from "react-lazyload";
export default function ServiceComp({ uid }) {
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [discription, setDiscription] = useState("");
  const [name, setName] = useState("");
  const [inputimg, setInputImg] = useState(null);
  const [inputError, setinputE] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [selectBox, setSelectBox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const locationDAta = () => {
      const db = getFirestore();

      const collectionRef = query(
        collection(db, "Location"),
        where("userId", "==", uid)
      );
      onSnapshot(collectionRef, (snapshot) => {
        const items = [];

        snapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setLocations(items);
      });
    };
    locationDAta();
  }, [uid]);
  const handleClickOpen = (data) => {
    setOpen(true);
    setSelectBox(data);
    setDiscription(data["Discription"]);
    setName(data["Name"]);
    setAddress(data["address"]);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const editLocation = async () => {
    if (locations.length > 0 && discription.length > 0 && address.length > 0) {
      try {
        setLoading(true);
        const db = getFirestore();
        const dbref = doc(db, "Location", selectBox["Id"]);
        const docRef = await updateDoc(dbref, {
          Name: name,
          Discription: discription,
          address: address,
        });

        if (inputimg) {
          const storage = getStorage();
          const desertRef = storageRef(storage, selectBox["Img"]);
          await deleteObject(desertRef);

          const productStorageRef = storageRef(
            storage,
            `/Location/${selectBox["Id"]}/${inputimg.name}`
          );

          const snapshot = await uploadBytes(productStorageRef, inputimg);

          const downloadURL = await getDownloadURL(snapshot.ref);

          await updateDoc(doc(db, "Location", selectBox["Id"]), {
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
  const handleDelete = async (data) => {
    const db = getFirestore();
    const storage = getStorage();
    const desertRef = storageRef(storage, data["Img"]);
    const removeDoc = async () => {
      await deleteDoc(doc(db, "Location", data["Id"]));
    };
    // Delete the Img file
    deleteObject(desertRef)
      .then(() => {
        removeDoc();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  return (
    <div className="flex flex-wrap">
      {locations.map((data, i) => (
        <div key={"q" + i} className="w-96 h-80 shadow-md p-2 m-4">
          <LazyLoad height={240}>
            <img src={data["Img"]} className="w-60 h-60 object-cover m-auto" />
          </LazyLoad>
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
              style={{ width: "300px" }}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              id="outlined-basic"
              label="Name"
              type="text"
              variant="outlined"
              value={name}
            />{" "}
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
            <textarea
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              value={address}
              className="w-full border p-3 border-gray-400 rounded-md my-2 h-24"
            ></textarea>
            <textarea
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              placeholder="Description"
              className="w-full border p-3 border-gray-400 rounded-md my-2 h-80"
            ></textarea>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button onClick={editLocation}>Edit</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
