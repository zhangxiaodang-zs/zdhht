/**
 * Created by PC on 2019-08-14.
 */
var regulateList= [];
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        //获取参数信息
        RegulateTable.init();
        //新增编辑系统控件初始化
        RegulateEdit.init();
    });
}

//获取参数信息
var RegulateTable = function () {
    var initTable = function () {
        var table = $('#regulate_table');
        pageLengthInit(table);
        table.dataTable({
            "language": TableLanguage,
            "bStateSave": false,
            "lengthMenu": TableLengthMenu,
            "destroy": true,
            "pageLength": PageLength,
            "pagingType": "bootstrap_extended",
            "serverSide": true,
            "processing": true,
            "searching": false,
            "ordering": false,
            "autoWidth": false,
            "ajax":function (data, callback, settings) {
                var formData = $(".inquiry-form").getFormData();
                var da = {
                    regname:formData.regname,
                    currentpage: (data.start / data.length) + 1,
                    pagesize: data.length === -1 ? "": data.length,
                    startindex: data.start,
                    draw: data.draw
                };
                regulateDataGet(da, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": null},
                { "data": "id", visible: false},
                { "data": "regname" },
                { "data": "parameter" },
                { "data": "remark" },
                { "data": "state" },
                { "data": null}
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
                    //状态
                    "targets": [6],
                    "render": function (data, type, row, meta) {
                        var state = "禁用";
                        if (data === "0") {
                            state = "启用"
                        }
                        return state;
                    }
                },{
                    "targets": [7],
                    "render": function (data, type, row, meta) {
                        if(!makeEdit(menu,loginSucc.functionlist,"#op_edit")) return '-';
                        return '<a href="javascript:;" id="op_edit">编辑</a>'
                    }
                }
            ],
            fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                $('td:eq(1)', nRow).attr('style', 'text-align: center;');
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

//新增编辑系统控件初始化
var RegulateEdit = function() {
    var handleRegister = function() {
        var validator = $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                regname: {
                    required: true,
                    parameter: true
                },
                parameter: {
                    required: true
                }
            },
            messages: {
                regname: {
                    required: "参数名称必须输入"
                },
                parameter: {
                    required: "参数值必须输入"
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

        // 参数名称验证
        jQuery.validator.addMethod("parameter", function(value, element) {
            var tel = /^[a-zA-Z_][a-zA-Z0-9_]{1,}$/;
            return this.optional(element) || (tel.test(value));
        }, "仅能输入字母数字下划线，且首位不能是数字");

        //点击确定按钮
        $('#register-btn').click(function() {
            btnDisable($('#register-btn'));
            if ($('.register-form').validate().form()) {
                var regulate = $('.register-form').getFormData();
                if($("input[name=edittype]").val() == REGADD){
                    regAdd(regulate);
                }else{
                    regEdit(regulate);
                }
            }
        });
        //新增用户
        $('#op_add').click(function() {
            //清除校验错误信息
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("新增参数");
            $(":input",".register-form").not(":button,:reset,:submit,:radio").val("")
                .removeAttr("checked")
                .removeAttr("selected");
            $("select[name=state]").val("0");
            //操作类型
            $("input[name=edittype]").val(REGADD);
            $('#edit_regulate').modal('show');
        });
        //编辑参数
        $('#regulate_table').on('click', '#op_edit', function (e) {
            e.preventDefault();
            //清除校验错误信息
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("编辑参数");
            var exclude = [];
            var row = $(this).parents('tr')[0];
            var id = $("#regulate_table").dataTable().fnGetData(row).id;
            var regulate = new Object();
            for(var i=0; i < regulateList.length; i++){
                if(id == regulateList[i].id){
                    regulate = regulateList[i];
                }
            }
            var options = { jsonValue: regulate, exclude:exclude,isDebug: false};
            $(".register-form").initForm(options);
            $("input[name=edittype]").val(REGEDIT);
            $('#edit_regulate').modal('show');
        });
    };
    return {
        init: function() {
            handleRegister();
        }
    };
}();

//删除
var RegulateDelete = function() {
    $('#op_del').click(function() {
        var len = $(".checkboxes:checked").length;
        if(len < 1){
            alertDialog("至少选中一项！");
        }else{
            confirmDialog("数据删除后将不可恢复，您确定要删除吗？", RegulateDelete.deleteReaulate)
        }
    });
    return{
        deleteReaulate: function(){
            var regulatelist = {idlist:[]};
            $(".checkboxes:checked").parents("td").each(function () {
                var row = $(this).parents('tr')[0];     //通过获取该td所在的tr，即td的父级元素，取出第一列序号元素
                var id = $("#regulate_table").dataTable().fnGetData(row).id;//得到这一行的json数据
                regulatelist.idlist.push(id);
            });
            regDelete(regulatelist);
        }
    }
}();

//查询参数
$("#reg_inquiry").click(function(){
    RegulateTable.init();
});

function getRegulateDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.retcode == SUCCESS) {
            var res = result.response;
            regulateList = res.reglist;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.reglist, callback);
            //遍历
            for(var i in regulateList){
                regulateSucc[regulateList[i].regname] = regulateList[i].parameter;
            }
            localStorage.setItem("regulate", JSON.stringify(regulateSucc));
        }else{
            tableDataSet(0, 0, 0, [], callback);
            alertDialog("系统参数获取失败！");
        }
    }else{
        tableDataSet(0, 0, 0, [], callback);
        alertDialog("系统参数获取失败！");
    }
}

//新增信息返回结果
function regInfoEditEnd(flg, result, type){
    var res = "失败";
    var text = "";
    var alert = "";
    switch (type){
        case REGADD:
            text = "新增";
            break;
        case REGDELETE:
            text = "删除";
            break;
        case REGEDIT:
            text = "编辑";
            break;
    }
    if(flg){
        if(result && result.retcode !== SUCCESS){
            alert = result.retmsg;
        }
        if (result && result.retcode === SUCCESS) {
            res = "成功";
            RegulateTable.init();
            $('#edit_regulate').modal('hide');
        }
    }
    if(alert == "") alert = text + "参数" + res + "！";
    App.unblockUI('#lay-out');
    alertDialog(alert);
}