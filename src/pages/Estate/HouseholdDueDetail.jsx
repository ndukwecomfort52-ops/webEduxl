// // // // import { useState } from "react";
// // // // import { useParams, useNavigate } from "react-router-dom";
// // // // import {
// // // //   ArrowLeft,
// // // //   Edit,
// // // //   Calendar,
// // // //   DollarSign,
// // // //   Users,
// // // //   CheckCircle,
// // // //   AlertCircle,
// // // //   X,
// // // //   Save,
// // // //   Plus,
// // // //   Home,
// // // //   Trash2,
// // // //   XCircle,
// // // // } from "lucide-react";
// // // // import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";
// // // // import { useSelector } from "react-redux";

// // // // const HouseholdDueDetail = () => {
// // // //   const { id: dueId } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const [showEditModal, setShowEditModal] = useState(false);
// // // //   const [showAssignModal, setShowAssignModal] = useState(false);
// // // //   const [selectedHouseholds, setSelectedHouseholds] = useState({});
// // // //   const [showWaiveConfirm, setShowWaiveConfirm] = useState(null);
// // // //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

// // // //   const { selectedEstate } = useSelector(
// // // //     (state) => state?.reducer?.estateSlice,
// // // //   );
// // // //   const clanId = selectedEstate?._id;

// // // //   const {
// // // //     data: dueResponse,
// // // //     isLoading: loading,
// // // //     error,
// // // //   } = useFetchDataV2(`/v1/householdDue/due/${dueId}`, `householdDue-${dueId}`);

// // // //   const due = dueResponse?.data;

// // // //   const { data: householdsResponse, isLoading: loadingHouseholds } =
// // // //     useFetchDataV2(`/v1/household/${clanId}`, `households-${clanId}`);

// // // //   const allHouseholds = householdsResponse?.data || [];

// // // //   const updateDueMutation = useMutateDataV2(`householdDue-${dueId}`, "PATCH");
// // // //   const assignHouseholdsMutation = useMutateDataV2(
// // // //     `householdDue-${dueId}`,
// // // //     "POST",
// // // //   );
// // // //   const waiveMutation = useMutateDataV2(`householdDue-${dueId}`, "POST");
// // // //   const deleteMutation = useMutateDataV2(`householdDue-${dueId}`, "DELETE");

// // // //   const [formData, setFormData] = useState({
// // // //     title: "",
// // // //     description: "",
// // // //     dueDate: "",
// // // //     isActive: true,
// // // //   });

// // // //   const getAlreadyAssignedIds = () => {
// // // //     if (!due?.households) return new Set();
// // // //     return new Set(due.households.map((h) => h.household._id));
// // // //   };

// // // //   const alreadyAssignedIds = getAlreadyAssignedIds();
// // // //   const availableHouseholds = allHouseholds.filter(
// // // //     (h) => !alreadyAssignedIds.has(h._id),
// // // //   );

// // // //   const handleSelectAll = () => {
// // // //     if (availableHouseholds.length === 0) return;

// // // //     const allSelected = {};
// // // //     availableHouseholds.forEach((household) => {
// // // //       allSelected[household._id] = "unpaid";
// // // //     });
// // // //     setSelectedHouseholds(allSelected);
// // // //   };

// // // //   const handleDeselectAll = () => {
// // // //     setSelectedHouseholds({});
// // // //   };

// // // //   const allSelected =
// // // //     availableHouseholds.length > 0 &&
// // // //     Object.keys(selectedHouseholds).length === availableHouseholds.length;

// // // //   const someSelected =
// // // //     Object.keys(selectedHouseholds).length > 0 && !allSelected;

// // // //   const handleOpenEdit = () => {
// // // //     setFormData({
// // // //       title: due.title,
// // // //       description: due.description,
// // // //       dueDate: due.dueDate
// // // //         ? new Date(due.dueDate).toISOString().split("T")[0]
// // // //         : "",
// // // //       isActive: due.isActive,
// // // //     });
// // // //     setShowEditModal(true);
// // // //   };

// // // //   const handleUpdate = async (e) => {
// // // //     e.preventDefault();
// // // //     const updates = {};
// // // //     if (formData.title !== due.title) updates.title = formData.title;
// // // //     if (formData.description !== due.description)
// // // //       updates.description = formData.description;
// // // //     if (
// // // //       formData.dueDate !== new Date(due.dueDate).toISOString().split("T")[0]
// // // //     ) {
// // // //       updates.dueDate = formData.dueDate;
// // // //     }
// // // //     if (formData.isActive !== due.isActive)
// // // //       updates.isActive = formData.isActive;

// // // //     if (Object.keys(updates).length === 0) {
// // // //       setShowEditModal(false);
// // // //       return;
// // // //     }

// // // //     try {
// // // //       await updateDueMutation.mutateAsync({
// // // //         url: `/v1/householdDue/due/${dueId}`,
// // // //         data: updates,
// // // //       });
// // // //       setShowEditModal(false);
// // // //     } catch (error) {
// // // //       console.error("Error updating due:", error);
// // // //     }
// // // //   };

// // // //   const handleOpenAssign = () => {
// // // //     setSelectedHouseholds({});
// // // //     setShowAssignModal(true);
// // // //   };

// // // //   const handleToggleHousehold = (householdId) => {
// // // //     setSelectedHouseholds((prev) => {
// // // //       if (prev[householdId]) {
// // // //         const { [householdId]: removed, ...rest } = prev;
// // // //         return rest;
// // // //       } else {
// // // //         return { ...prev, [householdId]: "unpaid" };
// // // //       }
// // // //     });
// // // //   };

// // // //   const handleStatusChange = (householdId, status) => {
// // // //     setSelectedHouseholds((prev) => ({
// // // //       ...prev,
// // // //       [householdId]: status,
// // // //     }));
// // // //   };

// // // //   const handleAssignHouseholds = async () => {
// // // //     const householdIds = Object.keys(selectedHouseholds);
// // // //     if (householdIds.length === 0) return;

// // // //     try {
// // // //       await assignHouseholdsMutation.mutateAsync({
// // // //         url: `/v1/householdDue/due/${dueId}`,
// // // //         data: {
// // // //           householdIds,
// // // //           statuses: selectedHouseholds,
// // // //         },
// // // //       });
// // // //       setShowAssignModal(false);
// // // //       setSelectedHouseholds({});
// // // //     } catch (error) {
// // // //       console.error("Error assigning households:", error);
// // // //     }
// // // //   };

// // // //   const handleWaiveHousehold = async (householdId) => {
// // // //     try {
// // // //       await waiveMutation.mutateAsync({
// // // //         url: `/v1/householdDue/waive`,
// // // //         data: {
// // // //           householdId: householdId,
// // // //           duesId: dueId,
// // // //         },
// // // //       });
// // // //       setShowWaiveConfirm(null);
// // // //     } catch (error) {
// // // //       console.error("Error waiving household:", error);
// // // //     }
// // // //   };

// // // //   const handleDeleteDue = async () => {
// // // //     try {
// // // //       await deleteMutation.mutateAsync({
// // // //         url: `/v1/householdDue/waive`,
// // // //         data: {
// // // //           duesId: dueId,
// // // //         },
// // // //       });
// // // //       setShowDeleteConfirm(false);
// // // //       navigate(-1);
// // // //     } catch (error) {
// // // //       console.error("Error deleting due:", error);
// // // //     }
// // // //   };

// // // //   const canDelete = due && due.totalPaid === 0 && due.collectedTotal === 0;

// // // //   const getStatusColor = (status) => {
// // // //     switch (status) {
// // // //       case "paid":
// // // //         return { bg: "#D1FAE5", color: "#065F46" };
// // // //       case "unpaid":
// // // //         return { bg: "#FEF3C7", color: "#92400E" };
// // // //       case "overdue":
// // // //         return { bg: "#FEE2E2", color: "#991B1B" };
// // // //       case "waived":
// // // //         return { bg: "#E0E7FF", color: "#3730A3" };
// // // //       default:
// // // //         return { bg: "#F3F4F6", color: "#6B7280" };
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div
// // // //         style={{
// // // //           display: "flex",
// // // //           alignItems: "center",
// // // //           justifyContent: "center",
// // // //           minHeight: "60vh",
// // // //         }}
// // // //       >
// // // //         <p style={{ fontSize: "14px", color: "#6B7280" }}>Loading...</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error || !due) {
// // // //     return (
// // // //       <div
// // // //         style={{
// // // //           display: "flex",
// // // //           flexDirection: "column",
// // // //           alignItems: "center",
// // // //           justifyContent: "center",
// // // //           minHeight: "60vh",
// // // //         }}
// // // //       >
// // // //         <div
// // // //           style={{
// // // //             width: "80px",
// // // //             height: "80px",
// // // //             borderRadius: "40px",
// // // //             background: "#FEE2E2",
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "center",
// // // //             marginBottom: "16px",
// // // //           }}
// // // //         >
// // // //           <AlertCircle size={32} color="#DC2626" />
// // // //         </div>
// // // //         <p
// // // //           style={{
// // // //             fontSize: "16px",
// // // //             fontWeight: 600,
// // // //             color: "#111827",
// // // //             marginBottom: "8px",
// // // //           }}
// // // //         >
// // // //           Error loading due
// // // //         </p>
// // // //         <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "24px" }}>
// // // //           {error?.message || "Due not found"}
// // // //         </p>
// // // //         <button
// // // //           onClick={() => navigate(-1)}
// // // //           style={{
// // // //             padding: "12px 24px",
// // // //             background: "#10B981",
// // // //             color: "white",
// // // //             fontSize: "14px",
// // // //             fontWeight: 600,
// // // //             borderRadius: "8px",
// // // //             border: "none",
// // // //             cursor: "pointer",
// // // //             boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
// // // //           }}
// // // //         >
// // // //           Go Back
// // // //         </button>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const isOverdue = new Date(due.dueDate) < new Date();
// // // //   const completionRate =
// // // //     due.expectedTotal > 0
// // // //       ? ((due.collectedTotal / due.expectedTotal) * 100).toFixed(1)
// // // //       : 0;

// // // //   return (
// // // //     <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
// // // //       <div style={{ marginBottom: "32px" }}>
// // // //         <button
// // // //           onClick={() => navigate(-1)}
// // // //           style={{
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             gap: "8px",
// // // //             padding: "8px 16px",
// // // //             background: "white",
// // // //             border: "1px solid #E5E7EB",
// // // //             borderRadius: "8px",
// // // //             fontSize: "14px",
// // // //             fontWeight: 500,
// // // //             color: "#374151",
// // // //             cursor: "pointer",
// // // //             marginBottom: "24px",
// // // //           }}
// // // //         >
// // // //           <ArrowLeft size={16} />
// // // //           Back to Dues
// // // //         </button>

// // // //         <div
// // // //           style={{
// // // //             display: "flex",
// // // //             justifyContent: "space-between",
// // // //             alignItems: "flex-start",
// // // //           }}
// // // //         >
// // // //           <div>
// // // //             <div
// // // //               style={{
// // // //                 display: "flex",
// // // //                 alignItems: "center",
// // // //                 gap: "12px",
// // // //                 marginBottom: "8px",
// // // //               }}
// // // //             >
// // // //               <h1
// // // //                 style={{
// // // //                   fontSize: "28px",
// // // //                   fontWeight: 700,
// // // //                   color: "#111827",
// // // //                 }}
// // // //               >
// // // //                 {due.title}
// // // //               </h1>
// // // //               <span
// // // //                 style={{
// // // //                   padding: "6px 12px",
// // // //                   borderRadius: "6px",
// // // //                   fontSize: "12px",
// // // //                   fontWeight: 600,
// // // //                   background: due.isActive ? "#D1FAE5" : "#F3F4F6",
// // // //                   color: due.isActive ? "#065F46" : "#6B7280",
// // // //                 }}
// // // //               >
// // // //                 {due.isActive ? "Active" : "Inactive"}
// // // //               </span>
// // // //             </div>
// // // //             <p style={{ fontSize: "14px", color: "#6B7280" }}>
// // // //               {due.description}
// // // //             </p>
// // // //           </div>

// // // //           <div style={{ display: "flex", gap: "12px" }}>
// // // //             {canDelete && (
// // // //               <button
// // // //                 onClick={() => setShowDeleteConfirm(true)}
// // // //                 style={{
// // // //                   padding: "12px 24px",
// // // //                   background: "white",
// // // //                   color: "#DC2626",
// // // //                   fontSize: "14px",
// // // //                   fontWeight: 600,
// // // //                   borderRadius: "8px",
// // // //                   border: "2px solid #DC2626",
// // // //                   cursor: "pointer",
// // // //                   display: "flex",
// // // //                   alignItems: "center",
// // // //                   gap: "8px",
// // // //                   transition: "all 0.2s ease",
// // // //                 }}
// // // //                 onMouseEnter={(e) => {
// // // //                   e.currentTarget.style.background = "#DC2626";
// // // //                   e.currentTarget.style.color = "white";
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   e.currentTarget.style.background = "white";
// // // //                   e.currentTarget.style.color = "#DC2626";
// // // //                 }}
// // // //               >
// // // //                 <Trash2 size={16} />
// // // //                 Delete
// // // //               </button>
// // // //             )}
// // // //             <button
// // // //               onClick={handleOpenAssign}
// // // //               style={{
// // // //                 padding: "12px 24px",
// // // //                 background: "white",
// // // //                 color: "#10B981",
// // // //                 fontSize: "14px",
// // // //                 fontWeight: 600,
// // // //                 borderRadius: "8px",
// // // //                 border: "2px solid #10B981",
// // // //                 cursor: "pointer",
// // // //                 display: "flex",
// // // //                 alignItems: "center",
// // // //                 gap: "8px",
// // // //               }}
// // // //             >
// // // //               <Plus size={16} />
// // // //               Assign Households
// // // //             </button>
// // // //             <button
// // // //               onClick={handleOpenEdit}
// // // //               style={{
// // // //                 padding: "12px 24px",
// // // //                 background: "#10B981",
// // // //                 color: "white",
// // // //                 fontSize: "14px",
// // // //                 fontWeight: 600,
// // // //                 borderRadius: "8px",
// // // //                 border: "none",
// // // //                 cursor: "pointer",
// // // //                 boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
// // // //                 display: "flex",
// // // //                 alignItems: "center",
// // // //                 gap: "8px",
// // // //               }}
// // // //             >
// // // //               <Edit size={16} />
// // // //               Edit Due
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div
// // // //         style={{
// // // //           display: "grid",
// // // //           gridTemplateColumns: "repeat(4, 1fr)",
// // // //           gap: "24px",
// // // //           marginBottom: "32px",
// // // //         }}
// // // //       >
// // // //         <StatsCard
// // // //           title="Default Amount"
// // // //           value={`₦${due.defaultAmount.toLocaleString()}`}
// // // //           icon={<DollarSign size={24} />}
// // // //           iconBg="#FEF3C7"
// // // //           iconColor="#F59E0B"
// // // //         />
// // // //         <StatsCard
// // // //           title="Expected Total"
// // // //           value={`₦${due.expectedTotal.toLocaleString()}`}
// // // //           icon={<DollarSign size={24} />}
// // // //           iconBg="#DBEAFE"
// // // //           iconColor="#3B82F6"
// // // //         />
// // // //         <StatsCard
// // // //           title="Collected"
// // // //           value={`₦${due.collectedTotal.toLocaleString()}`}
// // // //           icon={<CheckCircle size={24} />}
// // // //           iconBg="#D1FAE5"
// // // //           iconColor="#10B981"
// // // //         />
// // // //         <StatsCard
// // // //           title="Outstanding"
// // // //           value={`₦${due.outstandingTotal.toLocaleString()}`}
// // // //           icon={<AlertCircle size={24} />}
// // // //           iconBg="#FEE2E2"
// // // //           iconColor="#DC2626"
// // // //         />
// // // //       </div>

// // // //       <div
// // // //         style={{
// // // //           display: "grid",
// // // //           gridTemplateColumns: "2fr 1fr",
// // // //           gap: "24px",
// // // //         }}
// // // //       >
// // // //         <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
// // // //           <div
// // // //             style={{
// // // //               background: "white",
// // // //               borderRadius: "12px",
// // // //               padding: "24px",
// // // //               boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// // // //             }}
// // // //           >
// // // //             <h3
// // // //               style={{
// // // //                 fontSize: "18px",
// // // //                 fontWeight: 700,
// // // //                 color: "#111827",
// // // //                 marginBottom: "20px",
// // // //               }}
// // // //             >
// // // //               Payment Progress
// // // //             </h3>

// // // //             <div
// // // //               style={{
// // // //                 display: "grid",
// // // //                 gridTemplateColumns: "repeat(2, 1fr)",
// // // //                 gap: "24px",
// // // //                 marginBottom: "24px",
// // // //               }}
// // // //             >
// // // //               <div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "12px",
// // // //                     color: "#9CA3AF",
// // // //                     marginBottom: "8px",
// // // //                   }}
// // // //                 >
// // // //                   Total Assigned
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "24px",
// // // //                     fontWeight: 700,
// // // //                     color: "#111827",
// // // //                   }}
// // // //                 >
// // // //                   {due.totalAssigned}
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "13px",
// // // //                     color: "#6B7280",
// // // //                     marginTop: "4px",
// // // //                   }}
// // // //                 >
// // // //                   households
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "12px",
// // // //                     color: "#9CA3AF",
// // // //                     marginBottom: "8px",
// // // //                   }}
// // // //                 >
// // // //                   Must Pay
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "24px",
// // // //                     fontWeight: 700,
// // // //                     color: "#111827",
// // // //                   }}
// // // //                 >
// // // //                   {due.totalMustPay}
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "13px",
// // // //                     color: "#6B7280",
// // // //                     marginTop: "4px",
// // // //                   }}
// // // //                 >
// // // //                   households
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "12px",
// // // //                     color: "#9CA3AF",
// // // //                     marginBottom: "8px",
// // // //                   }}
// // // //                 >
// // // //                   Paid
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "24px",
// // // //                     fontWeight: 700,
// // // //                     color: "#10B981",
// // // //                   }}
// // // //                 >
// // // //                   {due.totalPaid}
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "13px",
// // // //                     color: "#6B7280",
// // // //                     marginTop: "4px",
// // // //                   }}
// // // //                 >
// // // //                   households
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "12px",
// // // //                     color: "#9CA3AF",
// // // //                     marginBottom: "8px",
// // // //                   }}
// // // //                 >
// // // //                   Exempted
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "24px",
// // // //                     fontWeight: 700,
// // // //                     color: "#6B7280",
// // // //                   }}
// // // //                 >
// // // //                   {due.totalExempted}
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "13px",
// // // //                     color: "#6B7280",
// // // //                     marginTop: "4px",
// // // //                   }}
// // // //                 >
// // // //                   households
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             <div>
// // // //               <div
// // // //                 style={{
// // // //                   display: "flex",
// // // //                   justifyContent: "space-between",
// // // //                   alignItems: "center",
// // // //                   marginBottom: "8px",
// // // //                 }}
// // // //               >
// // // //                 <span
// // // //                   style={{
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 600,
// // // //                     color: "#111827",
// // // //                   }}
// // // //                 >
// // // //                   Completion Rate
// // // //                 </span>
// // // //                 <span
// // // //                   style={{
// // // //                     fontSize: "18px",
// // // //                     fontWeight: 700,
// // // //                     color: "#10B981",
// // // //                   }}
// // // //                 >
// // // //                   {completionRate}%
// // // //                 </span>
// // // //               </div>
// // // //               <div
// // // //                 style={{
// // // //                   width: "100%",
// // // //                   height: "12px",
// // // //                   background: "#F3F4F6",
// // // //                   borderRadius: "6px",
// // // //                   overflow: "hidden",
// // // //                 }}
// // // //               >
// // // //                 <div
// // // //                   style={{
// // // //                     width: `${completionRate}%`,
// // // //                     height: "100%",
// // // //                     background: "#10B981",
// // // //                     transition: "width 0.3s ease",
// // // //                   }}
// // // //                 />
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div
// // // //             style={{
// // // //               background: "white",
// // // //               borderRadius: "12px",
// // // //               padding: "24px",
// // // //               boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// // // //             }}
// // // //           >
// // // //             <h3
// // // //               style={{
// // // //                 fontSize: "18px",
// // // //                 fontWeight: 700,
// // // //                 color: "#111827",
// // // //                 marginBottom: "16px",
// // // //               }}
// // // //             >
// // // //               Assigned Households ({due.households?.length || 0})
// // // //             </h3>
// // // //             {due.households && due.households.length > 0 ? (
// // // //               <div
// // // //                 style={{
// // // //                   display: "flex",
// // // //                   flexDirection: "column",
// // // //                   gap: "12px",
// // // //                 }}
// // // //               >
// // // //                 {due.households.map((item) => {
// // // //                   const statusStyle = getStatusColor(item.status);
// // // //                   const canWaive =
// // // //                     item.status !== "paid" && item.status !== "waived";

// // // //                   return (
// // // //                     <div
// // // //                       key={item._id}
// // // //                       style={{
// // // //                         padding: "16px",
// // // //                         background: "#F9FAFB",
// // // //                         borderRadius: "10px",
// // // //                       }}
// // // //                     >
// // // //                       <div
// // // //                         style={{
// // // //                           display: "flex",
// // // //                           justifyContent: "space-between",
// // // //                           alignItems: "flex-start",
// // // //                         }}
// // // //                       >
// // // //                         <div style={{ flex: 1 }}>
// // // //                           <div
// // // //                             style={{
// // // //                               display: "flex",
// // // //                               alignItems: "center",
// // // //                               gap: "12px",
// // // //                               marginBottom: "8px",
// // // //                             }}
// // // //                           >
// // // //                             <div
// // // //                               style={{
// // // //                                 width: "40px",
// // // //                                 height: "40px",
// // // //                                 borderRadius: "8px",
// // // //                                 background: "#E0E7FF",
// // // //                                 display: "flex",
// // // //                                 alignItems: "center",
// // // //                                 justifyContent: "center",
// // // //                                 color: "#6366F1",
// // // //                               }}
// // // //                             >
// // // //                               <Home size={20} />
// // // //                             </div>
// // // //                             <div>
// // // //                               <div
// // // //                                 style={{
// // // //                                   fontSize: "16px",
// // // //                                   fontWeight: 600,
// // // //                                   color: "#111827",
// // // //                                 }}
// // // //                               >
// // // //                                 {item.household.name}
// // // //                               </div>
// // // //                               <div
// // // //                                 style={{ fontSize: "13px", color: "#6B7280" }}
// // // //                               >
// // // //                                 {item.household.type} • {item.household.address}
// // // //                               </div>
// // // //                             </div>
// // // //                           </div>
// // // //                           <div
// // // //                             style={{
// // // //                               display: "flex",
// // // //                               gap: "16px",
// // // //                               marginTop: "8px",
// // // //                               fontSize: "13px",
// // // //                             }}
// // // //                           >
// // // //                             <div>
// // // //                               <span style={{ color: "#9CA3AF" }}>
// // // //                                 Amount Due:{" "}
// // // //                               </span>
// // // //                               <span
// // // //                                 style={{
// // // //                                   fontWeight: 600,
// // // //                                   color: "#111827",
// // // //                                   fontFamily: "monospace",
// // // //                                 }}
// // // //                               >
// // // //                                 ₦{item.amountDue.toLocaleString()}
// // // //                               </span>
// // // //                             </div>
// // // //                             <div>
// // // //                               <span style={{ color: "#9CA3AF" }}>
// // // //                                 Amount Paid:{" "}
// // // //                               </span>
// // // //                               <span
// // // //                                 style={{
// // // //                                   fontWeight: 600,
// // // //                                   color: "#10B981",
// // // //                                   fontFamily: "monospace",
// // // //                                 }}
// // // //                               >
// // // //                                 ₦{item.amountPaid.toLocaleString()}
// // // //                               </span>
// // // //                             </div>
// // // //                           </div>
// // // //                         </div>

// // // //                         <div
// // // //                           style={{
// // // //                             display: "flex",
// // // //                             alignItems: "center",
// // // //                             gap: "8px",
// // // //                             marginLeft: "16px",
// // // //                           }}
// // // //                         >
// // // //                           <span
// // // //                             style={{
// // // //                               padding: "6px 12px",
// // // //                               borderRadius: "6px",
// // // //                               fontSize: "12px",
// // // //                               fontWeight: 600,
// // // //                               background: statusStyle.bg,
// // // //                               color: statusStyle.color,
// // // //                               textTransform: "capitalize",
// // // //                             }}
// // // //                           >
// // // //                             {item.status}
// // // //                           </span>

// // // //                           {canWaive && (
// // // //                             <button
// // // //                               onClick={() =>
// // // //                                 setShowWaiveConfirm({
// // // //                                   householdId: item.household._id,
// // // //                                   householdName: item.household.name,
// // // //                                 })
// // // //                               }
// // // //                               style={{
// // // //                                 padding: "6px 12px",
// // // //                                 background: "white",
// // // //                                 color: "#6366F1",
// // // //                                 fontSize: "12px",
// // // //                                 fontWeight: 600,
// // // //                                 borderRadius: "6px",
// // // //                                 border: "2px solid #6366F1",
// // // //                                 cursor: "pointer",
// // // //                                 display: "flex",
// // // //                                 alignItems: "center",
// // // //                                 gap: "6px",
// // // //                                 transition: "all 0.2s ease",
// // // //                               }}
// // // //                               onMouseEnter={(e) => {
// // // //                                 e.currentTarget.style.background = "#6366F1";
// // // //                                 e.currentTarget.style.color = "white";
// // // //                               }}
// // // //                               onMouseLeave={(e) => {
// // // //                                 e.currentTarget.style.background = "white";
// // // //                                 e.currentTarget.style.color = "#6366F1";
// // // //                               }}
// // // //                             >
// // // //                               <XCircle size={14} />
// // // //                               Waive
// // // //                             </button>
// // // //                           )}
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   );
// // // //                 })}
// // // //               </div>
// // // //             ) : (
// // // //               <div
// // // //                 style={{
// // // //                   padding: "32px",
// // // //                   textAlign: "center",
// // // //                   background: "#F9FAFB",
// // // //                   borderRadius: "8px",
// // // //                 }}
// // // //               >
// // // //                 <Users
// // // //                   size={32}
// // // //                   color="#D1D5DB"
// // // //                   style={{ margin: "0 auto 12px" }}
// // // //                 />
// // // //                 <p
// // // //                   style={{
// // // //                     fontSize: "14px",
// // // //                     color: "#6B7280",
// // // //                   }}
// // // //                 >
// // // //                   No households assigned yet
// // // //                 </p>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
// // // //           <div
// // // //             style={{
// // // //               background: "white",
// // // //               borderRadius: "12px",
// // // //               padding: "24px",
// // // //               boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// // // //             }}
// // // //           >
// // // //             <h3
// // // //               style={{
// // // //                 fontSize: "18px",
// // // //                 fontWeight: 700,
// // // //                 color: "#111827",
// // // //                 marginBottom: "20px",
// // // //               }}
// // // //             >
// // // //               Due Information
// // // //             </h3>

// // // //             <div
// // // //               style={{ display: "flex", flexDirection: "column", gap: "16px" }}
// // // //             >
// // // //               <div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "12px",
// // // //                     color: "#9CA3AF",
// // // //                     marginBottom: "4px",
// // // //                   }}
// // // //                 >
// // // //                   Due Date
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     display: "inline-flex",
// // // //                     alignItems: "center",
// // // //                     gap: "8px",
// // // //                     padding: "8px 12px",
// // // //                     borderRadius: "8px",
// // // //                     background: isOverdue ? "#FEE2E2" : "#DBEAFE",
// // // //                   }}
// // // //                 >
// // // //                   <Calendar
// // // //                     size={16}
// // // //                     color={isOverdue ? "#DC2626" : "#3B82F6"}
// // // //                   />
// // // //                   <span
// // // //                     style={{
// // // //                       fontSize: "14px",
// // // //                       fontWeight: 600,
// // // //                       color: isOverdue ? "#DC2626" : "#3B82F6",
// // // //                     }}
// // // //                   >
// // // //                     {new Date(due.dueDate).toLocaleDateString("en-US", {
// // // //                       month: "long",
// // // //                       day: "numeric",
// // // //                       year: "numeric",
// // // //                     })}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "12px",
// // // //                     color: "#9CA3AF",
// // // //                     marginBottom: "4px",
// // // //                   }}
// // // //                 >
// // // //                   Category
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 500,
// // // //                     color: "#111827",
// // // //                     textTransform: "capitalize",
// // // //                   }}
// // // //                 >
// // // //                   {due.category.replace(/_/g, " ")}
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "12px",
// // // //                     color: "#9CA3AF",
// // // //                     marginBottom: "4px",
// // // //                   }}
// // // //                 >
// // // //                   Created By
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 500,
// // // //                     color: "#111827",
// // // //                   }}
// // // //                 >
// // // //                   {due.createdBy?.name || due.createdBy?.email || "N/A"}
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "12px",
// // // //                     color: "#9CA3AF",
// // // //                     marginBottom: "4px",
// // // //                   }}
// // // //                 >
// // // //                   Created At
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 500,
// // // //                     color: "#111827",
// // // //                   }}
// // // //                 >
// // // //                   {new Date(due.createdAt).toLocaleDateString("en-US", {
// // // //                     month: "short",
// // // //                     day: "numeric",
// // // //                     year: "numeric",
// // // //                   })}
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "12px",
// // // //                     color: "#9CA3AF",
// // // //                     marginBottom: "4px",
// // // //                   }}
// // // //                 >
// // // //                   Last Updated
// // // //                 </div>
// // // //                 <div
// // // //                   style={{
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 500,
// // // //                     color: "#111827",
// // // //                   }}
// // // //                 >
// // // //                   {new Date(due.updatedAt).toLocaleDateString("en-US", {
// // // //                     month: "short",
// // // //                     day: "numeric",
// // // //                     year: "numeric",
// // // //                   })}
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Edit Modal */}
// // // //       {showEditModal && (
// // // //         <div
// // // //           style={{
// // // //             position: "fixed",
// // // //             top: 0,
// // // //             left: 0,
// // // //             right: 0,
// // // //             bottom: 0,
// // // //             background: "rgba(0, 0, 0, 0.5)",
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "center",
// // // //             zIndex: 1000,
// // // //             padding: "24px",
// // // //           }}
// // // //           onClick={() => setShowEditModal(false)}
// // // //         >
// // // //           <div
// // // //             style={{
// // // //               background: "white",
// // // //               borderRadius: "16px",
// // // //               maxWidth: "600px",
// // // //               width: "100%",
// // // //               maxHeight: "90vh",
// // // //               overflow: "hidden",
// // // //               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
// // // //             }}
// // // //             onClick={(e) => e.stopPropagation()}
// // // //           >
// // // //             <div
// // // //               style={{
// // // //                 display: "flex",
// // // //                 justifyContent: "space-between",
// // // //                 alignItems: "center",
// // // //                 padding: "24px 32px",
// // // //                 borderBottom: "1px solid #E5E7EB",
// // // //               }}
// // // //             >
// // // //               <h3
// // // //                 style={{
// // // //                   fontSize: "20px",
// // // //                   fontWeight: 700,
// // // //                   color: "#111827",
// // // //                 }}
// // // //               >
// // // //                 Edit Due
// // // //               </h3>
// // // //               <button
// // // //                 onClick={() => setShowEditModal(false)}
// // // //                 style={{
// // // //                   width: "36px",
// // // //                   height: "36px",
// // // //                   borderRadius: "8px",
// // // //                   background: "#F3F4F6",
// // // //                   border: "none",
// // // //                   display: "flex",
// // // //                   alignItems: "center",
// // // //                   justifyContent: "center",
// // // //                   cursor: "pointer",
// // // //                   color: "#6B7280",
// // // //                 }}
// // // //               >
// // // //                 <X size={20} />
// // // //               </button>
// // // //             </div>

// // // //             <form onSubmit={handleUpdate} style={{ padding: "32px" }}>
// // // //               <div style={{ marginBottom: "20px" }}>
// // // //                 <label
// // // //                   style={{
// // // //                     display: "block",
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 600,
// // // //                     color: "#374151",
// // // //                     marginBottom: "8px",
// // // //                   }}
// // // //                 >
// // // //                   Title
// // // //                 </label>
// // // //                 <input
// // // //                   type="text"
// // // //                   value={formData.title}
// // // //                   onChange={(e) =>
// // // //                     setFormData({ ...formData, title: e.target.value })
// // // //                   }
// // // //                   placeholder="e.g., Annual Levy 2025"
// // // //                   style={{
// // // //                     width: "100%",
// // // //                     padding: "12px 16px",
// // // //                     border: "1px solid #E5E7EB",
// // // //                     borderRadius: "8px",
// // // //                     fontSize: "14px",
// // // //                     color: "#111827",
// // // //                     background: "white",
// // // //                   }}
// // // //                 />
// // // //               </div>

