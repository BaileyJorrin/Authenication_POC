import { createBaseEntity } from "./entityHelper";

export const createNewRole = () => {
  return {
    ...createBaseEntity(),
    name: "",
    description: "",
    roleFunctionalAbilities: [],
  };
};