// // // import { useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { useQueryClient } from "@tanstack/react-query";
// // import { useMutateDataV2, useFetchDataV2 } from "@/hook/RequestV2";

// // import { useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useQueryClient } from "@tanstack/react-query";
// // // import { useFetchDataV2, useMutateDataV2 } from "../hooks/RequestV2"; // adjust path

// // // ─── HELPERS ──────────────────────────────────────────────────────────────────
// // const fmt = (n) =>
// //   new Intl.NumberFormat("en-NG", {
// //     style: "currency",
// //     currency: "NGN",
// //     maximumFractionDigits: 0,
// //   }).format(n || 0);

// // const fmtDate = (d) =>
// //   d
// //     ? new Date(d).toLocaleDateString("en-GB", {
// //         day: "2-digit",
// //         month: "short",
// //         year: "numeric",
// //       })
// //     : "—";

// // const fmtDateTime = (d) =>
// //   d
// //     ? new Date(d).toLocaleString("en-GB", {
// //         day: "2-digit",
// //         month: "short",
// //         year: "numeric",
// //         hour: "2-digit",
// //         minute: "2-digit",
// //       })
// //     : "—";

// // const categoryLabel = (c) =>
// //   ({
// //     annual_membership: "Annual Membership",
// //     monthly_fee: "Monthly Fee",
// //     maintenance: "Maintenance",
// //     special: "Special Levy",
// //   })[c] || c;

// // const categoryColor = (c) =>
// //   ({
// //     annual_membership: { bg: "#DBEAFE", color: "#1E40AF" },
// //     monthly_fee: { bg: "#D1FAE5", color: "#065F46" },
// //     maintenance: { bg: "#FEF3C7", color: "#92400E" },
// //     special: { bg: "#EDE9FE", color: "#6D28D9" },
// //   })[c] || { bg: "#F3F4F6", color: "#374151" };

// // const statusStyle = (s) =>
// //   ({
// //     paid: { bg: "#D1FAE5", color: "#065F46" },
// //     unpaid: { bg: "#FEF3C7", color: "#92400E" },
// //     exempted: { bg: "#EDE9FE", color: "#6D28D9" },
// //     waived: { bg: "#F3F4F6", color: "#374151" },
// //   })[s] || { bg: "#F3F4F6", color: "#374151" };

// // const progressPct = (paid, total) =>
// //   total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;

// // // ─── ICONS ────────────────────────────────────────────────────────────────────
// // const Icon = ({ name, size = 20, color = "currentColor" }) => {
// //   const icons = {
// //     back: (
// //       <>
// //         <polyline points="15 18 9 12 15 6" />
// //       </>
// //     ),
// //     dues: (
// //       <>
// //         <rect x="3" y="3" width="18" height="18" rx="3" />
// //         <path d="M3 9h18M9 21V9" />
// //       </>
// //     ),
// //     plus: (
// //       <>
// //         <path d="M12 5v14M5 12h14" />
// //       </>
// //     ),
// //     trash: (
// //       <>
// //         <polyline points="3 6 5 6 21 6" />
// //         <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
// //       </>
// //     ),
// //     users: (
// //       <>
// //         <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// //         <circle cx="9" cy="7" r="4" />
// //         <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
// //       </>
// //     ),
// //     check: (
// //       <>
// //         <polyline points="20 6 9 17 4 12" />
// //       </>
// //     ),
// //     x: (
// //       <>
// //         <line x1="18" y1="6" x2="6" y2="18" />
// //         <line x1="6" y1="6" x2="18" y2="18" />
// //       </>
// //     ),
// //     calendar: (
// //       <>
// //         <rect x="3" y="4" width="18" height="18" rx="2" />
// //         <line x1="16" y1="2" x2="16" y2="6" />
// //         <line x1="8" y1="2" x2="8" y2="6" />
// //         <line x1="3" y1="10" x2="21" y2="10" />
// //       </>
// //     ),
// //     alert: (
// //       <>
// //         <circle cx="12" cy="12" r="10" />
// //         <line x1="12" y1="8" x2="12" y2="12" />
// //         <line x1="12" y1="16" x2="12.01" y2="16" />
// //       </>
// //     ),
// //     refresh: (
// //       <>
// //         <polyline points="23 4 23 10 17 10" />
// //         <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
// //       </>
// //     ),
// //     edit: (
// //       <>
// //         <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
// //         <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
// //       </>
// //     ),
// //     money: (
// //       <>
// //         <line x1="12" y1="1" x2="12" y2="23" />
// //         <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
// //       </>
// //     ),
// //     search: (
// //       <>
// //         <circle cx="11" cy="11" r="8" />
// //         <path d="m21 21-4.35-4.35" />
// //       </>
// //     ),
// //     filter: (
// //       <>
// //         <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
// //       </>
// //     ),
// //     userplus: (
// //       <>
// //         <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// //         <circle cx="8.5" cy="7" r="4" />
// //         <line x1="20" y1="8" x2="20" y2="14" />
// //         <line x1="23" y1="11" x2="17" y2="11" />
// //       </>
// //     ),
// //     download: (
// //       <>
// //         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
// //         <polyline points="7 10 12 15 17 10" />
// //         <line x1="12" y1="15" x2="12" y2="3" />
// //       </>
// //     ),
// //   };
// //   return (
// //     <svg
// //       width={size}
// //       height={size}
// //       viewBox="0 0 24 24"
// //       fill="none"
// //       stroke={color}
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     >
// //       {icons[name]}
// //     </svg>
// //   );
// // };

// // // ─── ADD MEMBER MODAL ─────────────────────────────────────────────────────────
// // const AddMemberModal = ({ duesId, onClose }) => {
// //   const [memberId, setMemberId] = useState("");
// //   const [customAmount, setCustomAmount] = useState("");
// //   const queryClient = useQueryClient();

// //   const { mutate, isPending, error } = useMutateDataV2("generalDues", "POST");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const payload = { memberIds: [memberId] };
// //     if (customAmount) payload.customAmount = Number(customAmount);

// //     mutate(
// //       { url: `/v1/generalDuesRouter/${duesId}/add-member`, data: payload },
// //       {
// //         onSuccess: () => {
// //           queryClient.invalidateQueries(["generalDues-detail"]);
// //           onClose();
// //         },
// //       },
// //     );
// //   };

// //   const inp = {
// //     width: "100%",
// //     padding: "10px 14px",
// //     border: "1px solid #E5E7EB",
// //     borderRadius: "8px",
// //     fontSize: "14px",
// //     color: "#111827",
// //     background: "white",
// //     outline: "none",
// //     boxSizing: "border-box",
// //     fontFamily: "inherit",
// //   };

// //   return (
// //     <div
// //       style={{
// //         position: "fixed",
// //         inset: 0,
// //         background: "rgba(0,0,0,0.5)",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         zIndex: 1000,
// //         padding: "24px",
// //       }}
// //     >
// //       <div
// //         style={{
// //           background: "white",
// //           borderRadius: "16px",
// //           width: "100%",
// //           maxWidth: "460px",
// //           boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
// //           animation: "slideIn 0.25s ease",
// //         }}
// //       >
// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             padding: "24px 28px",
// //             borderBottom: "1px solid #E5E7EB",
// //           }}
// //         >
// //           <div>
// //             <h3
// //               style={{
// //                 fontSize: "18px",
// //                 fontWeight: 700,
// //                 color: "#111827",
// //                 margin: 0,
// //               }}
// //             >
// //               Add Member
// //             </h3>
// //             <p
// //               style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0" }}
// //             >
// //               Assign a member to this dues
// //             </p>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             style={{
// //               width: "34px",
// //               height: "34px",
// //               borderRadius: "8px",
// //               background: "#F3F4F6",
// //               border: "none",
// //               cursor: "pointer",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //             }}
// //           >
// //             <Icon name="x" size={16} color="#6B7280" />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
// //           <div style={{ display: "grid", gap: "18px" }}>
// //             <div>
// //               <label
// //                 style={{
// //                   display: "block",
// //                   fontSize: "13px",
// //                   fontWeight: 600,
// //                   color: "#374151",
// //                   marginBottom: "6px",
// //                 }}
// //               >
// //                 Member ID *
// //               </label>
// //               <input
// //                 required
// //                 style={inp}
// //                 placeholder="Paste member ObjectId..."
// //                 value={memberId}
// //                 onChange={(e) => setMemberId(e.target.value)}
// //                 onFocus={(e) => (e.target.style.borderColor = "#10B981")}
// //                 onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
// //               />
// //               <p
// //                 style={{
// //                   fontSize: "12px",
// //                   color: "#9CA3AF",
// //                   margin: "6px 0 0",
// //                 }}
// //               >
// //                 The MongoDB _id of the user to add
// //               </p>
// //             </div>
// //             <div>
// //               <label
// //                 style={{
// //                   display: "block",
// //                   fontSize: "13px",
// //                   fontWeight: 600,
// //                   color: "#374151",
// //                   marginBottom: "6px",
// //                 }}
// //               >
// //                 Custom Amount (₦){" "}
// //                 <span style={{ fontWeight: 400, color: "#9CA3AF" }}>
// //                   — optional
// //                 </span>
// //               </label>
// //               <input
// //                 type="number"
// //                 min="1"
// //                 style={inp}
// //                 placeholder="Leave blank to use default amount"
// //                 value={customAmount}
// //                 onChange={(e) => setCustomAmount(e.target.value)}
// //                 onFocus={(e) => (e.target.style.borderColor = "#10B981")}
// //                 onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
// //               />
// //             </div>
// //           </div>

// //           {error && (
// //             <div
// //               style={{
// //                 marginTop: "14px",
// //                 padding: "10px 14px",
// //                 background: "#FEE2E2",
// //                 borderRadius: "8px",
// //                 fontSize: "13px",
// //                 color: "#991B1B",
// //                 display: "flex",
// //                 gap: "8px",
// //                 alignItems: "center",
// //               }}
// //             >
// //               <Icon name="alert" size={15} color="#DC2626" />
// //               {error?.message || "Something went wrong"}
// //             </div>
// //           )}

// //           <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               style={{
// //                 flex: 1,
// //                 padding: "11px",
// //                 background: "white",
// //                 color: "#374151",
// //                 fontSize: "14px",
// //                 fontWeight: 600,
// //                 borderRadius: "8px",
// //                 border: "1px solid #E5E7EB",
// //                 cursor: "pointer",
// //                 fontFamily: "inherit",
// //               }}
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={isPending}
// //               style={{
// //                 flex: 1,
// //                 padding: "11px",
// //                 background: isPending ? "#6EE7B7" : "#10B981",
// //                 color: "white",
// //                 fontSize: "14px",
// //                 fontWeight: 600,
// //                 borderRadius: "8px",
// //                 border: "none",
// //                 cursor: isPending ? "not-allowed" : "pointer",
// //                 fontFamily: "inherit",
// //                 boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
// //               }}
// //             >
// //               {isPending ? "Adding..." : "Add Member"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // // ─── REMOVE MEMBER CONFIRM MODAL ──────────────────────────────────────────────
// // const RemoveMemberModal = ({ duesId, member, onClose }) => {
// //   const queryClient = useQueryClient();
// //   const { mutate, isPending } = useMutateDataV2("generalDues", "DELETE");

// //   const handleRemove = () => {
// //     mutate(
// //       {
// //         url: `/v1/generalDuesRouter/remove-member`,
// //         data: { duesId, memberIds: member.member?._id || member.member },
// //       },
// //       {
// //         onSuccess: () => {
// //           queryClient.invalidateQueries(["generalDues-detail"]);
// //           onClose();
// //         },
// //       },
// //     );
// //   };

// //   const memberId =
// //     typeof member.member === "object" ? member.member?._id : member.member;
// //   const displayId = memberId?.toString().slice(-8).toUpperCase();

// //   return (
// //     <div
// //       style={{
// //         position: "fixed",
// //         inset: 0,
// //         background: "rgba(0,0,0,0.5)",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         zIndex: 1000,
// //         padding: "24px",
// //       }}
// //     >
// //       <div
// //         style={{
// //           background: "white",
// //           borderRadius: "16px",
// //           width: "100%",
// //           maxWidth: "400px",
// //           padding: "32px",
// //           boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
// //           animation: "slideIn 0.25s ease",
// //           textAlign: "center",
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: "60px",
// //             height: "60px",
// //             borderRadius: "50%",
// //             background: "#FEE2E2",
// //             margin: "0 auto 20px",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //           }}
// //         >
// //           <Icon name="trash" size={26} color="#DC2626" />
// //         </div>
// //         <h3
// //           style={{
// //             fontSize: "18px",
// //             fontWeight: 700,
// //             color: "#111827",
// //             marginBottom: "8px",
// //           }}
// //         >
// //           Remove Member
// //         </h3>
// //         <p
// //           style={{
// //             fontSize: "14px",
// //             color: "#6B7280",
// //             marginBottom: "24px",
// //             lineHeight: 1.6,
// //           }}
// //         >
// //           Remove member{" "}
// //           <strong style={{ color: "#111827" }}>#{displayId}</strong> from this
// //           dues? This cannot be undone if they have already paid.
// //         </p>
// //         <div style={{ display: "flex", gap: "10px" }}>
// //           <button
// //             onClick={onClose}
// //             style={{
// //               flex: 1,
// //               padding: "11px",
// //               background: "white",
// //               color: "#374151",
// //               fontSize: "14px",
// //               fontWeight: 600,
// //               borderRadius: "8px",
// //               border: "1px solid #E5E7EB",
// //               cursor: "pointer",
// //               fontFamily: "inherit",
// //             }}
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleRemove}
// //             disabled={isPending}
// //             style={{
// //               flex: 1,
// //               padding: "11px",
// //               background: isPending ? "#FCA5A5" : "#DC2626",
// //               color: "white",
// //               fontSize: "14px",
// //               fontWeight: 600,
// //               borderRadius: "8px",
// //               border: "none",
// //               cursor: isPending ? "not-allowed" : "pointer",
// //               fontFamily: "inherit",
// //             }}
// //           >
// //             {isPending ? "Removing..." : "Remove"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ─── MEMBER ROW ───────────────────────────────────────────────────────────────
// // const MemberRow = ({ m, duesId, onRemove }) => {
// //   const ss = statusStyle(m.status);
// //   const memberId = typeof m.member === "object" ? m.member?._id : m.member;
// //   const memberName =
// //     typeof m.member === "object" ? m.member?.name || m.member?.email : null;
// //   const displayId = memberId?.toString().slice(-8).toUpperCase();

