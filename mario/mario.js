import kaboom from '../kaboom/dist/kaboom.mjs';

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
    text('hello'),
    pos(120, 80),
]);

let isJumping = true;


//mario level sprites
loadSprite('coin', '../assets/coin.png');
loadSprite('brick', '../assets/brick.png');
loadSprite('block', '../assets/box.png');
loadSprite('mario', '../assets/mario.png');
loadSprite('mushroom', '../assets/mushroom.png');
loadSprite('evil-mushroom', '../assets/evil-mushroom.png');
loadSprite('surprise-box', '../assets/surprise-box.png');
loadSprite('pipe', '../assets/pipe.png');
loadSprite('castle', '../assets/castle.png');


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
scene('game', ({ score, count }) => {
    layers(['bg', 'obj', 'ui'], 'obj');


    add([
        sprite('castle'),
        pos(1560, 188),
        layer('bg'),
        origin('bot'),
        scale(0.25)
    ]);



    //MARIO & HIS MOVEMENT
    const mario = add([
        sprite('mario'), 
        solid(), 
        area(),
        pos(1400, 0),
        body(),
        origin('bot'),
        'mario'
    ]);

    const marioSpeed = 120;
    const marioJumpHeight = 600;
    const coinScore = 200;

    onKeyDown('left', () => {
        mario.move(-marioSpeed, 0);
    });

    onKeyDown('right', () => {
        mario.move(marioSpeed, 0);
    });

    mario.onUpdate(() => {
        if (mario.isGrounded()) {
            isJumping = false;
        } else {
            isJumping = true;
        }
    });


    onKeyPress('space', () => {
        if (mario.isGrounded()) {
            mario.jump(marioJumpHeight);
        }
    });

    //EVIL MUSHROOM MOVEMENT & COLLIDE
    // const evilMushroomMove = 20;

    // onUpdate('evil-mushroom', (obj) => {
    //     obj.move(-evilMushroomMove, 0);
    // });

    // mario.onCollide('evil-mushroom', (obj) => {
    //     if (mario.pos.y === obj.pos.y) {
    //         destroy(obj);
    //     }
    // });

    mario.onCollide('dangerous', (d) => {
        if (isJumping) {
            destroy(d);
        } else {
            go('lose', { score: scoreLabel.value });
        }
    });


    mario.onCollide('coin', (obj) => {
        destroy(obj);
        scoreLabel.value += coinScore;
        scoreLabel.text = scoreLabel.value;
        coinCountLabel.value += 1;
        coinCountLabel.text = 'x' + coinCountLabel.value;
        addScoreText(obj, coinScore);
    });

    function addScoreText(obj, score) {
        const scoreText = add([
            text(score, {
                size: 8,
                width: 20, 
                font: 'sinko', 
            }),
            pos(obj.pos.x, obj.pos.y),
            lifespan(1, { fade: 0.01 })
        ]);
    }

    //GAME LEVEL CONFIG
    const map = [
        '                                                                                  ',
        '                                           %%%%                                   ',
        '                                                                                  ',
        '                                                          ===                     ',
        '                                                                                  ',
        '     *   =#=%=                          %===#%==*=             %%%                ',
        '                                  ===                   =                         ',
        '                                                        =                         ',
        '        *           ^   ^                             ^ =                         ',
        '==============================   ========================    =====================',
    ];

    //configuring the map to display
    const levelConfig = {
        width: 20,
        height: 20,
        '=': () => [sprite('brick'), area(), solid(), 'brick'],
        '*': () => [sprite('coin'), area(), 'coin'],
        '%': () => [sprite('surprise-box'), solid(), area(), 'coin-surprise'],
        '$': () => [sprite('surprise-box'), solid(), area(), 'coin-surprise'],
        '#': () => [sprite('surprise-box'), solid(), area(), 'mushroom-surprise'],
        '^': () => [sprite('evil-mushroom'), solid(), area(), 'evil-mushroom', 'dangerous', body(), patrol(150)],
        '?': () => [sprite('pipe'), solid(), area(), 'pipe'],
        '+': () => [sprite('block'), solid(), area()],
        '@': () => [sprite('mushroom'), solid(), area(), 'mushroom', body()],
    };

    const gameLevel = addLevel(map, levelConfig);

    //GAMEPLAY HEADER TEXT
    const usernameLabel = add([
        text('MARIO', {
            size: 18,
            width: 320, 
            font: 'sinko', 
        }),
        pos(1400, 6),
        fixed()
    ]);

    const scoreLabel = add([
        text(score, {
            size: 18,
            width: 320, 
            font: 'sinko', 
        }),
        pos(60, 30),
        layer('ui'),
        fixed(),
        {
            value: score
        }
    ]);

    add([sprite('coin'), pos(200, 32), layer('ui'), fixed()]);
    
    const coinCountLabel = add([
        text('x' + count, {
            size: 18,
            width: 320, 
            font: 'sinko', 
        }),
        pos(220, 30),
        fixed(),
        layer('ui'),
        {
            value: count
        }
    ]);


    //CAMERA POSITIONING
    onUpdate(() => {
        // camPos(mario.pos.x, 180);
        camPos(mario.pos);
    });
});

scene('lose', ({ score }) => {
    add([
        text('Game Over', {
            size: 226,
        }),
        origin('center'), 
        pos(480, 125),
        scale(0.25)
    ]);
    add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)]);
});


//NEEDED - END GAMEScene

go('game', { score: 0, count: 0 });

function patrol(distance = 150, speed = 50, dir = 1) {
    return {
        id: 'patrol',
        require: ['pos', 'area'],
        startingPos: vec2(0, 0),
        add() {
            this.startingPos = this.pos;
            this.on('collide', (obj, side) => {
                if (side === 'left' || side === 'right') {
                    dir = -dir;
                }
            });
        },
        update() {
            if (Math.abs(this.pos.x - this.startingPos.x) >= distance) {
                dir = -dir;
            }
            this.move(speed * dir, 0);
        },
    };
}