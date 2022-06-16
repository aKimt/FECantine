import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Collection } from '../models/hateoas.model';
import { Boisson, Composant, PlatChaud, ProduitList, Sandwich } from '../models/produit';

const BASE_URL = "http://localhost:8989/produit"

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private _client: HttpClient) { }

  public getAll(): Observable<ProduitList> {
    return this._client.get<ProduitList>(BASE_URL+"/all");
  }

  public getAllSandwich(): Observable<Sandwich[]> {
    return this._client.get<Collection<Sandwich>>(BASE_URL+ "/sandwich").pipe(
      map( (value) => value._embedded["sandwichDTOList"] as Sandwich[])
    )
  }
  
  public getAllPlat(): Observable<PlatChaud[]> {
    return this._client.get<Collection<PlatChaud>>(BASE_URL+ "/plat").pipe(
      map( (value) => value._embedded["platChaudDTOList"] as PlatChaud[])
    )
  }

  public getAllBoisson(): Observable<Boisson[]> {
    return this._client.get<Collection<Boisson>>(BASE_URL+ "/boisson").pipe(
      map( (value) => value._embedded["boissonDTOList"] as Boisson[])
    )
  }

  public getSupplements(): Observable<Composant[]> {
    return this._client.get<any>(BASE_URL+"/supplements").pipe(
      map(model => model?.["supplements"])
    );
  }
  



}
