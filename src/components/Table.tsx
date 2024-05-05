import * as React from "react";
import { Tag } from "@highlight-ui/tag";
import { Table as DSTable } from "@highlight-ui/table";
import { ApplicationResponse, Status } from "../useApplications";
import { calculateAge } from "../utils";
import Pagination from "./Pagination";

const STATUS_COLOR: Record<Status, string> = {
  approved: "#e3fcef",
  rejected: "#ffebe6",
  waiting: "#fffae6",
};

const Table: React.FunctionComponent<{
  data: ApplicationResponse[];
}> = ({ data }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const start = indexOfFirstItem + 1;
  const end = Math.min(indexOfLastItem, data.length);

  const setPage = (page: number) => setCurrentPage(page);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <>
      <Pagination
        end={end}
        itemsPerPage={itemsPerPage}
        start={start}
        totalItems={data.length}
        setPage={setPage}
      />
      <DSTable
        columns={[
          {
            key: "name",
            label: "Name",
          },
          {
            key: "email",
            label: "E-Mail Address",
          },
          {
            key: "birth_date",
            label: "Age",
            renderTd: ({ columnIndex, rowIndex, content }) => (
              <td key={`${columnIndex}-${rowIndex}`}>
                {calculateAge(content)}
              </td>
            ),
          },
          {
            key: "position_applied",
            label: "Position Applied",
          },
          {
            key: "application_date",
            label: "Application Date",
          },
          {
            key: "year_of_experience",
            label: "Years of Experience",
          },
          {
            key: "status",
            label: "Status",
            renderTd: ({ columnIndex, rowIndex, content }) => (
              <td key={`${columnIndex}-${rowIndex}`}>
                <Tag
                  text={content}
                  backgroundColor={STATUS_COLOR[content as Status]}
                />
              </td>
            ),
          },
        ]}
        data={currentItems}
      />
    </>
  );
};

export default Table;
