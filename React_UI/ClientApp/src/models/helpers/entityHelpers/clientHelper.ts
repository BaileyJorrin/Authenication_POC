import { createBaseEntity } from "./entityHelper";

export const createNewClient = () => {
  return {
    ...createBaseEntity(),
    name: "",
    createUser: "",
    updateUser: "",
    clientPrefix: "",
  };
};