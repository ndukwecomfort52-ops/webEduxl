// // import { useState } from "react";
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Plus,
// //   Calendar,
// //   DollarSign,
// //   Users,
// //   CheckCircle,
// //   AlertCircle,
// //   X,
// //   Search,
// //   ChevronRight,
// // } from "lucide-react";
// // import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";

// // const HouseholdDues = () => {
// //   const navigate = useNavigate();
// //   const [showModal, setShowModal] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const { user } = useSelector((state) => state?.reducer?.AuthSlice);

// //   const { selectedEstate } = useSelector(
// //     (state) => state?.reducer?.estateSlice
// //   );

// //   const clanId = selectedEstate?._id;

// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     defaultAmount: "",
// //     dueDate: "",
// //     category: "annual_levy",
// //   });

// //   const {
// //     data: duesResponse,
// //     isLoading: loading,
// //     error,
// //   } = useFetchDataV2(`/v1/householdDue/${clanId}`, "householdDues");

// //   const dues = duesResponse?.data || [];

// //   const createDueMutation = useMutateDataV2("householdDues", "POST");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await createDueMutation.mutateAsync({
// //         url: "/v1/householdDue",
// //         data: {
// //           ...formData,
// //           clan: clanId,
// //           defaultAmount: Number(formData.defaultAmount),
// //         },
// //       });

// //       setShowModal(false);
// //       setFormData({
// //         title: "",
// //         description: "",
// //         defaultAmount: "",
// //         dueDate: "",
// //         category: "annual_levy",
// //       });
// //     } catch (error) {
// //       console.error("Error creating due:", error);
// //     }
// //   };

// //   const filteredDues = dues.filter(
// //     (due) =>
// //       due.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       due.description.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const totalDues = dues.length;
// //   const totalExpected = dues.reduce((sum, due) => sum + due.expectedTotal, 0);
// //   const totalCollected = dues.reduce((sum, due) => sum + due.collectedTotal, 0);
// //   const totalOutstanding = dues.reduce(
// //     (sum, due) => sum + due.outstandingTotal,
// //     0
// //   );

// //   return (
// //     <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           marginBottom: "32px",
// //         }}
// //       >
// //         <div>
// //           <h1
// //             style={{
// //               fontSize: "28px",
// //               fontWeight: 700,
// //               color: "#111827",
// //               marginBottom: "4px",
// //             }}
// //           >
// //             Household Dues
// //           </h1>
// //           <p style={{ fontSize: "14px", color: "#6B7280" }}>
// //             Manage annual levies and household payments
// //           </p>
// //         </div>
// //         <button
// //           onClick={() => setShowModal(true)}
// //           style={{
// //             padding: "12px 24px",
// //             background: "#10B981",
// //             color: "white",
// //             fontSize: "14px",
// //             fontWeight: 600,
// //             borderRadius: "8px",
// //             border: "none",
// //             cursor: "pointer",
// //             boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
// //             display: "flex",
// //             alignItems: "center",
// //             gap: "8px",
// //           }}
// //         >
// //           <Plus size={16} />
// //           Create New Due
// //         </button>
// //       </div>

// //       <div
// //         style={{
// //           display: "grid",
// //           gridTemplateColumns: "repeat(4, 1fr)",
// //           gap: "24px",
// //           marginBottom: "32px",
// //         }}
// //       >
// //         <StatsCard
// //           title="Total Dues"
// //           value={totalDues}
// //           icon={<Calendar size={24} />}
// //           iconBg="#DBEAFE"
// //           iconColor="#3B82F6"
// //         />
// //         <StatsCard
// //           title="Expected Amount"
// //           value={`₦${totalExpected.toLocaleString()}`}
// //           icon={<DollarSign size={24} />}
// //           iconBg="#FEF3C7"
// //           iconColor="#F59E0B"
// //         />
// //         <StatsCard
// //           title="Collected"
// //           value={`₦${totalCollected.toLocaleString()}`}
// //           icon={<CheckCircle size={24} />}
// //           iconBg="#D1FAE5"
// //           iconColor="#10B981"
// //         />
// //         <StatsCard
// //           title="Outstanding"
// //           value={`₦${totalOutstanding.toLocaleString()}`}
// //           icon={<AlertCircle size={24} />}
// //           iconBg="#FEE2E2"
// //           iconColor="#DC2626"
// //         />
// //       </div>

// //       <div
// //         style={{
// //           background: "white",
// //           borderRadius: "12px",
// //           padding: "20px 24px",
// //           marginBottom: "24px",
// //           boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// //         }}
// //       >
// //         <div style={{ position: "relative", maxWidth: "400px" }}>
// //           <Search
// //             size={18}
// //             style={{
// //               position: "absolute",
// //               left: "14px",
// //               top: "50%",
// //               transform: "translateY(-50%)",
// //               color: "#9CA3AF",
// //             }}
// //           />
// //           <input
// //             type="text"
// //             placeholder="Search dues..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             style={{
// //               width: "100%",
// //               padding: "10px 16px 10px 42px",
// //               border: "1px solid #E5E7EB",
// //               borderRadius: "10px",
// //               fontSize: "14px",
// //               background: "#F9FAFB",
// //               outline: "none",
// //             }}
// //           />
// //         </div>
// //       </div>

