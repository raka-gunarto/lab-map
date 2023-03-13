import clsx from "clsx";
import React from "react";
import { useSchema } from "../providers";

const GridElement = ({ type, data }) => (
  <div className={clsx("aspect-square rounded-md bg-gray-600 p-2")}>
    {type === "computer" && (
      <p className="align-middle text-white">{data.hostname}</p>
    )}
  </div>
);

export default function SchemaViewer() {
  const { activeSchema } = useSchema();

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
          />
        );
      }

  return activeSchema !== null ? (
    <div
      className="grid p-8"
      style={{
        gridTemplateColumns: `repeat(${activeSchema.columns}, minmax(0, max-content))`,
        gridTemplateRows: `repeat(${activeSchema.rows}, minmax(0, max-content))`,
        gap: "1rem",
      }}
    >
      {gridElems}
    </div>
  ) : null;
}
