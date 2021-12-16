export function numberWithCommas(x: number): string {
    const str = String(Math.round(x))
    return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}