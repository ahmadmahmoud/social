if ($('.table').length) {
    var table = $('.table').DataTable({"order": []});
}
var post_id, support_id = message_id = null;
moment.locale('ar');
var Admin = function () {
    return {
        init: function () {
            Admin.Config();
            Admin.Login();
            Admin.UpdateSettings();
            Admin.UpdatePassword();
            Admin.UpdateAdMobs();
            Admin.UpdateAgreement();
            Admin.AddBanner();
            Admin.UpdateBanner();
            Admin.DeleteBanner();
            Admin.ViewPost();
            Admin.DeletePost();
            Admin.BlockUser();
            Admin.DeleteReport();
            Admin.Support();
            Admin.ViewSupport();
            Admin.ActivateUser();
            Admin.DeactivateUser();
            Admin.SendMessages();
            Admin.SendNotifications();
            Admin.ViewMessages();
            Admin.RefreshMessages();
            Admin.LoadMorePosts();
            Admin.DeleteMorePost();
            Admin.AddTopPost();
            Admin.ChangeLanguage();
            Admin.ApproveRequest();
            Admin.RejectRequest();
            Admin.LoadMoreForsalePosts();
        },
        LoadMoreForsalePosts: function () {
            var btnmore = $('#loadmoreforsale');
            if (btnmore.length > 0) {
                btnmore.on('click', function () {
                    var post_id = btnmore.attr('post_id');
                    var more = btnmore.attr('more');
                    if (more === '1') {
                        var csrf_token = btnmore.attr('csrf_token');
                        $.ajax({
                            url: BASE_URL + "posts/moreforsale",
                            method: "POST",
                            data: {
                                "post_id": post_id,
                                "csrf_token": csrf_token
                            },
                            dataType: "json",
                            beforeSend: function () {
                                btnmore.button('loading');
                            },
                            success: function (response) {
                                if (response) {
                                    if (response.success) {
                                        var result = response.result;
                                        var more = response.more;
                                        btnmore.attr('csrf_token', response.csrf_token);
                                        $.each(result, function (i, post) {
                                            loadMoreForsalePost(post, csrf_token);
                                            btnmore.attr('post_id', post.post_id);
                                        });
                                        if (more === false) {
                                            btnmore.fadeOut();
                                        }
                                        Admin.AddTopPost();
                                        Admin.DeleteMorePost();
                                    } else {
                                        swal('Error!', response.msg, 'error');
                                    }
                                } else {
                                    swal('Error!', "Invalid Request!", 'error');
                                }
                            },
                            error: function (jqXHR, textStatus) {
                                swal('Error!', "Invalid Request!", 'error');
                            },
                            complete: function () {
                                btnmore.button('reset');
                            }
                        });
                    }
                });
            }
        },
        ApproveRequest: function () {
            $('#table').on('click', '.approverequest', function () {
                var obj = $(this);
                var request_id = obj.attr('request_id');
                var csrf_token = obj.attr('csrf_token');
                var loading = visionComponents.loading('body', {
                    loader: 'line-spin-fade-loader'
                });
                $.ajax({
                    url: BASE_URL + "requests/approve",
                    method: "POST",
                    data: {
                        "request_id": request_id,
                        "csrf_token": csrf_token
                    },
                    dataType: "json",
                    beforeSend: function () {},
                    success: function (response) {
                        if (response) {
                            if (response.success) {
                                swal('Success', "Request has been approved", 'success');
                                table.row(obj.parents('tr')).remove().draw();
                            } else {
                                swal('Error!', response.msg, 'error');
                            }
                        } else {
                            swal('Error!', "Invalid Request!", 'error');
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        swal('Error!', "Invalid Request!", 'error');
                    },
                    complete: function () {
                        loading.remove();
                    }
                });

            });
        },
        RejectRequest: function () {
            $('#table').on('click', '.rejectrequest', function () {
                var obj = $(this);
                var request_id = obj.attr('request_id');
                var csrf_token = obj.attr('csrf_token');
                var loading = visionComponents.loading('body', {
                    loader: 'line-spin-fade-loader'
                });
                $.ajax({
                    url: BASE_URL + "requests/reject",
                    method: "POST",
                    data: {
                        "request_id": request_id,
                        "csrf_token": csrf_token
                    },
                    dataType: "json",
                    beforeSend: function () {},
                    success: function (response) {
                        if (response) {
                            if (response.success) {
                                swal('Success', 'Request has been rejected', 'success');
                                table.row(obj.parents('tr')).remove().draw();
                            } else {
                                swal('Error!', response.msg, 'error');
                            }
                        } else {
                            swal('Error!', "Invalid Request!", 'error');
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        swal('Error!', "Invalid Request!", 'error');
                    },
                    complete: function () {
                        loading.remove();
                    }
                });

            });
        },
        ChangeLanguage: function () {
            $('.langselector').on('click', function () {
                var lang = $(this).attr('lang');
                var csrf_token = $(this).attr('csrf_token');
                var loading = visionComponents.loading('body', {
                    loader: 'line-spin-fade-loader'
                });
                $.ajax({
                    url: BASE_URL + "changelang",
                    method: "POST",
                    data: {
                        "lang": lang,
                        "csrf_token": csrf_token
                    },
                    dataType: "json",
                    beforeSend: function () {},
                    success: function (response) {
                        if (response) {
                            if (response.success) {
                                location.reload();
                            } else {
                                swal('Error!', response.msg, 'error');
                            }
                        } else {
                            swal('Error!', "Invalid Request!", 'error');
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        swal('Error!', "Invalid Request!", 'error');
                    },
                    complete: function () {
                        //loading.remove();
                    }
                });

            });
        },
        AddTopPost: function () {
            $('.addtoppost').on('click', function () {
                var obj = $(this);
                var top = obj.attr('top');
                var pid = obj.attr('pid');
                var csrf_token = obj.attr('csrf_token');
                $.ajax({
                    url: BASE_URL + "posts/addtop",
                    method: "POST",
                    data: {
                        "id": pid,
                        "csrf_token": csrf_token
                    },
                    dataType: "json",
                    beforeSend: function () {
                        //btn.button('loading');
                    },
                    success: function (response) {
                        if (response) {
                            if (response.success) {
                                if (top == 1) {
                                    obj.attr('top', '0');
                                    obj.removeClass('text-info');
                                } else {
                                    obj.attr('top', '1');
                                    obj.addClass('text-info');
                                }
                            } else {
                                swal('Error!', response.msg, 'error');
                            }
                        } else {
                            swal('Error!', "Invalid Request!", 'error');
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        swal('Error!', "Invalid Request!", 'error');
                    },
                    complete: function () {
                        //btn.button('reset');
                    }
                });
            });
        },
        DeleteMorePost: function () {
            $('.delmorepost').on('click', function () {
                var obj = $(this);
                var pid = obj.attr('pid');
                var csrf_token = obj.attr('csrf_token');
                swal({
                    customClass: 'vision',
                    title: 'Are you sure?',
                    text: 'You want to delete this post!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Delete'
                }).then(function () {
                    var btn = obj;
                    $.ajax({
                        url: BASE_URL + "posts/delete",
                        method: "POST",
                        data: {
                            "id": pid,
                            "csrf_token": csrf_token
                        },
                        dataType: "json",
                        beforeSend: function () {
                            //btn.button('loading');
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    swal('Deleted!', response.msg, 'success');
                                    location.reload();
                                } else {
                                    swal('Error!', response.msg, 'error');
                                }
                            } else {
                                swal('Error!', "Invalid Request!", 'error');
                            }
                        },
                        error: function (jqXHR, textStatus) {
                            swal('Error!', "Invalid Request!", 'error');
                        },
                        complete: function () {
                            //btn.button('reset');
                        }
                    });
                }).catch(swal.noop);
            });
        },
        LoadMorePosts: function () {
            var btnmore = $('#loadmore');
            if (btnmore.length > 0) {
                btnmore.on('click', function () {
                    var post_id = btnmore.attr('post_id');
                    var more = btnmore.attr('more');
                    if (more === '1') {
                        var csrf_token = btnmore.attr('csrf_token');
                        $.ajax({
                            url: BASE_URL + "posts/more",
                            method: "POST",
                            data: {
                                "post_id": post_id,
                                "csrf_token": csrf_token
                            },
                            dataType: "json",
                            beforeSend: function () {
                                btnmore.button('loading');
                            },
                            success: function (response) {
                                if (response) {
                                    if (response.success) {
                                        var result = response.result;
                                        var more = response.more;
                                        btnmore.attr('csrf_token', response.csrf_token);
                                        $.each(result, function (i, post) {
                                            loadMorePost(post, csrf_token);
                                            btnmore.attr('post_id', post.post_id);
                                        });
                                        if (more === false) {
                                            btnmore.fadeOut();
                                        }
                                        Admin.AddTopPost();
                                        Admin.DeleteMorePost();
                                    } else {
                                        swal('Error!', response.msg, 'error');
                                    }
                                } else {
                                    swal('Error!', "Invalid Request!", 'error');
                                }
                            },
                            error: function (jqXHR, textStatus) {
                                swal('Error!', "Invalid Request!", 'error');
                            },
                            complete: function () {
                                btnmore.button('reset');
                            }
                        });
                    }
                });
            }
        },
        RefreshMessages: function () {
            $('#refreshchat').on('click', function () {
                message_id = $('#refreshchat').attr('mid');
                if (message_id !== 0) {
                    loadChat(message_id);
                }
            });
        },
        ViewMessages: function () {
            $('#table').on('click', '.viewmessage', function () {
                message_id = $(this).attr('mid');
                $('#modalMessages').modal('show');
            });
            $('#modalMessages').on('shown.bs.modal', function (e) {
                if (message_id === null) {
                    return false;
                }
                loadChat(message_id);
            });
        },
        SendNotifications: function () {
            $('#btn-sendnotification').on('click', function () {
                $('#modalSendNotifications').modal('show');
            });
            $("#formsendnotifications #user").change(function (event) {
                var id = $(this).val();
                if (id !== '0') {
                    $('#formsendnotifications #allusers').prop('checked', false);
                }
            });
            $("#formsendnotifications #allusers").change(function () {
                if (this.checked) {
                    $("#formsendnotifications #user").val("0");
                }
            });
            $("#formsendnotifications").submit(function (event) {
                if (!$('#formsendnotifications #message').val()) {
                    swal({
                        title: "Error!",
                        text: 'Please enter message',
                        type: "error"
                    }).then(function () {
                        $('#formsendnotifications #message').focus();
                    });
                    return false;
                }

                var user = $('#formsendnotifications #user').val();
                var allusers = ($('input[name="allusers"]:checked').length > 0) ? 1 : 0;
                if (user === '0' && allusers === 0) {
                    swal({
                        title: "Error!",
                        text: 'Please choose user(s)!',
                        type: "error"
                    }).then(function () {
                        $('#formsendnotifications #user').focus();
                    });
                    return false;
                }
                var btn = $('#sendnotification');
                $.ajax({
                    url: BASE_URL + "sendnotifications/add",
                    method: "POST",
                    data: {
                        "message": $('#formsendnotifications #message').val(),
                        "user": user,
                        "allusers": allusers,
                        "csrf_token": $('#formsendnotifications #csrf_token').val()
                    },
                    dataType: "json",
                    beforeSend: function () {
                        btn.button('loading');
                    },
                    success: function (response) {
                        if (response) {
                            if (response.success) {
                                swal({
                                    title: "Sent",
                                    text: response.msg,
                                    type: "success"
                                }).then(function () {
                                    location.reload();
                                });
                            } else {
                                swal('Error!', response.msg, 'error');
                            }
                        } else {
                            swal('Error!', "Invalid Request!", 'error');
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        swal('Error!', "Invalid Request!", 'error');
                    },
                    complete: function () {
                        btn.button('reset');
                    }
                });
                event.preventDefault();
            });
        },
        SendMessages: function () {
            $('#btn-sendmessage').on('click', function () {
                $('#modalSendMessages').modal('show');
            });
            $("#user").change(function (event) {
                var id = $(this).val();
                if (id !== '0') {
                    $('#allusers').prop('checked', false);
                }
            });
            $("#allusers").change(function () {
                if (this.checked) {
                    $("#user").val("0");
                }
            });
            $("#formsendmessage").submit(function (event) {
                if (!$('#formsendmessage #message').val()) {
                    swal({
                        title: "Error!",
                        text: 'Please enter message',
                        type: "error"
                    }).then(function () {
                        $('#formsendmessage #message').focus();
                    });
                    return false;
                }

                var user = $('#user').val();
                var allusers = ($('input[name="allusers"]:checked').length > 0) ? 1 : 0;
                if (user === '0' && allusers === 0) {
                    swal({
                        title: "Error!",
                        text: 'Please choose user(s)!',
                        type: "error"
                    }).then(function () {
                        $('#formsendmessage #user').focus();
                    });
                    return false;
                }
                var btn = $('#sendmessage');
                $.ajax({
                    url: BASE_URL + "sendmessages/add",
                    method: "POST",
                    data: {
                        "message": $('#formsendmessage #message').val(),
                        "user": user,
                        "allusers": allusers,
                        "csrf_token": $('#formsendmessage #csrf_token').val()
                    },
                    dataType: "json",
                    beforeSend: function () {
                        btn.button('loading');
                    },
                    success: function (response) {
                        if (response) {
                            if (response.success) {
                                swal({
                                    title: "Sent",
                                    text: response.msg,
                                    type: "success"
                                }).then(function () {
                                    location.reload();
                                });
                            } else {
                                swal('Error!', response.msg, 'error');
                            }
                        } else {
                            swal('Error!', "Invalid Request!", 'error');
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        swal('Error!', "Invalid Request!", 'error');
                    },
                    complete: function () {
                        btn.button('reset');
                    }
                });
                event.preventDefault();
            });
        },
        ActivateUser: function () {
            $('.activateuser').on('click', function () {
                var obj = $(this);
                fn_ActivateUser(obj);
            });
            $('#table').on('click', '.activateuser', function () {
                var obj = $(this);
                fn_ActivateUser(obj);
                /*var obj = $(this);
                 var uid = obj.attr('uid');
                 var csrf_token = obj.attr('csrf_token');
                 swal({
                 customClass: 'vision',
                 title: 'Are you sure?',
                 text: 'You want to activate this user!',
                 type: 'warning',
                 showCancelButton: true,
                 confirmButtonText: 'Activate'
                 }).then(function () {
                 var btn = obj;
                 $.ajax({
                 url: BASE_URL + "users/activate",
                 method: "POST",
                 data: {
                 "id": uid,
                 "csrf_token": csrf_token
                 },
                 dataType: "json",
                 beforeSend: function () {
                 btn.button('loading');
                 },
                 success: function (response) {
                 if (response) {
                 if (response.success) {
                 swal({
                 title: "Activated!",
                 text: response.msg,
                 type: "success"
                 }).then(function () {
                 location.reload();
                 });
                 } else {
                 swal('Error!', response.msg, 'error');
                 }
                 } else {
                 swal('Error!', "Invalid Request!", 'error');
                 }
                 },
                 error: function (jqXHR, textStatus) {
                 swal('Error!', "Invalid Request!", 'error');
                 },
                 complete: function () {
                 btn.button('reset');
                 }
                 });
                 }).catch(swal.noop);*/
            });
        }
        ,
        DeactivateUser: function () {
            $('.deactivateuser').on('click', function () {
                var obj = $(this);
                fn_DeactivateUser(obj);
            });
            $('#table').on('click', '.deactivateuser', function () {
                var obj = $(this);
                fn_DeactivateUser(obj);
                /*var obj = $(this);
                 var uid = obj.attr('uid');
                 var csrf_token = obj.attr('csrf_token');
                 swal({
                 customClass: 'vision',
                 title: 'Are you sure?',
                 text: 'You want to block this user!',
                 type: 'warning',
                 showCancelButton: true,
                 confirmButtonText: 'Block'
                 }).then(function () {
                 var btn = obj;
                 $.ajax({
                 url: BASE_URL + "users/deactivateuser",
                 method: "POST",
                 data: {
                 "id": uid,
                 "csrf_token": csrf_token
                 },
                 dataType: "json",
                 beforeSend: function () {
                 btn.button('loading');
                 },
                 success: function (response) {
                 if (response) {
                 if (response.success) {
                 swal({
                 title: "Blocked!",
                 text: response.msg,
                 type: "success"
                 }).then(function () {
                 location.reload();
                 });
                 } else {
                 swal('Error!', response.msg, 'error');
                 }
                 } else {
                 swal('Error!', "Invalid Request!", 'error');
                 }
                 },
                 error: function (jqXHR, textStatus) {
                 swal('Error!', "Invalid Request!", 'error');
                 },
                 complete: function () {
                 btn.button('reset');
                 }
                 });
                 }).catch(swal.noop);*/
            });
        }
        ,
        ViewSupport: function () {
            $('#table').on('click', '.viewsupport', function () {
                support_id = $(this).attr('sid');
                $('#modalSupport').modal('show');
            });
            $('#modalSupport').on('shown.bs.modal', function (e) {
                if (support_id === null) {
                    return false;
                }
                $.ajax({
                    url: BASE_URL + "support/view",
                    method: "GET",
                    data: {
                        "id": support_id
                    },
                    dataType: "json",
                    beforeSend: function () {
                        //$('#modalSupportBody').html('<div class="text-center" style="height:40px;padding: 15px">Loading...</div>');
                    },
                    success: function (response) {
                        if (response) {
                            if (response.success) {
                                var day = moment.unix(response.timestamp);
                                var fromtime = day.fromNow();
                                $('#modalSupportTitle').html(response.title);
                                $('#modalSupportBody').html(response.body);
                                $('#seen' + support_id).removeClass('fa-times').addClass('fa-check');
                            } else {
                                swal('Error!', response.msg, 'error');
                            }
                        } else {
                            swal('Error!', "Invalid Request!", 'error');
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        swal('Error!', "Invalid Request!", 'error');
                    },
                    complete: function () {
                    }
                });
            });
        }
        ,
        Support: function () {
            if ($('#supportpage').length > 0) {
                $(".support_ts").each(function (index) {
                    var ts = $(this).attr('ts');
                    var day = moment.unix(ts);
                    var fromtime = day.fromNow();
                    $(this).text(fromtime);
                });
            }
            $('#table').on('click', '.answersupport', function () {
                var obj = $(this);
                var answer = obj.attr('answer');
                var id = obj.attr('sid');
                var csrf_token = obj.attr('csrf_token');
                var loading = null;
                $.ajax({
                    url: BASE_URL + "support/answer",
                    method: "POST",
                    data: {
                        "id": id,
                        "answer": answer,
                        "csrf_token": csrf_token
                    },
                    dataType: "json",
                    beforeSend: function () {
                        loading = visionComponents.loading('body', {
                            loader: 'line-spin-fade-loader'
                        });
                    },
                    success: function (response) {
                        if (response) {
                            if (response.success) {
                                var answer = response.answer;
                                obj.attr('answer', answer);
                                if (answer === "1") {
                                    var bg = '#04c4a5';
                                    obj.removeClass('fa-times').addClass('fa-check');
                                } else {
                                    var bg = '#c56c6c';
                                    obj.removeClass('fa-check').addClass('fa-times');
                                }
                                obj.css('color', bg);
                            } else {
                                swal('Error!', response.msg, 'error');
                            }
                        } else {
                            swal('Error!', "Invalid Request!", 'error');
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        swal('Error!', "Invalid Request!", 'error');
                    },
                    complete: function () {
                        loading.remove();
                    }
                });
            });
        }
        ,
        DeleteReport: function () {
            $('#table').on('click', '.delreport', function () {
                var obj = $(this);
                var rid = obj.attr('rid');
                var csrf_token = obj.attr('csrf_token');
                swal({
                    customClass: 'vision',
                    title: 'Are you sure?',
                    text: 'You want to delete this report!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Delete'
                }).then(function () {
                    var btn = obj;
                    $.ajax({
                        url: BASE_URL + "reports/delete",
                        method: "POST",
                        data: {
                            "id": rid,
                            "csrf_token": csrf_token
                        },
                        dataType: "json",
                        beforeSend: function () {
                            btn.button('loading');
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    swal('Deleted!', response.msg, 'success');
                                    table.row(obj.parents('tr')).remove().draw();
                                } else {
                                    swal('Error!', response.msg, 'error');
                                }
                            } else {
                                swal('Error!', "Invalid Request!", 'error');
                            }
                        },
                        error: function (jqXHR, textStatus) {
                            swal('Error!', "Invalid Request!", 'error');
                        },
                        complete: function () {
                            btn.button('reset');
                        }
                    });
                }).catch(swal.noop);
            });
        }
        ,
        BlockUser: function () {
            $('#table').on('click', '.blockuser', function () {
                var obj = $(this);
                var uid = obj.attr('uid');
                var csrf_token = obj.attr('csrf_token');
                swal({
                    customClass: 'vision',
                    title: 'Are you sure?',
                    text: 'You want to block this user!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Block'
                }).then(function () {
                    var btn = obj;
                    $.ajax({
                        url: BASE_URL + "posts/block",
                        method: "POST",
                        data: {
                            "id": uid,
                            "csrf_token": csrf_token
                        },
                        dataType: "json",
                        beforeSend: function () {
                            btn.button('loading');
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    swal('Blocked!', response.msg, 'success');
                                    location.reload();
                                } else {
                                    swal('Error!', response.msg, 'error');
                                }
                            } else {
                                swal('Error!', "Invalid Request!", 'error');
                            }
                        },
                        error: function (jqXHR, textStatus) {
                            swal('Error!', "Invalid Request!", 'error');
                        },
                        complete: function () {
                            btn.button('reset');
                        }
                    });
                }).catch(swal.noop);
            });
        }
        ,
        DeletePost: function () {
            $('#table').on('click', '.delpost', function () {
                var obj = $(this);
                var pid = obj.attr('pid');
                var csrf_token = obj.attr('csrf_token');
                swal({
                    customClass: 'vision',
                    title: 'Are you sure?',
                    text: 'You want to delete this post!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Delete'
                }).then(function () {
                    var btn = obj;
                    $.ajax({
                        url: BASE_URL + "posts/delete",
                        method: "POST",
                        data: {
                            "id": pid,
                            "csrf_token": csrf_token
                        },
                        dataType: "json",
                        beforeSend: function () {
                            btn.button('loading');
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    swal('Deleted!', response.msg, 'success');
                                    table.row(obj.parents('tr')).remove().draw();
                                } else {
                                    swal('Error!', response.msg, 'error');
                                }
                            } else {
                                swal('Error!', "Invalid Request!", 'error');
                            }
                        },
                        error: function (jqXHR, textStatus) {
                            swal('Error!', "Invalid Request!", 'error');
                        },
                        complete: function () {
                            btn.button('reset');
                        }
                    });
                }).catch(swal.noop);
            });
        }
        ,
        ViewPost: function () {
            $('#table').on('click', '.viewpost', function () {
                $('#modalViewPostBody').html('<div class="text-center" style="height:40px;padding: 15px">Loading...</div>');
                post_id = $(this).attr('pid');
                $('#modalViewPost').modal('show');
            });
            $('#modalViewPost').on('shown.bs.modal', function (e) {
                if (post_id === null) {
                    return false;
                }
                $.ajax({
                    url: BASE_URL + "posts/view",
                    method: "GET",
                    data: {
                        "id": post_id
                    },
                    dataType: "json",
                    beforeSend: function () {
                        $('#modalViewPostBody').html('<div class="text-center" style="height:40px;padding: 15px">Loading...</div>');
                    },
                    success: function (response) {
                        if (response) {
                            if (response.success) {
                                var day = moment.unix(response.timestamp);
                                var fromtime = day.fromNow();
                                console.log(fromtime);
                                $('#modalViewPostBody').html(response.content);
                                $('#timeago').text(fromtime);
                            } else {
                                swal('Error!', response.msg, 'error');
                            }
                        } else {
                            swal('Error!', "Invalid Request!", 'error');
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        swal('Error!', "Invalid Request!", 'error');
                    },
                    complete: function () {
                    }
                });
            });
        }
        ,
        DeleteBanner: function () {
            $('#table').on('click', '.delbanner', function () {
                var obj = $(this);
                var bid = obj.attr('bid');
                var csrf_token = obj.attr('csrf_token');
                swal({
                    customClass: 'vision',
                    title: 'Are you sure?',
                    text: 'You want to delete this banner!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Delete'
                }).then(function () {
                    var btn = obj;
                    $.ajax({
                        url: BASE_URL + "banners/delete",
                        method: "POST",
                        data: {
                            "id": bid,
                            "csrf_token": csrf_token
                        },
                        dataType: "json",
                        beforeSend: function () {
                            btn.button('loading');
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    swal('Deleted!', response.msg, 'success');
                                    table.row(obj.parents('tr')).remove().draw();
                                } else {
                                    swal('Error!', response.msg, 'error');
                                }
                            } else {
                                swal('Error!', "Invalid Request!", 'error');
                            }
                        },
                        error: function (jqXHR, textStatus) {
                            swal('Error!', "Invalid Request!", 'error');
                        },
                        complete: function () {
                            btn.button('reset');
                        }
                    });
                }).catch(swal.noop);
            });
        }
        ,
        UpdateBanner: function () {
            $('#formeditbanner').validate({
                submitHandler: function (form) {
                    var btn = $('#btnsave');
                    var form_data = new FormData();
                    form_data.append('id', $("#formeditbanner #id").val());
                    form_data.append('url_android', $("#formeditbanner #url_android").val());
                    form_data.append('url_ios', $("#formeditbanner #url_ios").val());
                    form_data.append('csrf_token', $("#formeditbanner #csrf_token").val());
                    $.each($('#formeditbanner input[type=file]')[0].files, function (i, file) {
                        form_data.append('banner', file);
                    });
                    $.ajax({
                        url: BASE_URL + "banners/update",
                        method: "POST",
                        data: form_data,
                        dataType: "json",
                        async: false,
                        cache: false,
                        contentType: false,
                        processData: false,
                        beforeSend: function () {
                            btn.button('loading');
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    window.location = BASE_URL + "banners";
                                } else {
                                    swal('Error!', response.msg, 'error');
                                }
                            } else {
                                swal('Error!', 'Invalid Request', 'error');
                            }
                        },
                        error: function (jqXHR, textStatus) {
                        },
                        complete: function () {
                            btn.button('reset');
                        }
                    });
                    return false;
                },
                rules: {
                    url_android: {
                        required: true
                    },
                    url_ios: {
                        required: true
                    }
                },
                messages: {
                    url_android: {
                        required: 'Please enter android url'
                    },
                    url_ios: {
                        required: 'Please enter ios url'
                    }
                },
                errorElement: 'em',
                errorPlacement: function (error, element) {
                    // Add the `help-block` class to the error element
                    error.addClass('help-block');
                    if (element.prop('type') === 'checkbox') {
                        error.insertAfter(element.parent('label'));
                    } else {
                        error.insertAfter(element);
                    }
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-error').removeClass('has-success');
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-success').removeClass('has-error');
                }
            });
        }
        ,
        AddBanner: function () {
            $('#formaddbanner').validate({
                submitHandler: function (form) {
                    var btn = $('#btnsave');
                    var form_data = new FormData();
                    form_data.append('url_android', $("#formaddbanner #url_android").val());
                    form_data.append('url_ios', $("#formaddbanner #url_ios").val());
                    form_data.append('csrf_token', $("#formaddbanner #csrf_token").val());
                    $.each($('#formaddbanner input[type=file]')[0].files, function (i, file) {
                        form_data.append('banner', file);
                    });
                    loading = visionComponents.loading('body', {
                        loader: 'line-spin-fade-loader'
                    });
                    $.ajax({
                        url: BASE_URL + "banners/add",
                        method: "POST",
                        data: form_data,
                        dataType: "json",
                        async: true,
                        cache: false,
                        contentType: false,
                        processData: false,
                        beforeSend: function () {
                            btn.button('loading');
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    window.location = BASE_URL + "banners";
                                } else {
                                    swal('Error!', response.msg, 'error');
                                }
                            } else {
                                swal('Error!', 'Invalid Request', 'error');
                            }
                        },
                        error: function (jqXHR, textStatus) {
                        },
                        complete: function () {
                            btn.button('reset');
                            loading.remove();
                        }
                    });
                    return false;
                },
                rules: {
                    url_android: {
                        required: true
                    },
                    url_ios: {
                        required: true
                    },
                    banner: {
                        required: true
                    }
                },
                messages: {
                    url_android: {
                        required: 'Please enter android url'
                    },
                    url_ios: {
                        required: 'Please enter ios url'
                    },
                    banner: {
                        required: 'Please choose banner'
                    }
                },
                errorElement: 'em',
                errorPlacement: function (error, element) {
                    // Add the `help-block` class to the error element
                    error.addClass('help-block');
                    if (element.prop('type') === 'checkbox') {
                        error.insertAfter(element.parent('label'));
                    } else {
                        error.insertAfter(element);
                    }
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-error').removeClass('has-success');
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-success').removeClass('has-error');
                }
            });
        }
        ,
        UpdateAgreement: function () {
            if ($('#formagreement').length > 0) {
                var quill = new Quill('#editor', {
                    theme: 'snow'
                });
                $('#formagreement').submit(function (event) {
                    event.preventDefault();
                    return false;
                });
                $('#saveagreement').on('click', function () {
                    var btn = $(this);
                    $.ajax({
                        url: BASE_URL + "agreement/update",
                        method: "POST",
                        data: {
                            "content": quill.container.firstChild.innerHTML,
                            "csrf_token": $("#formagreement #csrf_token").val()
                        },
                        dataType: "json",
                        beforeSend: function () {
                            btn.button('loading');
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    swal('Updated', response.msg, 'success');
                                } else {
                                    swal('Error!', response.msg, 'error');
                                }
                            } else {
                                swal('Error!', "Invalid Request!", 'error');
                            }
                        },
                        error: function (jqXHR, textStatus) {
                            swal('Error!', "Invalid Request!", 'error');
                        },
                        complete: function () {
                            btn.button('reset');
                        }
                    });
                });
            }

        }
        ,
        UpdateAdMobs: function () {
            $('#formadmobs').validate({
                submitHandler: function () {
                    var btn = $('#saveadmobs');
                    var admobs_id = $("#formadmobs #admobs_id").val();
                    var admobs_allposts = ($('input[name="admobs_allposts"]:checked').length > 0) ? 1 : 0;
                    var admobs_mostviewed = ($('input[name="admobs_mostviewed"]:checked').length > 0) ? 1 : 0;
                    var admobs_messages = ($('input[name="admobs_messages"]:checked').length > 0) ? 1 : 0;
                    var admobs_chat = ($('input[name="admobs_chat"]:checked').length > 0) ? 1 : 0;
                    var admobs_notifications = ($('input[name="admobs_notifications"]:checked').length > 0) ? 1 : 0;
                    var admobs_profile = ($('input[name="admobs_profile"]:checked').length > 0) ? 1 : 0;
                    var admobs_settings = ($('input[name="admobs_settings"]:checked').length > 0) ? 1 : 0;
                    $.ajax({
                        url: BASE_URL + "admobs/update",
                        method: "POST",
                        data: {
                            "admobs_id": admobs_id,
                            "admobs_android": $("#formadmobs #admobs_android").val(),
                            "admobs_ios": $("#formadmobs #admobs_ios").val(),
                            "admobs_allposts": admobs_allposts,
                            "admobs_mostviewed": admobs_mostviewed,
                            "admobs_messages": admobs_messages,
                            "admobs_chat": admobs_chat,
                            "admobs_notifications": admobs_notifications,
                            "admobs_profile": admobs_profile,
                            "admobs_settings": admobs_settings,
                            "csrf_token": $("#formadmobs #csrf_token").val()
                        },
                        dataType: "json",
                        beforeSend: function () {
                            btn.button('loading');
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    swal('Updated', response.msg, 'success');
                                    if (admobs_id === "0") {
                                        location.reload();
                                    }
                                } else {
                                    swal('Error!', response.msg, 'error');
                                }
                            } else {
                                swal('Error!', "Invalid Request!", 'error');
                            }
                        },
                        error: function (jqXHR, textStatus) {
                            swal('Error!', "Invalid Request!", 'error');
                        },
                        complete: function () {
                            btn.button('reset');
                        }
                    });
                    return false;
                },
                rules: {
                    admobs_android: {
                        required: true
                    },
                    admobs_ios: {
                        required: true
                    }
                },
                messages: {
                    admobs_android: {
                        required: 'Please enter admobs for android'
                    },
                    admobs_ios: {
                        required: 'Please enter admobs for ios'
                    }
                },
                errorElement: 'em',
                errorPlacement: function (error, element) {
                    // Add the `help-block` class to the error element
                    error.addClass('help-block')

                    if (element.prop('type') === 'checkbox') {
                        error.insertAfter(element.parent('label'))
                    } else {
                        error.insertAfter(element)
                    }
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-error').removeClass('has-success')
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-success').removeClass('has-error')
                }
            });
        }
        ,
        UpdatePassword: function () {
            $('#formadminpwd').validate({
                submitHandler: function () {
                    var btn = $('#btnadminpass');
                    var form = $('#formadminpwd');
                    $.ajax({
                        url: BASE_URL + "settings/password",
                        method: "POST",
                        data: {
                            "curpwd": $("#formadminpwd #curpwd").val(),
                            "newpwd": $("#formadminpwd #newpwd").val(),
                            "retpwd": $("#formadminpwd #retpwd").val(),
                            "csrf_token": $("#formadminpwd #csrf_token").val()
                        },
                        dataType: "json",
                        beforeSend: function () {
                            btn.button('loading');
                            loading = visionComponents.loading('body', {
                                loader: 'line-spin-fade-loader'
                            });
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    swal('Success!', response.msg, 'success');
                                } else {
                                    swal('Error!', response.msg, 'error');
                                }
                            } else {
                                swal('Error!', 'Invalid Request', 'error');
                            }
                        },
                        error: function (jqXHR, textStatus) {
                            swal('Error!', 'Invalid Request', 'error');
                        },
                        complete: function () {
                            btn.button('reset');
                            loading.remove();
                            form.get(0).reset();
                        }
                    });
                    return false;
                },
                rules: {
                    curpwd: {
                        required: true,
                        minlength: 5
                    },
                    newpwd: {
                        required: true,
                        minlength: 5
                    },
                    retpwd: {
                        required: true,
                        minlength: 5,
                        equalTo: "#newpwd"
                    }
                },
                messages: {
                    curpwd: {
                        required: 'Please provide current password',
                        minlength: 'Current password must be at least 5 characters long'
                    },
                    newpwd: {
                        required: 'Please provide new password',
                        minlength: 'New password must be at least 5 characters long'
                    },
                    retpwd: {
                        required: 'Please confirm your password',
                        minlength: 'Confirm password do not match your new password'
                    }
                },
                errorElement: 'em',
                errorPlacement: function (error, element) {
                    // Add the `help-block` class to the error element
                    error.addClass('help-block')

                    if (element.prop('type') === 'checkbox') {
                        error.insertAfter(element.parent('label'))
                    } else {
                        error.insertAfter(element)
                    }
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-error').removeClass('has-success')
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-success').removeClass('has-error')
                }
            });
        }
        ,
        UpdateSettings: function () {
            $('#formsettings').validate({
                submitHandler: function () {
                    var btn = $('#saveinfo');
                    var allow_post = ($('input[name="allow_post"]:checked').length > 0) ? 1 : 0;
                    var allow_comment = ($('input[name="allow_comment"]:checked').length > 0) ? 1 : 0;
                    var allow_forsale = ($('input[name="allow_forsale"]:checked').length > 0) ? 1 : 0;
                    var timezone = $('#formsettings #timezone').val();
                    $.ajax({
                        url: BASE_URL + "settings/update",
                        method: "POST",
                        data: {
                            "app_name": $("#formsettings #app_name").val(),
                            "allow_post": allow_post,
                            "allow_comment": allow_comment,
                            "allow_forsale": allow_forsale,
                            "timezone": timezone,
                            "csrf_token": $("#formsettings #csrf_token").val()
                        },
                        dataType: "json",
                        beforeSend: function () {
                            btn.button('loading');
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    swal('Updated', response.msg, 'success');
                                } else {
                                    swal('Error!', response.msg, 'error');
                                }
                            } else {
                                swal('Error!', "Invalid Request!", 'error');
                            }
                        },
                        error: function (jqXHR, textStatus) {
                            swal('Error!', "Invalid Request!", 'error');
                        },
                        complete: function () {
                            btn.button('reset');
                        }
                    });
                    return false;
                },
                rules: {
                    app_name: {
                        required: true
                    }
                },
                messages: {
                    app_name: {
                        required: 'Please enter app name'
                    }
                },
                errorElement: 'em',
                errorPlacement: function (error, element) {
                    // Add the `help-block` class to the error element
                    error.addClass('help-block')

                    if (element.prop('type') === 'checkbox') {
                        error.insertAfter(element.parent('label'))
                    } else {
                        error.insertAfter(element)
                    }
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-error').removeClass('has-success')
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-success').removeClass('has-error')
                }
            });
        }
        ,
        Config: function () {

            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
        }
        ,
        Login: function () {
            $('#formlogin').validate({
                submitHandler: function () {
                    var remember = ($('#formlogin #remember').is(":checked")) ? 1 : 0;
                    var btnlogin = $('#btnlogin');
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": true,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "500",
                        "timeOut": "1350",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                    $.ajax({
                        url: BASE_URL + "login",
                        method: "POST",
                        data: {
                            "username": $("#formlogin #username").val(),
                            "password": $("#formlogin #password").val(),
                            "remember": remember,
                            "csrf_token": $("#formlogin #csrf_token").val()
                        },
                        dataType: "json",
                        beforeSend: function () {
                            btnlogin.button('loading');
                        },
                        success: function (response) {
                            if (response) {
                                if (response.success) {
                                    location.reload();
                                } else {
                                    toastr.error(response.msg);
                                }
                            } else {
                                toastr.error("Authorization Failed");
                            }
                        },
                        error: function (jqXHR, textStatus) {
                        },
                        complete: function () {
                            btnlogin.button('reset');
                        }
                    });
                    return false;
                },
                rules: {
                    username: {
                        required: true,
                        minlength: 2
                    },
                    password: {
                        required: true,
                        minlength: 5
                    }
                },
                messages: {
                    username: {
                        required: 'Please enter username',
                        minlength: 'Username must consist of at least 2 characters'
                    },
                    password: {
                        required: 'Please enter password',
                        minlength: 'Password must be at least 5 characters long'
                    }
                },
                errorElement: 'em',
                errorPlacement: function (error, element) {
                    // Add the `help-block` class to the error element
                    error.addClass('help-block');
                    if (element.prop('type') === 'checkbox') {
                        error.insertAfter(element.parent('label'));
                    } else {
                        error.insertAfter(element);
                    }
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-error').removeClass('has-success');
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).parents('.form-group').addClass('has-success').removeClass('has-error');
                }
            });
        }
    }
    ;
}();
Admin.init();
function loadMoreForsalePost(post, csrf_token) {
    var type = post.type;
    var created = post.created;
    var html = '<div class="thumbnail">';
    html += '<div class="thumbnail-heading panel-heading">';
    html += '<div class="panel-tools">';
    html += '<ul class="nav">';
    src = post.img;
    html += '<li><a href="' + src + '" target="_blank" class="text-muted"><i class="fa fa-download"></i></a></li>';
    if (post.is_top == 1) {
        html += '<li><a style="cursor:pointer;" class="addtoppost text-muted text-info" csrf_token="' + csrf_token + '" pid="' + post.id + '" top="1"><i class="fa fa-bookmark"></i></a></li>';
    } else {
        html += '<li><a style="cursor:pointer;" class="addtoppost text-muted" csrf_token="' + csrf_token + '" pid="' + post.id + '" top="0"><i class="fa fa-bookmark"></i></a></li>';
    }
    html += '<li><a class="text-muted text-info"><i class="fa fa-shopping-cart"></i></a></li>';
    html += '<li><a class="delmorepost text-muted" csrf_token="' + csrf_token + '" style="color:#969696;cursor:pointer;" pid="' + post.id + '"><i class="fa fa-times"></i></a></li>';
    html += '</ul>';
    html += '</div>';
    html += '<h4 class="thumbnail-title">' + post.username + '</h4>';
    html += '</div>';
    html += '<div><img src="' + post.img + '" alt="" style="width:100%"></div>';
    html += '<div class="caption">';
    html += '<h5>';
    html += '<div><small><i class="fa fa-clock-o"></i> <span class="timeago" ts="' + post.created_ts + '">' + post.fulldate + '</span></small></div>';
    html += '</h5>';
    html += '<p>' + post.title + '</p>';
    html += '<p>' + post.description + '</p>';
    html += '<p>' + post.price + '</p>';
    html += '<div class="thumbnail-extra">';
    html += '<ul class="list-inline">';
    html += '<li><a class="text-muted"><i class="fa fa-eye"></i> ' + post.views + '</a></li>';
    html += '<li><a class="text-muted"><i class="fa fa-heart"></i> ' + post.likes + '</a></li>';
    html += '<li><a class="text-muted"><i class="fa fa-heartbeat"></i> ' + post.dislikes + '</a></li>';
    html += '<li><a class="text-muted"><i class="fa fa-comments"></i> ' + post.comments + '</a></li>';
    html += '<li><a class="text-muted"><i class="fa fa-list-alt"></i> ' + post.reports + '</a></li>';
    html += '<li><a class="text-muted"><i class="fa fa-download"></i> ' + post.downloads + '</a></li>';
    html += '</ul>';
    html += '</div>';
    html += '</div>';

    html += '</div>';

    var grid = $('#columns')[0];
    var item = document.createElement('div');
    salvattore['append_elements'](grid, [item]);
    item.outerHTML = html;
}

