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
          <PaginationLink href="#">{props.previous_page} </PaginationLink>
        </PaginationItem>
      )}
      <PaginationItem>
        <PaginationLink
          href="#"
          style={{ backgroundColor: "#28a745", color: "white" }}
        >
          {props.current_page}
        </PaginationLink>
      </PaginationItem>
      {props.has_next_page && (
        <PaginationItem>
          <PaginationLink href="#">{props.next_page}</PaginationLink>
        </PaginationItem>
      )}

      <PaginationItem>
        <PaginationLink next onClick={props.onPageNext} />
      </PaginationItem>
    </Pagination>
  );
};

export default pagination;
// import React from "react";
// import Pagination from "@mui/material/Pagination";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     display: "grid",
//     placeItems: "center",
//     marginTop: 10,
//   },
//   item: {
//     "& .Mui-selected": {
//       backgroundColor: "red",
//     },
//   },
// }));

// export default function PaginationRounded(props) {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Pagination
//         count={props.count}
//         color="primary"
//         shape="rounded"
//         // siblingCount={0}
//         page={props.page}
//         className={classes.item}
//         defaultPage={props.page}
//         onChange={props.onChange}
//       />
//     </div>
//   );
// }
