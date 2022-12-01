import { IEntity } from "../Interfaces/IEntity";

export interface FunctionalAbilityControlPoint extends IEntity {
  friendlyName: string;
  functionalAbility_Id: string;
  controlPoint_Id: string;
  canView: boolean;
  canAddUpdate: boolean;
  canDelete: boolean;
  canExecute: boolean;
}