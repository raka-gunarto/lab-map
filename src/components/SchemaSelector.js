import clsx from "clsx";
import React from "react";
import { useSchema } from "../providers";

const SchemaSelectorBubble = ({ schemaName, onClick, active, action }) => (
  <div
    role="button"
    onClick={onClick}
    className={clsx(
      "rounded-md border-2" ,
      !action && "border-blue-900 p-2 hover:bg-blue-900",
      action && "border-orange-700 p-2 hover:bg-orange-700",
      active && "bg-blue-900"
    )}
  >
    <p className="select-none text-white">{schemaName}</p>
  </div>
);

export default function SchemaSelector() {
  const { schemas, setActiveSchema, newSchema, activeSchema, downloadSchemas } = useSchema();

  return (
    <div className="flex flex-grow-0 flex-row space-x-2 p-8">
      {schemas.map((schema, idx) => (
        <SchemaSelectorBubble
          key={idx}
          schemaName={schema.name}
          onClick={() => setActiveSchema(idx)}
          active={activeSchema == schema}
        ></SchemaSelectorBubble>
      ))}
      <SchemaSelectorBubble
        schemaName="+ New Schema"
        onClick={() => newSchema()}
        action
      />
      <SchemaSelectorBubble
        schemaName="Download Schemas"
        onClick={() => downloadSchemas()}
        action
      />
    </div>
  );
}
