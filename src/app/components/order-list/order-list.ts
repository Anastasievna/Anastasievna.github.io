import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IOrder } from '../../types';
import { Observable } from 'rxjs';
import { OrdersService } from '../../services/orders-service';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList {
  orders$: Observable<IOrder[]> | null = null;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.orders$ = this.ordersService.getOrdersByUserId();
  }
}
