import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirmModal.component.html',
  styleUrls: ['./confirmModal.component.css'],
})
export class ConfirmModalComponent {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  @Input() modalText: string = '';
  @Input() modalId: string = '';
  @Output() notifyViewModal = new EventEmitter<boolean>();
  @Output() notifyUpdateData = new EventEmitter<null>();

  closeModal() {
    this.notifyViewModal.emit(false);
  }

  openModal() {
    this.notifyViewModal.emit(true);
  }

  updateData() {
    this.notifyUpdateData.emit();
  }

  handleDeleteItem() {
    this.productsService.deleteItem(this.modalId).subscribe(
      (_) => {
        this.updateData();
        this.closeModal()
      },
      (error) => {
        console.error('Hubo un error', error);
      }
    );
  }
};