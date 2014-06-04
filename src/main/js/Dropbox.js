var Client = require('./Client');

function FakeDropbox() {
  this.validAppKeys = {};
  this.authenticated = false;
  this.recordsChangedListeners = [];
  var thisDropbox = this;

  function _Client(options) {
    Client.apply(this, [thisDropbox, options]);
  }
  _Client.prototype = Object.create(Client.prototype);
  this.Client = _Client;
}

FakeDropbox.prototype.allowAppKey = function(key) {
  this.validAppKeys[key] = true;
}

FakeDropbox.prototype.triggerRecordsChanged = function() {
  this.recordsChangedListeners.forEach(function(listener) {
    listener();
  });
}

FakeDropbox.prototype.toString = function() {
  return 'FakeDropbox';
}

module.exports = FakeDropbox;
