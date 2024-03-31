import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  private text = ''
  private id = ''
  private modalVisible = new BehaviorSubject<boolean>(false);
  private modalText = new BehaviorSubject<string>('');
  private modalId = new BehaviorSubject<string>('');

  setModalId(id: string) {
    this.modalId.next(id);
  }

  getModalId() {
    this.modalId.subscribe({
      next: (val) => {this.id = val},
    });
    return this.id;
  }

  setModalText(text: string) {
    this.modalText.next(text);
  }

  getModalText() {
    this.modalText.subscribe({
      next: (val) => {this.text = val},
    });
    return this.text;
  }

  getModalVisibility() {
    return this.modalVisible;
  }


  openModal() {
    this.modalVisible.next(true);
  }

  closeModal() {
    this.modalVisible.next(false);
  }
}