// //   return (
// //     <tr
// //       style={{
// //         borderBottom: "1px solid #F3F4F6",
// //         transition: "background 0.15s",
// //       }}
// //       onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
// //       onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
// //     >
// //       <td style={{ padding: "14px 20px" }}>
// //         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// //           <div
// //             style={{
// //               width: "34px",
// //               height: "34px",
// //               borderRadius: "50%",
// //               background: "#D1FAE5",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <Icon name="users" size={15} color="#10B981" />
// //           </div>
// //           <div>
// //             <div
// //               style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}
// //             >
// //               {memberName || `Member #${displayId}`}
// //             </div>
// //             <div
// //               style={{
// //                 fontSize: "11px",
// //                 color: "#9CA3AF",
// //                 fontFamily: "monospace",
// //               }}
// //             >
// //               {memberId?.toString()}
// //             </div>
// //           </div>
// //         </div>
// //       </td>
// //       <td style={{ padding: "14px 20px" }}>
// //         <span
// //           style={{
// //             padding: "4px 10px",
// //             borderRadius: "6px",
// //             fontSize: "11px",
// //             fontWeight: 700,
// //             background: ss.bg,
// //             color: ss.color,
// //           }}
// //         >
// //           {m.status.toUpperCase()}
// //         </span>
// //       </td>
// //       <td
// //         style={{
// //           padding: "14px 20px",
// //           fontSize: "14px",
// //           fontWeight: 600,
// //           color: "#111827",
// //         }}
// //       >
// //         {fmt(m.amountDue)}
// //       </td>
// //       <td
// //         style={{
// //           padding: "14px 20px",
// //           fontSize: "14px",
// //           color: m.amountPaid > 0 ? "#10B981" : "#9CA3AF",
// //           fontWeight: m.amountPaid > 0 ? 600 : 400,
// //         }}
// //       >
// //         {fmt(m.amountPaid)}
// //       </td>
// //       <td style={{ padding: "14px 20px", fontSize: "12px", color: "#6B7280" }}>
// //         {fmtDateTime(m.assignedAt)}
// //       </td>
// //       <td style={{ padding: "14px 20px" }}>
// //         {m.status !== "paid" && (
// //           <button
// //             onClick={() => onRemove(m)}
// //             style={{
// //               width: "30px",
// //               height: "30px",
// //               borderRadius: "6px",
// //               background: "#FEF2F2",
// //               border: "none",
// //               cursor: "pointer",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //             }}
// //           >
// //             <Icon name="trash" size={13} color="#DC2626" />
// //           </button>
// //         )}
// //       </td>
// //     </tr>
// //   );
// // };

// // // ─── MAIN DETAIL PAGE ─────────────────────────────────────────────────────────
// // export default function GeneralDuesDetail() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const queryClient = useQueryClient();

// //   const [showAddMember, setShowAddMember] = useState(false);
// //   const [memberToRemove, setMemberToRemove] = useState(null);
// //   const [memberSearch, setMemberSearch] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("all");

// //   const { data, isLoading, isError, refetch } = useFetchDataV2(
// //     `/v1/generalDuesRouter/${id}`,
// //     "generalDues-detail",
// //   );

// //   const { mutate: assignAll, isPending: isAssigningAll } = useMutateDataV2(
// //     "generalDues-detail",
// //     "POST",
// //   );

// //   const dues = data?.data;

// //   const pct = dues ? progressPct(dues.collectedTotal, dues.expectedTotal) : 0;
// //   const cat = dues ? categoryColor(dues.category) : {};
// //   const isOverdue = dues
// //     ? new Date(dues.dueDate) < new Date() && dues.outstandingTotal > 0
// //     : false;

// //   const filteredMembers =
// //     dues?.members?.filter((m) => {
// //       const memberId = typeof m.member === "object" ? m.member?._id : m.member;
// //       const memberName =
// //         typeof m.member === "object" ? m.member?.name || "" : "";
// //       const matchSearch =
// //         memberName.toLowerCase().includes(memberSearch.toLowerCase()) ||
// //         memberId?.toString().toLowerCase().includes(memberSearch.toLowerCase());
// //       const matchStatus = statusFilter === "all" || m.status === statusFilter;
// //       return matchSearch && matchStatus;
// //     }) || [];

// //   // ── LOADING ──
// //   if (isLoading) {
// //     return (
// //       <div
// //         style={{
// //           background: "#F9FAFB",
// //           minHeight: "100vh",
// //           padding: "32px 24px",
// //           fontFamily: "'Inter', -apple-system, sans-serif",
// //         }}
// //       >
// //         <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
// //           <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
// //             <div
// //               style={{
// //                 height: "36px",
// //                 width: "100px",
// //                 background: "#E5E7EB",
// //                 borderRadius: "8px",
// //               }}
// //             />
// //           </div>
// //           <div
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "1fr 2fr",
// //               gap: "24px",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 background: "white",
// //                 borderRadius: "12px",
// //                 padding: "24px",
// //                 height: "400px",
// //                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //               }}
// //             />
// //             <div
// //               style={{
// //                 background: "white",
// //                 borderRadius: "12px",
// //                 padding: "24px",
// //                 height: "400px",
// //                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //               }}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ── ERROR ──
// //   if (isError || !dues) {
// //     return (
// //       <div
// //         style={{
// //           background: "#F9FAFB",
// //           minHeight: "100vh",
// //           padding: "32px 24px",
// //           fontFamily: "'Inter', -apple-system, sans-serif",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //         }}
// //       >
// //         <div style={{ textAlign: "center" }}>
// //           <div
// //             style={{
// //               width: "72px",
// //               height: "72px",
// //               borderRadius: "50%",
// //               background: "#FEE2E2",
// //               margin: "0 auto 20px",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //             }}
// //           >
// //             <Icon name="alert" size={32} color="#DC2626" />
// //           </div>
// //           <h3
// //             style={{
// //               fontSize: "18px",
// //               fontWeight: 700,
// //               color: "#111827",
// //               marginBottom: "8px",
// //             }}
// //           >
// //             Failed to Load
// //           </h3>
// //           <p
// //             style={{ fontSize: "14px", color: "#6B7280", marginBottom: "20px" }}
// //           >
// //             Could not fetch dues details.
// //           </p>
// //           <button
// //             onClick={() => refetch()}
// //             style={{
// //               padding: "12px 24px",
// //               background: "#10B981",
// //               color: "white",
// //               fontSize: "14px",
// //               fontWeight: 600,
// //               borderRadius: "8px",
// //               border: "none",
// //               cursor: "pointer",
// //               fontFamily: "inherit",
// //             }}
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div
// //       style={{
// //         background: "#F9FAFB",
// //         minHeight: "100vh",
// //         padding: "32px 24px",
// //         fontFamily: "'Inter', -apple-system, sans-serif",
// //       }}
// //     >
// //       <style>{`
// //         @keyframes slideIn { from { opacity:0; transform:scale(0.95) translateY(-10px); } to { opacity:1; transform:scale(1) translateY(0); } }
// //         @keyframes fadeIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
// //         * { box-sizing:border-box; }
// //         input, select, button { font-family:inherit; }
// //       `}</style>

// //       <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
// //         {/* ── BREADCRUMB / BACK ── */}
// //         <div
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             gap: "8px",
// //             marginBottom: "28px",
// //           }}
// //         >
// //           <button
// //             onClick={() => navigate(-1)}
// //             style={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: "6px",
// //               padding: "8px 14px",
// //               background: "white",
// //               border: "1px solid #E5E7EB",
// //               borderRadius: "8px",
// //               fontSize: "13px",
// //               fontWeight: 600,
// //               color: "#374151",
// //               cursor: "pointer",
// //             }}
// //           >
// //             <Icon name="back" size={15} color="#374151" /> Back
// //           </button>
// //           <span style={{ fontSize: "13px", color: "#9CA3AF" }}>/</span>
// //           <span style={{ fontSize: "13px", color: "#9CA3AF" }}>
// //             General Dues
// //           </span>
// //           <span style={{ fontSize: "13px", color: "#9CA3AF" }}>/</span>
// //           <span
// //             style={{
// //               fontSize: "13px",
// //               fontWeight: 600,
// //               color: "#111827",
// //               maxWidth: "300px",
// //               whiteSpace: "nowrap",
// //               overflow: "hidden",
// //               textOverflow: "ellipsis",
// //             }}
// //           >
// //             {dues.title}
// //           </span>
// //         </div>

// //         {/* ── PAGE HEADER ── */}
// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "flex-start",
// //             marginBottom: "28px",
// //           }}
// //         >
// //           <div>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: "12px",
// //                 marginBottom: "8px",
// //                 flexWrap: "wrap",
// //               }}
// //             >
// //               <h1
// //                 style={{
// //                   fontSize: "24px",
// //                   fontWeight: 800,
// //                   color: "#111827",
// //                   margin: 0,
// //                   letterSpacing: "-0.02em",
// //                 }}
// //               >
// //                 {dues.title}
// //               </h1>
// //               <span
// //                 style={{
// //                   padding: "4px 12px",
// //                   borderRadius: "6px",
// //                   fontSize: "12px",
// //                   fontWeight: 600,
// //                   background: cat.bg,
// //                   color: cat.color,
// //                 }}
// //               >
// //                 {categoryLabel(dues.category)}
// //               </span>
// //               {isOverdue && (
// //                 <span
// //                   style={{
// //                     padding: "4px 12px",
// //                     borderRadius: "6px",
// //                     fontSize: "12px",
// //                     fontWeight: 700,
// //                     background: "#FEE2E2",
// //                     color: "#991B1B",
// //                   }}
// //                 >
// //                   OVERDUE
// //                 </span>
// //               )}
// //               {!dues.isActive && (
// //                 <span
// //                   style={{
// //                     padding: "4px 12px",
// //                     borderRadius: "6px",
// //                     fontSize: "12px",
// //                     fontWeight: 700,
// //                     background: "#F3F4F6",
// //                     color: "#6B7280",
// //                   }}
// //                 >
// //                   INACTIVE
// //                 </span>
// //               )}
// //             </div>
// //             {dues.description && (
// //               <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
// //                 {dues.description}
// //               </p>
// //             )}
// //           </div>
// //           <div style={{ display: "flex", gap: "10px" }}>
// //             <button
// //               onClick={() => refetch()}
// //               style={{
// //                 padding: "10px 14px",
// //                 background: "white",
// //                 color: "#374151",
// //                 fontSize: "13px",
// //                 fontWeight: 600,
// //                 borderRadius: "8px",
// //                 border: "1px solid #E5E7EB",
// //                 cursor: "pointer",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: "6px",
// //               }}
// //             >
// //               <Icon name="refresh" size={14} color="#374151" /> Refresh
// //             </button>
// //             <button
// //               onClick={() =>
// //                 assignAll({
// //                   url: "/v1/generalDuesRouter/assign-all-members",
// //                   data: { duesId: dues._id },
// //                 })
// //               }
// //               disabled={isAssigningAll}
// //               style={{
// //                 padding: "10px 18px",
// //                 background: isAssigningAll ? "#D1FAE5" : "white",
// //                 color: "#10B981",
// //                 fontSize: "13px",
// //                 fontWeight: 600,
// //                 borderRadius: "8px",
// //                 border: "2px solid #10B981",
// //                 cursor: isAssigningAll ? "not-allowed" : "pointer",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: "6px",
// //               }}
// //             >
// //               <Icon name="users" size={14} color="#10B981" />
// //               {isAssigningAll ? "Assigning..." : "Assign All Members"}
// //             </button>
// //             <button
// //               onClick={() => setShowAddMember(true)}
// //               style={{
// //                 padding: "10px 18px",
// //                 background: "#10B981",
// //                 color: "white",
// //                 fontSize: "13px",
// //                 fontWeight: 600,
// //                 borderRadius: "8px",
// //                 border: "none",
// //                 cursor: "pointer",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: "6px",
// //                 boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
// //               }}
// //             >
// //               <Icon name="userplus" size={14} color="white" /> Add Member
// //             </button>
// //           </div>
// //         </div>

