import React, { useState, useEffect } from "react";
import { useFetchData, useMutateData } from "@/hook/Request";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Shield,
  Hash,
  Building2,
  CheckCircle2,
  Clock,
  XCircle,
  Ban,
  CreditCard,
} from "lucide-react";
import { CardReaderSection } from "./Cardreadersection";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );

  // Use id in the query key to ensure unique cache per member
  const { data, isLoading, isError, refetch } = useFetchData(
    `/v1/clan/${selectedEstate?._id}/${id}`,
    `memberProfile-${id}`, // Unique key per member
  );

  console.log({
    ttt: data,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">Error loading profile</p>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <p className="text-yellow-600 font-medium">No profile data found</p>
      </div>
    );
  }

  // Add key prop to force remount when id changes
  return <UserProfileCard key={id} userData={data.data} refetch={refetch} />;
}

const UserProfileCard = ({ userData, refetch }) => {
  const navigate = useNavigate();
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Form states
  const [phone, setPhone] = useState(userData?.phoneNumber || "");
  const [address, setAddress] = useState(userData?.member?.homeAddress || "");
  const [flatNumber, setFlatNumber] = useState(
    userData?.member?.flatNumber || "",
  );
  const [street, setStreet] = useState(userData?.member?.street || "");
  const [apartmentType, setApartmentType] = useState(
    userData?.member?.apartmentType || "",
  );

  const [currentStatus, setCurrentStatus] = useState(
    userData?.member?.status || "pending",
  );

  // Reset form states when userData changes (when navigating to a different member)
  useEffect(() => {
    setPhone(userData?.phoneNumber || "");
    setAddress(userData?.member?.homeAddress || "");
    setFlatNumber(userData?.member?.flatNumber || "");
    setStreet(userData?.member?.street || "");
    setApartmentType(userData?.member?.apartmentType || "");
    setCurrentStatus(userData?.member?.status || "pending");
    setIsEditMode(false); // Exit edit mode when switching members
  }, [userData]);

  // Mutations
  const { mutate: updateMember, isPending: isPendingUpdate } = useMutateData(
    "clanMembers",
    "PATCH",
  );

  const {
    mutate: approved_suspend_members,
    isPending: isPendingapproved_suspend,
  } = useMutateData("clanMembers", "POST");

  const { mutate: creatememercode, isPending: isPendingcreatememercode } =
    useMutateData("clanMembers", "POST");

  // Handle save edits
  const handleSave = () => {
    const requestData = {
      phonenumber: phone,
      homeAddress: address,
      memberId: userData?.member?._id,
    };

    if (selectedEstate?.email === "happylandestate1@gmail.com") {
      requestData.flatNumber = flatNumber;
      requestData.street = street;
      requestData.apartmentType = apartmentType;
    }

    updateMember(
      {
        url: `/v1/clan/${selectedEstate?._id}`,
        data: requestData,
      },
      {
        onSuccess: () => {
          alert("✅ Member updated successfully!");
          setIsEditMode(false);
          refetch();
        },
        onError: (error) => {
          alert(`❌ Error: ${error.message}`);
        },
      },
    );
  };

  const handleCancel = () => {
    setPhone(userData?.phoneNumber || "");
    setAddress(userData?.member?.homeAddress || "");
    setFlatNumber(userData?.member?.flatNumber || "");
    setStreet(userData?.member?.street || "");
    setApartmentType(userData?.member?.apartmentType || "");
    setIsEditMode(false);
  };

  const handleStatusChange = (newStatus) => {
    approved_suspend_members(
      {
        url: `/v1/clan/${selectedEstate?._id}/webEstateMember/approve-suppend-member`,
        data: {
          newStatus: newStatus,
          memberUserId: userData?.id,
        },
      },
      {
        onSuccess: (res) => {
          setCurrentStatus(res?.updatedMember?.status);
          alert(`✅ Member status updated to ${res?.updatedMember?.status}!`);
          refetch();
        },
        onError: (err) => {
          alert(`❌ Error: ${err.message}`);
        },
      },
    );
  };

  const handlecreatecode = (id) => {
    creatememercode(
      {
        url: `/v1/clan/membercode`,
        data: {
          memberId: id,
          clanId: selectedEstate?._id,
        },
      },
      {
        onSuccess: () => {
          alert("✅ Member code created successfully!");
          refetch();
        },
        onError: (err) => {
          alert(`❌ Error: ${err.message}`);
        },
      },
    );
  };

  const getAvailableActions = () => {
    switch (currentStatus) {
      case "approved":
        return ["suspended"];
      case "suspended":
        return ["approved"];
      case "pending":
        return ["approved", "rejected"];
      default:
        return [];
    }
  };

  const statusConfig = {
    approved: {
      color: "bg-green-100 text-green-800",
      icon: CheckCircle2,
      label: "Approved",
    },
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
      label: "Pending",
    },
    suspended: {
      color: "bg-red-100 text-red-800",
      icon: Ban,
      label: "Suspended",
    },
    rejected: {
      color: "bg-gray-100 text-gray-800",
      icon: XCircle,
      label: "Rejected",
    },
  };

  const StatusIcon = statusConfig[currentStatus]?.icon || Clock;

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Members</span>
        </button>

        {!isEditMode ? (
          <button
            onClick={() => setIsEditMode(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/30 font-medium"
          >
            <Edit2 size={18} />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isPendingUpdate}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>{isPendingUpdate ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                {userData?.photo ? (
                  <img
                    src={userData.photo}
                    alt={userData.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <span className="text-5xl font-bold text-emerald-600">
                    {userData?.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <div
                className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig[currentStatus]?.color}`}
              >
                <StatusIcon size={14} />
                <span>{statusConfig[currentStatus]?.label}</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left text-white">
              <h1 className="text-3xl font-bold mb-2">
                {userData?.name || "No name"}
              </h1>
              <p className="text-emerald-100 text-lg mb-4">
                {userData?.email || "No email"}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {userData?.member?.isAdmin && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium flex items-center gap-1.5">
                    <Shield size={14} />
                    Admin Level {userData?.member?.adminLevel}
                  </span>
                )}
                {userData?.member?.memberCode && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium flex items-center gap-1.5">
                    <Hash size={14} />
                    {userData?.member?.memberCode}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail size={20} className="text-emerald-600" />
                Contact Information
              </h2>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                  <Mail size={18} className="text-gray-400" />
                  <span className="text-gray-900">
                    {userData?.email || "N/A"}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                    <Phone size={18} className="text-gray-400" />
                    <span className="text-gray-900">{phone || "N/A"}</span>
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Home Address
                </label>
                {isEditMode ? (
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter home address"
                  />
                ) : (
                  <div className="flex items-start gap-2 px-4 py-3 bg-gray-50 rounded-lg min-h-[80px]">
                    <MapPin size={18} className="text-gray-400 mt-0.5" />
                    <span className="text-gray-900">{address || "N/A"}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Estate Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-emerald-600" />
                Estate Details
              </h2>

              {selectedEstate?.email === "happylandestate1@gmail.com" ? (
                <>
                  {/* Flat Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Flat Number
                    </label>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={flatNumber}
                        onChange={(e) => setFlatNumber(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="Enter flat number"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-900">
                          {flatNumber || "N/A"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Street */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Street Name
                    </label>
                    {isEditMode ? (
                      <select
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="">Select Street</option>
                        <option value="Peace close">Peace close</option>
                        <option value="Felicia momoh">Felicia momoh</option>
                        <option value="Achief close">Achief close</option>
                        <option value="Halleluyah close">
                          Halleluyah close
                        </option>
                        <option value="Favoured honour close">
                          Favoured honour close
                        </option>
                        <option value="Saluwala Kadiku Street">
                          Saluwala Kadiku Street
                        </option>
                        <option value="Hibiscus link road">
                          Hibiscus link road
                        </option>
                        <option value="Cedar street">Cedar street</option>
                        <option value="Alhaji Ekemode">Alhaji Ekemode</option>
                        <option value="Maple Street">Maple Street</option>
                        <option value="Samuel Ukpong">Samuel Ukpong</option>
                        <option value="Soji Sanyaolu close">
                          Soji Sanyaolu close
                        </option>
                        <option value="Doyin Ishola Close">
                          Doyin Ishola Close
                        </option>
                        <option value="John Agabri Street">
                          John Agabri Street
                        </option>
                      </select>
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-900">{street || "N/A"}</span>
                      </div>
                    )}
                  </div>

                  {/* Apartment Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Apartment Type
                    </label>
                    {isEditMode ? (
                      <select
                        value={apartmentType}
                        onChange={(e) => setApartmentType(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="">Select Apartment Type</option>
                        <option value="Bungalow">Bungalow</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Flat">Flat</option>
                        <option value="Room and Parlour">
                          Room and Parlour
                        </option>
                        <option value="Selfcon">Selfcon</option>
                        <option value="School">School</option>
                        <option value="Hotels">Hotels</option>
                        <option value="Shops">Shops</option>
                      </select>
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-900">
                          {apartmentType || "N/A"}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              ) : null}

              {/* Member Code */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Member Code
                </label>
                {userData?.member?.memberCode ? (
                  <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 rounded-lg">
                    <Hash size={18} className="text-emerald-600" />
                    <span className="text-gray-900 font-mono font-semibold">
                      {userData?.member?.memberCode}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => handlecreatecode(userData?.member?._id)}
                    disabled={isPendingcreatememercode}
                    className="w-full px-4 py-3 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPendingcreatememercode
                      ? "Generating..."
                      : "Generate Member Code"}
                  </button>
                )}
              </div>

              {/* Virtual Account */}
              {userData?.member?.virtualAccount && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Virtual Account
                  </label>
                  <div className="px-4 py-3 bg-blue-50 rounded-lg space-y-1">
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} className="text-blue-600" />
                      <span className="text-gray-900 font-mono font-semibold">
                        {userData?.member?.virtualAccount?.accountNumber}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                      {userData?.member?.virtualAccount?.bankName}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions Section */}
          {!isEditMode && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Status Management
              </h3>

              <div className="flex flex-wrap gap-3">
                {getAvailableActions().map((action) => (
                  <button
                    key={action}
                    onClick={() => handleStatusChange(action)}
                    disabled={isPendingapproved_suspend}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      action === "approved"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : action === "suspended"
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                    }`}
                  >
                    {isPendingapproved_suspend
                      ? "Updating..."
                      : `Mark as ${action.charAt(0).toUpperCase() + action.slice(1)}`}
                  </button>
                ))}

                {userData?.member?.status === "approved" && (
                  <button
                    onClick={() => setShowAdminModal(true)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
                  >
                    Make Admin
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <CardReaderSection
        userId={userData?.member?.user}
        clanId={selectedEstate?._id}
      />
      {/* Make Admin Modal */}
      {showAdminModal && (
        <MakeAdminModal
          isOpen={showAdminModal}
          onClose={() => setShowAdminModal(false)}
          userId={userData?.member?.user}
          clanId={selectedEstate?._id}
          onSuccess={() => {
            alert("✅ User successfully made admin!");
            setShowAdminModal(false);
            refetch();
          }}
        />
      )}
    </div>
  );
};

const MakeAdminModal = ({ isOpen, onClose, userId, clanId, onSuccess }) => {
  const [selectedLevel, setSelectedLevel] = useState(1);

  const { mutate: createadminModal, isPending: ispendingcreateadminModal } =
    useMutateData("clanMembers", "POST");

  const handleSubmit = () => {
    createadminModal(
      {
        url: `/v1/clan/makeMemberAdmin`,
        data: {
          clanId,
          userId,
          adminLevel: selectedLevel,
        },
      },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          alert(`❌ Error: ${error.message}`);
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Make User Admin</h2>
            <p className="text-sm text-gray-500 mt-1">
              Select the admin level for this user
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  selectedLevel === level
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Higher levels have more administrative privileges
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={ispendingcreateadminModal}
            className="flex-1 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-emerald-500/30"
          >
            {ispendingcreateadminModal ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};
