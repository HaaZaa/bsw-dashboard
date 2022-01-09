import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
const pagination = (props) => {
  return (
    <Pagination aria-label="Page navigation example" size="sm">
      <PaginationItem>
        <PaginationLink previous onClick={props.onPagePrevious} />
      </PaginationItem>
      {props.has_previous_page && (
        <PaginationItem>
          <PaginationLink style={{ cursor: "default" }}>
            {props.previous_page}
          </PaginationLink>
        </PaginationItem>
      )}
      <PaginationItem>
        <PaginationLink
          style={{
            backgroundColor: "#28a745",
            color: "white",
            cursor: "default",
          }}
        >
          {props.current_page}
        </PaginationLink>
      </PaginationItem>
      {props.has_next_page && (
        <PaginationItem>
          <PaginationLink style={{ cursor: "default" }}>
            {props.next_page}
          </PaginationLink>
        </PaginationItem>
      )}

      <PaginationItem>
        <PaginationLink next onClick={props.onPageNext} />
      </PaginationItem>
    </Pagination>
  );
};

export default pagination;
