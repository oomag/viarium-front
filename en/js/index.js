APP.anchorScroll();
APP.hashScroll();
APP.DLS();

APP.roadmapSlide();
APP.navbarTogglerDesktop();
APP.bxSlider('.team-slider');
APP.bxSlider('.cases-slider');
APP.counter('counter');
window.onload = function() {
    APP.rounded();
}
APP.caseControl();
APP.kycTab();
APP.formSend('whiteListForm');

particlesJS.load('particles-js', '/en/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

