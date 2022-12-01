export interface IDataApi {
  endpointName: string;

  add(entity: any): Promise<any>;
  delete(entity: any): Promise<any>;
  getActive(): Promise<any>;
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  update(entity: any): Promise<any>;

  loadGrid(): Promise<any>;
};

export default IDataApi;