import { useState, useEffect } from "react";

// const API_URL = "https://eduxl2-production.up.railway.app/api/v1/auth";
const API_URL = "http://localhost:7070/api/v1/auth";



export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div style={styles.center}>Loading...</div>;
  if (error)   return <div style={styles.center}>❌ Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>EduXL API Response</h2>
      <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

const styles = {
  center:    { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "sans-serif" },
  container: { padding: 32, fontFamily: "sans-serif", maxWidth: 800, margin: "0 auto" },
  title:     { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  pre:       { background: "#F1F5F9", padding: 16, borderRadius: 12, overflow: "auto", fontSize: 13 },
};