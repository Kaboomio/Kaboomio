import { checkAuth, logout, getMyProfile, createScore } from '../fetch-utils.js';
import { renderMarioHeader } from '../render-utils.js';
import kaboom from '../kaboom/dist/kaboom.mjs';

const bodyDOM = document.querySelector('body');
let canvas = null;
const gameboy = document.getElementById('gameboyContainer');
const loadingScreen = document.querySelector('.loading-screen');

checkAuth();

// EVENT LISTENERS (for page)
window.addEventListener('load', async ()=> {
    const profile = await getMyProfile();
    if (!profile.username) {
        location.replace('../profile-setup');
    }
    await fetchAndDisplayHeader(profile);
    canvas = document.querySelector('canvas');
    window.canvas.focus();
    loadingScreen.classList.add('invisible');

});

document.addEventListener('click', async (e) => {
    // LOGOUT BUTTON FUNCTIONALITY
    if (e.path[0].id === 'logout' || e.path[0].id === 'logout-icon') {
        logout();
    }
    // FULLSCREEN BUTTON FUNCTIONALITY
    const buttonId = e.path[0].id;
    await goFullscreen(e, buttonId);
    await goGameboy(e, buttonId);
    // STAY FOCUSED TO CANVAS IF CLICKING ANYWHERE ELSE BUT BUTTONS
    window.canvas.focus();
});


//initialize kaboom

kaboom({
    global: true,
    width: 608,
    height: 342,
    // fullscreen: true,
    scale: 3, 
    debug: true,
    frameRate: 60,
    background: [4, 156, 216, 1],
});


//mario level sprites
loadSprite('coin', '../assets/coin.png');
loadSprite('brick', '../assets/brick.png');
loadSprite('block', '../assets/box.png');
loadAseprite('mario', '../assets/all-mario.png', '../assets/mario.json');
loadSprite('mushroom', '../assets/mushroom.png');
loadAseprite('enemies', '../assets/enemies.png', '../assets/enemies.json');
loadSprite('surprise-box', '../assets/surprise-box.png');
loadSprite('bullet', '../assets/bullet.png');
loadSprite('pipe-top', '../assets/pipeTop.png');
loadSprite('castle', '../assets/castle.png');
loadSprite('fireball', '../assets/fireball.png');
loadSprite('invisible', '../assets/invisible-image.png');
loadSprite('flower', '../assets/fire_flower.gif');
loadAseprite('over-world', '../assets/over-world.png', '../assets/over-world.json');
loadSprite('cloud', '../assets/cloud.png');
loadSprite('hill', '../assets/hill.png');
loadSprite('shrub', '../assets/shrubbery.png');
loadSprite('hard-block', '../assets/hard-block.png');
loadSprite('pipe-bottom', '../assets/pipeBottom.png');



//start screen sprites
loadSprite('start-screen', '../assets/start-screen.png');

//sounds to play during gameplay
loadRoot('../assets/');
loadSound('jump', 'sounds/marioJump.mp3');
loadSound('theme', 'sounds/mainTheme.mp3');
loadSound('fireballSound', 'sounds/fireball.mp3');
loadSound('gameOver', 'sounds/gameOver.mp3');
loadSound('powerUp', 'sounds/powerUp.mp3');
loadSound('pipeSound', 'sounds/pipe.mp3');
loadSound('silence', 'sounds/silence.mp3');

//global variables

const fallToDeath = 500;
let music = play('theme'); 
music.volume(0.25);
music.pause();


//START SCENE
scene('start', () => {
    add([
        sprite('start-screen'),
        origin('center'), 
        pos(center().x, center().y - 30), 
        scale(0.65),
    ]);
    add([
        text('Press Spacebar To Start'),
        origin('center'), 
        pos(center().x, center().y + 90), 
        scale(0.25)
    ]);

    onKeyDown('space', () => {
        go('game', { score: 0, count: 0 });
    });
});

