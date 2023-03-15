import { React, createContext, useContext, useState } from "react";
import defaultschema from "../defaultschema.json";

const schemaContext = createContext();
export function ProvideSchema({ children }) {
  const schema = useProvideSchema();
  return (
    <schemaContext.Provider value={schema}>{children}</schemaContext.Provider>
  );
}
export const useSchema = () => useContext(schemaContext);
function useProvideSchema() {
  const [schemas, setSchemas] = useState(defaultschema);
  const [_activeSchema, setActiveSchema] = useState(null);

  const downloadSchemas = () => {
    const blob = new Blob([JSON.stringify(schemas)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `schemas.json`;
    link.click();
    URL.revokeObjectURL(url);
    link.remove();
  };

  const newSchema = () => {
    setSchemas((old) => {
      setActiveSchema(old.length);
      return [
        ...old,
        {
          name: "New Schema",
          rows: 5,
          columns: 5,
          computers: { 1: { 3: { hostname: "comp-pc-test" } } },
        },
      ];
    });
  };

  const updateActiveSchema = (data) => {
    setSchemas((old) => {
      console.log(data);
      let n = [...old];
      n[_activeSchema] = data;
      return n;
    });
  };

  return {
    schemas,
    get activeSchema() {
      return _activeSchema !== null ? schemas[_activeSchema] : null;
    },
    downloadSchemas,
    newSchema,
    updateActiveSchema,
    setActiveSchema,
    setSchemas,
  };
}
