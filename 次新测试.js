"uuvii"


////////////////////////
///////////////新ui的参数设置
var ksset = storages.create("ksset");

var 选择框_切换账号 = ksset.get("选择框_切换账号");
var 输入框分钟 = ksset.get("输入框分钟");
var 输入框1 = ksset.get("输入框1");
var 输入框11 = ksset.get("输入框11");
var 输入框3 = ksset.get("输入框3");
var 输入框速度调节 = ksset.get("输入框速度调节");
var 悬赏任务 = ksset.get("选择框_悬赏任务");
var 逛街任务 = ksset.get("选择框_逛街任务");
var 点赞任务 = ksset.get("选择框_点赞任务");
var 评论任务 = ksset.get("选择框_评论任务");
var 看视频任务 = ksset.get("选择框_看视频任务");

if (选择框_切换账号 == undefined) {
    选择框_切换账号 = false;
};
if (输入框分钟 == undefined) {
    输入框分钟 = "60";
};
if (输入框1 == undefined) {
    输入框1 = "6";
};
if (输入框11 == undefined) {
    输入框11 = "10";
};
if (输入框3 == undefined) {
    输入框3 = "10";
};
if (输入框速度调节 == undefined) {
    输入框速度调节 = "1.8";
};
if (逛街任务 == undefined) {
    逛街任务 = true;
};
if (悬赏任务 == undefined) {
    悬赏任务 = true;
};
if (点赞任务 == undefined) {
    点赞任务 = true;
};
if (评论任务 == undefined) {
    评论任务 = false;
};
if (看视频任务 == undefined) {
    看视频任务 = true;
};
/////////////////////直接放进老ui参数设置
var global = storages.create("输入框1")
global.put("输入框11", 输入框11);
global.put("输入框1", 输入框1);
// global.put("输入框2", ui.输入框2.text());
// global.put("输入框22", ui.输入框22.text());
global.put("输入框3", 输入框3);
// global.put("输入框33", ui.输入框33.text());
global.put("输入框分钟", 输入框分钟);

global.put("输入框速度调节", 输入框速度调节);
// global.put("快手极速版输入框6", ui.快手极速版输入框6.text());

// global.put("账号文本", ui.账号文本.text());

// global.put("输入框7", ui.输入框7.text());
// global.put("激活码", ui.激活码.text());
global.put("选择框_看视频任务", 看视频任务);
global.put("选择框_评论任务", 评论任务);
global.put("选择框_点赞任务", 点赞任务);
global.put("选择框_逛街任务", 逛街任务);
global.put("选择框_悬赏任务", 悬赏任务);
global.put("选择框_切换账号", 选择框_切换账号);
//////////////////

////////////

let 是否root = false
let 浮窗开过了 = false
let 是否暂停 = false
let arrr = []
var w = device.width;
var h = device.height;
var 是否运行过 = false
var 当前包名 = null
var 异常app = ""

function main() {
    log(global.get("输入框1"), global.get("输入框11"), global.get("输入框3")
        , global.get("输入框分钟"), global.get("输入框速度调节"), global.get("选择框_看视频任务")
        , global.get("选择框_评论任务"), global.get("选择框_点赞任务"), global.get("选择框_逛街任务")
        , global.get("选择框_悬赏任务"), global.get("选择框_切换账号"))
    // 这里写脚本的主逻辑
    // home();
    // threads.start(开启脚本)
    threads.start(function () {
        home();
        if (浮窗开过了 == false) {
            threads.start(悬浮);
            浮窗开过了 = true
        }
        threads.start(开启脚本);
    });
}
function 悬浮() {
    var window = floaty.window(
        <frame>
            <button id="action" text="关闭" w="40" h="40" bg="#ff0000" />
        </frame>
    );
    window.exitOnClose()

    setInterval(() => { }, 1000);
    ui.run(() => { window.setPosition(w * 0.7, 1) })
    var execution = null;
    //记录按键被按下时的触摸坐标
    var x = 0, y = 0;
    //记录按键被按下时的悬浮窗位置
    var windowX, windowY;
    //记录按键被按下的时间以便判断长按等动作
    var downTime;
    window.action.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                //如果按下的时间超过1.5秒判断为长按，退出脚本
                if (new Date().getTime() - downTime > 1500) {
                    exit();
                }
                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    onClick();
                }
                return true;
        }
        return true;
    });
    function onClick() {
        log("程序即将关闭");
        engines.stopAll();
        engines.execScriptFile("main.js")
    }

}



//--------------编辑代码区域-----------------
function 开启脚本() {
    sleep(1000)
    whetherRoot()
    if (是否运行过 == false) {
        // if (!requestScreenCapture()) {
        //     toast("请求截图失败");
        //     sleep(2000)
        //     exit();
        // }
        // events.observeKey();
        // events.onKeyDown("volume_down", function (event) {
        //     toast("脚本停止");
        //     threads.shutDownAll();//停止所有线程
        //     engines.stopAll();
        // });
        是否运行过 = true
        floatyLogInit(6, 0, device.height + 10, true)//
    }

    var state = true, statey = true
    var global = storages.create("输入框1")
    var 开始的 = global.get("输入框1") * 1
    var 结束的 = global.get("输入框11") * 1
    var 速度 = global.get("输入框速度调节") * 1
    var 等待2 = global.get("输入框分钟") * 1
    // var 刷新 = global.get("输入框3") * 1
    // var 点击红包次数 = global.get("输入框33") * 1
    var 用户名 = global.get("激活码")
    // if (!验证用户("290930233", "雅视分身阅读", 用户名)) {
    //     alert('用户名有误或超过最大使用设备数!')
    //     exit() //如果验证不通过 退出脚本
    // }
    toastLog("--开始运行--")
    sleep(2000)
    awglobal配置("广告高度", false)
    var 这次随机2, 当前点击红包次数 = 0, 最后达标 = 0
    // if (ui.选择框_记忆.isChecked() == true && awglobal配置("记忆") != undefined) { 顺序 = awglobal配置("记忆") }

    while (true) {
        aw打开app("快手")
        sleep(7000)
        关闭其他应用()
        sleep(2000)
        toastLog("--先强关一次快手--")
        aw打开app("快手")
        sleep(7000)
        if (global.get("选择框_切换账号")) {
            快手切换账号()
            运行阅读(等待2)
        } else {
            运行阅读(null)
        }

        home()
        sleep(2000)
    }

    // aw打开app("ks7天任务")
    alert('今日任务已完成!')
    exit() //如果验证不通过 退出脚本

}


