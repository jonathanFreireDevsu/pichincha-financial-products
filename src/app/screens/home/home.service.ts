import { Injectable } from "@angular/core";
import { ProductsService } from '../../services/products.service';
import { Product } from "src/app/models/product.model";
import { NotificationService } from '../../components/notification/notification.service';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(
        private productsService: ProductsService,
        private notificationService: NotificationService,
    ){}

    products = new BehaviorSubject<Product[]>([]);
    filteredProducts = new BehaviorSubject<Product[]>([]);

    setProducts() {
        this.productsService.getItems().subscribe(
          (data) => {
            this.products.next(data);
            this.filteredProducts.next((data));
          },
          (_) => {
            this.notificationService.showNotification(
              'Hubo un error, no se pudo obtener la data',
              'error'
            );
          }
        );
      }

      handleSearch(value: string) {
        this.products.subscribe((data) => {
            if (!value) {
                this.filteredProducts.next(data);
            } else {
                const prevResult = data.filter( product =>
                    (
                      product.name.toLowerCase().includes(value.toLowerCase()) ||
                      product.description.toLowerCase().includes(value.toLowerCase()) ||
                      product.date_release.toLowerCase().includes(value.toLowerCase()) ||
                      product.date_revision.toLowerCase().includes(value.toLowerCase())
                    )
                );
                this.filteredProducts.next(prevResult);
            }
        })
          
      }

}