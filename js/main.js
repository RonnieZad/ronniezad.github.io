var windowH, windowW, stickyTop = 0,
    disableOnce = false,
    btnProjTop, whoWeAreBottom;


var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;


////////////////////////////////
// LOADER
////////////////////////////////


function pageLoader() {
    // Selection des images en src="
    var $elements = $('html').find('img[src]');
    // Selection des images en background-image
    $('div').each(function () {
        var src = $(this).css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        if (src && src != 'none') {
            $elements = $elements.add($('<img src="' + src + '"/>'));
        }
    });


    var $chargement = $('#loader');

    var $chargementInfos = $('#chargement-infos');
    var elementsCharges = 0;
    var dureeMs = 1000;


    function animateStep(now, fx) {
        // $chargementInfos.text('Chargement '+parseInt(now)+'%');
        $("#chargement-bar").css({'width': parseInt(now) + '%'});
    }

    function chargementEnCours() {
        //$('body').css('overflow', 'auto');    
        var pourcentage = 0;
        if ($elements.length) {
            pourcentage = parseInt((elementsCharges / $elements.length) * 100);
        }
        // Affichage du pourcentage
        $chargementInfos.stop(); // stop les anciennes animations


        $chargement.stop() // stop les anciennes animations
            .animate({pourcentage: pourcentage}, {
                duration: dureeMs,
                step: animateStep
            });
    }

    function chargementTermine() {
        var pourcentage = 100;

        // Affichage du pourcentage
        $chargementInfos
            .stop() // stop les anciennes animations
        /*.animate({width:pourcentage + '%'}, (dureeMs / 2));*/
        $chargement
            .stop() // stop les anciennes animations
            .animate({pourcentage: pourcentage}, {
                duration: (dureeMs / 2),
                step: animateStep
            })
            // Disparition du chargement et affichage de la page
            .fadeOut(800, function () {
                // Animation complete.

                // $('.modal-video-container').addClass('appear');

                setTimeout(function () {
                    $('.home-screen h1, .home-screen .accroche').addClass('appear');
                    // var src = $('.modal-video-container iframe').attr('src');
                    // $('.modal-video-container iframe').attr('src', src + "&autoplay=1");
                }, 300);

                setTimeout(function () {
                    $('.line').addClass('appear');
                }, 800);

            });
    }

    // La page contient des elements permettant d'afficher une barre de progression
    if ($elements.length) {
        chargementEnCours();

        $elements.load(function () {
            $(this).off('load');
            elementsCharges++;
            chargementEnCours();
        });
    }

    $(window).load(function () {
        chargementTermine();
    });
};


////////////////////////////////
// TRANSITION PAGE
////////////////////////////////


function pageTransition() {
    var isAnimating = false,
        firstLoad = false;

    //trigger smooth transition from the actual page to the new one 
    $('body').on('click', 'a.page-transition', function (event) {
        event.preventDefault();
        //detect which page has been selected
        var newPage = $(this).attr('href');
        //if the page is not already being animated - trigger animation
        if (!isAnimating) changePage(newPage, true);
        firstLoad = true;
    });

    //detect the 'popstate' event - e.g. user clicking the back button
    $(window).on('popstate', function () {

        if (firstLoad) {
            /*
            Safari emits a popstate event on page load - check if firstLoad is true before animating
            if it's false - the page has just been loaded 
            */
            var newPageArray = location.pathname.split('/'),
                //this is the url of the page to be loaded 
                newPage = newPageArray[newPageArray.length - 1];
            // if( !isAnimating ) changePage(newPage, false);
        }

        firstLoad = true;

    });

    function changePage(url, bool) {
        isAnimating = true;
        // trigger page animation
        $('body').addClass('page-is-changing');
        $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            loadNewContent(url, bool);
            $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });
        //if browser doesn't support CSS transitions
        if (!transitionsSupported()) loadNewContent(url, bool);
    }

    function loadNewContent(url, bool) {
        url = ('' == url) ? 'index.html' : url;
        var newSection = 'cd-' + url.replace('.html', '');
        var section = $('<div class="cd-main-content ' + newSection + '"></div>');

        section.load(url + ' .cd-main-content > *', function (event) {
            // load new content and replace <main> content with the new one
            $('#content-transition-slide').html(section);
            if ($('#content-transition-slide').scrollTop() != 0) {
                $('#content-transition-slide').scrollTop(0);
            }
            ;
            //if browser doesn't support CSS transitions - dont wait for the end of transitions
            var delay = (transitionsSupported()) ? 3500 : 0;
            setTimeout(function () {
                //wait for the end of the transition on the loading bar before revealing the new content
                // ( section.hasClass('cd-about') ) ? $('body').addClass('cd-about') : $('body').removeClass('cd-about');
                $('body').removeClass('page-is-changing');
                $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                    isAnimating = false;

                    $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');


                    if (windowW > 767) {
                        $('.fullscreen').css('min-height', windowH + 'px');
                        $('.navbar').css('top', (windowH - 70) + 'px');
                    } else {
                        $('.fullscreen').css('height', windowH + 'px');
                    }
                    ;

                    $('body').addClass('open-article');
                    $('.list-project').removeClass('col-sm-7').addClass('col-sm-2');


                    if (!isMobile || windowW >= 768) {
                        $("#content-transition-slide").niceScroll();
                    }
                    ;


                });


                if (!transitionsSupported()) isAnimating = false;
            }, delay);

            if (url != window.location && bool) {
                //add the new page to the window.history
                //if the new page was triggered by a 'popstate' event, don't add it
                window.history.pushState({path: url}, '', url);
            }
        });
    }

    function transitionsSupported() {
        return $('html').hasClass('csstransitions');
    }
}