function 快手切换账号() {
    toast("快手切号")//显示
    aw打开app("快手")
    sleep(8000)
    app.startActivity({
        data: "kwai://settings"
    })//快手设置
    sleep(8000)
    全能滑动(w * 0.5, h * 0.8, w * 0.5, h * 0.1, 1000)
    sleep(1000)
    全能滑动(w * 0.5, h * 0.8, w * 0.5, h * 0.1, 1000)
    sleep(1000)
    全能滑动(w * 0.5, h * 0.8, w * 0.5, h * 0.1, 1000)
    sleep(4000)
    awcontrol(/切换帐号|切换账号/, 0) && sleep(2000)//
    if (awcontrol(/当前使用/, 1)) {
        var 位置 = awcontrol(/当前使用/, 2)
        if (位置) {
            if (位置[0] > w * 0.5) {
                全能点击(w * 0.3, 位置[1] - 150)
            } else {
                全能点击(w * 0.7, 位置[1] - 150)
            }
        }
    }
    sleep(8000)
    app.startActivity({
        data: "kwai://home"
    })//快手主页
    sleep(3000)

}

function 返回首页() {
    for (let index = 0; index < 6; index++) {
        if (awcontrol(/首页/, 1, 2000)) {
            break
        } else if (awcontrol(/放弃奖励/, 0)) {
            sleep(2000)
        } else {
            back()
            sleep(2000)
        }
    }
}


