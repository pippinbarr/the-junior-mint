var GAME_WIDTH = 640;
var GAME_HEIGHT = 640;

var TOTAL_MINTS = 24;
// var TOTAL_MINTS = 10;

var CHARACTER_EXIT_SPEED = 500;

var MINT_HOLDER_HAND_SPEED = 1;

var MINT_GRAVITY = 1000;
var MINT_BOUNCE = 1.00;
var MINT_LAUNCH_SPEED = 1000;

var DOCTOR_Y = 360;
var NURSE_Y = 360;
var ELAINE_Y = 360;
var GEORGE_Y = 360;
var NEWMAN_Y = 360;


// SPEEDS

var PATIENT_SPEED = 50;
var DOCTOR_SPEED = 120;
var NURSE_SPEED = 100;
var ELAINE_SPEED = 130;
var GEORGE_SPEED = 150;
var NEWMAN_SPEED = 100;
var IV_SPEED = 60;

// TIMES

var ELAINE_TIME_RANDOM = 10;
var ELAINE_TIME_MIN = 10;
var GEORGE_TIME_RANDOM = 9;
var GEORGE_TIME_MIN = 9;
var NEWMAN_TIME_RANDOM = 12;
var NEWMAN_TIME_MIN = 12;
var DOCTOR_TIME_RANDOM = 2;
var DOCTOR_TIME_MIN = 2;
var NURSE_TIME_RANDOM = 2;
var NURSE_TIME_MIN = 2;
var WRECKING_BALL_TIME_RANDOM = 20;
var WRECKING_BALL_TIME_MIN = 10;


var canLaunch = false;

var score = 0;


var hospital_atmos = null;


BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
};


