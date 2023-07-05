import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default function Register({ open, setOpen, setuserData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [errorH, setErrorH] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRegister = () => {
    if (password !== passwordC) {
      setErrorH("Password Not match");
    }
    if (password.length < 6) {
      setErrorH("Password Must Have Minimum 6 Caractors");
    }
    if (password === passwordC && password.length > 6 && email.length > 6) {
      setLoading(true);

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setuserData(user);
          navigate("/profile");
          setOpen(false);
          setLoading(false);

          // ...
        })
        .catch((error) => {
          setLoading(false);

          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      setErrorH("Input data error check your inputs");
    }
  };
  return (
    <div>
      {" "}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Register Now"}</DialogTitle>
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
            <TextField
              onChange={(e) => setPasswordC(e.target.value)}
              style={{ marginTop: "20px", width: "350px" }}
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              value={passwordC}
            />
          </div>
          <h4 className="italic font-black text-red-600">{errorH}</h4>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button onClick={handleRegister}>Register Now</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