// // // //               <div style={{ marginBottom: "20px" }}>
// // // //                 <label
// // // //                   style={{
// // // //                     display: "block",
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 600,
// // // //                     color: "#374151",
// // // //                     marginBottom: "8px",
// // // //                   }}
// // // //                 >
// // // //                   Description
// // // //                 </label>
// // // //                 <textarea
// // // //                   value={formData.description}
// // // //                   onChange={(e) =>
// // // //                     setFormData({ ...formData, description: e.target.value })
// // // //                   }
// // // //                   placeholder="Describe the purpose of this due"
// // // //                   rows={3}
// // // //                   style={{
// // // //                     width: "100%",
// // // //                     padding: "12px 16px",
// // // //                     border: "1px solid #E5E7EB",
// // // //                     borderRadius: "8px",
// // // //                     fontSize: "14px",
// // // //                     color: "#111827",
// // // //                     background: "white",
// // // //                     resize: "vertical",
// // // //                   }}
// // // //                 />
// // // //               </div>

// // // //               <div style={{ marginBottom: "20px" }}>
// // // //                 <label
// // // //                   style={{
// // // //                     display: "block",
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 600,
// // // //                     color: "#374151",
// // // //                     marginBottom: "8px",
// // // //                   }}
// // // //                 >
// // // //                   Due Date
// // // //                 </label>
// // // //                 <input
// // // //                   type="date"
// // // //                   value={formData.dueDate}
// // // //                   onChange={(e) =>
// // // //                     setFormData({ ...formData, dueDate: e.target.value })
// // // //                   }
// // // //                   style={{
// // // //                     width: "100%",
// // // //                     padding: "12px 16px",
// // // //                     border: "1px solid #E5E7EB",
// // // //                     borderRadius: "8px",
// // // //                     fontSize: "14px",
// // // //                     color: "#111827",
// // // //                     background: "white",
// // // //                   }}
// // // //                 />
// // // //               </div>

// // // //               <div style={{ marginBottom: "32px" }}>
// // // //                 <label
// // // //                   style={{
// // // //                     display: "flex",
// // // //                     alignItems: "center",
// // // //                     gap: "12px",
// // // //                     cursor: "pointer",
// // // //                   }}
// // // //                 >
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={formData.isActive}
// // // //                     onChange={(e) =>
// // // //                       setFormData({ ...formData, isActive: e.target.checked })
// // // //                     }
// // // //                     style={{
// // // //                       width: "20px",
// // // //                       height: "20px",
// // // //                       cursor: "pointer",
// // // //                     }}
// // // //                   />
// // // //                   <span
// // // //                     style={{
// // // //                       fontSize: "14px",
// // // //                       fontWeight: 600,
// // // //                       color: "#374151",
// // // //                     }}
// // // //                   >
// // // //                     Active
// // // //                   </span>
// // // //                 </label>
// // // //                 <p
// // // //                   style={{
// // // //                     fontSize: "13px",
// // // //                     color: "#6B7280",
// // // //                     marginTop: "8px",
// // // //                     marginLeft: "32px",
// // // //                   }}
// // // //                 >
// // // //                   Inactive dues won't be visible to households
// // // //                 </p>
// // // //               </div>

// // // //               {updateDueMutation.isError && (
// // // //                 <div
// // // //                   style={{
// // // //                     padding: "12px 16px",
// // // //                     background: "#FEE2E2",
// // // //                     borderRadius: "8px",
// // // //                     marginBottom: "20px",
// // // //                     display: "flex",
// // // //                     alignItems: "center",
// // // //                     gap: "8px",
// // // //                   }}
// // // //                 >
// // // //                   <AlertCircle size={16} color="#DC2626" />
// // // //                   <span style={{ fontSize: "14px", color: "#DC2626" }}>
// // // //                     {updateDueMutation.error?.message ||
// // // //                       "Failed to update due. Please try again."}
// // // //                   </span>
// // // //                 </div>
// // // //               )}

// // // //               <div
// // // //                 style={{
// // // //                   display: "flex",
// // // //                   justifyContent: "flex-end",
// // // //                   gap: "12px",
// // // //                 }}
// // // //               >
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={() => setShowEditModal(false)}
// // // //                   disabled={updateDueMutation.isLoading}
// // // //                   style={{
// // // //                     padding: "12px 24px",
// // // //                     background: "white",
// // // //                     color: "#374151",
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 600,
// // // //                     borderRadius: "8px",
// // // //                     border: "1px solid #E5E7EB",
// // // //                     cursor: updateDueMutation.isLoading
// // // //                       ? "not-allowed"
// // // //                       : "pointer",
// // // //                     opacity: updateDueMutation.isLoading ? 0.6 : 1,
// // // //                   }}
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //                 <button
// // // //                   type="submit"
// // // //                   disabled={updateDueMutation.isLoading}
// // // //                   style={{
// // // //                     padding: "12px 24px",
// // // //                     background: updateDueMutation.isLoading
// // // //                       ? "#9CA3AF"
// // // //                       : "#10B981",
// // // //                     color: "white",
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 600,
// // // //                     borderRadius: "8px",
// // // //                     border: "none",
// // // //                     cursor: updateDueMutation.isLoading
// // // //                       ? "not-allowed"
// // // //                       : "pointer",
// // // //                     boxShadow: updateDueMutation.isLoading
// // // //                       ? "none"
// // // //                       : "0 4px 12px rgba(16, 185, 129, 0.3)",
// // // //                     display: "flex",
// // // //                     alignItems: "center",
// // // //                     gap: "8px",
// // // //                   }}
// // // //                 >
// // // //                   {updateDueMutation.isLoading ? (
// // // //                     "Saving..."
// // // //                   ) : (
// // // //                     <>
// // // //                       <Save size={16} />
// // // //                       Save Changes
// // // //                     </>
// // // //                   )}
// // // //                 </button>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Assign Households Modal */}
// // // //       {showAssignModal && (
// // // //         <div
// // // //           style={{
// // // //             position: "fixed",
// // // //             top: 0,
// // // //             left: 0,
// // // //             right: 0,
// // // //             bottom: 0,
// // // //             background: "rgba(0, 0, 0, 0.5)",
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "center",
// // // //             zIndex: 1000,
// // // //             padding: "24px",
// // // //           }}
// // // //           onClick={() => setShowAssignModal(false)}
// // // //         >
// // // //           <div
// // // //             style={{
// // // //               background: "white",
// // // //               borderRadius: "16px",
// // // //               maxWidth: "700px",
// // // //               width: "100%",
// // // //               maxHeight: "90vh",
// // // //               overflow: "hidden",
// // // //               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
// // // //             }}
// // // //             onClick={(e) => e.stopPropagation()}
// // // //           >
// // // //             <div
// // // //               style={{
// // // //                 padding: "24px 32px",
// // // //                 borderBottom: "1px solid #E5E7EB",
// // // //               }}
// // // //             >
// // // //               <div
// // // //                 style={{
// // // //                   display: "flex",
// // // //                   justifyContent: "space-between",
// // // //                   alignItems: "center",
// // // //                 }}
// // // //               >
// // // //                 <h3
// // // //                   style={{
// // // //                     fontSize: "20px",
// // // //                     fontWeight: 700,
// // // //                     color: "#111827",
// // // //                   }}
// // // //                 >
// // // //                   Assign Households
// // // //                 </h3>
// // // //                 <button
// // // //                   onClick={() => setShowAssignModal(false)}
// // // //                   style={{
// // // //                     width: "36px",
// // // //                     height: "36px",
// // // //                     borderRadius: "8px",
// // // //                     background: "#F3F4F6",
// // // //                     border: "none",
// // // //                     display: "flex",
// // // //                     alignItems: "center",
// // // //                     justifyContent: "center",
// // // //                     cursor: "pointer",
// // // //                     color: "#6B7280",
// // // //                   }}
// // // //                 >
// // // //                   <X size={20} />
// // // //                 </button>
// // // //               </div>

// // // //               {availableHouseholds.length > 0 && (
// // // //                 <div
// // // //                   style={{
// // // //                     marginTop: "16px",
// // // //                     display: "flex",
// // // //                     justifyContent: "space-between",
// // // //                     alignItems: "center",
// // // //                     padding: "12px 16px",
// // // //                     background: "#F9FAFB",
// // // //                     borderRadius: "8px",
// // // //                   }}
// // // //                 >
// // // //                   <label
// // // //                     style={{
// // // //                       display: "flex",
// // // //                       alignItems: "center",
// // // //                       gap: "12px",
// // // //                       cursor: "pointer",
// // // //                     }}
// // // //                     onClick={(e) => {
// // // //                       e.preventDefault();
// // // //                       if (allSelected) {
// // // //                         handleDeselectAll();
// // // //                       } else {
// // // //                         handleSelectAll();
// // // //                       }
// // // //                     }}
// // // //                   >
// // // //                     <input
// // // //                       type="checkbox"
// // // //                       checked={allSelected}
// // // //                       ref={(input) => {
// // // //                         if (input) {
// // // //                           input.indeterminate = someSelected;
// // // //                         }
// // // //                       }}
// // // //                       onChange={() => {
// // // //                         if (allSelected) {
// // // //                           handleDeselectAll();
// // // //                         } else {
// // // //                           handleSelectAll();
// // // //                         }
// // // //                       }}
// // // //                       style={{
// // // //                         width: "20px",
// // // //                         height: "20px",
// // // //                         cursor: "pointer",
// // // //                       }}
// // // //                     />
// // // //                     <span
// // // //                       style={{
// // // //                         fontSize: "14px",
// // // //                         fontWeight: 600,
// // // //                         color: "#374151",
// // // //                       }}
// // // //                     >
// // // //                       {allSelected
// // // //                         ? "Deselect All"
// // // //                         : someSelected
// // // //                           ? `Select All (${
// // // //                               Object.keys(selectedHouseholds).length
// // // //                             } selected)`
// // // //                           : "Select All"}
// // // //                     </span>
// // // //                   </label>

// // // //                   <span
// // // //                     style={{
// // // //                       fontSize: "13px",
// // // //                       color: "#6B7280",
// // // //                     }}
// // // //                   >
// // // //                     {availableHouseholds.length} available
// // // //                   </span>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             <div
// // // //               style={{
// // // //                 padding: "24px 32px",
// // // //                 maxHeight: "60vh",
// // // //                 overflowY: "auto",
// // // //               }}
// // // //             >
// // // //               {loadingHouseholds ? (
// // // //                 <div style={{ padding: "32px", textAlign: "center" }}>
// // // //                   <p style={{ fontSize: "14px", color: "#6B7280" }}>
// // // //                     Loading households...
// // // //                   </p>
// // // //                 </div>
// // // //               ) : availableHouseholds.length === 0 ? (
// // // //                 <div style={{ padding: "32px", textAlign: "center" }}>
// // // //                   <Users
// // // //                     size={48}
// // // //                     color="#D1D5DB"
// // // //                     style={{ margin: "0 auto 16px" }}
// // // //                   />
// // // //                   <p
// // // //                     style={{
// // // //                       fontSize: "16px",
// // // //                       fontWeight: 600,
// // // //                       color: "#111827",
// // // //                     }}
// // // //                   >
// // // //                     No households available
// // // //                   </p>
// // // //                   <p
// // // //                     style={{
// // // //                       fontSize: "14px",
// // // //                       color: "#6B7280",
// // // //                       marginTop: "8px",
// // // //                     }}
// // // //                   >
// // // //                     All households have been assigned to this due
// // // //                   </p>
// // // //                 </div>
// // // //               ) : (
// // // //                 <div
// // // //                   style={{
// // // //                     display: "flex",
// // // //                     flexDirection: "column",
// // // //                     gap: "12px",
// // // //                   }}
// // // //                 >
// // // //                   {availableHouseholds.map((household) => {
// // // //                     const isSelected = selectedHouseholds[household._id];
// // // //                     return (
// // // //                       <div
// // // //                         key={household._id}
// // // //                         style={{
// // // //                           padding: "16px",
// // // //                           background: isSelected ? "#F0FDF4" : "#F9FAFB",
// // // //                           border: isSelected
// // // //                             ? "2px solid #10B981"
// // // //                             : "2px solid transparent",
// // // //                           borderRadius: "10px",
// // // //                           cursor: "pointer",
// // // //                           transition: "all 0.2s ease",
// // // //                         }}
// // // //                         onClick={() => handleToggleHousehold(household._id)}
// // // //                       >
// // // //                         <div
// // // //                           style={{
// // // //                             display: "flex",
// // // //                             alignItems: "center",
// // // //                             gap: "12px",
// // // //                           }}
// // // //                         >
// // // //                           <input
// // // //                             type="checkbox"
// // // //                             checked={!!isSelected}
// // // //                             onChange={() =>
// // // //                               handleToggleHousehold(household._id)
// // // //                             }
// // // //                             onClick={(e) => e.stopPropagation()}
// // // //                             style={{
// // // //                               width: "20px",
// // // //                               height: "20px",
// // // //                               cursor: "pointer",
// // // //                             }}
// // // //                           />
// // // //                           <div
// // // //                             style={{
// // // //                               width: "40px",
// // // //                               height: "40px",
// // // //                               borderRadius: "8px",
// // // //                               background: "#E0E7FF",
// // // //                               display: "flex",
// // // //                               alignItems: "center",
// // // //                               justifyContent: "center",
// // // //                               color: "#6366F1",
// // // //                             }}
// // // //                           >
// // // //                             <Home size={20} />
// // // //                           </div>
// // // //                           <div style={{ flex: 1 }}>
// // // //                             <div
// // // //                               style={{
// // // //                                 fontSize: "16px",
// // // //                                 fontWeight: 600,
// // // //                                 color: "#111827",
// // // //                               }}
// // // //                             >
// // // //                               {household.name}
// // // //                             </div>
// // // //                             <div style={{ fontSize: "13px", color: "#6B7280" }}>
// // // //                               {household.type} • {household.address}
// // // //                             </div>
// // // //                           </div>
// // // //                         </div>

// // // //                         {isSelected && (
// // // //                           <div
// // // //                             style={{
// // // //                               marginTop: "12px",
// // // //                               paddingTop: "12px",
// // // //                               borderTop: "1px solid #E5E7EB",
// // // //                             }}
// // // //                             onClick={(e) => e.stopPropagation()}
// // // //                           >
// // // //                             <label
// // // //                               style={{
// // // //                                 display: "block",
// // // //                                 fontSize: "13px",
// // // //                                 fontWeight: 600,
// // // //                                 color: "#374151",
// // // //                                 marginBottom: "8px",
// // // //                               }}
// // // //                             >
// // // //                               Payment Status
// // // //                             </label>
// // // //                             <select
// // // //                               value={selectedHouseholds[household._id]}
// // // //                               onChange={(e) =>
// // // //                                 handleStatusChange(
// // // //                                   household._id,
// // // //                                   e.target.value,
// // // //                                 )
// // // //                               }
// // // //                               style={{
// // // //                                 width: "100%",
// // // //                                 padding: "8px 12px",
// // // //                                 border: "1px solid #E5E7EB",
// // // //                                 borderRadius: "6px",
// // // //                                 fontSize: "14px",
// // // //                                 color: "#111827",
// // // //                                 background: "white",
// // // //                                 cursor: "pointer",
// // // //                               }}
// // // //                             >
// // // //                               <option value="unpaid">Unpaid</option>
// // // //                               <option value="paid">Paid</option>
// // // //                               <option value="overdue">Overdue</option>
// // // //                               <option value="waived">Waived</option>
// // // //                             </select>
// // // //                           </div>
// // // //                         )}
// // // //                       </div>
// // // //                     );
// // // //                   })}
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             <div
// // // //               style={{
// // // //                 padding: "20px 32px",
// // // //                 borderTop: "1px solid #E5E7EB",
// // // //                 display: "flex",
// // // //                 justifyContent: "space-between",
// // // //                 alignItems: "center",
// // // //               }}
// // // //             >
// // // //               <div style={{ fontSize: "14px", color: "#6B7280" }}>
// // // //                 {Object.keys(selectedHouseholds).length} household(s) selected
// // // //               </div>
// // // //               <div style={{ display: "flex", gap: "12px" }}>
// // // //                 <button
// // // //                   onClick={() => setShowAssignModal(false)}
// // // //                   disabled={assignHouseholdsMutation.isLoading}
// // // //                   style={{
// // // //                     padding: "12px 24px",
// // // //                     background: "white",
// // // //                     color: "#374151",
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 600,
// // // //                     borderRadius: "8px",
// // // //                     border: "1px solid #E5E7EB",
// // // //                     cursor: assignHouseholdsMutation.isLoading
// // // //                       ? "not-allowed"
// // // //                       : "pointer",
// // // //                   }}
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={handleAssignHouseholds}
// // // //                   disabled={
// // // //                     Object.keys(selectedHouseholds).length === 0 ||
// // // //                     assignHouseholdsMutation.isLoading
// // // //                   }
// // // //                   style={{
// // // //                     padding: "12px 24px",
// // // //                     background:
// // // //                       Object.keys(selectedHouseholds).length === 0 ||
// // // //                       assignHouseholdsMutation.isLoading
// // // //                         ? "#9CA3AF"
// // // //                         : "#10B981",
// // // //                     color: "white",
// // // //                     fontSize: "14px",
// // // //                     fontWeight: 600,
// // // //                     borderRadius: "8px",
// // // //                     border: "none",
// // // //                     cursor:
// // // //                       Object.keys(selectedHouseholds).length === 0 ||
// // // //                       assignHouseholdsMutation.isLoading
// // // //                         ? "not-allowed"
// // // //                         : "pointer",
// // // //                     boxShadow:
// // // //                       Object.keys(selectedHouseholds).length === 0 ||
// // // //                       assignHouseholdsMutation.isLoading
// // // //                         ? "none"
// // // //                         : "0 4px 12px rgba(16, 185, 129, 0.3)",
// // // //                   }}
// // // //                 >
// // // //                   {assignHouseholdsMutation.isLoading
// // // //                     ? "Assigning..."
// // // //                     : "Assign Households"}
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Waive Confirmation Modal */}
// // // //       {showWaiveConfirm && (
// // // //         <div
// // // //           style={{
// // // //             position: "fixed",
// // // //             top: 0,
// // // //             left: 0,
// // // //             right: 0,
// // // //             bottom: 0,
// // // //             background: "rgba(0, 0, 0, 0.5)",
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "center",
// // // //             zIndex: 1000,
// // // //             padding: "24px",
// // // //           }}
// // // //           onClick={() => setShowWaiveConfirm(null)}
// // // //         >
// // // //           <div
// // // //             style={{
// // // //               background: "white",
// // // //               borderRadius: "16px",
// // // //               maxWidth: "500px",
// // // //               width: "100%",
// // // //               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
// // // //             }}
// // // //             onClick={(e) => e.stopPropagation()}
// // // //           >
// // // //             <div
// // // //               style={{
// // // //                 padding: "24px 32px",
// // // //                 borderBottom: "1px solid #E5E7EB",
// // // //               }}
// // // //             >
// // // //               <div
// // // //                 style={{
// // // //                   width: "56px",
// // // //                   height: "56px",
// // // //                   borderRadius: "50%",
// // // //                   background: "#E0E7FF",
// // // //                   display: "flex",
// // // //                   alignItems: "center",
// // // //                   justifyContent: "center",
// // // //                   margin: "0 auto 16px",
// // // //                 }}
// // // //               >
// // // //                 <XCircle size={28} color="#6366F1" />
// // // //               </div>
// // // //               <h3
// // // //                 style={{
// // // //                   fontSize: "20px",
// // // //                   fontWeight: 700,
// // // //                   color: "#111827",
// // // //                   textAlign: "center",
// // // //                   marginBottom: "8px",
// // // //                 }}
// // // //               >
// // // //                 Waive Payment
// // // //               </h3>
// // // //               <p
// // // //                 style={{
// // // //                   fontSize: "14px",
// // // //                   color: "#6B7280",
// // // //                   textAlign: "center",
// // // //                 }}
// // // //               >
// // // //                 Are you sure you want to waive the payment for{" "}
// // // //                 <strong style={{ color: "#111827" }}>
// // // //                   {showWaiveConfirm.householdName}
// // // //                 </strong>
// // // //                 ? This action cannot be undone.
// // // //               </p>
// // // //             </div>

// // // //             {waiveMutation.isError && (
// // // //               <div
// // // //                 style={{
// // // //                   padding: "12px 32px",
// // // //                   background: "#FEE2E2",
// // // //                   display: "flex",
// // // //                   alignItems: "center",
// // // //                   gap: "8px",
// // // //                 }}
// // // //               >
// // // //                 <AlertCircle size={16} color="#DC2626" />
// // // //                 <span style={{ fontSize: "14px", color: "#DC2626" }}>
// // // //                   {waiveMutation.error?.message || "Failed to waive payment"}
// // // //                 </span>
// // // //               </div>
// // // //             )}

