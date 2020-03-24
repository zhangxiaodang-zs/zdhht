/**
 * Created by Jianggy on 2019/2/19.
 */
// $("#user_inquiry").css('display','block');
var userList = [];
var responseComplete = [0, 0];   //用户信息和机构全部返回
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        //判断按钮权限
        fun_power();
        //时间控件初始化
        ComponentsDateTimePickers.init();
        //多选控件初始化
        RoleSelect2.init();
        //获取角色列表，用来做成角色选择框
       // roleDataGet();
        //获取机构列表，用来做成机构选择框
        organDataGet();
        //获取用户列表，用来做成负责人选择框
        userqueryDataGet();
        //新增编辑用户控件初始化
        UserEdit.init();
        //获取用户信息
        UserTable.init();
    });
}
//时间控件初始化
var ComponentsDateTimePickers = function () {

    var handleDatePickers = function () {
        if (jQuery().datetimepicker) {
            $('.date-picker').datetimepicker({
                todayHighlight: true,
                language:"zh-CN",
                showSecond: true, //显示秒
                timeFormat: 'HH:mm:ss' //格式化时间
            });
            var date = getNowFormatDate()+" "+getNowFormatTime();
            $("input[name='expectedsttime']").val(date);
            $("input[name='expectedentime']").val(date);


        }
    };

    return {
        //main function to initiate the module
        init: function () {
            handleDatePickers();
        }
    };
}();
////多选控件初始化
var RoleSelect2 = function(){
    var intSelect2 = function (data){
        $.fn.select2.defaults.set("theme", "bootstrap");
        $(".select2, .select2-multiple").select2({
            placeholder: "角色",
            width:null
        });
        $(".select2, .select2-multiple, .select2-allow-clear, .js-data-example-ajax").on("select2:open", function() {
            if ($(this).parents("[class*='has-']").length) {
                var classNames = $(this).parents("[class*='has-']")[0].className.split(/\s+/);
                for (var i = 0; i < classNames.length; ++i) {
                    if (classNames[i].match("has-")) {
                        $("body > .select2-container").addClass(classNames[i]);
                    }
                }
            }
        });
    };
    return {
        init: function(){
            intSelect2();
        }
    }
}();
//获取用户信息
var UserTable = function () {
    var initTable = function () {
        var table = $('#user_table');
        pageLengthInit(table);
        table.dataTable({
            "language": TableLanguage,
            "bStateSave": false,
            "lengthMenu": TableLengthMenu,
            "destroy": true,
            "pageLength": PageLength,
            //"pagingType": "numbers",
            "serverSide": true,
            "processing": true,
            "searching": false,
            "ordering": false,
            "autoWidth": false,
            "ajax":function (data, callback, settings) {
                var formData = $(".inquiry-form").getFormData();
                var organ = "";
                try{
                    organ = $('#organtreequery').jstree(true).get_selected(true);
                }catch(err){

                }
                organ = organ.length > 0 ? organ[0].id : "";
                var da = {
                    projectname: formData.projectname,
                    username: formData.username,
                    organid: organ,
                    mobile:formData.mobile,
                    currentpage: (data.start / data.length) + 1,
                    pagesize: data.length == -1 ? "": data.length,
                    startindex: data.start,
                    draw: data.draw
                };
                project_DataGet(da, callback);//获取需求列表
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": null},
                { "data": "projectname" },//项目名称
                { "data": "username" },//负责人
                { "data": "introduction" },//描述
                { "data": "expectedsttime" },//预期开始时间
                { "data": "expectedentime" },//预期结束时间
                { "data": "actualsttime" },//实际开始时间
                { "data": "actualentime" },//实际结束时间
                { "data": "projectid" }
            ],
            columnDefs: [
                {
                    "targets": [1],
                    "render": function (data, type, row, meta) {
                        return '<input type="checkbox" class="checkboxes" value="1" />';
                    }
                },
                {
                    "targets": [0],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;  //行号
                    }
                },
                {
                    "targets": [4],
                    "render": function (data, type, row, meta) {
                        return InterceptField(data,"无",20);
                    }
                },
                {
                    "targets":[5],
                    "render": function(data, type, row, meta) {
                        if(data.length==14){
                            return dateTimeFormat12(data);
                        }else if(data.length==12){
                            return dateTimeFormat12(data);
                        }else{
                            return data;
                        }


                    }
                },
                {
                    "targets":[6],
                    "render": function(data, type, row, meta) {
                        if(data.length==14){
                            return dateTimeFormat12(data);
                        }else if(data.length==12){
                            return dateTimeFormat12(data);
                        }else{
                            return data;
                        }


                    }
                },
                {
                    "targets":[7],
                    "render": function(data, type, row, meta) {
                        if(data==undefined){
                            return ' ';
                        }else if(data.length==14){
                            return dateTimeFormat12(data);
                        }else if(data.length==12){
                            return dateTimeFormat12(data);
                        }else{
                            return data;
                        }

                    }
                },
                {
                    "targets":[8],
                    "render": function(data, type, row, meta) {
                        if(data==undefined){
                            return ' ';
                        }else if(data.length==14){
                            return dateTimeFormat12(data);
                        }else if(data.length==12){
                            return dateTimeFormat12(data);
                        }else{
                            return data;
                        }

                    }
                },
                // {
                //     "targets": [2],
                //     "render": function (data, type, row, meta) {
                //         var project_info;
                //         project_info = '<a href="/views/user/role.html" id="op_info">'+data+'</a>';
                //         return project_info;
                //
                //     }
                // },
                {
                    "targets": [9],
                    "render": function (data, type, row, meta) {
                        var edit;
                        if(!window.parent.makeEdit(menu,loginSucc.functionlist,"#op_edit")){
                            edit = '-';
                        }else{
                            edit = '<a href="javascript:;" id="op_edit">编辑</a>';
                        }
                        return edit;
                    }
                }
            ],
            fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                $('td:eq(1),td:eq(5),td:eq(6),td:eq(7),td:eq(8)', nRow).attr('style', 'text-align: center;');//td内容居中显示
            }
        });
        //table.draw( false );
        table.find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).prop("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    $(this).prop("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
        });
        table.on('change', 'tbody tr .checkboxes', function () {
            $(this).parents('tr').toggleClass("active");
            //判断是否全选
            var checklength = $("#user_table").find(".checkboxes:checked").length;
            if(checklength == userList.length){
                $("#user_table").find(".group-checkable").prop("checked",true);
            }else{
                $("#user_table").find(".group-checkable").prop("checked",false);
            }
        });
    };
    return {
        init: function (data) {
            if (!jQuery().dataTable) {
                return;
            }
            initTable(data);
        }
    };

}();




