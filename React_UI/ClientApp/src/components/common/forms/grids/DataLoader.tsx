import { DataResult } from "@progress/kendo-data-query";
import * as React from "react";
import * as ReactDOM from "react-dom";
import IDataApi from "../../../../apis/interfaces/IDataApi";
import { IEntity } from "../../../../models/Interfaces/IEntity";

interface DataLoaderProps{
  onDataReceived: (gridData: DataResult) => void;
  onError: () => void;
  dataApi: Promise<any>;
}

export const DataLoader = (props: DataLoaderProps) => {
  const dataRetrivalApi = props.dataApi;

  const loading = React.useRef<string>("");

  const requestData = () => {
    if ( loading.current === "finished" ) {
      return;
    }
    loading.current = "loading";
    dataRetrivalApi
      .then((response) => {
        loading.current = "finished";

        response.forEach((r: IEntity) => {
          r.createDateTime = new Date(r.createDateTime || "1/1/1900");
          r.createDateTime.setHours(0, 0, 0, 0);
          r.updateDateTime = new Date(r.updateDateTime || "1/1/1900");
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