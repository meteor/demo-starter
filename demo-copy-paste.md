**browser console**

```
Messages.insert({text: 'hello from browser', createdAt: new Date, username: 'browser console'})
```

**mongo console**

```
db.msgs.insert({text: 'hello from Mongo', createdAt: new Date, username: 'mongo console'})
```

**accounts packages**

```
meteor add accounts-ui accounts-password accounts-facebook
```