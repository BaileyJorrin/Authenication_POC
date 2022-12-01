import { DataResult } from "@progress/kendo-data-query";
import * as React from "react";
import * as ReactDOM from "react-dom";
import ControlPointApi from "../../../../../apis/implementations/ControlPointApi";
import IControlPointApi from "../../../../../apis/interfaces/IControlPointApi";

interface ControlPointsLoaderProps{
  onDataReceived: (controlPoints: DataResult) => void;
  onError: () => void;
}

export const DataLoader = (props: ControlPointsLoaderProps) => {
  const controlPointApi: IControlPointApi = new ControlPointApi();

  const loading = React.useRef<string>("");

  const requestData = () => {
    if ( loading.current === "finished" ) {
      return;
    }
    loading.current = "loading";

    controlPointApi.getAll()
      .then((response) => {
        loading.current = "finished";
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