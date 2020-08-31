import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  httpOptions: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient) { }

  public restGet(controller: string): Observable<any> {

    return this.http.get(environment.apiUrl + controller, this.httpOptions)
      .pipe(
        catchError(this.restError)
      );
  }

  public restGetId(id: number, controller: string): Observable<any> {

    return this.http.get(environment.apiUrl + controller + '/' + id, this.httpOptions)
      .pipe(
        catchError(this.restError)
      );
  }

  public restPost(data, controller): Observable<any> {
    
    let body = new URLSearchParams();
    for (var clave in data) {
      body.set(clave, data[clave]);
    }

    return this.http.post(environment.apiUrl + controller, body.toString(), this.httpOptions)
      .pipe(
        catchError(this.restError)
      )
  }

  public restPut(id, data, controller): Observable<any> {

    let body = new URLSearchParams();
    for (var clave in data) {
      body.set(clave, data[clave]);
    }

    return this.http.put(environment.apiUrl + controller + '/'+ id, body.toString(), this.httpOptions)
      .pipe(
        catchError(this.restError)
      )
  }

  public restDelete(id, controller): Observable<any> {
    return this.http.delete(environment.apiUrl + controller + '/' + id, this.httpOptions)
    .pipe(
      catchError(this.restError)
    )
  }

  public restError(error: HttpErrorResponse) {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
