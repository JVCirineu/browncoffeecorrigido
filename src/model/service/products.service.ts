import { Injectable } from '@angular/core';
import { localProducts } from '../data/mock-product';
import { HttpClient } from '@angular/common/http';
import { Iproduct } from './iproduct';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl  = 'http://localhost:8080/product';
   products:Iproduct[]=localProducts;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Iproduct[]>{
    return this.http.get<Iproduct[]>(this.apiUrl).pipe(
      catchError(error =>{
        console.error('erro ao buscar', error);
        return of(this.products);
      })
    );
  }
}
function of(products: Iproduct[]): any {
  throw new Error('Function not implemented.');
}

