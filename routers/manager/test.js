/**
 * Created by Jianggy on 2019/6/14.
 */
var express = require('express');
var router = express.Router();

router.post('/userquery',function(req,res,next){
    console.info(req);
    console.info(req.body);
    //var draw = req.body.request.draw;
    var response = {
            head: {
                retcode:"0000"
            },
            response:{
                draw: 0,
                totalcount:"100",
                filtercount:"100",
                userlist:[
                    {"userid":"001","username":"张三","sex":"0","mail":"xxxxx@zzzz","phone":"13468052332","mobile":"12345678910z",
                        "organname":"XX机构","organid":"001","stationname":"岗位002","stationid":"002","rolenamelist":'管理员,技术部,财务部',
                        "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf",
                        mark: "5","rolename":"管理员","roleid":"001"
                    },{"userid":"002","username":"李四","sex":"0","mail":"xxxxx@zzzz","phone":"13468052332","mobile":"12345678910z",
                        "organname":"XX机构","organid":"001","stationname":"岗位002","stationid":"002","rolenamelist":'管理员,技术部,财务部',
                        "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf",
                        mark: "4.2","rolename":"技术部","roleid":"002"
                    },{"userid":"003","username":"王五","sex":"0","mail":"xxxxx@zzzz","phone":"13468052332","mobile":"12345678910z",
                        "organname":"YY机构","organid":"002","stationname":"岗位003","stationid":"003","rolenamelist":'管理员,技术部,财务部',
                        "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf", mark: "5",
                        "birthday":"20190101","rolename":"财务部","roleid":"003"
                    }
                ]
            }
        };
    res.send(
        response
    )
});

router.post('/rolequery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            rolelist:[
                {"roleid":"001","rolename":"管理员","remark":"xdfdsfsdf","operator":"张三","operatetime":"20190307111213","rolecode":"sf"},
                {"roleid":"002","rolename":"技术部","remark":"xdfdsfsdf","operator":"张三","operatetime":"20190307111213","rolecode":"dsf"},
                {"roleid":"003","rolename":"财务部","remark":"xdfdsfsdf","operator":"张三","operatetime":"20190307111213","rolecode":"sdf"}
            ]
        }
    };
    res.send(
        response
    )
});


