import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(private route:Router){}
  onPay(){
    alert('Payment Success');
    this.route.navigate(['/home']);
  }
  onCancel(){
    confirm('Are You Sure You Want to Cancel the Payment?');
    this.route.navigate(['/cart']);
  }
}
