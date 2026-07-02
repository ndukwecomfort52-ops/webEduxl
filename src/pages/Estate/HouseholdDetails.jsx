import { useFetchData } from "@/hook/Request";
import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CreditCard,
  X,
  CheckCircle2,
  Ban,
  Clock,
  Trash2,
  Pencil,
} from "lucide-react";

// ─────────────────────────────────────────────
// CONFIRM DIALOG
// ─────────────────────────────────────────────
const ConfirmDialog = ({ message, onConfirm, onCancel, isLoading }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9998] p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
          <Trash2 size={18} className="text-red-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Delete Card</h3>
          <p className="text-sm text-gray-500">{message}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm disabled:opacity-50"
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// ASSIGN CARD MODAL
// ─────────────────────────────────────────────
const AssignCardModal = ({
  memberName,
  userId,
  clanId,
  onClose,
  onSuccess,
  onError,
}) => {
  const [uid, setUid] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { mutate, isPending } = useMutateDataV2("cardreader", "POST");

  const handleSubmit = () => {
    if (!uid || !startDate || !endDate) {
      onError("Please fill in all fields");
      return;
    }
    mutate(
      {
        url: "/v1/cardreader",
        data: {
          uid,
          userId,
          clanID: clanId,
          start_date: startDate,
          end_date: endDate,
        },
      },
      {
        onSuccess: () => onSuccess("Card assigned successfully"),
        onError: (err) => onError(err.message || "Failed to assign card"),
      },
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Assign Card</h2>
            <p className="text-sm text-gray-500 mt-1">
              Assigning to{" "}
              <span className="font-semibold text-gray-700">{memberName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Card UID
            </label>
            <input
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value.toUpperCase())}
              autoFocus
              placeholder="Scan card or type UID..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono transition-all"
            />
            <p className="text-xs text-gray-400">
              Focus this field and swipe the card on the reader
            </p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Assigning..." : "Assign Card"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// EDIT CARD MODAL
// ✅ PATCH /v1/cardreader?clan=&user=
// ─────────────────────────────────────────────
const EditCardModal = ({
  card,
  memberName,
  userId,
  clanId,
  onClose,
  onSuccess,
  onError,
}) => {
  const [uid, setUid] = useState(card.uid || "");
  const [startDate, setStartDate] = useState(
    card.start_date
      ? new Date(card.start_date).toISOString().split("T")[0]
      : "",
  );
  const [endDate, setEndDate] = useState(
    card.end_date ? new Date(card.end_date).toISOString().split("T")[0] : "",
  );
  const [status, setStatus] = useState(card.status || "inactive");

  // ✅ PATCH — matches .patch() on the "/" route
  const { mutate, isPending } = useMutateDataV2("cardreader", "PATCH");

  const handleSubmit = () => {
    const body = {};

    // UID — only if changed
    if (uid && uid !== card.uid) body.uid = uid;

    // Dates — must send both together
    const origStart = card.start_date
      ? new Date(card.start_date).toISOString().split("T")[0]
      : "";
    const origEnd = card.end_date
      ? new Date(card.end_date).toISOString().split("T")[0]
      : "";
    const datesChanged = startDate !== origStart || endDate !== origEnd;
    if (datesChanged) {
      if (!startDate || !endDate) {
        onError("start_date and end_date must be provided together");
        return;
      }
      body.start_date = startDate;
      body.end_date = endDate;
    }

    // Status — only if changed
    if (status !== card.status) body.status = status;

    if (Object.keys(body).length === 0) {
      onError("No changes detected");
      return;
    }

    console.log({
      nvbn: body,
    });

    mutate(
      {
        // ✅ No /update — same base route as POST, query params identify the record
        url: `/v1/cardreader?clan=${clanId}&user=${userId}`,
        data: body,
      },
      {
        onSuccess: () => onSuccess("Card updated successfully"),
        onError: (err) => onError(err.message || "Failed to update card"),
      },
    );
  };

  const statusOptions = [
    {
      value: "active",
      label: "Active",
      active: "bg-green-500 text-white",
      inactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    },
    {
      value: "inactive",
      label: "Inactive",
      active: "bg-yellow-400 text-white",
      inactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    },
    {
      value: "revoked",
      label: "Revoked",
      active: "bg-red-500 text-white",
      inactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Card</h2>
            <p className="text-sm text-gray-500 mt-1">
              Editing card for{" "}
              <span className="font-semibold text-gray-700">{memberName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* UID */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Card UID
            </label>
            <input
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value.toUpperCase())}
              placeholder="Scan new card or type UID..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono transition-all"
            />
            <p className="text-xs text-gray-400">
              Leave unchanged to keep current UID
            </p>
          </div>

          {/* Dates side by side */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Access Period
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-400 mb-1">Start Date</p>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">End Date</p>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">
              If changing dates, both fields are required
            </p>
          </div>

          {/* Status toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Status
            </label>
            <div className="flex gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStatus(s.value)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all capitalize ${
                    status === s.value ? s.active : s.inactive
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : "Save Changes kaka"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MEMBER CARD BADGE
// ─────────────────────────────────────────────
const MemberCardBadge = ({ userId, memberName, clanId }) => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data, isLoading, refetch } = useFetchDataV2(
    `/v1/cardreader/single?clan=${clanId}&user=${userId}`,
    `cardreader-${userId}-${clanId}`,
    { enabled: !!userId && !!clanId },
  );

  const card = data?.data?.[0] || null;

  const { mutate: deleteCard, isPending: isDeleting } = useMutateDataV2(
    "cardreader",
    "DELETE",
  );

  const handleDeleteConfirm = () => {
    deleteCard(
      { url: `/v1/cardreader/delete?clan=${clanId}&user=${userId}`, data: {} },
      {
        onSuccess: () => {
          setConfirmDelete(false);
          toast.success("Card deleted");
          refetch();
        },
        onError: (err) => {
          setConfirmDelete(false);
          toast.error(err.message || "Failed to delete card");
        },
      },
    );
  };

  const statusConfig = {
    active: {
      color: "bg-green-100 text-green-700",
      icon: CheckCircle2,
      label: "Active",
    },
    inactive: {
      color: "bg-yellow-100 text-yellow-700",
      icon: Clock,
      label: "Inactive",
    },
    revoked: {
      color: "bg-red-100 text-red-700",
      icon: Ban,
      label: "Revoked",
    },
  };

  if (isLoading) {
    return (
      <div className="mt-2 w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
    );
  }

  return (
    <>
      {card ? (
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {/* UID + dates chip */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
            <CreditCard size={13} className="text-emerald-600 shrink-0" />
            <span className="font-mono text-xs font-semibold text-emerald-800">
              {card.uid}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(card.start_date).toLocaleDateString()} →{" "}
              {new Date(card.end_date).toLocaleDateString()}
            </span>
          </div>

          {/* Status badge */}
          {(() => {
            const config = statusConfig[card.status] || statusConfig.inactive;
            const StatusIcon = config.icon;
            return (
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${config.color}`}
              >
                <StatusIcon size={11} />
                {config.label}
              </span>
            );
          })()}

          {/* Edit */}
          <button
            onClick={() => setShowEditModal(true)}
            className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit card"
          >
            <Pencil size={14} />
          </button>

          {/* Delete */}
          <button
            onClick={() => setConfirmDelete(true)}
            disabled={isDeleting}
            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Delete card"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAssignModal(true)}
          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-xs font-medium shadow-sm shadow-emerald-500/30"
        >
          <CreditCard size={13} />
          Assign Card
        </button>
      )}

      {showAssignModal && (
        <AssignCardModal
          memberName={memberName}
          userId={userId}
          clanId={clanId}
          onClose={() => setShowAssignModal(false)}
          onSuccess={(msg) => {
            setShowAssignModal(false);
            toast.success(msg);
            refetch();
          }}
          onError={(msg) => toast.error(msg)}
        />
      )}

      {showEditModal && (
        <EditCardModal
          card={card}
          memberName={memberName}
          userId={userId}
          clanId={clanId}
          onClose={() => setShowEditModal(false)}
          onSuccess={(msg) => {
            setShowEditModal(false);
            toast.success(msg);
            refetch();
          }}
          onError={(msg) => toast.error(msg)}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          message={`Delete card for ${memberName}? This cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmDelete(false)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const HouseholdDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );

  const [isUpdating, setIsUpdating] = useState(false);
  const [availableSearchTerm, setAvailableSearchTerm] = useState("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
  });

  const {
    data: householdData,
    isLoading: householdLoading,
    refetch: refetchHousehold,
    isError: householdError,
  } = useFetchData(`/v1/clan/single-household/${selectedEstate?._id}/${id}`, [
    "single-household",
    selectedEstate?._id,
    id,
  ]);
  const { data: clanData, isLoading: clanLoading } = useFetchData(
    `/v1/clan/${selectedEstate?._id}`,
    "clanMembers",
  );
  const {
    data: nonHouseholdData,
    isLoading: nonHouseholdLoading,
    refetch: refetchNonHousehold,
  } = useFetchData(
    `/v1/clan/get-all-member-not-in-an-household/${selectedEstate?._id}`,
    "all-member-not",
  );

  const { mutateAsync: updateMembersMutation } = useMutateDataV2(
    "household-members",
    "PATCH",
  );
  const {
    mutateAsync: updateHouseholdMutation,
    isPending: isUpdatingHousehold,
  } = useMutateDataV2("household", "PATCH");
  const { mutateAsync: deleteHouseholdMutation } = useMutateDataV2(
    "household-members",
    "DELETE",
  );

  const household = householdData?.households || {};

  const availableMembers = useMemo(() => {
    const mergeMemberData = (clanMembers = [], nonHouseholdMembers = []) =>
      nonHouseholdMembers.map((member) => {
        const userId = member.user?._id || member.user;
        const clanMember = clanMembers.find((m) => m._id === userId);
        return {
          ...clanMember,
          ...member,
          user: {
            ...(clanMember?.user || {}),
            ...(typeof member.user === "object"
              ? member.user
              : { _id: member.user }),
            name: clanMember?.name || member.user?.name,
            email: clanMember?.email || member.user?.email,
          },
        };
      });
    return mergeMemberData(
      clanData?.members || [],
      nonHouseholdData?.data || [],
    );
  }, [clanData, nonHouseholdData]);

  // const filteredAvailableMembers = useMemo(
  //   () =>
  //     availableMembers.filter((m) =>
  //       m?.user?.name
  //         ?.toLowerCase()
  //         .includes(availableSearchTerm.toLowerCase()),
  //     ),
  //   [availableMembers, availableSearchTerm],
  // );

  const filteredAvailableMembers = useMemo(
    () =>
      availableMembers.filter((m) => {
        const term = availableSearchTerm.toLowerCase();
        return (
          m?.user?.name?.toLowerCase().includes(term) ||
          m?.user?.email?.toLowerCase().includes(term) ||
          m?.email?.toLowerCase().includes(term) // fallback — email also lives at root level
        );
      }),
    [availableMembers, availableSearchTerm],
  );

  const filteredCurrentMembers = useMemo(
    () =>
      household.members?.filter((m) =>
        m?.user?.name?.toLowerCase().includes(currentSearchTerm.toLowerCase()),
      ) || [],
    [household.members, currentSearchTerm],
  );

  const handleAddMember = async (userId) => {
    setIsUpdating(true);
    try {
      await updateMembersMutation({
        url: "/v1/household/member",
        data: { householdId: id, addMembers: [userId] },
      });
      await Promise.all([refetchHousehold(), refetchNonHousehold()]);
      toast.success("Member added successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to add member");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveMember = async (userId) => {
    setIsUpdating(true);
    try {
      await updateMembersMutation({
        url: "/v1/household/member",
        data: { householdId: id, removeMembers: [userId] },
      });
      await Promise.all([refetchHousehold(), refetchNonHousehold()]);
      toast.success("Member removed successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to remove member");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenEditModal = () => {
    setEditFormData({
      name: household.name || "",
      type: household.type || "",
      description: household.description || "",
      address: household.address || "",
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) =>
    setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdateHousehold = async (e) => {
    e.preventDefault();
    try {
      await updateHouseholdMutation({
        url: "/v1/household",
        data: { householdId: id, ...editFormData },
      });
      await refetchHousehold();
      toast.success("Household updated successfully!");
      setShowEditModal(false);
    } catch (error) {
      toast.error(error?.message || "Failed to update household");
    }
  };

  const deleteHousehold = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this household? This action cannot be undone.",
      )
    )
      return;
    try {
      await deleteHouseholdMutation({
        url: "/v1/household",
        data: { householdId: id },
      });
      toast.success("Household deleted successfully!");
      navigate("/estate-admin/household");
    } catch (error) {
      toast.error(error?.message || "Failed to delete household");
    }
  };

  if (householdLoading || clanLoading || nonHouseholdLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4 mx-auto"></div>
          <p className="text-gray-600 font-medium">
            Loading household details...
          </p>
        </div>
      </div>
    );
  }

  if (householdError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <p className="text-red-500 text-xl font-semibold mb-2">
          Error loading household details
        </p>
        <button
          onClick={() => navigate("/estate-admin/household")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          ← Back to Households
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/estate-admin/household")}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Households
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {household.name || "Household Details"}
                  </h1>
                  <div className="flex items-center gap-3 mt-1">
                    {household.type && (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                        {household.type}
                      </span>
                    )}
                    {household.isActive !== undefined && (
                      <span
                        className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                          household.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${
                            household.isActive ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        {household.isActive ? "Active" : "Inactive"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {household.address && (
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Address
                    </p>
                    <p className="mt-1 text-gray-700">{household.address}</p>
                  </div>
                )}
                {household.createdAt && (
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Created
                    </p>
                    <p className="mt-1 text-gray-700">
                      {new Date(household.createdAt).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" },
                      )}
                    </p>
                  </div>
                )}
              </div>
              {household.description && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Description
                  </p>
                  <p className="text-gray-700">{household.description}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleOpenEditModal}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2 font-medium shadow-sm"
              >
                Edit
              </button>
              <button
                onClick={deleteHousehold}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 font-medium shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Members Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Current Members ── */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Current Members
                </h2>
                <p className="text-sm text-gray-500">
                  {filteredCurrentMembers.length} member
                  {filteredCurrentMembers.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search members..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={currentSearchTerm}
                onChange={(e) => setCurrentSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
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
            </div>

            {filteredCurrentMembers.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCurrentMembers.map((member) => {
                  const userId = member?.user?._id || member?.user;
                  const memberName = member?.user?.name || "Unnamed Member";
                  return (
                    <div
                      key={member._id}
                      className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shrink-0">
                            {memberName.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate text-lg">
                              {memberName}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">
                              {member?.user?.email || "No email"}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {member?.status && (
                                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                  {member.status}
                                </span>
                              )}
                              {member?.memberCode && (
                                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                                  {member.memberCode}
                                </span>
                              )}
                            </div>

                            {/* ── CARD BADGE — assign / edit / delete ── */}
                            <MemberCardBadge
                              userId={userId}
                              memberName={memberName}
                              clanId={selectedEstate?._id}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveMember(userId)}
                          disabled={isUpdating}
                          className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-all font-medium shadow-sm shrink-0"
                        >
                          {isUpdating ? "Removing..." : "Remove"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-gray-600 font-medium mb-1">
                  {currentSearchTerm ? "No matching members" : "No members yet"}
                </p>
                <p className="text-gray-400 text-sm">
                  {currentSearchTerm
                    ? "Try a different search term"
                    : "Add members from the available list"}
                </p>
              </div>
            )}
          </div>

          {/* ── Available Members ── */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Available Members
                </h2>
                <p className="text-sm text-gray-500">
                  {filteredAvailableMembers.length} available
                </p>
              </div>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search available members..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={availableSearchTerm}
                onChange={(e) => setAvailableSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
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
            </div>

            {filteredAvailableMembers.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredAvailableMembers.map((member) => {
                  const userId = member?.user?._id || member?.user;
                  const memberName = member?.user?.name || "Unnamed Member";
                  return (
                    <div
                      key={member._id}
                      className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shrink-0">
                            {memberName.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate text-lg">
                              {memberName}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">
                              {member?.user?.email || "No email"}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {member?.status && (
                                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                  {member.status}
                                </span>
                              )}
                              {member?.memberCode && (
                                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                                  {member.memberCode}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddMember(userId)}
                          disabled={isUpdating}
                          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all font-medium shadow-sm shrink-0"
                        >
                          {isUpdating ? "Adding..." : "Add"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-gray-600 font-medium mb-1">
                  {availableSearchTerm
                    ? "No matching members"
                    : "No available members"}
                </p>
                <p className="text-gray-400 text-sm">
                  {availableSearchTerm
                    ? "Try a different search term"
                    : "All estate members are assigned"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Household Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg relative shadow-2xl">
            <button
              onClick={() => setShowEditModal(false)}
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
              Edit Household
            </h2>
            <form onSubmit={handleUpdateHousehold} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Block B, Flat 5"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
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
                  value={editFormData.type}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Brief description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  rows={3}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Full address"
                  value={editFormData.address}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingHousehold}
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isUpdatingHousehold ? "Updating..." : "Update Household"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  );
};

export default HouseholdDetails;
