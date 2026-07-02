import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  DollarSign,
  Zap,
  User,
  MapPin,
  Phone,
  CreditCard,
  Table,
} from "lucide-react";
import { useFetchData } from "@/hook/Request";
import { useNavigate } from "react-router-dom";

const CaptainNepabill = () => {
  const [expandedMonths, setExpandedMonths] = useState({});
  const [expandedTransactions, setExpandedTransactions] = useState({});
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetchData(
    `/captain/Admin/gettransactions`,
    "get-captain-metter"
  );

  console.log({
    tyu: data,
  });

  const toggleMonth = (month) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  const toggleTransaction = (id) => {
    setExpandedTransactions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
              <h2 className="text-2xl font-bold text-slate-700 mb-2">
                Loading Transactions...
              </h2>
              <p className="text-slate-500">
                Please wait while we fetch your data
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-[70vh]">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Error Loading Data
              </h2>
              <p className="text-slate-600 mb-4">
                {error?.message || "Something went wrong"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Electricity Transactions
                </h1>
                <p className="text-slate-600">
                  Complete transaction history and details
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-center">
              <div className="bg-slate-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-12 h-12 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-700 mb-2">
                No Transactions Found
              </h2>
              <p className="text-slate-500">
                There are no electricity transactions to display
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Electricity Transactions
              </h1>
              <p className="text-slate-600">
                Complete transaction history and details
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-slate-600 mb-1">Total Transactions</p>
              <p className="text-3xl font-bold text-blue-600">
                {data?.totalCount?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {data.data.map((monthData, monthIndex) => {
          const monthlyTotals = calculateMonthlyTotals(monthData.transactions);

          return (
            <div key={monthIndex} className="mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl p-5 shadow-lg">
                <div className="flex items-center justify-between text-white flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    <div>
                      <h2 className="text-2xl font-bold">{monthData.month}</h2>
                      <p className="text-blue-100 text-sm">
                        {monthData.count} transactions this month
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="text-right">
                      <p className="text-xs text-blue-100 mb-1">Total Amount</p>
                      <p className="text-lg font-bold">
                        {formatCurrency(monthlyTotals.totalAmount)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-blue-100 mb-1">Total Units</p>
                      <div className="flex items-center gap-1 justify-end">
                        <Zap className="w-4 h-4" />
                        <p className="text-lg font-bold">
                          {monthlyTotals.totalUnit.toLocaleString()}
                        </p>
                        <span className="text-xs">kWh</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-blue-100 mb-1">
                        App Commission
                      </p>
                      <p className="text-lg font-bold text-green-300">
                        {formatCurrency(monthlyTotals.appCommission)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-blue-100 mb-1">
                        Estate Commission
                      </p>
                      <p className="text-lg font-bold text-yellow-300">
                        {formatCurrency(monthlyTotals.estateCommission)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-blue-500">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/dashboard/monthly-table", {
                        state: { monthData },
                      });
                    }}
                    className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                  >
                    <Table className="w-4 h-4" />
                    View Monthly Table
                  </button>

                  <button
                    onClick={() => toggleMonth(monthData.month)}
                    className="flex items-center gap-2 bg-blue-800 bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70 transition-colors"
                  >
                    {expandedMonths[monthData.month] ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Show Details
                      </>
                    )}
                  </button>
                </div>
              </div>

              {expandedMonths[monthData.month] && (
                <div className="bg-white rounded-b-xl shadow-lg">
                  {monthData.transactions.map((transaction, txIndex) => (
                    <div
                      key={transaction._id}
                      className="border-b border-slate-200 last:border-b-0"
                    >
                      <div
                        onClick={() => toggleTransaction(transaction._id)}
                        className="p-5 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-[250px]">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="bg-blue-100 rounded-full p-2">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-800 text-lg">
                                  {transaction.customerName}
                                </h3>
                                <p className="text-sm text-slate-500">
                                  ID: {transaction.customerId}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                <span className="truncate">
                                  {transaction.customerAddress}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <span>{transaction.customerPhone}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <CreditCard className="w-4 h-4 text-slate-400" />
                              <span>
                                Meter: {transaction.meterId} (
                                {transaction.meterType})
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-sm text-slate-500 mb-1">
                                Amount Paid
                              </p>
                              <p className="text-2xl font-bold text-green-600">
                                {formatCurrency(transaction.totalPaid)}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-sm text-slate-500 mb-1">
                                Units
                              </p>
                              <div className="flex items-center gap-1">
                                <Zap className="w-5 h-5 text-yellow-500" />
                                <p className="text-2xl font-bold text-slate-800">
                                  {transaction.totalUnit}
                                </p>
                                <span className="text-sm text-slate-500">
                                  {transaction.unit}
                                </span>
                              </div>
                            </div>

                            {expandedTransactions[transaction._id] ? (
                              <ChevronUp className="w-6 h-6 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-6 h-6 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </div>

                      {expandedTransactions[transaction._id] && (
                        <div className="bg-slate-50 p-6 border-t border-slate-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-600" />
                                User Details
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-slate-500">Name:</span>
                                  <p className="font-semibold text-slate-800">
                                    {transaction.user.name}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-slate-500">Email:</span>
                                  <p className="font-semibold text-slate-800 break-all">
                                    {transaction.user.email}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-slate-500">
                                    User ID:
                                  </span>
                                  <p className="font-mono text-xs text-slate-600">
                                    {transaction.user._id}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-green-600" />
                                Estate Details
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-slate-500">
                                    Estate:
                                  </span>
                                  <p className="font-semibold text-slate-800">
                                    {transaction.clan.name}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-slate-500">
                                    Unique ID:
                                  </span>
                                  <p className="font-semibold text-slate-800">
                                    {transaction.clan.uniqueClanID}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-slate-500">Email:</span>
                                  <p className="font-semibold text-slate-800 break-all">
                                    {transaction.clan.email}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-purple-600" />
                                Payment Breakdown
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    Total Amount:
                                  </span>
                                  <span className="font-bold text-slate-800">
                                    {formatCurrency(transaction.totalAmount)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    Total Paid:
                                  </span>
                                  <span className="font-bold text-green-600">
                                    {formatCurrency(transaction.totalPaid)}
                                  </span>
                                </div>
                                {transaction.appCommission !== undefined && (
                                  <div className="flex justify-between">
                                    <span className="text-slate-500">
                                      App Commission:
                                    </span>
                                    <span className="font-semibold text-blue-600">
                                      {formatCurrency(
                                        transaction.appCommission
                                      )}
                                    </span>
                                  </div>
                                )}
                                {transaction.estateCommission !== undefined && (
                                  <div className="flex justify-between">
                                    <span className="text-slate-500">
                                      Estate Commission:
                                    </span>
                                    <span className="font-semibold text-purple-600">
                                      {formatCurrency(
                                        transaction.estateCommission
                                      )}
                                    </span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-slate-500">VAT:</span>
                                  <span className="font-semibold text-slate-800">
                                    {formatCurrency(transaction.vat)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    Service Fee:
                                  </span>
                                  <span className="font-semibold text-slate-800">
                                    {formatCurrency(transaction.serviceFee)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-600" />
                                Energy Details
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    Total Units:
                                  </span>
                                  <span className="font-bold text-slate-800">
                                    {transaction.totalUnit} {transaction.unit}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    Price/Unit:
                                  </span>
                                  <span className="font-semibold text-slate-800">
                                    {formatCurrency(transaction.pricePerUnit)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    Category:
                                  </span>
                                  <span className="font-semibold text-slate-800">
                                    {transaction.priceCategories}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    Vend by Unit:
                                  </span>
                                  <span
                                    className={`font-semibold ${
                                      transaction.isVendByUnit
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {transaction.isVendByUnit ? "Yes" : "No"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Rate:</span>
                                  <span className="font-semibold text-slate-800">
                                    {transaction.rate}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-indigo-600" />
                                Token & Meter
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-slate-500">Token:</span>
                                  <p className="font-mono text-lg font-bold text-indigo-600 bg-indigo-50 p-2 rounded mt-1 tracking-wider">
                                    {transaction.token}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-slate-500">
                                    Meter ID:
                                  </span>
                                  <p className="font-semibold text-slate-800">
                                    {transaction.meterId}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-slate-500">
                                    Meter Type:
                                  </span>
                                  <p className="font-semibold text-slate-800">
                                    {transaction.meterType}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-teal-600" />
                                Timestamps
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-slate-500">
                                    Generated:
                                  </span>
                                  <p className="font-semibold text-slate-800">
                                    {formatDate(transaction.genTime)}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-slate-500">
                                    Created:
                                  </span>
                                  <p className="font-semibold text-slate-800">
                                    {formatDate(transaction.createdAt)}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-slate-500">
                                    Updated:
                                  </span>
                                  <p className="font-semibold text-slate-800">
                                    {formatDate(transaction.updatedAt)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <p className="text-xs text-slate-500">
                              Transaction ID:{" "}
                              <span className="font-mono text-slate-700">
                                {transaction._id}
                              </span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaptainNepabill;
