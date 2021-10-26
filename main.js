(function($) {
    window.onload = function() {
        $(document).ready(function() {
            changeQuantity();
            changeTourForm();
            bookingStepTab();
            dishesTab();
            modal();
            datePicker();
            dishes();
            validateForm();
            surveyForm();
            pushValueToCheckoutForm();
            $('input[type="time"]').trigger('change');
            $('.js-quantity input').trigger('change');
        });
    };
})(jQuery);


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

// Toggle  form booking
function changeTourForm() {
    if ($('.booking-checkout-block').length) {
        var bookingCheckoutBlock = $('.booking-checkout-block');
        var inputTour = $('input[name="tour"]');
        $('input[name="tour"]').change(function() {
            if ($('#food-tour:checked').length == 1) {
                $('.booking-form-inner-1').hide();
                $('.booking-form-inner-2').show();
            } else {
                $('.booking-form-inner-1').show();
                $('.booking-form-inner-2').hide();
            }

        })
        for (let i = 0; i < inputTour.length; i++) {
            $('input[name="tour"]').change(function() {
                if ($(inputTour[i]).is(':checked')) {
                    $(bookingCheckoutBlock).removeClass('active');
                    $(bookingCheckoutBlock[i]).addClass('active');
                }
            })
        }

        // Booking edit on change type of tour
        $('#edittouroption').change(function() {
            if ($(this).find('option:selected').val() == 'Virtual tour') {
                $('.booking-checkout-block').removeClass('active');
                $('.booking-checkout-block[data-tour="virtual-tour"]').addClass('active');
                $('.booking-checkout-block.active .tour-name-result').val('Virtual tour');
                $('#edittouroption').val('Virtual tour');
            }
            if ($(this).find('option:selected').val() == 'City tour') {
                $('.booking-checkout-block').removeClass('active');
                $('.booking-checkout-block[data-tour="city-tour"]').addClass('active');
                $('.booking-checkout-block.active .tour-name-result').val('City tour');
                $('#edittouroption').val('City tour');
            }
            if ($(this).find('option:selected').val() == 'Food tour') {
                $('.booking-checkout-block').removeClass('active');
                $('.booking-checkout-block[data-tour="food-tour"]').addClass('active');
                $('.booking-checkout-block.active .tour-name-result').val('Food tour');
                $('.edit-modal .booking-edit-food').show()
                $('#edittouroption').val('Food tour');
            }
            $(this).closest('.hz-modal').removeClass('active');
            // Close backdrop
            $('.modal-backdrop--white').removeClass('active');
            // Enable scroll body on modal hide
            $('body').removeClass('overflow-hidden')
        })
    }
}

// Booking step tab
function bookingStepTab() {
    if ($('.booking-step__item').length) {
        var bookingStepItem = $('.booking-step__item');
        var bookingTabPane = $('.booking-tab__pane');
        for (let i = 0; i < bookingStepItem.length; i++) {
            $(bookingStepItem[i]).click(function() {
                // Tab Nav
                $(bookingStepItem).removeClass('active')
                $(bookingStepItem[i]).addClass('active');
                $(bookingStepItem).removeClass('prev');
                $(bookingStepItem[i]).prevAll().addClass('prev');
                // Tab content 
                $(bookingTabPane).removeClass('active');
                $(bookingTabPane[i]).addClass('active');
                // Booking checkout block tab

            })
        }
    }
}



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

