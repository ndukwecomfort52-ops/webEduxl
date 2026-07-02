import React, { useState } from "react";
import {
  ArrowLeft,
  Download,
  Search,
  Calendar,
  DollarSign,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const MonthlyTransactionTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { monthData } = location.state || {};

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  if (!monthData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-700 mb-2">
                No Data Available
              </h2>
              <p className="text-slate-500 mb-4">
                Please select a month from the main page
              </p>
              <button
                onClick={() => navigate(-1)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateMonthlyTotals = (transactions) => {
    return transactions.reduce(
      (totals, t) => ({
        totalAmount: totals.totalAmount + (t.totalAmount || 0),
        totalUnit: totals.totalUnit + (t.totalUnit || 0),
        appCommission: totals.appCommission + (t.appCommission || 0),
        estateCommission: totals.estateCommission + (t.estateCommission || 0),
        totalPaid: totals.totalPaid + (t.totalPaid || 0),
      }),
      {
        totalAmount: 0,
        totalUnit: 0,
        appCommission: 0,
        estateCommission: 0,
        totalPaid: 0,
      }
    );
  };

  const monthlyTotals = calculateMonthlyTotals(monthData.transactions);

  // Filter transactions based on search
  const filteredTransactions = monthData.transactions.filter(
    (transaction) =>
      transaction.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.meterId.includes(searchTerm) ||
      transaction.customerPhone.includes(searchTerm)
  );

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "customerName") {
      aValue = a.customerName;
      bValue = b.customerName;
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const exportToCSV = () => {
    const headers = [
      "Customer ID",
      "Customer Name",
      "Phone",
      "Meter ID",
      "Meter Type",
      "Total Amount",
      "Total Paid",
      "App Commission",
      "Estate Commission",
      "Total Units",
      "Price Per Unit",
      "Token",
      "Created Date",
    ];

    const rows = sortedTransactions.map((t) => [
      t.customerId,
      t.customerName,
      t.customerPhone,
      t.meterId,
      t.meterType,
      t.totalAmount,
      t.totalPaid,
      t.appCommission || 0,
      t.estateCommission || 0,
      t.totalUnit,
      t.pricePerUnit,
      t.token,
      formatDate(t.createdAt),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${monthData.month}_transactions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-slate-700" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-1">
                  {monthData.month} Transactions
                </h1>
                <p className="text-slate-600">
                  {monthData.count} total transactions
                </p>
              </div>
            </div>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-blue-700 font-medium">
                  Total Amount
                </p>
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {formatCurrency(monthlyTotals.totalAmount)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-yellow-700 font-medium">
                  Total Units
                </p>
                <Zap className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-yellow-900">
                {monthlyTotals.totalUnit.toLocaleString()} kWh
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-green-700 font-medium">
                  App Commission
                </p>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(monthlyTotals.appCommission)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-purple-700 font-medium">
                  Estate Commission
                </p>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {formatCurrency(monthlyTotals.estateCommission)}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by customer name, ID, meter ID, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    #
                  </th>
                  <th
                    className="px-4 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-slate-600"
                    onClick={() => handleSort("customerId")}
                  >
                    Customer ID
                  </th>
                  <th
                    className="px-4 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-slate-600"
                    onClick={() => handleSort("customerName")}
                  >
                    Customer Name
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Phone
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Address
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Meter ID
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Meter Type
                  </th>
                  <th
                    className="px-4 py-4 text-right text-sm font-semibold cursor-pointer hover:bg-slate-600"
                    onClick={() => handleSort("totalAmount")}
                  >
                    Total Amount
                  </th>
                  <th
                    className="px-4 py-4 text-right text-sm font-semibold cursor-pointer hover:bg-slate-600"
                    onClick={() => handleSort("totalPaid")}
                  >
                    Total Paid
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold">
                    App Commission
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold">
                    Estate Commission
                  </th>
                  <th
                    className="px-4 py-4 text-right text-sm font-semibold cursor-pointer hover:bg-slate-600"
                    onClick={() => handleSort("totalUnit")}
                  >
                    Units (kWh)
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold">
                    Price/Unit
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Token
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    User Name
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    User Email
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Estate
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">
                    Created Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sortedTransactions.map((transaction, index) => (
                  <tr
                    key={transaction._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-blue-600">
                      {transaction.customerId}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-slate-800">
                      {transaction.customerName}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {transaction.customerPhone}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 max-w-xs truncate">
                      {transaction.customerAddress}
                    </td>
                    <td className="px-4 py-4 text-sm font-mono text-slate-700">
                      {transaction.meterId}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {transaction.meterType}
                    </td>
                    <td className="px-4 py-4 text-sm text-right font-semibold text-slate-800">
                      {formatCurrency(transaction.totalAmount)}
                    </td>
                    <td className="px-4 py-4 text-sm text-right font-semibold text-green-600">
                      {formatCurrency(transaction.totalPaid)}
                    </td>
                    <td className="px-4 py-4 text-sm text-right font-semibold text-blue-600">
                      {formatCurrency(transaction.appCommission || 0)}
                    </td>
                    <td className="px-4 py-4 text-sm text-right font-semibold text-purple-600">
                      {formatCurrency(transaction.estateCommission || 0)}
                    </td>
                    <td className="px-4 py-4 text-sm text-right font-semibold text-yellow-700">
                      {transaction.totalUnit}
                    </td>
                    <td className="px-4 py-4 text-sm text-right text-slate-600">
                      {formatCurrency(transaction.pricePerUnit)}
                    </td>
                    <td className="px-4 py-4 text-xs font-mono text-indigo-600 max-w-xs">
                      {transaction.token}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      {transaction.user.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 max-w-xs truncate">
                      {transaction.user.email}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      {transaction.clan.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">
                      {formatDate(transaction.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {sortedTransactions.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No transactions found
              </h3>
              <p className="text-slate-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {sortedTransactions.length > 0 && (
          <div className="mt-4 text-center text-sm text-slate-600">
            Showing {sortedTransactions.length} of {monthData.count}{" "}
            transactions
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyTransactionTable;
