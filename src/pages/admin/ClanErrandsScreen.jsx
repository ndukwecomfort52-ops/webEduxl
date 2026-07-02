import React, { useState } from "react";

const ClanErrandsScreen = ({ errands }) => {
  // State to manage the currently active filter. 'all' by default.
  const [activeStatusFilter, setActiveStatusFilter] = useState("all");
  // State for modal visibility
  const [showModal, setShowModal] = useState(false);
  // State to store the errand currently being viewed in the modal
  const [selectedErrand, setSelectedErrand] = useState(null);
  // State for the status dropdown inside the modal
  const [currentStatus, setCurrentStatus] = useState("");

  // Group errands by status
  const groupedErrands = errands.reduce((acc, errand) => {
    if (!acc[errand.status]) {
      acc[errand.status] = [];
    }
    acc[errand.status].push(errand);
    return acc;
  }, {});

  // Status display configuration
  const statusConfig = {
    all: {
      title: "All Errands",
      color: "bg-gray-200 text-gray-800",
    },
    assigned: {
      title: "Assigned Errands",
      color: "bg-yellow-100 text-yellow-800",
    },
    en_route: { title: "In Progress", color: "bg-blue-100 text-blue-800" },
    completed: { title: "Completed", color: "bg-green-100 text-green-800" },
    cancelled: { title: "Cancelled", color: "bg-red-100 text-red-800" },
  };

  // Status colors for the dropdown in the modal
  const statusColors = {
    assigned: "bg-yellow-100 text-yellow-800 border-yellow-300",
    en_route: "bg-blue-100 text-blue-800 border-blue-300",
    completed: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-red-100 text-red-800 border-red-300",
  };

  // Filter errands based on activeStatusFilter
  const filteredErrands =
    activeStatusFilter === "all"
      ? errands
      : groupedErrands[activeStatusFilter] || [];

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to open the modal and set the selected errand
  const handleViewDetails = (errand) => {
    setSelectedErrand(errand);
    setCurrentStatus(errand.status); // Set initial status for dropdown
    setShowModal(true);
  };

  // Function to handle status change in the modal dropdown
  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    // In a real application, you would typically dispatch an action here
    // to update the errand status in your backend/global state.
    console.log(
      `Updating status for errand ${selectedErrand._id} to ${newStatus}`
    );
    // You might also want to update the selectedErrand state to reflect the change visually
    // setSelectedErrand(prev => ({...prev, status: newStatus}));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Status Filter Buttons */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {Object.keys(statusConfig).map((status) => (
            <button
              key={status}
              className={`
                px-4 py-2 rounded-lg font-medium
                ${statusConfig[status].color}
                ${
                  activeStatusFilter === status
                    ? "ring-2 ring-offset-2 ring-indigo-500"
                    : ""
                }
              `}
              onClick={() => setActiveStatusFilter(status)}
            >
              {statusConfig[status].title}{" "}
              {status === "all"
                ? `(${errands.length || 0})`
                : `(${groupedErrands[status]?.length || 0})`}
            </button>
          ))}
        </div>
        {/*---*/}

        {/* Display Filtered Errands */}
        <div className="space-y-6">
          {filteredErrands.length > 0 ? (
            filteredErrands.map((errand) => (
              <div
                key={errand._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {errand.title}
                      </h2>
                      <p className="text-gray-600">{errand.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusConfig[errand.status]?.color ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {errand.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">
                      Delivery Info
                    </h3>
                    <p className="text-gray-600">{errand.deliveryAddress}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Created: {formatDate(errand.createdAt)}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">
                      Pickup Locations
                    </h3>
                    <div className="space-y-2">
                      {errand.pickupLocations.map((location, idx) => (
                        <div key={idx} className="text-gray-600">
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm">{location.address}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">
                      Financials
                    </h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Items Total:</span>
                        <span className="font-medium">
                          ${errand.totalPrice?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Charge:</span>
                        <span className="font-medium">
                          ${errand.serviceCharge?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee:</span>
                        <span className="font-medium">
                          ₦{errand.deliveryFee?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-1 mt-1">
                        <span className="text-gray-800 font-medium">
                          Total:
                        </span>
                        <span className="font-bold">
                          ${errand.totalAmount?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      Requested by:{" "}
                      <span className="font-medium">{errand.user?.name}</span>
                    </p>
                    {errand.assignedTo && (
                      <p className="text-sm text-gray-600 mt-1">
                        Assigned to:{" "}
                        <span className="font-medium">
                          Driver #{errand.assignedTo.slice(-4)}
                        </span>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleViewDetails(errand)} // Call handler to open modal
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center text-lg py-10">
              No errands found for this status.
            </p>
          )}
        </div>
      </div>

      {/* Modal for Full Details */}
      {showModal &&
        selectedErrand && ( // Only render if showModal is true AND an errand is selected
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedErrand.title}
                    </h2>
                    <p className="text-gray-600">
                      {selectedErrand.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700">Status</h3>
                      <div className="mt-1">
                        <select
                          value={currentStatus}
                          onChange={(e) => handleStatusChange(e.target.value)}
                          className={`block w-full rounded-md border-gray-300 shadow-sm ${statusColors[currentStatus]} focus:ring-blue-500 focus:border-blue-500`}
                        >
                          {Object.keys(statusConfig)
                            .filter((s) => s !== "all")
                            .map(
                              (
                                status // Filter out 'all' from dropdown
                              ) => (
                                <option key={status} value={status}>
                                  {status.replace("_", " ")}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-700">Customer</h3>
                      <p className="mt-1 text-gray-600">
                        {selectedErrand.user?.name}
                        <br />
                        {selectedErrand.user?.email}
                        <br />
                        {selectedErrand.phoneNumber}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-700">
                        Delivery Address
                      </h3>
                      <p className="mt-1 text-gray-600">
                        {selectedErrand.deliveryAddress}
                      </p>
                    </div>
                  </div>

                  {/* Middle Column */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700">Financials</h3>
                      <div className="mt-1 space-y-1 text-gray-600">
                        <p>
                          Subtotal: ₦{selectedErrand.totalPrice?.toFixed(2)}
                        </p>
                        <p>
                          Service Charge: ₦
                          {selectedErrand.serviceCharge?.toFixed(2)}
                        </p>
                        <p>
                          Delivery Fee: ₦
                          {selectedErrand.deliveryFee?.toFixed(2)}
                        </p>
                        <p className="font-medium">
                          Total: ₦{selectedErrand.totalAmount?.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-700">
                        Clan Information
                      </h3>
                      <p className="mt-1 text-gray-600">
                        {selectedErrand.clan?.name}
                        <br />
                        {selectedErrand.clan?.uniqueClanID}
                        <br />
                        {selectedErrand.clan?.address}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <h3 className="font-medium text-gray-700">Timestamps</h3>
                    <div className="mt-1 space-y-1 text-gray-600">
                      <p>
                        Created:{" "}
                        {new Date(selectedErrand.createdAt).toLocaleString()}
                      </p>
                      <p>
                        Last Updated:{" "}
                        {new Date(selectedErrand.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pickup Locations */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Pickup Locations ({selectedErrand.pickupLocations?.length})
                  </h3>
                  <div className="space-y-4">
                    {selectedErrand.pickupLocations?.map(
                      (location, locIndex) => (
                        <div
                          key={locIndex}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <h4 className="font-medium text-gray-700">
                            {location.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {location.address}
                          </p>

                          <div className="mt-3">
                            <h5 className="font-medium text-gray-700 text-sm">
                              Items ({location.items?.length})
                            </h5>
                            <ul className="mt-1 space-y-2">
                              {location.items?.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex justify-between border-b border-gray-100 pb-2"
                                >
                                  <div>
                                    <p className="text-gray-800">{item.name}</p>
                                    {item.description && (
                                      <p className="text-gray-500 text-xs">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <p>
                                      ₦{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                      {item.quantity} × ₦{item.price.toFixed(2)}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Add your action handler here (e.g., dispatch an API call)
                      console.log(
                        "Action taken on errand:",
                        selectedErrand._id
                      );
                      setShowModal(false); // Close modal after action
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Take Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ClanErrandsScreen;
