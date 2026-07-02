
import React, { useState, useEffect } from "react";
import { useFetchDataV2, useMutateDataV2 } from "@/hook/RequestV2";
import { Search, Plus, X, BarChart2, Trash2, ChevronDown, ChevronUp, Users, Calendar } from "lucide-react";

const AdminPolls = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [expandedPoll, setExpandedPoll] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all polls
  const { data, isLoading, isError, refetch } = useFetchDataV2(
    `/v1/poll/admin`,
    "adminPolls",
  );

  // Create poll
  const {
    mutate: createPoll,
    isPending: isCreating,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  } = useMutateDataV2("adminPolls", "POST");

  // Delete poll
  const { mutate: deletePoll, isPending: isDeleting } = useMutateDataV2(
    "adminPolls",
    "DELETE",
  );

  useEffect(() => {
    if (isCreateSuccess) {
      refetch();
      resetForm();
      setIsCreateModalOpen(false);
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isCreateError) {
      const msg =
        createError?.message || "Failed to create poll.";
      alert(`❌ ${msg}`);
    }
  }, [isCreateError, createError]);

  const resetForm = () => {
    setQuestion("");
    setOptions(["", ""]);
  };

  const addOption = () => {
    if (options.length < 6) setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length > 2) setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleCreatePoll = () => {
    const filledOptions = options.filter((o) => o.trim() !== "");
    if (!question.trim()) return alert("Please enter a question");
    if (filledOptions.length < 2) return alert("Please enter at least 2 options");

    // useMutateDataV2 mutationFn expects { url, data }
    createPoll({
      url: `/v1/poll/admin`,
      data: { question: question.trim(), options: filledOptions },
    });
  };

  const handleDeletePoll = (e, pollId) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this poll?")) return;
    deletePoll({ url: `/v1/poll/admin/${pollId}` });
  };

  // API returns { success, message, data: [...] }
  const polls = data?.data || [];

  const filteredPolls = searchTerm
    ? polls.filter((p) =>
        p.question?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : polls;

  const getTotalVotes = (poll) =>
    poll.options?.reduce((sum, opt) => sum + (opt.votes || 0), 0) || 0;

  const getPercent = (votes, total) =>
    total === 0 ? 0 : Math.round((votes / total) * 100);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">
          Failed to load polls. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Polls</h1>
            <p className="text-sm text-gray-500 mt-1">
              Create and manage polls for your estate ({filteredPolls.length} total)
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/30 font-medium"
          >
            <Plus size={18} />
            <span>Create Poll</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search polls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Polls List */}
      {filteredPolls.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart2 className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">
            {searchTerm ? "No polls match your search" : "No polls yet"}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {searchTerm
              ? "Try a different search term"
              : "Create your first poll to get started"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium text-sm"
            >
              <Plus size={16} />
              Create Poll
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPolls.map((poll) => {
            const totalVotes = getTotalVotes(poll);
            const isExpanded = expandedPoll === poll._id;

            return (
              <div
                key={poll._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Poll Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedPoll(isExpanded ? null : poll._id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-base leading-snug">
                        {poll.question}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                          <Users size={14} />
                          {totalVotes} vote{totalVotes !== 1 ? "s" : ""}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                          <BarChart2 size={14} />
                          {poll.options?.length || 0} options
                        </span>
                        {poll.createdAt && (
                          <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                            <Calendar size={14} />
                            {new Date(poll.createdAt).toLocaleDateString()}
                          </span>
                        )}
                        {poll.clanId?.name && (
                          <span className="text-sm text-gray-400">
                            {poll.clanId.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={(e) => handleDeletePoll(e, poll._id)}
                        disabled={isDeleting}
                        className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete poll"
                      >
                        <Trash2 size={16} />
                      </button>
                      {isExpanded ? (
                        <ChevronUp size={18} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Results — expanded */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Results
                    </p>
                    {poll.options?.map((option, index) => {
                      const votes = option.votes || 0;
                      const percent = getPercent(votes, totalVotes);

                      return (
                        <div key={index} className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700 font-medium">
                              {option.text}
                            </span>
                            <span className="text-gray-500 tabular-nums">
                              {votes} vote{votes !== 1 ? "s" : ""} · {percent}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-emerald-500 h-2 rounded-full transition-all duration-700"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                    {totalVotes === 0 && (
                      <p className="text-sm text-gray-400 text-center py-2">
                        No votes yet
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create Poll Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Create Poll</h2>
              <button
                onClick={() => { setIsCreateModalOpen(false); resetForm(); }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What would you like to ask your estate members?"
                  rows={3}
                  disabled={isCreating}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none disabled:bg-gray-50 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Options <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-400 mb-3">
                  Minimum 2, maximum 6 options
                </p>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        disabled={isCreating}
                        className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm disabled:bg-gray-50"
                      />
                      {options.length > 2 && (
                        <button
                          onClick={() => removeOption(index)}
                          disabled={isCreating}
                          className="p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {options.length < 6 && (
                  <button
                    onClick={addOption}
                    disabled={isCreating}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium disabled:opacity-50 transition-colors"
                  >
                    <Plus size={14} />
                    Add another option
                  </button>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={() => { setIsCreateModalOpen(false); resetForm(); }}
                disabled={isCreating}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePoll}
                disabled={isCreating || !question.trim()}
                className="flex-1 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50 shadow-sm shadow-emerald-500/30"
              >
                {isCreating ? "Creating..." : "Create Poll"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Polls() {
  return <AdminPolls />;
}