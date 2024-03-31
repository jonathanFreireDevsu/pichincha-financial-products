import { Component, OnInit } from '@angular/core';
import { ConfirmModalService } from './confirmModal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirmModal.component.html',
  styleUrls: ['./confirmModal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  constructor(
    private confirmModalService: ConfirmModalService,
  ) {}
  modalText = '';
  modalId = '';
  
  closeModal() {
    this.confirmModalService.closeModal();
  }

  handleDeleteItem(id: string) {
  }

  ngOnInit() {
    this.modalText = this.confirmModalService.getModalText();
    this.modalId = this.confirmModalService.getModalId();
  }
};