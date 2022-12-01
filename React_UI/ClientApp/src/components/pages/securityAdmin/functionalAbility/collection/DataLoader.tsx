import { DataResult } from "@progress/kendo-data-query";
import * as React from "react";
import * as ReactDOM from "react-dom";
import FunctionalAbilityApi from "../../../../../apis/implementations/FunctionalAbilityApi";
import IFunctionalAbilityApi from "../../../../../apis/interfaces/IFunctionalAbilityApi";
import { FunctionalAbility } from "../../../../../models/entities/FunctionalAbility";

interface FunctionalAbilitiesLoaderProps{
  onDataReceived: (functionalAbilities: DataResult) => void;
  onError: () => void;
}

export const DataLoader = (props: FunctionalAbilitiesLoaderProps) => {
  const functionalAbilityApi: IFunctionalAbilityApi = new FunctionalAbilityApi();

  const loading = React.useRef<string>("");

  const requestData = () => {
    if ( loading.current === "finished" ) {
      return;
    }
    loading.current = "loading";
    functionalAbilityApi.getAll()
      .then((response) => {
        loading.current = "finished";

        response.forEach((fa: FunctionalAbility) => {
          fa.createDateTime = new Date(fa.createDateTime);
          fa.createDateTime.setHours(0, 0, 0, 0);
          fa.updateDateTime = new Date(fa.updateDateTime);
          fa.updateDateTime.setHours(0, 0, 0, 0);
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