export const footerHeight = () => {
    const footer = document.getElementById('footer')
    if (footer) {
        const height = footer.offsetHeight
        return height
    }
}