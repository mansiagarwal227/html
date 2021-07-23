import {BaseBox} from "./BaseBox.js";

export class Brick extends BaseBox {
    constructor(props) {
        super(props);
        this.score = props.score;
    }
}