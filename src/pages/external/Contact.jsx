// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import emailjs from "@emailjs/browser";
// import Img from "../../assets/contactImg.png";
// import ImgMobile2 from "../../assets/contact_hero1.png";
// import Download from "../../components/Download";
// import ThankYouCard from "@/components/cards/ThankYouCard";

// const Contact = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm();
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const onSubmit = async (data) => {
//     try {
//       // await emailjs.send(
//       //   "service_camprhh",
//       //   "template_si0uxzp",
//       //   {
//       //     user_name: data.user_name,
//       //     user_email: data.user_email,
//       //     user_number: data.user_number,
//       //     user_address: data.user_address,
//       //     message: data.message,
//       //   },
//       //   "HYJ16_wtBbAKW1zEE"
//       // );

//       await emailjs.send(
//         "service_x1o3kla",
//         "template_gdyl54h",
//         {
//           user_name: data.user_name,
//           user_email: data.user_email,
//           user_number: data.user_number,
//           user_address: data.user_address,
//           message: data.message,
//         },
//         "RTyqicyWiB_9ZwwnK"
//       );
//       setIsModalVisible(true);
//       reset();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("There was an issue sending your message. Please try again later.");
//     }
//   };

//   return (
//     <div className="bg-[#FFFDE4] overflow-x-hidden">
//       <div>
//         <div style={{ height: "300px" }}>
//           <img
//             className="hidden md:block"
//             src={Img}
//             alt=""
//             style={{ height: "100%", width: "100%", objectFit: "cover" }}
//           />
//           <img
//             className="md:hidden"
//             src={ImgMobile2}
//             alt=""
//             style={{ height: "100%", width: "100%", objectFit: "100%" }}
//           />
//         </div>
//         <div className="lg:flex items-center justify-between gap-20 space-y-10 lg:space-y-0 lg:pt-28 lg:pb-48 m-auto max-w-[85%] w-[100%]">
//           <div className="w-full lg:w-[30%] space-y-5 pt-5">
//             <h3 className="text-[24px] font-semibold">
//               Get In Touch With Us For More Information
//             </h3>
//             <p>
//               <span className="font-semibold">Phone Numbers</span>
//               <br />
//               +2347039845638 <br />
//               +2349019269787
//             </p>
//             <p>
//               <span className="font-semibold">Email Address</span>
//               <br />
//               support@pausepoint.net
//             </p>
//           </div>

//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="w-full lg:w-[70%] border-4 border-black space-y-10 rounded-[20px] text-center mb-5 px-10 py-10"
//           >
//             <h3 className="text-[32px] font-semibold">Book A Demo</h3>
//             <input
//               type="text"
//               className={`w-full p-2 rounded-[10px] border ${
//                 errors.user_name ? "border-red-500" : "border-[#00000099]"
//               } placeholder:text-[#00000080]`}
//               placeholder="Full Name"
//               {...register("user_name", { required: "Full Name is required" })}
//             />
//             {errors.user_name && (
//               <p className="text-red-500">{errors.user_name.message}</p>
//             )}

//             <input
//               type="email"
//               className={`w-full p-2 rounded-[10px] border ${
//                 errors.user_email ? "border-red-500" : "border-[#00000099]"
//               } placeholder:text-[#00000080]`}
//               placeholder="Email Address"
//               {...register("user_email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /\S+@\S+\.\S+/,
//                   message: "Enter a valid email",
//                 },
//               })}
//             />
//             {errors.user_email && (
//               <p className="text-red-500">{errors.user_email.message}</p>
//             )}

//             <input
//               type="text"
//               className={`w-full p-2 rounded-[10px] border ${
//                 errors.user_number ? "border-red-500" : "border-[#00000099]"
//               } placeholder:text-[#00000080]`}
//               placeholder="Phone Number"
//               {...register("user_number", {
//                 required: "Phone Number is required",
//               })}
//             />
//             {errors.user_number && (
//               <p className="text-red-500">{errors.user_number.message}</p>
//             )}

//             <input
//               type="text"
//               className={`w-full p-2 rounded-[10px] border ${
//                 errors.user_address ? "border-red-500" : "border-[#00000099]"
//               } placeholder:text-[#00000080]`}
//               placeholder="Address"
//               {...register("user_address")}
//             />

//             <textarea
//               cols="30"
//               rows="5"
//               className={`w-full p-2 rounded-[10px] border ${
//                 errors.message ? "border-red-500" : "border-[#00000099]"
//               } placeholder:text-[#00000080] min-h-[220px] max-h-[293px]`}
//               placeholder="Type your Message"
//               {...register("message", { required: "Message is required" })}
//             ></textarea>
//             {errors.message && (
//               <p className="text-red-500">{errors.message.message}</p>
//             )}

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="seeMoreBtn"
//             >
//               {isSubmitting ? "Sending..." : "Submit"}
//             </button>
//           </form>
//         </div>
//         {isModalVisible && (
//           <ThankYouCard closeModal={() => setIsModalVisible(false)} />
//         )}
//         <Download />
//       </div>
//     </div>
//   );
// };

// export default Contact;

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import Img from "../../assets/contactImg.png";
import ImgMobile2 from "../../assets/contact_hero1.png";
import Download from "../../components/Download";
import ThankYouCard from "@/components/cards/ThankYouCard";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        "service_x1o3kla",
        "template_gdyl54h",
        {
          user_name: data.user_name,
          user_email: data.user_email,
          user_number: data.user_number,
          user_address: data.user_address,
          message: data.message,
        },
        "RTyqicyWiB_9ZwwnK",
      );
      setIsModalVisible(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an issue sending your message. Please try again later.");
    }
  };

  return (
    <div style={{ background: "#F9FAFB" }}>
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          height: "400px",
          overflow: "hidden",
        }}
      >
        <img
          className="hidden md:block"
          src={Img}
          alt="Contact Us"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <img
          className="md:hidden"
          src={ImgMobile2}
          alt="Contact Us"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
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
              "linear-gradient(180deg, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0.7) 100%)",
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
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
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
                📞
              </div>
              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  textShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
              >
                Contact Us
              </h1>
            </div>
            <p
              style={{
                fontSize: "20px",
                fontWeight: 500,
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              Let's connect and discuss how we can help your community
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section style={{ padding: "80px 0" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            gap: "48px",
            alignItems: "flex-start",
          }}
          className="flex-column flex-lg-row"
        >
          {/* Contact Information Card */}
          <div
            style={{
              flex: "0 0 350px",
              width: "100%",
            }}
            className="mb-5 mb-lg-0"
          >
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "40px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                position: "sticky",
                top: "100px",
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
                  💬
                </div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#111827",
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  Get In Touch
                </h3>
              </div>

              <p
                style={{
                  fontSize: "15px",
                  color: "#6B7280",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                }}
              >
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {/* Phone Numbers */}
                <div
                  style={{
                    padding: "20px",
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
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "12px",
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
                      }}
                    >
                      📱
                    </div>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#111827",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Phone Numbers
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#374151",
                      lineHeight: 1.8,
                      fontWeight: 500,
                    }}
                  >
                    <div>+2347039845638</div>
                    <div>+2349019269787</div>
                  </div>
                </div>

                {/* Email Address */}
                <div
                  style={{
                    padding: "20px",
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
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "12px",
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
                      }}
                    >
                      ✉️
                    </div>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#111827",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Email Address
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#374151",
                      lineHeight: 1.8,
                      fontWeight: 500,
                      wordBreak: "break-word",
                    }}
                  >
                    support@pausepoint.net
                  </div>
                </div>

                {/* Office Hours - Optional Addition */}
                <div
                  style={{
                    padding: "20px",
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
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "12px",
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
                      }}
                    >
                      ⏰
                    </div>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#111827",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Response Time
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#374151",
                      lineHeight: 1.8,
                      fontWeight: 500,
                    }}
                  >
                    We typically respond within 24-48 hours
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div style={{ flex: "1", width: "100%" }}>
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
                      background: "#D1FAE5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    📋
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
                    Book A Demo
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#6B7280",
                    fontWeight: 500,
                  }}
                >
                  Fill out the form below and we'll get back to you shortly
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {/* Full Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: errors.user_name
                        ? "2px solid #DC2626"
                        : "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "15px",
                      color: "#111827",
                      background: "white",
                      transition: "all 0.2s ease",
                      outline: "none",
                    }}
                    placeholder="Enter your full name"
                    {...register("user_name", {
                      required: "Full Name is required",
                    })}
                    onFocus={(e) => {
                      if (!errors.user_name) {
                        e.target.style.borderColor = "#10B981";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(16, 185, 129, 0.1)";
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.user_name
                        ? "#DC2626"
                        : "#E5E7EB";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {errors.user_name && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#DC2626",
                        marginTop: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      ⚠️ {errors.user_name.message}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: errors.user_email
                        ? "2px solid #DC2626"
                        : "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "15px",
                      color: "#111827",
                      background: "white",
                      transition: "all 0.2s ease",
                      outline: "none",
                    }}
                    placeholder="your.email@example.com"
                    {...register("user_email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Enter a valid email",
                      },
                    })}
                    onFocus={(e) => {
                      if (!errors.user_email) {
                        e.target.style.borderColor = "#10B981";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(16, 185, 129, 0.1)";
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.user_email
                        ? "#DC2626"
                        : "#E5E7EB";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {errors.user_email && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#DC2626",
                        marginTop: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      ⚠️ {errors.user_email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: errors.user_number
                        ? "2px solid #DC2626"
                        : "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "15px",
                      color: "#111827",
                      background: "white",
                      transition: "all 0.2s ease",
                      outline: "none",
                    }}
                    placeholder="+234 XXX XXX XXXX"
                    {...register("user_number", {
                      required: "Phone Number is required",
                    })}
                    onFocus={(e) => {
                      if (!errors.user_number) {
                        e.target.style.borderColor = "#10B981";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(16, 185, 129, 0.1)";
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.user_number
                        ? "#DC2626"
                        : "#E5E7EB";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {errors.user_number && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#DC2626",
                        marginTop: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      ⚠️ {errors.user_number.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Address{" "}
                    <span style={{ color: "#9CA3AF", fontWeight: 400 }}>
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "15px",
                      color: "#111827",
                      background: "white",
                      transition: "all 0.2s ease",
                      outline: "none",
                    }}
                    placeholder="Your address"
                    {...register("user_address")}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#10B981";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(16, 185, 129, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E5E7EB";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    rows="6"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: errors.message
                        ? "2px solid #DC2626"
                        : "1px solid #E5E7EB",
                      borderRadius: "10px",
                      fontSize: "15px",
                      color: "#111827",
                      background: "white",
                      transition: "all 0.2s ease",
                      outline: "none",
                      resize: "vertical",
                      minHeight: "150px",
                      maxHeight: "300px",
                    }}
                    placeholder="Tell us about your estate and what you're looking for..."
                    {...register("message", {
                      required: "Message is required",
                    })}
                    onFocus={(e) => {
                      if (!errors.message) {
                        e.target.style.borderColor = "#10B981";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(16, 185, 129, 0.1)";
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.message
                        ? "#DC2626"
                        : "#E5E7EB";
                      e.target.style.boxShadow = "none";
                    }}
                  ></textarea>
                  {errors.message && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#DC2626",
                        marginTop: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      ⚠️ {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: isSubmitting ? "#9CA3AF" : "#10B981",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 600,
                    borderRadius: "10px",
                    border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    boxShadow: isSubmitting
                      ? "none"
                      : "0 4px 12px rgba(16, 185, 129, 0.3)",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.background = "#059669";
                      e.target.style.transform = "translateY(-1px)";
                      e.target.style.boxShadow =
                        "0 6px 16px rgba(16, 185, 129, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.background = "#10B981";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(16, 185, 129, 0.3)";
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid white",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          animation: "spin 0.6s linear infinite",
                        }}
                      ></span>
                      Sending...
                    </>
                  ) : (
                    <>📨 Submit Request</>
                  )}
                </button>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#6B7280",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  By submitting this form, you agree to our terms of service and
                  privacy policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Modal */}
      {isModalVisible && (
        <ThankYouCard closeModal={() => setIsModalVisible(false)} />
      )}

      {/* Download Section */}
      <div style={{ background: "#10B981" }}>
        <Download />
      </div>

      {/* Add spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Contact;
