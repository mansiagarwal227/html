import {Application, Container,Resource, Sprite, Texture,} from 'pixi.js';
import assets from './assets';
import { preLoader } from './PreLoader';
import {  getTexture } from './Texture';
export class Games{
    private stage : Container;
    private dir_x :number=0;
    private dir_y:number=0;
    private speed:number= 3
    private game_over:boolean= false;
    private keyvalue : string = "none";
    private food:any;
    private snake:any;

    private readonly background : Container;
    private  app : Application;
    constructor(app:Application){
        this.app = app;
        this.food= this.food;
        this.snake=this.snake;
        this.stage = this.app.stage;
        this.background = new Container();
        this.stage.addChild(this.background);
        preLoader(assets, ()=>{
            this.createBack(getTexture('ground') as Texture<Resource>);
           this.snake=this.createImageSnake();
            this.food =  this.createImagefood();
            console.log(app)
            window.onkeydown=(e:KeyboardEvent)=>{
                this.keyvalue = e.code
                this.snake_position_update()
            }
        })
    }
    private createBack(texture: Texture): Sprite {
        const img = Sprite.from(texture);
        img.position.set(0, 0);
        img.width = this.app.view.width;
        img.height = this.app.view.height;
        return this.background.addChild(img);
    }

    public createImageSnake ():any{
        const img=new Sprite(getTexture("snakehead") as unknown as  Texture<Resource>)
        img.anchor.set(0.5);
        img.scale.set(0.8);
        img.position.set(this.app.view.width/2,this.app.view.height/2);
        return this.background.addChild(img);
        }
    public createImagefood ():any{
        const img=new Sprite(getTexture("food") as unknown as  Texture<Resource>)
        img.anchor.set(0.5);
        img.scale.set(0.5);
        img.position.set(this.app.view.width/3,this.app.view.height/2);
        return this.background.addChild(img);
        }
    private snake_position_update(){

        if(this.keyvalue==='ArrowLeft'){
            if(this.dir_x!=1){
            this.dir_x =-1;
            this.dir_y =0;}
        }
        else if(this.keyvalue === 'ArrowRight'){
            if(this.dir_x!=-1){
            this.dir_x = 1;
            this.dir_y =0;}
        }
        else if(this.keyvalue === 'ArrowUp'){
            if(this.dir_y!=1){
            this.dir_x =0;
            this.dir_y =-1;}
        }
        else if (this.keyvalue === 'ArrowDown'){
            if(this.dir_y!=-1){
            this.dir_x =0;
            this.dir_y =1}
        }
        else if (this.keyvalue=='Space'){
            this.dir_x=0;
            this.dir_y =0
        }
        if(this.snake){
        this.snake.x+=this.dir_x*this.speed
        this.snake.y+=this.dir_y*this.speed}
    }
        check_boundary_constraint()
        {
        if(this.snake){
            console.log(this.snake.y,this.app.view.height)
        if(this.snake.x<65/2  ||  this.snake.x+65/2>800){
            this.game_over = true;

        }
        if(this.snake.y<40 ||  this.snake.y+80/2>500){
            this.game_over = true;
        }
    }}

     update():void{
        if(!this.game_over){
            this.snake_position_update()
            this.check_boundary_constraint()
            if (this.snake) {
                if (this.collision(this.snake, this.food)) {
                    this.dir_x = 0;
                    this.dir_y = 0;
                    this.food.x = this.randomInt(0, (this.app.view.width - 120));
                    this.food.y = this.randomInt(0, (this.app.view.height - 30));       
                }
            }
        }
        else{
            location.reload()
        }
        }
    //new food position
         randomInt(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
     
     //food collision detection
        collision(image1: any, image2: any) {
        let collision1 = image1.position;
        let collision2 = image2.position;
        return collision1.x < collision2.x + image2.width
            && collision1.x + image1.width > collision2.x
            && collision1.y < collision2.y + image2.height
            && collision1.y + image1.height > collision2.y
    }
}