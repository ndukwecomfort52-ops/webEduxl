


// import { useState, useMemo } from "react";
// import {
//   Plus,
//   Search,
//   X,
//   Wrench,
//   MapPin,
//   Calendar,
//   IdCard,
//   AlertCircle,
//   Globe2,
//   Pencil,
//   Trash2,
//   Briefcase,
// } from "lucide-react";
// import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";
// import { useSelector } from "react-redux";

// // ─── Constants ────────────────────────────────────────────────────────────────

// // State of origin options. Adjust/trim this list if your backend expects a
// // different format (e.g. lowercase slugs instead of display names).
// const NIGERIAN_STATES = [
//   "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
//   "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
//   "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
//   "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
//   "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT - Abuja",
// ];

// const NIN_REGEX = /^\d{11}$/;

// const DEFAULT_FORM = {
//   fullName: "",
//   details: "",
//   dob: "",
//   origin: "",
//   address: "",
//   nin: "",
//   typeOfJob: "",
// };

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// const formatDate = (dateStr) =>
//   dateStr
//     ? new Date(dateStr).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       })
//     : "—";

// // Converts a stored date (ISO string with time) into the "YYYY-MM-DD" shape
// // a <input type="date"> expects.
// const toDateInputValue = (dateStr) =>
//   dateStr ? new Date(dateStr).toISOString().split("T")[0] : "";

// const calculateAge = (dobStr) => {
//   if (!dobStr) return null;
//   const dob = new Date(dobStr);
//   const today = new Date();
//   let age = today.getFullYear() - dob.getFullYear();
//   const monthDiff = today.getMonth() - dob.getMonth();
//   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
//     age--;
//   }
//   return age;
// };

// // Masks all but the last 4 digits of a NIN, e.g. "•••••••1234"
// const maskNin = (nin) =>
//   nin && nin.length >= 4
//     ? `${"•".repeat(nin.length - 4)}${nin.slice(-4)}`
//     : nin || "—";

// // ─── Shared styles ────────────────────────────────────────────────────────────

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

// // ─── ArtisanScreen ──────────────────────────────────────────────────────────────

// const ArtisanScreen = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState("create"); // "create" | "edit"
//   const [editingId, setEditingId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [touched, setTouched] = useState(false);
//   const [confirmDeleteId, setConfirmDeleteId] = useState(null);

//     const { selectedEstate } = useSelector(
//     (state) => state?.reducer?.estateSlice,
//   );
//   const clanId = selectedEstate?._id;

//   console.log("selectedEstate", selectedEstate);

//   const [formData, setFormData] = useState(DEFAULT_FORM);

//   const age = useMemo(() => calculateAge(formData.dob), [formData.dob]);
//   const ninValid = NIN_REGEX.test(formData.nin);
//   const dobValid = formData.dob && new Date(formData.dob) <= new Date();

//   // GET /v1/artisan — clan is resolved server-side from the authenticated
//   // user via checkClanAccess, same as the poll module. No clanId needed here.
//   const {
//     data: artisanResponse,
//     isLoading: loading,
//     error,
//   } = useFetchDataV2("/v1/artisan", "artisans");

//   const artisans = artisanResponse?.data || [];

//   // useMutateDataV2 binds one HTTP method per hook, so create/update/delete
//   // each need their own instance.
//   const createArtisanMutation = useMutateDataV2("artisans", "POST");
//   const updateArtisanMutation = useMutateDataV2("artisans", "PATCH");
//   const deleteArtisanMutation = useMutateDataV2("artisans", "DELETE");

//   const activeMutation =
//     modalMode === "edit" ? updateArtisanMutation : createArtisanMutation;

//   const statesRepresented = useMemo(
//     () => new Set(artisans.map((a) => a.origin).filter(Boolean)).size,
//     [artisans],
//   );

