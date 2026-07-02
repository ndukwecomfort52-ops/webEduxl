// import React from "react";
// import hero from "../../assets/images/about-header.svg";
// import star2 from "../../assets/images/Star 2.svg";
// import star1 from "../../assets/images/Star 1.svg";
// import image1 from "../../assets/images/Frame 91.svg";
// import image2 from "../../assets/images/Frame 8.svg";
// // import person1 from "../../assets/images/cofounder1.png";
// // import person2 from '../assets/images/Ellipse 8.svg'
// // import person3 from "../../assets/images/businessdev.png";
// // import linkedin from "../../assets/images/devicon_linkedin.svg";
// // import twitter from "../../assets/images/fa6-brands_x-twitter.png";
// // import { Link } from "react-router-dom";
// // import blard from "../../assets/images/blard.jpeg"

// const About = () => {
//   return (
//     <div className="about-con overflow-x-hidden">
//       <header className="bg-[#04973C]">
//         <div
//           className="container-lg d-flex justify-content-between align-items-center about-hero gap-3 position-relative"
//           style={{ height: "553px" }}
//         >
//           <div className=" col-12 col-sm-6 pe-lg-5">
//             <h1 className="text-light fs-2 fw-semibold pb-3">About Us</h1>
//             <p className="pe-5 fw-normal text-light fs-5 ">
//               At Pause Point, we're on a mission to create safer, more connected
//               communities through innovative technology. Our platform brings
//               neighbors closer, secures assets, and ensures family safety. With
//               privacy and security as our guiding principles, we're reshaping
//               the way you experience the world right at your doorstep. Welcome
//               to <b>Pause Point</b>, your gateway to safer, more connected
//               living.
//             </p>
//           </div>
//           <div className="d-none d-sm-block col-sm-6 pe-2">
//             <img src={hero} alt="" className="img-fluid" />
//           </div>
//           <img
//             src={star2}
//             alt=""
//             className="position-absolute d-none d-sm-block"
//             style={{ bottom: "50px", left: "14px" }}
//           />
//           <img
//             src={star1}
//             alt=""
//             className="position-absolute"
//             style={{ top: "15px", right: "10px" }}
//           />
//         </div>
//       </header>
//       <section style={{ backgroundColor: "#FFFDE4" }} className="pt-2 pb-5">
//         <main className="container-lg pb-5 pe-3 pe-lg-0">
//           <div className="d-flex align-items-center pt-5 mt-3 gap-5 flex-column flex-md-row">
//             <div className="col-12 col-md-5">
//               <h3 className="fs-3 fw-semibold pb-3 text-center text-md-start">
//                 Vision
//               </h3>
//               <p className="fw-normal fs-5">
//                 Our vision at Pause Point is to redefine community living in a
//                 digital age. We envision a world where residents enjoy peace of
//                 mind, knowing their privacy and security are paramount. Our
//                 platform will continue to be the bridge that strengthens
//                 community bonds, secures assets, and provides a safe environment
//                 for families to thrive. Together, we aim to build a future where
//                 'home' means not only a physical place but also a strong,
//                 connected, and secure community.
//               </p>
//             </div>
//             <div className="col-12 col-md-6">
//               <img src={image1} alt="" className="img-fluid" />
//             </div>
//           </div>