function 运行阅读(参数1) {
    var global = storages.create("输入框1")
    var 开始的 = global.get("输入框1") * 1
    var 结束的 = global.get("输入框11") * 1
    var 分钟 = global.get("输入框3") * 60
    var 速度 = global.get("输入框速度调节") * 1
    var statey = true, 是否签到了 = false, 卡秒 = 0, 滑动次数 = 0, 最后看一次 = false
    var 悬赏任务 = true, 逛街任务 = true, 点赞任务 = true, 评论任务 = true, 看视频任务 = true
    if (global.get("选择框_悬赏任务") == false) {
        悬赏任务 = false
    }
    if (global.get("选择框_逛街任务") == false) {
        逛街任务 = false
    }
    if (global.get("选择框_点赞任务") == false) {
        点赞任务 = false
    }
    if (global.get("选择框_评论任务") == false) {
        评论任务 = false
    }
    if (global.get("选择框_看视频任务") == false) {
        看视频任务 = false
    }
    var 看下视频 = 0
    sleep(8000)//
    返回首页()
    aw定时判断("强制返回")
    aw定时判断("识别")
    aw定时判断("点击了广告")
    aw定时判断("运行切换账号")
    var 点击了广告 = false, 连续性 = 0, 签到 = true, 去看视频任务 = true, 立即领取点击 = true
    var 连续识别不到 = 0, 连续识别不到1 = 0, 定位 = false, 连续拉倒页数 = 0
    while (statey) {
        if (参数1 != null) {
            if (aw定时判断("运行切换账号", 参数1 * 60)) {
                toast("运行时间到,快手切号")//显示
                floatyLog("运行时间到,快手切号")
                aw打开app("快手")
                sleep(8000)
                返回首页()
                if (aw找文字节点("首页", 0)) {
                    sleep(3000 * 速度)
                    if (awcontrol("com.smile.gifmaker:id/close_btn", 0, "id")) {  //红包
                        sleep(3000 * 速度)
                    } else if (awcontrol("com.smile.gifmaker:id/pendant_mask_bg", 0, "id")) {  //红包
                        sleep(3000 * 速度)
                    } else {
                        toastLog("盲点")
                        全能点击(w * 0.1, h * 0.22)
                        sleep(3000 * 速度)
                    }
                }
                if (awcontrol(/日常任务|详情|新手任务/, 1, 3000)) {
                    floatyLog("日常任务")
                    全能滑动(w * 0.3, h * 0.3, w * 0.3, h * 0.8, 800)
                    sleep(1000)
                    全能滑动(w * 0.3, h * 0.3, w * 0.3, h * 0.8, 800)
                    sleep(1000)
                    awcontrol(/点击领取/, 0) && sleep(4000 * 速度)
                    awcontrol(/点击领取/, 0) && sleep(4000 * 速度)
                    awcontrol(/点击领取/, 0) && sleep(4000 * 速度)//
                    for (let index = 0; index < 3; index++) {
                        全能滑动(w * 0.3, h * 0.7, w * 0.3, h * 0.4, 800)
                        sleep(1000)
                        awcontrol(/立即领取|点击领取/, 0, 1000) && sleep(3000 * 速度)
                        awcontrol(/知道了/, 0) && sleep(3000 * 速度)
                    }
                    home()
                    sleep(3000 * 速度)
                }
                floatyLog("结束")
                return true
            }
        }
        if (aw定时判断("强制返回", 分钟)) {
            返回首页()
            关闭其他应用()
            aw打开app("快手")
            sleep(8000)
            aw定时判断("强制返回")
            去看视频任务 = true
            立即领取点击 = true
        }
        var 什么都识别不到 = false
        if (aw找文字节点("知道了", 0)) {
            sleep(1000 * 速度)
        } else if (aw找文字节点("允许", 0)) {
            sleep(1000 * 速度)
        } else if (aw找文字节点("同意并继续", 0)) {
            sleep(1000 * 速度)
        } else if (awcontrol(/请完成安全验证/, 1)) {
            返回首页()
            关闭其他应用()
            aw打开app("快手")
            sleep(8000)
        } else if (awcontrol(/喜欢就给格好评吧/, 1)) {
            log("返回喜欢给好评")
            back()
            sleep(3000 * 速度)//
        } else if (awcontrol(/立即签到|立刻领.*金币/, 0)) {
            sleep(3000 * 速度)
            if (awcontrol(/立即领取/, 0)) {
                sleep(3000 * 速度)//
            }
            if (awcontrol(/立即领取/, 0, 1)) {
                sleep(3000 * 速度)//
            }
            if (awcontrol(/立即签到/, 0)) {
                sleep(3000 * 速度)//
            }
            if (awcontrol(/提醒我明日来领/, 1)) {
                back()
                sleep(3000 * 速度)//
            }
            if (awcontrol(/看完视频再领.*金币|继续观看|一键领取|立即解锁章节|看精彩视频.*赚更多|继续看视频赚更多|看精彩视频.*金币|继续逛街|领金币|再看一个.*金币|以后再说|始终允许|观看广告最高可得.*金币|再看一个|看视频赚更多金币|看视频赚.*金币/, 0)) {
                sleep(3000 * 速度)
                if (awcontrol(/领金币/, 1)) {
                    sml_move(w * 0.3, h * 0.8, w * 0.3, h * 0.5, aw随机(700, 1200));
                    sleep(3000 * 速度)
                    awcontrol(/领金币/, 0) && sleep(3000 * 速度)//
                }
            }
        } else if (awcontrol(/看完视频再领.*金币|继续观看|一键领取|立即解锁章节|看精彩视频.*赚更多|继续看视频赚更多|看精彩视频.*金币|继续逛街|领金币|再看一个.*金币|以后再说|始终允许|观看广告最高可得.*金币|再看一个|看视频赚更多金币|看视频赚.*金币/, 0)) {
            sleep(3000 * 速度)
            if (awcontrol(/领金币/, 1)) {
                sml_move(w * 0.3, h * 0.8, w * 0.3, h * 0.5, aw随机(700, 1200));
                sleep(3000 * 速度)
                awcontrol(/领金币/, 0) && sleep(3000 * 速度)//
            }
        } else if (awcontrol(/限时奖励开启/, 1)) {
            全能点击(w * 0.5, h * 0.57)
            sleep(3000 * 速度)
        } else if (去看视频任务 && awcontrol(/去看视频/, 0)) {
            sleep(10000 * 速度)
            去看视频任务 = false
        } else if (awcontrol(/看视频领取每日金币奖励/, "+0,-110")) {
            sleep(3000 * 速度)
        } else if (aw找文字节点("立即获取", 1)) {
            定位 = aw找文字节点("立即获取", 1)
            if (定位) {
                awglobal配置("广告高度", 定位[1])
            }
            sleep(1000)//
        } else if (awcontrol(/客服|发条有爱评论.*/, 1)) {
            back()
            sleep(2000)//
        } else if (awcontrol(/点击进入直播间|点击查看/, 1)) {
            sml_move(w * 0.3, h * 0.8, w * 0.3, h * 0.2, aw随机(700, 1200));
            sleep(3000)
        } else if (awcontrol(/逛逛街.*多赚钱|浏览.*秒可领.*金币|更多商品/, 1)) {
            sml_move(w * 0.3, h * 0.8, w * 0.3, h * 0.1, aw随机(700, 1200));
            sleep(1000 * aw随机(开始的, 结束的))
            sml_move(w * 0.3, h * 0.8, w * 0.3, h * 0.2, aw随机(700, 1200));
            sleep(1000 * aw随机(开始的, 结束的))
            if (awcontrol(/浏览10秒.*/, 0)) {
                sleep(13000 * 速度)
                if (aw随机(0, 2) == 1) {
                    sml_move(w * 0.3, h * 0.8, w * 0.3, h * 0.2, aw随机(700, 1200));
                    sleep(1000 * aw随机(开始的, 结束的))
                }

            }

        } else if (awcontrol(/.*后可领取奖励|已成功领取奖励/, 1)) {
            log("后可领取奖励,再等等")
            sleep(3000 * 速度)
            var 领取成功控件 = awcontrol(/已成功领取奖励/, 5)
            if (领取成功控件) {
                let 右x = 领取成功控件.bounds().right
                let 右y = 领取成功控件.bounds().centerY()
                全能点击(右x - 3, 右y)
                sleep(3000)
            }
        } else if (awcontrol("com.smile.gifmaker.neo_video:id/video_countdown_end_icon", 0, "id")) {
            log("快手广告")
            sleep(3000 * 速度)


        } else if (awcontrol(/日常任务|详情|新手任务/, 1)) {
            if (悬赏任务 && awcontrol(/.*金币悬赏任务|最高.*金币悬赏/, 1)) {
                if (任务是否完成(/.*金币悬赏任务|最高.*金币悬赏/)) {
                    悬赏任务 = false
                } else {
                    awcontrol(/.*金币悬赏任务|最高.*金币悬赏/, 0) && sleep(4000 * 速度)
                }
            } else if (点赞任务 && awcontrol(/点赞.*个作品/, 1)) {
                if (任务是否完成(/点赞.*个作品/)) {
                    点赞任务 = false
                } else {
                    awcontrol(/点赞.*个作品/, 0) && sleep(4000 * 速度)
                    if (awcontrol(/精选/, 0)) {
                        sleep(2000)
                        全能滑动(w * 0.3, h * 0.8, w * 0.3, h * 0.2, 800)
                        sleep(1000 * aw随机(开始的, 结束的))
                        awcontrol("com.smile.gifmaker:id/like_icon", 0, "id") && sleep(3000 * 速度)
                    }
                }
            } else if (评论任务 && awcontrol(/评论.*个作品/, 1)) {
                if (任务是否完成(/评论.*个作品/)) {
                    评论任务 = false
                } else {
                    awcontrol(/评论.*个作品/, 0) && sleep(4000 * 速度)
                    var 是否又领金币 = awcontrol(/评论.*个作品/, 2)
                    if (是否又领金币) {
                        全能点击(w * 0.95, 是否又领金币[1])
                        sleep(4000 * 速度)
                    }
                    if (awcontrol(/精选/, 0)) {
                        sleep(2000)
                        全能滑动(w * 0.3, h * 0.8, w * 0.3, h * 0.2, 800)
                        sleep(3000 * 速度)
                        sleep(1000 * aw随机(开始的, 结束的))
                        awcontrol("com.smile.gifmaker:id/comment_icon", 0, "id") && sleep(3000 * 速度)
                        awcontrol(/发条有爱评论.*/, 0) && sleep(3000 * 速度)
                        awcontrol("com.smile.gifmaker:id/emoji", 0, aw随机(1, 5), "id") && sleep(3000 * 速度)
                        awcontrol(/发送/, 0) && sleep(3000 * 速度)
                        awcontrol(/发送/, 0, "desc") && sleep(3000 * 速度)
                        back()
                        sleep(2000)//
                        awcontrol(/发送/, 0) && sleep(3000 * 速度)
                        awcontrol(/发送/, 0, "desc") && sleep(3000 * 速度)
                    }
                }
            } else if (逛街任务 && awcontrol(/逛街领.*金币/, 1)) {
                if (任务是否完成(/逛街领.*金币/)) {
                    逛街任务 = false
                } else {
                    awcontrol(/逛街领.*金币/, 0) && sleep(4000 * 速度)
                }
            } else if (逛街任务 == false && 看视频任务 && awcontrol(/看视频.*赚金币/, 1)) {
                if (任务是否完成(/看视频.*赚金币/)) {
                    看视频任务 = false
                } else {
                    awcontrol(/看视频.*赚金币/, 0) && sleep(4000 * 速度)
                    if (awcontrol(/精选/, 1)) {
                        var 精选位置 = awcontrol(/精选/, 2)
                        if (精选位置) {
                            全能点击(精选位置[0], 精选位置[1])
                            sleep(100)
                            全能点击(精选位置[0], 精选位置[1])
                            sleep(3500)
                        }
                        for (let index = 0; index < aw随机(10, 20); index++) {
                            sml_move(w * 0.1, h * 0.85, w * 0.1, h * 0.1, aw随机(700, 1200));
                            sleep(1000)
                            if (awcontrol(/点击进入直播间|点击查看/, 1)) {
                                sml_move(w * 0.1, h * 0.85, w * 0.1, h * 0.1, aw随机(700, 1200));
                                sleep(1000)
                            } else if (awcontrol(/请完成安全验证/, 1)) {
                                break
                            } else {
                                sleep(1000 * aw随机(开始的, 结束的))
                            }

                        }
                    }
                }
            } else if (立即领取点击 && awcontrol(/立即领取/, 0)) {
                log("立即领取")
                sleep(3000 * 速度)
                立即领取点击 = false
            } else {
                全能滑动(w * 0.3, h * 0.8, w * 0.3, h * 0.2, 800)
                sleep(3000 * 速度)
                连续拉倒页数 = 连续拉倒页数 + 1
                if (连续拉倒页数 >= 5) {
                    back()
                    sleep(3000 * 速度)
                    连续拉倒页数 = 0
                    关闭其他应用()
                }
                if (悬赏任务 == false && 逛街任务 == false && 点赞任务 == false && 看视频任务 == false && 评论任务 == false) {
                    if (awcontrol(/明日领.*金币/, 1)) {
                        for (let index = 0; index < 3; index++) {
                            全能滑动(w * 0.3, h * 0.3, w * 0.3, h * 0.8, 800)
                            sleep(1000)
                            awcontrol(/立即领取/, 0, 1000) && sleep(3000 * 速度)
                            awcontrol(/知道了/, 0) && sleep(3000 * 速度)
                        }
                        全能滑动(w * 0.3, h * 0.3, w * 0.3, h * 0.8, 800)
                        sleep(1000)
                        全能滑动(w * 0.3, h * 0.8, w * 0.3, h * 0.3, 800)
                        sleep(1000)
                        awcontrol(/点击领取/, 0) && sleep(4000 * 速度)
                        awcontrol(/点击领取/, 0) && sleep(4000 * 速度)
                        awcontrol(/点击领取/, 0) && sleep(4000 * 速度)
                        home()
                        sleep(3000 * 速度)
                        关闭其他应用()
                        return true
                    } else {
                        toastLog("--等宝箱--")
                        sleep(30000)
                    }

                }
            }
        } else if (awcontrol(/去赚钱|关闭应用/, 0)) {
            sleep(3000 * 速度)
        } else if (awcontrol(/首页/, 1) == false && awcontrol(/返回|取消|否/, 0)) {
            sleep(3000 * 速度)
        } else if (awcontrol(/首页/, 1) == false && awcontrol(/返回|取消|否/, 0, "desc")) {
            sleep(3000 * 速度)
            if (aw找文字节点("首页", 0)) {
                sleep(3000 * 速度)
                if (awcontrol("com.smile.gifmaker:id/close_btn", 0, "id")) {  //红包
                    sleep(3000 * 速度)
                } else if (awcontrol("com.smile.gifmaker:id/pendant_mask_bg", 0, "id")) {  //红包
                    sleep(3000 * 速度)
                } else {
                    toastLog("盲点")
                    全能点击(w * 0.1, h * 0.22)
                    sleep(3000 * 速度)
                }
            }
        } else if (awcontrol(/立即领取/, 0)) {
            log("立即领取")
            sleep(3000 * 速度)

            // } else if (签到 && awcontrol("com.kuaishou.nebula:id/circular_progress_bar", 0, "id")) {
            //     log("点红包")
            //     签到 = false
            //     sleep(3000 * 速度)

        } else if (awcontrol("com.smile.gifmaker:id/kem_normal_pendant", 0, "id")) {
            sleep(3000 * 速度)

        } else if (awcontrol(/.*条评论/, 1)) {
            back()
            sleep(3000 * 速度)
        } else if (aw找文字节点("首页", 0)) {
            sleep(3000 * 速度)
            if (awcontrol("com.smile.gifmaker:id/close_btn", 0, "id")) {  //红包
                sleep(3000 * 速度)
            } else if (awcontrol("com.smile.gifmaker:id/pendant_mask_bg", 0, "id")) {  //红包
                sleep(3000 * 速度)
            } else {
                toastLog("盲点")
                全能点击(w * 0.1, h * 0.22)
                sleep(3000 * 速度)
            }
            // if (aw找文字节点("首页", 1)) {

            // }

        } else if (awcontrol(/说点什么/, 1)) {
            back()
            sleep(3000 * 速度)
            aw找文字节点("首页", 0)
            sleep(3000 * 速度)
        } else if (aw找文字节点("我的", 0)) {
            sleep(1000 * 速度)

        } else if (awcontrol(/继续阅读下一页|看广告免.*分钟广告.*/, "+0,-50")) {
            log("继续阅读下一页")
            sleep(3000 * 速度)
            awcontrol(/继续阅读下一页|看广告免.*分钟广告.*/, 0) && sleep(3000 * 速度)
            if (awcontrol(/限时福利/, 1)) {
                全能点击(w * 0.5, h * 0.67)
                sleep(3000 * 速度)
            }
        } else if (awcontrol(/最近阅读|每读.*分|每读.*章/, 1)) {
            sleep(1000 * 速度)
            var 随机划 = aw随机(0, 10)
            for (let index = 0; index < 随机划; index++) {
                全能滑动(w * 0.4, h * 0.8, w * 0.4, h * 0.1, 800)
                sleep(1500 * 速度)
            }
            awcontrol(/最近阅读|每读.*分|每读.*章/, "+0,+150") && sleep(3000 * 速度)
        } else if (aw找文字节点("快手", 0)) {
            sleep(1000 * 速度)
        } else {
            什么都识别不到 = true
        }
        if (什么都识别不到 && aw定时判断("识别", 20)) {
            back();//返回//
            sleep(3000 * 速度)
            关闭其他应用()
            aw打开app("快手")
            sleep(8000)
            aw定时判断("识别")
        } else if (什么都识别不到 == false) {
            aw定时判断("识别")
            连续识别不到 = 0
        }

    }

}

