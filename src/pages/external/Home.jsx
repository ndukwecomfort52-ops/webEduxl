// import React, { useState } from "react";
// import Iphone from "../../assets/iPhone 12 Pro-up.png";
// import Star1 from "../../assets/Star 2.svg";
// import Line from "../../assets/Element 09.svg";
// import Star2 from "../../assets/Star 1.svg";
// import Hand from "../../assets/handFrame.png";
// import Bulb from "../../assets/bulbFrame.png";
// import { useInView } from "react-intersection-observer";
// import { motion } from "framer-motion";
// import { fadeIn } from "../../components/variants";
// import Download from "../../components/Download";
// import { Link } from "react-router-dom";
// import TestimonialSlide from "../../components/TestimonialSlide";
// import AppWrapperContainer from "@/components/layout/index";

// const Home = () => {
//   const [ref, inView] = useInView({
//     threshold: 0.5,
//   });
//   return (
//     <div className="overflow-x-hidden" ref={ref}>
//       <div className="bg-[#04973C]">
//         <AppWrapperContainer className="isolate flex justify-center py-16">
//           <div className="relative max-w-[85%] w-[100%] lg:flex items-center justify-between gap-10 text-white">
//             <motion.div
//               variants={fadeIn("right", 0.3)}
//               initial="hidden"
//               whileInView={"show"}
//               viewport={{ once: false, amount: 0.3 }}
//               className="relative max-w-[750px] m-auto text-left space-y-3 w-[100%] lg:w-[50%]"
//             >
//               <h1 className="text-[50px] font-[600]">Pause Point</h1>
//               <p className="text-[18px] lg:text-[22px]">
//                 <span className="text-warning"></span>Experience seamless home
//                 management with our estate and visitor management tech
//                 solutions. Enjoy enhanced security, convenience, and stronger
//                 community connections. Let's connect, it's privacy time...
//                 <span className="text-warning"></span>
//               </p>
//               <img
//                 src={Line}
//                 alt="line"
//                 className="absolute -z-10 right-0 lg:right-30 bottom-0"
//               />
//               <Link to="/contact">
//                 <button className="bannerBtn mt-3  hover:border-lime-600 hover:bg-green-200 hover:text-teal-950">
//                   Book A Demo
//                 </button>
//               </Link>
//             </motion.div>

//             {/* Iphone */}
//             <motion.div
//               variants={fadeIn("up", 0.3)}
//               initial="hidden"
//               whileInView={"show"}
//               viewport={{ once: false, amount: 0.3 }}
//               className="w-[100%] lg:w-[50%] flex justify-center"
//             >
//               <img src={Iphone} alt="iphone" className="hidden lg:block" />
//               <img
//                 src={Star2}
//                 alt="star"
//                 className="absolute -z-10 top-0 right-0"
//               />
//             </motion.div>
//             <img
//               src={Star1}
//               alt="star"
//               className="absolute -z-10 bottom-0 left-0"
//             />
//           </div>
//         </AppWrapperContainer>
//       </div>

//       <div className=" bg-[#D6EDCA] py-20">
//         <AppWrapperContainer className="flex flex-col items-center gap-32">
//           <div className="max-w-[90%] w-[100%] lg:flex items-center justify-between gap-10">
//             <motion.div
//               variants={fadeIn("right", 0.3)}
//               initial="hidden"
//               whileInView={"show"}
//               viewport={{ once: false, amount: 0.3 }}
//               className="w-full lg:w-[55%]"
//             >
//               <img src={Hand} alt="hand" />
//             </motion.div>
//             <motion.div
//               variants={fadeIn("left", 0.5)}
//               initial="hidden"
//               whileInView={"show"}
//               viewport={{ once: false, amount: 0.3 }}
//               className="space-y-3 mt-10 lg:mt-0 w-full lg:w-[40%]"
//             >
//               <h2 className="text-[36px] font-[600]">What we offer</h2>
//               <p className="text-[20px] tracking-[0.4px]">
//                 Certainly, here are few key offerings of Pause Point:
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Visitor Management System: Controls and tracks visitor access to
//                 the community or estate.
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Community/Estate Management Tools: Provide tools to manage
//                 various aspects of the community, such as maintenance,
//                 communication, and facility bookings.
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Artisan Services Platform: Connects residents with local
//                 artisans and service providers for tasks like repairs and
//                 maintenance.
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Event Ticketing Platform: Facilitates the organization and
//                 management of community events, including ticket sales and
//                 RSVPs.
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Resident (Peer to Peer) Marketplace: Enables residents to buy,
//                 sell, or exchange goods and services directly with each other.
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Additional Services: Offer a range of extra features such as
//                 health information access, emergency assistance, utility bill
//                 payments, chats and more.
//               </p>
//             </motion.div>
//           </div>
//         </AppWrapperContainer>

