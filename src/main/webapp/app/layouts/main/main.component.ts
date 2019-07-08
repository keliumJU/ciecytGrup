import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';

import { JhiLanguageHelper } from 'app/core';
import { Config, Menu } from '../left-side-menu/types';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
  leftMenuHidden = false;
  constructor(private jhiLanguageHelper: JhiLanguageHelper, private router: Router) {}

  toggleBtnLeftMenuEvent(event) {
    this.leftMenuHidden = event;
  }
  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'ciecytApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });
  }

  //Menu config
  options: Config = { multi: false };

  menus: Menu[] = [
    {
      name: 'Front-end',
      iconClass: 'home',
      active: true,
      submenu: [
        { iconClass: 'home', name: 'Crear Proyecto', url: 'proyecto/new' },
        { iconClass: 'home', name: 'CSS', url: '#' },
        { iconClass: 'home', name: 'Javascript', url: '#' },
        { iconClass: 'home', name: 'C++', url: '#' }
      ]
    },
    {
      name: 'Responsive web',
      iconClass: 'home',
      active: false,
      submenu: [
        { iconClass: 'home', name: 'Tablets', url: '#' },
        { iconClass: 'home', name: 'Mobiles', url: '#' },
        { iconClass: 'home', name: 'Desktop', url: '#' }
      ]
    },
    {
      name: 'Web Browser',
      iconClass: 'home',
      active: false,
      submenu: [
        { iconClass: 'home', name: 'Chrome', url: '#' },
        { iconClass: 'home', name: 'Firefox', url: '#' },
        { iconClass: 'home', name: 'Desktop', url: '#' }
      ]
    }
  ];
}
