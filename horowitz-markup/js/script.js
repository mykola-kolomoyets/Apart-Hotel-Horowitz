"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// ^ === THE CODE IS WRITTEN BY MYKOLA KOLOMOYETS === ^
// ^ === I AM A (WEB)-DESIGNER AND SELF-TAUGHT WEB-DEVELOPER === ^
// ^ === LINK ON BEHANCE PORTFOLIO: ___ === ^
// ^ === LINK ON GITHUB: ___ === ^
// ^ === THANKS FOR SPECTATING MY CODE === ^
// ^ === AND I WILL BE GLAD YOU TO SEND ME SOME ADVICES === ^
// ^ === YOU CAN CONTACT ME WITH EMAIL: mykola.kolomoiets@gmail.com or kolomoyets473@gmail.com === ^
// === DESCRIPTION OF THE COMMENTS IN THE CODE === 
// ^ === COPYRIGHT
// * === THE CODE BLOCK BEGINNING
// ! === ALERT OR WARNING
// ? === QUESTION
// TODO === TODO-LIST INITIALIZATION OR LINKING TO IT
// // === USELESS CODE
// & === MINI-CODE BLOCKS OR DESCRIPTION OF THE FRAGMENT OF CODE
// * ================= *
// * === FUNCTIONS === *
// * ================= *
// & === function for finding the top scroll (works at usual scroll mode) === &
var getTop = function getTop() {
  return window.pageYOffset || document.documentElement.scrollTop;
};

var recheckDate = function recheckDate(date) {
  return date < 10 ? "0".concat(date) : date;
};

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var isPage = function isPage(name) {
  return document.body.classList.contains(name);
};

var setPath = function setPath(el, length, time) {
  el.style.strokeDasharray = "".concat(length, " ").concat(length);
  el.style.transition = "stroke-dashoffset ".concat(time, "ms");
};

var updateDashOffset = function updateDashOffset() {
  var height = document.documentElement.scrollHeight - window.innerHeight;
  var dashOffset = scrollUpSimpleLength - getTop() * scrollUpSimpleLength / height;
  scrollUpSimplePath.style.strokeDashoffset = dashOffset;
}; // * ======================== *
// * === GLOBAL VARIABLES === *
// * ======================== *
// & === variables for booking page === &


var bookingPageDatePickerId = ""; // & === Variables for scroll-up buttons === &

var scrollOffset = 200;
var scrollUpSimple = document.querySelector(".scroll-up");
var scrollUpSimplePath = document.querySelector(".scroll-up__svg-path");
var scrollUpSimpleLength = scrollUpSimplePath.getTotalLength(); // * ======================= *
// * === EVENT LISTENERS === *
// * ======================= *

$(".apartment-template__scroll-down").click(function () {
  window.scrollTo({
    top: window.innerHeight - 15,
    behavior: 'smooth'
  });
}); // & === opening the burger-menu by click === &

$(".fullpage-header__burger").click(function () {
  $(".fullpage-header__burger").toggleClass("burger__close");
  $(".fullpage-header").toggleClass("active__menu");
}); // & === scroll-up button === &

$(".scroll-up").click(function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}); // & === checking if the home page has #fullscreen id === &