//   const filteredArtisans = artisans.filter(
//     (a) =>
//       a.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       a.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       a.typeOfJob?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       a.address?.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const handleChange = (field) => (e) => {
//     let value = e.target.value;
//     if (field === "nin") {
//       value = value.replace(/\D/g, "").slice(0, 11); // digits only, capped at 11
//     }
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const openCreateModal = () => {
//     setModalMode("create");
//     setEditingId(null);
//     setFormData(DEFAULT_FORM);
//     setTouched(false);
//     setShowModal(true);
//   };

//   const openEditModal = (artisan) => {
//     setModalMode("edit");
//     setEditingId(artisan._id);
//     setFormData({
//       fullName: artisan.fullName || "",
//       details: artisan.details || "",
//       dob: toDateInputValue(artisan.dob),
//       origin: artisan.origin || "",
//       address: artisan.address || "",
//       nin: artisan.nin || "",
//       typeOfJob: artisan.typeOfJob || "",
//     });
//     setTouched(false);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalMode("create");
//     setEditingId(null);
//     setFormData(DEFAULT_FORM);
//     setTouched(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTouched(true);

//     if (!ninValid || !dobValid) return;

//     // Matches the .strict() zod schemas on the backend — no `clan`/`clanId`
//     // key here, since the controller derives it from req.clan, not the body.
//     const payload = {
//       fullName: formData.fullName,
//       details: formData.details,
//       dob: formData.dob,
//       origin: formData.origin,
//       address: formData.address,
//       nin: formData.nin,
//       typeOfJob: formData.typeOfJob,
//     };

//     try {
//       if (modalMode === "edit") {
//         await updateArtisanMutation.mutateAsync({
//           url: `/v1/artisan/admin/${editingId}`,
//           data: payload,
//         });
//       } else {
//         await createArtisanMutation.mutateAsync({
//           url: "/v1/artisan/admin",
//           data: payload,
//         });
//       }
//       closeModal();
//     } catch (err) {
//       console.error(
//         `Error ${modalMode === "edit" ? "updating" : "adding"} artisan:`,
//         err,
//       );
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteArtisanMutation.mutateAsync({
//         url: `/v1/artisan/admin/${id}`,
//       });
//       setConfirmDeleteId(null);
//     } catch (err) {
//       console.error("Error deleting artisan:", err);
//     }
//   };

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
//             Artisans
//           </h1>
//           <p style={{ fontSize: "14px", color: "#6B7280" }}>
//             {artisans.length} artisan{artisans.length === 1 ? "" : "s"}{" "}
//             registered
//           </p>
//         </div>
//         <button
//           onClick={openCreateModal}
//           style={{
//             padding: "12px 24px",
//             background: "#10B981",
//             color: "white",
//             fontSize: "14px",
//             fontWeight: 600,
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//           }}
//         >
//           <Plus size={16} /> Add Artisan
//         </button>
//       </div>

//       {/* ── Stats ── */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(2,1fr)",
//           gap: "24px",
//           marginBottom: "32px",
//         }}
//       >
//         <StatsCard
//           title="Total Artisans"
//           value={artisans.length}
//           icon={<Wrench size={24} />}
//           iconBg="#DBEAFE"
//           iconColor="#3B82F6"
//         />
//         <StatsCard
//           title="States Represented"
//           value={statesRepresented}
//           icon={<Globe2 size={24} />}
//           iconBg="#FEF3C7"
//           iconColor="#F59E0B"
//         />
//       </div>

//       {/* ── Search ── */}
//       <div
//         style={{
//           background: "white",
//           borderRadius: "12px",
//           padding: "20px 24px",
//           marginBottom: "24px",
//           boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)",
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
//             placeholder="Search by name, trade, state, or address..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{
//               ...inputStyle,
//               paddingLeft: "42px",
//               background: "#F9FAFB",
//             }}
//           />
//         </div>
//       </div>

//       {/* ── Delete error banner ── */}
//       {deleteArtisanMutation.isError && (
//         <div
//           style={{
//             padding: "12px 16px",
//             background: "#FEE2E2",
//             borderRadius: "8px",
//             marginBottom: "16px",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//           }}
//         >
//           <AlertCircle size={16} color="#DC2626" />
//           <span style={{ fontSize: "14px", color: "#DC2626" }}>
//             {deleteArtisanMutation.error?.message ||
//               "Failed to delete artisan. Please try again."}
//           </span>
//         </div>
//       )}

//       {/* ── List ── */}
//       <div
//         style={{
//           background: "white",
//           borderRadius: "12px",
//           overflow: "hidden",
//           boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)",
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
//             <p style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}>
//               Error loading artisans
//             </p>
//             <p style={{ fontSize: "14px", color: "#6B7280" }}>
//               {error?.message}
//             </p>
//           </div>
//         ) : filteredArtisans.length === 0 ? (
//           <div style={{ padding: "64px", textAlign: "center" }}>
//             <Wrench
//               size={32}
//               color="#D1D5DB"
//               style={{ margin: "0 auto 16px" }}
//             />
//             <p style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}>
//               No artisans found
//             </p>
//             <p style={{ fontSize: "14px", color: "#6B7280" }}>
//               {searchTerm
//                 ? "No artisans match your search"
//                 : "Add your first artisan to get started"}
//             </p>
//           </div>
//         ) : (
//           filteredArtisans.map((artisan) => (
//             <ArtisanCard
//               key={artisan._id}
//               artisan={artisan}
//               onEdit={() => openEditModal(artisan)}
//               onDelete={() => handleDelete(artisan._id)}
//               confirmDeleteId={confirmDeleteId}
//               setConfirmDeleteId={setConfirmDeleteId}
//               deleting={
//                 deleteArtisanMutation.isPending &&
//                 confirmDeleteId === artisan._id
//               }
//             />
//           ))
//         )}
//       </div>

//       {/* ══════════════════════════════════════════
//           CREATE / EDIT MODAL
//       ══════════════════════════════════════════ */}
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "rgba(0,0,0,0.5)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000,
//             padding: "24px",
//           }}
//           onClick={closeModal}
//         >
//           <div
//             style={{
//               background: "white",
//               borderRadius: "16px",
//               maxWidth: "560px",
//               width: "100%",
//               maxHeight: "90vh",
//               overflowY: "auto",
//               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header */}
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
//                 {modalMode === "edit" ? "Edit Artisan" : "Add Artisan"}
//               </h3>
//               <button
//                 onClick={closeModal}
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
//               {/* Full Name */}
//               <div style={{ marginBottom: "20px" }}>
//                 <label style={labelStyle}>Full Name</label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.fullName}
//                   onChange={handleChange("fullName")}
//                   placeholder="e.g., Musa Ibrahim"
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Type of Job */}
//               <div style={{ marginBottom: "20px" }}>
//                 <label style={labelStyle}>Type of Job</label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.typeOfJob}
//                   onChange={handleChange("typeOfJob")}
//                   placeholder="e.g., Electrician, Plumber, Carpenter"
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Details */}
//               <div style={{ marginBottom: "20px" }}>
//                 <label style={labelStyle}>
//                   Details
//                   <span
//                     style={{
//                       marginLeft: "6px",
//                       fontSize: "12px",
//                       color: "#9CA3AF",
//                       fontWeight: 400,
//                     }}
//                   >
//                     (skills, experience, notes)
//                   </span>
//                 </label>
//                 <textarea
//                   value={formData.details}
//                   onChange={handleChange("details")}
//                   placeholder="e.g., 8 years experience, rewiring and installations"
//                   rows={3}
//                   style={{ ...inputStyle, resize: "vertical" }}
//                 />
//               </div>

//               {/* Date of Birth + State of Origin */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "16px",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <div>
//                   <label style={labelStyle}>Date of Birth</label>
//                   <input
//                     type="date"
//                     required
//                     value={formData.dob}
//                     onChange={handleChange("dob")}
//                     max={new Date().toISOString().split("T")[0]}
//                     style={inputStyle}
//                   />
//                   {formData.dob && (
//                     <p
//                       style={{
//                         fontSize: "12px",
//                         color: dobValid ? "#9CA3AF" : "#DC2626",
//                         marginTop: "6px",
//                       }}
//                     >
//                       {dobValid
//                         ? `Age: ${age} ${age === 1 ? "year" : "years"}`
//                         : "Date of birth can't be in the future"}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label style={labelStyle}>State of Origin</label>
//                   <select
//                     required
//                     value={formData.origin}
//                     onChange={handleChange("origin")}
//                     style={{ ...inputStyle, cursor: "pointer" }}
//                   >
//                     <option value="" disabled>
//                       Select a state
//                     </option>
//                     {NIGERIAN_STATES.map((state) => (
//                       <option key={state} value={state}>
//                         {state}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Address */}
//               <div style={{ marginBottom: "20px" }}>
//                 <label style={labelStyle}>Address</label>
//                 <textarea
//                   required
//                   value={formData.address}
//                   onChange={handleChange("address")}
//                   placeholder="Residential or workshop address"
//                   rows={2}
//                   style={{ ...inputStyle, resize: "vertical" }}
//                 />
//               </div>

//               {/* NIN */}
//               <div style={{ marginBottom: "20px" }}>
//                 <label style={labelStyle}>
//                   NIN
//                   <span
//                     style={{
//                       marginLeft: "6px",
//                       fontSize: "12px",
//                       color: "#9CA3AF",
//                       fontWeight: 400,
//                     }}
//                   >
//                     (National Identification Number)
//                   </span>
//                 </label>
//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   required
//                   value={formData.nin}
//                   onChange={handleChange("nin")}
//                   placeholder="11-digit NIN"
//                   style={{
//                     ...inputStyle,
//                     borderColor:
//                       touched && formData.nin && !ninValid
//                         ? "#DC2626"
//                         : "#E5E7EB",
//                   }}
//                 />
//                 <p
//                   style={{
//                     fontSize: "12px",
//                     color:
//                       touched && formData.nin && !ninValid
//                         ? "#DC2626"
//                         : "#9CA3AF",
//                     marginTop: "6px",
//                   }}
//                 >
//                   {touched && formData.nin && !ninValid
//                     ? "NIN must be exactly 11 digits"
//                     : `${formData.nin.length}/11 digits`}
//                 </p>
//               </div>

//               {/* Error */}
//               {activeMutation.isError && (
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
//                     {activeMutation.error?.message ||
//                       `Failed to ${
//                         modalMode === "edit" ? "update" : "add"
//                       } artisan. Please try again.`}
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
//                   onClick={closeModal}
//                   disabled={activeMutation.isPending}
//                   style={{
//                     padding: "12px 24px",
//                     background: "white",
//                     color: "#374151",
//                     fontSize: "14px",
//                     fontWeight: 600,
//                     borderRadius: "8px",
//                     border: "1px solid #E5E7EB",
//                     cursor: activeMutation.isPending
//                       ? "not-allowed"
//                       : "pointer",
//                     opacity: activeMutation.isPending ? 0.6 : 1,
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={activeMutation.isPending}
//                   style={{
//                     padding: "12px 24px",
//                     background: activeMutation.isPending
//                       ? "#9CA3AF"
//                       : "#10B981",
//                     color: "white",
//                     fontSize: "14px",
//                     fontWeight: 600,
//                     borderRadius: "8px",
//                     border: "none",
//                     cursor: activeMutation.isPending
//                       ? "not-allowed"
//                       : "pointer",
//                     boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
//                   }}
//                 >
//                   {activeMutation.isPending
//                     ? modalMode === "edit"
//                       ? "Saving..."
//                       : "Adding..."
//                     : modalMode === "edit"
//                       ? "Save Changes"
//                       : "Add Artisan"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── StatsCard ────────────────────────────────────────────────────────────────
// const StatsCard = ({ title, value, icon, iconBg, iconColor }) => (
//   <div
//     style={{
//       background: "white",
//       borderRadius: "12px",
//       padding: "24px",
//       boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)",
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

// // ─── ArtisanCard ──────────────────────────────────────────────────────────────
// const ArtisanCard = ({
//   artisan,
//   onEdit,
//   onDelete,
//   confirmDeleteId,
//   setConfirmDeleteId,
//   deleting,
// }) => {
//   const isConfirming = confirmDeleteId === artisan._id;

//   return (
//     <div
//       style={{
//         padding: "24px",
//         borderBottom: "1px solid #F3F4F6",
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
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               marginBottom: "8px",
//               flexWrap: "wrap",
//             }}
//           >
//             <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
//               {artisan.fullName}
//             </h3>
//             {artisan.typeOfJob && (
//               <span
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "4px",
//                   padding: "3px 10px",
//                   borderRadius: "6px",
//                   fontSize: "12px",
//                   fontWeight: 600,
//                   background: "#EDE9FE",
//                   color: "#6D28D9",
//                 }}
//               >
//                 <Briefcase size={11} />
//                 {artisan.typeOfJob}
//               </span>
//             )}
//           </div>

//           {artisan.details && (
//             <p
//               style={{
//                 fontSize: "14px",
//                 color: "#6B7280",
//                 marginBottom: "16px",
//               }}
//             >
//               {artisan.details}
//             </p>
//           )}

//           <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
//             <Metric
//               icon={<Calendar size={14} />}
//               label="Date of Birth"
//               value={formatDate(artisan.dob)}
//             />
//             <Metric
//               icon={<MapPin size={14} />}
//               label="State of Origin"
//               value={artisan.origin || "—"}
//             />
//             <Metric
//               icon={<IdCard size={14} />}
//               label="NIN"
//               value={maskNin(artisan.nin)}
//               mono
//             />
//           </div>

//           {artisan.address && (
//             <p
//               style={{
//                 fontSize: "13px",
//                 color: "#9CA3AF",
//                 marginTop: "12px",
//               }}
//             >
//               {artisan.address}
//             </p>
//           )}
//         </div>

//         {/* Actions */}
//         <div style={{ marginLeft: "32px", flexShrink: 0 }}>
//           {isConfirming ? (
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             >
//               <span style={{ fontSize: "13px", color: "#374151" }}>
//                 Delete this artisan?
//               </span>
//               <button
//                 onClick={onDelete}
//                 disabled={deleting}
//                 style={{
//                   padding: "6px 12px",
//                   background: deleting ? "#9CA3AF" : "#DC2626",
//                   color: "white",
//                   fontSize: "13px",
//                   fontWeight: 600,
//                   borderRadius: "6px",
//                   border: "none",
//                   cursor: deleting ? "not-allowed" : "pointer",
//                 }}
//               >
//                 {deleting ? "Deleting..." : "Yes"}
//               </button>
//               <button
//                 onClick={() => setConfirmDeleteId(null)}
//                 disabled={deleting}
//                 style={{
//                   padding: "6px 12px",
//                   background: "white",
//                   color: "#374151",
//                   fontSize: "13px",
//                   fontWeight: 600,
//                   borderRadius: "6px",
//                   border: "1px solid #E5E7EB",
//                   cursor: deleting ? "not-allowed" : "pointer",
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <div style={{ display: "flex", gap: "8px" }}>
//               <button
//                 onClick={onEdit}
//                 title="Edit"
//                 style={{
//                   width: "32px",
//                   height: "32px",
//                   borderRadius: "8px",
//                   background: "#F3F4F6",
//                   border: "none",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   color: "#374151",
//                 }}
//               >
//                 <Pencil size={14} />
//               </button>
//               <button
//                 onClick={() => setConfirmDeleteId(artisan._id)}
//                 title="Delete"
//                 style={{
//                   width: "32px",
//                   height: "32px",
//                   borderRadius: "8px",
//                   background: "#FEF2F2",
//                   border: "none",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   color: "#DC2626",
//                 }}
//               >
//                 <Trash2 size={14} />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Metric = ({ icon, label, value, mono }) => (
//   <div>
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: "4px",
//         fontSize: "12px",
//         color: "#9CA3AF",
//         marginBottom: "4px",
//       }}
//     >
//       {icon}
//       {label}
//     </div>
//     <div
//       style={{
//         fontSize: "14px",
//         fontWeight: 600,
//         color: "#111827",
//         fontFamily: mono ? "monospace" : "inherit",
//       }}
//     >
//       {value}
//     </div>
//   </div>
// );

// export default ArtisanScreen;

import { useState, useMemo } from "react";
import {
  Plus, Search, X, Wrench, MapPin, Calendar, IdCard,
  AlertCircle, Globe2, Pencil, Trash2, Briefcase, Phone, Image,
} from "lucide-react";
import { useFetchDataV2, useMutateDataV2, useFormDataMutateV2 } from "@/hook/RequestV2";

// ─── Constants ────────────────────────────────────────────────────────────────

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT - Abuja",
];

