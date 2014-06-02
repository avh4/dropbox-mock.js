var DatastoreManager = require('./DatastoreManager');

function Client(dropbox, options) {
  if (!dropbox.validAppKeys[options.key]) {
    throw new Error('FakeDropbox: app key not allowed: ' + options.key);
  }
  this.dropbox = dropbox;
}

Client.prototype.toString = function() {
  return 'FakeDropbox.Client';
}

Client.prototype.getDatastoreManager = function() {
  if (!this.datastoreManager) {
    this.datastoreManager = new DatastoreManager(this.dropbox);
  }
  return this.datastoreManager;
}

Client.prototype.isAuthenticated = function() {
  return !!this.dropbox.authenticated;
}

Client.prototype.authenticate = function() {
  this.dropbox.authenticated = true;
}

module.exports = Client;