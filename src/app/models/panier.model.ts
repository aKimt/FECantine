import { PricedItem } from "../shared/models/priced-item.model";
import { Composant, Produit } from "./produit";

export interface Panier {
    platsChauds?: PanierItem[];
    sandwiches?: PanierItem[];
    boissons?: PanierItem[];
}

export interface PanierItem extends PricedItem {
    qte: number;
    supp?: Composant[];
}