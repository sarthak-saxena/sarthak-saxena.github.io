jQuery(document).ready(function($) {

  $('.search-form').addClass('dark');

  $('#comments-form input[type=submit]').addClass('button boxed white small');
  $('.search-submit').addClass('button boxed small');

  $(document).foundation();


  $('form#contact_form').validate({
    messages: { },
    submitHandler: function(form) {
      $.ajax({
        type: 'POST',
        url: ajaxurl,
        data: $(form).serialize(),
        success: function(data) {
          if(data.match(/success/)) {
            $(form).trigger('reset');
            $('#thanks').show().fadeOut(5000);
          }
        }
      });
      return false;
    }
  });


  var logos = $('.title-area h1 > a');
  logos.each(function() {
    if($(this).find('img').length > 0) return;

    var text = $(this).text();
    $(this).html(text.replace('/', '<span>/</span>'));
  });

  new WOW().init();

  $(document).scroll(function(){
    if ( $(window).width() <= 1024 ) { return }

    if($(this).scrollTop() >= 100) {
      $('.big-nav').fadeOut();
    } else {
      $('.big-nav').fadeIn();
    }
  });

  if ($('body.home').length == 0 || $('body.page-template-builder-php').length == 0) {
    $('.big-nav').remove();
  }

  // need this to fix for firefox
  $('#slides').on('init.slides', function() {
    var that = this;
    setTimeout(function() {
      $('.slides-container', that).children().eq(0).addClass('active');
    }, 300);
  });

  $('#slides').superslides({
    animation: 'fade',
    hashchange: false,
    // play: 6000
  });

  $('#slides').on('animated.slides', function() {
    $('.slides-container', this).children().removeClass('active');

    var index = $(this).superslides('current');
    var that = this;

    setTimeout(function() {
      $('.slides-container', that).children().eq(index).addClass('active');
    }, 300);

  });

  $('.boxed-slides').slick({
    autoplay: true,
    pauseOnHover: false,
    dots: true,
    speed: 1500,
    arrows: false
  });


  $('.title-area h1').hover(
    function() {
      $('.small-nav').addClass('active');
    },
    function() {
      $('.small-nav').removeClass('active');
    }
  );

  $('.touch .title-area h1 > a').click(function(e) {
    e.preventDefault();
    $('.small-nav').addClass('active');
  });

  $('*').click(function(e) {
    var target = e.target;

    if ($.contains(target, $('.title-area h1 > a')[0])) {
      $('.small-nav').removeClass('active');
    }
  });

  setTimeout(function() {
    // $('.title-area h1').width($('.title-area h1 a').width());
  }, 100);

  $('.fadeinleft, .fadeinright, .fadein, .popin, .moveup, .diamond-milestones-wrapper').appear(function() {
    var delay = $(this).data('delay');
    var that = this;

    setTimeout(function() {
      $(that).addClass('appear');
    }, delay)

  });

  $('.images').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('#load_more_posts').click(function(e) {
    var load_more_button = this;

    e.preventDefault();

    if ($(this).hasClass('disabled')) {
      return false;
    }

    $(this).addClass('disabled');

    $.post(
      ajaxurl,
      {
        page: $(load_more_button).data('page'),
        action: 'layers_widget_ajax_posts',
        widget_action: 'load_more_posts'
      },
      function(data){
        var data = $.parseJSON(data);
        $('#posts').append(data['posts']);
        $(load_more_button).data('page', data['page']);
        $(load_more_button).removeClass('disabled');

        if(!data['posts']) {
          $(load_more_button).html('No more').addClass('disabled');
        }

      }
    );

  });

});