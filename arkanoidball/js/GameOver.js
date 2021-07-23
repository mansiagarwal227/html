export class GameOver {
    constructor(canvas) {
        this.canvas = canvas;
        this.isGameOver = false;
    }
    draw(ctx) {
        if(this.isGameOver) {
            const canvasH = this.canvas.height;
            const canvasW = this.canvas.width;
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.beginPath();
            ctx.rect(0, 0, canvasW, canvasH);
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = 'black';
            ctx.strokeStyle = 'white';
            ctx.textAlign = 'center';
            ctx.font = '40px Arial Bold';
            ctx.lineWidth = 3;
            ctx.strokeText('Game Over', canvasW / 2, canvasH / 2);
            ctx.fillText('Game Over', canvasW / 2, canvasH / 2);
        }
    }
}