function 任务是否完成(参数1) {
    var 控件 = awcontrol(参数1, 5)
    if (控件) {
        控件 = 控件.parent().parent()
        log(控件)
        var 结果 = 控件.findOne(text('已完成')) || 控件.findOne(text('今日任务已完成，明日赚更多'))
        if (结果) {
            log("任务已完成")
            return true
        }
    }
    return false
}

//此代码由飞云脚本圈整理提供（www.feiyunjs.com）
function bezier_curves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;
    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;
    tSquared = t * t;
    tCubed = tSquared * t;
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
};

//仿真随机带曲线滑动  
//qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,过程耗时单位毫秒
function sml_move(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };

    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {

        eval("point.push(dx" + i + ")");

    };
    // log(point[3].x)

    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]

        xxy.push(xxyy);

    }

    // log(xxy);
    gesture.apply(null, xxy);
};


function 区域找第一个节点(x, y) {
    var 点击次 = 0
    for (let index = 1; index < 50; index++) {
        var 增加 = 5 * index
        var 范围 = boundsInside(x * 1 - 增加, y * 1 - 增加, x * 1 + 增加, y * 1 + 增加).visibleToUser(true).find()
        for (let item of 范围) {
            log(item)
            全能点击(item.bounds().centerX(), item.bounds().centerY());
            sleep(1000)
            // if (awcontrol(/任务中心/, 1, 2000)) {
            return
            // } else if (点击次 >= 1) {
            // return
            // }
            // 点击次 = 点击次 + 1
        }
    }
}

