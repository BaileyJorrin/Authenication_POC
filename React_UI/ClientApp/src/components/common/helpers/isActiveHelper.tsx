import { GridCellProps } from "@progress/kendo-react-grid";

//Converts Status Column to Active/Inactive rather than True/False
export const isActiveCell = (props: GridCellProps) => {
  const isActive = props.dataItem.isActive;
  return isActive == true ? <td>Active</td> : <td>Inactive</td>;
};
