import { catchError } from 'rxjs/operators';
import { allAlbums } from './../mocks/albumsMock';
  
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Albums } from '../models/albums';
import { Songs } from '../models/songs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //private readonly albums: Albums[] = allAlbums;
  private readonly cart: Albums[] = [];

  baseUrl: string = "https://localhost:44341";
  constructor(private httpClient : HttpClient) { }

  getAllAlbums(): Observable<Albums[]>{
    return this.httpClient.get<Albums[]>(`${this.baseUrl}/api/Album/album/popularity`)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAlbumById(id : number): Observable<Albums>{
    var idalbum = id.toString();
    return this.httpClient.get<Albums>(`${this.baseUrl}/api/Album/album/detail/${idalbum}`)
    .pipe(
      catchError(this.handleError)
    )
  }
  
  private handleError(error : any){
    console.error('server error:',error);
    if(error.error instanceof Error){
      const errorMessage = error.error.message;
      return Observable.throw(errorMessage);
    }
    return Observable.throw(error || 'Server error')
  }

  addPurchases(purchasesAlbum: Albums){
    return this.httpClient.post<Albums>(`${this.baseUrl}/api/Album/album/detail/${purchasesAlbum.id}/buy`, "")
    .pipe(
      catchError(this.handleError)
    );
  }

  addPurchaseSong(purchase: Albums, songid : number){
    return this.httpClient.post<Albums>(`${this.baseUrl}/api/Album/album/detail/${purchase.id}/song/${songid}`, "")
      .pipe(
        catchError(this.handleError)
      );
  }

  getPurchasesList(): Observable<Albums[]>{
    return this.httpClient.get<Albums[]>(`${this.baseUrl}/api/Album/album/perfil`)
    .pipe(
      catchError(this.handleError)
    )
  }

  changeRating(albumSelected: Albums) {
    console.log(albumSelected.albumName)
    return this.httpClient.post<Albums>(`${this.baseUrl}/api/Album/album/detail/${albumSelected.id}/rating`, parseInt(albumSelected.rating.toString()))
      .pipe(
        catchError(this.handleError)
      );
  } 

}