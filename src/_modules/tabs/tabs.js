'use strict';

// Constructor
var Tabs = function() {


    var tabSelectors = $('[data-tab-target]');
    var tabs = $('[data-tab-index]');
    var triggers = $('.js-trigger');

    triggers.each(function(){
        var hash = $(this).attr('href');

        $(this).click(function(event){
            event.preventDefault();
            if(history.pushState) {
                history.pushState(null, null, hash);
            }
            else {
                location.hash = hash;
            }
        });
    });

    function init() {
        $('[data-tab-target]:first').addClass('-active');
        $('[data-tab-index]:first').addClass('-active');
        setHiddenValue();
    }

    function setHiddenValue() {
        var activeTab = $('.mavatec__tabs__tab.-active');
        var value = activeTab.find('.js-trigger').html();

        $('.mavatec__producto').val(value);
    }



    if ( tabSelectors && tabs) {

      tabSelectors.each(function(){
          var $this = $(this);
         $this.on('click',function(){
            var dataTarget = $(this).data('tab-target');

            tabSelectors.removeClass('-active');
            $this.addClass('-active');

            tabs.removeClass('-active');
            tabs.filter(function() {
                return $(this).data('tab-index') == dataTarget;
            }).addClass('-active');

            setHiddenValue();
         });
      });

      var hash = window.location.hash;

      if (hash != '') {
          var hash = hash.replace('#', '');

          tabs.filter(function() {
              return $(this).data('tab-index') == hash;
          }).addClass('-active');

          tabSelectors.filter(function() {
              return $(this).data('tab-target') == hash;
          }).addClass('-active');

          setHiddenValue();

          setTimeout(function() {
            window.scrollTo(0, 0);
          }, 1);

      } else {
          init();
      }

    }

    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[class="js-trigger"]')
    .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top + -50
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
    });

};

module.exports = Tabs;
