import { React, createContext, useContext, useState, useEffect } from "react";

const dataContext = createContext();
export function ProvideData({ children }) {
  const data = useProvideData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}
export const useData = () => useContext(dataContext);
function useProvideData() {
  const [data, setData] = useState({});
  const [users, setUsers] = useState({});
  const [computers, setComputers] = useState({});
  const [focus, setFocus] = useState(null);

  useEffect(() => {
    if (!data || !data["who"] || !data["ps"]) return;
    let newComputers = {};
    let newUsers = Object.entries(data["who"]).reduce((acc, entry) => {
      const [computer, wholist] = entry;
      newComputers[computer] = { users: [] };
      for (let who of wholist) {
        const username = who.split(/\s+/)[0].split("@")[0];
        const term = who.split(/\s+/)[1];
        const date = who.split(/\s+/)[2];
        if (!(term.startsWith(":") || term.startsWith("tty")))
          // only count physical sessions
          continue;

        newComputers[computer].users.push(username);
        if (!acc[username])
          acc[username] = {
            sessions: 0,
            computers: new Set(),
            accMemory: 0,
            accCPUPercentage: 0.0,
            oldestSession: Date.parse(date),
          };
        acc[username].sessions += 1;
        acc[username].computers.add(computer);
        if (Date.parse(date) < acc[username].oldestSession)
          acc[username].oldestSession = Date.parse(date);
      }
      return acc;
    }, {});
    Object.entries(data["ps"]).map(([computer, pslist]) => {
      for (let proc of pslist) {
        const username = proc.split(/\s+/)[0].split("@")[0];
        if (!newComputers[computer].users.includes(username)) continue;
        const CPU = parseFloat(proc.split(/\s+/)[2]);
        const RSS = parseInt(proc.split(/\s+/)[5]);

        newUsers[username].accMemory += RSS;
        newUsers[username].accCPUPercentage += CPU;
      }
    });

    setUsers(newUsers);
    setComputers(newComputers);
  }, [data]);

  return {
    data,
    setData,
    users,
    computers,
    focus,
    setFocus
  };
}
