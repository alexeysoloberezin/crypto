
export const calcChange = (price: number, change: number): string => {
    const value = String(( price / change ) * 100);
    const first = value.slice(0,1)

    if (first === "-"){
        return value.slice(0,6)
    }else{
        return value.slice(0,5)
    }
}
