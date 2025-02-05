import React, { useEffect, useRef, useState } from "react";
import ButtonNative from "./ButtonNative";

type FilterStatus = "complete" | "started" | "in-queue" | "retry" | "";

interface FilterButtonProps {
  onFilterApply: (status: FilterStatus) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onFilterApply }) => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showDealStatus, setShowDealStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterOptionsRef = useRef<HTMLDivElement>(null);
  const dealStatusRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = () => {
    setShowFilterOptions(true);
    setShowDealStatus(false);
  };

  const handleDealStatusClick = () => {
    setShowDealStatus(true);
  };

  const handleBackClick = () => {
    setShowDealStatus(false);
    setShowFilterOptions(true);
  };

  const handleApplyClick = () => {
    onFilterApply(selectedStatus as FilterStatus);

    setShowFilterOptions(false);
    setShowDealStatus(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowFilterOptions(false);
        setShowDealStatus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <ButtonNative
        onClick={handleFilterClick}
        ref={filterButtonRef}
        width="100px"
        height="100%"
      >
        Filter
      </ButtonNative>

      {showFilterOptions && !showDealStatus && (
        <div
          ref={filterOptionsRef}
          style={{
            position: "absolute",
            marginTop: "5px",
            top: "100%",
            left: 0,
            background: "white",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            width: "300px",
            zIndex: 9999,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            onClick={handleDealStatusClick}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "10px",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <span style={{ fontSize: "20px", marginRight: "10px" }}>+</span>
            <span>Deal Status</span>
          </div>
        </div>
      )}
      {showDealStatus && (
        <div
          ref={dealStatusRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "white",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            width: "300px",
            zIndex: 1000,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <button
            onClick={handleBackClick}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            ← Back
          </button>
          <div style={{ marginBottom: "10px" }}>Filter by Deal Status</div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as FilterStatus)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="all">Select Status</option>
            <option value="complete">Complete</option>
            <option value="started">Started</option>
            <option value="in-queue">Queue</option>
            <option value="retry">Retry</option>
          </select>
          <ButtonNative variant="dark" onClick={handleApplyClick}>
            Apply
          </ButtonNative>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
