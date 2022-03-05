import { Component, OnInit } from '@angular/core';
import { RouterConstants } from '../common/router-constants';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // @Input() navbarRef: any = null;

  adminName: string = 'Sasi Kumar';

  navListItems: any[] = [
    { scrName: 'Register', link: RouterConstants.REGISTERATION, icon: 'dashboard' },
    { scrName: 'Bulk Register', link: RouterConstants.BULK_REGISTERATION, icon: 'assignment' },
    { scrName: 'Search', link: RouterConstants.CUST_SEARCH, icon: 'person_search' },
    // { scrName: 'Subsidy Calc', link: 'subs-calc', icon: 'calculate' },
    { scrName: 'Docments', link: RouterConstants.DOCS_MODEULE, icon: 'menu_book' },
  ];

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    const [{ firstName }] = this._auth.getAdminFromSession();
    this.adminName = firstName;
  }

}
