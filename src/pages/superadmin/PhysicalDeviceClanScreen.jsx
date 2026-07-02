import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetchData, useMutateData } from "@/hook/Request";
// import { toast } from "react-toastify";

const PhysicalDeviceClanScreen = () => {
  const [formData, setFormData] = useState({
    estateCode: "",
    clanId: "",
  });
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data: isphysicalEstate } = useFetchData(
    `/v1/admin/physicalEstate`,
    "get-all-estate-physical"
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const {
    mutate: CreatePhysicaldevice,
    isPending: ispendingCreatePhysicaldevice,
    isError: iserrorCreatePhysicaldevice,
  } = useMutateData("get-all-estate-physical", "POST");

  const handleSubmit = async (e) => {
    e.preventDefault();

    CreatePhysicaldevice(
      {
        url: `/v1/admin/physicalEstate`,
        data: formData,
      },
      {
        onSuccess: () => {
          alert("Estate created successfully!");
          setFormData({ estateCode: "", clanId: "" }); // Reset form
        },
        onError: (error) => {
          alert(`Error: ${error.response?.data?.message || error.message}`);
        },
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Physical Device Clans
      </h1>

      {/* Create Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Register New Device
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estate Code
              </label>
              <input
                type="text"
                name="estateCode"
                value={formData.estateCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Clan ID
              </label>
              <input
                type="text"
                name="clanId"
                value={formData.clanId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? "Creating..." : "Create Device"}
          </button>
        </form>
      </div>

      {/* Devices List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Registered Devices
          </h2>
          <button
            onClick={() => fetchDevices()}
            className="text-blue-600 hover:text-blue-800"
          >
            Refresh
          </button>
        </div>

        {isphysicalEstate?.data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No devices registered yet
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estate Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clan Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clan ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isphysicalEstate?.data?.map((device) => (
                    <tr key={device._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {device.estateCode}
                      </td>

                      {console.log({
                        ggg: device,
                      })}

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {device.clan?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {device.clan?.uniqueClanID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(device.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => fetchDevices(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => fetchDevices(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PhysicalDeviceClanScreen;
