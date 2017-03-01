# Numina

A simple ReactJs App for Martin and the team at Numina. Its built using gulp and browserify as a build system for the React app,
Node and Handlebars for a simple server. For the React Client I tried to keep things as simple as possible without an additional framework. 

<em>ReactClient/pages</em> stores the container application, <em>components/</em> stores react components, <em>actions/</em> stores 
various functions to get and transform data, and dashboard.js is the entry point for the client side build. Usually I'll also
create a <em>reducers</em> folder that I'll import into pages where it will consume actions and recreate state but it seemed unneccessary for this project.

<em>Routes/</em> stores the application routes and an isomorphic implementation of Reactjs, I prefer to have react served out isomorphically
as seperate apps instead of using routing to reduce complexity but it kinda depends on the project.

<em>Views/</em> are just skeleton pages that the ReactApp get rendered into.

## Building
To build clone down the project to your comp, run npm install in it, make sure your're running Node 4.4.5 or above, install the gulp command line tool using npm install -g gulp, then just run gulp and a dev server should spin up for you on localhost:3000. Alternatively, you can also just run gulp scripts to compile the project, then run index.js (or forever index.js to keep it running indefinately).
