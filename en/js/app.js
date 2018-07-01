var APP = {

    SB: $('.section-round'),

    window: {
        width: $(window).width(),
        height: $(window).height()
    },

    rounded: function() {

        var elem = document.getElementsByClassName('section-round');
        
        if ($(window).width() >= 576) {
            var factor = 3;
        }else {
            var factor =1.1;
        }

        if (elem) {

            for (var i = 0; i < elem.length; i++) {

                if (elem[i].offsetHeight < 500) {
                    elem[i].style.height = 1500+'px';
                }

                elem[i].style.width = elem[i].offsetHeight * factor + 'px';
                elem[i].style.marginLeft = -(elem[i].offsetHeight * factor ) / 2 + 'px';

            }
        }
    },

    counter: (dataElement) => {
        let el = '[data-element="' + dataElement + '"]';
        let endtime = $(el).attr('data-deadline');

        var daysSpan = $(el + ' .clock__days');
        var hoursSpan = $(el + ' .clock__hours');
        var minutesSpan = $(el + ' .clock__minutes');
        var secondsSpan = $(el + ' .clock__seconds');

        var wn = $(el + ' .countdown__days .week__num');
        var wt = $(el + ' .countdown__days .weel__total');
        var dc = $(el + ' .countdown__days .day__current');

        function getTimeRemaining(endtime) {
            var dt = new Date();
            var t = (Date.parse(endtime)) - Date.parse(dt);
            var seconds = Math.floor(t / 1000 % 60);
            var minutes = Math.floor(t / 1000 / 60 % 60);
            var hours = Math.floor(t / (1000 * 60 * 60) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            var week = Math.floor(t / (1000 * 60 * 60 * 24 * 7));

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds,
                'week': week
            };
        }

        var daysSpan = $(el + ' .counter-days .counter-num');
        var hoursSpan = $(el + ' .counter-hours .counter-num');
        var minutesSpan = $(el + ' .counter-minutes .counter-num');
        var secondsSpan = $(el + ' .counter-seconds .counter-num');

        function updateClock() {
            var t = getTimeRemaining(endtime);

            daysSpan.text(t.days);
            hoursSpan.text(('0' + t.hours).slice(-2));
            minutesSpan.text(('0' + t.minutes).slice(-2));
            secondsSpan.text(('0' + t.seconds).slice(-2));
            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    },

    roadmapSlide: () => {
        $('a.slider-arrow').click(function (e) {
            e.preventDefault();
            var position = $('.roadmap-line').position();

            if ($(this).data('event') == 'prev') {
                console.log(position.left);
                if (position.left >= 90) {
                    return false;
                } else {
                    $(".roadmap-line").animate({
                        "left": "+=15%"
                    }, "slow");
                }
            } else {

                if (position.left <= -1000) {
                    return false;
                } else {
                    $(".roadmap-line").animate({
                        "left": "-=15%"
                    }, "slow");
                }
            }

            return false;
        });
    },

    bxSlider: (elem) => {

        var prefix;
        var adaptiveHeight;

        if ($(window).width() <= 991) {
            prefix = '--mobile';
            adaptiveHeight = true;
        } else {
            prefix = '--desctop';
            adaptiveHeight = false;
        }
        $(elem + prefix).bxSlider({
            pager: false,
            prevText: '',
            nextText: '',
            adaptiveHeight: adaptiveHeight,
        });

    },

    anchorScroll: () => {
        $('.anchor').click(function (e) {
            e.preventDefault();

            let hash = $(this).attr("data-hash");

            console.log(hash);

            if ($('.navbar .collapse').hasClass('show')) {
                $('.navbar-toggler-desktop').click();
            }

            $("html, body").animate({
                scrollTop: $('#' + hash).offset().top + 50
            }, 1000);

            return false;

        });
    },

    // navbarScrollEvent: () => {
    //     var mainNavbar = $('.navbar').hasClass('mainNavbar');
    //     $(window).scroll(function() {
    //         if  ($(window).scrollTop() >= 101 ) {
    //             if (mainNavbar) {
    //                 $('.navbar').removeClass('navbar-light').addClass('navbar-dark');
    //             }

    //         }else {
    //             if (mainNavbar) {
    //                 $('.navbar').removeClass('navbar-dark').addClass('navbar-light');
    //             }
    //         }
    //     });
    // },

    navbarTogglerDesktop: () => {
        $('.navbar-toggler-desktop').click(function () {

            var startPosition = $(window).scrollTop() <= 100 ? true : false;
            var mainNavbar = $('.navbar').hasClass('mainNavbar');


            if ($(this).hasClass('collapsed')) {
                if (startPosition && mainNavbar) {
                    $('.navbar').removeClass('navbar-light').addClass('navbar-dark');
                }
                $('.navbar-toggler-icon').addClass('open');
                document.body.style.overflow = 'hidden';
            } else {
                if (startPosition && mainNavbar) {
                    $('.navbar').removeClass('navbar-dark').addClass('navbar-light');
                }
                $('.navbar-toggler-icon').removeClass('open');
                document.body.style.overflow = 'initial';
            }


        });
    }

}