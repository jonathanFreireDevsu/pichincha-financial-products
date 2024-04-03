import { Component, OnInit } from '@angular/core';
import { Product } from '../types/products';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { IModal } from '../types/modal';
import { NotificationService } from '../notification/notification.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  constructor (
    private router: Router,
    private productsService: ProductsService,
    private notificationService: NotificationService,
    private modalService: ModalService
  ) {

  }
  products: Product[] = [];

  splittedProducts: Product[][] = [this.products];
  itemsPerPage = 5
  currPage = 0

  // confirmModalData : IModal = {
  //   modalVisible: false,
  //   modalText: '',
  //   modalId: '',
  // }

  // handleModalVisibility (value: boolean) {
  //   this.confirmModalData = {
  //     ...this.confirmModalData,
  //     modalVisible: value,
  //   }
  // }
  onImageError(event: any) {
    event.target.src = './../assets/notAvailable.png';
  }

  onAdd() {
    this.router.navigate(['agregar']);
  }
  onUpdate(productId: string) {
    const currentProduct = this.products.find(product => product.id === productId);
    this.productsService.setCurrentProduct(currentProduct);
    this.router.navigate(['editar/', productId])
  }

  handleDeleteItem(productId: string) {
    this.productsService.deleteItem(productId).subscribe(
      (_) => {
        this.notificationService.showNotification(
          'El producto se ha eliminado correctamente',
          'done'
        );
        this.loadData();
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
    const currentProduct = this.products.find(product => product.id === productId);

    this.modalService.onOpenModal(
      `Está seguro de eliminar el producto ${currentProduct?.description}`,
      () => this.handleDeleteItem(currentProduct?.id || '')
    );
  }



  onChangePage(value: number) {
    const tempPage = this.currPage + value;
    if (tempPage <= this.splittedProducts.length -1 && tempPage >= 0) {
      this.currPage = tempPage;
    }
  }

  onSplitData(itemsPerPage: number, list: Product[]) {
    this.itemsPerPage = itemsPerPage
    const splittedData: Product[][] = [];
    list.forEach((product, index: number) => {
      if (!(index % itemsPerPage)) {
        splittedData.push([product]);
      } else {
        splittedData[(Math.floor(index / itemsPerPage))].push(product);
      }
    })
    this.currPage = 0;
    this.splittedProducts = splittedData
  }

  onSearch (event: any) {
    const value = event.target.value;
    if (!value) {
      this.onSplitData(this.itemsPerPage, this.products);
      return;
    }
    const prevResult = this.products.filter( product =>
      (
        product.name.includes(value) ||
        product.description.includes(value) ||
        product.date_release.includes(value) ||
        product.date_revision.includes(value)
      )
    );
    this.onSplitData(this.itemsPerPage, prevResult);
  }

  loadData() {
    this.productsService.getItems().subscribe(
      (data) => {
        this.products = data;
        this.onSplitData(this.itemsPerPage, data)
      },
      (_) => {
        this.notificationService.showNotification(
          'Hubo un error, no se pudo obtener la data',
          'error'
        );
      }
    );
  }

  ngOnInit(): void {
    this.productsService.setCurrentProduct(undefined);
    this.loadData();
  }
}
