import { ConfigurationItem } from "../../models/entities/ConfigurationItem";
import { IConfigurationItemsApi } from "../interfaces/IConfigurationItemsApi";

export default class ConfigurationItemApi implements IConfigurationItemsApi {
  private endpointName = "ConfigurationItem";

  async getByParentId(parentId: string): Promise<ConfigurationItem[]> {
    const response = await fetch(`${process.env.REACT_APP_API_STRING}/api/${this.endpointName}/GetByParentId/${parentId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("idToken")}`,
      },
    });
    const data = await response.json();
    return data;
  }
}