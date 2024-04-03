import {Injectable} from '@angular/core'
import { NotificationType } from '../../types/notiticationType';
import { BehaviorSubject } from 'rxjs';


@Injectable ({
    providedIn: "root"
})
export class NotificationService {
    text = new BehaviorSubject('');
    type = new BehaviorSubject<NotificationType>('inform');

    showNotification(text: string, type: NotificationType) {
        this.text.next(text)
        this.type.next(type);

        setTimeout(() => {
            this.text.next('');
          }, 5000);
    }
}