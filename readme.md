#PatternLibrary
Table of Contents

 - [Overview](#overview)
 - [Requirements](#requirements)
 - [Resources](#resources)
 - [Getting Started](#get-started)
 - [Updating](#updates)
 - [How to run Gulp tasks](#how-to-run-gulp-tasks)
 - [Authors](#authors)
 - [Glossary](#glossary)

##Overview
Pattern Library is the project to redefine the grid and templates we use on the site with an emphasis on cleanly documented open source code. To do this, we are using [Bootstrap v4](http://www.getbootstrap.com) for our grid system, [Handlebars](http://handlebarsjs.com/) for templates, [jQuery 3.1.1](http://jquery.com/) as our primary JavaScript library and [Angluar V2](https://angular.io/) with [Typescript](https://www.typescriptlang.org/) for our questionnaires and forms.

Our fonts will be served via the [Google Webfonts CDN](https://fonts.google.com/). jQuery, Bootstrap and Angular will be via [Cloudflare's CDN](https://cdnjs.com/). Cloudflare has the largest number of sites, therefore we can expect a user has a high probablity to have fonts and JS cached by the time they visit our site.

**Why Bootstrap?**
Bootstrap is so widely used and well documented, that adding features is often a copy and paste from a wide variety of opensource or built in features. These things are often on Github and vetted for any conflicts with names or scripts of the parent Bootstrap project. It only requires some moderate HTML knowledge to be highly effective.
##Requirements
**Git client**
Git, it a version control system. It is best used from the command line, here is the [suggested client](https://git-scm.com/download/win) and a proper [**cheat sheet**](https://www.git-tower.com/blog/git-cheat-sheet/) to print out. You can use a GUI such as [GitHub](https://desktop.github.com/) or [TortoiseGit](https://tortoisegit.org/download/), but understanding the command line is the best practise.

**NodeJS/NPM** Use 6.9.x or better.
[NodeJS](https://nodejs.org/en/) is an event driven JavaScript engine. NPM is Node Package Manager that allows the installation of modules and plugins. At the time of this writing :warning: 6.9.4LTS (long term support) is the current release. Typing `node -v` in the command line will tell you what version you are using.

`Packages.json` is a simple text file that indicates dependencies for the project directory and sub-directories you are in. Typing `npm install` will read that file and install the indicated versions and their dependencies. This saves crucial time from individually installing each module. **important note** `npm install gulp-sass` is slightly different in that it will install that module only. :warning: It is very important to understand this and what the arguments `-g`(install globally) `--save` and `--save-dev`(package will appear in your devDependencies) mean from the [documentation](https://docs.npmjs.com/). There is also the `npm update` command that updates any versions and dependencies that may have changed. This is a very good practice to do whenever you "get latest" and have an updated `packages.json` or `gulpfile.js`.


**Gulp**
[GulpJS](http://gulpjs.com/) is a streaming build client built on NodeJS. It will perform the construction of our pages and is able to hook in to clients such as TFS or Git. We use it for page assembly, minification, CSS, image optimization and many useful things.
##Resources
**Bootstrap Resources**
 - [Start Bootstrap](https://startbootstrap.com/bootstrap-resources/) A comprehensive list of Bootstrap and related resources maintained by Start Bootstrap.
 - [Bootstrap Hero](http://www.bootstraphero.com/the-big-badass-list-of-twitter-bootstrap-resources) the homepage from a popular resource.
 - [WrapBootsrap](https://wrapbootstrap.com/themes) themes and examples
 - [CodeCanyon](https://codecanyon.net/) many free and paid snippets
 - [ADA/508 Compliance Plugin](https://github.com/paypal/bootstrap-accessibility-plugin) by the PayPal Accessibility Team

**Node Package Manager**
 - [NPMJS](http://www.npmjs.com) is a website featuring a wide variety of plugins approved by the NodeJS project. **important note** The NPM registry is a built-in way of installing modules. You may find a plugin such as `gulp-uglify` and to install it you will go to your directory and at the command line type `npm install --save-dev gulp-uglify` To really understand this, please read more documentation at https://docs.npmjs.com/

**Git**
 - [Github's resources](https://help.github.com/articles/git-and-github-learning-resources/) There are a lot of helpful Git and GitHub resources on the web. This is a short list of our favorites!

**Angular**
 - [Egghead.io](https://egghead.io/courses) probably one of the better resources
 - [Scotch.io](https://scotch.io/tag/angular-js) an amazing source for many languages
 - [NG-BOOK2](https://www.ng-book.com/2/) The in-depth, complete, and up-to-date book on Angular 2. Become an Angular 2 expert today.

**jQuery**
 - [Learning Center](https://learn.jquery.com/) If you're looking for explanations of the basics, workarounds for common problems, best practices, and how-tos, you're in the right place!
 - [Unheap](http://www.unheap.com/) A tidy Repository of jQuery Plugins & JavaScripts
 - [jQuery Best Practices](http://lab.abhinayrathore.com/jquery-standards/) things worth reviewing.
 - [More best prectices](http://gregfranko.com/jquery-best-practices/#/)
 - [Daily Snippets](http://jquer.in/)

**CSS/SASS**
 - [Sass Mixins Tutorial](https://scotch.io/tutorials/how-to-use-sass-mixins)

**Slack Channels**
 - [LZ Pattern Library](https://legalzoom.slack.com/archives/pattern_library_proj)
 - [Official Slack Channel](https://getbootstrap.slack.com/messages/general/)

##Get Started
 - Install [NodeJS](https://nodejs.org/en/) version 6.9.4 (updated 1/17/17)  or latest LTS release. NPM will be installed by default 
   - make sure no previous versions are on your machine. Typing `node -v` at the command line will reveal your version. :warning: Previous versions are **not** automatically uninstalled when you download the new version and will cause conflicts.
 - [Git Client](https://git-scm.com/download/win) 
   - On the top of this page you can click the green "Clone or Download" button and it will force your client to prompt a download loction. `C:\Git` is the preferred location and inside there the Pattern Library folders and files will be created as `C:\Git\PatternLibrary\`. 
 - Installing Gulp and all the required files is done from the command line in the `C:\Git\PatternLibrary\` folder. You will see `gulpfile.js` and `packages.json`. The packages file is like a manifest and itcontains all you will need. You will type the following: `npm install` and when it completes after a few minutes you can type `gulp` and should receive a confirmation that Gulp is working.

##How to run Gulp tasks
Gulp runs from the command line. You will run it from the root `C:Git\PatternLibrary\` directory where you have a `gulpfile.js`. We built in a default task so when you type `gulp` it will give you a confirmation or error. Errors tend to be missing modules or elevated permissions (EPERM) related.

To get a list of tasks in gulp, you can type gulp --tasks and **please read [Gulp for beginners](https://css-tricks.com/gulp-for-beginners/)** if you are new to it.

##Updates
Periodically we will update a version the plugins. When we do this, and you get the latest from Git, you will type `npm update` and it will make updates based on the entries in the `packages.json` manifest file.

We may also need to install a specific, older, version of a module. For example, we want to install Express V3 we would go to the command line in the root of the project and type `npm install express@3.0.0`.

##Glossary
 - Hero: in print terms a hero is the image that is the center of attention. It is a component, often in a jumbotron.
 - Jumbotron: a large component that contains a hero image and a call to action, carousel or other dynamic element. It is usually the dominant item on a page and above the fold.
 - Card: a small component that usually contains all the content needed to survive on its own. An example would be a pricing card, common questions, specialist or speak with an attorney. We do group these together in "Easy as 1-2-3" or Ask away.
 - Collapse: this is how Bootstrap describes accordions or collapsing menus that are a feature by themselves. Being block-level, it will often displace content on the requirements of its size.
 - Dropdown: this is a menu component. It can also be part of buttons, and will overlap content.
 
###Authors
 - Tim Hunold (Lead) [thunold](mailto:thunold@legalzoom.com?subject=Pattern%20Library) :crown:
 - Mrinal Murari (Infrastructure) [mmurari](mailto:mmurari@legalzoom.com?subject=Pattern%20Library) :tophat:
 - Jordan Robert (JavaScript) [jrobert](mailto:jrobert@legalzoom.com?subject=Pattern%20Library) :beer: