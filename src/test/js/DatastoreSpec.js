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
});