function kuaishou_blackScreen() {

    for (let i = 0; i < 5; i++) {
        scrollDown(i)
    }

}


function 关闭其他应用() {
    home();//home
    sleep(2500)
    log("--清应用--")
    recents();//任务管理
    sleep(3500)
    switch (true) {
        case aw找id("com.huawei.android.launcher:id/clear_all_recents_image_button", 0, 0.2):
            break;
        case aw找id("com.android.systemui:id/recent_igmbutton_clear_all", 0, 0.2):
            break;
        case aw找id("com.android.systemui:id/clear_button", 0, 0.2):
            break;
        case aw找id("com.android.systemui:id/clearAnimView", 0, 0.2):
            break;
        case aw找文字节点("关闭全部", 0):
            break;
        case aw找文字节点("清除", 0):
            break;
        case aw找文字节点("全部清除", 0):
            break;
        case aw找文字节点("全部清理", 0):
            break;
        case aw找文字节点("全部清理", 0):
            break;
        case aw找文字节点("可用", 0, 0, false):
            break;
        case aw找文字节点("释放内存", 0, 0, false):
            break;
        case aw找文字节点("清除全部", 0, 0, false):
            break;
        default:
            全能点击(w * 0.5, h * 0.8)
            全能点击(w * 0.5, h * 0.9)
    }
    sleep(3000)
    home();//home
    sleep(2500)
}
function awcontrol() {

    try {
        var 方式, 查找位数, 找秒方式 = false
        if (isNaN(arguments[2]) == false) {
            if (arguments[2] < 100) {
                找秒方式 = false
                查找位数 = arguments[2]
                if (arguments[3] != "id" && arguments[3] != "text" && arguments[3] != "desc") {
                    方式 = "text"
                } else {
                    方式 = arguments[3]
                }
            } else {
                找秒方式 = true
                查找位数 = arguments[2]
                if (arguments[3] != "id" && arguments[3] != "text" && arguments[3] != "desc") {
                    方式 = "text"
                } else {
                    方式 = arguments[3]
                }
            }
        } else {
            找秒方式 = false
            查找位数 = 0
            if (arguments[2] != "id" && arguments[2] != "text" && arguments[2] != "desc") {
                方式 = "text"
            } else {
                方式 = arguments[2]
            }
        }
        var 内容分析 = arguments[0]
        var 控件
        log("查找:" + arguments[0])
        if (找秒方式 == false) {
            if (方式 == "id") {
                控件 = idMatches(内容分析).visibleToUser(true).findOnce(查找位数);
            } else if (方式 == "desc") {
                控件 = descMatches(内容分析).visibleToUser(true).findOnce(查找位数);
            } else {
                控件 = textMatches(内容分析).visibleToUser(true).findOnce(查找位数);
            }
        } else {
            // log("查找位数:" + 查找位数)
            if (方式 == "id") {
                控件 = idMatches(内容分析).visibleToUser(true).findOne(查找位数);
            } else if (方式 == "desc") {
                控件 = descMatches(内容分析).visibleToUser(true).findOne(查找位数);
            } else {
                控件 = textMatches(内容分析).visibleToUser(true).findOne(查找位数);
            }
        }

        if (控件) {
            let t = 控件.text()
            let tid = 控件.id()
            let x = 控件.bounds().centerX()
            let y = 控件.bounds().centerY()
            switch (true) {
                case arguments[1] == 0:
                    全能点击(x, y);
                    return true
                case arguments[1] == 1:
                    log(x, y);
                    return true
                case arguments[1] == 2:
                    return [x, y]
                case arguments[1] == 3:
                    return t
                case arguments[1] == 4:
                    return tid
                case arguments[1] == 5:
                    return 控件
                case arguments[1] == 6:
                    let pNode = 控件.parent()
                    return pNode
                default:
                    var aw数据后 = arguments[1].split(",");
                    全能点击(x + (aw数据后[0] * 1), y + (aw数据后[1] * 1));
                    return true
            }
        } else {
            return false
        }
    } catch (error) {
        log("识别失败，错误原因：" + error);
        return false
    }
}
/**
 * 悬浮输出日志
 * @Autor: 白丁
 * @QQ: 479360791
 * @param {number} linesCount - 显示日志行数,默认6行
 * @param {number} x - 悬浮窗左上角位置x,默认0
 * @param {number} y - 悬浮窗左上角位置y,默认10
 * @param {boolean} islog - 是否打印到控制台,默认打印
 * @example 使用前调用 floatylogInit(linesCount,x,y,islog) 初始化配置
 *          用floatylog()输出日志
 */
