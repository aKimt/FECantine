import { Component, OnInit } from '@angular/core';
import { ACTION_PER_USE } from 'src/app/models/actions.model';
import { Composant, ProduitList } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  produits!: ProduitList;
  supplements!: Composant[];

  actions = ACTION_PER_USE['menu'];

  constructor(private _pServ: ProduitService) { }

  ngOnInit(): void {
    this._pServ.getAll().subscribe({
      next: list => this.produits = list
    })
    this._pServ.getSupplements().subscribe({
      next: list => this.supplements = list
    })
  }

}
