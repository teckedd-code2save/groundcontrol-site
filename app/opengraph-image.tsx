import { ImageResponse } from "next/og";

export const alt = "GroundControl — Put your agents to work. Deploy and operate on infrastructure you own.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "54px 64px", background: "#11130f", color: "#f0f2e8", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}><div style={{ width: 18, height: 18, background: "#c8ff3d", borderRadius: 4 }} />GroundControl</div>
        <div style={{ color: "#b7bfab", fontSize: 19 }}>Open source · Self-hosted · MCP + OAuth</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 88, fontWeight: 700, letterSpacing: -4, lineHeight: 1.04 }}>
          <div>Put your agents</div><div style={{ color: "#c8ff3d" }}>to work.</div>
        </div>
        <div style={{ fontSize: 32, color: "#b7bfab" }}>Deploy and operate on infrastructure you own.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #353d2d", paddingTop: 22, fontSize: 20 }}>
        <div>Your computer or your server.</div><div style={{ color: "#c8ff3d" }}>trygroundcontrol.serendepify.com</div>
      </div>
    </div>,
    size,
  );
}
