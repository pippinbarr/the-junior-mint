mint_holder = '';

var ezra_theme;
var hospital_atmos;

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		this.stage.backgroundColor = 0xff111111;

		if (ezra_theme == null)
		{
			ezra_theme = this.game.add.audio('ezra_theme',1,true);
		}

		ezra_theme.play(0,0,1,true);

		if (hospital_atmos != null) hospital_atmos.stop();

		this.add.sprite(0,0,'bg');
		// this.add.sprite(120,56,'jerry_body');
		// this.add.sprite(356,52,'kramer_body');
		// mint_launch_hand = this.add.sprite(240,150,'launch_hand');
		// mint_holder_hand = this.add.sprite(340,194,'mint_hand');
		this.add.sprite(140,200,'upper_wall');
		this.add.sprite(300,360,'doctor');
		this.add.sprite(100,360,'nurse');
		this.add.sprite(-80,480,'patient_no_hole');

		title = this.add.sprite(0,0,'title_the_junior_mint');
		title.x = 320-title.width/2;
		title.y = 20;

		credits = this.add.sprite(0,0,'title_credits');
		credits.x = 320-credits.width/2;
		credits.y = 320;


		// BUTTONS //

		jerry_play_button = this.add.sprite(40,440,'jerry_button_frames');
		jerry_play_button.inputEnabled = true;
		jerry_play_button.frame = 0;

		kramer_play_button = this.add.sprite(340,440,'kramer_button_frames');
		kramer_play_button.inputEnabled = true;
		kramer_play_button.frame = 0;

		spacing = 35;

		tweet_button = this.add.sprite(20,580,'tweet_frames');
		// tweet_button.inputEnabled = true;
		// tweet_button.events.onInputUp.add(this.buttonUp);
		// tweet_button.events.onInputDown.add(this.buttonDown);
		// tweet_button.events.onInputOut.add(this.buttonOut);

		like_button = this.add.sprite(tweet_button.x + tweet_button.width + spacing,tweet_button.y,'facebook_frames');
		// like_button.inputEnabled = true;
		// like_button.events.onInputUp.add(this.buttonUp);
		// like_button.events.onInputDown.add(this.buttonDown);
		// like_button.events.onInputOut.add(this.buttonOut);

		pippin_button = this.add.sprite(like_button.x + like_button.width + spacing,tweet_button.y + 12,'pippin_frames');
		// pippin_button.inputEnabled = true;
		// pippin_button.events.onInputUp.add(this.buttonUp);
		// pippin_button.events.onInputDown.add(this.buttonDown);
		// pippin_button.events.onInputOut.add(this.buttonOut);

		seinfeld_button = this.add.sprite(pippin_button.x + pippin_button.width + spacing,pippin_button.y,'seinfeld_frames');
		// seinfeld_button.inputEnabled = true;
		// seinfeld_button.events.onInputUp.add(this.buttonUp);
		// seinfeld_button.events.onInputDown.add(this.buttonDown);
		// seinfeld_button.events.onInputOut.add(this.buttonOut);

		ezra_button = this.add.sprite(seinfeld_button.x + seinfeld_button.width + spacing,pippin_button.y,'ezra_frames');
		// ezra_button.inputEnabled = true;
		// ezra_button.events.onInputUp.add(this.buttonUp);
		// ezra_button.events.onInputDown.add(this.buttonDown);
		// ezra_button.events.onInputOut.add(this.buttonOut);

		how_button = this.add.sprite(400,20,'how_to_play_frames');
		how_button.x = this.game.canvas.width - 20 - how_button.width;
		how_button.y = 20;
		how_button.inputEnabled = true;
		how_button.events.onInputUp.add(this.buttonUp);
		how_button.events.onInputDown.add(this.buttonDown);
		how_button.events.onInputOut.add(this.buttonOut);
		how_button.frame = 1;

		how_to_play_bg = this.add.sprite(0,0,'how_to_play_bg');
		how_to_play_bg.visible = false;

		howString = "Play as Jery or Krame. " +
		"If you chose Jery, Krame will be ofering you a Jr Mint (and vise verse). " +
		"As the Jr Mint box pivots, touch the screne (mobile) or click the screne w your mouse to launch a junier mint. " +
		"The object is to get as many junier into the hole of the patient. " +
		"There are 24 mint per box. " +
		"Whenever a mint gos in, the value of Gerge's triangle art goes up $1900, " +
		"its becase the patient is an artist who made the art and the value goes up becase each Junier Mint is causing the artists health to decline, does that make sense?";
		how_text = this.add.text(this.game.canvas.width/2, 20, howString, { font: 'bold 30px sans-serif', align: 'center', fill: '#fff', wordWrap: true, wordWrapWidth: 600 });
		how_text.anchor.x = 0.5;
		how_text.visible = false;

		menu_button = this.add.sprite(400,20,'back_to_menu_frames');
		menu_button.x = this.game.canvas.width/2 - menu_button.width/2;
		menu_button.y = 540;
		menu_button.inputEnabled = true;
		menu_button.events.onInputUp.add(this.buttonUp);
		menu_button.events.onInputDown.add(this.buttonDown);
		menu_button.events.onInputOut.add(this.buttonOut);
		menu_button.visible = false;
	},

	destroy: function ()
	{
		title.destroy();
		credits.destroy();

		tweet_button.destroy();
		pippin_button.destroy();
		seinfeld_button.destroy();
		ezra_button.destroy();

		how_button.destroy();
		how_to_play_bg.destroy();
		how_text.destroy();
		menu_button.destroy();
	},

	buttonDown: function (b)
	{
		b.frame = 1;
		if (b == how_button) b.frame = 0;
	},

	buttonOut: function (b)
	{
		b.frame = 0;
		if (b == how_button) b.frame = 1;
	},

	buttonUp: function (b)
	{
		b.frame = 0;
		if (!b.input.checkPointerOver(b.game.input.activePointer)) return;

		if (b == tweet_button)
		{
			if (b.game.device.desktop)
			{
				window.open("http://twitter.com/intent/tweet?text=OMG+The+Junior+Mint+Game+by+@Seinfeld2000+and+@pippinbarr!&url=http://thejuniormint.com/","_system");
			}
			else
			{
				nativeTwitter = window.open("twitter://post?message=OMG The Junior Mint Game by @Seinfeld2000 and @pippinbarr! http://thejuniormint.com/","_self");
				if (!nativeTwitter)
				{
					window.open("http://twitter.com/intent/tweet?text=OMG The Junior Mint Game by @Seinfeld2000 and @pippinbarr!&url=http://thejuniormint.com/","_system");
				}
			}
		}
		else if (b == like_button)
		{
			window.open("http://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fthejuniormint.com/&t=OMG","_system");
		}
		else if (b == pippin_button)
		{
			window.open('http://www.pippinbarr.com/','_system');
		}
		else if (b == seinfeld_button)
		{
			window.open('http://www.twitter.com/Seinfeld2000','_system');
		}
		else if (b == ezra_button)
		{
			window.open('http://www.twitter.com/arzE','_system');
		}
		else if (b == how_button)
		{
			how_to_play_bg.visible = true;
			menu_button.visible = true;
			how_text.visible = true;

			jerry_play_button.visible = false;
			kramer_play_button.visible = false;
			seinfeld_button.visible = false;
			ezra_button.visible = false;
			pippin_button.visible = false;
			how_button.visible = false;
		}
		else if (b == menu_button)
		{
			how_to_play_bg.visible = false;
			menu_button.visible = false;
			how_text.visible = false;

			jerry_play_button.visible = true;
			kramer_play_button.visible = true;
			seinfeld_button.visible = true;
			ezra_button.visible = true;
			pippin_button.visible = true;
			how_button.visible = true;
		}
	},


	update: function () {

		if (jerry_play_button.input.checkPointerOver(this.input.activePointer) && this.input.activePointer.isDown)
		{
			jerry_play_button.frame = 1;
		}
		else
		{
			jerry_play_button.frame = 0;
		}

		if (kramer_play_button.input.checkPointerOver(this.input.activePointer) && this.input.activePointer.isDown)
		{
			kramer_play_button.frame = 1;
		}
		else
		{
			kramer_play_button.frame = 0;
		}

		if (this.input.activePointer.justReleased(20) &&
			kramer_play_button.input.checkPointerOver(this.game.input.activePointer))
		{
			mint_holder = 'jerry';
			this.destroy();
			this.game.state.start('Game');
		}
		else if (this.input.activePointer.justReleased(20) &&
			jerry_play_button.input.checkPointerOver(this.game.input.activePointer))
		{
			mint_holder = 'kramer';
			this.destroy();
			this.game.state.start('Game');
		}
	},
};
