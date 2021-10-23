function changeQuantity() {
    // Change quantity input number
    if ($('.js-quantity').length) {
        jQuery('.js-quantity').each(function() {
            var spinner = jQuery(this),
                input = spinner.find('input[type="number"]'),
                btnUp = spinner.find('.btn-plus'),
                btnDown = spinner.find('.btn-minus'),
                min = input.attr('min'),
                max = input.attr('max');

            btnUp.click(function() {
                var oldValue = parseFloat(input.val());
                if (oldValue >= 100) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue + 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });

            btnDown.click(function() {
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
            // Add prefix 0 to input number
            $(this).find('input').change(function() {
                if (parseInt(this.value, 10) < 10) {
                    this.value = '0' + this.value
                }
            })
        });
    }
}
changeQuantity()

// Toggle 1 form booking
function changeTourForm() {
    $('input[name="tour"]').change(function() {
        if ($('#food-tour:checked').length == 1) {
            $('.booking-form-inner-1').hide();
            $('.booking-form-inner-2').show();
        } else {
            $('.booking-form-inner-1').show();
            $('.booking-form-inner-2').hide();
        }
    })
}
changeTourForm();


// Show dishes modal
function dishesTab() {
    // Tab
    var navTab = $('.hz-modal__body .tab');
    var navContent = $('.hz-modal__body .panel');
    for (let i = 0; i < navTab.length; i++) {
        $(navTab[i]).click(function(e) {
            e.preventDefault();
            // Tab
            $(navTab).removeClass('active')
            $(navTab[i]).addClass('active')
                // Content
            $(navContent).removeClass('active')
            $(navContent[i]).addClass('active')
                // Resize Flickity
            $(navContent[i]).find('.hz-modal-dishes__carousel').flickity('resize')
        })
    }
}
dishesTab()

function modal() {
    var hzModal = $('.hz-modal');
    // Open modal
    $('.js-modal').click(function() {
        // Block body scroll on modal Show
        $('body').addClass('overflow-hidden');
        // Show modal backdrop
        $('.modal-backdrop--white').addClass('active');
        for (let i = 0; i < hzModal.length; i++) {
            if ($(hzModal[i]).attr('id') == $(this).data('target')) {
                $(hzModal[i]).addClass('active');
                $(hzModal[i]).find('.hz-modal-dishes__carousel').flickity('resize');
            }
        }
    });
    // Close modal
    $('.js-close-modal').click(function() {
        // Close modal
        $(this).closest('.hz-modal').removeClass('active');
        // Close backdrop
        $('.modal-backdrop--white').removeClass('active');
        // Enable scroll body on modal hide
        $('body').removeClass('overflow-hidden')
    })
}
modal()

// Set same height item
var setHeight = function setSameHeight(h, cl) {
    var h = 0;
    $(cl).each(function() {
        if ($(this).outerHeight() > h) {
            h = $(this).outerHeight();
        }
    }).css({ 'height': h });
}

var bookingStepName = setHeight('nt', '.booking-step__item-name')