// // // //             <div
// // // //               style={{
// // // //                 padding: "20px 32px",
// // // //                 display: "flex",
// // // //                 gap: "12px",
// // // //               }}
// // // //             >
// // // //               <button
// // // //                 onClick={() => setShowWaiveConfirm(null)}
// // // //                 disabled={waiveMutation.isLoading}
// // // //                 style={{
// // // //                   flex: 1,
// // // //                   padding: "12px 24px",
// // // //                   background: "white",
// // // //                   color: "#374151",
// // // //                   fontSize: "14px",
// // // //                   fontWeight: 600,
// // // //                   borderRadius: "8px",
// // // //                   border: "1px solid #E5E7EB",
// // // //                   cursor: waiveMutation.isLoading ? "not-allowed" : "pointer",
// // // //                   opacity: waiveMutation.isLoading ? 0.6 : 1,
// // // //                 }}
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //               <button
// // // //                 onClick={() =>
// // // //                   handleWaiveHousehold(showWaiveConfirm.householdId)
// // // //                 }
// // // //                 disabled={waiveMutation.isLoading}
// // // //                 style={{
// // // //                   flex: 1,
// // // //                   padding: "12px 24px",
// // // //                   background: waiveMutation.isLoading ? "#9CA3AF" : "#6366F1",
// // // //                   color: "white",
// // // //                   fontSize: "14px",
// // // //                   fontWeight: 600,
// // // //                   borderRadius: "8px",
// // // //                   border: "none",
// // // //                   cursor: waiveMutation.isLoading ? "not-allowed" : "pointer",
// // // //                   boxShadow: waiveMutation.isLoading
// // // //                     ? "none"
// // // //                     : "0 4px 12px rgba(99, 102, 241, 0.3)",
// // // //                   display: "flex",
// // // //                   alignItems: "center",
// // // //                   justifyContent: "center",
// // // //                   gap: "8px",
// // // //                 }}
// // // //               >
// // // //                 {waiveMutation.isLoading ? (
// // // //                   "Waiving..."
// // // //                 ) : (
// // // //                   <>
// // // //                     <XCircle size={16} />
// // // //                     Waive Payment
// // // //                   </>
// // // //                 )}
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Delete Confirmation Modal */}
// // // //       {showDeleteConfirm && (
// // // //         <div
// // // //           style={{
// // // //             position: "fixed",
// // // //             top: 0,
// // // //             left: 0,
// // // //             right: 0,
// // // //             bottom: 0,
// // // //             background: "rgba(0, 0, 0, 0.5)",
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "center",
// // // //             zIndex: 1000,
// // // //             padding: "24px",
// // // //           }}
// // // //           onClick={() => setShowDeleteConfirm(false)}
// // // //         >
// // // //           <div
// // // //             style={{
// // // //               background: "white",
// // // //               borderRadius: "16px",
// // // //               maxWidth: "500px",
// // // //               width: "100%",
// // // //               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
// // // //             }}
// // // //             onClick={(e) => e.stopPropagation()}
// // // //           >
// // // //             <div
// // // //               style={{
// // // //                 padding: "24px 32px",
// // // //                 borderBottom: "1px solid #E5E7EB",
// // // //               }}
// // // //             >
// // // //               <div
// // // //                 style={{
// // // //                   width: "56px",
// // // //                   height: "56px",
// // // //                   borderRadius: "50%",
// // // //                   background: "#FEE2E2",
// // // //                   display: "flex",
// // // //                   alignItems: "center",
// // // //                   justifyContent: "center",
// // // //                   margin: "0 auto 16px",
// // // //                 }}
// // // //               >
// // // //                 <Trash2 size={28} color="#DC2626" />
// // // //               </div>
// // // //               <h3
// // // //                 style={{
// // // //                   fontSize: "20px",
// // // //                   fontWeight: 700,
// // // //                   color: "#111827",
// // // //                   textAlign: "center",
// // // //                   marginBottom: "8px",
// // // //                 }}
// // // //               >
// // // //                 Delete Household Due
// // // //               </h3>
// // // //               <p
// // // //                 style={{
// // // //                   fontSize: "14px",
// // // //                   color: "#6B7280",
// // // //                   textAlign: "center",
// // // //                 }}
// // // //               >
// // // //                 Are you sure you want to delete{" "}
// // // //                 <strong style={{ color: "#111827" }}>"{due.title}"</strong>?
// // // //                 This action cannot be undone.
// // // //               </p>
// // // //               {due.totalAssigned > 0 && (
// // // //                 <div
// // // //                   style={{
// // // //                     marginTop: "12px",
// // // //                     padding: "12px",
// // // //                     background: "#FEF3C7",
// // // //                     borderRadius: "8px",
// // // //                     fontSize: "13px",
// // // //                     color: "#92400E",
// // // //                   }}
// // // //                 >
// // // //                   <strong>Note:</strong> {due.totalAssigned} household(s) are
// // // //                   currently assigned to this due.
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {deleteMutation.isError && (
// // // //               <div
// // // //                 style={{
// // // //                   padding: "12px 32px",
// // // //                   background: "#FEE2E2",
// // // //                   display: "flex",
// // // //                   alignItems: "center",
// // // //                   gap: "8px",
// // // //                 }}
// // // //               >
// // // //                 <AlertCircle size={16} color="#DC2626" />
// // // //                 <span style={{ fontSize: "14px", color: "#DC2626" }}>
// // // //                   {deleteMutation.error?.message ||
// // // //                     "Failed to delete due. Some households may have already paid."}
// // // //                 </span>
// // // //               </div>
// // // //             )}

// // // //             <div
// // // //               style={{
// // // //                 padding: "20px 32px",
// // // //                 display: "flex",
// // // //                 gap: "12px",
// // // //               }}
// // // //             >
// // // //               <button
// // // //                 onClick={() => setShowDeleteConfirm(false)}
// // // //                 disabled={deleteMutation.isLoading}
// // // //                 style={{
// // // //                   flex: 1,
// // // //                   padding: "12px 24px",
// // // //                   background: "white",
// // // //                   color: "#374151",
// // // //                   fontSize: "14px",
// // // //                   fontWeight: 600,
// // // //                   borderRadius: "8px",
// // // //                   border: "1px solid #E5E7EB",
// // // //                   cursor: deleteMutation.isLoading ? "not-allowed" : "pointer",
// // // //                   opacity: deleteMutation.isLoading ? 0.6 : 1,
// // // //                 }}
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //               <button
// // // //                 onClick={handleDeleteDue}
// // // //                 disabled={deleteMutation.isLoading}
// // // //                 style={{
// // // //                   flex: 1,
// // // //                   padding: "12px 24px",
// // // //                   background: deleteMutation.isLoading ? "#9CA3AF" : "#DC2626",
// // // //                   color: "white",
// // // //                   fontSize: "14px",
// // // //                   fontWeight: 600,
// // // //                   borderRadius: "8px",
// // // //                   border: "none",
// // // //                   cursor: deleteMutation.isLoading ? "not-allowed" : "pointer",
// // // //                   boxShadow: deleteMutation.isLoading
// // // //                     ? "none"
// // // //                     : "0 4px 12px rgba(220, 38, 38, 0.3)",
// // // //                   display: "flex",
// // // //                   alignItems: "center",
// // // //                   justifyContent: "center",
// // // //                   gap: "8px",
// // // //                 }}
// // // //               >
// // // //                 {deleteMutation.isLoading ? (
// // // //                   "Deleting..."
// // // //                 ) : (
// // // //                   <>
// // // //                     <Trash2 size={16} />
// // // //                     Delete Due
// // // //                   </>
// // // //                 )}
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // const StatsCard = ({ title, value, icon, iconBg, iconColor }) => {
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         background: "white",
// // // //         borderRadius: "12px",
// // // //         padding: "24px",
// // // //         boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// // // //       }}
// // // //     >
// // // //       <div
// // // //         style={{
// // // //           display: "flex",
// // // //           justifyContent: "space-between",
// // // //           alignItems: "flex-start",
// // // //         }}
// // // //       >
// // // //         <div
// // // //           style={{
// // // //             width: "48px",
// // // //             height: "48px",
// // // //             borderRadius: "12px",
// // // //             background: iconBg,
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "center",
// // // //             color: iconColor,
// // // //           }}
// // // //         >
// // // //           {icon}
// // // //         </div>
// // // //       </div>
// // // //       <div
// // // //         style={{
// // // //           fontSize: "32px",
// // // //           fontWeight: 700,
// // // //           color: "#111827",
// // // //           marginTop: "16px",
// // // //           marginBottom: "4px",
// // // //           fontFamily: "monospace",
// // // //         }}
// // // //       >
// // // //         {value}
// // // //       </div>
// // // //       <div style={{ fontSize: "14px", color: "#6B7280", fontWeight: 500 }}>
// // // //         {title}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default HouseholdDueDetail;

// // // import { useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import {
// // //   ArrowLeft,
// // //   Edit,
// // //   Calendar,
// // //   DollarSign,
// // //   Users,
// // //   CheckCircle,
// // //   AlertCircle,
// // //   X,
// // //   Save,
// // //   Plus,
// // //   Home,
// // //   Trash2,
// // //   XCircle,
// // //   Banknote,
// // // } from "lucide-react";
// // // import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";
// // // import { useSelector } from "react-redux";

// // // const HouseholdDueDetail = () => {
// // //   const { id: dueId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [showEditModal, setShowEditModal] = useState(false);
// // //   const [showAssignModal, setShowAssignModal] = useState(false);
// // //   const [selectedHouseholds, setSelectedHouseholds] = useState({});
// // //   const [showWaiveConfirm, setShowWaiveConfirm] = useState(null);
// // //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
// // //   const [showManualPaymentConfirm, setShowManualPaymentConfirm] =
// // //     useState(null);

// // //   const { selectedEstate } = useSelector(
// // //     (state) => state?.reducer?.estateSlice,
// // //   );
// // //   const clanId = selectedEstate?._id;

// // //   const {
// // //     data: dueResponse,
// // //     isLoading: loading,
// // //     error,
// // //   } = useFetchDataV2(`/v1/householdDue/due/${dueId}`, `householdDue-${dueId}`);

// // //   const due = dueResponse?.data;

// // //   const { data: householdsResponse, isLoading: loadingHouseholds } =
// // //     useFetchDataV2(`/v1/household/${clanId}`, `households-${clanId}`);

// // //   const allHouseholds = householdsResponse?.data || [];

// // //   const updateDueMutation = useMutateDataV2(`householdDue-${dueId}`, "PATCH");
// // //   const assignHouseholdsMutation = useMutateDataV2(
// // //     `householdDue-${dueId}`,
// // //     "POST",
// // //   );
// // //   const waiveMutation = useMutateDataV2(`householdDue-${dueId}`, "POST");
// // //   const deleteMutation = useMutateDataV2(`householdDue-${dueId}`, "DELETE");
// // //   const manualPaymentMutation = useMutateDataV2(
// // //     `householdDue-${dueId}`,
// // //     "POST",
// // //   );

// // //   const [formData, setFormData] = useState({
// // //     title: "",
// // //     description: "",
// // //     dueDate: "",
// // //     isActive: true,
// // //   });

// // //   const getAlreadyAssignedIds = () => {
// // //     if (!due?.households) return new Set();
// // //     return new Set(due.households.map((h) => h.household._id));
// // //   };

// // //   const alreadyAssignedIds = getAlreadyAssignedIds();
// // //   const availableHouseholds = allHouseholds.filter(
// // //     (h) => !alreadyAssignedIds.has(h._id),
// // //   );

// // //   const handleSelectAll = () => {
// // //     if (availableHouseholds.length === 0) return;

// // //     const allSelected = {};
// // //     availableHouseholds.forEach((household) => {
// // //       allSelected[household._id] = "unpaid";
// // //     });
// // //     setSelectedHouseholds(allSelected);
// // //   };

// // //   const handleDeselectAll = () => {
// // //     setSelectedHouseholds({});
// // //   };

// // //   const allSelected =
// // //     availableHouseholds.length > 0 &&
// // //     Object.keys(selectedHouseholds).length === availableHouseholds.length;

// // //   const someSelected =
// // //     Object.keys(selectedHouseholds).length > 0 && !allSelected;

// // //   const handleOpenEdit = () => {
// // //     setFormData({
// // //       title: due.title,
// // //       description: due.description,
// // //       dueDate: due.dueDate
// // //         ? new Date(due.dueDate).toISOString().split("T")[0]
// // //         : "",
// // //       isActive: due.isActive,
// // //     });
// // //     setShowEditModal(true);
// // //   };

// // //   const handleUpdate = async (e) => {
// // //     e.preventDefault();
// // //     const updates = {};
// // //     if (formData.title !== due.title) updates.title = formData.title;
// // //     if (formData.description !== due.description)
// // //       updates.description = formData.description;
// // //     if (
// // //       formData.dueDate !== new Date(due.dueDate).toISOString().split("T")[0]
// // //     ) {
// // //       updates.dueDate = formData.dueDate;
// // //     }
// // //     if (formData.isActive !== due.isActive)
// // //       updates.isActive = formData.isActive;

// // //     if (Object.keys(updates).length === 0) {
// // //       setShowEditModal(false);
// // //       return;
// // //     }

// // //     try {
// // //       await updateDueMutation.mutateAsync({
// // //         url: `/v1/householdDue/due/${dueId}`,
// // //         data: updates,
// // //       });
// // //       setShowEditModal(false);
// // //     } catch (error) {
// // //       console.error("Error updating due:", error);
// // //     }
// // //   };

// // //   const handleOpenAssign = () => {
// // //     setSelectedHouseholds({});
// // //     setShowAssignModal(true);
// // //   };

// // //   const handleToggleHousehold = (householdId) => {
// // //     setSelectedHouseholds((prev) => {
// // //       if (prev[householdId]) {
// // //         const { [householdId]: removed, ...rest } = prev;
// // //         return rest;
// // //       } else {
// // //         return { ...prev, [householdId]: "unpaid" };
// // //       }
// // //     });
// // //   };

// // //   const handleStatusChange = (householdId, status) => {
// // //     setSelectedHouseholds((prev) => ({
// // //       ...prev,
// // //       [householdId]: status,
// // //     }));
// // //   };

// // //   const handleAssignHouseholds = async () => {
// // //     const householdIds = Object.keys(selectedHouseholds);
// // //     if (householdIds.length === 0) return;

// // //     try {
// // //       await assignHouseholdsMutation.mutateAsync({
// // //         url: `/v1/householdDue/due/${dueId}`,
// // //         data: {
// // //           householdIds,
// // //           statuses: selectedHouseholds,
// // //         },
// // //       });
// // //       setShowAssignModal(false);
// // //       setSelectedHouseholds({});
// // //     } catch (error) {
// // //       console.error("Error assigning households:", error);
// // //     }
// // //   };

// // //   const handleWaiveHousehold = async (householdId) => {
// // //     try {
// // //       await waiveMutation.mutateAsync({
// // //         url: `/v1/householdDue/waive`,
// // //         data: {
// // //           householdId: householdId,
// // //           duesId: dueId,
// // //         },
// // //       });
// // //       setShowWaiveConfirm(null);
// // //     } catch (error) {
// // //       console.error("Error waiving household:", error);
// // //     }
// // //   };

// // //   const handleManualPayment = async (householdId) => {
// // //     try {
// // //       await manualPaymentMutation.mutateAsync({
// // //         url: `/v1/householdDue/manual-payment`,
// // //         data: {
// // //           householdId: householdId,
// // //           duesId: dueId,
// // //         },
// // //       });
// // //       setShowManualPaymentConfirm(null);
// // //     } catch (error) {
// // //       console.error("Error recording manual payment:", error);
// // //     }
// // //   };

// // //   const handleDeleteDue = async () => {
// // //     try {
// // //       await deleteMutation.mutateAsync({
// // //         url: `/v1/householdDue/waive`,
// // //         data: {
// // //           duesId: dueId,
// // //         },
// // //       });
// // //       setShowDeleteConfirm(false);
// // //       navigate(-1);
// // //     } catch (error) {
// // //       console.error("Error deleting due:", error);
// // //     }
// // //   };

// // //   const canDelete = due && due.totalPaid === 0 && due.collectedTotal === 0;

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case "paid":
// // //         return { bg: "#D1FAE5", color: "#065F46" };
// // //       case "unpaid":
// // //         return { bg: "#FEF3C7", color: "#92400E" };
// // //       case "overdue":
// // //         return { bg: "#FEE2E2", color: "#991B1B" };
// // //       case "waived":
// // //         return { bg: "#E0E7FF", color: "#3730A3" };
// // //       case "manual":
// // //         return { bg: "#DBEAFE", color: "#1E40AF" };
// // //       default:
// // //         return { bg: "#F3F4F6", color: "#6B7280" };
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div
// // //         style={{
// // //           display: "flex",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           minHeight: "60vh",
// // //         }}
// // //       >
// // //         <p style={{ fontSize: "14px", color: "#6B7280" }}>Loading...</p>
// // //       </div>
// // //     );
// // //   }

// // //   if (error || !due) {
// // //     return (
// // //       <div
// // //         style={{
// // //           display: "flex",
// // //           flexDirection: "column",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           minHeight: "60vh",
// // //         }}
// // //       >
// // //         <div
// // //           style={{
// // //             width: "80px",
// // //             height: "80px",
// // //             borderRadius: "40px",
// // //             background: "#FEE2E2",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             marginBottom: "16px",
// // //           }}
// // //         >
// // //           <AlertCircle size={32} color="#DC2626" />
// // //         </div>
// // //         <p
// // //           style={{
// // //             fontSize: "16px",
// // //             fontWeight: 600,
// // //             color: "#111827",
// // //             marginBottom: "8px",
// // //           }}
// // //         >
// // //           Error loading due
// // //         </p>
// // //         <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "24px" }}>
// // //           {error?.message || "Due not found"}
// // //         </p>
// // //         <button
// // //           onClick={() => navigate(-1)}
// // //           style={{
// // //             padding: "12px 24px",
// // //             background: "#10B981",
// // //             color: "white",
// // //             fontSize: "14px",
// // //             fontWeight: 600,
// // //             borderRadius: "8px",
// // //             border: "none",
// // //             cursor: "pointer",
// // //             boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
// // //           }}
// // //         >
// // //           Go Back
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   const isOverdue = new Date(due.dueDate) < new Date();
// // //   const completionRate =
// // //     due.expectedTotal > 0
// // //       ? ((due.collectedTotal / due.expectedTotal) * 100).toFixed(1)
// // //       : 0;

// // //   return (
// // //     <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
// // //       <div style={{ marginBottom: "32px" }}>
// // //         <button
// // //           onClick={() => navigate(-1)}
// // //           style={{
// // //             display: "flex",
// // //             alignItems: "center",
// // //             gap: "8px",
// // //             padding: "8px 16px",
// // //             background: "white",
// // //             border: "1px solid #E5E7EB",
// // //             borderRadius: "8px",
// // //             fontSize: "14px",
// // //             fontWeight: 500,
// // //             color: "#374151",
// // //             cursor: "pointer",
// // //             marginBottom: "24px",
// // //           }}
// // //         >
// // //           <ArrowLeft size={16} />
// // //           Back to Dues
// // //         </button>

// // //         <div
// // //           style={{
// // //             display: "flex",
// // //             justifyContent: "space-between",
// // //             alignItems: "flex-start",
// // //           }}
// // //         >
// // //           <div>
// // //             <div
// // //               style={{
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 gap: "12px",
// // //                 marginBottom: "8px",
// // //               }}
// // //             >
// // //               <h1
// // //                 style={{
// // //                   fontSize: "28px",
// // //                   fontWeight: 700,
// // //                   color: "#111827",
// // //                 }}
// // //               >
// // //                 {due.title}
// // //               </h1>
// // //               <span
// // //                 style={{
// // //                   padding: "6px 12px",
// // //                   borderRadius: "6px",
// // //                   fontSize: "12px",
// // //                   fontWeight: 600,
// // //                   background: due.isActive ? "#D1FAE5" : "#F3F4F6",
// // //                   color: due.isActive ? "#065F46" : "#6B7280",
// // //                 }}
// // //               >
// // //                 {due.isActive ? "Active" : "Inactive"}
// // //               </span>
// // //             </div>
// // //             <p style={{ fontSize: "14px", color: "#6B7280" }}>
// // //               {due.description}
// // //             </p>
// // //           </div>

// // //           <div style={{ display: "flex", gap: "12px" }}>
// // //             {canDelete && (
// // //               <button
// // //                 onClick={() => setShowDeleteConfirm(true)}
// // //                 style={{
// // //                   padding: "12px 24px",
// // //                   background: "white",
// // //                   color: "#DC2626",
// // //                   fontSize: "14px",
// // //                   fontWeight: 600,
// // //                   borderRadius: "8px",
// // //                   border: "2px solid #DC2626",
// // //                   cursor: "pointer",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   gap: "8px",
// // //                   transition: "all 0.2s ease",
// // //                 }}
// // //                 onMouseEnter={(e) => {
// // //                   e.currentTarget.style.background = "#DC2626";
// // //                   e.currentTarget.style.color = "white";
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.currentTarget.style.background = "white";
// // //                   e.currentTarget.style.color = "#DC2626";
// // //                 }}
// // //               >
// // //                 <Trash2 size={16} />
// // //                 Delete
// // //               </button>
// // //             )}
// // //             <button
// // //               onClick={handleOpenAssign}
// // //               style={{
// // //                 padding: "12px 24px",
// // //                 background: "white",
// // //                 color: "#10B981",
// // //                 fontSize: "14px",
// // //                 fontWeight: 600,
// // //                 borderRadius: "8px",
// // //                 border: "2px solid #10B981",
// // //                 cursor: "pointer",
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 gap: "8px",
// // //               }}
// // //             >
// // //               <Plus size={16} />
// // //               Assign Households
// // //             </button>
// // //             <button
// // //               onClick={handleOpenEdit}
// // //               style={{
// // //                 padding: "12px 24px",
// // //                 background: "#10B981",
// // //                 color: "white",
// // //                 fontSize: "14px",
// // //                 fontWeight: 600,
// // //                 borderRadius: "8px",
// // //                 border: "none",
// // //                 cursor: "pointer",
// // //                 boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 gap: "8px",
// // //               }}
// // //             >
// // //               <Edit size={16} />
// // //               Edit Due
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div
// // //         style={{
// // //           display: "grid",
// // //           gridTemplateColumns: "repeat(4, 1fr)",
// // //           gap: "24px",
// // //           marginBottom: "32px",
// // //         }}
// // //       >
// // //         <StatsCard
// // //           title="Default Amount"
// // //           value={`₦${due.defaultAmount.toLocaleString()}`}
// // //           icon={<DollarSign size={24} />}
// // //           iconBg="#FEF3C7"
// // //           iconColor="#F59E0B"
// // //         />
// // //         <StatsCard
// // //           title="Expected Total"
// // //           value={`₦${due.expectedTotal.toLocaleString()}`}
// // //           icon={<DollarSign size={24} />}
// // //           iconBg="#DBEAFE"
// // //           iconColor="#3B82F6"
// // //         />
// // //         <StatsCard
// // //           title="Collected"
// // //           value={`₦${due.collectedTotal.toLocaleString()}`}
// // //           icon={<CheckCircle size={24} />}
// // //           iconBg="#D1FAE5"
// // //           iconColor="#10B981"
// // //         />
// // //         <StatsCard
// // //           title="Outstanding"
// // //           value={`₦${due.outstandingTotal.toLocaleString()}`}
// // //           icon={<AlertCircle size={24} />}
// // //           iconBg="#FEE2E2"
// // //           iconColor="#DC2626"
// // //         />
// // //       </div>

// // //       <div
// // //         style={{
// // //           display: "grid",
// // //           gridTemplateColumns: "2fr 1fr",
// // //           gap: "24px",
// // //         }}
// // //       >
// // //         <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
// // //           <div
// // //             style={{
// // //               background: "white",
// // //               borderRadius: "12px",
// // //               padding: "24px",
// // //               boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// // //             }}
// // //           >
// // //             <h3
// // //               style={{
// // //                 fontSize: "18px",
// // //                 fontWeight: 700,
// // //                 color: "#111827",
// // //                 marginBottom: "20px",
// // //               }}
// // //             >
// // //               Payment Progress
// // //             </h3>

// // //             <div
// // //               style={{
// // //                 display: "grid",
// // //                 gridTemplateColumns: "repeat(2, 1fr)",
// // //                 gap: "24px",
// // //                 marginBottom: "24px",
// // //               }}
// // //             >
// // //               <div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "12px",
// // //                     color: "#9CA3AF",
// // //                     marginBottom: "8px",
// // //                   }}
// // //                 >
// // //                   Total Assigned
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "24px",
// // //                     fontWeight: 700,
// // //                     color: "#111827",
// // //                   }}
// // //                 >
// // //                   {due.totalAssigned}
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "13px",
// // //                     color: "#6B7280",
// // //                     marginTop: "4px",
// // //                   }}
// // //                 >
// // //                   households
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "12px",
// // //                     color: "#9CA3AF",
// // //                     marginBottom: "8px",
// // //                   }}
// // //                 >
// // //                   Must Pay
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "24px",
// // //                     fontWeight: 700,
// // //                     color: "#111827",
// // //                   }}
// // //                 >
// // //                   {due.totalMustPay}
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "13px",
// // //                     color: "#6B7280",
// // //                     marginTop: "4px",
// // //                   }}
// // //                 >
// // //                   households
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "12px",
// // //                     color: "#9CA3AF",
// // //                     marginBottom: "8px",
// // //                   }}
// // //                 >
// // //                   Paid
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "24px",
// // //                     fontWeight: 700,
// // //                     color: "#10B981",
// // //                   }}
// // //                 >
// // //                   {due.totalPaid}
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "13px",
// // //                     color: "#6B7280",
// // //                     marginTop: "4px",
// // //                   }}
// // //                 >
// // //                   households
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "12px",
// // //                     color: "#9CA3AF",
// // //                     marginBottom: "8px",
// // //                   }}
// // //                 >
// // //                   Exempted
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "24px",
// // //                     fontWeight: 700,
// // //                     color: "#6B7280",
// // //                   }}
// // //                 >
// // //                   {due.totalExempted}
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "13px",
// // //                     color: "#6B7280",
// // //                     marginTop: "4px",
// // //                   }}
// // //                 >
// // //                   households
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <div
// // //                 style={{
// // //                   display: "flex",
// // //                   justifyContent: "space-between",
// // //                   alignItems: "center",
// // //                   marginBottom: "8px",
// // //                 }}
// // //               >
// // //                 <span
// // //                   style={{
// // //                     fontSize: "14px",
// // //                     fontWeight: 600,
// // //                     color: "#111827",
// // //                   }}
// // //                 >
// // //                   Completion Rate
// // //                 </span>
// // //                 <span
// // //                   style={{
// // //                     fontSize: "18px",
// // //                     fontWeight: 700,
// // //                     color: "#10B981",
// // //                   }}
// // //                 >
// // //                   {completionRate}%
// // //                 </span>
// // //               </div>
// // //               <div
// // //                 style={{
// // //                   width: "100%",
// // //                   height: "12px",
// // //                   background: "#F3F4F6",
// // //                   borderRadius: "6px",
// // //                   overflow: "hidden",
// // //                 }}
// // //               >
// // //                 <div
// // //                   style={{
// // //                     width: `${completionRate}%`,
// // //                     height: "100%",
// // //                     background: "#10B981",
// // //                     transition: "width 0.3s ease",
// // //                   }}
// // //                 />
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div
// // //             style={{
// // //               background: "white",
// // //               borderRadius: "12px",
// // //               padding: "24px",
// // //               boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// // //             }}
// // //           >
// // //             <h3
// // //               style={{
// // //                 fontSize: "18px",
// // //                 fontWeight: 700,
// // //                 color: "#111827",
// // //                 marginBottom: "16px",
// // //               }}
// // //             >
// // //               Assigned Households ({due.households?.length || 0})
// // //             </h3>
// // //             {due.households && due.households.length > 0 ? (
// // //               <div
// // //                 style={{
// // //                   display: "flex",
// // //                   flexDirection: "column",
// // //                   gap: "12px",
// // //                 }}
// // //               >
// // //                 {due.households.map((item) => {
// // //                   const statusStyle = getStatusColor(item.status);
// // //                   const canWaive =
// // //                     item.status !== "paid" &&
// // //                     item.status !== "waived" &&
// // //                     item.status !== "manual";
// // //                   const canMarkManual =
// // //                     item.status !== "paid" &&
// // //                     item.status !== "waived" &&
// // //                     item.status !== "manual";

// // //                   return (
// // //                     <div
// // //                       key={item._id}
// // //                       style={{
// // //                         padding: "16px",
// // //                         background: "#F9FAFB",
// // //                         borderRadius: "10px",
// // //                       }}
// // //                     >
// // //                       <div
// // //                         style={{
// // //                           display: "flex",
// // //                           justifyContent: "space-between",
// // //                           alignItems: "flex-start",
// // //                         }}
// // //                       >
// // //                         <div style={{ flex: 1 }}>
// // //                           <div
// // //                             style={{
// // //                               display: "flex",
// // //                               alignItems: "center",
// // //                               gap: "12px",
// // //                               marginBottom: "8px",
// // //                             }}
// // //                           >
// // //                             <div
// // //                               style={{
// // //                                 width: "40px",
// // //                                 height: "40px",
// // //                                 borderRadius: "8px",
// // //                                 background: "#E0E7FF",
// // //                                 display: "flex",
// // //                                 alignItems: "center",
// // //                                 justifyContent: "center",
// // //                                 color: "#6366F1",
// // //                               }}
// // //                             >
// // //                               <Home size={20} />
// // //                             </div>
// // //                             <div>
// // //                               <div
// // //                                 style={{
// // //                                   fontSize: "16px",
// // //                                   fontWeight: 600,
// // //                                   color: "#111827",
// // //                                 }}
// // //                               >
// // //                                 {item.household.name}
// // //                               </div>
// // //                               <div
// // //                                 style={{ fontSize: "13px", color: "#6B7280" }}
// // //                               >
// // //                                 {item.household.type} • {item.household.address}
// // //                               </div>
// // //                             </div>
// // //                           </div>
// // //                           <div
// // //                             style={{
// // //                               display: "flex",
// // //                               gap: "16px",
// // //                               marginTop: "8px",
// // //                               fontSize: "13px",
// // //                             }}
// // //                           >
// // //                             <div>
// // //                               <span style={{ color: "#9CA3AF" }}>
// // //                                 Amount Due:{" "}
// // //                               </span>
// // //                               <span
// // //                                 style={{
// // //                                   fontWeight: 600,
// // //                                   color: "#111827",
// // //                                   fontFamily: "monospace",
// // //                                 }}
// // //                               >
// // //                                 ₦{item.amountDue.toLocaleString()}
// // //                               </span>
// // //                             </div>
// // //                             <div>
// // //                               <span style={{ color: "#9CA3AF" }}>
// // //                                 Amount Paid:{" "}
// // //                               </span>
// // //                               <span
// // //                                 style={{
// // //                                   fontWeight: 600,
// // //                                   color: "#10B981",
// // //                                   fontFamily: "monospace",
// // //                                 }}
// // //                               >
// // //                                 ₦{item.amountPaid.toLocaleString()}
// // //                               </span>
// // //                             </div>
// // //                           </div>
// // //                         </div>

// // //                         <div
// // //                           style={{
// // //                             display: "flex",
// // //                             alignItems: "center",
// // //                             gap: "8px",
// // //                             marginLeft: "16px",
// // //                           }}
// // //                         >
// // //                           <span
// // //                             style={{
// // //                               padding: "6px 12px",
// // //                               borderRadius: "6px",
// // //                               fontSize: "12px",
// // //                               fontWeight: 600,
// // //                               background: statusStyle.bg,
// // //                               color: statusStyle.color,
// // //                               textTransform: "capitalize",
// // //                             }}
// // //                           >
// // //                             {item.status}
// // //                           </span>

// // //                           {canMarkManual && (
// // //                             <button
// // //                               onClick={() =>
// // //                                 setShowManualPaymentConfirm({
// // //                                   householdId: item.household._id,
// // //                                   householdName: item.household.name,
// // //                                   amountDue: item.amountDue,
// // //                                 })
// // //                               }
// // //                               style={{
// // //                                 padding: "6px 12px",
// // //                                 background: "white",
// // //                                 color: "#3B82F6",
// // //                                 fontSize: "12px",
// // //                                 fontWeight: 600,
// // //                                 borderRadius: "6px",
// // //                                 border: "2px solid #3B82F6",
// // //                                 cursor: "pointer",
// // //                                 display: "flex",
// // //                                 alignItems: "center",
// // //                                 gap: "6px",
// // //                                 transition: "all 0.2s ease",
// // //                               }}
// // //                               onMouseEnter={(e) => {
// // //                                 e.currentTarget.style.background = "#3B82F6";
// // //                                 e.currentTarget.style.color = "white";
// // //                               }}
// // //                               onMouseLeave={(e) => {
// // //                                 e.currentTarget.style.background = "white";
// // //                                 e.currentTarget.style.color = "#3B82F6";
// // //                               }}
// // //                             >
// // //                               <Banknote size={14} />
// // //                               Cash
// // //                             </button>
// // //                           )}

// // //                           {canWaive && (
// // //                             <button
// // //                               onClick={() =>
// // //                                 setShowWaiveConfirm({
// // //                                   householdId: item.household._id,
// // //                                   householdName: item.household.name,
// // //                                 })
// // //                               }
// // //                               style={{
// // //                                 padding: "6px 12px",
// // //                                 background: "white",
// // //                                 color: "#6366F1",
// // //                                 fontSize: "12px",
// // //                                 fontWeight: 600,
// // //                                 borderRadius: "6px",
// // //                                 border: "2px solid #6366F1",
// // //                                 cursor: "pointer",
// // //                                 display: "flex",
// // //                                 alignItems: "center",
// // //                                 gap: "6px",
// // //                                 transition: "all 0.2s ease",
// // //                               }}
// // //                               onMouseEnter={(e) => {
// // //                                 e.currentTarget.style.background = "#6366F1";
// // //                                 e.currentTarget.style.color = "white";
// // //                               }}
// // //                               onMouseLeave={(e) => {
// // //                                 e.currentTarget.style.background = "white";
// // //                                 e.currentTarget.style.color = "#6366F1";
// // //                               }}
// // //                             >
// // //                               <XCircle size={14} />
// // //                               Waive
// // //                             </button>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   );
// // //                 })}
// // //               </div>
// // //             ) : (
// // //               <div
// // //                 style={{
// // //                   padding: "32px",
// // //                   textAlign: "center",
// // //                   background: "#F9FAFB",
// // //                   borderRadius: "8px",
// // //                 }}
// // //               >
// // //                 <Users
// // //                   size={32}
// // //                   color="#D1D5DB"
// // //                   style={{ margin: "0 auto 12px" }}
// // //                 />
// // //                 <p
// // //                   style={{
// // //                     fontSize: "14px",
// // //                     color: "#6B7280",
// // //                   }}
// // //                 >
// // //                   No households assigned yet
// // //                 </p>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
// // //           <div
// // //             style={{
// // //               background: "white",
// // //               borderRadius: "12px",
// // //               padding: "24px",
// // //               boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// // //             }}
// // //           >
// // //             <h3
// // //               style={{
// // //                 fontSize: "18px",
// // //                 fontWeight: 700,
// // //                 color: "#111827",
// // //                 marginBottom: "20px",
// // //               }}
// // //             >
// // //               Due Information
// // //             </h3>

// // //             <div
// // //               style={{ display: "flex", flexDirection: "column", gap: "16px" }}
// // //             >
// // //               <div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "12px",
// // //                     color: "#9CA3AF",
// // //                     marginBottom: "4px",
// // //                   }}
// // //                 >
// // //                   Due Date
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     display: "inline-flex",
// // //                     alignItems: "center",
// // //                     gap: "8px",
// // //                     padding: "8px 12px",
// // //                     borderRadius: "8px",
// // //                     background: isOverdue ? "#FEE2E2" : "#DBEAFE",
// // //                   }}
// // //                 >
// // //                   <Calendar
// // //                     size={16}
// // //                     color={isOverdue ? "#DC2626" : "#3B82F6"}
// // //                   />
// // //                   <span
// // //                     style={{
// // //                       fontSize: "14px",
// // //                       fontWeight: 600,
// // //                       color: isOverdue ? "#DC2626" : "#3B82F6",
// // //                     }}
// // //                   >
// // //                     {new Date(due.dueDate).toLocaleDateString("en-US", {
// // //                       month: "long",
// // //                       day: "numeric",
// // //                       year: "numeric",
// // //                     })}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "12px",
// // //                     color: "#9CA3AF",
// // //                     marginBottom: "4px",
// // //                   }}
// // //                 >
// // //                   Category
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "14px",
// // //                     fontWeight: 500,
// // //                     color: "#111827",
// // //                     textTransform: "capitalize",
// // //                   }}
// // //                 >
// // //                   {due.category.replace(/_/g, " ")}
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "12px",
// // //                     color: "#9CA3AF",
// // //                     marginBottom: "4px",
// // //                   }}
// // //                 >
// // //                   Created By
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "14px",
// // //                     fontWeight: 500,
// // //                     color: "#111827",
// // //                   }}
// // //                 >
// // //                   {due.createdBy?.name || due.createdBy?.email || "N/A"}
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "12px",
// // //                     color: "#9CA3AF",
// // //                     marginBottom: "4px",
// // //                   }}
// // //                 >
// // //                   Created At
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "14px",
// // //                     fontWeight: 500,
// // //                     color: "#111827",
// // //                   }}
// // //                 >
// // //                   {new Date(due.createdAt).toLocaleDateString("en-US", {
// // //                     month: "short",
// // //                     day: "numeric",
// // //                     year: "numeric",
// // //                   })}
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "12px",
// // //                     color: "#9CA3AF",
// // //                     marginBottom: "4px",
// // //                   }}
// // //                 >
// // //                   Last Updated
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     fontSize: "14px",
// // //                     fontWeight: 500,
// // //                     color: "#111827",
// // //                   }}
// // //                 >
// // //                   {new Date(due.updatedAt).toLocaleDateString("en-US", {
// // //                     month: "short",
// // //                     day: "numeric",
// // //                     year: "numeric",
// // //                   })}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Edit Modal */}
// // //       {showEditModal && (
// // //         <div
// // //           style={{
// // //             position: "fixed",
// // //             top: 0,
// // //             left: 0,
// // //             right: 0,
// // //             bottom: 0,
// // //             background: "rgba(0, 0, 0, 0.5)",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             zIndex: 1000,
// // //             padding: "24px",
// // //           }}
// // //           onClick={() => setShowEditModal(false)}
// // //         >
// // //           <div
// // //             style={{
// // //               background: "white",
// // //               borderRadius: "16px",
// // //               maxWidth: "600px",
// // //               width: "100%",
// // //               maxHeight: "90vh",
// // //               overflow: "hidden",
// // //               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
// // //             }}
// // //             onClick={(e) => e.stopPropagation()}
// // //           >
// // //             <div
// // //               style={{
// // //                 display: "flex",
// // //                 justifyContent: "space-between",
// // //                 alignItems: "center",
// // //                 padding: "24px 32px",
// // //                 borderBottom: "1px solid #E5E7EB",
// // //               }}
// // //             >
// // //               <h3
// // //                 style={{
// // //                   fontSize: "20px",
// // //                   fontWeight: 700,
// // //                   color: "#111827",
// // //                 }}
// // //               >
// // //                 Edit Due
// // //               </h3>
// // //               <button
// // //                 onClick={() => setShowEditModal(false)}
// // //                 style={{
// // //                   width: "36px",
// // //                   height: "36px",
// // //                   borderRadius: "8px",
// // //                   background: "#F3F4F6",
// // //                   border: "none",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   cursor: "pointer",
// // //                   color: "#6B7280",
// // //                 }}
// // //               >
// // //                 <X size={20} />
// // //               </button>
// // //             </div>

// // //             <form onSubmit={handleUpdate} style={{ padding: "32px" }}>
// // //               <div style={{ marginBottom: "20px" }}>
// // //                 <label
// // //                   style={{
// // //                     display: "block",
// // //                     fontSize: "14px",
// // //                     fontWeight: 600,
// // //                     color: "#374151",
// // //                     marginBottom: "8px",
// // //                   }}
// // //                 >
// // //                   Title
// // //                 </label>
// // //                 <input
// // //                   type="text"
// // //                   value={formData.title}
// // //                   onChange={(e) =>
// // //                     setFormData({ ...formData, title: e.target.value })
// // //                   }
// // //                   placeholder="e.g., Annual Levy 2025"
// // //                   style={{
// // //                     width: "100%",
// // //                     padding: "12px 16px",
// // //                     border: "1px solid #E5E7EB",
// // //                     borderRadius: "8px",
// // //                     fontSize: "14px",
// // //                     color: "#111827",
// // //                     background: "white",
// // //                   }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "20px" }}>
// // //                 <label
// // //                   style={{
// // //                     display: "block",
// // //                     fontSize: "14px",
// // //                     fontWeight: 600,
// // //                     color: "#374151",
// // //                     marginBottom: "8px",
// // //                   }}
// // //                 >
// // //                   Description
// // //                 </label>
// // //                 <textarea
// // //                   value={formData.description}
// // //                   onChange={(e) =>
// // //                     setFormData({ ...formData, description: e.target.value })
// // //                   }
// // //                   placeholder="Describe the purpose of this due"
// // //                   rows={3}
// // //                   style={{
// // //                     width: "100%",
// // //                     padding: "12px 16px",
// // //                     border: "1px solid #E5E7EB",
// // //                     borderRadius: "8px",
// // //                     fontSize: "14px",
// // //                     color: "#111827",
// // //                     background: "white",
// // //                     resize: "vertical",
// // //                   }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "20px" }}>
// // //                 <label
// // //                   style={{
// // //                     display: "block",
// // //                     fontSize: "14px",
// // //                     fontWeight: 600,
// // //                     color: "#374151",
// // //                     marginBottom: "8px",
// // //                   }}
// // //                 >
// // //                   Due Date
// // //                 </label>
// // //                 <input
// // //                   type="date"
// // //                   value={formData.dueDate}
// // //                   onChange={(e) =>
// // //                     setFormData({ ...formData, dueDate: e.target.value })
// // //                   }
// // //                   style={{
// // //                     width: "100%",
// // //                     padding: "12px 16px",
// // //                     border: "1px solid #E5E7EB",
// // //                     borderRadius: "8px",
// // //                     fontSize: "14px",
// // //                     color: "#111827",
// // //                     background: "white",
// // //                   }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "32px" }}>
// // //                 <label
// // //                   style={{
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     gap: "12px",
// // //                     cursor: "pointer",
// // //                   }}
// // //                 >
// // //                   <input
// // //                     type="checkbox"
// // //                     checked={formData.isActive}
// // //                     onChange={(e) =>
// // //                       setFormData({ ...formData, isActive: e.target.checked })
// // //                     }
// // //                     style={{
// // //                       width: "20px",
// // //                       height: "20px",
// // //                       cursor: "pointer",
// // //                     }}
// // //                   />
// // //                   <span
// // //                     style={{
// // //                       fontSize: "14px",
// // //                       fontWeight: 600,
// // //                       color: "#374151",
// // //                     }}
// // //                   >
// // //                     Active
// // //                   </span>
// // //                 </label>
// // //                 <p
// // //                   style={{
// // //                     fontSize: "13px",
// // //                     color: "#6B7280",
// // //                     marginTop: "8px",
// // //                     marginLeft: "32px",
// // //                   }}
// // //                 >
// // //                   Inactive dues won't be visible to households
// // //                 </p>
// // //               </div>

// // //               {updateDueMutation.isError && (
// // //                 <div
// // //                   style={{
// // //                     padding: "12px 16px",
// // //                     background: "#FEE2E2",
// // //                     borderRadius: "8px",
// // //                     marginBottom: "20px",
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     gap: "8px",
// // //                   }}
// // //                 >
// // //                   <AlertCircle size={16} color="#DC2626" />
// // //                   <span style={{ fontSize: "14px", color: "#DC2626" }}>
// // //                     {updateDueMutation.error?.message ||
// // //                       "Failed to update due. Please try again."}
// // //                   </span>
// // //                 </div>
// // //               )}

// // //               <div
// // //                 style={{
// // //                   display: "flex",
// // //                   justifyContent: "flex-end",
// // //                   gap: "12px",
// // //                 }}
// // //               >
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setShowEditModal(false)}
// // //                   disabled={updateDueMutation.isLoading}
// // //                   style={{
// // //                     padding: "12px 24px",
// // //                     background: "white",
// // //                     color: "#374151",
// // //                     fontSize: "14px",
// // //                     fontWeight: 600,
// // //                     borderRadius: "8px",
// // //                     border: "1px solid #E5E7EB",
// // //                     cursor: updateDueMutation.isLoading
// // //                       ? "not-allowed"
// // //                       : "pointer",
// // //                     opacity: updateDueMutation.isLoading ? 0.6 : 1,
// // //                   }}
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <button
// // //                   type="submit"
// // //                   disabled={updateDueMutation.isLoading}
// // //                   style={{
// // //                     padding: "12px 24px",
// // //                     background: updateDueMutation.isLoading
// // //                       ? "#9CA3AF"
// // //                       : "#10B981",
// // //                     color: "white",
// // //                     fontSize: "14px",
// // //                     fontWeight: 600,
// // //                     borderRadius: "8px",
// // //                     border: "none",
// // //                     cursor: updateDueMutation.isLoading
// // //                       ? "not-allowed"
// // //                       : "pointer",
// // //                     boxShadow: updateDueMutation.isLoading
// // //                       ? "none"
// // //                       : "0 4px 12px rgba(16, 185, 129, 0.3)",
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     gap: "8px",
// // //                   }}
// // //                 >
// // //                   {updateDueMutation.isLoading ? (
// // //                     "Saving..."
// // //                   ) : (
// // //                     <>
// // //                       <Save size={16} />
// // //                       Save Changes
// // //                     </>
// // //                   )}
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Assign Households Modal */}
// // //       {showAssignModal && (
// // //         <div
// // //           style={{
// // //             position: "fixed",
// // //             top: 0,
// // //             left: 0,
// // //             right: 0,
// // //             bottom: 0,
// // //             background: "rgba(0, 0, 0, 0.5)",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             zIndex: 1000,
// // //             padding: "24px",
// // //           }}
// // //           onClick={() => setShowAssignModal(false)}
// // //         >
// // //           <div
// // //             style={{
// // //               background: "white",
// // //               borderRadius: "16px",
// // //               maxWidth: "700px",
// // //               width: "100%",
// // //               maxHeight: "90vh",
// // //               overflow: "hidden",
// // //               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
// // //             }}
// // //             onClick={(e) => e.stopPropagation()}
// // //           >
// // //             <div
// // //               style={{
// // //                 padding: "24px 32px",
// // //                 borderBottom: "1px solid #E5E7EB",
// // //               }}
// // //             >
// // //               <div
// // //                 style={{
// // //                   display: "flex",
// // //                   justifyContent: "space-between",
// // //                   alignItems: "center",
// // //                 }}
// // //               >
// // //                 <h3
// // //                   style={{
// // //                     fontSize: "20px",
// // //                     fontWeight: 700,
// // //                     color: "#111827",
// // //                   }}
// // //                 >
// // //                   Assign Households
// // //                 </h3>
// // //                 <button
// // //                   onClick={() => setShowAssignModal(false)}
// // //                   style={{
// // //                     width: "36px",
// // //                     height: "36px",
// // //                     borderRadius: "8px",
// // //                     background: "#F3F4F6",
// // //                     border: "none",
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     justifyContent: "center",
// // //                     cursor: "pointer",
// // //                     color: "#6B7280",
// // //                   }}
// // //                 >
// // //                   <X size={20} />
// // //                 </button>
// // //               </div>

