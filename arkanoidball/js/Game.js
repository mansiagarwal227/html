import {Paddle} from "./Paddle.js";
import {Ball} from "./Ball.js";
import {GameOver} from "./GameOver.js";
import {bricks} from "./BrickLayout.js";
import {Brick} from "./Brick.js";
import {BaseBox} from "./BaseBox.js";
import { GameWin } from "./Gamewin.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isRunning = false;
        this.ctx.lineWidth = 3;
    }
    start() {
        this.background = new BaseBox({
            x: this.canvas.width/2,
            y: this.canvas.height/2,
            width: this.canvas.width,
            height: this.canvas.height,
           color:'rgb(0,0,0,0)'
        });
        this.bricksCollection = [];
        bricks.forEach((brickLayout, index) => {
            for(let r=0; r < brickLayout.rows;r++) {
                for(let c=0; c < brickLayout.columns; c++) {
                    const brick = new Brick({
                        x: brickLayout.x + (c * (brickLayout.width + brickLayout.padding)),
                        y: brickLayout.y + (r * (brickLayout.height + brickLayout.padding)),
                        width: brickLayout.width,
                        height: brickLayout.height,
                        color: brickLayout.color,
                        score: brickLayout.score
                    });
                    this.bricksCollection.push(brick);
                }
            }
        });
        this.paddle = new Paddle({
            x: this.canvas.width / 2,
            y: this.canvas.height - 50,
            width: 100,
            height: 20,
            color: 'yellow',
            maxXBound: this.canvas.width
        });
        this.ball = new Ball({
            x: this.canvas.width / 2,
            y: this.canvas.height - 70,
            radius: 10,
            bounds: {
                left: 0,
                top:0,
                right: this.canvas.width,
                bottom:this.canvas.height
            }
        });
        this.gameOver = new GameOver(this.canvas);
        this.gameWin  = new GameWin(this.canvas);
        this.score = 0;
        this.lives = 3;
    }
    reset() {
        this.paddle.isAlive = true;
        this.paddle.x = this.canvas.width / 2 - this.paddle.width/2;
        this.paddle.y = this.canvas.height - 50 - this.paddle.height/2;
        this.ball.isAlive = true;
        this.ball.isActive = false;
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height - 70;
    }
    onKeyDown(kev) {
        if(this.gameOver.isGameOver) {
            kev.preventDefault();
            return;
        }
        switch(kev.code){
            case 'ArrowLeft':
                this.paddle.move('left');
                break;
            case 'ArrowRight':
                this.paddle.move('right');
                break;
        }
    }
    onKeyUp(kev) {
        if(this.gameOver.isGameOver) {
            kev.preventDefault();
            return;
        }
        switch(kev.code) {
            case 'ArrowLeft':
            case 'ArrowRight':
                this.paddle.stop();
                break;
            case 'Space':
            case 'KeyS':
                this.ball.bounce();
                this.isRunning = true;
                break;
        }
    }
    update() {
        if(this.gameOver.isGameOver) {
            return;
        }
        if(!this.isRunning) {
            return;
        }
        this.paddle.update();
        this.ball.update();
        if(this.paddle.hitTest(this.ball)) {
            this.ball.bounceUp();
        }
        this.bricksCollection.forEach(brick => {
            if(brick.isAlive && brick.hitTest(this.ball)) {
                brick.isAlive = false;
                this.ball.bounceUp();
                this.score += brick.score;
            }
        });
        if(!this.ball.isAlive) {
            this.lives--;
            if(this.lives === 0) {
                this.gameOver.isGameOver = true;
            }
            this.paddle.isAlive = false;
            this.isRunning = false;
            setTimeout(this.reset.bind(this), 500);
        }
        let aliveBricks = this.bricksCollection.filter(brick => brick.isAlive);
        if(aliveBricks.length === 28) {
            this.ball.speed++;
            this.paddle.maxSpeed++;
        } else if(aliveBricks.length === 14) {
            this.ball.speed++;
            this.paddle.maxSpeed++;
        } else if(aliveBricks.length === 7) {
            this.ball.speed++;
        } else if(aliveBricks.length === 0) {
            this.gameWin.isGameWin = true;
        }
    }
    
    draw() {
        let canvas = this.canvas;
        let ctx = this.ctx;
        const SCORE_IMG=new Image();
        const lives_IMG=new Image();
        SCORE_IMG.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT671NvsjEwLKn3Q7Ld_4i2grdJjBGPnkEBS-_heT0JlfgxLpYUHJGuqtZUJwm6kSOHmlM&usqp=CAU";
        lives_IMG.src="data:image/jpeg;base64,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";
        ctx.clearRect(0,0, canvas.width, canvas.height);
        this.background.draw(ctx);
        ctx.font = '30px Arial Bold';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.drawImage(lives_IMG,10,10,30,30);
        ctx.fillText(this.lives, 50, 40);
        ctx.textAlign = 'right';
        ctx.drawImage(SCORE_IMG,730,10,60,20);
        ctx.fillText( this.score, 750, 60);
        
        this.paddle.draw(ctx);
        this.ball.draw(ctx);
        this.bricksCollection.forEach(brick => brick.draw(ctx));

        this.gameOver.draw(ctx);
    }
}
