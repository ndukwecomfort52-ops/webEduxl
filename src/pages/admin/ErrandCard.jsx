import { useState } from "react";

const ErrandCard = ({ errand }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(errand.status);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    assigned: "bg-blue-100 text-blue-800",
    en_route: "bg-purple-100 text-purple-800",
    picked_up: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    completed: "bg-green-200 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // Add your API call to update status here
      // await updateErrandStatus(errand._id, newStatus);
      setCurrentStatus(newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      {/* Compact Card View */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3 overflow-hidden">
        <div
          className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[currentStatus]}`}
              >
                {currentStatus}
              </span>
              <h3 className="text-lg font-semibold text-gray-800">
                {errand.title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm mt-1">
              ₦{errand.totalAmount?.toFixed(2) || "0.00"} •{" "}
              {errand.pickupLocations?.length || 0} stops
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View
            </button>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

        {/* Expanded Details */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <h4 className="font-medium text-gray-700 mb-1">
                  Delivery Address
                </h4>
                <p className="text-gray-600 text-sm">
                  {errand.deliveryAddress}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Customer</h4>
                <p className="text-gray-600 text-sm">
                  {errand.user?.name} • {errand.user?.email}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => setShowModal(true)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View full details →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Full Details */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {errand.title}
                  </h2>
                  <p className="text-gray-600">{errand.description}</p>
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
                        {Object.keys(statusColors).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Customer</h3>
                    <p className="mt-1 text-gray-600">
                      {errand.user?.name}
                      <br />
                      {errand.user?.email}
                      <br />
                      {errand.phoneNumber}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">
                      Delivery Address
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {errand.deliveryAddress}
                    </p>
                  </div>
                </div>

                {/* Middle Column */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Financials</h3>
                    <div className="mt-1 space-y-1 text-gray-600">
                      <p>Subtotal: ₦{errand.totalPrice?.toFixed(2)}</p>
                      <p>Service Charge: ₦{errand.serviceCharge?.toFixed(2)}</p>
                      <p>Delivery Fee: ₦{errand.deliveryFee?.toFixed(2)}</p>
                      <p className="font-medium">
                        Total: ₦{errand.totalAmount?.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">
                      Clan Information
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {errand.clan?.name}
                      <br />
                      {errand.clan?.uniqueClanID}
                      <br />
                      {errand.clan?.address}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <h3 className="font-medium text-gray-700">Timestamps</h3>
                  <div className="mt-1 space-y-1 text-gray-600">
                    <p>
                      Created: {new Date(errand.createdAt).toLocaleString()}
                    </p>
                    <p>
                      Last Updated:{" "}
                      {new Date(errand.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pickup Locations */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Pickup Locations ({errand.pickupLocations?.length})
                </h3>
                <div className="space-y-4">
                  {errand.pickupLocations?.map((location, locIndex) => (
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
                  ))}
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
                    // Add your action handler here
                    console.log("Action taken on errand:", errand._id);
                    setShowModal(false);
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
    </>
  );
};

export default ErrandCard;
