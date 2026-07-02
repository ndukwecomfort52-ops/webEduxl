// import { useFetchData } from "@/hook/Request";
// import { useState } from "react";

// // ✅ Helper component for stats
// const StatCard = ({ title, value, unit }) => (
//   <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
//     <p className="text-sm font-medium text-gray-500">{title}</p>
//     <p className="text-2xl font-bold text-gray-800 mt-1">
//       {value}{" "}
//       <span className="text-base font-semibold text-gray-500">{unit}</span>
//     </p>
//   </div>
// );

// export default function TransactionsTable() {
//   const [expandedMonths, setExpandedMonths] = useState(new Set());

//   // ✅ Fetch data using your custom hook
//   const { data: getall_metter } = useFetchData(
//     `/captain/get-transactions`,
//     "get-captain-metter",
//   );

//   // ✅ Extract grouped data
//   const groupedData = getall_metter?.data || [];
//   const totalCount = getall_metter?.totalCount || 0;

//   // ✅ Calculate overall totals across all months using estateCommission
//   const totals = groupedData.reduce(
//     (acc, monthGroup) => {
//       monthGroup.transactions.forEach((tx) => {
//         acc.totalUnits += tx.totalUnit || 0;
//         acc.totalEstateCommission += tx.estateCommission || 0;
//       });
//       return acc;
//     },
//     { totalUnits: 0, totalEstateCommission: 0 },
//   );

//   // ✅ Currency formatter
//   const formatNaira = (amount) =>
//     `₦${Number(amount || 0).toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;

//   // ✅ Toggle month expansion
//   const toggleMonth = (month) => {
//     setExpandedMonths((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(month)) {
//         newSet.delete(month);
//       } else {
//         newSet.add(month);
//       }
//       return newSet;
//     });
//   };

//   return (
//     <div className="p-6">
//       {/* Page Title */}
//       <h1 className="text-2xl font-semibold mb-4">Transactions Overview</h1>

//       {/* Summary Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <StatCard
//           title="Total Transactions"
//           value={totalCount.toLocaleString()}
//           unit="transactions"
//         />
//         <StatCard
//           title="Total Units"
//           value={totals.totalUnits.toLocaleString()}
//           unit="kWh"
//         />
//         <StatCard
//           // title="Total Estate Commission"
//           title="Total Amount"
//           value={formatNaira(totals.totalEstateCommission)}
//           unit=""
//         />
//       </div>

//       {/* Grouped Transactions by Month */}
//       <h2 className="text-xl font-semibold mb-3">Transaction Details</h2>

//       <div className="space-y-4">
//         {groupedData.map((monthGroup) => {
//           const isExpanded = expandedMonths.has(monthGroup.month);

//           // Calculate month totals using estateCommission
//           const monthTotals = monthGroup.transactions.reduce(
//             (acc, tx) => {
//               acc.totalUnits += tx.totalUnit || 0;
//               acc.totalEstateCommission += tx.estateCommission || 0;
//               return acc;
//             },
//             { totalUnits: 0, totalEstateCommission: 0 },
//           );

