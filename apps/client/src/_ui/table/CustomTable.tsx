import ButtonNative from "@/_ui/buttons/ButtonNative";
import style from "@/styles/GlobalConstants";
import { useState } from "react";
import IconBase from "../icons/IconBase";

interface TableRow {
  id: number;
  key: string;
  value: string;
}

const CustomTable = () => {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [newRow, setNewRow] = useState<TableRow>({
    id: 0,
    key: "",
    value: "",
  });
  const [idCounter, setIdCounter] = useState<number>(0);

  const handleInputChange = (event: any, id: number, column: any) => {
    const { value } = event.target;
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [column]: value } : row))
    );
  };

  const handleAddRow = () => {
    const newRowWithId = { ...newRow, id: idCounter + 1 };
    setRows([...rows, newRowWithId]);
    setIdCounter(idCounter + 1);
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div style={{ width: "100%" }}>
      <table style={{ tableLayout: "fixed", width: "100%" }}>
        <thead>
          <tr
            style={{
              background: style.card.bg.overview,
              borderWidth: "1px",
              borderColor: "#14244b",
            }}
          >
            <th
              style={{
                minWidth: "33%",
                borderBottomColor: "#14244b",
                borderRightColor: "#14244b",
                borderWidth: "1px",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                fontWeight: "600",
                fontSize: style.font.h6,
                borderCollapse: "separate",
                borderSpacing: "0 1rem",
              }}
            >
              Key
            </th>
            <th
              style={{
                minWidth: "33%",
                borderBottomColor: "#14244b",
                borderRightColor: "#14244b",
                borderWidth: "1px",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                fontWeight: "600",
                fontSize: style.font.h6,
                borderCollapse: "separate",
                borderSpacing: "0 1rem",
              }}
            >
              Value
            </th>
            <th
              style={{
                minWidth: "33%",
                borderBottomColor: "#14244b",
                borderRightColor: "#14244b",
                borderWidth: "1px",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                fontWeight: "600",
                fontSize: style.font.h6,
                borderCollapse: "separate",
                borderSpacing: "0 1rem",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  style={{
                    background: "black",
                    outline: "none",
                    width: "fit-content",
                    borderColor: "#14244b",
                    borderWidth: "1px",
                    minWidth: "100%",
                    // borderRadius: "30px",
                    textAlign: "center",
                    color: "white",
                    padding: "2px",
                  }}
                  type="text"
                  value={row.key}
                  onChange={(event) => handleInputChange(event, row.id, "key")}
                />
              </td>
              <td>
                <input
                  style={{
                    background: "black",
                    outline: "none",
                    width: "fit-content",
                    borderColor: "#14244b",
                    borderWidth: "1px",
                    minWidth: "100%",
                    // borderRadius: "30px",
                    textAlign: "center",
                    color: "white",
                    padding: "2px",
                  }}
                  type="text"
                  value={row.value}
                  onChange={(event) =>
                    handleInputChange(event, row.id, "value")
                  }
                />
              </td>
              <td
                style={{
                  background: "black",
                  outline: "none",
                  borderColor: "#14244b",
                  borderWidth: "1px",
                }}
              >
                <IconBase
                  slug="icon-delete-blue"
                  size="sm"
                  onClick={() => handleDeleteRow(row.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonNative width="100%" marginTop="sm" onClick={handleAddRow}>
        Add New Param
      </ButtonNative>
    </div>
  );
};

export default CustomTable;
