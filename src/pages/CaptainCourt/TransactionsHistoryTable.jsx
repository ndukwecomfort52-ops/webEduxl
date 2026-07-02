// src/components/TransactionsHistoryTable.jsx (or wherever you keep your components)

import React, { useState, useEffect } from "react";
import { useFetchData } from "@/hook/Request"; // Assuming you have this hook

export default function TransactionsHistoryTable() {
  // Using your useFetchData hook to fetch transaction data
  // Adjust the endpoint to match your new transaction route, e.g., '/api/v1/transactions'
  const {
    data: transactionsResponse,
    isLoading,
    error,
    refetch,
  } = useFetchData(
    "/api/captain/all_user_transaction_admin", // **UPDATE THIS ENDPOINT TO YOUR ACTUAL TRANSACTION API ROUTE**
    "transactions-history-key" // A unique query key for react-query or similar
  );

  const transactions = transactionsResponse?.data || [];

  // Helper function to format date
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper function to format currency
  const formatCurrency = (amount, currency = "NGN") => {
    if (typeof amount !== "number") return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

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
      <h1 className="text-2xl font-semibold mb-4">Transaction History</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Details</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    {tx.user?.name} <br />
                    <span className="text-xs text-gray-400">
                      {tx.user?.email}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {tx.reference}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatCurrency(tx.amount, tx.currency)}
                  </td>
                  <td
                    className={`px-4 py-3 capitalize ${
                      tx.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type}
                  </td>
                  <td
                    className={`px-4 py-3 capitalize 
                                  ${
                                    tx.status === "completed"
                                      ? "text-green-500"
                                      : tx.status === "failed"
                                      ? "text-red-500"
                                      : tx.status === "pending"
                                      ? "text-yellow-500"
                                      : "text-gray-500"
                                  }`}
                  >
                    {tx.status}
                  </td>
                  <td className="px-4 py-3 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                    {tx.details || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {formatDate(tx.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
