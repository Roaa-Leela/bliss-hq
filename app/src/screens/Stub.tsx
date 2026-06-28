import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { Back } from "../components/Icons";

export default function Stub({ title }: { title: string }) {
  const nav = useNavigate();
  return (
    <div className="screen">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/")}><Back /></button>
        <Brand />
        <span style={{ width: 42 }} />
      </div>
      <div className="pad grow" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker">Coming next in the demo</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{title}</h1>
        <p className="meta" style={{ marginTop: 12 }}>
          The caretaker flow is built first. This view is next in the build queue.
        </p>
      </div>
    </div>
  );
}
