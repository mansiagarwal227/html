let canvas;
let cnvs;
let carw=650;
let carh=300;
let streetw=375;
let streeth=0;
let car;
let street;
let car1;
let car2;
class carspeed
{ constructor(r,c,speed)
    {
        this.r=r;
        this.c=c;
        this.speed=speed;
    }
}
carspeed=new carspeed(0,0,2);
document.addEventListener('DOMContentLoaded',setupcanvas);
function setupcanvas()
 {
    canvas =document.getElementById('mycanvas');
    cnvs =canvas.getContext('2d');
    car= new Image();
    street =new Image();
    draw();
    window.addEventListener('keydown',keypressing);
    window.addEventListener('keyup',keypressing)
    
}
function draw() {
    if(carh+150<=canvas.height && carh>0)
    {
    carh+=carspeed.speed*carspeed.c;}
    else{
        carspeed.c=0;
    }
    if(carw+100<=1125 && carw+100>460)
    {
    carw+=carspeed.speed*carspeed.r;
    }
    else{ carspeed.r=0;}
    car=new Image();
    street=new Image();
    car1=new Image();
    car2=new Image();
    car.src="https://th.bing.com/th/id/R.2144a2fae2c7e97c3b6e2ae01d065593?rik=Q0l6D0MdNHufcQ&pid=ImgRaw";
    street.src="https://thumbs.dreamstime.com/b/asphalt-road-top-view-highway-line-marks-asphalt-road-top-view-115709711.jpg"
    car1.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_-Rm_nVyH2GHA3cZlXSY8kjAiQDERGlkiUw&usqp=CAU";
    car2.src="https://th.bing.com/th/id/R.2144a2fae2c7e97c3b6e2ae01d065593?rik=Q0l6D0MdNHufcQ&pid=ImgRaw";
    cnvs.clearRect(0,0,canvas.width,canvas.height);
    cnvs.drawImage(street,streetw,streeth,750,720);
    cnvs.drawImage(car,carw,carh,100,150);
    cnvs.drawImage(car1,500,200,80,150);
    cnvs.drawImage(car2,700,500,90,150)
    
    requestAnimationFrame(draw);
    console.log("daw");
}
function keypressing(k) {
    console.log("event");
    switch(k.type)
    {
        case 'keydown':
            switch(k.code)
            {
                case 'KeyI':
                case 'ArrowUp':
                    carspeed.c=-1;
                    break;
                case 'KeyK':
                case 'ArrowDown':
                    carspeed.c=1;
                    break;
                case 'KeyJ':
                case 'ArrowLeft':
                    carspeed.r=-1;
                    break;
                case 'KeyL':
                case 'ArrowRight':
                    carspeed.r=1;
                    break;
            }
            break;
        case 'keyup':
            switch(k.code)
            {
                case 'KeyI':
                case 'ArrowUp':
                case 'KeyK':
                case 'ArrowDown':
                    carspeed.c=0;
                    break;
                case 'KeyJ':
                case 'ArrowLeft':
                case 'KeyL':
                case 'ArrowRight':
                    carspeed.r=0;
                    break;
            }
            break;
    }
}
