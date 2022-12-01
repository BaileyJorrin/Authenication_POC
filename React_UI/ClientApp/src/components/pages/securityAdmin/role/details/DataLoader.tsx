import { PropaneOutlined } from "@mui/icons-material";
import * as React from "react";
import ReactDOM from "react-dom";
import FunctionalAbilityApi from "../../../../../apis/implementations/FunctionalAbilityApi";
import RoleApi from "../../../../../apis/implementations/RoleApi";
import IFunctionalAbilityApi from "../../../../../apis/interfaces/IFunctionalAbilityApi";
import IRoleApi from "../../../../../apis/interfaces/IRoleApi";
import { Role } from "../../../../../models/entities/Role";
import { createNewRole } from "../../../../../models/helpers/entityHelpers/roleHelper";

interface RoleLoaderProps{
  id: string;
  onDataReceived: (role: Role) => void;
  onError: () => void;
}

export const DataLoader = (props: RoleLoaderProps) => {
  const roleApi: IRoleApi = new RoleApi();
  const functionalAbilityApi: IFunctionalAbilityApi = new FunctionalAbilityApi();

  const loading = React.useRef<string>("");

  const requestData = () => {
    if (loading.current === "finished") {
      return;
    }
    loading.current = "loading";

    if (props.id === undefined) {
      functionalAbilityApi.getAll()
        .then((response) => {
          loading.current = "finished";

          const role = createNewRole();
          role.roleFunctionalAbilities = response.map((item: any) => {
            return {
              functionalAbility_Id: item.id,
              name: item.name,
              selected: false,
            };
          });

          props.onDataReceived.call(undefined, role);
        })
        .catch((error) => {
          props.onError();
        });

    } else {
      roleApi.getAllWithAssignedFunctionalAbilities(props.id)
        .then((response) => {
          loading.current = "finished";

          props.onDataReceived.call(undefined, response);
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