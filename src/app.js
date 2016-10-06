var util = require('./util');

var search = util.parse(location.search.substr(1));

var platform = search.platform ? search.platform : util.whichPlatform(navigator.userAgent),
    version = search.version;

util.fetch('./' + platform + '.json', function (vs) {
    if (!version || util.v2n(version) < util.v2n(vs[0].version)) {
        var banner = util.find('banner');
        banner.style.display = 'block';
        util.find('bs1').innerHTML = '有新版本' + vs[0].version;
        util.find('download').href = util.getDownloadUrl(platform);
        util.find('bs3').ontouchend = function (e) {
            console.log('touch bs3');
            e.stopPropagation();
            banner.style.display = 'none';
        };
    }
    var container = util.find('container');
    container.appendChild(util.createTitleView(platform));
    vs.map(function (v) {
        container.appendChild(util.createVersionView(v));
    });
}, function () {
    util.find('container').innerHTML = '<div class="center fail">加载失败，请稍后重试。</div>';
}, function () {
    util.find('centerDiv').style.display = 'none';
});