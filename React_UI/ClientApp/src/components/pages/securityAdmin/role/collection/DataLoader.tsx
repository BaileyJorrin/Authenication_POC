import { DataResult } from "@progress/kendo-data-query";
import * as React from "react";
import * as ReactDOM from "react-dom";
import RoleApi from "../../../../../apis/implementations/RoleApi";
import IRoleApi from "../../../../../apis/interfaces/IRoleApi";
import { Role } from "../../../../../models/entities/Role";

interface RoleLoaderProps{
  onDataReceived: (roles: DataResult) => void;
  onError: () => void;
}

export const DataLoader = (props: RoleLoaderProps) => {
  const roleApi: IRoleApi = new RoleApi();

  const loading = React.useRef<string>("");

  const requestData = () => {
    if ( loading.current === "finished" ) {
      return;
    }
    loading.current = "loading";
    roleApi.getAll()
      .then((response) => {
        loading.current = "finished";

        response.forEach((r: Role) => {
          r.createDateTime = new Date(r.createDateTime);
          r.createDateTime.setHours(0, 0, 0, 0);
          r.updateDateTime = new Date(r.updateDateTime);
          r.updateDateTime.setHours(0, 0, 0, 0);
        });

        props.onDataReceived.call(undefined, {
          data: response,
          total: response.length,
        });
      })
      .catch((error) => {
        props.onError();
      });
  };

  requestData();

  return loading.current === "loading" ? <LoadingPanel /> : null;
};

const LoadingPanel = () => {
  const loadingPanel = (
    <div className="k-loading-mask">
      <span className="k-loading-text">Loading</span>
      <div className="k-loading-image" />
      <div className="k-loading-color" />
    </div>
  );

  const gridContent = document && document.querySelector(".k-grid-content");
  return gridContent
    ? ReactDOM.createPortal(loadingPanel, gridContent)
    : loadingPanel;
};