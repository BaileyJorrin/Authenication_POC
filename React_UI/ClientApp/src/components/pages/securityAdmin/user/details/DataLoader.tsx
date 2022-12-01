import * as React from "react";
import ReactDOM from "react-dom";
import RoleApi from "../../../../../apis/implementations/RoleApi";
import UserApi from "../../../../../apis/implementations/UserApi";
import IRoleApi from "../../../../../apis/interfaces/IRoleApi";
import IUserApi from "../../../../../apis/interfaces/IUserApi";
import { User } from "../../../../../models/entities/user";

interface UserLoaderProps {
  id: string;
  onDataReceived: (user: User) => void;
  onError: () => void;
}

export const DataLoader = (props: UserLoaderProps) => {
  const userApi: IUserApi = new UserApi();
  const roleApi: IRoleApi = new RoleApi();

  const loading = React.useRef<string>("");

  const requestData = () => {
    if (loading.current === "finished") {
      return;
    }
    loading.current = "loading";

    userApi
      .getByIdWithDetails(props.id)
      .then((response) => {
        loading.current = "finished";

        props.onDataReceived.call(undefined, response);
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
