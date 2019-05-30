'use strict';

window.onload = function () {
	// APP.preloader();
	APP.counterElSwitcher('2019-04-30T23:59:59', '2019-04-30T23:59:59');
	APP.DLS();
	APP.headMove();
	APP.roadmapSlide();
	APP.navbarTogglerDesktop();
	APP.slider('.team-slider');
	APP.slider('.cases-slider');
	APP.slider('.docSlider');
	APP.counter('counter');
	APP.rounded();
	APP.caseControl();
	APP.kycTab();
	APP.formWhiteList();
	APP.formSubscribe();
	APP.countrySelect();
	APP.toggleBlock();
	APP.showMore();
	//	APP.getScale();
	APP.anchorScroll();
	APP.hashScroll();
};

var watch = true;
window.onscroll = function () {
	if (watch) {
		console.log('watch');
	}
	if (window.pageYOffset > 100 && watch) {
		APP.iframePlay();
		watch = false;
	}
};