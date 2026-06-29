import type { ReactNode } from "react";
import { useStore } from "../lib/store";
import { Back } from "./Icons";

// Thumb-zone bottom navigation: a back control on the left and the primary
// action(s) filling the rest. The back button is hidden on the desktop shell,
// where the sidebar and header already provide navigation.
export function BottomBar({ onBack, children }: { onBack: () => void; children?: ReactNode }) {
  const { t } = useStore();
  return (
    <div className="actions botbar">
      <button className="btn-back" onClick={onBack} aria-label={t("a.back")}>
        <Back size={19} /><span>{t("a.back")}</span>
      </button>
      {children ? <div className="botcta">{children}</div> : null}
    </div>
  );
}
