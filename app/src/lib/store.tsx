import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { property, type Area, type RoleId } from "../data/mock";

type Lang = "en" | "hi" | "te";

type Store = {
  role: RoleId | null; setRole: (r: RoleId | null) => void;
  lang: Lang; setLang: (l: Lang) => void;
  done: Record<string, boolean>;
  markDone: (itemId: string) => void;
  currentAreaId: string | null; setCurrentArea: (id: string | null) => void;
  // helpers
  areaProgress: (a: Area) => { done: number; total: number };
  areaState: (a: Area) => "done" | "active" | "todo";
  totalProgress: () => { done: number; total: number; pct: number };
  firstOpenItem: (a: Area) => string | null;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<RoleId | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [currentAreaId, setCurrentArea] = useState<string | null>(null);

  const value = useMemo<Store>(() => {
    const areaProgress = (a: Area) => ({
      done: a.items.filter((i) => done[i.id]).length,
      total: a.items.length,
    });
    const areaState = (a: Area): "done" | "active" | "todo" => {
      const p = areaProgress(a);
      if (p.done === p.total) return "done";
      if (p.done > 0) return "active";
      return "todo";
    };
    const totalProgress = () => {
      const total = property.areas.length;
      const d = property.areas.filter((a) => areaState(a) === "done").length;
      return { done: d, total, pct: Math.round((d / total) * 100) };
    };
    const firstOpenItem = (a: Area) => a.items.find((i) => !done[i.id])?.id ?? null;
    return {
      role, setRole, lang, setLang, done,
      markDone: (id) => setDone((s) => ({ ...s, [id]: true })),
      currentAreaId, setCurrentArea,
      areaProgress, areaState, totalProgress, firstOpenItem,
    };
  }, [role, lang, done, currentAreaId]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside provider");
  return v;
}

// Tiny demo translations. Will move to i18next when wiring the real app.
const dict: Record<string, Record<Lang, string>> = {
  greeting: { en: "Good morning", hi: "नमस्ते", te: "నమస్తే" },
  continue: { en: "Continue inspection", hi: "जारी रखें", te: "కొనసాగించు" },
};
export function tr(key: string, lang: Lang) {
  return dict[key]?.[lang] ?? dict[key]?.en ?? key;
}