function floatyLogInit(linesCount, x, y, islog) {
    linesCount = linesCount || 6;
    if (typeof linesCount != 'number') linesCount = 6;
    if (typeof x != 'number') x = 0;
    if (typeof y != 'number') y = 10;
    if (typeof islog != 'boolean') islog = true;

    ww = floaty.rawWindow(
        <horizontal id='move' background='#FFFF0000' paddingLeft="10" paddingRight="10" w="*">
            <button id='log' textSize="13dp" textColor="white" style="Widget/AppCompat.Button.Borderless" text='[开始运行]' textStyle='bold'
                layout_gravity="right" layout_weight='5' layout_width="wrap_content" layout_height="wrap_content" />
        </horizontal>
    );
    ww.setTouchable(false);
    ui.run(() => { ww.setPosition(x, y) })

    let nowlogArr = [];
    floatyLog = function () {
        let s = '[' + dateFormat(new Date(), "hh:mm:ss") + '] '
        for (let param of arguments) s += param + ' ';
        nowlogArr.push(s);

        if (nowlogArr.length > linesCount) nowlogArr.shift();
        let printContent = nowlogArr.join('\n');
        ui.run(() => { ww.log.text(printContent) })
        if (islog) log(s);
    }

    floatyShow = function (x, y) {
        let _x = x || 0
        let _y = y || 10
        ui.run(() => { ww.setPosition(_x, _y) })
    }

    floatyHide = function () {
        ui.run(() => { ww.setPosition(3000, 3000) })
    }


    function dateFormat(date, fmt) {
        let o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
}
function 滑块处理() {
    var startX = 121
    var startY = 977
    var dx = 60
    var refreshX = 100
    var refreshY = 100
    if (device.width == 720) {
        startX = 80
        startY = 630
        dx = 40
        refreshX = 100
        refreshY = 765
    }
    for (var i = 0; i < 10; i++) {
        if (text("加载中...").findOnce() == null) { break }
        sleep(1000)
    }
    sleep(2000)
    while (text("拖动滑块").findOnce()) {
        try {
            var img = images.clip(images.captureScreen(), 0, 0, device.width, device.height * 0.6)
            if (img) {
                var x = 缺口识别(img)
                if (x > 100) {
                    x = x + dx + random(10, 15)
                    if (device.sdkInt < 24) {
                        Swipe(startX, startY, x, startY, 1800)
                    } else {
                        过滑块_Android7(startX, startY, x, startY, random(1200, 1500))
                    }
                } else {
                    log('识别失败')
                }
                sleep(4000)
                全能点击(refreshX, refreshY)
            } else {

            }
        } catch (e) { log(e) }
        sleep(3000)
    }
}

function 缺口识别(img) {
    var temp, temp2, x, y, num, color, p, temp3, arr1;
    var tb = [0, 0, img.getWidth(), img.getHeight(), device.width / 8.64]
    num = Math.ceil(tb[4] / 3.3 - 4);
    for (var k = 29; k <= 40; k++) {
        temp2 = "";
        color = "#" + k + "" + k + "" + k + "";
        for (var i = 1; i <= num; i++) {
            temp2 = temp2 + "0|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|0|" + color + ",";
            temp2 = temp2 + "1|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|1|" + color + ",";
            temp2 = temp2 + "2|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|2|" + color + ",";
        }
        x = 0;
        while (x > -2) {
            y = 0;
            while (y > -2) {
                temp = "";
                for (var i = 1; i <= num; i += 2) {
                    temp = temp + "0|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|0|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + "1|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|1|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y - 1) + "|" + color + ",";
                }
                temp = temp + temp2 + "0|0|" + color;
                arr1 = temp.split(",");
                var arr2 = new Array();
                for (var i = 0; i < arr1.length - 1; i++) {
                    arr2[i] = new Array();
                    temp3 = arr1[i].split("|");
                    arr2[i] = [Number(temp3[0]), Number(temp3[1]), temp3[2]];
                }
                try {
                    p = images.findMultiColors(img, color, arr2, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        return p.x
                    }
                } catch (error) {
                    log("识别失败，错误原因：" + error, true);
                    return -1;
                }
                y = --y;
            }
            x = --x;
        }
    }
    try {
        img.recycle();
    } catch (error) {
        log("识别失败，错误原因：" + error, true);
    }
    return -1;
}

