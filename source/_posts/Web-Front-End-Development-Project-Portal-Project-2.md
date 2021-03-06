---
title: Web Front-End Development Project Portal - Project 2
date: 2017-10-22 15:12:05
tags:
    - Front-end
    - Material Design
toc: true
---


## 1. Project 2 Milestone 1
### Description of project
<!-- The goal of this project is to search near nearby restraunts with Yelp data API and then show these locations in the Google Map. User can type in the search bar to search restraunts. I will use Google Map API to show the restraunts based on the results of Yelp. 

The original design is:
- User came to the website, show the nearby restraunts.
- User search restraunts, show the results returned by Yelp and show in the Google Map.
 -->

The goal of this project is to try to use three.js to build a scene with paper planes surrounding a planet. Then I use firebase API to store the paper planes data. 

The Visual Design part illustrates a overview of the project.

The original deisgn is:
- User first come the website, then type message and location. Click submit.
- Then a paper airplane will fly in the scene with the message.
- Also, user can click the net icon to get one message from a paper airplane. 

Here the messages and paper planes information are stored in a firebase database. And when user type location, it will call Google Map API to know the location of the user.
<!-- more -->

### Visual Design
![Mockup1](http://storage.googleapis.com/lichamnesia.appspot.com/images/project2mockup2.png) 

### Data or API 
- [Google Map API](https://developers.google.com/maps/)
- [Firebase](https://firebase.google.com)
- [paperplanes world](http://paperplanes.world)

## 2. Project 2 Milestone 2
[Link to Project 2](http://creative.colorado.edu/~shhu2952/fwd/projects/project2/) - Now just implement the paper planes surrounding the planet. And store the paper planes data in firebase.

### Interactions

First, when user comes to the website, the user will see the page like the following mockup picture.

![Mockup1](http://storage.googleapis.com/lichamnesia.appspot.com/images/project2mockup1.png)

Then the user will type message to send. Besides the message, she can type her location. When she types the location, it will automatically call Google Map API. So she doesn't need to type all, the website will auto suggest her location to her. After that, she click submit. The website will generate a paper plane for her and fly arround the planet. All the infomation will be store by firebase API. The following picture shows after user submitting the message.

![Mockup3](http://storage.googleapis.com/lichamnesia.appspot.com/images/project2mockup3.png) 

Second, the user can click the net icon to randomly show one message from other users. It will be like the following picture.

![Mockup4](http://storage.googleapis.com/lichamnesia.appspot.com/images/project2mockup4.png) 

### Logic and algorithms
The whole website flow is like. User submit a message and user can pick to see a random message from others. 

The algorithm to generate paper planes path is a Cinquefoil knot, which is a cloesed version of a double overhand knot. I used this to generate the path for the paper planes.

Also, I used three.js to make sure the flying animation works well. Each time, the paper plane should direct to the right direction of the path.

### Need to do
- Add a sky wallpaper for it
- Add a message box to type and submit it.
- Add Google Map API to support autosuggest location.
- Add a net icon to see one message from the paper plane.

## 3. Project 2 Milestone 3
Finish the todo list in Milestone 2. Now users can send a new paper plane with a message and location. Also the google map is embeded in it. Also, users can pick up a random paper plan to see its message and where it from.

## 4. Project 2 Milestone 4
I think I learned a lot during this project, which includes how to build a 3D model and import into three.js. Also, I used what I learned from lab 4 and lab 5 that I can embed the google map API in my web application.

I think if I add more animation part for the user iteractions about catching a paper plane or sending a paper plane. That will be better.
