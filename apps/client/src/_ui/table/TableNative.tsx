import React, { useEffect, useState } from "react";
import Divider from "../divider/Divider";
import ButtonNative from "../buttons/ButtonNative";
import IconBase from "../icons/IconBase";
import FlexRow from "../flex/FlexRow";
import style from "@/styles/GlobalConstants";
import { useRouter } from "next/navigation";
import FlexColumn from "../flex/FlexColumn";
import useCollections from "@/hooks/useCollections";
import { deleteAPIkey } from "@/services/ApiService";
import useUserAPI from "@/hooks/useUserAPI";

interface TableColumn {
  key: string;
  header: string;
  description?: string;
}

interface TableRow {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  itemsPerPage?: number;
}

export default function TableNative({
  columns,
  data,
  itemsPerPage = 6,
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dealIds, setDealIds] = useState<any>({});

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageButtons: any = [];
  const maxVisiblePages = 2;
  const router = useRouter();
  const hookCollections = useCollections();
  const hookUserApi = useUserAPI();

  useEffect(() => {
    const fetchDealIdsForCompleteRows = async () => {
      const newDealIds: any = {};
      await Promise.all(
        data.map(async (row) => {
          if (row.dealStatus === "complete") {
            try {
              const ids = await hookCollections.extractDealIds(row.cid);
              newDealIds[row.id] = ids;
            } catch (error) {
              console.error("Error fetching deal IDs:", error);
            }
          }
        })
      );
      //   // Set the state once, after the loop has completed
      setDealIds(newDealIds);
      // console.log("dealids", newDealIds);
    };

    fetchDealIdsForCompleteRows();
    // console.log("current data", currentData);
  }, []);

  const handleRowClick = (collectionID: string) => {
    // router.push(`/collection/${collectionID}`);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  const renderPageButtons = (start: number, end: number) => {
    for (let page = start; page <= end; page++) {
      pageButtons.push(
        <ButtonNative
          showShadow={false}
          paddingTop="12px"
          key={page}
          onClick={() => setCurrentPage(page)}
          width="50px"
          variant={page === currentPage ? "dark" : "transparent"}
        >
          {page}
        </ButtonNative>
      );
    }
  };
  if (totalPages <= maxVisiblePages) {
    // If total pages are less than or equal to maxVisiblePages, show all pages
    renderPageButtons(1, totalPages);
  } else {
    // Otherwise, show a subset of pages with ellipsis in between
    const leftBound = Math.max(
      currentPage - Math.floor(maxVisiblePages / 2),
      1
    );
    const rightBound = Math.min(leftBound + maxVisiblePages - 1, totalPages);

    if (currentPage - Math.floor(maxVisiblePages / 2) > 1) {
      pageButtons.push(
        <ButtonNative
          showShadow={false}
          paddingTop="12px"
          key={1}
          onClick={() => setCurrentPage(1)}
          width="50px"
          variant={1 === currentPage ? "dark" : "transparent"}
        >
          1
        </ButtonNative>
      );
      if (currentPage - Math.floor(maxVisiblePages / 2) > 2) {
        // Show ellipsis if there are skipped pages between 1 and the first visible page
        pageButtons.push(
          <div
            key="leftEllipsis"
            style={{ lineHeight: "36px", margin: "0 5px" }}
          >
            ...
          </div>
        );
      }
    }

    renderPageButtons(leftBound, rightBound);

    if (rightBound < totalPages) {
      if (rightBound < totalPages - 1) {
        // Show ellipsis if there are skipped pages between the last visible page and the last page
        pageButtons.push(
          <div
            key="rightEllipsis"
            style={{ lineHeight: "36px", margin: "0 5px" }}
          >
            ...
          </div>
        );
      }
      pageButtons.push(
        <ButtonNative
          showShadow={false}
          paddingTop="12px"
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          width="50px"
          variant={totalPages === currentPage ? "dark" : "transparent"}
        >
          {totalPages}
        </ButtonNative>
      );
    }
  }
  return (
    <FlexColumn hrAlign="space-between" marginBottom={"xl"}>
      <table
        style={{
          borderCollapse: "collapse",
          margin: 0,
          padding: 0,
          tableLayout: "fixed",
        }}
      >
        <thead style={{}}>
          <tr>
            <td colSpan={columns.length + 1} className="divider">
              <Divider />
            </td>
          </tr>
          <tr style={{ background: style.color.primaryCyan }}>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  width: `${100 / columns.length}%`,
                  textAlign: "left",
                }}
              >
                {column.header}
                {/* {column.description && (
                  <span className="tooltip">{column.description}</span>
                )} */}
              </th>
            ))}
            <th></th>
          </tr>
          <tr>
            <td colSpan={columns.length + 1} className="divider">
              <Divider />
            </td>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <React.Fragment key={index}>
              <tr
                onClick={() => {
                  row.collectionID && handleRowClick(row.collectionID);
                }}
              >
                {columns.map((column) => (
                  <React.Fragment key={column.key}>
                    {column.key === "createdAt" || column.key === "fileSize" ? (
                      <td key={column.key}>
                        {column.key === "createdAt"
                          ? formatTimestamp(row[column.key])
                          : row[column.key] === 0
                            ? null
                            : row[column.key]}
                      </td>
                    ) : column.key === "dealStatus" ? (
                      <td key={column.key}>
                        {row[column.key] === "complete" ? (
                          // Display icon based on deal status
                          <IconBase slug="icon-complete" />
                        ) : row[column.key] === "in-queue" ||
                          row[column.key] === "started" ? (
                          <IconBase slug="icon-queue" />
                        ) : (
                          <IconBase slug="icon-error" />
                        )}
                      </td>
                    ) : column.key === "filecoinDeal" ? (
                      <td key={column.key}>
                        {row["dealStatus"] === "complete"
                          ? dealIds[row.id]
                            ? dealIds[row.id]
                            : "Fetching..."
                          : null}
                      </td>
                    ) : column.key === "action" ? (
                      <td key={column.key}>
                        <IconBase
                          slug="icon-delete"
                          onClick={() => {
                            hookUserApi.deleteAPI(row["keyID"]);
                          }}
                        />
                      </td>
                    ) : column.key == "lastUsed" ? (
                      <td key={column.key}>
                        {formatTimestamp(row[column.key])}
                      </td>
                    ) : (
                      <td key={column.key}>{row[column.key]}</td>
                    )}
                  </React.Fragment>
                ))}
              </tr>

              <tr>
                <td colSpan={columns.length + 1} className="divider">
                  <Divider />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <FlexRow
        height="fit-content"
        hrAlign="space-between"
        paddingLeft="md"
        paddingRight="md"
        marginTop={"xs"}
      >
        <div>
          {startIndex + 1} - {endIndex > data.length ? data.length : endIndex}{" "}
          of {data.length} items
        </div>
        <FlexRow width="fit-content">
          <ButtonNative
            showShadow={false}
            paddingTop="12px"
            width="100px"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </ButtonNative>
          <FlexRow>{pageButtons}</FlexRow>
          <ButtonNative
            showShadow={false}
            paddingTop="12px"
            width="100px"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </ButtonNative>
        </FlexRow>
      </FlexRow>
    </FlexColumn>
  );
}
