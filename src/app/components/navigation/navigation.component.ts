import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  constructor(private _panierServ: PanierService) { }

  ngOnInit(): void {
  }

  openPanier(){
    this._panierServ.togglePanier();
  }

  get panierTotal(){
    return this._panierServ.total
  }

}
