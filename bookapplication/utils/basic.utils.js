export function convertToLowerCase() {

}

export function createOptions(transaction = null) {
    const options = {}
    if (transaction) {
        options.transaction = transaction
    }
    return options
}