/**
 * query object to query string
 *
 * @param paramsObject
 * @returns {string}
 */
function toQueryString (paramsObject) {
    return Object.keys(paramsObject).map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(paramsObject[key])
    }).join('&')
}

export {toQueryString}
