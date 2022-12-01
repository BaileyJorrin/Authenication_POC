import { IDataApi } from "./IDataApi";

interface IFunctionalAbilityApi extends IDataApi{
  addWithValidations(entity: any): Promise<any>;
  deleteWithValidations(entity: any): Promise<any>;
  getByIdWithControlPoints(id: string): Promise<any>;
  updateWithValidations(entity:any) : Promise<any>;
};

export default IFunctionalAbilityApi;