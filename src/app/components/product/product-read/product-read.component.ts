import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  Produtos: Product[] = [];
  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() : void {
    this.productService.list().subscribe(
      res => this.Produtos = res
    )
  }

}
