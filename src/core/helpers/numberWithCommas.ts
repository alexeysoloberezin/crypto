export function numberWithCommas(x: number): string {
    const str = String(x)
    return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}