export const changerCurrency = ( currency: string ): string => {
    switch (currency){
        case 'EUR':
            return '€';
        case 'USD':
            return '$';
        case 'RUB':
            return '₽';
        default:
            return '$';
    }

}