// 系统增加
router.post('/regquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            reglist:[
                {"id":"001","code":"ZD001","parameter":"xdfdsfsdf","remark":"系统预置","source":"系统预置","state":"0"},
                {"id":"002","code":"ZD002","parameter":"xdfdsfsdf","remark":"系统预置","source":"系统预置","state":"0"},
                {"id":"003","code":"ZD003","parameter":"xdfdsfsdf","remark":"系统预置","source":"系统预置","state":"0"}
            ]
        }
    };
    res.send(
        response
    )
});
router.post('/organquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            organlist:[
                {"organid":"001","organcode":"001","organname":"XX机构","sort":"0","leader":"张三","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                {"organid":"002","organcode":"002","organname":"YY机构","sort":"1","leader":"李四","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                {"organid":"003","organcode":"003","organname":"ZZ机构","sort":"2","leader":"王五","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                {"organid":"004","organcode":"004","organname":"HH机构","sort":"3","leader":"赵六","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001",
                 "organlist":[
                     {"organid":"0041","organcode":"0041","organname":"HH1机构","sort":"0","leader":"张三","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                     {"organid":"0042","organcode":"0042","organname":"HH2机构","sort":"1","leader":"李四","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                     {"organid":"0043","organcode":"0043","organname":"HH3机构","sort":"2","leader":"王五","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001",
                         "organlist":[
                             {"organid":"00431","organcode":"00431","organname":"MM1机构","sort":"0","leader":"张三","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                             {"organid":"00432","organcode":"00432","organname":"MM2机构","sort":"1","leader":"李四","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                             {"organid":"00433","organcode":"00433","organname":"MM3机构","sort":"2","leader":"王五","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"}
                         ]}
                 ]},
                {"organid":"005","organcode":"005","organname":"HH机构","sort":"3","leader":"赵六","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001",
                    "organlist":[
                        {"organid":"0051","organcode":"0051","organname":"HH1机构","sort":"0","leader":"张三","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                        {"organid":"0052","organcode":"0052","organname":"HH2机构","sort":"1","leader":"李四","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                        {"organid":"0053","organcode":"0053","organname":"HH3机构","sort":"2","leader":"王五","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '002', areaname:"分区002",
                            "organlist":[
                                {"organid":"00531","organcode":"00531","organname":"MM1机构","sort":"0","leader":"张三","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '002', areaname:"分区002"},
                                {"organid":"00532","organcode":"00532","organname":"MM2机构","sort":"1","leader":"李四","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '002', areaname:"分区002"},
                                {"organid":"00533","organcode":"00533","organname":"MM3机构","sort":"2","leader":"王五","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '002', areaname:"分区002"}
                            ]}
                    ]}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/stationquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            stationlist:[
                {"stationid":"001","stationname":"岗位001","sort":"0","remark":"", organname: "XX机构", organid: "001", itemnamelist:'事项001', itemidlist:'001'},
                {"stationid":"002","stationname":"岗位002","sort":"0","remark":"", organname: "XX机构", organid: "001", itemnamelist:'事项001,事项004', itemidlist:'001,004'},
                {"stationid":"003","stationname":"岗位003","sort":"0","remark":"", organname: "YY机构", organid: "002", itemnamelist:'事项002', itemidlist:'002'},
                {"stationid":"004","stationname":"岗位004","sort":"0","remark":"", organname: "YY机构", organid: "002", itemnamelist:'事项002', itemidlist:'002'},
                {"stationid":"005","stationname":"岗位005","sort":"0","remark":"", organname: "ZZ机构", organid: "003", itemnamelist:'事项003', itemidlist:'003'},
                {"stationid":"006","stationname":"岗位006","sort":"0","remark":"", organname: "HH1机构", organid: "0041", itemnamelist:'事项005,事项006', itemidlist:'004,005'}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/itemquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            itemlist:[
                {"itemid":"001","itemname":"事项001","sort":"0","remark":"", organname: "XX机构", organid: "001"},
                {"itemid":"002","itemname":"事项002","sort":"1","remark":"", organname: "YY机构", organid: "002"},
                {"itemid":"003","itemname":"事项003","sort":"2","remark":"", organname: "ZZ机构", organid: "003"},
                {"itemid":"004","itemname":"事项004","sort":"3","remark":"", organname: "XX机构", organid: "001"},
                {"itemid":"005","itemname":"事项005","sort":"4","remark":"", organname: "HH1机构", organid: "0041"},
                {"itemid":"006","itemname":"事项006","sort":"5","remark":"", organname: "HH1机构", organid: "0041"},
                {"itemid":"007","itemname":"事项007","sort":"6","remark":"", organname: "HH1机构", organid: "0041"}
           ]
        }
    };
    res.send(
        response
    )
});

router.post('/devicequery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            devicelist:[
                {"deviceid":"001","devicename":"设备001","devicetype":"0","sort":"0","remark":"", areaname: "分区001", areaid: "001", stationname: "岗位001", stationid: "001"},
                {"deviceid":"002","devicename":"设备002","devicetype":"0","sort":"1","remark":"设备设备", areaname: "分区001", areaid: "001", stationname: "岗位001", stationid: "001"},
                {"deviceid":"003","devicename":"设备003","devicetype":"0","sort":"2","remark":"", areaname: "分区001", areaid: "001", stationname: "岗位001", stationid: "001"},
                {"deviceid":"004","devicename":"设备004","devicetype":"0","sort":"3","remark":"", areaname: "分区001", areaid: "001", stationname: "岗位002", stationid: "002"},
                {"deviceid":"005","devicename":"设备005","devicetype":"0","sort":"4","remark":"", areaname: "分区001", areaid: "001", stationname: "岗位003", stationid: "003"},
                {"deviceid":"006","devicename":"设备006","devicetype":"0","sort":"5","remark":"", areaname: "分区002", areaid: "002", stationname: "岗位004", stationid: "004"},
                {"deviceid":"007","devicename":"设备007","devicetype":"0","sort":"6","remark":"", areaname: "分区002", areaid: "002", stationname: "岗位005", stationid: "005"},
                {"deviceid":"008","devicename":"设备008","devicetype":"1","sort":"7","remark":"", areaname: "分区003", areaid: "003", stationname: "岗位006", stationid: "006"},
                {"deviceid":"009","devicename":"设备009","devicetype":"1","sort":"8","remark":"", areaname: "分区003", areaid: "003", stationname: "岗位006", stationid: "006"},
                {"deviceid":"010","devicename":"设备010","devicetype":"1","sort":"9","remark":"", areaname: "分区005", areaid: "005", stationname: "岗位006", stationid: "006"}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/areaquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            arealist:[
                {"areaid":"001","areaname":"分区001","sort":"0","remark":""},
                {"areaid":"002","areaname":"分区002","sort":"1","remark":""},
                {"areaid":"003","areaname":"分区003","sort":"2","remark":""},
                {"areaid":"004","areaname":"分区004","sort":"3","remark":""},
                {"areaid":"005","areaname":"分区005","sort":"4","remark":""}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/menuquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            menulist:[
                {"menuid":"usermanager","menutype":0,sort:"0", "menuname":"用户管理","url":"", menuicon:"icon-users",
                    "menulist":[
                        {"menuid":"user","menutype":1,sort:"0",  "menuname":"用户管理","url":"user", menuicon:"icon-user"},
                        {"menuid":"password","menutype":1,sort:"1", "menuname":"修改密码","url":"password", menuicon:"icon-lock"},
                        {"menuid":"role","menutype":1,sort:"2",  "menuname":"角色管理","url":"role", menuicon:"icon-badge"}
                    ]
                },
                {"menuid":"powermanager","menutype":0,sort:"0",  "menuname":"权限管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"menu","menutype":1,sort:"0", "menuname":"菜单管理","url":"menu", menuicon:"icon-home"},
                        {"menuid":"rolepower","menutype":1,sort:"1",  "menuname":"角色权限管理","url":"rolepower", menuicon:"icon-user-following"},
                        {"menuid":"userpower","menutype":1,sort:"2",  "menuname":"用户权限管理","url":"userpower", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"organmanager","menutype":0,sort:"0",  "menuname":"机构管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"organ","menutype":1,sort:"0", "menuname":"机构管理","url":"organ", menuicon:"icon-home"},
                        {"menuid":"station","menutype":1,sort:"1", "menuname":"岗位管理","url":"station", menuicon:"icon-user-following"},
                        {"menuid":"item","menutype":1,sort:"2",  "menuname":"事项管理","url":"item", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"evamanager","menutype":0,sort:"0", "menuname":"评价管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"evaluation","menutype":1,sort:"0",  "menuname":"评价管理","url":"evaluation", menuicon:"icon-home"},
                        {"menuid":"userevalu","menutype":1,sort:"1",  "menuname":"用户评价","url":"userevalu", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"devicemanager","menutype":0,sort:"0",  "menuname":"终端管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"area","menutype":1,sort:"0", "menuname":"分区管理","url":"area", menuicon:"icon-home"},
                        {"menuid":"device","menutype":1,sort:"1",  "menuname":"终端管理","url":"device", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"admanager","menutype":0,sort:"0",  "menuname":"广告管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"ad","menutype":1,sort:"0", "menuname":"广告管理","url":"ad", ad:"icon-home"}
                    ]
                },
                {"menuid":"regulatemanager","menutype":0,sort:"0",  "menuname":"系统参数管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"regulate","menutype":1,sort:"0", "menuname":"系统参数管理","url":"ad", ad:"icon-home"}
                    ]
                }
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/functionquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            functionlist:[
                {"id":"0","functioncode":"add","functionname":"增加","remark":"","power":"1"},
                {"id":"1","functioncode":"delete","functionname":"删除","remark":"","power":"1"},
                {"id":"2","functioncode":"edit","functionname":"修改","remark":"","power":"1"}
            ]
        }
    };
    res.send(
        response
    )
});

//评价查询
router.post('/evaluationquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw:draw,
            totalcount:"100",
            filtercount:"100",
            evaluationlist:[
                {"evaluationid":"13","evaluationcontent":"满意","evaluationtype":"0","evaluationtarget":"0","status":"0","mark":"5","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"14","evaluationcontent":"满意","evaluationtype":"0","evaluationtarget":"0","status":"0","mark":"5","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"15","evaluationcontent":"其他","evaluationtype":"2","evaluationtarget":"1","status":"0","mark":"0","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"16","evaluationcontent":"其他","evaluationtype":"2","evaluationtarget":"1","status":"0","mark":"0","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"01","evaluationcontent":"服务态度不积极、不主动","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.1","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"02","evaluationcontent":"办事效率低下、推诿扯皮","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.2","remark":"","sort":"1","operator":"2","operatetime":"20190620111213"},
                {"evaluationid":"03","evaluationcontent":"工作纪律不严肃、不规范","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.3","remark":"","sort":"1","operator":"3","operatetime":"20190620111213"},
                {"evaluationid":"04","evaluationcontent":"工作人员业务熟练程度不够","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.4","remark":"","sort":"1","operator":"4","operatetime":"20190620111213"},
                {"evaluationid":"05","evaluationcontent":"不一次性告知，导致“来回跑”","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.5","remark":"","sort":"1","operator":"5","operatetime":"20190620111213"},
                {"evaluationid":"06","evaluationcontent":"上班时间窗口空岗","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.6","remark":"","sort":"1","operator":"6","operatetime":"20190620111213"},
                {"evaluationid":"07","evaluationcontent":"事项办理收取办事指南以外多余材料","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.1","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"08","evaluationcontent":"事项办理流程与办事指南不符","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.2","remark":"","sort":"1","operator":"2","operatetime":"20190620111213"},
                {"evaluationid":"09","evaluationcontent":"办理事项不能再承诺时限内办结","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.3","remark":"","sort":"1","operator":"3","operatetime":"20190620111213"},
                {"evaluationid":"10","evaluationcontent":"事项办理存在跑多个部门的情况","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.4","remark":"","sort":"1","operator":"4","operatetime":"20190620111213"},
                {"evaluationid":"11","evaluationcontent":"许可事项办理存在明显错误","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.5","remark":"","sort":"1","operator":"5","operatetime":"20190620111213"},
                {"evaluationid":"12","evaluationcontent":"许可事项不予许可未说明原因","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.6","remark":"","sort":"1","operator":"6","operatetime":"20190620111213"}
            ]
        }
    };
    res.send(
        response
    )
});

//用户评价查询
router.post('/userevaluquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw:draw,
            totalcount:"100",
            filtercount:"100",
            userevlist:[
                {"userid":"001","username":"张三","itemnname":"XX事项","mark":"4.0",
                    "servicecontent":["服务态度不积极、不主动","xxxx"],"serviceother":"无","itemcontent":["服务态度不积极、不主动","xxxx"],"itemother":"服务态度不积极、不主动服务态度不积极、不主动服务态度不积极、不主动服务态度不积极、不主动",
                    "evaluationtype":"1","evatime":"20190628111213"},
                {"userid":"002","username":"张三","itemnname":"XX事项","mark":"5","servicecontent":["满意"],"serviceother":"","itemcontent":["满意"],"itemother":"",
                    "evaluationtype":"1","evatime":"20190628111213"}
            ]
        }
    };
    res.send(
        response
    )
});

//广告信息查询
router.post('/adquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw:draw,
            totalcount:"100",
            filtercount:"100",
            adlist:[
                {"adid":"001","imgename":"旅行青蛙","sort":"1","adsrc":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561367750546&di=4fb6ab8bfef63b610b83d2525290d9ab&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F23%2F20180223130511_eMx85.jpeg","other":"无","remark":"74","deviceidlist":"001,002","devicenamelist":"设备001,设备002"},
                {"adid":"002","imgename":"无","sort":"2","adsrc":"1","other":"无","remark":"70","deviceidlist":"001,002","devicenamelist":"设备001,设备002"}
            ]
        }
    };
    res.send(
        response
    )
});

