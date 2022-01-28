// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript

export function copyToClipboard(text, callback) {
    if (!navigator.clipboard) {
        callback({success: false, error: "unsupported"})
        return
    }

    navigator.clipboard.writeText(text).then(
        () => callback({success: true, error: undefined}),
        err => callback({success: false, error: err}),
    )
}
