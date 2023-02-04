export interface IBaseModel{
  id: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdDate: Date;
  lastModifiedDate?: Date;
}