//         {/* Why Choose Us */}
//         <AppWrapperContainer>
//           <div className="max-w-[90%] mx-auto w-[100%] lg:flex items-center justify-between gap-10 lg:flex-row-reverse pt-16">
//             <motion.div
//               variants={fadeIn("left", 0.5)}
//               initial="hidden"
//               whileInView={"show"}
//               viewport={{ once: false, amount: 0.3 }}
//               className="w-full lg:w-[55%]"
//             >
//               <img src={Bulb} alt="bulb" />
//             </motion.div>
//             <motion.div
//               variants={fadeIn("right", 0.3)}
//               initial="hidden"
//               whileInView={"show"}
//               viewport={{ once: false, amount: 0.3 }}
//               className="space-y-3 mt-10 lg:mt-0 w-full lg:w-[40%]"
//             >
//               <h2 className="text-[36px] font-[600]">Why Choose Us</h2>
//               <p className="text-[20px] tracking-[0.4px]">
//                 Using Pause Point is beneficial for several reasons:
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Safety First: Your security is our top priority. We combine
//                 advanced technology and dedicated personnel to keep your
//                 community safe.
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Community Connection: We bring neighbors closer. Build strong
//                 relationships, share experiences, and collaborate like never
//                 before.
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Efficient Estate Management: Streamline estate management with
//                 our admin portal. Approve new member registrations, manage
//                 events, and more.
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Voice Your Opinions: Participate in community polls and surveys
//                 to shape decisions, ensuring your voice is heard.
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Never Miss an Event: Stay in the loop with community events,
//                 gatherings, and activities. Create and manage your own events
//                 with ease.
//               </p>
//               <p className="add-checkbox flex text-[16px] tracking-[0.32px]">
//                 Emergency Assistance: Your safety is our concern. Our emergency
//                 button ensures help is just a tap away.
//               </p>
//             </motion.div>
//           </div>
//         </AppWrapperContainer>
//       </div>

//       <div className="bg-[#FFFDE4] py-32">
//         <AppWrapperContainer className="flex flex-col  gap-32 items-center">
//           {/* Our Services */}
//           <div className="max-w-[90%] w-[100%] space-y-20">
//             {/* Our Services */}
//             <div className="text-center space-y-5">
//               <h3 className="text-[36px] font-[600] py-6">Our Services</h3>
//               <div className="max-w-[1038px] w-full m-auto tracking-[0.4px]">
//                 <p>
//                   <b>
//                     At Pause Point, we offer a comprehensive suite of services
//                     aimed at improving the overall quality of life within your
//                     community, including enhanced security measures, enhanced
//                     community connections, streamlined estate management through
//                     an admin portal, tools for open dialogue and
//                     decision-making, support for organizing community events,
//                     and quick access to emergency assistance. Choose Pause Point
//                     to create a safer, more connected, and thriving community
//                     environment. Let's Connect, It's privacy time...
//                   </b>
//                 </p>
//               </div>
//               <Link to="/services">
//                 <button className="seeMoreBtn m-auto mt-3">See More...</button>
//               </Link>
//             </div>

//             {/* Subscription Plan */}
//             <div className="text-center space-y-5">
//               <h3 className="text-[36px] font-[600]">Subscription Plans</h3>
//               <p className="text-[20px]">Subscribe to our Residential Plans</p>

//               <div className="flex justify-around flex-wrap gap-20 pt-5 pb-10">
//                 <div className="relative isolate flex items-center justify-center">
//                   <div className="absolute -z-10 h-[80%] w-[359px] bg-[#9BD4A2] border-[3px] border-black"></div>
//                   <div className="max-w-[300px] px-3 w-full bg-[#F3FFF3] border-[3px] border-black py-7">
//                     <h3 className="text-[36px]">Basic</h3>
//                     {/* <p className="border-b-2 border-slate-300 max-w-fit m-auto px-5"></p> */}

