import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // @Input() navbarRef: any = null;

  userName: string = 'Sasi Kumar';

  navListItems: any[] = [
    { scrName: 'Register', link: '/register', icon: 'dashboard' },
    { scrName: 'Land / Crop Details', link: '/', icon: 'account_circle' },
    { scrName: 'Quotasion', link: '/', icon: 'assignment' },
    { scrName: 'Subsidy Calc', link: '/subs-calc', icon: 'calculate' },
    { scrName: 'Docments', link: '/docs', icon: 'menu_book' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
