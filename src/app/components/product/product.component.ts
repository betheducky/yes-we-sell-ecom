import { Component, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input() product!: Product;
  @Output() deleteProduct = new EventEmitter<Product>();
  @Output() buyProduct = new EventEmitter<Product>();

  removeSelected() {
    this.deleteProduct.emit(this.product);
  }

  simulatePurchase() {
    this.buyProduct.emit(this.product);
  }
}
