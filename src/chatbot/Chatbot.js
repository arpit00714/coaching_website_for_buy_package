import React, { useState } from "react";
import "./Chatbot.css";
import { RxCross2 } from "react-icons/rx";
import { useAlert } from "react-alert";
import ReactLoading from "react-loading";
import { Userchatbot } from "../apis/userdata";
const img = require("../image/email.png");
const poster = require("../image/logocolour-u508906.png");
function Chatbot() {
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState(false);
  const alert = useAlert();
  const [message, setmessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChatBot = async () => {
    if (email !== "") {
      try {
        setLoading(true);
        const sendmail = await Userchatbot({
          useremail: email,
          usermessage: message,
        });
        console.log("sendmail", sendmail);
        if (sendmail.status === 200) {
          setToggle(false);
          setEmail("");
          setmessage("");
          setEmailError("")
          alert.success("Message Sent SucessFully");
        }
        setLoading(false);
      } catch (err) {
        console.log("err", err);
        setLoading(true);
      }
    } else {
      setEmailError("Please enter your email.");
      // setToggle(false);
      // alert.success("Please Enter Email");
    }
  };
  return (
    <>
      {toggle && (
        <div className="CHatbot_container">
          <div
            className="chatbot_cross"
            onClick={() => {
              setToggle(false);
            }}
          >
            <RxCross2 />
          </div>
          <img
            src={poster}
            alt="poster"
            style={{ width: "100%", height: "100px", objectFit: "contain" , margin:"10px 0px" }}
          />
          <div className="chatobt_inputs">
            <input
              placeholder="Please Enter Your Email"
              className="email_input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value !== "") {
                  setEmailError(""); // Clear the error message when the user starts typing
                }
              }}
            />
            {emailError === "" && <span className="error-message">{emailError}</span>}
            <textarea
              placeholder="Please Enter Your Message"
              className="chatobt_textarea"
              value={message}
              onChange={(e) => {
                setmessage(e.target.value);
              }}
            />
            {loading && (
              <ReactLoading
                type="balls"
                color="black"
                height={"20%"}
                width={"20%"}
              />
            )}
            {!loading && (
              <button
                className="chatbot_button"
                onClick={() => {
                  handleChatBot();
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}

      {!toggle && (
        <div
          className="ChatbOT_OPEN"
          onClick={() => {
            setToggle(true);
          }}
        >
          <img
            src={img}
            alt="img"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      )}
    </>
  );
}

export default Chatbot;
