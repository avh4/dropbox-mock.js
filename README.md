[![Stability: 2 - unstable](http://img.shields.io/badge/stability-unstable-yellow.svg)](http://nodejs.org/api/documentation.html#documentation_stability_index)

## Usage

```bash
npm install --save-dev dropbox-mock
```

```javascript
global.Dropbox = new (require('dropbox-mock'))();
global.Dropbox.allowAppKey('FAKE-KEY-FOR-TEST');

new Dropbox.Client({key: 'FAKE-KEY-FOR-TEST'});
```

Currently supported:

 - `new Dropbox.Client`
 - `Client.authenticate()`
 - `Client.isAuthenticated()`
 - `Client.getDatastoreManager()`
 - `DatatstoreManager.openDefaultDatastore(callback)`
 - `Datastore.getTable(name)`
 - `Table.insert(record)`

Pull requests are welcome.