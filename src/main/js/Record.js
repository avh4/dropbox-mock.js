function Record(dropbox, tableName, data, index) {
  this.dropbox = dropbox;
  this.tableName = tableName;
  this.data = data;
  this.index = index;
}

Record.prototype.get = function(name) {
  return this.data[name];
}

Record.prototype.deleteRecord = function() {
  this.dropbox[this.tableName].splice(this.index, 1);
}

Record.prototype.toString = function() {
  return 'FakeDropbox.Record' + this.data;
}

module.exports = Record;