export function titleCase(str) {
    /**
     * @params hello all 
     * @return Hello All
     */
    str = str.split(" ")
    str = str.map((element) => {
        return element.slice(0, 1).toUpperCase() + element.slice(1)
    })
    str = str.join(" ")
    return str
}