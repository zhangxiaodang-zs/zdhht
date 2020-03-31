/**
 * Created by Administrator on 2019/2/19.
 */

//var hostIp = "http://127.0.0.1:";

// var regulateSucc = {
//     "uploadFolder" : "/home/yfdev/src/ywt_web",                       // 上传文件所在文件夹
//     "loginUrl" : hostIp + "8001/gramtu/ac/web/",                      // 登录URL
//     "userHostUrl" : hostIp + "8001/gramtu/ac/web/front/",             // 用户相关URL
//     "gramtuWebUrl": hostIp + "8002/gramtu/web/"                       // web端URL
// };

var hostIp = "http://47.75.53.10";
var regulateSucc = {
    "uploadFolder" : "8001/home/yfdev/src/ywt_web",                       // 上传文件所在文件夹
    "loginUrl" : hostIp + "/zsdev/ac/web/",                     // 登录URL   "/gramtu/ac/web/"  /ntocc/ntocc-ac/web/
    "userHostUrl" : hostIp + "/zsdev/ac/web/front/",              // 用户相关URL（无车运平台系统管理）   "/gramtu/ac/web/front/"  /ntocc/ntocc-ac/api/web/
    "businessUrl": hostIp + "/zsdev/web/web/front/"            //无车运平台（基础数据管理）相关
};

// var hostIp = "http://192.168.10.14:";
// var regulateSucc = {
//     "uploadFolder" : "D:/gramtu",                       // 上传文件所在文件夹
//     "loginUrl" : hostIp + "8001/zsdev/ac/web/",                     // 登录URL   "/gramtu/ac/web/"  /ntocc/ntocc-ac/web/
//     "userHostUrl" : hostIp + "8001/zsdev/ac/web/front/",              // 用户相关URL（无车运平台系统管理）   "/gramtu/ac/web/front/"  /ntocc/ntocc-ac/api/web/
//     "businessUrl": hostIp+"8002/zsdev/web/web/front/"            //无车运平台（基础数据管理）相关
// };


const SUCCESS = "0000";

const DEFAULT = 0;
const USERADD = 1;
const USEREDIT = 2;
const USERDELETE = 3;
const LOGIN = 4;
const ROLEADD = 5;
const ROLEEDIT = 6;
const ROLEDELETE = 7;
const ORGANLIST = 8;
const ARTICLEADD = 9;
const ORGANADD = 10;
const ORGANEDIT = 11;
const ORGANDELETE = 12;
const SERVADD = 13;
const SERVEDIT = 14;
const SERVDELETE = 15;
const ARTDELETE = 16;
const COUPADD = 17;
const COUPEDIT = 18;
const COUPDELETE = 19;
const PRICEADD = 20;
const PRICEEDIT = 21;
const PRICEDELETE = 22;
const ABROADADD = 23;
const ABROADDELETE = 24;
const MENUADD = 26;
const MENUEDIT = 27;
const MENUDELETE = 28;
const FUNCTIONADD = 29;
const FUNCTIONEDIT = 30;
const FUNCTIONDELETE = 31;
const ARTEDIT = 32;
const ABROADEDIT = 33;
const NEWBORNADD = 34;
const ADADD = 35;
const ADDELETE = 36;
const ADEDIT = 37;
const NEWBORNEDIT = 38;
const NEWBORNDELETE = 39;
const MANMADEEDIT = 40;

