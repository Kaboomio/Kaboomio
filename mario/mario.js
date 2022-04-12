import kaboom from '../kaboom/dist/kaboom.mjs';
import { createScore } from '../fetch-utils.js';

kaboom({
    global: true,
    // width: 600,
    // height: 300,
    fullscreen: true,
    scale: 2, 
    debug: true,
    background: [0, 0, 0, 1],
});


window.canvas.focus();


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
loadSprite('fireball', '../assets/fireball.png');
loadSprite('invisible', '../assets/invisible-image.png');


//start screen sprites
loadSprite('start-screen', '../assets/start-screen.png');

//sounds to play during gameplay
// loadRoot('https://dazzling-vacherin-8cb912.netlify.app/assets/');
loadRoot('../assets/sounds/');
loadSound('jump', 'marioJump.mp3');
loadSound('theme', 'mainTheme.mp3');
loadSound('fireballSound', 'fireball.mp3');
loadSound('gameOver', 'gameOver.mp3');
loadSound('powerUp', 'powerUp.mp3');
loadSound('pipeSound', 'pipe.mp3');

const fallToDeath = 500;

const music = play('theme'); 




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
        go('game', { score: 0, count: 0 });
        
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
        area({ width: 20, height: 20 }),
        pos(36, 0),        
        body(),
        origin('bot'),
        'mario'
    ]);

    const marioSpeed = 120;
    const marioJumpHeight = 600;
    const coinScore = 200;
    let marioDirection = 'right';
    let isJumping = true;


    //MARIO ACTIONS
    onKeyDown('left', () => {
        mario.move(-marioSpeed, 0);
        marioDirection = 'left';
    });

    onKeyDown('right', () => {
        mario.move(marioSpeed, 0);
        marioDirection = 'right';
    });

    onKeyPress('space', () => {
        if (mario.isGrounded()) {
            mario.jump(marioJumpHeight);
            play('jump');
        }
    });

    onKeyPress('down', () => {
        spawnFireball(mario.pos, marioDirection);
        play('fireballSound');
    });

    mario.onUpdate(() => {
        if (mario.isGrounded()) {
            isJumping = false;
        } else {
            isJumping = true;
        }
        music.play();

    });

    mario.onUpdate(() => {
        camPos(mario.pos);
        if (mario.pos.y >= fallToDeath) {
            go('lose', { score: scoreLabel.value, time: timeLeft, level: currentLevel });
        }
    });


    let fireballDirection = 'down';

    onUpdate('fireball', (e) => {

        if (e.pos.y >= 174) {
            fireballDirection = 'up';
        }

        if (e.pos.y <= 166) {
            fireballDirection = 'down';
        }

        if ((e.pos.x < 0) || (e.pos.x > mapWidth)) {
            destroy(e);
        }
        if (fireballDirection === 'down') {
            e.move(e.speed, 40);
        } else {
            e.move(e.speed, -40);
        }

        if (e.pos.y < 159) {
            e.move(10, 220);
        }
    });

    onCollide('dangerous', 'fireball', (item, item2) => {
        wait(1, destroy(item));
        wait(1, destroy(item2));
    });

    onCollide('fireball', 'brick', (item) => {
        wait(1, destroy(item));
    });


    mario.onCollide('dangerous', (d) => {
        if (isJumping) {
            destroy(d);
        } else {
            go('lose', { score: scoreLabel.value, time: timeLeft, level: currentLevel });
            music.pause();
        }
    });

    mario.onCollide('powerup', (obj) => {
        if (obj.is('mushroom')) {
            destroy(obj);
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

    mario.onCollide('brick', (obj) => {
        if (mario.pos.y === obj.pos.y + 40) {
            const mushroomSurprises = get('mushroom-surprise');
            const coinSurprises = get('coin-surprise');
            for (let mushroomSurprise of mushroomSurprises) {
                const marioDistance = mushroomSurprise.pos.x - mario.pos.x;
                if (mario.pos.y === mushroomSurprise.pos.y + 40 && marioDistance > -20 && marioDistance < 0) {
                    destroy(mushroomSurprise);
                    gameLevel.spawn('@', mushroomSurprise.gridPos.sub(0, 1));
                    gameLevel.spawn('+', mushroomSurprise.gridPos.sub(0, 0));
                    // onUpdate('mushroom', (obj) => {
                    //     obj.move(mushroomMove, 0);
                    // });
                }
            }
            for (let coinSurprise of coinSurprises) {
                const marioDistance = coinSurprise.pos.x - mario.pos.x;
                if (mario.pos.y === coinSurprise.pos.y + 40 && marioDistance > -20 && marioDistance < 0) {
                    destroy(coinSurprise);
                    gameLevel.spawn('*', coinSurprise.gridPos.sub(0, 1));
                    gameLevel.spawn('+', coinSurprise.gridPos.sub(0, 0));
                }
            }
        }
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
    const mapWidth = 1700;

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
        'i': () => [sprite('invisible'), area(), solid(), 'invisible'],
        '=': () => [sprite('brick'), area(), solid(), 'brick'],
        '*': () => [sprite('coin'), area(), 'coin'],
        '%': () => [sprite('surprise-box'), solid(), area(), 'coin-surprise', 'brick'],
        // '$': () => [sprite('surprise-box'), solid(), area(), 'coin-surprise'],
        '#': () => [sprite('surprise-box'), solid(), area(), 'mushroom-surprise', 'brick'],
        '^': () => [sprite('evil-mushroom'), solid(), area(), 'evil-mushroom', 'dangerous', body(), patrol(150)],
        '?': () => [sprite('pipe'), solid(), area(), 'pipe'],
        '+': () => [sprite('block'), solid(), area()],
        '@': () => [sprite('mushroom'), solid(), area(), 'mushroom', 'powerup', body()],
        '>': () => [sprite('fireball'), solid(), area(), 'mario-fireball', body()],
    };

    const gameLevel = addLevel(map, levelConfig);

    let levelNumber = 1;


    //GAMEPLAY HEADER TEXT
    const usernameLabel = add([
        text('MARIO', {
            size: 18,
            width: 320, 
            font: 'sinko', 
        }),
        pos(60, 6),
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

    //TIMER CODE
    let timeLeft = 6000;
    let currentLevel = 1;

    add([
        
        text(timeLeft / 60, {
            size: 18,
            width: 320, 
            font: 'sinko', 
        }),
        pos(500, 30),
        layer('ui'),
        fixed(),
        {
            value: time
        },
        'timer'        
    ]);

    let timer = get('timer');

    onUpdate(() => {
        timeLeft--; 
        if ((timeLeft / 60) % 1 === 0) {
            timer[0].text = timeLeft / 60;
        }
    });

    //CAMERA POSITIONING
    onUpdate(() => {
        // camPos(mario.pos.x, 180);
        camPos(mario.pos);
    });

    mario.onCollide('invisible', () => {
        add([
            text('You Beat The Level!', { size: 24 }),
            pos(toWorld(vec2(160, 120))),
            color(255, 255, 255),
            origin('center'),
            layer('ui'),
            music.pause(),
        ]);
        wait(1, () => {
            let nextLevel = levelNumber + 1;
  
            if (nextLevel > map.length) {
                go('start');
            } else {
                go('game', { score: 0, count: 0 }, nextLevel);
            }
        });

    });

});


scene('lose', ({ score, time, level }) => {
    const gameOverMusic = play('gameOver');

    add([
        text('Game Over', {
            size: 226,
        }),
        origin('center'), 
        pos(480, 125),
        scale(0.25),
        music.pause(),
        gameOverMusic.play()
    ]);
    add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)]);

    // add([renderAndAppendForm(), origin('center'), pos(800, 800), fixed()]);

    let txt = add([
        text('Enter your initials and press Enter:'),
        scale(0.25),
        origin('center'),
        pos(center().x, center().y + 85)
    ]);


    // let rec = add([
    //     rect(500,75),
    //     outline(4),
    //     origin('center'),
    //     pos(center().x, center().y+150),
    // ])

    let n = add([
        text(''),
        origin('center'),
        pos(center().x, center().y + 150),
        { value: '' }
    ]);

    // let initials = add([
    //     text(" "),
    //     origin("center"),
    //     pos(center().x, center().y+150)
    // ])
    let maxChar = 3;
    onCharInput((ch) => {
        n.value += ch;
        if (n.value.length > maxChar){
            n.value = n.value.slice(0, 2);
        }

    });

    onKeyPress('backspace', () => {
        n.value = n.value.replace(n.value.charAt(n.value.length - 1), '');
    });

    onUpdate(() => {
        n.text = n.value;
    });

    onKeyPress('enter', async () => {
        await createScore(score, level, n.value, time);
        location.replace('../home-page');
    });
});
    
   


    

// });


//NEEDED - END GAMEScene

go('start', { score: 0, count: 0 });

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

function spawnFireball(marioPos, marioDirection) {
    let fireballPos = marioPos;
    if (marioDirection === 'left'){
        fireballPos = marioPos.sub(10, 10);
    } else if (marioDirection === 'right'){
        fireballPos = marioPos.add(10, -10);
    }
    add([
        sprite('fireball'),
        scale(0.5),
        pos(fireballPos),
        origin('center'),
        area(),
        solid(),
        'fireball',
        { speed: marioDirection === 'right' ? 180 : -180 }
    ]);
}



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

    // function makeBig() {
    //     mario.isBig = true;
    //     mario.area.width = 20;
    //     mario.area.height = 20;
    //     mario.area.scale = 2;
    // }