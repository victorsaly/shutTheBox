$(document).ready(function () {
  $(function () {
    // $(".preload-image").lazyload({
    //   threshold: 2000
    // });
  });
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };
  if (isMobile.any()) {
    var getLink = $('.active-style').attr('href')
    console.log(getLink)
    window.location.href = getLink
  }
  $('.dev-frame').on('load', function () {
    $('.iframe-loader').addClass('loaded-iframe');
    setTimeout(function () {
      $('.iframe-loader').addClass('loaded-iframe');
    }, 2500)
  });
  $('.dev-frame').on('unload', function () {
    $('.iframe-loader').removeClass('loaded-iframe');
  });

 
  $('body').on('click', '#dev-wrapper', function () {
    $('.subscribe-form').removeClass('show-form');
  });
  $('body').on('click', '.style-options a', function () {
    $('.style-options a').removeClass('active-style');
    $(this).addClass('active-style');
    $('iframe').css({
      "opacity": "0"
    });
    $('.preload').hide(0);
    $('.iframe-loader').removeClass('loaded-iframe');
    setTimeout(function () {
      $('iframe').css({
        "opacity": "1"
      });
      $('.iframe-loader').addClass('loaded-iframe');
    }, 400);
  });
  $('body').on('mouseenter', '.style-options a', function () {
    var data_qr = $(this).attr('data-qr');
    $('#' + data_qr).addClass("show-style");
  });
  $('body').on('mouseleave', '.style-options a', function () {
    var data_qr = $(this).attr('data-qr');
    $('#' + data_qr).removeClass("show-style");
  });
  
  function decodeHTMLEntities(text) {
    if (text) {
      var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
      ];
      for (var i = 0, max = entities.length; i < max; ++i)
        text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
      return text;
    }
  }
 
  
  var size_size = -($('.size-options').height()) - 155
  $('.size-options').css({
    "-webkit-transform": "translateY(" + size_size + "px)",
    "-ms-transform": "translateY(" + size_size + "px)",
    "-moz-transform": "translateY(" + size_size + "px)",
    "transform": "translateY(" + size_size + "px)"
  });
  $('body').on('click', '.deploy-size', function () {
    $('.delete-switcher').removeClass('activate-delete-switcher');
    $('.header').removeClass('plus-canvas');
    $('.item-boxes').addClass('off-canvas');
    $('.item-boxes').removeClass('on-canvas');
    $('.boxes-overlay').removeClass('show-box-overlay');
    var options_size = -($('.style-options').height()) - 65
    $('.deploy-options').find('i').removeClass('rotate-switcher');
    $('.style-options').css({
      "-webkit-transform": "translateY(" + options_size + "px)",
      "-ms-transform": "translateY(" + options_size + "px)",
      "-moz-transform": "translateY(" + options_size + "px)",
      "transform": "translateY(" + options_size + "px)"
    });
    var size_size = -($('.size-options').height()) - 65
    var size_loc = $('.size-options').position().top;
    if (size_loc < 0) {
      $(this).find('i').toggleClass('rotate-switcher');
      $('.size-options').css({
        "-webkit-transform": "translateY(1px)",
        "-ms-transform": "translateY(1px)",
        "-moz-transform": "translateY(1px)",
        "transform": "translateY(1px)"
      });
    }
    if (size_loc > 0) {
      $(this).find('i').toggleClass('rotate-switcher');
      $('.size-options').css({
        "-webkit-transform": "translateY(" + size_size + "px)",
        "-ms-transform": "translateY(" + size_size + "px)",
        "-moz-transform": "translateY(" + size_size + "px)",
        "transform": "translateY(" + size_size + "px)"
      });
    }
  });
  $('body').on('click', '.boxes-overlay', function () {
    $('.header').removeClass('plus-canvas');
    $(this).find('i').removeClass('rotate-switcher');
    $('.item-boxes').addClass('off-canvas');
    $('.item-boxes').removeClass('on-canvas');
    $('.boxes-overlay').removeClass('show-box-overlay');
    $('.delete-switcher').removeClass('activate-delete-switcher');
  });
  $('body').on('click', '.size-options a', function () {
    $('.size-options a').removeClass('active-style');
    $(this).addClass('active-style');
  });
  $('body').on('click', '.small-screen', function () {
    $('iframe').css({
      "opacity": "0"
    });
    setTimeout(function () {
      $('iframe').css({
        "opacity": "1"
      });
    }, 400);
    $('#dev-wrapper').removeClass();
    $('#dev-wrapper').addClass('small-frame');
    $('.footer').removeClass('hide-footer');
  });
  $('body').on('click', '.medium-screen', function () {
    $('iframe').css({
      "opacity": "0"
    });
    setTimeout(function () {
      $('iframe').css({
        "opacity": "1"
      });
    }, 400);
    $('#dev-wrapper').removeClass();
    $('#dev-wrapper').addClass('medium-frame');
    $('.footer').removeClass('hide-footer');
  });
  $('body').on('click', '.large-screen', function () {
    $('iframe').css({
      "opacity": "0"
    });
    setTimeout(function () {
      $('iframe').css({
        "opacity": "1"
      });
    }, 400);
    $('#dev-wrapper').removeClass();
    $('#dev-wrapper').addClass('large-frame');
    $('.footer').removeClass('hide-footer');
  });
  $('body').on('click', '.tablet-portrait-screen', function () {
    $('iframe').css({
      "opacity": "0"
    });
    setTimeout(function () {
      $('iframe').css({
        "opacity": "1"
      });
    }, 400);
    $('#dev-wrapper').removeClass();
    $('#dev-wrapper').addClass('tablet-portrait-frame');
    $('#dev-wrapper .dev-frame').css('display', 'block');
    $('.footer').removeClass('hide-footer');
  });
  $('body').on('click', '.tablet-landscape-screen', function () {
    $('iframe').css({
      "opacity": "0"
    });
    setTimeout(function () {
      $('iframe').css({
        "opacity": "1"
      });
    }, 400);
    $('#dev-wrapper').removeClass();
    $('#dev-wrapper').addClass('tablet-landscape-frame');
    $('.footer').removeClass('hide-footer');
  });
  $('body').on('click', '.desktop-screen', function () {
    $('iframe').css({
      "opacity": "0"
    });
    setTimeout(function () {
      $('iframe').css({
        "opacity": "1"
      });
    }, 400);
    $('#dev-wrapper').removeClass();
    $('#dev-wrapper').addClass('desktop-frame');
    $('.footer').addClass('hide-footer');
  });

});
