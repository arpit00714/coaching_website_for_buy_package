import { useEffect, useState } from "react";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";
import "./home.css";
function Home() {
  // const [init, setInit] = useState(false);

  // useEffect(() => {
  //   initParticlesEngine(async (engine) => {
  //     await loadSlim(engine);
  //   }).then(() => {
  //     setInit(true);
  //   });
  // }, []);

  // const particlesLoaded = (container) => {
  //   console.log(container);
  // };

  // const options = useMemo(
  //   () => ({
  //     background: {
  //       color: {
  //         value: "transparent",
  //       },
  //     },
  //     fpsLimit: 120,
  //     interactivity: {
  //       events: {
  //         onClick: {
  //           enable: true,
  //           mode: "push",
  //         },
  //         onHover: {
  //           enable: true,
  //           mode: "repulse",
  //         },
  //       },
  //       modes: {
  //         push: {
  //           quantity: 4,
  //         },
  //         repulse: {
  //           distance: 200,
  //           duration: 0.4,
  //         },
  //       },
  //     },
  //     particles: {
  //       color: {
  //         value: "#f1c50e",
  //       },
  //       links: {
  //         color: "#f1c50e",
  //         distance: 150,
  //         enable: true,
  //         opacity: 0.5,
  //         width: 1,
  //       },
  //       move: {
  //         direction: "none",
  //         enable: true,
  //         outModes: {
  //           default: "bounce",
  //         },
  //         random: false,
  //         speed: 2,
  //         straight: false,
  //       },
  //       number: {
  //         density: {
  //           enable: true,
  //         },
  //         value: 80,
  //       },
  //       opacity: {
  //         value: 0.5,
  //       },
  //       shape: {
  //         type: "circle",
  //       },
  //       size: {
  //         value: { min: 1, max: 5 },
  //       },
  //     },
  //     detectRetina: true,
  //   }),
  //   [],
  // );

  // if (init) {
  //   return (
  //   <>
  //         <Particles
  //       id="tsparticles"
  //       particlesLoaded={particlesLoaded}
  //       options={options}
  //     />
  //     <div style={{width:"100%",height:"100px",}}>
  //       <Navbar/>
  //     </div>
  //     <Slider/>
  //     <div className="u-prep">
  //         <div className="u-test">
  //          <p>Test Prepration</p>
  //          <a href="/">
  //          Click here
  //          </a>
  //         </div>
  //         <div className="u-prpe-mid-line"></div>
  //         <div className="u-consult">
  //          <p>Addmision Consultancy</p>
  //          <a href="/" to="/ConsultancyMenu">
  //          Click here
  //          </a>
  //         {/* <a href="/">

  //          </a> */}
  //         </div>
  //        </div>
  //   </>
  //   );
  // }

  return (
    <>
      <div className="home-main-container">
        <div className="svg-container">
      <div className="svg-container-inner">
        <div className="com-logo-container">
        <div className="com-logo"></div>
        </div>
    
      <svg
            className="u-svg-link"
            preserveAspectRatio="none"
            viewBox="0 0 160 150"
          >
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="#svg-40dc"
            ></use>
          </svg>
          <svg
            className="u-svg-content"
            viewBox="0 0 160 150"
            x="0px"
            y="0px"
            id="svg-40dc"
          >
            <path
              d="M43.2,126.9c14.2,1.3,27.6,7,39.1,15.6c8.3,6.1,19.4,10.3,32.7,5.3c11.7-4.4,18.6-17.4,21-30.2c2.6-13.3,8.1-25.9,15.7-37.1
	c8.3-12.1,10.8-27.9,5.3-42.7C150.5,20.3,134.6,9,117,7.6C107.9,6.9,98.8,5,90.1,1.9C83-0.6,75-0.7,67.4,2.1
	c-9.9,3.7-17,11.6-20.1,21c-3.3,10.1-10.9,18-20.6,22.2c-0.1,0-0.1,0.1-0.2,0.1c-20.3,8.9-31,32-24.6,53.2
	C6.9,115.6,25.2,125.2,43.2,126.9z"
            ></path>
          </svg>
      </div>
        </div>
        <div className="u-prep">
          <div className="u-test">
            <p>Test Prepration</p>
            <a href="/">Click here</a>
          </div>
          <div className="u-prpe-mid-line"></div>
          <div className="u-consult">
            <p>Addmision Consultancy</p>
            <a href="/" to="/ConsultancyMenu">
              Click here
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
