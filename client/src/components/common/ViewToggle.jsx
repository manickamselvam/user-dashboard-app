import React, { useState } from "react";
import { Button } from "antd";
import { TableOutlined, AppstoreOutlined } from "@ant-design/icons";

function ViewToggle({ onChange }) {
  const [view, setView] = useState("table");

  const handleToggle = (newView) => {
    setView(newView);
    onChange(newView);
  };

  return (
    <div style={{ paddingLeft: "20px", paddingBottom: "20px" }}>
      <Button
        type="default"
        icon={<TableOutlined />}
        onClick={() => handleToggle("table")}
        style={{
          marginRight: 8,
          borderRadius: 4,
          borderColor: view === "table" ? "#1890ff" : "#d9d9d9",
          color: view === "table" ? "#1890ff" : "#000",
        }}
      >
        Table
      </Button>
      <Button
        type="default"
        icon={<AppstoreOutlined />}
        onClick={() => handleToggle("grid")}
        style={{
          borderRadius: 4,
          borderColor: view === "grid" ? "#1890ff" : "#d9d9d9",
          color: view === "grid" ? "#1890ff" : "#000",
        }}
      >
        Card
      </Button>
    </div>
  );
}

export default ViewToggle;