//                     <div className="space-y-5 my-5">
//                       <p className="checkMark tracking-[0.32px] ">
//                         Vistor Management
//                       </p>
//                       <p className="checkMark tracking-[0.32px]">
//                         Security Alert
//                       </p>
//                       <p className="uncheckMark tracking-[0.32px]">
//                         Resident Communications
//                       </p>
//                       <p className="uncheckMark tracking-[0.32px]">
//                         Daily Help Management
//                       </p>
//                       <p className="uncheckMark tracking-[0.32px]">
//                         Layered security
//                       </p>
//                       <p className="uncheckMark tracking-[0.32px]">
//                         Leave at Gate
//                       </p>
//                       <Link to="/contact">
//                         <button className="seeMoreBtn mt-3">Free Plan</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="relative isolate flex items-center justify-center">
//                   <div className="absolute -z-10 h-[80%] w-[359px] bg-[#9BD4A2] border-[3px] border-black"></div>
//                   <div className="max-w-[300px] px-3 w-full bg-[#F3FFF3] border-[3px] border-black py-7">
//                     <h3 className="text-[36px]">Standard</h3>
//                     {/* <p className="border-b-2 border-slate-300 max-w-fit m-auto px-5"></p> */}

//                     <div className="space-y-6 my-5">
//                       <p className="checkMark tracking-[0.32px]">
//                         All features in Basic
//                       </p>
//                       <p className="checkMark tracking-[0.32px]">
//                         Security Management
//                       </p>
//                       <p className="checkMark tracking-[0.32px]">Polls</p>
//                       <p className="checkMark tracking-[0.32px]">Helpdesks</p>
//                       <p className="checkMark tracking-[0.32px]">
//                         Resident identification (ID)
//                       </p>
//                       <p className="uncheckMark tracking-[0.32px]">
//                         Amenities Booking
//                       </p>
//                       <Link to="/contact">
//                         <button className="seeMoreBtn mt-3">Subscribe</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="relative isolate flex items-center justify-center">
//                   <div className="absolute -z-10 h-[80%] w-[359px] bg-[#9BD4A2] border-[3px] border-black"></div>
//                   <div className="max-w-[300px] px-3 w-full bg-[#F3FFF3] border-[3px] border-black py-7">
//                     <h3 className="text-[36px]">Premium</h3>
//                     <p className="border-b-2 border-slate-300 max-w-fit m-auto px-5"></p>

//                     <div className="space-y-8 my-5">
//                       <p className="checkMark tracking-[0.32px]">
//                         All features in Standard
//                       </p>
//                       <p className="checkMark tracking-[0.32px]">
//                         Asset Management
//                       </p>
//                       <p className="checkMark tracking-[0.32px]">
//                         Vendor Management
//                       </p>
//                       <p className="checkMark tracking-[0.32px]">
//                         Final Accounts
//                       </p>
//                       <p className="checkMark tracking-[0.32px]">
//                         Balance Sheet
//                       </p>
//                       <Link to="/contact">
//                         <button className="seeMoreBtn mt-3">Subscribe</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-[20px]">Social And Events</p>
//               <div className="relative isolate flex items-center justify-center">
//                 <div className="absolute -z-10 h-[80%] max-w-[627px] w-full bg-[#9BD4A2] border-[3px] border-black"></div>
//                 <div className="max-w-[542px] px-3 w-full bg-[#F3FFF3] border-[3px] border-black py-7">
//                   <h3 className="text-[36px]">Socialite</h3>
//                   <p className="border-b-2 border-slate-300 max-w-fit m-auto px-5">
//                     {/* N1000 */}
//                   </p>

//                   <div className="space-y-5 my-5">
//                     <p className="checkMark tracking-[0.32px]">
//                       Create tickets for events
//                     </p>
//                     <p className="checkMark tracking-[0.32px]">
//                       Generate Access code for guests
//                     </p>
//                     <p className="checkMark tracking-[0.32px]">Sell tickets</p>
//                     <p className="checkMark tracking-[0.32px]">Buy tickets</p>
//                     <p className="checkMark tracking-[0.32px]">
//                       Guest Management
//                     </p>
//                     <p className="checkMark tracking-[0.32px]">
//                       Security Agents & Alerts
//                     </p>
//                     <button className="seeMoreBtn mt-3">Try it</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Testimonial */}
//           {/*           <TestimonialSlide /> */}
//         </AppWrapperContainer>
//       </div>

//       <div className="bg-[#04973C]">
//         <AppWrapperContainer className="bg-transparent">
//           <Download />
//         </AppWrapperContainer>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import Iphone from "../../assets/iPhone 12 Pro-up.png";
import Star1 from "../../assets/Star 2.svg";
import Line from "../../assets/Element 09.svg";
import Star2 from "../../assets/Star 1.svg";
import Hand from "../../assets/handFrame.png";
import Bulb from "../../assets/bulbFrame.png";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeIn } from "../../components/variants";
import Download from "../../components/Download";
import { Link } from "react-router-dom";
import TestimonialSlide from "../../components/TestimonialSlide";
import AppWrapperContainer from "@/components/layout/index";