//           return (
//             <div
//               key={monthGroup.month}
//               className="bg-white shadow-md rounded-lg overflow-hidden"
//             >
//               {/* Month Header - Clickable */}
//               <div
//                 className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 cursor-pointer hover:from-blue-600 hover:to-blue-700 transition"
//                 onClick={() => toggleMonth(monthGroup.month)}
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="text-lg font-bold">{monthGroup.month}</h3>
//                     <p className="text-sm opacity-90">
//                       {monthGroup.count} transactions
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm opacity-90">Total Units</p>
//                     <p className="text-xl font-bold">
//                       {monthTotals.totalUnits.toLocaleString()} kWh
//                     </p>
//                     <p className="text-sm opacity-90 mt-2">Total Amount </p>
//                     <p className="text-xl font-bold">
//                       {formatNaira(monthTotals.totalEstateCommission)}
//                     </p>
//                   </div>
//                   <div className="ml-4">
//                     <svg
//                       className={`w-6 h-6 transition-transform ${
//                         isExpanded ? "rotate-180" : ""
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Transactions Table - Collapsible */}
//               {isExpanded && (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full text-sm text-left text-gray-600">
//                     {/* Table Header */}
//                     <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//                       <tr>
//                         <th className="px-4 py-3">Customer Name</th>
//                         <th className="px-4 py-3">Customer ID</th>
//                         <th className="px-4 py-3">Phone / Address</th>
//                         <th className="px-4 py-3">Meter ID / Type</th>
//                         <th className="px-4 py-3">Total Unit</th>
//                         {/* <th className="px-4 py-3">Estate Commission</th> */}
//                         <th className="px-4 py-3">Total Amount </th>

//                         <th className="px-4 py-3">Token</th>
//                         <th className="px-4 py-3">User</th>
//                         <th className="px-4 py-3">Clan</th>
//                         <th className="px-4 py-3">Date</th>
//                       </tr>
//                     </thead>

//                     {/* Table Body */}
//                     <tbody>
//                       {monthGroup.transactions.map((tx) => (
//                         <tr
//                           key={tx?._id}
//                           className="border-b hover:bg-gray-50 transition"
//                         >
//                           {/* Customer Info */}
//                           <td className="px-4 py-3 font-medium">
//                             {tx?.customerName}
//                           </td>
//                           <td className="px-4 py-3">{tx?.customerId}</td>
//                           <td className="px-4 py-3">
//                             {tx?.customerPhone} <br />
//                             <span className="text-xs text-gray-400">
//                               {tx?.customerAddress}
//                             </span>
//                           </td>
//                           {/* Meter Info */}
//                           <td className="px-4 py-3">
//                             {tx?.meterId} <br />
//                             <span className="text-xs text-gray-400">
//                               ({tx?.meterType})
//                             </span>
//                           </td>
//                           {/* Units */}
//                           <td className="px-4 py-3">
//                             <span className="font-semibold">
//                               {tx?.totalUnit}
//                             </span>{" "}
//                             {tx?.unit}
//                           </td>
//                           {/* Estate Commission */}
//                           <td className="px-4 py-3 font-bold text-green-600">
//                             {/* {formatNaira(tx?.estateCommission)}

//                             {console.log({
//                               yyyyy: tx,
//                             })} */}

//                             <td className="px-4 py-3 font-bold text-green-600">
//                               {formatNaira(
//                                 tx?.estateCommission && tx.estateCommission > 0
//                                   ? tx.estateCommission
//                                   : tx?.totalAmount - tx?.totalUnit * 3,
//                               )}
//                             </td>
//                           </td>
//                           {/* Token */}
//                           <td className="px-4 py-3 font-mono text-xs">
//                             {tx?.token}
//                           </td>
//                           {/* User */}
//                           <td className="px-4 py-3">
//                             {tx?.user?.name} <br />
//                             <span className="text-xs text-gray-400">
//                               {tx?.user?.email}
//                             </span>
//                           </td>
//                           {/* Clan Info */}
//                           <td className="px-4 py-3">
//                             {tx?.clan?.name || "—"} <br />
//                             <span className="text-xs text-gray-400">
//                               {tx?.clan?.uniqueClanID}
//                             </span>
//                           </td>
//                           {/* Date */}
//                           <td className="px-4 py-3">
//                             {new Date(tx?.createdAt).toLocaleDateString()}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         {/* Empty State */}
//         {groupedData.length === 0 && (
//           <div className="text-center text-gray-500 py-10 bg-white rounded-lg shadow-md">
//             No transactions found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useFetchData } from "@/hook/Request";
import { useState } from "react";

