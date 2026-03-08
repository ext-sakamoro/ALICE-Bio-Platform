"use client";
import { useState } from "react";

type Tab = "simulate" | "screen" | "predict" | "energy" | "stats";

const DEFAULTS: Record<Tab, string> = {
  simulate: JSON.stringify(
    {
      molecule: "ATP",
      simulation_type: "molecular_dynamics",
      timesteps: 10000,
      temperature_k: 310,
      solvent: "water",
      force_field: "AMBER99SB",
    },
    null,
    2
  ),
  screen: JSON.stringify(
    {
      target_protein: "ACE2",
      library: "FDA-approved",
      top_k: 20,
      docking_algorithm: "AutoDock-Vina",
      binding_threshold_kcal: -8.0,
    },
    null,
    2
  ),
  predict: JSON.stringify(
    {
      sequence: "MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSGAEKAVQVKVKALPDAQFEVVHSLAKWKRQTLGQHDFSAGEGLYTHMKALRPDEDRLSPLHSVYVDQWDWERVMGDGERQFSTLKSTVEAIWAGIKATEAAVSEEFGLAPFLPDQIHFVHSQELLSRYPDLDAKGRERAIAKDLGAVFLVGIGGKLSDGHRHDVRAPDYDDWSTPSELGHAGLNGDILVWNPVLEDAFELSSMGIRVDADTLKHQLALTGDEDRLELEWHQALLRGEMPQTIGGGIGQSRLTMLLLQLPHIGQVQAGVWPAAVRESVPSLL",
      task: "secondary_structure",
      model: "AlphaFold3",
    },
    null,
    2
  ),
  energy: JSON.stringify(
    {
      molecule_id: "mol-0042",
      method: "DFT",
      basis_set: "6-31G*",
      compute_gradient: true,
      solvation_model: "COSMO",
    },
    null,
    2
  ),
  stats: JSON.stringify({}, null, 2),
};

const ENDPOINTS: Record<Tab, { method: string; path: string }> = {
  simulate: { method: "POST", path: "/api/v1/bio/simulate" },
  screen: { method: "POST", path: "/api/v1/bio/screen" },
  predict: { method: "POST", path: "/api/v1/bio/predict" },
  energy: { method: "POST", path: "/api/v1/bio/energy" },
  stats: { method: "GET", path: "/api/v1/stats" },
};

const TAB_LABELS: Record<Tab, string> = {
  simulate: "Simulate",
  screen: "Screen",
  predict: "Predict",
  energy: "Energy",
  stats: "Stats",
};

export default function ConsolePage() {
  const [activeTab, setActiveTab] = useState<Tab>("simulate");
  const [inputs, setInputs] = useState<Record<Tab, string>>(DEFAULTS);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:8081";

  const send = async () => {
    setLoading(true);
    setResponse("");
    const { method, path } = ENDPOINTS[activeTab];
    try {
      const opts: RequestInit = { method, headers: { "Content-Type": "application/json" } };
      if (method === "POST") opts.body = inputs[activeTab];
      const res = await fetch(`${API}${path}`, opts);
      setResponse(JSON.stringify(await res.json(), null, 2));
    } catch (e: unknown) {
      setResponse(`Error: ${e instanceof Error ? e.message : String(e)}`);
    }
    setLoading(false);
  };

  const tabStyle = (tab: Tab): React.CSSProperties => ({
    padding: "8px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "monospace",
    fontWeight: activeTab === tab ? 700 : 400,
    background: activeTab === tab ? "#00ff9d" : "#1a1a2e",
    color: activeTab === tab ? "#000" : "#aaa",
  });

  return (
    <div style={{ padding: 24, fontFamily: "monospace", background: "#0a0a0a", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ color: "#00ff9d", marginBottom: 8 }}>ALICE Bio-Platform — Console</h1>
      <p style={{ color: "#666", marginBottom: 24, fontSize: 14 }}>
        Bioinformatics simulation platform · API: {API}
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {(Object.keys(TAB_LABELS) as Tab[]).map((tab) => (
          <button key={tab} style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>
        {ENDPOINTS[activeTab].method} {ENDPOINTS[activeTab].path}
      </div>

      <textarea
        value={inputs[activeTab]}
        onChange={(e) => setInputs((prev) => ({ ...prev, [activeTab]: e.target.value }))}
        rows={12}
        style={{
          width: "100%",
          fontFamily: "monospace",
          fontSize: 13,
          background: "#111",
          color: "#e0e0e0",
          border: "1px solid #333",
          borderRadius: 6,
          padding: 12,
          boxSizing: "border-box",
        }}
        placeholder={ENDPOINTS[activeTab].method === "GET" ? "// GET request — no body needed" : "// JSON payload"}
      />

      <button
        onClick={send}
        disabled={loading}
        style={{
          marginTop: 8,
          padding: "10px 24px",
          background: loading ? "#333" : "#00ff9d",
          color: loading ? "#666" : "#000",
          border: "none",
          borderRadius: 6,
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {loading ? "Sending..." : "Send"}
      </button>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 16,
          marginTop: 16,
          minHeight: 200,
          overflow: "auto",
          borderRadius: 6,
          border: "1px solid #1a3a1a",
          fontSize: 13,
        }}
      >
        {response || "// Response will appear here"}
      </pre>
    </div>
  );
}
