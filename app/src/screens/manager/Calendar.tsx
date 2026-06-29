import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { Back } from "../../components/Icons";
import { Empty } from "../../components/Empty";
import { CalendarBlank } from "../../components/EmptyArt";
import { useStore } from "../../lib/store";
import { calMonth, bookingsData } from "../../data/mock";

type DayStatus = "in" | "out" | "stay" | "free";
const dows = [0, 1, 2, 3, 4, 5, 6];

export default function Calendar() {
  const nav = useNavigate();
  const { managerProps, setCurrentStay, t } = useStore();
  const [propId, setPropId] = useState("palm-grove");
  const bookings = bookingsData.filter((b) => b.propId === propId).sort((a, b) => a.start - b.start);

  const status = (day: number): DayStatus => {
    for (const b of bookings) {
      if (day === b.start) return "in";
      if (day === b.end) return "out";
      if (day > b.start && day < b.end) return "stay";
    }
    return "free";
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < calMonth.firstDow; i++) cells.push(null);
  for (let d = 1; d <= calMonth.days; d++) cells.push(d);

  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/manager")} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("mgr.ops")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("cal.title")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{t("cal.sub")}</p>

        <div className="tabs">
          {managerProps.map((p) => (
            <button key={p.id} className={"tab" + (propId === p.id ? " on" : "")} onClick={() => setPropId(p.id)}>{t("prop." + p.id)}</button>
          ))}
        </div>

        <div className="calsplit">
        <div className="calwrap">
          <div className="calhead">{t("cal.month")}</div>
          <div className="calgrid caldow">
            {dows.map((d) => <span key={d} className="cdow">{t("dow." + d)}</span>)}
          </div>
          <div className="calgrid">
            {cells.map((d, i) => {
              if (d === null) return <span key={"e" + i} className="ccell empty" />;
              const s = status(d);
              const isToday = d === calMonth.todayDate;
              return (
                <span key={d} className={"ccell c-" + s + (isToday ? " today" : "")}>{d}</span>
              );
            })}
          </div>

          <div className="callegend">
            <span className="lg"><span className="lgsw c-in" />{t("cal.legend.in")}</span>
            <span className="lg"><span className="lgsw c-stay" />{t("cal.legend.stay")}</span>
            <span className="lg"><span className="lgsw c-out" />{t("cal.legend.out")}</span>
            <span className="lg"><span className="lgsw c-free" />{t("cal.legend.free")}</span>
          </div>
        </div>

        <div className="calstays">
          <div className="label">{t("cal.upcoming")}</div>
          {bookings.length === 0 ? (
            <Empty art={<CalendarBlank />} title={t("cal.noStays")} />
          ) : (
            <div>
              {bookings.map((b) => {
                const nights = b.end - b.start;
                return (
                  <button className="bkrow" key={b.id} onClick={() => { setCurrentStay(b.id); nav("/manager/deposit"); }}>
                    <span className="bkdate"><span className="bkd">{b.start}</span><span className="bkm">{t("cal.monShort")}</span></span>
                    <span className="bkbody">
                      <span className="bknm">{t(b.guestKey)}</span>
                      <span className="bksub">{t("cal.range", { s: b.start, e: b.end })} · {nights === 1 ? t("cal.night1") : t("cal.nights", { n: nights })}</span>
                    </span>
                    <span className="bkgo">›</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
