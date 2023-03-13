import React, { useState } from "react";
import SchemaEditor from "./components/SchemaEditor";
import SchemaSelector from "./components/SchemaSelector";
import SchemaViewer from "./components/SchemaViewer";

function App() {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="flex h-screen w-screen flex-col justify-start overflow-auto bg-gray-800">
      <SchemaSelector />
      <div className="flex flex-row space-x-2 p-8">
        <input
          type="checkbox"
          role="switch"
          id="editMode"
          onChange={(e) => setEditMode(e.target.checked)}
        />
        <label htmlFor="editMode" className="text-white">
          Edit Mode
        </label>
      </div>
      {!editMode ? <SchemaViewer /> : <SchemaEditor />}
    </div>
  );
}

export default App;
