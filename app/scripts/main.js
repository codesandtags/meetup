/* eslint-env browser */
(function() {
    'use strict';

    $('.flip-control').on('click', function() {
        $(this).closest('.card').toggleClass('flipped');
    });

    // Event handler when user press the tabs
    $('.signup-tab').click(function() {
        setTimeout(function() {
            $('#signupForm').find('input[name=firstName]').focus()
        }, 200);
    });

    $('.signin-tab').click(function() {
        setTimeout(function() {
            $('#signinForm').find('input[name=email]').focus()
        }, 200);
    });

    // Sign In Form
    $('#signinForm')
        .formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh'
            },
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: 'The email is required'
                        },
                        regexp: {
                            regexp: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
                            message: 'The email structure is invalid'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required'
                        },
                        regexp: {
                            regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: 'The password must have, minimum 8 characters at least 1 alphabet and 1 number'
                        }
                    }
                }
            }
        })
        .on('success.form.fv', function(e) {
            e.preventDefault();
            var account = {
                email: $(this).find('input[name=email]').val(),
                password: $(this).find('input[name=password]').val()
            };

            $.ajax({
                type: 'POST',
                url: '/api/users/login',
                data: account
            }).done(function(response) {

                if (response.code) {
                    var $errorLogin = $('.error-login');

                    switch (response.code) {
                        case 'auth/wrong-password':
                            $errorLogin.fadeIn();
                            $errorLogin.find('small').html('The email or password you entered is invalid');
                            break;
                        case 'auth/user-not-found':
                            $errorLogin.fadeIn();
                            $errorLogin.find('small').html('The email is not registered yet');
                            break;
                    }
                } else {
                    sessionStorage.clear();
                    sessionStorage.setItem('user', JSON.stringify(response));
                    window.location.replace("/");
                }

            }).fail(function() {
                console.log('Upsss there an error!');
            });

        });


    // Sign Un Form
    $('#signupForm')
        .formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh'
            },
            fields: {
                firstName: {
                    validators: {
                        notEmpty: {
                            message: 'The first name is required'
                        },
                        stringLength: {
                            min: 4,
                            message: 'The first name must be more than 4 characters long'
                        }
                    }
                },
                lastName: {
                    validators: {
                        notEmpty: {
                            message: 'The last name is required'
                        },
                        stringLength: {
                            min: 4,
                            message: 'The last name must be more than 4 characters long'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'The email is required'
                        },
                        regexp: {
                            regexp: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
                            message: 'The email structure is invalid'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required'
                        },
                        regexp: {
                            regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: 'The password must have, minimum 8 characters at least 1 alphabet and 1 number'
                        }
                    }
                }
            }
        })
        .on('success.form.fv', function(e) {
            e.preventDefault();
            var account = {
                email: $(this).find('input[name=email]').val(),
                password: $(this).find('input[name=password]').val(),
                firstName: $(this).find('input[name=firstName]').val(),
                lastName: $(this).find('input[name=lastName]').val(),
                country: $(this).find('input[name=country]').val(),
                jobTitle: $(this).find('input[name=jobTitle]').val(),
                birthday: $(this).find('input[name=birthday]').val()
            };

            $.ajax({
                type: 'POST',
                url: '/api/users/signup',
                data: account
            }).done(function(response) {
                if (response.status === 200) {
                    $('.message-sign-up').addClass('has-success');
                    $('.message-sign-up').removeClass('has-danger');
                    $('#signupForm').trigger('reset');
                } else {
                    $('.message-sign-up').removeClass('has-success');
                    $('.message-sign-up').addClass('has-danger');
                }

                $('.message-sign-up .form-control-feedback').html(response.message);
                $('.message-sign-up').fadeIn();
            }).fail(function() {
                $('.message-sign-up').addClass('has-danger');
                $('.message-sign-up .form-control-feedback').html('The user could be registered');
                $('.message-sign-up').fadeIn();
            });

        });

    // Create Meetup Form
    $('#createMeetupForm')
        .formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh'
            },
            fields: {
                eventName: {
                    validators: {
                        notEmpty: {
                            message: 'The name of the event is required'
                        },
                        stringLength: {
                            min: 4,
                            message: 'The name of the event must be more than 4 characters long'
                        }
                    }
                },
                eventType: {
                    validators: {
                        notEmpty: {
                            message: 'The type of the event is required'
                        },
                        stringLength: {
                            min: 4,
                            message: 'The type of the event must be more than 4 characters long'
                        }
                    }
                },
                eventHost: {
                    validators: {
                        notEmpty: {
                            message: 'The event host is required'
                        },
                        stringLength: {
                            min: 4,
                            message: 'The event host must be more than 4 characters long'
                        }
                    }
                },
                eventStartDate: {
                    validators: {
                        notEmpty: {
                            message: 'The event start date and time is required. '
                        }
                    }
                },
                eventEndDate: {
                    validators: {
                        notEmpty: {
                            message: 'The event end date and time is required. '
                        }
                    }
                },
                eventCountry: {
                    validators: {
                        notEmpty: {
                            message: 'The country is required.'
                        }
                    }
                },
                eventCity: {
                    validators: {
                        notEmpty: {
                            message: 'The city is required.'
                        }
                    }
                },
                eventAddress: {
                    validators: {
                        notEmpty: {
                            message: 'The address is required.'
                        }
                    }
                }
            }
        })
        .on('success.form.fv', function(e) {
            e.preventDefault();
            alert('enviando');
            debugger;
            var meetup = {
                eventName: $(this).find('input[name=eventName]').val(),
                eventType: $(this).find('input[name=eventType]').val(),
                eventHost: $(this).find('input[name=eventHost]').val(),
                description: $(this).find('textarea[name=description]').val(),
                eventStartDate: $(this).find('input[name=eventStartDate]').val(),
                eventEndDate: $(this).find('input[name=eventEndDate]').val(),
                country: $(this).find('input[name=country]').val(),
                eventCity: $(this).find('input[name=eventCity]').val(),
                eventAddress: $(this).find('input[name=eventAddress]').val(),
                eventCost: $(this).find('input[name=eventCost]').val(),
                eventGuest: $(this).find('select[name=eventGuest]').val()
            };

            $.ajax({
                type: 'POST',
                url: '/api/meetups/create',
                data: meetup
            }).done(function(response) {
                var cosa = 1;
                alert(response);

            }).fail(function() {
                debugger;
            });
        });

})();
