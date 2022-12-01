const CustomBooleanCell = (props: any) => {
  if (props && props.dataItem) {
    return (
      <td>
        {props.dataItem[props.field] ? (
          "Active"
        ) : (
          "Inactive"
        )}
      </td>
    );
  }
  return null;
};

export default CustomBooleanCell;
