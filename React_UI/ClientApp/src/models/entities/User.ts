import { IEntity } from "../Interfaces/IEntity";
import { Role } from "./Role";

export interface User extends IEntity{
  firstName: string;
  lastName: string;
  createDateTime: Date;
  updateDateTime: Date;
  roles: Array<Role>;
  email: string;
}
