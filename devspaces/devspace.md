# DevSpace

DevSpaces is basically a development environment build on docker and running on a central docker host.
You have a proprietary command (`devspaces`) that run some automations but essentially:
* you sync a local folder to a container's `/data` folder
* the container executes on docker central (so the computing happens there)

Normally you do not build your devspace image/container (because the PCA does it), instead you just execute it,
but below in *Build Image* section are the instructions to create it just in case you need to update it.

## Usage

The normal steps you need to follow are:
* **Only at installation**:
    * Point docker to the central docker host by exporting a variable (for example: 
    `export DOCKER_HOST=registry2.swarm.devfactory.com`)
    * Run the DevSpaces Installation: http://devspaces-docs.ey.devfactory.com/installation/index.html#installation
    * Configure DevSpaces on your machine (will ask for your DF password) by running `devspaces configure`
* **Only at the first time you start working on a project**:
    * Register an image on http://devspaces.ey.devfactory.com/home/images/my-images pointing to the current project 
    DevSpace image  (the one built by the PCA), let's suppose it is named **IMAGE_NAME**
    * Create a DevSpace config on http://devspaces.ey.devfactory.com/home/workspace-configs/my-workspace-configs 
    using the image you just register, let's suppose it is named **SPACE_NAME**
    * Move to your base dir (the directory that will be shared on `/data` on the container - normally the root of 
    your project)
    * Bind the directory to your devspace (`devspaces bind SPACE_NAME`)
* Start the environment (`devspaces exec`) and Start Coding

How to connect to my container by with a browser?, `devspaces info` will tell you the assigned ports.
Example output:
```
Using version: 0.1.38
IP:
10.224.131.92

PORTS:
4000 31040
8080 32027
```
So you have to connect to http://10.224.131.92:31040 or http://10.224.131.92:32027

## Build Image

In order to create the image from scratch run the following:
`docker build -f Dockerfile -t registry2.swarm.devfactory.com/zbw/devspaces .`
for example: `docker build -t registry2.swarm.devfactory.com/zbw/devspaces .`