// // //               {availableHouseholds.length > 0 && (
// // //                 <div
// // //                   style={{
// // //                     marginTop: "16px",
// // //                     display: "flex",
// // //                     justifyContent: "space-between",
// // //                     alignItems: "center",
// // //                     padding: "12px 16px",
// // //                     background: "#F9FAFB",
// // //                     borderRadius: "8px",
// // //                   }}
// // //                 >
// // //                   <label
// // //                     style={{
// // //                       display: "flex",
// // //                       alignItems: "center",
// // //                       gap: "12px",
// // //                       cursor: "pointer",
// // //                     }}
// // //                     onClick={(e) => {
// // //                       e.preventDefault();
// // //                       if (allSelected) {
// // //                         handleDeselectAll();
// // //                       } else {
// // //                         handleSelectAll();
// // //                       }
// // //                     }}
// // //                   >
// // //                     <input
// // //                       type="checkbox"
// // //                       checked={allSelected}
// // //                       ref={(input) => {
// // //                         if (input) {
// // //                           input.indeterminate = someSelected;
// // //                         }
// // //                       }}
// // //                       onChange={() => {
// // //                         if (allSelected) {
// // //                           handleDeselectAll();
// // //                         } else {
// // //                           handleSelectAll();
// // //                         }
// // //                       }}
// // //                       style={{
// // //                         width: "20px",
// // //                         height: "20px",
// // //                         cursor: "pointer",
// // //                       }}
// // //                     />
// // //                     <span
// // //                       style={{
// // //                         fontSize: "14px",
// // //                         fontWeight: 600,
// // //                         color: "#374151",
// // //                       }}
// // //                     >
// // //                       {allSelected
// // //                         ? "Deselect All"
// // //                         : someSelected
// // //                           ? `Select All (${
// // //                               Object.keys(selectedHouseholds).length
// // //                             } selected)`
// // //                           : "Select All"}
// // //                     </span>
// // //                   </label>

// // //                   <span
// // //                     style={{
// // //                       fontSize: "13px",
// // //                       color: "#6B7280",
// // //                     }}
// // //                   >
// // //                     {availableHouseholds.length} available
// // //                   </span>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div
// // //               style={{
// // //                 padding: "24px 32px",
// // //                 maxHeight: "60vh",
// // //                 overflowY: "auto",
// // //               }}
// // //             >
// // //               {loadingHouseholds ? (
// // //                 <div style={{ padding: "32px", textAlign: "center" }}>
// // //                   <p style={{ fontSize: "14px", color: "#6B7280" }}>
// // //                     Loading households...
// // //                   </p>
// // //                 </div>
// // //               ) : availableHouseholds.length === 0 ? (
// // //                 <div style={{ padding: "32px", textAlign: "center" }}>
// // //                   <Users
// // //                     size={48}
// // //                     color="#D1D5DB"
// // //                     style={{ margin: "0 auto 16px" }}
// // //                   />
// // //                   <p
// // //                     style={{
// // //                       fontSize: "16px",
// // //                       fontWeight: 600,
// // //                       color: "#111827",
// // //                     }}
// // //                   >
// // //                     No households available
// // //                   </p>
// // //                   <p
// // //                     style={{
// // //                       fontSize: "14px",
// // //                       color: "#6B7280",
// // //                       marginTop: "8px",
// // //                     }}
// // //                   >
// // //                     All households have been assigned to this due
// // //                   </p>
// // //                 </div>
// // //               ) : (
// // //                 <div
// // //                   style={{
// // //                     display: "flex",
// // //                     flexDirection: "column",
// // //                     gap: "12px",
// // //                   }}
// // //                 >
// // //                   {availableHouseholds.map((household) => {
// // //                     const isSelected = selectedHouseholds[household._id];
// // //                     return (
// // //                       <div
// // //                         key={household._id}
// // //                         style={{
// // //                           padding: "16px",
// // //                           background: isSelected ? "#F0FDF4" : "#F9FAFB",
// // //                           border: isSelected
// // //                             ? "2px solid #10B981"
// // //                             : "2px solid transparent",
// // //                           borderRadius: "10px",
// // //                           cursor: "pointer",
// // //                           transition: "all 0.2s ease",
// // //                         }}
// // //                         onClick={() => handleToggleHousehold(household._id)}
// // //                       >
// // //                         <div
// // //                           style={{
// // //                             display: "flex",
// // //                             alignItems: "center",
// // //                             gap: "12px",
// // //                           }}
// // //                         >
// // //                           <input
// // //                             type="checkbox"
// // //                             checked={!!isSelected}
// // //                             onChange={() =>
// // //                               handleToggleHousehold(household._id)
// // //                             }
// // //                             onClick={(e) => e.stopPropagation()}
// // //                             style={{
// // //                               width: "20px",
// // //                               height: "20px",
// // //                               cursor: "pointer",
// // //                             }}
// // //                           />
// // //                           <div
// // //                             style={{
// // //                               width: "40px",
// // //                               height: "40px",
// // //                               borderRadius: "8px",
// // //                               background: "#E0E7FF",
// // //                               display: "flex",
// // //                               alignItems: "center",
// // //                               justifyContent: "center",
// // //                               color: "#6366F1",
// // //                             }}
// // //                           >
// // //                             <Home size={20} />
// // //                           </div>
// // //                           <div style={{ flex: 1 }}>
// // //                             <div
// // //                               style={{
// // //                                 fontSize: "16px",
// // //                                 fontWeight: 600,
// // //                                 color: "#111827",
// // //                               }}
// // //                             >
// // //                               {household.name}
// // //                             </div>
// // //                             <div style={{ fontSize: "13px", color: "#6B7280" }}>
// // //                               {household.type} • {household.address}
// // //                             </div>
// // //                           </div>
// // //                         </div>

// // //                         {isSelected && (
// // //                           <div
// // //                             style={{
// // //                               marginTop: "12px",
// // //                               paddingTop: "12px",
// // //                               borderTop: "1px solid #E5E7EB",
// // //                             }}
// // //                             onClick={(e) => e.stopPropagation()}
// // //                           >
// // //                             <label
// // //                               style={{
// // //                                 display: "block",
// // //                                 fontSize: "13px",
// // //                                 fontWeight: 600,
// // //                                 color: "#374151",
// // //                                 marginBottom: "8px",
// // //                               }}
// // //                             >
// // //                               Payment Status
// // //                             </label>
// // //                             <select
// // //                               value={selectedHouseholds[household._id]}
// // //                               onChange={(e) =>
// // //                                 handleStatusChange(
// // //                                   household._id,
// // //                                   e.target.value,
// // //                                 )
// // //                               }
// // //                               style={{
// // //                                 width: "100%",
// // //                                 padding: "8px 12px",
// // //                                 border: "1px solid #E5E7EB",
// // //                                 borderRadius: "6px",
// // //                                 fontSize: "14px",
// // //                                 color: "#111827",
// // //                                 background: "white",
// // //                                 cursor: "pointer",
// // //                               }}
// // //                             >
// // //                               <option value="unpaid">Unpaid</option>
// // //                               <option value="paid">Paid</option>
// // //                               <option value="overdue">Overdue</option>
// // //                               <option value="waived">Waived</option>
// // //                               <option value="manual">Manual (Cash)</option>
// // //                             </select>
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     );
// // //                   })}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div
// // //               style={{
// // //                 padding: "20px 32px",
// // //                 borderTop: "1px solid #E5E7EB",
// // //                 display: "flex",
// // //                 justifyContent: "space-between",
// // //                 alignItems: "center",
// // //               }}
// // //             >
// // //               <div style={{ fontSize: "14px", color: "#6B7280" }}>
// // //                 {Object.keys(selectedHouseholds).length} household(s) selected
// // //               </div>
// // //               <div style={{ display: "flex", gap: "12px" }}>
// // //                 <button
// // //                   onClick={() => setShowAssignModal(false)}
// // //                   disabled={assignHouseholdsMutation.isLoading}
// // //                   style={{
// // //                     padding: "12px 24px",
// // //                     background: "white",
// // //                     color: "#374151",
// // //                     fontSize: "14px",
// // //                     fontWeight: 600,
// // //                     borderRadius: "8px",
// // //                     border: "1px solid #E5E7EB",
// // //                     cursor: assignHouseholdsMutation.isLoading
// // //                       ? "not-allowed"
// // //                       : "pointer",
// // //                   }}
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <button
// // //                   onClick={handleAssignHouseholds}
// // //                   disabled={
// // //                     Object.keys(selectedHouseholds).length === 0 ||
// // //                     assignHouseholdsMutation.isLoading
// // //                   }
// // //                   style={{
// // //                     padding: "12px 24px",
// // //                     background:
// // //                       Object.keys(selectedHouseholds).length === 0 ||
// // //                       assignHouseholdsMutation.isLoading
// // //                         ? "#9CA3AF"
// // //                         : "#10B981",
// // //                     color: "white",
// // //                     fontSize: "14px",
// // //                     fontWeight: 600,
// // //                     borderRadius: "8px",
// // //                     border: "none",
// // //                     cursor:
// // //                       Object.keys(selectedHouseholds).length === 0 ||
// // //                       assignHouseholdsMutation.isLoading
// // //                         ? "not-allowed"
// // //                         : "pointer",
// // //                     boxShadow:
// // //                       Object.keys(selectedHouseholds).length === 0 ||
// // //                       assignHouseholdsMutation.isLoading
// // //                         ? "none"
// // //                         : "0 4px 12px rgba(16, 185, 129, 0.3)",
// // //                   }}
// // //                 >
// // //                   {assignHouseholdsMutation.isLoading
// // //                     ? "Assigning..."
// // //                     : "Assign Households"}
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Waive Confirmation Modal */}
// // //       {showWaiveConfirm && (
// // //         <div
// // //           style={{
// // //             position: "fixed",
// // //             top: 0,
// // //             left: 0,
// // //             right: 0,
// // //             bottom: 0,
// // //             background: "rgba(0, 0, 0, 0.5)",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             zIndex: 1000,
// // //             padding: "24px",
// // //           }}
// // //           onClick={() => setShowWaiveConfirm(null)}
// // //         >
// // //           <div
// // //             style={{
// // //               background: "white",
// // //               borderRadius: "16px",
// // //               maxWidth: "500px",
// // //               width: "100%",
// // //               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
// // //             }}
// // //             onClick={(e) => e.stopPropagation()}
// // //           >
// // //             <div
// // //               style={{
// // //                 padding: "24px 32px",
// // //                 borderBottom: "1px solid #E5E7EB",
// // //               }}
// // //             >
// // //               <div
// // //                 style={{
// // //                   width: "56px",
// // //                   height: "56px",
// // //                   borderRadius: "50%",
// // //                   background: "#E0E7FF",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   margin: "0 auto 16px",
// // //                 }}
// // //               >
// // //                 <XCircle size={28} color="#6366F1" />
// // //               </div>
// // //               <h3
// // //                 style={{
// // //                   fontSize: "20px",
// // //                   fontWeight: 700,
// // //                   color: "#111827",
// // //                   textAlign: "center",
// // //                   marginBottom: "8px",
// // //                 }}
// // //               >
// // //                 Waive Payment
// // //               </h3>
// // //               <p
// // //                 style={{
// // //                   fontSize: "14px",
// // //                   color: "#6B7280",
// // //                   textAlign: "center",
// // //                 }}
// // //               >
// // //                 Are you sure you want to waive the payment for{" "}
// // //                 <strong style={{ color: "#111827" }}>
// // //                   {showWaiveConfirm.householdName}
// // //                 </strong>
// // //                 ? This action cannot be undone.
// // //               </p>
// // //             </div>

// // //             {waiveMutation.isError && (
// // //               <div
// // //                 style={{
// // //                   padding: "12px 32px",
// // //                   background: "#FEE2E2",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   gap: "8px",
// // //                 }}
// // //               >
// // //                 <AlertCircle size={16} color="#DC2626" />
// // //                 <span style={{ fontSize: "14px", color: "#DC2626" }}>
// // //                   {waiveMutation.error?.message || "Failed to waive payment"}
// // //                 </span>
// // //               </div>
// // //             )}

// // //             <div
// // //               style={{
// // //                 padding: "20px 32px",
// // //                 display: "flex",
// // //                 gap: "12px",
// // //               }}
// // //             >
// // //               <button
// // //                 onClick={() => setShowWaiveConfirm(null)}
// // //                 disabled={waiveMutation.isLoading}
// // //                 style={{
// // //                   flex: 1,
// // //                   padding: "12px 24px",
// // //                   background: "white",
// // //                   color: "#374151",
// // //                   fontSize: "14px",
// // //                   fontWeight: 600,
// // //                   borderRadius: "8px",
// // //                   border: "1px solid #E5E7EB",
// // //                   cursor: waiveMutation.isLoading ? "not-allowed" : "pointer",
// // //                   opacity: waiveMutation.isLoading ? 0.6 : 1,
// // //                 }}
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 onClick={() =>
// // //                   handleWaiveHousehold(showWaiveConfirm.householdId)
// // //                 }
// // //                 disabled={waiveMutation.isLoading}
// // //                 style={{
// // //                   flex: 1,
// // //                   padding: "12px 24px",
// // //                   background: waiveMutation.isLoading ? "#9CA3AF" : "#6366F1",
// // //                   color: "white",
// // //                   fontSize: "14px",
// // //                   fontWeight: 600,
// // //                   borderRadius: "8px",
// // //                   border: "none",
// // //                   cursor: waiveMutation.isLoading ? "not-allowed" : "pointer",
// // //                   boxShadow: waiveMutation.isLoading
// // //                     ? "none"
// // //                     : "0 4px 12px rgba(99, 102, 241, 0.3)",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   gap: "8px",
// // //                 }}
// // //               >
// // //                 {waiveMutation.isLoading ? (
// // //                   "Waiving..."
// // //                 ) : (
// // //                   <>
// // //                     <XCircle size={16} />
// // //                     Waive Payment
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Manual Payment Confirmation Modal */}
// // //       {showManualPaymentConfirm && (
// // //         <div
// // //           style={{
// // //             position: "fixed",
// // //             top: 0,
// // //             left: 0,
// // //             right: 0,
// // //             bottom: 0,
// // //             background: "rgba(0, 0, 0, 0.5)",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             zIndex: 1000,
// // //             padding: "24px",
// // //           }}
// // //           onClick={() => setShowManualPaymentConfirm(null)}
// // //         >
// // //           <div
// // //             style={{
// // //               background: "white",
// // //               borderRadius: "16px",
// // //               maxWidth: "500px",
// // //               width: "100%",
// // //               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
// // //             }}
// // //             onClick={(e) => e.stopPropagation()}
// // //           >
// // //             <div
// // //               style={{
// // //                 padding: "24px 32px",
// // //                 borderBottom: "1px solid #E5E7EB",
// // //               }}
// // //             >
// // //               <div
// // //                 style={{
// // //                   width: "56px",
// // //                   height: "56px",
// // //                   borderRadius: "50%",
// // //                   background: "#DBEAFE",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   margin: "0 auto 16px",
// // //                 }}
// // //               >
// // //                 <Banknote size={28} color="#3B82F6" />
// // //               </div>
// // //               <h3
// // //                 style={{
// // //                   fontSize: "20px",
// // //                   fontWeight: 700,
// // //                   color: "#111827",
// // //                   textAlign: "center",
// // //                   marginBottom: "8px",
// // //                 }}
// // //               >
// // //                 Record Manual Payment
// // //               </h3>
// // //               <p
// // //                 style={{
// // //                   fontSize: "14px",
// // //                   color: "#6B7280",
// // //                   textAlign: "center",
// // //                   marginBottom: "16px",
// // //                 }}
// // //               >
// // //                 Mark payment as received in cash for{" "}
// // //                 <strong style={{ color: "#111827" }}>
// // //                   {showManualPaymentConfirm.householdName}
// // //                 </strong>
// // //                 ?
// // //               </p>