// //       <div
// //         style={{
// //           background: "white",
// //           borderRadius: "12px",
// //           overflow: "hidden",
// //           boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// //         }}
// //       >
// //         {loading ? (
// //           <div style={{ padding: "64px", textAlign: "center" }}>
// //             <p style={{ fontSize: "14px", color: "#6B7280" }}>Loading...</p>
// //           </div>
// //         ) : error ? (
// //           <div style={{ padding: "64px", textAlign: "center" }}>
// //             <div
// //               style={{
// //                 width: "80px",
// //                 height: "80px",
// //                 borderRadius: "40px",
// //                 background: "#FEE2E2",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 margin: "0 auto 16px",
// //               }}
// //             >
// //               <AlertCircle size={32} color="#DC2626" />
// //             </div>
// //             <p
// //               style={{
// //                 fontSize: "16px",
// //                 fontWeight: 600,
// //                 color: "#111827",
// //                 marginBottom: "8px",
// //               }}
// //             >
// //               Error loading dues
// //             </p>
// //             <p style={{ fontSize: "14px", color: "#6B7280" }}>
// //               {error?.message || "Something went wrong"}
// //             </p>
// //           </div>
// //         ) : filteredDues.length === 0 ? (
// //           <div style={{ padding: "64px", textAlign: "center" }}>
// //             <div
// //               style={{
// //                 width: "80px",
// //                 height: "80px",
// //                 borderRadius: "40px",
// //                 background: "#F9FAFB",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 margin: "0 auto 16px",
// //               }}
// //             >
// //               <Calendar size={32} color="#D1D5DB" />
// //             </div>
// //             <p
// //               style={{
// //                 fontSize: "16px",
// //                 fontWeight: 600,
// //                 color: "#111827",
// //                 marginBottom: "8px",
// //               }}
// //             >
// //               No dues found
// //             </p>
// //             <p style={{ fontSize: "14px", color: "#6B7280" }}>
// //               {searchTerm
// //                 ? "No dues match your search"
// //                 : "Create your first household due to get started"}
// //             </p>
// //           </div>
// //         ) : (
// //           <div>
// //             {filteredDues.map((due) => (
// //               <DueCard key={due._id} due={due} navigate={navigate} />
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {showModal && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             background: "rgba(0, 0, 0, 0.5)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             zIndex: 1000,
// //             padding: "24px",
// //           }}
// //           onClick={() => setShowModal(false)}
// //         >
// //           <div
// //             style={{
// //               background: "white",
// //               borderRadius: "16px",
// //               maxWidth: "600px",
// //               width: "100%",
// //               maxHeight: "90vh",
// //               overflow: "hidden",
// //               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
// //             }}
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //                 padding: "24px 32px",
// //                 borderBottom: "1px solid #E5E7EB",
// //               }}
// //             >
// //               <h3
// //                 style={{
// //                   fontSize: "20px",
// //                   fontWeight: 700,
// //                   color: "#111827",
// //                 }}
// //               >
// //                 Create New Due
// //               </h3>
// //               <button
// //                 onClick={() => setShowModal(false)}
// //                 style={{
// //                   width: "36px",
// //                   height: "36px",
// //                   borderRadius: "8px",
// //                   background: "#F3F4F6",
// //                   border: "none",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   cursor: "pointer",
// //                   color: "#6B7280",
// //                 }}
// //               >
// //                 <X size={20} />
// //               </button>
// //             </div>

// //             <form onSubmit={handleSubmit} style={{ padding: "32px" }}>
// //               <div style={{ marginBottom: "20px" }}>
// //                 <label
// //                   style={{
// //                     display: "block",
// //                     fontSize: "14px",
// //                     fontWeight: 600,
// //                     color: "#374151",
// //                     marginBottom: "8px",
// //                   }}
// //                 >
// //                   Title
// //                 </label>
// //                 <input
// //                   type="text"
// //                   required
// //                   value={formData.title}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, title: e.target.value })
// //                   }
// //                   placeholder="e.g., Annual Levy 2025"
// //                   style={{
// //                     width: "100%",
// //                     padding: "12px 16px",
// //                     border: "1px solid #E5E7EB",
// //                     borderRadius: "8px",
// //                     fontSize: "14px",
// //                     color: "#111827",
// //                     background: "white",
// //                   }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "20px" }}>
// //                 <label
// //                   style={{
// //                     display: "block",
// //                     fontSize: "14px",
// //                     fontWeight: 600,
// //                     color: "#374151",
// //                     marginBottom: "8px",
// //                   }}
// //                 >
// //                   Description
// //                 </label>
// //                 <textarea
// //                   required
// //                   value={formData.description}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, description: e.target.value })
// //                   }
// //                   placeholder="Describe the purpose of this due"
// //                   rows={3}
// //                   style={{
// //                     width: "100%",
// //                     padding: "12px 16px",
// //                     border: "1px solid #E5E7EB",
// //                     borderRadius: "8px",
// //                     fontSize: "14px",
// //                     color: "#111827",
// //                     background: "white",
// //                     resize: "vertical",
// //                   }}
// //                 />
// //               </div>

// //               <div
// //                 style={{
// //                   display: "grid",
// //                   gridTemplateColumns: "1fr 1fr",
// //                   gap: "16px",
// //                   marginBottom: "20px",
// //                 }}
// //               >
// //                 <div>
// //                   <label
// //                     style={{
// //                       display: "block",
// //                       fontSize: "14px",
// //                       fontWeight: 600,
// //                       color: "#374151",
// //                       marginBottom: "8px",
// //                     }}
// //                   >
// //                     Amount (₦)
// //                   </label>
// //                   <input
// //                     type="number"
// //                     required
// //                     value={formData.defaultAmount}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         defaultAmount: e.target.value,
// //                       })
// //                     }
// //                     placeholder="50000"
// //                     style={{
// //                       width: "100%",
// //                       padding: "12px 16px",
// //                       border: "1px solid #E5E7EB",
// //                       borderRadius: "8px",
// //                       fontSize: "14px",
// //                       color: "#111827",
// //                       background: "white",
// //                     }}
// //                   />
// //                 </div>

// //                 <div>
// //                   <label
// //                     style={{
// //                       display: "block",
// //                       fontSize: "14px",
// //                       fontWeight: 600,
// //                       color: "#374151",
// //                       marginBottom: "8px",
// //                     }}
// //                   >
// //                     Due Date
// //                   </label>
// //                   <input
// //                     type="date"
// //                     required
// //                     value={formData.dueDate}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, dueDate: e.target.value })
// //                     }
// //                     style={{
// //                       width: "100%",
// //                       padding: "12px 16px",
// //                       border: "1px solid #E5E7EB",
// //                       borderRadius: "8px",
// //                       fontSize: "14px",
// //                       color: "#111827",
// //                       background: "white",
// //                     }}
// //                   />
// //                 </div>
// //               </div>

// //               <div style={{ marginBottom: "32px" }}>
// //                 <label
// //                   style={{
// //                     display: "block",
// //                     fontSize: "14px",
// //                     fontWeight: 600,
// //                     color: "#374151",
// //                     marginBottom: "8px",
// //                   }}
// //                 >
// //                   Category
// //                 </label>
// //                 <select
// //                   value={formData.category}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, category: e.target.value })
// //                   }
// //                   style={{
// //                     width: "100%",
// //                     padding: "12px 16px",
// //                     border: "1px solid #E5E7EB",
// //                     borderRadius: "8px",
// //                     fontSize: "14px",
// //                     color: "#111827",
// //                     background: "white",
// //                     cursor: "pointer",
// //                   }}
// //                 >
// //                   <option value="annual_levy">Annual Levy</option>
// //                   <option value="security">Security</option>
// //                   <option value="development">Development</option>
// //                   <option value="maintenance">Maintenance</option>
// //                   <option value="special_assessment">Special Assessment</option>
// //                   <option value="other">Other</option>
// //                 </select>
// //               </div>

// //               {createDueMutation.isError && (
// //                 <div
// //                   style={{
// //                     padding: "12px 16px",
// //                     background: "#FEE2E2",
// //                     borderRadius: "8px",
// //                     marginBottom: "20px",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "8px",
// //                   }}
// //                 >
// //                   <AlertCircle size={16} color="#DC2626" />
// //                   <span style={{ fontSize: "14px", color: "#DC2626" }}>
// //                     {createDueMutation.error?.message ||
// //                       "Failed to create due. Please try again."}
// //                   </span>
// //                 </div>
// //               )}

// //               <div
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "flex-end",
// //                   gap: "12px",
// //                 }}
// //               >
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowModal(false)}
// //                   disabled={createDueMutation.isLoading}
// //                   style={{
// //                     padding: "12px 24px",
// //                     background: "white",
// //                     color: "#374151",
// //                     fontSize: "14px",
// //                     fontWeight: 600,
// //                     borderRadius: "8px",
// //                     border: "1px solid #E5E7EB",
// //                     cursor: createDueMutation.isLoading
// //                       ? "not-allowed"
// //                       : "pointer",
// //                     opacity: createDueMutation.isLoading ? 0.6 : 1,
// //                   }}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   disabled={createDueMutation.isLoading}
// //                   style={{
// //                     padding: "12px 24px",
// //                     background: createDueMutation.isLoading
// //                       ? "#9CA3AF"
// //                       : "#10B981",
// //                     color: "white",
// //                     fontSize: "14px",
// //                     fontWeight: 600,
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor: createDueMutation.isLoading
// //                       ? "not-allowed"
// //                       : "pointer",
// //                     boxShadow: createDueMutation.isLoading
// //                       ? "none"
// //                       : "0 4px 12px rgba(16, 185, 129, 0.3)",
// //                   }}
// //                 >
// //                   {createDueMutation.isLoading ? "Creating..." : "Create Due"}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const StatsCard = ({ title, value, icon, iconBg, iconColor }) => {
// //   return (
// //     <div
// //       style={{
// //         background: "white",
// //         borderRadius: "12px",
// //         padding: "24px",
// //         boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// //       }}
// //     >
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "flex-start",
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: "48px",
// //             height: "48px",
// //             borderRadius: "12px",
// //             background: iconBg,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             color: iconColor,
// //           }}
// //         >
// //           {icon}
// //         </div>
// //       </div>
// //       <div
// //         style={{
// //           fontSize: "32px",
// //           fontWeight: 700,
// //           color: "#111827",
// //           marginTop: "16px",
// //           marginBottom: "4px",
// //           fontFamily: "monospace",
// //         }}
// //       >
// //         {value}
// //       </div>
// //       <div style={{ fontSize: "14px", color: "#6B7280", fontWeight: 500 }}>
// //         {title}
// //       </div>
// //     </div>
// //   );
// // };

