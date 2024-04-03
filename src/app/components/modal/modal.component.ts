import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
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
};