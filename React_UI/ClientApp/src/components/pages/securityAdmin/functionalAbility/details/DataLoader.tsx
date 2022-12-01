import * as React from "react";
import * as ReactDOM from "react-dom";
import ControlPointApi from "../../../../../apis/implementations/ControlPointApi";
import FunctionalAbilityApi from "../../../../../apis/implementations/FunctionalAbilityApi";
import IControlPointApi from "../../../../../apis/interfaces/IControlPointApi";
import IFunctionalAbilityApi from "../../../../../apis/interfaces/IFunctionalAbilityApi";
import { FunctionalAbility } from "../../../../../models/entities/FunctionalAbility";
import { createNewFunctionalAbility } from "../../../../../models/helpers/entityHelpers/functionalAbilityHelper";

interface FunctionalAbilityLoaderProps{
  id: string;
  onDataReceived: (functionalAbilty: FunctionalAbility) => void;
  onError: () => void;
}

export const DataLoader = (props: FunctionalAbilityLoaderProps) => {
  const functionalAbilityApi: IFunctionalAbilityApi = new FunctionalAbilityApi();
  const controlPointApi: IControlPointApi = new ControlPointApi();

  const loading = React.useRef<string>("");

  const requestData = () => {
    if ( loading.current === "finished" ) {
      return;
    }
    loading.current = "loading";

    if (props.id === "new") {
      controlPointApi.getAll()
        .then((response) => {
          loading.current = "finished";

          const fa = createNewFunctionalAbility();
          fa.functionalAbilityControlPoints = response.map((item: any) => {
            return {
              friendlyName: item.friendlyName,
              controlPoint_Id: item.id,
              canView: false,
              canAddUpdate: false,
              canExecute: false,
              canDelete: false,
            };
          });

          props.onDataReceived.call(undefined, fa);
        })
        .catch((error) => {
          props.onError();
        });
    } else {
      functionalAbilityApi.getByIdWithControlPoints(props.id)
        .then((response) => {
          loading.current = "finished";

          const fa = response;
          for (let i = 0; i < response.functionalAbilityControlPoints.length; i++) {
            fa.functionalAbilityControlPoints[i].friendlyName = response.functionalAbilityControlPoints[i].controlPoint.friendlyName;
          }

          props.onDataReceived.call(undefined, fa);
        })
        .catch((error) => {
          props.onError();
        });
    }

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