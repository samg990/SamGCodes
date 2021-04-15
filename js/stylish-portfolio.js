$(function () {
	setTimeout(function () {
		$("#pageTop").addClass("loaded");
	}, 1000);
});

AOS.init({
	duration: 1200,
});

// Original JavaScript code by Chirp Internet: chirpinternet.eu
// Please acknowledge use of this code by including this header.

window.addEventListener(
	"DOMContentLoaded",
	function (e) {
		var stage = document.getElementById("stage");
		var fadeComplete = function (e) {
			stage.appendChild(arr[0]);
		};
		var arr = stage.getElementsByTagName("a");
		for (var i = 0; i < arr.length; i++) {
			arr[i].addEventListener("animationend", fadeComplete, false);
		}
	},
	false,
);

(function ($) {
	("use strict"); // Start of use strict

	// Closes the sidebar menu
	document.addEventListener("DOMContentLoaded", function (event) {
		document.addEventListener("scroll", function (event) {
			const animatedBoxes = document.getElementsByClassName("animated-box");
			const windowOffsetTop = window.innerHeight + window.scrollY;

			Array.prototype.forEach.call(animatedBoxes, (animatedBox) => {
				const animatedBoxOffsetTop = animatedBox.offsetTop;

				if (windowOffsetTop >= animatedBoxOffsetTop) {
					addClass(animatedBox, "fade-in");
				}
			});
		});
	});

	function addClass(element, className) {
		const arrayClasses = element.className.split(" ");
		if (arrayClasses.indexOf(className) === -1) {
			element.className += " " + className;
		}
	}

	$(".popup-btn").on("click", function () {
		var popupBlock = $("#" + $(this).data("popup"));
		popupBlock
			.addClass("active")
			.find(".fade-out")
			.on("click", function () {
				popupBlock
					.css("opacity", "0")
					.find(".popup-content")
					.css("margin-top", "350px");
				setTimeout(function () {
					$(".popup").removeClass("active");
					popupBlock
						.css("opacity", "")
						.find(".popup-content")
						.css("margin-top", "");
				}, 600);
			});
	});

	$(".menu-toggle").on("click", function (e) {
		e.preventDefault();
		$("#sidebar-wrapper").addClass("active");

		$(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass(
			"fa-bars fa-times",
		);
		$(this).toggleClass("active");
	});

	$("#sidebar-wrapper").on({
		mouseleave: function () {
			$("#sidebar-wrapper").removeClass("active");
		},
	});

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').on("click", function () {
		if (
			location.pathname.replace(/^\//, "") ==
				this.pathname.replace(/^\//, "") &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
			if (target.length) {
				$("html, body").animate(
					{
						scrollTop: target.offset().top,
					},
					1000,
					"easeInOutExpo",
				);
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$("#sidebar-wrapper .js-scroll-trigger").on("click", function () {
		$("#sidebar-wrapper").removeClass("active");
		$(".menu-toggle").removeClass("active");
		$(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass(
			"fa-bars fa-times",
		);
	});

	// Scroll to top button appear
	$(document).on("scroll", function () {
		var scrollDistance = $(this).scrollTop();
		if (scrollDistance > 100) {
			$(".scroll-to-top").fadeIn();
		} else {
			$(".scroll-to-top").fadeOut();
		}
	});
})(jQuery); // End of use strict

// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function (event) {
	var that = $(this);
	that.on("click", onMapClickHandler);
	that.off("mouseleave", onMapMouseleaveHandler);
	that.find("iframe").css("pointer-events", "none");
};
var onMapClickHandler = function (event) {
	var that = $(this);
	// Disable the click handler until the user leaves the map area
	that.off("click", onMapClickHandler);
	// Enable scrolling zoom
	that.find("iframe").css("pointer-events", "auto");
	// Handle the mouse leave event
	that.on("mouseleave", onMapMouseleaveHandler);
};
// Enable map zooming with mouse scroll when the user clicks the map
$(".map").on("click", onMapClickHandler);

function AnimatedText(
	target,
	texts,
	changeInterval,
	updateInterval,
	onTextChanged,
) {
	var currentText = parseInt(Math.random() * texts.length);
	var areaText = texts[0];
	this.t1 = setInterval(
		function () {
			var c = parseInt(
				Math.random() * Math.max(texts[currentText].length, areaText.length),
			);
			var s = texts[currentText][c];
			if (typeof s == "undefined") s = " ";
			while (areaText.length < c) areaText += " ";
			var newText = (areaText.slice(0, c) + s + areaText.slice(c + 1)).trim();
			var diff = !(newText == areaText);
			areaText = newText;
			if (onTextChanged && diff) onTextChanged();
			target.innerHTML = areaText.length == 0 ? "&nbsp;" : areaText;
		}.bind(this),
		updateInterval ? updateInterval : 50,
	);
	this.t2 = setInterval(
		function () {
			currentText = parseInt(Math.random() * texts.length);
		}.bind(this),
		changeInterval ? changeInterval : 4000,
	);
}
AnimatedText.prototype = {
	constructor: AnimatedText,
	stop: function () {
		clearInterval(this.t1);
		clearInterval(this.t2);
	},
};

new AnimatedText(
	document.getElementById("example3"),
	["More Business", "Happier Clients", "Less Work"],
	2500,
	25,
	function () {
		//this restarts the glow animation when the text is changed
		var x = document.getElementById("example3");
		var p = x.parentElement;
		p.removeChild(x);
		p.appendChild(x);
	},
);
