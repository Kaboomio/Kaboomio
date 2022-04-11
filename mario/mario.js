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


//START SCENE
scene('start', () => {
    
    const startScreen = add([
        sprite('start-screen'),
        origin('center'), 
        pos(0, 0), 
        scale(0.65)
    ]);
    add([
        text('Press Spacebar To Start'),
        origin('center'), 
        pos(0, 125), 
        scale(0.25)
    ]);

    onKeyDown('space', () => {
        go('game');
    });
    
    onUpdate(() => {
        camPos(startScreen.pos.x, (startScreen.pos.y + 50));
    });
});


//GAME SCENE
scene('game', () => {
    layers(['bg', 'obj', 'ui'], 'obj');


    //MARIO & HIS MOVEMENT
    const mario = add([
        sprite('mario'), 
        solid(), 
        area(),
        pos(30, 0),
        body(),
        origin('bot'),
        'mario'
    ]);

    const marioSpeed = 120;
    const marioJumpHeight = 600;

    onKeyDown('left', () => {
        mario.move(-marioSpeed, 0);
    });

    onKeyDown('right', () => {
        mario.move(marioSpeed, 0);
    });

    onKeyPress('space', () => {
        if (mario.isGrounded()) {
            mario.jump(marioJumpHeight);
        }
    });

    //GAME LEVEL CONFIG
    const gameLevel = addLevel([
        '                                     ',
        '                                     ',
        '        ***                          ',
        '                                     ',
        '                                     ',
        '                 ****                ',
        '                                     ',
        '                                     ',
        '                 ====                ',
        '                                     ',
        '                                     ',
        '     **   =$=#=                      ',
        '                                     ',
        '                         ?           ',
        '                    ^  ^             ',
        '===========================    ======',
    ], {
        // define the size of each block
        width: 20,
        height: 20,
        // define what each symbol means, by a function returning a component list (what will be passed to add())
        '=': () => [sprite('brick'), area(), solid(), 'brick'],
        '*': () => [sprite('coin'), area(), 'coin'],
        '$': () => [sprite('surprise-box'), solid(), area(), 'coin-surprise'],
        '#': () => [sprite('surprise-box'), solid(), area(), 'mushroom-surprise'],
        '^': () => [sprite('evil-mushroom'), solid(), area(), 'evil-mushroom', body()],
        '?': () => [sprite('pipe'), solid(), area(), 'pipe'],
        '+': () => [sprite('block'), solid(), area()],
        '@': () => [sprite('mushroom'), solid(), area(), 'mushroom', body()],
    });


    //CAMERA POSITIONING
    onUpdate(() => {
        // camPos(mario.pos.x, 180);
        camPos(mario.pos);
    });
});

//NEEDED - END GAME SCENE

go('game');