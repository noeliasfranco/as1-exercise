# AutoServe1 Demo #

## To run the app:##

1. Run npm install 
2. Run node server
=======
Introduction
============
In this document you will find the information required to develop a very small web app with some business logic that we use at AutoServe1.
Please review the document and ask all questions you may have.
The app is not difficult to develop but it may take some time. You may have to investigate some libraries to get it working.
Please note that you will have 1 week to finish it but we can provide you with additional time in case you feel it's not enough.   

Model
=====

InspectionOrder
---------------
  * id : number (mandatory)
  * note : string
  * orderNumber : string (can use id here) (mandatory)
  * inspectionType : string (mandatory)
  * vehicle : Vehicle (mandatory)
  * closed : boolean (default value is false)
  
Vehicle
-------
  * year : number (mandatory)
  * make : string (mandatory)
  * model : string (mandatory)

Inspection types
----------------
You can use the following string as possible inspection type values:
* Vehicle 360 Inspection
* Detailed Inspection
* Quick Photos Inspection

REST API
========
The API should at least accomplish the following:
  * get list of inspection orders
  * get one inspection order
  * create inspection order
  * close inspection order
  * get list of inspection types

UI
==
*Designs are provided*

The UI will be made of a dashboard that presents a list of inspection orders and a popup that will allow the user to create a new inspection order

* Search box filter as you type the current list of inspection
* Clicking the X on the inspection should mark it closed and remove it from the list. To remove it from the list use the InspectionOrder.closed attribute.
* New inspection & Report will open the popup to allow the user to create a new inspection order
* Amount of vehicles in dashboard must be consistent

AutoServe1 Logo
---------------
http://app.autoserve1.com/images/as1logos/responsive/default-logo.png

Notes
=====
  * NodeJS is mandatory
  * Please use Express, Restify or HapiJS to build the REST API
  * There is no need to use a database. You can do it if you want but you could also use an in-memory array or a file for the sake of this exercise
  * Try to use descriptive HTTP response codes to inform the user about the result of the operations
  * You could use SASS for styling the app
  * You could use RiotJS to code the UI
  * Feel free to use flux, redux or RiotControl
  * If you choose to use a build system please choose between gulp or webpack
  * Questions are always welcome

What will be evaluated
======================
  * Readability and robustness of the code
  * The level of completion
