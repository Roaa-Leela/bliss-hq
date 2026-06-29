import { useEffect } from "react";
import { useStore } from "../lib/store";
import { Check } from "./Icons";

export function Toast() {
  const { toast, clearToast } = useStore();
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clearToast, 2200);
    return () => clearTimeout(t);
  }, [toast?.id, clearToast, toast]);

  if (!toast) return null;
  return (
    <div className="toast" key={toast.id}>
      <span className="toast-ic"><Check size={15} color="#fff" /></span>
      {toast.text}
    </div>
  );
}