const Home = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const offerings = [
    {
      title: "Visitor Management System",
      description:
        "Controls and tracks visitor access to the community or estate.",
    },
    {
      title: "Community/Estate Management Tools",
      description:
        "Provide tools to manage various aspects of the community, such as maintenance, communication, and facility bookings.",
    },
    {
      title: "Artisan Services Platform",
      description:
        "Connects residents with local artisans and service providers for tasks like repairs and maintenance.",
    },
    {
      title: "Event Ticketing Platform",
      description:
        "Facilitates the organization and management of community events, including ticket sales and RSVPs.",
    },
    {
      title: "Resident (Peer to Peer) Marketplace",
      description:
        "Enables residents to buy, sell, or exchange goods and services directly with each other.",
    },
    {
      title: "Additional Services",
      description:
        "Offer a range of extra features such as health information access, emergency assistance, utility bill payments, chats and more.",
    },
  ];

  const benefits = [
    {
      title: "Safety First",
      description:
        "Your security is our top priority. We combine advanced technology and dedicated personnel to keep your community safe.",
    },
    {
      title: "Community Connection",
      description:
        "We bring neighbors closer. Build strong relationships, share experiences, and collaborate like never before.",
    },
    {
      title: "Efficient Estate Management",
      description:
        "Streamline estate management with our admin portal. Approve new member registrations, manage events, and more.",
    },
    {
      title: "Voice Your Opinions",
      description:
        "Participate in community polls and surveys to shape decisions, ensuring your voice is heard.",
    },
    {
      title: "Never Miss an Event",
      description:
        "Stay in the loop with community events, gatherings, and activities. Create and manage your own events with ease.",
    },
    {
      title: "Emergency Assistance",
      description:
        "Your safety is our concern. Our emergency button ensures help is just a tap away.",
    },
  ];

  return (
    <div style={{ background: "#F9FAFB" }} ref={ref}>
      {/* Hero Section */}
      <div style={{ background: "#10B981" }}>
        <AppWrapperContainer className="isolate flex justify-center py-16 md:py-24">
          <div className="relative max-w-[85%] w-[100%] lg:flex items-center justify-between gap-10 text-white">
            <motion.div
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="relative max-w-[750px] m-auto text-left space-y-6 w-[100%] lg:w-[50%]"
            >
              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Pause Point
              </h1>
              <p
                style={{
                  fontSize: "20px",
                  lineHeight: 1.7,
                  fontWeight: 500,
                  opacity: 0.95,
                }}
              >
                Experience seamless home management with our estate and visitor
                management tech solutions. Enjoy enhanced security, convenience,
                and stronger community connections. Let's connect, it's privacy
                time...
              </p>
              <img
                src={Line}
                alt="line"
                className="absolute -z-10 right-0 lg:right-30 bottom-0"
              />
              <Link to="/contact">
                <button
                  style={{
                    marginTop: "8px",
                    padding: "16px 32px",
                    background: "white",
                    color: "#10B981",
                    fontSize: "15px",
                    fontWeight: 600,
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 15px 35px rgba(0, 0, 0, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  Book A Demo
                </button>
              </Link>
            </motion.div>

            {/* Iphone */}
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="w-[100%] lg:w-[50%] flex justify-center mt-12 lg:mt-0"
            >
              <img
                src={Iphone}
                alt="iphone"
                className="hidden lg:block"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <img
                src={Star2}
                alt="star"
                className="absolute -z-10 top-0 right-0 opacity-20"
              />
            </motion.div>
            <img
              src={Star1}
              alt="star"
              className="absolute -z-10 bottom-0 left-0 opacity-20"
            />
          </div>
        </AppWrapperContainer>
      </div>

      {/* What We Offer Section */}
      <div style={{ padding: "80px 0" }}>
        <AppWrapperContainer className="flex flex-col items-center gap-24">
          <div className="max-w-[90%] w-[100%] lg:flex items-center justify-between gap-16">
            <motion.div
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="w-full lg:w-[45%]"
            >
              <img
                src={Hand}
                alt="hand"
                style={{ width: "100%", height: "auto" }}
              />
            </motion.div>

            <motion.div
              variants={fadeIn("left", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="mt-10 lg:mt-0 w-full lg:w-[50%]"
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "40px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
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
                    ✨
                  </div>
                  <div>
                    <h2
                      style={{
                        fontSize: "32px",
                        fontWeight: 700,
                        color: "#111827",
                        marginBottom: "4px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      What we offer
                    </h2>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "#6B7280",
                        fontWeight: 500,
                      }}
                    >
                      Key offerings of Pause Point
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {offerings.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding: "12px",
                        borderRadius: "8px",
                        transition: "all 0.2s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F9FAFB";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: "#D1FAE5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        <span
                          style={{
                            color: "#10B981",
                            fontSize: "12px",
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </span>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#111827",
                            marginBottom: "2px",
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Why Choose Us Section */}
          <div className="max-w-[90%] w-[100%] lg:flex items-center justify-between gap-16 lg:flex-row-reverse">
            <motion.div
              variants={fadeIn("left", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="w-full lg:w-[45%]"
            >
              <img
                src={Bulb}
                alt="bulb"
                style={{ width: "100%", height: "auto" }}
              />
            </motion.div>

            <motion.div
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="mt-10 lg:mt-0 w-full lg:w-[50%]"
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "40px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
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
                      background: "#FEF3C7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                    }}
                  >
                    💡
                  </div>
                  <div>
                    <h2
                      style={{
                        fontSize: "32px",
                        fontWeight: 700,
                        color: "#111827",
                        marginBottom: "4px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Why Choose Us
                    </h2>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "#6B7280",
                        fontWeight: 500,
                      }}
                    >
                      Benefits of using Pause Point
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {benefits.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding: "12px",
                        borderRadius: "8px",
                        transition: "all 0.2s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F9FAFB";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: "#D1FAE5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        <span
                          style={{
                            color: "#10B981",
                            fontSize: "12px",
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </span>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#111827",
                            marginBottom: "2px",
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </AppWrapperContainer>
      </div>

      {/* Services & Subscription Section */}
      <div style={{ background: "white", padding: "80px 0" }}>
        <AppWrapperContainer className="flex flex-col gap-20 items-center">
          <div className="max-w-[90%] w-[100%] space-y-16">
            {/* Our Services */}
            <div className="text-center">
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
                    background: "#E0E7FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  🎯
                </div>
                <h3
                  style={{
                    fontSize: "40px",
                    fontWeight: 700,
                    color: "#111827",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Our Services
                </h3>
              </div>

              <div
                className="max-w-[900px] w-full m-auto"
                style={{
                  fontSize: "16px",
                  color: "#374151",
                  lineHeight: 1.8,
                  fontWeight: 500,
                  padding: "0 20px",
                }}
              >
                <p>
                  At Pause Point, we offer a comprehensive suite of services
                  aimed at improving the overall quality of life within your
                  community, including enhanced security measures, enhanced
                  community connections, streamlined estate management through
                  an admin portal, tools for open dialogue and decision-making,
                  support for organizing community events, and quick access to
                  emergency assistance. Choose Pause Point to create a safer,
                  more connected, and thriving community environment. Let's
                  Connect, It's privacy time...
                </p>
              </div>

              <Link to="/services">
                <button
                  style={{
                    marginTop: "32px",
                    padding: "14px 32px",
                    background: "white",
                    color: "#10B981",
                    fontSize: "15px",
                    fontWeight: 600,
                    borderRadius: "10px",
                    border: "2px solid #10B981",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#D1FAE5";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "white";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  See More Details →
                </button>
              </Link>
            </div>

            {/* Subscription Plans */}
            <div className="text-center">
              <h3
                style={{
                  fontSize: "40px",
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: "12px",
                  letterSpacing: "-0.02em",
                }}
              >
                Subscription Plans
              </h3>
              <p
                style={{
                  fontSize: "18px",
                  color: "#6B7280",
                  fontWeight: 500,
                  marginBottom: "48px",
                }}
              >
                Subscribe to our Residential Plans
              </p>

              <div className="flex justify-center flex-wrap gap-8 mb-16">
                {/* Basic Plan */}
                <div
                  style={{
                    position: "relative",
                    background: "white",
                    borderRadius: "16px",
                    padding: "36px 28px",
                    maxWidth: "320px",
                    width: "100%",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #E5E7EB",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.borderColor = "#10B981";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.borderColor = "#E5E7EB";
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
                      margin: "0 auto 20px",
                      fontSize: "28px",
                    }}
                  >
                    📦
                  </div>

                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "24px",
                    }}
                  >
                    Basic
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      marginBottom: "28px",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Visitor Management
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Security Alert
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#D1D5DB",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✗
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#9CA3AF",
                          lineHeight: 1.6,
                        }}
                      >
                        Resident Communications
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#D1D5DB",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✗
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#9CA3AF",
                          lineHeight: 1.6,
                        }}
                      >
                        Daily Help Management
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#D1D5DB",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✗
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#9CA3AF",
                          lineHeight: 1.6,
                        }}
                      >
                        Layered security
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#D1D5DB",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✗
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#9CA3AF",
                          lineHeight: 1.6,
                        }}
                      >
                        Leave at Gate
                      </span>
                    </div>
                  </div>

                  <Link to="/contact">
                    <button
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: "#10B981",
                        color: "white",
                        fontSize: "15px",
                        fontWeight: 600,
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#059669";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#10B981";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      Free Plan
                    </button>
                  </Link>
                </div>

                {/* Standard Plan */}
                <div
                  style={{
                    position: "relative",
                    background: "white",
                    borderRadius: "16px",
                    padding: "36px 28px",
                    maxWidth: "320px",
                    width: "100%",
                    boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
                    border: "3px solid #10B981",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 35px -5px rgba(16, 185, 129, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px -5px rgba(16, 185, 129, 0.2)";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      right: "20px",
                      background: "#10B981",
                      color: "white",
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    POPULAR
                  </div>

                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background: "#D1FAE5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: "28px",
                    }}
                  >
                    ⭐
                  </div>

                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "24px",
                    }}
                  >
                    Standard
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      marginBottom: "28px",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        All features in Basic
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Security Management
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Polls
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Helpdesks
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Resident identification (ID)
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#D1D5DB",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✗
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#9CA3AF",
                          lineHeight: 1.6,
                        }}
                      >
                        Amenities Booking
                      </span>
                    </div>
                  </div>

                  <Link to="/contact">
                    <button
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: "#10B981",
                        color: "white",
                        fontSize: "15px",
                        fontWeight: 600,
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#059669";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#10B981";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      Subscribe Now
                    </button>
                  </Link>
                </div>

                {/* Premium Plan */}
                <div
                  style={{
                    position: "relative",
                    background: "white",
                    borderRadius: "16px",
                    padding: "36px 28px",
                    maxWidth: "320px",
                    width: "100%",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #E5E7EB",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.borderColor = "#10B981";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background: "#FEF3C7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: "28px",
                    }}
                  >
                    👑
                  </div>

                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "24px",
                    }}
                  >
                    Premium
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      marginBottom: "28px",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        All features in Standard
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Asset Management
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Vendor Management
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Final Accounts
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#10B981",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Balance Sheet
                      </span>
                    </div>
                  </div>

                  <Link to="/contact">
                    <button
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: "#10B981",
                        color: "white",
                        fontSize: "15px",
                        fontWeight: 600,
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#059669";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#10B981";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      Subscribe Now
                    </button>
                  </Link>
                </div>
              </div>

              {/* Socialite Plan */}
              <div className="max-w-[600px] mx-auto">
                <p
                  style={{
                    fontSize: "18px",
                    color: "#6B7280",
                    fontWeight: 500,
                    marginBottom: "32px",
                  }}
                >
                  Social And Events
                </p>

                <div
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "36px",
                    boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)",
                    border: "2px solid #8B5CF6",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 35px -5px rgba(139, 92, 246, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px -5px rgba(139, 92, 246, 0.2)";
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background: "#EDE9FE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: "28px",
                    }}
                  >
                    🎉
                  </div>

                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "28px",
                    }}
                  >
                    Socialite
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      marginBottom: "28px",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#8B5CF6",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Create tickets for events
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#8B5CF6",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Generate Access code for guests
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#8B5CF6",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Sell tickets
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#8B5CF6",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Buy tickets
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#8B5CF6",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Guest Management
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#8B5CF6",
                          fontSize: "16px",
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        Security Agents & Alerts
                      </span>
                    </div>
                  </div>

                  <button
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: "#8B5CF6",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: 600,
                      borderRadius: "10px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#7C3AED";
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#8B5CF6";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    Try it Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AppWrapperContainer>
      </div>

      {/* Download Section */}
      <div style={{ background: "#10B981" }}>
        <AppWrapperContainer className="bg-transparent">
          <Download />
        </AppWrapperContainer>
      </div>
    </div>
  );
};

export default Home;
