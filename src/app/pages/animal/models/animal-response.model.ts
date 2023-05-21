import {AnimalTypeEnum} from "./animal-type.enum";
import {AnimalPhotoModel} from "./animal-photo.model";

export interface AnimalResponseModel{
  id : string;
  animalName: string;
  animalDescription: string;
  animalType : AnimalTypeEnum;
  userId: string;
  photos?: AnimalPhotoModel[]
}
