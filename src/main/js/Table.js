var Record = require('./Record');

var nextId = 0;

function Table(dropbox, name) {
  this.dropbox = dropbox;
  this.name = name;
}

Table.prototype.insert = function(record) {
  if (!this.dropbox[this.name]) this.dropbox[this.name] = [];
  record.id = (nextId++).toString();
  this.dropbox[this.name].push(record);
}

Table.prototype.query = function(fieldValues) {
  var records = [];
  (this.dropbox[this.name] || []).map(function(data, i) {
    var match = true;
    if (!fieldValues || Object.keys(fieldValues).length) match = true;
    for (var attrname in fieldValues) {
      var val = fieldValues[attrname]
      if (data[attrname] !== val) match = false
    }
    if (match) records.push(new Record(this.dropbox, this.name, data, i));
  }, this);
  return records;
}

Table.prototype.toString = function() {
  return 'FakeDropbox.Table';
}

module.exports = Table;