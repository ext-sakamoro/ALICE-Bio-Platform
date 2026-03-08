export default function LandingPage() {
  const features = [
    {
      title: "Molecular Dynamics",
      description:
        "Run AMBER99SB / CHARMM force-field simulations at physiological temperature with implicit or explicit solvent.",
    },
    {
      title: "Virtual Screening",
      description:
        "Dock compound libraries against target proteins using AutoDock-Vina with GPU-accelerated scoring functions.",
    },
    {
      title: "Protein Structure Prediction",
      description:
        "Secondary and tertiary structure prediction via AlphaFold3 integration — submit a FASTA, receive a PDB.",
    },
    {
      title: "Quantum Energy Analysis",
      description:
        "DFT single-point and gradient calculations with 6-31G* basis sets and COSMO solvation for drug-likeness scoring.",
    },
    {
      title: "Pipeline Orchestration",
      description:
        "Chain simulate → screen → predict → energy into automated discovery pipelines with async job tracking.",
    },
    {
      title: "Scalable Compute",
      description:
        "Burst to HPC or cloud GPU clusters on demand. Results streamed back via WebSocket with progress events.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a, #001a0d)",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <header
        style={{
          padding: "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ffffff10",
        }}
      >
        <h2 style={{ margin: 0, color: "#00ff9d" }}>ALICE Bio-Platform</h2>
        <a href="/dashboard/console" style={{ color: "#00ff9d", textDecoration: "none", fontWeight: 600 }}>
          Console →
        </a>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            background: "#00ff9d20",
            color: "#00ff9d",
            borderRadius: 20,
            padding: "4px 16px",
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 24,
            letterSpacing: 1,
          }}
        >
          BIOINFORMATICS SIMULATION PLATFORM
        </div>

        <h1 style={{ fontSize: 48, marginBottom: 16, lineHeight: 1.1 }}>
          Accelerate Drug Discovery
          <br />
          <span style={{ color: "#00ff9d" }}>with Cloud Bioinformatics</span>
        </h1>

        <p style={{ fontSize: 20, color: "#aaa", marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" }}>
          Molecular screening, protein prediction, and quantum energy analysis — accessible via a single REST API.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 80 }}>
          <a
            href="/dashboard/console"
            style={{
              background: "#00ff9d",
              color: "#000",
              padding: "14px 32px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Open Console
          </a>
          <a
            href="#features"
            style={{
              background: "#ffffff10",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Learn More
          </a>
        </div>

        <div
          id="features"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            textAlign: "left",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#ffffff08",
                borderRadius: 12,
                padding: 24,
                border: "1px solid #ffffff10",
              }}
            >
              <h3 style={{ margin: "0 0 12px", color: "#00ff9d", fontSize: 16 }}>{f.title}</h3>
              <p style={{ color: "#aaa", margin: 0, lineHeight: 1.6, fontSize: 14 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ textAlign: "center", padding: "32px", borderTop: "1px solid #ffffff10", color: "#444", fontSize: 12 }}>
        ALICE Bio-Platform · AGPL-3.0-or-later · Project A.L.I.C.E.
      </footer>
    </div>
  );
}
