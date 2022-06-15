
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		this.game.stage.backgroundColor = '#EEEEEE';

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		// this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		// this.load.setPreloadSprite(this.preloadBar);

		seinfeld_imagening = this.add.sprite(0,0,'imagening');
		seinfeld_imagening.x = this.game.canvas.width/2 - seinfeld_imagening.width/2;
		seinfeld_imagening.y = 100;

		imagening = this.add.text(0, 0, "Imagening", { font: 'bold 44px sans-serif', fill: '#000'});
		imagening.x = this.game.canvas.width/2 - imagening.width/2;//seinfeld_imagening.x;
		imagening.y = seinfeld_imagening.y + seinfeld_imagening.height + 0;

		preloadBar = this.add.sprite(0, 0, 'preloaderBar');
		preloadBar.x = this.game.canvas.width/2 - preloadBar.width/2;
		preloadBar.y = imagening.y + imagening.height + 20;

		this.load.setPreloadSprite(preloadBar);

		// GAME //

		this.load.image('bg','images/game/bg.png');
		this.load.image('jerry_body','images/game/jerry_body.png');
		this.load.image('kramer_body','images/game/kramer_body.png');
		this.load.image('mint_hand','images/game/mint_hand.png');
		this.load.image('launch_hand','images/game/mint_launch_hand.png');
		this.load.image('upper_wall','images/game/upper_wall.png');
		this.load.image('elaine','images/game/elaine.png');
		this.load.image('doctor','images/game/doctor.png');
		this.load.image('nurse','images/game/nurse.png');
		this.load.image('george','images/game/george.png');
		this.load.image('newman','images/game/newman.png');
		this.load.image('iv','images/game/iv.png');
		this.load.image('patient_left','images/game/patient_left.png');
		this.load.image('patient_middle_bg','images/game/patient_middle_bg.png');
		this.load.image('patient_middle_fg','images/game/patient_middle_fg.png');
		this.load.image('patient_right','images/game/patient_right.png');
		this.load.image('patient_full_with_hole','images/game/patient_full_with_hole.png');
		this.load.image('george_triangle','images/game/george_triangle.png');
		this.load.image('wrecking_ball','images/game/wrecking_ball.png');
		this.load.image('mint','images/game/mint.png');
		this.load.image('one_red_pixel','images/game/one_red_pixel.png');

		// MAIN MENU  //
		
		this.load.image('title_the_junior_mint','images/main_menu/title_the_junior_mint.png');
		this.load.image('title_credits','images/main_menu/title_credits.png');
		this.load.image('patient_no_hole','images/main_menu/patient_no_hole.png');
		this.load.image('how_to_play_bg','images/main_menu/how_to_play_bg.png');
		this.load.spritesheet('jerry_button_frames','images/main_menu/jerry_button_frames.png',280,60);
		this.load.spritesheet('kramer_button_frames','images/main_menu/kramer_button_frames.png',280,60);
		this.load.spritesheet('how_to_play_frames','images/main_menu/how_to_play_frames.png',240,62);
		this.load.spritesheet('back_to_menu_frames','images/main_menu/back_to_menu_frames.png',237,57);

		// END MENU //

		this.load.image('end_congratulations','images/end_menu/end_congratulations.png');
		this.load.image('end_george','images/end_menu/end_george.png');
		this.load.spritesheet('end_play_again_frames','images/end_menu/end_play_again_frames.png',163,34);

		// SHARING //

		this.load.spritesheet('tweet_frames','images/sharing/tweet_frames.png',70,52);
		this.load.spritesheet('facebook_frames','images/sharing/facebook_frames.png',55,60);
		this.load.spritesheet('pippin_frames','images/sharing/pippin_frames.png',110,34);
		this.load.spritesheet('seinfeld_frames','images/sharing/seinfeld_frames.png',110,33);
		this.load.spritesheet('ezra_frames','images/sharing/ezra_frames.png',114,33);

		// AUDIO

		this.load.audio('kramer_mint_offer',['audio/kramer_mint_offer.mp3','audio/kramer_mint_offer.ogg']);
		this.load.audio('jerry_no',['audio/jerry_no.mp3','audio/jerry_no.ogg']);
		this.load.audio('kramer_no',['audio/kramer_no.mp3','audio/kramer_no.ogg']);
		this.load.audio('mint_in',['audio/mint_in.mp3','audio/mint_in.ogg']);
		this.load.audio('mint_bounce',['audio/mint_bounce.mp3','audio/mint_bounce.ogg']);
		this.load.audio('mint_launch',['audio/mint_launch.mp3','audio/mint_launch.ogg']);
		this.load.audio('george_upset',['audio/george_upset.mp3','audio/george_upset.ogg']);
		this.load.audio('newman_hello',['audio/newman_hello.mp3','audio/newman_hello.ogg']);
		this.load.audio('elaine_get_out',['audio/elaine_get_out.mp3','audio/elaine_get_out.ogg']);
		this.load.audio('hospital_atmos',['audio/hospital_atmos.mp3','audio/hospital_atmos.ogg']);
		this.load.audio('i_came_in_like_a_wrecking_ball',['audio/i_came_in_like_a_wrecking_ball.mp3','i_came_in_like_a_wrecking_ball.ogg']);
		this.load.audio('laugh_track',['audio/laugh_track.mp3','audio/laugh_track.ogg']);
		this.load.audio('mint_miss',['audio/mint_miss.mp3','audio/mint_miss.ogg']);
		this.load.audio('jerry_learned',['audio/jerry_learned.mp3','audio/jerry_learned.ogg']);
		this.load.audio('kramer_refreshing',['audio/kramer_refreshing.mp3','audio/kramer_refreshing.ogg']);
		this.load.audio('george_hoho',['audio/george_hoho.mp3','audio/george_hoho.ogg']);
		this.load.audio('jerry_mint',['audio/jerry_mint.mp3','audio/jerry_mint.ogg']);
		this.load.audio('ezra_theme',['audio/ezra_theme.mp3','audio/ezra_theme.ogg']);
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		// this.preloadBar.cropEnabled = false;
		this.game.stage.backgroundColor = '#EEEEEE';


	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('ezra_theme') && this.ready == false)
		{
			this.ready = true;
			this.game.state.start('MainMenu');
		}

	}

};
