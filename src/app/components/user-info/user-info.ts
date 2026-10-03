import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { Confirm } from 'notiflix';
import { CartService } from '../../services/cart-service';
import { IShipping } from '../../types';

@Component({
  selector: 'app-user-info',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {
  @Output() shippingChange = new EventEmitter<{ valid: boolean; value: IShipping }>();
  title: string = '';
  edit: boolean = false;
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\+?\d{6,15}$/)],
    }),
    email: new FormControl({ value: '', disabled: true }, { nonNullable: true }),
    city: new FormControl('', { nonNullable: true, validators: Validators.required }),
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.userService.getInfo().subscribe((user) => this.form.patchValue(user));
    this.title = this.route.snapshot.data['title'];
    this.edit = !!this.route.snapshot.data['edit'];

    this.form.valueChanges.subscribe(() => {
      const { name, phone, city, address } = this.form.getRawValue();
      this.shippingChange.emit({ valid: this.form.valid, value: { name, phone, city, address } });
    });
  }

  submit() {
    if (!this.edit) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, phone, address, city } = this.form.getRawValue();
    this.userService.updateInfo({ name, phone, address, city }).subscribe({
      next: () => Notify.success('Succesfully!'),
      error: (err) => Notify.failure(err.message),
    });
  }

  logout() {
    Confirm.show('Logout', 'Are you sure?', 'Yes', 'No', () => {
      this.authService.logout();
      this.cartService.removeAllFromCart();
      this.router.navigate(['/']);
      window.scrollTo(0, 0);
    });
  }
}
