import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }

  private storageKey: string = 'productData';

  getProducts(): Product[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addProduct(product: Omit<Product, 'id'>): Product {
    const imgSrc = 'assets/test-img.jpg';
    const newProduct = {...product, id: uuidv4(), img: imgSrc};
    const products = this.getProducts();
    products.push(newProduct);

    localStorage.setItem(this.storageKey, JSON.stringify(products));
    return newProduct;
  }

  updateProduct(updatedProduct: Product): void {
    const products = this.getProducts().map(product => product.id === updatedProduct.id ? updatedProduct : product);

    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  deleteProduct(id: string): void {
    const products = this.getProducts().filter(product => product.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  clearAllProducts(): void {
    localStorage.removeItem(this.storageKey);
  }
}
