import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  property, managerProps, laundryItems, ownerTimeline, inventoryItems, vendors,
  caretakers, issuesData, prefVendorByCat, purchaseReqsData,
  type IssueRec, type IssueStatus, type Assignee,
  type PurchaseReq, type PRLine,
  type Area, type RoleId, type Property,
} from "../data/mock";
import { messages, areaNames, itemTexts, translate, type Lang } from "./i18n";

type Vars = Record<string, string | number>;
const DONE_KEY = "bliss.done.v1";
const LANG_KEY = "bliss.lang.v1";
const ISSUES_KEY = "bliss.issues.v1";
const REQS_KEY = "bliss.reqs.v1";

function load<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}

// A lively starting state for the demo: first two areas already complete.
function seedDone(): Record<string, boolean> {
  const d: Record<string, boolean> = {};
  for (const a of property.areas) if (a.id === "bedroom-1" || a.id === "bathroom-1") for (const it of a.items) d[it.id] = true;
  return d;
}

type Store = {
  role: RoleId | null; setRole: (r: RoleId | null) => void;
  lang: Lang; setLang: (l: Lang) => void;
  done: Record<string, boolean>;
  markDone: (itemId: string) => void;
  reset: () => void;
  currentAreaId: string | null; setCurrentArea: (id: string | null) => void;
  // data (single source; swaps to Supabase later with no screen changes)
  property: Property;
  managerProps: typeof managerProps;
  laundryItems: typeof laundryItems;
  ownerTimeline: typeof ownerTimeline;
  inventoryItems: typeof inventoryItems;
  vendors: typeof vendors;
  caretakers: typeof caretakers;
  prefVendorByCat: typeof prefVendorByCat;
  // issues (interactive)
  issues: IssueRec[];
  currentIssueId: string | null; setCurrentIssue: (id: string | null) => void;
  setIssueStatus: (id: string, status: IssueStatus) => void;
  assignIssue: (id: string, assignee: Assignee) => void;
  // procurement (interactive)
  purchaseReqs: PurchaseReq[];
  currentReqId: string | null; setCurrentReq: (id: string | null) => void;
  createPurchaseReq: (lines: PRLine[]) => string;
  approvePurchaseReq: (id: string) => void;
  orderPurchaseReq: (id: string, vendorId: string) => void;
  // derived
  areaProgress: (a: Area) => { done: number; total: number };
  areaState: (a: Area) => "done" | "active" | "todo";
  totalProgress: () => { done: number; total: number; pct: number };
  firstOpenItem: (a: Area) => string | null;
  // i18n
  t: (key: string, vars?: Vars) => string;
  tArea: (id: string) => string;
  tItem: (id: string) => string;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<RoleId | null>(null);
  const [lang, setLangState] = useState<Lang>(() => load<Lang>(LANG_KEY, "en"));
  const [done, setDone] = useState<Record<string, boolean>>(() => load(DONE_KEY, seedDone()));
  const [currentAreaId, setCurrentArea] = useState<string | null>(null);
  const [issues, setIssues] = useState<IssueRec[]>(() => load(ISSUES_KEY, issuesData));
  const [currentIssueId, setCurrentIssue] = useState<string | null>(null);
  const [purchaseReqs, setPurchaseReqs] = useState<PurchaseReq[]>(() => load(REQS_KEY, purchaseReqsData));
  const [currentReqId, setCurrentReq] = useState<string | null>(null);

  useEffect(() => { try { localStorage.setItem(DONE_KEY, JSON.stringify(done)); } catch {} }, [done]);
  useEffect(() => { try { localStorage.setItem(ISSUES_KEY, JSON.stringify(issues)); } catch {} }, [issues]);
  useEffect(() => { try { localStorage.setItem(REQS_KEY, JSON.stringify(purchaseReqs)); } catch {} }, [purchaseReqs]);
  const setLang = (l: Lang) => { setLangState(l); try { localStorage.setItem(LANG_KEY, l); } catch {} };

  const value = useMemo<Store>(() => {
    const areaProgress = (a: Area) => ({ done: a.items.filter((i) => done[i.id]).length, total: a.items.length });
    const areaState = (a: Area): "done" | "active" | "todo" => {
      const p = areaProgress(a);
      return p.done === p.total ? "done" : p.done > 0 ? "active" : "todo";
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
      reset: () => { setDone(seedDone()); setIssues(issuesData); setPurchaseReqs(purchaseReqsData); },
      currentAreaId, setCurrentArea,
      property, managerProps, laundryItems, ownerTimeline, inventoryItems, vendors, caretakers, prefVendorByCat,
      issues, currentIssueId, setCurrentIssue,
      setIssueStatus: (id, status) =>
        setIssues((s) => s.map((i) => (i.id === id ? { ...i, status } : i))),
      assignIssue: (id, assignee) =>
        setIssues((s) => s.map((i) => (i.id === id ? { ...i, assignee } : i))),
      purchaseReqs, currentReqId, setCurrentReq,
      createPurchaseReq: (lines) => {
        const id = "pr" + (purchaseReqs.length + 1) + "-" + lines.length + "-" + lines.reduce((s, l) => s + l.qty, 0);
        setPurchaseReqs((s) => [{ id, lines, status: "requested", vendorId: null, poNum: null, whenKey: "when.now" }, ...s]);
        return id;
      },
      approvePurchaseReq: (id) =>
        setPurchaseReqs((s) => s.map((r) => (r.id === id ? { ...r, status: "approved" } : r))),
      orderPurchaseReq: (id, vendorId) =>
        setPurchaseReqs((s) => {
          const orderedCount = s.filter((r) => r.status === "ordered").length;
          const poNum = "PO-" + (2042 + orderedCount);
          return s.map((r) => (r.id === id ? { ...r, status: "ordered", vendorId, poNum } : r));
        }),
      areaProgress, areaState, totalProgress, firstOpenItem,
      t: (key, vars) => translate(messages, key, lang, vars),
      tArea: (id) => translate(areaNames, id, lang),
      tItem: (id) => translate(itemTexts, id, lang),
    };
  }, [role, lang, done, currentAreaId, issues, currentIssueId, purchaseReqs, currentReqId]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside provider");
  return v;
}
