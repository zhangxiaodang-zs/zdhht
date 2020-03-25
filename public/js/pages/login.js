var loginSucc = new Object();

jQuery(document).ready(function() {
    $('#username').focus();
   // localStorage.clear();
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var oRemember = document.getElementById('remember');
    //页面初始化时，如果帐号密码cookie存在则填充
    if(getCookie('username') && getCookie('password')){
        console.log("存在")
        username.value = getCookie('username');
        password.value = getCookie('password');
        oRemember.checked = true;
    }
    //复选框勾选状态发生改变时，如果未勾选则清除cookie
    oRemember.onchange = function(){
        if(!this.checked){
            delCookie('username');
            delCookie('password');
        }
    };
    Login.init();

});


var Login = function() {

    var handleLogin = function() {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },

            messages: {
                username: {
                    required: "用户名必须输入."
                },
                password: {
                    required: "密码必须输入."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                //$('.alert-danger', $('.login-form')).show();
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
                if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                form.submit(); // form validation success, call ajax form submit
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    //校验用户名和密码
                    var logData = $('.login-form').getFormData();
                    loginCheck([logData.username, hex_md5(logData.password)]);
                }
                return false;
            }
        });

        $('#login-btn').click(function(){
            if(remember.checked){
                setCookie('username',username.value,7); //保存帐号到cookie，有效期7天
                setCookie('password',password.value,7); //保存密码到cookie，有效期7天
            }
            if ($('.login-form').validate().form()) {
                //校验用户名和密码
                var logData = $('.login-form').getFormData();
                loginCheck([logData.username, hex_md5(logData.password)]);
            }
        });
    };
    return {
        init: function() {
            handleLogin();

        }
    };
}();

function loginCheckEnd(flg, result){
    if(flg){
        if (result && result.retcode == SUCCESS){
            loginSucc = result.response;
            localStorage.setItem("repassword", loginSucc.repassword);
            //登录成功后，向后台发送参数请求
            //regulateDataGet();
            localStorage.setItem("regulate", JSON.stringify(regulateSucc));
            //获取用户权限
            var data = {
                userid: loginSucc.userid,
                currentpage: "",
                pagesize: "",
                startindex: "0",
                draw: 1
            };
            userPowerDataGet(data);
        }else{
            App.unblockUI('.login-container');
            $('.alert-danger', $('.login-form')).show();
            $('.alert-danger span', $('.login-form')).text(result.retmsg);
        }
    }else{
        App.unblockUI('.login-container');
        //userPowerDataGet();
        $('.alert-danger', $('.login-form')).show();
        $('.alert-danger span', $('.login-form')).text("登录失败");
    }
}


function getUserPowerEnd(flg, result){
    if(flg){
        if (result && result.retcode == SUCCESS){
            loginSucc.menulist = result.response.menulist;
            var menuList = [];
            powerMenuGet(loginSucc.menulist, menuList);
            //获取用户功能权限
            var data = {
                userid:loginSucc.userid,
                menuid:menuList
            };
            userFunctionListGet(data);
        }else{
            App.unblockUI('.login-container');
            $('.alert-danger', $('.login-form')).show();
            $('.alert-danger span', $('.login-form')).text(result.retmsg);
        }
    }else{
        App.unblockUI('.login-container');
        $('.alert-danger', $('.login-form')).show();
        $('.alert-danger span', $('.login-form')).text("获取用户权限失败");
    }
}

function userFunctionListEnd(flg, result){
    if(flg){
        if (result && result.retcode == SUCCESS){
            loginSucc.functionlist = result.response;
            loginSubmit(loginSucc);
        }else{
            App.unblockUI('.login-container');
            $('.alert-danger', $('.login-form')).show();
            $('.alert-danger span', $('.login-form')).text(result.retmsg);
        }
    }else{
        App.unblockUI('.login-container');
        $('.alert-danger', $('.login-form')).show();
        $('.alert-danger span', $('.login-form')).text("获取用户权限失败");
    }
}

function loginSubmit(data){
    console.info(data);
    var form = $(".login-form");
    form[0].action = "main";
    form.append($("<input/>").attr("type", "hidden").attr("name", "loginsucc").attr("value", JSON.stringify(data)));
    form.submit();
    App.unblockUI('.login-container');
}

//获取参数请求返回结果
function getRegulateDataEnd(flg, result){
    if(flg) {
        if (result && result.retcode === SUCCESS) {
            var regulatelist = result.response.reglist;
            //遍历
            for(var i in regulatelist){
                regulateSucc[regulatelist[i].regname] = regulatelist[i].parameter;
            }
            //loginSucc.regulate = regulateSucc;
            localStorage.setItem("regulate", JSON.stringify(regulateSucc));
            //获取用户权限
            var data = {
                userid: loginSucc.userid,
                currentpage: "",
                pagesize: "",
                startindex: "0",
                draw: 1
            };
            userPowerDataGet(data);
        }else {
            App.unblockUI('.login-container');
            $('.alert-danger', $('.login-form')).show();
            $('.alert-danger span', $('.login-form')).text("系统参数获取失败！");
        }
    }else{
        App.unblockUI('.login-container');
        $('.alert-danger', $('.login-form')).show();
        $('.alert-danger span', $('.login-form')).text("系统参数获取失败！");
    }
}

function powerMenuGet(menuList, powerMenu){
    for(var menu in menuList){
        if(menuList[menu].power != 1){
            continue;
        }else{
            if(menuList[menu].hasOwnProperty("menulist") && menuList[menu].menulist !== undefined && menuList[menu].menulist !== null ){
                powerMenuGet(menuList[menu].menulist, powerMenu);
            }else{
                powerMenu.push(menuList[menu].menucode)
            }
        }
    }
}

/*—————————记住密码———————————*/
//设置cookie
function setCookie(name,value,day){
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires='+ date;
};
//获取cookie
function getCookie(name){
    var reg = RegExp(name+'=([^;]+)');
    var arr = document.cookie.match(reg);
    if(arr){
        return arr[1];
    }else{
        return '';
    }
};
//删除cookie
function delCookie(name){
    setCookie(name,null,-1);
};