function 过滑块_Android7(x1, y1, x2, y2, time) {
    var obj = {}
    for (let i = 0; i < 1; i++) {
        let index = '序号' + i
        obj[index] = []
        obj[index].push(0)
        obj[index].push(time)
        obj[index].push([x1, y1]);
        obj[index].push([x2 * 0.8, y1 + random(-20, 20)]);
        obj[index].push([x2 * 0.99, y2 + random(-20, 20)]);
        obj[index].push([x2, y2 + random(-20, 20)]);
        obj[index].push([x2, y2 + 60]);
    }
    return gestures(obj['序号0'])
}

function aw打开app(参数1) {
    launchApp(参数1)
    aw找文字节点(参数1, 0)
}
function aw点击输入(password, 参数2) {
    let strArr = password.replace(/(.)(?=[^$])/g, "$1,").split(",");
    for (let item of strArr) {
        log(item)
        var 我的
        我的 = text(item).visibleToUser(true).findOne(600);
        if (我的 != null) {
            全能点击(我的.bounds().centerX(), 我的.bounds().centerY());
            sleep(参数2);
        }

    }
}

function whetherRoot() {
    threads.start(function () {
        log('判断是否root')
        try {
            click(2000, 2500)
            是否root = false
            log('安卓7+')
        } catch (error) {
            是否root = true
            log(error)
            log('安卓7-')
        }
    })
}
function 全能滑动(参数1, 参数2, 参数3, 参数4, 参数5) {
    if (是否root == true) {
        Swipe(参数1, 参数2, 参数3, 参数4, 参数5)
    } else {
        swipe(参数1, 参数2, 参数3, 参数4, 参数5)
    }
}
function 全能点击(参数1, 参数2) {
    if (是否root == true) {
        Tap(参数1, 参数2)
    } else {
        click(参数1, 参数2)
    }
}

function aw找点(参数1, 参数2, 参数3) {
    var 我的
    if (参数3 < 1) {
        我的 = text(参数1).visibleToUser(true).findOne(600);
    } else {
        我的 = text(参数1).visibleToUser(true).findOne(参数3 * 1000);
    }
    if (我的 != null) {
        switch (true) {
            case 参数2 == 0:
                全能点击(我的.bounds().centerX(), 我的.bounds().centerY());
                return true
            case 参数2 == 1:
                log(我的.bounds().centerX(), 我的.bounds().centerY());
                return true
            case 参数2 == 2:
                return [我的.bounds().centerX(), 我的.bounds().centerY()]
            default:
                var aw数据后 = 参数2.split(",");
                全能点击(我的.bounds().centerX() + (aw数据后[0] * 1), 我的.bounds().centerY() + (aw数据后[1] * 1));
                return true
        }
    } else {
        return false

    }
}

function aw找desc(参数1, 参数2, 参数3) {
    var 我的
    if (参数3 < 1) {
        我的 = desc(参数1).visibleToUser(true).findOne(600);
    } else {
        我的 = desc(参数1).visibleToUser(true).findOne(参数3 * 1000);
    }
    if (我的 != null) {
        switch (true) {
            case 参数2 == 0:
                全能点击(我的.bounds().centerX(), 我的.bounds().centerY());
                return true
            case 参数2 == 1:
                log(我的.bounds().centerX(), 我的.bounds().centerY());
                return true
            case 参数2 == 2:
                return [我的.bounds().centerX(), 我的.bounds().centerY()]
            default:
                var aw数据后 = 参数2.split(",");
                全能点击(我的.bounds().centerX() + (aw数据后[0] * 1), 我的.bounds().centerY() + (aw数据后[1] * 1));
                return true
        }
    } else {
        return false

    }
}


function aw找id(参数1, 参数2, 参数3) {
    var 我的
    if (参数3 < 1) {
        我的 = id(参数1).visibleToUser(true).findOne(600);
    } else {
        我的 = id(参数1).visibleToUser(true).findOne(参数3 * 1000);
    }
    if (我的 != null) {
        switch (true) {
            case 参数2 == 0:
                全能点击(我的.bounds().centerX(), 我的.bounds().centerY());
                return true
            case 参数2 == 1:
                log(我的.bounds().centerX(), 我的.bounds().centerY());
                return true
            case 参数2 == 2:
                return [我的.bounds().centerX(), 我的.bounds().centerY()]
            default:
                var aw数据后 = 参数2.split(",");
                全能点击(我的.bounds().centerX() + (aw数据后[0] * 1), 我的.bounds().centerY() + (aw数据后[1] * 1));
                return true
        }

    } else {
        return false
    }
}
/*
var 位置 = 找文字节点("关注", 2,0)
log(位置[1])
log(找文字节点("抖音", 1, 0,false))//模糊查找
*/
function aw找文字节点() {
    if (是否暂停) {
        var statey = true
        while (statey) {
            if (是否暂停 == false) {
                return false
            } else {
                toast("暂停中")//显示
                log(是否暂停)
                sleep(3000)
            }
        }
    }
    let arr = packageNameMatches(/.*/).visibleToUser(true).find()
    let 数量 = 0
    let regexp = '/^' + arguments[0] + '$/';
    log("aw找文字节点:" + arguments[0])
    if (arguments.length - 1 >= 3) {
        if (arguments[3] == false) { regexp = '/.*' + arguments[0] + '.*/' }
    }
    if (!arr.empty()) {
        for (let item of arr) {
            let t = item.text() || item.desc()
            if (eval(regexp).test(t)) {
                let t = item.text()
                let x = item.bounds().centerX()
                let y = item.bounds().centerY()
                if (arguments.length - 1 == 2) {
                    if (数量 >= arguments[2]) {
                        switch (true) {
                            case arguments[1] == 0:
                                全能点击(x, y);
                                return true
                            case arguments[1] == 1:
                                log(x, y);
                                return true
                            case arguments[1] == 2:
                                return [x, y]
                            default:
                                var aw数据后 = 参数2.split(",");
                                全能点击(x + (aw数据后[0] * 1), y + (aw数据后[1] * 1));
                                return true
                        }
                    } else {
                        数量 = 数量 + 1
                    }
                } else {
                    switch (true) {
                        case arguments[1] == 0:
                            全能点击(x, y);
                            return true
                        case arguments[1] == 1:
                            log(x, y);
                            return true
                        case arguments[1] == 2:
                            return [x, y]
                        default:
                            var aw数据后 = arguments[1].split(",");
                            全能点击(x + (aw数据后[0] * 1), y + (aw数据后[1] * 1));
                            return true
                    }
                }

            }
        }
    }
    return false
}


