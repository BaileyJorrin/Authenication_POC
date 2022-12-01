import IImportEngineApi from "../interfaces/IControlPointApi";
import BaseDataApi from "./BaseDataApi";

class ImportEngineApi extends BaseDataApi implements IImportEngineApi {
  constructor() {
    super("ImportEngine");
  }

  public endpointName = "ImportJobs";

  getAllUnimportedJobs = async (): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/GetAllUnimportedJobs/`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("idToken")}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    const data = await response.json();
    return data;
  };

  public importAllJobs = async (): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/ImportAllJobs/`, {
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
      body: JSON.stringify(""), // body data type must match "Content-Type" header
    });

    const data = await response.json();
    return data;
  };

  public importJob = async (fileName: string): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/ImportJob/${fileName}`, {
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
      body: JSON.stringify(fileName), // body data type must match "Content-Type" header
    });

    const data = await response.json();
    return data;
  };
}

export default ImportEngineApi;