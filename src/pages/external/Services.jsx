// import React from "react";
// import "../../styles/accordion.css";
// import d from "../../assets/images/Frame 48.svg";
// import image1 from "../../assets/images/image1.jpeg";
// import image2 from "../../assets/images/image2.jpeg";
// import image3 from "../../assets/images/image3.jpeg";
// import image4 from "../../assets/images/image4.jpeg";
// import Accordion from "../../components/Accordion";
// import Download from "../../components/Download";
// import { useInView } from "react-intersection-observer";
// import { motion } from "framer-motion";
// import { fadeIn } from "../../components/variants";

// const Services = () => {
//   const [ref, inView] = useInView({
//     threshold: 0.5,
//   });

//   return (
//     <div className="service-con overflow-x-hidden">
//       <header>
//         <div className="" style={{ height: "309px" }}>
//           <img
//             src={d}
//             alt=""
//             className="img-fluid tire"
//             style={{ height: "100%", objectFit: "cover", width: "100%" }}
//           />
//         </div>
//       </header>

//       <section style={{ backgroundColor: "#FFFDE4" }} className="py-5">
//         <main className="container-lg d-flex flex-column gap-5">
//           <div className="d-flex flex-column gap-3">
//             <h3 className="fs-2 fw-semibold pt-5 text-center">What We Offer</h3>
//             <p className="offset-1 col-10 text-center fw-normal fs-5">
//               Pause Point app offers a comprehensive suite of features to
//               streamline and enhance the resident experience. These features
//               encompass visitor management, community engagement, health
//               information, and security services. Here are the main points
//               listed below:
//             </p>
//           </div>

