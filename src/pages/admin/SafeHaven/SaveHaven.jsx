// import React, { useState } from "react";
// import { useFetchDataV2 } from "@/hook/RequestV2";
// import {
//   CreditCard,
//   Eye,
//   EyeOff,
//   Copy,
//   Check,
//   AlertCircle,
//   Loader2,
//   TrendingUp,
//   Users,
//   DollarSign,
// } from "lucide-react";

// export default function SaveHaven() {
//   const [showBalances, setShowBalances] = useState(false);
//   const [copiedAccount, setCopiedAccount] = useState(null);

//   const {
//     data: accountsResponse,
//     isLoading,
//     error,
//   } = useFetchDataV2("/v1/savehaven/listAllAccounts", "safehaven-accounts");

//   const accounts = accountsResponse?.accounts?.data || [];
//   const pagination = accountsResponse?.accounts?.pagination || {};

//   const handleCopyAccount = (accountNumber) => {
//     navigator.clipboard.writeText(accountNumber);
//     setCopiedAccount(accountNumber);
//     setTimeout(() => setCopiedAccount(null), 2000);
//   };

//   const toggleBalances = () => {
//     setShowBalances(!showBalances);
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };

//   const getTotalBalance = () => {
//     return accounts.reduce((sum, acc) => sum + acc.accountBalance, 0);
//   };

//   const getActiveAccounts = () => {
//     return accounts.filter((acc) => acc.status === "Active").length;
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Active":
//         return { bg: "#D1FAE5", color: "#065F46" };
//       case "Inactive":
//         return { bg: "#FEE2E2", color: "#991B1B" };
//       default:
//         return { bg: "#F3F4F6", color: "#6B7280" };
//     }
//   };

//   if (isLoading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "60vh",
//           gap: "16px",
//         }}
//       >
//         <Loader2
//           size={48}
//           color="#10B981"
//           style={{ animation: "spin 1s linear infinite" }}
//         />
//         <p style={{ fontSize: "14px", color: "#6B7280" }}>
//           Loading accounts...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
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
//         <div
//           style={{
//             width: "80px",
//             height: "80px",
//             borderRadius: "40px",
//             background: "#FEE2E2",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginBottom: "16px",
//           }}
//         >
//           <AlertCircle size={32} color="#DC2626" />
//         </div>
//         <p
//           style={{
//             fontSize: "16px",
//             fontWeight: 600,
//             color: "#111827",
//             marginBottom: "8px",
//           }}
//         >
//           Error loading accounts
//         </p>
//         <p style={{ fontSize: "14px", color: "#6B7280" }}>
//           {error?.message || "Something went wrong"}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ background: "#F9FAFB", minHeight: "100vh", padding: "32px" }}>
//       {/* Header */}
//       <div style={{ marginBottom: "32px" }}>
//         <h1
//           style={{
//             fontSize: "28px",
//             fontWeight: 700,
//             color: "#111827",
//             marginBottom: "8px",
//           }}
//         >
//           Safe Haven Bank Accounts
//         </h1>
//         <p style={{ fontSize: "14px", color: "#6B7280" }}>
//           Manage your virtual bank accounts
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           gap: "24px",
//           marginBottom: "32px",
//         }}
//       >
//         <StatsCard
//           title="Total Balance"
//           value={showBalances ? formatCurrency(getTotalBalance()) : "₦ ••••••"}
//           icon={<DollarSign size={24} />}
//           iconBg="#D1FAE5"
//           iconColor="#10B981"
//           showToggle={true}
//           onToggle={toggleBalances}
//           isVisible={showBalances}
//         />
//         <StatsCard
//           title="Active Accounts"
//           value={getActiveAccounts()}
//           icon={<Users size={24} />}
//           iconBg="#DBEAFE"
//           iconColor="#3B82F6"
//         />
//         <StatsCard
//           title="Total Accounts"
//           value={accounts.length}
//           icon={<CreditCard size={24} />}
//           iconBg="#FEF3C7"
//           iconColor="#F59E0B"
//         />
//       </div>

