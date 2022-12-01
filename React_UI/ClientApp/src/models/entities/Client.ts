import { IEntity } from "../Interfaces/IEntity";

export interface Client extends IEntity {
  id:string;
  name: string;
  createDateTime: Date;
  updateDateTime: Date;
  isActive: boolean;
  createUser?: string;
  clientPrefix: string;
}
