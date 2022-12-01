import { createBaseEntity } from "./entityHelper";

export const createNewUser = () => {
  return {
    ...createBaseEntity(),
    firstName: "",
    lastName: "",
    updateUser: "",
    roles: [],
    email: "",
  };
};