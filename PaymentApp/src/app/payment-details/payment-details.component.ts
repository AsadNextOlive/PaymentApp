import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  //Select the list data into the form fields.
  populateForm(selectedRecord: PaymentDetail) {
    // this.service.formData = selectedRecord;
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete the record?'))
    this.service.deletePaymentDetail(id)
      .subscribe({
        next: res => {
          console.log(res);
          this.service.list = res as PaymentDetail[];
          this.toastr.error('Deleted Successfully', 'Payment Detail')
        },
        error: err => { console.log(err) }
      })

  }
}
