(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var util = require('./util');

var search = util.parse(location.search.substr(1));

var platform = search.platform ? search.platform : util.whichPlatform(navigator.userAgent),
    version = search.version;

util.fetch('./' + platform + '.json', function (vs) {
    if (!version || util.v2n(version) < util.v2n(vs[0].version)) {
        util.find('banner').style.display = 'block';
        util.find('download').href = util.getDownloadUrl(platform);
        util.find('bs3').ontouchend = function (e) {
            e.stopPropagation();
            banner.style.display = "none";
        };
    }
    var container = util.find('container');
    container.appendChild(util.createTitleView(platform));
    vs.map(function (v) {
        container.appendChild(util.createVersionView(v));
    });
}, function () {
    util.find('container').innerHTML = "<div class='center fail'>加载失败，请稍后重试。</div>";
}, function () {
    util.find('centerDiv').style.display = 'none';
});
},{"./util":2}],2:[function(require,module,exports){
function v2n(v) {
    var ns = v.slice(0, 5).split(".");
    var sum = 0;
    for (var i = 0; i < ns.length; i++) {
        sum += parseInt(ns[i], 10) * Math.pow(10, ns.length - i - 1);
    }
    return sum;
}

function create(name, className, inner) {
    var ele = document.createElement(name);
    if (className) ele.className = className;
    if (inner) ele.innerHTML = inner;
    return ele;
}

function find(id) {
    return document.getElementById(id);
}

function parse(search) {
    var qs = search.split("&");
    var searchJson = {};
    for (var key in qs) {
        var arr = qs[key].split("=");
        searchJson[arr[0]] = arr[1];
    }
    return searchJson;
}

function whichPlatform(agent) {
    if (/iPod|iPad|iPhone/i.test(agent)) {
        return 'iOS';
    } else if (/Android/i.test(agent)) {
        return 'Android';
    }
}

function fetch(url, resolve, reject, complete) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                complete();
                resolve(JSON.parse(this.responseText));
            } else {
                complete();
                reject();
            }
        }
    };
    xhr.send();
}

function getDownloadUrl(platform) {
    if (platform === 'iOS') {
        return 'https://itunes.apple.com/cn/app/yi-wang-lian-jie-you-xi-nei-wai/id1015325531?l=cn&mt=8';
    } else if (platform === 'Android') {
        return 'http://im.2980.com:30816/cc/ccplayerand/zhanmeng.apk';
    }
}

function createTitleView(platform) {
    return create("div", "title", "战盟 " + platform);
}

function createTypeView(version, date) {
    var typeView = create("div", "version", version);
    typeView.appendChild(create("span", "date", date));
    return typeView;
}

function createContentView(content) {
    var contentView = create("div", "descView");
    contentView.appendChild(create("div", "desc", content.name));
    contentView.appendChild(createItemsView(content.items));
    return contentView;
}

function createItemsView(items) {
    var olView = create("ol", "content");
    items.map(function(item) {
        olView.appendChild(create("li", "item", item));
    });
    return olView;
}

function createVersionView(v) {
    var versionView = create("div", "v");
    versionView.appendChild(createTypeView(v.version, v.date));
    v.contents.map(function(content) {
        versionView.appendChild(createContentView(content));
    });
    return versionView;
}

module.exports = {
    v2n: v2n,
    create: create,
    find: find,
    parse: parse,
    whichPlatform: whichPlatform,
    fetch: fetch,
    getDownloadUrl: getDownloadUrl,
    createTitleView: createTitleView,
    createVersionView: createVersionView
};
},{}]},{},[1]);
