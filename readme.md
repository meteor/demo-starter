# Meteor Introduction: Demo

This is a demo that is included for use in the Meteor introduction from the [Meteor speaker kit](http://speakerkit.meteor.com/). It builds a "complete" chat app and is designed to take 15 minutes. 

## Support Materials

* The [demo notes](intro-demo-notes.md) give a detailed outline of how to set up the demo, how to walk through the code, and what features you may want to emphasize.
* The [copy/paste cheat sheet](demo-copy-paste.md) gives you a document with text you can copy and paste into the console to save time and minimize errors on a few of the longer commands. We recommend typing the other changes, but feel free to customize this to your style.
* The chat-app directory contains the code used in the demo (missing things that you will add as you work through it)
* There is a [video of the intro talk with this demo]() that you can watch to see a run-through


## How to practice the demo

Many people don't realize that a live coding demo takes at least as much preparation as slides do. Here are some recommendations:

* [Watch the video]() to see the flow of the demo. You can also listen to the demo while performing the actions.
* To get quick split screens, try a utility like divvy or optimal layout for mac. Windows users get this built-in. Practice the reformatting of your screen and the switching between apps - it will improve the flow.
* Although there are notes for the demo to explain everything, they will likely slow you down if you use them in the presentation. You may want to make your own crib sheet – this may help you to learn the demo as well.
* Plan to run the demo several times by yourself so that you get comfortable with the progression without having to refer back to notes all the time.
* Plan to enlarge the text in your terminal, editor and/or app (and app console). This can often be done with cmd/ctrl and the plus key.
* The resolution of the display device at the talk may be very different from your computer's. Check out split screens, text size, etc. before the talk and adjust your plan.

## Cheats

*This chat app is for demo purposes only!*

* For the sake of brevity, this app leaves the insecure package in. This saves a few lines of code and simplifies the app by allowing us to run `Messages.insert()` without explicitly allowing it. If you want to demo adding real security, move the `Messages.insert` statement to a Meteor method, call that method from the submit event, and remove insecure (see the Meteor tutorial for [an example of this](https://github.com/meteor/simple-todos/blob/master/simple-todos.js)).
* The app only shows the last 5 messages. This is purely so that we can simulate chat app formatting without doing the real work of having a scrollable chat window that always shows the last message.
