import moment from "moment";

const CustomDateCell = (props: any) => {
  if (props && props.dataItem && props.dataItem[props.field]) {

    const displayDate = moment(props.dataItem[props.field]).format("MM/DD/YYYY");

    if (displayDate == "Invalid date") {
      return <td>{props.dataItem[props.field]}</td>;
    } else {
      return <td>{displayDate}</td>;
    }
  }
  return <td></td>;
};
export default CustomDateCell;
