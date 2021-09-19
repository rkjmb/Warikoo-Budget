const redirectToLink = (url, newTab = true) => {
    window.open(url, newTab ? '_blank' : null).focus();
}

export { redirectToLink };