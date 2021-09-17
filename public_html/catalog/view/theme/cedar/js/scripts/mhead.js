const mhead = () => {
    document.addEventListener(
        "DOMContentLoaded", () => {
            new Mhead( "#my-header", {
                unpin: 1200,
                hamburger: {
                    animation: "colapse"
                },
            });
        }
    );
};


export {mhead};