////////////////////////////////
// SCROLL EVENT
////////////////////////////////


if ($('.btn-project').length) {
    btnProjTop = $('.btn-project').position().top + $('.btn-project').height() + 300;
}

if ($('#bgvid').length) {
    var bgvidTop = $('#bgvid').offset().top + 500;
};


if ($('#who-we-are').length) {
    whoWeAreBottom = $('#who-we-are').position().top + ($('#who-we-are').height()) / 2;
} else if ($('#content-video').length){
    whoWeAreBottom = $('#content-video').position().top + 300;
}


$(window).scroll(function (e) {

    if ($(window).scrollTop() > stickyTop) {
        $('.m-foundation-logo, .btn-menu').addClass('sticky');
    } else {
        $('.m-foundation-logo, .btn-menu').removeClass('sticky');
    }


    if (($(window).scrollTop() + windowH) >= $(document).height()) {
        // console.log('bottom');
        $('.btn-project.sticky').addClass('bottomReached');

    } else {
        if ($('.btn-project.sticky').hasClass('bottomReached')) {
            $('.btn-project.sticky').removeClass('bottomReached');
        }
        ;

    }


    //donate
    if ($(window).scrollTop() + windowH + $('footer').height() >= $(document).height()) {
        // console.log('bottom');
        $('.btn-donate.sticky').addClass('bottomReached');

    } else {
        if ($('.btn-donate.sticky').hasClass('bottomReached')) {
            $('.btn-donate.sticky').removeClass('bottomReached');
        }
        ;

    }


    if (!isMobile) {

        if ($(window).scrollTop() > 0) {
            $('footer').removeClass('top-screen');
        } else {
            $('footer').addClass('top-screen');
        }


        if ($('#bgvid').length && $(window).scrollTop() > bgvidTop) {
            homeVideo.pause();
            $('.play-video-full').fadeIn();
            $('.btn-project.sticky').fadeIn();
        }
        ;


        if ($('.btn-project').length) {
            if ($(window).scrollTop() > btnProjTop) {
                $('.btn-project:not(.sticky)').addClass('sticky');
            } else {
                $('.btn-project').removeClass('sticky');
            }
        }
        if ($('.btn-donate').length) {
            if ($(window).scrollTop() + windowH >= whoWeAreBottom) {
                $('.btn-donate:not(.sticky)').addClass('sticky');
            } else {
                $('.btn-donate').removeClass('sticky');
            }
        }


        if ($('body').hasClass('single-projects')) {


            if ($(window).scrollTop() > 0) {

                $('.single-screen').addClass('down');

                if (disableOnce == false) {

                    $('html').getNiceScroll().remove();

                    $('html').css({'overflow': 'hidden'})

                    setTimeout(function () {

                        $("html").niceScroll();

                    }, 600);
                    disableOnce = true;
                }
                ;

            } else {
                $('.single-screen').removeClass('down');
                disableOnce = false;
            }

        }
        ;
    }
    ;


});


$('#content-transition-slide').scroll(function (e) {
    if ($('body').hasClass('open-article')) {

        if ($('.single-screen').position().top < 0) {

            $('.single-screen').addClass('down');


            if (disableOnce == false) {

                $('#content-transition-slide').getNiceScroll().remove();
                $('#content-transition-slide').css('overflow', 'hidden');

                setTimeout(function () {
                    $('#content-transition-slide').niceScroll();
                }, 600);
                disableOnce = true;
            }
            ;

        } else {
            $('.single-screen').removeClass('down');
            disableOnce = false;
        }
    }
});


////////////////////////////////
// RESIZE
////////////////////////////////


