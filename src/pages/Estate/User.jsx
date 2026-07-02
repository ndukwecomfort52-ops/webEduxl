import React, { useState, useEffect } from "react";
import { useFetchData, useMutateData } from "@/hook/Request";
import { useMutateDataV2 } from "@/hook/RequestV2";
import { Search, Filter, UserPlus, X, ChevronDown, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MembersTable = () => {
  const navigate = useNavigate();

  // State management
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );

  // Fetch members data
  const { data, isLoading, isError } = useFetchData(
    `/v1/clan/${selectedEstate?._id}`,
    "clanMembers",
  );

  const { mutate: updateProspect, isPending: isPendingUpdateProspect } =
    useMutateData("clanMembers", "PATCH");

  const { mutate: createAccount, isPending: isPendingcreateAccount } =
    useMutateData("clanMembers", "POST");

  const {
    mutate: addMember,
    isPending: isPendingAddMember,
    isSuccess: isSuccessAddMember,
    isError: isErrorAddMember,
    error: addMemberError,
  } = useMutateDataV2("clanMembers", "POST");

  // Initialize and filter members
  useEffect(() => {
    if (data) {
      setMembers(data.members);
      setFilteredMembers(data.members);
      setLoading(false);
    }
  }, [data]);

  // Handle success for adding member
  useEffect(() => {
    if (isSuccessAddMember) {
      alert("✅ Member added successfully!");
      setIsAddMemberModalOpen(false);
      setNewMemberEmail("");
    }
  }, [isSuccessAddMember]);

  // Handle error for adding member
  useEffect(() => {
    if (isErrorAddMember) {
      const errorMessage =
        addMemberError?.response?.data?.message ||
        addMemberError?.message ||
        "Failed to add member. Please try again.";
      alert(`❌ Error: ${errorMessage}`);
    }
  }, [isErrorAddMember, addMemberError]);

  // Apply search and filter
  useEffect(() => {
    let result = members;

    if (searchTerm) {
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (member.phonenumber && member.phonenumber.includes(searchTerm)) ||
          (member.homeAddress &&
            member.homeAddress
              .toLowerCase()
              .includes(searchTerm.toLowerCase())),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((member) => member.status === statusFilter);
    }

    setFilteredMembers(result);
  }, [searchTerm, statusFilter, members]);

  const handleAddMember = () => {
    if (!newMemberEmail || !newMemberEmail.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    addMember({
      url: `/v1/clan/estate/addMember`,
      data: {
        email: newMemberEmail,
      },
    });
  };

  const handleStatusChange = (memberId, newStatus) => {
    updateProspect({
      url: `/v1/clan/${selectedEstate?._id}/status`,
      data: {
        memberId,
        status: newStatus,
      },
    });
  };

  const creact_Account = (email, phone_num) => {
    createAccount({
      url: `/v3/bank/captaincreate`,
      data: {
        email,
        phone_num,
      },
    });
  };

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "approved",
      label: "Approved",
      color: "bg-green-100 text-green-800",
    },
    { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
    {
      value: "suspended",
      label: "Suspended",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">
          Failed to fetch members. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        */}
        <div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Members</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your estate members ({filteredMembers.length} total)
            </p>
          </div>
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/30 font-medium"
          >
            <UserPlus size={18} />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700"
            >
              <Filter size={18} />
              <span>Filter</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>

            {showFilters && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-2">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 uppercase">
                    Status Filter
                  </p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setStatusFilter("all");
                      setShowFilters(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      statusFilter === "all"
                        ? "bg-emerald-50 text-emerald-700 font-medium"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    All Statuses
                  </button>
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setStatusFilter(option.value);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        statusFilter === option.value
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                  Account
                </th>
                {selectedEstate?.email === "happylandestate1@gmail.com" ? (
                  <>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">
                      Location
                    </th>
                  </>
                ) : (
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                    Address
                  </th>
                )}
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                  Admin
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr
                    key={member._id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() =>
                      navigate(`/estate-admin/user-profile/${member._id}`)
                    }
                  >
                    {/* Member Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate lg:hidden">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <p className="text-gray-900 hidden lg:block">
                          {member.email}
                        </p>
                        <p className="text-gray-500">
                          {member?.phonenumber || "N/A"}
                        </p>
                      </div>
                    </td>

                    {/* Account */}
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      {member?.virtualAccount ? (
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">
                            {member?.virtualAccount?.accountNumber}
                          </p>
                          <p className="text-gray-500">
                            {member?.virtualAccount?.bankName}
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            creact_Account(member.email, member?.phonenumber);
                          }}
                          disabled={isPendingcreateAccount}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isPendingcreateAccount
                            ? "Creating..."
                            : "Create Account"}
                        </button>
                      )}
                    </td>

                    {/* Location/Address */}
                    {selectedEstate?.email === "happylandestate1@gmail.com" ? (
                      <td className="px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                        <div className="text-sm">
                          <p className="text-gray-900">
                            {member?.flatNumber || "N/A"}
                          </p>
                          <p className="text-gray-500">
                            {member?.street || "N/A"}
                          </p>
                        </div>
                      </td>
                    ) : (
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <p className="text-sm text-gray-900 max-w-xs truncate">
                          {member?.homeAddress || "N/A"}
                        </p>
                      </td>
                    )}

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={member.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(member._id, e.target.value);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border-0 focus:ring-2 focus:ring-emerald-500 ${
                          statusOptions.find(
                            (opt) => opt.value === member.status,
                          )?.color || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Admin Level */}
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <span className="text-sm text-gray-900">
                        {member.isAdmin ? `Level ${member.adminLevel}` : "—"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/estate-admin/user-profile/${member._id}`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={
                      selectedEstate?.email === "happylandestate1@gmail.com"
                        ? 7
                        : 7
                    }
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium">
                        No members found
                      </p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Add New Member
              </h2>
              <button
                onClick={() => {
                  setIsAddMemberModalOpen(false);
                  setNewMemberEmail("");
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {isPendingAddMember && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-600 text-sm font-medium">
                    Adding member...
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="member@example.com"
                    disabled={isPendingAddMember}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    The user will be added as a pending member
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsAddMemberModalOpen(false);
                  setNewMemberEmail("");
                }}
                disabled={isPendingAddMember}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                disabled={isPendingAddMember || !newMemberEmail}
                className="flex-1 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-emerald-500/30"
              >
                {isPendingAddMember ? "Adding..." : "Add Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function User() {
  return <MembersTable />;
}
