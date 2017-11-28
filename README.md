# zkt-fetch
wrapper of node-fetch to provide better error information

## Why you need this package?

When requesting some resources with `node-fetch`, the information in errors is not enough for trouble shooting. For example:

```
{
  "name": "FetchError",
  "message": "invalid json response body at http://localhost:6756/badJSON reason: Unexpected token a in JSON at position 1",
  "type": "invalid-json"
}
```

## Install

`npm i --save zkt-fetch`

## Usage

replace your `require('node-fetch')` with `require('zkt-fetch')`

## Error Output

### res.json() error examples

`console.error(err)` will output something like:
```
{ FetchError: invalid json response body at http://localhost:6756/badJSON reason: Unexpected token a in JSON at position 1
    at res.text.then.text (/Users/longbill/Dropbox/nodeapps/zkt/zkt-fetch/index.js:18:18)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
  message: 'invalid json response body at http://localhost:6756/badJSON reason: Unexpected token a in JSON at position 1',
  name: 'FetchError',
  url: 'http://localhost:6756/badJSON',
  options: { timeout: 30000 },
  type: 'invalid-json',
  timeCost: '41ms',
  response: 
   { status: 200,
     statusText: 'OK',
     headers: '{"date":["Tue, 28 Nov 2017 18:02:10 GMT"],"connection":["close"],"content-length":["4"]}',
     ok: true,
     text: '{aaa' } }
```

`console.error(JSON.stringify(err, null, '  '))` will output something like: 
```
{
  "message": "invalid json response body at http://localhost:6756/badJSON reason: Unexpected token a in JSON at position 1",
  "name": "FetchError",
  "url": "http://localhost:6756/badJSON",
  "options": {
    "timeout": 30000
  },
  "type": "invalid-json",
  "timeCost": "33ms",
  "response": {
    "status": 200,
    "statusText": "OK",
    "headers": "{\"date\":[\"Tue, 28 Nov 2017 18:05:54 GMT\"],\"connection\":[\"close\"],\"content-length\":[\"4\"]}",
    "ok": true,
    "text": "{aaa"
  },
  "_stack": [
    "at res.text.then.text (/Users/longbill/Dropbox/nodeapps/zkt/zkt-fetch/index.js:18:18)",
    "at <anonymous>",
    "at process._tickCallback (internal/process/next_tick.js:188:7)"
  ]
}
```

### network error example:

```
{
  "name": "FetchError",
  "message": "network timeout at: http://localhost:6756/timeout",
  "type": "request-timeout",
  "url": "http://localhost:6756/timeout",
  "options": {
    "timeout": 2000
  },
  "timeCost": "2004ms",
  "_stack": [
    "at Timeout._onTimeout (/Users/longbill/Dropbox/nodeapps/zkt/zkt-fetch/node_modules/node-fetch/index.js:126:13)",
    "at ontimeout (timers.js:469:11)",
    "at tryOnTimeout (timers.js:304:5)",
    "at Timer.listOnTimeout (timers.js:264:5)"
  ]
}
```

### system error example:

```
{
  "name": "FetchError",
  "message": "request to http://fdsafafdsafds89fdsa9f89dsafsda.com failed, reason: read ECONNRESET",
  "type": "system",
  "errno": "ECONNRESET",
  "code": "ECONNRESET",
  "url": "http://fdsafafdsafds89fdsa9f89dsafsda.com",
  "options": {
    "timeout": 2000
  },
  "timeCost": "168ms",
  "_stack": [
    "at ClientRequest.<anonymous> (/Users/longbill/Dropbox/nodeapps/zkt/zkt-fetch/node_modules/node-fetch/index.js:133:11)",
    "at emitOne (events.js:115:13)",
    "at ClientRequest.emit (events.js:210:7)",
    "at Socket.socketErrorListener (_http_client.js:401:9)",
    "at emitOne (events.js:115:13)",
    "at Socket.emit (events.js:210:7)",
    "at emitErrorNT (internal/streams/destroy.js:64:8)",
    "at _combinedTickCallback (internal/process/next_tick.js:138:11)",
    "at process._tickCallback (internal/process/next_tick.js:180:9)"
  ]
}
```

