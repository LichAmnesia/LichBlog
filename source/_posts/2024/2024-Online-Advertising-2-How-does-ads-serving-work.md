---
title: 'Online Advertising 2: How ads serving works'
toc: true
date: 2024-01-10 19:19:39
tags:
 - Online Advertising
---

Creating an online ad serving system requires a comprehensive architecture to handle the dynamic and complex process of serving ads to users. This system involves several components working together to manage ad requests, select appropriate ads based on various criteria, and deliver them to the user efficiently.

![banner](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd5.png)

<!-- more -->


## ****How RTB works****

![Untitled](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd3.gif)

1. User lands on a website
2. Website has a adslot open for bidding
3. ad request from the website sends to ad exchange
4. Ad exchange sends the bid request to buyers(DSP, trading desk, etc)
5. within 1s, advertiser need to put a bid and sends a bid response back.
6. A realtime auction happens in ad exchange. The winner sends as ad response back to website
7. Website renders the ad on the adslot.

## How online ads serving works


![Untitled](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd4.gif)

1. **User Interaction**: A user visits a website with ad slots.
2. **Ad Slot Identification**: The website identifies ad slots where ads can be displayed.
3. **Ad Request Initiation**: When an ad slot is identified, the website sends an ad request to the ad server.
4. **Ad Server Processing**: The ad server receives the request and accesses the advertiser's database to retrieve all potentially relevant ads. These ads are typically predetermined by advertiser campaigns.
5. **Targeting Criteria Application**: The ad server applies targeting criteria set by the campaigns to narrow down the selection of ads. This may include user demographics, behavior, location, and other relevant factors.
6. **Auction and Bidding**: Eligible ads are then sent to an auction system. Here, various advertisers' bids for the ad slot are considered, and ads are ranked based on bid amount and relevance.
7. **Ad Selection and Delivery**: The highest-ranking ad from the auction is selected and sent back to the user's browser for display in the ad slot.
8. **Data Collection and Reporting**: The system collects data on ad performance, such as impressions, clicks, and engagement. This data is reported back to advertisers for campaign analysis and optimization.
9. **Billing and Accounting**: Advertisers are billed based on the ad impressions or clicks, as per the auction results and ad delivery.



---

Since we are friends, you are welcome to use my text, but please credit the source: https://alwa.info