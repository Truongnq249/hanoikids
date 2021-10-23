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
function dishesModal() {
    // Tab
    var navTab = $('.hz-modal__body .tab');
    var navContent = $('.hz-modal__body .panel');
    for (let i = 0; i < navTab.length; i++) {
        $(navTab[i]).click(function() {
            console.log(123);
            // Tab
            $(navTab).removeClass('active')
            $(navTab[i]).addClass('active')
                // Content
            $(navContent).removeClass('active')
            $(navContent[i]).addClass('active')
        })
    }
}
dishesModal()