// // const DueCard = ({ due, navigate }) => {
// //   const isOverdue = new Date(due.dueDate) < new Date();
// //   const completionRate =
// //     due.expectedTotal > 0
// //       ? ((due.collectedTotal / due.expectedTotal) * 100).toFixed(1)
// //       : 0;

// //   return (
// //     <div
// //       onClick={() => navigate(`/estate-admin/household-dues/${due._id}`)}
// //       style={{
// //         padding: "24px",
// //         borderBottom: "1px solid #F3F4F6",
// //         cursor: "pointer",
// //         transition: "all 0.2s ease",
// //       }}
// //       onMouseEnter={(e) => {
// //         e.currentTarget.style.background = "#F9FAFB";
// //       }}
// //       onMouseLeave={(e) => {
// //         e.currentTarget.style.background = "transparent";
// //       }}
// //     >
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "flex-start",
// //         }}
// //       >
// //         <div style={{ flex: 1 }}>
// //           <div
// //             style={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: "12px",
// //               marginBottom: "8px",
// //             }}
// //           >
// //             <h3
// //               style={{
// //                 fontSize: "18px",
// //                 fontWeight: 600,
// //                 color: "#111827",
// //               }}
// //             >
// //               {due.title}
// //             </h3>
// //             <span
// //               style={{
// //                 padding: "4px 12px",
// //                 borderRadius: "6px",
// //                 fontSize: "12px",
// //                 fontWeight: 600,
// //                 background: due.isActive ? "#D1FAE5" : "#F3F4F6",
// //                 color: due.isActive ? "#065F46" : "#6B7280",
// //               }}
// //             >
// //               {due.isActive ? "Active" : "Inactive"}
// //             </span>
// //           </div>

// //           <p
// //             style={{
// //               fontSize: "14px",
// //               color: "#6B7280",
// //               marginBottom: "16px",
// //             }}
// //           >
// //             {due.description}
// //           </p>

// //           <div
// //             style={{
// //               display: "flex",
// //               gap: "32px",
// //               flexWrap: "wrap",
// //             }}
// //           >
// //             <div>
// //               <div
// //                 style={{
// //                   fontSize: "12px",
// //                   color: "#9CA3AF",
// //                   marginBottom: "4px",
// //                 }}
// //               >
// //                 Default Amount
// //               </div>
// //               <div
// //                 style={{
// //                   fontSize: "16px",
// //                   fontWeight: 600,
// //                   color: "#111827",
// //                   fontFamily: "monospace",
// //                 }}
// //               >
// //                 ₦{due.defaultAmount.toLocaleString()}
// //               </div>
// //             </div>

// //             <div>
// //               <div
// //                 style={{
// //                   fontSize: "12px",
// //                   color: "#9CA3AF",
// //                   marginBottom: "4px",
// //                 }}
// //               >
// //                 Assigned
// //               </div>
// //               <div
// //                 style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}
// //               >
// //                 {due.totalAssigned} households
// //               </div>
// //             </div>

// //             <div>
// //               <div
// //                 style={{
// //                   fontSize: "12px",
// //                   color: "#9CA3AF",
// //                   marginBottom: "4px",
// //                 }}
// //               >
// //                 Paid
// //               </div>
// //               <div
// //                 style={{
// //                   fontSize: "16px",
// //                   fontWeight: 600,
// //                   color: "#10B981",
// //                 }}
// //               >
// //                 {due.totalPaid} / {due.totalMustPay}
// //               </div>
// //             </div>

// //             <div>
// //               <div
// //                 style={{
// //                   fontSize: "12px",
// //                   color: "#9CA3AF",
// //                   marginBottom: "4px",
// //                 }}
// //               >
// //                 Completion
// //               </div>
// //               <div
// //                 style={{
// //                   fontSize: "16px",
// //                   fontWeight: 600,
// //                   color: "#111827",
// //                 }}
// //               >
// //                 {completionRate}%
// //               </div>
// //             </div>
// //           </div>

// //           <div style={{ marginTop: "16px" }}>
// //             <div
// //               style={{
// //                 width: "100%",
// //                 height: "8px",
// //                 background: "#F3F4F6",
// //                 borderRadius: "4px",
// //                 overflow: "hidden",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: `${completionRate}%`,
// //                   height: "100%",
// //                   background: "#10B981",
// //                   transition: "width 0.3s ease",
// //                 }}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         <div
// //           style={{
// //             textAlign: "right",
// //             marginLeft: "32px",
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "flex-end",
// //           }}
// //         >
// //           <div
// //             style={{
// //               display: "inline-flex",
// //               alignItems: "center",
// //               gap: "8px",
// //               padding: "8px 16px",
// //               borderRadius: "8px",
// //               background: isOverdue ? "#FEE2E2" : "#DBEAFE",
// //               marginBottom: "12px",
// //             }}
// //           >
// //             <Calendar size={16} color={isOverdue ? "#DC2626" : "#3B82F6"} />
// //             <span
// //               style={{
// //                 fontSize: "13px",
// //                 fontWeight: 600,
// //                 color: isOverdue ? "#DC2626" : "#3B82F6",
// //               }}
// //             >
// //               {new Date(due.dueDate).toLocaleDateString("en-US", {
// //                 month: "short",
// //                 day: "numeric",
// //                 year: "numeric",
// //               })}
// //             </span>
// //           </div>

