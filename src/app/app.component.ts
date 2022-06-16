import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { PanierService } from './services/panier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'FECantine';

  @ViewChild("drawer")
  drawer!: MatDrawer;
  showSide = false;

  constructor(private _panierServ: PanierService) {
  }

  ngAfterViewInit(): void {
    this._panierServ.$panierOpen.subscribe((open) => {
      this.drawer.toggle(open);
    })
  }

  togglePanier(){
    this._panierServ.togglePanier();
  }
}
