import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import SelectedSlider from "./SelectedSlider";
import "./selectedconsultanct.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Pagination } from "swiper/modules";
import { Link, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import YouTube from "react-youtube";
import Chatbot from "../chatbot/Chatbot";
import Footer from "../footer/Footer";
import { appuri } from "../appUri/appUri";
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { useMemo } from "react";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { RxCrossCircled } from "react-icons/rx";
import { app } from "../service/firebase";
import { useAlert } from "react-alert";

Modal.setAppElement(document.getElementById("root"));

function SelectedConsultancy() {
  const location = useLocation();
  const { id } = useParams();
  const item = location?.state?.item;
  const imageUrl = `${appuri}${item?.admissionProcesstitleimage}`;
  const Advisortbg = `${appuri}${item?.AdvisoryPackagebackground}`;
  const naviation = useNavigate();
  const imageSliderText = JSON.parse(item?.admissionStagesimagetextslider);
  const [user, setUser] = useState(null);
  const [consultancypackage, setConsultancypackage] = useState();
  const [Uiversitieslist, sUniversitiesList] = useState();
  const [consultancy, setconsultancy] = useState({});
  const [modalData, setModalData] = useState();
  const [sliderImages, setSliderImages] = useState([]);
  const alert = useAlert();
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  console.log("modalData", modalData);

  // getting package
  useEffect(() => {
    const Packages = async () => {
      try {
        const endpoint = `${appuri}attachedPackage/getpackageattached/${id}`;
        console.log("datacreatepackage");
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data.status === 200) {
          setConsultancypackage(data.message);
          console.log("setConsultancypackage", data.message);
        }
        // console.log(data.message[0].createpackage, "datacreatepackage");
      } catch (err) {
        console.log(err);
      }
    };
    Packages();
  }, [id]);

  console.log("consultancypackage", consultancypackage);

  // getting university
  useEffect(() => {
    const universities = async () => {
      try {
        const endpoint = `${appuri}adduniversities/getuniversitybyConsultancyId/${id}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data.status === 200) {
          sUniversitiesList(data.message);
        }
        // console.log(data.message[0].createpackage, "datacreatepackage");
      } catch (err) {
        console.log(err);
      }
    };
    universities();
  }, [id]);

  const [processNumberList, setProcessNumberList] = useState([]);
  // get consultancy
  useEffect(() => {
    const universities = async () => {
      try {
        const endpoint = `${appuri}addconsultancy/getSelectedconsultancy/${id}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data.status === 200) {
          console.log("ertrgbdsx0", data);
          setconsultancy(data.message);
          console.log("data.message.sliderImages", data.message.sliderImages);
          if (data.message.sliderImages) {
            try {
              const images = JSON.parse(data.message.sliderImages);
              if (data.message.admissionProcessstagenumber) {
                const admissionProcessNumbers = JSON.parse(
                  JSON.parse(data.message.admissionProcessstagenumber || "[]")
                );
                console.log("admissionProcessNumbers", admissionProcessNumbers);
                setProcessNumberList(admissionProcessNumbers);
                console.log(
                  "admissionProcessstagenumber",
                  admissionProcessNumbers
                );
              }
              setSliderImages(images);
            } catch (error) {
              console.error("Error parsing sliderImages:", error);
            }
          }
          console.log("data.sliderImages", data.sliderImages);
        }
        // console.log(data.message[0].createpackage, "datacreatepackage");
      } catch (err) {
        console.log(err);
      }
    };
    universities();
  }, [id]);
  const btn1 = {
    sliderBtn1Bgcolor: consultancy ? consultancy.sliderBtn1Bgcolor : "",
    sliderBtn1Text: consultancy ? consultancy.sliderBtn1Text : "",
    sliderBtn1color: consultancy ? consultancy.sliderBtn1color : "",
    sliderBtn1link: consultancy ? consultancy.sliderBtn1link : "",
  };

  const btn2 = {
    sliderBtn2Bgcolor: consultancy ? consultancy.sliderBtn2Bgcolor : "",
    sliderBtn2Text: consultancy ? consultancy.sliderBtn2Text : "",
    sliderBtn2color: consultancy ? consultancy.sliderBtn2color : "",
    sliderBtn2link: consultancy ? consultancy.sliderBtn2link : "",
  };
  console.log("sfdcsxz");
  console.log("btn1", btn1);
  const opts = useMemo(
    () => ({
      height: window.innerWidth >= 768 ? "500" : "300",
      width: window.innerWidth >= 768 ? window.innerWidth : window.innerWidth,
      playerVars: {
        autoplay: true,
        mute: true
      },
    }),
    []
  );
  const onReady = () => {
    console.log("ready");
  };
  const getFileExtension = (filename) => {
    return filename.split('.').pop(); // Extracts extension from filename
  };
  
  const onDownloadingPdf = (filename,fileType) => {
    fetch(filename).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `Dews.${filename}`;
        alink.click();
      });
    });
    //  const name = "Dews-Docs"
    //   fetch(filename).then((response) => {
    //     console.log(response,'resp');
    //     response.blob().then((blob) => {
    //       // Creating new object of PDF file
    //       console.log(blob,'blob');
    //       const fileURL = window.URL.createObjectURL(blob);
    //       console.log(fileURL);
    //       // Setting various property values
    //       let alink = document.createElement("a");
    //       alink.href = fileURL;
    //       // console.log(filename);
    //       alink.download = name;
    //       alink.click();
    //     });
    //   });
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
      background: "transparent !important",
      // background: "red",
      border: "none",
      height: "80%",
      "@media (maxWidth: 768px)": {
        width: "80%",
        height: "60%",
        // Add other styles for smaller screens
      },
    },
  };

  function closeModal() {
    setIsOpen(false);
  }
  // console.log("consultancy?.sliderImages",JSON.parse(consultancy?.sliderImages))
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        // style={{background:"red",width:"100%",height:"100px",zindex:"999"}}
        contentLabel="Example Modal"
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "20px auto"
          }}
        ></div>
        <motion.div
          key={"modal"}
          initial={{ opacity: 0, height: "0%", borderRadius: 0 }}
          animate={{ opacity: 1, height: "80%", borderRadius: 20 }}
          transition={{
            duration: "3",
            damping: "25",
            type: "spring",
          }}
          exit={{ opacity: 0, height: "0%" }}
          style={{
            background: "white",
            width: "80%",
            height: "80%",
            margin: "auto",
            position: "relative",
            overflow:"scroll"
          }}
        >
          <RxCrossCircled
            size={40}
            onClick={closeModal}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              cursor: "pointer",
            }}
          />
          {console.log(
            "modalData",
            modalData
              ? JSON.parse(modalData?.createpackage?.packageaction)[0].action
              : ""
          )}

          <div className="model-inner">
            <div style={{ width: "90%", margin: "auto" }}>
              <h3 className="model-inner-heading">
                {/* {modalData?.createpackage?.packageheading} */}
              </h3>
              <div className="model-inner-description-scroll">
                <h5 className="model-inner-description">Description: </h5>
                <p>{parse(`${modalData?.createpackage?.longdescription}`)}</p>
                {/* <p>{modalData?.createpackage?.longdescription}</p> */}
              </div>
              <div className="model-inner-Duration">
                <h4>Duration :</h4>
                <p>{modalData?.createpackage?.packagevalidity} Days</p>
              </div>

              <div className="model-inner-Duration">
                <h4>Price :</h4>
                <p>{modalData?.createpackage?.packageamount} Rs</p>
              </div>
              <div className="model-inner-Duration">
                <h4>University :</h4>
                {modalData && (
                  <p>
                    {JSON.parse(
                      JSON.parse(modalData?.createpackage?.packageaction)[0]
                        .action
                    )}
                  </p>
                )}
              </div>
            </div>
            
          </div>
          <div
            style={{
              position: "fixed",
              bottom: "30px",
              left: "0",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              style={{backgroundColor:"white"}}
              className="custom-btn btn-16"
              onClick={() => {
                if (user) {
                  naviation("/Buynow", {
                    state: {
                      price: modalData?.createpackage?.packageamount,
                      packagedetails: modalData?.createpackage,
                      consultancydetails: modalData,
                      packageuniversity: `${JSON.parse(
                        JSON.parse(modalData?.createpackage?.packageaction)[0]
                          .action
                      )}`,
                    },
                  });
                  setIsOpen(false);
                } else {
                  alert.show("Please Login First");
                }
              }}
            >
              Buy Now !!
            </button>
          </div>
        </motion.div>
      </Modal>


      <Navbar consultancy={item.id} />
      <Chatbot />
      <div className="sele-main-div">
        {/* main slider */}
        <SelectedSlider sliderimages={sliderImages} btn1={btn1} btn2={btn2} />

        {/* university list */}
        {consultancypackage?.length !== 0 && (
          <section className="uni-list-section" style={{ background: "white" }}>
            <div className="uni-list-container">
              <h4
                id="uni-list-container-heading"
                style={{ color: consultancy.universitysectionheadingcolor }}
              >
                Our Services
              </h4>
              <div className="uni_list_container_inner">
                <Swiper
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  // navigation={true}
                  modules={[Pagination]}
                  className="uni-list-Swiper"
                  id={modalIsOpen ? "selected-uni-swiper" : ""}
                >
                  {console.log("consultancypackage", consultancypackage)}
                  {consultancypackage?.map((item, key) => {
                    return (
                      <div key={key}>
                        {item.status === true && (
                          <SwiperSlide className="uni-list-box-wraper">
                            <div
                              onClick={() => {
                                openModal();
                                setModalData(item);
                              }}
                              className="uni-list-box"
                              style={{
                                background: `${
                                  JSON.parse(item?.setting)["bg"]
                                }`,
                              }}
                            >
                              {console.log(
                                "item.setting[0]",
                                `${JSON.parse(item?.setting)["bg"]}`
                              )}
                              <p id="uni-list-box-name">
                              {parse(`${item.createpackage?.packageheading}`)}
                              </p>
                              {item.createpackage?.packagedescription && (
                                <div>
                                  <p id="uni-list-box-state2">
                                    {item.createpackage?.packageSubheading}
                                  </p>
                                  <p id="uni-list-box-state">
                                    {item.createpackage?.packagedescription}
                                  </p>
                                </div>
                               
                              )}
                            </div>
                          </SwiperSlide>
                        )}
                      </div>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </section>
        )}
        
        {(consultancy?.admissionprocesstitle || imageUrl) && (
          <div
            className="admission-process-container"
            style={{
              background: `url(${imageUrl}) center center / cover`,
              backgroundAttachment: "fixed",
            }}
          >
            <div className="Addmision_heading_div">
              <h4
                style={{
                  color: consultancy.admissionProcesstitlecolor
                    ? consultancy.admissionProcesstitlecolor
                    : "white",
                }}
                id="admission-process-heading"
              >
                {parse(`${consultancy?.admissionprocesstitle}`)}
              </h4>
            </div>
            <div className="process-step-container">
              {console.log("processNumberList", processNumberList)}
              {Array.isArray(processNumberList) &&
                processNumberList.length > 0 &&
                processNumberList?.map((item, key) => {
                  return (
                    <div key={key} className="process-step">
                      <div className="process-num">
                        <span>{key + 1}</span>
                      </div>
                      <p id="process-para">
                        {parse(`${item?.admissionProcesssheading}`)}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* other university list */}
        {Uiversitieslist?.length !== 0 && (
          <div className="ot-uni-list-container">
            {/* <div className="ot-uni-list-container" style={{background:item.universitybackgroung}}> */}
            <h4
              id="uni-list-container-heading"
              style={{ color: consultancy.universityheadingcolor }}
            >
              Universities List
            </h4>
            <div className="ot-heading-container">
              <div className="ot-uni-logo hb">
                <p></p>
              </div>
              <div className="ot-uni-name hb">
                <p>University Name</p>
              </div>
              <div className="ot-uni-country hb">
                <p>Country</p>
              </div>
              <div className="ot-uni-country hb">
                <p>State</p>
              </div>
              <div className="ot-uni-hyper-link hb">
                <p>Link</p>
              </div>
              {/* <div className="ot-uni-hyper-link hb">
              <p>Visit</p>
            </div> */}
            </div>
            <div className="ot-scroll-list-container">
              {Uiversitieslist?.map((item, key) => {
                return (
                  <div key={key} className="ot-scroll-inner">
                    <div className="ot-uni-logo">
                      <div className="ot-uni-logo-img">
                        <img src={`${appuri}${item.logo}`} alt="imglogo1" />
                      </div>
                    </div>
                    <div className="ot-uni-name">
                      <p>{item.UniversityName}</p>
                    </div>
                    <div className="ot-uni-country">
                      <p>{item.country}</p>
                    </div>
                    <div className="ot-uni-country">
                      <p>{item.state}</p>
                    </div>
                    <div className="ot-uni-hyper-link">
                      <Link to={`${item.ReferenceLink}`}>read more</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {console.log(
          "AdvisoryPackagefile",
          `${consultancy?.AdvisoryPackagefile}`
        )}
        {/* pdf-download */}
        <div
          className="pdf-download-container"
          style={{
            background: `url(${Advisortbg}) center center / cover`,
            backgroundAttachment: "fixed",
          }}
        >
          {/* <div className="pdf-download-container" style={{background:item.AdvisoryPackagebackground}}> */}
          <div className="pdf-text">
            <h4
              style={{ color: consultancy?.AdvisoryPackageheadingcolor }}
              id="pdf-download-container-heading"
            >
               {parse(`${consultancy?.AdvisoryPackageheading}`)}
            </h4>
            <ul id="pdf-download-container-ul">
              <li>{parse(`${consultancy?.AdvisoryPackagelist}`)}</li>
            </ul>
          </div>
          <div className="download-content">
            <button
              style={{
                color: consultancy?.AdvisoryPackagebtntextcolor,
                background: consultancy?.AdvisoryPackagebtnbgcolor,
              }}
              id="download-content-link"
              onClick={() => {
                // onDownloadingPdf(item.AdvisoryPackagefile)
                onDownloadingPdf(`${consultancy?.AdvisoryPackagefile}`, getFileExtension(`${consultancy?.AdvisoryPackagefile}`));
              }}
            >
              {consultancy?.AdvisoryPackagebtntext}
            </button>
          </div>
        </div>

        {/* youtubeVideo */}
        {item?.youtubevideolink && (
          <div className="youtubevideo_Section">
            <YouTube
              className="youtubeplayer"
              // videoId="hKpnEGrueMs"
              videoId={`${item.youtubevideolink}`}
              opts={opts}
              onReady={onReady}
            />
          </div>
        )}

        {/* youtubeVideo */}
        <section className="addmision_progress_stage_section">
          {imageSliderText.map((item, key) => {
            console.log("addmision_progress_stage_section", item);
            return (
              <div key={key}>
                {console.log("key", key)}
                {key % 2 === 0 ? (
                  <div
                    className="addmission_progress_container"
                    style={{ backgroundColor: item.background }}
                  >
                    <div className="addmision_process_image_container">
                      {item.image ? (<img
                        src={`${appuri}${item.image}`}
                        alt="sliderimg0"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />):('')}
                     
                    </div>
                    <div className="addmision_process_para_container">
                      <div className="paraheading">
                        <h4>{item.heading}</h4>
                      </div>
                      <div className="para_box">
                        <p>{parse(`${item.para}`)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="addmission_progress_container swap_container"
                    style={{ backgroundColor: item.background }}
                  >
                      <div className="addmision_process_image_container">
                        {item.image ? (<img
                          src={`${appuri}${item.image}`}
                          alt="sliderimg0"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />):('')}
                     
                    </div>
                    <div className="addmision_process_para_container">
                      <div className="paraheading">
                        <h4>{item.heading}</h4>
                      </div>
                      <div className="para_box swap_para_box">
                        <p>{parse(`${item.para}`)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default SelectedConsultancy;
