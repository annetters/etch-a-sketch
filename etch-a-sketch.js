// Select the elements on the page (canvas and button)
const canvas = document.querySelector('#etch-a-sketch');
const button = document.querySelector('.shake');
const shakeButton = document.querySelector('.shake');

const ctx = canvas.getContext('2d');
const MOVE_AMOUNT = 15; // all caps is good form when it's a true constant 

// Set up the canvas for drawing

// const width = canvas.width;
// const height = canvas.height;
// or, destructure the above...
const {width, height} = canvas;

// create a random x and y starting point on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;

ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();


// write a draw function
// TODO: deeper dive into object destructuring
function draw({key}){
    // increment the hue to make rainbow effect!
    hue = hue + 3;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    console.log(key);

    // put the needle down
    ctx.beginPath();
    ctx.moveTo(x, y);

    // then move your X and Y values depending on what the user did
    switch(key){
        case 'ArrowUp': y = y - MOVE_AMOUNT; 
        break; // break is required, because the case did what it needed to do.
        case 'ArrowDown': y = y + MOVE_AMOUNT; 
        break;
        case 'ArrowLeft': x = x - MOVE_AMOUNT; 
        break;
        case 'ArrowRight': x = x + MOVE_AMOUNT; 
        break;
        default: break; // default is required for switch
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();

};

// write a handler for the keys
function handleKey(e){
    if (e.key.includes('Arrow')){
        e.preventDefault(); // prevents keyDown from moving the page (targeting 'arrow' keys)
        draw({ key: e.key });
    } 
};

// write a clear/shake function
function clearCanvas() {
    canvas.classList.add('shake'); // adds the animation class
    ctx.clearRect(0, 0, width, height); // clears the drawing
    canvas.addEventListener(
        'animationend',
        function() {
          console.log('Done the shake!');
          canvas.classList.remove('shake');
        },
        { once: true }
      );
    }
    
// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);