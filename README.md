# Videoclub App
Test Project in AngularJS.
The app was created using the angular-seed skeleton as a starting point (https://github.com/angular/angular-seed.git).
It uses LocalStorage for storing data, first initializing from local JSON files. It does not implement any form of backend ATM.
A Priviledged user account can be used to edit the current movie list.
- user: admin
- password: admin

### Prerequisites

You need git to clone the angular-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test the Videoclub app. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

### Run the Application

The simplest way to start this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

