import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { appuri } from "../appUri/appUri";
import { useAlert } from "react-alert";
import { app } from "../service/firebase";
import {
  DeleteDisscount,
  buypacakages,
  updateuserdata,
} from "../apis/userdata";
import { RazorPay, paymentCallback } from "../apis/Payment";
import moment from "moment";
import ReactLoading from "react-loading";
function Buynow() {
  const today = moment();
  const formattedDate = today.format("DD-MM-YYYY");
  console.log("formattedDate", formattedDate);
  // const navigation = useNavigate()
  const alert = useAlert();
  const logo = require("../image/logocolour-u508906.png");
  const location = useLocation();
  const navigate = useNavigate();
  const packagedetails = location?.state?.packagedetails;
  const consultancydetails = location?.state?.consultancydetails;
  const packageuniversity = location?.state?.packageuniversity;
  const [couponcode, setCouponCode] = useState("");
  const [packageprice, setPackageparice] = useState();
  const [disscountvalue, setdisscountvalue] = useState("");
  const [showdisscountbtn, setShowdisscountbtn] = useState(false);
  const [disscountid, setdisscountid] = useState("");
  const [shouldNavigateBack, setShouldNavigateBack] = useState(false);
  const [userpackagedetails, setuserpackagedetails] = useState([
    packagedetails,
  ]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (shouldNavigateBack) {
      console.log("Navigating back...");
      navigate(-3);
    }
  }, [shouldNavigateBack, navigate]);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const CheckPackageCoupon = async (value) => {
    if (couponcode !== "") {
      setShowdisscountbtn(true);
      try {
        const endpoint = `${appuri}packagediscount/getdisscount/${packagedetails.id}/${couponcode}`;
        console.log("datacreatepackage");
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data.status === 200) {
          console.log("data.message", data.message.disscountvalue);
          if (data.message.status) {
            setdisscountid(data.message.id);
            const discountPercentage = parseFloat(data.message.disscountvalue);
            alert.success(`${data.message.disscountvalue}% applied`);
            console.log("discountPercentage", discountPercentage);
            const discountAmount = (packageprice * discountPercentage) / 100;
            const newPrice = packageprice - discountAmount;
            console.log("newPrice", newPrice);
            setPackageparice(newPrice);
            setdisscountvalue(newPrice);
          } else {
            alert.error(`Coupon Code Expire`);
            setShowdisscountbtn(false);
          }
          //   setPackageparice()
        } else {
          alert.error(`No Disscount for This Package`);
          setShowdisscountbtn(false);
        }
        // console.log(data.message[0].createpackage, "datacreatepackage");
      } catch (err) {
        alert.error(`No Disscount for This Package`);
        setShowdisscountbtn(false);
        console.log(err);
      }
    } else {
      alert.error("please add Coupon Code");
    }
  };

  const handlePaymentResponse = async (response) => {
    try {
      const resp = await paymentCallback({ response });
      if (resp) {
        setLoading(false);
        const resp = await buypacakages({
          uid: user.uid,
          pacakgeId: packagedetails.id,
          amount: packagedetails.packageamount,
          consultancyId: consultancydetails.addconsultancyId,
          endDate: packagedetails.packagevalidity,
          disscountValue: disscountvalue,
          universitiesperPackage: packageuniversity,
          buyDate: formattedDate,
        });
        const postDataResp = await updateuserdata(
          {
            examtype: packagedetails.packagedescription,
          },
          user.uid
        );
        alert.success("Package buy SucessFully");
        if (disscountid) {
          const deleteDisscount = await DeleteDisscount(disscountid);
          console.log("deleteDisscount", deleteDisscount);
          setShouldNavigateBack(true);
        }

        setShouldNavigateBack(true);
      }
    } catch (err) {
      console.log("fail");
    }
  };

  const HandlePackageBuy = async () => {
    try {
      setLoading(true);
      const send = {
        amount: packageprice,
        currency: "INR",
      };
      const response = await RazorPay({ send });
      const data = await response.json();
      console.log("data", data);
      console.log("response", response);
      const { id, amount, currency, signature } = data?.data;
      const options = {
        // key: 'rzp_live_SWf99X4mub4Cnh',
        key: "rzp_test_sjWnWCrCPhP6Aq",
        amount: Number(send.amount),
        currency: send.currency,
        name: "Dews",
        description: "Test Transaction",
        order_id: data?.data.id,
        handler: function (data) {
          console.log("handlerdata", data);
          handlePaymentResponse(response);
        },
        prefill: {
          name: user.displayName,
          email: user.displayName,
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  // const HandlePackageBuy = async () => {

  //   console.log("resp", resp);
  //   console.log("postDataResp", postDataResp);
  // };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ReactLoading type="balls" color="black" height={"20%"} width={"20%"} />
      </div>
    );
  }
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <button onClick={()=>{
           navigate(-1)
        }}>Home</button> */}
        <div style={{ width: "100px", height: "100px" }}>
          <img
            src={logo}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            alt="logo"
          />
        </div>
      </div>
      <div
        style={{
          width: "30%",
          margin: "60px auto",
          // border: "1px solid",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <h3
          style={{
            margin: "5px",
            fontFamily: "impact",
            fontSize: "20px",
            fontWeight: "100",
            letterSpacing: "0.2rem",
            textAlign: "center",
          }}
        >
          {packagedetails?.heading}
        </h3>
        <h4
          style={{
            margin: "5px",
            fontFamily: "BKANT",
            fontSize: "16px",
            fontWeight: "100",
            letterSpacing: "0.2rem",
            textAlign: "center",
          }}
        >
          {packagedetails?.description}
        </h4>
        <div style={{ marginTop: "30px" }}>
          <p style={{ margin: "5px", fontFamily: "BKANT" }}>
            Do You Have Coupon Code ?{" "}
          </p>
          <div style={{ display: "flex" }}>
            <input
              style={{ padding: "10px", width: "80%" }}
              value={couponcode}
              onChange={(e) => {
                console.log("e.target.value", e.target.value);
                setCouponCode(e.target.value);
              }}
            />
            {!showdisscountbtn && (
              <button
                style={{
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  fontFamily: "BKANT",
                }}
                onClick={CheckPackageCoupon}
              >
                Check Now
              </button>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontFamily: "BKANT" }}>Original Price: </p>
          <p style={{ fontFamily: "BKANT", fontSize: "16px" }}>
            {packagedetails?.packageamount}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontFamily: "BKANT" }}>Disscount :</p>
          <p style={{ fontFamily: "BKANT", fontSize: "16px" }}>
            {packageprice}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontFamily: "BKANT" }}>After Affected Disscount</p>
          <p style={{ fontFamily: "BKANT", fontSize: "16px" }}>
            {disscountvalue}
          </p>
        </div>

        <button
          style={{
            background: "black",
            border: "none",
            color: "white",
            padding: "10px",
          }}
          onClick={HandlePackageBuy}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default Buynow;
