import React from "react";
import { useFetchData } from "@/hook/Request"; // Assuming this hook is available

export default function AllUserWalletsTable() {
  // 1. Fetch data from the endpoint
  // UPDATE THE ENDPOINT if it's different from the example below
  const {
    data: walletsResponse,
    isLoading,
    error,
  } = useFetchData(
    "/captain/all_user_wallet", // <--- Ensure this matches your route
    "all-user-wallets-key"
  );

  console.log({
    cvc: walletsResponse,
  });

  const wallets = walletsResponse?.data || [];
  const totalCount = walletsResponse?.count || 0;

  // Helper to format currency (assuming balance is already in Naira)
  const formatNaira = (amount) => {
    if (typeof amount !== "number") return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Helper to format date
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleDateString();
  };

  // --- Loading and Error States ---
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        Loading all user wallets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 bg-red-100 rounded-lg border border-red-300">
        Error loading wallet data:{" "}
        {error.message || "An unknown error occurred."}
      </div>
    );
  }

  // --- Component Render ---
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">All User Wallets</h1>
      <p className="text-sm text-gray-600 mb-4">
        Total Wallets:{" "}
        <span className="font-semibold text-blue-600">{totalCount}</span>
      </p>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-50 text-blue-700 uppercase text-xs sticky top-0">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Wallet ID</th>
              <th className="px-4 py-3 text-right">Balance</th>
              <th className="px-4 py-3">Currency</th>
              <th className="px-4 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {wallets.length > 0 ? (
              wallets.map((wallet) => (
                <tr
                  key={wallet._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition duration-100"
                >
                  {/* User Details */}
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {wallet.user?.name || "N/A"}
                    <br />
                    <span className="text-xs text-gray-500">
                      {wallet.user?.email || "No email"}
                    </span>
                  </td>
                  {/* Wallet ID */}
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">
                    {wallet._id}
                  </td>
                  {/* Balance */}
                  <td
                    className={`px-4 py-3 text-right font-bold ${
                      wallet.balance > 0 ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {formatNaira(wallet.balance)}
                  </td>
                  {/* Currency */}
                  <td className="px-4 py-3 text-gray-600">
                    {wallet.currency || "N/A"}
                  </td>
                  {/* Created Date */}
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {formatDate(wallet.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-8">
                  No user wallets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
