import { IEntity } from "../Interfaces/IEntity";
import { RoleFunctionalAbility } from "./RoleFunctionalAbility";

export interface Role extends IEntity{
  name: string;
  description: string;
  createDateTime: Date;
  updateDateTime: Date;
  roleFunctionalAbilities: Array<RoleFunctionalAbility>;
}
