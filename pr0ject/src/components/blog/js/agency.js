import jQuery from 'jquery';
import 'bootstrap';

(function($) {

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (this.props.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && this.props.location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offsetTop - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($(".navbar").length) {
      var offset = $("#mainNav").offset().top;
      if (offset > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function(e) {
    $('.navbar').addClass('d-none');
  })
  $('.portfolio-modal').on('hidden.bs.modal', function(e) {
    $('.navbar').removeClass('d-none');
  })

})(jQuery); // End of use strict
