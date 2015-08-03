# Meteor Intro Demo

##Preset

 * terminal on left, blank (tab for chat ready, blank - delete any old app)
 * blank tab for meteor create (delete old version)
 * tab on right in demo code directory - reset app and repo:
    * `meteor reset`
    * `git reset --hard HEAD`
    * clear terminal (cmd-k)
 * underneath, have your text editor with the chat js & html files open in tabs.
 * browser on right at https://www.meteor.com/install
    * 2nd tab empty but with console showing

##Demo

### Install, create, run the app
* The first thing we'll want to do is install Meteor, and there are instructions at meteor.com/install. This installs the meteor tool, which allows us to create, modify, and deploy meteor projects:

	curl https://install.meteor.com/ | sh

* CTRL-C

* Here we will create a project called demo, and Meteor will scaffold a simple app for us to start with.
* You can see it gives us some basic files to work with:

    meteor create demo
    cd demo
    ls

* I want to move to a more interesting app where I've changed those files (go to chat tab).
* When I type meteor, it will start a development server for me
* It will tell me to go to localhost:3000

*terminal*

    meteor

* open in browser
* Show text editor (replace terminal)

##html

* There's our site. You can see that the html on the left mirrors the app on the right.
* We start with a header element. It's looking pretty empty. Let's add an h1

    <h1>Chat App</h1>

(save)

* Now I'm hitting save. Meteor will detect the file change and rebuild the code and push it out to the client. This is called **hot code push**. It's very useful in development, but this works in production too, allowing you to roll out code updates to live users without interrupting their work.
* (skip the middle)
* Down here we find a form with an input where we'll add messages
* Above that is this place where messages will go.
    * We are using handlebars syntax
    * We will iterate over all the messages using the `#each` helper, working on a list of recentMessages that will be provided by the javascript.
    * This will be connected via the database.

## JS code

* `Meteor.isClient` / `Meteor.isServer` - code can run on the client, server, or both.
*  You can also use folders called `client` or `server` to separate this code.
* Let’s explore this code.

    Messages = new Mongo.Collection('msgs');

* This statement runs on both the client and server
    * On the server, it creates a MongoDB collection on your production database
    * On the client, it creates a Minimongo collection (subset of the server, synced by Meteor)
    * Minimongo uses the same API as the production version of Mongo, so you can use the same commands on the client or the server
* Here the server publishes a publication called ”messages":  
    * This is like a REST endpoint, except it's live, meaning changes that affect the query will be pushed down to the client in realtime
    * The query, written in standard MongoDB syntax, requests the five most recent messages (only 5 to keep the app simple)
* The client subscribes to the ”messages" publication, so we’ll only have access to those five messages on the client regardless of how many there are on the server.
* Next, here's the `recentMessages` helper we saw in the HTML. It will provide the list of messages to be rendered, and it will rerun if that data changes.
    * Here too, we’re using standard MongoDB syntax - on the client, thanks to Minimongo.
    * On the server, we used reverse chronological order to get the most recent messages, but here we'll re-order them into forward chronological order.

## Show full stack DB connectivity
* So that actually gives us everything we need to add messages to the app.
* I'm going to pull up this cheatsheet and copy a Mongo command to insert a message from the browser console.

*copy from the cheat sheet into the browser console*

* I can call Minimongo directly from the browser console...
* And look, it's already in the DOM! What happened here?
    * When inserted it in Minimongo, the change triggered a re-rendering of the DOM using Blaze, Meteor's view layer.
    * This ability to rerun and re-render is called reactivity, and it's built into Meteor all the way to the server.
    * The insert was also sent separately to the server, which will notify any clients subscribed to the messages publication.
* We can also do this from the Mongo console. The meteor tool will help me open the console.

Go to *terminal*. new tab

    meteor mongo
    db.msgs.insert({text: 'hello from Mongo', createdAt: new Date, username: 'mongo console'})

* This insert is completely independent of Meteor, but Meteor saw it
* Meteor sees anything added to Mongo. You can use this as an integration point for other apps that use Mongo.
* This is done without polling. Instead Meteor watches MongoDB’s “operations log” or oplog.

## DB connectivity in JS code

* So let's look back at the javascript.
* Here's the event code that handles the form submission. You can see it does a Mongo insert - in fact, it's the same thing we did in the console. That's all that you need.

*in app*

    hello from the app

* And that's all the code. But check this out, if I open another browser and point it to `localhost:3000`, it will also update.

    hello again

    (from other app)
    hello from other app

* So in fact, we basically already have a working chat app!

## Add accounts support

* But there's still one thing missing - all of these are being logged as anonymous. So let's add an account system.
* I'm going to exit the mongo shell and use the Meteor tool to add some packages.

*terminal*

    meteor add accounts-ui accounts-password accounts-facebook

* This gives us
    * The meteor account system
    * Standalone password-based authentication
    * And oAuth-based authentication through Facebook
* Meteor packages can add to the client and the server, so they can coordinate adding UI elements with the server elements that are needed to make them work. They can even manage their own state with their own database collections!

## Update app to use accounts

* The first thing we'll need is some kind of widget to allow users to log in. The account system provides one, so I'm going to go back to the app and add it:

*editor, html*
Add

    {{> loginButtons}}

(save)

* Here it is! (leave it open)
* You can see that we can set up Facebook login right here - so we added oAuth to our app in seconds - this process can take a solid week in many frameworks! All we have to do now is configure it, which is easy if you follow the instructions in this popup (click on “Configure Facebook login”). Rather than do that though, let’s see how password-based login works.
* Here’s an email field. That's not ideal - we'd really rather have it use a username, so let me uncomment out this config code:

uncomment the `Accounts.config` code (hot code push changes email to username)

* Next we'll want to add the username when we insert new messages.

update "anonymous" to

        Meteor.user().username

* And we want to prevent unauthenticated users from posting messages.

uncomment the "not authorized" code just above
demonstration in the console (up arrow for the command) and in the app.

* Finally, since unauthenticated users can't send messages, let's hide the input element if someone's not logged in.

*html*
surround <form> element:

    {{#if currentUser}}
        (existing form)
    {{/if}}

* This is a handlebars `if` statement and will only render if `currentUser` is truthy. `currentUser` will return the user ID or a “falsy” value.
* When we hit save, you'll see the input disappear.
* So, that's all the functionality that we need.

## Demo working app
(create accounts and show messages both ways - note reactive changes based on login status)

## Deploy

* This is a great app. I'd like to show it to friends, or maybe investors!

*terminal*
**REPLACE `appname` with a name you give**

    meteor deploy appname

(while it runs)

* Meteor gives you a free server to demo your apps and share with others.
* It will work great for small apps, and it's free forever.
* Meteor will also have a pro version of deploy called Galaxy. This is how they will make money, but all this is doing is creating a node.js app. You can get that bundled app and run it on any server that supports node.js.
* OK, it's done. If you go to this URL, you can give it try!

(go there and leave it up so people can play)

If you prefer to deploy your own code, you can ask the Meteor tool to bundle it up for you:

    meteor bundle chat-app

You can see that Meteor gives you instructions on how to use the tarball it creates.

## Mobile
* I wish I could sell this app on the App Store or Google Play:

*terminal*

    meteor list-platforms
    meteor add-platform ios

* Now Meteor is using Cordova (PhoneGap)
* There are cross--platform packages like `camera` that will allow you to use the phone's sensors.
* We can run it in the iOS simulator by typing

    meteor run ios
      (or)
    meteor run android

* Now you can deploy to the App Store or Play Store. I'm not going to wait for this to build - let's move on with the presentation.
