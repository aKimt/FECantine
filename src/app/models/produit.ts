export interface ProduitList {
    boissons: Boisson[];
    platChauds: PlatChaud[];
    sandwiches: Sandwich[];
}

export class Boisson {
    id!: Object;
    nom!: string;
    prix!: number;
}


export interface Composant {
    ingredient: string;
    qte: number;
    unite: string;
}

export class PlatChaud {
    id!: Object;
    nom!: string;
    prix!: number;
    description!: string;
    composants!: Composant[];
    dates!: Date[];
}

export class Sandwich {
    id!: Object;
    nom!: string;
    prix!: number;
    description!: string;
    composants!: Composant[];
    supplements?: Composant[]
}

export type Produit = Boisson | PlatChaud | Sandwich;
export type TypeProduit = 'boisson' | 'plat' | 'sandwich';