//时间人员查询
router.post('/itemuserquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw:draw,
            totalcount:"100",
            filtercount:"100",
            userlist:[
                {"userid":"001","username":"张三","sex":"0","email":"xxxxx@zzzz","phone":"12345678910z","mobile":"12345678910z",
                    "organname":"XX机构","organid":"001","stationname":"岗位002","stationid":"002","rolenamelist":'管理员,技术部,财务部',
                    "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf", mark: "5"
                },{"userid":"002","username":"李四","sex":"0","email":"xxxxx@zzzz","phone":"12345678910z","mobile":"12345678910z",
                    "organname":"XX机构","organid":"001","stationname":"岗位002","stationid":"002","rolenamelist":'管理员,技术部,财务部',
                    "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf", mark: "4.2"
                },{"userid":"003","username":"王五","sex":"0","email":"xxxxx@zzzz","phone":"12345678910z","mobile":"12345678910z",
                    "organname":"YY机构","organid":"002","stationname":"岗位003","stationid":"003","rolenamelist":'管理员,技术部,财务部',
                    "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf", mark: "3.3",
                    "birthday":"20190101"
                }
            ],
            itemlist:[
                {"itemid":"001","itemname":"事项001","sort":"0","remark":"", organname: "XX机构", organid: "001"},
                {"itemid":"002","itemname":"事项002","sort":"1","remark":"", organname: "YY机构", organid: "002"},
                {"itemid":"003","itemname":"事项003","sort":"2","remark":"", organname: "ZZ机构", organid: "003"},
                {"itemid":"004","itemname":"事项004","sort":"3","remark":"", organname: "XX机构", organid: "001"},
                {"itemid":"005","itemname":"事项005","sort":"4","remark":"", organname: "HH1机构", organid: "0041"},
                {"itemid":"006","itemname":"事项006","sort":"5","remark":"", organname: "HH1机构", organid: "0041"},
                {"itemid":"007","itemname":"事项007","sort":"6","remark":"", organname: "HH1机构", organid: "0041"}
            ]
        }
    };
    res.send(
        response
    )
});

//时间人员查询
router.post('/tokenquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            token:"1234567890123456789"
        }
    };
    res.send(
        response
    )
});

router.post('/userpowerquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        "head": {
            "retmsg": "调用成功",
            "retcode": "0000"
        },
        "response": {
            "menulist": [{
                "menulist": [{
                    "menuname": "用户管理",
                    "fjdid": "6decf90f0b6248c182e1d73dcb246e0c",
                    "menuicon": "icon-users",
                    "menucode": "user",
                    "menutype": "2",
                    "menuid": "fcac059016724740a3697643cd1d161b",
                    "remark": "用户管理",
                    "sort": "1",
                    "power": "1",
                    "url": "user"
                }, {
                    "menuname": "修改密码",
                    "fjdid": "6decf90f0b6248c182e1d73dcb246e0c",
                    "menuicon": "icon-key",
                    "menucode": "password",
                    "menutype": "2",
                    "menuid": "a90fd521da4945598134456a829f6e5f",
                    "remark": "修改秘密",
                    "sort": "2",
                    "power": "1",
                    "url": "password"
                }, {
                    "menuname": "角色管理",
                    "fjdid": "6decf90f0b6248c182e1d73dcb246e0c",
                    "menuicon": "icon-user-following",
                    "menucode": "role",
                    "menutype": "2",
                    "menuid": "8d7070349dc548f691a0a5c22003226f",
                    "remark": "角色管理",
                    "sort": "3",
                    "power": "1",
                    "url": "role"
                }],
                "menuname": "用户管理",
                "fjdid": "",
                "menuicon": "icon-users",
                "menucode": "usermanager",
                "menutype": "1",
                "menuid": "6decf90f0b6248c182e1d73dcb246e0c",
                "remark": "用户管理",
                "sort": "1",
                "power": "1",
                "url": "usermanager"
            }, {
                "menulist": [{
                    "menuname": "菜单管理",
                    "fjdid": "87d56f018fca4de28e4a121fdafcddbf",
                    "menuicon": "icon-home",
                    "menucode": "menu",
                    "menutype": "2",
                    "menuid": "9fb45cb8fabf47bfac56d22e62a4613a",
                    "remark": "菜单管理",
                    "sort": "1",
                    "power": "1",
                    "url": "menu"
                }, {
                    "menuname": "角色权限管理",
                    "fjdid": "87d56f018fca4de28e4a121fdafcddbf",
                    "menuicon": "icon-user-following",
                    "menucode": "rolepower",
                    "menutype": "2",
                    "menuid": "97525df9abe64e0dbacbfcb60a4808ec",
                    "remark": "角色权限管理",
                    "sort": "2",
                    "power": "1",
                    "url": "rolepower"
                }, {
                    "menuname": "用户权限管理",
                    "fjdid": "87d56f018fca4de28e4a121fdafcddbf",
                    "menuicon": "icon-star",
                    "menucode": "userpower",
                    "menutype": "2",
                    "menuid": "f6d53cbc84b5487a89164f54c1f37f85",
                    "remark": "用户权限管理",
                    "sort": "3",
                    "power": "1",
                    "url": "userpower"
                }],
                "menuname": "权限管理",
                "fjdid": "",
                "menuicon": "icon-shield",
                "menucode": "powermanager",
                "menutype": "1",
                "menuid": "87d56f018fca4de28e4a121fdafcddbf",
                "remark": "权限管理",
                "sort": "2",
                "power": "1",
                "url": "powermanager"
            }, {
                "menulist": [{
                    "menuname": "机构管理",
                    "fjdid": "49480ff794d44043a6f2947f58ebdd81",
                    "menuicon": "icon-badge",
                    "menucode": "organ",
                    "menutype": "2",
                    "menuid": "8f2f910b5ee346248621028b34c3239b",
                    "remark": "机构管理",
                    "sort": "1",
                    "power": "1",
                    "url": "organ"
                }, {
                    "menuname": "岗位管理",
                    "fjdid": "49480ff794d44043a6f2947f58ebdd81",
                    "menuicon": "icon-user-following",
                    "menucode": "station",
                    "menutype": "2",
                    "menuid": "f05f33cabac74947b014a0d542e28c6d",
                    "remark": "岗位管理",
                    "sort": "2",
                    "power": "0",
                    "url": "station"
                }, {
                    "menuname": "事项管理",
                    "fjdid": "49480ff794d44043a6f2947f58ebdd81",
                    "menuicon": "icon-star",
                    "menucode": "item",
                    "menutype": "2",
                    "menuid": "ecbb6a818f214cc19b195d6084a82cf6",
                    "remark": "事项管理",
                    "sort": "3",
                    "power": "0",
                    "url": "item"
                }],
                "menuname": "机构管理",
                "fjdid": "",
                "menuicon": "icon-badge",
                "menucode": "organmanager",
                "menutype": "1",
                "menuid": "49480ff794d44043a6f2947f58ebdd81",
                "remark": "机构管理",
                "sort": "3",
                "power": "1",
                "url": "organmanager"
            }, {
                "menulist": [{
                    "menuname": "二维码生成",
                    "fjdid": "89842138135f4253ab1d836e44895a4f",
                    "menuicon": " icon-film",
                    "menucode": "makeqrcode",
                    "menutype": "2",
                    "menuid": "4aa126758e9146148660d2dd0b008ed5",
                    "remark": "二维码生成",
                    "sort": "1",
                    "power": "1",
                    "url": "makeqrcode"
                }, {
                    "menuname": "绑定图片上传",
                    "fjdid": "89842138135f4253ab1d836e44895a4f",
                    "menuicon": "icon-arrow-up",
                    "menucode": "imageupload",
                    "menutype": "2",
                    "menuid": "edd42273190f401e9b6515cf6d7feddf",
                    "remark": "绑定图片上传",
                    "sort": "2",
                    "power": "1",
                    "url": "imageupload"
                }, {
                    "menuname": "扫码次数查询",
                    "fjdid": "89842138135f4253ab1d836e44895a4f",
                    "menuicon": "icon-frame",
                    "menucode": "scanquery",
                    "menutype": "2",
                    "menuid": "edd42273190f401e9b6515cf6d7feddg",
                    "remark": "扫码次数查询",
                    "sort": "3",
                    "power": "1",
                    "url": "scanquery"
                }, {
                    "menuname": "图片处理结果",
                    "fjdid": "89842138135f4253ab1d836e44895a4h",
                    "menuicon": "icon-picture",
                    "menucode": "imageresult",
                    "menutype": "2",
                    "menuid": "edd42273190f401e9b6515cf6d7feddf",
                    "remark": "图片处理结果",
                    "sort": "4",
                    "power": "1",
                    "url": "imageresult"
                }],
                "menuname": "社保卡绑定",
                "fjdid": "",
                "menuicon": "icon-credit-card",
                "menucode": "cardbind",
                "menutype": "1",
                "menuid": "89842138135f4253ab1d836e44895a4f",
                "remark": "社保卡绑定",
                "sort": "4",
                "power": "1",
                "url": "cardbind"
            },{
              "menulist": [{
                    "menuname": "服务商管理",
                    "fjdid": "89842138135f4253ab1d836e44895a4a",
                    "menuicon": "icon-users",
                    "menucode": "ser_provider",
                    "menutype": "2",
                    "menuid": "4aa126758e9146148660d2dd0b008ed7",
                    "remark": "服务商管理",
                    "sort": "1",
                    "power": "1",
                    "url": "ser_provider"
                }],
                "menuname": "服务商管理",
                "fjdid": "",
                "menuicon": "icon-users",
                "menucode": "providermanager",
                "menutype": "1",
                "menuid": "89842138135f4253ab1d836e44895a4d",
                "remark": "服务商管理",
                "sort": "4",
                "power": "1",
                "url": ""
            },
            {
              "menulist": [{
                    "menuname": "县域管理",
                    "fjdid": "89842138135f4253ab1d836e44895a4s",
                    "menuicon": "icon-home",
                    "menucode": "county",
                    "menutype": "2",
                    "menuid": "4aa126758e9146148660d2dd0b008ed0",
                    "remark": "县域管理",
                    "sort": "1",
                    "power": "1",
                    "url": "county"
                }],
                "menuname": "县域管理",
                "fjdid": "",
                "menuicon": "icon-home",
                "menucode": "countymanager",
                "menutype": "1",
                "menuid": "89842138135f4253ab1d836e44895a4e",
                "remark": "服务商管理",
                "sort": "4",
                "power": "1",
                "url": ""
            }]
        }
    };
    res.send(
        response
    )
});

