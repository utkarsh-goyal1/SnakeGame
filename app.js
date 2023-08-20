const canvas=document.getElementById('canvas');
//to write or create anything on canvas we have to create the rendring context.
const pen=canvas.getContext('2d');//rendering context,it has many methods.

//1-fillRect ->used to create a rectangle on canvas.
//2-fillStyle ->used to fill the color on rectangle or any other shapes,bydefault color is black.
//3-clearRect ->used to clear/remove the rectangle from the canvas. 
pen.fillStyle='yellow';

const cs=67;
const W=1200;
const H=635;
let food=null;
let score=0;
const snake={
    init_len:5,
    direction:'right',
    cells:[],
    createSnake:function()
    {
        for(let i=0;i<this.init_len;i++)
        {
            this.cells.push({
                x:i,
                y:0,
            });
        }
    },
    drawSnake:function()
    {
        for(let cell of this.cells)
        {
            pen.fillRect(cell.x*cs,cell.y*cs,cs-1,cs-1);
            //here we use cs-1 to create the line between each cell.
            //here we multiply cell.x*cs otherwise all the cells will form above each other.
        }
    },
    updateSnake:function()
    {
        //getting the value of head of snake i.e last cell in array
        const headX=this.cells[this.cells.length-1].x;
        const headY=this.cells[this.cells.length-1].y;
        if(headX===food.x && headY===food.y)
        {
            score++;
            food=getRandomFood();
        }
        else{
            
            //remove first cell
            this.cells.shift();
        }
        let nextX;
        let nextY;
        if(this.direction==='down')
        {
            nextX=headX;
            nextY=headY+1;
            if(nextY*cs>=H)
            {
                pen.fillStyle='red';
                pen.fillText("Game Over",100,50);
                clearInterval(id);
            }
        }
        else if(this.direction==='left')
        {
            nextX=headX-1;
            nextY=headY;
            if(nextX*cs<0)
            {
                pen.fillStyle='red';
                pen.fillText("Game Over",100,50);
                clearInterval(id);
            }
        }
        else if(this.direction==='up')
        {    
            nextX=headX;
            nextY=headY-1;
            if(nextY*cs<0)
            {
                pen.fillStyle='red';
                pen.fillText("Game Over",100,50);
                clearInterval(id);
            }
        }
        else if(this.direction==='right')
        {    
            nextX=headX+1;
            nextY=headY;
            if(nextX*cs>=W)
            {
                pen.fillStyle='red';
                pen.fillText("Game Over",100,50);
                clearInterval(id);
            }
        }
        //push the new cell after the head inside the cells array.
        this.cells.push({
            x:nextX,
            y:nextY
        });
    }
}

//this is used to initialise the game.
function init()
{
    snake.createSnake();
    food=getRandomFood()
    function keyPressed(e)
    {
        if(e.key==='ArrowDown')
        {
            snake.direction='down';
        }
        else if(e.key==='ArrowLeft')
        {
            snake.direction='left';
        }
        else if(e.key==='ArrowUp')
        {
            snake.direction='up';
        }
        else if(e.key==='ArrowRight')
        {
            snake.direction='right';
        }
    }
    document.addEventListener('keydown',keyPressed);
}
//used to update the properties of the game.
function update()
{
    snake.updateSnake();
}
//Draw something on the canvas.
function draw()
{
    pen.clearRect(0,0,W,H);
    pen.font='40px sans-serif';
    pen.fillText(`score ${score}`,100,50);
    pen.fillStyle='blue';
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
    pen.fillStyle='yellow';
    snake.drawSnake();
}
//to repeat the process of update and draw or to loop it we have a made function called gameLoop.but it will not help in looping .to repeat the same task we 
//use setInterval.
//setInterval return the id which we can use to stop the process by using clearInterval (id)function.
function gameLoop()
{
    update();
    draw();
}
function getRandomFood()
{
    const foodX=Math.round(Math.random()*(W-cs)/cs);//here we divide by cs to get the food in the multiple of cs otherwise it may be possible food may be overlapped by the snake.
    const foodY=Math.round(Math.random()*(H-cs)/cs);
    food={
        x:foodX,
        y:foodY
    }
    return food;
}
init();
const id=setInterval(gameLoop,100);
