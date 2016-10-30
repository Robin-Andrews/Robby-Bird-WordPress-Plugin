jQuery(document).ready(function (jQuery) {

	//saving dom objects to variables
	container = jQuery('#container');
	bird = jQuery('#bird');
	pole = jQuery('.pole');
	pole_1 = jQuery('#pole_1');
	pole_2 = jQuery('#pole_2');
	score = jQuery('#score');
	speed_span = jQuery('#speed');
	restart_btn = jQuery('#restart_btn');

	// auto scrolling needed for mobiles
	// if (typeof(bird[0].ontouchend) == "function") {
		// jQuery('html, body').animate({
			// scrollTop : jQuery('#game').offset().top
		// });
	// }

	// start game
	start();
});

function start() {

	//saving some initial setup
	var container_width = parseInt(container.width());
	var container_height = parseInt(container.height());
	var pole_initial_position = parseInt(pole.css('right'));
	var pole_initial_height = parseInt(pole.css('height'));
	var bird_left = parseInt(bird.css('left'));
	var bird_height = parseInt(bird.height());
	var speed = 10;

	//some other declarations
	var go_up = false;
	var score_updated = false;
	var game_over = false;

	var the_game = setInterval(function () {

			if (collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {

				stop_the_game();

			} else {

				var pole_current_position = parseInt(pole.css('right'));

				//update the score when the poles have passed the bird successfully
				if (pole_current_position > container_width - bird_left) {
					if (score_updated === false) {
						score.text(parseInt(score.text()) + 1);
						score_updated = true;
					}
				}

				//check whether the poles went out of the container
				if (pole_current_position > container_width) {
					var new_height = parseInt(Math.random() * 100);

					//change the pole's height
					pole_1.css('height', pole_initial_height + new_height);
					pole_2.css('height', pole_initial_height - new_height);

					//increase speed
					speed = speed + 1;
					speed_span.text(speed);

					score_updated = false;

					pole_current_position = pole_initial_position;
				}

				//move the poles
				pole.css('right', pole_current_position + speed);

				if (go_up === false) {
					go_down();
				}
			}

		}, 40);

	// key press
	jQuery(document).on('keydown', function (e) {
		var key = e.keyCode;
		if (key === 70 && go_up === false && game_over === false) {
			go_up = setInterval(up, 50);
		}
	});
	// key release
	jQuery(document).on('keyup', function (e) {
		var key = e.keyCode;
		if (key === 70) {
			clearInterval(go_up);
			go_up = false;
		}
	});

	// mousedown
	jQuery('#container').on('mousedown touchstart', function (e) {
		if (go_up === false && game_over === false) {
			go_up = setInterval(up, 50);
		}
	});

	// mouseup
	jQuery('#container').on('mouseup touchend', function (e) {
		clearInterval(go_up);
		go_up = false;
	});

	function go_down() {
		bird.css('top', parseInt(bird.css('top')) + 5);
	}

	function up() {
		bird.css('top', parseInt(bird.css('top')) - 10);
	}

	function stop_the_game() {
		clearInterval(the_game);
		game_over = true;
		restart_btn.slideDown();
	}

	restart_btn.click(function () {
		location.reload();
	});

	function collision(jQuerydiv1, jQuerydiv2) {
		var x1 = jQuerydiv1.offset().left;
		var y1 = jQuerydiv1.offset().top;
		var h1 = jQuerydiv1.outerHeight(true);
		var w1 = jQuerydiv1.outerWidth(true);
		var b1 = y1 + h1;
		var r1 = x1 + w1;
		var x2 = jQuerydiv2.offset().left;
		var y2 = jQuerydiv2.offset().top;
		var h2 = jQuerydiv2.outerHeight(true);
		var w2 = jQuerydiv2.outerWidth(true);
		var b2 = y2 + h2;
		var r2 = x2 + w2;

		if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)
			return false;
		return true;
	}

}
