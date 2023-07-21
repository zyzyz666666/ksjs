"uii"

var window = floaty.window(
    <frame gravity="center">
        <button id="closeBtn" text="强制关闭" w="auto" h="auto" bg="#ff0000" />
        <text id="status" text="运行状态：停止" textSize="22sp" textColor="#778899" />//
    </frame>
);

var filePathksjs = '/sdcard/ksjs.js';


window.setPosition(device.width / 3, 0);
window.setSize(device.width * 1 / 2, 250);
window.setAdjustEnabled(false);

var statusText = window.status;

window.closeBtn.click(() => {//
    log("程序即将关闭");
    engines.stopAll();
    engines.execScriptFile("main.js");
});

function lloogg(msg) {
    log(msg);
    ui.run(function () {
        statusText.setText(msg);
    });

    setTimeout(function () {
        ui.run(function () {
            statusText.setText("");
        });
    }, 1000); // 延迟一秒后清除文本
};



function upslide() {
    var c = device.width;
    var b = device.height;
    lloogg("⬆正在滑动向上滑动");
    swipe(c * 4 / 5, b / 10 * 8, c * 4 / 5, b / 10 * 2, 660);
};

function downslide() {
    var c = device.width;
    var b = device.height;
    lloogg("↓正在滑动向上滑动");
    swipe(c * 4 / 5, b / 10 * 2, c * 4 / 5, b / 10 * 8, 660);
};


function goandearn() {
    var quzhaunqian = text("去赚钱").findOne(5000);
    if (quzhaunqian) {
        //     if (quzhaunqian.visibleToUser() == true) {
        //         for (qzq = 1; qzq > 0; qzq++) {
        //             click(quzhaunqian.bounds().centerX(), quzhaunqian.bounds().centerY());
        //             var 抵用金 = textContains("抵用金").findOne(1000);
        //             if (抵用金 && 抵用金.visibleToUser() == true) {
        //                 lloogg("在任务中心界面");
        //                 break;
        //             } else {
        //                 continue;
        //             };
        //         };
        //     } else {
        for (qzq = 1; qzq > 0; qzq++) {
            if (qzq == 15) {
                lloogg("识别超时，正在重启");
                yy();
            } else {
                lloogg("正在调用abclick1");
                click(a, b);
                var 抵用金 = textContains("抵用金").findOne(1000);
                try {
                    var diyongjin = 抵用金.visibleToUser()
                } catch (e) {
                    diyongjin = false;
                }

                if (抵用金 && diyongjin == true) {
                    lloogg("在任务中心界面");
                    lloogg("若出现点赞，等待自查找");
                    break;
                } else {
                    continue;
                };

            }
            toastLog("等待" + (15 - qzq) + "次")
        };
    } else {
        back();
    }
    // } else {
    // //     lloogg("不在")
    // }
};


function real_click(obj) {
    for (let i = 1; i <= 3; i++) {
        if (obj.click()) { lloogg("real click: true"); return true; }
        sleep(300);
    }
    console.warn("控件无法正常点击：", obj);
    lloogg("尝试再次点击");
    click(obj.bounds().centerX(), obj.bounds().centerY());
    return false;
};

//允许
function permit() {
    threads.start(function () {
        var btn = className("android.widget.Button").textMatches(/确定|允许|confirm|permit/).findOne(5000);
        if (btn) {
            sleep(1000);
            btn.click();
        };
    });
};

//始终允许
function alwayspermit() {
    threads.start(function () {
        var btn = className("android.widget.Button").textMatches(/允许|始终允许|permit/).findOne(5000);
        if (btn) {
            sleep(1000);
            btn.click();
        };
    });
};

function iknow() {
    threads.start(function () {
        var btn = className("android.widget.Button").textMatches(/我知道了|知道了|知道/).findOne(5000);
        if (btn) {
            sleep(1000);
            btn.click();
        };
    });
};

