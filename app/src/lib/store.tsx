import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { property, type Area, type RoleId } from "../data/mock";
import { messages, areaNames, itemTexts, translate, type Lang } from "./i18n";

type Vars = Record<string, string | number>;

type Store = {
  role: RoleId | null; setRole: (r: RoleId | null) => void;
  lang: Lang; setLang: (l: Lang) => void;
  done: Record<string, boolean>;
  markDone: (itemId: string) => void;
  currentAreaId: string | null; setCurrentArea: (id: string | null) => void;
  areaProgress: (a: Area) => { done: number; total: number };
  areaState: (a: Area) => "done" | "active" | "todo";
  totalProgress: () => { done: number; total: number; pct: number };
  firstOpenItem: (a: Area) => string | null;
  t: (key: string, vars?: Vars) => string;
  tArea: (id: string) => string;
  tItem: (id: string) => string;
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
      t: (key, vars) => translate(messages, key, lang, vars),
      tArea: (id) => translate(areaNames, id, lang),
      tItem: (id) => translate(itemTexts, id, lang),
    };
  }, [role, lang, done, currentAreaId]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside provider");
  return v;
}