// // //               {/* Amount Summary */}
// // //               <div
// // //                 style={{
// // //                   padding: "16px",
// // //                   background: "#F9FAFB",
// // //                   borderRadius: "12px",
// // //                   marginTop: "16px",
// // //                 }}
// // //               >
// // //                 <div
// // //                   style={{
// // //                     display: "flex",
// // //                     justifyContent: "space-between",
// // //                     alignItems: "center",
// // //                     marginBottom: "8px",
// // //                   }}
// // //                 >
// // //                   <span
// // //                     style={{
// // //                       fontSize: "13px",
// // //                       color: "#6B7280",
// // //                       fontWeight: 500,
// // //                     }}
// // //                   >
// // //                     Amount Due
// // //                   </span>
// // //                   <span
// // //                     style={{
// // //                       fontSize: "16px",
// // //                       fontWeight: 700,
// // //                       color: "#111827",
// // //                       fontFamily: "monospace",
// // //                     }}
// // //                   >
// // //                     ₦{showManualPaymentConfirm.amountDue.toLocaleString()}
// // //                   </span>
// // //                 </div>
// // //                 <div
// // //                   style={{
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     gap: "8px",
// // //                     marginTop: "12px",
// // //                     padding: "10px 12px",
// // //                     background: "#EFF6FF",
// // //                     borderRadius: "8px",
// // //                   }}
// // //                 >
// // //                   <AlertCircle size={16} color="#3B82F6" />
// // //                   <span
// // //                     style={{
// // //                       fontSize: "12px",
// // //                       color: "#1E40AF",
// // //                     }}
// // //                   >
// // //                     This will mark the full amount as paid via cash
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {manualPaymentMutation.isError && (
// // //               <div
// // //                 style={{
// // //                   padding: "12px 32px",
// // //                   background: "#FEE2E2",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   gap: "8px",
// // //                 }}
// // //               >
// // //                 <AlertCircle size={16} color="#DC2626" />
// // //                 <span style={{ fontSize: "14px", color: "#DC2626" }}>
// // //                   {manualPaymentMutation.error?.message ||
// // //                     "Failed to record payment"}
// // //                 </span>
// // //               </div>
// // //             )}

// // //             <div
// // //               style={{
// // //                 padding: "20px 32px",
// // //                 display: "flex",
// // //                 gap: "12px",
// // //               }}
// // //             >
// // //               <button
// // //                 onClick={() => setShowManualPaymentConfirm(null)}
// // //                 disabled={manualPaymentMutation.isLoading}
// // //                 style={{
// // //                   flex: 1,
// // //                   padding: "12px 24px",
// // //                   background: "white",
// // //                   color: "#374151",
// // //                   fontSize: "14px",
// // //                   fontWeight: 600,
// // //                   borderRadius: "8px",
// // //                   border: "1px solid #E5E7EB",
// // //                   cursor: manualPaymentMutation.isLoading
// // //                     ? "not-allowed"
// // //                     : "pointer",
// // //                   opacity: manualPaymentMutation.isLoading ? 0.6 : 1,
// // //                 }}
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 onClick={() =>
// // //                   handleManualPayment(showManualPaymentConfirm.householdId)
// // //                 }
// // //                 disabled={manualPaymentMutation.isLoading}
// // //                 style={{
// // //                   flex: 1,
// // //                   padding: "12px 24px",
// // //                   background: manualPaymentMutation.isLoading
// // //                     ? "#9CA3AF"
// // //                     : "#3B82F6",
// // //                   color: "white",
// // //                   fontSize: "14px",
// // //                   fontWeight: 600,
// // //                   borderRadius: "8px",
// // //                   border: "none",
// // //                   cursor: manualPaymentMutation.isLoading
// // //                     ? "not-allowed"
// // //                     : "pointer",
// // //                   boxShadow: manualPaymentMutation.isLoading
// // //                     ? "none"
// // //                     : "0 4px 12px rgba(59, 130, 246, 0.3)",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   gap: "8px",
// // //                 }}
// // //               >
// // //                 {manualPaymentMutation.isLoading ? (
// // //                   "Recording..."
// // //                 ) : (
// // //                   <>
// // //                     <Banknote size={16} />
// // //                     Confirm Payment
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Delete Confirmation Modal */}
// // //       {showDeleteConfirm && (
// // //         <div
// // //           style={{
// // //             position: "fixed",
// // //             top: 0,
// // //             left: 0,
// // //             right: 0,
// // //             bottom: 0,
// // //             background: "rgba(0, 0, 0, 0.5)",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             zIndex: 1000,
// // //             padding: "24px",
// // //           }}
// // //           onClick={() => setShowDeleteConfirm(false)}
// // //         >
// // //           <div
// // //             style={{
// // //               background: "white",
// // //               borderRadius: "16px",
// // //               maxWidth: "500px",
// // //               width: "100%",
// // //               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
// // //             }}
// // //             onClick={(e) => e.stopPropagation()}
// // //           >
// // //             <div
// // //               style={{
// // //                 padding: "24px 32px",
// // //                 borderBottom: "1px solid #E5E7EB",
// // //               }}
// // //             >
// // //               <div
// // //                 style={{
// // //                   width: "56px",
// // //                   height: "56px",
// // //                   borderRadius: "50%",
// // //                   background: "#FEE2E2",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   margin: "0 auto 16px",
// // //                 }}
// // //               >
// // //                 <Trash2 size={28} color="#DC2626" />
// // //               </div>
// // //               <h3
// // //                 style={{
// // //                   fontSize: "20px",
// // //                   fontWeight: 700,
// // //                   color: "#111827",
// // //                   textAlign: "center",
// // //                   marginBottom: "8px",
// // //                 }}
// // //               >
// // //                 Delete Household Due
// // //               </h3>
// // //               <p
// // //                 style={{
// // //                   fontSize: "14px",
// // //                   color: "#6B7280",
// // //                   textAlign: "center",
// // //                 }}
// // //               >
// // //                 Are you sure you want to delete{" "}
// // //                 <strong style={{ color: "#111827" }}>"{due.title}"</strong>?
// // //                 This action cannot be undone.
// // //               </p>
// // //               {due.totalAssigned > 0 && (
// // //                 <div
// // //                   style={{
// // //                     marginTop: "12px",
// // //                     padding: "12px",
// // //                     background: "#FEF3C7",
// // //                     borderRadius: "8px",
// // //                     fontSize: "13px",
// // //                     color: "#92400E",
// // //                   }}
// // //                 >
// // //                   <strong>Note:</strong> {due.totalAssigned} household(s) are
// // //                   currently assigned to this due.
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {deleteMutation.isError && (
// // //               <div
// // //                 style={{
// // //                   padding: "12px 32px",
// // //                   background: "#FEE2E2",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   gap: "8px",
// // //                 }}
// // //               >
// // //                 <AlertCircle size={16} color="#DC2626" />
// // //                 <span style={{ fontSize: "14px", color: "#DC2626" }}>
// // //                   {deleteMutation.error?.message ||
// // //                     "Failed to delete due. Some households may have already paid."}
// // //                 </span>
// // //               </div>
// // //             )}

// // //             <div
// // //               style={{
// // //                 padding: "20px 32px",
// // //                 display: "flex",
// // //                 gap: "12px",
// // //               }}
// // //             >
// // //               <button
// // //                 onClick={() => setShowDeleteConfirm(false)}
// // //                 disabled={deleteMutation.isLoading}
// // //                 style={{
// // //                   flex: 1,
// // //                   padding: "12px 24px",
// // //                   background: "white",
// // //                   color: "#374151",
// // //                   fontSize: "14px",
// // //                   fontWeight: 600,
// // //                   borderRadius: "8px",
// // //                   border: "1px solid #E5E7EB",
// // //                   cursor: deleteMutation.isLoading ? "not-allowed" : "pointer",
// // //                   opacity: deleteMutation.isLoading ? 0.6 : 1,
// // //                 }}
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 onClick={handleDeleteDue}
// // //                 disabled={deleteMutation.isLoading}
// // //                 style={{
// // //                   flex: 1,
// // //                   padding: "12px 24px",
// // //                   background: deleteMutation.isLoading ? "#9CA3AF" : "#DC2626",
// // //                   color: "white",
// // //                   fontSize: "14px",
// // //                   fontWeight: 600,
// // //                   borderRadius: "8px",
// // //                   border: "none",
// // //                   cursor: deleteMutation.isLoading ? "not-allowed" : "pointer",
// // //                   boxShadow: deleteMutation.isLoading
// // //                     ? "none"
// // //                     : "0 4px 12px rgba(220, 38, 38, 0.3)",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   gap: "8px",
// // //                 }}
// // //               >
// // //                 {deleteMutation.isLoading ? (
// // //                   "Deleting..."
// // //                 ) : (
// // //                   <>
// // //                     <Trash2 size={16} />
// // //                     Delete Due
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // const StatsCard = ({ title, value, icon, iconBg, iconColor }) => {
// // //   return (
// // //     <div
// // //       style={{
// // //         background: "white",
// // //         borderRadius: "12px",
// // //         padding: "24px",
// // //         boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// // //       }}
// // //     >
// // //       <div
// // //         style={{
// // //           display: "flex",
// // //           justifyContent: "space-between",
// // //           alignItems: "flex-start",
// // //         }}
// // //       >
// // //         <div
// // //           style={{
// // //             width: "48px",
// // //             height: "48px",
// // //             borderRadius: "12px",
// // //             background: iconBg,
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             color: iconColor,
// // //           }}
// // //         >
// // //           {icon}
// // //         </div>
// // //       </div>
// // //       <div
// // //         style={{
// // //           fontSize: "32px",
// // //           fontWeight: 700,
// // //           color: "#111827",
// // //           marginTop: "16px",
// // //           marginBottom: "4px",
// // //           fontFamily: "monospace",
// // //         }}
// // //       >
// // //         {value}
// // //       </div>
// // //       <div style={{ fontSize: "14px", color: "#6B7280", fontWeight: 500 }}>
// // //         {title}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default HouseholdDueDetail;

// // import { useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import {
// //   ArrowLeft,
// //   Edit,
// //   Calendar,
// //   DollarSign,
// //   Users,
// //   CheckCircle,
// //   AlertCircle,
// //   X,
// //   Save,
// //   Plus,
// //   Home,
// //   Trash2,
// //   XCircle,
// //   Banknote,
// //   Search,
// // } from "lucide-react";
// // import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";
// // import { useSelector } from "react-redux";

// // const HouseholdDueDetail = () => {
// //   const { id: dueId } = useParams();
// //   const navigate = useNavigate();
// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const [showAssignModal, setShowAssignModal] = useState(false);
// //   const [selectedHouseholds, setSelectedHouseholds] = useState({});
// //   const [showWaiveConfirm, setShowWaiveConfirm] = useState(null);
// //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
// //   const [showManualPaymentConfirm, setShowManualPaymentConfirm] =
// //     useState(null);
// //   const [assignSearchTerm, setAssignSearchTerm] = useState("");

// //   const { selectedEstate } = useSelector(
// //     (state) => state?.reducer?.estateSlice,
// //   );
// //   const clanId = selectedEstate?._id;

// //   const {
// //     data: dueResponse,
// //     isLoading: loading,
// //     error,
// //   } = useFetchDataV2(`/v1/householdDue/due/${dueId}`, `householdDue-${dueId}`);

// //   const due = dueResponse?.data;

// //   const { data: householdsResponse, isLoading: loadingHouseholds } =
// //     useFetchDataV2(`/v1/household/${clanId}`, `households-${clanId}`);

// //   const allHouseholds = householdsResponse?.data || [];

// //   const updateDueMutation = useMutateDataV2(`householdDue-${dueId}`, "PATCH");
// //   const assignHouseholdsMutation = useMutateDataV2(
// //     `householdDue-${dueId}`,
// //     "POST",
// //   );
// //   const waiveMutation = useMutateDataV2(`householdDue-${dueId}`, "POST");
// //   const deleteMutation = useMutateDataV2(`householdDue-${dueId}`, "DELETE");
// //   const manualPaymentMutation = useMutateDataV2(
// //     `householdDue-${dueId}`,
// //     "POST",
// //   );

// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     dueDate: "",
// //     isActive: true,
// //   });

// //   const getAlreadyAssignedIds = () => {
// //     if (!due?.households) return new Set();
// //     return new Set(due.households.map((h) => h.household._id));
// //   };

// //   const alreadyAssignedIds = getAlreadyAssignedIds();
// //   const availableHouseholds = allHouseholds.filter(
// //     (h) => !alreadyAssignedIds.has(h._id),
// //   );

// //   const filteredAssignHouseholds = availableHouseholds.filter((h) =>
// //     h?.name?.toLowerCase().includes(assignSearchTerm.toLowerCase()),
// //   );

// //   const handleSelectAll = () => {
// //     if (filteredAssignHouseholds.length === 0) return;
// //     const allSelected = {};
// //     filteredAssignHouseholds.forEach((household) => {
// //       allSelected[household._id] = "unpaid";
// //     });
// //     setSelectedHouseholds(allSelected);
// //   };

// //   const handleDeselectAll = () => {
// //     setSelectedHouseholds({});
// //   };

// //   const allSelected =
// //     filteredAssignHouseholds.length > 0 &&
// //     filteredAssignHouseholds.every((h) => selectedHouseholds[h._id]);

// //   const someSelected =
// //     filteredAssignHouseholds.some((h) => selectedHouseholds[h._id]) &&
// //     !allSelected;

// //   const handleOpenEdit = () => {
// //     setFormData({
// //       title: due.title,
// //       description: due.description,
// //       dueDate: due.dueDate
// //         ? new Date(due.dueDate).toISOString().split("T")[0]
// //         : "",
// //       isActive: due.isActive,
// //     });
// //     setShowEditModal(true);
// //   };

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     const updates = {};
// //     if (formData.title !== due.title) updates.title = formData.title;
// //     if (formData.description !== due.description)
// //       updates.description = formData.description;
// //     if (
// //       formData.dueDate !== new Date(due.dueDate).toISOString().split("T")[0]
// //     ) {
// //       updates.dueDate = formData.dueDate;
// //     }
// //     if (formData.isActive !== due.isActive)
// //       updates.isActive = formData.isActive;

// //     if (Object.keys(updates).length === 0) {
// //       setShowEditModal(false);
// //       return;
// //     }

// //     try {
// //       await updateDueMutation.mutateAsync({
// //         url: `/v1/householdDue/due/${dueId}`,
// //         data: updates,
// //       });
// //       setShowEditModal(false);
// //     } catch (error) {
// //       console.error("Error updating due:", error);
// //     }
// //   };

// //   const handleOpenAssign = () => {
// //     setSelectedHouseholds({});
// //     setAssignSearchTerm("");
// //     setShowAssignModal(true);
// //   };

// //   const handleToggleHousehold = (householdId) => {
// //     setSelectedHouseholds((prev) => {
// //       if (prev[householdId]) {
// //         const { [householdId]: removed, ...rest } = prev;
// //         return rest;
// //       } else {
// //         return { ...prev, [householdId]: "unpaid" };
// //       }
// //     });
// //   };

// //   const handleStatusChange = (householdId, status) => {
// //     setSelectedHouseholds((prev) => ({
// //       ...prev,
// //       [householdId]: status,
// //     }));
// //   };

// //   const handleAssignHouseholds = async () => {
// //     const householdIds = Object.keys(selectedHouseholds);
// //     if (householdIds.length === 0) return;

// //     try {
// //       await assignHouseholdsMutation.mutateAsync({
// //         url: `/v1/householdDue/due/${dueId}`,
// //         data: {
// //           householdIds,
// //           statuses: selectedHouseholds,
// //         },
// //       });
// //       setShowAssignModal(false);
// //       setSelectedHouseholds({});
// //       setAssignSearchTerm("");
// //     } catch (error) {
// //       console.error("Error assigning households:", error);
// //     }
// //   };

// //   const handleWaiveHousehold = async (householdId) => {
// //     try {
// //       await waiveMutation.mutateAsync({
// //         url: `/v1/householdDue/waive`,
// //         data: {
// //           householdId: householdId,
// //           duesId: dueId,
// //         },
// //       });
// //       setShowWaiveConfirm(null);
// //     } catch (error) {
// //       console.error("Error waiving household:", error);
// //     }
// //   };

// //   const handleManualPayment = async (householdId) => {
// //     try {
// //       await manualPaymentMutation.mutateAsync({
// //         url: `/v1/householdDue/manual-payment`,
// //         data: {
// //           householdId: householdId,
// //           duesId: dueId,
// //         },
// //       });
// //       setShowManualPaymentConfirm(null);
// //     } catch (error) {
// //       console.error("Error recording manual payment:", error);
// //     }
// //   };

// //   const handleDeleteDue = async () => {
// //     try {
// //       await deleteMutation.mutateAsync({
// //         url: `/v1/householdDue/waive`,
// //         data: {
// //           duesId: dueId,
// //         },
// //       });
// //       setShowDeleteConfirm(false);
// //       navigate(-1);
// //     } catch (error) {
// //       console.error("Error deleting due:", error);
// //     }
// //   };

// //   const canDelete = due && due.totalPaid === 0 && due.collectedTotal === 0;

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "paid":
// //         return { bg: "#D1FAE5", color: "#065F46" };
// //       case "unpaid":
// //         return { bg: "#FEF3C7", color: "#92400E" };
// //       case "overdue":
// //         return { bg: "#FEE2E2", color: "#991B1B" };
// //       case "waived":
// //         return { bg: "#E0E7FF", color: "#3730A3" };
// //       case "manual":
// //         return { bg: "#DBEAFE", color: "#1E40AF" };
// //       default:
// //         return { bg: "#F3F4F6", color: "#6B7280" };
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div
// //         style={{
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           minHeight: "60vh",
// //         }}
// //       >
// //         <p style={{ fontSize: "14px", color: "#6B7280" }}>Loading...</p>
// //       </div>
// //     );
// //   }

// //   if (error || !due) {
// //     return (
// //       <div
// //         style={{
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           minHeight: "60vh",
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: "80px",
// //             height: "80px",
// //             borderRadius: "40px",
// //             background: "#FEE2E2",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             marginBottom: "16px",
// //           }}
// //         >
// //           <AlertCircle size={32} color="#DC2626" />
// //         </div>
// //         <p
// //           style={{
// //             fontSize: "16px",
// //             fontWeight: 600,
// //             color: "#111827",
// //             marginBottom: "8px",
// //           }}
// //         >
// //           Error loading due
// //         </p>
// //         <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "24px" }}>
// //           {error?.message || "Due not found"}
// //         </p>
// //         <button
// //           onClick={() => navigate(-1)}
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
// //           }}
// //         >
// //           Go Back
// //         </button>
// //       </div>
// //     );
// //   }

// //   const isOverdue = new Date(due.dueDate) < new Date();
// //   const completionRate =
// //     due.expectedTotal > 0
// //       ? ((due.collectedTotal / due.expectedTotal) * 100).toFixed(1)
// //       : 0;

// //   return (
// //     <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
// //       <div style={{ marginBottom: "32px" }}>
// //         <button
// //           onClick={() => navigate(-1)}
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             gap: "8px",
// //             padding: "8px 16px",
// //             background: "white",
// //             border: "1px solid #E5E7EB",
// //             borderRadius: "8px",
// //             fontSize: "14px",
// //             fontWeight: 500,
// //             color: "#374151",
// //             cursor: "pointer",
// //             marginBottom: "24px",
// //           }}
// //         >
// //           <ArrowLeft size={16} />
// //           Back to Dues
// //         </button>

// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "flex-start",
// //           }}
// //         >
// //           <div>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: "12px",
// //                 marginBottom: "8px",
// //               }}
// //             >
// //               <h1
// //                 style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}
// //               >
// //                 {due.title}
// //               </h1>
// //               <span
// //                 style={{
// //                   padding: "6px 12px",
// //                   borderRadius: "6px",
// //                   fontSize: "12px",
// //                   fontWeight: 600,
// //                   background: due.isActive ? "#D1FAE5" : "#F3F4F6",
// //                   color: due.isActive ? "#065F46" : "#6B7280",
// //                 }}
// //               >
// //                 {due.isActive ? "Active" : "Inactive"}
// //               </span>
// //             </div>
// //             <p style={{ fontSize: "14px", color: "#6B7280" }}>
// //               {due.description}
// //             </p>
// //           </div>

// //           <div style={{ display: "flex", gap: "12px" }}>
// //             {canDelete && (
// //               <button
// //                 onClick={() => setShowDeleteConfirm(true)}
// //                 style={{
// //                   padding: "12px 24px",
// //                   background: "white",
// //                   color: "#DC2626",
// //                   fontSize: "14px",
// //                   fontWeight: 600,
// //                   borderRadius: "8px",
// //                   border: "2px solid #DC2626",
// //                   cursor: "pointer",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "8px",
// //                   transition: "all 0.2s ease",
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   e.currentTarget.style.background = "#DC2626";
// //                   e.currentTarget.style.color = "white";
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   e.currentTarget.style.background = "white";
// //                   e.currentTarget.style.color = "#DC2626";
// //                 }}
// //               >
// //                 <Trash2 size={16} />
// //                 Delete
// //               </button>
// //             )}
// //             <button
// //               onClick={handleOpenAssign}
// //               style={{
// //                 padding: "12px 24px",
// //                 background: "white",
// //                 color: "#10B981",
// //                 fontSize: "14px",
// //                 fontWeight: 600,
// //                 borderRadius: "8px",
// //                 border: "2px solid #10B981",
// //                 cursor: "pointer",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: "8px",
// //               }}
// //             >
// //               <Plus size={16} />
// //               Assign Households
// //             </button>
// //             <button
// //               onClick={handleOpenEdit}
// //               style={{
// //                 padding: "12px 24px",
// //                 background: "#10B981",
// //                 color: "white",
// //                 fontSize: "14px",
// //                 fontWeight: 600,
// //                 borderRadius: "8px",
// //                 border: "none",
// //                 cursor: "pointer",
// //                 boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: "8px",
// //               }}
// //             >
// //               <Edit size={16} />
// //               Edit Due
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Stats */}
// //       <div
// //         style={{
// //           display: "grid",
// //           gridTemplateColumns: "repeat(4, 1fr)",
// //           gap: "24px",
// //           marginBottom: "32px",
// //         }}
// //       >
// //         <StatsCard
// //           title="Default Amount"
// //           value={`₦${due.defaultAmount.toLocaleString()}`}
// //           icon={<DollarSign size={24} />}
// //           iconBg="#FEF3C7"
// //           iconColor="#F59E0B"
// //         />
// //         <StatsCard
// //           title="Expected Total"
// //           value={`₦${due.expectedTotal.toLocaleString()}`}
// //           icon={<DollarSign size={24} />}
// //           iconBg="#DBEAFE"
// //           iconColor="#3B82F6"
// //         />
// //         <StatsCard
// //           title="Collected"
// //           value={`₦${due.collectedTotal.toLocaleString()}`}
// //           icon={<CheckCircle size={24} />}
// //           iconBg="#D1FAE5"
// //           iconColor="#10B981"
// //         />
// //         <StatsCard
// //           title="Outstanding"
// //           value={`₦${due.outstandingTotal.toLocaleString()}`}
// //           icon={<AlertCircle size={24} />}
// //           iconBg="#FEE2E2"
// //           iconColor="#DC2626"
// //         />
// //       </div>

// //       <div
// //         style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}
// //       >
// //         <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
// //           {/* Payment Progress */}
// //           <div
// //             style={{
// //               background: "white",
// //               borderRadius: "12px",
// //               padding: "24px",
// //               boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// //             }}
// //           >
// //             <h3
// //               style={{
// //                 fontSize: "18px",
// //                 fontWeight: 700,
// //                 color: "#111827",
// //                 marginBottom: "20px",
// //               }}
// //             >
// //               Payment Progress
// //             </h3>
// //             <div
// //               style={{
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(2, 1fr)",
// //                 gap: "24px",
// //                 marginBottom: "24px",
// //               }}
// //             >
// //               <div>
// //                 <div
// //                   style={{
// //                     fontSize: "12px",
// //                     color: "#9CA3AF",
// //                     marginBottom: "8px",
// //                   }}
// //                 >
// //                   Total Assigned
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "24px",
// //                     fontWeight: 700,
// //                     color: "#111827",
// //                   }}
// //                 >
// //                   {due.totalAssigned}
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "13px",
// //                     color: "#6B7280",
// //                     marginTop: "4px",
// //                   }}
// //                 >
// //                   households
// //                 </div>
// //               </div>
// //               <div>
// //                 <div
// //                   style={{
// //                     fontSize: "12px",
// //                     color: "#9CA3AF",
// //                     marginBottom: "8px",
// //                   }}
// //                 >
// //                   Must Pay
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "24px",
// //                     fontWeight: 700,
// //                     color: "#111827",
// //                   }}
// //                 >
// //                   {due.totalMustPay}
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "13px",
// //                     color: "#6B7280",
// //                     marginTop: "4px",
// //                   }}
// //                 >
// //                   households
// //                 </div>
// //               </div>
// //               <div>
// //                 <div
// //                   style={{
// //                     fontSize: "12px",
// //                     color: "#9CA3AF",
// //                     marginBottom: "8px",
// //                   }}
// //                 >
// //                   Paid
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "24px",
// //                     fontWeight: 700,
// //                     color: "#10B981",
// //                   }}
// //                 >
// //                   {due.totalPaid}
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "13px",
// //                     color: "#6B7280",
// //                     marginTop: "4px",
// //                   }}
// //                 >
// //                   households
// //                 </div>
// //               </div>
// //               <div>
// //                 <div
// //                   style={{
// //                     fontSize: "12px",
// //                     color: "#9CA3AF",
// //                     marginBottom: "8px",
// //                   }}
// //                 >
// //                   Exempted
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "24px",
// //                     fontWeight: 700,
// //                     color: "#6B7280",
// //                   }}
// //                 >
// //                   {due.totalExempted}
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "13px",
// //                     color: "#6B7280",
// //                     marginTop: "4px",
// //                   }}
// //                 >
// //                   households
// //                 </div>
// //               </div>
// //             </div>
// //             <div>
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   alignItems: "center",
// //                   marginBottom: "8px",
// //                 }}
// //               >
// //                 <span
// //                   style={{
// //                     fontSize: "14px",
// //                     fontWeight: 600,
// //                     color: "#111827",
// //                   }}
// //                 >
// //                   Completion Rate
// //                 </span>
// //                 <span
// //                   style={{
// //                     fontSize: "18px",
// //                     fontWeight: 700,
// //                     color: "#10B981",
// //                   }}
// //                 >
// //                   {completionRate}%
// //                 </span>
// //               </div>
// //               <div
// //                 style={{
// //                   width: "100%",
// //                   height: "12px",
// //                   background: "#F3F4F6",
// //                   borderRadius: "6px",
// //                   overflow: "hidden",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     width: `${completionRate}%`,
// //                     height: "100%",
// //                     background: "#10B981",
// //                     transition: "width 0.3s ease",
// //                   }}
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Assigned Households */}
// //           <div
// //             style={{
// //               background: "white",
// //               borderRadius: "12px",
// //               padding: "24px",
// //               boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// //             }}
// //           >
// //             <h3
// //               style={{
// //                 fontSize: "18px",
// //                 fontWeight: 700,
// //                 color: "#111827",
// //                 marginBottom: "16px",
// //               }}
// //             >
// //               Assigned Households ({due.households?.length || 0})
// //             </h3>
// //             {due.households && due.households.length > 0 ? (
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: "12px",
// //                 }}
// //               >
// //                 {due.households.map((item) => {
// //                   const statusStyle = getStatusColor(item.status);
// //                   const canWaive =
// //                     item.status !== "paid" &&
// //                     item.status !== "waived" &&
// //                     item.status !== "manual";
// //                   const canMarkManual =
// //                     item.status !== "paid" &&
// //                     item.status !== "waived" &&
// //                     item.status !== "manual";

// //                   return (
// //                     <div
// //                       key={item._id}
// //                       style={{
// //                         padding: "16px",
// //                         background: "#F9FAFB",
// //                         borderRadius: "10px",
// //                       }}
// //                     >
// //                       <div
// //                         style={{
// //                           display: "flex",
// //                           justifyContent: "space-between",
// //                           alignItems: "flex-start",
// //                         }}
// //                       >
// //                         <div style={{ flex: 1 }}>
// //                           <div
// //                             style={{
// //                               display: "flex",
// //                               alignItems: "center",
// //                               gap: "12px",
// //                               marginBottom: "8px",
// //                             }}
// //                           >
// //                             <div
// //                               style={{
// //                                 width: "40px",
// //                                 height: "40px",
// //                                 borderRadius: "8px",
// //                                 background: "#E0E7FF",
// //                                 display: "flex",
// //                                 alignItems: "center",
// //                                 justifyContent: "center",
// //                                 color: "#6366F1",
// //                               }}
// //                             >
// //                               <Home size={20} />
// //                             </div>
// //                             <div>
// //                               <div
// //                                 style={{
// //                                   fontSize: "16px",
// //                                   fontWeight: 600,
// //                                   color: "#111827",
// //                                 }}
// //                               >
// //                                 {item.household.name}
// //                               </div>
// //                               <div
// //                                 style={{ fontSize: "13px", color: "#6B7280" }}
// //                               >
// //                                 {item.household.type} • {item.household.address}
// //                               </div>
// //                             </div>
// //                           </div>
// //                           <div
// //                             style={{
// //                               display: "flex",
// //                               gap: "16px",
// //                               marginTop: "8px",
// //                               fontSize: "13px",
// //                             }}
// //                           >
// //                             <div>
// //                               <span style={{ color: "#9CA3AF" }}>
// //                                 Amount Due:{" "}
// //                               </span>
// //                               <span
// //                                 style={{
// //                                   fontWeight: 600,
// //                                   color: "#111827",
// //                                   fontFamily: "monospace",
// //                                 }}
// //                               >
// //                                 ₦{item.amountDue.toLocaleString()}
// //                               </span>
// //                             </div>
// //                             <div>
// //                               <span style={{ color: "#9CA3AF" }}>
// //                                 Amount Paid:{" "}
// //                               </span>
// //                               <span
// //                                 style={{
// //                                   fontWeight: 600,
// //                                   color: "#10B981",
// //                                   fontFamily: "monospace",
// //                                 }}
// //                               >
// //                                 ₦{item.amountPaid.toLocaleString()}
// //                               </span>
// //                             </div>
// //                           </div>
// //                         </div>

// //                         <div
// //                           style={{
// //                             display: "flex",
// //                             alignItems: "center",
// //                             gap: "8px",
// //                             marginLeft: "16px",
// //                           }}
// //                         >
// //                           <span
// //                             style={{
// //                               padding: "6px 12px",
// //                               borderRadius: "6px",
// //                               fontSize: "12px",
// //                               fontWeight: 600,
// //                               background: statusStyle.bg,
// //                               color: statusStyle.color,
// //                               textTransform: "capitalize",
// //                             }}
// //                           >
// //                             {item.status}
// //                           </span>

// //                           {canMarkManual && (
// //                             <button
// //                               onClick={() =>
// //                                 setShowManualPaymentConfirm({
// //                                   householdId: item.household._id,
// //                                   householdName: item.household.name,
// //                                   amountDue: item.amountDue,
// //                                 })
// //                               }
// //                               style={{
// //                                 padding: "6px 12px",
// //                                 background: "white",
// //                                 color: "#3B82F6",
// //                                 fontSize: "12px",
// //                                 fontWeight: 600,
// //                                 borderRadius: "6px",
// //                                 border: "2px solid #3B82F6",
// //                                 cursor: "pointer",
// //                                 display: "flex",
// //                                 alignItems: "center",
// //                                 gap: "6px",
// //                                 transition: "all 0.2s ease",
// //                               }}
// //                               onMouseEnter={(e) => {
// //                                 e.currentTarget.style.background = "#3B82F6";
// //                                 e.currentTarget.style.color = "white";
// //                               }}
// //                               onMouseLeave={(e) => {
// //                                 e.currentTarget.style.background = "white";
// //                                 e.currentTarget.style.color = "#3B82F6";
// //                               }}
// //                             >
// //                               <Banknote size={14} />
// //                               Cash
// //                             </button>
// //                           )}

// //                           {canWaive && (
// //                             <button
// //                               onClick={() =>
// //                                 setShowWaiveConfirm({
// //                                   householdId: item.household._id,
// //                                   householdName: item.household.name,
// //                                 })
// //                               }
// //                               style={{
// //                                 padding: "6px 12px",
// //                                 background: "white",
// //                                 color: "#6366F1",
// //                                 fontSize: "12px",
// //                                 fontWeight: 600,
// //                                 borderRadius: "6px",
// //                                 border: "2px solid #6366F1",
// //                                 cursor: "pointer",
// //                                 display: "flex",
// //                                 alignItems: "center",
// //                                 gap: "6px",
// //                                 transition: "all 0.2s ease",
// //                               }}
// //                               onMouseEnter={(e) => {
// //                                 e.currentTarget.style.background = "#6366F1";
// //                                 e.currentTarget.style.color = "white";
// //                               }}
// //                               onMouseLeave={(e) => {
// //                                 e.currentTarget.style.background = "white";
// //                                 e.currentTarget.style.color = "#6366F1";
// //                               }}
// //                             >
// //                               <XCircle size={14} />
// //                               Waive
// //                             </button>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             ) : (
// //               <div
// //                 style={{
// //                   padding: "32px",
// //                   textAlign: "center",
// //                   background: "#F9FAFB",
// //                   borderRadius: "8px",
// //                 }}
// //               >
// //                 <Users
// //                   size={32}
// //                   color="#D1D5DB"
// //                   style={{ margin: "0 auto 12px" }}
// //                 />
// //                 <p style={{ fontSize: "14px", color: "#6B7280" }}>
// //                   No households assigned yet
// //                 </p>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Due Information */}
// //         <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
// //           <div
// //             style={{
// //               background: "white",
// //               borderRadius: "12px",
// //               padding: "24px",
// //               boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// //             }}
// //           >
// //             <h3
// //               style={{
// //                 fontSize: "18px",
// //                 fontWeight: 700,
// //                 color: "#111827",
// //                 marginBottom: "20px",
// //               }}
// //             >
// //               Due Information
// //             </h3>
// //             <div
// //               style={{ display: "flex", flexDirection: "column", gap: "16px" }}
// //             >
// //               <div>
// //                 <div
// //                   style={{
// //                     fontSize: "12px",
// //                     color: "#9CA3AF",
// //                     marginBottom: "4px",
// //                   }}
// //                 >
// //                   Due Date
// //                 </div>
// //                 <div
// //                   style={{
// //                     display: "inline-flex",
// //                     alignItems: "center",
// //                     gap: "8px",
// //                     padding: "8px 12px",
// //                     borderRadius: "8px",
// //                     background: isOverdue ? "#FEE2E2" : "#DBEAFE",
// //                   }}
// //                 >
// //                   <Calendar
// //                     size={16}
// //                     color={isOverdue ? "#DC2626" : "#3B82F6"}
// //                   />
// //                   <span
// //                     style={{
// //                       fontSize: "14px",
// //                       fontWeight: 600,
// //                       color: isOverdue ? "#DC2626" : "#3B82F6",
// //                     }}
// //                   >
// //                     {new Date(due.dueDate).toLocaleDateString("en-US", {
// //                       month: "long",
// //                       day: "numeric",
// //                       year: "numeric",
// //                     })}
// //                   </span>
// //                 </div>
// //               </div>
// //               <div>
// //                 <div
// //                   style={{
// //                     fontSize: "12px",
// //                     color: "#9CA3AF",
// //                     marginBottom: "4px",
// //                   }}
// //                 >
// //                   Category
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "14px",
// //                     fontWeight: 500,
// //                     color: "#111827",
// //                     textTransform: "capitalize",
// //                   }}
// //                 >
// //                   {due.category.replace(/_/g, " ")}
// //                 </div>
// //               </div>
// //               <div>
// //                 <div
// //                   style={{
// //                     fontSize: "12px",
// //                     color: "#9CA3AF",
// //                     marginBottom: "4px",
// //                   }}
// //                 >
// //                   Created By
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "14px",
// //                     fontWeight: 500,
// //                     color: "#111827",
// //                   }}
// //                 >
// //                   {due.createdBy?.name || due.createdBy?.email || "N/A"}
// //                 </div>
// //               </div>
// //               <div>
// //                 <div
// //                   style={{
// //                     fontSize: "12px",
// //                     color: "#9CA3AF",
// //                     marginBottom: "4px",
// //                   }}
// //                 >
// //                   Created At
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "14px",
// //                     fontWeight: 500,
// //                     color: "#111827",
// //                   }}
// //                 >
// //                   {new Date(due.createdAt).toLocaleDateString("en-US", {
// //                     month: "short",
// //                     day: "numeric",
// //                     year: "numeric",
// //                   })}
// //                 </div>
// //               </div>
// //               <div>
// //                 <div
// //                   style={{
// //                     fontSize: "12px",
// //                     color: "#9CA3AF",
// //                     marginBottom: "4px",
// //                   }}
// //                 >
// //                   Last Updated
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "14px",
// //                     fontWeight: 500,
// //                     color: "#111827",
// //                   }}
// //                 >
// //                   {new Date(due.updatedAt).toLocaleDateString("en-US", {
// //                     month: "short",
// //                     day: "numeric",
// //                     year: "numeric",
// //                   })}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── Edit Modal ── */}
// //       {showEditModal && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             background: "rgba(0,0,0,0.5)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             zIndex: 1000,
// //             padding: "24px",
// //           }}
// //           onClick={() => setShowEditModal(false)}
// //         >
// //           <div
// //             style={{
// //               background: "white",
// //               borderRadius: "16px",
// //               maxWidth: "600px",
// //               width: "100%",
// //               maxHeight: "90vh",
// //               overflow: "hidden",
// //               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
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
// //                 style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}
// //               >
// //                 Edit Due
// //               </h3>
// //               <button
// //                 onClick={() => setShowEditModal(false)}
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
// //             <form onSubmit={handleUpdate} style={{ padding: "32px" }}>
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
// //                     boxSizing: "border-box",
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
// //                     boxSizing: "border-box",
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
// //                   Due Date
// //                 </label>
// //                 <input
// //                   type="date"
// //                   value={formData.dueDate}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, dueDate: e.target.value })
// //                   }
// //                   style={{
// //                     width: "100%",
// //                     padding: "12px 16px",
// //                     border: "1px solid #E5E7EB",
// //                     borderRadius: "8px",
// //                     fontSize: "14px",
// //                     color: "#111827",
// //                     background: "white",
// //                     boxSizing: "border-box",
// //                   }}
// //                 />
// //               </div>
// //               <div style={{ marginBottom: "32px" }}>
// //                 <label
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "12px",
// //                     cursor: "pointer",
// //                   }}
// //                 >
// //                   <input
// //                     type="checkbox"
// //                     checked={formData.isActive}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, isActive: e.target.checked })
// //                     }
// //                     style={{ width: "20px", height: "20px", cursor: "pointer" }}
// //                   />
// //                   <span
// //                     style={{
// //                       fontSize: "14px",
// //                       fontWeight: 600,
// //                       color: "#374151",
// //                     }}
// //                   >
// //                     Active
// //                   </span>
// //                 </label>
// //                 <p
// //                   style={{
// //                     fontSize: "13px",
// //                     color: "#6B7280",
// //                     marginTop: "8px",
// //                     marginLeft: "32px",
// //                   }}
// //                 >
// //                   Inactive dues won't be visible to households
// //                 </p>
// //               </div>
// //               {updateDueMutation.isError && (
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
// //                     {updateDueMutation.error?.message ||
// //                       "Failed to update due. Please try again."}
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
// //                   onClick={() => setShowEditModal(false)}
// //                   disabled={updateDueMutation.isLoading}
// //                   style={{
// //                     padding: "12px 24px",
// //                     background: "white",
// //                     color: "#374151",
// //                     fontSize: "14px",
// //                     fontWeight: 600,
// //                     borderRadius: "8px",
// //                     border: "1px solid #E5E7EB",
// //                     cursor: updateDueMutation.isLoading
// //                       ? "not-allowed"
// //                       : "pointer",
// //                     opacity: updateDueMutation.isLoading ? 0.6 : 1,
// //                   }}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   disabled={updateDueMutation.isLoading}
// //                   style={{
// //                     padding: "12px 24px",
// //                     background: updateDueMutation.isLoading
// //                       ? "#9CA3AF"
// //                       : "#10B981",
// //                     color: "white",
// //                     fontSize: "14px",
// //                     fontWeight: 600,
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor: updateDueMutation.isLoading
// //                       ? "not-allowed"
// //                       : "pointer",
// //                     boxShadow: updateDueMutation.isLoading
// //                       ? "none"
// //                       : "0 4px 12px rgba(16,185,129,0.3)",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "8px",
// //                   }}
// //                 >
// //                   {updateDueMutation.isLoading ? (
// //                     "Saving..."
// //                   ) : (
// //                     <>
// //                       <Save size={16} />
// //                       Save Changes
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── Assign Households Modal ── */}
// //       {showAssignModal && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             background: "rgba(0,0,0,0.5)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             zIndex: 1000,
// //             padding: "24px",
// //           }}
// //           onClick={() => setShowAssignModal(false)}
// //         >
// //           <div
// //             style={{
// //               background: "white",
// //               borderRadius: "16px",
// //               maxWidth: "700px",
// //               width: "100%",
// //               maxHeight: "90vh",
// //               overflow: "hidden",
// //               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
// //               display: "flex",
// //               flexDirection: "column",
// //             }}
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             {/* Header */}
// //             <div
// //               style={{
// //                 padding: "24px 32px",
// //                 borderBottom: "1px solid #E5E7EB",
// //                 flexShrink: 0,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   alignItems: "center",
// //                   marginBottom: "16px",
// //                 }}
// //               >
// //                 <h3
// //                   style={{
// //                     fontSize: "20px",
// //                     fontWeight: 700,
// //                     color: "#111827",
// //                   }}
// //                 >
// //                   Assign Households
// //                 </h3>
// //                 <button
// //                   onClick={() => setShowAssignModal(false)}
// //                   style={{
// //                     width: "36px",
// //                     height: "36px",
// //                     borderRadius: "8px",
// //                     background: "#F3F4F6",
// //                     border: "none",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     cursor: "pointer",
// //                     color: "#6B7280",
// //                   }}
// //                 >
// //                   <X size={20} />
// //                 </button>
// //               </div>

// //               {/* Search input */}
// //               <div style={{ position: "relative", marginBottom: "12px" }}>
// //                 <Search
// //                   size={16}
// //                   color="#9CA3AF"
// //                   style={{
// //                     position: "absolute",
// //                     left: "12px",
// //                     top: "50%",
// //                     transform: "translateY(-50%)",
// //                   }}
// //                 />
// //                 <input
// //                   type="text"
// //                   placeholder="Search households by name..."
// //                   value={assignSearchTerm}
// //                   onChange={(e) => setAssignSearchTerm(e.target.value)}
// //                   style={{
// //                     width: "100%",
// //                     padding: "10px 14px 10px 36px",
// //                     border: "1px solid #E5E7EB",
// //                     borderRadius: "8px",
// //                     fontSize: "14px",
// //                     color: "#111827",
// //                     background: "white",
// //                     boxSizing: "border-box",
// //                     outline: "none",
// //                   }}
// //                 />
// //               </div>

// //               {/* Select all bar */}
// //               {filteredAssignHouseholds.length > 0 && (
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     justifyContent: "space-between",
// //                     alignItems: "center",
// //                     padding: "12px 16px",
// //                     background: "#F9FAFB",
// //                     borderRadius: "8px",
// //                   }}
// //                 >
// //                   <label
// //                     style={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       gap: "12px",
// //                       cursor: "pointer",
// //                     }}
// //                     onClick={(e) => {
// //                       e.preventDefault();
// //                       allSelected ? handleDeselectAll() : handleSelectAll();
// //                     }}
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={allSelected}
// //                       ref={(input) => {
// //                         if (input) input.indeterminate = someSelected;
// //                       }}
// //                       onChange={() => {
// //                         allSelected ? handleDeselectAll() : handleSelectAll();
// //                       }}
// //                       style={{
// //                         width: "20px",
// //                         height: "20px",
// //                         cursor: "pointer",
// //                       }}
// //                     />
// //                     <span
// //                       style={{
// //                         fontSize: "14px",
// //                         fontWeight: 600,
// //                         color: "#374151",
// //                       }}
// //                     >
// //                       {allSelected
// //                         ? "Deselect All"
// //                         : someSelected
// //                           ? `Select All (${Object.keys(selectedHouseholds).length} selected)`
// //                           : "Select All"}
// //                     </span>
// //                   </label>
// //                   <span style={{ fontSize: "13px", color: "#6B7280" }}>
// //                     {filteredAssignHouseholds.length}{" "}
// //                     {assignSearchTerm ? "found" : "available"}
// //                   </span>
// //                 </div>
// //               )}
// //             </div>

// //             {/* List */}
// //             <div style={{ padding: "24px 32px", overflowY: "auto", flex: 1 }}>
// //               {loadingHouseholds ? (
// //                 <div style={{ padding: "32px", textAlign: "center" }}>
// //                   <p style={{ fontSize: "14px", color: "#6B7280" }}>
// //                     Loading households...
// //                   </p>
// //                 </div>
// //               ) : filteredAssignHouseholds.length === 0 ? (
// //                 <div style={{ padding: "32px", textAlign: "center" }}>
// //                   <Users
// //                     size={48}
// //                     color="#D1D5DB"
// //                     style={{ margin: "0 auto 16px" }}
// //                   />
// //                   <p
// //                     style={{
// //                       fontSize: "16px",
// //                       fontWeight: 600,
// //                       color: "#111827",
// //                     }}
// //                   >
// //                     {assignSearchTerm
// //                       ? "No households match your search"
// //                       : "No households available"}
// //                   </p>
// //                   <p
// //                     style={{
// //                       fontSize: "14px",
// //                       color: "#6B7280",
// //                       marginTop: "8px",
// //                     }}
// //                   >
// //                     {assignSearchTerm
// //                       ? "Try a different name"
// //                       : "All households have been assigned to this due"}
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     gap: "12px",
// //                   }}
// //                 >
// //                   {filteredAssignHouseholds.map((household) => {
// //                     const isSelected = selectedHouseholds[household._id];
// //                     return (
// //                       <div
// //                         key={household._id}
// //                         style={{
// //                           padding: "16px",
// //                           background: isSelected ? "#F0FDF4" : "#F9FAFB",
// //                           border: isSelected
// //                             ? "2px solid #10B981"
// //                             : "2px solid transparent",
// //                           borderRadius: "10px",
// //                           cursor: "pointer",
// //                           transition: "all 0.2s ease",
// //                         }}
// //                         onClick={() => handleToggleHousehold(household._id)}
// //                       >
// //                         <div
// //                           style={{
// //                             display: "flex",
// //                             alignItems: "center",
// //                             gap: "12px",
// //                           }}
// //                         >
// //                           <input
// //                             type="checkbox"
// //                             checked={!!isSelected}
// //                             onChange={() =>
// //                               handleToggleHousehold(household._id)
// //                             }
// //                             onClick={(e) => e.stopPropagation()}
// //                             style={{
// //                               width: "20px",
// //                               height: "20px",
// //                               cursor: "pointer",
// //                             }}
// //                           />
// //                           <div
// //                             style={{
// //                               width: "40px",
// //                               height: "40px",
// //                               borderRadius: "8px",
// //                               background: "#E0E7FF",
// //                               display: "flex",
// //                               alignItems: "center",
// //                               justifyContent: "center",
// //                               color: "#6366F1",
// //                             }}
// //                           >
// //                             <Home size={20} />
// //                           </div>
// //                           <div style={{ flex: 1 }}>
// //                             <div
// //                               style={{
// //                                 fontSize: "16px",
// //                                 fontWeight: 600,
// //                                 color: "#111827",
// //                               }}
// //                             >
// //                               {household.name}
// //                             </div>
// //                             <div style={{ fontSize: "13px", color: "#6B7280" }}>
// //                               {household.type} • {household.address}
// //                             </div>
// //                           </div>
// //                         </div>

// //                         {isSelected && (
// //                           <div
// //                             style={{
// //                               marginTop: "12px",
// //                               paddingTop: "12px",
// //                               borderTop: "1px solid #E5E7EB",
// //                             }}
// //                             onClick={(e) => e.stopPropagation()}
// //                           >
// //                             <label
// //                               style={{
// //                                 display: "block",
// //                                 fontSize: "13px",
// //                                 fontWeight: 600,
// //                                 color: "#374151",
// //                                 marginBottom: "8px",
// //                               }}
// //                             >
// //                               Payment Status
// //                             </label>
// //                             <select
// //                               value={selectedHouseholds[household._id]}
// //                               onChange={(e) =>
// //                                 handleStatusChange(
// //                                   household._id,
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               style={{
// //                                 width: "100%",
// //                                 padding: "8px 12px",
// //                                 border: "1px solid #E5E7EB",
// //                                 borderRadius: "6px",
// //                                 fontSize: "14px",
// //                                 color: "#111827",
// //                                 background: "white",
// //                                 cursor: "pointer",
// //                               }}
// //                             >
// //                               <option value="unpaid">Unpaid</option>
// //                               <option value="paid">Paid</option>
// //                               <option value="overdue">Overdue</option>
// //                               <option value="waived">Waived</option>
// //                               <option value="manual">Manual (Cash)</option>
// //                             </select>
// //                           </div>
// //                         )}
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Footer */}
// //             <div
// //               style={{
// //                 padding: "20px 32px",
// //                 borderTop: "1px solid #E5E7EB",
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //                 flexShrink: 0,
// //               }}
// //             >
// //               <div style={{ fontSize: "14px", color: "#6B7280" }}>
// //                 {Object.keys(selectedHouseholds).length} household(s) selected
// //               </div>
// //               <div style={{ display: "flex", gap: "12px" }}>
// //                 <button
// //                   onClick={() => setShowAssignModal(false)}
// //                   disabled={assignHouseholdsMutation.isLoading}
// //                   style={{
// //                     padding: "12px 24px",
// //                     background: "white",
// //                     color: "#374151",
// //                     fontSize: "14px",
// //                     fontWeight: 600,
// //                     borderRadius: "8px",
// //                     border: "1px solid #E5E7EB",
// //                     cursor: assignHouseholdsMutation.isLoading
// //                       ? "not-allowed"
// //                       : "pointer",
// //                   }}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={handleAssignHouseholds}
// //                   disabled={
// //                     Object.keys(selectedHouseholds).length === 0 ||
// //                     assignHouseholdsMutation.isLoading
// //                   }
// //                   style={{
// //                     padding: "12px 24px",
// //                     background:
// //                       Object.keys(selectedHouseholds).length === 0 ||
// //                       assignHouseholdsMutation.isLoading
// //                         ? "#9CA3AF"
// //                         : "#10B981",
// //                     color: "white",
// //                     fontSize: "14px",
// //                     fontWeight: 600,
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor:
// //                       Object.keys(selectedHouseholds).length === 0 ||
// //                       assignHouseholdsMutation.isLoading
// //                         ? "not-allowed"
// //                         : "pointer",
// //                     boxShadow:
// //                       Object.keys(selectedHouseholds).length === 0 ||
// //                       assignHouseholdsMutation.isLoading
// //                         ? "none"
// //                         : "0 4px 12px rgba(16,185,129,0.3)",
// //                   }}
// //                 >
// //                   {assignHouseholdsMutation.isLoading
// //                     ? "Assigning..."
// //                     : "Assign Households"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── Waive Confirmation Modal ── */}
// //       {showWaiveConfirm && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             background: "rgba(0,0,0,0.5)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             zIndex: 1000,
// //             padding: "24px",
// //           }}
// //           onClick={() => setShowWaiveConfirm(null)}
// //         >
// //           <div
// //             style={{
// //               background: "white",
// //               borderRadius: "16px",
// //               maxWidth: "500px",
// //               width: "100%",
// //               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
// //             }}
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <div
// //               style={{
// //                 padding: "24px 32px",
// //                 borderBottom: "1px solid #E5E7EB",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: "56px",
// //                   height: "56px",
// //                   borderRadius: "50%",
// //                   background: "#E0E7FF",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   margin: "0 auto 16px",
// //                 }}
// //               >
// //                 <XCircle size={28} color="#6366F1" />
// //               </div>
// //               <h3
// //                 style={{
// //                   fontSize: "20px",
// //                   fontWeight: 700,
// //                   color: "#111827",
// //                   textAlign: "center",
// //                   marginBottom: "8px",
// //                 }}
// //               >
// //                 Waive Payment
// //               </h3>
// //               <p
// //                 style={{
// //                   fontSize: "14px",
// //                   color: "#6B7280",
// //                   textAlign: "center",
// //                 }}
// //               >
// //                 Are you sure you want to waive the payment for{" "}
// //                 <strong style={{ color: "#111827" }}>
// //                   {showWaiveConfirm.householdName}
// //                 </strong>
// //                 ? This action cannot be undone.
// //               </p>
// //             </div>
// //             {waiveMutation.isError && (
// //               <div
// //                 style={{
// //                   padding: "12px 32px",
// //                   background: "#FEE2E2",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "8px",
// //                 }}
// //               >
// //                 <AlertCircle size={16} color="#DC2626" />
// //                 <span style={{ fontSize: "14px", color: "#DC2626" }}>
// //                   {waiveMutation.error?.message || "Failed to waive payment"}
// //                 </span>
// //               </div>
// //             )}
// //             <div style={{ padding: "20px 32px", display: "flex", gap: "12px" }}>
// //               <button
// //                 onClick={() => setShowWaiveConfirm(null)}
// //                 disabled={waiveMutation.isLoading}
// //                 style={{
// //                   flex: 1,
// //                   padding: "12px 24px",
// //                   background: "white",
// //                   color: "#374151",
// //                   fontSize: "14px",
// //                   fontWeight: 600,
// //                   borderRadius: "8px",
// //                   border: "1px solid #E5E7EB",
// //                   cursor: waiveMutation.isLoading ? "not-allowed" : "pointer",
// //                   opacity: waiveMutation.isLoading ? 0.6 : 1,
// //                 }}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={() =>
// //                   handleWaiveHousehold(showWaiveConfirm.householdId)
// //                 }
// //                 disabled={waiveMutation.isLoading}
// //                 style={{
// //                   flex: 1,
// //                   padding: "12px 24px",
// //                   background: waiveMutation.isLoading ? "#9CA3AF" : "#6366F1",
// //                   color: "white",
// //                   fontSize: "14px",
// //                   fontWeight: 600,
// //                   borderRadius: "8px",
// //                   border: "none",
// //                   cursor: waiveMutation.isLoading ? "not-allowed" : "pointer",
// //                   boxShadow: waiveMutation.isLoading
// //                     ? "none"
// //                     : "0 4px 12px rgba(99,102,241,0.3)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   gap: "8px",
// //                 }}
// //               >
// //                 {waiveMutation.isLoading ? (
// //                   "Waiving..."
// //                 ) : (
// //                   <>
// //                     <XCircle size={16} />
// //                     Waive Payment
// //                   </>
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── Manual Payment Confirmation Modal ── */}
// //       {showManualPaymentConfirm && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             background: "rgba(0,0,0,0.5)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             zIndex: 1000,
// //             padding: "24px",
// //           }}
// //           onClick={() => setShowManualPaymentConfirm(null)}
// //         >
// //           <div
// //             style={{
// //               background: "white",
// //               borderRadius: "16px",
// //               maxWidth: "500px",
// //               width: "100%",
// //               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
// //             }}
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <div
// //               style={{
// //                 padding: "24px 32px",
// //                 borderBottom: "1px solid #E5E7EB",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: "56px",
// //                   height: "56px",
// //                   borderRadius: "50%",
// //                   background: "#DBEAFE",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   margin: "0 auto 16px",
// //                 }}
// //               >
// //                 <Banknote size={28} color="#3B82F6" />
// //               </div>
// //               <h3
// //                 style={{
// //                   fontSize: "20px",
// //                   fontWeight: 700,
// //                   color: "#111827",
// //                   textAlign: "center",
// //                   marginBottom: "8px",
// //                 }}
// //               >
// //                 Record Manual Payment
// //               </h3>
// //               <p
// //                 style={{
// //                   fontSize: "14px",
// //                   color: "#6B7280",
// //                   textAlign: "center",
// //                   marginBottom: "16px",
// //                 }}
// //               >
// //                 Mark payment as received in cash for{" "}
// //                 <strong style={{ color: "#111827" }}>
// //                   {showManualPaymentConfirm.householdName}
// //                 </strong>
// //                 ?
// //               </p>
// //               <div
// //                 style={{
// //                   padding: "16px",
// //                   background: "#F9FAFB",
// //                   borderRadius: "12px",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     justifyContent: "space-between",
// //                     alignItems: "center",
// //                     marginBottom: "8px",
// //                   }}
// //                 >
// //                   <span
// //                     style={{
// //                       fontSize: "13px",
// //                       color: "#6B7280",
// //                       fontWeight: 500,
// //                     }}
// //                   >
// //                     Amount Due
// //                   </span>
// //                   <span
// //                     style={{
// //                       fontSize: "16px",
// //                       fontWeight: 700,
// //                       color: "#111827",
// //                       fontFamily: "monospace",
// //                     }}
// //                   >
// //                     ₦{showManualPaymentConfirm.amountDue.toLocaleString()}
// //                   </span>
// //                 </div>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "8px",
// //                     marginTop: "12px",
// //                     padding: "10px 12px",
// //                     background: "#EFF6FF",
// //                     borderRadius: "8px",
// //                   }}
// //                 >
// //                   <AlertCircle size={16} color="#3B82F6" />
// //                   <span style={{ fontSize: "12px", color: "#1E40AF" }}>
// //                     This will mark the full amount as paid via cash
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //             {manualPaymentMutation.isError && (
// //               <div
// //                 style={{
// //                   padding: "12px 32px",
// //                   background: "#FEE2E2",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "8px",
// //                 }}
// //               >
// //                 <AlertCircle size={16} color="#DC2626" />
// //                 <span style={{ fontSize: "14px", color: "#DC2626" }}>
// //                   {manualPaymentMutation.error?.message ||
// //                     "Failed to record payment"}
// //                 </span>
// //               </div>
// //             )}
// //             <div style={{ padding: "20px 32px", display: "flex", gap: "12px" }}>
// //               <button
// //                 onClick={() => setShowManualPaymentConfirm(null)}
// //                 disabled={manualPaymentMutation.isLoading}
// //                 style={{
// //                   flex: 1,
// //                   padding: "12px 24px",
// //                   background: "white",
// //                   color: "#374151",
// //                   fontSize: "14px",
// //                   fontWeight: 600,
// //                   borderRadius: "8px",
// //                   border: "1px solid #E5E7EB",
// //                   cursor: manualPaymentMutation.isLoading
// //                     ? "not-allowed"
// //                     : "pointer",
// //                   opacity: manualPaymentMutation.isLoading ? 0.6 : 1,
// //                 }}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={() =>
// //                   handleManualPayment(showManualPaymentConfirm.householdId)
// //                 }
// //                 disabled={manualPaymentMutation.isLoading}
// //                 style={{
// //                   flex: 1,
// //                   padding: "12px 24px",
// //                   background: manualPaymentMutation.isLoading
// //                     ? "#9CA3AF"
// //                     : "#3B82F6",
// //                   color: "white",
// //                   fontSize: "14px",
// //                   fontWeight: 600,
// //                   borderRadius: "8px",
// //                   border: "none",
// //                   cursor: manualPaymentMutation.isLoading
// //                     ? "not-allowed"
// //                     : "pointer",
// //                   boxShadow: manualPaymentMutation.isLoading
// //                     ? "none"
// //                     : "0 4px 12px rgba(59,130,246,0.3)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   gap: "8px",
// //                 }}
// //               >
// //                 {manualPaymentMutation.isLoading ? (
// //                   "Recording..."
// //                 ) : (
// //                   <>
// //                     <Banknote size={16} />
// //                     Confirm Payment
// //                   </>
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── Delete Confirmation Modal ── */}
// //       {showDeleteConfirm && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             background: "rgba(0,0,0,0.5)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             zIndex: 1000,
// //             padding: "24px",
// //           }}
// //           onClick={() => setShowDeleteConfirm(false)}
// //         >
// //           <div
// //             style={{
// //               background: "white",
// //               borderRadius: "16px",
// //               maxWidth: "500px",
// //               width: "100%",
// //               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
// //             }}
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <div
// //               style={{
// //                 padding: "24px 32px",
// //                 borderBottom: "1px solid #E5E7EB",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: "56px",
// //                   height: "56px",
// //                   borderRadius: "50%",
// //                   background: "#FEE2E2",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   margin: "0 auto 16px",
// //                 }}
// //               >
// //                 <Trash2 size={28} color="#DC2626" />
// //               </div>
// //               <h3
// //                 style={{
// //                   fontSize: "20px",
// //                   fontWeight: 700,
// //                   color: "#111827",
// //                   textAlign: "center",
// //                   marginBottom: "8px",
// //                 }}
// //               >
// //                 Delete Household Due
// //               </h3>
// //               <p
// //                 style={{
// //                   fontSize: "14px",
// //                   color: "#6B7280",
// //                   textAlign: "center",
// //                 }}
// //               >
// //                 Are you sure you want to delete{" "}
// //                 <strong style={{ color: "#111827" }}>"{due.title}"</strong>?
// //                 This action cannot be undone.
// //               </p>
// //               {due.totalAssigned > 0 && (
// //                 <div
// //                   style={{
// //                     marginTop: "12px",
// //                     padding: "12px",
// //                     background: "#FEF3C7",
// //                     borderRadius: "8px",
// //                     fontSize: "13px",
// //                     color: "#92400E",
// //                   }}
// //                 >
// //                   <strong>Note:</strong> {due.totalAssigned} household(s) are
// //                   currently assigned to this due.
// //                 </div>
// //               )}
// //             </div>
// //             {deleteMutation.isError && (
// //               <div
// //                 style={{
// //                   padding: "12px 32px",
// //                   background: "#FEE2E2",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "8px",
// //                 }}
// //               >
// //                 <AlertCircle size={16} color="#DC2626" />
// //                 <span style={{ fontSize: "14px", color: "#DC2626" }}>
// //                   {deleteMutation.error?.message ||
// //                     "Failed to delete due. Some households may have already paid."}
// //                 </span>
// //               </div>
// //             )}
// //             <div style={{ padding: "20px 32px", display: "flex", gap: "12px" }}>
// //               <button
// //                 onClick={() => setShowDeleteConfirm(false)}
// //                 disabled={deleteMutation.isLoading}
// //                 style={{
// //                   flex: 1,
// //                   padding: "12px 24px",
// //                   background: "white",
// //                   color: "#374151",
// //                   fontSize: "14px",
// //                   fontWeight: 600,
// //                   borderRadius: "8px",
// //                   border: "1px solid #E5E7EB",
// //                   cursor: deleteMutation.isLoading ? "not-allowed" : "pointer",
// //                   opacity: deleteMutation.isLoading ? 0.6 : 1,
// //                 }}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleDeleteDue}
// //                 disabled={deleteMutation.isLoading}
// //                 style={{
// //                   flex: 1,
// //                   padding: "12px 24px",
// //                   background: deleteMutation.isLoading ? "#9CA3AF" : "#DC2626",
// //                   color: "white",
// //                   fontSize: "14px",
// //                   fontWeight: 600,
// //                   borderRadius: "8px",
// //                   border: "none",
// //                   cursor: deleteMutation.isLoading ? "not-allowed" : "pointer",
// //                   boxShadow: deleteMutation.isLoading
// //                     ? "none"
// //                     : "0 4px 12px rgba(220,38,38,0.3)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   gap: "8px",
// //                 }}
// //               >
// //                 {deleteMutation.isLoading ? (
// //                   "Deleting..."
// //                 ) : (
// //                   <>
// //                     <Trash2 size={16} />
// //                     Delete Due
// //                   </>
// //                 )}
// //               </button>
// //             </div>
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

