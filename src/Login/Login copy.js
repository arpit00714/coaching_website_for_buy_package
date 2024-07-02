import React, { useEffect, useState } from "react";
import { app, auth, signInWithGoogle } from "../service/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./login.css";
function Login() {
  const logo = require("../image/logocolour-u508906.png");
  const [user, setUser] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  console.log("user", user);
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  // console.log("user",user)
  // console.log("email",email)
  const registerWithEmailAndPassword = async (email, password) => {
    console.log("registerWithEmailAndPassword", email, password);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log("user", user);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("res", res);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async () => {
      try {
        await auth.signOut();
        console.log("User signed out successfully.");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100px", height: "100px" }}>
          <img
            src={logo}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            alt="logo"
          />
        </div>

        {/* <button className="button" onClick={signInWithGoogle}>
        <i className="fab fa-google"></i>Sign in with google
      </button>
      <button className="button signout" onClick={() => auth.signOut()}>
        Sign out
      </button>

      <input
        type="text"
        value={email}
        onChange={(val) => {
          console.log(val.target.value, "reds");
          setemail(val.target.value);
        }}
      />

      <input
        type="text"
        value={password}
        onChange={(val) => {
          setpassword(val.target.value);
        }}
      />

      <button
        onClick={() => {
          registerWithEmailAndPassword(email, password);
        }}
      >
        registerWithEmailAndPassword
      </button>

      <button
        onClick={() => {
          logInWithEmailAndPassword(email, password);
        }}
      >
        logInWithEmailAndPassword
      </button> */}
      </div>
      <div className="login_section">
        <div className="login_section_box_one">
          {/* <h4>Welcome To Dews</h4>
          <p>Login and get opportunity</p> */}
          <div className="login-form">
            <div className="logintext">
              <p>Email</p>
              <input type="text" className="login_input" placeholder="PLease Enter Your Email"/>
            </div>
            <div className="logintext">
              <p>Password</p>
              <input type="text" className="login_input" placeholder="PLease Enter Your Email"/>
            </div>
            <div style={{padding:"10px",cursor:"pointer",color:"blue"}}>
              Forget Password ?
            </div>
           <div style={{width:"100%",display:"flex",justifyContent:"center",margin:"10px 0px"}}>
           <button type="button" className="loginBtn">
              Login
            </button>
           </div>
           <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
            <div style={{height:"1px",width:"40%",background:"black"}}></div>
            <p>OR</p>
            <div style={{height:"1px",width:"40%",background:"black"}}></div>
           </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
