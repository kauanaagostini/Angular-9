import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs'
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: Boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)))
  }

  readById(id: number | undefined): Observable<Product> {
    const urlId = `${this.baseUrl}/${id}`
    return this.http.get<Product>(urlId).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)))
  }

  update(product: Product): Observable<Product>{
    const urlId = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(urlId, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)))
  }

  delete(id: number | undefined) : Observable<Product> {
    const urlId = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(urlId).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)))
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true)
    return EMPTY
  }
}