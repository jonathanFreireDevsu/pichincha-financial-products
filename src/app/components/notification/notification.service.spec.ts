import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from 'src/app/utils/mock-declarations';
import { NotificationService } from './notification.service';

describe('Notification service', () => {
    let service: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule(mockDeclarations);

        service = TestBed.inject(NotificationService);
    });

    it('should update text and type', done => {
        const testText = 'Este es un mensaje';
        const testType = 'done';
    
        service.showNotification(testText, testType);
    
        service.text.subscribe(text => {
          expect(text).toEqual(testText);
        });
    
        service.type.subscribe(type => {
          expect(type).toEqual(testType);
          done();
        });
      });

});