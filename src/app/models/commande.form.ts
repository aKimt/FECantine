export interface CommandeForm {

    username: string;
    date: Date;
    boissons?: CmdProduit[];
    platChauds?: CmdProduit[];
    sandwiches?: CmdSandwich[];

}

export interface CmdProduit {
    nom: string;
    qte: number;
}

export interface CmdSandwich extends CmdProduit {
    supplement: string[];
    moins: string[];
}