//       {/* Accounts List */}
//       <div
//         style={{
//           background: "white",
//           borderRadius: "16px",
//           padding: "24px",
//           boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "24px",
//           }}
//         >
//           <h2
//             style={{
//               fontSize: "18px",
//               fontWeight: 700,
//               color: "#111827",
//             }}
//           >
//             All Accounts ({accounts.length})
//           </h2>
//         </div>

//         {accounts.length === 0 ? (
//           <div
//             style={{
//               padding: "48px",
//               textAlign: "center",
//               background: "#F9FAFB",
//               borderRadius: "12px",
//             }}
//           >
//             <CreditCard
//               size={48}
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
//               No accounts found
//             </p>
//             <p style={{ fontSize: "14px", color: "#6B7280" }}>
//               Create your first virtual account to get started
//             </p>
//           </div>
//         ) : (
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//           >
//             {accounts.map((account) => {
//               const statusStyle = getStatusColor(account.status);
//               const isCopied = copiedAccount === account.accountNumber;

//               return (
//                 <div
//                   key={account._id}
//                   style={{
//                     padding: "20px",
//                     background: "#F9FAFB",
//                     borderRadius: "12px",
//                     border: "2px solid #E5E7EB",
//                     transition: "all 0.2s ease",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "#10B981";
//                     e.currentTarget.style.boxShadow =
//                       "0 4px 12px rgba(16, 185, 129, 0.1)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = "#E5E7EB";
//                     e.currentTarget.style.boxShadow = "none";
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       marginBottom: "16px",
//                     }}
//                   >
//                     {/* Account Info */}
//                     <div style={{ flex: 1 }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "12px",
//                           marginBottom: "8px",
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: "48px",
//                             height: "48px",
//                             borderRadius: "12px",
//                             background: "#10B981",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             color: "white",
//                           }}
//                         >
//                           <CreditCard size={24} />
//                         </div>
//                         <div>
//                           <h3
//                             style={{
//                               fontSize: "16px",
//                               fontWeight: 700,
//                               color: "#111827",
//                               marginBottom: "4px",
//                             }}
//                           >
//                             {account.accountName}
//                           </h3>
//                           <p style={{ fontSize: "13px", color: "#6B7280" }}>
//                             {account.accountType} Account
//                           </p>
//                         </div>
//                       </div>

//                       {/* Account Details Grid */}
//                       <div
//                         style={{
//                           display: "grid",
//                           gridTemplateColumns: "repeat(2, 1fr)",
//                           gap: "16px",
//                           marginTop: "16px",
//                         }}
//                       >
//                         {/* Account Number */}
//                         <div>
//                           <p
//                             style={{
//                               fontSize: "12px",
//                               color: "#9CA3AF",
//                               marginBottom: "4px",
//                             }}
//                           >
//                             Account Number
//                           </p>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "8px",
//                             }}
//                           >
//                             <p
//                               style={{
//                                 fontSize: "15px",
//                                 fontWeight: 700,
//                                 color: "#111827",
//                                 fontFamily: "monospace",
//                               }}
//                             >
//                               {account.accountNumber}
//                             </p>
//                             <button
//                               onClick={() =>
//                                 handleCopyAccount(account.accountNumber)
//                               }
//                               style={{
//                                 width: "28px",
//                                 height: "28px",
//                                 borderRadius: "6px",
//                                 background: isCopied ? "#D1FAE5" : "#F3F4F6",
//                                 border: "none",
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 transition: "all 0.2s ease",
//                               }}
//                             >
//                               {isCopied ? (
//                                 <Check size={14} color="#10B981" />
//                               ) : (
//                                 <Copy size={14} color="#6B7280" />
//                               )}
//                             </button>
//                           </div>
//                         </div>

