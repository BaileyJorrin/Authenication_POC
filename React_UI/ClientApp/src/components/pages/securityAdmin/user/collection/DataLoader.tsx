import { DataResult } from "@progress/kendo-data-query";
import * as React from "react";
import * as ReactDOM from "react-dom";
import UserApi from "../../../../../apis/implementations/UserApi";
import IUserApi from "../../../../../apis/interfaces/IUserApi";
import { User } from "../../../../../models/entities/User";

interface UserLoaderProps{
  onDataReceived: (Users: DataResult) => void;
  onError: () => void;
}

export const DataLoader = (props: UserLoaderProps) => {
  const userApi: IUserApi = new UserApi();

  const loading = React.useRef<string>("");

  const requestData = () => {
    if ( loading.current === "finished" ) {
      return;
    }
    loading.current = "loading";
    userApi.getAll()
      .then((response) => {
        loading.current = "finished";

        response.forEach((r: User) => {
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
        console.log(error);
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