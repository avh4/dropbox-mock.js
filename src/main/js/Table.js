function Table(dropbox, name) {
  this.dropbox = dropbox;
  this.name = name;
}

Table.prototype.insert = function(record) {
  if (!this.dropbox[this.name]) this.dropbox[this.name] = [];
  this.dropbox[this.name].push(record);
}

Table.prototype.toString = function() {
  return 'FakeDropbox.Table';
}

module.exports = Table;