---
title: Web Front-End Development Project Portal - Grad Project
date: 2017-11-07 09:08:53
tags:
    - Front-end
    - Material Design
toc: true
---


## 1. Grad Project Milestone 1
### Description of project
The goal of this project is to try to use instagram or Pinterest API to generate an online gallery. Users can search on the search bar and the website will use these APIs to get images related to the keywords. Also, user can type in multiple blogers' username and we can generate a online gallery only by their posts.

<!-- more -->

### Visual Design

Haven't decided what the whole website should be. But the gallery part should look like the following.

![Mockup1](http://7xrh75.com1.z0.glb.clouddn.com/gradproject_mockup1.png) 

### Data or API 
- [Instagram API](https://www.instagram.com/developer/)
- [Pinterest API](https://developers.pinterest.com/docs/)
- [tumblr API](https://www.tumblr.com/docs/en/api/v2)
- [Firebase](https://firebase.google.com)


## 2. Grad Project Milestone 2
[Link to Project 2](http://creative.colorado.edu/~shhu2952/fwd/) - Now I have implemented online gallery part. The Ins API and Pinterest API is hard to use in static website. So I plan to use firebase storage to store my images and use firebase to get these images to show as an online gallery.  

### Interactions

There are not so many iteractions in this project. Now the only interaction is the user can see the images one by one. When user clicks on one image, there is two buttons that user can move to next image or previous image.

### Logic and algorithms
First, when user enters the website, jQuery will call firebase APIs to get images. After getting all the data, the website will render all the images as an online photo gallery. 


### Need to do
- User can upload an image
- User connect to Instagram to get all images from her Instagram

## 3. Grad Project Milestone 3
Now I found a way to connect to Instagram API.

User can't upload an image, but now he/she can log into Instagram and then see all his/her instragram images from the gallery. 

However, If I need to use Instagram API, I need to log in and register a Instagram developer account. So the API is very limited. To see the gallery. You need to log in use my test account. Then you can see the posts of this instragram account.

User name: shen.huang2017@gmail.com
Password: shenhuang

## 4. Grad Project Milestone 4