//新增编辑用户控件初始化
var UserEdit = function() {
    var handleRegister = function() {
        var validator = $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                projectname: {
                    required: true
                },
                username: {
                    required: true
                },
                actualsttime: {
                    required: true
                },
                actualentime: {
                    required: true
                },
                expectedsttime: {
                    required: true
                },
                expectedentime: {
                    required: true
                },
                introduction: {
                    required: true
                }
            },

            messages: {
                projectname: {
                    required: "项目名称必须输入"
                },
                username: {
                    required: "项目负责人必须输入"
                },
                actualsttime: {
                    required: "实际开始时间必须输入"
                },
                actualentime: {
                    required: "实际结束时间必须输入"
                },
                expectedsttime: {
                    required: "预期开始时间必须输入"
                },
                expectedentime: {
                    required: "预期结束时间必须输入"
                },
                introduction: {
                    required: "项目简介必须输入"
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                form.submit();
            }
        });

        // 手机号码验证
        jQuery.validator.addMethod("mobile", function(value, element) {
            var tel = /^1[3456789]\d{9}$/;
            return this.optional(element) || (tel.test(value));
        }, "请正确填写您的手机号码");

        // 固定电话码验证
        jQuery.validator.addMethod("phone", function(value, element) {
            var tel = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
            return this.optional(element) || (tel.test(value));
        }, "请正确填写您的固定电话");

        //点击确定按钮
        $('#register-btn').click(function() {
            var projectUpload1=localStorage.getItem('projectUpload');
            btnDisable($('#register-btn'));
            if ($('.register-form').validate().form()) {
                var user = $('.register-form').getFormData();
                user.projectUpload = JSON.parse(projectUpload1);

                console.log("user.projectUpload :"+JSON.stringify(user.projectUpload ))
               // console.log("user:"+JSON.stringify(user))
                // user.rolelist = $('#rolename').val();
                // user.birthday = user.birthday.replace(/-/g, '');
                // user.organid = ($('#organtree').jstree(true).get_selected(true))[0].id;
            }
            if($("input[name=edittype]").val() == USERADD){//新增提交
                $("#loading_edit").modal("show");
                // userAdd(user);
                project_Add(user);
            }else { //编辑完成提交
                console.log("编辑完成提交")
                console.log("userList:"+JSON.stringify(userList))
                var data;
                for (var i = 0; i < userList.length; i++) {
                    if (user.id == userList[i].id) {
                        data = userList[i];
                        user.projectid=userList[i].projectid;
                    }
                }

                console.log("user:"+JSON.stringify(user))
                // if (equar(user.rolelist, (data.roleid || "").split(","))) {
                //     user.rolelist = [];
                // }
                var formData = new FormData();
                //formData.append("img_head",null);
                // var data1 = sendMessageEdit(DEFAULT, user);
                var data1 = sendMessageEdit(DEFAULT, user);
                console.log("data1:"+data1)//改变之后的数据
                formData.append("body",new Blob([data1],{type:"application/json"}));

                console.log("append后的:"+JSON.stringify(formData))
               // formData.append("rolelist",user.rolelist);
                $("#loading_edit").modal("show");
                  // userEdit(formData);
                project_Edit(data1);




            }
        });
        //取消
        $("#btn_cancel").click(function () {
            // console.log("点击了取消")
            $("#thelist").html(' ');
        })
        //新增项目  edittype=2
        $('#op_add').click(function() {
            //清除校验错误信息
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("新增项目");
            $(":input",".register-form").not(":button,:reset,:submit,:radio,#evaluationneed").val("")
                .removeAttr("checked")
                .removeAttr("selected");
            //清空角色输入框
            $("#rolename").val(null).select2(
                {
                    placeholder: "角色",
                    width:null
                }
            );
            //清空机构输入框
            clearSelect($("#organtree"));
            ComponentsDateTimePickers.init();
            //用户代码可以输入
            $(".register-form").find("input[name=id]").attr("readonly", true);
            //用户代码不可以输入
            $("input[name=edittype]").val(USERADD);
            $('#edit_user').modal('show');
        });
        //编辑用户  点击编辑按钮   edittype=1
        $('#user_table').on('click', '#op_edit', function (e) {
            e.preventDefault();
            //清除校验错误信息
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("编辑项目");

            // var exclude = ["rolename", "organid"];
            var exclude = [""];
           // var userid = $(this).parents("td").siblings().eq(1).text();
            var row = $(this).parents('tr')[0];
            var id = $("#user_table").dataTable().fnGetData(row).id;
            var user = new Object();
            for(var i=0; i < userList.length; i++){
                if(id == userList[i].id){
                    user = userList[i];
                }
            }
          //  console.log(JSON.stringify(user))
             var options = { jsonValue: user, exclude:exclude,isDebug: false};
          //  var options = { jsonValue: user, exclude:"", isDebug: false};
            $(".register-form").initForm(options);

            //查询附件信息
            var projectid = $("#user_table").dataTable().fnGetData(row).projectid;
            console.log("projectid:"+projectid)
            filequery({projectid:projectid});

            //角色赋值
            // $("#rolename").val((user.roleid||"").split(",")).select2(
            //     {
            //         placeholder: "角色",
            //         width:null
            //     }
            // );
            //实际开始时间
           // $("input[name=actualsttime]").datepicker("setDate",dateFormat(user.actualsttime, "-"));
            //实际结束时间
           // $("input[name=actualentime]").datepicker("setDate",dateFormat(user.actualentime, "-"));
            //清空机构输入框
            //clearSelectCheck($("#organtree"));
            //机构框赋值
          //  $('#organtree').jstree(true).select_node(user.organid);
            //用户代码不可以输入
            $(".register-form").find("input[name=id]").attr("readonly", true);
            $("input[name=edittype]").val(USEREDIT);

            $('#edit_user').modal('show');
        });
    };
    return {
        init: function() {
            handleRegister();
        }
    };
}();

