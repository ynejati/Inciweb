# Inciweb (Demo)

A simple single page web application and REST API that supports CRUD operations
based on the Incident Information System (InciWeb) https://inciweb.nwcg.gov.

## The Mongo Express Angular Node (MEAN) stack

* Angular
* Node.js
* Express
* Express Generator
* Monk
* MongoDB
* Bootstrap
* Jade
* Nodemon

### Structure

app.js - entry point to application
public - storage of public assets, js files, css, images, etc.
routes - js files defining routes and their respective handlers. Defines the endpoints in application.
views - templates and template engines, html, jade, pug, EJS, etc.
package.json - Node application metadata and dependencies


logomakr.com/6NHkrI


#### Notes

Documents (JSON objects) are stored in MogoDB using Monk. No SQL to JSON conversions are necessary.
Express routes is used to create API endpoints
Angular used to build forms
Node is a Javascript runtime environment allowing use beyond the browser, to the server. Primarily useful in building real-time web APIs. Should not be used for CPU intensive applications.

1. Create API endpoint with Express