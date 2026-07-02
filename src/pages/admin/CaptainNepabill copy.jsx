import React from "react";
import { useFetchData } from "@/hook/Request"; // Assuming this hook is correct

// Helper component for the summary cards
const StatCard = ({ title, value, unit }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-gray-800 mt-1">
      {value}{" "}
      <span className="text-base font-semibold text-gray-500">{unit}</span>
    </p>
  </div>
);

export default function CaptainNepabill() {
  // Use a clearer name for destructuring the hook's return value
  const {
    data: responseData,
    isLoading,
    error,
  } = useFetchData(`/captain/get-transactions`, "get-captain-metter");

  const transactionsData = responseData?.data || [];

  // Function to calculate the totals
  const calculateTotals = () => {
    return transactionsData.reduce(
      (acc, tx) => {
        // Ensure values are numbers before adding, defaulting to 0 if null/undefined
        const unit = Number(tx?.totalUnit) || 0;
        const pricePerUnit = Number(tx?.pricePerUnit) || 0;
        const serviceFee = Number(tx?.serviceFee) || 0;
        const vat = Number(tx?.vat) || 0;
        const totalPaid = Number(tx?.totalPaid) || 0;
        const totalAmount = Number(tx?.totalAmount) || 0;

        acc.totalUnits += unit;
        acc.sumPricePerUnit += pricePerUnit;
        acc.totalServiceFee += serviceFee;
        acc.totalVAT += vat;
        acc.totalPaidInclVAT += totalPaid + vat;
        acc.totalFinalAmount += totalAmount;

        return acc;
      },
      {
        totalUnits: 0,
        sumPricePerUnit: 0,
        totalServiceFee: 0,
        totalVAT: 0,
        totalPaidInclVAT: 0,
        totalFinalAmount: 0,
      }
    );
  };

  const totals = calculateTotals();
  const unitLabel =
    transactionsData.length > 0 ? transactionsData[0]?.unit : "Unit";

  // Function to format currency
  const formatNaira = (amount) =>
    `₦${Number(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // --- Loading and Error States ---
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
        Loading transactions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading transactions: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions Overview kaka</h1>

      {/* 1. Summary Totals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Units Sold"
          value={totals.totalUnits.toFixed(2)}
          unit={unitLabel}
        />
        <StatCard
          title="Total Service Fees"
          value={formatNaira(totals.totalServiceFee)}
          unit=""
        />
        <StatCard
          title="Total VAT Collected"
          value={formatNaira(totals.totalVAT)}
          unit=""
        />
        <StatCard
          title="Total Paid (Net + VAT)"
          value={formatNaira(totals.totalPaidInclVAT)}
          unit=""
        />
        <StatCard
          title="Total Final Amount"
          value={formatNaira(totals.totalFinalAmount)}
          unit=""
        />
        <StatCard
          title="Sum of Price Per Unit"
          value={formatNaira(totals.sumPricePerUnit)}
          unit=""
        />
      </div>

      {/* 2. Transactions Table */}
      <h2 className="text-xl font-semibold mb-3">Transaction Details</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              {/* Customer Details */}
              <th className="px-4 py-3">Customer Name</th>
              <th className="px-4 py-3">Customer ID</th>
              <th className="px-4 py-3">Phone / Address</th>
              <th className="px-4 py-3">Meter ID / Type</th>

              {/* Financial Details (Restored) */}
              <th className="px-4 py-3">Total Unit</th>
              <th className="px-4 py-3">Price Per Unit</th>
              <th className="px-4 py-3">Service Fee</th>
              <th className="px-4 py-3">VAT</th>
              <th className="px-4 py-3">Total Paid (Incl. VAT)</th>
              <th className="px-4 py-3">Total Amount</th>
              <th className="px-4 py-3">Token</th>

              {/* Metadata */}
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">App commision</th>
              <th className="px-4 py-3">Estate commision</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData.map((tx) => (
              <tr
                key={tx?._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Customer Details */}
                <td className="px-4 py-3 font-medium">{tx?.customerName}</td>
                <td className="px-4 py-3">{tx?.customerId}</td>
                <td className="px-4 py-3">
                  {tx?.customerPhone} <br />
                  <span className="text-xs text-gray-400">
                    {tx?.customerAddress}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {tx?.meterId} <br />
                  <span className="text-xs text-gray-400">
                    ({tx?.meterType})
                  </span>
                </td>

                {/* Financial Details (Restored) */}
                <td className="px-4 py-3">
                  <span className="font-semibold">{tx?.totalUnit}</span>{" "}
                  {tx?.unit}
                </td>
                <td className="px-4 py-3">
                  {tx?.priceUnitCurrency === "Naira" ? "₦" : ""}
                  {tx?.pricePerUnit}
                </td>
                <td className="px-4 py-3">₦{tx?.serviceFee}</td>
                <td className="px-4 py-3">₦{tx?.vat}</td>
                <td className="px-4 py-3 font-bold text-green-600">
                  ₦{tx?.totalPaid + tx?.vat}
                </td>
                <td className="px-4 py-3 font-bold text-blue-600">
                  ₦{tx?.totalAmount}
                </td>
                <td className="px-4 py-3 font-mono text-xs">{tx?.token}</td>

                {/* Metadata */}
                <td className="px-4 py-3">
                  {tx?.user?.name} <br />
                  <span className="text-xs text-gray-400">
                    {tx?.user?.email}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {tx?.clan?.name || "—"} <br />
                  <span className="text-xs text-gray-400">
                    {tx?.clan?.uniqueClanID}
                  </span>
                </td>
                <td className="px-4 py-3">₦{tx?.appCommission}</td>

                <td className="px-4 py-3">₦{tx?.estateCommission}</td>

                <td className="px-4 py-3">
                  {new Date(tx?.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {/* No Data Row */}
            {transactionsData.length === 0 && (
              <tr>
                {/* Colspan is 14 based on the restored headers */}
                <td colSpan="14" className="text-center text-gray-500 py-6">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