// // export default HouseholdDueDetail;

// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Edit,
//   Calendar,
//   DollarSign,
//   CheckCircle,
//   AlertCircle,
//   X,
//   Save,
//   Plus,
//   Home,
//   Trash2,
//   XCircle,
//   Banknote,
//   Search,
//   RefreshCw,
//   Users,
// } from "lucide-react";
// import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";

// // ─── Helpers ──────────────────────────────────────────────────────────────────

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

// const getStatusColor = (status) => {
//   switch (status) {
//     case "paid":
//       return { bg: "#D1FAE5", color: "#065F46" };
//     case "unpaid":
//       return { bg: "#FEF3C7", color: "#92400E" };
//     case "overdue":
//       return { bg: "#FEE2E2", color: "#991B1B" };
//     case "waived":
//       return { bg: "#E0E7FF", color: "#3730A3" };
//     case "manual":
//       return { bg: "#DBEAFE", color: "#1E40AF" };
//     default:
//       return { bg: "#F3F4F6", color: "#6B7280" };
//   }
// };

// // ─── Shared input styles ──────────────────────────────────────────────────────
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

// // ─── HouseholdDueDetail ───────────────────────────────────────────────────────
// const HouseholdDueDetail = () => {
//   const { id: dueId } = useParams();
//   const navigate = useNavigate();

//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [selectedHouseholds, setSelectedHouseholds] = useState({});
//   const [showWaiveConfirm, setShowWaiveConfirm] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [showManualPaymentConfirm, setShowManualPaymentConfirm] =
//     useState(null);
//   const [showGenerateConfirm, setShowGenerateConfirm] = useState(false);
//   const [assignSearchTerm, setAssignSearchTerm] = useState("");

//   const { selectedEstate } = useSelector(
//     (state) => state?.reducer?.estateSlice,
//   );
//   const clanId = selectedEstate?._id;

//   // ── Fetch due ──
//   const {
//     data: dueResponse,
//     isLoading: loading,
//     error,
//   } = useFetchDataV2(`/v1/householdDue/due/${dueId}`, `householdDue-${dueId}`);
//   const due = dueResponse?.data;

//   // ── Fetch all households for assign modal ──
//   const { data: householdsResponse, isLoading: loadingHouseholds } =
//     useFetchDataV2(`/v1/household/${clanId}`, `households-${clanId}`);
//   const allHouseholds = householdsResponse?.data || [];

//   // ── Mutations ──
//   const updateDueMutation = useMutateDataV2(`householdDue-${dueId}`, "PATCH");
//   const assignHouseholdsMutation = useMutateDataV2(
//     `householdDue-${dueId}`,
//     "POST",
//   );
//   const waiveMutation = useMutateDataV2(`householdDue-${dueId}`, "POST");
//   const deleteMutation = useMutateDataV2(`householdDue-${dueId}`, "DELETE");
//   const manualPaymentMutation = useMutateDataV2(
//     `householdDue-${dueId}`,
//     "POST",
//   );
//   const generateNextMutation = useMutateDataV2(`householdDue-${dueId}`, "POST");

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     dueDate: "",
//     isActive: true,
//   });

//   // ── Computed ──
//   const alreadyAssignedIds = new Set(
//     (due?.households || []).map((h) => h.household._id),
//   );
//   const availableHouseholds = allHouseholds.filter(
//     (h) => !alreadyAssignedIds.has(h._id),
//   );
//   const filteredAssignHouseholds = availableHouseholds.filter((h) =>
//     h?.name?.toLowerCase().includes(assignSearchTerm.toLowerCase()),
//   );
//   const allSelected =
//     filteredAssignHouseholds.length > 0 &&
//     filteredAssignHouseholds.every((h) => selectedHouseholds[h._id]);
//   const someSelected =
//     filteredAssignHouseholds.some((h) => selectedHouseholds[h._id]) &&
//     !allSelected;

//   const isRecurring = due?.recurrenceType && due.recurrenceType !== "one_time";
//   const canDelete = due && due.totalPaid === 0 && due.collectedTotal === 0;

//   // ── Handlers ──
//   const handleOpenEdit = () => {
//     setFormData({
//       title: due.title,
//       description: due.description,
//       dueDate: due.dueDate
//         ? new Date(due.dueDate).toISOString().split("T")[0]
//         : "",
//       isActive: due.isActive,
//     });
//     setShowEditModal(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const updates = {};
//     if (formData.title !== due.title) updates.title = formData.title;
//     if (formData.description !== due.description)
//       updates.description = formData.description;
//     if (formData.dueDate !== new Date(due.dueDate).toISOString().split("T")[0])
//       updates.dueDate = formData.dueDate;
//     if (formData.isActive !== due.isActive)
//       updates.isActive = formData.isActive;

//     if (Object.keys(updates).length === 0) {
//       setShowEditModal(false);
//       return;
//     }

//     try {
//       await updateDueMutation.mutateAsync({
//         url: `/v1/householdDue/due/${dueId}`,
//         data: updates,
//       });
//       setShowEditModal(false);
//       toast.success("Due updated successfully");
//     } catch (error) {
//       console.error("Error updating due:", error);
//     }
//   };

//   const handleOpenAssign = () => {
//     setSelectedHouseholds({});
//     setAssignSearchTerm("");
//     setShowAssignModal(true);
//   };

//   const handleToggleHousehold = (householdId) => {
//     setSelectedHouseholds((prev) => {
//       if (prev[householdId]) {
//         const { [householdId]: _, ...rest } = prev;
//         return rest;
//       }
//       return { ...prev, [householdId]: "unpaid" };
//     });
//   };

//   const handleSelectAll = () => {
//     const all = {};
//     filteredAssignHouseholds.forEach((h) => {
//       all[h._id] = "unpaid";
//     });
//     setSelectedHouseholds(all);
//   };

//   const handleDeselectAll = () => setSelectedHouseholds({});

//   const handleAssignHouseholds = async () => {
//     const householdIds = Object.keys(selectedHouseholds);
//     if (householdIds.length === 0) return;
//     try {
//       await assignHouseholdsMutation.mutateAsync({
//         url: `/v1/householdDue/due/${dueId}`,
//         data: { householdIds, statuses: selectedHouseholds },
//       });
//       setShowAssignModal(false);
//       setSelectedHouseholds({});
//       setAssignSearchTerm("");
//       toast.success("Households assigned successfully");
//     } catch (error) {
//       console.error("Error assigning households:", error);
//     }
//   };

//   const handleWaiveHousehold = async (householdId) => {
//     try {
//       await waiveMutation.mutateAsync({
//         url: `/v1/householdDue/waive`,
//         data: { householdId, duesId: dueId },
//       });
//       setShowWaiveConfirm(null);
//       toast.success("Payment waived");
//     } catch (error) {
//       console.error("Error waiving household:", error);
//     }
//   };

//   const handleManualPayment = async (householdId) => {
//     try {
//       await manualPaymentMutation.mutateAsync({
//         url: `/v1/householdDue/manual-payment`,
//         data: { householdId, duesId: dueId },
//       });
//       setShowManualPaymentConfirm(null);
//       toast.success("Manual payment recorded");
//     } catch (error) {
//       console.error("Error recording manual payment:", error);
//     }
//   };

//   const handleDeleteDue = async () => {
//     try {
//       await deleteMutation.mutateAsync({
//         url: `/v1/householdDue/waive`,
//         data: { duesId: dueId },
//       });
//       setShowDeleteConfirm(false);
//       toast.success("Due deleted");
//       navigate(-1);
//     } catch (error) {
//       console.error("Error deleting due:", error);
//     }
//   };

//   const handleGenerateNextPeriod = async () => {
//     try {
//       await generateNextMutation.mutateAsync({
//         url: `/v1/householdDue/due/${dueId}/generate-next`,
//         data: {},
//       });
//       setShowGenerateConfirm(false);
//       toast.success("Next period generated successfully!");
//       navigate("/estate-admin/household-dues");
//     } catch (error) {
//       console.error("Error generating next period:", error);
//     }
//   };

//   // ── Loading / Error states ──
//   if (loading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "60vh",
//         }}
//       >
//         <p style={{ fontSize: "14px", color: "#6B7280" }}>Loading...</p>
//       </div>
//     );
//   }

//   if (error || !due) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "60vh",
//         }}
//       >
//         <AlertCircle
//           size={32}
//           color="#DC2626"
//           style={{ marginBottom: "16px" }}
//         />
//         <p
//           style={{
//             fontSize: "16px",
//             fontWeight: 600,
//             color: "#111827",
//             marginBottom: "8px",
//           }}
//         >
//           Error loading due
//         </p>
//         <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "24px" }}>
//           {error?.message || "Due not found"}
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           style={{
//             padding: "12px 24px",
//             background: "#10B981",
//             color: "white",
//             fontSize: "14px",
//             fontWeight: 600,
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const isOverdue = new Date(due.dueDate) < new Date();
//   const completionRate =
//     due.expectedTotal > 0
//       ? ((due.collectedTotal / due.expectedTotal) * 100).toFixed(1)
//       : 0;

//   return (
//     <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
//       {/* ── Back + Header ── */}
//       <div style={{ marginBottom: "32px" }}>
//         <button
//           onClick={() => navigate(-1)}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             padding: "8px 16px",
//             background: "white",
//             border: "1px solid #E5E7EB",
//             borderRadius: "8px",
//             fontSize: "14px",
//             fontWeight: 500,
//             color: "#374151",
//             cursor: "pointer",
//             marginBottom: "24px",
//           }}
//         >
//           <ArrowLeft size={16} />
//           Back to Dues
//         </button>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//           }}
//         >
//           <div>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "12px",
//                 marginBottom: "8px",
//                 flexWrap: "wrap",
//               }}
//             >
//               <h1
//                 style={{
//                   fontSize: "28px",
//                   fontWeight: 700,
//                   color: "#111827",
//                 }}
//               >
//                 {due.title}
//               </h1>
//               {/* Active badge */}
//               <span
//                 style={{
//                   padding: "6px 12px",
//                   borderRadius: "6px",
//                   fontSize: "12px",
//                   fontWeight: 600,
//                   background: due.isActive ? "#D1FAE5" : "#F3F4F6",
//                   color: due.isActive ? "#065F46" : "#6B7280",
//                 }}
//               >
//                 {due.isActive ? "Active" : "Inactive"}
//               </span>
//               {/* Recurrence badge */}
//               <span
//                 style={{
//                   padding: "6px 12px",
//                   borderRadius: "6px",
//                   fontSize: "12px",
//                   fontWeight: 600,
//                   background: isRecurring ? "#EDE9FE" : "#F3F4F6",
//                   color: isRecurring ? "#6D28D9" : "#6B7280",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "5px",
//                 }}
//               >
//                 {isRecurring && <RefreshCw size={11} />}
//                 {recurrenceLabel(due.recurrenceType || "one_time")}
//               </span>
//             </div>
//             <p style={{ fontSize: "14px", color: "#6B7280" }}>
//               {due.description}
//             </p>
//           </div>

//           {/* Action buttons */}
//           <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
//             {canDelete && (
//               <ActionButton
//                 label="Delete"
//                 icon={<Trash2 size={16} />}
//                 onClick={() => setShowDeleteConfirm(true)}
//                 variant="danger-outline"
//               />
//             )}
//             {/* Generate Next Period — only for recurring dues */}
//             {isRecurring && (
//               <ActionButton
//                 label="Generate Next Period"
//                 icon={<RefreshCw size={16} />}
//                 onClick={() => setShowGenerateConfirm(true)}
//                 variant="purple"
//               />
//             )}
//             <ActionButton
//               label="Assign Households"
//               icon={<Plus size={16} />}
//               onClick={handleOpenAssign}
//               variant="green-outline"
//             />
//             <ActionButton
//               label="Edit Due"
//               icon={<Edit size={16} />}
//               onClick={handleOpenEdit}
//               variant="green"
//             />
//           </div>
//         </div>
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
//           title="Default Amount"
//           value={`₦${due.defaultAmount.toLocaleString()}`}
//           icon={<DollarSign size={24} />}
//           iconBg="#FEF3C7"
//           iconColor="#F59E0B"
//         />
//         <StatsCard
//           title="Expected Total"
//           value={`₦${due.expectedTotal.toLocaleString()}`}
//           icon={<DollarSign size={24} />}
//           iconBg="#DBEAFE"
//           iconColor="#3B82F6"
//         />
//         <StatsCard
//           title="Collected"
//           value={`₦${due.collectedTotal.toLocaleString()}`}
//           icon={<CheckCircle size={24} />}
//           iconBg="#D1FAE5"
//           iconColor="#10B981"
//         />
//         <StatsCard
//           title="Outstanding"
//           value={`₦${due.outstandingTotal.toLocaleString()}`}
//           icon={<AlertCircle size={24} />}
//           iconBg="#FEE2E2"
//           iconColor="#DC2626"
//         />
//       </div>

//       {/* ── Main Grid ── */}
//       <div
//         style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}
//       >
//         {/* Left column */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
//           {/* Payment Progress */}
//           <div style={cardStyle}>
//             <h3 style={sectionTitleStyle}>Payment Progress</h3>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(2, 1fr)",
//                 gap: "24px",
//                 marginBottom: "24px",
//               }}
//             >
//               <ProgressStat
//                 label="Total Assigned"
//                 value={due.totalAssigned}
//                 unit="households"
//               />
//               <ProgressStat
//                 label="Must Pay"
//                 value={due.totalMustPay}
//                 unit="households"
//               />
//               <ProgressStat
//                 label="Paid"
//                 value={due.totalPaid}
//                 unit="households"
//                 valueColor="#10B981"
//               />
//               <ProgressStat
//                 label="Exempted"
//                 value={due.totalExempted}
//                 unit="households"
//                 valueColor="#6B7280"
//               />
//             </div>
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: "8px",
//                 }}
//               >
//                 <span
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: 600,
//                     color: "#111827",
//                   }}
//                 >
//                   Completion Rate
//                 </span>
//                 <span
//                   style={{
//                     fontSize: "18px",
//                     fontWeight: 700,
//                     color: "#10B981",
//                   }}
//                 >
//                   {completionRate}%
//                 </span>
//               </div>
//               <div
//                 style={{
//                   width: "100%",
//                   height: "12px",
//                   background: "#F3F4F6",
//                   borderRadius: "6px",
//                   overflow: "hidden",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: `${completionRate}%`,
//                     height: "100%",
//                     background: "#10B981",
//                     transition: "width 0.3s ease",
//                   }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Assigned Households */}
//           <div style={cardStyle}>
//             <h3 style={sectionTitleStyle}>
//               Assigned Households ({due.households?.length || 0})
//             </h3>
//             {due.households && due.households.length > 0 ? (
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "12px",
//                 }}
//               >
//                 {due.households.map((item) => {
//                   const statusStyle = getStatusColor(item.status);
//                   const canAct =
//                     item.status !== "paid" &&
//                     item.status !== "waived" &&
//                     item.status !== "manual";

//                   return (
//                     <div
//                       key={item._id}
//                       style={{
//                         padding: "16px",
//                         background: "#F9FAFB",
//                         borderRadius: "10px",
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                         }}
//                       >
//                         <div style={{ flex: 1 }}>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "12px",
//                               marginBottom: "8px",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 borderRadius: "8px",
//                                 background: "#E0E7FF",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 color: "#6366F1",
//                               }}
//                             >
//                               <Home size={20} />
//                             </div>
//                             <div>
//                               <div
//                                 style={{
//                                   fontSize: "16px",
//                                   fontWeight: 600,
//                                   color: "#111827",
//                                 }}
//                               >
//                                 {item.household.name}
//                               </div>
//                               <div
//                                 style={{ fontSize: "13px", color: "#6B7280" }}
//                               >
//                                 {item.household.type} • {item.household.address}
//                               </div>
//                             </div>
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               gap: "16px",
//                               fontSize: "13px",
//                             }}
//                           >
//                             <div>
//                               <span style={{ color: "#9CA3AF" }}>
//                                 Amount Due:{" "}
//                               </span>
//                               <span
//                                 style={{
//                                   fontWeight: 600,
//                                   color: "#111827",
//                                   fontFamily: "monospace",
//                                 }}
//                               >
//                                 ₦{item.amountDue.toLocaleString()}
//                               </span>
//                             </div>
//                             <div>
//                               <span style={{ color: "#9CA3AF" }}>
//                                 Amount Paid:{" "}
//                               </span>
//                               <span
//                                 style={{
//                                   fontWeight: 600,
//                                   color: "#10B981",
//                                   fontFamily: "monospace",
//                                 }}
//                               >
//                                 ₦{item.amountPaid.toLocaleString()}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "8px",
//                             marginLeft: "16px",
//                           }}
//                         >
//                           <span
//                             style={{
//                               padding: "6px 12px",
//                               borderRadius: "6px",
//                               fontSize: "12px",
//                               fontWeight: 600,
//                               background: statusStyle.bg,
//                               color: statusStyle.color,
//                               textTransform: "capitalize",
//                             }}
//                           >
//                             {item.status}
//                           </span>