//                         {/* Bank Name */}
//                         <div>
//                           <p
//                             style={{
//                               fontSize: "12px",
//                               color: "#9CA3AF",
//                               marginBottom: "4px",
//                             }}
//                           >
//                             Bank
//                           </p>
//                           <p
//                             style={{
//                               fontSize: "14px",
//                               fontWeight: 600,
//                               color: "#111827",
//                             }}
//                           >
//                             {account.bankName}
//                           </p>
//                         </div>

//                         {/* Balance */}
//                         <div>
//                           <p
//                             style={{
//                               fontSize: "12px",
//                               color: "#9CA3AF",
//                               marginBottom: "4px",
//                             }}
//                           >
//                             Account Balance
//                           </p>
//                           <p
//                             style={{
//                               fontSize: "16px",
//                               fontWeight: 700,
//                               color: "#10B981",
//                               fontFamily: "monospace",
//                             }}
//                           >
//                             {showBalances
//                               ? formatCurrency(account.accountBalance)
//                               : "₦ ••••••"}
//                           </p>
//                         </div>

//                         {/* Book Balance */}
//                         <div>
//                           <p
//                             style={{
//                               fontSize: "12px",
//                               color: "#9CA3AF",
//                               marginBottom: "4px",
//                             }}
//                           >
//                             Book Balance
//                           </p>
//                           <p
//                             style={{
//                               fontSize: "14px",
//                               fontWeight: 600,
//                               color: "#6B7280",
//                               fontFamily: "monospace",
//                             }}
//                           >
//                             {showBalances
//                               ? formatCurrency(account.bookBalance)
//                               : "₦ ••••••"}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Sub Account Details */}
//                       {account.subAccountDetails && (
//                         <div
//                           style={{
//                             marginTop: "16px",
//                             padding: "12px",
//                             background: "white",
//                             borderRadius: "8px",
//                           }}
//                         >
//                           <p
//                             style={{
//                               fontSize: "12px",
//                               color: "#9CA3AF",
//                               marginBottom: "8px",
//                             }}
//                           >
//                             Account Holder
//                           </p>
//                           <div
//                             style={{
//                               display: "flex",
//                               gap: "16px",
//                               fontSize: "13px",
//                             }}
//                           >
//                             <div>
//                               <span style={{ color: "#6B7280" }}>Name: </span>
//                               <span
//                                 style={{ fontWeight: 600, color: "#111827" }}
//                               >
//                                 {account.subAccountDetails.firstName}{" "}
//                                 {account.subAccountDetails.lastName}
//                               </span>
//                             </div>
//                             <div>
//                               <span style={{ color: "#6B7280" }}>Email: </span>
//                               <span
//                                 style={{ fontWeight: 600, color: "#111827" }}
//                               >
//                                 {account.subAccountDetails.emailAddress}
//                               </span>
//                             </div>
//                             {account.subAccountDetails.nin && (
//                               <div>
//                                 <span style={{ color: "#6B7280" }}>NIN: </span>
//                                 <span
//                                   style={{ fontWeight: 600, color: "#111827" }}
//                                 >
//                                   {account.subAccountDetails.nin}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Status Badge */}
//                     <span
//                       style={{
//                         padding: "6px 12px",
//                         borderRadius: "6px",
//                         fontSize: "12px",
//                         fontWeight: 600,
//                         background: statusStyle.bg,
//                         color: statusStyle.color,
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       {account.status}
//                     </span>
//                   </div>

