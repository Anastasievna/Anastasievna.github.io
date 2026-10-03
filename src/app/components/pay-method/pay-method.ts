import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pay-method',
  imports: [CommonModule, FormsModule],
  templateUrl: './pay-method.html',
  styleUrl: './pay-method.css',
})
export class PayMethod {
  @Output() selectedMethod = new EventEmitter<string>();
  methods = ['Debit Card On Delivery', 'Digital Wallet', 'Cash On Delivery'];
  selectedInputMethod = this.methods[0];

  ngOnInit() {
    this.changePayMethod();
  }

  changePayMethod() {
    this.selectedMethod.emit(this.selectedInputMethod);
  }
}
