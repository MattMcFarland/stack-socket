## Stack Socket

WIP / CONCEPT

The goal of stack socket is to wrap/abstract socket.io so that all commands in a given stack instance can operate through sockets, enabling you to fire stack commands on the client and receive them on the server or vice versa.

Example:

```js
//server

var stack = require('stack-core')
require('stack-socket')(stack)

stack.on('test', (state, next) => {
  console.log('test ran')
  next(null, state)
})
```

```js
//client

var stack = require('stack-core')
require('stack-socket')(stack)

stack.fire('test')

```

----
In the above example, the test command is fired and will reach the server; the server's listener will then output 'test ran'.


Supply additional config options via '_socket' property of state object. Ie:
stack.state._socket = { address: localhost:5202 }
