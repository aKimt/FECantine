import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

const routes: Routes = [
    { path: "", children: [
        { path: "/accueil", }
    ] }
]


@NgModule({
    imports: [],
    exports: [],
    providers: [],
})
export class AdminRoutingModule { }
