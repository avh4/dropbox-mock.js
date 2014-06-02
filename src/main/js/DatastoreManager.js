var Datastore = require('./Datastore');

function DatastoreManager(dropbox) {
  if (!dropbox.authenticated) {
    throw new Error('DatastoreManager requires an authenticated Dropbox.Client!');
  }
  this.dropbox = dropbox;
}

DatastoreManager.prototype.toString = function() {
  return 'FakeDropbox.DatastoreManager';
}

DatastoreManager.prototype.openDefaultDatastore = function(callback) {
  if (this.datastore) {
    throw new Error('Attempt to open datastore multiple times');
  }
  this.datastore = new Datastore(this.dropbox);
  callback(null, this.datastore);
}

module.exports = DatastoreManager;