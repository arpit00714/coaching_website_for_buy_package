import React, { useEffect, useState } from "react";
import { app, auth, signInWithGoogle } from "../service/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import ReactLoading from "react-loading";
import { FcGoogle } from "react-icons/fc";
import "./login.css";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { getstudentuserdata, userdata } from "../apis/userdata";
import { appuri } from "../appUri/appUri";
function Login() {
  const navigate = useNavigate();
  const alert = useAlert();
  const logo = require("../image/logocolour-u508906.png");
  const [user, setUser] = useState(null);
  const [email, setemail] = useState("");
  const [showsignup, setsignupshow] = useState(false);
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userUid ,setuserUid ] =useState("")
  const [shouldNavigateBack, setShouldNavigateBack] = useState(false);
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUser(user);
      if(user){
        setuserUid(user.uid)
      }
    });
  }, []);


  const registerWithEmailAndPassword = async (email, password) => {
    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res?.user;
      // await sendEmailVerification(user,{
      //   url:"http://localhost:3000/Login"
      // });
      await sendEmailVerification(user);
      alert.success(
        "Registered successfully. Please verify your email before logging in."
      );
      setLoading(false)
      setsignupshow(false);
      setpassword("");
      // window.location.reload();
    } catch (err) {
      setLoading(false)
      if (err.code === "auth/email-already-in-use") {
        alert.error("The email address is already in use by another account.");
      } else if (err.code === "auth/weak-password") {
        // Handle specific password error (optional)
        alert.info("Password is weak. Please choose a stronger password.");
      } else {
        alert.error(err.message || "An unexpected error occurred.");
      }
      // await sendEmailVerification(user);
    }
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      setLoading(true)
      if (email !== "" && password !== "") {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        if (user.emailVerified) {
          setLoading(false)
          alert.success("Logged in successfully");
          console.log("User logged in:", user);
          setuserUid(user.uid)
          navigate(-1);
          // postuserdata()
          // Redirect or perform any other action
        } else {
          setLoading(false)
          alert.error("Please verify your email before logging in.");
          await signOut(auth); // Sign out the user if email is not verified
        }
      } else {
        setLoading(false)
        alert.error("Please enter email and password");
        console.log("Please enter email and password");
      }
    } catch (err) {
      setLoading(false)
      const errorMessage = err.message || "An unknown error occurred";
      alert.error("Incorrect credentials");
      console.log("Error:", errorMessage);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      alert.success("User signed in with Google successfully.");
      setShouldNavigateBack(true)
      console.log("User signed in with Google successfully.");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const HandleResetPassward = () => {
    if (user?.emailVerified) {
      app
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert.success(`Password reset email sent to ${email}`);
          console.log("Password reset email sent");
        })
        .catch((error) => {
          alert.error("Error sending password reset email");
          console.error("Error sending password reset email", error);
        });
    } else {
      alert.error("please Verify Your Email First");
    }
  };



  useEffect(() => {
    const postuserdata = async () => {
      try {
        const endpoint = `${appuri}studentuser/getSudentsdata/${userUid}`;
        const resp = await fetch(endpoint);
        if (resp.status === 200) {
          const data = await resp.json();
          console.log("data",data)
          const users = [data?.message];
          const foundUser = users?.find((item) => item?.email === user?.email);
          // setgetuser(foundUser);
          if (foundUser) {
            console.log("Found user with email:", foundUser.email);
            if (user) {
              setShouldNavigateBack(true)
            }
            //
          } else {
            console.log("else");
            if (user.emailVerified) {
              const postDataResp = await userdata({
                email: user.email,
                displayName: user.displayName,
                uid: user.uid,
              });
              console.log("userdata", postDataResp);
              setShouldNavigateBack(true)
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    postuserdata();
  }, [user, navigate,loading ,userUid]);


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


  useEffect(() => {
    if (shouldNavigateBack) {
      console.log("Navigating back...");
      navigate(-1);
    }
  }, [shouldNavigateBack, navigate]); 


  if (loading) {
    return (
       <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
         <ReactLoading type="balls" color="black" height={"20%"} width={"20%"} />
       </div>
    );
  }
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
      </div>
      <div className="login_section">
        <div style={{ width: "100%", height: "80%" }}>
          <div
            style={{
              width: "80%",
              margin: "auto",
              background: "white",
              height: "100%",
            }}
          >
            <h4
              style={{
                textAlign: "center",
                fontFamily: "impact",
                margin: "0px",
                fontWeight: "100",
                fontSize: "20px",
              }}
            >
              LOGIN
            </h4>
            <p style={{ textAlign: "center", margin: "5px" }}>Welcome back .</p>
            <div
              onClick={handleSignInWithGoogle}
              className="login_section_GoogleBtn"
            >
              <FcGoogle size={30} style={{ margin: "0px 10px" }} />
              <p style={{ margin: "2px" }}>Login With Google</p>
            </div>
            <div className="login_element">
              <p style={{ textAlign: "center", margin: "0px" }}>OR</p>
              <div>
                <p style={{ margin: "5px" }}>Email</p>
                <input
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  type="text"
                  className="loginInput"
                />
              </div>
              <div>
                <p style={{ margin: "5px" }}>password</p>
                <input
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  type="text"
                  className="loginInput"
                />
              </div>
              {!showsignup && (
                <div
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    HandleResetPassward(email);
                  }}
                >
                  <p style={{ textAlign: "end" }}>Forgote password ?</p>
                </div>
              )}

              <div
                style={{
                  width: "100%",
                  background: "black",
                  padding: "10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  margin: "10px 0px",
                }}
                onClick={() => {
                  if (showsignup) {
                    registerWithEmailAndPassword(email, password);
                  } else {
                    logInWithEmailAndPassword(email, password);
                  }

                  //
                }}
              >
                <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    margin: "0px",
                  }}
                >
                  {showsignup ? "SIGN UP" : "LOGIN"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {!showsignup && (
          <div
            style={{
              border: "1px solid",
              height: "50px",
              margin: "50px 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Dont Have A Account ?</p>
            <a
              href="#w"
              onClick={() => {
                setsignupshow(true);
              }}
            >
              Sign UP
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