function loadMorePost(post, csrf_token) {
    var type = post.type;
    var created = post.created;
    var html = '<div class="thumbnail">';
    html += '<div class="thumbnail-heading panel-heading">';
    html += '<div class="panel-tools">';
    html += '<ul class="nav">';
    if (type !== 'text') {
        var src = '';
        if (type === 'image' || type === 'gif') {
            src = post.img;
        }
        if (type === 'vid') {
            src = post.vid;
        }
        if (type === 'pdf') {
            src = post.pdf;
        }
        html += '<li><a href="' + src + '" target="_blank" class="text-muted"><i class="fa fa-download"></i></a></li>';
    }
    if (post.is_top == 1) {
        html += '<li><a style="cursor:pointer;" class="addtoppost text-muted text-info" csrf_token="' + csrf_token + '" pid="' + post.id + '" top="1"><i class="fa fa-bookmark"></i></a></li>';
    } else {
        html += '<li><a style="cursor:pointer;" class="addtoppost text-muted" csrf_token="' + csrf_token + '" pid="' + post.id + '" top="0"><i class="fa fa-bookmark"></i></a></li>';
    }
    if (post.is_forsale == 1) {
        html += '<li><a class="text-muted text-info"><i class="fa fa-shopping-cart"></i></a></li>';
    }
    html += '<li><a class="delmorepost text-muted" csrf_token="' + csrf_token + '" style="color:#969696;cursor:pointer;" pid="' + post.id + '"><i class="fa fa-times"></i></a></li>';
    html += '</ul>';
    html += '</div>';
    html += '<h4 class="thumbnail-title">' + post.username + '</h4>';
    html += '</div>';

    if (type === 'image' || type === 'gif') {
        html += '<div><img src="' + post.img + '" alt="" style="width:100%"></div>';
    }
    if (type === 'video') {
        html += '<div>';
        html += '<video id="video" class="rounded-top" poster="' + post.thumb + '" controls crossorigin style="width:100%">';
        html += '<source src="' + post.vid + '" type="video/mp4">';
        html += '<a href="' + post.vid + '" download>Download</a>';
        html += '</video>';
        html += '</div>';
    }
    if (type === 'pdf') {
        html += '<div><a href="' + post.pdf + '" target="_blank"><i class="fa fa-download"></i> Download PDF</a></div>';
    }
    html += '<div class="caption">';
    html += '<h5>';
    html += '<div><small><i class="fa fa-clock-o"></i> <span class="timeago" ts="' + post.created_ts + '">' + post.fulldate + '</span></small></div>';
    html += '</h5>';
    if (post.text.length > 0) {
        html += '<p>' + post.text + '</p>';
    }
    if (post.is_forsale == 1) {
        html += '<p>' + post.title + '</p>';
        html += '<p>' + post.description + '</p>';
        html += '<p>' + post.price + '</p>';
    }
    html += '<div class="thumbnail-extra">';
    html += '<ul class="list-inline">';
    html += '<li><a class="text-muted"><i class="fa fa-eye"></i> ' + post.views + '</a></li>';
    html += '<li><a class="text-muted"><i class="fa fa-heart"></i> ' + post.likes + '</a></li>';
    html += '<li><a class="text-muted"><i class="fa fa-heartbeat"></i> ' + post.dislikes + '</a></li>';
    html += '<li><a class="text-muted"><i class="fa fa-comments"></i> ' + post.comments + '</a></li>';
    html += '<li><a class="text-muted"><i class="fa fa-list-alt"></i> ' + post.reports + '</a></li>';
    html += '<li><a class="text-muted"><i class="fa fa-download"></i> ' + post.downloads + '</a></li>';
    html += '</ul>';
    html += '</div>';
    html += '</div>';

    html += '</div>';

    var grid = $('#columns')[0];
    var item = document.createElement('div');
    salvattore['append_elements'](grid, [item]);
    item.outerHTML = html;
}

