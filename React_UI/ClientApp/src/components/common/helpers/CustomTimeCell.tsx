import moment from "moment";
import React from "react";

const CustomTimeCell = (props: any) => {
  if (props && props.dataItem) {
    return <td>{moment(props.dataItem[props.field]).format("ddd MM/DD/YYYY, hh:mm A")}</td>;
  }
  return null;
};
export default CustomTimeCell;