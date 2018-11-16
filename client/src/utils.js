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
    },
    formatTitleUrl: (str) => {
        const formatedTitleUrl = str.toLowerCase().replace(' ','-');
        return formatedTitleUrl;
    }
}

export default utils;