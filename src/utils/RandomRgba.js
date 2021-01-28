function getRandom() {
    var o = Math.round, r = Math.random, m = 255, s = 1;
    return 'rgba(' + o(r()* (m - s) + s) + ',' + o(r()* (m - s) + s) + ',' + o(r()* (m - s) + s) + ', 0.3 )';
}

export default getRandom