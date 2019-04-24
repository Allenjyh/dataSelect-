;(function () {
    //插入样式
    var cssText = '.ul-box{list-style:none}#DateSelect-box{margin:0 auto;padding:10px 10px 0 10px;font-size:13px}.DateSelect-hd{display:flex;justify-content:space-between;padding:0 15px}.today{flex:1;text-align:center;height:24px;line-height:24px}.ul-box{overflow:hidden}.ul-box>li{float:left;width:14.28%;text-align:center;padding:3px 0}.other-month{color:#999999}.current-month{color:#333333}.today-style{border-radius:50%;background:#58d321}.dayStyle{display:inline-block;width:35px;height:35px;border-radius:50%;text-align:center;line-height:35px;cursor:pointer}.current-month>.dayStyle:hover{background:#00BDFF;color:#ffffff}.today-flag{background:#00C2B1;color:#fff}.selected-style{background:#0A88EC;color:#ffffff}.room-box>div{width:100%;padding-top:27px}.room-box input{border:0px;outline:none;cursor:pointer;width:45%;margin-left:22px}.date-controller{position:fixed;left:0;top:0;z-index:100;width:100%;height:100%;overflow:hidden;text-align:center;font-size:14px;background-color:rgba(37,38,45,.4)}.date-controller.date-controller-all{position:absolute;z-index:600;bottom:0;width:100%;height:338px;background:#fff}.date-controller.date-controller-all.date-controller-choice{position:relative;height:44px;line-height:44px;color:#999}.date-controller.date-controller-all.date-controller-content{position:relative;height:173px;width:100%}.date-controller.date-controller-all.date-controller-choice.cancel{left:0}.date-controller.date-controller-all.date-controller-choice.sure{right:0;color:#1A8CFF}.date-controller.date-controller-all.date-controller-choice.date-controller-top{margin:0;line-height:60px;font-weight:400;text-align:center;font-size:18px;color:#333}.date-controller.date-controller-all.date-controller-choice.cancel,.date-controller.date-controller-all.date-controller-choice.sure{position:absolute;top:6px;padding:16px;font-size:14px}.date-controller.date-controller-all.date-controller-content.room-package-top{position:absolute;top:0;background:-webkit-linear-gradient(bottom,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));background:linear-gradient(bottom,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8))}.date-controller.date-controller-all.date-controller-content.room-package-bottom{position:absolute;bottom:1px;background:-webkit-linear-gradient(top,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));background:linear-gradient(top,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8))}.date-controller.date-controller-all.date-controller-content.room-package-bottom,.date-controller.date-controller-all.date-controller-content.room-package-top{z-index:10;width:100%;height:68px;pointer-events:none;-webkit-transform:translateZ(0);transform:translateZ(0)}.date-controller.date-controller-all.room-package{display:-webkit-box;display:flex;padding:0}.date-controller.date-controller-all.room-package.room{flex:1;flex-basis:1 e-9px;width:1%;height:173px;overflow:hidden}.date-controller.date-controller-all.room-package.room.room-list{padding:0;margin-top:68px;line-height:36px;list-style:none;transition-timing-function:cubic-bezier(0.165,0.84,0.44,1);font-size:13px}.date-controller.date-controller-all.room-package.room{transition-duration:150ms}.date-controller.date-controller-all.room-package.room.room-list.room-list-item{transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)}.select-date-btnbox{height:72px;line-height:36px}.select-date-btnbox table{width:100%;text-align:center;font-size:13px;font-family:PingFang-SC-Regular;font-weight:200}.today{}.arrowicon{height:24px;width:24px;background-size:24px;background-repeat:no-repeat;background-position:center;display:inline-block}.arrowRight{background-image:url("/home/phone/images/time/arrowRight@2x.png")}.arrowLeft{background-image:url("/home/phone/images/time/arrow@2x.png")}.arrowRightD{background-image:url("/home/phone/images/time/arrowRightD@2x.png");background-size:16px;padding-right:20px}.arrowLeftD{background-image:url("/home/phone/images/time/arrowLeftD@2x.png");background-size:16px;padding-left:20px}.select-dateInput{border:0;background:transparent;padding-top:5px;padding-bottom:5px;padding-left:-5px;padding-right:-5px;border:none;outline:none;border-bottom:1px solid#E5E5E5;text-align:center;width:100%}.select-dateInput:hover{border-bottom:1px solid#0A88EC}';
    var cssEle = document.createElement("style");
    cssEle.type = "text/css";
    cssEle.appendChild(document.createTextNode(cssText));
    document.getElementsByTagName("head")[0].appendChild(cssEle);

    var _global;
    //工具函数
    //配置合并
    function extend(def, opt, override) {
        for (var k in opt) {
            if (opt.hasOwnProperty(k) && (!def.hasOwnProperty(k) || override)) {
                def[k] = opt[k]
            }
        }
        return def;
    }

    //日期格式化
    function formartDate(y, m, d, symbol) {
        symbol = symbol || '-';
        m = (m.toString())[1] ? m : '0' + m;
        d = (d.toString())[1] ? d : '0' + d;
        return y + symbol + m + symbol + d
    }

    //注册事件
    function addEvent(element, event_name, event_fn) {
        if (element.addEventListener) {
            element.addEventListener(event_name, event_fn, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + event_name, event_fn);
        } else {
            element['on' + event_name] = event_fn;
        }
    }

    function DateSelect(opt) {
        var def = {},
            boxHtml = '<div class="date-controller-all"><div class="select-date-btnbox"><table><tr><td id="btnClose"style="color: #A7A7A7;">取消</td><td>'+opt.title+'</td><td id="btnSure"style="color: #1A8CFF;">确定</td></tr></table><div style="height: 6px;width: 100%;background: #F5F5F5;"></div><table><tr><td style="width: 50%;"><input class="select-dateInput"id=\'starDate\'data-active="true"type="text"placeholder="起始日期"readonly="true"></td><td><input class="select-dateInput"id=\'endDate\'data-active="false"type="text"placeholder="结束日期"readonly="true"></td></tr></table></div><div class="date-controller-content"><div id=\'DateSelect-box\'></div></div></div>';
        opt = extend(def, opt, true),
            curDate = opt.date ? new Date(opt.date) : new Date(),
            year = curDate.getFullYear(),
            month = curDate.getMonth(),
            day = curDate.getDate(),
            currentYear = curDate.getFullYear(),
            currentMonth = curDate.getMonth(),
            currentDay = curDate.getDate(),
            selectedDate = '',
            idBox = document.querySelector(opt.idBox) || document.querySelector('body'),


            el = document.querySelector("#DateSelect-box") || document.querySelector('body'),
            selectDateArry = opt.selectDateArry ? opt.selectDateArry : false, //需要填写时间的标签集合
            btnSure = opt.btnSure ? opt.btnSure : false,//确定按钮
            btnClose = opt.btnClose ? opt.btnClose : false,//取消按钮
            result = [],
            id = opt.id;
            _this = this;


        var setDateInit = new Promise(function (resolve, reject) {
            resolve(_this);
            idBox.innerHTML = boxHtml;
        }).then(function onFulfilled(_this) {
            if (_this)
                el = document.querySelector("#DateSelect-box") || document.querySelector('body');
            selectDateArry = [document.querySelector('#starDate'), document.querySelector('#endDate')];
            btnSure = document.querySelector('#btnSure');
            btnClose = document.querySelector('#btnClose');
            id = document.querySelector(id);


            //控件绑定事件

            if (selectDateArry) {

                if (selectDateArry.length > 0) {

                    selectDateArry.forEach(function (index) {

                        addEvent(index, "click", function (e) {

                            selectDateArry.forEach(function (index) {
                                if (index == e.target) {
                                    index.dataset.active = "true";
                                    index.style.borderBottom = "1px solid #0A88EC";
                                } else {
                                    index.dataset.active = "false";
                                    index.style.borderBottom = "0px solid #0A88EC";
                                }
                            })
                        })
                    })
                }
            }

            var bindEvent = function () {

                if (el.addEventListener) {
                    el.addEventListener('click', function (e) {
                        addEventListener(e)
                    }, false)
                } else if (el.attachEvent) {
                    el.attachEvent('onclick', function (e) {
                        addEventListener(e)
                    });
                }
                ;

                function addEventListener(e) {
                    switch (e.target.id) {
                        case 'nextMonth':
                            _this.nextMonthFun();
                            break;
                        case 'nextYear':
                            _this.nextYearFun();
                            break;
                        case 'prevMonth':
                            _this.prevMonthFun();
                            break;
                        case 'prevYear':
                            _this.prevYearFun();
                            break;
                        default:
                            break;
                    }
                    ;
                    if (e.target.className.indexOf('currentDate') > -1) {
                        opt.clickCb && opt.clickCb(year, month + 1, e.target.innerHTML);
                        selectedDate = e.target.title;
                        day = e.target.innerHTML;
                        render();
                    }
                };
                if (btnSure) {
                    addEvent(btnSure, "click", function (e) {
                        if (selectDateArry && selectDateArry.length > 0) {
                            selectDateArry.forEach(function (index) {
                                result.push({
                                    title: index.getAttribute("placeholder"),
                                    value: index.value
                                });

                            })
                            idBox.style.display = "none";
                        }
                        opt.clickResult && opt.clickResult(result);
                    })
                }
                if (btnClose) {
                    addEvent(btnClose, "click", function (e) {
                        idBox.style.display = "none";
                    })
                }
                if (id) {
                    addEvent(id, "click", function (e) {
                        idBox.style.display = "block";
                    })
                }
            }
            var init = function () {
                var DateSelectHd = '<div class="DateSelect-hd">' +
                    '<div>' +
                    '<span class="arrowLeftD arrowicon" id="prevYear" ></span>' +
                    '<span class="arrowLeft arrowicon" id="prevMonth"></span>' +
                    '</div>' +
                    '<div class="today">' + formartDate(year, month + 1, day, '-') + '</div>' +
                    '<div>' +
                    '<span class="arrowRight arrowicon" id="nextMonth"></span>' +
                    '<span class="arrowRightD arrowicon" id="nextYear"></span>' +
                    '</div>' +
                    '</div>'
                var DateSelectWeek = '<ul class="week-ul ul-box">' +
                    '<li>日</li>' +
                    '<li>一</li>' +
                    '<li>二</li>' +
                    '<li>三</li>' +
                    '<li>四</li>' +
                    '<li>五</li>' +
                    '<li>六</li>' +
                    '</ul>'
                var DateSelectBd = '<ul class="DateSelect-bd ul-box" ></ul>';
                el.innerHTML = DateSelectHd + DateSelectWeek + DateSelectBd;
                bindEvent();
                render();
            }
            /**
             * 选择时间
             * selectDateArry
             * **/
            var render = function () {
                var fullDay = new Date(year, month + 1, 0).getDate(), //当月总天数
                    startWeek = new Date(year, month, 1).getDay(), //当月第一天是周几
                    total = (fullDay + startWeek) % 7 == 0 ? (fullDay + startWeek) : fullDay + startWeek + (7 - (fullDay + startWeek) % 7),//元素总个数
                    lastMonthDay = new Date(year, month, 0).getDate(), //上月最后一天
                    eleTemp = [];
                if (day > fullDay) {
                    day = fullDay
                }
                for (var i = 0; i < total; i++) {
                    if (i < startWeek) {
                        eleTemp.push('<li class="other-month"><span class="dayStyle">' + (lastMonthDay - startWeek + 1 + i) + '</span></li>')
                    } else if (i < (startWeek + fullDay)) {
                        var nowDate = formartDate(year, month + 1, (i + 1 - startWeek), '-');
                        var addClass = '';
                        selectedDate == nowDate && (addClass = 'selected-style');
                        formartDate(currentYear, currentMonth + 1, currentDay, '-') == nowDate && (addClass = 'today-flag');
                        eleTemp.push('<li class="current-month" ><span title=' + nowDate + ' class="currentDate dayStyle ' + addClass + '">' + (i + 1 - startWeek) + '</span></li>')
                    } else {
                        eleTemp.push('<li class="other-month"><span class="dayStyle">' + (i + 1 - (startWeek + fullDay)) + '</span></li>')
                    }
                }
                el.querySelector('.DateSelect-bd').innerHTML = eleTemp.join('');
                el.querySelector('.today').innerHTML = formartDate(year, month + 1, day, '-');

                //填写日期
                if (selectDateArry) {
                    if (selectDateArry.length > 0) {
                        selectDateArry.forEach(function (e) {
                            if (e.dataset.active == "true") {
                                e.value = formartDate(year, month + 1, day, '.');
                                e.style.borderBottom = "1px solid #0A88EC";
                            }

                        })
                    }
                }
            };
            _this.nextMonthFun = function () {
                if (month + 1 > 11) {
                    year += 1;
                    month = 0;
                } else {
                    month += 1;
                }
                render();
                opt.nextMonthCb && opt.nextMonthCb(year, month + 1, day);
            },
                _this.nextYearFun = function () {
                    year += 1;
                    render();
                    opt.nextYeayCb && opt.nextYeayCb(year, month + 1, day);
                },
                _this.prevMonthFun = function () {
                    if (month - 1 < 0) {
                        year -= 1;
                        month = 11;
                    } else {
                        month -= 1;
                    }
                    render();
                    opt.prevMonthCb && opt.prevMonthCb(year, month + 1, day);
                },
                _this.prevYearFun = function () {
                    year -= 1;
                    render();
                    opt.prevYearCb && opt.prevYearCb(year, month + 1, day);
                }
            init();
        })

    }

    //将插件暴露给全局对象
    _global = (function () {
        return this || (0, eval)('this')
    }());
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = DateSelect;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return DateSelect;
        })
    } else {
        !('DateSelect' in _global) && (_global.DateSelect = DateSelect);
    }

}());