//           <div className="container gap-5 d-flex justify-content-between flex-wrap">
//             <motion.div
//               variants={fadeIn("up", 0.5)}
//               initial="hidden"
//               whileInView={"show"}
//               viewport={{ once: false, amount: 0.3 }}
//               className="d-flex flex-column  justify-content-center align-items-center col-12 col-md-5 py-md-5"
//             >
//               <div className="col-10">
//                 <img
//                   src={image1}
//                   alt=""
//                   style={{ borderRadius: "20px 20px 0 0" }}
//                   className="img-fluid"
//                 />
//               </div>
//               <div
//                 style={{
//                   backgroundColor: "rgba(4, 151, 60, 0.40)",
//                   width: "100%",
//                   borderRadius: " 0 0 40px 40px",
//                 }}
//                 className="border border-dark border-3"
//               >
//                 <div className="d-flex flex-column py-4 px-4 gap-3">
//                   <h3 className="fs-2 fw-semibold text-center">
//                     Vistor Management
//                   </h3>
//                   <p className="fw-normal fs-5 pb-2">
//                     Residents can use the app to pre-register their guests,
//                     offering essential visitor information, and the security
//                     personnel can efficiently verify visitors against this
//                     pre-registered data. Pause Point app generate temporary
//                     access codes or QR codes for visitors, streamlining their
//                     entry process, and also provide real-time notifications to
//                     residents, keeping them informed about visitor arrivals.
//                     Creating privacy for users and ensuring safety.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               variants={fadeIn("down", 0.5)}
//               initial="hidden"
//               whileInView={"show"}
//               viewport={{ once: false, amount: 0.3 }}
//               className="d-flex flex-column  justify-content-center align-items-center col-12 col-md-5 py-md-5"
//             >
//               <div className="col-10">
//                 <img
//                   src={image2}
//                   alt=""
//                   style={{ borderRadius: "20px 20px 0 0" }}
//                   className="img-fluid"
//                 />
//               </div>
//               <div
//                 style={{
//                   backgroundColor: "rgba(4, 151, 60, 0.40)",
//                   width: "100%",
//                   borderRadius: " 0 0 40px 40px",
//                 }}
//                 className="border border-dark border-3"
//               >
//                 <div className="d-flex flex-column py-4 px-4 gap-3">
//                   <h3 className="fs-2 fw-semibold text-center">
//                     Community Management
//                   </h3>
//                   <p className="fw-normal fs-5 pb-2">
//                     Pause Point app serves as a central hub for
//                     community-related activities, enabling administrators to
//                     post announcements and alerts, ensuring residents are
//                     updated with the latest news and important notices. It also
//                     facilitates event scheduling, allowing residents to view and
//                     RSVP for community events, and maintains a digital directory
//                     of residents and essential contacts, promoting community
//                     engagement.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               variants={fadeIn("right", 0.5)}
//               initial="hidden"
//               whileInView={"show"}
//               viewport={{ once: false, amount: 0.3 }}
//               className="d-flex flex-column  justify-content-center align-items-center col-12 col-md-5 py-md-5"
//             >
//               <div className="col-10">
//                 <img
//                   src={image3}
//                   alt=""
//                   style={{ borderRadius: "20px 20px 0 0" }}
//                   className="img-fluid"
//                 />
//               </div>
//               <div
//                 style={{
//                   backgroundColor: "rgba(4, 151, 60, 0.40)",
//                   width: "100%",
//                   borderRadius: " 0 0 40px 40px",
//                 }}
//                 className="border border-dark border-3"
//               >
//                 <div className="d-flex flex-column py-4 px-4 gap-3">
//                   <h3 className="fs-2 fw-semibold text-center">
//                     Health Information
//                   </h3>
//                   <p className="fw-normal fs-5 pb-2">
//                     Residents can access health-related information, including
//                     health alerts and updates issued by community management,
//                     ensuring they stay informed about health advisories or
//                     critical news. Residents may also use the app to voluntarily
//                     report their health status or symptoms, promoting community
//                     awareness. Furthermore, the app can offer a section with
//                     details about local healthcare resources, such as nearby
//                     hospitals, clinics, and pharmacies, making it a valuable
//                     health management tool. Like the saying goes Health is
//                     Wealth.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               variants={fadeIn("left", 0.5)}
//               initial="hidden"
//               whileInView={"show"}
//               viewport={{ once: false, amount: 0.3 }}
//               className="d-flex flex-column  justify-content-center align-items-center col-12 col-md-5 py-md-5"
//             >
//               <div className="col-10">
//                 <img
//                   src={image4}
//                   alt=""
//                   style={{ borderRadius: "20px 20px 0 0" }}
//                   className="img-fluid"
//                 />
//               </div>
//               <div
//                 style={{
//                   backgroundColor: "rgba(4, 151, 60, 0.40)",
//                   width: "100%",
//                   borderRadius: " 0 0 40px 40px",
//                 }}
//                 className="border border-dark border-3"
//               >
//                 <div className="d-flex flex-column py-4 px-4 gap-3">
//                   <h3 className="fs-2 fw-semibold text-center">
//                     Security Services
//                   </h3>
//                   <p className="fw-normal fs-5 pb-2">
//                     Pause Point app plays a crucial role in enhancing security
//                     within the gated community. It allows for the rapid
//                     dissemination of emergency alerts and security
//                     notifications, ensuring residents are promptly informed
//                     during critical situations. Providing an additional layer of
//                     security awareness. Moreover, the app features an incident
//                     reporting system, enabling residents to report security
//                     concerns directly. Lastly, it simplifies gate access control
//                     by allowing residents to request or grant access to
//                     visitors, enhancing overall security management.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           <div className="pb-5">
//             <h3 className="fs-2 fw-semibold pt-5 text-center pb-4">
//               Frequently Asked Questions
//             </h3>
//             <Accordion />
//           </div>
//         </main>
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//       </section>
//       <div className="">
//         <Download />
//       </div>
//     </div>
//   );
// };

// export default Services;

