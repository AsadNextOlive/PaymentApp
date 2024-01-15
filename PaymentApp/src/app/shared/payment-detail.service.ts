import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaymentDetail } from './payment-detail.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  //Calling the baseUrl from the environments.ts
  url: string = environment.apiBaseURL + '/PaymentDetail'
  
  //Initializing an array PaymentDetail
  list: PaymentDetail[]  = [];
  formData: PaymentDetail = new PaymentDetail();

  //Declaration boolean = false by default for form validation
  formSubmitted: boolean = false;

  //Adding HttpClient for API
  constructor(private http: HttpClient) { }

  //Method to get the data from the API
  refreshList(){
    this.http.get(this.url)
    .subscribe({
      next: res => {
        // console.log(res);
        this.list = res as PaymentDetail[];
      },
      error: err => {console.log(err)}
    })
  }

  //Method to Post/Save the Data into the the Database using API
  postPaymentDetail(){
    return this.http.post(this.url,this.formData)
  }

  //Method to Put/Update the Data into the the Database using API
  putPaymentDetail(){
    return this.http.put(this.url +'/'+ this.formData.paymentDetailId, this.formData) //this.url +'/'+ this.formData.paymentDetailId is the first parameter and as a Second parameter this.formData
  }

  //Method to Delete the Data from the the Database using API
  deletePaymentDetail(id: number){
    return this.http.delete(this.url +'/'+ id) 
  }

  //Reset Form once it got submited
  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new PaymentDetail()
    //Again making formSubmitted = false
    this.formSubmitted = false;
  }
}
