let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let savedTime = 0;
let running = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
console.log(new Date().getTime())

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 10); // Update every 10ms for smoother display
        
        startStopBtn.innerHTML = "Stop";
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        
        startStopBtn.innerHTML = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    
    startStopBtn.innerHTML = "Start";
    display.innerHTML = "00:00:00";
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    // Calculate time components
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    // You can also add milliseconds with: let milliseconds = Math.floor((difference % 1000) / 10);

    // Format time to ensure two digits
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    // Update the display
    display.innerHTML = hours + ":" + minutes + ":" + seconds;
}