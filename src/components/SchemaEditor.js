import clsx from "clsx";
import React from "react";
import { useSchema } from "../providers";

const GridElement = ({ data, row, col }) => {
  const { updateActiveSchema, activeSchema } = useSchema();
  return (
    <div className={clsx("rounded-md bg-gray-600 p-2")}>
      <textarea
        type="text"
        defaultValue={data && data.hostname}
        className="w-full bg-gray-500 px-2 text-white"
        onChange={(e) => {
          let updatedSchema = structuredClone(activeSchema);
          if (updatedSchema.computers[row] === undefined)
            updatedSchema.computers[row] = {};
          updatedSchema.computers[row][col] = { hostname: e.target.value };
          updateActiveSchema(updatedSchema);
        }}
      />
    </div>
  );
};

export default function SchemaEditor() {
  const { updateActiveSchema, activeSchema } = useSchema();

  let gridElems = [];
  if (activeSchema !== null)
    for (let row = 0; row < activeSchema.rows; ++row)
      for (let col = 0; col < activeSchema.columns; ++col) {
        if (activeSchema.computers[row]?.[col] === undefined) {
          gridElems.push(<GridElement row={row} col={col} />);
          continue;
        }
        gridElems.push(
          <GridElement
            data={activeSchema.computers[row][col]}
            row={row}
            col={col}
          />
        );
      }

  return activeSchema !== null ? (
    <>
      <div className="flex flex-row space-x-2 px-8">
        <input
          className="p-2"
          defaultValue={activeSchema.name}
          onChange={(e) => {
            let updatedSchema = structuredClone(activeSchema);
            updatedSchema.name = e.target.value;
            updateActiveSchema(updatedSchema);
          }}
        />
        <div
          role="button"
          onClick={() => {
            let updatedSchema = structuredClone(activeSchema);
            updatedSchema.rows += 1;
            updateActiveSchema(updatedSchema);
          }}
          className={
            "rounded-md border-2 border-orange-700 p-2 hover:bg-orange-700"
          }
        >
          <p className="select-none text-white">+ Add Row</p>
        </div>
        <div
          role="button"
          onClick={() => {
            let updatedSchema = structuredClone(activeSchema);
            updatedSchema.columns += 1;
            updateActiveSchema(updatedSchema);
          }}
          className={
            "rounded-md border-2 border-orange-700 p-2 hover:bg-orange-700"
          }
        >
          <p className="select-none text-white">+ Add Column</p>
        </div>
      </div>
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
    </>
  ) : null;
}