const NIN_REGEX = /^\d{11}$/;

const DEFAULT_FORM = {
  fullName: "",
  details: "",
  dob: "",
  origin: "",
  address: "",
  nin: "",
  typeOfJob: "",
  phone_number: "",
  photo: null,       // File object
  photoPreview: "",  // Local preview URL
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      })
    : "—";

const toDateInputValue = (dateStr) =>
  dateStr ? new Date(dateStr).toISOString().split("T")[0] : "";

const calculateAge = (dobStr) => {
  if (!dobStr) return null;
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;
  return age;
};

const maskNin = (nin) =>
  nin && nin.length >= 4
    ? `${"•".repeat(nin.length - 4)}${nin.slice(-4)}`
    : nin || "—";

// ─── Shared styles ────────────────────────────────────────────────────────────

const labelStyle = {
  display: "block", fontSize: "14px", fontWeight: 600,
  color: "#374151", marginBottom: "8px",
};

const inputStyle = {
  width: "100%", padding: "12px 16px", border: "1px solid #E5E7EB",
  borderRadius: "8px", fontSize: "14px", color: "#111827",
  background: "white", boxSizing: "border-box", outline: "none",
};

// ─── ArtisanScreen ────────────────────────────────────────────────────────────

const ArtisanScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [touched, setTouched] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);

  const age = useMemo(() => calculateAge(formData.dob), [formData.dob]);
  const ninValid = NIN_REGEX.test(formData.nin);
  const dobValid = formData.dob && new Date(formData.dob) <= new Date();

  const {
    data: artisanResponse,
    isLoading: loading,
    error,
  } = useFetchDataV2("/v1/artisan", "artisans");

  const artisans = artisanResponse?.data || [];

  // ── Create/Update use FormData (photo upload) ─────────────────────────────
  const createArtisanMutation = useFormDataMutateV2("artisans", "POST");
  const updateArtisanMutation = useFormDataMutateV2("artisans", "PATCH");
  const deleteArtisanMutation = useMutateDataV2("artisans", "DELETE");

  const activeMutation =
    modalMode === "edit" ? updateArtisanMutation : createArtisanMutation;

  const statesRepresented = useMemo(
    () => new Set(artisans.map((a) => a.origin).filter(Boolean)).size,
    [artisans],
  );

  const filteredArtisans = artisans.filter(
    (a) =>
      a.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.typeOfJob?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.address?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === "nin") value = value.replace(/\D/g, "").slice(0, 11);
    if (field === "phone_number") value = value.replace(/\D/g, "").slice(0, 11);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, photo: file, photoPreview: previewUrl }));
  };

  const openCreateModal = () => {
    setModalMode("create");
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setTouched(false);
    setShowModal(true);
  };

  const openEditModal = (artisan) => {
    setModalMode("edit");
    setEditingId(artisan._id);
    setFormData({
      fullName: artisan.fullName || "",
      details: artisan.details || "",
      dob: toDateInputValue(artisan.dob),
      origin: artisan.origin || "",
      address: artisan.address || "",
      nin: artisan.nin || "",
      typeOfJob: artisan.typeOfJob || "",
      phone_number: artisan.phone_number || "",
      photo: null,
      photoPreview: artisan.photoUrl || "",
    });
    setTouched(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode("create");
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setTouched(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!ninValid || !dobValid) return;

    // Create requires a photo; edit only needs one if changing it
    if (modalMode === "create" && !formData.photo) {
      alert("Please select a photo for the artisan");
      return;
    }

    // ── Build FormData ──────────────────────────────────────────────────────
    const fd = new FormData();
    fd.append("fullName", formData.fullName);
    fd.append("dob", formData.dob);
    fd.append("origin", formData.origin);
    fd.append("address", formData.address);
    fd.append("nin", formData.nin);
    fd.append("typeOfJob", formData.typeOfJob);
    fd.append("phone_number", formData.phone_number);
    if (formData.details) fd.append("details", formData.details);
    if (formData.photo) fd.append("photo", formData.photo);

    try {
      if (modalMode === "edit") {
        await updateArtisanMutation.mutateAsync({
          url: `/v1/artisan/admin/${editingId}`,
          data: fd,
        });
      } else {
        await createArtisanMutation.mutateAsync({
          url: "/v1/artisan/admin",
          data: fd,
        });
      }
      closeModal();
    } catch (err) {
      console.error(
        `Error ${modalMode === "edit" ? "updating" : "adding"} artisan:`,
        err,
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArtisanMutation.mutateAsync({ url: `/v1/artisan/admin/${id}` });
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("Error deleting artisan:", err);
    }
  };

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>
            Artisans
          </h1>
          <p style={{ fontSize: "14px", color: "#6B7280" }}>
            {artisans.length} artisan{artisans.length === 1 ? "" : "s"} registered
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{
            padding: "12px 24px", background: "#10B981", color: "white",
            fontSize: "14px", fontWeight: 600, borderRadius: "8px", border: "none",
            cursor: "pointer", boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
            display: "flex", alignItems: "center", gap: "8px",
          }}
        >
          <Plus size={16} /> Add Artisan
        </button>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "24px", marginBottom: "32px" }}>
        <StatsCard title="Total Artisans" value={artisans.length}
          icon={<Wrench size={24} />} iconBg="#DBEAFE" iconColor="#3B82F6" />
        <StatsCard title="States Represented" value={statesRepresented}
          icon={<Globe2 size={24} />} iconBg="#FEF3C7" iconColor="#F59E0B" />
      </div>

      {/* ── Search ── */}
      <div style={{ background: "white", borderRadius: "12px", padding: "20px 24px", marginBottom: "24px", boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)" }}>
        <div style={{ position: "relative", maxWidth: "400px" }}>
          <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
          <input
            type="text"
            placeholder="Search by name, trade, state, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: "42px", background: "#F9FAFB" }}
          />
        </div>
      </div>

      {/* ── Delete error ── */}
      {deleteArtisanMutation.isError && (
        <div style={{ padding: "12px 16px", background: "#FEE2E2", borderRadius: "8px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <AlertCircle size={16} color="#DC2626" />
          <span style={{ fontSize: "14px", color: "#DC2626" }}>
            {deleteArtisanMutation.error?.message || "Failed to delete artisan."}
          </span>
        </div>
      )}

      {/* ── List ── */}
      <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)" }}>
        {loading ? (
          <div style={{ padding: "64px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "#6B7280" }}>Loading...</p>
          </div>
        ) : error ? (
          <div style={{ padding: "64px", textAlign: "center" }}>
            <AlertCircle size={32} color="#DC2626" style={{ margin: "0 auto 16px" }} />
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}>Error loading artisans</p>
            <p style={{ fontSize: "14px", color: "#6B7280" }}>{error?.message}</p>
          </div>
        ) : filteredArtisans.length === 0 ? (
          <div style={{ padding: "64px", textAlign: "center" }}>
            <Wrench size={32} color="#D1D5DB" style={{ margin: "0 auto 16px" }} />
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}>No artisans found</p>
            <p style={{ fontSize: "14px", color: "#6B7280" }}>
              {searchTerm ? "No artisans match your search" : "Add your first artisan to get started"}
            </p>
          </div>
        ) : (
          filteredArtisans.map((artisan) => (
            <ArtisanCard
              key={artisan._id}
              artisan={artisan}
              onEdit={() => openEditModal(artisan)}
              onDelete={() => handleDelete(artisan._id)}
              confirmDeleteId={confirmDeleteId}
              setConfirmDeleteId={setConfirmDeleteId}
              deleting={deleteArtisanMutation.isPending && confirmDeleteId === artisan._id}
            />
          ))
        )}
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "24px" }}
          onClick={closeModal}
        >
          <div
            style={{ background: "white", borderRadius: "16px", maxWidth: "560px", width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, background: "white", zIndex: 1 }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>
                {modalMode === "edit" ? "Edit Artisan" : "Add Artisan"}
              </h3>
              <button
                onClick={closeModal}
                style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#F3F4F6", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B7280" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "32px" }}>

              {/* ── Photo upload ── */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>
                  Photo {modalMode === "create" && <span style={{ color: "#DC2626" }}>*</span>}
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  {/* Preview */}
                  <div style={{ width: "72px", height: "72px", borderRadius: "12px", background: "#F3F4F6", border: "2px dashed #E5E7EB", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {formData.photoPreview ? (
                      <img src={formData.photoPreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <Image size={24} color="#9CA3AF" />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      id="photo-upload"
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="photo-upload"
                      style={{ display: "inline-block", padding: "8px 16px", background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "13px", fontWeight: 600, color: "#374151", cursor: "pointer" }}
                    >
                      {formData.photo ? "Change Photo" : "Choose Photo"}
                    </label>
                    {formData.photo && (
                      <p style={{ fontSize: "12px", color: "#6B7280", marginTop: "6px" }}>
                        {formData.photo.name}
                      </p>
                    )}
                    {modalMode === "edit" && !formData.photo && (
                      <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "6px" }}>
                        Leave empty to keep current photo
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Full Name</label>
                <input type="text" required value={formData.fullName} onChange={handleChange("fullName")} placeholder="e.g., Musa Ibrahim" style={inputStyle} />
              </div>

              {/* Type of Job */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Type of Job</label>
                <input type="text" required value={formData.typeOfJob} onChange={handleChange("typeOfJob")} placeholder="e.g., Electrician, Plumber, Carpenter" style={inputStyle} />
              </div>

              {/* Phone Number */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Phone size={14} /> Phone Number
                  </span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formData.phone_number}
                  onChange={handleChange("phone_number")}
                  placeholder="e.g., 08012345678"
                  style={inputStyle}
                />
              </div>

              {/* Details */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>
                  Details
                  <span style={{ marginLeft: "6px", fontSize: "12px", color: "#9CA3AF", fontWeight: 400 }}>(skills, experience, notes)</span>
                </label>
                <textarea value={formData.details} onChange={handleChange("details")} placeholder="e.g., 8 years experience, rewiring and installations" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              {/* DOB + State */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <label style={labelStyle}>Date of Birth</label>
                  <input type="date" required value={formData.dob} onChange={handleChange("dob")} max={new Date().toISOString().split("T")[0]} style={inputStyle} />
                  {formData.dob && (
                    <p style={{ fontSize: "12px", color: dobValid ? "#9CA3AF" : "#DC2626", marginTop: "6px" }}>
                      {dobValid ? `Age: ${age} ${age === 1 ? "year" : "years"}` : "Can't be in the future"}
                    </p>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>State of Origin</label>
                  <select required value={formData.origin} onChange={handleChange("origin")} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="" disabled>Select a state</option>
                    {NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Address</label>
                <textarea required value={formData.address} onChange={handleChange("address")} placeholder="Residential or workshop address" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              {/* NIN */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>
                  NIN
                  <span style={{ marginLeft: "6px", fontSize: "12px", color: "#9CA3AF", fontWeight: 400 }}>(National Identification Number)</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={formData.nin}
                  onChange={handleChange("nin")}
                  placeholder="11-digit NIN"
                  style={{ ...inputStyle, borderColor: touched && formData.nin && !ninValid ? "#DC2626" : "#E5E7EB" }}
                />
                <p style={{ fontSize: "12px", color: touched && formData.nin && !ninValid ? "#DC2626" : "#9CA3AF", marginTop: "6px" }}>
                  {touched && formData.nin && !ninValid ? "NIN must be exactly 11 digits" : `${formData.nin.length}/11 digits`}
                </p>
              </div>

              {/* Error banner */}
              {activeMutation.isError && (
                <div style={{ padding: "12px 16px", background: "#FEE2E2", borderRadius: "8px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <AlertCircle size={16} color="#DC2626" />
                  <span style={{ fontSize: "14px", color: "#DC2626" }}>
                    {activeMutation.error?.message || `Failed to ${modalMode === "edit" ? "update" : "add"} artisan.`}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={activeMutation.isPending}
                  style={{ padding: "12px 24px", background: "white", color: "#374151", fontSize: "14px", fontWeight: 600, borderRadius: "8px", border: "1px solid #E5E7EB", cursor: activeMutation.isPending ? "not-allowed" : "pointer", opacity: activeMutation.isPending ? 0.6 : 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={activeMutation.isPending}
                  style={{ padding: "12px 24px", background: activeMutation.isPending ? "#9CA3AF" : "#10B981", color: "white", fontSize: "14px", fontWeight: 600, borderRadius: "8px", border: "none", cursor: activeMutation.isPending ? "not-allowed" : "pointer", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}
                >
                  {activeMutation.isPending
                    ? modalMode === "edit" ? "Saving..." : "Adding..."
                    : modalMode === "edit" ? "Save Changes" : "Add Artisan"}
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
  <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)" }}>
    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: iconColor }}>
      {icon}
    </div>
    <div style={{ fontSize: "32px", fontWeight: 700, color: "#111827", marginTop: "16px", marginBottom: "4px", fontFamily: "monospace" }}>
      {value}
    </div>
    <div style={{ fontSize: "14px", color: "#6B7280", fontWeight: 500 }}>{title}</div>
  </div>
);

// ─── ArtisanCard ──────────────────────────────────────────────────────────────
const ArtisanCard = ({ artisan, onEdit, onDelete, confirmDeleteId, setConfirmDeleteId, deleting }) => {
  const isConfirming = confirmDeleteId === artisan._id;

  return (
    <div style={{ padding: "24px", borderBottom: "1px solid #F3F4F6" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: "16px", flex: 1 }}>

          {/* Photo */}
          <div style={{ width: "56px", height: "56px", borderRadius: "12px", overflow: "hidden", background: "#F3F4F6", flexShrink: 0 }}>
            {artisan.photoUrl ? (
              <img src={artisan.photoUrl} alt={artisan.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Wrench size={20} color="#9CA3AF" />
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>{artisan.fullName}</h3>
              {artisan.typeOfJob && (
                <span style={{ display: "flex", alignItems: "center", gap: "4px", padding: "3px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, background: "#EDE9FE", color: "#6D28D9" }}>
                  <Briefcase size={11} />{artisan.typeOfJob}
                </span>
              )}
            </div>

            {artisan.details && (
              <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "12px" }}>{artisan.details}</p>
            )}

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "8px" }}>
              <Metric icon={<Calendar size={14} />} label="Date of Birth" value={formatDate(artisan.dob)} />
              <Metric icon={<MapPin size={14} />} label="State of Origin" value={artisan.origin || "—"} />
              <Metric icon={<IdCard size={14} />} label="NIN" value={maskNin(artisan.nin)} mono />
              {artisan.phone_number && (
                <Metric icon={<Phone size={14} />} label="Phone" value={artisan.phone_number} />
              )}
            </div>

            {artisan.address && (
              <p style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "4px" }}>{artisan.address}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginLeft: "32px", flexShrink: 0 }}>
          {isConfirming ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", color: "#374151" }}>Delete this artisan?</span>
              <button onClick={onDelete} disabled={deleting} style={{ padding: "6px 12px", background: deleting ? "#9CA3AF" : "#DC2626", color: "white", fontSize: "13px", fontWeight: 600, borderRadius: "6px", border: "none", cursor: deleting ? "not-allowed" : "pointer" }}>
                {deleting ? "Deleting..." : "Yes"}
              </button>
              <button onClick={() => setConfirmDeleteId(null)} disabled={deleting} style={{ padding: "6px 12px", background: "white", color: "#374151", fontSize: "13px", fontWeight: 600, borderRadius: "6px", border: "1px solid #E5E7EB", cursor: deleting ? "not-allowed" : "pointer" }}>
                Cancel
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={onEdit} title="Edit" style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#F3F4F6", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#374151" }}>
                <Pencil size={14} />
              </button>
              <button onClick={() => setConfirmDeleteId(artisan._id)} title="Delete" style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FEF2F2", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#DC2626" }}>
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Metric = ({ icon, label, value, mono }) => (
  <div>
    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#9CA3AF", marginBottom: "4px" }}>
      {icon}{label}
    </div>
    <div style={{ fontSize: "14px", fontWeight: 600, color: "#111827", fontFamily: mono ? "monospace" : "inherit" }}>
      {value}
    </div>
  </div>
);

export default ArtisanScreen;