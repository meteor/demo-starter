#Copy/Paste Cheat sheet
This sheet contains all of the code and terminal commands used in the demo. They are included in the order used.

**meteor tool**
```
meteor create demo
cd demo
ls
```

**html header**
```
<h1>Chat app</h1>
```

**browser console**

```
Messages.insert({text: 'hello from browser', createdAt: new Date, username: 'browser console'})
```

**mongo console**  `meteor mongo`

```
db.msgs.insert({text: 'hello from Mongo', createdAt: new Date, username: 'mongo console'})
```

**accounts packages**

```
meteor add accounts-ui accounts-password accounts-facebook
```

**html**  
```
//under <h1>Chat app</h1> 
{{> loginButtons}}
```

**js**
```
//uncomment the Accounts.ui.config statement (3 lines)

//change username: "anonymous" to
username: Meteor.user().username
```

**html** - Surround the form element
```
{{#if currentUser}}
// existing <form>...</form>
{{/if}}
```

**terminal**
```
meteor deploy [appname]
meteor bundle chat-app

meteor list-platforms
meteor add-platform ios     #or meteor add-platform android
meteor run ios              #or meteor run android
```