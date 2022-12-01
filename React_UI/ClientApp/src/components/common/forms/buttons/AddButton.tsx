import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import RequriesAuthorization from "../../authorization/RequriesAuthorization";
import { PermissionList } from "../../enumerations/Permissions";

export interface IAddButtonProps {
  link?: string;
  title:string;
  handleOnClick?: () => void;
  controlPoint: string;
}

//TODO Change Color
function SecuredAddButton(props: IAddButtonProps): JSX.Element {
  return (
    <RequriesAuthorization controlPoint={props.controlPoint} permission={PermissionList.CAN_ADD} message="">
      <div className="flexAddButton">
        {props.link
          ?
          <Link to={props.link} >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#7b9e6b",
                color: "white",
                borderColor: "#646569",
                maxHeight: "30px",
                minWidth: "113px",
                left: "10%",
              }}
              onClick={props.handleOnClick}
            >
              {props.title}
            </Button>
          </Link>
          :
          <Button
            variant="contained"
            style={{
              backgroundColor: "#7b9e6b",
              color: "white",
              borderColor: "#646569",
              maxHeight: "30px",
              minWidth: "113px",
              left: "10%",
            }}
            onClick={props.handleOnClick}
          >
            {props.title}
          </Button>
        }

      </div>
    </RequriesAuthorization>
  );
}

export default SecuredAddButton;