# Learn Handlebars with Gulp and Sass (SCSS)

##Purpose

Similar to Pluralsite's Gulp automation lesson, I have had to make a Handlebars page generator for my client (LegalZoom), so that offshore teams can rapidly produce consistent pages without a CMS.

##How It Works

It starts the task by taking the template, parsing it for injection points, then grabbing the modules to be injected (these are mainly handlebars fragments) and placing them in the page. The next pass grabs a JSON source, and through the magic of Handlebars, assembles the content and then spits out a page into the distribution folder.

