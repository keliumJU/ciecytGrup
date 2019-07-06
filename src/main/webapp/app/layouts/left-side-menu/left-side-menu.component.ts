import { Component, OnInit, Input } from '@angular/core';
import { Config, Menu } from './types'; //importamos la carpeta de configuracion

@Component({
  selector: 'jhi-left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styles: ['./left-side-menu.component.css'] //Aqui vendran los estilos scss
})
export class LeftSideMenuComponent implements OnInit {
  @Input() leftMenuHidden: boolean;

  //Variables para la configuracion del menu
  @Input() options;
  @Input() menus: Menu[];
  config: Config;

  constructor() {
    this.leftMenuHidden = false;
  }

  ngOnInit() {
    this.config = this.mergeConfig(this.options);
  }

  //Metodos para la configuracion del menu

  mergeConfig(options: Config) {
    // 기본 옵션
    const config = {
      // selector: '#accordion',
      multi: true
    };

    return { ...config, ...options };
  }

  toggle(index: number) {
    // 멀티 오픈을 허용하지 않으면 타깃 이외의 모든 submenu를 클로즈한다.
    if (!this.config.multi) {
      this.menus.filter((menu, i) => i !== index && menu.active).forEach(menu => (menu.active = !menu.active));
    }

    // Menu의 active를 반전
    this.menus[index].active = !this.menus[index].active;
  }
}
