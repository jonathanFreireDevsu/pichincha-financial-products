import { Component, OnInit } from '@angular/core';
import { NotificationType } from '../../types/notiticationType';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  constructor (private notificationService: NotificationService) {

  }

  text: string = '';
  type: NotificationType = 'inform';

  ngOnInit () {
    this.notificationService.text.subscribe((value) => {
      this.text = value;
    });
    this.notificationService.type.subscribe((value) => {
      this.type = value;
    });
  };

}
