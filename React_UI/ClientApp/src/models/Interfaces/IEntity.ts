export interface IEntity {
  id: string;
  isActive: boolean;
  isDeleted: boolean;
  createDateTime?: Date | undefined;
  updateDateTime?: Date | undefined;
  createUser?: string | undefined;
  updateUser?: string | undefined;
}
