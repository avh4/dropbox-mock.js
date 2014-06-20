require('./env');
var MockDropbox = require('../../../index');

describe('Datastore', function() {
  var datastore;
  var Dropbox;

  beforeEach(function(done) {
    Dropbox = new MockDropbox();
    Dropbox.allowAppKey('APP_KEY');
    var client = new Dropbox.Client({key: 'APP_KEY'});
    client.authenticate();
    var datastoreManager = client.getDatastoreManager();
    datastoreManager.openDefaultDatastore(function(error, _datastore) {
      datastore = _datastore;
      done();
    });
  });

  describe('recordsChanged.addListener', function() {
    it('can be triggered by triggerRecordsChanged', function() {
      var callback = sinon.spy();
      datastore.recordsChanged.addListener(callback);
      expect(callback).not.to.have.been.called;
      Dropbox.triggerRecordsChanged('MyTable');
      expect(callback).to.have.been.called;
    });
  });

  describe('Record.get', function() {
    it('reads values from the mock data', function() {
      Dropbox['MyTable'] = [{name: 'Ronald Reagan'}];
      var record = datastore.getTable('MyTable').query()[0];
      expect(record.get('name')).to.equal('Ronald Reagan');
    });
  });

  describe('Record.update', function() {
    it('update values in the record', function() {
      Dropbox['MyTable'] = [{name: 'Ronald Reagan'}];
      var record = datastore.getTable('MyTable').query()[0];
      expect(record.get('name')).to.equal('Ronald Reagan');
      record.update({name: 'New name'})
      expect(record.get('name')).to.equal('New name');
    });
  });

  describe('Record.deleteRecord', function() {
    it('removes the record from the mock data', function() {
      Dropbox['MyTable'] = [{name: 'Ronald Reagan'}, {name: 'Donald Duck'}];
      var record = datastore.getTable('MyTable').query()[1];
      record.deleteRecord();
      expect(Dropbox['MyTable']).to.eql([{name: 'Ronald Reagan'}]);
    });
  });

  describe('Table.insert', function() {
    it('sets a unique id', function() {
      datastore.getTable('MyTable').insert({name: 'Jackie Chan'});
      var record = datastore.getTable('MyTable').query()[0];
      expect(record.getId()).to.be.a('string');
    });
  });

  describe('Table.query', function() {
    var tableData = [{
      name: 'Jackie Chan', strength: 50
    }, {
      name: 'Bruce Lee', strength: 66
    }];

    it('queries all records', function() {
      Dropbox['MyTable'] = tableData;
      var records = datastore.getTable('MyTable').query();
      expect(records.length).to.equal(2);
    });

    it('queries with given properties', function() {
      Dropbox['MyTable'] = tableData;
      var records = datastore.getTable('MyTable').query({strength: 66});
      expect(records.length).to.equal(1);
      expect(records[0].get('name')).to.equal('Bruce Lee');
    });
  });

});