// //           <div>
// //             <div
// //               style={{
// //                 fontSize: "12px",
// //                 color: "#9CA3AF",
// //                 marginBottom: "4px",
// //               }}
// //             >
// //               Collected
// //             </div>
// //             <div
// //               style={{
// //                 fontSize: "20px",
// //                 fontWeight: 700,
// //                 color: "#10B981",
// //                 fontFamily: "monospace",
// //               }}
// //             >
// //               ₦{due.collectedTotal.toLocaleString()}
// //             </div>
// //           </div>

// //           <div style={{ marginTop: "8px" }}>
// //             <div
// //               style={{
// //                 fontSize: "12px",
// //                 color: "#9CA3AF",
// //                 marginBottom: "4px",
// //               }}
// //             >
// //               Outstanding
// //             </div>
// //             <div
// //               style={{
// //                 fontSize: "16px",
// //                 fontWeight: 600,
// //                 color: "#DC2626",
// //                 fontFamily: "monospace",
// //               }}
// //             >
// //               ₦{due.outstandingTotal.toLocaleString()}
// //             </div>
// //           </div>

// //           <div
// //             style={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: "4px",
// //               marginTop: "16px",
// //               color: "#10B981",
// //               fontSize: "14px",
// //               fontWeight: 600,
// //             }}
// //           >
// //             View Details
// //             <ChevronRight size={16} />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HouseholdDues;

// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   Plus,
//   Calendar,
//   DollarSign,
//   Users,
//   CheckCircle,
//   AlertCircle,
//   X,
//   Search,
//   ChevronRight,
//   RefreshCw,
// } from "lucide-react";
// import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";

// // ─── Recurrence label helper ──────────────────────────────────────────────────
// const recurrenceLabel = (type) => {
//   const map = {
//     one_time: "One Time",
//     weekly: "Weekly",
//     biweekly: "Bi-Weekly",
//     monthly: "Monthly",
//     quarterly: "Quarterly",
//     biannual: "Every 6 Months",
//     yearly: "Yearly",
//   };
//   return map[type] || type;
// };

// const recurrenceColor = (type) => {
//   if (type === "one_time") return { bg: "#F3F4F6", color: "#6B7280" };
//   return { bg: "#EDE9FE", color: "#6D28D9" };
// };

