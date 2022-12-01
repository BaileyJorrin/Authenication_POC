// Interfaces
import { protectedEndpoints } from "../../authConfig";
import { IDataApi } from "../interfaces/IDataApi";

class BaseDataApi implements IDataApi {
  public endpointName: string;
  public serverName: string;
  private prefix : string;

  constructor(endpointName: string) {
    this.endpointName = endpointName;
    this.serverName = protectedEndpoints.demoApi.endpoint ?? "";
    this.prefix = `${this.serverName}/api/${this.endpointName}`;
  }

  public getActive = async (): Promise<any> => {
    const response = await fetch(`${this.prefix}/GetActive`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("idToken")}`,
      },
    });
    const data = await response.json();
    return data;
  };

  public getAll = async (): Promise<any> => {
    const response = await fetch(`${this.prefix}/GetAll`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("idToken")}`,
      },
    });
    const data = await response.json();
    return data;
  };

  public getById = async (id: string): Promise<any> => {
    if (id === undefined || id === null || id === "") {return null;}
    const response = await fetch(`${this.prefix}/GetById/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("idToken")}`,
      },
    });
    const data = await response.json();
    return data;
  };

  public add = async (entity: any): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/Add/`, {
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

  public update = async (entity: any): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/Update/${entity.id}`, {
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

  public delete = async (entity: any): Promise<any> => {
    const response = await fetch(
      `${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/delete/${entity.id}`,
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

  public loadGrid(): Promise<any> {
    return this.getAll();
  }
}

export default BaseDataApi;
