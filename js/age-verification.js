/*!
 * Simple Age Verification (https://github.com/Herudea/age-verification))
 */

 var modal_content,
 modal_screen;

 // Start Working ASAP.
 $(document).ready(function () {
     av_legality_check();
 });

 // Make sure the prompt stays in the middle.
 $(window).resize(function () {
     av_positionPrompt();
 });

 av_legality_check = function () {

     if ($.cookie('is_legal') == "yes") {
     }

     else {
         av_showmodal();
     }
 };

 av_showmodal = function () {
     modal_screen = $('<div id="modal_screen"></div>');
     modal_content = $('<div id="modal_content" style="display:none"></div>');
     var modal_content_wrapper = $('<div id="modal_content_wrapper" class="content_wrapper"></div>');
     var modal_regret_wrapper = $('<div id="modal_regret_wrapper" class="content_wrapper" style="display:none;"></div>');

     // Question Content
     var content_heading = $('<h2>Are You Eligible to Visit Mobile Strain?</h2>');
     var content_text = $('<p>Mobile Strain operates in compliance with state laws regarding access to cannabis. Are you at least 21 years old or a valid medical marijuana patient?</p>');
     var content_buttons = $('<div><ul><li><a href="#nothing" class="button" rel="yes">Yes</a></li><li><a href="#nothing" class="button notEligible" rel="no">No</a></li></nav>');

     // Regret Content
     var regret_heading = $('<h2>We\'re Sorry</h2>');
     var regret_text = $('<p class="caption">You must be 21 years old or a valid medical marijuana patient to enter this site.</p>');

     modal_content_wrapper.append(content_heading, content_text, content_buttons);
     modal_regret_wrapper.append(regret_heading, regret_text);
     modal_content.append(modal_content_wrapper, modal_regret_wrapper);

     // Append the prompt to the end of the document
     $('body').append(modal_screen, modal_content);

     // Center the box
     av_positionPrompt();

     modal_content.find('a.button').on('click', av_setCookie);
 };

 av_setCookie = function (e) {
     e.preventDefault();

     var is_legal = $(e.currentTarget).attr('rel');

     $.cookie('is_legal', is_legal, {
         expires: 30,
         path: '/'
     });

     if (is_legal == "yes") {
         av_closeModal();
         $(window).off('resize');

     }

     else {
         av_showRegret();
     }
 };

 av_closeModal = function () {
     modal_content.fadeOut();
     modal_screen.fadeOut();
 };

 av_showRegret = function () {
     modal_screen.addClass('nope');
     modal_content.find('#modal_content_wrapper').hide();
     modal_content.find('#modal_regret_wrapper').show();
 };

 av_positionPrompt = function () {
     var top = ($(window).outerHeight() - $('#modal_content').outerHeight()) / 2;
     var left = ($(window).outerWidth() - $('#modal_content').outerWidth()) / 2;
     if (modal_content !== undefined) {
         modal_content.css({
             'top': top,
             'left': left
         });
         if (modal_content.is(':hidden') && ($.cookie('is_legal') != "yes")) {
             modal_content.fadeIn('slow')
         }
     }
 };
