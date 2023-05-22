import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {AnimalResponseModel} from "../models/animal-response.model";
import {AnimalRequestModel} from "../models/animal-request.model";
import {AnimalUpdateRequestModel} from "../models/animal-update-request.model";
import {ClinicResponseModel} from "../../clinic/models/ClinicResponse.model";
import {UserProfileModel} from "../../profile/models/user-profile.model";


@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private readonly api = environment.urlAddress;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  getAnimalList(searchingString?: string): Observable<AnimalResponseModel[]> {
    const queryParams = [];
    if (searchingString) {
      queryParams.push(`SearchString=${searchingString}`);
    }
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    return this.http.get<AnimalResponseModel[]>(`${this.api}/api/Animal/GetAnimalByRequest${queryString}`);
  }
  getAnimalById(id:string): Observable<AnimalResponseModel>{
    return this.http.get<AnimalResponseModel>(`${this.api}/api/Animal/${id}`)
  }
  deleteById(id:string):Observable<void>{
    return this.http.delete<void>(`${this.api}/api/Animal/DeleteById/${id}`)
  }

  addAnimal(request: AnimalRequestModel, photo?: File):Observable<AnimalResponseModel>{
    const formData = new FormData();
    formData.append('ClinicId', request.ClinicId ? request.ClinicId : "");
    formData.append('UserId', request.UserId);
    formData.append('AnimalName', request.AnimalName);
    formData.append('AnimalDescription', request.AnimalDescription);
    formData.append('AnimalType', request.AnimalType.toString());
    formData.append('photo', photo ? photo : "");

    return this.http.post<AnimalResponseModel>(`${this.api}/api/Animal/CreateAnimal`, formData);
  }
  updateAnimal(request:AnimalUpdateRequestModel, animalId: string):Observable<AnimalResponseModel>{
    const body = {animalName:request.animalName, animalDescription:request.animalDescription, animalType:request.animalType}
    return this.http.put<AnimalResponseModel>(`${this.api}/api/Animal/UpdateById/${animalId}`, body)
  }

  getUserByUserName(userName: string):Observable<UserProfileModel>{
    return this.http.get<UserProfileModel>(`${this.api}/api/Admin/GetUserByUserName/${userName}`)
  }
}
