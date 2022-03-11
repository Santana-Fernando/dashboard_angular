import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    id: 0,
    name: '',
    price: null
  }

  constructor(private productService: ProductService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
    this.getProdutoPorId(id)
  }

  getProdutoPorId(id: string): void {
    this.productService.getById(id).subscribe((res) => {
      this.product = res
    })
  }

  removerProduto(): void {
    const id = this.activatedRoute.snapshot.params['id']

    this.productService.delete(id).subscribe(() => {
      this.productService.mostrarMensagem('Produto removido com sucesso', 'success')
      this.router.navigate(['/products'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/products'])
  }
  

}
