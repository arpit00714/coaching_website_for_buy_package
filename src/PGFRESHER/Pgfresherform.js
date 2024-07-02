import React, { useState } from "react";
import "./pgfresher.css";
function Pgfresherform() {
  const [name, setname] = useState("");
  const [address , setAddress]=useState('')
  const [country , setcountry]=useState('')
  const [state , setstate]=useState('')
  const [city , setcity]=useState('')
  const [pincode , setpincode]=useState('')
  const [adharcard , setadharcard]=useState('')
  const [userimage , setuserimage]=useState('')
  return (
    <div className="Pg_main_Section">
      <div className="sildebar_container">regf</div>
      <div className="pg_form_container">
        <div className="pg_form_heading">
          <p>PG freasher</p>
        </div>

        <div className="sidebar_section_form">
          <p className="sidebar_section_para">Personnel Detail</p>

          <div className="form_section_flex">
            <div className="form_section_input">
              <p className="input_para">Name Of Candidate</p>
              <input
                 className="section_input"
                type="text"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>
            <div className="form_section_input">
              <p className="input_para">Corresponding Address</p>
              <input
                 className="section_input"
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="form_section_flex">
            <div style={{width:"20%"}}> 
              <p className="input_para">City</p>
              <input 
              className="section_input"
                type="text"
                value={city}
                onChange={(e) => {
                  setcity(e.target.value);
                }}
              />
            </div>
            <div style={{width:"20%"}}> 
              <p className="input_para">State</p>
              <input 
              className="section_input"
                type="text"
                value={state}
                onChange={(e) => {
                  setstate(e.target.value);
                }}
              />
            </div>
            <div style={{width:"20%"}}> 
              <p className="input_para">Country</p>
              <input 
              className="section_input"
                type="text"
                value={country}
                onChange={(e) => {
                  setcountry(e.target.value);
                }}
              />
            </div>
            <div style={{width:"20%"}}> 
              <p className="input_para">Pin Code</p>
              <input 
              className="section_input"
                type="number"
                value={pincode}
                onChange={(e) => {
                  setpincode(e.target.value);
                }}
              />
            </div>
          </div>
         
          <div className="form_section_flex">
          <div className="form_section_input">
              <p className="input_para">Upload Student Image</p>
              <input
                 className="section_input"
                type="file"
              />
            </div>
          <div className="form_section_input">
              <p className="input_para">Upload Aadhar Card</p>
              <input
                 className="section_input"
                type="file"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pgfresherform;
