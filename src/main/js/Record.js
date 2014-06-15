function Record(data) {
  this.data = data;
}

Record.prototype.get = function(name) {
  return this.data[name];
}

Record.prototype.toString = function() {
  return 'FakeDropbox.Record' + this.data;
}

module.exports = Record;