$(window).on("resize scroll wheel mousewheel onwheel touchmove", function () {
  if (getTop() > scrollOffset) {
    $(".fullpage-header__block").addClass("filled");
  } else {
    $(".fullpage-header__block").removeClass("filled");
  }

  updateDashOffset(); // & === simple scroll activates === &

  if (getTop() > scrollOffset) {
    $(".scroll-up").addClass("scroll-up--active");
  } else {
    $(".scroll-up").removeClass("scroll-up--active");
  }
});
$(document).ready(function () {
  if (isPage("gallery-page") || isPage("page-with-slider")) {
    $(".fullpage-header__block").attr("id", "filled");
    $(".image-link").magnificPopup({
      type: "image",
      disableOn: 600,
      gallery: {
        enabled: true,
        navigateByImgClick: true
      },
      preloader: true
    });
    $(".gallery__image").magnificPopup({
      type: "image",
      removalDelay: 300,
      disableOn: 430,
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        tClose: ''
      },
      preloader: true,
      mainClass: 'mfp-fade'
    });
  }
});
window.addEventListener("load", function () {
  setPath(scrollUpSimplePath, scrollUpSimpleLength, 20);
  $('input, textarea').on('focusin', function () {
    $(this).parent().find("label").addClass("contact_form--label-active");
  });
  $('.contact__form--box').on('blur', function () {
    if (!this.value) $(this).parent().find("label").removeClass("contact_form--label-active");
  });
  $(".fullpage-header__logo--main").hide();
  $(".fullpage-header__logo--extra").show();

  if (isPage("page-with-slider")) {
    // & === Initializing the slider of apartment page === &
    var apartmentSwiper = new Swiper(".swiper-container", {
      direction: "horizontal",
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 3,
      loop: true,
      freeMode: true,
      loopedSlides: 5,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      breakpoints: {
        1000: {
          spaceBetween: 10,
          slidesPerView: 3
        },
        320: {
          loopedSlides: 3,
          spaceBetween: 10,
          slidesPerView: 2
        }
      }
    });
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      loop: true,
      freeMode: true,
      loopedSlides: 5,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      thumbs: {
        swiper: galleryThumbs
      },
      breakpoints: {
        1000: {
          spaceBetween: 10,
          loopedSlides: 5
        },
        320: {
          spaceBetween: 10,
          loopedSlides: 3
        }
      }
    });
  } // & === Initializing the booking-slider === &


  if (isPage("booking-page")) {
    var current = 1;
    var bookingSliderPage = document.querySelector(".slide-page");
    var firstNextBtn = document.querySelector(".firstNextBtn");
    var previousBtn = document.querySelector(".booking__form--buttons .prevBtn");
    var submitBtn = document.querySelector(".submitBtn");
    var progressText = document.querySelectorAll(".step p");
    var progressCheck = document.querySelectorAll(".step .check");
    var bullet = document.querySelectorAll(".step .bullet");
    firstNextBtn.addEventListener("click", function () {
      bookingSliderPage.style.marginLeft = "-50%";
      bullet[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      current++;
    });
    previousBtn.addEventListener("click", function () {
      bookingSliderPage.style.marginLeft = "0";
      bullet[current - 2].classList.remove("active");
      progressText[current - 2].classList.remove("active");
      progressCheck[current - 2].classList.remove("active");
      current--;
    });
    submitBtn.addEventListener("click", function () {
      bullet[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      current++;
      sleep(800);
    });
  } // & === initalizing the animate-on-scroll library === &


  AOS.init(); // & === initialization of calendar library === &

  if (isPage("booking-page")) {
    var currentDate = moment().format("MM/DD/YYYY");
    var currDatePlaceholder = moment().format("DD/MM/YYYY");
    document.getElementById("checkInDate").placeholder = currDatePlaceholder;
    document.getElementById("checkOutDate").placeholder = currDatePlaceholder;
    $("#checkInDate, #checkOutDate").dateDropper({
      format: 'd-m-Y',
      modal: true,
      large: true,
      largeDefault: false,
      minDate: currentDate
    });
    $("input[type='number']").on("change", function (e) {
      var currValue = e.target.value;

      if (currValue < 0) {
        e.target.value = 0;
      }
    });
  } // & === disable right click on images === &


  $("img").bind("contextmenu", function (e) {
    return false;
  });
}); // * ==================================== *
// * === OTHER SIDE-WORKING FUNCTIONS === *
// * ==================================== *
// & === webp support check === &
// ! === if browser supports webp, it will be added === !
// ! === else -> just .jpeg/.png === !

function supportsWebp() {
  return _supportsWebp.apply(this, arguments);
}

function _supportsWebp() {
  _supportsWebp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var webpData, blob;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (self.createImageBitmap) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", false);

          case 2:
            webpData = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
            _context2.next = 5;
            return fetch(webpData).then(function (r) {
              return r.blob();
            });

          case 5:
            blob = _context2.sent;
            return _context2.abrupt("return", createImageBitmap(blob).then(function () {
              return true;
            }, function () {
              return false;
            }));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _supportsWebp.apply(this, arguments);
}

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return supportsWebp();

        case 2:
          if (!_context.sent) {
            _context.next = 4;
            break;
          }

          document.querySelector("body").classList.add("webp");

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();