import { Component, Input } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './basicmodal.service';


@Component({
  selector: 'app-basicmodal',
  templateUrl: './basicmodal.component.html',
  providers: [NgbModalConfig, NgbModal],
  styleUrls: ['./basicmodal.component.scss']
})
export class BasicmodalComponent {

  @Input() name: string;
  public mr: NgbModalRef;

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private service: ModalService) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.mr = this.modalService.open(content);
  }

  dismis() {
    this.mr.close();
  }

  save(value: string) {
    this.service.emitevent(value);
    this.mr.close();
  }
}

