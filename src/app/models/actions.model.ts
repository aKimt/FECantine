export interface Action {
    nom: string,  
    iconName: string,
    message: string,
    action: (...args: any[]) => void
}

export type ActionList = {
    [key:string] : Action
}

export type ActionName = 
'display-info' |
'add-to-cart' |
'clear-from-cart' |
'increment-cart-prod' |
'decrement-cart-prod'

export const ALL_ACTIONS: ActionName[] = [
    'add-to-cart',
    'clear-from-cart',
    'display-info',
    'increment-cart-prod',
    'decrement-cart-prod'
]


export const ACTION_PER_USE: {
    [role: string]: ActionName[]
} = {
    'menu': [
        'add-to-cart',
        'clear-from-cart',
        'display-info'
    ],
    'cart': [
        'clear-from-cart',
        'increment-cart-prod',
        'decrement-cart-prod'
    ]
}