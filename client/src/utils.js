const utils = {
    offsetElement: (el) => {
        const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }, 
    scrollTop: () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return scrollTop;
    }
}

export default utils;