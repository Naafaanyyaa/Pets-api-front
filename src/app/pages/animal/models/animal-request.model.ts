import {AnimalTypeEnum} from "./animal-type.enum";

export interface AnimalRequestModel{
  ClinicId: string;
  UserId: string;
  AnimalName: string;
  AnimalDescription: string;
  AnimalType: AnimalTypeEnum
}
