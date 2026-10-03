import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-account-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './account-page.html',
  styleUrl: './account-page.css',
})
export class AccountPage {}