router.post('/userownpowerquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            menulist:[
                {"menuid":"usermanager","menutype":0,sort:"0", power:"1", "menuname":"用户管理","url":"", menuicon:"icon-users",
                    "menulist":[
                        {"menuid":"user","menutype":1,sort:"0", power:"1", "menuname":"用户管理","url":"user", menuicon:"icon-user"},
                        {"menuid":"password","menutype":1,sort:"1", power:"1", "menuname":"修改密码","url":"password", menuicon:"icon-lock"},
                        {"menuid":"role","menutype":1,sort:"2", power:"1", "menuname":"角色管理","url":"role", menuicon:"icon-badge"}
                    ]
                },
                {"menuid":"organmanager","menutype":0,sort:"0", power:"1", "menuname":"机构管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"organ","menutype":1,sort:"0", power:"1", "menuname":"机构管理","url":"organ", menuicon:"icon-home"},
                        {"menuid":"station","menutype":1,sort:"1", power:"1", "menuname":"岗位管理","url":"station", menuicon:"icon-user-following"},
                        {"menuid":"item","menutype":1,sort:"2", power:"1", "menuname":"事项管理","url":"item", menuicon:"icon-star"}
                    ]
                }
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/rolepowerquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        "head": {
            "retmsg": "调用成功",
            "retcode": "0000"
        },
        "response": {
            "menulist": [{
                "menulist": [{
                    "menuname": "用户管理",
                    "fjdid": "6decf90f0b6248c182e1d73dcb246e0c",
                    "menuicon": "icon-users",
                    "menucode": "user",
                    "menutype": "2",
                    "menuid": "fcac059016724740a3697643cd1d161b",
                    "sort": "1",
                    "power": "1",
                    "url": "user"
                }, {
                    "menuname": "修改密码",
                    "fjdid": "6decf90f0b6248c182e1d73dcb246e0c",
                    "menuicon": "icon-key",
                    "menucode": "password",
                    "menutype": "2",
                    "menuid": "a90fd521da4945598134456a829f6e5f",
                    "sort": "2",
                    "power": "1",
                    "url": "password"
                }, {
                    "menuname": "角色管理",
                    "fjdid": "6decf90f0b6248c182e1d73dcb246e0c",
                    "menuicon": "icon-user-following",
                    "menucode": "role",
                    "menutype": "2",
                    "menuid": "8d7070349dc548f691a0a5c22003226f",
                    "sort": "3",
                    "power": "1",
                    "url": "role"
                }],
                "menuname": "用户管理",
                "fjdid": "",
                "menuicon": "icon-users",
                "menucode": "usermanager",
                "menutype": "1",
                "menuid": "6decf90f0b6248c182e1d73dcb246e0c",
                "sort": "1",
                "power": "1",
                "url": "usermanager"
            }, {
                "menulist": [{
                    "menuname": "菜单管理",
                    "fjdid": "87d56f018fca4de28e4a121fdafcddbf",
                    "menuicon": "icon-home",
                    "menucode": "menu",
                    "menutype": "2",
                    "menuid": "9fb45cb8fabf47bfac56d22e62a4613a",
                    "sort": "1",
                    "power": "1",
                    "url": "menu"
                }, {
                    "menuname": "角色权限管理",
                    "fjdid": "87d56f018fca4de28e4a121fdafcddbf",
                    "menuicon": "icon-user-following",
                    "menucode": "rolepower",
                    "menutype": "2",
                    "menuid": "97525df9abe64e0dbacbfcb60a4808ec",
                    "sort": "2",
                    "power": "1",
                    "url": "rolepower"
                }, {
                    "menuname": "用户权限管理",
                    "fjdid": "87d56f018fca4de28e4a121fdafcddbf",
                    "menuicon": "icon-star",
                    "menucode": "userpower",
                    "menutype": "2",
                    "menuid": "f6d53cbc84b5487a89164f54c1f37f85",
                    "sort": "3",
                    "power": "1",
                    "url": "userpower"
                }],
                "menuname": "权限管理",
                "fjdid": "",
                "menuicon": "icon-shield",
                "menucode": "powermanager",
                "menutype": "1",
                "menuid": "87d56f018fca4de28e4a121fdafcddbf",
                "sort": "2",
                "power": "1",
                "url": "powermanager"
            }, {
                "menulist": [{
                    "menuname": "机构管理",
                    "fjdid": "49480ff794d44043a6f2947f58ebdd81",
                    "menuicon": "icon-badge",
                    "menucode": "organ",
                    "menutype": "2",
                    "menuid": "8f2f910b5ee346248621028b34c3239b",
                    "sort": "1",
                    "power": "1",
                    "url": "organ"
                }, {
                    "menuname": "岗位管理",
                    "fjdid": "49480ff794d44043a6f2947f58ebdd81",
                    "menuicon": "icon-user-following",
                    "menucode": "station",
                    "menutype": "2",
                    "menuid": "f05f33cabac74947b014a0d542e28c6d",
                    "sort": "2",
                    "power": "0",
                    "url": "station"
                }, {
                    "menuname": "事项管理",
                    "fjdid": "49480ff794d44043a6f2947f58ebdd81",
                    "menuicon": "icon-star",
                    "menucode": "item",
                    "menutype": "2",
                    "menuid": "ecbb6a818f214cc19b195d6084a82cf6",
                    "sort": "3",
                    "power": "0",
                    "url": "item"
                }],
                "menuname": "机构管理",
                "fjdid": "",
                "menuicon": "icon-badge",
                "menucode": "organmanager",
                "menutype": "1",
                "menuid": "49480ff794d44043a6f2947f58ebdd81",
                "sort": "3",
                "power": "1",
                "url": "organmanager"
            }, {
                "menulist": [{
                    "menuname": "二维码生成",
                    "fjdid": "89842138135f4253ab1d836e44895a4f",
                    "menuicon": " icon-film",
                    "menucode": "makeqrcode",
                    "menutype": "2",
                    "menuid": "4aa126758e9146148660d2dd0b008ed5",
                    "sort": "1",
                    "power": "1",
                    "url": "makeqrcode"
                }, {
                    "menuname": "绑定图片上传",
                    "fjdid": "89842138135f4253ab1d836e44895a4f",
                    "menuicon": "icon-arrow-up",
                    "menucode": "imageupload",
                    "menutype": "2",
                    "menuid": "edd42273190f401e9b6515cf6d7feddf",
                    "sort": "2",
                    "power": "1",
                    "url": "imageupload"
                }, {
                    "menuname": "扫码次数查询",
                    "fjdid": "89842138135f4253ab1d836e44895a4f",
                    "menuicon": "icon-frame",
                    "menucode": "scanquery",
                    "menutype": "2",
                    "menuid": "edd42273190f401e9b6515cf6d7feddg",
                    "sort": "3",
                    "power": "1",
                    "url": "scanquery"
                }, {
                    "menuname": "图片处理结果",
                    "fjdid": "89842138135f4253ab1d836e44895a4h",
                    "menuicon": "icon-picture",
                    "menucode": "imageresult",
                    "menutype": "2",
                    "menuid": "edd42273190f401e9b6515cf6d7feddf",
                    "sort": "4",
                    "power": "1",
                    "url": "imageresult"
                }],
                "menuname": "社保卡绑定",
                "fjdid": "",
                "menuicon": "icon-credit-card",
                "menucode": "cardbind",
                "menutype": "1",
                "menuid": "89842138135f4253ab1d836e44895a4f",
                "sort": "4",
                "power": "1",
                "url": "cardbind"
            }]
        }
    };
    res.send(
        response
    )
});


