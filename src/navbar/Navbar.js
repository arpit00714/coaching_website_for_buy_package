import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { app } from "../service/firebase";
import { MdOutlineMenu } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useAlert } from "react-alert";
import { ImCross } from "react-icons/im";
import {
  GetstudentData,
  getstudentuserdata,
  updateuserConsultancy,
  updateuserdata,
} from "../apis/userdata";
import { appuri, student } from "../appUri/appUri";
const img = require("../image/logocolour-u508906.png");
const userimg = require("../image/user.jpg");

function Navbar({ consultancy }) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [options, setOptions] = useState([]);
  const alert = useAlert();
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  //   useEffect(() => {
  //     const studentuser = async () => {
  //         try {
  //             const resp = await getstudentuserdata();
  //             if (resp.status === 200) {
  //                 const data = await resp.json();
  //                 const userdData = data?.message
  //                 console.log("userdData",userdData)
  //                 console.log("studentuser", data)
  //                 const foundUser = userdData?.find((item) => item?.email === user?.email);
  //                 console.log("foundUser", foundUser?.buypacakages)

  //                 // Check if foundUser.buypacakages is not null
  //                 if (foundUser?.buypacakages !== null) {
  //                     // Include "Go to Dashboard" option
  //                     setOptions([
  //                         { label: `${user?.displayName}`, value: `${user?.displayName}` },
  //                         {
  //                             label: "Go to Dashboard",
  //                             value: "Go to Dashboard",
  //                             className: "myOptionClassName",
  //                         },
  //                         {
  //                             label: "Log Out",
  //                             value: "Log Out",
  //                             icon: <MdLogout style={{ marginLeft: "10px" }} />,
  //                         },
  //                     ]);
  //                 } else {
  //                     // Exclude "Go to Dashboard" option
  //                     setOptions([
  //                         { label: `${user?.displayName}`, value: `${user?.displayName}` },
  //                         {
  //                             label: "Log Out",
  //                             value: "Log Out",
  //                             icon: <MdLogout style={{ marginLeft: "10px" }} />,
  //                         },
  //                     ]);
  //                 }
  //             }
  //         } catch (er) {
  //             console.log(er);
  //         }
  //     };
  //     studentuser();
  // }, [user?.email]);
  const [isgotodashborad, setGotodashboard] = useState(false);
  useEffect(() => {
    const studentuser = async () => {
      try {
        const endpoint = `${appuri}studentbuypacakages/getbuypacakagebyid/${user.uid}`;
        console.log("student byuy pacakge");
        const response = await fetch(endpoint);
        if (response.status === 200) {
          const data = await response.json();
          const userdData = data?.message;
          console.log("userdData", userdData[0]?.pacakgeId);
          const foundUser = userdData[0]?.pacakgeId;

          console.log("foundUser", foundUser);

          // Check if foundUser.buypacakages is not null
          if (foundUser) {
            setGotodashboard(true);
            console.log("useruseruseruser", user?.uid);
            // Include "Go to Dashboard" option
            setOptions([
              { label: `${user?.displayName}`, value: `${user?.displayName}` },
              {
                label: "Go to Dashboard",
                value: "Go to Dashboard",
                className: "myOptionClassName",
              },
              {
                label: "Log Out",
                value: "Log Out",
                icon: <MdLogout style={{ marginLeft: "10px" }} />,
              },
            ]);
          } else {
            // Exclude "Go to Dashboard" option
            setOptions([
              { label: `${user?.displayName}`, value: `${user?.displayName}` },
              {
                label: "Log Out",
                value: "Log Out",
                icon: <MdLogout style={{ marginLeft: "10px" }} />,
              },
            ]);
          }
        }
      } catch (er) {
        console.log(er);
      }
    };
    studentuser();
  }, [user?.email]);

  const HandleLogout = () => {
    app
      .auth()
      .signOut()
      .then(function () {
        alert.success("Log Out Sucessfully");
      })
      .catch(function (error) {
        // An error happened
      });
    setGotodashboard(false);
  };

  const gotodashborad = async () => {
    try {
      const uid = user.uid;
      console.log("uid", uid);
      const resp = await updateuserConsultancy(
        {
          AddConsultancyId: consultancy,
          uid: uid,
        },
        uid
      );
      console.log("resp", resp);
      const id = user.uid;
      // const adminPanelUrl = `http://localhost:3001/student/session/signin/${id}`;
      const adminPanelUrl = `${student}/session/signin/${id}`;
      window.open(adminPanelUrl, "_blank");
    } catch (err) {
      console.log("err", err);
    }
  };

  const onSelect = (item) => {
    console.log("item", item);
    if (item.value === "Log Out") {
      HandleLogout();
    }
    if (item.value === "Go to Dashboard") {
      gotodashborad();
    }
  };
  // const options = [
  //   { label: `${user?.displayName}`, value: `${user?.displayName}` },
  //   {
  //     label: "Go to Dashboard",
  //     value: "Go to Dashboard",
  //     className: "myOptionClassName",
  //   },
  //   {
  //     label: "Log Out",
  //     value: "Log Out",
  //     icon: <MdLogout style={{ marginLeft: "10px" }} />,
  //   },
  // ];
  const defaultOption = options[0];

  return (
    <>
      <div className="navbar-container-main">
        <div
          className={`${show ? "navbar-container-active" : "navbar-container"}`}
        >
          <div className="navbar-link ">
            <a
              href="/"
              onClick={() => {
                console.log("gbrfe");
              }}
            >
              Home
            </a>
          </div>
          <Link className="navbar-logo"  style={{marginLeft:user?"100px":"0px"}}>
            <img alt="logo" src={img} className="navbar-logo-img" />
          </Link>
          {user ? (
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                padding: "10px 10px",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                
              }}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="photoURL"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
              ) : (
                <img
                  src={userimg}
                  alt="photoURL"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
              )}

              <Dropdown
                options={options}
                onChange={onSelect}
                value={defaultOption}
                className="DropDwon"
                placeholder="Select an option"
              />
            </div>
          ) : (
            <div className="navbar-link">
              <Link to={"/Login"}>Member</Link>
            </div>
          )}
        </div>
        {/* <div className="nav-menu">
          <MdOutlineMenu
            size={40}
            onClick={() => {
              setShow(!show);
            }}
          />
        </div> */}
      </div>

      {/* mobile vieew */}
      <div className="mob_menu">
        <MdOutlineMenu
          size={40}
          onClick={() => {
            setShow(!show);
          }}
        />
      </div>
      <div className={show ? "toggle_mob_menu_active" : "toggle_mob_menu"}>
        <div className="Hide_mob_menu">
          <ImCross
            color="white"
            onClick={() => {
              setShow(false);
            }}
          />
        </div>

        <div className="mob_menu_container">
          <div className="mob_meu_inner_container">
            <div className="mob_logo">
              <img
                src={img}
                alt="img"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="mob_nav_link">
              <div className="link">
                <Link to="/">Home</Link>
              </div>
              <div className="link">
                <Link to="/">About Us</Link>
              </div>
              <div className="link">
                <Link to="/">Contact Us</Link>
              </div>
              {isgotodashborad && (
                <div className="link">
                  <Link
                    onClick={() => {
                      gotodashborad();
                    }}
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
            <div className="mob_Logs">
              <div className="mob_Logs_inner">
                {user && (
                  <button
                    onClick={() => {
                      HandleLogout();
                    }}
                  >
                    Log Out
                  </button>
                )}
                {!user && (
                  <button>
                    <Link to={"/Login"}>Member</Link>
                  </button>
                )}
                {user && <p>{user?.displayName}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
