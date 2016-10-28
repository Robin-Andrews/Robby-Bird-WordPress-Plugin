<?php

/* Plugin Name: Robby Bird
 * Version: 1.0
 * Plugin URI: github - url to be confirmed.
 * Description: A WordPress plugin that creates a post containing an HTML5 version of "Flappy Bird" using JQuery. Deletes post on deactivation.
 * Author: Robin Andrews
 * Author URI: http://balanceit.one/
*/

function ra_add_post()
{
    $prev_post = get_page_by_title('Robby Bird', 'OBJECT', 'post');
    
    
    if ($prev_post->post_status == false || $prev_post->post_status == 'trash') {    
        $html = '				
				<div id="game">
				
					<p id="instructions">Press \'f\' to make the bird fly. Avoid poles and bounderies. Enjoy!</p>
					
					<div id="container">

					<div id="bird"></div>

					<div id="pole_1" class="pole"></div>
					<div id="pole_2" class="pole"></div>

					</div>

					<div id="score_div">
						<p><b>Score: </b><span id="score">0</span></p>
						<p><b>Speed: </b><span id="speed">10</span></p>
					</div>

					<button id="restart_btn">Restart</button>
					
        </div><!-- game -->';
        
        $new_post = array(
            'post_title' => 'Robby Bird',
            'post_content' => $html,
            'post_status' => 'publish'
        );
        
        wp_insert_post($new_post);
        
        
    }
}

register_activation_hook(__FILE__, ra_add_post);


function ra_robbybird(){    
    if (is_single('Robby Bird')) {
			
		 // Register the script like this for a plugin:
			wp_register_script('flatty-bird-script', plugins_url('script.js', __FILE__), array(
					'jquery'
			));
			
			// register jquery mobile
			wp_register_script('jquery-mobile-js', 'http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.js');
			
			// Register the style like this for a plugin:
			wp_register_style('flatty-bird-style', plugins_url('style.css', __FILE__), array(), '', 'all');
			
			// load them all	
			wp_enqueue_style('flatty-bird-style');
			wp_enqueue_script('flatty-bird-script');
			// wp_enqueue_script('jquery-mobile-js'); // seems to break site 
    }
}

add_action('wp', 'ra_robbybird');

function ra_remove_post(){
	$ra_post_id = get_page_by_title('Robby Bird', 'OBJECT', 'post')->ID;
	wp_delete_post($ra_post_id, true);
}

register_deactivation_hook(__FILE__, ra_remove_post);
