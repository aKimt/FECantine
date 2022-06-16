import { Component, Input, OnInit } from '@angular/core';
import { TypeProduit } from 'src/app/models/produit';
import { PricedItem } from '../../models/priced-item.model';

@Component({
  selector: 'shared-priced-item-list',
  templateUrl: './priced-item-list.component.html',
  styleUrls: ['./priced-item-list.component.scss']
})
export class PricedItemListComponent implements OnInit {

  @Input("items")
  itemList!: PricedItem[]

  @Input("type")
  type!: TypeProduit

  @Input("actions")
  possibleActions: string[]= [];

  constructor() { }

  ngOnInit(): void {
  }

}
