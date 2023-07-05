import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../../Firebaseconfig";
export default function Login({ open, setOpen, setuserData, setIsOpen }) {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("qwertyu");
  const [errorH, setErrorH] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const login = () => {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setuserData(user);
        setLoading(false);
        setOpen(false);
        navigate("/profile");
        setIsOpen(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (error.code === "auth/user-not-found") {
          setErrorH("Invalid Email");
          setLoading(false);
        } else if (error.code === "auth/wrong-password") {
          setErrorH("Wrong Password");
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  };
  useEffect(() => {}, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"LogIn"}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col">
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginTop: "20px", width: "350px" }}
              id="outlined-basic"
              type="email"
              label="Email"
              variant="outlined"
              value={email}
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginTop: "20px", width: "350px" }}
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              value={password}
            />
          </div>
          <h4 className="italic font-black text-red-600">{errorH}</h4>
          {loading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <button
              className="py-2 px-4 bg-blue-600 w-full mt-2 font-semibold text-white"
              onClick={login}
              autoFocus
            >
              Login
            </button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
