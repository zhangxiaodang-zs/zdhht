/**
 * Created by Jianggy on 2019/2/19.
 */
// $("#user_inquiry").css('display','block');
var userList = [];
var responseComplete = [0, 0];   //用户信息和机构全部返回
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        fun_power();
        //时间控件初始化
        ComponentsDateTimePickers.init();
        //多选控件初始化
        RoleSelect2.init();
        //获取角色列表，用来做成角色选择框
        roleDataGet();
        //获取机构列表，用来做成机构选择框
       // organDataGet();
        //获取用户列表，用来做成负责人选择框
        userqueryDataGet();
        demandqueryDataGet();
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
                // format: "yyyy-mm-dd hh:ii:ss",
                timeFormat: 'HH:mm:ss' //格式化时间
            });
            var date = getNowFormatDate()+" "+getNowFormatTime();
            $("input[name='expectedsttime']").val(date);
            $("input[name='expectedentime']").val(date);
            $("input[name='feedbacktime']").val(date);

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
                    taskname: formData.taskname,
                    principal: formData.principal,
                    projectname: formData.projectname,
                    demandname: formData.demandname,
                    organid: organ,
                    status:formData.status,
                    currentpage: (data.start / data.length) + 1,
                    pagesize: data.length == -1 ? "": data.length,
                    startindex: data.start,
                    draw: data.draw
                };
                taskquery(da, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": null},
                { "data": "projectname" },//项目名称
                { "data": "demandname" },//需求名称
                { "data": "taskname" },//任务名称
                { "data": "username" },//负责人
               // { "data": "taskcontent" },//描述
                { "data": "expectedsttime" },//预期开始时间
                { "data": "expectedentime" },//预期结束时间
                { "data": "actualsttime" },//实际开始时间
                { "data": "actualentime" },//实际结束时间
                { "data": "status" },//状态
                { "data": "id" }
            ],
            columnDefs: [
                {
                    "targets": [0],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;  //行号
                    }
                },
                {
                    "targets": [1],
                    "render": function (data, type, row, meta) {
                        return '<input type="checkbox" class="checkboxes" value="1" />';
                    }
                },
                {
                    "targets": [2],
                    "render": function (data, type, row, meta) {
                        if(data==undefined){
                            return ' ';
                        }else{
                            return data;
                        }

                    }
                },
                {
                    "targets": [3],
                    "render": function (data, type, row, meta) {
                        if(data==undefined){
                            return ' ';
                        }else{
                            return data;
                        }

                    }
                },
                {
                    "targets": [4],
                    "render": function (data, type, row, meta) {
                        var project_info;
                        project_info = '<a href="#" data-id="'+row.id+'" id="task_info">'+data+'</a>';
                        return project_info;

                    }
                },
                {
                    "targets":[6],
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
                {
                    "targets":[9],
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
                    "targets": [11],
                    "render": function (data, type, row, meta) {
                        var edit;//编辑
                        var task_info;//反馈
	                    if(!window.parent.makeEdit(menu,loginSucc.functionlist,"#op_edit")){
	                        edit = '-';
	                    }else{
	                        edit = '<a href="javascript:;" id="op_edit">编辑</a>';
	                    }
                        if(!window.parent.makeEdit(menu,loginSucc.functionlist,"#feedback")){
                            task_info = '-';
                        }else{
                            task_info = '<a href="javascript:;" id="feedback">反馈</a>';
                        }

                        return edit+"</br>"+task_info;

                    }
                }
            ],
            fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                var status = aData.status;
                if(status=="未开始"){
                    $('td:eq(10)',nRow).css("color", "green").css("text-align", "center");
                }else if(status=="进行中"){
                    $('td:eq(10)',nRow).css("color", "#4661ad").css("text-align", "center");
                }else if(status=="已结束"){
                    $('td:eq(10)',nRow).css("color", "#ccc").css("text-align", "center");
                }
                $('td:eq(1),td:eq(5),td:eq(6),td:eq(7),td:eq(8),td:eq(9)', nRow).attr('style', 'text-align: center;');//td内容居中显示
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
        //任务新增
        var validator = $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                taskname: {
                    required: true
                },
                principal: {
                    required: true
                },
                expectedsttime: {
                    required: true
                },
                expectedentime: {
                    required: true
                },
                taskcontent: {
                    required: true
                }
            },

            messages: {
                taskname: {
                    required: "任务名称必须输入"
                },
                principal: {
                    required: "任务负责人必须输入"
                },
                expectedsttime: {
                    required: "预期开始时间必须输入"
                },
                expectedentime: {
                    required: "预期结束时间必须输入"
                },
                taskcontent: {
                    required: "任务简介必须输入"
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


        /*——————————任务新增、编辑 确定按钮————————————*/
        $('#register-btn').click(function() {
            btnDisable($('#register-btn'));
           // console.log($('.register-form').validate().form());
            if ($('.register-form').validate().form()) {
                var user = $('.register-form').getFormData();
                //时间替换
                user.expectedsttime = dateTimeFormatstring(user.expectedsttime); //预计开始时间
                user.expectedentime = dateTimeFormatstring(user.expectedentime); //预计结束时间
            }
            //判断时间
            if(!user.expectedentime==""){
                if(user.expectedsttime==""){
                    alert("请选择预期开始时间");
                    return false;
                }
                if(user.expectedsttime>=user.expectedentime){
                    alert("预期开始时间不能大于预期结束时间");
                    return false;
                }
            }
            if($("input[name=edittype]").val() == USERADD){//新增提交
                $("#loading_edit").modal("show");
                taskadd(user);
            }else { //编辑完成提交
              //  console.log("编辑完成提交")
                var data;
                for (var i = 0; i < userList.length; i++) {
                    if (user.id == userList[i].id) {
                        data = userList[i];
                    }
                }
                var formData = new FormData();
                //formData.append("img_head",null);
                // var data1 = sendMessageEdit(DEFAULT, user);
                var data1 = sendMessageEdit(DEFAULT, user);
                formData.append("body",new Blob([data1],{type:"application/json"}));
               // formData.append("rolelist",user.rolelist);
                $("#loading_edit").modal("show");
                  // userEdit(formData);
                taskedit(data1);
            }
        });
        /*——————————添加任务反馈确定按钮————————————*/
        $('#feedback-btn').click(function() {
            //判断是否必填
            if(!$("#feedbackcontent").val()){
                alert("请输入反馈内容!");
                return;
            }
            if(!$("#feedschedule").val()||!isNumber($("#feedschedule").val())){
                alert("请输入进度(100以内数字)!");
                return;
            }
            if(!$("#workinghours").val()||!isNumber($("#workinghours").val())){
                alert("请输入工时(100以内数字)!");
                return;
            }
            if(!$("#feedbacktime").val()){
                alert("请选择反馈时间!");
                return;
            }

            //判断输入的是否是100以内的数字
            function isNumber(oNum) {
                if(!oNum) return false;
                var strP=/^\d+(\.\d+)?$/;
                if(!strP.test(oNum)) return false;
                if(oNum<0||oNum>100) return false;
                try{
                    if(parseFloat(oNum)!=oNum) return false;
                }
                catch(ex)
                {
                    return false;
                }
                return true;
            }

            btnDisable($('#feedback-btn'));
            if ($('.feedback-form').validate().form()) {
                var user = $('.feedback-form').getFormData();
                //时间替换
                user.actualsttime = dateTimeFormatstring(user.actualsttime); //实际开始时间
                user.actualentime = dateTimeFormatstring(user.actualentime); //实际结束
                user.feedbacktime = dateTimeFormatstring(user.feedbacktime); //添加时间
            }
            //判断时间
            if(!user.actualentime==""){
                if(user.actualsttime==""){
                    alert("请选择实际开始时间");
                    return false;
                }
                if(user.actualsttime>=user.actualentime){
                    alert("实际开始时间不能大于实际结束时间");
                    return false;
                }
            }
            console.log(JSON.stringify(user))
            feedbackadd(user);
        });
        /*——————————新增任务————————————*/
        $('#op_add').click(function() {
            //清除校验错误信息
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("新增任务");
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
        //点击编辑任务
        $('#user_table').on('click', '#op_edit', function (e) {
            e.preventDefault();
            //清除校验错误信息
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("编辑任务");
            // var exclude = ["rolename", "organid"];
            var exclude = [""];
           // var userid = $(this).parents("td").siblings().eq(1).text();
            var row = $(this).parents('tr')[0];
            var id = $("#user_table").dataTable().fnGetData(row).id;
            var user = new Object();
           // console.log("userList:"+JSON.stringify(userList))
            for(var i=0; i < userList.length; i++){
                if(id == userList[i].id){
                    user = userList[i];
                }
            }
            console.log(JSON.stringify(user))
             var options = { jsonValue: user, exclude:exclude,isDebug: false};
          //  var options = { jsonValue: user, exclude:"", isDebug: false};
            $(".register-form").initForm(options);
            //更新日期时间选择器
            $("input[name=expectedsttime]").datetimepicker('update', dateTimeFormat12(user.expectedsttime));
            $("input[name=expectedentime]").datetimepicker('update', dateTimeFormat12(user.expectedentime));
            //角色赋值
            // $("#rolename").val((user.roleid||"").split(",")).select2(
            //     {
            //         placeholder: "角色",
            //         width:null
            //     }
            // );

            //清空机构输入框
            //clearSelectCheck($("#organtree"));
            //机构框赋值
          //  $('#organtree').jstree(true).select_node(user.organid);
            //用户代码不可以输入
            $(".register-form").find("input[name=id]").attr("readonly", true);
            $("input[name=edittype]").val(USEREDIT);

            $('#edit_user').modal('show');
        });

       //点击反馈按钮
        $('#user_table').on('click', '#feedback', function (e) {
            e.preventDefault();
            //清除校验错误信息
            validator.resetForm();
            $(".feedback-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("添加反馈信息");
            // var exclude = ["rolename", "organid"];

            var exclude = [""];
            // var userid = $(this).parents("td").siblings().eq(1).text();
            var row = $(this).parents('tr')[0];
            var id = $("#user_table").dataTable().fnGetData(row).id;
            var user = new Object();
            for(var i=0; i < userList.length; i++){
                if(id == userList[i].id){
                    user = userList[i];
                    user.taskid = userList[i].id;
                }
            }

            $("input[name=taskname]").val(user.taskname);
            console.log(JSON.stringify(user))
            var options = { jsonValue: user, exclude:exclude,isDebug: false};
            //  var options = { jsonValue: user, exclude:"", isDebug: false};
            $(".feedback-form").initForm(options);
            //更新日期时间选择器
            //更新日期时间选择器
            $("input[name=expectedsttime]").datetimepicker('update', dateTimeFormat12(user.expectedsttime));
            $("input[name=expectedentime]").datetimepicker('update', dateTimeFormat12(user.expectedentime));
            console.log($("#actualsttime").val())
            if($("#actualsttime").val()){
                $("#actualsttime").datetimepicker('update', dateTimeFormat12(user.actualsttime));
            }
            if($("#actualentime").val()){
                $("#actualentime").datetimepicker('update', dateTimeFormat12(user.actualentime));
            }

            $(".feedback-form").find("input[name=id]").attr("readonly", true);
            $("input[name=edittype]").val(USEREDIT);

            $('#edit_feedback').modal('show');
        });
        /*——————————进去详情————————————*/
        $('#user_table').on('click', '#task_info', function (e) {
            e.preventDefault();
            var task_id = localStorage.setItem('task_id',$(this).attr("data-id"));
            var id = localStorage.getItem('task_id');
            window.location.href = "/views/task/task_info.html";
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
            var tasklist = {taskidlist:[]};
            $(".checkboxes:checked").parents("td").each(function () {
                var row = $(this).parents('tr')[0];     //通过获取该td所在的tr，即td的父级元素，取出第一列序号元素
                var id = $("#user_table").dataTable().fnGetData(row).id;
                tasklist.taskidlist.push({id:id});

            });
            $("#loading_edit").modal("show");
            taskdelete(tasklist);

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
    // console.log(callback)
    App.unblockUI('#lay-out');
    if(flg){ //SUCCESS
        if (result && result.retcode == SUCCESS) {
            var res = result.response;
            // userList = res.userlist;
            // tableDataSet(res.draw, res.totalcount, res.totalcount, res.userlist, callback);
            userList = res.tasklist;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.tasklist, callback);
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
            //console.log(roleList)
            roleNameSelectBuild(roleList);
        }
    }
}
//获取完用户列表信息
function getOrganDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.retcode == SUCCESS) {

            var organList = result.response.userlist;
           // console.log(organList)
            taskSelectBuild(organList, $("#organtreequery, #organtree"));
        }
    }
}
//任务关联需求
function getDemandDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.retcode == SUCCESS) {
            var demandList = result.response.demandlist;
            demandNameSelectBuild(demandList, $("#demandtree"));
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
            $(".group-checkable").prop("checked",false);
            UserTable.init();
            $('#edit_user').modal('hide');
        }
    }
    if(alert == "") alert = text + "项目" + res + "！";
    App.unblockUI('#lay-out');
    alertDialog(alert);
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
    var ref = $(this).jstree(true);
    var nodes = ref.get_checked();  //使用get_checked方法
    $.each(nodes, function(i, nd) {
        if (nd != data.node.id)
            ref.uncheck_node(nd);
    });
    $('#organ').val(data.node.text);
    $('#principal').val(data.node.id);
    $(this).hide();
});

//取消选中所属机构
$('#organtreequery, #organtree').on('deselect_node.jstree', function(e,data) {
    console.info("deselect_node");
    $('#organ').val("");
    $('#principal').val("");
    $(this).hide();
});

//选中关联需求
$('#demandtree').on('select_node.jstree', function(e,data) {
    console.info("select_node");
    var ref = $(this).jstree(true);
    var nodes = ref.get_checked();  //使用get_checked方法
    $.each(nodes, function(i, nd) {
        if (nd != data.node.id)
            ref.uncheck_node(nd);
    });
    $('#demand').val(data.node.text);
    $('#demandid').val(data.node.id);
    console.log( $('#demand').val())
    console.log($('#demandid').val())
    $(this).hide();
});

//取消选中关联需求
$('#demandtree').on('deselect_node.jstree', function(e,data) {
    console.info("deselect_node");
    $('#demand').val("");
    $('#demandid').val("");
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
    if ($(e.target)[0] != $("#demand")[0]){
        $("#demandtree").hide();
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