// //         {/* ── TOP LAYOUT: INFO + STATS ── */}
// //         <div
// //           style={{
// //             display: "grid",
// //             gridTemplateColumns: "320px 1fr",
// //             gap: "24px",
// //             marginBottom: "24px",
// //           }}
// //         >
// //           {/* LEFT: Info card */}
// //           <div
// //             style={{ display: "flex", flexDirection: "column", gap: "16px" }}
// //           >
// //             {/* Quick info */}
// //             <div
// //               style={{
// //                 background: "white",
// //                 borderRadius: "12px",
// //                 padding: "24px",
// //                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //                 animation: "fadeIn 0.4s ease both",
// //               }}
// //             >
// //               <h3
// //                 style={{
// //                   fontSize: "15px",
// //                   fontWeight: 700,
// //                   color: "#111827",
// //                   margin: "0 0 16px",
// //                   paddingBottom: "12px",
// //                   borderBottom: "1px solid #F3F4F6",
// //                 }}
// //               >
// //                 Dues Info
// //               </h3>
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: "14px",
// //                 }}
// //               >
// //                 {[
// //                   {
// //                     icon: "calendar",
// //                     label: "Due Date",
// //                     value: fmtDate(dues.dueDate),
// //                     highlight: isOverdue,
// //                   },
// //                   {
// //                     icon: "money",
// //                     label: "Default Amount",
// //                     value: fmt(dues.defaultAmount),
// //                   },
// //                   {
// //                     icon: "dues",
// //                     label: "Category",
// //                     value: categoryLabel(dues.category),
// //                   },
// //                   {
// //                     icon: "check",
// //                     label: "Status",
// //                     value: dues.isActive ? "Active" : "Inactive",
// //                   },
// //                   {
// //                     icon: "users",
// //                     label: "Created By",
// //                     value: dues.createdBy?.toString().slice(-8).toUpperCase(),
// //                   },
// //                   {
// //                     icon: "calendar",
// //                     label: "Created At",
// //                     value: fmtDate(dues.createdAt),
// //                   },
// //                 ].map((item) => (
// //                   <div
// //                     key={item.label}
// //                     style={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       gap: "10px",
// //                     }}
// //                   >
// //                     <div
// //                       style={{
// //                         width: "32px",
// //                         height: "32px",
// //                         borderRadius: "8px",
// //                         background: "#F9FAFB",
// //                         display: "flex",
// //                         alignItems: "center",
// //                         justifyContent: "center",
// //                         flexShrink: 0,
// //                       }}
// //                     >
// //                       <Icon name={item.icon} size={14} color="#6B7280" />
// //                     </div>
// //                     <div style={{ flex: 1, minWidth: 0 }}>
// //                       <div
// //                         style={{
// //                           fontSize: "11px",
// //                           color: "#9CA3AF",
// //                           fontWeight: 600,
// //                           textTransform: "uppercase",
// //                           letterSpacing: "0.04em",
// //                         }}
// //                       >
// //                         {item.label}
// //                       </div>
// //                       <div
// //                         style={{
// //                           fontSize: "13px",
// //                           fontWeight: 600,
// //                           color: item.highlight ? "#DC2626" : "#111827",
// //                           marginTop: "1px",
// //                         }}
// //                       >
// //                         {item.value}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Member summary */}
// //             <div
// //               style={{
// //                 background: "white",
// //                 borderRadius: "12px",
// //                 padding: "24px",
// //                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //                 animation: "fadeIn 0.4s ease 0.05s both",
// //               }}
// //             >
// //               <h3
// //                 style={{
// //                   fontSize: "15px",
// //                   fontWeight: 700,
// //                   color: "#111827",
// //                   margin: "0 0 16px",
// //                   paddingBottom: "12px",
// //                   borderBottom: "1px solid #F3F4F6",
// //                 }}
// //               >
// //                 Member Summary
// //               </h3>
// //               <div
// //                 style={{
// //                   display: "grid",
// //                   gridTemplateColumns: "1fr 1fr",
// //                   gap: "10px",
// //                 }}
// //               >
// //                 {[
// //                   {
// //                     label: "Total Assigned",
// //                     value: dues.totalAssigned,
// //                     bg: "#F9FAFB",
// //                     color: "#111827",
// //                   },
// //                   {
// //                     label: "Must Pay",
// //                     value: dues.totalMustPay,
// //                     bg: "#FEF3C7",
// //                     color: "#92400E",
// //                   },
// //                   {
// //                     label: "Paid",
// //                     value: dues.totalPaid,
// //                     bg: "#D1FAE5",
// //                     color: "#065F46",
// //                   },
// //                   {
// //                     label: "Exempted",
// //                     value: dues.totalExempted,
// //                     bg: "#EDE9FE",
// //                     color: "#6D28D9",
// //                   },
// //                 ].map((s) => (
// //                   <div
// //                     key={s.label}
// //                     style={{
// //                       background: s.bg,
// //                       borderRadius: "8px",
// //                       padding: "10px 12px",
// //                       textAlign: "center",
// //                     }}
// //                   >
// //                     <div
// //                       style={{
// //                         fontSize: "20px",
// //                         fontWeight: 800,
// //                         color: s.color,
// //                       }}
// //                     >
// //                       {s.value}
// //                     </div>
// //                     <div
// //                       style={{
// //                         fontSize: "11px",
// //                         fontWeight: 600,
// //                         color: "#6B7280",
// //                         marginTop: "2px",
// //                       }}
// //                     >
// //                       {s.label}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* RIGHT: Financial stats + progress */}
// //           <div
// //             style={{ display: "flex", flexDirection: "column", gap: "16px" }}
// //           >
// //             {/* Financial cards */}
// //             <div
// //               style={{
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(3, 1fr)",
// //                 gap: "16px",
// //               }}
// //             >
// //               {[
// //                 {
// //                   label: "Expected Total",
// //                   value: fmt(dues.expectedTotal),
// //                   icon: "dues",
// //                   bg: "#DBEAFE",
// //                   color: "#2563EB",
// //                   desc: "Total amount to collect",
// //                 },
// //                 {
// //                   label: "Collected Total",
// //                   value: fmt(dues.collectedTotal),
// //                   icon: "check",
// //                   bg: "#D1FAE5",
// //                   color: "#10B981",
// //                   desc: "Amount collected so far",
// //                 },
// //                 {
// //                   label: "Outstanding",
// //                   value: fmt(dues.outstandingTotal),
// //                   icon: "alert",
// //                   bg: "#FEE2E2",
// //                   color: "#DC2626",
// //                   desc: "Amount still pending",
// //                 },
// //               ].map((s, i) => (
// //                 <div
// //                   key={i}
// //                   style={{
// //                     background: "white",
// //                     borderRadius: "12px",
// //                     padding: "20px",
// //                     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //                     animation: `fadeIn 0.4s ease ${i * 0.05}s both`,
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       width: "40px",
// //                       height: "40px",
// //                       borderRadius: "10px",
// //                       background: s.bg,
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                       marginBottom: "12px",
// //                     }}
// //                   >
// //                     <Icon name={s.icon} size={18} color={s.color} />
// //                   </div>
// //                   <div
// //                     style={{
// //                       fontSize: "20px",
// //                       fontWeight: 800,
// //                       color: "#111827",
// //                       marginBottom: "2px",
// //                     }}
// //                   >
// //                     {s.value}
// //                   </div>
// //                   <div
// //                     style={{
// //                       fontSize: "13px",
// //                       fontWeight: 600,
// //                       color: "#374151",
// //                     }}
// //                   >
// //                     {s.label}
// //                   </div>
// //                   <div
// //                     style={{
// //                       fontSize: "11px",
// //                       color: "#9CA3AF",
// //                       marginTop: "2px",
// //                     }}
// //                   >
// //                     {s.desc}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Progress card */}
// //             <div
// //               style={{
// //                 background: "white",
// //                 borderRadius: "12px",
// //                 padding: "24px",
// //                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //                 flex: 1,
// //                 animation: "fadeIn 0.4s ease 0.15s both",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   alignItems: "center",
// //                   marginBottom: "20px",
// //                 }}
// //               >
// //                 <h3
// //                   style={{
// //                     fontSize: "15px",
// //                     fontWeight: 700,
// //                     color: "#111827",
// //                     margin: 0,
// //                   }}
// //                 >
// //                   Collection Progress
// //                 </h3>
// //                 <span
// //                   style={{
// //                     fontSize: "28px",
// //                     fontWeight: 800,
// //                     color:
// //                       pct === 100
// //                         ? "#10B981"
// //                         : pct > 50
// //                           ? "#F59E0B"
// //                           : "#DC2626",
// //                   }}
// //                 >
// //                   {pct}%
// //                 </span>
// //               </div>

// //               {/* Big progress bar */}
// //               <div
// //                 style={{
// //                   height: "12px",
// //                   background: "#F3F4F6",
// //                   borderRadius: "99px",
// //                   overflow: "hidden",
// //                   marginBottom: "16px",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     height: "100%",
// //                     width: `${pct}%`,
// //                     borderRadius: "99px",
// //                     background:
// //                       pct === 100
// //                         ? "#10B981"
// //                         : pct > 60
// //                           ? "linear-gradient(90deg,#F59E0B,#10B981)"
// //                           : "linear-gradient(90deg,#DC2626,#F59E0B)",
// //                     transition: "width 0.8s ease",
// //                   }}
// //                 />
// //               </div>

// //               <div
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   fontSize: "13px",
// //                   color: "#6B7280",
// //                   fontWeight: 500,
// //                 }}
// //               >
// //                 <span>
// //                   {dues.totalPaid} of {dues.totalMustPay} members paid
// //                 </span>
// //                 <span>{dues.totalMustPay - dues.totalPaid} remaining</span>
// //               </div>

// //               {/* Mini breakdown bars */}
// //               {dues.totalAssigned > 0 && (
// //                 <div
// //                   style={{
// //                     marginTop: "20px",
// //                     paddingTop: "20px",
// //                     borderTop: "1px solid #F3F4F6",
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       fontSize: "12px",
// //                       fontWeight: 600,
// //                       color: "#6B7280",
// //                       marginBottom: "10px",
// //                       textTransform: "uppercase",
// //                       letterSpacing: "0.04em",
// //                     }}
// //                   >
// //                     Breakdown
// //                   </div>
// //                   {[
// //                     {
// //                       label: "Paid",
// //                       count: dues.totalPaid,
// //                       total: dues.totalAssigned,
// //                       color: "#10B981",
// //                     },
// //                     {
// //                       label: "Unpaid",
// //                       count: dues.totalMustPay - dues.totalPaid,
// //                       total: dues.totalAssigned,
// //                       color: "#F59E0B",
// //                     },
// //                     {
// //                       label: "Exempted",
// //                       count: dues.totalExempted,
// //                       total: dues.totalAssigned,
// //                       color: "#8B5CF6",
// //                     },
// //                   ].map((b) => (
// //                     <div
// //                       key={b.label}
// //                       style={{
// //                         display: "flex",
// //                         alignItems: "center",
// //                         gap: "10px",
// //                         marginBottom: "8px",
// //                       }}
// //                     >
// //                       <div
// //                         style={{
// //                           width: "60px",
// //                           fontSize: "12px",
// //                           color: "#6B7280",
// //                           fontWeight: 500,
// //                         }}
// //                       >
// //                         {b.label}
// //                       </div>
// //                       <div
// //                         style={{
// //                           flex: 1,
// //                           height: "6px",
// //                           background: "#F3F4F6",
// //                           borderRadius: "99px",
// //                           overflow: "hidden",
// //                         }}
// //                       >
// //                         <div
// //                           style={{
// //                             height: "100%",
// //                             width: `${b.total > 0 ? (b.count / b.total) * 100 : 0}%`,
// //                             background: b.color,
// //                             borderRadius: "99px",
// //                             transition: "width 0.6s ease",
// //                           }}
// //                         />
// //                       </div>
// //                       <div
// //                         style={{
// //                           width: "30px",
// //                           fontSize: "12px",
// //                           fontWeight: 700,
// //                           color: "#111827",
// //                           textAlign: "right",
// //                         }}
// //                       >
// //                         {b.count}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── MEMBERS TABLE ── */}
// //         <div
// //           style={{
// //             background: "white",
// //             borderRadius: "12px",
// //             overflow: "hidden",
// //             boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
// //             animation: "fadeIn 0.4s ease 0.2s both",
// //           }}
// //         >
// //           {/* Table header */}
// //           <div
// //             style={{
// //               padding: "20px 24px",
// //               borderBottom: "1px solid #E5E7EB",
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               gap: "16px",
// //               flexWrap: "wrap",
// //             }}
// //           >
// //             <div>
// //               <h3
// //                 style={{
// //                   fontSize: "16px",
// //                   fontWeight: 700,
// //                   color: "#111827",
// //                   margin: 0,
// //                 }}
// //               >
// //                 Members
// //               </h3>
// //               <p
// //                 style={{
// //                   fontSize: "13px",
// //                   color: "#6B7280",
// //                   margin: "2px 0 0",
// //                 }}
// //               >
// //                 {dues.members?.length || 0} assigned · {filteredMembers.length}{" "}
// //                 shown
// //               </p>
// //             </div>
// //             <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
// //               {/* Search */}
// //               <div style={{ position: "relative" }}>
// //                 <div
// //                   style={{
// //                     position: "absolute",
// //                     left: "10px",
// //                     top: "50%",
// //                     transform: "translateY(-50%)",
// //                     pointerEvents: "none",
// //                   }}
// //                 >
// //                   <Icon name="search" size={14} color="#9CA3AF" />
// //                 </div>
// //                 <input
// //                   placeholder="Search member..."
// //                   value={memberSearch}
// //                   onChange={(e) => setMemberSearch(e.target.value)}
// //                   style={{
// //                     padding: "8px 12px 8px 34px",
// //                     border: "1px solid #E5E7EB",
// //                     borderRadius: "8px",
// //                     fontSize: "13px",
// //                     background: "white",
// //                     outline: "none",
// //                     width: "200px",
// //                   }}
// //                   onFocus={(e) => (e.target.style.borderColor = "#10B981")}
// //                   onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
// //                 />
// //               </div>
// //               {/* Status filter */}
// //               <select
// //                 value={statusFilter}
// //                 onChange={(e) => setStatusFilter(e.target.value)}
// //                 style={{
// //                   padding: "8px 32px 8px 12px",
// //                   border: "1px solid #E5E7EB",
// //                   borderRadius: "8px",
// //                   fontSize: "13px",
// //                   background: "white",
// //                   outline: "none",
// //                   cursor: "pointer",
// //                   appearance: "none",
// //                   backgroundImage:
// //                     "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
// //                   backgroundRepeat: "no-repeat",
// //                   backgroundPosition: "right 8px center",
// //                 }}
// //               >
// //                 <option value="all">All Status</option>
// //                 <option value="unpaid">Unpaid</option>
// //                 <option value="paid">Paid</option>
// //                 <option value="exempted">Exempted</option>
// //                 <option value="waived">Waived</option>
// //               </select>
// //               <button
// //                 onClick={() => setShowAddMember(true)}
// //                 style={{
// //                   padding: "8px 14px",
// //                   background: "#10B981",
// //                   color: "white",
// //                   fontSize: "13px",
// //                   fontWeight: 600,
// //                   borderRadius: "8px",
// //                   border: "none",
// //                   cursor: "pointer",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "6px",
// //                   boxShadow: "0 4px 12px rgba(16,185,129,0.25)",
// //                 }}
// //               >
// //                 <Icon name="plus" size={14} color="white" /> Add Member
// //               </button>
// //             </div>
// //           </div>

// //           {/* Table */}
// //           {filteredMembers.length === 0 ? (
// //             <div style={{ textAlign: "center", padding: "60px 32px" }}>
// //               <div
// //                 style={{
// //                   width: "60px",
// //                   height: "60px",
// //                   borderRadius: "50%",
// //                   background: "#F3F4F6",
// //                   margin: "0 auto 16px",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                 }}
// //               >
// //                 <Icon name="users" size={26} color="#D1D5DB" />
// //               </div>
// //               <h4
// //                 style={{
// //                   fontSize: "16px",
// //                   fontWeight: 700,
// //                   color: "#111827",
// //                   marginBottom: "6px",
// //                 }}
// //               >
// //                 {memberSearch || statusFilter !== "all"
// //                   ? "No members match your filter"
// //                   : "No Members Assigned"}
// //               </h4>
// //               <p
// //                 style={{
// //                   fontSize: "14px",
// //                   color: "#6B7280",
// //                   marginBottom: "20px",
// //                 }}
// //               >
// //                 {memberSearch || statusFilter !== "all"
// //                   ? "Try adjusting your search."
// //                   : "Add members to start collecting dues."}
// //               </p>
// //               {!(memberSearch || statusFilter !== "all") && (
// //                 <button
// //                   onClick={() => setShowAddMember(true)}
// //                   style={{
// //                     padding: "10px 20px",
// //                     background: "#10B981",
// //                     color: "white",
// //                     fontSize: "13px",
// //                     fontWeight: 600,
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     display: "inline-flex",
// //                     alignItems: "center",
// //                     gap: "6px",
// //                     fontFamily: "inherit",
// //                     boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
// //                   }}
// //                 >
// //                   <Icon name="userplus" size={14} color="white" /> Add First
// //                   Member
// //                 </button>
// //               )}
// //             </div>
// //           ) : (
// //             <div style={{ overflowX: "auto" }}>
// //               <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //                 <thead style={{ background: "#F9FAFB" }}>
// //                   <tr>
// //                     {[
// //                       "Member",
// //                       "Status",
// //                       "Amount Due",
// //                       "Amount Paid",
// //                       "Assigned At",
// //                       "",
// //                     ].map((h) => (
// //                       <th
// //                         key={h}
// //                         style={{
// //                           padding: "12px 20px",
// //                           textAlign: "left",
// //                           fontSize: "11px",
// //                           fontWeight: 600,
// //                           color: "#6B7280",
// //                           textTransform: "uppercase",
// //                           letterSpacing: "0.05em",
// //                           borderBottom: "1px solid #E5E7EB",
// //                           whiteSpace: "nowrap",
// //                         }}
// //                       >
// //                         {h}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredMembers.map((m) => (
// //                     <MemberRow
// //                       key={m._id}
// //                       m={m}
// //                       duesId={dues._id}
// //                       onRemove={setMemberToRemove}
// //                     />
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}

