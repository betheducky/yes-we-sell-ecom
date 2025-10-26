import { Component, inject, OnInit } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';

export interface DialogData {
  id?: string;
  title: string;
  cost: number;
  description: string;
}

@Component({
  selector: 'app-storefront',
  standalone: true,
  imports: [ProductComponent, FormsModule, DialogModule],
  templateUrl: './storefront.component.html',
  styleUrl: './storefront.component.scss',
})
export class StorefrontComponent implements OnInit {
  products: Product[] = [];
  dialog = inject(Dialog);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  openAddNewProductDialog(): void {
    const dialogRef = this.dialog.open<DialogData>(AddNewProductDialog, {
      width: '30rem',
      height: '30rem',
      data: {
        title: 'New Product',
        cost: 0,
        description: 'Details as follow...',
      },
    });
    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.productService.addProduct(result);
        this.loadInventory();
      } else {
        console.log('Dialog closed; no product created.');
      }
    });
  }

  loadInventory() {
    this.products = this.productService.getProducts();
    
  }

  handleClearInventory(): void {
    if (this.products.length === 0) {
      window.alert("You can't clear the shelves if they're already empty...");
      return;
    } else {
      const dialogRef = this.dialog.open(ConfirmClearDialog, {
        width: '30rem',
        height: '30rem',
        data: { productCount: this.products.length },
      });

      dialogRef.closed.subscribe((result) => {
        if (result) {
          this.productService.clearAllProducts();
          this.loadInventory();
          window.alert('Welp, the shelves are empty...time for lunch??');
        } else {
          window.alert(
            `Clear Inventory process aborted; your product count of ${this.products.length} remains`
          );
        }
      });
    }
  }

  handleDeleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '30rem',
      height: '30rem',
      data: { ...product },
    });
    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(product.id);
        this.loadInventory();
      } else {
        console.log('Cancel process aborted; no product deleted.');
      }
    });
  }

  handleBuyProduct(product: Product): void {
    window.alert(`${product.title} as been purchased for $${product.cost}. No refunds!`);
  }
}

// Dialog Components

@Component({
  selector: 'add-new-product-dialog',
  standalone: true,
  templateUrl: '../../dialogs/add-new-product-dialog.html',
  styleUrl: '../../dialogs/add-new-product-dialog.scss',
  imports: [FormsModule],
})
export class AddNewProductDialog {
  dialogRef = inject<DialogRef<DialogData>>(DialogRef<DialogData>);
  data = inject(DIALOG_DATA);
}

@Component({
  selector: 'confirm-delete-dialog',
  standalone: true,
  templateUrl: '../../dialogs/confirm-delete-dialog.html',
  styleUrl: '../../dialogs/confirm-delete-dialog.scss',
  imports: [],
})
export class ConfirmDeleteDialog {
  dialogRef = inject<DialogRef>(DialogRef);
  data = inject(DIALOG_DATA);
}

@Component({
  selector: 'confirm-clear-dialog',
  standalone: true,
  templateUrl: '../../dialogs/confirm-clear-dialog.html',
  styleUrl: '../../dialogs/confirm-clear-dialog.scss',
  imports: [],
})
export class ConfirmClearDialog {
  dialogRef = inject<DialogRef>(DialogRef);
  data = inject(DIALOG_DATA);
}
