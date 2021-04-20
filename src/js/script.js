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
const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

const recheckDate = date => (date < 10) ? `0${date}` : date;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const isPage = name => document.body.classList.contains(name);

const setPath = (el, length, time) => {
	el.style.strokeDasharray = `${length} ${length}`;
	el.style.transition = `stroke-dashoffset ${time}ms`;
}

const updateDashOffset = () => {
	const height = document.documentElement.scrollHeight - window.innerHeight;
	const dashOffset = scrollUpSimpleLength - (getTop() * scrollUpSimpleLength / height);
	scrollUpSimplePath.style.strokeDashoffset = dashOffset
}


// * ======================== *
// * === GLOBAL VARIABLES === *
// * ======================== *

// & === variables for booking page === &
const bookingPageDatePickerId = "";

// & === Variables for scroll-up buttons === &

const scrollOffset = 200;

const scrollUpSimple = document.querySelector(".scroll-up");
const scrollUpSimplePath = document.querySelector(".scroll-up__svg-path");
const scrollUpSimpleLength = scrollUpSimplePath.getTotalLength();

// * ======================= *
// * === EVENT LISTENERS === *
// * ======================= *

$(".apartment-template__scroll-down").click(() => {
	window.scrollTo({ top: window.innerHeight - 15, behavior: 'smooth', });
});

// & === opening the burger-menu by click === &
$(".fullpage-header__burger").click(() => {
	$(".fullpage-header__burger").toggleClass("burger__close");
	$(".fullpage-header").toggleClass("active__menu");
});

// & === scroll-up button === &
$(".scroll-up").click(() => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

// & === checking if the home page has #fullscreen id === &
$(window).on("resize scroll wheel mousewheel onwheel touchmove", () => {
		if (getTop() > scrollOffset) {
		$(".fullpage-header__block").addClass("filled");
	} else {
		$(".fullpage-header__block").removeClass("filled");
	}

		updateDashOffset();

	// & === simple scroll activates === &
	if (getTop() > scrollOffset) {
		$(".scroll-up").addClass("scroll-up--active");
	} else {
		$(".scroll-up").removeClass("scroll-up--active");
	}
})

$(document).ready(() => {
	if (isPage("gallery-page") ||	isPage("page-with-slider")) {
		$(".fullpage-header__block").attr("id", "filled");

		$(".image-link").magnificPopup({
			type: "image",
			disableOn: 600,
			gallery: {
				enabled: true,
				navigateByImgClick: true,
			},
			preloader: true,
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
		})
	}
});

window.addEventListener("load", () => {
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
		const apartmentSwiper = new Swiper(".swiper-container", {
			direction: "horizontal",
			loop: true,
			speed: 1000,
			autoplay: {
				delay: 5000
			},
			keyboard: {
				enabled: true,
				onlyInViewport: false,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		})

		const galleryThumbs = new Swiper('.gallery-thumbs', {
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
					slidesPerView: 3,
				},
				320: {
					loopedSlides: 3,
					spaceBetween: 10,
					slidesPerView: 2,
				},
			},
		});
		const galleryTop = new Swiper('.gallery-top', {
			spaceBetween: 10,
			loop: true,
			freeMode: true,
			loopedSlides: 5,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			thumbs: {
				swiper: galleryThumbs,
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
	}

	// & === Initializing the booking-slider === &
	if (isPage("booking-page")) {
		let current = 1;

		const bookingSliderPage = document.querySelector(".slide-page");
		const firstNextBtn = document.querySelector(".firstNextBtn");
		const previousBtn = document.querySelector(".booking__form--buttons .prevBtn");
		const submitBtn = document.querySelector(".submitBtn");
		const progressText = document.querySelectorAll(".step p");
		const progressCheck = document.querySelectorAll(".step .check");
		const bullet = document.querySelectorAll(".step .bullet");

		firstNextBtn.addEventListener("click", () => {
			bookingSliderPage.style.marginLeft = "-50%";
			bullet[current - 1].classList.add("active");
			progressText[current - 1].classList.add("active");
			progressCheck[current - 1].classList.add("active");
			current++;
		});

		previousBtn.addEventListener("click", () => {
			bookingSliderPage.style.marginLeft = "0";
			bullet[current - 2].classList.remove("active");
			progressText[current - 2].classList.remove("active");
			progressCheck[current - 2].classList.remove("active");
			current--;
		});

		submitBtn.addEventListener("click", () => {
			bullet[current - 1].classList.add("active");
			progressText[current - 1].classList.add("active");
			progressCheck[current - 1].classList.add("active");
			current++;
			sleep(800);
		})
	}

	// & === initalizing the animate-on-scroll library === &
	AOS.init();

	// & === initialization of calendar library === &
	if (isPage("booking-page")) {
		const currentDate = moment().format("MM/DD/YYYY");
		const currDatePlaceholder = moment().format("DD/MM/YYYY");

		document.getElementById("checkInDate").placeholder = currDatePlaceholder;
		document.getElementById("checkOutDate").placeholder = currDatePlaceholder;

		$("#checkInDate, #checkOutDate").dateDropper({
			format: 'd-m-Y',
			modal: true,
			large: true,
			largeDefault: false,
			minDate: currentDate,
		});
		$("input[type='number']").on("change", (e) => {
			const currValue = e.target.value;
			if (currValue < 0) {
				e.target.value = 0;
			}
		})
	}

	// & === disable right click on images === &
	$("img").bind("contextmenu", e => false);
})

// * ==================================== *
// * === OTHER SIDE-WORKING FUNCTIONS === *
// * ==================================== *

// & === webp support check === &
// ! === if browser supports webp, it will be added === !
// ! === else -> just .jpeg/.png === !
async function supportsWebp() {
	if (!self.createImageBitmap) return false;
	const webpData = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
	const blob = await fetch(webpData).then(r => r.blob());
	return createImageBitmap(blob).then(() => true, () => false);
}

(async () => {
	if (await supportsWebp()) document.querySelector("body").classList.add("webp");
})();