const header = () => {
    document.addEventListener(
        "DOMContentLoaded", () => {
            let content = document.querySelector('#content');
            let header = document.querySelector('#my-header');

            let headerHeight = getComputedStyle(header).height;
            console.log(headerHeight)
            content.style.bottom = headerHeight;
        }
    );

};


export {header};

