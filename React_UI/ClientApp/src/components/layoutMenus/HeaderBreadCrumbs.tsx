import { Button, createTheme } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { withRouter } from "react-router-dom";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

function CapatalizeFirstWordsOfStringAndSeparateDashes(string:string) {
  const arr = string.split("-");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  const newString = arr.join(" ");
  return newString;
}

const HeaderBreadcrumbsComponent = (props:any) => {
  const {
    history,
    location: { pathname },
  } = props;

  //This Guid Filters Out GUIDS
  const pathnames = pathname
    .split("/")
    .filter(
      (x:any) =>
        !/(\{){0,1}[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(\}){0,1}/.test(
          x,
        ),
    )
    .filter((x:any) => x)
    .filter((x:any) => x != "new");

  return (
    <div
      style={{
        display: "block",
        width: "30",
        padding: 15,
      }}
    >
      <Breadcrumbs>

        <Button
          sx={{ color: "#cac8c8" }}
          onClick={() => history.push("/")}
        >
          {"Home"}
        </Button>

        {pathnames.map((name:string, index:any) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const textColor = index + 1 == pathnames.length ? "lightBlue" : "#cac8c8";
          return (
            <Button
              sx={{ color: textColor }}
              onClick={() => history.push(routeTo)}
              key={name}
            >
              {CapatalizeFirstWordsOfStringAndSeparateDashes(name)}
            </Button>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};
export default withRouter(HeaderBreadcrumbsComponent);
