/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */
var items = [];
var winHeight;
var docHeight;
export function clean() {
    items = [];
}
export function getItems() {
    return items.map(function (i) { return i; });
}
export function add(param) {
    if (!param.el) {
        throw new Error("[@rafalages/scrollspy] item.el is required");
    }
    var item = Object.assign({ offset: 200, reference: "top", pos: 0 }, param);
    item.pos = getElementPos(item);
    var index = items.findIndex(function (i) { return i.pos > item.pos; });
    items.splice(index === -1 ? items.length : index, 0, item);
    if (items.length === 1) {
        setDefaultVariables();
        startListener();
    }
    checkVisibleItems();
}
export function debug() {
    items.forEach(function (item, i) {
        var color = i % 2 ? "red" : "blue";
        var border = "2px dashed " + color;
        var nodeHtml = document.createElement("div");
        var css = [
            "top: " + item.pos + ";",
            "width: 100%;",
            "position: absolute;",
            "border-top: " + border + ";"
        ].join("");
        item.el.style.border = border;
        nodeHtml.className = "debug-line";
        nodeHtml.setAttribute("style", css);
        document.body.appendChild(nodeHtml);
    });
    return items;
}
function throttle(callback) {
    var idle = true;
    return function () {
        if (idle) {
            callback();
            idle = false;
            setTimeout(function () { return (idle = true); }, 150);
        }
    };
}
function getElementPos(item) {
    var top = getScrollY();
    var boundClient = item.el.getBoundingClientRect();
    return boundClient[item.reference] + top - item.offset;
}
function getScrollY() {
    if (typeof pageYOffset !== "undefined") {
        return pageYOffset;
    }
    else {
        var doc = document.documentElement;
        doc = doc.clientHeight ? doc : document.body;
        return doc.scrollTop;
    }
}
function onResize() {
    throttle(function () {
        if (winHeight !== window.innerHeight) {
            resetElementPosition();
        }
    });
}
function onScroll() {
    checkDocumentHeight();
    checkVisibleItems();
}
function startListener() {
    window.addEventListener("scroll", throttle(onScroll));
    window.addEventListener("resize", throttle(onResize));
}
function stopListeners() {
    window.removeEventListener("scroll", throttle(onScroll));
    window.removeEventListener("resize", throttle(onResize));
}
function resetElementPosition() {
    winHeight = window.innerHeight;
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        item.pos = getElementPos(item);
    }
    checkVisibleItems();
}
function setDefaultVariables() {
    winHeight = window.innerHeight;
    docHeight = document.body ? document.body.offsetHeight : 0;
}
function checkDocumentHeight() {
    var currentDocHeight = document.body.offsetHeight;
    if (docHeight !== currentDocHeight) {
        docHeight = currentDocHeight;
        resetElementPosition();
    }
}
function checkVisibleItems() {
    var currentPos = getScrollY();
    var currentPosOffset = winHeight + currentPos;
    for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
        var item = items_2[_i];
        if (currentPosOffset >= item.pos) {
            if (item.callback) {
                item.callback();
            }
            items.shift();
        }
        else {
            break;
        }
    }
    if (!items.length) {
        stopListeners();
    }
}
//# sourceMappingURL=scrollspy.js.map