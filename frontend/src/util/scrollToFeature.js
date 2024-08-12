
const scrollToFeature = () => {
    const element = document.getElementById('feature');
    const header = document.getElementById('header');
    let navbarHeight = header.offsetHeight
    let height = element.offsetTop;
    if (element && header) {
        const scrollTo = height - navbarHeight
        window.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
        });
    }
};

export { scrollToFeature }