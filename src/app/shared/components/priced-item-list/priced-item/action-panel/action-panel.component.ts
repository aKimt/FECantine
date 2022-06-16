import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit, TypeProduit } from 'src/app/models/produit';
import { PanierService } from 'src/app/services/panier.service';
import { PricedItem } from 'src/app/shared/models/priced-item.model';

@Component({
  selector: 'shared-action-panel',
  templateUrl: './action-panel.component.html',
  animations: [
    trigger("openClose", [
      state("open", style({})),
      state("closed", style({ height: "0px" })),
      transition('closed => open', animate('0.3s')),
      transition("open => closed", animate('0.2s'))
    ])
  ] ,
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent implements OnInit {

  @Input("isOpen")
  open!: Observable<string | undefined>;   

  @Output()
  mousein=new EventEmitter<boolean>();
  @Output()
  cancelled=new EventEmitter<undefined>();

  selectedOption?: string;

  @Input()
  selectedItem!: Produit;

  @Input()
  itemType!: TypeProduit

  constructor(private _pServ: PanierService) { }

  ngOnInit(): void {
    this.open?.subscribe((action) => {
      console.log("action: "+action)
      this.selectedOption = action
    })
  }

  triggerMouseIn(value: boolean){
    this.mousein.emit(value)
  }

  onCancel(){
    this.selectedOption = undefined;
    this.cancelled.emit();
  }

  onAdd() {
    this._pServ.addToCart(this.selectedItem, 1, this.itemType)
  }
}

