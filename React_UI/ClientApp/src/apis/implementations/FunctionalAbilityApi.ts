import IFunctionalAbilityApi from "../interfaces/IFunctionalAbilityApi";
import BaseDataApi from "./BaseDataApi";

class FunctionalAbilityApi extends BaseDataApi implements IFunctionalAbilityApi {
  public endpointName = "FunctionalAbilities";

  constructor() {
    super("FunctionalAbilities");
  }

  public addWithValidations = async (entity: any): Promise<any> => {
    const response = await fetch(
      `${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/AddWithValidations`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("idToken")}`,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(entity), // body data type must match "Content-Type" header
      },
    );

    const data = await response.json();
    return data;
  };

  public deleteWithValidations = async (entity: any): Promise<any> => {
    const response = await fetch(
      `${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/DeleteWithValidations/${entity.id}`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("idToken")}`,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      },
    );

    const data = await response.json();
    return data;
  };

  public updateWithValidations = async (entity: any): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/UpdateWithValidations/${entity.id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("idToken")}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(entity), // body data type must match "Content-Type" header
    });

    const data = await response.json();
    return data;
  };

  public getByIdWithControlPoints = async (id: string): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/GetByIdWithControlPoints/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("idToken")}`,
      },
    });
    const data = await response.json();
    return data;
  };
}

export default FunctionalAbilityApi;