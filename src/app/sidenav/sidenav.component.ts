import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  // @Input() navbarRef: any = null;

  userName: string = 'Sasi Kumar';

  navListItems: any[] = [
    { scrName: 'Register', link: '/register', icon: 'dashboard' },
    { scrName: 'Bulk Register', link: 'register/bulk-register', icon: 'assignment' },
    { scrName: 'Search', link: '/search', icon: 'person_search' },
    { scrName: 'Subsidy Calc', link: '/subs-calc', icon: 'calculate' },
    { scrName: 'Docments', link: '/docs', icon: 'menu_book' },
  ];

  constructor() { }

}
