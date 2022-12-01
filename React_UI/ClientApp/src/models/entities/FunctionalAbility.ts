import { IEntity } from "../Interfaces/IEntity";
import { FunctionalAbilityControlPoint } from "./FunctionalAbilityControlPoint";

export interface FunctionalAbility extends IEntity{
  name: string;
  description: string;
  createDateTime: Date;
  updateDateTime: Date;
  functionalAbilityControlPoints: Array<FunctionalAbilityControlPoint>;
}
