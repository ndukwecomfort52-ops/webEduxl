import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Plus,
  X,
  CheckCircle2,
  Ban,
  Clock,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";

// ─────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "bg-emerald-500 text-white",
    error: "bg-red-500 text-white",
  };

  const Icon = type === "success" ? CheckCircle2 : AlertCircle;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in ${styles[type]}`}
    >
      <Icon size={18} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
};

const useToast = () => {
  const [toast, setToast] = useState(null);
  const show = (message, type = "success") => setToast({ message, type });
  const hide = () => setToast(null);
  return { toast, show, hide };
};

// ─────────────────────────────────────────────
// CONFIRM DIALOG
// ─────────────────────────────────────────────
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
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
          className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export const CardReaderSection = ({ userId, clanId }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [confirmCard, setConfirmCard] = useState(null); // card to delete
  const { toast, show: showToast, hide: hideToast } = useToast();

  const { data, isLoading, refetch } = useFetchDataV2(
    `/v1/cardreader/single?clan=${clanId}&user=${userId}`,
    `cardreader-${userId}-${clanId}`,
    { enabled: !!userId && !!clanId },
  );

  const cards = data?.data || [];

  const { mutate: deleteCard, isPending: isDeleting } = useMutateDataV2(
    "cardreader",
    "DELETE",
  );

  const handleDeleteConfirm = () => {
    if (!confirmCard) return;
    deleteCard(
      {
        url: `/v1/cardreader/delete?clan=${clanId}&user=${userId}`,
        data: {},
      },
      {
        onSuccess: () => {
          setConfirmCard(null);
          showToast("Card deleted successfully", "success");
          refetch();
        },
        onError: (err) => {
          setConfirmCard(null);
          showToast(err.message || "Failed to delete card", "error");
        },
      },
    );
  };

  const statusConfig = {
    active: {
      color: "bg-green-100 text-green-800",
      icon: CheckCircle2,
      label: "Active",
    },
    inactive: {
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
      label: "Inactive",
    },
    revoked: {
      color: "bg-red-100 text-red-800",
      icon: Ban,
      label: "Revoked",
    },
  };

  return (
    <>
      <div className="mt-8 pt-8 border-t border-gray-200">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <CreditCard size={20} className="text-emerald-600" />
            Card Reader Access
          </h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium shadow-sm shadow-emerald-500/30"
          >
            <Plus size={16} />
            Assign Card
          </button>
        </div>

        {/* Cards List */}
        {isLoading ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : cards.length === 0 ? (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center">
            <CreditCard size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">
              No card assigned to this resident
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {cards.map((card) => {
              const config = statusConfig[card.status] || statusConfig.inactive;
              const StatusIcon = config.icon;
              return (
                <div
                  key={card._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <CreditCard size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-mono font-semibold text-gray-900 text-sm">
                        {card.uid}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(card.start_date).toLocaleDateString()} →{" "}
                        {new Date(card.end_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}
                    >
                      <StatusIcon size={12} />
                      {config.label}
                    </span>
                    <button
                      onClick={() => setConfirmCard(card)}
                      disabled={isDeleting}
                      title="Delete card"
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateCardModal
          userId={userId}
          clanId={clanId}
          onClose={() => setShowCreateModal(false)}
          onSuccess={(msg) => {
            setShowCreateModal(false);
            showToast(msg || "Card assigned successfully", "success");
            refetch();
          }}
          onError={(msg) => showToast(msg || "Something went wrong", "error")}
        />
      )}

      {/* Confirm Delete Dialog */}
      {confirmCard && (
        <ConfirmDialog
          message={`Are you sure you want to delete card ${confirmCard.uid}? This cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmCard(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </>
  );
};

// ─────────────────────────────────────────────
// CREATE CARD MODAL
// ─────────────────────────────────────────────
const CreateCardModal = ({ userId, clanId, onClose, onSuccess, onError }) => {
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
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Assign Card</h2>
            <p className="text-sm text-gray-500 mt-1">
              Scan or enter the card UID
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
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

        {/* Footer */}
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
            className="flex-1 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-emerald-500/30"
          >
            {isPending ? "Assigning..." : "Assign Card"}
          </button>
        </div>
      </div>
    </div>
  );
};
