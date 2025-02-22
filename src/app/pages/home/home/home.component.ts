import { routes } from './../../../app.routes';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, CommonModule, RouterModule, BreadcrumbModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  homeMenu?: any = [];
  items: MenuItem[] | undefined;

  constructor(
    // private routes:Route,
    private router: Router
  ) {
    console.log('home component ');
  }

  ngOnInit(): void {
    this.homeMenu = [
      {
        name: 'Task Managment ',
        icon: 'pi pi-list-check',
        route: '/task-mang',
        description:
          'This is to show the task mangment module and ite details ',
      },
      {
        name: 'Upload File',
        icon: 'pi pi-cloud-upload',
        route: '/file-upload',
        description: 'This is to show the File Upload  module and ite details ',
      },
    ];

    this.items = [{ icon: 'pi pi-home', route: '/..' }, { label: 'Home' }];
  }

  goToLink(name: string, route: any) {
    this.router.navigate([`${route}`]);
  }
}
