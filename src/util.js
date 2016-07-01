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
        searchJSON[arr[0]] = arr[1];
    }
    return searchJson;
}

function whichPlatform(agent) {
    if (/iPod|iPad|iPhone/ig.test(agent)) {
        return 'iOS';
    } else if (/Android/gi.test(agent)) {
        return 'Android';
    }
}

function fetch(url, resolve, reject, complete) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                resolve(JSON.parse(this.responseText));
            } else {
                reject();
            }
            complete();
        }
    };
    xhr.send();
}

function getDownloadUrl(platform) {
    if (platform === 'iOS') {
        return '';
    } else if (platform === 'Android') {
        return '';
    }
}

function createTitleView(version, date) {
    var titleView = create("div", "version", version);
    titleView.appendChild(create("span", "date", date));
    return titleView;
}

function createContentView(content) {
    var contentView = create("div", "descView");
    contentView.appendChild(create("div", "desc", content.name));
    contentView.appendChild(createItemsView(content.items));
    return contentsView;
}

function createItemsView(items) {
    var olView = create("ol", "content");
    items.map(function (item) {
        olView.appendChild(create("li", "item", item));
    });
    return olView;
}

function createVersionView(v) {
    var versionView = create("div", "v");
    versionView.appendChild(createTitleView(v.version, v.date));
    v.contents.map(function (content) {
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
    getDownloadUrl,
    createVersionView: createVersionView
};