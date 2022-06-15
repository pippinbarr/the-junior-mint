var george_hoho;


BasicGame.EndMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.EndMenu.prototype = {

	create: function () {

		this.game.stage.backgroundColor = '#EEEEEE';

		ezra_theme.stop();
		if (!george_hoho) george_hoho = this.add.audio('george_hoho',1,false);

		congratulations = this.add.sprite(0,0,'end_congratulations');
		congratulations.x = this.game.canvas.width/2 - congratulations.width/2;
		congratulations.y = 20;

		george_image = this.add.sprite(0,0,'end_george');
		george_image.x = this.game.canvas.width/2 - george_image.width/2;
		george_image.y = congratulations.y + congratulations.height + 80;

		play_again = this.add.sprite(0,0,'end_play_again_frames');
		play_again.x = george_image.x + 420;
		play_again.y = george_image.y + 250;
		play_again.frame = 0;
		play_again.inputEnabled = true;
		play_again.events.onInputUp.add(this.buttonUp);
		play_again.events.onInputDown.add(this.buttonDown);
		play_again.events.onInputOut.add(this.buttonOut);

		// score = 45600;
		moneyString = "A donation of " + this.makeMoneyString(score) + " has been made in your name to The Human Fund.";
		winningsAmount = this.add.text(0, 0, moneyString, { font: 'bold 17px sans-serif', fill: '#000', wordWrap: true, wordWrapWidth: george_image.width });
		winningsAmount.anchor.x = 0.5;
		winningsAmount.x = this.game.canvas.width/2;
		winningsAmount.y = (congratulations.y + congratulations.height) + (george_image.y - (congratulations.y + congratulations.height))/2 - 9;

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
	},

	destroyElements: function ()
	{
		congratulations.destroy();
		george_image.destroy();
		play_again.destroy();
		winningsAmount.destroy();
		tweet_button.destroy();
		pippin_button.destroy();
		seinfeld_button.destroy();
		ezra_button.destroy();
	},

	buttonDown: function (b)
	{
		b.frame = 1;
	},

	buttonOut: function (b)
	{
		b.frame = 0;
	},

	buttonUp: function (b)
	{
		b.frame = 0;
		if (b == play_again)
		{
			george_hoho.play();

			b.game.state.start('MainMenu');

			// congratulations.destroy();
			// george_image.destroy();
			// play_again.destroy();
			// winningsAmount.destroy();
			// tweet_button.destroy();
			// pippin_button.destroy();
			// seinfeld_button.destroy();
			// ezra_button.destroy();
		}
		else if (b == tweet_button)
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


	update: function ()
	{

	},


};
