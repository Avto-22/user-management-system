import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}


  // GET METHOD
  get<T = any>(path: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (Array.isArray(params[key])) {
          params[key].forEach((item: any) => {
            httpParams = httpParams.append(key, item);
          });
        } else if (params[key]) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http
      .get<T>(`${environment['baseUrl']}${path}`, {
        params: httpParams,
      })
      .pipe(catchError((err) => throwError(() => new Error(err))));
  }


  // POST METHOD
  post<T = any>(path: string, body: any, params?: any): Observable<T> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    return this.http
      .post<T>(`${environment['baseUrl']}${path}`, JSON.stringify(body), {
        ...options,
        params: httpParams,
      })
      .pipe(catchError((err) => throwError(() => new Error(err))));
  }

  
  // PUT METHOD
  put<T = any>(path: string, body: Object = {}, params?: any): Observable<T> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    return this.http
      .put<T>(`${environment['baseUrl']}${path}`, JSON.stringify(body), {
        ...options,
        params: httpParams,
      })
      .pipe(catchError((err) => throwError(() => new Error(err))));
  }


  // DELETE METHOD
  delete<T = any>(path: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: params,
      params: httpParams,
    };

    return this.http
      .delete<any>(`${environment['baseUrl']}${path}`, options)
      .pipe(catchError((err) => throwError(() => new Error(err))));
  }


  // UPLOAD METHOD
  upload<T = any>(path: string, body: any, params?: any): Observable<T> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http
      .post<T>(`${environment['baseUrl']}${path}`, body, {
        ...options,
        params: httpParams,
      })
      .pipe(catchError((err) => throwError(() => new Error(err))));
  }
}