const QRCODEADD = 41;
const QRCODEDELETE = 42;
const IMAGERESULTDELETE = 43;
const IMAGERESULTEDIT = 44;
const SPADD = 45;
const SPEDIT = 46;
const SPDELETE = 47;
const COUNTYADD = 48;
const COUNTYDELETE = 49;
const REGDELETE = 50;
const REGADD = 51;
const REGEDIT = 52;
const COUNTYEDIT = 53;
const COUNTEDIT = 54;
const COUNTADD = 55;
const COUNTDELETE = 49;
const COUNTKJYPE = 50;
const PROJECTADD = 51;
const PROJECTEDIT = 52;
const PROJECTDELETE = 53;
const PROJECTSTATUS = 54;
const VEHICEADD = 55;
const VEHICEEDIT = 56;
const VEHICEDELETE = 57;
const VEHICEUPLOAD = 58;
const DRIVERADD = 59;
const DRIVEREDIT = 60;
const DRIVERDELETE = 61;
const DRIVERUPLOAD = 62;
const DRIVERSTATUS = 63;
const CONSIGNORADD = 64;
const CONSIGNOREDIT = 65;
const CONSIGNORDELETE = 66;
const BILLADD = 67;
const BILLEDIT = 68;
const BILLDELETE = 69;
const BILLUPLOAD = 89;
const LINEADD = 70;
const LINEEDIT = 71;
const LINEDELETE =72;
const LINESTATUS =73;
const ADDRADD = 74;
const ADDRSEDIT = 75;
const ADDRDELETE = 76;
const GENNADD = 77;
const GENNEDIT = 78;
const GENNDELETE = 79;
const PAYEEADD = 80;
const PAYEEEDIT = 81;
const PAYEEDELETE = 82;
const PAYEESTATUS =82;
const GENNUPLOAD =83;
const USHADD = 84;
const USHEDIT = 85;
const USHDELETE = 86;
const USHSTATUS = 87;
const USHPLOAD = 88;
const USHCHECK = 90;
const INVREPLACE = 91;
const INVUPDATE = 92;
const VEHICEIMGUPLOAD = 93;
const DRIVERIMGUPLOAD = 94;



const TableLanguage = {
        "aria": {
            "sortAscending": ": 以升序排列此列",
                "sortDescending": ": 以降序排列此列"
        },
        "emptyTable": "暂无数据",
        "info": "当前显示第 _START_ 到 _END_ 项，共 _TOTAL_项",
        "infoEmpty": "当前显示第 0 至 0 项，共 0 项",
        "infoFiltered": "(由 _MAX_ 项结果过滤)",
        "lengthMenu": "每页 _MENU_ 条",
        "search": "搜索:",
        "zeroRecords": "没有匹配的数据",
        "paginate": {
            "previous":"上一页",
            "next": "下一页",
            "last": "首页",
            "first": "末页",
            "page": "第",
            "pageOf": "共"
        },
        "processing": "正在加载中......"
    };
const TableLengthMenu = [
        [10, 20, 30, 50, -1],
        [10, 20, 30, 50, "所有"], // change per page values here
        [20, 30, 50, 100]
    ];

var PageLength = 50;
//测试数据
var userMenuList = {
    menulist:[
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
        {"menuid":"organmanager","menutype":0,sort:"0", power:"1", "menuname":"机构管理","url":"", menuicon:"icon-badge",
            "menulist":[
                {"menuid":"organ","menutype":1,sort:"0", power:"1", "menuname":"机构管理","url":"organ", menuicon:"icon-home"},
                {"menuid":"station","menutype":1,sort:"1", power:"1", "menuname":"岗位管理","url":"station", menuicon:"icon-user-following"},
                {"menuid":"item","menutype":1,sort:"2", power:"1", "menuname":"事项管理","url":"item", menuicon:"icon-star"}
            ]
        },
        {"menuid":"evamanager","menutype":0,sort:"0", power:"1", "menuname":"评价管理","url":"", menuicon:"icon-envelope-letter",
            "menulist":[
                {"menuid":"evaluation","menutype":1,sort:"0", power:"1", "menuname":"评价管理","url":"evaluation", menuicon:"icon-home"},
                {"menuid":"userevalu","menutype":1,sort:"1", power:"1", "menuname":"用户评价","url":"userevalu", menuicon:"icon-user-following"}
            ]
        },
        {"menuid":"devicemanager","menutype":0,sort:"0", power:"1", "menuname":"终端管理","url":"", menuicon:"icon-screen-desktop",
            "menulist":[
                {"menuid":"area","menutype":1,sort:"0", power:"1", "menuname":"分区管理","url":"area", menuicon:"icon-home"},
                {"menuid":"device","menutype":1,sort:"1", power:"1", "menuname":"终端管理","url":"device", menuicon:"icon-user-following"}
            ]
        },
        {"menuid":"admanager","menutype":0,sort:"0", power:"1", "menuname":"广告管理","url":"", menuicon:"icon-picture",
            "menulist":[
                {"menuid":"ad","menutype":1,sort:"0", power:"1", "menuname":"广告管理","url":"ad", ad:"icon-home"}
            ]
        }
    ]
};