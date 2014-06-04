[![Build Status](https://secure.travis-ci.org/avh4/dropbox-mock.js.svg)](http://travis-ci.org/avh4/dropbox-mock.js)
[![Stability: 2 - unstable](http://img.shields.io/badge/stability-unstable-yellow.svg)](http://nodejs.org/api/documentation.html#documentation_stability_index)

## Usage

```bash
npm install --save-dev dropbox-mock
```

Global test setup:

```javascript
global.Dropbox = new (require('dropbox-mock'))();
global.Dropbox.allowAppKey('FAKE-KEY-FOR-TEST');
```

When creating the Dropbox Client in test, you need to use the same app key that you allowed in the global test setup above.

```javascript
new Dropbox.Client({key: 'FAKE-KEY-FOR-TEST'});
```

After exercising code that should have created records, you can inspect the fake Dropbox datastore:

```javascript
global.Dropbox['MyTable']; // => yields the stored object
```

## Currently supported APIs

 - `new Dropbox.Client`
 - `Client.authenticate()`
 - `Client.isAuthenticated()`
 - `Client.getDatastoreManager()`
 - `DatatstoreManager.openDefaultDatastore(callback)`
 - `Datastore.getTable(name)`
 - `Datastore.recordsChanged.addListener(callback)` (must be manually triggered by your test)
 - `Table.insert(record)`

Pull requests are welcome.

## Examples

### Datastore.recordsChanged.addListener(callback)

```javascript
global.Dropbox = new (require('dropbox-mock'))();
global.Dropbox.allowAppKey('FAKE-KEY-FOR-TEST');
// call subject method that should register a listener
global.Dropbox.triggerRecordsChanged();
// verify subject performed an action in response to a recordsChanged event
```
