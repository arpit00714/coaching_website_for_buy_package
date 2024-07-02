import { Link } from "react-router-dom";
import "./home.css";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
const logoimg = require("../image/logocolour-u508906.png");

function Home() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 300,
            duration: 0.2,
          },
        },
      },
      particles: {
        color: {
          value: "#0000",
        },
        links: {
          color: "#0000",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed:1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 0.4, max: 2},
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
        <div>
          <div className="logo_about_container">
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection:"column",
                alignItems:"center"
              }}
            >
              <div className="com-logo">
                <img
                  src={logoimg}
                  alt="logoimg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div>
                <div style={{marginTop:"5px"}}>
                  <a id="linkanimation" href="/">About Us</a>
                </div>
                <div style={{marginTop:"5px"}}>
                  <a  id="linkanimation" href="/">Contact Us</a>
                </div>
              </div>
            </div>
          </div>

          <div className="u-prep-container">
            <div className="u-prep">
              <div className="u-test">
                <p>Test Prepration</p>
                <Link to="/">Click here</Link>
              </div>
              <div className="u-prpe-mid-line"></div>
              <div className="u-consult">
                <p>Admission Consultancy</p>
                <Link to="/ConsultancyMenu">Click here</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
