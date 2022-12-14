import { IDataApi } from "./IDataApi";

interface IUserApi extends IDataApi{
  getByIdWithDetails(entity:any) : Promise<any>;
  updateWithValidations(entity: any) : Promise<any>;
  getAll() : Promise<any>;
};

export default IUserApi;