//                   {/* Additional Info */}
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       paddingTop: "16px",
//                       borderTop: "1px solid #E5E7EB",
//                       fontSize: "12px",
//                       color: "#6B7280",
//                     }}
//                   >
//                     <div>
//                       <span>Created: </span>
//                       <span style={{ fontWeight: 600 }}>
//                         {new Date(account.createdAt).toLocaleDateString(
//                           "en-US",
//                           {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric",
//                           },
//                         )}
//                       </span>
//                     </div>
//                     <div>
//                       <span>Reference: </span>
//                       <span
//                         style={{
//                           fontWeight: 600,
//                           fontFamily: "monospace",
//                         }}
//                       >
//                         {account.externalReference}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Pagination Info */}
//         {pagination.total > 0 && (
//           <div
//             style={{
//               marginTop: "24px",
//               padding: "16px",
//               background: "#F9FAFB",
//               borderRadius: "8px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <p style={{ fontSize: "14px", color: "#6B7280" }}>
//               Showing {accounts.length} of {pagination.total} accounts
//             </p>
//             <p style={{ fontSize: "13px", color: "#9CA3AF" }}>
//               Page {parseInt(pagination.page) + 1} of {pagination.pages}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const StatsCard = ({
//   title,
//   value,
//   icon,
//   iconBg,
//   iconColor,
//   showToggle,
//   onToggle,
//   isVisible,
// }) => {
//   return (
//     <div
//       style={{
//         background: "white",
//         borderRadius: "12px",
//         padding: "24px",
//         boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//           marginBottom: "16px",
//         }}
//       >
//         <div
//           style={{
//             width: "48px",
//             height: "48px",
//             borderRadius: "12px",
//             background: iconBg,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: iconColor,
//           }}
//         >
//           {icon}
//         </div>
//         {showToggle && (
//           <button
//             onClick={onToggle}
//             style={{
//               width: "36px",
//               height: "36px",
//               borderRadius: "8px",
//               background: "#F3F4F6",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "all 0.2s ease",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "#E5E7EB";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "#F3F4F6";
//             }}
//           >
//             {isVisible ? (
//               <EyeOff size={18} color="#6B7280" />
//             ) : (
//               <Eye size={18} color="#6B7280" />
//             )}
//           </button>
//         )}
//       </div>
//       <div
//         style={{
//           fontSize: "28px",
//           fontWeight: 700,
//           color: "#111827",
//           marginBottom: "4px",
//           fontFamily: showToggle ? "monospace" : "inherit",
//         }}
//       >
//         {value}
//       </div>
//       <div style={{ fontSize: "14px", color: "#6B7280", fontWeight: 500 }}>
//         {title}
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useFetchDataV2 } from "@/hook/RequestV2";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Users,
  DollarSign,
  ChevronRight,
} from "lucide-react";

