import { ConfigurationItem } from "../../models/entities/ConfigurationItem";

export interface IConfigurationItemsApi {
  getByParentId(parentId: string): Promise<ConfigurationItem[]>;
}
