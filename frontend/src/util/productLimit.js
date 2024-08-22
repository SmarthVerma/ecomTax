
export const productLimit = () => {
    if (window.innerWidth < 768) return 4; // `sm` screens
    else if (window.innerWidth < 1024) return 6; // `md` screens
    else return 8; // `lg` screens and above
}