// Modal
function modal() {
    if ($('.hz-modal').length) {
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
}


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

// Date picker
function datePicker() {
    // Trigger change input time

    if ($(window).width() > 1024 && $(".datepicker").length) {
        $(".datepicker").each(function() {
            $(this).datepicker({
                dateFormat: "dd/mm/yy",
                changeMonth: true,
                changeYear: true,
                yearRange: "1900:2077"
            }).val();
        })
    } else if ($(window).width() < 1023) {
        $(".datepicker").attr("type", "date");
    }
}

// Add Dishes
function dishes() {
    if ($('.js-submit-dishes').length) {
        $('.js-submit-dishes').click(function() {
            $(".dishes__item-choose input:checked").addClass('soft-checked');
            $(".dishes__item-choose input:not(:checked)").removeClass('soft-checked');

            var favorite = [];
            $.each($(".dishes__item-choose input:checked"), function() {
                favorite.push($(this).attr('data-name'));
            });
            $('#bookingdishes').val(favorite.join(", "))
            $('#editbookingdishes').val(favorite.join(", "))

            $('#bookingdishes').trigger('change');
            $('#editbookingdishes').trigger('change')
            $(this).closest('.hz-modal').removeClass('active');
            // Close backdrop
            $('.modal-backdrop--white').removeClass('active');
            // Enable scroll body on modal hide
            $('body').removeClass('overflow-hidden')
        })
        $('.dishes-modal .js-close-modal').click(function() {
            $(".dishes__item-choose input").each(function() {
                if ($(this).hasClass('soft-checked')) {
                    $(this).prop('checked', true)
                } else {
                    $(this).prop('checked', false)
                }
            });
        })
    }
}

// Change tab and validate form
function validateForm() {
    // Change tab
    $('.js-open-booking-tab-1').click(function() {
        $('.booking-step__item-1').trigger('click')
    });


    // Booking form 1
    var booking1Validator = $("#booking-form-1").validate({
        // Specify validation rules
        rules: {
            bookingdate1: "required",
            bookingtime1: "required",
            bookingnumber1: "required",
            bookingrequest1: "required",
        },
        success: function(label, element) {
            $('#booking-form-1').parent().find('.js-open-booking-tab-2').click(function() {
                if (booking1Validator.numberOfInvalids() == 0) {
                    $('.booking-step__item-2').trigger('click')
                }
            });

        }
    });

    $('#booking-form-1').parent().find('.js-open-booking-tab-2').click(function() {

        $("#booking-form-1").valid();
    });

    // Booking form 2
    var booking2Validator = $("#booking-form-2").validate({
        rules: {
            bookingdate2: "required",
            bookingtime2: "required",
            bookingnumber2: "required",
            bookingrequest2: "required",
        },
        success: function(label, element) {
            $('#booking-form-2').parent().find('.js-open-booking-tab-2').click(function() {
                if (booking2Validator.numberOfInvalids() == 0) {
                    $('.booking-step__item-2').trigger('click')
                }
            });

        }
    });
    $('#booking-form-2').parent().find('.js-open-booking-tab-2').click(function() {
        $("#booking-form-2").valid();
    });

    // Personal info form
    var personalForm = $("#personal-info-form").validate({
        rules: {
            piname: "required",
            pigender: "required",
            pidob: "required",
            pinationality: "required",
            pipassport: "required",
            piemail: {
                required: true,
                email: true
            }
        },
        success: function(label, element) {
            $('#personal-info-form').parent().find('.js-open-booking-tab-3').click(function() {
                if (personalForm.numberOfInvalids() == 0) {
                    $('.booking-step__item-3').trigger('click')
                }
            });
        }
    });
    $('#personal-info-form').parent().find('.js-open-booking-tab-3').click(function() {
        $("#personal-info-form").valid();
    });

    // Booking submit
    var personalForm = $("#personal-info-form").validate({
        rules: {
            piname: "required",
            pigender: "required",
            pidob: "required",
            pinationality: "required",
            pipassport: "required",
            piemail: {
                required: true,
                email: true
            }
        },
        success: function(label, element) {
            $('#personal-info-form').parent().find('.js-open-booking-tab-3').click(function() {
                if (personalForm.numberOfInvalids() == 0) {
                    $('.booking-step__item-3').trigger('click')
                }
            });
        }
    });
    $('#personal-info-form').parent().find('.js-open-booking-tab-3').click(function() {
        $("#personal-info-form").valid();
    });

    // Booking edit form
    var editBooking = $("#edit-booking-detail").validate({
        rules: {
            editdate: "required",
            editstartingtime: "required",
            editnumber: "required",
            editrequest: "required",
        },
        success: function(label, element) {
            $('.js-edit-booking').click(function() {
                if (personalForm.numberOfInvalids() == 0) {
                    $(this).closest('.hz-modal').removeClass('active');
                    // Close backdrop
                    $('.modal-backdrop--white').removeClass('active');
                    // Enable scroll body on modal hide
                    $('body').removeClass('overflow-hidden')

                    $('.booking-checkout-block.active .tour-date-result').val($('#editdate').val());
                    $('.booking-checkout-block.active .tour-time-result').val($('#editstartingtime').val());
                    $('.booking-checkout-block.active .tour-participants-result').val($('#editnumber').val());
                    $('.booking-checkout-block.active .tour-request-result').val($('#editrequest').val());
                }
            });
        }
    });
    $('.js-edit-booking').click(function() {
        $("#edit-booking-detail").valid();
    });

    // Booking edit form Food
    var editBooking = $("#edit-booking-detail-food").validate({
        rules: {
            editdate: "required",
            editstartingtime: "required",
            editnumber: "required",
            editrequest: "required",
        },
        success: function(label, element) {
            $('.js-edit-booking-food').click(function() {
                if (personalForm.numberOfInvalids() == 0) {
                    $(this).closest('.hz-modal').removeClass('active');
                    // Close backdrop
                    $('.modal-backdrop--white').removeClass('active');
                    // Enable scroll body on modal hide
                    $('body').removeClass('overflow-hidden')

                    $('.booking-checkout-block.active .tour-date-result').val($('#editdate').val());
                    $('.booking-checkout-block.active .tour-time-result').val($('#editstartingtime').val());
                    $('.booking-checkout-block.active .tour-participants-result').val($('#editnumber').val());
                    $('.booking-checkout-block.active .tour-request-result').val($('#editrequest').val());
                }
            });
        }
    });
    $('.js-edit-booking-food').click(function() {
        $("#edit-booking-detail-food").valid();
    });

    // Personal info edit form
    var editBooking = $("#edit-personal-info").validate({
        rules: {
            editdate: "required",
            editstartingtime: "required",
            editnumber: "required",
            editrequest: "required",
        },
        success: function(label, element) {
            $('.js-edit-personal-info').click(function() {
                if (personalForm.numberOfInvalids() == 0) {
                    $(this).closest('.hz-modal').removeClass('active');
                    // Close backdrop
                    $('.modal-backdrop--white').removeClass('active');
                    // Enable scroll body on modal hide
                    $('body').removeClass('overflow-hidden')

                    // Edit personal info
                    $('.booking-checkout-block.active .fullname-result').val($('#editfullname').val());
                    $('.booking-checkout-block.active .gender-result').val($('#editgender').val());
                    $('.booking-checkout-block.active .dob-result').val($('#editdob').val());
                    $('.booking-checkout-block.active .nationality-result').val($('#editnationality').val());
                    $('.booking-checkout-block.active .passport-result').val($('#editpassport').val());
                    $('.booking-checkout-block.active .email-result').val($('#editemail').val());
                }
            });
        }
    });
    $('.js-edit-personal-info').click(function() {
        $("#edit-personal-info").valid();
    });

    // Checkout form 1
    var checkout1 = $("#booking-form-checkout-1").validate({
        rules: {
            plhotelname1: "required",
            plhoteladdress1: "required",
        },
        success: function(label, element) {
            $('.submit-checkout-1').click(function() {
                if (checkout1.numberOfInvalids() == 0) {
                    $(window).unbind("scroll");
                    $(this).next('.js-modal').trigger('click')
                }
            });
        }

    });
    $('.submit-checkout-1').click(function() {
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
        $("#booking-form-checkout-1").valid();
    });

    // Checkout form 2
    var checkout2 = $("#booking-form-checkout-2").validate({
        rules: {
            plhotelname2: "required",
            plhoteladdress2: "required",
        },
        success: function(label, element) {
            $('.submit-checkout-1').click(function() {
                if (checkout2.numberOfInvalids() == 0) {
                    $(window).unbind("scroll");
                    $(this).next('.js-modal').trigger('click')
                }
            });
        }
    });
    $('.submit-checkout-2').click(function() {
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
        $("#booking-form-checkout-2").valid();
    });
    // Booking confirm
    var bookingConfirm = $("#booking-confirm").validate({
        rules: {
            confirmcheckbox: "required",
        },
        errorLabelContainer: ".booking-confirm-errors",
        errorElement: "em",
        messages: {
            confirmcheckbox: "Please agree to the terms and conditions",
        },
        success: function(label, element) {
            $('.booking-checkout-block.active .booking-form-submit').submit();
        }
    });
    $('.booking-confirm-btn').click(function() {
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
        $("#booking-confirm").valid();
    });
}

// Survey form

function surveyForm() {
    if ($('.survey-form-group').length) {
        $('.survey-form-submit').click(function() {
            // Survey 1
            var survey1 = [];
            if ($('.survey-form-group-1 .survey-reason-other input[type="checkbox"]').is(':checked') && $('.survey-form-group-1 .survey-reason-other input[type="text"]').length > 0) {
                survey1.push($('.survey-form-group-1 .survey-reason-other input[type="text"]').val());
            }
            $.each($(".survey-form-group-1 input:checked"), function() {
                survey1.push($(this).val());
            });
            $('#survey-1').val(survey1.join(", "))

            // Survey 2
            var survey2 = [];
            if ($('.survey-form-group-2 .survey-reason-other input[type="checkbox"]').is(':checked') && $('.survey-form-group-1 .survey-reason-other input[type="text"]').length > 0) {
                survey2.push($('.survey-form-group-2 .survey-reason-other input[type="text"]').val());
            }
            $.each($(".survey-form-group-2 input:checked"), function() {
                survey2.push($(this).val());
            });
            $('#survey-2').val(survey2.join(", "))

            $(this).closest('.hz-modal').removeClass('active');
            // Close backdrop
            $('.modal-backdrop--white').removeClass('active');
            // Enable scroll body on modal hide
            $('body').removeClass('overflow-hidden')
            $('.booking-checkout-survey').text('Thanks for completing our short survey!')
        })
    }
}

function pushValueToCheckoutForm() {
    // Push Tour Name Load
    $('.tour-name-result').val($('.tour-item input:checked').val())
        // Push tour name on change inpur radio
    $('.tour-item input').change(function() {
        $('.tour-name-result').val($(this).val())
    });
    // Push value
    var changeInput = function inputChange(id, cl) {
        $(id).change(function() {
            $(cl).val($(id).val())
        })
    };
    // Booking tour 1 - Virtual tour, City tour
    var book1 = changeInput('#bookingdate1', '.tour-date-result')
    var book2 = changeInput('#bookingtime1', '.tour-time-result')
    var book3 = changeInput('#bookingnumber1', '.tour-participants-result')
    var book4 = changeInput('#bookingrequest1', '.tour-request-result')

    // Foodtour
    var dishes1 = changeInput('#bookingdate2', '.tour-date-result')
    var dishes2 = changeInput('#bookingtime2', '.tour-time-result')
    var dishes3 = changeInput('#bookingnumber2', '.tour-participants-result')
    var dishes4 = changeInput('#bookingrequest2', '.tour-request-result')
    var dishes5 = changeInput('#bookingdishes', '.tour-dishes-result')

    // Personal info
    var personalInfo1 = changeInput('#piname', '.fullname-result')
    var personalInfo2 = changeInput('#pigender', '.gender-result')
    var personalInfo3 = changeInput('#pidob', '.dob-result')
    var personalInfo4 = changeInput('#pinationality', '.nationality-result')
    var personalInfo5 = changeInput('#pipassport', '.passport-result')
    var personalInfo6 = changeInput('#piemail', '.email-result')


    // Dont save input change on close modal
    $('#pi-edit-modal .js-close-modal').click(function() {
        $('#editfullname').val($('#piname').val())
        $('#editgender').val($('#pigender').val())
        $('#editdob').val($('#pidob').val())
        $('#editnationality').val($('#pinationality').val())
        $('#editpassport').val($('#pipassport').val())
        $('#email').val($('#piemail').val())
    })

    $('#booking-edit-modal .js-close-modal').click(function() {
        $('#edittouroption').val($('.tour-item input:checked').val())
        $('#editdate').val($('.booking-checkout-block .tour-date-result').val())
        $('#editstartingtime').val($('.booking-checkout-block .tour-time-result').val())
        $('#editnumber').val($('.booking-checkout-block .tour-participants-result').val())
        $('#editrequest').val($('.booking-checkout-block .tour-request-result').val())
    })

}