//GAME SCENE
scene('game', ({ score, count }) => {
    layers(['bg', 'obj', 'ui'], 'obj'); 
    music.play();
    music.volume(0.0);
    camPos(310, 160);
    
    // CASTLE BACKGROUND
    add([
        sprite('castle'),
<<<<<<< HEAD
        pos(2000, 200),
=======
        pos(1560, 287),
>>>>>>> 9b50aebfc7107b274890cdebcbd4a417dc09e131
        layer('bg'),
        origin('bot'),
        scale(0.25)
    ]);

    //MARIO & HIS MOVEMENT
    const mario = add([
        sprite('mario', { frame: 0, anim: 0 }), 
        solid(), 
        area({ width: 20, height: 20 }),
<<<<<<< HEAD
        pos(1000, 240),        
=======
        pos(1500, 240),        
>>>>>>> 9b50aebfc7107b274890cdebcbd4a417dc09e131
        body(),
        origin('bot'),
        'mario'
    ]);

    let marioRightSpeed = 20;
    let marioLeftSpeed = 20;
    let marioLeftGlideSpeed = 0;
    let marioRightGlideSpeed = 0;
    let marioAirGlideSpeed = 0;
    const marioJumpHeight = 510;
    const coinScore = 200;
    let isJumping = true; 
    let marioDirection = 'right';
    let bigMario = false;
    let fireMario = false;

    let lastMarioXPos = 0;
    let currMarioXPos = 0;
    let currTime = 0;
    let lastFrame = 0;
    let currFrame = 0;

    // MARIO MOVEMENT STUFF BASED ON 60 FPS
    mario.onUpdate(() => {
        lastFrame = currFrame;
        currFrame = checkIfNewFrame(currTime, currFrame);
        if (currFrame > lastFrame) {
            // SLOWING DOWN MARIO WHEN IDLE OR MOVING IN THE OPPOSITE DIRECTION
            currMarioXPos = mario.pos.x;
            slowMarioRightSpeed(marioRightSpeed, lastMarioXPos, currMarioXPos);
            slowMarioLeftSpeed(marioLeftSpeed, lastMarioXPos, currMarioXPos);
            lastMarioXPos = currMarioXPos;
            // LEFT GLIDE
            marioLeftGlideSpeed = marioLeftGlide(marioLeftGlideSpeed, mario);
            // RIGHT GLIDE
            marioRightGlideSpeed = marioRightGlide(marioRightGlideSpeed, mario);
            // AIR GLIDE
            if (!mario.isGrounded()) {
                mario.move(marioAirGlideSpeed, 0);
            }
        }
    });

    //MARIO ACTIONS
    onKeyDown('left', () => {
        marioLeftGlideSpeed = 0;
        if (currFrame > lastFrame) {
            if (marioRightGlideSpeed > 0) {
                marioRightGlideSpeed = marioRightGlideSpeed - 2;
            }
            if (marioLeftSpeed < 140) {
                marioLeftSpeed = marioLeftSpeed + 2;
            }
        }
        mario.move(-marioLeftSpeed, 0);
        mario.flipX(true);
    });

    onKeyRelease('left', () => {
        marioRightGlideSpeed = 0;
        marioLeftGlideSpeed = marioLeftSpeed;
        marioLeftSpeed = 20;
    });
    
    onKeyDown('right', () => {
        marioRightGlideSpeed = 0;
        if (currFrame > lastFrame) {
            if (marioLeftGlideSpeed > 10) {
                marioLeftGlideSpeed = marioLeftGlideSpeed - 2;
            }
            if (marioRightSpeed < 140) {
                marioRightSpeed = marioRightSpeed + 2;
            }
        }
        mario.move(marioRightSpeed, 0);
        mario.flipX(false);
        play('silence');
    });
    
    onKeyRelease('right', () => {
        marioLeftGlideSpeed = 0;
        marioRightGlideSpeed = marioRightSpeed;
        marioRightSpeed = 20;
    });

    onKeyPress('space', () => {
        if (mario.isGrounded()) {
            mario.jump(marioJumpHeight);
            if (marioRightSpeed > marioLeftSpeed) {
                marioAirGlideSpeed = marioRightSpeed / 3;
            } else {
                marioAirGlideSpeed = -marioLeftSpeed / 3;
            }
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
        if (mario.pos.y >= fallToDeath) {
            go('lose', { score: scoreLabel.value, time: timeLeft, level: currentLevel });
        }
        updateMarioSprite();
    });

    function updateMarioSprite() {
        if (isJumping) {
            mario.frame = fireMario ? 22 : bigMario ? 13 : 5;
        } else {
            if (isKeyDown('left') || isKeyDown('right')) {
                const anim = fireMario ? 'FlameRun' : bigMario ? 'RunningBig' : 'Running';
                if (mario.curAnim() !== anim) {
                    mario.play(anim);
                }
            } else {
                mario.frame = fireMario ? 17 : bigMario ? 8 : 0;
            }
        }
    }


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
            if (d.is('goomba')) {
                d.frame = 2;
                d.anim = '';
                d.unuse('patrol');
                d.unuse('dangerous');
                d.unuse('solid');
<<<<<<< HEAD
                d.area.height = 20;
=======
                
            } else if (bigMario) {
                bigMario = false;
                mario.unuse('solid');
                wait(3, mario.use('solid'));
    
               
>>>>>>> 9b50aebfc7107b274890cdebcbd4a417dc09e131
            }
        } else {
            go('lose', { score: scoreLabel.value, time: timeLeft, level: currentLevel });
            music.pause();
        }
    });


    mario.onCollide('powerup', (obj) => {
        if (obj.is('mushroom')) {
            bigMario = true;
            mario.area.width = 26;
            mario.area.height = 34;
            destroy(obj);
        }
        if (obj.is('fire')) {
            fireMario = true;
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
        const marioPlusBlockHeight = bigMario || fireMario ? 54 : 40;

        if (mario.pos.y === obj.pos.y + marioPlusBlockHeight) {
            const mushroomSurprises = get('mushroom-surprise');
            const coinSurprises = get('coin-surprise');
            const fireSurprises = get('fire-surprise');
            for (let coinSurprise of coinSurprises) {
                const marioDistance = coinSurprise.pos.x - mario.pos.x;
                if (mario.pos.y === coinSurprise.pos.y + marioPlusBlockHeight && marioDistance > -20 && marioDistance < 0) {
                    destroy(coinSurprise);
                    gameLevel.spawn('*', coinSurprise.gridPos.sub(0, 1));
                    const box = gameLevel.spawn('+', coinSurprise.gridPos.sub(0, 0));
                    box.bump(8, 2, true, true);
                }
            }
            for (let fireSurprise of fireSurprises) {
                const marioDistance = fireSurprise.pos.x - mario.pos.x;
                if (mario.pos.y === fireSurprise.pos.y + marioPlusBlockHeight && marioDistance > -20 && marioDistance < 0) {
                    destroy(fireSurprise);
                    gameLevel.spawn('f', fireSurprise.gridPos.sub(0, 1));
                    const box = gameLevel.spawn('+', fireSurprise.gridPos.sub(0, 0));
                    box.bump(8, 2, true, true);
                }
            }
            for (let mushroomSurprise of mushroomSurprises) {
                const marioDistance = mushroomSurprise.pos.x - mario.pos.x;
                if (mario.pos.y === mushroomSurprise.pos.y + marioPlusBlockHeight && marioDistance > -20 && marioDistance < 0) {
                    destroy(mushroomSurprise);
                    gameLevel.spawn('@', mushroomSurprise.gridPos.sub(0, 1));
                    const box = gameLevel.spawn('+', mushroomSurprise.gridPos.sub(0, 0));
                    box.bump(8, 2, true, true);
                }
            }
        }
    });


//bullet enemy movement

    let bulletspeed = 70;
    onUpdate('bullet', (obj) => {
        obj.move(-bulletspeed, 0);
    });


//add score to canvas function

    function addScoreText(obj, score) {
        add([
            text(score, {
                size: 10,
                width: 25, 
                font: 'sinko', 
            }),
            pos(obj.pos.x, obj.pos.y),
            lifespan(1, { fade: 0.01 })
        ]);
    }

    //GAME LEVEL CONFIG
    const mapWidth = 1700;

    const map = [
<<<<<<< HEAD
        '                                                                                                                                                                                        ',
        '                                                                                                    !                                                                   !               ',
        '                               !                                                                                                     !                    !                             ',
        '         !                                                     !                                                    !                                                                   ',
        '                                            !                                                              !                           !                !                               ',
        '                    !                                                           !                                                                                     /                 ',
        '                %                                           =====   ===%              #          ===    =%%=                                                         //                 ',
        '                                                                                                                                                                    ///                 ',
        '                                                                                                                                                                   ////                 ',
        '                                                                                                                                                                  /////                 ',
        '          %   =%=%=                 -       -            =#=           =    ==     %  %  %    =          ==        /  /          //  /              ==%=         //////                 ',
        '                             -      |       |                                                                     //  //        ///  //      -               -  ///////                 ',
        '                       -     |      |       |                                                                    ///  ///      ////  ///     |               | ////////                 ',
        '     ) (   ^           |     |     ^| ^ ^   |    (          (          )         k     )        )               ////  ////    /////  ////    |      ^   ^    |/////////      (  (     i ',
        '====================================================  ==========   ================================================================  ===================================================',
        '====================================================  ==========   ================================================================  ===================================================',
        '====================================================  ==========   ================================================================  ===================================================',
=======
        '                                                                                  ',
        '                                                                                  ',
        '                          !                                                       ',
        '    !                                                     !                       ',
        '                                       !                               !          ',
        '               !                                                                  ',
        '                                           %%%%                    !         i    ',
        '                                                                             i    ',
        '                                                          ===                i    ',
        '                                                                             i    ',
        '     *   =%=%=      =====               %===#%==*=             %%%           i    ',
        '                                                                             i    ',
        '                                            b                                i    ',
        '   (    *)            )        b  )      )     (      )       )         b    i    ',
        '==============================   ========================    =====================',
        '==============================   ========================    =====================',
        '==============================   ========================    =====================',
>>>>>>> 9b50aebfc7107b274890cdebcbd4a417dc09e131
    ];

    //configuring the map to display
    const levelConfig = {
        width: 20,
        height: 20,
        'i': () => [sprite('invisible'), area(), solid(), 'invisible'],
        '=': () => [sprite('brick'), area(), solid(), 'brick'],
        '*': () => [sprite('coin'), area(), 'coin'],
        '%': () => [sprite('surprise-box'), solid(), area(), bump(), 'coin-surprise', 'brick'],
        '&': () => [sprite('surprise-box'), solid(), area(), bump(), 'fire-surprise', 'brick'],
        'f': () => [sprite('flower'), solid(), area(), 'fire', 'powerup', body()],
        '#': () => [sprite('surprise-box'), solid(), area(), bump(), 'mushroom-surprise', 'brick'],
        '^': () => [sprite('enemies', { frame: 0 }, { anim: 'GoombaWalk' }), solid(), area(20, 20), 'goomba', 'dangerous', body(), patrol(150)],
        'k': () => [sprite('enemies', { frame: 0 }, { anim: 'KoopaWalk' }), solid(), area(), 'koopa', 'dangerous', body(), patrol(150)],
        'b': () => [sprite('bullet'), solid(), area(), 'bullet', 'dangerous'],
        '-': () => [sprite('pipe-top'), solid(), area(), 'pipe', pos(0, 2), scale(1.2)],
        '+': () => [sprite('block'), solid(), area(), bump()],
        '@': () => [sprite('mushroom'), solid(), area(), 'mushroom', 'powerup', body(), patrol(150)],
        '>': () => [sprite('fireball'), solid(), area(), 'mario-fireball', body()],
        '!': () => [sprite('cloud'), pos(20, 50), layer('bg')],
        '(': () => [sprite('hill'), pos(0, -15), layer('bg')],
        ')': () => [sprite('shrub'), pos(0, 3), layer('bg')],
        '/': () => [sprite('hard-block'), solid(), area(), scale(1.2)],
        '|': () => [sprite('pipe-bottom'), solid(), area(), scale(1.2)]
    };

    const gameLevel = addLevel(map, levelConfig);

    let levelNumber = 1;

    //GAMEPLAY HEADER TEXT
    add([
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
    let timeLeft = 400;
    let currentLevel = 1;

    add([
        text(timeLeft, {
            size: 18,
            width: 320, 
            font: 'sinko', 
        }),
        pos(300, 30),
        layer('ui'),
        fixed(),
        {
            value: time
        },
        'timer'        
    ]);

    let timer = get('timer');

    onUpdate(() => {
        currTime = time();
        const timeCheck = Math.floor(currTime / .4);
        if ((401 - timeCheck) < timeLeft) {
            timeLeft--;
            timer[0].text = timeLeft;
        }
        if (timeLeft < 1) {
            go('lose', { score: scoreLabel.value, timeLeft: 0, level: currentLevel });
        }
    });

    //CAMERA POSITIONING
    mario.onUpdate(() => {
        let currCam = camPos();
        if (currCam.x < mario.pos.x) {
            camPos(mario.pos.x, currCam.y);
        }
    });

    //End of level win condition
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


// Game Over scene

scene('lose', ({ score, time, level }) => {
    music.pause();
    const gameOverMusic = play('gameOver');
    
    add([
        text('Game Over', {
            size: 226,
        }),
        origin('center'), 
        pos(center().x, center().y - 100),
        scale(0.25),
        
        gameOverMusic.play(),
        gameOverMusic.volume(0.25)
    ]);
    add([
        text(score, 32), 
        origin('center'), 
        pos(center().x, center().y - 20)
    ]);

    add([
        text('Enter your initials and press Enter:'),
        scale(0.25),
        origin('center'),
        pos(center().x, center().y + 60)
    ]);

    let n = add([
        text(''),
        origin('center'),
        pos(center().x, center().y + 125),
        { value: '' }
    ]);

    let maxChar = 3;
    onCharInput((ch) => {
        n.value += ch;
        n.value = n.value.toUpperCase();
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

//initialize start scene - must be at end of game configs

go('game', { score: 0, count: 0 });



// Local Functions
function patrol(distance = 150, speed = 50, dir = 1) {
    return {
        id: 'patrol',
        require: ['pos', 'area'],
        startingPos: vec2(0, 0),
        add() {
            this.startingPos = this.pos;
            this.on('collide', (obj, side) => {
                console.log(side);
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

function bump(offset = 8, speed = 2, stopAtOrigin = true, isY = true){
    return {
        id: 'bump', 
        require: ['pos'],
        bumpOffset: offset,
        speed: speed,
        bumped: false,
        origPos: 0,
        direction: -1, 
        isY: isY,
        update() {
            if (this.bumped) {
                if (isY){
                    this.pos.y = this.pos.y + this.direction * this.speed;
                    if (this.pos.y < this.origPos - this.bumpOffset) {
                        this.direction = 1;
                    }
                    if (stopAtOrigin && this.pos.y >= this.origPos) {
                        this.bumped = false;
                        this.pos.y = this.origPos;
                        this.direction = -1;
                    }
                } else {this.pos.x = this.pos.x + this.direction * this.speed;
                    if (this.pos.x < this.origPos - this.bumpOffset) {
                        this.direction = 1;
                    }
                    if (stopAtOrigin && this.pos.x >= this.origPos) {
                        this.bumped = false;
                        this.pos.x = this.origPos;
                        this.direction = -1;
                    }}
            }
        },
        bump(){
            this.bumped = true;
            if (isY) {
                this.origPos = this.pos.y;
            } else {
                this.origPos = this.pos.x;
            }
        }
    };
}

async function goFullscreen(e, buttonId) {
    if (buttonId === 'fullscreen') {
        let aspectRatio = 16 / 9;
        let vh = window.innerHeight - 115;
        let vw = window.innerWidth;
        if ((vw / vh) < aspectRatio) {
            canvas.style.width = `${vw}px`;
            canvas.style.height = `${vw / aspectRatio}px`;
            canvas.style.padding = '57.5px 0 0';
            canvas.style.top = '50%';
            canvas.style.transform = 'translate(-50%, -50%)';
            gameboy.classList.add('hidden');
        } else {
            canvas.style.width = `${vh * aspectRatio}px`;
            canvas.style.height = `${vh}px`;
            canvas.style.padding = '0';
            canvas.style.top = '90px';
            gameboy.classList.add('hidden');
        }
        e.path[0].id = 'gameboy';
        e.path[0].textContent = 'Gameboy';
    }
}

async function goGameboy(e, buttonId) {
    if (buttonId === 'gameboy') {
        canvas.style.width = `608px`;
        canvas.style.height = `342px`;
        canvas.style.padding = '70px 54px 440px 42px';
        canvas.style.top = '120px';
        canvas.style.transform = 'translateX(-50%)';
        gameboy.classList.remove('hidden');
        e.path[0].id = 'fullscreen';
        e.path[0].textContent = 'Fullscreen';
    }
}

function checkIfNewFrame(currTime, currFrame) {
    if (Math.floor(currTime / (1 / 60)) > currFrame) {
        currFrame++;
    }
    return currFrame;
}

function marioLeftGlide(marioLeftGlideSpeed, mario) {
    if (marioLeftGlideSpeed > 100) {
        mario.move(-marioLeftGlideSpeed, 0);
        return marioLeftGlideSpeed = marioLeftGlideSpeed - 1;
    } else if (marioLeftGlideSpeed > 60) {
        mario.move(-marioLeftGlideSpeed, 0);
        return marioLeftGlideSpeed = marioLeftGlideSpeed - 4;
    } else if (marioLeftGlideSpeed > 30) {
        mario.move(-marioLeftGlideSpeed, 0);
        return marioLeftGlideSpeed = marioLeftGlideSpeed - 3;
    } else if (marioLeftGlideSpeed > 10) {
        mario.move(-marioLeftGlideSpeed, 0);
        return marioLeftGlideSpeed = marioLeftGlideSpeed - 2;
    } else if (marioLeftGlideSpeed > 0) {
        mario.move(-marioLeftGlideSpeed, 0);
        return marioLeftGlideSpeed = marioLeftGlideSpeed - 1;
    } else if (marioLeftGlideSpeed < 0) {
        return marioLeftGlideSpeed = 0;
    }
}

function marioRightGlide(marioRightGlideSpeed, mario) {
    if (marioRightGlideSpeed > 100) {
        mario.move(marioRightGlideSpeed, 0);
        return marioRightGlideSpeed = marioRightGlideSpeed - 1;
    } else if (marioRightGlideSpeed > 60) {
        mario.move(marioRightGlideSpeed, 0);
        return marioRightGlideSpeed = marioRightGlideSpeed - 4;
    } else if (marioRightGlideSpeed > 30) {
        mario.move(marioRightGlideSpeed, 0);
        return marioRightGlideSpeed = marioRightGlideSpeed - 3;
    } else if (marioRightGlideSpeed > 10) {
        mario.move(marioRightGlideSpeed, 0);
        return marioRightGlideSpeed = marioRightGlideSpeed - 2;
    } else if (marioRightGlideSpeed > 0) {
        mario.move(marioRightGlideSpeed, 0);
        return marioRightGlideSpeed = marioRightGlideSpeed - 1;
    } else if (marioRightGlideSpeed < 0) {
        return marioRightGlideSpeed = 0;
    }
}

function slowMarioRightSpeed(marioRightSpeed, lastMarioXPos, currMarioXPos) {
    // SLOWING DOWN SPEED BECAUSE MARIO IS IDLE
    if (marioRightSpeed > 20 && lastMarioXPos === currMarioXPos) {
        marioRightSpeed = marioRightSpeed - 4;
    }
    // IF MARIO IS MOVING LEFT, SLOW DOWN RIGHT SPEED
    if (marioRightSpeed > 20 && lastMarioXPos > currMarioXPos) {
        marioRightSpeed = 0;
    }
}

function slowMarioLeftSpeed(marioLeftSpeed, lastMarioXPos, currMarioXPos) {
    // SLOWING DOWN SPEED BECAUSE MARIO IS IDLE
    if (marioLeftSpeed > 20 && lastMarioXPos === currMarioXPos) {
        return marioLeftSpeed = marioLeftSpeed - 4;
    }
    // IF MARIO IS MOVING RIGHT, SLOW DOWN LEFT SPEED
    if (marioLeftSpeed > 20 && lastMarioXPos < currMarioXPos) {
        return marioLeftSpeed = 0;
    }
}

async function fetchAndDisplayHeader(profile) {
    const hardHeader = document.querySelector('header');
    bodyDOM.removeChild(hardHeader);
    const header = renderMarioHeader(profile);
    bodyDOM.prepend(header);
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