function equar(a,b){ //排序
    return (a.sort().toString() === b.sort().toString())
}
//删除项目
var UserDelete = function() {
    $('#op_del').click(function() {
        var len = $(".checkboxes:checked").length;
        if(len < 1){
            alertDialog("至少选中一项！");
        }else{
            confirmDialog("数据删除后将不可恢复，您确定要删除吗？", UserDelete.deleteUser)
        }
    });
    return{
        deleteUser: function(){
            var projectlist = {projectidlist:[]};
            $(".checkboxes:checked").parents("td").each(function () {
                var row = $(this).parents('tr')[0];     //通过获取该td所在的tr，即td的父级元素，取出第一列序号元素
                var id = $("#user_table").dataTable().fnGetData(row).id;
                projectlist.projectidlist.push({projectid:id});

            });
            $("#loading_edit").modal("show");
            project_Delete(projectlist);

        }
    }
}();

var PasswordRest = function() {
    jQuery('#password_reset').click(function() {
        var len = $(".checkboxes:checked").length;
        if(len < 1){
            alertDialog("至少选中一项！");
        }else{
            confirmDialog("您确定要重置密码吗？", PasswordRest.passwordRest)
        }
    });
    return{
        passwordRest: function(){
            var password = hex_md5("123456");
            var userlist = {useridlist:[], password:password};
            $(".checkboxes:checked").parents("td").each(function () {
                userlist.useridlist.push($(this).siblings().eq(0).text());
            });
            $("#loading_edit").modal("show");
            passwordReset(userlist);
        },
        passwordRestResult: function(flg){
            $("#loading_edit").modal("hide");
            var result = "密码重置成功！";
            if(!flg) result = "密码重置失败！";
            alertDialog(result);
        }
    }
}();

function getUserDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){ //SUCCESS
        if (result && result.retcode == SUCCESS) {
            var res = result.response;
            // userList = res.userlist;
            // tableDataSet(res.draw, res.totalcount, res.totalcount, res.userlist, callback);
            userList = res.projectlist;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.projectlist, callback);
        }else{
            tableDataSet(0, 0, 0, [], callback);
            alertDialog("用户信息获取失败！");
        }
    }else{
        tableDataSet(0, 0, 0, [], callback);
        alertDialog("用户信息获取失败！");
    }
}

function getRoleDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.retcode == SUCCESS) {
            var roleList = result.response.rolelist;
            roleNameSelectBuild(roleList);
        }
    }
}

//获取用户列表信息
function getOrganDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.retcode == SUCCESS) {
            var organList = result.response.userlist;
            ProjectSelectBuild(organList, $("#organtreequery, #organtree"));//common.js中生成
            ProjectSelectBuild(organList, $("#principaltreequery"));
        }
    }
}

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

    }
    if(flg){
        if(result && result.retcode != SUCCESS){
            alert = result.retmsg;
        }
        if (result && result.retcode == SUCCESS) {
            res = "成功";
            $(".group-checkable").prop("checked",false);
            UserTable.init();
            $('#edit_user').modal('hide');
        }
    }

    if(alert == "") alert = text + "项目" + res + "！";
    App.unblockUI('#lay-out');
    alertDialog(alert);
    $("#thelist div").remove();
}

function passwordResetEnd(flg, result){
    App.unblockUI('#lay-out');
    PasswordRest.passwordRestResult(flg);
}

function roleNameSelectBuild(roleList){
    var data = [];
    for (var i = 0;  i < roleList.length ; i++) {
        data.push({ id:roleList[i].roleid, text: roleList[i].rolename });
    }
    $("#rolename").select2({
        placeholder: "角色",
        data: data,
        width:null
    })
}

//选中所属机构
$('#organtreequery, #organtree').on('select_node.jstree', function(e,data) {
    console.info("select_node");
    var ref = $(this).jstree(true);
    var nodes = ref.get_checked();  //使用get_checked方法
    $.each(nodes, function(i, nd) {
        if (nd != data.node.id)
            ref.uncheck_node(nd);
    });
    $('#organ').val(data.node.text);
    $('#userid').val(data.node.id);
    $(this).hide();
});

//取消选中所属机构
$('#organtreequery, #organtree').on('deselect_node.jstree', function(e,data) {
    console.info("deselect_node");
    $('#organ').val("");
    $('#userid').val("");
    $(this).hide();
});

//选中所属负责人查询
$('#principaltreequery').on('select_node.jstree', function(e,data) {
    console.info("select_node");
    var ref = $(this).jstree(true);
    var nodes = ref.get_checked();  //使用get_checked方法
    $.each(nodes, function(i, nd) {
        if (nd != data.node.id)
            ref.uncheck_node(nd);
    });
    $('#principalquery').val(data.node.text);
    $('#userids').val(data.node.id);
    $(this).hide();
});

