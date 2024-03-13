import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User';
const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  strictSSL: false
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url ='https://localhost:7029/api/users';

  constructor(private http:HttpClient) {}
  GetAll():Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }
  GetById(id: number):Observable<User>{
    const apiUrl = `${this.url}/${id}`
    return this.http.get<User>(apiUrl);
  }
  PostUser(user: User): Observable<any>{
    return this.http.post<User>(this.url, user, httpOptions);
  }
  PutUser(id: number, user: User): Observable<any> {
    const apiUrl = `${this.url}/${id}`; 
    return this.http.put<User>(apiUrl, user, httpOptions);
  }
  DeleteUser(id: number):Observable<any>{
    const apiUrl= `${this.url}/${id}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
