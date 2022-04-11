import kaboom from "../kaboom/dist/kaboom.mjs";

kaboom({
    global: true,
    // width: 600,
    // height: 300,
    fullscreen: true,
    scale: 2, 
    debug: true,
    background: [0, 0, 0, 1],
});

add([
    text("hello"),
    pos(120, 80),
]);

//mario level sprites
loadSprite('coin', '../assets/coin.png');
loadSprite('brick', '../assets/brick.png');
loadSprite('block', '../assets/box.png');
loadSprite('mario', '../assets/mario.png');
loadSprite('mushroom', '../assets/mushroom.png');
loadSprite('evil-mushroom', '../assets/evil-mushroom.png');
loadSprite('surprise-box', '../assets/surprise-box.png');
loadSprite('pipe', '../assets/pipe.png');

//start screen sprites
loadSprite('start-screen', '../assets/start-screen.png');