//取消选中负责人查询
$('#principaltreequery').on('deselect_node.jstree', function(e,data) {
    console.info("deselect_node");
    $('#principalquery').val("");
    $('#userids').val("");
    $(this).hide();
});

//按下input之外的地方，所属机构输入框不显示
$(document).click(function(e){
    if ($(e.target)[0] != $("#organquery")[0]){
        $("#organtreequery").hide();
    }
    if ($(e.target)[0] != $("#organ")[0]){
        $("#organtree").hide();
    }
    if ($(e.target)[0] != $("#principalquery")[0]){
        $("#principaltreequery").hide();
    }
});

$("#photo").change(function(){
    var file = $(this).get(0).files[0];
    var inputObj = $(this).siblings("input[name=image]");
    var imgObj = $(this).siblings("img");
    inputObj.val(file);
    if(file == undefined){
        imgObj.attr("src", "");
        inputObj.val("");
        return;
    }
    var render = new FileReader();
    render.readAsDataURL(file);
    render.onload = function(e) {
        imgObj.attr("src", e.target.result);
    }
});

$("#user_inquiry").on("click", function(){
    //用户查询
    UserTable.init();
});

//判断用户和机构是否获取完毕
function changeButtonStatus(){
    if(responseComplete.indexOf(0) == -1 ){
        $("#op_edit").trigger('click');
    }
}
/*————————附件上传开始——————————*/
$(function() {
    var $list = $("#thelist");
    var $btn = $("#ctlBtn");
    var state = 'pending'; // 上传文件初始化
    var uploader = WebUploader.create({
        swf : 'webuploader/Uploader.swf',
        server : 'http://192.168.10.14:8001/zsdev/ac/web/front/upload',
        pick : '#picker',
        resize : false,
        duplicate :true //开启重复上传
    });
    uploader.on('fileQueued', function(file) {
        $list.append(
            // '<div id="' + file.id + '" class="item">'
            // + '<h4 class="info">' + file.name + '</h4>'
            // + '<p class="state">等待上传...</p>' + '</div>'
            '<div id="' + file.id + '" class="item clearfix">'+
                '<div class="pull-left">'+
                     '<h4 class="info">' + file.name + '</h4>'+
                    '<p class="state">等待上传...</p>' +
                '</div>'+
                '<div class="pull-right fileoperat"></div>'+
            '</div>'
        );
    });

    uploader.on('uploadProgress',
        function(file, percentage) {
            var $li = $('#' + file.id), $percent = $li
                .find('.progress .progress-bar');

            // 避免重复创建
            if (!$percent.length) {
                $percent = $(
                    '<div class="progress progress-striped active">'
                    + '<div class="progress-bar" role="progressbar" style="width: 0%">'
                    + '</div>' + '</div>')
                    .appendTo($li).find('.progress-bar');
            }

            $li.find('p.state').text('上传中');

            $percent.css('width', percentage * 100 + '%');
        });


     var projectUpload=[];
    uploader.on('uploadSuccess', function(file,response) {
        projectUpload.push(response.response)
        localStorage.setItem('projectUpload',JSON.stringify(projectUpload));
        $('#' + file.id).find('p.state').text('已上传');
        $('#' + file.id).find('.fileoperat').append(
            '<a class="filedown" href="'+response.response.filepath+'">下载</a>'+
            '<a class="filedel" data-id="'+response.response.fileid+'" data-number="'+file.id+'">删除</a>'
        );
    });

    uploader.on('uploadError', function(file) {
        $('#' + file.id).find('p.state').text('上传出错');
    });

    uploader.on('uploadComplete', function(file) {
        $('#' + file.id).find('.progress').fadeOut();
    });
    $btn.on('click', function() {
        if (uploader.getFiles().length == 0) {
            alert = "上传队列中无文件";
            alertDialog(alert);
            return;
        }
        if (state === 'uploading') {
            uploader.stop();
        } else {
            uploader.upload();
        }
    });
    //删除附件
    $('#thelist').on('click', '.filedel', function (e) {
        e.preventDefault();
        if($("input[name=edittype]").val()=="1"){//新增进入
            $('#' + $(this).attr("data-number")).remove();
        }else{//编辑进入
            var projectUpload={};
            projectUpload={fileid:$(this).attr("data-id")}
            filedelete(projectUpload);
            $('#' + $(this).attr("data-number")).remove();
        }
    });

});
/*————————附件上传结束——————————*/

















