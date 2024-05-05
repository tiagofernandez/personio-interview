import { Typography } from "@highlight-ui/typography";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import * as React from "react";

const PageLink: React.FunctionComponent<{
  page?: number;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: Function;
}> = ({
  children,
  page,
  isActive = false,
  isDisabled = false,
  onClick = () => {},
}) => {
  return (
    <a
      className={[
        "p-2",
        isActive && "border-b-2 border-black",
        isDisabled ? "cursor-default opacity-50" : "cursor-pointer",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={(event) => {
        event.preventDefault();
        if (!isDisabled) {
          onClick(page);
        }
      }}
    >
      {children}
    </a>
  );
};

const Pagination: React.FunctionComponent<{
  end: number;
  itemsPerPage: number;
  setPage: Function;
  start: number;
  totalItems: number;
}> = ({ end, itemsPerPage, setPage, start, totalItems }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-between px-8 py-4">
      <Typography color="text-subdued" className="p-2">
        Showing {start} to {end} of {totalItems} results
      </Typography>

      <Typography color="text-subdued" className="flex" component="div">
        <PageLink
          isDisabled={currentPage === 1}
          onClick={() => {
            const previousPage = currentPage - 1;
            setCurrentPage(previousPage);
            setPage(previousPage);
          }}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </PageLink>

        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <PageLink
              key={page}
              page={page}
              isActive={currentPage === page}
              onClick={(page: number) => {
                setCurrentPage(page);
                setPage(page);
              }}
            >
              {page}
            </PageLink>
          );
        })}

        <PageLink
          isDisabled={currentPage === totalPages}
          onClick={() => {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            setPage(nextPage);
          }}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </PageLink>
      </Typography>
    </div>
  );
};

export default Pagination;
