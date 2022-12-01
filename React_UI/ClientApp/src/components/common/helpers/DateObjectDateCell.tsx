//KENDO NEEDS A DATA OBJECT TO RUN IT'S NATIVE FILTER. THE SORTING WORKS THE FILTER DOES NOT UNESS IT HAS A DATE OBJECT
//can't figure it out.

import { GridCell } from "@progress/kendo-react-grid";

const CorrectCustomDateCell = (props: any) => {

  if (props && props.dataItem) {


    // var correctDate:any = new Date((props.dataItem[props.field]));

    return (

      <GridCell
        {...props} // This should be the Data we are processing
        field={props.field} // It wants the STRING NAME of the data field we are looking for. and the value found under that needs to be a Date object This is why I was storing Dates in Redux because there is no way to do it without directly providing a data source that has Dates instead of JSON.
        filter="date"
        format="{0:d}" />);
  }

};
export default CorrectCustomDateCell;
