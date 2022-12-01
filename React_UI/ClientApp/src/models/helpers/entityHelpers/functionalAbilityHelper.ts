import { createBaseEntity } from "./entityHelper";

export const createNewFunctionalAbility = () => {
  return {
    ...createBaseEntity(),
    name: "",
    description: "",
    createUser: undefined,
    updateUser: undefined,
    functionalAbilityControlPoints: [],
  };
};