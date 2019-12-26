var selYear = document.getElementById("selYear");
var dateInfo = getDateInfo(new Date());
/**
 * 根据一个date对象，得到日期的相关信息对象
 * @param {*} date 
 */
function getDateInfo(date) {
    var obj = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }
    //是否是闰年
    obj.isLeap = obj.year % 4 === 0 && obj.year % 100 !== 0 || obj.year % 400 === 0;
    //计算当月最大日期
    if (obj.month === 2) {
        obj.maxDay = obj.isLeap ? 28 : 27;
    }
    else if (obj.month <= 7 && obj.month % 2 !== 0 || obj.month > 7 && obj.month % 2 === 0) {
        obj.maxDay = 31;
    }
    else {
        obj.maxDay = 30;
    }
    //计算该月1号的星期
    var newDate = new Date(obj.year, obj.month - 1, 1);
    obj.firstdayOfWeek = newDate.getDay() === 0 ? 7 : newDate.getDay();
    return obj;
}

/**
 * 根据数字，生成一个option，加入到指定的select元素中
 * @param {*} selDom 
 * @param {*} num 
 */
function appendSelect(selDom, num) {
    var opt = document.createElement("option")
    opt.value = num;
    opt.innerHTML = num;
    selDom.appendChild(opt);
}

/**
 * 根据指定的日期信息对象，初始化可选区域
 */
function initHeader() {
    for (var i = dateInfo.year - 100; i <= dateInfo.year + 100; i++) {
        appendSelect(selYear, i);
    }
    var selMonth = document.getElementById("selMonth");
    for (var i = 1; i <= 12; i++) {
        appendSelect(selMonth, i);
    }
    //设置默认选中
    selYear.value = dateInfo.year;
    selMonth.value = dateInfo.month;
    //注册事件
    selYear.onchange = selMonth.onchange = function () {
        setContentArea();
    }
    document.getElementById("btnToToday").onclick = function () {
        selYear.value = dateInfo.year;
        selMonth.value = dateInfo.month;
        setContentArea();
    }
}

/**
 * 根据指定的日期信息对象，设置内容区域
 */
function setContentArea() {
    var dateInfo = getDateInfo(new Date(parseInt(selYear.value), parseInt(selMonth.value) - 1));
    var now = getDateInfo(new Date());
    var calendarContentDom = document.querySelector(".calendar-content");
    calendarContentDom.innerHTML = "";
    //补充前面的空白
    for (let index = 0; index < dateInfo.firstdayOfWeek - 1; index++) {
        var span = document.createElement("span");
        calendarContentDom.appendChild(span)
    }
    for (let i = 1; i <= dateInfo.maxDay; i++) {
        var span = document.createElement("span");
        span.innerHTML = i;
        //是否是今天
        if (now.year === dateInfo.year
            && now.month === dateInfo.month
            && i === now.day) {
            span.className = "active";
        }
        calendarContentDom.appendChild(span);
    }
}

initHeader();
setContentArea();