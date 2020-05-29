## What is my Discord token?
If you don't already have a Discord Developer account, log in through [here](http://discordapp.com/developers/). Then
make a new app and generate a bot token. The bot token is not the same as the app token. In order to add GA to your Discord server, you must be the admin of the
server. Also a pro tip: keep your token a secret! Don't add it publicly anywhere because then anyone can add things to 
your Discord server. 

## What happened to the voice features?
In order to get voice working, you'll need a provider to perform transcription. Since this is an advanced detail and can hamstring beginners who just want to get a custom Discord bot working, we've removed voice features. If you're interested in creating a custom soundboard, you can do that without a voice transcription service. You'll have to store the sound bites somewhere (S3 or locally both work). 

## How do I make the quote/at feature?
You'll have to set up databases in order to store the information used in quote/at. We wanted to make this project as accessible as possible, so this base template does not require you set up databases.

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

## What is eslint?
Eslint is a syntax checker and optional enforcer for Javascript. If you get an error about no eslint configuration file, you can either remove linting (not recommended if you plan on actively developing) or run `docker-compose run app yarn eslint --init`. You may need to install by running `docker-compose run app yarn install eslint`. If you want to move fast, when you are configuring your eslint file, you can choose the option "To check syntax only". Afterwards, restart your docker container by running `docker-compose restart`.