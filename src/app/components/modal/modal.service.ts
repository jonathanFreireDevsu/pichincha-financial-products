import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    text = new BehaviorSubject<string>('');

    handleConfirm = new BehaviorSubject<Function>(()=>{});

    onOpenModal(message: string, action: Function) {
        this.text.next(message);
        this.handleConfirm.next(action);
    }

    onCloseModal() {
        this.text.next('');
    }
};

