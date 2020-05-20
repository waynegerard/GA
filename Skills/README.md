# Io-Skills

Midgame's skills for the Io client

# Why have two services?

An obvious question would be why this is split up from the Discord client. 

The impetus for this really was that re-deploying the client continuously was pretty disruptive: It killed off any voice connections and reset the bot, meaning that any and all music queues were instantly disrupted in a very terminal way.

However, besides just the ability to deploy skill updates quickly, there are a few other benefits:

1) We've talked about becoming a more open platform, and separating the client from the skill base is necessary for that to happen

2) This allows us to potentially open up to platforms besides Discord

3) There's a ton of tooling/etc. out there for web platforms which we can now take advantage of. Most non-web tooling assumes you're on mobile, which doesn't really benefit us.