import { Composant, TypeProduit } from "src/app/models/produit";

export interface PricedItem {
    id: Object;
    nom: string;
    prix: number;
    description?: string;
    composants?: Composant[];
    qte?: number
}