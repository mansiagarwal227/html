import {BaseBox} from "./BaseBox.js";

export class Paddle extends BaseBox{
    constructor(props) {
        super(props);
        this.maxXBound = props.maxXBound - props.width;
        this.speed = 0;
        this.maxSpeed = 4;
        this.direction = '';
    }

    move(direction){
        this.direction = direction;
    }

    stop(){
        this.direction = '';
    }

    update(){
        let x = this.x;

        if(this.direction === 'left') {
            this.speed = (x > 0)? -this.maxSpeed : 0;
        } else if(this.direction === 'right') {
            this.speed = (x < this.maxXBound)? this.maxSpeed : 0;
        } else {
            this.speed = 0;
        }
        this.x += this.speed;
    }
}