/**
 * Created by admin on 11.01.2015.
 */

(function(){

    var app = {
        initialize: function(){
            var _this = this;

            _this.setUpListeners();

        },

        /* Переменные, заданные как свойства app */
        btnResult : $('.result__button_prop'),
        htmlCodeResultArea : $('#html-code__text'),
        cssCodeResultArea : $('#css-code__text'),
        /* ------------------------------------- */

        setUpListeners: function(){
            var _this = this;

            /* Валидация введенного email и отправка почты */
            //$('.feedback-block__submit-button').on('click', '.feedback-block__offer-button', app.submitForm);
            $('form').on('click', '.feedback-block__offer-button', app.submitForm);
            //$('form').on('submit', app.submitForm);

            // -- слайдер к блоку с формой заказа
            $('.header-block__order-button').on('click', app.scrollToOrder);
            // -- слайдер к блоку с формой заказа
            $('.header-block__info-button').on('click', app.scrollToDetails);
            // -- слайдер к блоку с формой заказа
            $('.details-block__offer-button').on('click', app.scrollToMarket);

            // -- удалить ошибку при вводе данных в инпуты
            $('form').on('keydown', 'input', app.removeError);

            // -- ввод только цифр в поле телефона
            $('#inputPhone').on('keypress', app.onlyDigitsValidate);
            $('#inputPhone').on('paste', app.onlyValidatePaste);
            // -- ввод только цифр в поле телефона

            // -- ввод только букв в поле ФИО
            $('#inputFIO').on('keypress', app.onlySymbolsValidate);
            $('#inputFIO').on('paste', app.onlyValidatePaste);
            // -- ввод только букв в поле ФИО

        },

        // -- ввод только букв в поле ФИО
        onlySymbolsValidate: function (e) {
            var chr = e.charCode,
                doc_w = $(document).width(),
                tooltipPlacement = '';

            if (doc_w < 768) {
                tooltipPlacement = 'top';
            } else {
                tooltipPlacement = 'left';
            }


            if (e.ctrlKey || e.altKey || e.metaKey) return;
            if (
                (chr < 97 || chr > 122)
                &&
                (chr < 65 || chr > 90)
                &&
                (chr != 45)
                &&
                (chr < 1040 || chr > 1105)
                &&
                (chr != 1025)
                &&
                (chr != 32)
            ) {
                $(this).tooltip({
                        trigger: 'manual',
                        placement: tooltipPlacement,
                        title: 'Разрешено вводить только буквы'
                    }).tooltip('show');
                return false;
            }
        },
        // -- ввод только букв в поле ФИО

        // -- только ручной ввод в поле
        onlyValidatePaste: function () {
            var doc_w = $(document).width(),
                tooltipPlacement = '';

            if (doc_w < 768) {
                tooltipPlacement = 'top';
            } else {
                tooltipPlacement = 'left';
            }

            $(this).tooltip({
                trigger: 'manual',
                placement: tooltipPlacement,
                title: 'Вводите символы с клавиатуры вручную'
            }).tooltip('show');
            return false;
        },
        // -- только ручной ввод в поле

        // -- проверка на ввод только цифр
        onlyDigitsValidate: function (e) {
            var chr = e.charCode,
                doc_w = $(document).width(),
                tooltipPlacement = '';

            if (doc_w < 768) {
                tooltipPlacement = 'top';
            } else {
                tooltipPlacement = 'left';
            }

            if (e.ctrlKey || e.altKey || e.metaKey || chr === 43) return;
            if (chr < 48 || chr > 57)  {
                $(this).tooltip({
                        trigger: 'manual',
                        placement: tooltipPlacement,
                        title: 'Разрешено вводить только цифры'
                    }).tooltip('show');
                return false;
            }
        },
        // -- проверка на ввод только цифр

        // -- удаление тултипа и красной обводки с инпута при вводе в него данных
        removeError: function () {
            $(this).tooltip('destroy').parents('.form-group').removeClass('has-error');
        },
        // -- удаление тултипа и красной обводки с инпута при вводе в него данных

        // -- функция скролла к блоку с маркетом
        scrollToMarket: function (e) {
            e.preventDefault();

            var offset = $('.market-block__section').offset().top;

            $('html, body').animate({scrollTop: (offset -0)},800);

        },
        // -- функция скролла к блоку с маркетом

        // -- функция скролла к блоку с деталями
        scrollToDetails: function (e) {
            e.preventDefault();

            var offset = $('.details-block').offset().top;

            $('html, body').animate({scrollTop: (offset -0)},800);

        },
        // -- функция скролла к блоку с деталями

        // -- функция скролла к форме заказа
        scrollToOrder: function (e) {
            e.preventDefault();

            var offset = $('.feedback-block__background').offset().top;

            $('html, body').animate({scrollTop: (offset -0)},800);

        },
        // -- функция скролла к форме заказа

        /* Валидация введенного email и отправка почты */
        submitForm: function (e) {
            e.preventDefault();

            var _this = this,
                form = $('form'),
                submitBtn = $('.feedback-block__offer-button');
                //inputs = form.find('input');

            if (app.validateForm(form) === false) return false;

            submitBtn.addClass('disabled');

            var str = form.serialize();

            $.ajax({
                url: 'contact_form/contact_process.php',
                type: 'POST',
                data: str
            })
            .done(function(msg) {
                if(msg === "OK"){
                    var result = "<div class='bg-success'>Спасибо за вашу заявку. Мы обязательно свяжемся с вами, в самое ближайшее время.</div>"

                    $.each($('.form-group input'), function() {
                        $(this).removeClass('has-success').val('');
                    });

                    $('#valid').html(result);

                }else{

                    $('#valid').html(msg);
                }
            })
            .always(function() {
                submitBtn.removeClass('disabled');
            });

        },

        validateForm: function (form) {
            var inputs = form.find('input'),
                valid = true;

            inputs.tooltip('destroy');

            $.each(inputs, function(index, val) {
                var input = $(val),
                    val = input.val(),
                    formGroup = input.parents('.form-group'),
                    label = formGroup.find('label').text(),
                    textError = '',
                    doc_w = $(document).width(),
                    tooltipPlacement = '';

                if (label !== 'ФИО') {
                    label = label.toLowerCase();
                }
                textError = 'Введите ' + label;

                if (doc_w < 768) {
                    tooltipPlacement = 'top';
                } else {
                    tooltipPlacement = 'left';
                }

                if(val.length === 0){
                    formGroup.addClass('has-error').removeClass('has-success');
                    input.tooltip({
                        trigger: 'manual',
                        placement: tooltipPlacement,
                        title: textError
                    }).tooltip('show');
                    valid = false;
                }else{
                    formGroup.addClass('has-success').removeClass('has-error');
                }
            });

            return valid;
        }


        /* ------------------------------------- */
    }

    app.initialize();

})();