// //           {/* Table footer */}
// //           {filteredMembers.length > 0 && (
// //             <div
// //               style={{
// //                 padding: "14px 24px",
// //                 borderTop: "1px solid #E5E7EB",
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //               }}
// //             >
// //               <span style={{ fontSize: "13px", color: "#6B7280" }}>
// //                 Showing {filteredMembers.length} of {dues.members?.length}{" "}
// //                 members
// //               </span>
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   gap: "16px",
// //                   fontSize: "12px",
// //                   fontWeight: 600,
// //                 }}
// //               >
// //                 {[
// //                   {
// //                     label: "Paid",
// //                     count: dues.totalPaid,
// //                     color: "#065F46",
// //                     bg: "#D1FAE5",
// //                   },
// //                   {
// //                     label: "Unpaid",
// //                     count: dues.totalMustPay - dues.totalPaid,
// //                     color: "#92400E",
// //                     bg: "#FEF3C7",
// //                   },
// //                   {
// //                     label: "Exempted",
// //                     count: dues.totalExempted,
// //                     color: "#6D28D9",
// //                     bg: "#EDE9FE",
// //                   },
// //                 ].map((s) => (
// //                   <span
// //                     key={s.label}
// //                     style={{
// //                       padding: "4px 10px",
// //                       borderRadius: "6px",
// //                       background: s.bg,
// //                       color: s.color,
// //                     }}
// //                   >
// //                     {s.label}: {s.count}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* ── MODALS ── */}
// //       {showAddMember && (
// //         <AddMemberModal
// //           duesId={dues._id}
// //           onClose={() => setShowAddMember(false)}
// //         />
// //       )}
// //       {memberToRemove && (
// //         <RemoveMemberModal
// //           duesId={dues._id}
// //           member={memberToRemove}
// //           onClose={() => setMemberToRemove(null)}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // import { useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useQueryClient } from "@tanstack/react-query";
// import { useMutateDataV2, useFetchDataV2 } from "@/hook/RequestV2";

// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";
// import { useSelector } from "react-redux";

// // ─── HELPERS ──────────────────────────────────────────────────────────────────
// const fmt = (n) =>
//   new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     maximumFractionDigits: 0,
//   }).format(n || 0);

// const fmtDate = (d) =>
//   d
//     ? new Date(d).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       })
//     : "—";

// const fmtDateTime = (d) =>
//   d
//     ? new Date(d).toLocaleString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "—";

// const categoryLabel = (c) =>
//   ({
//     annual_membership: "Annual Membership",
//     monthly_fee: "Monthly Fee",
//     maintenance: "Maintenance",
//     special: "Special Levy",
//   })[c] || c;

// const categoryColor = (c) =>
//   ({
//     annual_membership: { bg: "#DBEAFE", color: "#1E40AF" },
//     monthly_fee: { bg: "#D1FAE5", color: "#065F46" },
//     maintenance: { bg: "#FEF3C7", color: "#92400E" },
//     special: { bg: "#EDE9FE", color: "#6D28D9" },
//   })[c] || { bg: "#F3F4F6", color: "#374151" };

// const statusStyle = (s) =>
//   ({
//     paid: { bg: "#D1FAE5", color: "#065F46" },
//     unpaid: { bg: "#FEF3C7", color: "#92400E" },
//     exempted: { bg: "#EDE9FE", color: "#6D28D9" },
//     waived: { bg: "#F3F4F6", color: "#374151" },
//   })[s] || { bg: "#F3F4F6", color: "#374151" };

// const progressPct = (paid, total) =>
//   total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;

// // ─── ICONS ────────────────────────────────────────────────────────────────────
// const Icon = ({ name, size = 20, color = "currentColor" }) => {
//   const icons = {
//     back: (
//       <>
//         <polyline points="15 18 9 12 15 6" />
//       </>
//     ),
//     dues: (
//       <>
//         <rect x="3" y="3" width="18" height="18" rx="3" />
//         <path d="M3 9h18M9 21V9" />
//       </>
//     ),
//     plus: (
//       <>
//         <path d="M12 5v14M5 12h14" />
//       </>
//     ),
//     trash: (
//       <>
//         <polyline points="3 6 5 6 21 6" />
//         <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
//       </>
//     ),
//     users: (
//       <>
//         <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//         <circle cx="9" cy="7" r="4" />
//         <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
//       </>
//     ),
//     check: (
//       <>
//         <polyline points="20 6 9 17 4 12" />
//       </>
//     ),
//     x: (
//       <>
//         <line x1="18" y1="6" x2="6" y2="18" />
//         <line x1="6" y1="6" x2="18" y2="18" />
//       </>
//     ),
//     calendar: (
//       <>
//         <rect x="3" y="4" width="18" height="18" rx="2" />
//         <line x1="16" y1="2" x2="16" y2="6" />
//         <line x1="8" y1="2" x2="8" y2="6" />
//         <line x1="3" y1="10" x2="21" y2="10" />
//       </>
//     ),
//     alert: (
//       <>
//         <circle cx="12" cy="12" r="10" />
//         <line x1="12" y1="8" x2="12" y2="12" />
//         <line x1="12" y1="16" x2="12.01" y2="16" />
//       </>
//     ),
//     refresh: (
//       <>
//         <polyline points="23 4 23 10 17 10" />
//         <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
//       </>
//     ),
//     edit: (
//       <>
//         <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//         <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//       </>
//     ),
//     money: (
//       <>
//         <line x1="12" y1="1" x2="12" y2="23" />
//         <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//       </>
//     ),
//     search: (
//       <>
//         <circle cx="11" cy="11" r="8" />
//         <path d="m21 21-4.35-4.35" />
//       </>
//     ),
//     filter: (
//       <>
//         <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
//       </>
//     ),
//     userplus: (
//       <>
//         <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//         <circle cx="8.5" cy="7" r="4" />
//         <line x1="20" y1="8" x2="20" y2="14" />
//         <line x1="23" y1="11" x2="17" y2="11" />
//       </>
//     ),
//     download: (
//       <>
//         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//         <polyline points="7 10 12 15 17 10" />
//         <line x1="12" y1="15" x2="12" y2="3" />
//       </>
//     ),
//   };
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke={color}
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       {icons[name]}
//     </svg>
//   );
// };

// // ─── ADD MEMBER MODAL ─────────────────────────────────────────────────────────
// const AddMemberModal = ({ duesId, onClose }) => {
//   const [memberId, setMemberId] = useState("");
//   const [customAmount, setCustomAmount] = useState("");
//   const queryClient = useQueryClient();

//   const { mutate, isPending, error } = useMutateDataV2("generalDues", "POST");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = { memberIds: [memberId] };
//     if (customAmount) payload.customAmount = Number(customAmount);

//     mutate(
//       { url: `/v1/generalDuesRouter/${duesId}/add-member`, data: payload },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries(["generalDues-detail"]);
//           onClose();
//         },
//       },
//     );
//   };

