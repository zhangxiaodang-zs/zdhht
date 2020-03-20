var userRightUrl = regulateSucc.userHostUrl;
var businessUrl = regulateSucc.businessUrl;
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        //反馈详情初始化
        feedback_info.init();
    });
}



//反馈详情初始化
var  feedback_info = function () {
    var handleDatePickers = function () {
        $("#vertical-timeline").html('');
        $(".vertical-timeline-block").remove();
        var id = localStorage.getItem('task_id');
        feedbackquery(id);//反馈详情
        //反馈详情
        function feedbackquery(id, callback){
            data = { pagesize: "50", startindex: "0",taskid:id}
            App.blockUI({target: '#lay-out',boxed: true});
            if(data == null){
                data = { pagesize: "50", startindex: "0"}
            }
            $.ajax({
                type: "post",
                contentType: "application/json",
                async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
                url: userRightUrl + "feedbackquery",    //请求发送到TestServlet处
                data: sendMessageEdit(DEFAULT, data),
                dataType: "json",        //返回数据形式为json
                success: function (result) {
                    var feedbacklist=result.response.feedbacklist;
                    if(feedbacklist==""){
                        $("#tishi").append(
                            '<p>暂无反馈信息</p>'
                        )
                    }
                    for (var i = 0; i < feedbacklist.length; i++){
                        $("#vertical-timeline").append(
                            '  <div class="vertical-timeline-block">'+
                            '<div class="vertical-timeline-icon navy-bg">'+
                            '  <i class="fa fa-briefcase"></i>'+
                            ' </div>'+
                            '<div class="vertical-timeline-content">'+
                            ' <h2>'+feedbacklist[i].feedbacktime+'</h2>'+
                            ' <p>'+feedbacklist[i].feedbackcontent+'</p>'+
                            '<a href="#" class="btn btn-sm btn-primary" id="feedbackedit" data-content="'+feedbacklist[i].feedbackcontent+'" data-id="'+feedbacklist[i].id+'"> 编辑</a>'+
                            ' <span class="vertical-date">'+
                            ' <span class="vertical-date"> 进度 <br>'+
                            ' <small>'+feedbacklist[i].feedschedule+'%</small>'+
                            ' </span>'+
                            '</div>'+

                            ' </div>'

                        )
                    }

                    // getUserDataEnd(true, result, callback);
                },
                error: function (errorMsg) {
                    console.info("userDataGet-error:" + JSON.stringify(errorMsg));
                    // getUserDataEnd(false, "", callback);
                }
            });
        }
    };

    return {
        init: function () {
            handleDatePickers();
        }
    };
}();






/*——————————点击编辑反馈————————————*/
$('#vertical-timeline').on('click', '#feedbackedit', function (e) {
    e.preventDefault();
    $("#feedbackcontent").val($(this).attr('data-content'));
    localStorage.setItem('info_id',$(this).attr('data-id'));//存储id
    localStorage.setItem('data-taskid',$(this).attr('data-taskid'));//存储data-taskid
    //清除校验错误信息
   // validator.resetForm();
    $(".register-form").find(".has-error").removeClass("has-error");
    $(".modal-title").text("反馈内容");

    $('#edit_user').modal('show');
});

/*——————————确认编辑————————————*/
$('#register-btn').click(function() {
    btnDisable($('#register-btn'));
    var info_id=localStorage.getItem('info_id');//获取id
    var feedbackcontent= $("#feedbackcontent").val();
    $("#loading_edit").modal("show");
    feedbackedit(info_id,feedbackcontent);
});


function userInfoEditEnd(flg, result, type){
    $("#loading_edit").modal("hide");
    var res = "失败";
    var text = "";
    var alert = "";
    switch (type){
        case USERADD:
            text = "新增";
            break;
        case USEREDIT:
            text = "编辑";
            break;
        case USERDELETE:
            text = "删除";
            break;
        case feedbackadd:
            text = "添加";
            break;
    }
    if(flg){
        if(result && result.retcode != SUCCESS){
            alert = result.retmsg;
        }
        if(result && result.retcode != feedbackadd){
            alert = result.retmsg;
        }
        if (result && result.retcode == SUCCESS) {
            res = "成功";
            $('#edit_user').modal('hide');
            feedback_info.init();
            console.log("初始化2")

        }
    }
    if(alert == "") alert = text + "项目" + res + "！";
    App.unblockUI('#lay-out');
    alertDialog(alert);
}
//返回
function go_back() {
    history.go(-1)
}