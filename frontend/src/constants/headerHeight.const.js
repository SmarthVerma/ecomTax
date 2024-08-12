export const headerHeight = () => {
    const header = document.getElementById('header')
    if (header) {
        const height = header.offsetHeight
        return height
    }
}