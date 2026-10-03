import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  error$ = new Subject<string>();
  formType: 'login' | 'register' = 'login';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.formType = this.route.snapshot.data['formType'];
  }

  submit(ngForm: NgForm) {
    const data = ngForm.form.value;
    const request$ =
      this.formType == 'login'
        ? this.authService.login(data.email, data.password)
        : this.authService.register(data.email, data.password);
    request$.subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error$.next(err.message);
      },
    });
  }
}
