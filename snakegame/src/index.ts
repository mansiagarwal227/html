import "./css/main.scss";
import {Application, Ticker} from 'pixi.js';
import {Games} from "./ts/Games";
window.onload = ()=>{
    const app = new Application({
        width:800,
        height:500,
        sharedTicker: true,
        sharedLoader:true,
       
    });

    document.body.appendChild(app.view);

    const game = new Games(app);
    const ticker = Ticker.shared;
    ticker.add(game.update.bind(game));
};