import React from "react";
import "../../styles/accordion.css";
import d from "../../assets/images/Frame 48.svg";
import image1 from "../../assets/images/image1.jpeg";
import image2 from "../../assets/images/image2.jpeg";
import image3 from "../../assets/images/image3.jpeg";
import image4 from "../../assets/images/image4.jpeg";
import Accordion from "../../components/Accordion";
import Download from "../../components/Download";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeIn } from "../../components/variants";

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const services = [
    {
      image: image1,
      title: "Visitor Management",
      description:
        "Residents can use the app to pre-register their guests, offering essential visitor information, and the security personnel can efficiently verify visitors against this pre-registered data. Pause Point app generate temporary access codes or QR codes for visitors, streamlining their entry process, and also provide real-time notifications to residents, keeping them informed about visitor arrivals. Creating privacy for users and ensuring safety.",
      icon: "👥",
      color: "#D1FAE5",
      iconColor: "#10B981",
      animation: "up",
    },
    {
      image: image2,
      title: "Community Management",
      description:
        "Pause Point app serves as a central hub for community-related activities, enabling administrators to post announcements and alerts, ensuring residents are updated with the latest news and important notices. It also facilitates event scheduling, allowing residents to view and RSVP for community events, and maintains a digital directory of residents and essential contacts, promoting community engagement.",
      icon: "🏘️",
      color: "#DBEAFE",
      iconColor: "#2563EB",
      animation: "down",
    },
    {
      image: image3,
      title: "Health Information",
      description:
        "Residents can access health-related information, including health alerts and updates issued by community management, ensuring they stay informed about health advisories or critical news. Residents may also use the app to voluntarily report their health status or symptoms, promoting community awareness. Furthermore, the app can offer a section with details about local healthcare resources, such as nearby hospitals, clinics, and pharmacies, making it a valuable health management tool. Like the saying goes Health is Wealth.",
      icon: "🏥",
      color: "#FEE2E2",
      iconColor: "#DC2626",
      animation: "right",
    },
    {
      image: image4,
      title: "Security Services",
      description:
        "Pause Point app plays a crucial role in enhancing security within the gated community. It allows for the rapid dissemination of emergency alerts and security notifications, ensuring residents are promptly informed during critical situations. Providing an additional layer of security awareness. Moreover, the app features an incident reporting system, enabling residents to report security concerns directly. Lastly, it simplifies gate access control by allowing residents to request or grant access to visitors, enhancing overall security management.",
      icon: "🔒",
      color: "#FEF3C7",
      iconColor: "#F59E0B",
      animation: "left",
    },
  ];

  return (
    <div style={{ background: "#F9FAFB" }} ref={ref}>
      {/* Hero Section */}
      <header>
        <div
          style={{
            height: "400px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={d}
            alt="Services Header"
            style={{
              height: "100%",
              objectFit: "cover",
              width: "100%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.6) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                textAlign: "center",
                color: "white",
                padding: "0 20px",
              }}
            >
              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                  textShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
              >
                Our Services
              </h1>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  maxWidth: "600px",
                  margin: "0 auto",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                Comprehensive solutions for modern estate management
              </p>
            </div>
          </div>
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
          {/* Introduction */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "64px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#D1FAE5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                ✨
              </div>
              <h3
                style={{
                  fontSize: "40px",
                  fontWeight: 700,
                  color: "#111827",
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                What We Offer
              </h3>
            </div>

            <p
              style={{
                fontSize: "18px",
                color: "#374151",
                lineHeight: 1.8,
                fontWeight: 500,
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              Pause Point app offers a comprehensive suite of features to
              streamline and enhance the resident experience. These features
              encompass visitor management, community engagement, health
              information, and security services.
            </p>
          </div>

          {/* Services Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
              gap: "32px",
              marginBottom: "80px",
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn(service.animation, 0.5)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.3 }}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 25px -5px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Image Section */}
                <div
                  style={{
                    position: "relative",
                    height: "280px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {service.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div style={{ padding: "32px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: service.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: service.iconColor,
                        fontSize: "20px",
                      }}
                    >
                      {service.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: "24px",
                        fontWeight: 700,
                        color: "#111827",
                        margin: 0,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontSize: "15px",
                      color: "#374151",
                      lineHeight: 1.7,
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "48px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
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
                    background: "#EDE9FE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  ❓
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
                  Frequently Asked Questions
                </h3>
              </div>
              <p
                style={{
                  fontSize: "16px",
                  color: "#6B7280",
                  fontWeight: 500,
                }}
              >
                Find answers to common questions about our services
              </p>
            </div>

            <Accordion />
          </div>
        </main>
      </section>

      {/* Download Section */}
      <div style={{ background: "#10B981" }}>
        <Download />
      </div>
    </div>
  );
};

export default Services;