router.post('/userPowersquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            userquerylist:[
                {"menuid":"usermanager","menutype":0,sort:"0", power:"1", "menuname":"用户管理","url":"", menuicon:"icon-users",
                    "menulist":[
                        {"menuid":"user","menutype":1,sort:"0", power:"1", "menuname":"用户管理","url":"user", menuicon:"icon-user"},
                        {"menuid":"password","menutype":1,sort:"1", power:"1", "menuname":"修改密码","url":"password", menuicon:"icon-lock"},
                        {"menuid":"role","menutype":1,sort:"2", power:"1", "menuname":"角色管理","url":"role", menuicon:"icon-badge"}
                    ]
                },
                {"menuid":"powermanager","menutype":0,sort:"0", power:"1", "menuname":"权限管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"menu","menutype":1,sort:"0", power:"1", "menuname":"菜单管理","url":"menu", menuicon:"icon-home"},
                        {"menuid":"rolepower","menutype":1,sort:"1", power:"1", "menuname":"角色权限管理","url":"rolepower", menuicon:"icon-user-following"},
                        {"menuid":"userpower","menutype":1,sort:"2", power:"1", "menuname":"用户权限管理","url":"userpower", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"organmanager","menutype":0,sort:"0", power:"1", "menuname":"机构管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"organ","menutype":1,sort:"0", power:"1", "menuname":"机构管理","url":"organ", menuicon:"icon-home"},
                        {"menuid":"station","menutype":1,sort:"1", power:"1", "menuname":"岗位管理","url":"station", menuicon:"icon-user-following"},
                        {"menuid":"item","menutype":1,sort:"2", power:"1", "menuname":"事项管理","url":"item", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"evamanager","menutype":0,sort:"0", power:"1", "menuname":"评价管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"evaluation","menutype":1,sort:"0", power:"1", "menuname":"评价管理","url":"evaluation", menuicon:"icon-home"},
                        {"menuid":"userevalu","menutype":1,sort:"1", power:"1", "menuname":"用户评价","url":"userevalu", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"devicemanager","menutype":0,sort:"0", power:"1", "menuname":"终端管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"area","menutype":1,sort:"0", power:"1", "menuname":"分区管理","url":"area", menuicon:"icon-home"},
                        {"menuid":"device","menutype":1,sort:"1", power:"1", "menuname":"终端管理","url":"device", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"admanager","menutype":0,sort:"0", power:"1", "menuname":"广告管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"ad","menutype":1,sort:"0", power:"1", "menuname":"广告管理","url":"ad", ad:"icon-home"}
                    ]
                }
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/rolefunctionquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            functionlist:[
                {"id":"0","functionid":"add","functionname":"增加","remark":"", power:"1"},
                {"id":"1","functionid":"delete","functionname":"删除","remark":"", power:"1"},
                {"id":"2","functionid":"edit","functionname":"修改","remark":"", power:"0"}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/userfunctionquerys',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        "head": {
            "retmsg": "调用成功",
            "retcode": "0000"
        },
        "response": {
            "usermenulist": [{
                "functionlist": [{
                    "functionid": "26315751ca644f049a93214211e8a171",
                    "remark": "添加用户",
                    "power": "1",
                    "functioncode": "op_add",
                    "functionname": "添加用户"
                }, {
                    "functionid": "387df194d21b4922b5ee6881369b90f8",
                    "remark": "重置密码",
                    "power": "1",
                    "functioncode": "password_reset",
                    "functionname": "重置密码"
                }, {
                    "functionid": "58a001fa80644d5a8091c88cd297583a",
                    "remark": "删除用户",
                    "power": "1",
                    "functioncode": "op_del",
                    "functionname": "删除用户"
                }, {
                    "functionid": "72bd545a5a854d9d920188cbe1faca5b",
                    "remark": "用户编辑",
                    "power": "1",
                    "functioncode": "op_edit",
                    "functionname": "用户编辑"
                }],
                "menuid": "user"
            }, {
                "functionlist": [{
                    "functionid": "0497c237e9eb4ce48a80c31cce30324c",
                    "remark": "修改密码",
                    "power": "1",
                    "functioncode": "updatapassword",
                    "functionname": "修改密码"
                }],
                "menuid": "password"
            }, {
                "functionlist": [{
                    "functionid": "518f42a80141452bbc8279873e893c2b",
                    "remark": "角色删除",
                    "power": "1",
                    "functioncode": "op_del",
                    "functionname": "角色删除"
                }, {
                    "functionid": "9a244d32491747aa9c85eccf0d3bfefa",
                    "remark": "角色新增",
                    "power": "1",
                    "functioncode": "op_add",
                    "functionname": "角色新增"
                }, {
                    "functionid": "e01b8af531994f2ab82c306df6dedab9",
                    "remark": "角色编辑",
                    "power": "1",
                    "functioncode": "op_edit",
                    "functionname": "角色编辑"
                }],
                "menuid": "role"
            }, {
                "functionlist": [{
                    "functionid": "0f85970135ed40a49b1bc94a6fb95bb4",
                    "remark": "删除功能",
                    "power": "1",
                    "functioncode": "fun_delete",
                    "functionname": "删除功能"
                }, {
                    "functionid": "50d6c800ca784ed193aac052aa7f49d8",
                    "remark": "添加菜单",
                    "power": "1",
                    "functioncode": "op_add",
                    "functionname": "添加菜单"
                }, {
                    "functionid": "7460a5f69ab34cb0afb5d4ac4025c06a",
                    "remark": "删除菜单",
                    "power": "1",
                    "functioncode": "op_del",
                    "functionname": "删除菜单"
                }, {
                    "functionid": "c0eddae2b94d4693a48fec18729d741f",
                    "remark": "编辑功能",
                    "power": "1",
                    "functioncode": "function_edit",
                    "functionname": "编辑功能"
                }, {
                    "functionid": "d28158b045e5454492f2de5865564cef",
                    "remark": "新增功能",
                    "power": "1",
                    "functioncode": "fun_add",
                    "functionname": "新增功能"
                }, {
                    "functionid": "ddad46bdcbba44829bcff6caa4d63025",
                    "remark": "编辑菜单",
                    "power": "1",
                    "functioncode": "op_edit",
                    "functionname": "编辑菜单"
                }],
                "menuid": "menu"
            }, {
                "functionlist": [],
                "menuid": "rolepower"
            }, {
                "functionlist": [],
                "menuid": "userpower"
            }, {
                "functionlist": [{
                    "functionid": "7efa961ea87d426b9e9758db721a90e3",
                    "remark": "添加机构",
                    "power": "1",
                    "functioncode": "op_add",
                    "functionname": "添加机构"
                }, {
                    "functionid": "bbcab611ce034668b617de8f57b80677",
                    "remark": "删除机构",
                    "power": "1",
                    "functioncode": "op_del",
                    "functionname": "删除机构"
                }, {
                    "functionid": "d903e02673454a18b9cf2ceedae9a195",
                    "remark": "编辑机构",
                    "power": "1",
                    "functioncode": "op_edit",
                    "functionname": "编辑机构"
                }],
                "menuid": "organ"
            }, {
                "functionlist": [{
                    "functionid": "4c9ee5bde9ea4f7587cb65f6ec2fdeec",
                    "remark": "添加岗位",
                    "power": "1",
                    "functioncode": "op_add",
                    "functionname": "添加岗位"
                }, {
                    "functionid": "6b2967c9a65d482fbc7914ea9dfcb727",
                    "remark": "编辑岗位",
                    "power": "1",
                    "functioncode": "op_edit",
                    "functionname": "编辑岗位"
                }, {
                    "functionid": "6c82873adec241fcb91d43d7c7a308cc",
                    "remark": "删除岗位",
                    "power": "1",
                    "functioncode": "op_del",
                    "functionname": "删除岗位"
                }],
                "menuid": "station"
            }, {
                "functionlist": [{
                    "functionid": "2baee62fbbca48018f163b2c83d99226",
                    "remark": "编辑事项",
                    "power": "1",
                    "functioncode": "op_edit",
                    "functionname": "编辑事项"
                }, {
                    "functionid": "387cadbc33ec42e884024c870fbc0288",
                    "remark": "添加事项",
                    "power": "1",
                    "functioncode": "op_edit",
                    "functionname": "添加事项"
                }, {
                    "functionid": "fb8e3b76028c4eeabbbd632350ce3d36",
                    "remark": "删除事项",
                    "power": "1",
                    "functioncode": "op_del",
                    "functionname": "删除事项"
                }],
                "menuid": "item"
            }]
        }
    };
    res.send(
        response
    )
});

router.post('/spquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"6",
            filtercount:"6",
            splist:[
                {
                    "id": "0",
                    "spid": "00000",
                    "spname": "服务商1",
                    "sp_response": "张三",
                    "sp_phone": "111",
                    "county_list": [{
                        "code": "370101",
                        "name": "山东省济南市历下区"
                    }, {
                        "code": "370701",
                        "name": "山东省潍坊市潍城区"
                    }]
                },
                {
                    "id": "1",
                    "spid": "00001",
                    "spname": "服务商2",
                    "sp_response": "张三",
                    "sp_phone": "111",
                    "county_list": [{
                        "code": "370102",
                        "name": "山东省济南市历城区"
                    }, {
                        "code": "370702",
                        "name": "山东省潍坊市坊子区"
                    }]
                },
                {
                    "id": "3",
                    "spid": "00002",
                    "spname": "服务商3",
                    "sp_response": "张三",
                    "sp_phone": "111",
                    "county_list": [{
                        "code": "370101",
                        "name": "山东省济南市历下区"
                    }]
                },
                {
                    "id": "4",
                    "spid": "00003",
                    "spname": "服务商4",
                    "sp_response": "张三",
                    "sp_phone": "111",
                    "county_list": [{
                        "code": "370101",
                        "name": "山东省济南市历下区"
                    }, {
                        "code": "370701",
                        "name": "山东省潍坊市潍城区"
                    }]
                },
                {
                    "id": "5",
                    "spid": "00004",
                    "spname": "服务商5",
                    "sp_response": "张三",
                    "sp_phone": "111",
                    "county_list": [{
                        "code": "370101",
                        "name": "山东省济南市历下区"
                    }, {
                        "code": "370701",
                        "name": "山东省潍坊市潍城区"
                    }]
                },
                {
                    "id": "6",
                    "spid": "00005",
                    "spname": "服务商6",
                    "sp_response": "张三",
                    "sp_phone": "111",
                    "county_list": [{
                        "code": "370101",
                        "name": "山东省济南市历下区"
                    }, {
                        "code": "370701",
                        "name": "山东省潍坊市潍城区"
                    }]
                }
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/qrcodequery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"6",
            filtercount:"6",
            qrcodelist:[
                {"id":"0","spid":"00000","spname":"服务商1","qrcode":"http://localhost:9090/public/upload/00000.jpg"},
                {"id":"1","spid":"00001","spname":"服务商2","qrcode":"http://localhost:9090/public/upload/00001.jpg"},
                {"id":"3","spid":"00002","spname":"服务商3","qrcode":"http://localhost:9090/public/upload/00002.jpg"},
                {"id":"4","spid":"00003","spname":"服务商4","qrcode":"http://localhost:9090/public/upload/00003.jpg"},
                {"id":"5","spid":"00004","spname":"服务商5","qrcode":"http://localhost:9090/public/upload/00004.jpg"},
                {"id":"6","spid":"00005","spname":"服务商6","qrcode":"http://localhost:9090/public/upload/00005.jpg"}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/scanquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"6",
            filtercount:"6",
            scanlist:[
                {"id":"0","spid":"00000","spname":"服务商1","scandate":"20190808", "scantime":"111100"},
                {"id":"1","spid":"00001","spname":"服务商2","scandate":"20190808", "scantime":"111100"},
                {"id":"3","spid":"00002","spname":"服务商3","scandate":"20190808", "scantime":"111100"},
                {"id":"4","spid":"00003","spname":"服务商4","scandate":"20190808", "scantime":"111100"},
                {"id":"5","spid":"00004","spname":"服务商5","scandate":"20190808", "scantime":"111100"},
                {"id":"6","spid":"00005","spname":"服务商6","scandate":"20190808", "scantime":"111100"}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/imageresultquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"6",
            filtercount:"6",
            resultlist:[
                {"id":"0","spid":"00000","spname":"服务商1","imagename":"123456789.jpg","uname":"李四", "uid":"372325198808111234", "analysistime":"20190808122008"},
                {"id":"1","spid":"00001","spname":"服务商2","imagename":"123456789.jpg","uname":"李四一", "uid":"372325198808111234", "analysistime":"20190808122008"},
                {"id":"3","spid":"00002","spname":"服务商3","imagename":"123456789.jpg","uname":"李", "uid":"372325198808111234", "analysistime":"20190808122008"},
                {"id":"4","spid":"00003","spname":"服务商4","imagename":"123456789.jpg","uname":"李四", "uid":"372325198808111234", "analysistime":"20190808122008"},
                {"id":"5","spid":"00004","spname":"服务商5","imagename":"123456789.jpg","uname":"李四", "uid":"372325198808111234", "analysistime":"20190808122008"},
                {"id":"6","spid":"00005","spname":"服务商6","imagename":"123456789.jpg","uname":"李四", "uid":"372325198808111234", "analysistime":"20190808122008"}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/countyquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        "response": [{
            "code": "370000",
            "name": "山东省",
            "city": [{
                "code": "370100",
                "name": "济南",
                "county": [{
                    "code": "370101",
                    "name": "历下区"
                },
                    {
                        "code": "370102",
                        "name": "市中区"
                    }
                ]
            }]
        }, {
            "code": "360000",
            "name": "湖南省",
            "city": [{
                "code": "360100",
                "name": "长沙",
                "county": [{
                    "code": "360101",
                    "name": "长沙"
                }]
            }]
        }]
    };
    res.send(
        response
    )
});

router.post('/projectdataquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        retcode:"0000",
        response:{
            draw: draw,
            totalcount:"2",
            filtercount:"2",
            projectlist:[
                {
                    "proid":"001",
                    "proname":"项目1",
                    "linelist":[
                        {"lineid":"0001","line":"济南-潍坊"},
                        {"lineid":"0002","line":"济南-青岛"}
                    ],
                    "state":"0",
                    "addtime":"20200103124525",
                    "updatetime":"20200207041522"
                },
                {
                    "proid":"002",
                    "proname":"项目2",
                    "linelist":[
                        {"lineid":"0003","line":"济南-菏泽"},
                        {"lineid":"0004","line":"济南-泰安"}
                    ],
                    "state":"1",
                    "addtime":"20200203135558",
                    "updatetime":"20200210222222"
                }
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/routequery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        "response": {
            "totalcount": "1",
            "draw": "1",
            "list": [
                {
                    "loading_address": "花园路23号",
                    "consignee": "小红",
                    "addTime": "20200102084425",
                    "consigneeTel": "15288877732",
                    "lid": "70c2cabf02af425da02d4d12447cfdb1",
                    "univalence": "10000",
                    "goods": "煤炭",
                    "updateTime": "20200102084603",
                    "project_name": "测试",
                    "unloading_place": "山东省威海市文登区",
                    "operator": "admin",
                    "number": "10",
                    "unit": "吨",
                    "project_id": "6c747281f9dc46c2b2475bffd6a76a85",
                    "consignorTel": "15288877732",
                    "phone": "15288877732",
                    "loading_place": "山东省济南市平阴县",
                    "unloading_address": "文登路12号",
                    "organid": "6c747281f9dc46c2b2475bffd6a75b89",
                    "linename": "平阴→文登",
                    "goods_type": "煤炭及制品",
                    "state": "0",
                    "consignor": "小明",
                    "contacts": "线路人"
                }
            ]
        },
        "retmsg": "调用成功",
        "retcode": "0000"
    };
    res.send(
        response
    )
});

router.post('/vehicedataquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        "response": {
            "totalcount": "2",
            "draw": "1",
            "vehicleList": [
                {
                    "vehid": "001",
                    "platenumber": "鲁GNA637",
                    "platecolor": "01",
                    "vehicletype": "43",
                    "conductor": "05",
                    "load": "3",
                    "proprietor": "XXX",
                    "transport_number": "20200102084603",
                    "licensekey": "11111111",
                    "license_img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581241550051&di=872e90100701a9ed159cce9377426c21&imgtype=0&src=http%3A%2F%2Fwww.jingchen56.com%2FuFile%2F2310%2F20106510825295.jpg",
                    "addtime": "20200103124540",
                    "updatetime": "20200105031245",
                    "vin": "12345",
                    "energy_type": "01",
                    "office": "山东省潍坊市",
                    "issue_date": "20190516",
                    "nature": "货运",
                    "regdate": "20150214",
                    "total_mass": "10",
                    "transport_img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581241676920&di=238aff8c89b417d23300f512492af57f&imgtype=0&src=http%3A%2F%2F02.imgmini.eastday.com%2Fmobile%2F20180213%2F20180213102832_5c0c2d13a4a471e662fddd292635c916_8.jpeg",
                    "driving_img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581241441621&di=e4c342981d10df4a4b993de24846b1f7&imgtype=0&src=http%3A%2F%2F04imgmini.eastday.com%2Fmobile%2F20180906%2F20180906130645_a28b3ab24c37fcf51cb51a586012409a_1.jpeg",
                    "insurance_img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581242736111&di=434578e7f0ca4ac7f081a210a75cd503&imgtype=0&src=http%3A%2F%2Fpic5.997788.com%2Fpic_search%2F00%2F15%2F03%2F23%2Fse15032341a.jpg",
                    "group_photo": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581242818804&di=eae69fb48904f9c014f1f404227ae9a7&imgtype=0&src=http%3A%2F%2Fclub0.autoimg.cn%2Falbum%2Fuserphotos%2F2015%2F03%2F05%2F20%2F400_25588840-5763-4dl6-55t1-n204a9cb2ccb.jpg"
                },
                {
                    "vehid": "002",
                    "platenumber": "鲁BNA637",
                    "platecolor": "03",
                    "vehicletype": "43",
                    "conductor": "10",
                    "load": "3",
                    "proprietor": "XXX",
                    "transport_number": "20200102084603",
                    "licensekey": "11111111",
                    "license_img": "",
                    "addtime": "20200103124540",
                    "updatetime": "20200105031245",
                    "vin": "12345",
                    "energy_type": "01",
                    "office": "山东省青岛市",
                    "issue_date": "20190516",
                    "nature": "货运",
                    "regdate": "20150214",
                    "total_mass": "10",
                    "transport_img": "",
                    "driving_img": "http://02imgmini.eastday.com/mobile/20181225/20181225082859_7f1e2c9ba92fa1274a6447cc1822168b_2.jpeg",
                    "insurance_img": "",
                    "group_photo": ""
                }
            ]
        },
        "retmsg": "调用成功",
        "retcode": "0000"
    };
    res.send(
        response
    )
});

