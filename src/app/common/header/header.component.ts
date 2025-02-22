import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
// import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    BreadcrumbModule,
    RouterModule,
    CommonModule,
    CardModule,
    ButtonModule,
  ],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { icon: 'pi pi-home', route: '/installation' },
      { label: 'Home' },
      { label: 'InputText', route: '/inputtext' },
    ];
  }
}