//                           {canAct && (
//                             <>
//                               <SmallButton
//                                 label="Cash"
//                                 icon={<Banknote size={14} />}
//                                 color="#3B82F6"
//                                 onClick={() =>
//                                   setShowManualPaymentConfirm({
//                                     householdId: item.household._id,
//                                     householdName: item.household.name,
//                                     amountDue: item.amountDue,
//                                   })
//                                 }
//                               />
//                               <SmallButton
//                                 label="Waive"
//                                 icon={<XCircle size={14} />}
//                                 color="#6366F1"
//                                 onClick={() =>
//                                   setShowWaiveConfirm({
//                                     householdId: item.household._id,
//                                     householdName: item.household.name,
//                                   })
//                                 }
//                               />
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div
//                 style={{
//                   padding: "32px",
//                   textAlign: "center",
//                   background: "#F9FAFB",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <Users
//                   size={32}
//                   color="#D1D5DB"
//                   style={{ margin: "0 auto 12px" }}
//                 />
//                 <p style={{ fontSize: "14px", color: "#6B7280" }}>
//                   No households assigned yet
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right column — Due Info */}
//         <div>
//           <div style={cardStyle}>
//             <h3 style={sectionTitleStyle}>Due Information</h3>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "16px",
//               }}
//             >
//               {/* Due Date */}
//               <div>
//                 <div style={infoLabelStyle}>Due Date</div>
//                 <div
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: "8px",
//                     padding: "8px 12px",
//                     borderRadius: "8px",
//                     background: isOverdue ? "#FEE2E2" : "#DBEAFE",
//                   }}
//                 >
//                   <Calendar
//                     size={16}
//                     color={isOverdue ? "#DC2626" : "#3B82F6"}
//                   />
//                   <span
//                     style={{
//                       fontSize: "14px",
//                       fontWeight: 600,
//                       color: isOverdue ? "#DC2626" : "#3B82F6",
//                     }}
//                   >
//                     {new Date(due.dueDate).toLocaleDateString("en-US", {
//                       month: "long",
//                       day: "numeric",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </div>
//               </div>

//               {/* Recurrence */}
//               <div>
//                 <div style={infoLabelStyle}>Recurrence</div>
//                 <div
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: "6px",
//                     padding: "6px 12px",
//                     borderRadius: "8px",
//                     background: isRecurring ? "#EDE9FE" : "#F3F4F6",
//                     fontSize: "14px",
//                     fontWeight: 600,
//                     color: isRecurring ? "#6D28D9" : "#6B7280",
//                   }}
//                 >
//                   {isRecurring && <RefreshCw size={14} />}
//                   {recurrenceLabel(due.recurrenceType || "one_time")}
//                 </div>
//               </div>

//               {/* Category */}
//               <div>
//                 <div style={infoLabelStyle}>Category</div>
//                 <div
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: 500,
//                     color: "#111827",
//                     textTransform: "capitalize",
//                   }}
//                 >
//                   {due.category?.replace(/_/g, " ")}
//                 </div>
//               </div>

//               {/* Created By */}
//               <div>
//                 <div style={infoLabelStyle}>Created By</div>
//                 <div
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: 500,
//                     color: "#111827",
//                   }}
//                 >
//                   {due.createdBy?.name || due.createdBy?.email || "N/A"}
//                 </div>
//               </div>

//               {/* Created At */}
//               <div>
//                 <div style={infoLabelStyle}>Created At</div>
//                 <div
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: 500,
//                     color: "#111827",
//                   }}
//                 >
//                   {new Date(due.createdAt).toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                     year: "numeric",
//                   })}
//                 </div>
//               </div>

//               {/* Last Updated */}
//               <div>
//                 <div style={infoLabelStyle}>Last Updated</div>
//                 <div
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: 500,
//                     color: "#111827",
//                   }}
//                 >
//                   {new Date(due.updatedAt).toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                     year: "numeric",
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ══════════════════════════════════════════
//           MODALS
//       ══════════════════════════════════════════ */}

//       {/* ── Edit Modal ── */}
//       {showEditModal && (
//         <Overlay onClick={() => setShowEditModal(false)}>
//           <ModalBox onClick={(e) => e.stopPropagation()} maxWidth="600px">
//             <ModalHeader
//               title="Edit Due"
//               onClose={() => setShowEditModal(false)}
//             />
//             <form onSubmit={handleUpdate} style={{ padding: "32px" }}>
//               <div style={{ marginBottom: "20px" }}>
//                 <label style={labelStyle}>Title</label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: "20px" }}>
//                 <label style={labelStyle}>Description</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   rows={3}
//                   style={{ ...inputStyle, resize: "vertical" }}
//                 />
//               </div>
//               <div style={{ marginBottom: "20px" }}>
//                 <label style={labelStyle}>Due Date</label>
//                 <input
//                   type="date"
//                   value={formData.dueDate}
//                   onChange={(e) =>
//                     setFormData({ ...formData, dueDate: e.target.value })
//                   }
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: "32px" }}>
//                 <label
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "12px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={formData.isActive}
//                     onChange={(e) =>
//                       setFormData({ ...formData, isActive: e.target.checked })
//                     }
//                     style={{ width: "20px", height: "20px" }}
//                   />
//                   <span
//                     style={{
//                       fontSize: "14px",
//                       fontWeight: 600,
//                       color: "#374151",
//                     }}
//                   >
//                     Active
//                   </span>
//                 </label>
//               </div>
//               {updateDueMutation.isError && (
//                 <ErrorBanner message={updateDueMutation.error?.message} />
//               )}
//               <ModalFooter
//                 onCancel={() => setShowEditModal(false)}
//                 onConfirm={null}
//                 confirmLabel={
//                   updateDueMutation.isPending ? "Saving..." : "Save Changes"
//                 }
//                 confirmIcon={<Save size={16} />}
//                 isLoading={updateDueMutation.isPending}
//                 isSubmit
//               />
//             </form>
//           </ModalBox>
//         </Overlay>
//       )}

//       {/* ── Assign Households Modal ── */}
//       {showAssignModal && (
//         <Overlay onClick={() => setShowAssignModal(false)}>
//           <ModalBox onClick={(e) => e.stopPropagation()} maxWidth="700px" flex>
//             {/* Header */}
//             <div
//               style={{
//                 padding: "24px 32px",
//                 borderBottom: "1px solid #E5E7EB",
//                 flexShrink: 0,
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: "16px",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "20px",
//                     fontWeight: 700,
//                     color: "#111827",
//                   }}
//                 >
//                   Assign Households
//                 </h3>
//                 <CloseButton onClick={() => setShowAssignModal(false)} />
//               </div>

//               {/* Search */}
//               <div style={{ position: "relative", marginBottom: "12px" }}>
//                 <Search
//                   size={16}
//                   color="#9CA3AF"
//                   style={{
//                     position: "absolute",
//                     left: "12px",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                   }}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search households by name..."
//                   value={assignSearchTerm}
//                   onChange={(e) => setAssignSearchTerm(e.target.value)}
//                   style={{
//                     ...inputStyle,
//                     paddingLeft: "36px",
//                   }}
//                 />
//               </div>

//               {/* Select all bar */}
//               {filteredAssignHouseholds.length > 0 && (
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     padding: "12px 16px",
//                     background: "#F9FAFB",
//                     borderRadius: "8px",
//                   }}
//                 >
//                   <label
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "12px",
//                       cursor: "pointer",
//                     }}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       allSelected ? handleDeselectAll() : handleSelectAll();
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={allSelected}
//                       ref={(input) => {
//                         if (input) input.indeterminate = someSelected;
//                       }}
//                       onChange={() => {
//                         allSelected ? handleDeselectAll() : handleSelectAll();
//                       }}
//                       style={{ width: "20px", height: "20px" }}
//                     />
//                     <span
//                       style={{
//                         fontSize: "14px",
//                         fontWeight: 600,
//                         color: "#374151",
//                       }}
//                     >
//                       {allSelected
//                         ? "Deselect All"
//                         : someSelected
//                           ? `${Object.keys(selectedHouseholds).length} selected`
//                           : "Select All"}
//                     </span>
//                   </label>
//                   <span style={{ fontSize: "13px", color: "#6B7280" }}>
//                     {filteredAssignHouseholds.length}{" "}
//                     {assignSearchTerm ? "found" : "available"}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* List */}
//             <div style={{ padding: "24px 32px", overflowY: "auto", flex: 1 }}>
//               {loadingHouseholds ? (
//                 <p
//                   style={{
//                     textAlign: "center",
//                     fontSize: "14px",
//                     color: "#6B7280",
//                   }}
//                 >
//                   Loading...
//                 </p>
//               ) : filteredAssignHouseholds.length === 0 ? (
//                 <div style={{ textAlign: "center", padding: "32px" }}>
//                   <Users
//                     size={48}
//                     color="#D1D5DB"
//                     style={{ margin: "0 auto 16px" }}
//                   />
//                   <p
//                     style={{
//                       fontSize: "16px",
//                       fontWeight: 600,
//                       color: "#111827",
//                     }}
//                   >
//                     {assignSearchTerm
//                       ? "No matches found"
//                       : "No households available"}
//                   </p>
//                 </div>
//               ) : (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "12px",
//                   }}
//                 >
//                   {filteredAssignHouseholds.map((household) => {
//                     const isSelected = !!selectedHouseholds[household._id];
//                     return (
//                       <div
//                         key={household._id}
//                         style={{
//                           padding: "16px",
//                           background: isSelected ? "#F0FDF4" : "#F9FAFB",
//                           border: isSelected
//                             ? "2px solid #10B981"
//                             : "2px solid transparent",
//                           borderRadius: "10px",
//                           cursor: "pointer",
//                           transition: "all 0.2s ease",
//                         }}
//                         onClick={() => handleToggleHousehold(household._id)}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "12px",
//                           }}
//                         >
//                           <input
//                             type="checkbox"
//                             checked={isSelected}
//                             onChange={() =>
//                               handleToggleHousehold(household._id)
//                             }
//                             onClick={(e) => e.stopPropagation()}
//                             style={{ width: "20px", height: "20px" }}
//                           />
//                           <div
//                             style={{
//                               width: "40px",
//                               height: "40px",
//                               borderRadius: "8px",
//                               background: "#E0E7FF",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               color: "#6366F1",
//                             }}
//                           >
//                             <Home size={20} />
//                           </div>
//                           <div style={{ flex: 1 }}>
//                             <div
//                               style={{
//                                 fontSize: "16px",
//                                 fontWeight: 600,
//                                 color: "#111827",
//                               }}
//                             >
//                               {household.name}
//                             </div>
//                             <div style={{ fontSize: "13px", color: "#6B7280" }}>
//                               {household.type} • {household.address}
//                             </div>
//                           </div>
//                         </div>

//                         {isSelected && (
//                           <div
//                             style={{
//                               marginTop: "12px",
//                               paddingTop: "12px",
//                               borderTop: "1px solid #E5E7EB",
//                             }}
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             <label style={{ ...labelStyle, fontSize: "13px" }}>
//                               Payment Status
//                             </label>
//                             <select
//                               value={selectedHouseholds[household._id]}
//                               onChange={(e) =>
//                                 setSelectedHouseholds((prev) => ({
//                                   ...prev,
//                                   [household._id]: e.target.value,
//                                 }))
//                               }
//                               style={{
//                                 ...inputStyle,
//                                 padding: "8px 12px",
//                               }}
//                             >
//                               <option value="unpaid">Unpaid</option>
//                               <option value="paid">Paid</option>
//                               <option value="overdue">Overdue</option>
//                               <option value="waived">Waived</option>
//                               <option value="manual">Manual (Cash)</option>
//                             </select>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div
//               style={{
//                 padding: "20px 32px",
//                 borderTop: "1px solid #E5E7EB",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexShrink: 0,
//               }}
//             >
//               <span style={{ fontSize: "14px", color: "#6B7280" }}>
//                 {Object.keys(selectedHouseholds).length} household(s) selected
//               </span>
//               <div style={{ display: "flex", gap: "12px" }}>
//                 <button
//                   onClick={() => setShowAssignModal(false)}
//                   style={{
//                     padding: "12px 24px",
//                     background: "white",
//                     color: "#374151",
//                     fontSize: "14px",
//                     fontWeight: 600,
//                     borderRadius: "8px",
//                     border: "1px solid #E5E7EB",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAssignHouseholds}
//                   disabled={
//                     Object.keys(selectedHouseholds).length === 0 ||
//                     assignHouseholdsMutation.isPending
//                   }
//                   style={{
//                     padding: "12px 24px",
//                     background:
//                       Object.keys(selectedHouseholds).length === 0 ||
//                       assignHouseholdsMutation.isPending
//                         ? "#9CA3AF"
//                         : "#10B981",
//                     color: "white",
//                     fontSize: "14px",
//                     fontWeight: 600,
//                     borderRadius: "8px",
//                     border: "none",
//                     cursor:
//                       Object.keys(selectedHouseholds).length === 0 ||
//                       assignHouseholdsMutation.isPending
//                         ? "not-allowed"
//                         : "pointer",
//                   }}
//                 >
//                   {assignHouseholdsMutation.isPending
//                     ? "Assigning..."
//                     : "Assign Households"}
//                 </button>
//               </div>
//             </div>
//           </ModalBox>
//         </Overlay>
//       )}

//       {/* ── Generate Next Period Confirm ── */}
//       {showGenerateConfirm && (
//         <Overlay onClick={() => setShowGenerateConfirm(false)}>
//           <ModalBox onClick={(e) => e.stopPropagation()} maxWidth="500px">
//             <div
//               style={{
//                 padding: "24px 32px",
//                 borderBottom: "1px solid #E5E7EB",
//               }}
//             >
//               <div
//                 style={{
//                   width: "56px",
//                   height: "56px",
//                   borderRadius: "50%",
//                   background: "#EDE9FE",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   margin: "0 auto 16px",
//                 }}
//               >
//                 <RefreshCw size={28} color="#6D28D9" />
//               </div>
//               <h3
//                 style={{
//                   fontSize: "20px",
//                   fontWeight: 700,
//                   color: "#111827",
//                   textAlign: "center",
//                   marginBottom: "8px",
//                 }}
//               >
//                 Generate Next Period
//               </h3>
//               <p
//                 style={{
//                   fontSize: "14px",
//                   color: "#6B7280",
//                   textAlign: "center",
//                   marginBottom: "16px",
//                 }}
//               >
//                 This will create a new due for the next{" "}
//                 <strong style={{ color: "#6D28D9" }}>
//                   {recurrenceLabel(due.recurrenceType)}
//                 </strong>{" "}
//                 period. All{" "}
//                 <strong style={{ color: "#111827" }}>
//                   {due.totalAssigned} households
//                 </strong>{" "}
//                 will be carried over with their status reset to{" "}
//                 <strong>unpaid</strong>.
//               </p>
//               {/* Info box */}
//               <div
//                 style={{
//                   padding: "12px 16px",
//                   background: "#F5F3FF",
//                   borderRadius: "8px",
//                   display: "flex",
//                   alignItems: "flex-start",
//                   gap: "10px",
//                 }}
//               >
//                 <AlertCircle
//                   size={16}
//                   color="#6D28D9"
//                   style={{ marginTop: "2px", flexShrink: 0 }}
//                 />
//                 <p style={{ fontSize: "13px", color: "#5B21B6", margin: 0 }}>
//                   You'll be taken to the dues list after generation. Open the
//                   new due to add or remove households before sharing with
//                   residents.
//                 </p>
//               </div>
//             </div>

//             {generateNextMutation.isError && (
//               <ErrorBanner
//                 message={
//                   generateNextMutation.error?.message ||
//                   "Failed to generate next period"
//                 }
//               />
//             )}

//             <div style={{ padding: "20px 32px", display: "flex", gap: "12px" }}>
//               <button
//                 onClick={() => setShowGenerateConfirm(false)}
//                 disabled={generateNextMutation.isPending}
//                 style={{
//                   flex: 1,
//                   padding: "12px 24px",
//                   background: "white",
//                   color: "#374151",
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   borderRadius: "8px",
//                   border: "1px solid #E5E7EB",
//                   cursor: generateNextMutation.isPending
//                     ? "not-allowed"
//                     : "pointer",
//                   opacity: generateNextMutation.isPending ? 0.6 : 1,
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleGenerateNextPeriod}
//                 disabled={generateNextMutation.isPending}
//                 style={{
//                   flex: 1,
//                   padding: "12px 24px",
//                   background: generateNextMutation.isPending
//                     ? "#9CA3AF"
//                     : "#6D28D9",
//                   color: "white",
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   borderRadius: "8px",
//                   border: "none",
//                   cursor: generateNextMutation.isPending
//                     ? "not-allowed"
//                     : "pointer",
//                   boxShadow: generateNextMutation.isPending
//                     ? "none"
//                     : "0 4px 12px rgba(109,40,217,0.3)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "8px",
//                 }}
//               >
//                 {generateNextMutation.isPending ? (
//                   "Generating..."
//                 ) : (
//                   <>
//                     <RefreshCw size={16} />
//                     Generate Next Period
//                   </>
//                 )}
//               </button>
//             </div>
//           </ModalBox>
//         </Overlay>
//       )}

//       {/* ── Waive Confirm ── */}
//       {showWaiveConfirm && (
//         <ConfirmModal
//           icon={<XCircle size={28} color="#6366F1" />}
//           iconBg="#E0E7FF"
//           title="Waive Payment"
//           message={
//             <>
//               Are you sure you want to waive the payment for{" "}
//               <strong style={{ color: "#111827" }}>
//                 {showWaiveConfirm.householdName}
//               </strong>
//               ? This action cannot be undone.
//             </>
//           }
//           onCancel={() => setShowWaiveConfirm(null)}
//           onConfirm={() => handleWaiveHousehold(showWaiveConfirm.householdId)}
//           confirmLabel="Waive Payment"
//           confirmColor="#6366F1"
//           isLoading={waiveMutation.isPending}
//           error={waiveMutation.isError ? waiveMutation.error?.message : null}
//         />
//       )}

//       {/* ── Manual Payment Confirm ── */}
//       {showManualPaymentConfirm && (
//         <ConfirmModal
//           icon={<Banknote size={28} color="#3B82F6" />}
//           iconBg="#DBEAFE"
//           title="Record Manual Payment"
//           message={
//             <>
//               Mark payment as received in cash for{" "}
//               <strong style={{ color: "#111827" }}>
//                 {showManualPaymentConfirm.householdName}
//               </strong>
//               ?
//               <div
//                 style={{
//                   marginTop: "16px",
//                   padding: "16px",
//                   background: "#F9FAFB",
//                   borderRadius: "12px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   <span
//                     style={{
//                       fontSize: "13px",
//                       color: "#6B7280",
//                       fontWeight: 500,
//                     }}
//                   >
//                     Amount Due
//                   </span>
//                   <span
//                     style={{
//                       fontSize: "16px",
//                       fontWeight: 700,
//                       color: "#111827",
//                       fontFamily: "monospace",
//                     }}
//                   >
//                     ₦{showManualPaymentConfirm.amountDue.toLocaleString()}
//                   </span>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                     padding: "10px 12px",
//                     background: "#EFF6FF",
//                     borderRadius: "8px",
//                   }}
//                 >
//                   <AlertCircle size={16} color="#3B82F6" />
//                   <span style={{ fontSize: "12px", color: "#1E40AF" }}>
//                     This will mark the full amount as paid via cash
//                   </span>
//                 </div>
//               </div>
//             </>
//           }
//           onCancel={() => setShowManualPaymentConfirm(null)}
//           onConfirm={() =>
//             handleManualPayment(showManualPaymentConfirm.householdId)
//           }
//           confirmLabel="Confirm Payment"
//           confirmColor="#3B82F6"
//           isLoading={manualPaymentMutation.isPending}
//           error={
//             manualPaymentMutation.isError
//               ? manualPaymentMutation.error?.message
//               : null
//           }
//         />
//       )}

//       {/* ── Delete Confirm ── */}
//       {showDeleteConfirm && (
//         <ConfirmModal
//           icon={<Trash2 size={28} color="#DC2626" />}
//           iconBg="#FEE2E2"
//           title="Delete Household Due"
//           message={
//             <>
//               Are you sure you want to delete{" "}
//               <strong style={{ color: "#111827" }}>"{due.title}"</strong>? This
//               action cannot be undone.
//               {due.totalAssigned > 0 && (
//                 <div
//                   style={{
//                     marginTop: "12px",
//                     padding: "12px",
//                     background: "#FEF3C7",
//                     borderRadius: "8px",
//                     fontSize: "13px",
//                     color: "#92400E",
//                   }}
//                 >
//                   <strong>Note:</strong> {due.totalAssigned} household(s) are
//                   currently assigned to this due.
//                 </div>
//               )}
//             </>
//           }
//           onCancel={() => setShowDeleteConfirm(false)}
//           onConfirm={handleDeleteDue}
//           confirmLabel="Delete Due"
//           confirmColor="#DC2626"
//           isLoading={deleteMutation.isPending}
//           error={deleteMutation.isError ? deleteMutation.error?.message : null}
//         />
//       )}
//     </div>
//   );
// };

// // ─── Sub-components ───────────────────────────────────────────────────────────

// const cardStyle = {
//   background: "white",
//   borderRadius: "12px",
//   padding: "24px",
//   boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
// };

// const sectionTitleStyle = {
//   fontSize: "18px",
//   fontWeight: 700,
//   color: "#111827",
//   marginBottom: "20px",
// };

// const infoLabelStyle = {
//   fontSize: "12px",
//   color: "#9CA3AF",
//   marginBottom: "4px",
// };

// const StatsCard = ({ title, value, icon, iconBg, iconColor }) => (
//   <div style={cardStyle}>
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

// const ProgressStat = ({ label, value, unit, valueColor }) => (
//   <div>
//     <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "8px" }}>
//       {label}
//     </div>
//     <div
//       style={{
//         fontSize: "24px",
//         fontWeight: 700,
//         color: valueColor || "#111827",
//       }}
//     >
//       {value}
//     </div>
//     <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
//       {unit}
//     </div>
//   </div>
// );

// const ActionButton = ({ label, icon, onClick, variant }) => {
//   const variants = {
//     green: {
//       bg: "#10B981",
//       color: "white",
//       border: "none",
//       shadow: "0 4px 12px rgba(16,185,129,0.3)",
//     },
//     "green-outline": {
//       bg: "white",
//       color: "#10B981",
//       border: "2px solid #10B981",
//       shadow: "none",
//     },
//     "danger-outline": {
//       bg: "white",
//       color: "#DC2626",
//       border: "2px solid #DC2626",
//       shadow: "none",
//     },
//     purple: {
//       bg: "#6D28D9",
//       color: "white",
//       border: "none",
//       shadow: "0 4px 12px rgba(109,40,217,0.3)",
//     },
//   };
//   const v = variants[variant] || variants.green;
//   return (
//     <button
//       onClick={onClick}
//       style={{
//         padding: "12px 24px",
//         background: v.bg,
//         color: v.color,
//         fontSize: "14px",
//         fontWeight: 600,
//         borderRadius: "8px",
//         border: v.border,
//         cursor: "pointer",
//         boxShadow: v.shadow,
//         display: "flex",
//         alignItems: "center",
//         gap: "8px",
//         transition: "opacity 0.2s",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.opacity = "0.85";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.opacity = "1";
//       }}
//     >
//       {icon}
//       {label}
//     </button>
//   );
// };

// const SmallButton = ({ label, icon, color, onClick }) => (
//   <button
//     onClick={onClick}
//     style={{
//       padding: "6px 12px",
//       background: "white",
//       color,
//       fontSize: "12px",
//       fontWeight: 600,
//       borderRadius: "6px",
//       border: `2px solid ${color}`,
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       gap: "6px",
//       transition: "all 0.2s ease",
//     }}
//     onMouseEnter={(e) => {
//       e.currentTarget.style.background = color;
//       e.currentTarget.style.color = "white";
//     }}
//     onMouseLeave={(e) => {
//       e.currentTarget.style.background = "white";
//       e.currentTarget.style.color = color;
//     }}
//   >
//     {icon}
//     {label}
//   </button>
// );

// const Overlay = ({ children, onClick }) => (
//   <div
//     onClick={onClick}
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 1000,
//       padding: "24px",
//     }}
//   >
//     {children}
//   </div>
// );

// const ModalBox = ({ children, onClick, maxWidth, flex }) => (
//   <div
//     onClick={onClick}
//     style={{
//       background: "white",
//       borderRadius: "16px",
//       maxWidth: maxWidth || "600px",
//       width: "100%",
//       maxHeight: "90vh",
//       overflow: flex ? "hidden" : "auto",
//       boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//       display: flex ? "flex" : "block",
//       flexDirection: flex ? "column" : undefined,
//     }}
//   >
//     {children}
//   </div>
// );

// const ModalHeader = ({ title, onClose }) => (
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "24px 32px",
//       borderBottom: "1px solid #E5E7EB",
//       position: "sticky",
//       top: 0,
//       background: "white",
//       zIndex: 1,
//     }}
//   >
//     <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>
//       {title}
//     </h3>
//     <CloseButton onClick={onClose} />
//   </div>
// );

// const CloseButton = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     style={{
//       width: "36px",
//       height: "36px",
//       borderRadius: "8px",
//       background: "#F3F4F6",
//       border: "none",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       cursor: "pointer",
//       color: "#6B7280",
//     }}
//   >
//     <X size={20} />
//   </button>
// );

// const ModalFooter = ({
//   onCancel,
//   confirmLabel,
//   confirmIcon,
//   isLoading,
//   isSubmit,
//   onConfirm,
// }) => (
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "flex-end",
//       gap: "12px",
//       marginTop: "8px",
//     }}
//   >
//     <button
//       type="button"
//       onClick={onCancel}
//       disabled={isLoading}
//       style={{
//         padding: "12px 24px",
//         background: "white",
//         color: "#374151",
//         fontSize: "14px",
//         fontWeight: 600,
//         borderRadius: "8px",
//         border: "1px solid #E5E7EB",
//         cursor: isLoading ? "not-allowed" : "pointer",
//         opacity: isLoading ? 0.6 : 1,
//       }}
//     >
//       Cancel
//     </button>
//     <button
//       type={isSubmit ? "submit" : "button"}
//       onClick={isSubmit ? undefined : onConfirm}
//       disabled={isLoading}
//       style={{
//         padding: "12px 24px",
//         background: isLoading ? "#9CA3AF" : "#10B981",
//         color: "white",
//         fontSize: "14px",
//         fontWeight: 600,
//         borderRadius: "8px",
//         border: "none",
//         cursor: isLoading ? "not-allowed" : "pointer",
//         boxShadow: isLoading ? "none" : "0 4px 12px rgba(16,185,129,0.3)",
//         display: "flex",
//         alignItems: "center",
//         gap: "8px",
//       }}
//     >
//       {isLoading ? (
//         "Saving..."
//       ) : (
//         <>
//           {confirmIcon}
//           {confirmLabel}
//         </>
//       )}
//     </button>
//   </div>
// );

// const ErrorBanner = ({ message }) => (
//   <div
//     style={{
//       padding: "12px 16px",
//       background: "#FEE2E2",
//       borderRadius: "8px",
//       marginBottom: "20px",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//     }}
//   >
//     <AlertCircle size={16} color="#DC2626" />
//     <span style={{ fontSize: "14px", color: "#DC2626" }}>
//       {message || "Something went wrong. Please try again."}
//     </span>
//   </div>
// );

// const ConfirmModal = ({
//   icon,
//   iconBg,
//   title,
//   message,
//   onCancel,
//   onConfirm,
//   confirmLabel,
//   confirmColor,
//   isLoading,
//   error,
// }) => (
//   <Overlay onClick={onCancel}>
//     <ModalBox onClick={(e) => e.stopPropagation()} maxWidth="500px">
//       <div style={{ padding: "24px 32px", borderBottom: "1px solid #E5E7EB" }}>
//         <div
//           style={{
//             width: "56px",
//             height: "56px",
//             borderRadius: "50%",
//             background: iconBg,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             margin: "0 auto 16px",
//           }}
//         >
//           {icon}
//         </div>
//         <h3
//           style={{
//             fontSize: "20px",
//             fontWeight: 700,
//             color: "#111827",
//             textAlign: "center",
//             marginBottom: "8px",
//           }}
//         >
//           {title}
//         </h3>
//         <p style={{ fontSize: "14px", color: "#6B7280", textAlign: "center" }}>
//           {message}
//         </p>
//       </div>
//       {error && <ErrorBanner message={error} />}
//       <div style={{ padding: "20px 32px", display: "flex", gap: "12px" }}>
//         <button
//           onClick={onCancel}
//           disabled={isLoading}
//           style={{
//             flex: 1,
//             padding: "12px 24px",
//             background: "white",
//             color: "#374151",
//             fontSize: "14px",
//             fontWeight: 600,
//             borderRadius: "8px",
//             border: "1px solid #E5E7EB",
//             cursor: isLoading ? "not-allowed" : "pointer",
//             opacity: isLoading ? 0.6 : 1,
//           }}
//         >
//           Cancel
//         </button>
//         <button
//           onClick={onConfirm}
//           disabled={isLoading}
//           style={{
//             flex: 1,
//             padding: "12px 24px",
//             background: isLoading ? "#9CA3AF" : confirmColor,
//             color: "white",
//             fontSize: "14px",
//             fontWeight: 600,
//             borderRadius: "8px",
//             border: "none",
//             cursor: isLoading ? "not-allowed" : "pointer",
//             boxShadow: isLoading ? "none" : `0 4px 12px ${confirmColor}44`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "8px",
//           }}
//         >
//           {isLoading ? "Please wait..." : confirmLabel}
//         </button>
//       </div>
//     </ModalBox>
//   </Overlay>
// );

// export default HouseholdDueDetail;

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  X,
  Save,
  Plus,
  Home,
  Trash2,
  XCircle,
  Banknote,
  Search,
  RefreshCw,
  Users,
} from "lucide-react";
import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RECURRENCE_OPTIONS = [
  { value: "one_time", label: "One Time" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "biannual", label: "Every 6 Months" },
  { value: "yearly", label: "Yearly" },
];

const recurrenceLabel = (type) =>
  RECURRENCE_OPTIONS.find((o) => o.value === type)?.label || type;