//           <div className="d-flex align-items-center pt-5 mt-3 gap-5 flex-column-reverse flex-md-row">
//             <div className="col-12 col-md-6">
//               <img src={image2} alt="" className="img-fluid" />
//             </div>
//             <div className="col-12 col-md-5">
//               <h3 className="fs-3 fw-semibold pb-3 text-center text-md-start">
//                 Mission
//               </h3>
//               <p className="fw-normal fs-5">
//                 At Pause Point, our mission is to create a secure and connected
//                 world within communities. We aim to empower residents to build
//                 strong social connections, safeguard their valuable assets, and
//                 ensure the safety of their families. Through innovative
//                 technology and unwavering commitment to privacy and security, we
//                 strive to foster a sense of belonging and trust within every
//                 neighborhood.
//               </p>
//             </div>
//           </div>
//           {/* <div className="pt-5 mt-3">
//             <h3 className="fs-3 fw-semibold pb-3 text-center mb-1">Our Team</h3>
//             <div className="d-flex justify-content-between gap-4 flex-column flex-md-row">
//               <div
//                 className="flex-fill"
//                 style={{ backgroundColor: "rgba(4, 151, 60, 0.30)" }}
//               >
//                 <div className="d-flex flex-column justify-content-center align-items-center">
//                   <div
//                     style={{ width: "90px", height: "90px" }}
//                     className="rounded-circle my-6"
//                   >
//                     <img src={person1} alt="" className="img-fluid" />
//                   </div>
//                   <div className="pb-3">
//                     <h4 className="text-center fs-5 fw-semibold">
//                       Mr. Oyelakin Kazeem
//                     </h4>
//                     <h5 className="text-center fs-6 fw-medium">
//                       Co-Founder, CEO & ACTO
//                     </h5>
//                   </div>
//                 </div>
//                 <div style={{ backgroundColor: "#04973C" }}>
//                   <div className="d-flex justify-content-center align-items-center py-2 gap-2">
//                     <Link to={""}>
//                       <img src={linkedin} alt="" />
//                     </Link>
//                     <Link to={""}>
//                       <img src={twitter} alt="" />
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className="flex-fill"
//                 style={{ backgroundColor: "rgba(4, 151, 60, 0.30)" }}
//               >
//                 <div className="d-flex flex-column justify-content-center align-items-center">
//                   <div
//                     style={{ width: "100px", height: "100px", borderRadius: "50%" }}
//                     className="rounded-circle my-3"
//                   >
//                     <img src={blard} alt="" className='img-fluid w-100' style={{ width: "100px", height: "100px", borderRadius: "50%" }}/>
//                   </div>
//                   <div className="pb-3">
//                     <h4 className="text-center fs-5 fw-semibold">
//                       Peter Omu (a.k.a Blard)
//                     </h4>
//                     <h5 className="text-center fs-6 fw-medium">
//                       Technical Team Lead
//                     </h5>
//                   </div>
//                 </div>
//                 <div style={{ backgroundColor: "#04973C" }}>
//                   <div className="d-flex justify-content-center align-items-center py-2 gap-2">
//                     <Link to={""}>
//                       <img src={linkedin} alt="" />
//                     </Link>
//                     <Link to={""}>
//                       <img src={twitter} alt="" />
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className="flex-fill"
//                 style={{ backgroundColor: "rgba(4, 151, 60, 0.30)" }}
//               >
//                 <div className="d-flex flex-column justify-content-center align-items-center">
//                   <div
//                     style={{ width: "100px", height: "100px" }}
//                     className="rounded-circle my-3"
//                   >
//                     <img src={person3} alt="" className="img-fluid" />
//                   </div>
//                   <div className="pb-3">
//                     <h4 className="text-center fs-5 fw-semibold">
//                       Engr. Kieran Uba
//                     </h4>
//                     <h5 className="text-center fs-6 fw-medium">
//                       Chief Operating Officer
//                     </h5>
//                   </div>
//                 </div>
//                 <div style={{ backgroundColor: "#04973C" }}>
//                   <div className="d-flex justify-content-center align-items-center py-2 gap-2">
//                     <Link to={""}>
//                       <img src={linkedin} alt="" />
//                     </Link>
//                     <Link to={""}>
//                       <img src={twitter} alt="" />
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//         </main>
//       </section>
//     </div>
//   );
// };

// export default About;

import React from "react";
import hero from "../../assets/images/about-header.svg";
import star2 from "../../assets/images/Star 2.svg";
import star1 from "../../assets/images/Star 1.svg";
import image1 from "../../assets/images/Frame 91.svg";
import image2 from "../../assets/images/Frame 8.svg";
// import person1 from "../../assets/images/cofounder1.png";
// import person2 from '../assets/images/Ellipse 8.svg'
// import person3 from "../../assets/images/businessdev.png";
// import linkedin from "../../assets/images/devicon_linkedin.svg";
// import twitter from "../../assets/images/fa6-brands_x-twitter.png";
// import { Link } from "react-router-dom";
// import blard from "../../assets/images/blard.jpeg"

