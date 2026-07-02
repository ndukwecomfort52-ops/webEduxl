import { useFetchDataV2 } from "@/hook/RequestV2";
import { emergencies } from "../../db/emergency/index";

import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";

const EmergencyDashboard = () => {
  const [selectedEmergency, setSelectedEmergency] = useState(emergencies[0]);
  const [sortOption, setSortOption] = useState("Time sent");

  const handleEmergencyClick = (emergency) => {
    setSelectedEmergency(emergency);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return <TransactionsTable />;

  return (
    <div className="">
      <div className="flex justify-between px-11">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for user..."
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full p-2 border rounded"
          >
            <option value="resolved">Resolved</option>
            <option value="unresolved">Unresolved</option>
            <option value="timesent">Time sent</option>
          </select>
        </div>
      </div>
      <div className="flex px-6 h-screen">
        <div className="w-[40%] h-full overflow-y-auto hide-scrollbar">
          <div className="space-y-4">
            {emergencies.map((emergency) => (
              <div
                key={emergency.id}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedEmergency.id === emergency.id
                    ? "bg-red-100 border-l-8 border-red-500"
                    : "bg-white"
                }`}
                onClick={() => handleEmergencyClick(emergency)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2">
                      {emergency.type === "Fire Alarm"
                        ? "🔥"
                        : emergency.type === "Medical Assistance"
                        ? "🟢"
                        : emergency.type === "Theft Alarm"
                        ? "⚠️"
                        : emergency.type === "Kidnap Alarm"
                        ? "🚨"
                        : ""}
                    </span>
                    <span className="font-roboto-slab font-bold text-[14.74px] leading-[19.44px] ">
                      {emergency.type}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {emergency.time}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-2 truncate">
                  Comment: {emergency.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side with independent overflow */}
        <div className="w-2/3 ml-6 p-4 bg-white rounded-lg shadow-md h-full overflow-y-auto">
          <h2 className="text-red-500 font-semibold mb-2">Unresolved</h2>
          <div className="items-center mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="mt-4">
              <h3 className="font-semibold text-lg">James Bond</h3>
              <p className="text-gray-500 text-sm">24 hours ago</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            0812345678
            <br />
            House address lorem ipsum stuff
          </p>
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-red-500 mb-2">
              {selectedEmergency.type}
            </h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Quis dictumst quis lorem
              adipiscing commodo integer amet ac molestie. Urna fringilla
              faucibus sed vitae eget. Ultricies sed elementum suspendisse id.
              Justo tellus vitae sapien placerat orci ultricies. Lacus amet.
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-custom-green text-white py-2 px-4 rounded">
              Send a message
            </button>
            <button className="bg-[#F3FFF3] text-custom-green border-green-600 border-2 py-2 px-4 rounded">
              Message admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDashboard;

const TransactionsTable = () => {
  // State management
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );

  // Fetch transactions data
  const { data, isLoading, isError } = useFetchDataV2(
    `/v1/admin/all-user-transaction-history`,
    "transactions"
  );

  // Initialize transactions
  useEffect(() => {
    if (data) {
      setTransactions(data.result_data || []);
      setFilteredTransactions(data.result_data || []);
      setLoading(false);
    }
  }, [data]);

  // Apply search and filters
  useEffect(() => {
    let result = transactions;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (transaction) =>
          transaction.user?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaction.user?.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaction.reference
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaction.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((transaction) => transaction.type === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (transaction) => transaction.status === statusFilter
      );
    }

    setFilteredTransactions(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, typeFilter, statusFilter, transactions]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency || "NGN",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Type badge colors
  const getTypeBadge = (type) => {
    return type === "credit"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  // Status badge colors
  const getStatusBadge = (status) => {
    const statusColors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          Failed to fetch transactions. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
          <p className="text-sm text-gray-600 mt-1">
            Total: {filteredTransactions.length} transactions
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <FaDownload />
          <span>Export</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, reference, or details..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              <FaFilter />
              <span>Filters</span>
              {(typeFilter !== "all" || statusFilter !== "all") && (
                <span className="ml-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                  {
                    [typeFilter !== "all", statusFilter !== "all"].filter(
                      Boolean
                    ).length
                  }
                </span>
              )}
            </button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                <div className="p-4 space-y-4">
                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction Type
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setTypeFilter("all");
                      setStatusFilter("all");
                      setSearchTerm("");
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.user?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.user?.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">
                        {transaction.reference}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-semibold ${
                          transaction.type === "credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {formatCurrency(
                          transaction.amount,
                          transaction.currency
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadge(
                          transaction.type
                        )}`}
                      >
                        {transaction.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                          transaction.status
                        )}`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {transaction.details}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transaction.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-16 h-16 text-gray-300 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-lg font-medium">
                        No transactions found
                      </p>
                      <p className="text-sm">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredTransactions.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredTransactions.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === index + 1
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// export default TransactionsTable;
