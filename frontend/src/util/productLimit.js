
export const productLimit = () => {

    console.log('HERERE!!!!! HEREEE!!!!', window.innerWidth)
    if (window.innerWidth < 640) return 1
    else if (window.innerWidth < 1024) return 4
    else return 6
}