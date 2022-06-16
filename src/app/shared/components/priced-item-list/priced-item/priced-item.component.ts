import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, Subscription, timeout } from 'rxjs';
import { Action, ActionList } from 'src/app/models/actions.model';
import { Produit, TypeProduit } from 'src/app/models/produit';
import { PanierService } from 'src/app/services/panier.service';
import { PricedItem } from 'src/app/shared/models/priced-item.model';


@Component({
  selector: 'shared-priced-item',
  templateUrl: './priced-item.component.html',
  styleUrls: ['./priced-item.component.scss']
})
export class PricedItemComponent implements OnInit {

  @Input("item")
  display!: PricedItem;
  subClose?: Subscription;

  @Input("type")
  productType!: TypeProduit;

  @Input("actions")
  possibleActions: string[] = [];


  actions: Action[] = [];


  isControlPanelOpen = new BehaviorSubject<string | undefined>(undefined);
  isOpen= false;
  isPanelOpen = false;

  private readonly allAction: ActionList = 
  {
    'add-to-cart': {
      nom: 'add-to-cart',
      iconName: 'add_shopping_cart',
      message: 'ajouter à votre panier',
      action: (produit: Produit, qte?: number) => this._panierService.addToCart(produit, qte ? qte : 1, this.productType)
    },
    'clear-from-cart': {
      nom: 'clear-from-cart',
      iconName: 'delete_forever',
      message: 'supprimer de votre panier',
      action: (produit: Produit, qte?: number) => this._panierService.deleteFromCart(produit,this.productType, qte)
    },
    'display-info': {
      nom: 'display-info',
      iconName: 'info',
      message: 'afficher plus d\'info',
      action: (...args : any[]) => {
        this.isControlPanelOpen.next(this.isPanelOpen ? undefined:'display-info')
        this.isPanelOpen = !this.isPanelOpen
      },
    },
    'increment-cart-prod': {
      nom: 'increment-cart-prod',
      iconName: 'add',
      message: 'ajouter 1 de qtt',
      action: (produit: Produit, qte?: number) => this._panierService.addToCart(produit, 1, this.productType),
    },
    'decrement-cart-prod': {
      nom: 'decrement-cart-prod',
      iconName: 'remove',
      message: 'retirer 1 de qtt',
      action: (produit: Produit, qte?: number) => this._panierService.deleteFromCart(produit, this.productType, 1)      
    }
  }
  

  constructor(private _panierService:PanierService) { }

  ngOnInit(): void {
    this.possibleActions.forEach(a => this.actions.push(this.allAction[a]));
  }

  openToClosed(){
    of()
    this.subClose = of(undefined)
      .pipe(delay(50))
      .subscribe(() => {
        this.isOpen = false;
        this.subClose = undefined;
    });
  }

  closedToOpen(){
    if(this.subClose){
      this.subClose.unsubscribe();
      this.subClose = undefined;
    }
    else {
      this.isOpen = true;
    }
  }

  onMouseIn(value: boolean){
    if(value)
      this.closedToOpen();
    else
      this.openToClosed();
  }

  onClick(actionName: string, qte?: number){
    this.allAction[actionName].action(this.display, qte)
  }

  // get userActions() {
  //   return [ 
  //     this.allAction['display-info'],
  //     this.allAction['add-to-cart'], 
  //     this.allAction['clear-from-cart'], 
  //   ]
  // }


  isActionPossible(actionName: string): boolean{
    let array: string[] = this.possibleActions.filter(a => a == actionName)
    return array ? array.length > 0 : false;
  }
}
