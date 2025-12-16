(function($) {

  "use strict";

  /*
  |--------------------------------------------------------------------------
  | Template Name: limty
  | Author: laralink
  | Developer: Tamjid Bin Murtoza;
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Main Menu
  | 2. Modal Video
  | 3. Background Image
  | 4. Owl Carousel
  | 5. Progress Bar
  | 6. Mailchimp
  | 6. Ajax Contact Form
  | 7. Isotop Initialize
  | 8. Footer Sticky
  |
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function(selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function() {
    $(window).trigger("scroll");
    $(window).trigger("resize");
    preloaderSetup();
    isotopMsSetup();
  });

  $(document).on("ready", function() {
    $(window).trigger("resize");
    mobileMenu();
    scrollFunction();
    menuFunction();
    modalVideo();
    backgroundImage();
    owlCarouselSetup();
    progressBar();
    contactForm();
    isotopMsSetup();
    stickyFooter();
    tamjidCounterSetup();
    mapBar();
    new WOW().init();

  });

  $(window).on("resize", function() {
    mobileMenu();
    isotopMsSetup();
    stickyFooter();
  });

  $(window).on("scroll", function() {
    scrollFunction();
  });

  // Preloader
  function preloaderSetup() {
    $(".st-preloader-wave").fadeOut();
    $("#st-preloader").delay(150).fadeOut("slow");
  }
  
  /*--------------------------------------------------------------
    1. Main Menu
  --------------------------------------------------------------*/
  // Main Menu function
  function menuFunction() {
    $('.st-nav-toggle').on('click', function() {
      $(this).siblings('.st-nav').slideToggle();
      $(this).toggleClass('st-active');
    });
    $('.st-has-children').append('<span class="st-dropdown-btn"></span>');
    $('.st-dropdown-btn').on('click', function() {
      $(this).siblings('ul, .st-megamenu-in, .st-vertical-megamenu-in').slideToggle('slow');
      $(this).toggleClass('st-active');
    });

    // Mega Menu Tab
    var megaTabEnd = 0;
    var e;
    $('.st-sub-megamenu-list li').on({
      mouseenter: function() {
        var $this = $(this);
        if (megaTabEnd || $this.hasClass('active')) return false;
        megaTabEnd = 1;
        $this.siblings('.active').removeClass('active');
        $this.addClass('active');
        var index = $this.parent().parent().find('.st-sub-megamenu-list li').index(this);
        $this.closest('.st-megamenu-in').find('.st-sub-megamenu-in.active').fadeOut(200, function() {
          $(this).removeClass('active');
          $this.closest('.st-megamenu-in').find('.st-sub-megamenu-in').eq(index).fadeIn(200, function() {
            megaTabEnd = 0;
            $(this).addClass('active');
          });
        });
      },
      mouseleave: function() {
        $('.st-sub-megamenu-list li').siblings('.active').removeClass('active').addClass('active');
      }
    });
    $('.st-header .st-mobile-nav a').on('click', function() {
      $('.st-nav').slideUp();
      $('.st-nav-toggle').removeClass('st-active');
    })
  }

  // Mobile Menu
  function mobileMenu() {
    if ($(window).width() <= 991) {
      $('.st-header').addClass('st-mobile-header');
      $('.st-nav, .st-vertical-nav-wrap').addClass('st-mobile-nav').removeClass('st-desktop-nav');
    } else {
      $('.st-header').removeClass('st-mobile-header');
      $('.st-nav, .st-vertical-nav-wrap').addClass('st-desktop-nav').removeClass('st-mobile-nav');
    }
  }

  function scrollFunction() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $('.st-header').addClass('st-sticky-active');
      $('.st-sticky-menu .st-desktop-nav .st-vertical-nav-list').slideUp();
      $('.st-vertical-nav-btn').removeClass('st-vertical-nav-perform');
    } else {
      $('.st-header').removeClass('st-sticky-active');
      $('.st-sticky-menu .st-desktop-nav .st-vertical-nav-list').slideDown();
      $('.st-vertical-nav-btn').addClass('st-vertical-nav-perform');
    }
  }

  // Click To Go Top
  $('.smooth-scroll').on('click', function() {
    var thisAttr = $(this).attr('href');
    if ($(thisAttr).length) {
      var scrollPoint = $(thisAttr).offset().top - 50;
      $('body,html').animate({
        scrollTop: scrollPoint
      }, 600);
    }
    return false;
  });

  // One Page Active Class
  var topLimit = 300,
  ultimateOffset = 200;

  $('.onepage-nav').each(function() {
    var $this = $(this),
    $parent = $this.parent(),
    current = null,
    $findLinks = $this.find("a");

    function getHeader(top) {
      var last = $findLinks.first();
      if (top < topLimit) {
        return last;
      }
      for (var i = 0; i < $findLinks.length; i++) {
        var $link = $findLinks.eq(i),
        href = $link.attr("href");

        if (href.charAt(0) === "#" && href.length > 1) {
          var $anchor = $(href).first();
          if ($anchor.length > 0) {
            var offset = $anchor.offset();
            if (top < offset.top - ultimateOffset) {
              return last;
            }
            last = $link;
          }
        }
      }
      return last;
    }

    $(window).on("scroll", function() {
      var top = window.scrollY,
      height = $this.outerHeight(),
      max_bottom = $parent.offset().top + $parent.outerHeight(),
      bottom = top + height + ultimateOffset;

      var $current = getHeader(top);

      if (current !== $current) {
        $this.find(".active").removeClass("active");
        $current.addClass("active");
        current = $current;
      }
    });

  });

  /*--------------------------------------------------------------
    2. Modal Video
  --------------------------------------------------------------*/
    function modalVideo() {
      $(document).on('click', '.st-video-open', function(e) {
        e.preventDefault();
        var video = $(this).attr('href');
        $('.st-video-popup-container iframe').attr('src', video);
        $('.st-video-popup').addClass('active');

      });
      $('.st-video-popup-close, .st-video-popup-layer').on('click', function(e) {
        $('.st-video-popup').removeClass('active');
        $('html').removeClass('overflow-hidden');
        $('.st-video-popup-container iframe').attr('src', 'about:blank')
        e.preventDefault();
      });
    }

  /*--------------------------------------------------------------
    3. Background Image
  --------------------------------------------------------------*/
    function backgroundImage() {
      if ($.exists(".st-bg")) {
        $(".st-bg").each(function() {
          var src = $(this).attr("data-src");
          $(this).css({
            "background-image": "url(" + src + ")"
          });
        });
      }
    }

  /*--------------------------------------------------------------
    4. Owl Carousel
  --------------------------------------------------------------*/

    function owlCarouselSetup() {
      if ($.exists('.st-hero-slider1')) {
        /* Owl Carousel For hero-slider-v1 */
        $('.st-hero-slider1').owlCarousel({
          items:1,
          loop:true,
          margin:0,
          nav:true,
          navText:['<i class="flaticon-left"></i>قبلی', 'بعدی<i class="flaticon-right"></i>'],
          dots:false,
          autoplay:false,
          autoplayHoverPause:false,
          smartSpeed:500,
          autoplayTimeout:5000         
        });
      }

      // Service Carousel
      if ($.exists('.st-service-carousel')) {
        $('.st-service-carousel').owlCarousel({
          loop:true,
          margin:30,
          nav:true,
          dots:true,
          navText:['<i class="flaticon-left"></i>', '<i class="flaticon-right"></i>'],
          autoplay:false,
          smartSpeed:1000,
          autoplayTimeout:5000,
          responsive:{
            0:{
              items:1
            },
            767:{
              items:2
            },
            991:{
              items:3
            }
          }
        });
      }

      // Client Carousel
      if ($.exists('.st-client-carousel')) {
        $('.st-client-carousel').owlCarousel({
          loop:true,
          margin:30,
          nav:false,
          navText:false,
          autoplay:false,
          smartSpeed:1000,
          autoplayTimeout:5000,
          responsive:{
            0:{
              items:2
            },
            600:{
              items:3
            },
            800:{
              items:4
            },
            1000:{
              items:5
            }
          }
        });
      }

      // Project Carousel
      if ($.exists('.st-project-carousel')) {
        $('.st-project-carousel').owlCarousel({
          loop:true,
          margin:30,
          nav:false,
          navText:false,
          dots:true,
          autoplay:false,
          smartSpeed:500,
          autoplayTimeout:4000,
          responsive:{
            0:{
              items:1
            },
            575:{
              items:2
            },
            767:{
              items:3
            },
            991:{
              items:4
            }
          }
        });
      }

      // Member Carousel
      if ($.exists('.st-member-carousel')) {
        $('.st-member-carousel').owlCarousel({
          loop:true,
          margin:30,
          nav:true,
          dots:true,
          navText:['<i class="flaticon-left"></i>', '<i class="flaticon-right"></i>'],
          autoplay:false,
          smartSpeed:500,
          autoplayTimeout:4000,
          responsive:{
            0:{
              items:1
            },
            575:{
              items:2
            },
            991:{
              items:3
            },
            1199:{
              items:4
            }
          }
        });
      }
      // Testimonial Slider
      if ($.exists('.st-testimonial-slider')) {
        $('.st-testimonial-slider').owlCarousel({
          items:1,
          loop:true,
          margin:0,
          nav:true,
          navText:['<i class="flaticon-left"></i>', '<i class="flaticon-right"></i>'],
          dots:false,
          autoplay:false,
          autoplayHoverPause:false,
          smartSpeed:500,
          autoplayTimeout:5000         
        });
      }
    }

  /*--------------------------------------------------------------
    5. Progress Bar
  --------------------------------------------------------------*/
    function progressBar() {
    // .data('progress-percentage')
    $(".st-progressbar").each(function() {
      var progressPercentage = $(this).data("progress-percentage") + "%";
      progressPercentage = "calc(" + progressPercentage + " - 4px)";
      $(this).find(".st-progressbar-in").css("width", progressPercentage);
    });
  }

  /*--------------------------------------------------------------
    6. Mailchimp
  --------------------------------------------------------------*/
    if ($.exists('.mailchimp')) {
     // active mailchimp 
     if ($('.mailchimp').length > 0) {
      $('.mailchimp').ajaxChimp({
        language: 'es',
        callback: mailchimpCallback
      });
    }

    function mailchimpCallback(resp) {
        // Check For Available Email
        if (resp.result === 'success') {
          $('.subscription-success').html('<i class="fa fa-check"></i><br/>' + resp.msg).fadeIn(1000);
          $('.subscription-error').fadeOut(500);

        } else if (resp.result === 'error') {
          $('.subscription-error').html('<i class="fa fa-times"></i><br/>' + resp.msg).fadeIn(1000);
        }
      }
    // Mailchimp Alart Message
    $.ajaxChimp.translations.es = {
      'submit': 'Submitting...',
      0: 'We have sent you a confirmation email',
      1: 'Please enter a value',
      2: 'An email address must contain a single @',
      3: 'The domain portion of the email address is invalid (the portion after the @: )',
      4: 'The username portion of the email address is invalid (the portion before the @: )',
      5: 'This email address looks fake or invalid. Please enter a real email address'
    };
  }

  /*--------------------------------------------------------------
    6. Ajax Contact Form
  --------------------------------------------------------------*/
    function contactForm() {

      $('#cf-msg').hide();
      $('#cf #submit').on('click', function() {
        var name = $('#name').val();
        var subject = $('#subject').val();
        var email = $('#email').val();
        var msg = $('#msg').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regex.test(email)) {
          $('#cf-msg').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please Enter Valied Email.</div>');
          return false;
        }

        name = $.trim(name);
        subject = $.trim(subject);
        email = $.trim(email);
        msg = $.trim(msg);

        if (name != '' && email != '' && msg != '') {
          var values = "name=" + name + "&subject=" + subject + "&email=" + email + " &msg=" + msg;
          $.ajax({
            type: "POST",
            url: "assets/php/mail.php",
            data: values,
            success: function() {
              $('#name').val('');
              $('#subject').val('');
              $('#email').val('');
              $('#msg').val('');

              $('#cf-msg').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
              setTimeout(function() {
                $('#cf-msg').fadeOut('slow');
              }, 4000);
            }
          });
        } else {
          $('#cf-msg').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> All fields are required.</div>');
        }
        return false;
      });

    }


  /*--------------------------------------------------------------
    7. Isotop Initialize
  --------------------------------------------------------------*/

    function isotopMsSetup() {

      if ($.exists('.st-isotop')) {
        $('.st-isotop').isotope({
          itemSelector: '.st-isotop-item',
          transitionDuration: '0.60s',
          percentPosition: true,
          masonry: {
            columnWidth: '.st-grid-sizer'
          }
        });
        /* Active Class of Portfolio*/
        $('.st-isotop-filter ul li').on('click', function(event) {
          $(this).siblings('.active').removeClass('active');
          $(this).addClass('active');
          event.preventDefault();
        });
        /*=== Portfolio filtering ===*/
        $('.st-isotop-filter ul').on('click', 'a', function() {
          var filterElement = $(this).attr('data-filter');
          $(this).parents('.st-isotop-filter').next().isotope({
            filter: filterElement
          });
        });

      }

    }

  /*--------------------------------------------------------------
    8. Footer Sticky
  --------------------------------------------------------------*/

  function stickyFooter() {
    // Sticky Footer
    var footerHeight = ($('.st-sticky-footer').height());
    var windowHeight = $(window).height();
    var footerHeightPx = footerHeight + 'px';
    $('.st-content').css("margin-bottom", footerHeightPx);
  }

  /*--------------------------------------------------------------
    9. Tamjid Counter
  --------------------------------------------------------------*/
  function tamjidCounterSetup() {
    $('.st-counter').tamjidCounter({
      duration: 2000
    });
  }

  /*--------------------------------------------------------------
    10. Map Bar
  --------------------------------------------------------------*/
  function mapBar() {
    $('.st-map-bar').on('click', function() {
      $(this).toggleClass('st-bar-active').siblings('.st-map-wrpa').slideToggle();
    })
  }
  
})(jQuery); // End of use strict
