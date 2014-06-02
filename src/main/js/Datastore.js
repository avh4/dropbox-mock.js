var Table = require('./Table');

function Datastore(dropbox) {
  this.dropbox = dropbox;
}

Datastore.prototype.getTable = function(tableName) {
  return new Table(this.dropbox, tableName);
}

Datastore.prototype.toString = function() {
  return 'FakeDropbox.Datastore';
}

module.exports = Datastore;