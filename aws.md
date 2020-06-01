### AWS Setup Guide
This guide will assume you have no experience with AWS resources, but you do have an AWS account (or the ability to make one).

## Generate or upload your SSH keypair
Part 1 of this Github [guide](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) will show you how to generate a SSH key if you don't have one already. Once you have your keys generated, navigate to the AWS console --> EC2 --> Key Pairs (under Network & Security). Click "Create key pair" and upload your `.pem` file. 

## Upload our CloudFormation template
In the main project directory, we've included a CloudFormation template that will create all the necessary AWS resources for you. 

Navigate to the AWS console --> CloudFormation and click "Create Stack" --> "With new resources". In the Specify template category, select "Upload a template file" and upload the `cloudformation_ga.yml` file.

On the next page, you can name the instance whatever you'd like. For the KeyPair option, make sure you chose your keypair from step 1. If you don't do this, you won't be able to access your server!

Everything on the following page is optional. You can click "Next" without changing anything. AWS will then bring you to a confirmation page where you can review the set up. If everything looks good to you, click "Create stack". At this point, you can click the "Resources" tab to watch your resource creation. If anything goes wrong, you'll see the reason why there. 

## SSH into your EC2 instance
Once CloudFormation is done making your resources, you're ready to log into your instance. Navigate to EC2 and find the instance you just made. Click the instance and copy the Public DNS (IPv4). Navigate to your CLI and enter this command:

```ssh ec2-user@<Public DNS (IPv4)```

It may prompt asking you to give permission to use your key. You can type in `yes` for that. You should now be in your instance! You can follow the rest of the README's to proceed as if this CLI was on your own local machine. We've already installed Docker, docker-compose, and git onto this instance. If anything goes wrong, you can always tear down the instance and rebuild it.