/*
log(文件写入("/sdcard/测试.txt",123));  //输入文本
*/
function aw文件写入() {
    if (arguments.length - 1 == 1) {
        if (files.createWithDirs(arguments[0])) {
            files.append(arguments[0], arguments[1]);
        } else {
            files.append(arguments[0], "\r\n" + arguments[1]);
        }
        return true
    } else {
        toastLog("参数错误")
        return false
    }
}
/*
log(global配置("t"))//读出
 global配置("t",1)//写入
*/
function awglobal配置() {
    var storag = storages.create("配置参数")
    if (arguments.length - 1 == 1) {
        storag.put(arguments[0], arguments[1]);
        return true
    } else {
        return storag.get(arguments[0])
    }
}

//md5加密
function getMd5(string) {
    return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16);
};
/*
    log(定时判断("t")) //初始
    log(定时判断("t",120)) //定时判断
*/
function aw定时判断() {
    var t = +new Date() / 1000
    if (arguments.length - 1 == 1) {
        if (+new Date() / 1000 - awglobal配置(arguments[0] + "定时") * 1 >= arguments[1] * 1) {
            if (arguments[0] == "app定时") { awglobal配置("还剩时间", 0) }
            toastLog(arguments[0] + "已超时")
            // floatyLog(arguments[0] + "已超时")
            return true
        } else {
            var 取整 = (+new Date() / 1000 - awglobal配置(arguments[0] + "定时") * 1) / 60
            var 刚刚 = ~~取整
            if (awglobal配置(arguments[0] + "刚刚定时") != 刚刚) {
                awglobal配置(arguments[0] + "刚刚定时", 刚刚)
                取整 = arguments[1] / 60 - 刚刚
                if (arguments[0] == "app定时") { awglobal配置("还剩时间", 取整) }
                // floatyLog(arguments[0] + ":" + ~~取整 + "分钟")
                toastLog(arguments[0] + ":" + ~~取整 + "分钟")
            }
            return false
        }
    } else {
        awglobal配置(arguments[0] + "刚刚定时", 0)
        awglobal配置(arguments[0] + "定时", t)
        return true
    }
}

function aw随机(参数1, 参数2) { return random(参数1, 参数2) }
function aw数组长度(参数1) { return Object.keys(参数1).length - 1 }
//log(查找字符串("zxcv","xc"))
function aw查找字符串(参数1, 参数2) { return 参数1.indexOf(参数2) }
//log(替换字符串("asdfgas","as","ss"))//原字符串,查找字符串,替换字符串
function aw替换字符串() {
    var w = arguments[0]
    let regexp = '/' + arguments[1] + '/g';
    return w.replace(eval(regexp), arguments[2])
}
//log(删除第一行("/sdcard/测试.txt"))//路径
function aw删除第一行() {
    //删除第一行
    var path = arguments[0];//txt文本路径
    var reg = /^\s+|s+$/g; //匹配无效空白行
    var txt = files.read(path).replace(reg, "").split("\n");
    let ret_text = txt[0];
    log(ret_text.length);
    if (txt != "") {
        txt.splice(0, 1); //删除
        files.write(path, txt.join("\n"));
        if (ret_text.length > 0) {
            return true
        };
    } else {
        return false
    };
    file.close();
};
/**
 * 获取随机字符串
 * @param {number} count 随机字符个数
 * @param {number} mode 1:0-9   2:a-z   4:A-Z       (默认1+2+4)
 * @return {string} 返回字符串
 */
function RndStr(count, mode) {
    if (Number(count) <= 0) { return null }
    if (mode == undefined) {
        mode = 7
    }
    var str = ""
    var numarr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var lowarr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var upparr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    switch (mode) {
        case 1:
            for (let i = 0; i < count; i++) {
                let pos = random(0, numarr.length - 1)
                str += numarr[pos]
            }
            break;
        case 2:
            for (let i = 0; i < count; i++) {
                let pos = random(0, lowarr.length - 1)
                str += lowarr[pos]
            }
            break;
        case 4:
            for (let i = 0; i < count; i++) {
                let pos = random(0, upparr.length - 1)
                str += upparr[pos]
            }
            break;
        case 3:
            var arr = numarr.concat(lowarr);
            for (let i = 0; i < count; i++) {
                let pos = random(0, arr.length - 1)
                str += arr[pos]
            }
            break;
        case 5:
            var arr = numarr.concat(upparr);
            for (let i = 0; i < count; i++) {
                let pos = random(0, arr.length - 1)
                str += arr[pos]
            }
            break;
        case 6:
            var arr = lowarr.concat(upparr);
            for (let i = 0; i < count; i++) {
                let pos = random(0, arr.length - 1)
                str += arr[pos]
            }
            break;
        case 7:
            var arr = lowarr.concat(upparr);
            var arr2 = arr.concat(numarr);
            for (let i = 0; i < count; i++) {
                let pos = random(0, arr2.length - 1)
                str += arr2[pos]
            }
            break;
        default:
            str = null;
            break;
    }
    return str;
}

/*
var 作者账号 = '白丁专用'
var 软件名 = '快手极速版'
var 用户名 = '971434'
if (!验证用户(作者账号, 软件名, 用户名)) {
    alert('用户名有误或超过最大使用设备数!')
    exit() //如果验证不通过 退出脚本
}
*/
function 验证用户(参数1, 参数2, 参数3) {
    var 机器码 = device.getAndroidId();
    for (let i = 0; i < 3; i++) {
        try {
            let url = 'http://139.196.222.31:8068/sms/token.php?users=' + encodeURI(参数1) + '&user=' + encodeURI(参数3) + '&soft=' + encodeURI(参数2) + '&text=' + 机器码
            var r = http.get(url);
            if (r.statusCode == 200) {
                let response = r.body.string()
                log(response)
                if (response == 'error') return false;
                return response != '0'
            }
        } catch (error) {
            log(error)
        }
        sleep(3000)
    }
}

main();
