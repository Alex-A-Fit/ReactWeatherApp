
function FetchJson(url) {
    return fetch(url).then(
        response => response.json()
    ).catch(
        error => console.log(error)
    )
}
    export { FetchJson }