import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http:HttpClient) {

   }
   addProduct(data:any){
     return this.http.post(`http://localhost:3000/addProperties`,data)
   }
   uploadFiles(files:any){
    return this.http.post(`http://localhost:3000/img/upload`,files)
   }
   getProducts(query:string){
    return this.http.get(`http://localhost:3000/getProperties/${query}`)
   }
}
