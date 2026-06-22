export default function StudioLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img src="/logo.png" alt="PrintOpsAI" style={{ width: 28, height: 28, objectFit: "contain" }} />
      <span style={{ fontWeight: 700, fontSize: 15, color: "#fff", letterSpacing: "-0.3px" }}>
        PrintOpsAI Studio
      </span>
    </div>
  );
}
