import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

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

  atualizarProduto(): void {
    const id = this.activatedRoute.snapshot.params['id']

    this.productService.update(id, this.product).subscribe(() => {
      this.productService.mostrarMensagem('Produto Removido com sucesso', 'success')
      this.router.navigate(['/products'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/products'])
  }
}
