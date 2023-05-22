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
import {DiseaseResponseModel} from "../models/disease-response.model";
import {DiseaseRequestModel} from "../models/disease-request.model";


@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  private readonly api = environment.urlAddress;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  getDiseaseList(animalId: string): Observable<DiseaseResponseModel[]> {
    return this.http.get<DiseaseResponseModel[]>(`${this.api}/api/Disease/GetDiseaseList/${animalId}`);
  }
  deleteDiseaseById(id:string):Observable<void>{
    return this.http.delete<void>(`${this.api}/api/Disease/DeleteDisease/${id}`)
  }

  addDisease(request: DiseaseRequestModel, animalId:string): Observable<DiseaseResponseModel>{
    const body = {nameOfDisease: request.nameOfDisease, diseaseDescription: request.diseaseDescription, recommendations:request.recommendations}
    return this.http.post<DiseaseResponseModel>(`${this.api}/api/Disease/AddDisease/${animalId}`, body);
  }
  updateDisease(request:DiseaseRequestModel, animalId: string):Observable<DiseaseResponseModel>{
    const body = {nameOfDisease: request.nameOfDisease, diseaseDescription: request.diseaseDescription, recommendations:request.recommendations}
    return this.http.put<DiseaseResponseModel>(`${this.api}/api/Disease/UpdateDisease/${animalId}`, body)
  }
}
