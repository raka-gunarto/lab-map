import clsx from "clsx";
import React, { useState } from "react";
import { useData } from "../providers/DataProvider";
import BoardBG from "./board.png";

const shameSorters = {
  cpu: (a, b) => b[1].accCPUPercentage - a[1].accCPUPercentage,
  mem: (a, b) => b[1].accMemory - a[1].accMemory,
  sessions: (a, b) => b[1].sessions - a[1].sessions,
  oldestSession: (a, b) => a[1].oldestSession - b[1].oldestSession,
};

export default function BoardOfShame() {
  const { users, setFocus } = useData();
  const [activeShameSorter, setActiveShameSorter] = useState("sessions");

  const sortedUsers = Object.entries(users).filter(
    (user) => Date.now() - user[1].oldestSession >= 1000 * 60 * 60 * 24
  );
  sortedUsers.sort(shameSorters[activeShameSorter]);

  return (
    <div className="sticky top-0 flex h-min flex-col space-y-2 p-8 text-white">
      <h2
        className="relative h-min w-full pt-12 pb-2 text-center text-lg font-bold text-black"
        style={{
          backgroundImage: `url(${BoardBG})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        Board of Shame
      </h2>
      <div className="flex w-full flex-row justify-evenly space-x-2">
        <div
          role="button"
          className={clsx(
            "rounded-md border-2 border-orange-700 px-2 py-1 hover:bg-orange-700",
            activeShameSorter === "cpu" && "bg-orange-700"
          )}
          onClick={() => setActiveShameSorter("cpu")}
        >
          Top CPU
        </div>
        <div
          role="button"
          className={clsx(
            "rounded-md border-2 border-orange-700 px-2 py-1 hover:bg-orange-700",
            activeShameSorter === "mem" && "bg-orange-700"
          )}
          onClick={() => setActiveShameSorter("mem")}
        >
          Top Memory
        </div>
        <div
          role="button"
          className={clsx(
            "rounded-md border-2 border-orange-700 px-2 py-1 hover:bg-orange-700",
            activeShameSorter === "sessions" && "bg-orange-700"
          )}
          onClick={() => setActiveShameSorter("sessions")}
        >
          Top Sessions
        </div>
        <div
          role="button"
          className={clsx(
            "rounded-md border-2 border-orange-700 px-2 py-1 hover:bg-orange-700",
            activeShameSorter === "oldestSession" && "bg-orange-700"
          )}
          onClick={() => setActiveShameSorter("oldestSession")}
        >
          Oldest Session
        </div>
      </div>
      <table className="table-auto border-collapse border border-slate-500">
        <thead>
          <th className="border border-slate-500">User</th>
          <th className="border border-slate-500">CPU</th>
          <th className="border border-slate-500">Memory</th>
          <th className="border border-slate-500">Sessions</th>
          <th className="border border-slate-500">Oldest Session</th>
        </thead>
        <tbody>
          {sortedUsers.map(([username, data]) => (
            <tr key={username}>
              <td
                className="cursor-zoom-in border border-slate-500 px-1 hover:bg-slate-500"
                onMouseOver={() => setFocus(username)}
                onMouseOut={() => setFocus(null)}
              >
                {username}
              </td>
              <td className="border border-slate-500 px-1">
                {data.accCPUPercentage.toFixed(2)}
              </td>
              <td className="border border-slate-500 px-1">
                {(data.accMemory / 1000000).toFixed(4)}
              </td>
              <td className="border border-slate-500 px-1">{data.sessions}</td>
              <td className="border border-slate-500 px-1">
                {new Date(data.oldestSession).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
