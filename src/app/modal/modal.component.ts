import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private notificationService: NotificationService,
    private modalService: ModalService,
  ) {}
  
  text: string = '';
  show: boolean = false;
  
  handleConfirm: Function = () => {}
  handleCancell: Function = () => this.modalService.onCloseModal();



  ngOnInit(): void {
    this.modalService.text.subscribe((value) => this.text = value);
    this.modalService.handleConfirm.subscribe((value) => this.handleConfirm = value);
  }

  // @Input() modalText: string = '';
  // @Input() modalId: string = '';
  // @Output() notifyViewModal = new EventEmitter<boolean>();
  // @Output() notifyUpdateData = new EventEmitter<null>();

  // closeModal() {
  //   this.notifyViewModal.emit(false);
  // }

  // openModal() {
  //   this.notifyViewModal.emit(true);
  // }

  // updateData() {
  //   this.notifyUpdateData.emit();
  // }

  // handleDeleteItem() {
  //   this.productsService.deleteItem(this.modalId).subscribe(
  //     (_) => {
  //       this.updateData();
  //       this.closeModal()
  //     },
  //     (_) => {
  //       this.notificationService.showNotification(
  //         'Hubo un error',
  //         'error'
  //       );
  //     }
  //   );
  // }
};