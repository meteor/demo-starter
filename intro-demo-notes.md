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
* The first thing we'll want to do is install Meteor, and there are instructions at meteor.com/install. This installs the meteor tool, which allows us to create, modify, and deploy meteor projects

    curl https://install.meteor.com/ | sh

ctrl-c

* Here we will create a project called demo, and Meteor will scaffold a simple app for us to start with. 
* You can see it gives us some basic files to work with.

    meteor create demo
    cd demo
	ls
	
* I want to move to a more interesting app where I've changed those files (go to chat tab). 
* When I type meteor, it will start a development server for me
* It will tell me to go to localhost:3000

*terminal*

    meteor


open in browser
Show text editor (replace terminal)

##html

	* There's our site. You can see that the html on the left mirrors the app on the right.
	* We start with a header element. It's looking pretty empty. Let's add an h1
	 
    <h1>Chat App</h1>

(save)

* Now I'm hitting save. Meteor will detect the file change and rebuild the code and push it out to the client. This is called **hot code push**. It's very useful in development, but this works in production too, allowing you to roll out code updates to live users without interrupting their work.
* (skip the middle)
* form in footer - input where we'll add messages
* in the middle is this place where messages will go.
	* We are using handlebars syntax
	* We will iterate over all the messages using the each helper, working on a list of recentMessages that will be provided by the javascript.
	* This will be connected via the database
	

## js code

* meteor.isClient /is.Server - code can run client, server, or both (or use folders client/ server/

    Messages = new Mongo.Collection('msgs');

* runs on both
	* server: mongo DB collection on your production database
	* client: minimongo collection (subset of the server, synced by Meteor)
	* minimongo uses the same api as the production version of Mongo, so you can use the same commands on the client or the server
* server publish "messages":  
	* like a REST endpoint, except it's live, meaning changes that affect the query will be pushed down to the client in realtime
	* query: five most recent messages (only 5 to keep the app simple)
* client subscribe "messages" - delivers the publication (only 5 on client, no matter how many are there on the server)
* next, here's the recentMessages helper we saw in the html. It will provide the list of messages to be rendered, and it will rerun if that data changes
	* Again, we are using standard MongoDB syntax, althought this will be executed on the client.
	* On the server, we used reverse chronological order to get the most recent messages, but here we'll re-order them into forward chronological order

## Show full stack DB connectivity
* So that actually gives us everything we need to add messages to the app.
* I'm going to pull up this cheatsheet and copy a Mongo command to insert a message from the browerser console.

*copy from the cheat sheet into the browser console*

* I can call minimongo directly from the browser console...
* And look, it's already in the DOM! What happened here?
	* We inserted it in the database
	* The change triggered a rerendering of the DOM using Meteor's Blaze (the view layer).
	* This ability to rerun and rerender is called reactivity, and it's built into Meteor all the way to the server
* We can also do this from the mongo console. The meteor tool will help me open the console.

Go to *terminal*. new tab

    meteor mongo
    db.msgs.insert({text: 'hello from Mongo', createdAt: new Date, username: 'mongo console'})

* This insert is completely independent of Meteor, but Meteor saw it
* Meteor sees anything added to mongo - integration point for other apps that use Mongo
 
## DB connectivity in js code

* So let's look back at the javascript.
* Here's the event code that handles form submission. You can see it does a Mongo insert - in fact, it's the same thing we did in the console. That's all that you need.

*in app*

		hello from the app
		
* And that's all the code. But check this out, if I open another broswer and point it to localhost:3000, it will also update.

		hello again
		
		(from other app)
		hello from other app
		
* So in fact, we basically already have a working chat app!

## Add accounts support
* But there's still one thing missing - all of these are being logged as anonymous. So let's add an accounts system.
* I'm going to exit the mongo shell and use the Meteor tool to add some packages

*terminal*

    meteor add accounts-ui accounts-password accounts-facebook

* this gives us
	* the meteor account system
	* standalone password-based authentication
	* and oauth-based authentication
* Meteor packages can add to the client and the server, so they can coordinate adding ui elements with the server elements that are needed to make them work

## Update app to use acconts

* The first thing we'll need is some kind of widget to allow users to log in. The account system provides one, so I'm going to go back to the app and add it

*editor, html*
Add

    {{loginButtons}}
    
(save)

* Here it is! (leave it open)
* You can see that we can set up facebook login right here - so we added oauth to our app in seconds - this process can take a solid week in many frameworks!
* Next we have the email field. That's not ideal - we'd really rather have it use a username, so let me uncomment out this config code 

uncomment the `Accounts.config` code (hot code push changes email to username)

* Next we'll want to add the username when we insert new messages

update "anonymous" to 

		Meteor.user().username
	
* Finally, let's disable anonymous messages by hiding the input element if someone's not logged in

*html*
surround <form> element:

    {{#if currentUser}}
    	(existing form)
    {{/if}}
    
* This is a handlebars `if` statement and will only render if currentUser is truthy. currentUser will return the user ID or a falsy value.
* When we hit save, you'll see the input disappear
* So, that's all the functionality that we need.

## Demo working app
(create accounts and show messages both ways - note reactive changes based on login status)


## Deploy

* this is a great app. I'd like to show it to friends, or maybe investors!

*terminal*
**REPLACE `appname` with a name you give**

    meteor deploy appname

(while it runs)

* meteor gives you a free server to demo your apps and share with others
* It will work great for small apps, and it's free forever.
* they will also have a pro version of deploy called galaxy. this is how they will make money, but all this is doing is creating a node app. You can get that bundled app and run it on any server that supports node.js
* OK, it's done. If you go to this url, you can give it try! 
 
(go there and leave it up so people can play)

If you prefer to deploy your own code, you can ask the Meteor tool to bundle it up for you

    meteor bundle chat-app

You can see that Meteor gives you instructions on how to use the tarball it creates.

## Mobile
* I wish I could sell this app on the app store or Google play

*terminal*

    meteor list-platforms
    meteor add-platform ios

* Now Meteor is using Cordova (phoneGap)
* there are cross--platform packages like camera that will allow you to use the phone's sensors.
* we can run it in the ios simulator by typing


    meteor run ios
      (or)
    meteor run android

* now you can deploy to the app store (play store). I'm not going to wait for this to build - let's move on with the presentation.