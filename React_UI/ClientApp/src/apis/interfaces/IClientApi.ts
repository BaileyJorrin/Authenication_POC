import { IDataApi } from "./IDataApi";

export interface IClientApi extends IDataApi{
  addWithValidations(entity: any): Promise<any>;
  updateWithValidations(entity:any) : Promise<any>;
  deleteWithValidations(entity:any) : Promise<any>;
};