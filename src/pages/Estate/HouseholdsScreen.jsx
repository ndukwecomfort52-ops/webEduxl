import { useFetchData, useMutateData } from "@/hook/Request";
import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const HouseholdsScreen = () => {
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );

  // State hooks FIRST
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all', 'withMembers', 'withoutMembers'
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
  });

  // Fetch households data
  const {
    data: data_v2,
    isLoading: isLoading_v2,
    isError: isError_v2,
  } = useFetchDataV2(`/v1/household/${selectedEstate?._id}`, "household");

  const { mutate: createhoushold, isPending: ispendingcreatehoushold } =
    useMutateDataV2("household", "POST");

  // Extract households from the response - handle both data structures
  const households = data_v2?.data || data_v2 || [];

  console.log({
    yyyyyy: households[0],
  });

  // Calculate counts for filter tabs
  const counts = useMemo(() => {
    return {
      all: households.length,
      withMembers: households.filter((h) => h.members?.length > 0).length,
      withoutMembers: households.filter((h) => !h.members?.length).length,
    };
  }, [households]);

  // ALL useMemo hooks BEFORE any conditional returns
  // const filteredHouseholds = useMemo(() => {
  //   let filtered = households;

  //   console.log({
  //     emeka: filtered,
  //   });

  //   // Apply member filter
  //   if (filterType === "withMembers") {
  //     filtered = filtered.filter((h) => h.members?.length > 0);
  //   } else if (filterType === "withoutMembers") {
  //     filtered = filtered.filter((h) => !h.members?.length);
  //   }

  //   // Apply search filter
  //   if (searchQuery.trim()) {
  //     const query = searchQuery.toLowerCase();
  //     filtered = filtered.filter((household) => {
  //       const name = household.name?.toLowerCase() || "";
  //       const type = household.type?.toLowerCase() || "";
  //       const address = household.address?.toLowerCase() || "";

  //       return (
  //         name.includes(query) ||
  //         type.includes(query) ||
  //         address.includes(query)
  //       );
  //     });
  //   }

  //   return filtered;
  // }, [households, searchQuery, filterType]);

  const filteredHouseholds = useMemo(() => {
    let filtered = households;

    if (filterType === "withMembers") {
      filtered = filtered.filter((h) => h.members?.length > 0);
    } else if (filterType === "withoutMembers") {
      filtered = filtered.filter((h) => !h.members?.length);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((household) => {
        const name = household.name?.toLowerCase() || "";
        const type = household.type?.toLowerCase() || "";
        const address = household.address?.toLowerCase() || "";

        // ← search through member emails, firstName, lastName
        const memberMatch = household.members?.some((member) => {
          const email = member?.user?.email?.toLowerCase() || "";
          const firstName = member?.user?.firstName?.toLowerCase() || "";
          const lastName = member?.user?.lastName?.toLowerCase() || "";
          return (
            email.includes(query) ||
            firstName.includes(query) ||
            lastName.includes(query)
          );
        });

        return (
          name.includes(query) ||
          type.includes(query) ||
          address.includes(query) ||
          memberMatch
        );
      });
    }

    return filtered;
  }, [households, searchQuery, filterType]);
  // Event handlers
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateHousehold = async (e) => {
    e.preventDefault();

    createhoushold(
      {
        url: `/v1/household`,
        data: {
          clanId: selectedEstate?._id,
          name: formData.name,
          type: formData.type,
          description: formData.description,
          address: formData.address,
        },
      },
      {
        onSuccess: () => {
          toast.success("Household created successfully!");
          setFormData({ name: "", type: "", description: "", address: "" });
          setShowModal(false);
        },
        onError: (err) => {
          console.error("Error creating household:", err);
          toast.error(err?.message || "Failed to create household");
        },
      },
    );
  };

  // NOW conditional returns are safe (all hooks have been called)
  // Loading state
  if (isLoading_v2) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading households...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError_v2) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="text-center text-red-500">
          <svg
            className="mx-auto h-12 w-12 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-lg font-semibold">Error loading households</p>
          <p className="text-sm text-gray-500 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Households</h1>
            {selectedEstate?.name && (
              <p className="text-sm text-gray-500 mt-1">
                {selectedEstate.name}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Household
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 inline-flex">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                filterType === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All ({counts.all})
            </button>
            <button
              onClick={() => setFilterType("withMembers")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                filterType === "withMembers"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              With Members ({counts.withMembers})
            </button>
            <button
              onClick={() => setFilterType("withoutMembers")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                filterType === "withoutMembers"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Without Members ({counts.withoutMembers})
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search by name, type, or address... kaka"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white shadow-sm"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
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
              </button>
            )}
          </div>
          {(searchQuery || filterType !== "all") && (
            <p className="text-sm text-gray-600 mt-2">
              Found {filteredHouseholds.length} household
              {filteredHouseholds.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Households Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHouseholds.length > 0 ? (
            filteredHouseholds.map((household) => (
              <Link
                to={`/estate-admin/household/${household._id}`}
                key={household._id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                {/* Household Header */}
                <div className="mb-4 pb-4 border-b">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {household.name || "Unnamed Household"}
                  </h2>
                  {household.type && (
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                      {household.type}
                    </span>
                  )}
                </div>

                {/* Address */}
                {household.address && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 flex items-start gap-2">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {household.address}
                    </p>
                  </div>
                )}

                {/* Description */}
                {household.description && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {household.description}
                    </p>
                  </div>
                )}

                {/* Members Section */}
                <div className="mb-4">
                  <p className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Members ({household.members?.length || 0})
                  </p>

                  {household.members?.length > 0 ? (
                    <ul className="space-y-2 max-h-32 overflow-y-auto">
                      {household.members.map((member) => (
                        <li
                          key={member._id}
                          className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
                        >
                          <div className="flex-1 min-w-0">
                            {/* <p className="text-sm font-semibold text-gray-700 truncate">
                              {`${member?.user?.name?.firstName} ${member?.user?.name?.lastName}`}
                            </p> */}
                            <p className="text-xs text-gray-500 truncate">
                              {member?.user?.email || "No email"}
                            </p>
                          </div>
                          {member?.role && (
                            <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-md ml-2 flex-shrink-0">
                              {member.role}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 italic py-2">
                      No members yet
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {household?.createdAt
                      ? new Date(household.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </div>
                  {household.isActive !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        household.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {household.isActive ? "Active" : "Inactive"}
                    </span>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              {searchQuery || filterType !== "all" ? (
                <>
                  <svg
                    className="w-20 h-20 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg font-medium mb-2">
                    No households found
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterType("all");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </>
              ) : (
                <>
                  <svg
                    className="w-20 h-20 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg font-medium mb-2">
                    No households found
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Get started by creating your first household
                  </p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Household
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CREATE HOUSEHOLD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Create Household
            </h2>

            <form onSubmit={handleCreateHousehold} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Block B, Flat 5"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  placeholder="e.g., Apartment, Duplex, Bungalow"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Brief description of the household"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Full address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={ispendingcreatehoushold}
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {ispendingcreatehoushold ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "Create Household"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseholdsScreen;
