import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { CmdProduit, CmdSandwich, CommandeForm } from '../models/commande.form';
import { Panier, PanierItem } from '../models/panier.model';
import { Boisson, Produit, PlatChaud, Sandwich, TypeProduit } from '../models/produit';

const BASE_URL = "http://localhost:8787/commande"
const STORAGE_KEY = "panier";

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private _cachedPanier: Panier = this.browser_panier;
  private _panierChanged = new BehaviorSubject<Panier>(this._cachedPanier);
  private _total = 0;

  private _panierIsOpen = false;
  private _panierOpen = new BehaviorSubject<boolean>(this._panierIsOpen);

  constructor(private _client: HttpClient) { 
    this._panierChanged.subscribe( (panier) => {
      this.browser_panier = this._cachedPanier;
      this._cachedPanier = this.browser_panier;
      this._total = this._totalPanier;
    })
  }

  private get browser_panier(): Panier{
    let panier =  localStorage.getItem(STORAGE_KEY);
    return panier ? JSON.parse( panier ) : {boissons: [], platsChauds: [], sandwiches: []}
  }
  private set browser_panier(panier: Panier){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(panier))
  }

  get $panierOpen(): Observable<boolean>{
    return this._panierOpen.asObservable();
  }

  public get panierChanged(): Observable<Panier>{
    return this._panierChanged.asObservable();
  }

  public addToCart(p: Produit, qte: number, type: TypeProduit){
    if( type === 'boisson' )
      this.addBoissonToCart(<Boisson>p, qte);
    else if( type === 'plat' )
      this.addPlatToCart(<PlatChaud>p, qte);
    else if( type === 'sandwich' )
      this.addSandwichToCart(<Sandwich>p, qte);
    
    this._panierChanged.next(this._cachedPanier);
    this._panierOpen.next(this._panierIsOpen = true);
  }

  private addBoissonToCart(p: Boisson, qte: number){

    let toAdd: PanierItem = {
      id: p.id,
      nom: p.nom,
      prix: p.prix,
      qte: qte
    }
    if( this._cachedPanier.boissons ) 
    {
      let panierItem = this._cachedPanier.boissons
        .filter(item => item.nom === toAdd.nom)[0]

      if(panierItem)
        panierItem.qte += qte

      else
        this._cachedPanier.boissons.push(toAdd)
    }
    else 
      this._cachedPanier.boissons = [toAdd];
  }
  private addPlatToCart(p: PlatChaud, qte: number){

    let toAdd: PanierItem = {
      id: p.id,
      nom: p.nom,
      prix: p.prix,
      composants: p.composants,
      description: p.description,
      qte: qte
    }
    if( this._cachedPanier.platsChauds ) 
    {
      let panierItem = this._cachedPanier.platsChauds
        .filter(item => item.nom === toAdd.nom)[0]

      if(panierItem)
        panierItem.qte += qte

      else
        this._cachedPanier.platsChauds.push(toAdd)
    }
    else 
      this._cachedPanier.platsChauds = [toAdd];

  }
  private addSandwichToCart(p: Sandwich, qte: number){

    let toAdd: PanierItem = {
      id: p.id,
      nom: p.nom,
      prix: p.prix,
      qte: qte,
      description: p.description,
      composants: p.composants,
      supp: p.supplements
    }
    if( this._cachedPanier.sandwiches ) {
      let panierItem = this._cachedPanier.sandwiches
        .filter(item => item.nom === toAdd.nom)[0]

      if(panierItem)
        panierItem.qte += qte
      
      else
        this._cachedPanier.sandwiches.push(toAdd)
    }
      
    else 
      this._cachedPanier.sandwiches = [toAdd];

  }

  public deleteFromCart(p: Produit, type: TypeProduit, qte?: number){
    let bonPanier: Array<PanierItem>;

    if(type === 'boisson' && this._cachedPanier?.boissons)
      bonPanier = this._cachedPanier.boissons;
    else if(type === 'plat' && this._cachedPanier?.platsChauds)
      bonPanier = this._cachedPanier.platsChauds;
    else if(type === 'sandwich' && this._cachedPanier?.sandwiches)
      bonPanier = this._cachedPanier.sandwiches;
    else
      return;

    let toDelete: PanierItem = bonPanier.filter(prod => prod.nom === p.nom)[0]
    console.log(qte && qte >= 1 && toDelete.qte > qte)
    if(qte && qte >= 1 && toDelete.qte > qte){
      toDelete.qte -= qte;
      this._panierChanged.next(this._cachedPanier)
    }
    else {
      let index = bonPanier.indexOf(toDelete);
      bonPanier.splice(index, 1);
      this._panierChanged.next(this._cachedPanier)
    }
    
    this._panierOpen.next(this._panierIsOpen = true);
  }

  public clearCart(){

    this._cachedPanier = {
      boissons: [],
      platsChauds: [],
      sandwiches: []
    }
    this._panierChanged.next(this._cachedPanier);
    this._panierOpen.next(this._panierIsOpen = true);
  }

  private get _totalPanier(){

    let total = 0;

    this._cachedPanier.boissons?.forEach((e) => total += e.prix * e.qte)
    this._cachedPanier.platsChauds?.forEach((e) => total += e.prix * e.qte)
    this._cachedPanier.sandwiches?.forEach((e) => total += e.prix * e.qte)

    return total;
  }

  get total(){
    return this._total;
  }

  public sendOrder(date: Date){
    let order: CommandeForm = {
      username: 'test', // TODO implements user service
      date: new Date(2030, 10,10),
      boissons: this.browser_panier.boissons,
      platChauds: this.browser_panier.platsChauds,
      sandwiches: this.browser_panier.sandwiches?.map(b => {
        return {
          nom: b.nom,
          qte: b.qte,
          supplement: b.supp ? b.supp : [] as string[],
          moins: [] as string[]
        } as CmdSandwich
      })
    }

    return this._client.post(BASE_URL+'/confirmer', order).pipe(
      tap(() => this.clearCart())
    )
  }

  public togglePanier(open?: boolean){
    if(open === undefined){
      this._panierIsOpen = !this._panierIsOpen
    }
    else
      this._panierIsOpen = open

    this._panierOpen.next(this._panierIsOpen);
  }

}