const About = () => {
  return (
    <div style={{ background: "#F9FAFB" }}>
      {/* Hero Section */}
      <header style={{ background: "#10B981" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "80px 24px",
            display: "flex",
            alignItems: "center",
            gap: "48px",
            position: "relative",
            minHeight: "500px",
          }}
        >
          <div
            style={{
              flex: "1",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  backdropFilter: "blur(10px)",
                }}
              >
                🌟
              </div>
              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                About Us
              </h1>
            </div>

            <p
              style={{
                fontSize: "18px",
                color: "white",
                lineHeight: 1.8,
                fontWeight: 500,
                opacity: 0.95,
                maxWidth: "600px",
              }}
            >
              At Pause Point, we're on a mission to create safer, more connected
              communities through innovative technology. Our platform brings
              neighbors closer, secures assets, and ensures family safety. With
              privacy and security as our guiding principles, we're reshaping
              the way you experience the world right at your doorstep. Welcome
              to <span style={{ fontWeight: 700 }}>Pause Point</span>, your
              gateway to safer, more connected living.
            </p>
          </div>

          <div
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="d-none d-md-flex"
          >
            <img
              src={hero}
              alt="About Pause Point"
              style={{
                maxWidth: "100%",
                height: "auto",
                filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2))",
              }}
            />
          </div>

          <img
            src={star2}
            alt="decoration"
            style={{
              position: "absolute",
              bottom: "40px",
              left: "20px",
              opacity: 0.3,
              width: "48px",
              height: "48px",
            }}
            className="d-none d-md-block"
          />
          <img
            src={star1}
            alt="decoration"
            style={{
              position: "absolute",
              top: "40px",
              right: "20px",
              opacity: 0.3,
              width: "48px",
              height: "48px",
            }}
          />
        </div>
      </header>

      {/* Main Content Section */}
      <section style={{ padding: "80px 0" }}>
        <main
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {/* Vision Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "48px",
              marginBottom: "64px",
            }}
            className="flex-column flex-md-row"
          >
            <div style={{ flex: "1" }}>
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 25px -5px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "24px",
                    paddingBottom: "24px",
                    borderBottom: "2px solid #F3F4F6",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background: "#DBEAFE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                    }}
                  >
                    🔭
                  </div>
                  <h3
                    style={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "#111827",
                      letterSpacing: "-0.01em",
                      margin: 0,
                    }}
                  >
                    Vision
                  </h3>
                </div>

                <p
                  style={{
                    fontSize: "16px",
                    color: "#374151",
                    lineHeight: 1.8,
                    fontWeight: 400,
                    margin: 0,
                  }}
                >
                  Our vision at Pause Point is to redefine community living in a
                  digital age. We envision a world where residents enjoy peace
                  of mind, knowing their privacy and security are paramount. Our
                  platform will continue to be the bridge that strengthens
                  community bonds, secures assets, and provides a safe
                  environment for families to thrive. Together, we aim to build
                  a future where 'home' means not only a physical place but also
                  a strong, connected, and secure community.
                </p>
              </div>
            </div>

            <div
              style={{
                flex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={image1}
                  alt="Vision"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "48px",
              marginBottom: "64px",
            }}
            className="flex-column-reverse flex-md-row"
          >
            <div
              style={{
                flex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={image2}
                  alt="Mission"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>
            </div>

            <div style={{ flex: "1" }}>
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 25px -5px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "24px",
                    paddingBottom: "24px",
                    borderBottom: "2px solid #F3F4F6",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background: "#D1FAE5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                    }}
                  >
                    🎯
                  </div>
                  <h3
                    style={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "#111827",
                      letterSpacing: "-0.01em",
                      margin: 0,
                    }}
                  >
                    Mission
                  </h3>
                </div>

                <p
                  style={{
                    fontSize: "16px",
                    color: "#374151",
                    lineHeight: 1.8,
                    fontWeight: 400,
                    margin: 0,
                  }}
                >
                  At Pause Point, our mission is to create a secure and
                  connected world within communities. We aim to empower
                  residents to build strong social connections, safeguard their
                  valuable assets, and ensure the safety of their families.
                  Through innovative technology and unwavering commitment to
                  privacy and security, we strive to foster a sense of belonging
                  and trust within every neighborhood.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "48px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              marginBottom: "64px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#FEF3C7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  💎
                </div>
                <h3
                  style={{
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "#111827",
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  Our Core Values
                </h3>
              </div>
              <p
                style={{
                  fontSize: "16px",
                  color: "#6B7280",
                  fontWeight: 500,
                }}
              >
                The principles that guide everything we do
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              <div
                style={{
                  padding: "24px",
                  borderRadius: "12px",
                  background: "#F9FAFB",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F3F4F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F9FAFB";
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "#D1FAE5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    marginBottom: "16px",
                  }}
                >
                  🔒
                </div>
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  Privacy & Security
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Your data and safety are our top priorities
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  borderRadius: "12px",
                  background: "#F9FAFB",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F3F4F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F9FAFB";
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "#DBEAFE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    marginBottom: "16px",
                  }}
                >
                  🤝
                </div>
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  Community First
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Building stronger connections between neighbors
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  borderRadius: "12px",
                  background: "#F9FAFB",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F3F4F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F9FAFB";
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "#FEF3C7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    marginBottom: "16px",
                  }}
                >
                  ⚡
                </div>
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  Innovation
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Leveraging technology to solve real problems
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  borderRadius: "12px",
                  background: "#F9FAFB",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F3F4F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F9FAFB";
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "#EDE9FE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    marginBottom: "16px",
                  }}
                >
                  💪
                </div>
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  Reliability
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Consistent, dependable service you can trust
                </p>
              </div>
            </div>
          </div>

          {/* Team Section - Commented out but formatted */}
          {/* <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '48px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px',
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#E0E7FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}>
                  👥
                </div>
                <h3 style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}>
                  Our Team
                </h3>
              </div>
              <p style={{
                fontSize: '16px',
                color: '#6B7280',
                fontWeight: 500,
              }}>
                Meet the people behind Pause Point
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              Team member cards would go here
            </div>
          </div> */}
        </main>
      </section>
    </div>
  );
};

export default About;
