import { GridColumnMenuFilterUIProps } from "@progress/kendo-react-grid";
import * as React from "react";


export const CustomFilterUI = (props: GridColumnMenuFilterUIProps) => {
  const onChange = (event:any) => {
    const value = event.target.value === "null" ? null : event.target.value === "true";
    const { firstFilterProps } = props;

    firstFilterProps.onChange({
      value,
      operator: "eq",
      syntheticEvent: event.syntheticEvent,
    });
  };

  const { firstFilterProps } = props;
  const value = firstFilterProps.value;

  return (
    <div>
      <input
        id="bool-null"
        name="boolean"
        type="radio"
        value="null"
        checked={value === null}
        onChange={onChange}
      />
      <label htmlFor="bool-null">&nbsp;not set</label>
      <br />
      <input
        id="bool-true"
        name="boolean"
        type="radio"
        value="true"
        checked={value === true}
        onChange={onChange}
      />
      <label htmlFor="bool-true">&nbsp;true</label>
      <br />
      <input
        id="bool-false"
        name="boolean"
        type="radio"
        value="false"
        checked={value === false}
        onChange={onChange}
      />
      <label htmlFor="bool-false">&nbsp;false</label>
    </div>
  );
};