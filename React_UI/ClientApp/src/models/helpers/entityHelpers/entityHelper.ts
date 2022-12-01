import { useMsal } from "@azure/msal-react";

export const createBaseEntity = () => {
  return {
    id: "00000000-0000-0000-0000-000000000000",
    isActive: true,
    isDeleted: false,
    createDateTime: new Date(),
    updateDateTime: new Date(),
  };
};
