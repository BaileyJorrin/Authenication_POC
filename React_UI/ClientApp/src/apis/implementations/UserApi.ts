import { protectedEndpoints } from "../../authConfig";
import IUserApi from "../interfaces/IUserApi";
import BaseDataApi from "./BaseDataApi";


class UserApi extends BaseDataApi implements IUserApi {
  public endpointName = "Users";

  constructor() {
    super("Users");
  }

  public getAll = async (): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/getAll`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("idToken")}`,
      },
    });
    const data = await response.json();
    return data;
  };

  public getByIdWithDetails = async (id: string): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/GetByIdWithDetails/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("idToken")}`,
      },
    });
    const data = await response.json();
    return data;
  };

  public updateWithValidations= async (entity: any): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/UpdateWithValidations/${entity.id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
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

  public retrievePermissions = async (userName: string): Promise<any> => {
    const serverName :string = protectedEndpoints.demoApi.endpoint ?? "";
    const urlprefix: string = serverName + "/api/Users/GetUserPermissions?userName=" + userName;

    const response = await fetch(urlprefix, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("idToken")}`,
      },
    });
    const data = await response.json();
    return data;
  };

  public retrieveRoles = async (userName: string): Promise<any> => {
    const serverName :string = protectedEndpoints.demoApi.endpoint ?? "";
    const urlprefix: string = serverName + "/api/Users/GetUserRoles?userName=" + userName;

    const response = await fetch(urlprefix, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("idToken")}`,
      },
    });
    const data = await response.json();
    return data;
  };


  public loadGrid(): Promise<any> {
    return this.getAll();
  }
}

export default UserApi;