$(window).resize(function () {
    windowH = $(window).height();
    windowW = $(window).width();

    if (windowW > 767) {
        $('.fullscreen').css('min-height', windowH + 'px');
        $('.navbar').css('top', (windowH - 70) + 'px');
    } else {
        $('.fullscreen').css('min-height', windowH + 'px');
    }
    ;
});


var homeVideo = document.getElementById("bgvid");

function playPause() {
    if (homeVideo.paused)
        homeVideo.play();
    else
        homeVideo.pause();
    $('.play-video-full').fadeIn();
    $('.btn-project.sticky').fadeIn();
}


////////////////////////////////
// DOCUMENT READY
////////////////////////////////


$(document).ready(function () {

    pageLoader();

    windowH = $(window).height();
    windowW = $(window).width();


    stickyTop = windowH;

    if ($(window).scrollTop() > stickyTop) {
        $('.m-foundation-logo, .btn-menu').addClass('sticky');
    } else {
        $('.m-foundation-logo, .btn-menu').removeClass('sticky');
    }

    FastClick.attach(document.body);

    if (windowW >= 768) {
        pageTransition();
    }
    ;


    if (!isMobile) {
        $("html").niceScroll();
        $(".list-project").niceScroll();
    }
    ;


    if (windowW > 767) {
        $('.fullscreen').css('min-height', windowH + 'px');
    } else {
        $('.fullscreen').css('min-height', windowH + 'px');
    }
    ;


    $('.modal-skip').click(function () {
        $('.modal-video-container').removeClass('appear');

        setTimeout(function () {
            $('.modal-video-container').remove();
        }, 700)
    })


    // var video = document.getElementById("bgvid");

    if ($('html').hasClass('touch') == true && $('html').hasClass('mobile') != true) {
        $('.fixed-container').append('<input type="button" id="playBtn" value="Play">')
    }
    ;


    if (!isMobile && $('#skrollr-body').length) {
        var s = skrollr.init({
            // skrollrBody :'skrollr-body'
        });
        setTimeout(function () {
            s.refresh();
        }, 800)
    }
    ;


    pageLoader();


    $('.fiche-governance').matchHeight({
        property: 'height'
    });


    $('.btn-menu, .nav>li>a').click(function () {
        $('#main-menu').toggleClass('appear');
        $('body').toggleClass('menu-opened');
    });

    $('.play-btn').click(function () {
        $('.play-video-full').fadeOut();
        $('.btn-project.sticky').fadeOut();
        homeVideo.play();
    });


    $('.open-projects').click(function () {

        $('.project-panel').css({'z-index': 100});

        setTimeout(function () {
            $('.project-panel').addClass('appear');
            $('body').addClass('proj-panel-open');

        }, 10);

    });

    $('.close-project-panel').click(function () {

        $('body').removeClass('open-article');

        $('.project-panel').removeClass('appear');
        $('body').removeClass('proj-panel-open');

        setTimeout(function () {
            $('.project-panel').css({'z-index': '-2'});
            $('.list-project').removeClass('col-sm-2').addClass('col-sm-7');
            $('#content-transition-slide').empty();
        }, 300);

        var homePage = $("a.m-foundation-logo").attr('href');
        window.history.pushState({path: homePage}, '', homePage);

    });
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.list-project').length && $('.project-panel').hasClass('appear') && !$('body').hasClass('page-is-changing')) {
            $('.close-project-panel').trigger('click');
        }
    });


    $('.btn-open-credit').click(function (event) {
        event.preventDefault();

        $('.credit-photographe').toggleClass('open-credit');

    });
    $('.close-credit').click(function () {

        $('.credit-photographe').removeClass('open-credit');

    });

    $('.gif__item').each(function (i) {

        var gif = $(this).find('img').attr('src');
        var img = $(this).find('img').attr('data-img');

        $(this).on('mouseenter', function () {
            $(this).find('img').attr('src', img);
            $(this).find('img').attr('data-img', gif);
        });

        $(this).on('mouseleave', function () {
            $(this).find('img').attr('src', gif);
            $(this).find('img').attr('data-img', img);
        });
    });


    // $('.gif__item').bind('mouseenter', function () {
    //     var gif = $(this).find('img').attr('src');
    //     var img = $(this).find('img').attr('data-img');
    //
    //     $(this).find('img').attr('src', img);
    //     $(this).find('img').attr('data-img', gif);
    // });


    $('.btn-open-mentions').click(function (event) {
        event.preventDefault();

        $('.mentions-legales').toggleClass('open-mentions');

    });


    $('.close-mentions').click(function () {

        $('.mentions-legales').removeClass('open-mentions');

    });


    // $('.open-donate').click(function(event){
    //     event.preventDefault();

    //     $('.donate-box').toggleClass('open-donate');

    // });


    // $('.close-donate').click(function(){

    //     $('.donate-box').removeClass('open-donate');

    // });


});