const getStatusColor = (status) => {
  switch (status) {
    case "paid":
      return { bg: "#D1FAE5", color: "#065F46" };
    case "unpaid":
      return { bg: "#FEF3C7", color: "#92400E" };
    case "overdue":
      return { bg: "#FEE2E2", color: "#991B1B" };
    case "waived":
      return { bg: "#E0E7FF", color: "#3730A3" };
    case "manual":
      return { bg: "#DBEAFE", color: "#1E40AF" };
    default:
      return { bg: "#F3F4F6", color: "#6B7280" };
  }
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const formatDateShort = (dateStr) =>
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

const cardStyle = {
  background: "white",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)",
};

const sectionTitleStyle = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#111827",
  marginBottom: "20px",
};

const infoLabelStyle = {
  fontSize: "12px",
  color: "#9CA3AF",
  marginBottom: "4px",
};

// ─── HouseholdDueDetail ───────────────────────────────────────────────────────

const HouseholdDueDetail = () => {
  const { id: dueId } = useParams();
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedHouseholds, setSelectedHouseholds] = useState({});
  const [showWaiveConfirm, setShowWaiveConfirm] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showManualPaymentConfirm, setShowManualPaymentConfirm] =
    useState(null);
  const [showGenerateConfirm, setShowGenerateConfirm] = useState(false);
  const [assignSearchTerm, setAssignSearchTerm] = useState("");

  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );
  const clanId = selectedEstate?._id;

  // ── Data fetching ──
  const {
    data: dueResponse,
    isLoading: loading,
    error,
  } = useFetchDataV2(`/v1/householdDue/due/${dueId}`, `householdDue-${dueId}`);
  const due = dueResponse?.data;

  const { data: householdsResponse, isLoading: loadingHouseholds } =
    useFetchDataV2(`/v1/household/${clanId}`, `households-${clanId}`);
  const allHouseholds = householdsResponse?.data || [];

  // ── Mutations ──
  const updateDueMutation = useMutateDataV2(`householdDue-${dueId}`, "PATCH");
  const assignHouseholdsMutation = useMutateDataV2(
    `householdDue-${dueId}`,
    "POST",
  );
  const waiveMutation = useMutateDataV2(`householdDue-${dueId}`, "POST");
  const deleteMutation = useMutateDataV2(`householdDue-${dueId}`, "DELETE");
  const manualPaymentMutation = useMutateDataV2(
    `householdDue-${dueId}`,
    "POST",
  );
  const generateNextMutation = useMutateDataV2(`householdDue-${dueId}`, "POST");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    isActive: true,
  });

  // ── Computed ──
  const alreadyAssignedIds = new Set(
    (due?.households || []).map((h) => h.household._id),
  );
  const availableHouseholds = allHouseholds.filter(
    (h) => !alreadyAssignedIds.has(h._id),
  );
  const filteredAssignHouseholds = availableHouseholds.filter((h) =>
    h?.name?.toLowerCase().includes(assignSearchTerm.toLowerCase()),
  );
  const allSelected =
    filteredAssignHouseholds.length > 0 &&
    filteredAssignHouseholds.every((h) => selectedHouseholds[h._id]);
  const someSelected =
    filteredAssignHouseholds.some((h) => selectedHouseholds[h._id]) &&
    !allSelected;

  const isRecurring = due?.recurrenceType && due.recurrenceType !== "one_time";
  const canDelete = due && due.totalPaid === 0 && due.collectedTotal === 0;

  // ── Handlers ──
  const handleOpenEdit = () => {
    setFormData({
      title: due.title,
      description: due.description,
      dueDate: due.dueDate
        ? new Date(due.dueDate).toISOString().split("T")[0]
        : "",
      isActive: due.isActive,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updates = {};
    if (formData.title !== due.title) updates.title = formData.title;
    if (formData.description !== due.description)
      updates.description = formData.description;
    if (formData.isActive !== due.isActive)
      updates.isActive = formData.isActive;
    // For one_time dues admin can still update the due date manually
    if (
      !isRecurring &&
      formData.dueDate !== new Date(due.dueDate).toISOString().split("T")[0]
    ) {
      updates.dueDate = formData.dueDate;
    }

    if (Object.keys(updates).length === 0) {
      setShowEditModal(false);
      return;
    }

    try {
      await updateDueMutation.mutateAsync({
        url: `/v1/householdDue/due/${dueId}`,
        data: updates,
      });
      setShowEditModal(false);
      toast.success("Due updated successfully");
    } catch (err) {
      console.error("Error updating due:", err);
    }
  };

  const handleOpenAssign = () => {
    setSelectedHouseholds({});
    setAssignSearchTerm("");
    setShowAssignModal(true);
  };

  const handleToggleHousehold = (id) => {
    setSelectedHouseholds((prev) => {
      if (prev[id]) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: "unpaid" };
    });
  };

  const handleSelectAll = () => {
    const all = {};
    filteredAssignHouseholds.forEach((h) => {
      all[h._id] = "unpaid";
    });
    setSelectedHouseholds(all);
  };
  const handleDeselectAll = () => setSelectedHouseholds({});

  const handleAssignHouseholds = async () => {
    const householdIds = Object.keys(selectedHouseholds);
    if (householdIds.length === 0) return;
    try {
      await assignHouseholdsMutation.mutateAsync({
        url: `/v1/householdDue/due/${dueId}`,
        data: { householdIds, statuses: selectedHouseholds },
      });
      setShowAssignModal(false);
      setSelectedHouseholds({});
      setAssignSearchTerm("");
      toast.success("Households assigned successfully");
    } catch (err) {
      console.error("Error assigning households:", err);
    }
  };

  const handleWaiveHousehold = async (householdId) => {
    try {
      await waiveMutation.mutateAsync({
        url: `/v1/householdDue/waive`,
        data: { householdId, duesId: dueId },
      });
      setShowWaiveConfirm(null);
      toast.success("Payment waived");
    } catch (err) {
      console.error("Error waiving household:", err);
    }
  };

  const handleManualPayment = async (householdId) => {
    try {
      await manualPaymentMutation.mutateAsync({
        url: `/v1/householdDue/manual-payment`,
        data: { householdId, duesId: dueId },
      });
      setShowManualPaymentConfirm(null);
      toast.success("Manual payment recorded");
    } catch (err) {
      console.error("Error recording manual payment:", err);
    }
  };

  const handleDeleteDue = async () => {
    try {
      await deleteMutation.mutateAsync({
        url: `/v1/householdDue/waive`,
        data: { duesId: dueId },
      });
      setShowDeleteConfirm(false);
      toast.success("Due deleted");
      navigate(-1);
    } catch (err) {
      console.error("Error deleting due:", err);
    }
  };

  const handleGenerateNextPeriod = async () => {
    try {
      await generateNextMutation.mutateAsync({
        url: `/v1/householdDue/due/${dueId}/generate-next`,
        data: {},
      });
      setShowGenerateConfirm(false);
      toast.success("Next period generated successfully!");
      navigate("/estate-admin/household-dues");
    } catch (err) {
      console.error("Error generating next period:", err);
    }
  };

  // ── Loading / Error ──
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <p style={{ fontSize: "14px", color: "#6B7280" }}>Loading...</p>
      </div>
    );
  }

  if (error || !due) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <AlertCircle
          size={32}
          color="#DC2626"
          style={{ marginBottom: "16px" }}
        />
        <p
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "8px",
          }}
        >
          Error loading due
        </p>
        <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "24px" }}>
          {error?.message || "Due not found"}
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "12px 24px",
            background: "#10B981",
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const isOverdue = new Date(due.dueDate) < new Date();
  const completionRate =
    due.expectedTotal > 0
      ? ((due.collectedTotal / due.expectedTotal) * 100).toFixed(1)
      : 0;

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
      {/* ── Back ── */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          background: "white",
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: 500,
          color: "#374151",
          cursor: "pointer",
          marginBottom: "24px",
        }}
      >
        <ArrowLeft size={16} /> Back to Dues
      </button>

      {/* ── Title + Actions ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "32px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
              flexWrap: "wrap",
            }}
          >
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>
              {due.title}
            </h1>
            {/* Active badge */}
            <span
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                background: due.isActive ? "#D1FAE5" : "#F3F4F6",
                color: due.isActive ? "#065F46" : "#6B7280",
              }}
            >
              {due.isActive ? "Active" : "Inactive"}
            </span>
            {/* Recurrence badge */}
            <span
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                background: isRecurring ? "#EDE9FE" : "#F3F4F6",
                color: isRecurring ? "#6D28D9" : "#6B7280",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {isRecurring && <RefreshCw size={11} />}
              {recurrenceLabel(due.recurrenceType || "one_time")}
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>
            {due.description}
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {canDelete && (
            <ActionBtn
              label="Delete"
              icon={<Trash2 size={16} />}
              onClick={() => setShowDeleteConfirm(true)}
              variant="danger"
            />
          )}
          {isRecurring && (
            <ActionBtn
              label="Generate Next Period"
              icon={<RefreshCw size={16} />}
              onClick={() => setShowGenerateConfirm(true)}
              variant="purple"
            />
          )}
          <ActionBtn
            label="Assign Households"
            icon={<Plus size={16} />}
            onClick={handleOpenAssign}
            variant="green-outline"
          />
          <ActionBtn
            label="Edit Due"
            icon={<Edit size={16} />}
            onClick={handleOpenEdit}
            variant="green"
          />
        </div>
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
          title="Default Amount"
          value={`₦${due.defaultAmount.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          iconBg="#FEF3C7"
          iconColor="#F59E0B"
        />
        <StatsCard
          title="Expected Total"
          value={`₦${due.expectedTotal.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          iconBg="#DBEAFE"
          iconColor="#3B82F6"
        />
        <StatsCard
          title="Collected"
          value={`₦${due.collectedTotal.toLocaleString()}`}
          icon={<CheckCircle size={24} />}
          iconBg="#D1FAE5"
          iconColor="#10B981"
        />
        <StatsCard
          title="Outstanding"
          value={`₦${due.outstandingTotal.toLocaleString()}`}
          icon={<AlertCircle size={24} />}
          iconBg="#FEE2E2"
          iconColor="#DC2626"
        />
      </div>

      {/* ── Main grid ── */}
      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}
      >
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Payment Progress */}
          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>Payment Progress</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              <ProgStat
                label="Total Assigned"
                value={due.totalAssigned}
                unit="households"
              />
              <ProgStat
                label="Must Pay"
                value={due.totalMustPay}
                unit="households"
              />
              <ProgStat
                label="Paid"
                value={due.totalPaid}
                unit="households"
                valueColor="#10B981"
              />
              <ProgStat
                label="Exempted"
                value={due.totalExempted}
                unit="households"
                valueColor="#6B7280"
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  Completion Rate
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#10B981",
                  }}
                >
                  {completionRate}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "12px",
                  background: "#F3F4F6",
                  borderRadius: "6px",
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
          </div>

          {/* Assigned Households */}
          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>
              Assigned Households ({due.households?.length || 0})
            </h3>
            {due.households && due.households.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {due.households.map((item) => {
                  const sc = getStatusColor(item.status);
                  const canAct =
                    item.status !== "paid" &&
                    item.status !== "waived" &&
                    item.status !== "manual";
                  return (
                    <div
                      key={item._id}
                      style={{
                        padding: "16px",
                        background: "#F9FAFB",
                        borderRadius: "10px",
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
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              marginBottom: "8px",
                            }}
                          >
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "8px",
                                background: "#E0E7FF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#6366F1",
                              }}
                            >
                              <Home size={20} />
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: "#111827",
                                }}
                              >
                                {item.household.name}
                              </div>
                              <div
                                style={{ fontSize: "13px", color: "#6B7280" }}
                              >
                                {item.household.type} • {item.household.address}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "16px",
                              fontSize: "13px",
                            }}
                          >
                            <div>
                              <span style={{ color: "#9CA3AF" }}>
                                Amount Due:{" "}
                              </span>
                              <span
                                style={{
                                  fontWeight: 600,
                                  color: "#111827",
                                  fontFamily: "monospace",
                                }}
                              >
                                ₦{item.amountDue.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span style={{ color: "#9CA3AF" }}>
                                Amount Paid:{" "}
                              </span>
                              <span
                                style={{
                                  fontWeight: 600,
                                  color: "#10B981",
                                  fontFamily: "monospace",
                                }}
                              >
                                ₦{item.amountPaid.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginLeft: "16px",
                          }}
                        >
                          <span
                            style={{
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: 600,
                              background: sc.bg,
                              color: sc.color,
                              textTransform: "capitalize",
                            }}
                          >
                            {item.status}
                          </span>
                          {canAct && (
                            <>
                              <SmallBtn
                                label="Cash"
                                icon={<Banknote size={14} />}
                                color="#3B82F6"
                                onClick={() =>
                                  setShowManualPaymentConfirm({
                                    householdId: item.household._id,
                                    householdName: item.household.name,
                                    amountDue: item.amountDue,
                                  })
                                }
                              />
                              <SmallBtn
                                label="Waive"
                                icon={<XCircle size={14} />}
                                color="#6366F1"
                                onClick={() =>
                                  setShowWaiveConfirm({
                                    householdId: item.household._id,
                                    householdName: item.household.name,
                                  })
                                }
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  padding: "32px",
                  textAlign: "center",
                  background: "#F9FAFB",
                  borderRadius: "8px",
                }}
              >
                <Users
                  size={32}
                  color="#D1D5DB"
                  style={{ margin: "0 auto 12px" }}
                />
                <p style={{ fontSize: "14px", color: "#6B7280" }}>
                  No households assigned yet
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right column — Due Info */}
        <div>
          <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>Due Information</h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Period dates — different display for one_time vs recurring */}
              {isRecurring ? (
                <>
                  {/* Period Start */}
                  {due.startDate && (
                    <div>
                      <div style={infoLabelStyle}>Period Start</div>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background: "#F0FDF4",
                        }}
                      >
                        <Calendar size={16} color="#10B981" />
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#065F46",
                          }}
                        >
                          {formatDate(due.startDate)}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Period End */}
                  <div>
                    <div style={infoLabelStyle}>Period End</div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        background: isOverdue ? "#FEE2E2" : "#DBEAFE",
                      }}
                    >
                      <Calendar
                        size={16}
                        color={isOverdue ? "#DC2626" : "#3B82F6"}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: isOverdue ? "#DC2626" : "#3B82F6",
                        }}
                      >
                        {formatDate(due.dueDate)}
                      </span>
                    </div>
                    {isOverdue && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#DC2626",
                          marginTop: "6px",
                        }}
                      >
                        This period has ended
                      </p>
                    )}
                  </div>
                </>
              ) : (
                /* One-time due date */
                <div>
                  <div style={infoLabelStyle}>Due Date</div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: isOverdue ? "#FEE2E2" : "#DBEAFE",
                    }}
                  >
                    <Calendar
                      size={16}
                      color={isOverdue ? "#DC2626" : "#3B82F6"}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: isOverdue ? "#DC2626" : "#3B82F6",
                      }}
                    >
                      {formatDate(due.dueDate)}
                    </span>
                  </div>
                </div>
              )}

              {/* Recurrence */}
              <div>
                <div style={infoLabelStyle}>Recurrence</div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: isRecurring ? "#EDE9FE" : "#F3F4F6",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: isRecurring ? "#6D28D9" : "#6B7280",
                  }}
                >
                  {isRecurring && <RefreshCw size={14} />}
                  {recurrenceLabel(due.recurrenceType || "one_time")}
                </div>
              </div>

              {/* Category */}
              <div>
                <div style={infoLabelStyle}>Category</div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111827",
                    textTransform: "capitalize",
                  }}
                >
                  {due.category?.replace(/_/g, " ")}
                </div>
              </div>

              {/* Created By */}
              <div>
                <div style={infoLabelStyle}>Created By</div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111827",
                  }}
                >
                  {due.createdBy?.name || due.createdBy?.email || "N/A"}
                </div>
              </div>

              {/* Created At */}
              <div>
                <div style={infoLabelStyle}>Created At</div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111827",
                  }}
                >
                  {formatDateShort(due.createdAt)}
                </div>
              </div>

              {/* Last Updated */}
              <div>
                <div style={infoLabelStyle}>Last Updated</div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111827",
                  }}
                >
                  {formatDateShort(due.updatedAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MODALS
      ══════════════════════════════════════════ */}

      {/* ── Edit Modal ── */}
      {showEditModal && (
        <Overlay onClick={() => setShowEditModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()} maxWidth="600px">
            <ModalHeader
              title="Edit Due"
              onClose={() => setShowEditModal(false)}
            />
            <form onSubmit={handleUpdate} style={{ padding: "32px" }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
              {/* Only show due date edit for one_time dues */}
              {!isRecurring && (
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>
              )}
              {/* For recurring, show read-only period info */}
              {isRecurring && due.startDate && (
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "14px 16px",
                    background: "#F5F3FF",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#5B21B6",
                      fontWeight: 600,
                      margin: "0 0 4px",
                    }}
                  >
                    Current Period
                  </p>
                  <p style={{ fontSize: "14px", color: "#374151", margin: 0 }}>
                    {formatDateShort(due.startDate)} →{" "}
                    {formatDateShort(due.dueDate)}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9CA3AF",
                      margin: "4px 0 0",
                    }}
                  >
                    Period dates are set automatically. Use "Generate Next
                    Period" to create a new period.
                  </p>
                </div>
              )}
              <div style={{ marginBottom: "32px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    Active
                  </span>
                </label>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#6B7280",
                    marginTop: "8px",
                    marginLeft: "32px",
                  }}
                >
                  Inactive dues won't be visible to households
                </p>
              </div>
              {updateDueMutation.isError && (
                <ErrorBanner message={updateDueMutation.error?.message} />
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >
                <GhostBtn
                  label="Cancel"
                  onClick={() => setShowEditModal(false)}
                  disabled={updateDueMutation.isPending}
                />
                <GreenBtn
                  label={
                    updateDueMutation.isPending ? "Saving..." : "Save Changes"
                  }
                  icon={<Save size={16} />}
                  type="submit"
                  disabled={updateDueMutation.isPending}
                />
              </div>
            </form>
          </ModalBox>
        </Overlay>
      )}

      {/* ── Assign Households Modal ── */}
      {showAssignModal && (
        <Overlay onClick={() => setShowAssignModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()} maxWidth="700px" flex>
            {/* Header */}
            <div
              style={{
                padding: "24px 32px",
                borderBottom: "1px solid #E5E7EB",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  Assign Households
                </h3>
                <CloseBtn onClick={() => setShowAssignModal(false)} />
              </div>
              {/* Search */}
              <div style={{ position: "relative", marginBottom: "12px" }}>
                <Search
                  size={16}
                  color="#9CA3AF"
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search households..."
                  value={assignSearchTerm}
                  onChange={(e) => setAssignSearchTerm(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: "36px" }}
                />
              </div>
              {/* Select all */}
              {filteredAssignHouseholds.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    background: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      allSelected ? handleDeselectAll() : handleSelectAll();
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = someSelected;
                      }}
                      onChange={() => {
                        allSelected ? handleDeselectAll() : handleSelectAll();
                      }}
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#374151",
                      }}
                    >
                      {allSelected
                        ? "Deselect All"
                        : someSelected
                          ? `${Object.keys(selectedHouseholds).length} selected`
                          : "Select All"}
                    </span>
                  </label>
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>
                    {filteredAssignHouseholds.length}{" "}
                    {assignSearchTerm ? "found" : "available"}
                  </span>
                </div>
              )}
            </div>

            {/* List */}
            <div style={{ padding: "24px 32px", overflowY: "auto", flex: 1 }}>
              {loadingHouseholds ? (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#6B7280",
                  }}
                >
                  Loading...
                </p>
              ) : filteredAssignHouseholds.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px" }}>
                  <Users
                    size={48}
                    color="#D1D5DB"
                    style={{ margin: "0 auto 16px" }}
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {assignSearchTerm
                      ? "No matches found"
                      : "No households available"}
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {filteredAssignHouseholds.map((household) => {
                    const isSelected = !!selectedHouseholds[household._id];
                    return (
                      <div
                        key={household._id}
                        style={{
                          padding: "16px",
                          background: isSelected ? "#F0FDF4" : "#F9FAFB",
                          border: isSelected
                            ? "2px solid #10B981"
                            : "2px solid transparent",
                          borderRadius: "10px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => handleToggleHousehold(household._id)}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              handleToggleHousehold(household._id)
                            }
                            onClick={(e) => e.stopPropagation()}
                            style={{ width: "20px", height: "20px" }}
                          />
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "8px",
                              background: "#E0E7FF",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#6366F1",
                            }}
                          >
                            <Home size={20} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#111827",
                              }}
                            >
                              {household.name}
                            </div>
                            <div style={{ fontSize: "13px", color: "#6B7280" }}>
                              {household.type} • {household.address}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div
                            style={{
                              marginTop: "12px",
                              paddingTop: "12px",
                              borderTop: "1px solid #E5E7EB",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <label style={{ ...labelStyle, fontSize: "13px" }}>
                              Payment Status
                            </label>
                            <select
                              value={selectedHouseholds[household._id]}
                              onChange={(e) =>
                                setSelectedHouseholds((prev) => ({
                                  ...prev,
                                  [household._id]: e.target.value,
                                }))
                              }
                              style={{ ...inputStyle, padding: "8px 12px" }}
                            >
                              <option value="unpaid">Unpaid</option>
                              <option value="paid">Paid</option>
                              <option value="overdue">Overdue</option>
                              <option value="waived">Waived</option>
                              <option value="manual">Manual (Cash)</option>
                            </select>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "20px 32px",
                borderTop: "1px solid #E5E7EB",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "14px", color: "#6B7280" }}>
                {Object.keys(selectedHouseholds).length} household(s) selected
              </span>
              <div style={{ display: "flex", gap: "12px" }}>
                <GhostBtn
                  label="Cancel"
                  onClick={() => setShowAssignModal(false)}
                  disabled={assignHouseholdsMutation.isPending}
                />
                <GreenBtn
                  label={
                    assignHouseholdsMutation.isPending
                      ? "Assigning..."
                      : "Assign Households"
                  }
                  disabled={
                    Object.keys(selectedHouseholds).length === 0 ||
                    assignHouseholdsMutation.isPending
                  }
                  onClick={handleAssignHouseholds}
                />
              </div>
            </div>
          </ModalBox>
        </Overlay>
      )}

      {/* ── Generate Next Period ── */}
      {showGenerateConfirm && (
        <Overlay onClick={() => setShowGenerateConfirm(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()} maxWidth="500px">
            <div
              style={{
                padding: "24px 32px",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#EDE9FE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <RefreshCw size={28} color="#6D28D9" />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#111827",
                  textAlign: "center",
                  marginBottom: "8px",
                }}
              >
                Generate Next Period
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                This will create a new{" "}
                <strong style={{ color: "#6D28D9" }}>
                  {recurrenceLabel(due.recurrenceType)}
                </strong>{" "}
                due starting from{" "}
                <strong style={{ color: "#111827" }}>
                  {formatDateShort(due.dueDate)}
                </strong>
                . All{" "}
                <strong style={{ color: "#111827" }}>
                  {due.totalAssigned} households
                </strong>{" "}
                will carry over with payment reset to unpaid.
              </p>
              <div
                style={{
                  padding: "12px 16px",
                  background: "#F5F3FF",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <AlertCircle
                  size={16}
                  color="#6D28D9"
                  style={{ marginTop: "2px", flexShrink: 0 }}
                />
                <p style={{ fontSize: "13px", color: "#5B21B6", margin: 0 }}>
                  After generating, you can open the new due to add or remove
                  households before it goes live.
                </p>
              </div>
            </div>
            {generateNextMutation.isError && (
              <ErrorBanner
                message={
                  generateNextMutation.error?.message ||
                  "Failed to generate next period"
                }
              />
            )}
            <div style={{ padding: "20px 32px", display: "flex", gap: "12px" }}>
              <GhostBtn
                label="Cancel"
                onClick={() => setShowGenerateConfirm(false)}
                disabled={generateNextMutation.isPending}
                flex
              />
              <button
                onClick={handleGenerateNextPeriod}
                disabled={generateNextMutation.isPending}
                style={{
                  flex: 1,
                  padding: "12px 24px",
                  background: generateNextMutation.isPending
                    ? "#9CA3AF"
                    : "#6D28D9",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  border: "none",
                  cursor: generateNextMutation.isPending
                    ? "not-allowed"
                    : "pointer",
                  boxShadow: "0 4px 12px rgba(109,40,217,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {generateNextMutation.isPending ? (
                  "Generating..."
                ) : (
                  <>
                    <RefreshCw size={16} /> Generate Next Period
                  </>
                )}
              </button>
            </div>
          </ModalBox>
        </Overlay>
      )}

      {/* ── Waive Confirm ── */}
      {showWaiveConfirm && (
        <ConfirmModal
          icon={<XCircle size={28} color="#6366F1" />}
          iconBg="#E0E7FF"
          title="Waive Payment"
          message={
            <>
              Are you sure you want to waive the payment for{" "}
              <strong style={{ color: "#111827" }}>
                {showWaiveConfirm.householdName}
              </strong>
              ? This action cannot be undone.
            </>
          }
          onCancel={() => setShowWaiveConfirm(null)}
          onConfirm={() => handleWaiveHousehold(showWaiveConfirm.householdId)}
          confirmLabel={
            waiveMutation.isPending ? "Waiving..." : "Waive Payment"
          }
          confirmColor="#6366F1"
          isLoading={waiveMutation.isPending}
          error={waiveMutation.isError ? waiveMutation.error?.message : null}
        />
      )}

      {/* ── Manual Payment Confirm ── */}
      {showManualPaymentConfirm && (
        <ConfirmModal
          icon={<Banknote size={28} color="#3B82F6" />}
          iconBg="#DBEAFE"
          title="Record Manual Payment"
          message={
            <>
              Mark payment as received in cash for{" "}
              <strong style={{ color: "#111827" }}>
                {showManualPaymentConfirm.householdName}
              </strong>
              ?
              <div
                style={{
                  marginTop: "16px",
                  padding: "16px",
                  background: "#F9FAFB",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#6B7280",
                      fontWeight: 500,
                    }}
                  >
                    Amount Due
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#111827",
                      fontFamily: "monospace",
                    }}
                  >
                    ₦{showManualPaymentConfirm.amountDue.toLocaleString()}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 12px",
                    background: "#EFF6FF",
                    borderRadius: "8px",
                  }}
                >
                  <AlertCircle size={16} color="#3B82F6" />
                  <span style={{ fontSize: "12px", color: "#1E40AF" }}>
                    This will mark the full amount as paid via cash
                  </span>
                </div>
              </div>
            </>
          }
          onCancel={() => setShowManualPaymentConfirm(null)}
          onConfirm={() =>
            handleManualPayment(showManualPaymentConfirm.householdId)
          }
          confirmLabel={
            manualPaymentMutation.isPending ? "Recording..." : "Confirm Payment"
          }
          confirmColor="#3B82F6"
          isLoading={manualPaymentMutation.isPending}
          error={
            manualPaymentMutation.isError
              ? manualPaymentMutation.error?.message
              : null
          }
        />
      )}

      {/* ── Delete Confirm ── */}
      {showDeleteConfirm && (
        <ConfirmModal
          icon={<Trash2 size={28} color="#DC2626" />}
          iconBg="#FEE2E2"
          title="Delete Household Due"
          message={
            <>
              Are you sure you want to delete{" "}
              <strong style={{ color: "#111827" }}>"{due.title}"</strong>? This
              action cannot be undone.
              {due.totalAssigned > 0 && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "12px",
                    background: "#FEF3C7",
                    borderRadius: "8px",
                    fontSize: "13px",
                    color: "#92400E",
                  }}
                >
                  <strong>Note:</strong> {due.totalAssigned} household(s) are
                  currently assigned to this due.
                </div>
              )}
            </>
          }
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDeleteDue}
          confirmLabel={deleteMutation.isPending ? "Deleting..." : "Delete Due"}
          confirmColor="#DC2626"
          isLoading={deleteMutation.isPending}
          error={deleteMutation.isError ? deleteMutation.error?.message : null}
        />
      )}
    </div>
  );
};

// ─── Reusable Sub-components ──────────────────────────────────────────────────

const StatsCard = ({ title, value, icon, iconBg, iconColor }) => (
  <div style={cardStyle}>
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

const ProgStat = ({ label, value, unit, valueColor }) => (
  <div>
    <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "8px" }}>
      {label}
    </div>
    <div
      style={{
        fontSize: "24px",
        fontWeight: 700,
        color: valueColor || "#111827",
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
      {unit}
    </div>
  </div>
);

const ActionBtn = ({ label, icon, onClick, variant }) => {
  const v =
    {
      green: {
        bg: "#10B981",
        color: "white",
        border: "none",
        shadow: "0 4px 12px rgba(16,185,129,0.3)",
      },
      "green-outline": {
        bg: "white",
        color: "#10B981",
        border: "2px solid #10B981",
        shadow: "none",
      },
      danger: {
        bg: "white",
        color: "#DC2626",
        border: "2px solid #DC2626",
        shadow: "none",
      },
      purple: {
        bg: "#6D28D9",
        color: "white",
        border: "none",
        shadow: "0 4px 12px rgba(109,40,217,0.3)",
      },
    }[variant] || {};
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 24px",
        background: v.bg,
        color: v.color,
        fontSize: "14px",
        fontWeight: 600,
        borderRadius: "8px",
        border: v.border,
        cursor: "pointer",
        boxShadow: v.shadow,
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.85";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
    >
      {icon}
      {label}
    </button>
  );
};

const SmallBtn = ({ label, icon, color, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "6px 12px",
      background: "white",
      color,
      fontSize: "12px",
      fontWeight: 600,
      borderRadius: "6px",
      border: `2px solid ${color}`,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = color;
      e.currentTarget.style.color = "white";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "white";
      e.currentTarget.style.color = color;
    }}
  >
    {icon}
    {label}
  </button>
);

const GhostBtn = ({ label, onClick, disabled, flex }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      flex: flex ? 1 : undefined,
      padding: "12px 24px",
      background: "white",
      color: "#374151",
      fontSize: "14px",
      fontWeight: 600,
      borderRadius: "8px",
      border: "1px solid #E5E7EB",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
    }}
  >
    {label}
  </button>
);

const GreenBtn = ({ label, icon, onClick, disabled, type }) => (
  <button
    type={type || "button"}
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: "12px 24px",
      background: disabled ? "#9CA3AF" : "#10B981",
      color: "white",
      fontSize: "14px",
      fontWeight: 600,
      borderRadius: "8px",
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: disabled ? "none" : "0 4px 12px rgba(16,185,129,0.3)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }}
  >
    {icon}
    {label}
  </button>
);

const Overlay = ({ children, onClick }) => (
  <div
    onClick={onClick}
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
  >
    {children}
  </div>
);

const ModalBox = ({ children, onClick, maxWidth, flex }) => (
  <div
    onClick={onClick}
    style={{
      background: "white",
      borderRadius: "16px",
      maxWidth: maxWidth || "600px",
      width: "100%",
      maxHeight: "90vh",
      overflow: flex ? "hidden" : "auto",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      display: flex ? "flex" : "block",
      flexDirection: flex ? "column" : undefined,
    }}
  >
    {children}
  </div>
);

const ModalHeader = ({ title, onClose }) => (
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
    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>
      {title}
    </h3>
    <CloseBtn onClick={onClose} />
  </div>
);

const CloseBtn = ({ onClick }) => (
  <button
    onClick={onClick}
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
);

const ErrorBanner = ({ message }) => (
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
      {message || "Something went wrong."}
    </span>
  </div>
);

const ConfirmModal = ({
  icon,
  iconBg,
  title,
  message,
  onCancel,
  onConfirm,
  confirmLabel,
  confirmColor,
  isLoading,
  error,
}) => (
  <Overlay onClick={onCancel}>
    <ModalBox onClick={(e) => e.stopPropagation()} maxWidth="500px">
      <div style={{ padding: "24px 32px", borderBottom: "1px solid #E5E7EB" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#111827",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: "14px", color: "#6B7280", textAlign: "center" }}>
          {message}
        </p>
      </div>
      {error && <ErrorBanner message={error} />}
      <div style={{ padding: "20px 32px", display: "flex", gap: "12px" }}>
        <GhostBtn label="Cancel" onClick={onCancel} disabled={isLoading} flex />
        <button
          onClick={onConfirm}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: "12px 24px",
            background: isLoading ? "#9CA3AF" : confirmColor,
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "8px",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
            boxShadow: isLoading ? "none" : `0 4px 12px ${confirmColor}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </ModalBox>
  </Overlay>
);

export default HouseholdDueDetail;