export default function SaveHaven() {
  const navigate = useNavigate();
  const [showBalances, setShowBalances] = useState(false);

  const {
    data: accountsResponse,
    isLoading,
    error,
  } = useFetchDataV2("/v1/savehaven/listAllAccounts", "safehaven-accounts");

  const accounts = accountsResponse?.accounts?.data || [];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getTotalBalance = () => {
    return accounts.reduce((sum, acc) => sum + acc.accountBalance, 0);
  };

  const getActiveAccounts = () => {
    return accounts.filter((acc) => acc.status === "Active").length;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return { bg: "#D1FAE5", color: "#065F46" };
      case "Inactive":
        return { bg: "#FEE2E2", color: "#991B1B" };
      default:
        return { bg: "#F3F4F6", color: "#6B7280" };
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: "16px",
        }}
      >
        <Loader2
          size={48}
          color="#10B981"
          style={{ animation: "spin 1s linear infinite" }}
        />
        <p style={{ fontSize: "14px", color: "#6B7280" }}>
          Loading accounts...
        </p>
      </div>
    );
  }

  if (error) {
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
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "40px",
            background: "#FEE2E2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <AlertCircle size={32} color="#DC2626" />
        </div>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "8px",
          }}
        >
          Error loading accounts
        </p>
        <p style={{ fontSize: "14px", color: "#6B7280" }}>
          {error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh", padding: "32px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "8px",
          }}
        >
          Safe Haven Bank Accounts
        </h1>
        <p style={{ fontSize: "14px", color: "#6B7280" }}>
          Manage your virtual bank accounts
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <StatsCard
          title="Total Balance"
          value={showBalances ? formatCurrency(getTotalBalance()) : "₦ ••••••"}
          icon={<DollarSign size={24} />}
          iconBg="#D1FAE5"
          iconColor="#10B981"
          showToggle={true}
          onToggle={() => setShowBalances(!showBalances)}
          isVisible={showBalances}
        />
        <StatsCard
          title="Active Accounts"
          value={getActiveAccounts()}
          icon={<Users size={24} />}
          iconBg="#DBEAFE"
          iconColor="#3B82F6"
        />
        <StatsCard
          title="Total Accounts"
          value={accounts.length}
          icon={<CreditCard size={24} />}
          iconBg="#FEF3C7"
          iconColor="#F59E0B"
        />
      </div>

      {/* Accounts Table */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "20px",
          }}
        >
          All Accounts ({accounts.length})
        </h2>

        {accounts.length === 0 ? (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
              background: "#F9FAFB",
              borderRadius: "12px",
            }}
          >
            <CreditCard
              size={48}
              color="#D1D5DB"
              style={{ margin: "0 auto 16px" }}
            />
            <p
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              No accounts found
            </p>
            <p style={{ fontSize: "14px", color: "#6B7280" }}>
              Create your first virtual account to get started
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E5E7EB" }}>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Account Name
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Account Number
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Balance
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "right",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => {
                  const statusStyle = getStatusColor(account.status);
                  return (
                    <tr
                      key={account._id}
                      style={{
                        borderBottom: "1px solid #F3F4F6",
                        transition: "background 0.2s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F9FAFB";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "white";
                      }}
                      onClick={() =>
                        navigate(`/safehaven/${account.accountNumber}`)
                      }
                    >
                      <td style={{ padding: "16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "8px",
                              background: "#10B981",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                            }}
                          >
                            <CreditCard size={20} />
                          </div>
                          <div>
                            <p
                              style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#111827",
                                marginBottom: "2px",
                              }}
                            >
                              {account.accountName}
                            </p>
                            <p style={{ fontSize: "12px", color: "#6B7280" }}>
                              {account.accountType} Account
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#111827",
                            fontFamily: "monospace",
                          }}
                        >
                          {account.accountNumber}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#6B7280",
                            marginTop: "2px",
                          }}
                        >
                          {account.bankName}
                        </p>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#10B981",
                            fontFamily: "monospace",
                          }}
                        >
                          {showBalances
                            ? formatCurrency(account.accountBalance)
                            : "₦ ••••••"}
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#9CA3AF",
                            marginTop: "2px",
                          }}
                        >
                          Book:{" "}
                          {showBalances
                            ? formatCurrency(account.bookBalance)
                            : "••••"}
                        </p>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            background: statusStyle.bg,
                            color: statusStyle.color,
                            display: "inline-block",
                          }}
                        >
                          {account.status}
                        </span>
                      </td>
                      <td style={{ padding: "16px", textAlign: "right" }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/dashboard/safehaven/${account.accountNumber}`,
                            );
                          }}
                          style={{
                            padding: "8px 16px",
                            background: "#10B981",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#059669";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#10B981";
                          }}
                        >
                          View Details
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const StatsCard = ({
  title,
  value,
  icon,
  iconBg,
  iconColor,
  showToggle,
  onToggle,
  isVisible,
}) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
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
        {showToggle && (
          <button
            onClick={onToggle}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "#F3F4F6",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#E5E7EB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F3F4F6";
            }}
          >
            {isVisible ? (
              <EyeOff size={18} color="#6B7280" />
            ) : (
              <Eye size={18} color="#6B7280" />
            )}
          </button>
        )}
      </div>
      <div
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "4px",
          fontFamily: showToggle ? "monospace" : "inherit",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: "14px", color: "#6B7280", fontWeight: 500 }}>
        {title}
      </div>
    </div>
  );
};
