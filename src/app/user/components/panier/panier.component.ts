import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ACTION_PER_USE } from 'src/app/models/actions.model';
import { Panier } from 'src/app/models/panier.model';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {


  actions: string[] = ACTION_PER_USE['cart'];

  panier!: Panier;

  constructor(private _pServ: PanierService, private _router: Router) { }

  ngOnInit(): void {
    this._pServ.panierChanged.subscribe(newPanier => this.panier = newPanier);
  }

  onClose() {
    this._pServ.togglePanier(false);
  }

  get total(){
    return this._pServ.total;
  }

  confirm(){
    this._router.navigateByUrl('client/confirm-order');
    this._pServ.togglePanier(false);
  }

}
