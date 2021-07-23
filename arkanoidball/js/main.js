import {Game} from "./Game.js";

onload = ()=>{
    const main = document.querySelector("#main");
    const canvas = document.createElement("canvas");
    const soundElement  = document.getElementById("sound");
     canvas.width = 800;
    canvas.height = 600;
    main.append(canvas);

    const game = new Game(canvas);
    game.start();

    onkeydown = game.onKeyDown.bind(game);
    onkeyup = game.onKeyUp.bind(game);
    function tick (){
        game.update();
        game.draw();
        requestAnimationFrame(tick);
    }
    tick();
}