function loadChat(message_id) {
    $('#refreshchat').attr('mid', message_id);
    $.ajax({
        url: BASE_URL + "messages/view",
        method: "GET",
        data: {
            "id": message_id
        },
        dataType: "json",
        beforeSend: function () {
            $('.panel-body').html('Loading Messages...');
        },
        success: function (response) {
            if (response) {
                if (response.success) {
                    var content = response.content;
                    if (content.length > 0) {
                        $('.panel-body').html(content);
                    }
                } else {
                    swal('Error!', response.msg, 'error');
                }
            } else {
                swal('Error!', "Invalid Request!", 'error');
            }
        },
        error: function (jqXHR, textStatus) {
            swal('Error!', "Invalid Request!", 'error');
        },
        complete: function () {
        }
    });
}

function fn_ActivateUser(obj) {
    var uid = obj.attr('uid');
    var csrf_token = obj.attr('csrf_token');
    swal({
        customClass: 'vision',
        title: 'Are you sure?',
        text: 'You want to activate this user!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Activate'
    }).then(function () {
        var btn = obj;
        $.ajax({
            url: BASE_URL + "users/activate",
            method: "POST",
            data: {
                "id": uid,
                "csrf_token": csrf_token
            },
            dataType: "json",
            beforeSend: function () {
                btn.button('loading');
            },
            success: function (response) {
                if (response) {
                    if (response.success) {
                        swal({
                            title: "Activated!",
                            text: response.msg,
                            type: "success"
                        }).then(function () {
                            location.reload();
                        });
                    } else {
                        swal('Error!', response.msg, 'error');
                    }
                } else {
                    swal('Error!', "Invalid Request!", 'error');
                }
            },
            error: function (jqXHR, textStatus) {
                swal('Error!', "Invalid Request!", 'error');
            },
            complete: function () {
                btn.button('reset');
            }
        });
    }).catch(swal.noop);
}

function fn_DeactivateUser(obj) {
    var uid = obj.attr('uid');
    var csrf_token = obj.attr('csrf_token');
    swal({
        customClass: 'vision',
        title: 'Are you sure?',
        text: 'You want to block this user!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Block'
    }).then(function () {
        var btn = obj;
        $.ajax({
            url: BASE_URL + "users/deactivateuser",
            method: "POST",
            data: {
                "id": uid,
                "csrf_token": csrf_token
            },
            dataType: "json",
            beforeSend: function () {
                btn.button('loading');
            },
            success: function (response) {
                if (response) {
                    if (response.success) {
                        swal({
                            title: "Blocked!",
                            text: response.msg,
                            type: "success"
                        }).then(function () {
                            location.reload();
                        });
                    } else {
                        swal('Error!', response.msg, 'error');
                    }
                } else {
                    swal('Error!', "Invalid Request!", 'error');
                }
            },
            error: function (jqXHR, textStatus) {
                swal('Error!', "Invalid Request!", 'error');
            },
            complete: function () {
                btn.button('reset');
            }
        });
    }).catch(swal.noop);
}