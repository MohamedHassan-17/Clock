let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let savedTime = 0;
let running = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");

const userSelect = document.getElementById("userSelect");
const currentUserDisplay = document.getElementById("currentUserDisplay");
let currentUsername = "Guest"; // Default username

// adding event listeners to buttons
startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
console.log(new Date().getTime())


// function to start and stop the stopwatch
function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 10); // Update every 10ms for smoother display
        
        startStopBtn.innerHTML = "Stop";
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        if (savedTime > 0) {
            saveTimeToDatabase(savedTime);
        }
        startStopBtn.innerHTML = "Start";
        running = false;
    }
}

// function to reset the stopwatch
function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    
    startStopBtn.innerHTML = "Start";
    display.innerHTML = "00:00:00:000";
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    // Calculate time components
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    // Format time to ensure two digits
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    
    // Update the display
    display.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}



// Update currentUsername whenever the dropdown changes
userSelect.addEventListener("change", (e) => {
    currentUsername = e.target.value;
    currentUserDisplay.innerText = currentUsername;
});
function saveTimeToDatabase(seconds) {
    fetch('/save-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            duration: seconds,
            username: currentUsername
         }), // Sending the time
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}