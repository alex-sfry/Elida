import '../styles/scss/style.scss';
// import '../styles/bootstrapSCSS/bootstrap.scss';
import {fetchData} from './fetchData.js';
import {isValidated} from './isValidated.js';
import {commoditiesForm} from './commodities.js';
import {tradeRouteForm} from './tradeRoutes.js';

const initHeader = () => {
    $('.menu__link').each(function() {
        if ($(this).attr('href') === window.location.pathname ||
            window.location.pathname.includes($(this).attr('href'))) {
            $(this).addClass('active');
            $(this).closest('.menu__item').children('.menu__link').addClass('active');
        } else {
            $(this).removeClass('active');
            $(this).closest('.menu__link').removeClass('active');
        }
    });
};

const loader = ($insertElem, $hideElem) => {
    $insertElem.after("<div class='c-loading my-0 mx-auto text-light bg-light-orange rounded-2 p-2 fw-bold'>" +
        "Loading . . .</div>");

    if ($hideElem.length) {
        $hideElem.addClass('d-none');
        $('.c-pagination-cnt').addClass('d-none');
        $('.c-result-legend').addClass('d-none');
    }
};

const removeLoader = ($elem) => {
    if ($elem.length) {
        const $loadingPlaceholder = $('.c-loading');
        $loadingPlaceholder.length && $loadingPlaceholder.remove();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    if ($('#c-form').length)  commoditiesForm(loader, removeLoader, fetchData);
    if ($('#tr-form').length)  tradeRouteForm(isValidated, loader, removeLoader);

    $('#accordionForm .accordion-button').on('click', function() {
        if ($(this).text().trim() === 'Close form') {
            $(this).text('Open form');
        } else if ($(this).text().trim() === 'Open form') {
            $(this).text('Close form');
        }
    });
});
