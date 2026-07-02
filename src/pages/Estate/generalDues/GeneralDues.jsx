// // import { useState } from "react";
// // import { useQueryClient } from "@tanstack/react-query";
import { useMutateDataV2, useFetchDataV2 } from "@/hook/RequestV2";
// // import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
// import { useFetchDataV2, useMutateDataV2 } from "../hooks/RequestV2"; // adjust path

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n || 0);

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const categoryLabel = (c) =>
  ({
    annual_membership: "Annual Membership",
    monthly_fee: "Monthly Fee",
    maintenance: "Maintenance",
    special: "Special Levy",
  })[c] || c;

const categoryColor = (c) =>
  ({
    annual_membership: { bg: "#DBEAFE", color: "#1E40AF" },
    monthly_fee: { bg: "#D1FAE5", color: "#065F46" },
    maintenance: { bg: "#FEF3C7", color: "#92400E" },
    special: { bg: "#EDE9FE", color: "#6D28D9" },
  })[c] || { bg: "#F3F4F6", color: "#374151" };

const progressPct = (paid, total) =>
  total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    dues: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </>
    ),
    filter: (
      <>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </>
    ),
    trash: (
      <>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    money: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    check: (
      <>
        <polyline points="20 6 9 17 4 12" />
      </>
    ),
    x: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    alert: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </>
    ),
    refresh: (
      <>
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
};

