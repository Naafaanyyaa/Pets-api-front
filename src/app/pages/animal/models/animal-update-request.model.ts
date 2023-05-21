import {AnimalTypeEnum} from "./animal-type.enum";

export interface AnimalUpdateRequestModel{
  animalName:string;
  animalDescription:string;
  animalType:AnimalTypeEnum
}
