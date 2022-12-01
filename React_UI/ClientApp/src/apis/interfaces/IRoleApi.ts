import { IDataApi } from "./IDataApi";

interface IRoleApi extends IDataApi{
  addWithValidations(entity: any): Promise<any>;
  getAllWithAssignedFunctionalAbilities(id: string): Promise<any>;
  updateWithValidations(entity:any) : Promise<any>;
  deleteWithValidations(entity:any) : Promise<any>;
};

export default IRoleApi;