// ─── CREATE DUES MODAL ────────────────────────────────────────────────────────
const CreateDuesModal = ({ onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    defaultAmount: "",
    dueDate: "",
    category: "annual_membership",
  });
  const { mutate, isPending, error } = useMutateDataV2("generalDues", "POST");

  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );
  const clanId = selectedEstate._id;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        url: `/v1/generalDuesRouter?clanId=${clanId}`,
        data: { ...form, defaultAmount: Number(form.defaultAmount) },
      },
      { onSuccess: onClose },
    );
  };

  const inp = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111827",
    background: "white",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "540px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          animation: "slideIn 0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 32px",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#111827",
                margin: 0,
              }}
            >
              Create General Dues
            </h2>
            <p
              style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 0" }}
            >
              Set up a new dues collection for estate members
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "#F3F4F6",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="x" size={18} color="#6B7280" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "32px" }}>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Title *
              </label>
              <input
                required
                style={inp}
                placeholder="e.g. March 2026 Membership Dues"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                onFocus={(e) => (e.target.style.borderColor = "#10B981")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Description
              </label>
              <textarea
                style={{ ...inp, resize: "vertical", minHeight: "72px" }}
                placeholder="Optional description..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                onFocus={(e) => (e.target.style.borderColor = "#10B981")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Amount (₦) *
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  style={inp}
                  placeholder="e.g. 5000"
                  value={form.defaultAmount}
                  onChange={(e) =>
                    setForm({ ...form, defaultAmount: e.target.value })
                  }
                  onFocus={(e) => (e.target.style.borderColor = "#10B981")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Due Date *
                </label>
                <input
                  required
                  type="date"
                  style={inp}
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                  onFocus={(e) => (e.target.style.borderColor = "#10B981")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                />
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Category *
              </label>
              <select
                required
                style={{ ...inp, cursor: "pointer" }}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="annual_membership">Annual Membership</option>
                <option value="monthly_fee">Monthly Fee</option>
                <option value="maintenance">Maintenance</option>
                <option value="special">Special Levy</option>
              </select>
            </div>
          </div>

          {error && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px 16px",
                background: "#FEE2E2",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#991B1B",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Icon name="alert" size={16} color="#DC2626" />
              {error?.message || "Something went wrong"}
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "12px",
                background: "white",
                color: "#374151",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              style={{
                flex: 1,
                padding: "12px",
                background: isPending ? "#6EE7B7" : "#10B981",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: isPending ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
              }}
            >
              {isPending ? "Creating..." : "Create Dues"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── DUES DETAIL MODAL ────────────────────────────────────────────────────────
const DuesDetailModal = ({ dues, onClose }) => {
  const pct = progressPct(dues.collectedTotal, dues.expectedTotal);
  const cat = categoryColor(dues.category);
  const isOverdue =
    new Date(dues.dueDate) < new Date() && dues.outstandingTotal > 0;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "640px",
          maxHeight: "90vh",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 32px",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 6px",
              }}
            >
              {dues.title}
            </h2>
            <div style={{ display: "flex", gap: "8px" }}>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: cat.bg,
                  color: cat.color,
                }}
              >
                {categoryLabel(dues.category)}
              </span>
              {isOverdue && (
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    background: "#FEE2E2",
                    color: "#991B1B",
                  }}
                >
                  OVERDUE
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "#F3F4F6",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="x" size={18} color="#6B7280" />
          </button>
        </div>

        <div
          style={{
            padding: "28px 32px",
            overflowY: "auto",
            maxHeight: "calc(90vh - 80px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            {[
              {
                label: "Expected",
                value: fmt(dues.expectedTotal),
                color: "#2563EB",
                bg: "#DBEAFE",
              },
              {
                label: "Collected",
                value: fmt(dues.collectedTotal),
                color: "#10B981",
                bg: "#D1FAE5",
              },
              {
                label: "Outstanding",
                value: fmt(dues.outstandingTotal),
                color: "#DC2626",
                bg: "#FEE2E2",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: s.bg,
                  borderRadius: "10px",
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: s.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "6px",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}
              >
                Collection Progress
              </span>
              <span
                style={{ fontSize: "13px", fontWeight: 700, color: "#10B981" }}
              >
                {pct}%
              </span>
            </div>
            <div
              style={{
                height: "8px",
                background: "#F3F4F6",
                borderRadius: "99px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #10B981, #059669)",
                  borderRadius: "99px",
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            {[
              { label: "Due Date", value: fmtDate(dues.dueDate) },
              { label: "Default Amount", value: fmt(dues.defaultAmount) },
              { label: "Total Members", value: dues.totalAssigned },
              { label: "Paid Members", value: dues.totalPaid },
              { label: "Exempted", value: dues.totalExempted },
              { label: "Status", value: dues.isActive ? "Active" : "Inactive" },
            ].map((i) => (
              <div
                key={i.label}
                style={{
                  background: "#F9FAFB",
                  borderRadius: "8px",
                  padding: "12px 14px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: "4px",
                  }}
                >
                  {i.label}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {i.value}
                </div>
              </div>
            ))}
          </div>

          <h4
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "12px",
            }}
          >
            Members ({dues.members?.length || 0})
          </h4>
          {dues.members?.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "28px",
                background: "#F9FAFB",
                borderRadius: "10px",
                color: "#6B7280",
                fontSize: "14px",
              }}
            >
              No members assigned yet
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {dues.members?.map((m) => (
                <div
                  key={m._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    background: "#F9FAFB",
                    borderRadius: "8px",
                    border: "1px solid #F3F4F6",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#D1FAE5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name="users" size={14} color="#10B981" />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#374151",
                        }}
                      >
                        {typeof m.member === "object"
                          ? m.member?.name ||
                            m.member?._id?.toString().slice(-8).toUpperCase()
                          : m.member?.toString().slice(-8).toUpperCase()}
                      </div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
                        Assigned {fmtDate(m.assignedAt)}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#111827",
                        }}
                      >
                        {fmt(m.amountDue)}
                      </div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
                        Due
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 700,
                        background:
                          m.status === "paid"
                            ? "#D1FAE5"
                            : m.status === "exempted"
                              ? "#EDE9FE"
                              : "#FEF3C7",
                        color:
                          m.status === "paid"
                            ? "#065F46"
                            : m.status === "exempted"
                              ? "#6D28D9"
                              : "#92400E",
                      }}
                    >
                      {m.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── DUES CARD ────────────────────────────────────────────────────────────────
const DuesCard = ({ dues, onView, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const pct = progressPct(dues.collectedTotal, dues.expectedTotal);
  const cat = categoryColor(dues.category);
  const isOverdue =
    new Date(dues.dueDate) < new Date() && dues.outstandingTotal > 0;

  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: hovered
          ? "0 10px 15px -3px rgba(0,0,0,0.1)"
          : "0 1px 3px 0 rgba(0,0,0,0.1)",
        transform: hovered ? "translateY(-2px)" : "none",
        transition: "all 0.3s ease",
        borderTop: `3px solid ${isOverdue ? "#DC2626" : "#10B981"}`,
      }}
      onClick={() => navigate(`/estate-admin/general-dues/${dues._id}`)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 6px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {dues.title}
          </h3>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <span
              style={{
                padding: "2px 8px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 600,
                background: cat.bg,
                color: cat.color,
              }}
            >
              {categoryLabel(dues.category)}
            </span>
            {isOverdue && (
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  background: "#FEE2E2",
                  color: "#991B1B",
                }}
              >
                OVERDUE
              </span>
            )}
            {!dues.isActive && (
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  background: "#F3F4F6",
                  color: "#6B7280",
                }}
              >
                INACTIVE
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "6px", marginLeft: "12px" }}>
          <button
            onClick={() => onView(dues)}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "#F0FDF4",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="eye" size={14} color="#10B981" />
          </button>
          <button
            onClick={() => onDelete(dues._id)}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "#FEF2F2",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="trash" size={14} color="#DC2626" />
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            background: "#F9FAFB",
            borderRadius: "8px",
            padding: "10px 12px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#9CA3AF",
              fontWeight: 600,
              marginBottom: "2px",
            }}
          >
            COLLECTED
          </div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#10B981" }}>
            {fmt(dues.collectedTotal)}
          </div>
        </div>
        <div
          style={{
            background: "#F9FAFB",
            borderRadius: "8px",
            padding: "10px 12px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#9CA3AF",
              fontWeight: 600,
              marginBottom: "2px",
            }}
          >
            OUTSTANDING
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: dues.outstandingTotal > 0 ? "#DC2626" : "#111827",
            }}
          >
            {fmt(dues.outstandingTotal)}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: 500 }}>
            {dues.totalPaid}/{dues.totalMustPay} paid
          </span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: pct === 100 ? "#10B981" : pct > 50 ? "#F59E0B" : "#DC2626",
            }}
          >
            {pct}%
          </span>
        </div>
        <div
          style={{
            height: "6px",
            background: "#F3F4F6",
            borderRadius: "99px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              borderRadius: "99px",
              background:
                pct === 100
                  ? "#10B981"
                  : pct > 50
                    ? "linear-gradient(90deg,#F59E0B,#10B981)"
                    : "linear-gradient(90deg,#DC2626,#F59E0B)",
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "12px",
          borderTop: "1px solid #F3F4F6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Icon name="calendar" size={13} color="#9CA3AF" />
          <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: 500 }}>
            Due {fmtDate(dues.dueDate)}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Icon name="users" size={13} color="#9CA3AF" />
          <span style={{ fontSize: "12px", color: "#6B7280", fontWeight: 500 }}>
            {dues.totalAssigned} members
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function GeneralDues() {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedDues, setSelectedDues] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice,
  );
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useFetchDataV2(
    `/v1/generalDuesRouter?clanId=${selectedEstate?._id}`,
    "generalDues",
  );
  const { mutate: deleteDues } = useMutateDataV2("generalDues", "DELETE");

  const allDues = data?.data || [];

  const filtered = allDues.filter((d) => {
    const matchSearch =
      d.title?.toLowerCase().includes(search.toLowerCase()) ||
      categoryLabel(d.category).toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || d.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const totalExpected = allDues.reduce((s, d) => s + (d.expectedTotal || 0), 0);
  const totalCollected = allDues.reduce(
    (s, d) => s + (d.collectedTotal || 0),
    0,
  );
  const totalOutstanding = allDues.reduce(
    (s, d) => s + (d.outstandingTotal || 0),
    0,
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this dues record?")) return;
    deleteDues(
      { url: `/v1/generalDuesRouter/${id}`, data: {} },
      { onSuccess: () => queryClient.invalidateQueries(["generalDues"]) },
    );
  };

  return (
    <div
      style={{
        background: "#F9FAFB",
        minHeight: "100vh",
        padding: "32px 24px",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:scale(0.95) translateY(-10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing:border-box; }
        input, textarea, select, button { font-family:inherit; }
      `}</style>

      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* PAGE HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "32px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#D1FAE5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="dues" size={20} color="#10B981" />
              </div>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  color: "#111827",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                General Dues
              </h1>
            </div>
            <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
              Manage estate dues collections · {allDues.length}{" "}
              {allDues.length === 1 ? "record" : "records"}
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => refetch()}
              style={{
                padding: "11px 16px",
                background: "white",
                color: "#374151",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon name="refresh" size={15} color="#374151" /> Refresh
            </button>
            <button
              onClick={() => setShowCreate(true)}
              style={{
                padding: "11px 20px",
                background: "#10B981",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
              }}
            >
              <Icon name="plus" size={16} color="white" /> Create Dues
            </button>
          </div>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "28px",
          }}
        >
          {[
            {
              label: "Total Records",
              value: allDues.length,
              icon: "dues",
              bg: "#D1FAE5",
              color: "#10B981",
            },
            {
              label: "Total Expected",
              value: fmt(totalExpected),
              icon: "money",
              bg: "#DBEAFE",
              color: "#2563EB",
            },
            {
              label: "Total Collected",
              value: fmt(totalCollected),
              icon: "check",
              bg: "#D1FAE5",
              color: "#10B981",
            },
            {
              label: "Outstanding",
              value: fmt(totalOutstanding),
              icon: "alert",
              bg: "#FEE2E2",
              color: "#DC2626",
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "20px 24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                animation: `fadeIn 0.4s ease ${i * 0.05}s both`,
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <Icon name={s.icon} size={20} color={s.color} />
              </div>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#111827",
                  marginBottom: "2px",
                }}
              >
                {s.value}
              </div>
              <div
                style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500 }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <Icon name="search" size={16} color="#9CA3AF" />
            </div>
            <input
              placeholder="Search dues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 42px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "14px",
                background: "white",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#10B981")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: "10px 36px 10px 14px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "14px",
              background: "white",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
            }}
          >
            <option value="all">All Categories</option>
            <option value="annual_membership">Annual Membership</option>
            <option value="monthly_fee">Monthly Fee</option>
            <option value="maintenance">Maintenance</option>
            <option value="special">Special Levy</option>
          </select>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 14px",
              background: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "13px",
              color: "#6B7280",
              gap: "6px",
            }}
          >
            <Icon name="filter" size={14} color="#6B7280" />
            {filtered.length} of {allDues.length} shown
          </div>
        </div>

        {/* CONTENT */}
        {isLoading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  height: "220px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                {[60, 40, 100, 100, 30].map((w, j) => (
                  <div
                    key={j}
                    style={{
                      background: "#F3F4F6",
                      borderRadius: "6px",
                      height: j === 2 ? "40px" : j === 3 ? "6px" : "14px",
                      width: `${w}%`,
                      marginBottom: "12px",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : isError ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 32px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "#FEE2E2",
                margin: "0 auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="alert" size={32} color="#DC2626" />
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              Failed to Load
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#6B7280",
                marginBottom: "20px",
              }}
            >
              Something went wrong fetching dues data.
            </p>
            <button
              onClick={() => refetch()}
              style={{
                padding: "12px 24px",
                background: "#10B981",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 32px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "#F3F4F6",
                margin: "0 auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="dues" size={32} color="#D1D5DB" />
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              {search || categoryFilter !== "all"
                ? "No results found"
                : "No Dues Yet"}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#6B7280",
                marginBottom: "24px",
              }}
            >
              {search || categoryFilter !== "all"
                ? "Try adjusting your search or filter."
                : "Create your first dues collection to get started."}
            </p>
            {!(search || categoryFilter !== "all") && (
              <button
                onClick={() => setShowCreate(true)}
                style={{
                  padding: "12px 24px",
                  background: "#10B981",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
                }}
              >
                <Icon name="plus" size={16} color="white" /> Create First Dues
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "20px",
            }}
          >
            {filtered.map((dues, i) => (
              <div
                key={dues._id}
                style={{ animation: `fadeIn 0.4s ease ${i * 0.04}s both` }}
              >
                <DuesCard
                  dues={dues}
                  onView={setSelectedDues}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreate && <CreateDuesModal onClose={() => setShowCreate(false)} />}
      {selectedDues && (
        <DuesDetailModal
          dues={selectedDues}
          onClose={() => setSelectedDues(null)}
        />
      )}
    </div>
  );
}
