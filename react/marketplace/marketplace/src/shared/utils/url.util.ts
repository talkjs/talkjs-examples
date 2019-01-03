/**
 * Returns the id parameter from the current active URL.
 * If the parameter can not be converted to a number this function will return null.
 * @param pathName The pathname of the current active URL. 
 *                 e.g. localhost:3000/products/11
 *                 '/products/' would be the pathName, to extract the id parameter, which is 11 in this example.
 */
export function getIdFromURL(pathName: string) : number {
    return Number(window.location.pathname.split(pathName)[1]);
}