// // ─── HouseholdDues ────────────────────────────────────────────────────────────
// const HouseholdDues = () => {
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const { selectedEstate } = useSelector(
//     (state) => state?.reducer?.estateSlice,
//   );
//   const clanId = selectedEstate?._id;

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     defaultAmount: "",
//     dueDate: "",
//     category: "other",
//     recurrenceType: "one_time",
//   });

//   const {
//     data: duesResponse,
//     isLoading: loading,
//     error,
//   } = useFetchDataV2(`/v1/householdDue/${clanId}`, "householdDues");

//   const dues = duesResponse?.data || [];

//   const createDueMutation = useMutateDataV2("householdDues", "POST");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createDueMutation.mutateAsync({
//         url: "/v1/householdDue",
//         data: {
//           ...formData,
//           clan: clanId,
//           defaultAmount: Number(formData.defaultAmount),
//         },
//       });

//       setShowModal(false);
//       setFormData({
//         title: "",
//         description: "",
//         defaultAmount: "",
//         dueDate: "",
//         category: "other",
//         recurrenceType: "one_time",
//       });
//     } catch (error) {
//       console.error("Error creating due:", error);
//     }
//   };

//   const filteredDues = dues.filter(
//     (due) =>
//       due.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       due.description?.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const totalDues = dues.length;
//   const totalExpected = dues.reduce((sum, due) => sum + due.expectedTotal, 0);
//   const totalCollected = dues.reduce((sum, due) => sum + due.collectedTotal, 0);
//   const totalOutstanding = dues.reduce(
//     (sum, due) => sum + due.outstandingTotal,
//     0,
//   );

//   return (
//     <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
//       {/* ── Header ── */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "32px",
//         }}
//       >
//         <div>
//           <h1
//             style={{
//               fontSize: "28px",
//               fontWeight: 700,
//               color: "#111827",
//               marginBottom: "4px",
//             }}
//           >
//             Household Dues
//           </h1>
//           <p style={{ fontSize: "14px", color: "#6B7280" }}>
//             Manage levies and household payments
//           </p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           style={{
//             padding: "12px 24px",
//             background: "#10B981",
//             color: "white",
//             fontSize: "14px",
//             fontWeight: 600,
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//           }}
//         >
//           <Plus size={16} />
//           Create New Due
//         </button>
//       </div>

//       {/* ── Stats ── */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: "24px",
//           marginBottom: "32px",
//         }}
//       >
//         <StatsCard
//           title="Total Dues"
//           value={totalDues}
//           icon={<Calendar size={24} />}
//           iconBg="#DBEAFE"
//           iconColor="#3B82F6"
//         />
//         <StatsCard
//           title="Expected Amount"
//           value={`₦${totalExpected.toLocaleString()}`}
//           icon={<DollarSign size={24} />}
//           iconBg="#FEF3C7"
//           iconColor="#F59E0B"
//         />
//         <StatsCard
//           title="Collected"
//           value={`₦${totalCollected.toLocaleString()}`}
//           icon={<CheckCircle size={24} />}
//           iconBg="#D1FAE5"
//           iconColor="#10B981"
//         />
//         <StatsCard
//           title="Outstanding"
//           value={`₦${totalOutstanding.toLocaleString()}`}
//           icon={<AlertCircle size={24} />}
//           iconBg="#FEE2E2"
//           iconColor="#DC2626"
//         />
//       </div>

//       {/* ── Search ── */}
//       <div
//         style={{
//           background: "white",
//           borderRadius: "12px",
//           padding: "20px 24px",
//           marginBottom: "24px",
//           boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <div style={{ position: "relative", maxWidth: "400px" }}>
//           <Search
//             size={18}
//             style={{
//               position: "absolute",
//               left: "14px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               color: "#9CA3AF",
//             }}
//           />
//           <input
//             type="text"
//             placeholder="Search dues..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "10px 16px 10px 42px",
//               border: "1px solid #E5E7EB",
//               borderRadius: "10px",
//               fontSize: "14px",
//               background: "#F9FAFB",
//               outline: "none",
//             }}
//           />
//         </div>
//       </div>

//       {/* ── List ── */}
//       <div
//         style={{
//           background: "white",
//           borderRadius: "12px",
//           overflow: "hidden",
//           boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         {loading ? (
//           <div style={{ padding: "64px", textAlign: "center" }}>
//             <p style={{ fontSize: "14px", color: "#6B7280" }}>Loading...</p>
//           </div>
//         ) : error ? (
//           <div style={{ padding: "64px", textAlign: "center" }}>
//             <AlertCircle
//               size={32}
//               color="#DC2626"
//               style={{ margin: "0 auto 16px" }}
//             />
//             <p
//               style={{
//                 fontSize: "16px",
//                 fontWeight: 600,
//                 color: "#111827",
//                 marginBottom: "8px",
//               }}
//             >
//               Error loading dues
//             </p>
//             <p style={{ fontSize: "14px", color: "#6B7280" }}>
//               {error?.message || "Something went wrong"}
//             </p>
//           </div>
//         ) : filteredDues.length === 0 ? (
//           <div style={{ padding: "64px", textAlign: "center" }}>
//             <Calendar
//               size={32}
//               color="#D1D5DB"
//               style={{ margin: "0 auto 16px" }}
//             />
//             <p
//               style={{
//                 fontSize: "16px",
//                 fontWeight: 600,
//                 color: "#111827",
//                 marginBottom: "8px",
//               }}
//             >
//               No dues found
//             </p>
//             <p style={{ fontSize: "14px", color: "#6B7280" }}>
//               {searchTerm
//                 ? "No dues match your search"
//                 : "Create your first household due to get started"}
//             </p>
//           </div>
//         ) : (
//           <div>
//             {filteredDues.map((due) => (
//               <DueCard key={due._id} due={due} navigate={navigate} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ── Create Modal ── */}
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000,
//             padding: "24px",
//           }}
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             style={{
//               background: "white",
//               borderRadius: "16px",
//               maxWidth: "620px",
//               width: "100%",
//               maxHeight: "90vh",
//               overflowY: "auto",
//               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Modal Header */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "24px 32px",
//                 borderBottom: "1px solid #E5E7EB",
//                 position: "sticky",
//                 top: 0,
//                 background: "white",
//                 zIndex: 1,
//               }}
//             >
//               <h3
//                 style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}
//               >
//                 Create New Due
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 style={{
//                   width: "36px",
//                   height: "36px",
//                   borderRadius: "8px",
//                   background: "#F3F4F6",
//                   border: "none",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   color: "#6B7280",
//                 }}
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} style={{ padding: "32px" }}>
//               {/* Title */}
//               <div style={{ marginBottom: "20px" }}>
//                 <label style={labelStyle}>Title</label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                   placeholder="e.g., Security Levy Q1 2025"
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Description */}
//               <div style={{ marginBottom: "20px" }}>
//                 <label style={labelStyle}>Description</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   placeholder="Describe the purpose of this due"
//                   rows={3}
//                   style={{ ...inputStyle, resize: "vertical" }}
//                 />
//               </div>

//               {/* Amount + Due Date */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "16px",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <div>
//                   <label style={labelStyle}>Amount (₦)</label>
//                   <input
//                     type="number"
//                     required
//                     value={formData.defaultAmount}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         defaultAmount: e.target.value,
//                       })
//                     }
//                     placeholder="50000"
//                     style={inputStyle}
//                   />
//                 </div>
//                 <div>
//                   <label style={labelStyle}>Due Date</label>
//                   <input
//                     type="date"
//                     required
//                     value={formData.dueDate}
//                     onChange={(e) =>
//                       setFormData({ ...formData, dueDate: e.target.value })
//                     }
//                     style={inputStyle}
//                   />
//                 </div>
//               </div>

//               {/* Category + Recurrence */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "16px",
//                   marginBottom: "32px",
//                 }}
//               >
//                 <div>
//                   <label style={labelStyle}>Category</label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                     style={inputStyle}
//                   >
//                     <option value="annual_levy">Annual Levy</option>
//                     <option value="security">Security</option>
//                     <option value="development">Development</option>
//                     <option value="maintenance">Maintenance</option>
//                     <option value="special_assessment">
//                       Special Assessment
//                     </option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label style={labelStyle}>
//                     Recurrence Type
//                     <span
//                       style={{
//                         marginLeft: "6px",
//                         fontSize: "12px",
//                         color: "#9CA3AF",
//                         fontWeight: 400,
//                       }}
//                     >
//                       (how often does this repeat?)
//                     </span>
//                   </label>
//                   <select
//                     value={formData.recurrenceType}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         recurrenceType: e.target.value,
//                       })
//                     }
//                     style={inputStyle}
//                   >
//                     <option value="one_time">One Time</option>
//                     <option value="weekly">Weekly</option>
//                     <option value="biweekly">Bi-Weekly</option>
//                     <option value="monthly">Monthly</option>
//                     <option value="quarterly">Quarterly (3 months)</option>
//                     <option value="biannual">Every 6 Months</option>
//                     <option value="yearly">Yearly</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Recurrence hint */}
//               {formData.recurrenceType !== "one_time" && (
//                 <div
//                   style={{
//                     padding: "12px 16px",
//                     background: "#EDE9FE",
//                     borderRadius: "8px",
//                     marginBottom: "20px",
//                     display: "flex",
//                     alignItems: "flex-start",
//                     gap: "10px",
//                   }}
//                 >
//                   <RefreshCw
//                     size={16}
//                     color="#6D28D9"
//                     style={{ marginTop: "2px", flexShrink: 0 }}
//                   />
//                   <p style={{ fontSize: "13px", color: "#5B21B6", margin: 0 }}>
//                     This due is set to repeat{" "}
//                     <strong>{recurrenceLabel(formData.recurrenceType)}</strong>.
//                     When the period ends, you can generate the next period from
//                     the due detail page — all households will carry over
//                     automatically.
//                   </p>
//                 </div>
//               )}

//               {/* Error */}
//               {createDueMutation.isError && (
//                 <div
//                   style={{
//                     padding: "12px 16px",
//                     background: "#FEE2E2",
//                     borderRadius: "8px",
//                     marginBottom: "20px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}
//                 >
//                   <AlertCircle size={16} color="#DC2626" />
//                   <span style={{ fontSize: "14px", color: "#DC2626" }}>
//                     {createDueMutation.error?.message ||
//                       "Failed to create due. Please try again."}
//                   </span>
//                 </div>
//               )}

//               {/* Actions */}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   gap: "12px",
//                 }}
//               >
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   disabled={createDueMutation.isPending}
//                   style={{
//                     padding: "12px 24px",
//                     background: "white",
//                     color: "#374151",
//                     fontSize: "14px",
//                     fontWeight: 600,
//                     borderRadius: "8px",
//                     border: "1px solid #E5E7EB",
//                     cursor: createDueMutation.isPending
//                       ? "not-allowed"
//                       : "pointer",
//                     opacity: createDueMutation.isPending ? 0.6 : 1,
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={createDueMutation.isPending}
//                   style={{
//                     padding: "12px 24px",
//                     background: createDueMutation.isPending
//                       ? "#9CA3AF"
//                       : "#10B981",
//                     color: "white",
//                     fontSize: "14px",
//                     fontWeight: 600,
//                     borderRadius: "8px",
//                     border: "none",
//                     cursor: createDueMutation.isPending
//                       ? "not-allowed"
//                       : "pointer",
//                     boxShadow: createDueMutation.isPending
//                       ? "none"
//                       : "0 4px 12px rgba(16, 185, 129, 0.3)",
//                   }}
//                 >
//                   {createDueMutation.isPending ? "Creating..." : "Create Due"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Shared Styles ────────────────────────────────────────────────────────────
// const labelStyle = {
//   display: "block",
//   fontSize: "14px",
//   fontWeight: 600,
//   color: "#374151",
//   marginBottom: "8px",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "12px 16px",
//   border: "1px solid #E5E7EB",
//   borderRadius: "8px",
//   fontSize: "14px",
//   color: "#111827",
//   background: "white",
//   boxSizing: "border-box",
//   outline: "none",
// };

// // ─── StatsCard ────────────────────────────────────────────────────────────────
// const StatsCard = ({ title, value, icon, iconBg, iconColor }) => (
//   <div
//     style={{
//       background: "white",
//       borderRadius: "12px",
//       padding: "24px",
//       boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//     }}
//   >
//     <div
//       style={{
//         width: "48px",
//         height: "48px",
//         borderRadius: "12px",
//         background: iconBg,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: iconColor,
//       }}
//     >
//       {icon}
//     </div>
//     <div
//       style={{
//         fontSize: "32px",
//         fontWeight: 700,
//         color: "#111827",
//         marginTop: "16px",
//         marginBottom: "4px",
//         fontFamily: "monospace",
//       }}
//     >
//       {value}
//     </div>
//     <div style={{ fontSize: "14px", color: "#6B7280", fontWeight: 500 }}>
//       {title}
//     </div>
//   </div>
// );

// // ─── DueCard ──────────────────────────────────────────────────────────────────
// const DueCard = ({ due, navigate }) => {
//   const isOverdue = new Date(due.dueDate) < new Date();
//   const completionRate =
//     due.expectedTotal > 0
//       ? ((due.collectedTotal / due.expectedTotal) * 100).toFixed(1)
//       : 0;

//   const rLabel = recurrenceLabel(due.recurrenceType || "one_time");
//   const rColor = recurrenceColor(due.recurrenceType || "one_time");

//   return (
//     <div
//       onClick={() => navigate(`/estate-admin/household-dues/${due._id}`)}
//       style={{
//         padding: "24px",
//         borderBottom: "1px solid #F3F4F6",
//         cursor: "pointer",
//         transition: "background 0.2s ease",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.background = "#F9FAFB";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.background = "transparent";
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//         }}
//       >
//         <div style={{ flex: 1 }}>
//           {/* Title row */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               marginBottom: "6px",
//               flexWrap: "wrap",
//             }}
//           >
//             <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
//               {due.title}
//             </h3>
//             {/* Active badge */}
//             <span
//               style={{
//                 padding: "3px 10px",
//                 borderRadius: "6px",
//                 fontSize: "12px",
//                 fontWeight: 600,
//                 background: due.isActive ? "#D1FAE5" : "#F3F4F6",
//                 color: due.isActive ? "#065F46" : "#6B7280",
//               }}
//             >
//               {due.isActive ? "Active" : "Inactive"}
//             </span>
//             {/* Recurrence badge */}
//             <span
//               style={{
//                 padding: "3px 10px",
//                 borderRadius: "6px",
//                 fontSize: "12px",
//                 fontWeight: 600,
//                 background: rColor.bg,
//                 color: rColor.color,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "4px",
//               }}
//             >
//               {due.recurrenceType !== "one_time" && <RefreshCw size={11} />}
//               {rLabel}
//             </span>
//           </div>

//           <p
//             style={{
//               fontSize: "14px",
//               color: "#6B7280",
//               marginBottom: "16px",
//             }}
//           >
//             {due.description}
//           </p>

//           {/* Metrics row */}
//           <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
//             <Metric
//               label="Default Amount"
//               value={`₦${due.defaultAmount.toLocaleString()}`}
//               mono
//             />
//             <Metric
//               label="Assigned"
//               value={`${due.totalAssigned} households`}
//             />
//             <Metric
//               label="Paid"
//               value={`${due.totalPaid} / ${due.totalMustPay}`}
//               valueColor="#10B981"
//             />
//             <Metric label="Completion" value={`${completionRate}%`} />
//           </div>

//           {/* Progress bar */}
//           <div
//             style={{
//               marginTop: "16px",
//               width: "100%",
//               height: "8px",
//               background: "#F3F4F6",
//               borderRadius: "4px",
//               overflow: "hidden",
//             }}
//           >
//             <div
//               style={{
//                 width: `${completionRate}%`,
//                 height: "100%",
//                 background: "#10B981",
//                 transition: "width 0.3s ease",
//               }}
//             />
//           </div>
//         </div>

//         {/* Right panel */}
//         <div
//           style={{
//             textAlign: "right",
//             marginLeft: "32px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-end",
//           }}
//         >
//           {/* Due date badge */}
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "8px",
//               padding: "8px 16px",
//               borderRadius: "8px",
//               background: isOverdue ? "#FEE2E2" : "#DBEAFE",
//               marginBottom: "12px",
//             }}
//           >
//             <Calendar size={16} color={isOverdue ? "#DC2626" : "#3B82F6"} />
//             <span
//               style={{
//                 fontSize: "13px",
//                 fontWeight: 600,
//                 color: isOverdue ? "#DC2626" : "#3B82F6",
//               }}
//             >
//               {new Date(due.dueDate).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//                 year: "numeric",
//               })}
//             </span>
//           </div>

//           <div style={{ marginBottom: "8px" }}>
//             <div
//               style={{
//                 fontSize: "12px",
//                 color: "#9CA3AF",
//                 marginBottom: "4px",
//               }}
//             >
//               Collected
//             </div>
//             <div
//               style={{
//                 fontSize: "20px",
//                 fontWeight: 700,
//                 color: "#10B981",
//                 fontFamily: "monospace",
//               }}
//             >
//               ₦{due.collectedTotal.toLocaleString()}
//             </div>
//           </div>

//           <div>
//             <div
//               style={{
//                 fontSize: "12px",
//                 color: "#9CA3AF",
//                 marginBottom: "4px",
//               }}
//             >
//               Outstanding
//             </div>
//             <div
//               style={{
//                 fontSize: "16px",
//                 fontWeight: 600,
//                 color: "#DC2626",
//                 fontFamily: "monospace",
//               }}
//             >
//               ₦{due.outstandingTotal.toLocaleString()}
//             </div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "4px",
//               marginTop: "16px",
//               color: "#10B981",
//               fontSize: "14px",
//               fontWeight: 600,
//             }}
//           >
//             View Details
//             <ChevronRight size={16} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Metric = ({ label, value, mono, valueColor }) => (
//   <div>
//     <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "4px" }}>
//       {label}
//     </div>
//     <div
//       style={{
//         fontSize: "16px",
//         fontWeight: 600,
//         color: valueColor || "#111827",
//         fontFamily: mono ? "monospace" : "inherit",
//       }}
//     >
//       {value}
//     </div>
//   </div>
// );

// export default HouseholdDues;

import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  X,
  Search,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RECURRENCE_OPTIONS = [
  { value: "one_time", label: "One Time" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly (3 months)" },
  { value: "biannual", label: "Every 6 Months" },
  { value: "yearly", label: "Yearly" },
];

const recurrenceLabel = (type) =>
  RECURRENCE_OPTIONS.find((o) => o.value === type)?.label || type;

const recurrenceBadge = (type) =>
  type === "one_time"
    ? { bg: "#F3F4F6", color: "#6B7280" }
    : { bg: "#EDE9FE", color: "#6D28D9" };

// Calculate end date from start date + recurrenceType (mirrors backend logic)
const calculateEndDate = (startDateStr, recurrenceType) => {
  if (!startDateStr || !recurrenceType || recurrenceType === "one_time")
    return null;

  const end = new Date(startDateStr);

  switch (recurrenceType) {
    case "weekly":
      end.setDate(end.getDate() + 7);
      break;
    case "biweekly":
      end.setDate(end.getDate() + 14);
      break;
    case "monthly":
      end.setMonth(end.getMonth() + 1);
      break;
    case "quarterly":
      end.setMonth(end.getMonth() + 3);
      break;
    case "biannual":
      end.setMonth(end.getMonth() + 6);
      break;
    case "yearly":
      end.setFullYear(end.getFullYear() + 1);
      break;
    default:
      return null;
  }

  return end.toISOString().split("T")[0]; // "YYYY-MM-DD"
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// ─── Shared styles ────────────────────────────────────────────────────────────

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: 600,
  color: "#374151",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #E5E7EB",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#111827",
  background: "white",
  boxSizing: "border-box",
  outline: "none",
};

// ─── HouseholdDues ────────────────────────────────────────────────────────────

const HouseholdDues = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );
  const clanId = selectedEstate?._id;

  const defaultForm = {
    title: "",
    description: "",
    defaultAmount: "",
    startDate: "", // only used for recurring
    dueDate: "", // used for one_time
    category: "other",
    recurrenceType: "one_time",
  };

  const [formData, setFormData] = useState(defaultForm);

  // Auto-calculated end date shown as read-only preview
  const calculatedEndDate = useMemo(
    () => calculateEndDate(formData.startDate, formData.recurrenceType),
    [formData.startDate, formData.recurrenceType],
  );

  const isRecurring = formData.recurrenceType !== "one_time";

  const {
    data: duesResponse,
    isLoading: loading,
    error,
  } = useFetchDataV2(`/v1/householdDue/${clanId}`, "householdDues");

  const dues = duesResponse?.data || [];

  const createDueMutation = useMutateDataV2("householdDues", "POST");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build payload
    const payload = {
      clan: clanId,
      title: formData.title,
      description: formData.description,
      defaultAmount: Number(formData.defaultAmount),
      category: formData.category,
      recurrenceType: formData.recurrenceType,
    };

    if (isRecurring) {
      // Send startDate — backend calculates dueDate
      payload.startDate = formData.startDate;
      payload.dueDate = calculatedEndDate; // also send so backend has it
    } else {
      // one_time — admin picked due date manually
      payload.dueDate = formData.dueDate;
    }

    try {
      await createDueMutation.mutateAsync({
        url: "/v1/householdDue",
        data: payload,
      });
      setShowModal(false);
      setFormData(defaultForm);
    } catch (error) {
      console.error("Error creating due:", error);
    }
  };

  const filteredDues = dues.filter(
    (due) =>
      due.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      due.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalExpected = dues.reduce((s, d) => s + d.expectedTotal, 0);
  const totalCollected = dues.reduce((s, d) => s + d.collectedTotal, 0);
  const totalOutstanding = dues.reduce((s, d) => s + d.outstandingTotal, 0);

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "4px",
            }}
          >
            Household Dues
          </h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>
            Manage levies and household payments
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "12px 24px",
            background: "#10B981",
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Plus size={16} /> Create New Due
        </button>
      </div>

      {/* ── Stats ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <StatsCard
          title="Total Dues"
          value={dues.length}
          icon={<Calendar size={24} />}
          iconBg="#DBEAFE"
          iconColor="#3B82F6"
        />
        <StatsCard
          title="Expected Amount"
          value={`₦${totalExpected.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          iconBg="#FEF3C7"
          iconColor="#F59E0B"
        />
        <StatsCard
          title="Collected"
          value={`₦${totalCollected.toLocaleString()}`}
          icon={<CheckCircle size={24} />}
          iconBg="#D1FAE5"
          iconColor="#10B981"
        />
        <StatsCard
          title="Outstanding"
          value={`₦${totalOutstanding.toLocaleString()}`}
          icon={<AlertCircle size={24} />}
          iconBg="#FEE2E2"
          iconColor="#DC2626"
        />
      </div>

      {/* ── Search ── */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px 24px",
          marginBottom: "24px",
          boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ position: "relative", maxWidth: "400px" }}>
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9CA3AF",
            }}
          />
          <input
            type="text"
            placeholder="Search dues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              ...inputStyle,
              paddingLeft: "42px",
              background: "#F9FAFB",
            }}
          />
        </div>
      </div>

      {/* ── List ── */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)",
        }}
      >
        {loading ? (
          <div style={{ padding: "64px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "#6B7280" }}>Loading...</p>
          </div>
        ) : error ? (
          <div style={{ padding: "64px", textAlign: "center" }}>
            <AlertCircle
              size={32}
              color="#DC2626"
              style={{ margin: "0 auto 16px" }}
            />
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}>
              Error loading dues
            </p>
            <p style={{ fontSize: "14px", color: "#6B7280" }}>
              {error?.message}
            </p>
          </div>
        ) : filteredDues.length === 0 ? (
          <div style={{ padding: "64px", textAlign: "center" }}>
            <Calendar
              size={32}
              color="#D1D5DB"
              style={{ margin: "0 auto 16px" }}
            />
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}>
              No dues found
            </p>
            <p style={{ fontSize: "14px", color: "#6B7280" }}>
              {searchTerm
                ? "No dues match your search"
                : "Create your first household due to get started"}
            </p>
          </div>
        ) : (
          filteredDues.map((due) => (
            <DueCard key={due._id} due={due} navigate={navigate} />
          ))
        )}
      </div>

      {/* ══════════════════════════════════════════
          CREATE MODAL
      ══════════════════════════════════════════ */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "24px",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              maxWidth: "620px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 32px",
                borderBottom: "1px solid #E5E7EB",
                position: "sticky",
                top: 0,
                background: "white",
                zIndex: 1,
              }}
            >
              <h3
                style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}
              >
                Create New Due
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "#F3F4F6",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#6B7280",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "32px" }}>
              {/* Title */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Security Levy Q1 2025"
                  style={inputStyle}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the purpose of this due"
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {/* Amount */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Amount (₦)</label>
                <input
                  type="number"
                  required
                  value={formData.defaultAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, defaultAmount: e.target.value })
                  }
                  placeholder="50000"
                  style={inputStyle}
                />
              </div>

              {/* Category + Recurrence */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label style={labelStyle}>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    style={inputStyle}
                  >
                    <option value="annual_levy">Annual Levy</option>
                    <option value="security">Security</option>
                    <option value="development">Development</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="special_assessment">
                      Special Assessment
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Recurrence Type</label>
                  <select
                    value={formData.recurrenceType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recurrenceType: e.target.value,
                        // reset date fields when switching type
                        startDate: "",
                        dueDate: "",
                      })
                    }
                    style={inputStyle}
                  >
                    {RECURRENCE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ── DATE SECTION ── */}
              {!isRecurring ? (
                /* ONE TIME — just pick a due date */
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>Due Date</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9CA3AF",
                      marginTop: "6px",
                    }}
                  >
                    The deadline by which all households must pay
                  </p>
                </div>
              ) : (
                /* RECURRING — pick start date, end date is auto-calculated */
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>Start Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9CA3AF",
                      marginTop: "6px",
                    }}
                  >
                    When this period begins
                  </p>

                  {/* Auto-calculated end date preview */}
                  {calculatedEndDate && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "14px 16px",
                        background: "#F0FDF4",
                        border: "1px solid #6EE7B7",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Calendar
                        size={16}
                        color="#10B981"
                        style={{ flexShrink: 0 }}
                      />
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#065F46",
                            fontWeight: 600,
                            margin: 0,
                          }}
                        >
                          Period End Date (auto-calculated)
                        </p>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "#047857",
                            fontWeight: 700,
                            margin: "2px 0 0",
                          }}
                        >
                          {formatDate(calculatedEndDate)}
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#6B7280",
                            margin: "2px 0 0",
                          }}
                        >
                          Based on {recurrenceLabel(formData.recurrenceType)}{" "}
                          recurrence
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Recurrence hint */}
              {isRecurring && (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "#EDE9FE",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <RefreshCw
                    size={16}
                    color="#6D28D9"
                    style={{ marginTop: "2px", flexShrink: 0 }}
                  />
                  <p style={{ fontSize: "13px", color: "#5B21B6", margin: 0 }}>
                    When this period ends, you can generate the next period from
                    the due detail page — all households will carry over
                    automatically with their payment reset to unpaid.
                  </p>
                </div>
              )}

              {/* Error */}
              {createDueMutation.isError && (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "#FEE2E2",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <AlertCircle size={16} color="#DC2626" />
                  <span style={{ fontSize: "14px", color: "#DC2626" }}>
                    {createDueMutation.error?.message ||
                      "Failed to create due. Please try again."}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={createDueMutation.isPending}
                  style={{
                    padding: "12px 24px",
                    background: "white",
                    color: "#374151",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    cursor: createDueMutation.isPending
                      ? "not-allowed"
                      : "pointer",
                    opacity: createDueMutation.isPending ? 0.6 : 1,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    createDueMutation.isPending ||
                    (isRecurring && !formData.startDate)
                  }
                  style={{
                    padding: "12px 24px",
                    background:
                      createDueMutation.isPending ||
                      (isRecurring && !formData.startDate)
                        ? "#9CA3AF"
                        : "#10B981",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderRadius: "8px",
                    border: "none",
                    cursor:
                      createDueMutation.isPending ||
                      (isRecurring && !formData.startDate)
                        ? "not-allowed"
                        : "pointer",
                    boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
                  }}
                >
                  {createDueMutation.isPending ? "Creating..." : "Create Due"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── StatsCard ────────────────────────────────────────────────────────────────
const StatsCard = ({ title, value, icon, iconBg, iconColor }) => (
  <div
    style={{
      background: "white",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)",
    }}
  >
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        background: iconBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: iconColor,
      }}
    >
      {icon}
    </div>
    <div
      style={{
        fontSize: "32px",
        fontWeight: 700,
        color: "#111827",
        marginTop: "16px",
        marginBottom: "4px",
        fontFamily: "monospace",
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: "14px", color: "#6B7280", fontWeight: 500 }}>
      {title}
    </div>
  </div>
);

// ─── DueCard ──────────────────────────────────────────────────────────────────
const DueCard = ({ due, navigate }) => {
  const isOverdue = new Date(due.dueDate) < new Date();
  const completionRate =
    due.expectedTotal > 0
      ? ((due.collectedTotal / due.expectedTotal) * 100).toFixed(1)
      : 0;

  const rLabel = recurrenceLabel(due.recurrenceType || "one_time");
  const rColor = recurrenceBadge(due.recurrenceType || "one_time");
  const isRecurring = due.recurrenceType && due.recurrenceType !== "one_time";

  return (
    <div
      onClick={() => navigate(`/estate-admin/household-dues/${due._id}`)}
      style={{
        padding: "24px",
        borderBottom: "1px solid #F3F4F6",
        cursor: "pointer",
        transition: "background 0.2s",
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          {/* Title + badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "6px",
              flexWrap: "wrap",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
              {due.title}
            </h3>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                background: due.isActive ? "#D1FAE5" : "#F3F4F6",
                color: due.isActive ? "#065F46" : "#6B7280",
              }}
            >
              {due.isActive ? "Active" : "Inactive"}
            </span>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                background: rColor.bg,
                color: rColor.color,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {isRecurring && <RefreshCw size={11} />}
              {rLabel}
            </span>
          </div>

          <p
            style={{ fontSize: "14px", color: "#6B7280", marginBottom: "16px" }}
          >
            {due.description}
          </p>

          {/* Period dates for recurring */}
          {isRecurring && due.startDate && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
                Period:
              </span>
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}
              >
                {formatDate(due.startDate)} → {formatDate(due.dueDate)}
              </span>
            </div>
          )}

          {/* Metrics */}
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <Metric
              label="Amount"
              value={`₦${due.defaultAmount.toLocaleString()}`}
              mono
            />
            <Metric
              label="Assigned"
              value={`${due.totalAssigned} households`}
            />
            <Metric
              label="Paid"
              value={`${due.totalPaid} / ${due.totalMustPay}`}
              valueColor="#10B981"
            />
            <Metric label="Completion" value={`${completionRate}%`} />
          </div>

          {/* Progress bar */}
          <div
            style={{
              marginTop: "16px",
              width: "100%",
              height: "8px",
              background: "#F3F4F6",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${completionRate}%`,
                height: "100%",
                background: "#10B981",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Right panel */}
        <div
          style={{
            textAlign: "right",
            marginLeft: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {/* Due date badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "8px",
              background: isOverdue ? "#FEE2E2" : "#DBEAFE",
              marginBottom: "12px",
            }}
          >
            <Calendar size={16} color={isOverdue ? "#DC2626" : "#3B82F6"} />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: isOverdue ? "#DC2626" : "#3B82F6",
              }}
            >
              {isRecurring ? "Ends " : ""}
              {formatDate(due.dueDate)}
            </span>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <div
              style={{
                fontSize: "12px",
                color: "#9CA3AF",
                marginBottom: "4px",
              }}
            >
              Collected
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#10B981",
                fontFamily: "monospace",
              }}
            >
              ₦{due.collectedTotal.toLocaleString()}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#9CA3AF",
                marginBottom: "4px",
              }}
            >
              Outstanding
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#DC2626",
                fontFamily: "monospace",
              }}
            >
              ₦{due.outstandingTotal.toLocaleString()}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "16px",
              color: "#10B981",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            View Details <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Metric = ({ label, value, mono, valueColor }) => (
  <div>
    <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "4px" }}>
      {label}
    </div>
    <div
      style={{
        fontSize: "16px",
        fontWeight: 600,
        color: valueColor || "#111827",
        fontFamily: mono ? "monospace" : "inherit",
      }}
    >
      {value}
    </div>
  </div>
);

export default HouseholdDues;
