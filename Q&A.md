## What is my Discord token?
If you don't already have a Discord Developer account, log in through [here][http://discordapp.com/developers/]. Then
make a new app and generate a token for it. In order to add GA to your Discord server, you must be the admin of the
server. Also a pro tip: keep your token a secret! Don't add it publicly anywhere because then anyone can add things to 
your Discord server. 

## Can I install this without Docker?
You could, but we don't recommend it. You'll have to install all the various node packages and there can be existing
things that get in the way. Docker is nice because it's basically a blank canvas with just the things you need to work 
GA and nothing more. We will not be providing a guide on how to install this without Docker.

## Do I have to leave my terminal window open to keep GA up?
If you are hosting GA on a cloud provider, you can disconnect from the instance at any time. GA will continue to run
unless you 1.) Manually tear down the build or 2.) GA gets an error and crashes. If you are hosting GA on your local
machine, you need to keep the Docker container open. 

## Should I host it locally or on a cloud provider?
The main benefit of using a cloud provider is you can leave it running even if your local machine is off. You don't have
to worry about your internet connection or keeping your computer running. GA will continue to be live. Setting up a
cloud instance is also most likely a one time operation. You have to install Docker, docker-compose, and a few other
dependencies. While cost can be a concern, GA does run on the smallest instance size on AWS, which is a free tier. Free
tiers include 750 hours of use per month for one year. That should work out to be completely free for at least a year. 

## How do I make a `.env` file?
It's best to do this in the terminal window. You can use the editor of your choice, but this example will use vim. In
the root project directory, enter `vim .env`. This will open up the vim editor with a new file called `.env`. Press `i`
to use "insert" mode, which allows you to type in your `PORT` and `DISCORD_TOKEN` values. When you're done, press `esc`
and then `:wq`. This writes and quits the vim editor. You can view your file outside of the vim editor using `cat .env`.
To make changes, you can call `vim .env` again and since the file already exists, it will open your previous work. 