import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from 'src/app/utils/mock-declarations';
import { ModalService } from './modal.service';

describe('Modal service', () => {
    let service: ModalService;

    beforeEach(() => {
        TestBed.configureTestingModule(mockDeclarations);

        service = TestBed.inject(ModalService);
    });

    it('Modal service', () => {
        expect(service).toBeTruthy();
      });

    it('should update text and handleConfirm should execute', () => {
        const testMessage = 'Test Message';
        const testAction = () => {};
        service.onOpenModal(testMessage, testAction);

        service.text.subscribe(value => {
        expect(value).toBe(testMessage);
        });

        service.handleConfirm.subscribe(action => {
        expect(action).toBe(testAction);
        });
    });

    it('text should be empty', () => {
        service.onOpenModal('Initial Message', () => {});
        service.onCloseModal();

        service.text.subscribe(value => {
        expect(value).toBe('');
        });
    });

});