router.post('/driverdataquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        retcode:"0000",
        response:{
            draw: draw,
            totalcount:"2",
            filtercount:"2",
            driverlist:[
                {
                    "did":"001",
                    "vehicle_id":"0001",
                    "receivables_id":"111",
                    "receivables":"收款人甲",
                    "name":"司机1",
                    "id_number":"370784199503228622",
                    "phone":"15166666666",
                    "quasi_driving":"1",
                    "qualification":"111",
                    "qualification_img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581343495798&di=84d8ee32efa208e27240c00e43143c72&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3Dea7afa8367380cd7e61ea5eb9944ad14%2Fe61190ef76c6a7ef941fad15fffaaf51f3de66c3.jpg",
                    "id_front":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581343421522&di=0beb0c051fcc2bb402334c7c464b508b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171103%2Fac2da7fba0d447ff8565b81694b4da5d.jpeg",
                    "id_back":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581343459038&di=600089548b1739e40c9329e398e207bd&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190219%2F57cd8413da3c45989c1521e45becf277.jpeg",
                    "driving_license":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3375234518,3242156892&fm=26&gp=0.jpg",
                    "driving_license_starttime":"20190516",
                    "driving_license_endtime":"20191203",
                    "state":"0",
                    "certification_authority":"济南市公安局",
                    "addTime":"20190515142315",
                    "updateTime":"20200112035644",
                    "operator":"操作人1",
                    "platenumber":"鲁ANA637",
                    "bank":"111111111111"
                },
                {
                    "did":"002",
                    "vehicle_id":"0002",
                    "receivables_id":"222",
                    "receivables":"收款人乙",
                    "name":"司机2",
                    "id_number":"370784199503228644",
                    "phone":"15166662221",
                    "quasi_driving":"3",
                    "qualification":"222",
                    "qualification_img":"",
                    "id_front":"",
                    "id_back":"",
                    "driving_license":"",
                    "driving_license_starttime":"20190516",
                    "driving_license_endtime":"20191203",
                    "state":"1",
                    "certification_authority":"安丘市公安局",
                    "addTime":"20190515142315",
                    "updateTime":"20200112035644",
                    "operator":"操作人2",
                    "platenumber":"鲁ANA637",
                    "bank":"22222222222222"
                }
            ]
        }
    };
    res.send(
        response
    )
});


