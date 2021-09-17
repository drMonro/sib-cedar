import {soloProduct} from "./scripts/soloProduct";
import {mmenu} from "./scripts/mmenu";
import {mhead} from "./scripts/mhead";
import {header} from "./scripts/header";


// const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

class App {
    static init() {

        mmenu();
        soloProduct();
        mhead();
        header();
    }
}

App.init();
window.App = App;
