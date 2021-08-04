import { Voice } from './../models/voice';
import { Products } from './../models/products';
import { Grocery } from '../models/grocery';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Users } from '../models/users';
import { Warehouse } from '../models/warehouse';
import { Reminders } from '../models/reminder';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly list: Users[] = [];
  baseUrl: string = "https://localhost:44356";

  showMessageGrocery = false;
  current_id_user: number;

  constructor(private httpClient: HttpClient) { }

  getGlobalId() {
    return this.current_id_user;
  }

  setGlobalId(id: number) {
    this.current_id_user = id;
  }

  getAllUsers(): Observable<Users[]> {
    const headers = new HttpHeaders({ '#token': `this.current_id_user` });
    return this.httpClient.get<Users[]>(`${this.baseUrl}/api/user/list`, { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  getGroceriesByUser(userId: number): Observable<Grocery[]> {
    const headers = new HttpHeaders({ '#token': `this.current_id_user` });
    return this.httpClient.get<Grocery[]>(`${this.baseUrl}/api/grocery/list/${userId}`, { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  getAllProducts(): Observable<Warehouse[]> {
    const headers = new HttpHeaders({ '#token': `this.current_id_user` });
    return this.httpClient.get<Warehouse[]>(`${this.baseUrl}/api/warehouse/list`, { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  getAllReminders(idr: number): Observable<Reminders[]> {
    const headers = new HttpHeaders({ '#token': `this.current_id_user` });
    return this.httpClient.get<Reminders[]>(`${this.baseUrl}/api/voice/reminder/${idr}`, { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errorMessage = error.error.message;
      return Observable.throw(errorMessage);
    }
    return Observable.throw(error || 'Server error')
  }

  addNewUser(newuser: Users) {
    console.log("Function addNewUser")
    return this.httpClient.post<Users>(`${this.baseUrl}/api/user/newuser`, newuser)
      .pipe(
        catchError(this.handleError)
      );
  }

  verifiedAccount(newuser: Users) {
    return this.httpClient.post<Users>(`${this.baseUrl}/api/user/verify`, newuser)
      .pipe(
        catchError(this.handleError)
      );
  }

  addProductToList(name: string, userid: number) {
    const headers = new HttpHeaders({ '#token': `this.current_id_user` });
    return this.httpClient.post<Products>(`${this.baseUrl}/api/grocery/add/${name}/${userid}`, "", { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  sendVoice(objv: string, userid: number) {
    this.showMessageGrocery = true;
    console.log("Voice Send to the BackEnd = " + objv)
    const headers = new HttpHeaders({ '#token': `this.current_id_user` });
    return this.httpClient.post<Voice>(`${this.baseUrl}/api/voice/send/${objv.toString()}/${userid}`, "", { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

}
