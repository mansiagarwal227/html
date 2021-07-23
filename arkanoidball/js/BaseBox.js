export class BaseBox{
    constructor(props) {
        this.x = props.x - props.width/2;
        this.y = props.y - props.height/2;
        this.width = props.width;
        this.height = props.height;
        this.color = props.color;
        this.isAlive = true;
    }

    set x(value) {
        this._x = value;
    }
    get x() {
        return this._x
    }

    set y(value) {
        this._y = value;
    }
    get y(){
        return this._y;
    }

    set width(value) {
        this._w = value;
    }
    get width(){
        return this._w;
    }

    set height(value) {
        this._h = value;
    }
    get height(){
        return this._h;
    }

    hitTest(ball) 
    {
        let distX = Math.abs(ball.x - this.x-this.width/2);
        let distY = Math.abs(ball.y - this.y-this.height/2);
        if( distX <= (ball.radius + this.width/2) && distY <= (ball.radius + this.height/2))
        {
            return true;
        } else 
        {
            return false;
        }
    }
    get boundRect() {
        return {
            top: this._y,
            left: this._x,
            right: this._x + this._w,
            bottom : this._y + this._h
        };
    }

    draw(ctx) {
        if(this.isAlive) {
            ctx.fillStyle =this.color;
            ctx.fillRect(this._x, this._y, this._w, this._h);
            ctx.strokeStyle = "white";
            ctx.strokeRect(this._x, this._y, this._w, this._h);
        }
    }
}