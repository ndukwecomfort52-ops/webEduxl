import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchDataV2 } from "@/hook/RequestV2";
import {
  ArrowLeft,
  CreditCard,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  DollarSign,
  Calendar,
  Receipt,
  TrendingUp,
  TrendingDown,
  FileText,
} from "lucide-react";

export default function SaveHavenDetail() {
  const { accountNumber } = useParams();
  const navigate = useNavigate();
  const [copiedItem, setCopiedItem] = useState(null);
  const [showStatement, setShowStatement] = useState(false);

  // Fetch account details
  const { data: accountsResponse, isLoading: accountLoading } = useFetchDataV2(
    "/v1/savehaven/listAllAccounts",
    "safehaven-accounts",
  );

  const accounts = accountsResponse?.accounts?.data || [];
  const account = accounts.find((acc) => acc.accountNumber === accountNumber);

  // Fetch statement
  const {
    data: statementResponse,
    isLoading: statementLoading,
    refetch: refetchStatement,
  } = useFetchDataV2(
    `/v1/savehaven/statement/${accountNumber}`,
    `safehaven-statement-${accountNumber}`,
    { enabled: showStatement },
  );

  const statements = statementResponse?.statementData?.data || [];

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = (type) => {
    return type === "Credit" ? (
      <TrendingUp size={20} color="#10B981" />
    ) : (
      <TrendingDown size={20} color="#DC2626" />
    );
  };

  const getTransactionColor = (type) => {
    return type === "Credit"
      ? { bg: "#D1FAE5", color: "#065F46" }
      : { bg: "#FEE2E2", color: "#991B1B" };
  };

  if (accountLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <Loader2
          size={48}
          color="#10B981"
          style={{ animation: "spin 1s linear infinite" }}
        />
      </div>
    );
  }

  if (!account) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <AlertCircle
          size={48}
          color="#DC2626"
          style={{ marginBottom: "16px" }}
        />
        <p style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}>
          Account not found
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh", padding: "32px" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/safehaven")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          background: "white",
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: 500,
          color: "#374151",
          cursor: "pointer",
          marginBottom: "24px",
        }}
      >
        <ArrowLeft size={16} />
        Back to Accounts
      </button>

      {/* Account Header */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "24px",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#10B981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <CreditCard size={32} />
          </div>
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "4px",
              }}
            >
              {account.accountName}
            </h1>
            <p style={{ fontSize: "14px", color: "#6B7280" }}>
              {account.accountType} Account
            </p>
          </div>
        </div>

        {/* Account Details Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          <DetailCard
            label="Account Number"
            value={account.accountNumber}
            canCopy={true}
            isCopied={copiedItem === "accountNumber"}
            onCopy={() => handleCopy(account.accountNumber, "accountNumber")}
          />
          <DetailCard label="Bank Name" value={account.bankName} />
          <DetailCard
            label="Account Balance"
            value={formatCurrency(account.accountBalance)}
            highlight={true}
          />
          <DetailCard
            label="Book Balance"
            value={formatCurrency(account.bookBalance)}
          />
          <DetailCard label="Currency" value={account.currencyCode} />
          <DetailCard label="Status" value={account.status} badge={true} />
        </div>

        {/* Sub Account Details */}
        {account.subAccountDetails && (
          <div
            style={{
              marginTop: "24px",
              padding: "20px",
              background: "#F9FAFB",
              borderRadius: "12px",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "16px",
              }}
            >
              Account Holder Information
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6B7280",
                    marginBottom: "4px",
                  }}
                >
                  Full Name
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {account.subAccountDetails.firstName}{" "}
                  {account.subAccountDetails.lastName}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6B7280",
                    marginBottom: "4px",
                  }}
                >
                  Email Address
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {account.subAccountDetails.emailAddress}
                </p>
              </div>
              {account.subAccountDetails.nin && (
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6B7280",
                      marginBottom: "4px",
                    }}
                  >
                    NIN
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {account.subAccountDetails.nin}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View Statement Button */}
        <button
          onClick={() => {
            setShowStatement(!showStatement);
            if (!showStatement) refetchStatement();
          }}
          style={{
            marginTop: "24px",
            padding: "12px 24px",
            background: showStatement ? "#6B7280" : "#10B981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s ease",
          }}
        >
          <FileText size={18} />
          {showStatement ? "Hide Statement" : "View Account Statement"}
        </button>
      </div>

      {/* Account Statement */}
      {showStatement && (
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            Account Statement ({statements.length} transactions)
          </h2>

          {statementLoading ? (
            <div style={{ padding: "32px", textAlign: "center" }}>
              <Loader2
                size={32}
                color="#10B981"
                style={{
                  margin: "0 auto 12px",
                  animation: "spin 1s linear infinite",
                }}
              />
              <p style={{ fontSize: "14px", color: "#6B7280" }}>
                Loading statement...
              </p>
            </div>
          ) : statements.length === 0 ? (
            <div
              style={{
                padding: "48px",
                textAlign: "center",
                background: "#F9FAFB",
                borderRadius: "12px",
              }}
            >
              <Receipt
                size={48}
                color="#D1D5DB"
                style={{ margin: "0 auto 16px" }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: "8px",
                }}
              >
                No transactions found
              </p>
              <p style={{ fontSize: "14px", color: "#6B7280" }}>
                This account has no transaction history
              </p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {statements.map((transaction) => {
                const txnColor = getTransactionColor(transaction.type);
                return (
                  <div
                    key={transaction._id}
                    style={{
                      padding: "16px",
                      background: "#F9FAFB",
                      borderRadius: "12px",
                      borderLeft: `4px solid ${txnColor.color}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "8px",
                              background: txnColor.bg,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <p
                              style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#111827",
                                marginBottom: "2px",
                              }}
                            >
                              {transaction.narration}
                            </p>
                            <p style={{ fontSize: "12px", color: "#6B7280" }}>
                              {transaction.provider} •{" "}
                              {transaction.providerChannel}
                            </p>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "12px",
                            marginTop: "12px",
                            fontSize: "12px",
                          }}
                        >
                          <div>
                            <span style={{ color: "#9CA3AF" }}>
                              Reference:{" "}
                            </span>
                            <span
                              style={{
                                fontWeight: 600,
                                color: "#111827",
                                fontFamily: "monospace",
                              }}
                            >
                              {transaction.paymentReference}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: "#9CA3AF" }}>Date: </span>
                            <span style={{ fontWeight: 600, color: "#111827" }}>
                              {formatDate(transaction.transactionDate)}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: "#9CA3AF" }}>
                              Running Balance:{" "}
                            </span>
                            <span style={{ fontWeight: 600, color: "#111827" }}>
                              {formatCurrency(transaction.runningBalance)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <p
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color:
                              transaction.type === "Credit"
                                ? "#10B981"
                                : "#DC2626",
                            fontFamily: "monospace",
                          }}
                        >
                          {transaction.type === "Credit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </p>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: 600,
                            background: txnColor.bg,
                            color: txnColor.color,
                            marginTop: "8px",
                          }}
                        >
                          {transaction.type}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const DetailCard = ({
  label,
  value,
  canCopy,
  isCopied,
  onCopy,
  highlight,
  badge,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return { bg: "#D1FAE5", color: "#065F46" };
      case "Inactive":
        return { bg: "#FEE2E2", color: "#991B1B" };
      default:
        return { bg: "#F3F4F6", color: "#6B7280" };
    }
  };

  return (
    <div>
      <p
        style={{
          fontSize: "12px",
          color: "#9CA3AF",
          marginBottom: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {badge ? (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 600,
              background: getStatusColor(value).bg,
              color: getStatusColor(value).color,
            }}
          >
            {value}
          </span>
        ) : (
          <p
            style={{
              fontSize: "15px",
              fontWeight: highlight ? 700 : 600,
              color: highlight ? "#10B981" : "#111827",
              fontFamily: highlight || canCopy ? "monospace" : "inherit",
            }}
          >
            {value}
          </p>
        )}
        {canCopy && (
          <button
            onClick={onCopy}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              background: isCopied ? "#D1FAE5" : "#F3F4F6",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            {isCopied ? (
              <Check size={14} color="#10B981" />
            ) : (
              <Copy size={14} color="#6B7280" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
