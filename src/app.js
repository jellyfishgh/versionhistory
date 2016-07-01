var util = require('./util');

var search = util.parse(window.location.search.substr(1));

var platform = search.platform,
    version = util.v2n(search.version);

util.fetch('./' + platform + '.json', function(history) {
    
}, function() {
    util.find('container').innerHTML = "<div class='center fail'>加载失败，请稍后重试。</div>";
}, function() {
    util.find('centerDiv').style.display = 'none';
});