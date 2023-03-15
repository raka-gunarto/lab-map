import clsx from "clsx";
import React, { useState } from "react";
import tinygradient from "tinygradient";
import { useSchema } from "../providers";
import { useData } from "../providers/DataProvider";
import BoardOfShame from "./BoardOfShame";

const GridElement = ({ type, data, gradient, computers }) => {
  const [hover, setHover] = useState(false);
  const { focus } = useData();
  return (
    <div
      className={clsx(
        "relative aspect-square cursor-pointer select-none rounded-md p-2",
        type === "computer" ? "bg-gray-600" : "bg-black",
        computers?.[data?.hostname]?.users.includes(focus) &&
          "animate-bounce !bg-yellow-600"
      )}
      style={
        type === "computer"
          ? {
              backgroundColor:
                gradient?.[
                  computers[data.hostname]?.users?.length ?? 0
                ].toString(),
            }
          : {}
      }
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {type === "computer" && (
        <p className="align-middle text-white">{data.hostname}</p>
      )}
      {hover && type === "computer" && computers[data.hostname] && (
        <div className="absolute z-10 rounded-md bg-orange-400 p-2 text-white">
          {computers[data.hostname].sessions.map((sess, idx) => (
            <p key={idx}>
              User: {sess.username} Date: {sess.date}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SchemaViewer() {
  const { activeSchema } = useSchema();
  const { computers } = useData();

  const maxComputers = Math.max(
    ...Object.values(computers).map((c) => c.users.length)
  );
  const gradient = tinygradient([
    { color: "rgb(75,85,99)", pos: 0 },
    { color: "rgb(239,68,68)", pos: 1 },
  ]).rgb(Math.max(2, maxComputers + 1));

  let gridElems = [];
  if (activeSchema !== null)
    for (let row = 0; row < activeSchema.rows; ++row)
      for (let col = 0; col < activeSchema.columns; ++col) {
        if (activeSchema.computers[row]?.[col] === undefined) {
          gridElems.push(<GridElement key={`${row}${col}`} type="filler" />);
          continue;
        }
        gridElems.push(
          <GridElement
            key={`${row}${col}`}
            type="computer"
            data={activeSchema.computers[row][col]}
            gradient={gradient}
            computers={computers}
          />
        );
      }

  return activeSchema !== null ? (
    <div className="flex flex-row">
      <div
        className="grid p-8"
        style={{
          gridTemplateColumns: `repeat(${activeSchema.columns}, minmax(0, max-content))`,
          gridTemplateRows: `repeat(${activeSchema.rows}, minmax(0, auto))`,
          gap: "1rem",
        }}
      >
        {gridElems}
      </div>
      <div
        className="mt-8 flex h-1/4 w-4 flex-col justify-between"
        style={{
          background:
            "linear-gradient(0deg, rgba(75,85,99,1) 0%, rgba(239,68,68,1) 100%)",
        }}
      >
        <p>{maxComputers}</p>
        <p>0</p>
      </div>
      <BoardOfShame />
    </div>
  ) : null;
}
