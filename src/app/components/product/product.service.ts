import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { catchError, Observable, map, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baserUrl = 'http://localhost:3001/products';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  mostrarMensagem(text: string, classe: 'success' | 'error' | 'warning'): void {
    this.snackBar.open(text, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [classe]
    })
  }

  create(produto: Product): Observable<Product> {
    return this.http.post<Product>(this.baserUrl, produto).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baserUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(this.baserUrl + '/' + id).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(id: string, produto: Product): Observable<Product> {
    return this.http.put<Product>(this.baserUrl + '/' + id, produto).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: string):Observable<Product> {
    return this.http.delete<Product>(this.baserUrl + '/' + id).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.mostrarMensagem("Ocorreu um erro: " + e.statusText, 'error')
    return EMPTY
  }

}