//   const inp = {
//     width: "100%",
//     padding: "10px 14px",
//     border: "1px solid #E5E7EB",
//     borderRadius: "8px",
//     fontSize: "14px",
//     color: "#111827",
//     background: "white",
//     outline: "none",
//     boxSizing: "border-box",
//     fontFamily: "inherit",
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(0,0,0,0.5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 1000,
//         padding: "24px",
//       }}
//     >
//       <div
//         style={{
//           background: "white",
//           borderRadius: "16px",
//           width: "100%",
//           maxWidth: "460px",
//           boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//           animation: "slideIn 0.25s ease",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             padding: "24px 28px",
//             borderBottom: "1px solid #E5E7EB",
//           }}
//         >
//           <div>
//             <h3
//               style={{
//                 fontSize: "18px",
//                 fontWeight: 700,
//                 color: "#111827",
//                 margin: 0,
//               }}
//             >
//               Add Member
//             </h3>
//             <p
//               style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0" }}
//             >
//               Assign a member to this dues
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             style={{
//               width: "34px",
//               height: "34px",
//               borderRadius: "8px",
//               background: "#F3F4F6",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Icon name="x" size={16} color="#6B7280" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
//           <div style={{ display: "grid", gap: "18px" }}>
//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "13px",
//                   fontWeight: 600,
//                   color: "#374151",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Member ID *
//               </label>
//               <input
//                 required
//                 style={inp}
//                 placeholder="Paste member ObjectId..."
//                 value={memberId}
//                 onChange={(e) => setMemberId(e.target.value)}
//                 onFocus={(e) => (e.target.style.borderColor = "#10B981")}
//                 onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
//               />
//               <p
//                 style={{
//                   fontSize: "12px",
//                   color: "#9CA3AF",
//                   margin: "6px 0 0",
//                 }}
//               >
//                 The MongoDB _id of the user to add
//               </p>
//             </div>
//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "13px",
//                   fontWeight: 600,
//                   color: "#374151",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Custom Amount (₦){" "}
//                 <span style={{ fontWeight: 400, color: "#9CA3AF" }}>
//                   — optional
//                 </span>
//               </label>
//               <input
//                 type="number"
//                 min="1"
//                 style={inp}
//                 placeholder="Leave blank to use default amount"
//                 value={customAmount}
//                 onChange={(e) => setCustomAmount(e.target.value)}
//                 onFocus={(e) => (e.target.style.borderColor = "#10B981")}
//                 onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
//               />
//             </div>
//           </div>

//           {error && (
//             <div
//               style={{
//                 marginTop: "14px",
//                 padding: "10px 14px",
//                 background: "#FEE2E2",
//                 borderRadius: "8px",
//                 fontSize: "13px",
//                 color: "#991B1B",
//                 display: "flex",
//                 gap: "8px",
//                 alignItems: "center",
//               }}
//             >
//               <Icon name="alert" size={15} color="#DC2626" />
//               {error?.message || "Something went wrong"}
//             </div>
//           )}

//           <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
//             <button
//               type="button"
//               onClick={onClose}
//               style={{
//                 flex: 1,
//                 padding: "11px",
//                 background: "white",
//                 color: "#374151",
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 borderRadius: "8px",
//                 border: "1px solid #E5E7EB",
//                 cursor: "pointer",
//                 fontFamily: "inherit",
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isPending}
//               style={{
//                 flex: 1,
//                 padding: "11px",
//                 background: isPending ? "#6EE7B7" : "#10B981",
//                 color: "white",
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 borderRadius: "8px",
//                 border: "none",
//                 cursor: isPending ? "not-allowed" : "pointer",
//                 fontFamily: "inherit",
//                 boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
//               }}
//             >
//               {isPending ? "Adding..." : "Add Member"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // ─── REMOVE MEMBER CONFIRM MODAL ──────────────────────────────────────────────
// const RemoveMemberModal = ({ duesId, member, onClose }) => {
//   const queryClient = useQueryClient();
//   const { mutate, isPending } = useMutateDataV2("generalDues", "DELETE");

//   const handleRemove = () => {
//     mutate(
//       {
//         url: `/v1/generalDuesRouter/remove-member`,
//         data: { duesId, memberIds: member.member?._id || member.member },
//       },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries(["generalDues-detail"]);
//           onClose();
//         },
//       },
//     );
//   };

//   const memberId =
//     typeof member.member === "object" ? member.member?._id : member.member;
//   const displayId = memberId?.toString().slice(-8).toUpperCase();

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(0,0,0,0.5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 1000,
//         padding: "24px",
//       }}
//     >
//       <div
//         style={{
//           background: "white",
//           borderRadius: "16px",
//           width: "100%",
//           maxWidth: "400px",
//           padding: "32px",
//           boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//           animation: "slideIn 0.25s ease",
//           textAlign: "center",
//         }}
//       >
//         <div
//           style={{
//             width: "60px",
//             height: "60px",
//             borderRadius: "50%",
//             background: "#FEE2E2",
//             margin: "0 auto 20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Icon name="trash" size={26} color="#DC2626" />
//         </div>
//         <h3
//           style={{
//             fontSize: "18px",
//             fontWeight: 700,
//             color: "#111827",
//             marginBottom: "8px",
//           }}
//         >
//           Remove Member
//         </h3>
//         <p
//           style={{
//             fontSize: "14px",
//             color: "#6B7280",
//             marginBottom: "24px",
//             lineHeight: 1.6,
//           }}
//         >
//           Remove member{" "}
//           <strong style={{ color: "#111827" }}>#{displayId}</strong> from this
//           dues? This cannot be undone if they have already paid.
//         </p>
//         <div style={{ display: "flex", gap: "10px" }}>
//           <button
//             onClick={onClose}
//             style={{
//               flex: 1,
//               padding: "11px",
//               background: "white",
//               color: "#374151",
//               fontSize: "14px",
//               fontWeight: 600,
//               borderRadius: "8px",
//               border: "1px solid #E5E7EB",
//               cursor: "pointer",
//               fontFamily: "inherit",
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleRemove}
//             disabled={isPending}
//             style={{
//               flex: 1,
//               padding: "11px",
//               background: isPending ? "#FCA5A5" : "#DC2626",
//               color: "white",
//               fontSize: "14px",
//               fontWeight: 600,
//               borderRadius: "8px",
//               border: "none",
//               cursor: isPending ? "not-allowed" : "pointer",
//               fontFamily: "inherit",
//             }}
//           >
//             {isPending ? "Removing..." : "Remove"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── REMOVE ALL MEMBERS CONFIRM MODAL ──────────────────────────────────────────
// const RemoveAllMembersModal = ({ duesId, totalMembers, onClose }) => {
//   const queryClient = useQueryClient();
//   const { mutate, isPending } = useMutateDataV2("generalDues-detail", "DELETE");
//   const { selectedEstate } = useSelector(
//     (state) => state?.reducer?.estateSlice,
//   );
//   const navigate = useNavigate();

//   const clanId = selectedEstate._id;
//   const handleRemoveAll = () => {
//     console.log({
//       duesId: duesId,
//       clanId: clanId,
//     });

//     mutate(
//       {
//         url: `/v1/generalDuesRouter/assign-all-members`,
//         data: {
//           duesId: duesId,
//           clanId: clanId,
//         },
//       },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries(["generalDues-detail"]);

//           navigate(-1);

//           onClose();
//         },
//       },
//     );
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(0,0,0,0.5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 1000,
//         padding: "24px",
//       }}
//     >
//       <div
//         style={{
//           background: "white",
//           borderRadius: "16px",
//           width: "100%",
//           maxWidth: "440px",
//           padding: "32px",
//           boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//           animation: "slideIn 0.25s ease",
//           textAlign: "center",
//         }}
//       >
//         <div
//           style={{
//             width: "72px",
//             height: "72px",
//             borderRadius: "50%",
//             background: "#FEE2E2",
//             margin: "0 auto 20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Icon name="trash" size={32} color="#DC2626" />
//         </div>
//         <h3
//           style={{
//             fontSize: "20px",
//             fontWeight: 700,
//             color: "#111827",
//             marginBottom: "8px",
//           }}
//         >
//           Remove All Members
//         </h3>
//         <p
//           style={{
//             fontSize: "14px",
//             color: "#6B7280",
//             marginBottom: "24px",
//             lineHeight: 1.6,
//           }}
//         >
//           Are you sure you want to remove all{" "}
//           <strong style={{ color: "#DC2626", fontSize: "16px" }}>
//             {totalMembers} members
//           </strong>{" "}
//           from this dues? This action cannot be undone and will clear all member
//           assignments.
//         </p>
//         <div
//           style={{
//             background: "#FEF3C7",
//             padding: "12px 16px",
//             borderRadius: "8px",
//             marginBottom: "24px",
//             display: "flex",
//             gap: "10px",
//             alignItems: "flex-start",
//           }}
//         >
//           <Icon name="alert" size={18} color="#92400E" />
//           <p
//             style={{
//               fontSize: "12px",
//               color: "#92400E",
//               margin: 0,
//               textAlign: "left",
//               lineHeight: 1.5,
//             }}
//           >
//             <strong>Warning:</strong> Members who have already paid will also be
//             removed from the list.
//           </p>
//         </div>
//         <div style={{ display: "flex", gap: "10px" }}>
//           <button
//             onClick={onClose}
//             disabled={isPending}
//             style={{
//               flex: 1,
//               padding: "12px",
//               background: "white",
//               color: "#374151",
//               fontSize: "14px",
//               fontWeight: 600,
//               borderRadius: "8px",
//               border: "1px solid #E5E7EB",
//               cursor: isPending ? "not-allowed" : "pointer",
//               fontFamily: "inherit",
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleRemoveAll}
//             disabled={isPending}
//             style={{
//               flex: 1,
//               padding: "12px",
//               background: isPending ? "#FCA5A5" : "#DC2626",
//               color: "white",
//               fontSize: "14px",
//               fontWeight: 600,
//               borderRadius: "8px",
//               border: "none",
//               cursor: isPending ? "not-allowed" : "pointer",
//               fontFamily: "inherit",
//               boxShadow: isPending ? "none" : "0 4px 12px rgba(220,38,38,0.3)",
//             }}
//           >
//             {isPending ? "Removing All..." : "Remove All Members"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── MEMBER ROW ───────────────────────────────────────────────────────────────
// const MemberRow = ({ m, duesId, onRemove }) => {
//   const ss = statusStyle(m.status);
//   const memberId = typeof m.member === "object" ? m.member?._id : m.member;
//   const memberName =
//     typeof m.member === "object" ? m.member?.name || m.member?.email : null;
//   const displayId = memberId?.toString().slice(-8).toUpperCase();

//   return (
//     <tr
//       style={{
//         borderBottom: "1px solid #F3F4F6",
//         transition: "background 0.15s",
//       }}
//       onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
//       onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
//     >
//       <td style={{ padding: "14px 20px" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <div
//             style={{
//               width: "34px",
//               height: "34px",
//               borderRadius: "50%",
//               background: "#D1FAE5",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexShrink: 0,
//             }}
//           >
//             <Icon name="users" size={15} color="#10B981" />
//           </div>
//           <div>
//             <div
//               style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}
//             >
//               {memberName || `Member #${displayId}`}
//             </div>
//             <div
//               style={{
//                 fontSize: "11px",
//                 color: "#9CA3AF",
//                 fontFamily: "monospace",
//               }}
//             >
//               {memberId?.toString()}
//             </div>
//           </div>
//         </div>
//       </td>
//       <td style={{ padding: "14px 20px" }}>
//         <span
//           style={{
//             padding: "4px 10px",
//             borderRadius: "6px",
//             fontSize: "11px",
//             fontWeight: 700,
//             background: ss.bg,
//             color: ss.color,
//           }}
//         >
//           {m.status.toUpperCase()}
//         </span>
//       </td>
//       <td
//         style={{
//           padding: "14px 20px",
//           fontSize: "14px",
//           fontWeight: 600,
//           color: "#111827",
//         }}
//       >
//         {fmt(m.amountDue)}
//       </td>
//       <td
//         style={{
//           padding: "14px 20px",
//           fontSize: "14px",
//           color: m.amountPaid > 0 ? "#10B981" : "#9CA3AF",
//           fontWeight: m.amountPaid > 0 ? 600 : 400,
//         }}
//       >
//         {fmt(m.amountPaid)}
//       </td>
//       <td style={{ padding: "14px 20px", fontSize: "12px", color: "#6B7280" }}>
//         {fmtDateTime(m.assignedAt)}
//       </td>
//       <td style={{ padding: "14px 20px" }}>
//         {m.status !== "paid" && (
//           <button
//             onClick={() => onRemove(m)}
//             style={{
//               width: "30px",
//               height: "30px",
//               borderRadius: "6px",
//               background: "#FEF2F2",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Icon name="trash" size={13} color="#DC2626" />
//           </button>
//         )}
//       </td>
//     </tr>
//   );
// };

// // ─── MAIN DETAIL PAGE ─────────────────────────────────────────────────────────
// export default function GeneralDuesDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const [showAddMember, setShowAddMember] = useState(false);
//   const [memberToRemove, setMemberToRemove] = useState(null);
//   const [showRemoveAll, setShowRemoveAll] = useState(false);
//   const [memberSearch, setMemberSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const { data, isLoading, isError, refetch } = useFetchDataV2(
//     `/v1/generalDuesRouter/${id}`,
//     "generalDues-detail",
//   );

//   const { mutate: assignAll, isPending: isAssigningAll } = useMutateDataV2(
//     "generalDues-detail",
//     "POST",
//   );

//   const dues = data?.data;

//   const pct = dues ? progressPct(dues.collectedTotal, dues.expectedTotal) : 0;
//   const cat = dues ? categoryColor(dues.category) : {};
//   const isOverdue = dues
//     ? new Date(dues.dueDate) < new Date() && dues.outstandingTotal > 0
//     : false;

//   const filteredMembers =
//     dues?.members?.filter((m) => {
//       const memberId = typeof m.member === "object" ? m.member?._id : m.member;
//       const memberName =
//         typeof m.member === "object" ? m.member?.name || "" : "";
//       const matchSearch =
//         memberName.toLowerCase().includes(memberSearch.toLowerCase()) ||
//         memberId?.toString().toLowerCase().includes(memberSearch.toLowerCase());
//       const matchStatus = statusFilter === "all" || m.status === statusFilter;
//       return matchSearch && matchStatus;
//     }) || [];

//   // ── LOADING ──
//   if (isLoading) {
//     return (
//       <div
//         style={{
//           background: "#F9FAFB",
//           minHeight: "100vh",
//           padding: "32px 24px",
//           fontFamily: "'Inter', -apple-system, sans-serif",
//         }}
//       >
//         <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
//           <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
//             <div
//               style={{
//                 height: "36px",
//                 width: "100px",
//                 background: "#E5E7EB",
//                 borderRadius: "8px",
//               }}
//             />
//           </div>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 2fr",
//               gap: "24px",
//             }}
//           >
//             <div
//               style={{
//                 background: "white",
//                 borderRadius: "12px",
//                 padding: "24px",
//                 height: "400px",
//                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//               }}
//             />
//             <div
//               style={{
//                 background: "white",
//                 borderRadius: "12px",
//                 padding: "24px",
//                 height: "400px",
//                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── ERROR ──
//   if (isError || !dues) {
//     return (
//       <div
//         style={{
//           background: "#F9FAFB",
//           minHeight: "100vh",
//           padding: "32px 24px",
//           fontFamily: "'Inter', -apple-system, sans-serif",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <div
//             style={{
//               width: "72px",
//               height: "72px",
//               borderRadius: "50%",
//               background: "#FEE2E2",
//               margin: "0 auto 20px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Icon name="alert" size={32} color="#DC2626" />
//           </div>
//           <h3
//             style={{
//               fontSize: "18px",
//               fontWeight: 700,
//               color: "#111827",
//               marginBottom: "8px",
//             }}
//           >
//             Failed to Load
//           </h3>
//           <p
//             style={{ fontSize: "14px", color: "#6B7280", marginBottom: "20px" }}
//           >
//             Could not fetch dues details.
//           </p>
//           <button
//             onClick={() => refetch()}
//             style={{
//               padding: "12px 24px",
//               background: "#10B981",
//               color: "white",
//               fontSize: "14px",
//               fontWeight: 600,
//               borderRadius: "8px",
//               border: "none",
//               cursor: "pointer",
//               fontFamily: "inherit",
//             }}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         background: "#F9FAFB",
//         minHeight: "100vh",
//         padding: "32px 24px",
//         fontFamily: "'Inter', -apple-system, sans-serif",
//       }}
//     >
//       <style>{`
//         @keyframes slideIn { from { opacity:0; transform:scale(0.95) translateY(-10px); } to { opacity:1; transform:scale(1) translateY(0); } }
//         @keyframes fadeIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
//         * { box-sizing:border-box; }
//         input, select, button { font-family:inherit; }
//       `}</style>

//       <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
//         {/* ── BREADCRUMB / BACK ── */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             marginBottom: "28px",
//           }}
//         >
//           <button
//             onClick={() => navigate(-1)}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "6px",
//               padding: "8px 14px",
//               background: "white",
//               border: "1px solid #E5E7EB",
//               borderRadius: "8px",
//               fontSize: "13px",
//               fontWeight: 600,
//               color: "#374151",
//               cursor: "pointer",
//             }}
//           >
//             <Icon name="back" size={15} color="#374151" /> Back
//           </button>
//           <span style={{ fontSize: "13px", color: "#9CA3AF" }}>/</span>
//           <span style={{ fontSize: "13px", color: "#9CA3AF" }}>
//             General Dues
//           </span>
//           <span style={{ fontSize: "13px", color: "#9CA3AF" }}>/</span>
//           <span
//             style={{
//               fontSize: "13px",
//               fontWeight: 600,
//               color: "#111827",
//               maxWidth: "300px",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             {dues.title}
//           </span>
//         </div>

//         {/* ── PAGE HEADER ── */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             marginBottom: "28px",
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
//                   fontSize: "24px",
//                   fontWeight: 800,
//                   color: "#111827",
//                   margin: 0,
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 {dues.title}
//               </h1>
//               <span
//                 style={{
//                   padding: "4px 12px",
//                   borderRadius: "6px",
//                   fontSize: "12px",
//                   fontWeight: 600,
//                   background: cat.bg,
//                   color: cat.color,
//                 }}
//               >
//                 {categoryLabel(dues.category)}
//               </span>
//               {isOverdue && (
//                 <span
//                   style={{
//                     padding: "4px 12px",
//                     borderRadius: "6px",
//                     fontSize: "12px",
//                     fontWeight: 700,
//                     background: "#FEE2E2",
//                     color: "#991B1B",
//                   }}
//                 >
//                   OVERDUE
//                 </span>
//               )}
//               {!dues.isActive && (
//                 <span
//                   style={{
//                     padding: "4px 12px",
//                     borderRadius: "6px",
//                     fontSize: "12px",
//                     fontWeight: 700,
//                     background: "#F3F4F6",
//                     color: "#6B7280",
//                   }}
//                 >
//                   INACTIVE
//                 </span>
//               )}
//             </div>
//             {dues.description && (
//               <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
//                 {dues.description}
//               </p>
//             )}
//           </div>
//           <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//             <button
//               onClick={() => refetch()}
//               style={{
//                 padding: "10px 14px",
//                 background: "white",
//                 color: "#374151",
//                 fontSize: "13px",
//                 fontWeight: 600,
//                 borderRadius: "8px",
//                 border: "1px solid #E5E7EB",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//               }}
//             >
//               <Icon name="refresh" size={14} color="#374151" /> Refresh
//             </button>

//             {dues?.members?.length > 0 && (
//               <button
//                 onClick={() => setShowRemoveAll(true)}
//                 style={{
//                   padding: "10px 14px",
//                   background: "white",
//                   color: "#DC2626",
//                   fontSize: "13px",
//                   fontWeight: 600,
//                   borderRadius: "8px",
//                   border: "2px solid #DC2626",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "6px",
//                 }}
//               >
//                 <Icon name="trash" size={14} color="#DC2626" /> Remove All
//               </button>
//             )}

//             <button
//               onClick={() =>
//                 assignAll({
//                   url: "/v1/generalDuesRouter/assign-all-members",
//                   data: { duesId: dues._id },
//                 })
//               }
//               disabled={isAssigningAll}
//               style={{
//                 padding: "10px 18px",
//                 background: isAssigningAll ? "#D1FAE5" : "white",
//                 color: "#10B981",
//                 fontSize: "13px",
//                 fontWeight: 600,
//                 borderRadius: "8px",
//                 border: "2px solid #10B981",
//                 cursor: isAssigningAll ? "not-allowed" : "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//               }}
//             >
//               <Icon name="users" size={14} color="#10B981" />
//               {isAssigningAll ? "Assigning..." : "Assign All Members"}
//             </button>
//             <button
//               onClick={() => setShowAddMember(true)}
//               style={{
//                 padding: "10px 18px",
//                 background: "#10B981",
//                 color: "white",
//                 fontSize: "13px",
//                 fontWeight: 600,
//                 borderRadius: "8px",
//                 border: "none",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//                 boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
//               }}
//             >
//               <Icon name="userplus" size={14} color="white" /> Add Member
//             </button>
//           </div>
//         </div>

//         {/* ── TOP LAYOUT: INFO + STATS ── */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "320px 1fr",
//             gap: "24px",
//             marginBottom: "24px",
//           }}
//         >
//           {/* LEFT: Info card */}
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//           >
//             {/* Quick info */}
//             <div
//               style={{
//                 background: "white",
//                 borderRadius: "12px",
//                 padding: "24px",
//                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                 animation: "fadeIn 0.4s ease both",
//               }}
//             >
//               <h3
//                 style={{
//                   fontSize: "15px",
//                   fontWeight: 700,
//                   color: "#111827",
//                   margin: "0 0 16px",
//                   paddingBottom: "12px",
//                   borderBottom: "1px solid #F3F4F6",
//                 }}
//               >
//                 Dues Info
//               </h3>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "14px",
//                 }}
//               >
//                 {[
//                   {
//                     icon: "calendar",
//                     label: "Due Date",
//                     value: fmtDate(dues.dueDate),
//                     highlight: isOverdue,
//                   },
//                   {
//                     icon: "money",
//                     label: "Default Amount",
//                     value: fmt(dues.defaultAmount),
//                   },
//                   {
//                     icon: "dues",
//                     label: "Category",
//                     value: categoryLabel(dues.category),
//                   },
//                   {
//                     icon: "check",
//                     label: "Status",
//                     value: dues.isActive ? "Active" : "Inactive",
//                   },
//                   {
//                     icon: "users",
//                     label: "Created By",
//                     value: dues.createdBy?.toString().slice(-8).toUpperCase(),
//                   },
//                   {
//                     icon: "calendar",
//                     label: "Created At",
//                     value: fmtDate(dues.createdAt),
//                   },
//                 ].map((item) => (
//                   <div
//                     key={item.label}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: "32px",
//                         height: "32px",
//                         borderRadius: "8px",
//                         background: "#F9FAFB",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         flexShrink: 0,
//                       }}
//                     >
//                       <Icon name={item.icon} size={14} color="#6B7280" />
//                     </div>
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <div
//                         style={{
//                           fontSize: "11px",
//                           color: "#9CA3AF",
//                           fontWeight: 600,
//                           textTransform: "uppercase",
//                           letterSpacing: "0.04em",
//                         }}
//                       >
//                         {item.label}
//                       </div>
//                       <div
//                         style={{
//                           fontSize: "13px",
//                           fontWeight: 600,
//                           color: item.highlight ? "#DC2626" : "#111827",
//                           marginTop: "1px",
//                         }}
//                       >
//                         {item.value}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Member summary */}
//             <div
//               style={{
//                 background: "white",
//                 borderRadius: "12px",
//                 padding: "24px",
//                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                 animation: "fadeIn 0.4s ease 0.05s both",
//               }}
//             >
//               <h3
//                 style={{
//                   fontSize: "15px",
//                   fontWeight: 700,
//                   color: "#111827",
//                   margin: "0 0 16px",
//                   paddingBottom: "12px",
//                   borderBottom: "1px solid #F3F4F6",
//                 }}
//               >
//                 Member Summary
//               </h3>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "10px",
//                 }}
//               >
//                 {[
//                   {
//                     label: "Total Assigned",
//                     value: dues.totalAssigned,
//                     bg: "#F9FAFB",
//                     color: "#111827",
//                   },
//                   {
//                     label: "Must Pay",
//                     value: dues.totalMustPay,
//                     bg: "#FEF3C7",
//                     color: "#92400E",
//                   },
//                   {
//                     label: "Paid",
//                     value: dues.totalPaid,
//                     bg: "#D1FAE5",
//                     color: "#065F46",
//                   },
//                   {
//                     label: "Exempted",
//                     value: dues.totalExempted,
//                     bg: "#EDE9FE",
//                     color: "#6D28D9",
//                   },
//                 ].map((s) => (
//                   <div
//                     key={s.label}
//                     style={{
//                       background: s.bg,
//                       borderRadius: "8px",
//                       padding: "10px 12px",
//                       textAlign: "center",
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontSize: "20px",
//                         fontWeight: 800,
//                         color: s.color,
//                       }}
//                     >
//                       {s.value}
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "11px",
//                         fontWeight: 600,
//                         color: "#6B7280",
//                         marginTop: "2px",
//                       }}
//                     >
//                       {s.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Financial stats + progress */}
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//           >
//             {/* Financial cards */}
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(3, 1fr)",
//                 gap: "16px",
//               }}
//             >
//               {[
//                 {
//                   label: "Expected Total",
//                   value: fmt(dues.expectedTotal),
//                   icon: "dues",
//                   bg: "#DBEAFE",
//                   color: "#2563EB",
//                   desc: "Total amount to collect",
//                 },
//                 {
//                   label: "Collected Total",
//                   value: fmt(dues.collectedTotal),
//                   icon: "check",
//                   bg: "#D1FAE5",
//                   color: "#10B981",
//                   desc: "Amount collected so far",
//                 },
//                 {
//                   label: "Outstanding",
//                   value: fmt(dues.outstandingTotal),
//                   icon: "alert",
//                   bg: "#FEE2E2",
//                   color: "#DC2626",
//                   desc: "Amount still pending",
//                 },
//               ].map((s, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     background: "white",
//                     borderRadius: "12px",
//                     padding: "20px",
//                     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                     animation: `fadeIn 0.4s ease ${i * 0.05}s both`,
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                       borderRadius: "10px",
//                       background: s.bg,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginBottom: "12px",
//                     }}
//                   >
//                     <Icon name={s.icon} size={18} color={s.color} />
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "20px",
//                       fontWeight: 800,
//                       color: "#111827",
//                       marginBottom: "2px",
//                     }}
//                   >
//                     {s.value}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "13px",
//                       fontWeight: 600,
//                       color: "#374151",
//                     }}
//                   >
//                     {s.label}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "11px",
//                       color: "#9CA3AF",
//                       marginTop: "2px",
//                     }}
//                   >
//                     {s.desc}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Progress card */}
//             <div
//               style={{
//                 background: "white",
//                 borderRadius: "12px",
//                 padding: "24px",
//                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                 flex: 1,
//                 animation: "fadeIn 0.4s ease 0.15s both",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "15px",
//                     fontWeight: 700,
//                     color: "#111827",
//                     margin: 0,
//                   }}
//                 >
//                   Collection Progress
//                 </h3>
//                 <span
//                   style={{
//                     fontSize: "28px",
//                     fontWeight: 800,
//                     color:
//                       pct === 100
//                         ? "#10B981"
//                         : pct > 50
//                           ? "#F59E0B"
//                           : "#DC2626",
//                   }}
//                 >
//                   {pct}%
//                 </span>
//               </div>

//               {/* Big progress bar */}
//               <div
//                 style={{
//                   height: "12px",
//                   background: "#F3F4F6",
//                   borderRadius: "99px",
//                   overflow: "hidden",
//                   marginBottom: "16px",
//                 }}
//               >
//                 <div
//                   style={{
//                     height: "100%",
//                     width: `${pct}%`,
//                     borderRadius: "99px",
//                     background:
//                       pct === 100
//                         ? "#10B981"
//                         : pct > 60
//                           ? "linear-gradient(90deg,#F59E0B,#10B981)"
//                           : "linear-gradient(90deg,#DC2626,#F59E0B)",
//                     transition: "width 0.8s ease",
//                   }}
//                 />
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   fontSize: "13px",
//                   color: "#6B7280",
//                   fontWeight: 500,
//                 }}
//               >
//                 <span>
//                   {dues.totalPaid} of {dues.totalMustPay} members paid
//                 </span>
//                 <span>{dues.totalMustPay - dues.totalPaid} remaining</span>
//               </div>

//               {/* Mini breakdown bars */}
//               {dues.totalAssigned > 0 && (
//                 <div
//                   style={{
//                     marginTop: "20px",
//                     paddingTop: "20px",
//                     borderTop: "1px solid #F3F4F6",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "12px",
//                       fontWeight: 600,
//                       color: "#6B7280",
//                       marginBottom: "10px",
//                       textTransform: "uppercase",
//                       letterSpacing: "0.04em",
//                     }}
//                   >
//                     Breakdown
//                   </div>
//                   {[
//                     {
//                       label: "Paid",
//                       count: dues.totalPaid,
//                       total: dues.totalAssigned,
//                       color: "#10B981",
//                     },
//                     {
//                       label: "Unpaid",
//                       count: dues.totalMustPay - dues.totalPaid,
//                       total: dues.totalAssigned,
//                       color: "#F59E0B",
//                     },
//                     {
//                       label: "Exempted",
//                       count: dues.totalExempted,
//                       total: dues.totalAssigned,
//                       color: "#8B5CF6",
//                     },
//                   ].map((b) => (
//                     <div
//                       key={b.label}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "10px",
//                         marginBottom: "8px",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "60px",
//                           fontSize: "12px",
//                           color: "#6B7280",
//                           fontWeight: 500,
//                         }}
//                       >
//                         {b.label}
//                       </div>
//                       <div
//                         style={{
//                           flex: 1,
//                           height: "6px",
//                           background: "#F3F4F6",
//                           borderRadius: "99px",
//                           overflow: "hidden",
//                         }}
//                       >
//                         <div
//                           style={{
//                             height: "100%",
//                             width: `${b.total > 0 ? (b.count / b.total) * 100 : 0}%`,
//                             background: b.color,
//                             borderRadius: "99px",
//                             transition: "width 0.6s ease",
//                           }}
//                         />
//                       </div>
//                       <div
//                         style={{
//                           width: "30px",
//                           fontSize: "12px",
//                           fontWeight: 700,
//                           color: "#111827",
//                           textAlign: "right",
//                         }}
//                       >
//                         {b.count}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ── MEMBERS TABLE ── */}
//         <div
//           style={{
//             background: "white",
//             borderRadius: "12px",
//             overflow: "hidden",
//             boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             animation: "fadeIn 0.4s ease 0.2s both",
//           }}
//         >
//           {/* Table header */}
//           <div
//             style={{
//               padding: "20px 24px",
//               borderBottom: "1px solid #E5E7EB",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: "16px",
//               flexWrap: "wrap",
//             }}
//           >
//             <div>
//               <h3
//                 style={{
//                   fontSize: "16px",
//                   fontWeight: 700,
//                   color: "#111827",
//                   margin: 0,
//                 }}
//               >
//                 Members
//               </h3>
//               <p
//                 style={{
//                   fontSize: "13px",
//                   color: "#6B7280",
//                   margin: "2px 0 0",
//                 }}
//               >
//                 {dues.members?.length || 0} assigned · {filteredMembers.length}{" "}
//                 shown
//               </p>
//             </div>
//             <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//               {/* Search */}
//               <div style={{ position: "relative" }}>
//                 <div
//                   style={{
//                     position: "absolute",
//                     left: "10px",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     pointerEvents: "none",
//                   }}
//                 >
//                   <Icon name="search" size={14} color="#9CA3AF" />
//                 </div>
//                 <input
//                   placeholder="Search member..."
//                   value={memberSearch}
//                   onChange={(e) => setMemberSearch(e.target.value)}
//                   style={{
//                     padding: "8px 12px 8px 34px",
//                     border: "1px solid #E5E7EB",
//                     borderRadius: "8px",
//                     fontSize: "13px",
//                     background: "white",
//                     outline: "none",
//                     width: "200px",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#10B981")}
//                   onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
//                 />
//               </div>
//               {/* Status filter */}
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 style={{
//                   padding: "8px 32px 8px 12px",
//                   border: "1px solid #E5E7EB",
//                   borderRadius: "8px",
//                   fontSize: "13px",
//                   background: "white",
//                   outline: "none",
//                   cursor: "pointer",
//                   appearance: "none",
//                   backgroundImage:
//                     "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "right 8px center",
//                 }}
//               >
//                 <option value="all">All Status</option>
//                 <option value="unpaid">Unpaid</option>
//                 <option value="paid">Paid</option>
//                 <option value="exempted">Exempted</option>
//                 <option value="waived">Waived</option>
//               </select>
//               <button
//                 onClick={() => setShowAddMember(true)}
//                 style={{
//                   padding: "8px 14px",
//                   background: "#10B981",
//                   color: "white",
//                   fontSize: "13px",
//                   fontWeight: 600,
//                   borderRadius: "8px",
//                   border: "none",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "6px",
//                   boxShadow: "0 4px 12px rgba(16,185,129,0.25)",
//                 }}
//               >
//                 <Icon name="plus" size={14} color="white" /> Add Member
//               </button>
//             </div>
//           </div>

//           {/* Table */}
//           {filteredMembers.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "60px 32px" }}>
//               <div
//                 style={{
//                   width: "60px",
//                   height: "60px",
//                   borderRadius: "50%",
//                   background: "#F3F4F6",
//                   margin: "0 auto 16px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Icon name="users" size={26} color="#D1D5DB" />
//               </div>
//               <h4
//                 style={{
//                   fontSize: "16px",
//                   fontWeight: 700,
//                   color: "#111827",
//                   marginBottom: "6px",
//                 }}
//               >
//                 {memberSearch || statusFilter !== "all"
//                   ? "No members match your filter"
//                   : "No Members Assigned"}
//               </h4>
//               <p
//                 style={{
//                   fontSize: "14px",
//                   color: "#6B7280",
//                   marginBottom: "20px",
//                 }}
//               >
//                 {memberSearch || statusFilter !== "all"
//                   ? "Try adjusting your search."
//                   : "Add members to start collecting dues."}
//               </p>
//               {!(memberSearch || statusFilter !== "all") && (
//                 <button
//                   onClick={() => setShowAddMember(true)}
//                   style={{
//                     padding: "10px 20px",
//                     background: "#10B981",
//                     color: "white",
//                     fontSize: "13px",
//                     fontWeight: 600,
//                     borderRadius: "8px",
//                     border: "none",
//                     cursor: "pointer",
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: "6px",
//                     fontFamily: "inherit",
//                     boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
//                   }}
//                 >
//                   <Icon name="userplus" size={14} color="white" /> Add First
//                   Member
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div style={{ overflowX: "auto" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead style={{ background: "#F9FAFB" }}>
//                   <tr>
//                     {[
//                       "Member",
//                       "Status",
//                       "Amount Due",
//                       "Amount Paid",
//                       "Assigned At",
//                       "",
//                     ].map((h) => (
//                       <th
//                         key={h}
//                         style={{
//                           padding: "12px 20px",
//                           textAlign: "left",
//                           fontSize: "11px",
//                           fontWeight: 600,
//                           color: "#6B7280",
//                           textTransform: "uppercase",
//                           letterSpacing: "0.05em",
//                           borderBottom: "1px solid #E5E7EB",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredMembers.map((m) => (
//                     <MemberRow
//                       key={m._id}
//                       m={m}
//                       duesId={dues._id}
//                       onRemove={setMemberToRemove}
//                     />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Table footer */}
//           {filteredMembers.length > 0 && (
//             <div
//               style={{
//                 padding: "14px 24px",
//                 borderTop: "1px solid #E5E7EB",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span style={{ fontSize: "13px", color: "#6B7280" }}>
//                 Showing {filteredMembers.length} of {dues.members?.length}{" "}
//                 members
//               </span>
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "16px",
//                   fontSize: "12px",
//                   fontWeight: 600,
//                 }}
//               >
//                 {[
//                   {
//                     label: "Paid",
//                     count: dues.totalPaid,
//                     color: "#065F46",
//                     bg: "#D1FAE5",
//                   },
//                   {
//                     label: "Unpaid",
//                     count: dues.totalMustPay - dues.totalPaid,
//                     color: "#92400E",
//                     bg: "#FEF3C7",
//                   },
//                   {
//                     label: "Exempted",
//                     count: dues.totalExempted,
//                     color: "#6D28D9",
//                     bg: "#EDE9FE",
//                   },
//                 ].map((s) => (
//                   <span
//                     key={s.label}
//                     style={{
//                       padding: "4px 10px",
//                       borderRadius: "6px",
//                       background: s.bg,
//                       color: s.color,
//                     }}
//                   >
//                     {s.label}: {s.count}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── MODALS ── */}
//       {showAddMember && (
//         <AddMemberModal
//           duesId={dues._id}
//           onClose={() => setShowAddMember(false)}
//         />
//       )}
//       {memberToRemove && (
//         <RemoveMemberModal
//           duesId={dues._id}
//           member={memberToRemove}
//           onClose={() => setMemberToRemove(null)}
//         />
//       )}
//       {showRemoveAll && (
//         <RemoveAllMembersModal
//           duesId={dues._id}
//           totalMembers={dues.members?.length || 0}
//           onClose={() => setShowRemoveAll(false)}
//         />
//       )}
//     </div>
//   );
// }

import { useMutateDataV2, useFetchDataV2 } from "@/hook/RequestV2";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n || 0);

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const fmtDateTime = (d) =>
  d
    ? new Date(d).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const categoryLabel = (c) =>
  ({
    annual_membership: "Annual Membership",
    monthly_fee: "Monthly Fee",
    maintenance: "Maintenance",
    special: "Special Levy",
  })[c] || c;

const categoryColor = (c) =>
  ({
    annual_membership: { bg: "#DBEAFE", color: "#1E40AF" },
    monthly_fee: { bg: "#D1FAE5", color: "#065F46" },
    maintenance: { bg: "#FEF3C7", color: "#92400E" },
    special: { bg: "#EDE9FE", color: "#6D28D9" },
  })[c] || { bg: "#F3F4F6", color: "#374151" };

const statusStyle = (s) =>
  ({
    paid: { bg: "#D1FAE5", color: "#065F46" },
    unpaid: { bg: "#FEF3C7", color: "#92400E" },
    exempted: { bg: "#EDE9FE", color: "#6D28D9" },
    waived: { bg: "#F3F4F6", color: "#374151" },
  })[s] || { bg: "#F3F4F6", color: "#374151" };

const progressPct = (paid, total) =>
  total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    back: (
      <>
        <polyline points="15 18 9 12 15 6" />
      </>
    ),
    dues: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    trash: (
      <>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    check: (
      <>
        <polyline points="20 6 9 17 4 12" />
      </>
    ),
    x: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    alert: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </>
    ),
    refresh: (
      <>
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </>
    ),
    edit: (
      <>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </>
    ),
    money: (
      <>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </>
    ),
    filter: (
      <>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </>
    ),
    userplus: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </>
    ),
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
};

// ─── ADD MEMBER MODAL ─────────────────────────────────────────────────────────
const AddMemberModal = ({ duesId, onClose }) => {
  const [memberId, setMemberId] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutateDataV2("generalDues", "POST");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { memberIds: [memberId] };
    if (customAmount) payload.customAmount = Number(customAmount);

    mutate(
      { url: `/v1/generalDuesRouter/${duesId}/add-member`, data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["generalDues-detail"]);
          onClose();
        },
      },
    );
  };

  const inp = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111827",
    background: "white",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "460px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          animation: "slideIn 0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 28px",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#111827",
                margin: 0,
              }}
            >
              Add Member
            </h3>
            <p
              style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0" }}
            >
              Assign a member to this dues
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "#F3F4F6",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="x" size={16} color="#6B7280" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
          <div style={{ display: "grid", gap: "18px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Member ID *
              </label>
              <input
                required
                style={inp}
                placeholder="Paste member ObjectId..."
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#10B981")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
              <p
                style={{
                  fontSize: "12px",
                  color: "#9CA3AF",
                  margin: "6px 0 0",
                }}
              >
                The MongoDB _id of the user to add
              </p>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Custom Amount (₦){" "}
                <span style={{ fontWeight: 400, color: "#9CA3AF" }}>
                  — optional
                </span>
              </label>
              <input
                type="number"
                min="1"
                style={inp}
                placeholder="Leave blank to use default amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#10B981")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>
          </div>

          {error && (
            <div
              style={{
                marginTop: "14px",
                padding: "10px 14px",
                background: "#FEE2E2",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#991B1B",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Icon name="alert" size={15} color="#DC2626" />
              {error?.message || "Something went wrong"}
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "11px",
                background: "white",
                color: "#374151",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              style={{
                flex: 1,
                padding: "11px",
                background: isPending ? "#6EE7B7" : "#10B981",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: isPending ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
              }}
            >
              {isPending ? "Adding..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── REMOVE MEMBER CONFIRM MODAL ──────────────────────────────────────────────
const RemoveMemberModal = ({ duesId, member, onClose }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutateDataV2("generalDues", "DELETE");

  const handleRemove = () => {
    mutate(
      {
        url: `/v1/generalDuesRouter/remove-member`,
        data: { duesId, memberIds: member.member?._id || member.member },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["generalDues-detail"]);
          onClose();
        },
      },
    );
  };

  const memberId =
    typeof member.member === "object" ? member.member?._id : member.member;
  const displayId = memberId?.toString().slice(-8).toUpperCase();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "400px",
          padding: "32px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          animation: "slideIn 0.25s ease",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#FEE2E2",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="trash" size={26} color="#DC2626" />
        </div>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "8px",
          }}
        >
          Remove Member
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#6B7280",
            marginBottom: "24px",
            lineHeight: 1.6,
          }}
        >
          Remove member{" "}
          <strong style={{ color: "#111827" }}>#{displayId}</strong> from this
          dues? This cannot be undone if they have already paid.
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "11px",
              background: "white",
              color: "#374151",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            disabled={isPending}
            style={{
              flex: 1,
              padding: "11px",
              background: isPending ? "#FCA5A5" : "#DC2626",
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "none",
              cursor: isPending ? "not-allowed" : "pointer",
              fontFamily: "inherit",
            }}
          >
            {isPending ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── REMOVE ALL MEMBERS CONFIRM MODAL ──────────────────────────────────────────
const RemoveAllMembersModal = ({ duesId, totalMembers, onClose }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutateDataV2("generalDues-detail", "DELETE");
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );
  const navigate = useNavigate();

  const clanId = selectedEstate._id;
  const handleRemoveAll = () => {
    mutate(
      {
        url: `/v1/generalDuesRouter/assign-all-members`,
        data: {
          duesId: duesId,
          clanId: clanId,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["generalDues-detail"]);
          navigate(-1);
          onClose();
        },
      },
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "440px",
          padding: "32px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          animation: "slideIn 0.25s ease",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#FEE2E2",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="trash" size={32} color="#DC2626" />
        </div>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "8px",
          }}
        >
          Remove All Members
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#6B7280",
            marginBottom: "24px",
            lineHeight: 1.6,
          }}
        >
          Are you sure you want to remove all{" "}
          <strong style={{ color: "#DC2626", fontSize: "16px" }}>
            {totalMembers} members
          </strong>{" "}
          from this dues? This action cannot be undone and will clear all member
          assignments.
        </p>
        <div
          style={{
            background: "#FEF3C7",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "24px",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <Icon name="alert" size={18} color="#92400E" />
          <p
            style={{
              fontSize: "12px",
              color: "#92400E",
              margin: 0,
              textAlign: "left",
              lineHeight: 1.5,
            }}
          >
            <strong>Warning:</strong> Members who have already paid will also be
            removed from the list.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onClose}
            disabled={isPending}
            style={{
              flex: 1,
              padding: "12px",
              background: "white",
              color: "#374151",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              cursor: isPending ? "not-allowed" : "pointer",
              fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleRemoveAll}
            disabled={isPending}
            style={{
              flex: 1,
              padding: "12px",
              background: isPending ? "#FCA5A5" : "#DC2626",
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "none",
              cursor: isPending ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              boxShadow: isPending ? "none" : "0 4px 12px rgba(220,38,38,0.3)",
            }}
          >
            {isPending ? "Removing All..." : "Remove All Members"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── WAIVE MEMBER MODAL ────────────────────────────────────────────────────────
const WaiveMemberModal = ({ duesId, member, onClose }) => {
  const [reason, setReason] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutateDataV2("generalDues", "POST");

  const handleWaive = (e) => {
    e.preventDefault();

    const memberId =
      typeof member.member === "object" ? member.member?._id : member.member;

    console.log({
      duesId,
      memberId,
    });

    mutate(
      {
        url: `/v1/generalDuesRouter/waive`,
        data: {
          duesId,
          memberId,
          reason: reason.trim() || "",
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["generalDues-detail"]);
          onClose();
        },
      },
    );
  };

  const memberId =
    typeof member.member === "object" ? member.member?._id : member.member;
  const memberName =
    typeof member.member === "object"
      ? member.member?.name || member.member?.email
      : null;
  const displayId = memberId?.toString().slice(-8).toUpperCase();

  const inp = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111827",
    background: "white",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    resize: "vertical",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "460px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          animation: "slideIn 0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 28px",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#111827",
                margin: 0,
              }}
            >
              Waive Member
            </h3>
            <p
              style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0" }}
            >
              Waive payment for {memberName || `Member #${displayId}`}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "#F3F4F6",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="x" size={16} color="#6B7280" />
          </button>
        </div>

        <form onSubmit={handleWaive} style={{ padding: "28px" }}>
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                background: "#EDE9FE",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "18px",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
              }}
            >
              <Icon name="alert" size={18} color="#6D28D9" />
              <p
                style={{
                  fontSize: "12px",
                  color: "#6D28D9",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Waiving this member will exempt them from payment. This action
                can be reversed by removing and re-adding the member.
              </p>
            </div>

            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Reason for waiver{" "}
              <span style={{ fontWeight: 400, color: "#9CA3AF" }}>
                — optional
              </span>
            </label>
            <textarea
              style={inp}
              placeholder="Enter reason for waiving this member (e.g., financial hardship, special exemption)..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#6D28D9")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              rows={3}
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: "18px",
                padding: "10px 14px",
                background: "#FEE2E2",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#991B1B",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Icon name="alert" size={15} color="#DC2626" />
              {error?.message || "Something went wrong"}
            </div>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              style={{
                flex: 1,
                padding: "11px",
                background: "white",
                color: "#374151",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                cursor: isPending ? "not-allowed" : "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              style={{
                flex: 1,
                padding: "11px",
                background: isPending ? "#DDD6FE" : "#6D28D9",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: isPending ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 12px rgba(109,40,217,0.3)",
              }}
            >
              {isPending ? "Waiving..." : "Waive Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── MEMBER ROW ───────────────────────────────────────────────────────────────
const MemberRow = ({ m, duesId, onRemove, onWaive }) => {
  const ss = statusStyle(m.status);
  const memberId = typeof m.member === "object" ? m.member?._id : m.member;
  const memberName =
    typeof m.member === "object" ? m.member?.name || m.member?.email : null;
  const displayId = memberId?.toString().slice(-8).toUpperCase();

  return (
    <tr
      style={{
        borderBottom: "1px solid #F3F4F6",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
    >
      <td style={{ padding: "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "#D1FAE5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="users" size={15} color="#10B981" />
          </div>
          <div>
            <div
              style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}
            >
              {memberName || `Member #${displayId}`}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#9CA3AF",
                fontFamily: "monospace",
              }}
            >
              {memberId?.toString()}
            </div>
          </div>
        </div>
      </td>
      <td style={{ padding: "14px 20px" }}>
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 700,
            background: ss.bg,
            color: ss.color,
          }}
        >
          {m.status.toUpperCase()}
        </span>
      </td>
      <td
        style={{
          padding: "14px 20px",
          fontSize: "14px",
          fontWeight: 600,
          color: "#111827",
        }}
      >
        {fmt(m.amountDue)}
      </td>
      <td
        style={{
          padding: "14px 20px",
          fontSize: "14px",
          color: m.amountPaid > 0 ? "#10B981" : "#9CA3AF",
          fontWeight: m.amountPaid > 0 ? 600 : 400,
        }}
      >
        {fmt(m.amountPaid)}
      </td>
      <td style={{ padding: "14px 20px", fontSize: "12px", color: "#6B7280" }}>
        {fmtDateTime(m.assignedAt)}
      </td>
      <td style={{ padding: "14px 20px" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {m.status === "unpaid" && (
            <button
              onClick={() => onWaive(m)}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "6px",
                background: "#EDE9FE",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Waive payment"
            >
              <Icon name="check" size={13} color="#6D28D9" />
            </button>
          )}
          {m.status !== "paid" && (
            <button
              onClick={() => onRemove(m)}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "6px",
                background: "#FEF2F2",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Remove member"
            >
              <Icon name="trash" size={13} color="#DC2626" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

// ─── MAIN DETAIL PAGE ─────────────────────────────────────────────────────────
export default function GeneralDuesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showAddMember, setShowAddMember] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [memberToWaive, setMemberToWaive] = useState(null);
  const [showRemoveAll, setShowRemoveAll] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, isError, refetch } = useFetchDataV2(
    `/v1/generalDuesRouter/${id}`,
    "generalDues-detail",
  );

  const { mutate: assignAll, isPending: isAssigningAll } = useMutateDataV2(
    "generalDues-detail",
    "POST",
  );

  const dues = data?.data;

  const pct = dues ? progressPct(dues.collectedTotal, dues.expectedTotal) : 0;
  const cat = dues ? categoryColor(dues.category) : {};
  const isOverdue = dues
    ? new Date(dues.dueDate) < new Date() && dues.outstandingTotal > 0
    : false;

  const filteredMembers =
    dues?.members?.filter((m) => {
      const memberId = typeof m.member === "object" ? m.member?._id : m.member;
      const memberName =
        typeof m.member === "object" ? m.member?.name || "" : "";
      const matchSearch =
        memberName.toLowerCase().includes(memberSearch.toLowerCase()) ||
        memberId?.toString().toLowerCase().includes(memberSearch.toLowerCase());
      const matchStatus = statusFilter === "all" || m.status === statusFilter;
      return matchSearch && matchStatus;
    }) || [];

  // ── LOADING ──
  if (isLoading) {
    return (
      <div
        style={{
          background: "#F9FAFB",
          minHeight: "100vh",
          padding: "32px 24px",
          fontFamily: "'Inter', -apple-system, sans-serif",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
            <div
              style={{
                height: "36px",
                width: "100px",
                background: "#E5E7EB",
                borderRadius: "8px",
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "24px",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                height: "400px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            />
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                height: "400px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── ERROR ──
  if (isError || !dues) {
    return (
      <div
        style={{
          background: "#F9FAFB",
          minHeight: "100vh",
          padding: "32px 24px",
          fontFamily: "'Inter', -apple-system, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#FEE2E2",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="alert" size={32} color="#DC2626" />
          </div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            Failed to Load
          </h3>
          <p
            style={{ fontSize: "14px", color: "#6B7280", marginBottom: "20px" }}
          >
            Could not fetch dues details.
          </p>
          <button
            onClick={() => refetch()}
            style={{
              padding: "12px 24px",
              background: "#10B981",
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#F9FAFB",
        minHeight: "100vh",
        padding: "32px 24px",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:scale(0.95) translateY(-10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing:border-box; }
        input, select, button, textarea { font-family:inherit; }
      `}</style>

      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* ── BREADCRUMB / BACK ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "28px",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              background: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
              cursor: "pointer",
            }}
          >
            <Icon name="back" size={15} color="#374151" /> Back
          </button>
          <span style={{ fontSize: "13px", color: "#9CA3AF" }}>/</span>
          <span style={{ fontSize: "13px", color: "#9CA3AF" }}>
            General Dues
          </span>
          <span style={{ fontSize: "13px", color: "#9CA3AF" }}>/</span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#111827",
              maxWidth: "300px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {dues.title}
          </span>
        </div>

        {/* ── PAGE HEADER ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "28px",
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
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#111827",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                {dues.title}
              </h1>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: cat.bg,
                  color: cat.color,
                }}
              >
                {categoryLabel(dues.category)}
              </span>
              {isOverdue && (
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    background: "#FEE2E2",
                    color: "#991B1B",
                  }}
                >
                  OVERDUE
                </span>
              )}
              {!dues.isActive && (
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    background: "#F3F4F6",
                    color: "#6B7280",
                  }}
                >
                  INACTIVE
                </span>
              )}
            </div>
            {dues.description && (
              <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
                {dues.description}
              </p>
            )}
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => refetch()}
              style={{
                padding: "10px 14px",
                background: "white",
                color: "#374151",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Icon name="refresh" size={14} color="#374151" /> Refresh
            </button>

            {dues?.members?.length > 0 && (
              <button
                onClick={() => setShowRemoveAll(true)}
                style={{
                  padding: "10px 14px",
                  background: "white",
                  color: "#DC2626",
                  fontSize: "13px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  border: "2px solid #DC2626",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Icon name="trash" size={14} color="#DC2626" /> Remove All
              </button>
            )}

            <button
              onClick={() =>
                assignAll({
                  url: "/v1/generalDuesRouter/assign-all-members",
                  data: { duesId: dues._id },
                })
              }
              disabled={isAssigningAll}
              style={{
                padding: "10px 18px",
                background: isAssigningAll ? "#D1FAE5" : "white",
                color: "#10B981",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "2px solid #10B981",
                cursor: isAssigningAll ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Icon name="users" size={14} color="#10B981" />
              {isAssigningAll ? "Assigning..." : "Assign All Members"}
            </button>
            <button
              onClick={() => setShowAddMember(true)}
              style={{
                padding: "10px 18px",
                background: "#10B981",
                color: "white",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
              }}
            >
              <Icon name="userplus" size={14} color="white" /> Add Member
            </button>
          </div>
        </div>

        {/* ── TOP LAYOUT: INFO + STATS ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          {/* LEFT: Info card */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Quick info */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                animation: "fadeIn 0.4s ease both",
              }}
            >
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#111827",
                  margin: "0 0 16px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #F3F4F6",
                }}
              >
                Dues Info
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {[
                  {
                    icon: "calendar",
                    label: "Due Date",
                    value: fmtDate(dues.dueDate),
                    highlight: isOverdue,
                  },
                  {
                    icon: "money",
                    label: "Default Amount",
                    value: fmt(dues.defaultAmount),
                  },
                  {
                    icon: "dues",
                    label: "Category",
                    value: categoryLabel(dues.category),
                  },
                  {
                    icon: "check",
                    label: "Status",
                    value: dues.isActive ? "Active" : "Inactive",
                  },
                  {
                    icon: "users",
                    label: "Created By",
                    value: dues.createdBy?.toString().slice(-8).toUpperCase(),
                  },
                  {
                    icon: "calendar",
                    label: "Created At",
                    value: fmtDate(dues.createdAt),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "#F9FAFB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name={item.icon} size={14} color="#6B7280" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#9CA3AF",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: item.highlight ? "#DC2626" : "#111827",
                          marginTop: "1px",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Member summary */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                animation: "fadeIn 0.4s ease 0.05s both",
              }}
            >
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#111827",
                  margin: "0 0 16px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #F3F4F6",
                }}
              >
                Member Summary
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {[
                  {
                    label: "Total Assigned",
                    value: dues.totalAssigned,
                    bg: "#F9FAFB",
                    color: "#111827",
                  },
                  {
                    label: "Must Pay",
                    value: dues.totalMustPay,
                    bg: "#FEF3C7",
                    color: "#92400E",
                  },
                  {
                    label: "Paid",
                    value: dues.totalPaid,
                    bg: "#D1FAE5",
                    color: "#065F46",
                  },
                  {
                    label: "Exempted",
                    value: dues.totalExempted,
                    bg: "#EDE9FE",
                    color: "#6D28D9",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: s.bg,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 800,
                        color: s.color,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#6B7280",
                        marginTop: "2px",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Financial stats + progress */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Financial cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {[
                {
                  label: "Expected Total",
                  value: fmt(dues.expectedTotal),
                  icon: "dues",
                  bg: "#DBEAFE",
                  color: "#2563EB",
                  desc: "Total amount to collect",
                },
                {
                  label: "Collected Total",
                  value: fmt(dues.collectedTotal),
                  icon: "check",
                  bg: "#D1FAE5",
                  color: "#10B981",
                  desc: "Amount collected so far",
                },
                {
                  label: "Outstanding",
                  value: fmt(dues.outstandingTotal),
                  icon: "alert",
                  bg: "#FEE2E2",
                  color: "#DC2626",
                  desc: "Amount still pending",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    animation: `fadeIn 0.4s ease ${i * 0.05}s both`,
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: s.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <Icon name={s.icon} size={18} color={s.color} />
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#111827",
                      marginBottom: "2px",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#9CA3AF",
                      marginTop: "2px",
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress card */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                flex: 1,
                animation: "fadeIn 0.4s ease 0.15s both",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  Collection Progress
                </h3>
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color:
                      pct === 100
                        ? "#10B981"
                        : pct > 50
                          ? "#F59E0B"
                          : "#DC2626",
                  }}
                >
                  {pct}%
                </span>
              </div>

              {/* Big progress bar */}
              <div
                style={{
                  height: "12px",
                  background: "#F3F4F6",
                  borderRadius: "99px",
                  overflow: "hidden",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${pct}%`,
                    borderRadius: "99px",
                    background:
                      pct === 100
                        ? "#10B981"
                        : pct > 60
                          ? "linear-gradient(90deg,#F59E0B,#10B981)"
                          : "linear-gradient(90deg,#DC2626,#F59E0B)",
                    transition: "width 0.8s ease",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  color: "#6B7280",
                  fontWeight: 500,
                }}
              >
                <span>
                  {dues.totalPaid} of {dues.totalMustPay} members paid
                </span>
                <span>{dues.totalMustPay - dues.totalPaid} remaining</span>
              </div>

              {/* Mini breakdown bars */}
              {dues.totalAssigned > 0 && (
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "20px",
                    borderTop: "1px solid #F3F4F6",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#6B7280",
                      marginBottom: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Breakdown
                  </div>
                  {[
                    {
                      label: "Paid",
                      count: dues.totalPaid,
                      total: dues.totalAssigned,
                      color: "#10B981",
                    },
                    {
                      label: "Unpaid",
                      count: dues.totalMustPay - dues.totalPaid,
                      total: dues.totalAssigned,
                      color: "#F59E0B",
                    },
                    {
                      label: "Exempted",
                      count: dues.totalExempted,
                      total: dues.totalAssigned,
                      color: "#8B5CF6",
                    },
                  ].map((b) => (
                    <div
                      key={b.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          fontSize: "12px",
                          color: "#6B7280",
                          fontWeight: 500,
                        }}
                      >
                        {b.label}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          height: "6px",
                          background: "#F3F4F6",
                          borderRadius: "99px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${b.total > 0 ? (b.count / b.total) * 100 : 0}%`,
                            background: b.color,
                            borderRadius: "99px",
                            transition: "width 0.6s ease",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: "30px",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#111827",
                          textAlign: "right",
                        }}
                      >
                        {b.count}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── MEMBERS TABLE ── */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            animation: "fadeIn 0.4s ease 0.2s both",
          }}
        >
          {/* Table header */}
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #E5E7EB",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111827",
                  margin: 0,
                }}
              >
                Members
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                  margin: "2px 0 0",
                }}
              >
                {dues.members?.length || 0} assigned · {filteredMembers.length}{" "}
                shown
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <Icon name="search" size={14} color="#9CA3AF" />
                </div>
                <input
                  placeholder="Search member..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  style={{
                    padding: "8px 12px 8px 34px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "13px",
                    background: "white",
                    outline: "none",
                    width: "200px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#10B981")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                />
              </div>
              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: "8px 32px 8px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "13px",
                  background: "white",
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 8px center",
                }}
              >
                <option value="all">All Status</option>
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="exempted">Exempted</option>
                <option value="waived">Waived</option>
              </select>
              <button
                onClick={() => setShowAddMember(true)}
                style={{
                  padding: "8px 14px",
                  background: "#10B981",
                  color: "white",
                  fontSize: "13px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 4px 12px rgba(16,185,129,0.25)",
                }}
              >
                <Icon name="plus" size={14} color="white" /> Add Member
              </button>
            </div>
          </div>

          {/* Table */}
          {filteredMembers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 32px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#F3F4F6",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="users" size={26} color="#D1D5DB" />
              </div>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: "6px",
                }}
              >
                {memberSearch || statusFilter !== "all"
                  ? "No members match your filter"
                  : "No Members Assigned"}
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  marginBottom: "20px",
                }}
              >
                {memberSearch || statusFilter !== "all"
                  ? "Try adjusting your search."
                  : "Add members to start collecting dues."}
              </p>
              {!(memberSearch || statusFilter !== "all") && (
                <button
                  onClick={() => setShowAddMember(true)}
                  style={{
                    padding: "10px 20px",
                    background: "#10B981",
                    color: "white",
                    fontSize: "13px",
                    fontWeight: 600,
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "inherit",
                    boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
                  }}
                >
                  <Icon name="userplus" size={14} color="white" /> Add First
                  Member
                </button>
              )}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#F9FAFB" }}>
                  <tr>
                    {[
                      "Member",
                      "Status",
                      "Amount Due",
                      "Amount Paid",
                      "Assigned At",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 20px",
                          textAlign: "left",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#6B7280",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          borderBottom: "1px solid #E5E7EB",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((m) => (
                    <MemberRow
                      key={m._id}
                      m={m}
                      duesId={dues._id}
                      onRemove={setMemberToRemove}
                      onWaive={setMemberToWaive}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table footer */}
          {filteredMembers.length > 0 && (
            <div
              style={{
                padding: "14px 24px",
                borderTop: "1px solid #E5E7EB",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>
                Showing {filteredMembers.length} of {dues.members?.length}{" "}
                members
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {[
                  {
                    label: "Paid",
                    count: dues.totalPaid,
                    color: "#065F46",
                    bg: "#D1FAE5",
                  },
                  {
                    label: "Unpaid",
                    count: dues.totalMustPay - dues.totalPaid,
                    color: "#92400E",
                    bg: "#FEF3C7",
                  },
                  {
                    label: "Exempted",
                    count: dues.totalExempted,
                    color: "#6D28D9",
                    bg: "#EDE9FE",
                  },
                ].map((s) => (
                  <span
                    key={s.label}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: s.bg,
                      color: s.color,
                    }}
                  >
                    {s.label}: {s.count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MODALS ── */}
      {showAddMember && (
        <AddMemberModal
          duesId={dues._id}
          onClose={() => setShowAddMember(false)}
        />
      )}
      {memberToRemove && (
        <RemoveMemberModal
          duesId={dues._id}
          member={memberToRemove}
          onClose={() => setMemberToRemove(null)}
        />
      )}
      {memberToWaive && (
        <WaiveMemberModal
          duesId={dues._id}
          member={memberToWaive}
          onClose={() => setMemberToWaive(null)}
        />
      )}
      {showRemoveAll && (
        <RemoveAllMembersModal
          duesId={dues._id}
          totalMembers={dues.members?.length || 0}
          onClose={() => setShowRemoveAll(false)}
        />
      )}
    </div>
  );
}
