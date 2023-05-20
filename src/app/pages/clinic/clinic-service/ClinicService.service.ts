import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {ClinicResponseModel} from "../models/ClinicResponse.model";
import {ClinicRequestBodyModel} from "../models/ClinicRequestBody.model";
import {RegistrationRequestModel} from "../../../models/registrationRequestModel.interface";
import {IUserResponse} from "../../../models/IUserResponseModel.interface";

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private readonly api = environment.urlAddress;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  banClinic(clinicId: string): Observable<ClinicResponseModel> {
    return this.http.patch<ClinicResponseModel>(`${this.api}/api/Admin/BanClinic/${clinicId}`, null);
  }
  getClinicList(searchingString?: string): Observable<ClinicResponseModel[]> {
    const queryParams = [];
    if (searchingString) {
      queryParams.push(`SearchString=${searchingString}`);
    }
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    return this.http.get<ClinicResponseModel[]>(`${this.api}/api/Clinic/GetClinicByRequest${queryString}`);
  }
  getClinicById(id: string): Observable<ClinicResponseModel>{
    return this.http.get<ClinicResponseModel>(`${this.api}/api/Clinic/GetClinicById/${id}`)
  }
  addClinic(clinicData: ClinicRequestBodyModel): Observable<ClinicResponseModel>{
    const body = {name: clinicData.name, address: clinicData.address, description: clinicData.description, phone: clinicData.phone}
    return this.http.post<ClinicResponseModel>(`${this.api}/api/Clinic/Add`, body);
  }
  deleteClinic(clinicId: string): void{
    this.http.delete(`${this.api}/api/Clinic/Delete/${clinicId}`)
  }
  updateClinic(clinicData: ClinicRequestBodyModel, clinicId: string): Observable<ClinicResponseModel>{
    const body = {name: clinicData.name, address: clinicData.address, description: clinicData.description, phone: clinicData.phone}
    return this.http.put<ClinicResponseModel>(`${this.api}/api/Clinic/Update/${clinicId}`, body);
  }
  createDoctor(doctorData: RegistrationRequestModel, clinicId: string): Observable<IUserResponse>{
    const body = {firstname: doctorData.Firstname, lastname: doctorData.Lastname, userName: doctorData.UserName, email: doctorData.Email, password: doctorData.Password}
    return this.http.post<IUserResponse>(`${this.api}/api/Clinic/CreateDoctor/${clinicId}`, body)
  }
}