function exit_app(name) {
    // fClear();
    lloogg("尝试结束" + name + "APP");
    var packageName = getPackageName(name);
    if (!packageName) {
        if (getAppName(name)) {
            packageName = name;
        } else {
            return false;
        }
    }
    lloogg("打开应用设置界面");
    app.openAppSetting(packageName);
    var appName = app.getAppName(packageName);
    //lloogg(appName);
    lloogg("等待加载界面")
    //textMatches(/应用信息|应用详情/).findOne(5000);
    text(appName).findOne(5000);
    sleep(1500);
    lloogg("查找结束按钮")
    //let stop = textMatches(/(^强行.*|.*停止$|^结束.*)/).packageNameMatches(/.*settings.*|.*securitycenter.*/).findOne();
    let stop = textMatches(/(强.停止$|.*停止$|结束运行|停止运行|[Ff][Oo][Rr][Cc][Ee] [Ss][Tt][Oo][Pp])/).findOne();
    lloogg("stop:", stop.enabled())
    if (stop.enabled()) {
        //lloogg("click:", stop.click());
        real_click(stop);
        sleep(1000);
        lloogg("等待确认弹框")
        //let sure = textMatches(/(确定|^强行.*|.*停止$)/).packageNameMatches(/.*settings.*|.*securitycenter.*/).clickable().findOne();
        let sure = textMatches(/(确定|.*停止.*|[Ff][Oo][Rr][Cc][Ee] [Ss][Tt][Oo][Pp]|O[Kk])/).clickable().findOne(1500);
        if (!sure) {
            lloogg(appName + "应用已关闭");
            back();
            return false;
        }
        lloogg("sure click:", sure.click());
        lloogg(appName + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        lloogg(appName + "应用不能被正常关闭或不在后台运行");
        sleep(1000);
        back();
    }
    return true;
};

function doubleclickearnmoney() {
    var quzhaunqian = text("去赚钱").findOne(1000);
    if (quzhaunqian) {
        try {
            var qquzq = quzhaunqian.visibleToUser() == true
        } catch (e) {
            qquzq = false;
        }
        if (qquzq) {
            for (qzq = 1; qzq > 0; qzq++) {
                if (qzq == 15) {
                    lloogg("识别超时，正在重启");
                    yy();
                } else {
                    click(a, b);
                    sleep(50);
                    click(a, b);
                    var 在顶 = text("我的金币").findOne(1000) || text("我的抵用金").findOne(1000);
                    try {
                        var yyaiding = 在顶.visibleToUser()
                    } catch (e) {
                        yyaiding = false;
                    }
                    if (在顶 && yyaiding == true) {
                        lloogg("在任务中心顶");
                        break;
                    } else {
                        continue;
                    };

                }
                toastLog("等待" + (15 - qzq) + "次")
            };
        } else {
            for (qzq = 1; qzq > 0; qzq++) {
                if (qzq == 15) {
                    lloogg("识别超时，正在重启");
                    yy();
                } else {
                    lloogg("正在调用abclick2");
                    click(a, b);
                    sleep(50);
                    click(a, b);
                    var 在顶 = text("我的金币").findOne(1000) || text("我的抵用金").findOne(1000);
                    try {
                        var zaiding = 在顶.visibleToUser()
                    } catch (e) {
                        zaiding = false;
                    }
                    if (在顶 && zaiding == true) {
                        lloogg("在任务中心顶");
                        break;
                    } else {
                        continue;
                    };
                }
                toastLog("等待" + (15 - qzq) + "次")
            };
        };

    } else {
        lloogg("卡🙅‍了")
    };
};

function 签到() {
    // var G1 = text("gift-active-2x-0424").findOne(800);
    // var G2 = text("coins-active-2x-0424").findOne(800);
    // var G3 = text("redpack-active-2x-0424").findOne(800);
    var G11 = textContains("gift-active").findOne(1500);
    var G22 = textContains("coins-active").findOne(1500);
    var G33 = textContains("redpack-active").findOne(1500);
    var GG = null;
    var 中心签到 = 0;
    var 是弹窗签到 = 0;
    if ((G11 || G22 || G33)) {
        if (G11 != null) {
            var GG1 = G11.visibleToUser();
        };
        if (G22 != null) {
            var GG2 = G22.visibleToUser();
        };
        if (G33 != null) {
            var GG3 = G33.visibleToUser();
        };
        if (GG1 || GG2 || GG3) {

            log("发现签到");
            if (G11 && G11 !== null) {
                GG = G11;
            } else
                if (G22 && G22 !== null) {
                    GG = G22;
                } else
                    if (G33 && G33 !== null) {
                        GG = G33;
                    };
            //log(GG);
            try {
                var 签到条 = GG.parent().parent().parent().parent();
            } catch (e) {
                lloogg("No 签到条")
            }
            if (签到条) {
                log("签到条");
                var aa = Number;
                var bb = 签到条.indexInParent();
                if (bb == -1) {
                    aa = 2;
                } else if (bb >= 0) {
                    aa = 1;
                };
                try {
                    var 领签到 = 签到条.parent();
                } catch (e) {
                    lloogg("No 领签到")
                }
                if (领签到) {
                    log("正在判断签到");
                    if (领签到.children().length > 1) {
                        var rootElement = 领签到.child(bb + aa);
                        if (rootElement) {
                            log(rootElement.children().length);
                            if (rootElement.children().length > 1) {
                                中心签到 = 1;
                                log("是任务中心签到");
                            } else {
                                是弹窗签到 = 1;
                                log("是弹窗")
                            };
                            var x = 0;
                            var y = 0;
                            var a = null; // 定义为全局变量

                            function traverseChildren(element) {
                                if (element.childCount() === 0) {
                                    return;
                                };

                                var childCount = element.childCount();
                                for (var i = 0; i < childCount; i++) {
                                    var child = element.child(i);
                                    x = x + 1;
                                    //console.log(x + child.className());
                                    if (child.className() == "android.widget.Button") {
                                        a = element.child(i);
                                        y = y + 1;
                                    };
                                    traverseChildren(child);
                                };

                            };
                            traverseChildren(rootElement);
                            if (a !== null) {
                                log("找到按钮了");
                                if (a.visibleToUser() == true) {
                                    log("可签")
                                    //log(a);
                                    click(a.bounds().centerX(), a.bounds().centerY());
                                    if (中心签到 == 1) {
                                        alwayspermit();
                                        var 广子倒计时 = id("com.kuaishou.nebula.neo_video:id/video_countdown").findOne(10000);
                                        if (广子倒计时) {
                                            log("正在看广告");
                                            停留30秒倒计时();
                                            var 还没看完 = id("com.kuaishou.nebula.neo_video:id/close_dialog_ensure_text").findOne(5000);
                                            try {
                                                var hmkw = 还没看完.text();
                                            } catch (error) {
                                                var hmkw = null || undefined;
                                            };
                                            if (hmkw !== "去完成任务") {
                                                log("还没看完,继续等待30秒");
                                                try {
                                                    var 还没看完button = idContains("com.kuaishou.nebula.neo_video:id/close_dialog_ensure").findOne(1000 * 15) || desc("dialog_positive_view").findOne(1000 * 15);
                                                    还没看完button.click();
                                                } catch (error) {
                                                    log("还没看完buttonz找不到");
                                                };
                                                停留30秒倒计时();
                                            } else {
                                                log("额外任务");
                                                try {
                                                    var 放弃button = idContains("com.kuaishou.nebula.neo_video:id/award_video_close_dialog_abandon").findOne(1000 * 15) || desc("dialog_negative_view").findOne(1000 * 15);
                                                    放弃button.click();
                                                } catch (error) {
                                                    log("放弃buttonz找不到");
                                                };
                                            };
                                        };
                                    };
                                    if (弹窗签到 = 1) {
                                        try {
                                            var seeagain = textMatches(/(看广告最高.*金币$)/).findOne(10000);
                                        } catch (error) {
                                        }
                                        if (seeagain) {
                                            click(a.bounds().centerX(), a.bounds().centerY());
                                            var 广子倒计时 = id("com.kuaishou.nebula.neo_video:id/video_countdown").findOne(10000);
                                            if (广子倒计时) {
                                                log("正在看广告");
                                                停留30秒倒计时();
                                                var 还没看完 = id("com.kuaishou.nebula.neo_video:id/close_dialog_ensure_text").findOne(5000);
                                                try {
                                                    var hmkw = 还没看完.text();
                                                } catch (error) {
                                                    var hmkw = null || undefined;
                                                };
                                                if (hmkw !== "去完成任务") {
                                                    log("还没看完,继续等待30秒");
                                                    try {
                                                        var 还没看完button = idContains("com.kuaishou.nebula.neo_video:id/close_dialog_ensure").findOne(1000 * 15) || desc("dialog_positive_view").findOne(1000 * 15);
                                                        还没看完button.click();
                                                    } catch (error) {
                                                        log("还没看完buttonz找不到");
                                                    };
                                                    停留30秒倒计时();
                                                } else {
                                                    log("额外任务");
                                                    try {
                                                        var 放弃button = idContains("com.kuaishou.nebula.neo_video:id/award_video_close_dialog_abandon").findOne(1000 * 15) || desc("dialog_negative_view").findOne(1000 * 15);
                                                        放弃button.click();
                                                    } catch (error) {
                                                        log("放弃buttonz找不到");
                                                    };
                                                };
                                            };
                                        };
                                    };
                                } else {
                                    log("不在视野内，不可签到")
                                }

                            };
                        };
                    } else {
                        lloogg("无需点击");
                    };
                } else {
                    log("无法判断签到");
                };
            } else {
                log("未找到签到条");
            };
        }
    };
};


function 日历签到() {
    try {
        var 日历 = textContains("calendar").findOne(1000) || textContains("日历").findOne(1000);
        if (日历) {
            log("签到日历");
            try {
                var parentj1 = 日历.parent().parent();
                if (parentj1) {
                    try {
                        var listqian = parentj1.parent().child(parentj1.indexInParent() + 1);
                        if (listqian) {
                            log("有日历list");
                            try {
                                var 签到target = listqian.child(0).child(1);
                                if (签到target) {
                                    click(签到target.button().centerX(), 签到target.button().centerY());
                                    var 广子倒计时 = id("com.kuaishou.nebula.neo_video:id/video_countdown").findOne(10000);
                                    if (广子倒计时) {
                                        log("正在看广告");
                                        停留30秒倒计时();
                                        var 还没看完 = id("com.kuaishou.nebula.neo_video:id/close_dialog_ensure_text").findOne(5000);
                                        try {
                                            var hmkw = 还没看完.text();
                                        } catch (error) {
                                            var hmkw = null || undefined;
                                        };
                                        if (hmkw !== "去完成任务") {
                                            log("还没看完,继续等待30秒");
                                            try {
                                                var 还没看完button = idContains("com.kuaishou.nebula.neo_video:id/close_dialog_ensure").findOne(1000 * 15) || desc("dialog_positive_view").findOne(1000 * 15);
                                                还没看完button.click();
                                            } catch (error) {
                                                log("还没看完buttonz找不到");
                                            };
                                            停留30秒倒计时();
                                        } else {
                                            log("额外任务");
                                            try {
                                                var 放弃button = idContains("com.kuaishou.nebula.neo_video:id/award_video_close_dialog_abandon").findOne(1000 * 15) || desc("dialog_negative_view").findOne(1000 * 15);
                                                放弃button.click();
                                            } catch (error) {
                                                log("放弃buttonz找不到");
                                            };
                                        };
                                    };
                                };
                            } catch (error) {
                                log("找不到日历签到button")
                            };
                        };
                    } catch (error) {
                        log("无日历list")
                    }
                }
            } catch (error) {
                log("只有日历无签到啊？")
            };
        };
    } catch (error) {
    };
};



//停留100秒滑动倒计时
function 停留100秒滑动() {
    var downup = 0;
    var jos = 1;
    for (gjdjs = 0; gjdjs < 103; gjdjs++) {
        downup = downup + 1;
        lloogg("等待" + (103 - gjdjs) + "秒后返回");
        sleep(1000);
        if (downup == 5 && jos % 2 === 0) {
            lloogg("上");
            downslide();
            jos = jos + 1;
            downup = 0;
        } else if (downup == 5 && jos % 2 !== 0) {
            lloogg("下");
            upslide();
            sleep(1500);
            jos = jos + 1;
            downup = 0;
        };
    };
};


//停留30秒倒计时
function 停留30秒倒计时() {
    for (ggdjs = 0; ggdjs < 30; ggdjs++) {
        lloogg("等待" + (30 - ggdjs) + "秒后返回");
        sleep(1000);
    };
    back();
};

//停留8秒倒计时
function 八秒倒计时() {
    for (ggdjs = 0; ggdjs < 10; ggdjs++) {
        lloogg("等待" + (10 - ggdjs) + "秒");
        sleep(1000);
    };
};
//停留30秒倒计时
function 停留x秒倒计时(x) {
    for (ggdjs = 0; ggdjs < x; ggdjs++) {
        lloogg("等待" + (x - ggdjs) + "秒");
        sleep(1000);
    };
    // back();
};

function 重置ksapp() {
    exit_app("快手极速版");
    app.launchPackage("com.kuaishou.nebula");
    permit();
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////功能性func

//自检测() == thread1
//开宝箱() == thread2
//每日挑战() == thread3
//饭饭补贴() == thread4 
//奖励翻倍() == thread5
//看视频赚金币() == thread6
//逛街() == thread7
//表态() == thread8
var ksjsset = storages.create("ksjsset");

var 选择框_开宝箱 = ksjsset.get("选择框_开宝箱");
var 选择框_每日挑战 = ksjsset.get("选择框_每日挑战");
var 选择框_饭饭补贴 = ksjsset.get("选择框_饭饭补贴");
var 选择框_奖励翻倍 = ksjsset.get("选择框_奖励翻倍");
var 选择框_看视频赚金币 = ksjsset.get("选择框_看视频赚金币");
var 选择框_逛街 = ksjsset.get("选择框_逛街");
var 选择框_表态 = ksjsset.get("选择框_表态");

if (选择框_开宝箱 == undefined) {
    选择框_开宝箱 = true;
};
if (选择框_每日挑战 == undefined) {
    选择框_每日挑战 = true;
};
if (选择框_饭饭补贴 == undefined) {
    选择框_饭饭补贴 = true;
};
if (选择框_奖励翻倍 == undefined) {
    选择框_奖励翻倍 = true;
};
if (选择框_看视频赚金币 == undefined) {
    选择框_看视频赚金币 = true;
};
if (选择框_逛街 == undefined) {
    选择框_逛街 = true;
};
if (选择框_表态 == undefined) {
    选择框_表态 = true;
};


//////////////////////////////////////////////////////////////////////////
重置ksapp();
停留x秒倒计时(20);
重置ksapp();
停留x秒倒计时(10);

log(currentThread);
var ISLOGIN = -1;
var earnmoney = text("去赚钱").findOne();
var a = earnmoney.bounds().centerX();
var b = earnmoney.bounds().centerY();
log((a, b));
threads.start(function () {
    setInterval(xx, 1000); // run the task every 5 second
    lloogg("xx")

});
threads.start(function () {
    setInterval(yy, 15 * 60 * 1000); // run the task every 5 second
    lloogg("YY")

});
八秒倒计时();
try {
    var c = earnmoney.visibleToUser()
} catch (e) {
}
if (earnmoney && c === true) {
    for (m = 1; m > 0; m++) {
        if (m == 15) {
            lloogg("识别超时，正在重启");
            yy();
        } else {
            click(a, b);
            lloogg("click任务中心");
            var missoncenter = text("任务中心").findOne(1000);
            var 抵用金0 = textContains("抵用金").findOne(1000);
            var dlmtx = text("登录秒提现").findOne(1000);
            if (missoncenter || dlmtx || 抵用金0) {
                lloogg("任务中心");
                break;
            } else {
                continue;
            };
        }
        toastLog("等待" + (15 - m) + "次")
    };
    var isllooggin = text("我的金币").findOne(2500);
    if (isllooggin) {
        ISLOGIN = 1;
        toastLog("已登录");
    } else {
        ISLOGIN = 0;
        toastLog("未登录")
    };


    if (ISLOGIN == 1) {
        lloogg("开始任务,正在检测可做任务……");

        八秒倒计时();
        签到();
        八秒倒计时();
        doubleclickearnmoney();
        sleep(2000);
        doubleclickearnmoney();
        日历签到();
        八秒倒计时();




        ////////////////////////////////////////////////////
        var 线 = 0;
        var thread10Paused = false;
        var thread1Paused = false;
        var thread2Paused = false;
        var thread3Paused = false;
        var thread4Paused = false;
        var thread5Paused = false;
        var thread6Paused = false;
        var thread7Paused = false;
        var thread8Paused = false;
        var thread9Paused = false;
        var thread11Paused = false;

        var currentThread = 100;  // 默认为线程1当前正在运行
        var 列表_奖励翻倍 = Number;
        var 列表_饭点补贴 = Number;
        var 列表_每日挑战 = Number;
        var 列表_看视频赚得金币 = Number;
        var 列表_逛街金币 = Number;
        var 列表_给视频表态 = Number;



        function thread10() {
            var t10 = 0;
            currentThread = 10;


            签到();

            lloogg(currentThread + "thread已经结束,正在回顶");
            回顶();
            sleep(1000);
            t10 = 1;
            if (!thread10Paused && t10 == 1 && currentThread == 10) {
                setTimeout(thread1, 1000);  // 延迟1秒调用线程3
            }
        }
        var thread1Id, thread2Id, thread3Id, thread4Id, thread5Id, thread6Id, thread7Id;
        // 暂停线程11
        function pauseThread11() {
            thread11Paused = true;
        }

        // 恢复线程10的执行
        function resumeThread11() {
            thread11Paused = false;
        };
        // 暂停线程10
        function pauseThread10() {
            thread10Paused = true;
        }

        // 恢复线程10的执行
        function resumeThread10() {
            thread10Paused = false;
        };
        // 暂停线程1
        function pauseThread1() {
            thread1Paused = true;

        }

        // 恢复线程1的执行
        function resumeThread1() {
            thread1Paused = false;
        }

        // 暂停线程2
        function pauseThread2() {
            thread2Paused = true;
        }

        // 恢复线程2的执行
        function resumeThread2() {
            thread2Paused = false;
        }

        // 暂停线程3
        function pauseThread3() {
            thread3Paused = true;
        }

        // 恢复线程3的执行
        function resumeThread3() {
            thread3Paused = false;
        };

        // 暂停线程4
        function pauseThread4() {
            thread4Paused = true;
        }

        // 恢复线程4的执行
        function resumeThread4() {
            thread4Paused = false;
        };

        // 暂停线程5
        function pauseThread5() {
            thread4Paused = true;
        }

        // 恢复线程5的执行
        function resumeThread5() {
            thread4Paused = false;
        };

        // 暂停线程6
        function pauseThread6() {
            thread6Paused = true;
        }

        // 恢复线程6的执行
        function resumeThread6() {
            thread6Paused = false;
        };

        // 暂停线程7
        function pauseThread7() {
            thread7Paused = true;
        }

        // 恢复线程7的执行
        function resumeThread7() {
            thread7Paused = false;
        };

        // 暂停线程8
        function pauseThread8() {
            thread8Paused = true;
        }

        // 恢复线程8的执行
        function resumeThread8() {
            thread8Paused = false;
        };
        function thread1() {
            var t1 = 0;
            currentThread = 1;
            // var 奖励翻倍P = Boolean;
            // var 列表_奖励翻倍 = 1;
            // var 奖励翻倍 = textContains("看视频奖励翻倍特权").findOne(1500);
            // var 饭点补贴P = Boolean;
            // var 列表_饭点补贴 = 1;
            // var 饭点补贴 = text("到饭点领饭补").findOne(1500);
            // var 每日挑战P = Boolean;
            // var 列表_每日挑战 = 0;
            // var 每日挑战 = text("每日挑战").findOne(1500);
            // var 看视频赚得金币P = Boolean;
            // var 列表_看视频赚得金币 = 1;
            // var 看视频赚得金币 = textMatches(/(看视频[得赚].*金币$)/).findOne(2000);
            // var 逛街金币P = Boolean;
            // var 列表_逛街金币 = 0;
            // var 逛街金币 = text("逛街领金币").findOne(1500);
            // var 给视频表态P = Boolean;
            // var 列表_给视频表态 = 0;
            // var 给视频表态 = textContains("给视频表态").findOne(1500);

            var 奖励翻倍 = textContains("看视频奖励翻倍特权").findOne(1500);
            var 饭点补贴 = text("到饭点领饭补").findOne(1500);
            var 每日挑战 = text("每日挑战").findOne(1500);
            var 看视频赚得金币 = textMatches(/(看视频[得赚].*金币$)/).findOne(2000);
            var 逛街金币 = text("逛街领金币").findOne(1500);
            var 给视频表态 = textContains("给视频表态").findOne(1500);


            // 线程1的逻辑
            if (奖励翻倍) {
                lloogg("🈶 奖励翻倍✅")
                奖励翻倍P = true;
                列表_奖励翻倍 = 0;          //3
                lloogg("🈶 奖励翻倍 ✅")
                奖励翻倍P = true;
            } else {
                lloogg("🈚️ 奖励翻倍")
                奖励翻倍P = false;
                列表_奖励翻倍 = 1;
            };
            if (饭点补贴) {                   //2
                lloogg("🈶 饭点补贴 ✅")
                饭点补贴P = true;
                列表_饭点补贴 = 0;
            } else {
                lloogg("🈚️ 饭点补贴")
                饭点补贴P = false;
                列表_饭点补贴 = 1;
            };
            if (每日挑战) {                    //1
                lloogg("🈶 每日挑战 ✅")
                每日挑战P = true;
                列表_每日挑战 = 0;
            } else {
                lloogg("🈚️ 每日挑战")
                每日挑战P = false;
                列表_每日挑战 = 1;
            };
            if (看视频赚得金币) {                    //4
                lloogg("🈶 看视频赚得金币 ✅")
                看视频赚得金币P = true;
                列表_看视频赚得金币 = 0;
            } else {
                lloogg("🈚️ 看视频赚得金币")
                看视频赚得金币P = false;
                列表_看视频赚得金币 = 1;
            };
            if (逛街金币) {                    //5
                lloogg("🈶 逛街 ✅")
                逛街金币P = true;
                列表_逛街金币 = 0;
            } else {
                lloogg("🈚️ 逛街")
                逛街金币P = false;
                列表_逛街金币 = 1;
            };
            if (给视频表态) {                    //6
                lloogg("🈶 给视频表态 ✅")
                给视频表态P = true;
                列表_给视频表态 = 0;
            } else {
                lloogg("🈚️ 给视频表态")
                给视频表态P = false;
                列表_给视频表态 = 1;
            };

            // 线程1执行完毕后，调用线程2
            lloogg(currentThread + "thread已经结束,正在回顶");
            log(列表_每日挑战, 列表_饭点补贴, 列表_奖励翻倍, 列表_看视频赚得金币, 列表_逛街金币, 列表_给视频表态);
            回顶();
            sleep(1000);

            if (列表_每日挑战 == 1 &&
                列表_饭点补贴 == 1 &&
                列表_奖励翻倍 == 1 &&
                列表_看视频赚得金币 == 1 &&
                列表_逛街金币 == 1 &&
                列表_给视频表态 == 1) {
                log("准备重开");
                yy();
            } else {
                t1 = 1;
                if (!thread1Paused && t1 == 1 && currentThread == 1) {
                    setTimeout(thread2, 1000);  // 延迟1秒调用线程2
                }
            }
        }

        function thread2() {
            var t2 = 0;
            currentThread = 2;
            // 线程2的逻辑
            var 宝箱 = text("treasurebox").findOne(2000);
            if (宝箱 && 选择框_开宝箱) {
                try {
                    var 宝箱下 = 宝箱.parent().child(宝箱.indexInParent() + 1);
                } catch (e) {
                    lloogg("No 宝箱下")
                }
                if (宝箱下 && 宝箱下.text().includes("开宝箱")) {
                    lloogg("🈶 开宝箱✅");
                    click(宝箱.bounds().centerX(), 宝箱.bounds().centerY());
                    奇怪地方返回任务中心();
                    if (奇怪 == 1) {
                        奇怪 = 0;
                    }
                    //xx();
                    停留x秒倒计时(10);
                    //goandearn();
                } else {
                    lloogg("没找到宝箱或宝箱不能开启");
                    goandearn();
                };
            };

            // 线程2执行完毕后，调用线程3
            lloogg(currentThread + "thread已经结束,正在回顶");
            回顶();
            sleep(1000);
            t2 = 1;
            if (!thread2Paused && t2 == 1 && currentThread == 2) {
                setTimeout(thread3, 1000);  // 延迟1秒调用线程3
            }
        }

        function thread3() {
            var t3 = 0;
            currentThread = 3
            // 线程3的逻辑
            for (n = 0; n > -1; n++) {

                if (列表_每日挑战 == 0) {
                    if (选择框_每日挑战) {
                        var xhpd = text("每日挑战").findOne(3500);
                        if (xhpd) {
                            //列表_每日挑战 = 1;
                            var pd3 = 0;//判断
                            var pd5 = 0;//判断
                            var pd7 = 0;//判断
                            var mrtz = 0;//判断
                            lloogg("正在检查每日挑战");
                            var 金币300 = textContains("300").findOne(1500);
                            var 金币500 = textContains("500").findOne(1500);
                            var 金币1200 = textContains("1200").findOne(1500);
                            try {
                                var sansan = 金币300.visibleToUser();
                                var wuwu = 金币500.visibleToUser();
                                var qiqi = 金币1200.visibleToUser();
                            } catch (e) {
                                sansan = false;
                                wuwu = false;
                                qiqi = false;
                            }
                            try {
                                var 完成3个 = 金币300.parent().child(金币300.indexInParent() + 1);
                            } catch (e) {
                                lloogg("No 300")
                            };
                            try {
                                var 完成5个 = 金币500.parent().child(金币500.indexInParent() + 1);
                            } catch (e) {
                                lloogg("No 500")
                            };
                            try {
                                var 完成7个 = 金币1200.parent().child(金币1200.indexInParent() + 1);
                            } catch (e) {
                                lloogg("No 1200")
                            };
                            if ((金币300 && sansan === true) || (金币500 && wuwu === true) || (金币1200 && qiqi === true)) {
                                lloogg("判断每日挑战");
                                列表_每日挑战 = 1;
                                //300
                                if (完成3个) {
                                    if (完成3个.text() == "完成3个") {
                                        lloogg("尚未完成3个");
                                    } else if (完成3个.text() === "点击领取") {
                                        for (dd3 = 1; dd3 < 10; dd3++) {
                                            try {
                                                完成3个.parent().click();
                                            } catch (e) {
                                            }
                                            lloogg("正在领取300金币");
                                            停留x秒倒计时(3);
                                            back();
                                            goandearn();
                                            停留x秒倒计时(2);
                                            try {
                                                var pdd3 = text("300金币").findOne(600).parent().child(金币300.indexInParent() + 1);
                                            } catch (e) {
                                                lloogg("300已不在");
                                            };

                                            if (pdd3 && pdd3.text() == "已领取") {
                                                pd3 = 1;
                                                lloogg("已经领取300金币");
                                                break;
                                            };

                                        };
                                    } else if (完成3个.text() == "已领取") {
                                        pd3 = 1;
                                        lloogg("300金币已经领取");
                                    };
                                }
                                //500
                                if (完成5个) {
                                    if (完成5个.text() == "完成5个") {
                                        lloogg("尚未完成5个");
                                    } else if (完成5个.text() === "点击领取") {
                                        for (dd5 = 1; dd5 < 10; dd5++) {
                                            try {
                                                完成5个.parent().click();
                                            } catch (e) {
                                            }
                                            lloogg("正在领取500金币");
                                            停留x秒倒计时(3);
                                            back();
                                            goandearn();
                                            停留x秒倒计时(2);
                                            try {
                                                var pdd5 = text("500金币").findOne(600).parent().child(金币500.indexInParent() + 1);
                                            } catch (e) {
                                                lloogg("500已不在");
                                            };
                                            if (pdd5 && pdd5.text() == "已领取") {
                                                pd5 = 1;
                                                lloogg("已经领取500金币");
                                                break;
                                            };

                                        };
                                    } else if (完成5个.text() == "已领取") {
                                        pd5 = 1;
                                        lloogg("500金币已经领取");
                                    };
                                }
                                //1200F
                                if (完成7个) {
                                    if (完成7个.text() == "完成7个") {
                                        lloogg("尚未完成7个");
                                    } else if (完成7个.text() === "点击领取") {
                                        for (dd7 = 1; dd7 < 10; dd7++) {
                                            try {
                                                完成7个.parent().click();
                                            } catch (e) {
                                            }
                                            lloogg("正在领取1200金币");
                                            停留x秒倒计时(3);
                                            back();
                                            goandearn();
                                            停留x秒倒计时(2);
                                            try {
                                                var pdd7 = text("1200金币").findOne(600).parent().child(金币1200.indexInParent() + 1);
                                            } catch (e) {
                                                lloogg("1200已不在");
                                            };
                                            if (pdd7 && pdd7.text() == "已领取") {
                                                pd7 = 1;
                                                lloogg("已经领取1200金币");
                                                break;
                                            };

                                        };
                                    } else if (完成7个.text() == "已领取") {
                                        pd7 = 1;
                                        lloogg("1200金币已经领取");
                                    };
                                    //mrtz
                                    if (pd3 == 1 && pd5 == 1 && pd7 == 1) {
                                        mrtz = 1;
                                        lloogg("每日挑战全部完成");
                                    } else {
                                        lloogg("继续每日挑战");
                                    }
                                }

                            } else {
                                lloogg("每日挑战进度条不在视野内");
                                upslide();
                                sleep(1500);
                            };
                            if (n % 10 === 0) {
                                回顶();
                                n = 0;
                                if (n == 15) {
                                    yy();
                                }
                            };
                        } else {
                            lloogg("每日挑战不在视野内");
                        };
                    } else {
                        列表_每日挑战 = 1;
                        log("未选");
                    };
                };
                if (列表_每日挑战 == 1) {
                    break;
                };

            };

            // 线程执行完毕后，调用线程34
            lloogg(currentThread + "thread已经结束,正在回顶");
            回顶();
            sleep(1000);
            t3 = 1;
            if (!thread3Paused && t3 == 1 && currentThread == 3) {
                setTimeout(thread4, 1000);  // 延迟1秒调用线程3
            }
        }


        function thread4() {
            var 饭补进对了 = 0;
            var t4 = 0;
            currentThread = 4;
            // 线程2的逻辑
            for (n = 0; n < 10; n++) {
                if (列表_饭点补贴 == 0) {
                    if (选择框_饭饭补贴) {
                        var fdbt = text("到饭点领饭补").findOne(3500);
                        if (fdbt) {
                            lloogg("到饭点领饭补")
                            try {
                                var ffdbt = fdbt.visibleToUser();
                            } catch (e) {
                                ffdbt = false;
                            }
                            if (ffdbt) {
                                log("正在去领取饭点补贴");
                                列表_饭点补贴 = 1;
                                for (ff = 1; ff < 10; ff++) {
                                    var 饭补 = textContains("到饭点领饭补").findOne(1000);
                                    try {
                                        var fbb = 饭补.visibleToUser()
                                    } catch (e) {
                                        fbb = false;
                                    }
                                    if (饭补 && fbb) {
                                        log("正在进领取饭补界面");
                                        click(饭补.bounds().centerX(), 饭补.bounds().centerY());
                                        奇怪地方返回任务中心();
                                        if (奇怪 == 1) {
                                            奇怪 = 0;
                                            continue;
                                        }
                                        sleep(1000);
                                    } else {
                                        var 领取饭补 = text("领取饭补").findOne(1000);
                                        var 领过了 = textContains("后领取").findOne(1000) || textMatches(/(明.*补贴$)/).findOne(1000);
                                        if (领取饭补) {
                                            log("领取饭补");
                                            饭补进对了 = 1;
                                            break;
                                        } else if (领过了) {
                                            log("领过了");
                                            饭补进对了 = 1;
                                            break;
                                        };
                                    };
                                    if (ff == 9 && !领取饭补 && !领过了) {
                                        lloogg("饭补进错了");
                                        lloogg("看视频进错了");
                                        奇怪地方返回任务中心();
                                        if (奇怪 == 1) {
                                            奇怪 = 0;
                                            continue;
                                        }
                                        back();

                                    };
                                };
                                if (领取饭补) {
                                    try {
                                        var dian领取饭补 = 领取饭补.parent();
                                    } catch (e) {
                                    }
                                    if (dian领取饭补) {
                                        for (ffd = 1; ffd < 10; ffd++) {
                                            dian领取饭补.click();
                                            var 饭补领取 = textContains("恭喜获得").findOne(3000);
                                            if (饭补领取) {
                                                log("饭补领取");
                                                try {
                                                    var 恭喜获得视频 = 饭补领取.parent().child(饭补领取.parent().children().length - 2);
                                                } catch (e) {
                                                }
                                                if (恭喜获得视频) {
                                                    log("正在去看恭喜获得视频");
                                                    click(恭喜获得视频.bounds().centerX(), 恭喜获得视频.bounds().centerY());
                                                    奇怪地方返回任务中心();
                                                    if (奇怪 == 1) {
                                                        奇怪 = 0;
                                                        continue;
                                                    }
                                                    var 广子倒计时 = id("com.kuaishou.nebula.neo_video:id/video_countdown").findOne(10000);
                                                    if (广子倒计时) {
                                                        log("正在看广告");
                                                        停留30秒倒计时();
                                                        var 还没看完 = id("com.kuaishou.nebula.neo_video:id/close_dialog_ensure_text").findOne(5000);
                                                        try {
                                                            var hmkw = 还没看完.text();
                                                        } catch (error) {
                                                            var hmkw = null || undefined;
                                                        };
                                                        if (hmkw !== "去完成任务") {
                                                            log("还没看完,继续等待30秒");
                                                            try {
                                                                var 还没看完button = idContains("com.kuaishou.nebula.neo_video:id/close_dialog_ensure").findOne(1000 * 15) || desc("dialog_positive_view").findOne(1000 * 15);
                                                                还没看完button.click();
                                                            } catch (error) {
                                                                log("还没看完buttonz找不到");
                                                            };
                                                            停留30秒倒计时();
                                                        } else {
                                                            log("额外任务");
                                                            try {
                                                                var 放弃button = idContains("com.kuaishou.nebula.neo_video:id/award_video_close_dialog_abandon").findOne(1000 * 15) || desc("dialog_negative_view").findOne(1000 * 15);
                                                                放弃button.click();
                                                            } catch (error) {
                                                                log("放弃buttonz找不到");
                                                            };
                                                        };
                                                    };
                                                };
                                                // back();
                                                break;
                                            } else {
                                                log("没有领");
                                            };
                                        };
                                    };

                                } else if (领过了) {
                                    log("领过饭补了或不在饭补时间");
                                } else {
                                    log("饭补异常");
                                    //back();
                                };


                                ////////、、、、、、、、、、、、、、、、、、、、、、、、、
                                //////////////补签/////////////
                                if (饭补进对了 == 1) {
                                    log("开始寻找补签");
                                    for (dbqys = 1; dbqys < 10; dbqys++) {
                                        var 待补签元素 = textMatches(/(.*待补签$)/).find();
                                        if (待补签元素 && 待补签元素.length !== 0) {
                                            log("正在补签");
                                            log("等待补签数量:" + 待补签元素.length);
                                            for (dbq = 0; dbq < 待补签元素.length; dbq++) {
                                                click(待补签元素[dbq].bounds().centerX(), 待补签元素[dbq].bounds().centerY());
                                                sleep(300);
                                                var 广子倒计时 = id("com.kuaishou.nebula.neo_video:id/video_countdown").findOne(10000);
                                                if (广子倒计时) {
                                                    log("正在看广告");
                                                    停留30秒倒计时();
                                                    sleep(300)
                                                    var 还没看完 = id("com.kuaishou.nebula.neo_video:id/close_dialog_ensure_text").findOne(5000);
                                                    try {
                                                        var hmkw = 还没看完.text();
                                                    } catch (error) {
                                                        var hmkw = null || undefined;
                                                    };
                                                    if (hmkw !== "去完成任务") {
                                                        log("还没看完,继续等待30秒");
                                                        try {
                                                            var 还没看完button = idContains("com.kuaishou.nebula.neo_video:id/close_dialog_ensure").findOne(1000 * 15) || desc("dialog_positive_view").findOne(1000 * 15);
                                                            还没看完button.click();
                                                        } catch (error) {
                                                            log("还没看完buttonz找不到");
                                                        };
                                                        停留30秒倒计时();
                                                    } else {
                                                        log("额外任务");
                                                        try {
                                                            var 放弃button = idContains("com.kuaishou.nebula.neo_video:id/award_video_close_dialog_abandon").findOne(1000 * 15) || desc("dialog_negative_view").findOne(1000 * 15);
                                                            放弃button.click();
                                                        } catch (error) {
                                                            log("放弃buttonz找不到");
                                                        };
                                                    };
                                                };

                                            };
                                        } else if (待补签元素.length == 0) {
                                            log("无补待签元素");
                                            break;
                                        };
                                    };
                                    //////////////补签/////////////
                                    /////////////////看视频////////////

                                    log("开始看视频");
                                    var 饭补视频 = text("看视频").findOne(1000);
                                    if (饭补视频) {
                                        log("正在去看饭补视频");
                                        for (fbsp = 0; fbsp < 10; fbsp++) {
                                            var 饭补视频 = text("看视频").findOne(1500);
                                            click(饭补视频.bounds().centerX(), 饭补视频.bounds().centerY());
                                            奇怪地方返回任务中心();
                                            if (奇怪 == 1) {
                                                奇怪 == 0;
                                                continue;
                                            }
                                            var 广告倒计时 = id("com.kuaishou.nebula.neo_video:id/video_countdown").findOne(8000);
                                            var toast窗 = id("com.kuaishou.nebula:id/toast_text").findOne(1000);
                                            var 今日饭补广告看完了 = textContains("已完成").findOne(800) || textContains("明天再来").findOne(800) || text("任务已完成，明天再来吧～").findOne(800);
                                            var 领取饭补 = text("领取饭补").findOne(500);
                                            var 领过了 = textContains("后领取").findOne(1000) || textMatches(/(明.*补贴$)/).findOne(500);
                                            if (toast窗) {
                                                log(toast窗.text())
                                            };
                                            if (今日饭补广告看完了) {
                                                log("今日饭补广告看完了");
                                                break;
                                            };
                                            if (广告倒计时) {
                                                log("正在看广告——停留30秒")
                                                break;
                                            };
                                            if (!广告倒计时 && !今日饭补广告看完了 && !领取饭补 && !领取饭补) {
                                                log("饭补卡住了");
                                                停留x秒倒计时(50);
                                                sleep(300);
                                                break;
                                            };
                                        };
                                        if (广告倒计时) {
                                            停留30秒倒计时();
                                            sleep(300);
                                            var 还没看完 = id("com.kuaishou.nebula.neo_video:id/close_dialog_ensure_text").findOne(5000);
                                            try {
                                                var hmkw = 还没看完.text();
                                            } catch (error) {
                                                var hmkw = null || undefined;
                                            };
                                            if (hmkw !== "去完成任务") {
                                                log("还没看完,继续等待30秒");
                                                try {
                                                    var 还没看完button = idContains("com.kuaishou.nebula.neo_video:id/close_dialog_ensure").findOne(1000 * 15) || desc("dialog_positive_view").findOne(1000 * 15);
                                                    还没看完button.click();
                                                } catch (error) {
                                                    log("还没看完buttonz找不到");
                                                };
                                                停留30秒倒计时();
                                            } else {
                                                log("额外任务");
                                                try {
                                                    var 放弃button = idContains("com.kuaishou.nebula.neo_video:id/award_video_close_dialog_abandon").findOne(1000 * 15) || desc("dialog_negative_view").findOne(1000 * 15);
                                                    放弃button.click();
                                                } catch (error) {
                                                    log("放弃buttonz找不到");
                                                };
                                            };
                                        };
                                    };
                                    sleep(3000);



                                    /////////////////看视频////////////


                                    back();

                                };


                            } else {
                                log("饭补不在视野内");
                                upslide();
                                sleep(1500);
                            };
                            if (n % 10 === 0) {
                                回顶();
                                n = 0;
                                if (n == 15) {
                                    yy();
                                }
                            };
                        }
                    } else {
                        列表_饭点补贴 = 1;
                        log("未选");
                    };
                }
                if (列表_饭点补贴 == 1) {
                    break;
                };
            };

            lloogg(currentThread + "thread已经结束,正在回顶");
            回顶();
            sleep(1000);
            t4 = 1;
            if (!thread4Paused && t4 == 1 && currentThread == 4) {
                setTimeout(thread5, 1000);  // 延迟1秒调用线程3
            }
        }


        function thread5() {
            var t5 = 0;
            currentThread = 5;
            // 线程2的逻辑
            for (n = 0; n < 9; n++) {
                if (列表_奖励翻倍 == 0) {
                    if (选择框_奖励翻倍) {
                        var jlfb = textContains("看视频奖励翻倍特权").findOne(3500);
                        if (jlfb) {
                            lloogg("看视频奖励翻倍特权")
                            if (jlfb.visibleToUser() === true) {
                                列表_奖励翻倍 = 1;
                                log("正在翻倍奖励");
                                for (ble = 0; ble < 5; ble++) {
                                    var 翻倍 = textContains("看视频奖励翻倍特权").findOne(1000);
                                    var 翻倍中 = 翻倍.parent().parent().child(翻倍.parent().parent().children().length - 1);
                                    try {
                                        var ffb = 翻倍.visibleToUser()
                                    } catch (e) {
                                        ffb = false;
                                    }
                                    if (翻倍 && ffb) {
                                        click(翻倍.bounds().centerX(), 翻倍.bounds().centerY());
                                        奇怪地方返回任务中心();
                                        if (奇怪 == 1) {
                                            奇怪 = 0;
                                            continue;
                                        }
                                        sleep(500);
                                    };
                                    // if (翻倍中.text() !== "点击翻倍") {
                                    //     log("翻倍中")
                                    //     break;
                                    // } else {
                                    //     continue;
                                    // };
                                };
                            } else {
                                log("奖励翻倍不在视野内");
                                upslide();
                                sleep(1500);
                            };
                            if (n % 10 === 0) {
                                回顶();
                                n = 0;
                                if (n == 15) {
                                    yy();
                                }
                            };
                        }
                    } else {
                        列表_奖励翻倍 = 1;
                        log("未选");
                    };
                }
                if (列表_奖励翻倍 == 1) {
                    log("已翻倍");
                    break;
                };

            };
            back();

            // 线程2执行完毕后，调用线程3
            lloogg(currentThread + "thread已经结束,正在回顶");
            回顶();
            sleep(1000);
            t5 = 1;
            if (!thread5Paused && t5 == 1 && currentThread == 5) {
                setTimeout(thread6, 1000);  // 延迟1秒调用线程3
            }
        }


        function thread6() {
            var t6 = 0;
            currentThread = 6;
            // 线程2的逻辑
            for (n = 0; n < 10; n++) {

                if (列表_看视频赚得金币 == 0) {
                    if (选择框_看视频赚金币) {
                        var kspzdjb = textMatches(/(看视频[得赚].*金币$)/).findOne(3500);
                        try {
                            var kksbz = kspzdjb.visibleToUser()
                        } catch (e) {
                            kksbz = false;
                        }
                        if (kspzdjb && kksbz === true) {
                            列表_看视频赚得金币 = 1;
                            log("正在看视频赚得金币-停留2分钟");
                            for (ksp = 1; ksp < 5; ksp++) {
                                //var 明天再来 = text("明天再来").findOne(1000);
                                var 看视频 = textMatches(/(看视频[得赚].*金币$)/).findOne(1000);
                                var 广告倒计时 = id("com.kuaishou.nebula.neo_video:id/video_countdown").findOne(8000);
                                try {
                                    var lknlks = 看视频.visibleToUser()
                                } catch (e) {
                                    lknlks = false;
                                }
                                if (看视频 && lknlks === true) {
                                    click(看视频.bounds().centerX(), 看视频.bounds().centerY());
                                    奇怪地方返回任务中心();
                                    if (奇怪 == 1) {
                                        奇怪 = 0;
                                        continue;
                                    }
                                    sleep(500);
                                };
                                if (ksp == 4 && !看视频 && !广告倒计时) {
                                    lloogg("看视频进错了");
                                    奇怪地方返回任务中心();
                                    if (奇怪 == 1) {
                                        奇怪 = 0;
                                        continue;
                                    }
                                };
                                if (广告倒计时) {
                                    log("正在看广告——停留30秒")
                                    break;
                                } else {
                                    continue;
                                };

                            };

                            if (广告倒计时) {
                                停留30秒倒计时();
                                sleep(300);
                                var 还没看完 = id("com.kuaishou.nebula.neo_video:id/close_dialog_ensure_text").findOne(5000);
                                try {
                                    var hmkw = 还没看完.text();
                                } catch (error) {
                                    var hmkw = null || undefined;
                                };
                                if (hmkw !== "去完成任务") {
                                    log("还没看完,继续等待30秒");
                                    try {
                                        var 还没看完button = idContains("com.kuaishou.nebula.neo_video:id/close_dialog_ensure").findOne(1000 * 15) || desc("dialog_positive_view").findOne(1000 * 15);
                                        还没看完button.click();
                                    } catch (error) {
                                        log("还没看完buttonz找不到");
                                    };
                                    停留30秒倒计时();
                                } else {
                                    log("额外任务");
                                    try {
                                        var 放弃button = idContains("com.kuaishou.nebula.neo_video:id/award_video_close_dialog_abandon").findOne(1000 * 15) || desc("dialog_negative_view").findOne(1000 * 15);
                                        放弃button.click();
                                    } catch (error) {
                                        log("放弃buttonz找不到");
                                    };
                                };
                            } else {
                                goandearn();
                            };
                        } else {
                            log("看视频赚得金币不在视野内");
                            upslide();
                            sleep(1500);
                        };
                        if (n % 10 === 0) {
                            回顶();
                            n = 0;
                            if (n == 15) {
                                yy();
                            }
                        };

                    } else {
                        列表_看视频赚得金币 = 1;
                        log("未选");
                    };
                };
                if (列表_看视频赚得金币 == 1) {
                    break;
                };

            };

            // 线程2执行完毕后，调用线程3
            lloogg(currentThread + "thread已经结束,正在回顶");
            回顶();
            sleep(1000);
            t6 = 1;
            if (!thread6Paused && t6 == 1 && currentThread == 6) {
                setTimeout(thread7, 1000);  // 延迟1秒调用线程3
            }
        }


        function thread7() {
            var t7 = 0;
            currentThread = 7;
            // 线程2的逻辑
            for (n = 0; n > -1; n++) {
                if (列表_逛街金币 == 0) {
                    if (选择框_逛街) {
                        var gjljb = text("逛街领金币").findOne(3500);
                        if (gjljb) {
                            if (gjljb.visibleToUser() === true) {
                                列表_逛街金币 = 1;
                                lloogg("正在逛街");
                                for (gj = 1; gj < 10; gj++) {
                                    var 逛街 = text("逛街领金币").findOne(1000);
                                    var 逛街倒计时 = id("com.kuaishou.nebula:id/reward_merchant_pendant_container").findOne(10000);
                                    if (逛街) {
                                        if (逛街.visibleToUser() === true) {
                                            try {
                                                var 逛完了 = 逛街.parent().parent().child(逛街.parent().parent().children().length - 1);
                                            } catch (e) {
                                            }
                                            if (!逛完了.text().includes("去")) {
                                                lloogg("逛完了");
                                                break;
                                            } else {
                                                click(逛街.bounds().centerX(), 逛街.bounds().centerY());
                                                奇怪地方返回任务中心();
                                                if (奇怪 == 1) {
                                                    奇怪 = 0;
                                                    continue;
                                                }
                                                sleep(500);
                                            }
                                        };
                                    };
                                    if (gj == 9 && !逛街倒计时) {
                                        lloogg("逛街进错了");
                                        back();
                                        sleep(1500);
                                        back();
                                    }
                                    if (逛街倒计时) {
                                        lloogg("正在逛街逛街——滑动停留100秒")
                                        break;
                                    } else {
                                        continue;
                                    };

                                };
                                if (逛街倒计时) {
                                    停留100秒滑动();
                                    back();
                                    var 继续逛街 = text("继续逛街").findOne(10000);
                                    if (继续逛街) {
                                        lloogg("还没逛完,继续等待100秒");
                                        var 继续逛街but = text("继续逛街").findOne(1500);
                                        click(继续逛街but.bounds().centerX(), 继续逛街but.bounds().centerY());
                                        停留100秒滑动();
                                    };
                                };
                            } else {
                                lloogg("逛街不在视野内");
                                upslide();
                                sleep(1500);
                            };
                            if (n % 10 === 0) {
                                回顶();
                                n = 0;
                                if (n == 15) {
                                    yy();
                                }
                            };
                        };
                    } else {
                        列表_逛街金币 = 1;
                        log("未选");
                    };
                };
                if (列表_逛街金币 == 1) {
                    break;
                };

            };

            // 线程2执行完毕后，调用线程3
            lloogg(currentThread + "thread已经结束,正在回顶");
            回顶();
            sleep(1000);
            t7 = 1;
            if (!thread7Paused && t7 == 1 && currentThread == 7) {
                setTimeout(thread8, 1000);  // 延迟1秒调用线程3
            }
        }


        function thread8() {
            var t8 = 0;
            currentThread = 8;
            // 线程2的逻辑
            for (n = 0; n > -1; n++) {

                var 在视频页 = 0;
                if (列表_给视频表态 == 0) {
                    if (选择框_表态) {
                        var gspbt = textContains("给视频表态").findOne(3500);
                        try {
                            var ads = gspbt.visibleToUser()
                        } catch (e) {
                            ads = false;
                        }
                        if (gspbt && ads === true) {
                            列表_给视频表态 = 1;
                            lloogg("正在给视频表态");
                            for (bt = 1; bt < 10; bt++) {
                                //var 明日再来 = text("明日再来").findOne(1000);
                                var 表态 = textContains("给视频表态").findOne(1500);
                                try {
                                    var bbtt = 表态.visibleToUser()
                                } catch (e) {
                                    bbtt = false;
                                }
                                if (表态 && bbtt === true) {
                                    click(表态.bounds().centerX(), 表态.bounds().centerY());
                                    奇怪地方返回任务中心();
                                    if (奇怪 == 1) {
                                        奇怪 = 0;
                                        continue;
                                    }
                                    sleep(500);

                                    function if视频() {
                                        var 视频 = id("com.kuaishou.nebula:id/nasa_groot_view_pager").findOne(3000);
                                        try {
                                            var qdss = 视频.visibleToUser()
                                        } catch (e) {
                                            qdss = false;
                                        }
                                        if (视频 && qdss === true) {
                                            toast("在视频页");
                                            在视频页 = 1;
                                        } else {
                                            toast("🙅‍视频页 或 做完了");
                                            在视频页 = 0;
                                        };
                                    };

                                    for (n = 0; n < 10; n++) {
                                        if视频();
                                        sleep(1000);
                                        if (在视频页 == 1) {
                                            lloogg("√视频页√");
                                            break;
                                        } else {
                                            continue;
                                        };
                                        sleep(1000);
                                    };
                                    sleep(1000);
                                    if (在视频页 == 1) {
                                        lloogg("开始表态");
                                    };

                                };

                                ////////////刷视频+表态/////////////////////
                                if (在视频页 == 1) {
                                    for (pbt = 0; pbt < 35; pbt++) {
                                        lloogg("正在评论第" + (pbt + 1) + "/50 条视频");
                                        var bta = 0;
                                        for (qbt = 0; qbt > -1; qbt++) {
                                            var 表态 = text("你对此条视频是否满意？").find().filter(function (element) {
                                                return element.visibleToUser();
                                            });
                                            log(表态);

                                            if (表态.length > 0) {
                                                var 可见表态 = 表态[0];
                                                bta = 1;
                                                lloogg("正在表态");
                                            } else {
                                                lloogg("不可表态");
                                            };
                                            break;

                                        };
                                        log(bta)
                                        if (bta == 1) {
                                            try {
                                                var array = [可见表态.indexInParent() + 2, 可见表态.indexInParent() + 3, 可见表态.indexInParent() + 4];
                                            } catch (e) {
                                            }
                                            var randomIndex = Math.floor(Math.random() * array.length);
                                            var randomElement = array[randomIndex];
                                            try {
                                                click(可见表态.parent().child(randomElement).bounds().centerX(), 可见表态.parent().child(randomElement).bounds().centerY())
                                            } catch (e) {
                                            }
                                            sleep(1000);
                                        };
                                        upslide();
                                        sleep(1500);
                                        sleep(3500)
                                    };
                                }
                            };


                        } else {
                            lloogg("给视频表态不在视野内");
                            upslide();
                            sleep(1500);
                        };
                        if (n % 10 === 0) {
                            回顶();
                            n = 0;
                            if (n == 15) {
                                yy();
                            }
                        };
                    } else {
                        列表_给视频表态 = 1;
                        log("未选");
                    };
                };
                if (列表_给视频表态 == 1) {
                    break;
                };

            };

            // 线程2执行完毕后，调用线程3
            // lloogg(currentThread + "thread已经结束,正在回顶");
            回顶();
            sleep(1000);
            t8 = 1;
            if (!thread8Paused && t8 == 1 && currentThread == 8) {
                setTimeout(thread11, 1000);  // 延迟1秒调用线程3
            }
        }

        function thread11() {
            var t11 = 0;
            currentThread = 11;

            lloogg("刷十分钟视频");
            for (sy = 1; sy > 0; sy++) {
                if (sy == 15) {
                    lloogg("识别超时，正在重启");
                    yy();
                } else {
                    var 首页 = text("首页").findOne(1500);
                    try {
                        var sssyy = 首页.visibleToUser()
                        var ssyyy = 首页.selected()
                    } catch (e) {
                        sssyy = false;
                        ssyyy = false;
                    }
                    if (sssyy == true && ssyyy == false) {
                        click(首页.bounds().centerX(), 首页.bounds().centerY());
                        奇怪地方返回任务中心();
                        if (奇怪 == 1) {
                            奇怪 = 0;
                            continue;
                        }
                    };
                    if (首页.selected() == true) {
                        lloogg("在首页");
                        break;
                    };
                }
                toastLog(15 - sy)
            };

            function 看视频() {
                var downup = 0;
                var counter = 0;
                for (gjdjs = 0; gjdjs < 600; gjdjs++) {
                    downup = downup + 1;
                    counter = counter + 1;
                    if (counter == 10) { // 每10秒提示一次
                        lloogg("继续刷" + (600 - gjdjs) + "秒视频");
                        counter = 0;
                    };
                    sleep(1000);
                    if (downup == 10) {
                        lloogg("看视频");
                        upslide();
                        sleep(1500);
                        lloogg("继续刷" + (600 - gjdjs) + "秒视频");
                        downup = 0;
                    };
                };
            };
            看视频();
            sleep(5000);
            lloogg(currentThread + "thread已经结束,正在回顶");
            回顶();
            sleep(1000);
            t11 = 1;
            if (!thread11Paused && t11 == 1 && currentThread == 11) {
                setTimeout(thread10, 1000);  // 延迟1秒调用线程3
            }
        }





        /////////////////////////////// 判断一轮是否全做完了 ///////////////////////
        log(列表_每日挑战, 列表_饭点补贴, 列表_奖励翻倍, 列表_看视频赚得金币, 列表_逛街金币, 列表_给视频表态);
        if (列表_每日挑战 == 1 && 列表_饭点补贴 == 1 && 列表_奖励翻倍 == 1 && 列表_看视频赚得金币 == 1 && 列表_逛街金币 == 1 && 列表_给视频表态 == 1) {
            lloogg("一轮做完,等待下一轮");
            sleep(2000);
            runThreads();
        };

        sleep(5000);




        /////////////////////////////////////////////////////////////////////////////////////////////
        for (n = 0; n > -1; n++) {
            if (线 == 1) {
                线 = 0;
                runThreads();
                sleep(5000);
                break;
            };
        };



    } else if (ISLOGIN == 0) {
        alert("未登录");
    } else {
        lloogg("卡住了,请联系管理员")
    };
};


lloogg("已完成");
//exit();

///////////////////////////////////////////////////////////////////////////////
function yy() {
    sleep(1500);
    //engines.stopAll();
    engines.execScriptFile(filePathksjs);
    exit();
};


function 返回找任务中心() {
    for (n = 1; n < 10; n++) {
        var 抵用金 = textContains("抵用金").findOne(700);
        // try {
        //     var diyongjin = 抵用金.visibleToUser()
        // } catch (e) {
        //     diyongjin = false;
        // }
        sleep(300);
        if (抵用金) {
            lloogg("回到了任务中心");
            break;
        };
    };
};

var 奇怪 = 0;
function 奇怪地方返回任务中心() {
    var 在奇怪的地方 = text("邀请好友 必得现金").findOne(100) || textMatches(/(仅差.*成长值升级)/).findOne(100) ||
        idContains("live_audience").findOne(100) || idContains("svg__icons__dom").findOne(100) ||
        id("com.kuaishou.nebula:id/avatar").findOne(100) || text("距本周活动结束").findOne(100) ||
        text("赚金小游戏").findOne(100) || text("金币兑换优惠券").findOne(100) || text("我的抽奖码").findOne(100) ||
        text("种成后还能换其他水果哦").findOne(100) ||
        text("朋友扫码拆红包").findOne(100) || text("邀请未下载过快手极速版的人提现更快").findOne(100) || text("guide-icon").findOne(100) ||
        textContains("前三次完成先睡觉再起床").findOne(100);
    if (在奇怪的地方 && 在奇怪的地方.visibleToUser() === true) {
        奇怪 = 1;
        返回找任务中心();
    };

}


function xx() {
    lloogg("xx");
    var 好评弹窗 = id("com.kuaishou.nebula:id/icon").findOne(100) || text("喜欢就给个好评吧").findOne(100);
    var 签到弹窗 = textContains("gift-active").findOne(100) || textContains("coins-active").findOne(100) || textContains("redpack-active").findOne(100);
    var 金币箱弹窗 = text("nebula-box-jinbi").findOne(100);
    var 第一类弹窗 = text("恭喜获得看视频惊喜红包").findOne(100);
    var 第二类弹窗 = text("popup_icon").findOne(100) || id("com.kuaishou.nebula.neo_video:id/again_dialog_image").findOne(100);
    var 第三类额外弹窗 = id("com.kuaishou.nebula.neo_video:id/close_dialog_logo").findOne(100);
    var 弹窗 = textContains("签到领取").findOne(100) || textContains("恭喜你获得").findOne(100) || text("早起打卡瓜分金币").findOne(100) || text("恭喜获得金币大礼包").findOne(100)//|| textContains("限时福利").findOne(500); 
    var 邀请新用户 = textContains("邀请新用户").findOne(100);
    var 青少年模式 = id("com.kuaishou.nebula:id/set_teenage_mode").findOne(100);
    var 先暂停 = 0;

    // if (弹窗 && 弹窗.visibleToUser() === true) {
    //     lloogg("检测到弹窗");
    //     sleep(500);
    //     back();
    //     lloogg("已关闭弹窗✅");
    //     lloogg(弹窗);
    //     sleep(1000);
    //     goandearn();
    //     sleep(500);


    if (签到弹窗 && textContains("将从第一天开始签到").findOne(500)) {
        log("检测到签到弹窗");
        lloogg("先暂停");
        if (currentThread !== 100) {
            try {
                pauseThread10();
                pauseThread1();
                pauseThread2();
                pauseThread3();
                pauseThread4();
                pauseThread5();
                pauseThread6();
                pauseThread7();
                pauseThread8();
                pauseThread11();
                先暂停 = 1;
            } catch (e) {
                线 = 0;
            }

        }
        var dkh = textContains("将从第一天开始签到").findOne(1500);
        try {
            var but = dkh.parent().child(dkh.parent().children().length - 2);
        } catch (e) {
        }
        // log(but);
        // log(but.visibleToUser())
        // log(but.child(0));
        // log(but.child(0).visibleToUser())
        click(but.bounds().centerX(), but.bounds().centerY());
        var 广子倒计时 = id("com.kuaishou.nebula.neo_video:id/video_countdown").findOne(10000);
        if (广子倒计时) {
            log("正在看宝箱广告");
            停留30秒倒计时();
            var 还没看完 = id("com.kuaishou.nebula.neo_video:id/close_dialog_ensure_text").findOne(5000);
            try {
                var hmkw = 还没看完.text();
            } catch (error) {
                var hmkw = null || undefined;
            };
            if (hmkw !== "去完成任务") {
                log("还没看完,继续等待30秒");
                try {
                    var 还没看完button = idContains("com.kuaishou.nebula.neo_video:id/close_dialog_ensure").findOne(1000 * 15) || desc("dialog_positive_view").findOne(1000 * 15);
                    还没看完button.click();
                } catch (error) {
                    log("还没看完buttonz找不到");
                };
                停留30秒倒计时();
            } else {
                log("额外任务");
                try {
                    var 放弃button = idContains("com.kuaishou.nebula.neo_video:id/award_video_close_dialog_abandon").findOne(1000 * 15) || desc("dialog_negative_view").findOne(1000 * 15);
                    放弃button.click();
                } catch (error) {
                    log("放弃buttonz找不到");
                };
            };
        };
        回顶();
        if (先暂停 == 1) {
            先暂停 = 0;
            resumeThread10();
            resumeThread1();
            resumeThread2();
            resumeThread3();
            resumeThread4();
            resumeThread5();
            resumeThread6();
            resumeThread7();
            resumeThread8();
            resumeThread11();
            runThreads();
        }
    }
    if (第一类弹窗 && 第一类弹窗.parent().child(0).className() == "android.widget.ImageView" && 第一类弹窗.visibleToUser() === true) {
        lloogg("检测到惊喜红包弹窗");
        lloogg("先暂停");
        if (currentThread !== 100) {
            try {
                pauseThread10();
                pauseThread1();
                pauseThread2();
                pauseThread3();
                pauseThread4();
                pauseThread5();
                pauseThread6();
                pauseThread7();
                pauseThread8();
                pauseThread11();
                先暂停 = 1;
            } catch (e) {
                线 = 0;
            }

        }
        var 惊喜 = text("恭喜获得看视频惊喜红包").findOne(1000);
        var dian继续观看 = 惊喜.parent().child(惊喜.parent().children().length - 2);
        if (dian继续观看) {
            log("正在继续观看");
            dian继续观看.click();
        };
        回顶();
        if (先暂停 == 1) {
            先暂停 = 0;
            resumeThread10();
            resumeThread1();
            resumeThread2();
            resumeThread3();
            resumeThread4();
            resumeThread5();
            resumeThread6();
            resumeThread7();
            resumeThread8();
            resumeThread11();
            runThreads();
        }
    };
    if (第二类弹窗 && 第二类弹窗.visibleToUser() === true) {
        lloogg("检测到存钱罐/再看一个弹窗");
        if (currentThread !== 100) {
            try {
                pauseThread10();
                pauseThread1();
                pauseThread2();
                pauseThread3();
                pauseThread4();
                pauseThread5();
                pauseThread6();
                pauseThread7();
                pauseThread8();
                pauseThread11();
                先暂停 = 1;
            } catch (e) {
                线 = 0;
            }

        }
        var shut第二类 = 第二类弹窗.parent().child(第二类弹窗.indexInParent() + 1);
        if (shut第二类) {
            lloogg("正在关闭存钱罐弹窗/再看一个");
            shut第二类.click();
            var 广子倒计时 = id("com.kuaishou.nebula.neo_video:id/video_countdown").findOne(10000);
            if (广子倒计时) {
                log("正在看宝箱广告");
                停留30秒倒计时();
                var 还没看完 = id("com.kuaishou.nebula.neo_video:id/close_dialog_ensure_text").findOne(5000);
                try {
                    var hmkw = 还没看完.text();
                } catch (error) {
                    var hmkw = null || undefined;
                };
                if (hmkw !== "去完成任务") {
                    log("还没看完,继续等待30秒");
                    try {
                        var 还没看完button = idContains("com.kuaishou.nebula.neo_video:id/close_dialog_ensure").findOne(1000 * 15) || desc("dialog_positive_view").findOne(1000 * 15);
                        还没看完button.click();
                    } catch (error) {
                        log("还没看完buttonz找不到");
                    };
                    停留30秒倒计时();
                } else {
                    log("额外任务");
                    try {
                        var 放弃button = idContains("com.kuaishou.nebula.neo_video:id/award_video_close_dialog_abandon").findOne(1000 * 15) || desc("dialog_negative_view").findOne(1000 * 15);
                        放弃button.click();
                    } catch (error) {
                        log("放弃buttonz找不到");
                    };
                };
            };
        };
        回顶();
        if (先暂停 == 1) {
            先暂停 = 0;
            resumeThread10();
            resumeThread1();
            resumeThread2();
            resumeThread3();
            resumeThread4();
            resumeThread5();
            resumeThread6();
            resumeThread7();
            resumeThread8();
            resumeThread11();
            runThreads();
        }
    };
    if (第三类额外弹窗 && 第三类额外弹窗.visibleToUser() === true) {
        lloogg("检测到额外弹窗");
        lloogg("先暂停");
        if (currentThread !== 100) {
            try {
                pauseThread10();
                pauseThread1();
                pauseThread2();
                pauseThread3();
                pauseThread4();
                pauseThread5();
                pauseThread6();
                pauseThread7();
                pauseThread8();
                pauseThread11();
                先暂停 = 1;
            } catch (e) {
                线 = 0;
            }

        };
        try {
            var 放弃button = idContains("com.kuaishou.nebula.neo_video:id/award_video_close_dialog_abandon").findOne(1000 * 15) || desc("dialog_negative_view").findOne(1000 * 15);
            放弃button.click();
        } catch (error) {
            lloogg("额外弹窗error");
        };
        goandearn();
        回顶();
        if (先暂停 == 1) {
            先暂停 = 0;
            resumeThread10();
            resumeThread1();
            resumeThread2();
            resumeThread3();
            resumeThread4();
            resumeThread5();
            resumeThread6();
            resumeThread7();
            resumeThread8();
            resumeThread11();
            runThreads();
        };
    };

    if (金币箱弹窗 && 金币箱弹窗.visibleToUser() === true) {
        lloogg("检测到金币箱弹窗");
        lloogg("先暂停");
        if (currentThread !== 100) {
            try {
                pauseThread10();
                pauseThread1();
                pauseThread2();
                pauseThread3();
                pauseThread4();
                pauseThread5();
                pauseThread6();
                pauseThread7();
                pauseThread8();
                pauseThread11();
                先暂停 = 1;
            } catch (e) {
                线 = 0;
            }

        };
        try {
            var chahcakan = 金币箱弹窗.parent().child(金币箱弹窗.parent().children().length - 1).child(金币箱弹窗.parent().child(金币箱弹窗.parent().children().length - 1).children().length - 1);
        } catch (error) {
            lloogg("金币箱弹窗领取error")
        };

        if (chahcakan) {
            log("  z  ")
            chahcakan.click();
            var 广子倒计时 = id("com.kuaishou.nebula.neo_video:id/video_countdown").findOne(10000);
            if (广子倒计时) {
                log("正在看宝箱广告");
                停留30秒倒计时();
                var 还没看完 = id("com.kuaishou.nebula.neo_video:id/close_dialog_ensure_text").findOne(5000);
                try {
                    var hmkw = 还没看完.text();
                } catch (error) {
                    var hmkw = null || undefined;
                };
                if (hmkw !== "去完成任务") {
                    log("还没看完,继续等待30秒");
                    try {
                        var 还没看完button = idContains("com.kuaishou.nebula.neo_video:id/close_dialog_ensure").findOne(1000 * 15) || desc("dialog_positive_view").findOne(1000 * 15);
                        还没看完button.click();
                    } catch (error) {
                        log("还没看完buttonz找不到");
                    };
                    停留30秒倒计时();
                } else {
                    log("额外任务");
                    try {
                        var 放弃button = idContains("com.kuaishou.nebula.neo_video:id/award_video_close_dialog_abandon").findOne(1000 * 15) || desc("dialog_negative_view").findOne(1000 * 15);
                        放弃button.click();
                    } catch (error) {
                        log("放弃buttonz找不到");
                    };
                };
            };
        };
        goandearn();
        回顶();
        if (先暂停 == 1) {
            先暂停 = 0;
            resumeThread10();
            resumeThread1();
            resumeThread2();
            resumeThread3();
            resumeThread4();
            resumeThread5();
            resumeThread6();
            resumeThread7();
            resumeThread8();
            resumeThread11();
            runThreads();
        }
    }
    if (邀请新用户 && 邀请新用户.visibleToUser() === true) {
        lloogg("检测到邀请新用户弹窗");
        lloogg("先暂停");
        if (currentThread !== 100) {
            try {
                pauseThread10();
                pauseThread1();
                pauseThread2();
                pauseThread3();
                pauseThread4();
                pauseThread5();
                pauseThread6();
                pauseThread7();
                pauseThread8();
                pauseThread11();
                先暂停 = 1;
            } catch (e) {
                线 = 0;
            }

        }
        try {
            var shut新用户 = 邀请新用户.parent().child(邀请新用户.parent().children().length - 1);
        } catch (e) {
            lloogg("No shut新用户")
        }
        shut新用户.click();
        回顶();
        if (先暂停 == 1) {
            先暂停 = 0;
            resumeThread10();
            resumeThread1();
            resumeThread2();
            resumeThread3();
            resumeThread4();
            resumeThread5();
            resumeThread6();
            resumeThread7();
            resumeThread8();
            resumeThread11();
            runThreads();
        }
    }
    if (青少年模式 && 青少年模式.visibleToUser() === true) {
        lloogg("检测到青少年模式");
        back();
        回顶();
        // runThreads();
    };
    if (好评弹窗 && 好评弹窗.visibleToUser() === true) {
        lloogg("检测到好评弹窗");
        back();
    };



    sleep(1000);
    //xx完了
    线 = 1;
};




///////////////////////////////////////////////////////
function runThreads() {
    lloogg("正在调用线程");
    threads.start(thread10);
}
function 回顶() {
    goandearn();
    var 抵用金 = textContains("抵用金").findOne(1000);
    if (抵用金 && 抵用金.visibleToUser() == true) {
        doubleclickearnmoney();
    };
};

//