BasicGame.Game.prototype = {

	create: function () 
    {
        this.game.time.events.resume();
        this.time.events.resume();

        score = 0;

        // this.game.sound.mute = true;

        bg = this.add.sprite(0,0,'bg');
        
        // mint_holder = 'jerry';

        mintsRemaining = TOTAL_MINTS;

        ///////// SOUNDS  //////////

        if (mint_holder == 'kramer')
        {
            mint_offer = this.add.audio('kramer_mint_offer',1,false);
            mint_no = this.add.audio('jerry_no',1,false);
        }
        else
        {
            mint_offer = this.add.audio('jerry_mint',1,false);
            mint_no = this.add.audio('kramer_no',1,false);
        }
        mint_in = this.add.audio('mint_in',1,false);
        mint_launch = this.add.audio('mint_launch',1,false);
        mint_bounce = this.add.audio('mint_bounce',1,false);
        george_upset = this.add.audio('george_upset',1,false);
        newman_hello = this.add.audio('newman_hello',1,false);
        elaine_get_out = this.add.audio('elaine_get_out',1,false);
        i_came_in_like_a_wrecking_ball = this.add.audio('i_came_in_like_a_wrecking_ball',1,false);
        laugh_track = this.add.audio('laugh_track',1,false);
        mint_miss = this.add.audio('mint_miss',1,false);
        kramer_refreshing = this.add.audio('kramer_refreshing',1,false);
        jerry_learned = this.add.audio('jerry_learned',1,false);

        if (hospital_atmos == null)
        {
            hospital_atmos = this.add.audio('hospital_atmos',1,true);
        }
        hospital_atmos.play(0,0,0.5,true);


        ///////// SPRITES  //////////

        // MINT LAUNCHER //

        if (mint_holder == 'jerry')
        {
            mint_launcher_body = this.add.sprite(280,52,'kramer_body');
            mint_launcher_body.scale.x = -1;
        } 
        else
        {
            mint_launcher_body = this.add.sprite(120,56,'jerry_body');            
        } 
        

        // MINT HOLDER //

        if (mint_holder == 'kramer')
        {
            mint_holder_body = this.add.sprite(356,52,'kramer_body');
        } 
        else
        {
            mint_holder_body = this.add.sprite(540,56,'jerry_body');  
            mint_holder_body.scale.x = -1;          
        }  

        mint_launch_hand = this.add.sprite(240,150,'launch_hand');

        mint_holder_hand = this.add.sprite(340,194,'mint_hand');
        mint_holder_hand.anchor.x = 0.75
        mint_holder_hand.anchor.y = 0.75
        mint_holder_hand_change = 0;
        mint_holder_hand.angle = 35;


        // WALL //

        upper_wall = this.add.sprite(140,200,'upper_wall');


        // DOCTOR //

        doctor = this.add.sprite(0,0,'doctor');
        doctor.body.setPolygon([70,0,20,130,10,200,180,200,180,100]);
        doctor.body.x = 200;
        doctor.body.y = DOCTOR_Y;
        doctor.body.immovable = true;
        doctor.body.velocity.x = DOCTOR_SPEED;      

        doctor_event = null;

        // NURSE //

        nurse = this.add.sprite(0,0,'nurse');
        nurse.body.setPolygon([90,0,20,130,10,200,180,200,160,120]);
        nurse.body.x = 400;
        nurse.body.y = NURSE_Y;
        nurse.body.immovable = true;
        nurse.body.velocity.x = -NURSE_SPEED;

        nurse_event = null;

        // ELAINE //

        elaine = this.add.sprite(0,0,'elaine');
        elaine.body.setPolygon([90,0,10,100,10,200,140,200,140,100]);
        elaine.body.x = -1000;
        elaine.body.y = ELAINE_Y;
        elaine.body.immovable = true;

        elaine_event = this.time.events.add(Phaser.Timer.SECOND * (Math.random() * ELAINE_TIME_RANDOM + ELAINE_TIME_MIN), this.elaineStart, this);

        // NEWMAN //

        newman = this.add.sprite(0,0,'newman');
        newman.body.setPolygon([60,0,30,20,10,220,160,220,130,110]);
        newman.body.x = -1000;
        newman.body.y = NEWMAN_Y;
        newman.body.immovable = true;

        newman_event = this.time.events.add(Phaser.Timer.SECOND * (Math.random() * NEWMAN_TIME_RANDOM + NEWMAN_TIME_MIN), this.newmanStart, this);

        // GEORGE //

        george = this.add.sprite(0,0,'george');
        george.body.setPolygon([100,10,50,10,0,240,210,240,180,110]);
        george.body.x = -1000;
        george.body.y = GEORGE_Y;
        george.body.immovable = true;

        // IV //
        iv = this.add.sprite(0,0,'iv');
        iv.body.x = 400;
        iv.body.y = GAME_HEIGHT - iv.height;
        iv.body.immovable = true;
        iv.body.velocity.x = IV_SPEED;


        george_event = this.time.events.add(Phaser.Timer.SECOND * (Math.random() * GEORGE_TIME_RANDOM + GEORGE_TIME_MIN), this.georgeStart, this);
        // this.time.events.add(20000, this.georgeStart, this);

        // COLLISION GROUP //

        colliders = this.add.group();

        colliders.add(nurse);
        colliders.add(elaine);
        colliders.add(doctor);
        colliders.add(newman);
        colliders.add(george);
        colliders.add(iv);

        // PATIENT BG //

        patient_left = this.add.sprite(-70,480,'patient_left');
        patient_left.body.setRectangle(20,200,patient_left.width - 20,0);
        patient_left.body.x = -70;
        patient_left.body.y = 480;
        patient_left.body.immovable = true;
        patient_left.alpha = 0;

        patient_middle_bg = this.add.sprite(patient_left.x + patient_left.width,patient_left.y - 4,'patient_middle_bg');
        patient_middle_bg.body.setRectangle(patient_middle_bg.width - 20,20,10,patient_middle_bg.height - 60);
        patient_middle_bg.body.x = patient_left.x + patient_left.width;
        patient_middle_bg.body.y = patient_left.y - 4;
        patient_middle_bg.body.immovable = true;
        patient_middle_bg.alpha = 0;

        patient_right = this.add.sprite(patient_middle_bg.x + patient_middle_bg.width,patient_left.y + 2,'patient_right');
        patient_right.body.setRectangle(20,200,0,0);
        patient_right.body.x = patient_middle_bg.x + patient_middle_bg.width;
        patient_right.body.y = patient_left.y + 2;
        patient_right.body.immovable = true;
        patient_right.alpha = 0;

        // patient_full = this.add.sprite(patient_left.x,patient_left.y + 2,'patient_full_with_hole');
        patient_full = this.add.sprite(-76,patient_left.y - 4,'patient_full_with_hole');


        // patient_hole_left_wall = this.add.sprite(100,0,'one_red_pixel');
        // patient_hole_left_wall.body.setRectangle(20,GAME_HEIGHT - patient_middle_bg.y + 0,100,10);
        // patient_hole_left_wall.body.x = patient_middle_bg.x - 116;
        // patient_hole_left_wall.body.y = patient_middle_bg.y + 10;
        // patient_hole_left_wall.body.immovable = true;
        // patient_hole_left_wall.visible = false;

        // patient_hole_right_wall = this.add.sprite(100,0,'one_red_pixel');
        // patient_hole_right_wall.body.setRectangle(20,GAME_HEIGHT - patient_middle_bg.y + 0,100,10);
        // patient_hole_right_wall.body.x = patient_middle_bg.x + 56;
        // patient_hole_right_wall.body.y = patient_middle_bg.y + 10;
        // patient_hole_right_wall.body.immovable = true;
        // patient_hole_right_wall.visible = false;

        // patient_hole_bottom = this.add.sprite(100,0,'one_red_pixel');
        // patient_hole_bottom.body.setRectangle(patient_middle_bg.width - 20,40,100,10);
        // patient_hole_bottom.body.x = patient_middle_bg.x - 90;
        // patient_hole_bottom.body.y = patient_middle_bg.y + 90;
        // patient_hole_bottom.visible = false;

        // SCISSORS //

        // scissors = this.add.sprite(220,480,'scissors');

        // GEORGE TRIANGLE //

        george_triangle = this.add.sprite(510,20,'george_triangle');

        // MINT //

        mint = this.add.sprite(380,80,'mint');
        mint.body.setRectangle(mint.width/1.4,mint.width/4,2,5);
        mint.body.bounce.y = MINT_BOUNCE;
        mint.body.bounce.x = MINT_BOUNCE;
        // mint.body.collideWorldBounds = true;

        leftWall = this.add.sprite(0,0,'one_red_pixel');
        leftWall.body.setRectangle(100,GAME_HEIGHT,-100,0);
        leftWall.body.immovable = true;
        rightWall = this.add.sprite(0,0,'one_red_pixel');
        rightWall.body.setRectangle(100,GAME_HEIGHT,GAME_WIDTH,-100);
        rightWall.body.immovable = true;
        topWall = this.add.sprite(0,0,'one_red_pixel');
        topWall.body.setRectangle(GAME_WIDTH + 200,100,-100,-100);
        topWall.body.immovable = true;

        // PATIENT FG //
        patient_middle_fg = this.add.sprite(patient_middle_bg.x,patient_left.y - 4,'patient_middle_fg');
        patient_middle_fg.body.setRectangle(patient_middle_fg.width - 20,20,10,patient_middle_fg.height - 60);
        patient_middle_fg.body.x = patient_left.x + patient_left.width;
        patient_middle_fg.body.y = patient_left.y - 4;
        patient_middle_fg.body.immovable = true;

        // PATIENT MOVEMENT //
        patient_middle_fg.body.velocity.x = PATIENT_SPEED;

        patient_left.body.velocity.x = patient_middle_fg.body.velocity.x;
        patient_middle_bg.body.velocity.x = patient_middle_fg.body.velocity.x;
        patient_right.body.velocity.x = patient_middle_fg.body.velocity.x;
        patient_full.body.velocity.x = patient_middle_fg.body.velocity.x;

        // SCORE //

        scoreText = this.add.text(565, 125, '$0', { font: '16px serif', fill: '#000' });
        scoreText.anchor.x = 0.5;


        // MINTS //
        
        mintsRemaining = TOTAL_MINTS;
        mintLives = this.add.sprite(36,32,'mint');
        mintText = this.add.text(80, 20, 'x ' + mintsRemaining, { font: '36px serif', fill: '#000' });
        mintText.anchor.x = 0.0;


        // WRECKING BALL //

        wrecking_ball = this.add.sprite(320,-20,'wrecking_ball');
        wrecking_ball.anchor.x = 0.18;
        wrecking_ball.anchor.y = 0;
        wrecking_ball.angle = -0;
        wrecking_ball_change = 0;
        wrecking_ball.visible = false;


        // SCORING //

        canScore = false;
        // score = 0;


        // DEBUG //

        debugFlag = false;


        // mint.visible = false;
        // mint.body.gravity.y = 0;
        // canLaunch = false;

        this.resetMint();

        // this.time.events.add(Phaser.Timer.SECOND * 1, this.offerMint, this);   
        this.input.onTap.add(this.launchMint);     

        // this.wreckingBallStart();   
        wrecking_ball_event = this.game.time.events.add(Phaser.Timer.SECOND * (Math.random() * WRECKING_BALL_TIME_RANDOM + WRECKING_BALL_TIME_MIN), this.wreckingBallStart, this);



        // this.time.events.add(Phaser.Timer.SECOND * GAME_LENGTH, this.gameOver, this);   

    },


    destroy: function ()
    {
        mint_offer.stop();
        mint_no.stop();
        mint_in.stop();
        mint_launch.stop();
        mint_bounce.stop();
        george_upset.stop();
        newman_hello.stop();
        elaine_get_out.stop();
        i_came_in_like_a_wrecking_ball.stop();
        // laugh_track.stop();
        // mint_miss.stop();
        kramer_refreshing.stop();
        jerry_learned.stop();

        if (wrecking_ball_event != null) this.game.time.events.remove(wrecking_ball_event);
        if (elaine_event != null) this.game.time.events.remove(elaine_event);
        if (newman_event != null) this.game.time.events.remove(newman_event);
        if (george_event != null) this.game.time.events.remove(george_event);
        if (doctor_event != null) this.game.time.events.remove(doctor_event);
        if (nurse_event != null) this.game.time.events.remove(nurse_event);

        bg.destroy();        
        mint_launcher_body.destroy();
        mint_holder_body.destroy();
        mint_launch_hand.destroy();
        mint_holder_hand.destroy();
        upper_wall.destroy();
        doctor.destroy();
        nurse.destroy();
        elaine.destroy();
        newman.destroy();
        george.destroy();
        iv.destroy();
        
        patient_left.destroy();
        patient_middle_bg.destroy();
        patient_right.destroy();
        patient_full.destroy();
        george_triangle.destroy();
        leftWall.destroy();
        rightWall.destroy();
        topWall.destroy();
        patient_middle_fg.destroy();
        wrecking_ball.destroy();

        mint.destroy();

        scoreText.destroy();
        mintLives.destroy();
        mintText.destroy();

        this.input.onTap.remove(this.launchMint);
        // this.game.time.events.pause();
        // this.time.events.pause();
    },


    update: function ()
    {
        if (iv.body.velocity.x == 0)
        {
            iv.body.velocity.x = IV_SPEED;
        }

        this.updateWreckingBall();
        this.updateMintLaunchHand();

        this.physics.collide(mint,colliders,this.handleColliders,this.processColliders,this);

        // this.physics.collide(mint,wrecking_ball);

        this.physics.collide(mint,leftWall);
        this.physics.collide(mint,rightWall);
        this.physics.collide(mint,topWall);

        this.physics.collide(mint,patient_left);
        this.physics.collide(mint,patient_right);

        this.handleCharacterMovement(doctor);
        this.handleCharacterMovement(nurse);
        this.handleCharacterMovement(iv);
        this.handlePatientMovement();

        this.handleCharacterOffScreen(elaine);
        this.handleCharacterOffScreen(nurse);
        this.handleCharacterOffScreen(doctor);     
        this.handleCharacterOffScreen(george);     
        this.handleCharacterOffScreen(newman);     

        this.checkMintStatus();

        if (this.input.keyboard.justPressed(Phaser.Keyboard.D,10))
        {
            debugFlag = !debugFlag;
        }
    },


    quitGame: function (pointer) 
    {
		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
        this.destroy();
        this.game.state.start('MainMenu');
    },


    render: function () 
    {
        if (!debugFlag) return;

        this.game.debug.renderPhysicsBody(mint.body);
        this.game.debug.renderPhysicsBody(elaine.body);
        this.game.debug.renderPhysicsBody(nurse.body);
        this.game.debug.renderPhysicsBody(doctor.body);
        this.game.debug.renderPhysicsBody(newman.body);
        this.game.debug.renderPhysicsBody(george.body);
        this.game.debug.renderPhysicsBody(leftWall.body);
        this.game.debug.renderPhysicsBody(rightWall.body);
        this.game.debug.renderPhysicsBody(topWall.body);

        this.game.debug.renderPhysicsBody(patient_left.body);
        this.game.debug.renderPhysicsBody(patient_middle_bg.body);
        this.game.debug.renderPhysicsBody(patient_right.body);
        // this.game.debug.renderPhysicsBody(wrecking_ball.body);

    },


    offerMint: function()
    {
        mint_launch_hand.x = 240;

        mint_offer.play();

        mint_holder_hand_change = MINT_HOLDER_HAND_SPEED;

        canLaunch = true;
    },


    checkMintStatus: function () 
    {
        if (mint.body.gravity.y == 0) return;

        if (mint.y > GAME_HEIGHT)
        {
            mint_miss.play();

            this.resetMint();
        }
        else if (mint.body.overlap(patient_middle_bg.body))
        {
            mint_in.play();
            laugh_track.play();

            if (mint_holder == 'kramer')
            {
                kramer_refreshing.play();
            }
            else
            {
                jerry_learned.play();
            }

            score += 1900;
            scoreText.content = this.makeMoneyString(score);

            this.resetMint();
        }    
    },


    makeMoneyString: function (num)
    {
        nStr = '' + num;
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return '$' + x1 + x2;
    },


    resetMint: function()
    {
        mint.body.gravity.y = 0;
        mint.body.velocity.x = 0;
        mint.body.velocity.y = 0;
        mint.body.y = -100;
        canLaunch = false;

        if (mintsRemaining > 0)
        {
            this.time.events.add(Phaser.Timer.SECOND * 0.5, this.offerMint, this);
        }
        else
        {
            this.destroy();
            this.game.state.start('EndMenu');
        }
    },


    handleColliders: function (o1,o2)
    {
        // Nothin'.


    },


    processColliders: function (o1,o2)
    {
        // mint_launch_hand.visible = !mint_launch_hand.visible;

        mint.body.velocity.x += 10 * o2.body.velocity.x;


        if (mint.body.overlap(o2.body) && (o2.body.velocity.y == 0 || o2.body.velocity.x == 0))
        {
            if (o2 == leftWall || o2 == rightWall || o2 == topWall || o2 == iv)
            {
                // mint.velocity.y = -mint.velocity.y;
                // mint.velocity.x = -mint.velocity.x;
                return true;
            }
            else
            {
                o1.body.velocity.y = -500;
                this.moveOffScreenDown(o2);

                return true;
            }
        }
    },


    moveOffScreenDown: function (o)
    {
        mint_bounce.play();

        o.body.velocity.y = CHARACTER_EXIT_SPEED;
        o.body.velocity.x = 0;
    },


    launchMint: function(e)
    {
        if (!canLaunch) return;

        mintsRemaining -= 1;
        mintText.content = 'x ' + mintsRemaining;

        mint_launch_hand.x += 30;

        mint_launch.play();
        mint_no.play();

        mint.visible = true;

        mint.x = mint_holder_hand.x - 50;
        mint.y = mint_holder_hand.y - 50;
        mint.body.gravity.y = MINT_GRAVITY;

        mintVelocity = MINT_LAUNCH_SPEED + Math.random() * 100;
        mint.body.velocity.x = Math.cos(mint_holder_hand.rotation - Math.PI/2) * mintVelocity;
        mint.body.velocity.y = Math.sin(mint_holder_hand.rotation - Math.PI/2) * mintVelocity;

        canScore = true;
        canLaunch = false;

        mint_holder_hand_change = 0;
        mint_holder_hand.angle = 35;
    },


    updateMintLaunchHand: function()
    {
        mint_holder_hand.angle += mint_holder_hand_change;

        if ((mint_holder_hand_change > 0 && mint_holder_hand.angle >= 35) ||
            (mint_holder_hand_change < 0 && mint_holder_hand.angle < -40))
        {
            mint_holder_hand_change = -mint_holder_hand_change;
        }
    },


    handleCharacterMovement: function(o)
    {
        if ((o.body.velocity.x > 0 && o.x + o.width >= GAME_WIDTH) ||
            (o.body.velocity.x < 0 && o.x <= 0))
        {
            o.body.velocity.x = -o.body.velocity.x;
        }
        else if (o.body.velocity.x == 0 && o.body.velocity.y == 0)
        {
            o.body.velocity.x = 10;
            // this.moveOffScreenDown(o);
        }
    },


    handlePatientMovement: function()
    {
        if (patient_left.body.velocity.x == 0 ||
            patient_right.body.velocity.x == 0 ||
            patient_middle_bg.body.velocity.x == 0 ||
            patient_middle_fg.body.velocity.x == 0)
        {
            if (Math.random() < 0.5)
            {
                patient_left.body.velocity.x = -PATIENT_SPEED;
            }
            else
            {
                patient_left.body.velocity.x = PATIENT_SPEED;
            }
            patient_right.body.velocity.x = patient_left.body.velocity.x;
            patient_middle_bg.body.velocity.x = patient_left.body.velocity.x;
            patient_middle_fg.body.velocity.x = patient_left.body.velocity.x;
            patient_full.body.velocity.x = patient_left.body.velocity.x;
        }

        if ((patient_left.body.velocity.x > 0 && patient_left.x >= -70) ||
            (patient_left.body.velocity.x < 0 && patient_left.x <= -120))
        {
            patient_left.body.velocity.x = -patient_left.body.velocity.x;
            patient_right.body.velocity.x = patient_left.body.velocity.x;
            patient_middle_bg.body.velocity.x = patient_left.body.velocity.x;
            patient_middle_fg.body.velocity.x = patient_left.body.velocity.x;
            patient_full.body.velocity.x = patient_left.body.velocity.x;
        }
    },


    handleCharacterOffScreen: function(o)
    {   
        if (o.y < 0) return;

        if (o.y > GAME_HEIGHT || 
            (o.body.velocity.x > 0 && o.x > GAME_WIDTH) || 
            (o.body.velocity.x < 0 && o.x + o.width < 0))
        {
            o.y = -1000;
            o.body.velocity.x = 0;
            o.body.velocity.y = 0;

            if (o == elaine)
            {
                elaine_event = this.time.events.add(Phaser.Timer.SECOND * (Math.random() * ELAINE_TIME_RANDOM + ELAINE_TIME_MIN), this.elaineStart, this);
            }
            else if (o == doctor)
            {
                doctor_event = this.time.events.add(Phaser.Timer.SECOND * (Math.random() * DOCTOR_TIME_RANDOM + DOCTOR_TIME_MIN), this.doctorStart, this);
            }
            else if (o == nurse)
            {
                nurse_event = this.time.events.add(Phaser.Timer.SECOND * (Math.random() * NURSE_TIME_RANDOM + NURSE_TIME_MIN), this.nurseStart, this);
            }
            else if (o == newman)
            {
                newman_event = this.time.events.add(Phaser.Timer.SECOND * (Math.random() * NEWMAN_TIME_RANDOM + NEWMAN_TIME_MIN), this.newmanStart, this);
            }
            else if (o == george)
            {
                george_event = this.time.events.add(Phaser.Timer.SECOND * (Math.random() * GEORGE_TIME_RANDOM + GEORGE_TIME_MIN), this.georgeStart, this);
            }            
        }
    },


    elaineStart: function()
    {
        elaine_get_out.play();

        this.characterStart(elaine,ELAINE_Y,ELAINE_SPEED);
    },

    georgeStart: function()
    {
        george_upset.play();

        this.characterStart(george,GEORGE_Y,GEORGE_SPEED);
    },

    newmanStart: function()
    {
        newman_hello.play();

        this.characterStart(newman,NEWMAN_Y,NEWMAN_SPEED);
    },

    doctorStart: function()
    {
        this.characterStart(doctor,DOCTOR_Y,DOCTOR_SPEED);
    },

    nurseStart: function()
    {
        this.characterStart(nurse,NURSE_Y,NURSE_SPEED);
    },


    characterStart: function(o,y,s)
    {
        o.y = y;

        if (Math.random() < 0.5)
        {
            o.x = GAME_WIDTH;
            o.body.velocity.x = -s;
        }
        else
        {
            o.x = 0 - o.width;
            o.body.velocity.x = s;         
        }    
    },


    wreckingBallStart: function()
    {
        i_came_in_like_a_wrecking_ball.play();

        wrecking_ball.visible = true;
        wrecking_ball.angle = 180;
        wrecking_ball_change = 1;
    },


    updateWreckingBall: function()
    {
        if (!wrecking_ball.visible) return;

        wrecking_ball.angle -= wrecking_ball_change;
        if (wrecking_ball.angle < -120)
        {
            wrecking_ball.visible = false;
            wrecking_ball_event = this.time.events.add(Phaser.Timer.SECOND * (Math.random() * WRECKING_BALL_TIME_RANDOM + WRECKING_BALL_TIME_MIN), this.wreckingBallStart, this);
        }

    },
};