// ✅ Helper component for stats
const StatCard = ({ title, value, unit, subtitle, status }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
    {status && (
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`w-2 h-2 rounded-full ${
            status === "in_progress"
              ? "bg-yellow-500"
              : status === "paid"
                ? "bg-green-500"
                : "bg-blue-500"
          }`}
        ></span>
        <span className="text-xs font-medium text-gray-500 uppercase">
          {status === "in_progress"
            ? "Pending Payment"
            : status === "paid"
              ? "Paid"
              : "All Time"}
        </span>
      </div>
    )}
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-gray-800 mt-1">
      {value}{" "}
      <span className="text-base font-semibold text-gray-500">{unit}</span>
    </p>
    {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
  </div>
);

export default function TransactionsTable() {
  const [expandedWeeks, setExpandedWeeks] = useState(new Set());

  // ✅ Fetch data using your custom hook
  const { data: getall_metter } = useFetchData(
    `/captain/get-transactions`,
    "get-captain-metter",
  );

  // ✅ Extract grouped data
  const groupedData = getall_metter?.data || [];
  const totalCount = getall_metter?.totalCount || 0;
  const allTimeTotals = getall_metter?.allTimeTotals || {
    totalUnits: 0,
    totalEstateCommission: 0,
  };
  const currentWeekStats = getall_metter?.currentWeekStats || {
    totalUnits: 0,
    totalEstateCommission: 0,
    count: 0,
  };
  const lastWeekStats = getall_metter?.lastWeekStats || {
    totalUnits: 0,
    totalEstateCommission: 0,
    count: 0,
  };

  // ✅ Currency formatter
  const formatNaira = (amount) =>
    `₦${Number(amount || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // ✅ Toggle week expansion
  const toggleWeek = (weekLabel) => {
    setExpandedWeeks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(weekLabel)) {
        newSet.delete(weekLabel);
      } else {
        newSet.add(weekLabel);
      }
      return newSet;
    });
  };

  // ✅ Get header color based on status
  const getHeaderColor = (status) => {
    if (status === "in_progress")
      return "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700";
    if (status === "paid")
      return "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700";
    return "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700";
  };

  // ✅ Get status badge
  const getStatusBadge = (status) => {
    if (status === "in_progress")
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
          Payment Pending
        </span>
      );
    if (status === "paid")
      return (
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
          Paid
        </span>
      );
    return null;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Weekly Transactions Overview
        </h1>
        <p className="text-gray-600 mt-1">
          Track electricity transactions grouped by week (Sunday - Saturday)
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="This Week (Pending)"
          value={currentWeekStats.count.toLocaleString()}
          unit="transactions"
          subtitle={`${currentWeekStats.totalUnits.toLocaleString()} kWh • ${formatNaira(currentWeekStats.totalEstateCommission)}`}
          status="in_progress"
        />
        <StatCard
          title="Last Week (Paid)"
          value={lastWeekStats.count.toLocaleString()}
          unit="transactions"
          subtitle={`${lastWeekStats.totalUnits.toLocaleString()} kWh • ${formatNaira(lastWeekStats.totalEstateCommission)}`}
          status="paid"
        />
        <StatCard
          title="All Time Total"
          value={totalCount.toLocaleString()}
          unit="transactions"
          subtitle={`${allTimeTotals.totalUnits.toLocaleString()} kWh • ${formatNaira(allTimeTotals.totalEstateCommission)}`}
          status="all_time"
        />
      </div>

      {/* Grouped Transactions by Week */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Weekly Transaction Details
        </h2>
        <p className="text-sm text-gray-500">
          {groupedData.length} week{groupedData.length !== 1 ? "s" : ""} shown
        </p>
      </div>

      <div className="space-y-4">
        {groupedData.map((weekGroup) => {
          const isExpanded = expandedWeeks.has(weekGroup.weekLabel);

          // Calculate week totals using estateCommission
          const weekTotals = weekGroup.transactions.reduce(
            (acc, tx) => {
              acc.totalUnits += tx.totalUnit || 0;
              acc.totalEstateCommission += tx.estateCommission || 0;
              return acc;
            },
            { totalUnits: 0, totalEstateCommission: 0 },
          );

          return (
            <div
              key={weekGroup.weekLabel}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              {/* Week Header - Clickable */}
              <div
                className={`bg-gradient-to-r ${getHeaderColor(weekGroup.status)} text-white p-5 cursor-pointer transition-all duration-200`}
                onClick={() => toggleWeek(weekGroup.weekLabel)}
              >
                <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold">
                        {weekGroup.weekLabel}
                      </h3>
                      {getStatusBadge(weekGroup.status)}
                    </div>
                    <p className="text-sm opacity-90 mt-2">
                      {weekGroup.count} transaction
                      {weekGroup.count !== 1 ? "s" : ""} • Payment:{" "}
                      {weekGroup.paymentDay}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs opacity-75 uppercase tracking-wide">
                        Total Units
                      </p>
                      <p className="text-2xl font-bold">
                        {weekTotals.totalUnits.toLocaleString()}
                      </p>
                      <p className="text-xs opacity-75">kWh</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs opacity-75 uppercase tracking-wide">
                        Total Amount
                      </p>
                      <p className="text-2xl font-bold">
                        {formatNaira(weekTotals.totalEstateCommission)}
                      </p>
                    </div>

                    <div className="ml-2">
                      <svg
                        className={`w-6 h-6 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions Table - Collapsible */}
              {isExpanded && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-600">
                    {/* Table Header */}
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b-2 border-gray-200">
                      <tr>
                        <th className="px-4 py-3 font-semibold">
                          Customer Name
                        </th>
                        <th className="px-4 py-3 font-semibold">Customer ID</th>
                        <th className="px-4 py-3 font-semibold">
                          Phone / Address
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          Meter ID / Type
                        </th>
                        <th className="px-4 py-3 font-semibold">Total Unit</th>
                        <th className="px-4 py-3 font-semibold">
                          Total Amount
                        </th>
                        <th className="px-4 py-3 font-semibold">Token</th>
                        <th className="px-4 py-3 font-semibold">User</th>
                        <th className="px-4 py-3 font-semibold">Clan</th>
                        <th className="px-4 py-3 font-semibold">Date</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {weekGroup.transactions.map((tx, index) => (
                        <tr
                          key={tx?._id}
                          className={`border-b hover:bg-gray-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          {/* Customer Info */}
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {tx?.customerName}
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                              {tx?.customerId}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="max-w-xs">
                              <p className="font-medium">{tx?.customerPhone}</p>
                              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                {tx?.customerAddress}
                              </p>
                            </div>
                          </td>
                          {/* Meter Info */}
                          <td className="px-4 py-3">
                            <p className="font-mono text-xs">{tx?.meterId}</p>
                            <span className="text-xs text-gray-400">
                              {tx?.meterType}
                            </span>
                          </td>
                          {/* Units */}
                          <td className="px-4 py-3">
                            <span className="font-bold text-gray-900">
                              {tx?.totalUnit}
                            </span>{" "}
                            <span className="text-xs text-gray-500">
                              {tx?.unit}
                            </span>
                          </td>
                          {/* Total Amount */}
                          <td className="px-4 py-3">
                            <span className="font-bold text-green-600">
                              {formatNaira(
                                tx?.estateCommission && tx.estateCommission > 0
                                  ? tx.estateCommission
                                  : tx?.totalAmount - tx?.totalUnit * 3,
                              )}
                            </span>
                          </td>
                          {/* Token */}
                          <td className="px-4 py-3">
                            <code className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono">
                              {tx?.token}
                            </code>
                          </td>
                          {/* User */}
                          <td className="px-4 py-3">
                            <div className="max-w-xs">
                              <p className="font-medium text-gray-900">
                                {tx?.user?.name || "—"}
                              </p>
                              <p className="text-xs text-gray-400 truncate">
                                {tx?.user?.email || "—"}
                              </p>
                            </div>
                          </td>
                          {/* Clan Info */}
                          <td className="px-4 py-3">
                            <div className="max-w-xs">
                              <p className="font-medium text-gray-900">
                                {tx?.clan?.name || "—"}
                              </p>
                              <p className="text-xs text-gray-400">
                                {tx?.clan?.uniqueClanID || "—"}
                              </p>
                            </div>
                          </td>
                          {/* Date */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-xs">
                              <p className="font-medium text-gray-900">
                                {new Date(tx?.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </p>
                              <p className="text-gray-400">
                                {new Date(tx?.createdAt).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Week Summary Footer */}
                  <div className="bg-gray-50 px-4 py-3 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium">
                        Week Total:
                      </span>
                      <div className="flex gap-6">
                        <span className="text-gray-900">
                          <span className="font-semibold">
                            {weekTotals.totalUnits.toLocaleString()}
                          </span>{" "}
                          kWh
                        </span>
                        <span className="text-green-600 font-bold">
                          {formatNaira(weekTotals.totalEstateCommission)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {groupedData.length === 0 && (
          <div className="text-center text-gray-500 py-16 bg-white rounded-lg shadow-md border border-gray-200">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No transactions found
            </h3>
            <p className="text-gray-500">
              There are no transactions to display at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ```

// ---

// ## **Key Features:**

// ### **Visual Improvements:**
// ✅ **Color-coded headers**: Yellow (pending), Green (paid), Blue (upcoming)
// ✅ **Status badges**: Shows "Payment Pending" or "Paid"
// ✅ **Alternating row colors**: Better readability
// ✅ **Hover effects**: Smooth transitions on rows and headers
// ✅ **Better spacing**: More breathing room, cleaner layout
// ✅ **Improved typography**: Better font sizes and weights
// ✅ **Week summary footer**: Shows totals at bottom of each expanded week
// ✅ **Empty state**: Nice icon and message when no data
// ✅ **Responsive design**: Works on mobile and desktop

// ### **Data Display:**
// ✅ **Three stat cards**: This Week | Last Week | All Time
// ✅ **Payment dates**: Shows when payment is due
// ✅ **Transaction counts**: Shows number of transactions per week
// ✅ **Formatted amounts**: Naira with 2 decimal places
// ✅ **Time stamps**: Shows both date and time for each transaction

// ### **Interactions:**
// ✅ **Click to expand/collapse**: Same as before
// ✅ **Smooth animations**: Chevron rotation, color transitions
// ✅ **Visual feedback**: Hover states on rows

// ---

// ## **What It Looks Like:**
// ```
// ┌─────────────────────────────────────────────────────────────┐
// │  Weekly Transactions Overview                               │
// │  Track electricity transactions grouped by week             │
// ├─────────────────────────────────────────────────────────────┤
// │  🟡 This Week (Pending)  │  🟢 Last Week (Paid)  │  All Time│
// │  45 transactions         │  67 transactions       │  1,234   │
// │  234 kWh • ₦60,138.00   │  456 kWh • ₦117,372   │  ...     │
// ├─────────────────────────────────────────────────────────────┤
// │  Weekly Transaction Details                      7 weeks    │
// ├─────────────────────────────────────────────────────────────┤
// │  🟡 Feb 15 - Feb 21, 2026  [Payment Pending]          ▼    │
// │  45 transactions • Payment: Saturday, Feb 21               │
// │                                    234 kWh  ₦60,138.00     │
// ├─────────────────────────────────────────────────────────────┤
// │  ✅ Feb 8 - Feb 14, 2026  [Paid]                      ▼    │
// │  67 transactions • Payment: Saturday, Feb 14               │
// │                                    456 kWh  ₦117,372.00    │
// └─────────────────────────────────────────────────────────────┘
