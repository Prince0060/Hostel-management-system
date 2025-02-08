import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseadminService {
  platformId = inject(PLATFORM_ID);
  baseUrl = environment.baseUrl;
  cookieKey = "";
  // baseUrl = 'https://localhost:60784/api/';
  headerWithoutKey = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  });
  constructor(private http: HttpClient) {
    this.cookieKey = localStorage.getItem("admintoken")!;
  }

  Getlist(url: string): Observable<any> {
    let _headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Authorization': `Bearer ${this.cookieKey}`
    });
    return this.http.get(this.baseUrl + url, { headers: _headers, withCredentials: true });
  }

  Postlist(url: string, data = ''): Observable<any> {
    let _headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieKey}`
    });
    const options = { headers: _headers, method: 'post', withCredentials: true };
    return this.http.post(this.baseUrl + url, data, options);
  }

  Putlist(url: string): Observable<any> {
    let _headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    if (isPlatformServer(this.platformId) && this.cookieKey.length > 0) {
      _headers = _headers.append('cookie', `CookieKey=${this.cookieKey}`);
    }
    const options = { headers: _headers, method: 'put', withCredentials: true };
    return this.http.put(this.baseUrl + url, '', options);
  }

  Deletelist(url: string): Observable<any> {
    let _headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    if (isPlatformServer(this.platformId) && this.cookieKey.length > 0) {
      _headers = _headers.append('cookie', `CookieKey=${this.cookieKey}`);
    }
    const options = { headers: _headers, method: 'delete', withCredentials: true };
    return this.http.delete(this.baseUrl + url, options);
  }
}
