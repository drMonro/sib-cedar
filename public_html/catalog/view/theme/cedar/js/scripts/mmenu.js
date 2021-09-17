const mmenu = () => {
    document.addEventListener(
        "DOMContentLoaded", () => {
            new Mmenu( "#my-menu", {
                "setSelected": {
                    "hover": true,
                    "parent": true
                },
                navbar: {
                    title: '<button class="menu-close"><svg width="54" height="54"><use xlink:href="#exit"></use></svg></button>'

                },
                "extensions": [
                    // "position-back",
                    "position-front",
                    "position-right",
                    'pagedim-black'
                ],
                // "pageScroll": true,
                pageScroll: {
                    "scroll": true
                }
            }, {
                pageScroll: {
                    "scrollOffset": 300,
                    "updateOffset": 50
                }
            });
        }
    );
};

export {mmenu};

