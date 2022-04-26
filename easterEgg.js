const whereAmI = document.getElementById('whereAmI');

const audio = [
    '../assets/sounds/friend.mp3',
    '../assets/sounds/number1.mp3',
    '../assets/sounds/superstar.mp3',
    '../assets/sounds/yourock.mp3',
    '../assets/sounds/youthebest.mp3',
    '../assets/sounds/special.mp3',
    '../assets/sounds/superduper.mp3'
];

whereAmI.addEventListener('click', () => {
    const fullscreenBtn = document.querySelector('#fullscreen');
    if (fullscreenBtn) {
        // very nice!
        const randomNumber = Math.round(Math.random() * (audio.length - 1));
        const audioFile = new Audio(audio[randomNumber]);
        audioFile.play();
    }
});