router.post('/linequery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        "response": {
            "totalcount": "1",
            "draw": "1",
            "list": [
                {
                    "loading_address": "花园路23号",
                    "consigneeid": "小红",
                    "addTime": "20200102084425",
                    "consigneeTel": "15288877732",
                    "lid": "70c2cabf02af425da02d4d12447cfdb1",
                    "univalence": "10000",
                    "goods": "煤炭",
                    "updateTime": "20200102084603",
                    "project_name": "测试",
                    "unloading_place": "山东省威海市文登区",
                    "operator": "admin",
                    "number": "10",
                    "unit": "吨",
                    "project_id": "6c747281f9dc46c2b2475bffd6a76a85",
                    "consignorTel": "15288877732",
                    "phone": "15288877732",
                    "loading_place": "山东省济南市平阴县",
                    "unloading_address": "文登路12号",
                    "organid": "6c747281f9dc46c2b2475bffd6a75b89",
                    "linename": "平阴→文登",
                    "goods_type": "煤炭及制品",
                    "state": "0",
                    "consignorid": "小明",
                    "contacts": "线路人"
                }
            ]
        },
        "retmsg": "调用成功",
        "retcode": "0000"
    };
    res.send(
        response
    )
});




router.post('/dictquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        response:{
            draw: draw,
            totalcount:"6",
            filtercount:"6",
            projectlist:[
                {"lid":"00000","project_name":"项目1"},
                {"lid":"00001","project_name":"项目2"},
                {"lid":"00002","project_name":"项目3"},
                {"lid":"00003","project_name":"项目4"},
                {"lid":"00004","project_name":"项目5"},
                {"lid":"00005","project_name":"项目6"}
            ]
        },
        "retmsg": "调用成功",
        "retcode": "0000"
    };
    res.send(
        response
    )
});


