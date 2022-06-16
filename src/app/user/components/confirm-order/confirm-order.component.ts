import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';


@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

  date!: Date;

  constructor(
    private _panierService: PanierService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  confirm(){
    this._panierService.sendOrder(this.date).subscribe({
      next: () => this._router.navigateByUrl("client/menu"),
      error: () => alert('une erreur s\'est produite')
    });
  }

}
