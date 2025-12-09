'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Trophies = exports.Game = exports.PLATINUM = exports.GOLD = exports.SILVER = exports.BRONZE = exports.VITA = exports.PS3 = exports.PS4 = undefined;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _request2 = require('request');

var _request3 = _interopRequireDefault(_request2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PS4 = exports.PS4 = 'ps4';
var PS3 = exports.PS3 = 'ps3';
var VITA = exports.VITA = 'vita';
var BRONZE = exports.BRONZE = 'bronze';
var SILVER = exports.SILVER = 'silver';
var GOLD = exports.GOLD = 'gold';
var PLATINUM = exports.PLATINUM = 'platinum';

var NOOP = function NOOP() {
  return undefined;
};

var Game = exports.Game = (function () {
  function Game(_ref) {
    var _ref$id = _ref.id;
    var id = _ref$id === undefined ? null : _ref$id;
    var _ref$title = _ref.title;
    var title = _ref$title === undefined ? null : _ref$title;
    var _ref$platforms = _ref.platforms;
    var platforms = _ref$platforms === undefined ? [] : _ref$platforms;
    var _ref$progress = _ref.progress;
    var progress = _ref$progress === undefined ? 0 : _ref$progress;
    var _ref$trophies = _ref.trophies;
    var trophies = _ref$trophies === undefined ? {} : _ref$trophies;
    var _ref$avatar = _ref.avatar;
    var avatar = _ref$avatar === undefined ? null : _ref$avatar;

    _classCallCheck(this, Game);

    this.id = id;
    this.title = title;
    this.platforms = platforms;
    this.progress = parseInt(progress, 10) || 0;
    this.trophies = Object.assign({ bronze: 0, silver: 0, gold: 0, platinum: 0 }, trophies);
    this.avatar = avatar;
  }
  // Return true if game belongs to platform provided
  // @param {string} platform
  // @return {boolean}

  _createClass(Game, [{
    key: 'belongsToPlatform',
    value: function belongsToPlatform(platform) {
      return this.platforms.indexOf(platform) >= 0;
    }
  }]);

  return Game;
})();

var Trophies = exports.Trophies = (function () {
  function Trophies() {
    _classCallCheck(this, Trophies);
  }

  _createClass(Trophies, null, [{
    key: 'request',

    // Scrape the public JSON feed provided by Playstation.com to find and return
    // a user object with each game and the currently completed trophies
    //  curl 'https://io.playstation.com/playstation/psn/public/trophies/?onlineId={{username}}'
    //    -H 'Origin: https://www.playstation.com' --compressed
    // @param {String} username of the PSN user
    // @param {object} options
    //   - {Number} offset to start gathering games from
    //   - {Number} limit the number of games found
    // @param {function} callback to pass completion to
    value: function request(username) {
      var _this = this;

      var callback = arguments.length <= 1 || arguments[1] === undefined ? NOOP : arguments[1];

      var url = 'https://io.playstation.com/playstation/psn/public/trophies/?onlineId=' + username;
      var headers = {
        Origin: 'https://www.playstation.com'
      };
      return (0, _request3.default)({ url: url, headers: headers }, function (err, response) {
        if (err) {
          return callback(err);
        }
        var json = JSON.parse(response.body);
        var games = json.list.map(_this.parseGame);
        callback(null, games);
      });
    }
    // Convert JSON response object into Game object
    // @param {object} JSON
    // @return Game

  }, {
    key: 'parseGame',
    value: function parseGame(game) {
      return new Game({
        id: game.gameId,
        title: game.title,
        platforms: game.platform.split(','),
        progress: game.progress,
        trophies: game.trophies,
        avatar: game.imgUrl
      });
    }
  }]);

  return Trophies;
})();