router.post('/addressquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        response:{
            draw: draw,
            totalcount:"5",
            filtercount:"5",
            addressidlist:[
                {"aid":"001","mailing_address":"济南","address":"山东省济南市历城区","addressee":"张三","addresseeTel":"13468042332","updateTime":"20200102084603","email":"zhang@qq.com"},
                {"aid":"002","mailing_address":"济南","address":"山东省济南市市中区","addressee":"李四","addresseeTel":"13468042332","updateTime":"20200102084603","email":"li@qq.com"},
                {"aid":"003","mailing_address":"济南","address":"山东省济南市高新区","addressee":"王五","addresseeTel":"13468042332","updateTime":"20200102084603","email":"wang@qq.com"},
                {"aid":"004","mailing_address":"济南","address":"山东省济南市历下区","addressee":"赵六","addresseeTel":"13468042332","updateTime":"20200102084603","email":"zhao@qq.com"},
                {"aid":"005","mailing_address":"金娜","address":"山东省济南市天桥区","addressee":"刘七","addresseeTel":"13468042332","updateTime":"20200102084603","email":"liu@qq.com"}
            ]
        },
        "retmsg": "调用成功",
        "retcode": "0000"
    };
    res.send(
        response
    )
});

router.post('/googsquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        response:{
            draw: draw,
            totalcount:"3",
            filtercount:"3",
            linelist:[
                {"lid":"00000","goods":"吨"},
                {"lid":"00001","goods":"公斤"},
                {"lid":"00002","goods":"千进"}
            ]
        },
        "retmsg": "调用成功",
        "retcode": "0000"
    };
    res.send(
        response
    )
});


router.post('/billquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        "response": {
            "totalcount": "1",
            "draw": "1",
            "list": [
                {
                    "wid": "001", //运单id
                    "project_name": "测试项目668",
                    "project_id": "6c747281f9dc46c2b2475bffd6a76a85",
                    "linename": "平阴→文登",
                    "line_id": "70c2cabf02af425da02d4d12447cfdb1",
                    "consignee_id": "",
                    "consignee": "张山",
                    "consignor_id": "",
                    "consignor": "测试4",
                    "consigneeTel": "15100000001",
                    "consignorTel": "15245678911",
                    "orderMaking_time": "20200216", //制单时间
                    "planTime": "20200315", //计划发车时间
                    "vehicle_id": "601c0866d5e9432991e7ce9e0f023222",
                    "plate_number": "鲁ANA637",
                    "load": "30",
                    "driver_id": "00d4e8a490624538951bd2c25c2e30ea",
                    "name": "测试司机3", //司机姓名
                    "id_number":"370133199807165500",
                    "goods_type": "06",
                    "goods": "钢筋,水泥",
                    "number": "40",
                    "loading_place": "济南",
                    "unloading_place": "潍坊",
                    "univalence": "1234", // 货物单价
                    "odd_numbers": "233333", //自定义单号
                    "remarks": "没有",
                    "loading_time": "",
                    "disburden_time": "",
                    "freight":"2222",//运费
                    "oil_fee":"",
                    "state":"01", //运单状态
                    "wabill_numbers": "1234567890", //运单号
                    "pay_state": "01", //支付状态
                    "unit":"01"
                }
            ]
        },
        "retmsg": "调用成功",
        "retcode": "0000"
    };
    res.send(
        response
    )
});

module.exports = router;