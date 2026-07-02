import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEstate } from "@/redux/estateSlice";
import { Building2, CheckCircle2, LogIn, LogOut } from "lucide-react";

export default function EstateLoadingScreen() {
  const { user } = useSelector((state) => state?.reducer?.AuthSlice);
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );

  console.log({
    cccc: selectedEstate,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEstateSelection = (estateId) => {
    navigate(`/dashboard/estate/${estateId}`);
  };

  const handleJoinLeaveEstate = (estate) => {
    if (selectedEstate?._id === estate._id) {
      // Leave the estate
      dispatch(setSelectedEstate(null));
    } else {
      // Join the estate
      dispatch(setSelectedEstate(estate));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4 shadow-lg shadow-emerald-500/30">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Select Your Estate
          </h1>
          <p className="text-gray-600">
            Choose an estate to manage or join a new one
          </p>
        </div>

        {/* Estates Grid */}
        {user?.user?.estates?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user?.user?.estates.map((estate) => {
              const isSelected = selectedEstate?._id === estate._id;

              return (
                <div
                  key={estate._id}
                  className={`bg-white rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                    isSelected
                      ? "border-emerald-500 shadow-lg shadow-emerald-500/20"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {/* Estate Info */}
                  <div
                    // onClick={() => handleEstateSelection(estate._id)}
                    className="p-6 cursor-pointer"
                  >
                    {/* Estate Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        isSelected ? "bg-emerald-100" : "bg-gray-100"
                      }`}
                    >
                      <Building2
                        className={`w-6 h-6 ${
                          isSelected ? "text-emerald-600" : "text-gray-600"
                        }`}
                      />
                    </div>

                    {/* Estate Details */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                      {estate.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                      {estate.email}
                    </p>

                    {/* Status Badge */}
                    {isSelected && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
                        <CheckCircle2 size={14} />
                        <span>Active</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinLeaveEstate(estate);
                      }}
                      className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm shadow-emerald-500/30"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <LogOut size={16} />
                          <span>Leave</span>
                        </>
                      ) : (
                        <>
                          <LogIn size={16} />
                          <span>Join</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Estates Found
            </h3>
            <p className="text-gray-600 mb-6">
              You are not an admin of any estate yet.
            </p>
            <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-sm shadow-emerald-500/30">
              Request Access
            </button>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Manage Members
                </h4>
                <p className="text-xs text-gray-600">
                  Add and organize estate residents
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Track Payments
                </h4>
                <p className="text-xs text-gray-600">
                  Monitor dues and transactions
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Electricity
                </h4>
                <p className="text-xs text-gray-600">Manage utility services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
