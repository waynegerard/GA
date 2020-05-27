# GA
An open source Discord voice assistance bot

## What does GA do?
GA is a customizable bot that you can host in your own Discord server. You can write skills (features) for GA to do via text. As of writing (5/27/20), the repo includes a music player and example templates on how to make your own features. 

## How can I be involved with GA?
You can write your own skills for GA to perform. For example, you can build a Terraria wiki voice assistant or a fart machine. If you'd like, you can propose your skill be merged into the master GA bot so everyone can use your skill. 

## What do I need to get started with GA?
The first thing you need to do is host GA on a server. This can be an AWS instance or your local machine. Either way, we've included a quickstart Dockerfile to get you going. Clone the repo. You'll need docker and docker-compose installed already. 
Make a `.env` file in your project root directory with the following:
```
PORT=5000
DISCORD_TOKEN=<A discord token of your choice>
```
Then run the following command from the project root directory on your CLI:
```
docker-compose run app yarn install
docker-compose build
docker-compose up -d
```

## Wait I need more help! 
Check out the Q&A.md file for more information!
