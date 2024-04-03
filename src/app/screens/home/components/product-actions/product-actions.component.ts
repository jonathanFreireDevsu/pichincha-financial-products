import { Component, Input } from '@angular/core';
import { HomeService } from '../../home.service';
import { Product } from 'src/app/models/product.model';
import { ProductStateService } from 'src/app/services/product-state.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.css']
})
export class ProductActionsComponent {
  constructor(
    private homeService: HomeService,
    private productStateService: ProductStateService,
    private productsService: ProductsService,
    private router: Router,
    private notificationService: NotificationService,
    private modalService: ModalService,
  ){}

  @Input() product: Product | undefined;

  productsSubscription: Subscription | undefined;
  products: Product[] = [];
  onUpdate(productId: string) {
    const selectedProduct = this.products.find(product => product.id === productId);
    this.productStateService.setSelectedProduct(selectedProduct);
    this.router.navigate(['editar/', productId])
  }

  handleDeleteItem(productId: string) {
    this.productsService.deleteItem(productId).subscribe(
      (_) => {
        this.notificationService.showNotification(
          'El producto se ha eliminado correctamente',
          'done'
        );
        this.homeService.setProducts();
        this.modalService.onCloseModal();
      },
      (_) => {
        this.notificationService.showNotification(
          'Hubo un error',
          'error'
        );
      }
    );
  }

  onDelete(productId: string) {
    const selectedProduct = this.products.find(product => product.id === productId);

    this.modalService.onOpenModal(
      `Está seguro de eliminar el producto ${selectedProduct?.description}`,
      () => this.handleDeleteItem(selectedProduct?.id || '')
    );
  }

  ngOnInit(): void {
    this.productsSubscription = this.homeService.filteredProducts.subscribe((data)=>{
      this.products = data;
    })
  }

  ngOnDestroy(): void {
    this.productsSubscription && this.productsSubscription.unsubscribe();
  }

}
