var APP = {

    SB: $('.section-round'),

    window: {
        width: $(window).width(),
        height: $(window).height()
    },

    preloader: function () {
        setTimeout(function () {
            $('#preloader').fadeOut(400);
        }, 500);
    },

    DLS: function () {

        var host = window.location.hostname;
        var search = window.location.search;
        var link;

        if (host == 'localhost') {
            link = 'http://localhost:3000/';
            $('.dynamic_lang_switecher').each(function (index, element) {
                $(this).attr('href', link + $(this).data('lang'));
            });
        } else {
            $('.dynamic_lang_switecher').each(function (index, element) {
                $(this).attr('href', 'https://' + $(this).data('lang') + '.' + host.slice(3) + search);
            });
        }
    },

    rounded: function () {

        var elem = document.getElementsByClassName('section-round');

        if ($(window).width() >= 576) {
            var factor = 3;
        } else {
            var factor = 1.5;
        }

        if (elem) {

            for (var i = 0; i < elem.length; i++) {

                // footer.style.height = 1500+'px';

                elem[i].style.width = elem[i].offsetHeight * factor + 'px';
                elem[i].style.marginLeft = -(elem[i].offsetHeight * factor) / 2 + 'px';

                footer.style.width = '3000px';
                footer.style.marginLeft = '-1500px';
            }
        }
    },

    counter: dataElement => {
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
            var t = Date.parse(endtime) - Date.parse(dt);
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

            daysSpan.text(('0' + t.days).slice(-2));
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

    counterElSwitcher: (date, deadline) => {

        var dateNow = new Date();
        let el = $('[data-element="counter"]');

        if (new Date(date) - dateNow <= 0) {
            $('.timerElHide').addClass('d-none');
            $('.timerElShow').removeClass('d-none');
            el.attr('data-deadline', deadline);
        }
    },

    roadmapSlide: () => {

        var zeroWidth = 4600;
        var step = 2800 / 16;

        $('.slider-arrow[data-event="prev"]').click(function (e) {
            e.preventDefault();
            var position = $('.roadmap-block').position();

            if (position.left >= 0) {
                return false;
            } else {
                $(this).prop('disabled', true);
                $(".roadmap-block").animate({
                    "left": "+=" + step + "px"
                }, 1000, function () {
                    $('.slider-arrow[data-event="prev"]').prop('disabled', false);
                });
            }

            return false;
        });

        $('.slider-arrow[data-event="next"]').click(function (e) {
            e.preventDefault();

            var position = $('.roadmap-block').position();

            if (position.left <= -((zeroWidth - $(window).width()) / 2) + 300) {
                return false;
            } else {

                $(this).prop('disabled', true);
                $(".roadmap-block").animate({
                    "left": "-=" + step + "px"
                }, 1000, function () {
                    $('.slider-arrow[data-event="next"]').prop('disabled', false);
                });
            }

            return false;
        });

        if ($(window).width() <= 991) {
            $('.roadmap-block--mobile').bxSlider({
                pager: false,
                prevText: '',
                nextText: '',
                adaptiveHeight: true,
                controls: true,
                startSlide: 4
            });
        }
    },

    slider: function (elem) {

        var prefix;
        var adaptiveHeight;

        if ($(window).width() <= 991) {
            prefix = '--mobile';
            adaptiveHeight = true;
        } else {
            prefix = '--desctop';
            adaptiveHeight = false;
        }

        var El = elem + prefix;

        $(El).bxSlider({
            pager: false,
            prevText: '',
            nextText: '',
            adaptiveHeight: adaptiveHeight
        });
    },

    kycTab: () => {

        $('.radio-tab-kys').click(function (e) {

            let target = $(this).data('target');

            $('.step-option').removeClass('d-block').addClass('d-none');
            $('#' + target).removeClass('d-none').addClass('d-block');

            $('.kys-link').removeClass('active');

            if ($(this).data('target') == 'option-2') {
                $('.kys-link:eq(0)').addClass('active');
            }
        });

        $('.kys-link').click(function (e) {

            e.preventDefault();

            let target = $(this).data('target');

            $('.kys-link').removeClass('active');
            $(this).addClass('active');
            $('#customControlValidation2').prop("checked", true);
            $('.step-option').removeClass('d-block').addClass('d-none');
            $('#' + target).removeClass('d-none').addClass('d-block');

            return false;
        });
    },

    anchorScroll: () => {
        $('.anchor').click(function (e) {
            e.preventDefault();

            let hash = $(this).attr("data-hash");
            let corrector = -120;

            if ($('.navbar .collapse').hasClass('show')) {
                $('.navbar-toggler-desktop').click();
            }

            $("html, body").animate({
                scrollTop: $('#' + hash).offset().top + corrector
            }, 1000);

            return false;
        });
    },

    hashScroll: () => {

        let hash = location.hash;
        let corrector = -120;

        if (hash != '') {

            $("html, body").animate({
                scrollTop: $(hash).offset().top + corrector
            }, 1000);

            return false;
        }
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
    },

    caseControl: () => {

        var i = 0;

        $('.cases-control a').click(function (e) {
            e.preventDefault();

            if ($(this).data('rel') == 'prev') {
                i--;

                if (i < 0) {
                    i = 5;
                }
            }

            if ($(this).data('rel') == 'next') {
                i++;
                if (i >= 5) {
                    i = 0;
                }
            }

            $('#case-title').html($('#v-pills-tab-m .nav-link:eq(' + i + ')').html());
            $('#v-pills-tab-m .nav-link:eq(' + i + ')').click();

            return false;
        });
    },

    headMove: () => {

        // document.addEventListener("mousemove", function() 
        // { 
        // var mouseX = (event.clientX / 50)+'px';
        // var mouseY = (event.clientY / 50)+'px';

        // $('.header-image img').css({
        //     left: mouseX,
        //     top: mouseY,
        //     transform: "rotateY("+event.clientX / 80+"deg) rotateX("+event.clientY / 80+"deg)",
        // });
        // });

        setTimeout(function () {
            $('#head_SVG').animate({
                right: 0
            }, 3000);
        }, 500);

        setTimeout(function () {
            $('.svg_dot--1').animate({
                opacity: 1
            });
        }, 1000);

        setTimeout(function () {
            $('.svg_dot--2').animate({
                opacity: 1
            });
        }, 1200);

        setTimeout(function () {
            $('.svg_dot--3').animate({
                opacity: 1
            });
        }, 1400);

        setTimeout(function () {
            $('.svg_dot--4').animate({
                opacity: 1
            });
        }, 1600);

        setTimeout(function () {
            $('.svg_lines--1').animate({
                opacity: 1
            });
        }, 1800);

        setTimeout(function () {
            $('.svg_lines--2').animate({
                opacity: 1
            });
        }, 2000);

        setTimeout(function () {
            $('.svg_shadow--1').animate({
                opacity: .2
            });
        }, 2200);

        setTimeout(function () {
            $('.svg_shadow--2').animate({
                opacity: .4
            });
        }, 2400);
    },

    formWhiteList: () => {
        // SUBSCRIBE FORM
        var subscription_form = $("#whiteListForm");
        var submit_button = $("#whiteListSubmitButton");
        var cancel_button = $("#whiteListCancelButton");
        var subscription_email = $("#recipient-email");
        var subscription_name = $("#recipient-name");
        var subscription_phone = $("#recipient-phone");
        var subscription_amount = $("#recipient-amount");
        var subscription_checkbox = $("#customControlInline");
        var subscription_status = $("#recipient-status");

        subscription_email.keyup(function (e) {
            var code = e.which;
            if (code != 13) subscription_status.hide();
        });

        var sending_in_progress = false;

        subscription_form.submit(function () {

            if (sending_in_progress) return false;

            var sendInfo = {
                request: {
                    name: subscription_name.val(),
                    email: subscription_email.val(),
                    phone: subscription_phone.val(),
                    amount: subscription_amount.val()
                }
            };

            console.log(sendInfo);
            sending_in_progress = true;
            subscription_status.html("<span>Sending...</span>");
            subscription_status.show();

            $.ajax({
                type: "POST",
                url: "/create_request",
                data: sendInfo,
                success: function () {
                    subscription_status.html("<span>Success</span>");
                    $('#subscription_form').hide();
                    subscription_email.val("");
                    subscription_name.val('');
                    subscription_phone.val('');
                    subscription_amount.val('');
                    subscription_checkbox.prop("checked", false);

                    subscription_status.show();
                    sending_in_progress = false;
                    submit_button.remove();
                    cancel_button[0].innerText = "Закрыть";
                },
                error: function (jqXHR, exception) {
                    console.log('----------------error-------------------------');
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else if (jqXHR.status == 400) {
                        if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                            msg = jqXHR.responseJSON.errors;
                        } else {
                            msg = 'Unknown Error!';
                        }
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }

                    subscription_status.html(msg);
                    subscription_status.show();
                    sending_in_progress = false;
                }

            });
            return false;
        });
    },

    formSubscribe: () => {

        var subscription_form = $("#subscriptionForm");
        var subscription_email = $("#subscription-email");
        var subscription_status = $("#subscription-status");

        subscription_email.keyup(function (e) {
            var code = e.which;
            if (code != 13) subscription_status.hide();
        });

        var sending_in_progress = false;

        subscription_form.submit(function () {

            if (sending_in_progress) return false;

            var sendInfo = { email: subscription_email.val() };

            sending_in_progress = true;
            subscription_status.html("<span>Sending...</span>");
            subscription_status.show();

            $.ajax({
                type: "POST",
                url: "/create_subscribe_request",
                data: sendInfo,
                success: function (data) {
                    var msg = data.text;
                    subscription_status.html("<span>" + msg + "</span>");
                    $('#subscription_form').hide();
                    subscription_email.val("");

                    subscription_status.show();
                    sending_in_progress = false;
                },
                error: function (jqXHR, exception) {
                    console.log('----------------error-------------------------');
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else if (jqXHR.status == 400) {
                        if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
                            msg = jqXHR.responseJSON.error;
                        } else {
                            msg = 'Unknown Error!';
                        }
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }

                    subscription_status.html(msg);
                    subscription_status.show();
                    sending_in_progress = false;
                }

            });
            return false;
        });
    },

    iframePlay: () => {

        if ($('html').attr('lang') != 'cn') {

            $('.video-play').click(function (e) {

                var target = $(this).attr('data-target');
                var videoId = $(this).attr('data-videoId');

                e.preventDefault();

                $(this).fadeOut(100);

                var player = new YT.Player(target, {
                    height: '100%',
                    width: '100%',
                    videoId: videoId,
                    events: {
                        'onReady': onPlayerReady
                    }
                });

                var iframe = document.getElementById(target);

                var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
                if (requestFullScreen) {
                    requestFullScreen.bind(iframe)();
                }

                return false;
            });

            function onPlayerReady(event) {

                event.target.playVideo();
            }
        } else {
            $('.video-play').click(function (e) {

                e.preventDefault();

                $(this).fadeOut(100);

                var iframe = document.getElementById($(this).data('target'));

                iframe.contentWindow.postMessage(JSON.stringify({
                    type: 'player:play',
                    data: {}
                }), '*');

                var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;

                if (requestFullScreen) {
                    requestFullScreen.bind(iframe)();
                }

                return false;
            });
        }
    },

    countrySelect: () => {
        $('#countrySelect').on('change', function () {

            if ($(this).val() == 'US') {
                $('.alert').removeClass('d-none');
                $(this).prop('disabled', true);
                $('.btn[type="submit"]').prop('disabled', true);
                $('input').prop('disabled', true);
            }
        });
    },

    toggleBlock: () => {
        $('.btn-toggler').click(function (e) {
            e.preventDefault();

            $('#' + $(this).data('target')).slideToggle();
            $(this).fadeOut();

            return false;
        });
    }

};