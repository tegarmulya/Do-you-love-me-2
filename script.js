const startButton = document.getElementById("start_button");
const gifLanding = document.querySelector(".gif");
const questionLanding = document.querySelector(".question");


var question = null;
var gifMain = null;
var yesButton = null;
var noButton = null;
var input = null;
var count = 0;

// Initialize a persistent audio element and toggle button outside <body>
(function initPersistentAudio(){
    let audio = document.getElementById('bg-music');
    let btn = document.getElementById('music-toggle');
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'bg-music';
        audio.src = 'music.mp3';
        audio.autoplay = true;
        audio.muted = true; // start muted to allow autoplay in browsers
        audio.loop = false;
        document.documentElement.appendChild(audio);
    } else {
        audio.loop = false;
        audio.autoplay = true;
        audio.muted = true;
        // move out of body so it's not removed by body.innerHTML resets
        try { document.documentElement.appendChild(audio); } catch(e){}
    }

    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'music-toggle';
        btn.setAttribute('aria-label','Toggle music');
        btn.textContent = '🔊';
        document.documentElement.appendChild(btn);
    } else {
        try { document.documentElement.appendChild(btn); } catch(e){}
    }

    let playing = false;
    if (btn && audio) {
        btn.addEventListener('click', () => {
            if (audio.paused || audio.muted) {
                audio.muted = false;
                audio.currentTime = 0;
                audio.play().catch(e => console.log('Play blocked:', e));
                btn.textContent = '🔈';
                playing = true;
            } else {
                audio.pause();
                btn.textContent = '🔊';
                playing = false;
            }
        });

        audio.addEventListener('ended', () => {
            btn.textContent = '🔊';
            playing = false;
        });

        // Try to unmute/play on first user gesture anywhere (so audio can be audible before Start)
        const unmuteOnGesture = () => {
            if (audio.muted) {
                audio.muted = false;
                audio.currentTime = 0;
                audio.play().catch(e => console.log('Gesture play blocked:', e));
                btn.textContent = '🔈';
            }
            document.removeEventListener('click', unmuteOnGesture, true);
        };
        document.addEventListener('click', unmuteOnGesture, true);
    }
})();


startButton.addEventListener("click", () => {
    input = document.getElementById("fname").value;

    if (input== ""){
        gifLanding.src = "https://media.giphy.com/media/VB3cK9oA48BbQWcObd/giphy.gif";
        questionLanding.innerHTML = "ishh, masukin nama kamu dulu!!"
    }
    else{
        document.head.innerHTML = "<meta charset='UTF-8'>"+
        "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
        "<title>Do You Love Me?</title>"+
        "<link rel='stylesheet' href='styleMain.css'/>"

        document.body.innerHTML = "<div class='wrapper'><h2 class='question'>Hello "+input+ "! emmm anu, lu suka gak sama gua?</h2>"+
        "<img class='gif' alt='gif' src='https://media.giphy.com/media/0kDdAFAELmvvFNUKim/giphy.gif'/>"+
        "<div class='btn-group'><button class='yes-btn'>Yes</button>"+
        "<button class='no-btn'>No</button></div></div>"

        questionMain = document.querySelector(".question");
        gifMain = document.querySelector(".gif");
        yesButton = document.querySelector(".yes-btn");
        noButton = document.querySelector(".no-btn");

        // persistent audio and toggle are managed by initPersistentAudio()

        yesButton.addEventListener("click", yesButtonListener);
        noButton.addEventListener("click", noButtonListener);
    }
});

function yesButtonListener(){
    document.body.innerHTML = "<div class='wrapper'><h2 class='question'>Yeayy! bagi pap imutnya donggg ❤️, "+input+ "!</h2>"+
    "<img class='gif' alt='gif' src='https://media.giphy.com/media/fHGl1MDMNkO6fOaFDF/giphy.gif'/>"+
    "</div><script src='scriptMain.js'></script>";
    gifMain && (gifMain.src = "https://media.giphy.com/media/fHGl1MDMNkO6fOaFDF/giphy.gif");
}

function noButtonListener(){
    if (count < 5) {
        gifMain.src ="https://media.giphy.com/media/hbOgjMOUfLdWV2Ty1j/giphy.gif";
        questionMain.innerHTML = "Serius nihh?";
    }
    else if (count >= 5 && count < 10){
        gifMain.src ="https://media.giphy.com/media/QuCslOrnS649PSCnn7/giphy.gif";
        questionMain.innerHTML = "Udahh gausah bohong, suka gak?!!";
    }
    else{
        gifMain.src ="https://media.giphy.com/media/8OPf6xrtXi3QEcu5h9/giphy.gif";
        questionMain.innerHTML = "JAWAB AJAA, LU SUKA SAMA GUA APA ENGGAA?!";
    }
    const noButtonRect = noButton.getBoundingClientRect();
    const maxX = window.innerWidth - noButtonRect.width;
    const maxY = window.innerHeight - noButtonRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
    count = count+1;
}