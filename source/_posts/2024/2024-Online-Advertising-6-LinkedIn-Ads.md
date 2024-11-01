---
title: 'Online Advertising 6: LinkedIn Ads'
toc: true
date: 2024-01-19 08:05:34
tags:
 - Online Advertising
---

## **Introduction to** LinkedIn **Ads**

In 2023, LinkedIn's ad revenue experienced a notable increase, jumping 10.1% to reach an impressive **nearly $4 billion**. This surge in revenue, highlighted by Insider Intelligence and reported by The Financial Times, underscores the platform's growing significance in the digital advertising space.

LinkedIn offers an unparalleled opportunity to build long-lasting relationships with the world's largest professional audience. Its sophisticated B2B targeting capabilities enable advertisers to drive impactful results, while operating within a B2B environment that is respectful and understanding of their needs. Professionals from across the globe flock to LinkedIn to stay connected, advance their careers, and enhance their work productivity.

![U](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd12.png)

<!-- more -->


## Campaigns on LinkedIn 

Creating an effective LinkedIn ad campaign involves several strategic steps:

### 1. Choose your objective:

Start by defining your campaign's goals, which can range from increasing awareness to driving conversions.

### 2. Select your targeting criteria

LinkedIn's targeting tools allow you to reach your desired audience effectively. Choose from over 20 different audience attribute categories to tailor your campaign.

### 3. Choose your LinkedIn ad format

LinkedIn offers a variety of ad formats:

- **Sponsored Content:** Native ads in the LinkedIn feed.
- **Sponsored Messaging:** Direct engagement through LinkedIn messaging.
- **Dynamic Ads:** Automatically personalized ads for your audience.
- **Text Ads:** Simple PPC or CPM ads, primarily for desktop.

### 4. Select your budget and schedule

Determine the budget and timeline for your campaign, an essential step in campaign management.

### 5. Measure and optimize your campaign

Once your campaign is live, use LinkedIn's analytics tools to monitor performance and make adjustments for optimization.

## Ads outside of LinkedIn


![U](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd16.png)

Expanding beyond its own platform, LinkedIn has embraced Real-Time Bidding (RTB) to serve ads. This approach, which was initially a small experiment, has grown into a significant part of LinkedIn's advertising strategy.

RTB allows LinkedIn to auction ad slots in real time, with the winning DSP's ad being displayed in the feed of a third-party app. This system ensures efficient ad placement and maximizes reach.

The exchange service, dedicated to RTB, is designed to handle high query per second (QPS) with low latency. It optimizes ad selection from millions of campaigns and records critical data for performance measurement. Techniques like caching, async parallel calls, network peering, and keep-alive connections are employed to meet the stringent latency requirements.


![U](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd13.png)

Detailed insight into the workings of a Real-Time Bidding (RTB) system in digital advertising, particularly in the context of LinkedIn's expansion into advertising on third-party platforms. Here's an elaboration on how this process functions:

1. **Ad Slot Request**: When a user browses through a third-party news application, the app sends a request to its backend server to reserve spaces for advertisements. This is the initial step in the ad-serving process.
2. **Server to Ad Exchange Communication**: The publisher’s server then forwards this request to an ad exchange. This request includes vital contextual data such as the application's mobile ID, IP address, geographic location, and the app's name. This data is crucial for targeting ads effectively.
3. **Auction Process**: The ad exchange broadcasts this request to its Demand-Side Platform (DSP) partners. An auction, typically a second-price auction, is then conducted. In this auction, DSPs bid for the ad slot, and the highest bidder gets to display their ad, but they pay the price offered by the second-highest bidder. This process needs to be completed within a tight time frame, often around 120 milliseconds.
4. **Winning DSP and Ad Display**: The DSP that wins the auction gets the right to display its ad on the news app's feed. The winning DSP is also responsible for paying the ad exchange for the ad impression.
5. **Optimized Exchange Service for RTB**: The exchange service is specifically designed for RTB. It is optimized to handle high Query Per Second (QPS) with minimal latency. This service is responsible for presenting selected ad inventory opportunities to the Decisioning service.
6. **Decisioning Service**: The Decisioning service's role is to choose the most suitable ads from millions of available campaigns. This service ensures that the most relevant and effective ads are selected for display.
7. **Performance Measurement**: To evaluate the effectiveness of the ads, both ad impression events and click events are recorded. This data is collected in the Exchange service as well as in the Ad tracking system, facilitating a thorough analysis of ad performance.
8. **System Optimization for Low Latency**: To meet the critical requirement of low latency, several optimization techniques are employed. Caching and asynchronous parallel calls are widely used across the system. Additionally, network peering and keep-alive connections are implemented to further reduce latency.


![U](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd14.png)

## Summary of RTB in LinkedIn

By integrating with mobile native exchanges and employing real-time bidding, LinkedIn offers advertisers additional avenues to reach relevant audiences. The system's horizontal scalability meets high throughput and low latency demands, and ongoing improvements promise even more efficient and targeted advertising solutions. Future articles will explore more technical details and the system's offline components.

The integration with more exchanges and partnerships with quality publishers for premium inventory access are part of LinkedIn's strategic expansion in the digital advertising domain.

## **Why am I seeing this ad on LinkedIn (DSA)**


![U](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd15.png)

When you click on "Why am I seeing this ad?" on LinkedIn, you're essentially triggering a process designed to provide transparency and understanding about the ads you're being shown. Let's break down this process:

1. **API Call to Mid-Tier**: Upon your inquiry, LinkedIn makes an API call to a mid-tier service. This service acts as an intermediary, fetching the necessary information to answer your query.
2. **Data Collection by Mid-Tier**: The mid-tier service collects two main types of data:
    - **Advertiser Data**: This includes information about the advertiser account sponsoring the ad. Essentially, it tells you who is responsible for showing the ad.
    - **Matched Targeting Details**: This explains why you, as a member, are being targeted by this specific ad. It's a breakdown of the targeting criteria used by the advertiser.
3. **Campaign Targeting Facets**: The targeting for an ad campaign on LinkedIn is based on various facets, such as job title, skills, education, location, etc. Within each facet, there can be multiple segments. For example, under the job title facet, different job titles like "Software Engineer" or "Marketing Manager" could be individual segments.
4. **Include and Exclude Parameters**: Advertisers can fine-tune who sees their ads using "include" and "exclude" parameters in their targeting:
    - **Include**: These are the criteria that a LinkedIn member must match to be targeted by the campaign.
    - **Exclude**: These are criteria that ensure a member who matches them will not be targeted by the campaign.
5. **Member Targeting Data**: This includes the information you've provided in your LinkedIn profile (like job title, skills, education), your ad settings preferences, and some inferred data (like estimated age or gender).
6. **Combining Campaign and Member Targeting**: LinkedIn combines the information from the campaign's targeting criteria with your personal data to determine why you were targeted for the ad. The matched targeting facets give you insight into this reasoning.

For instance, if an ad campaign is targeting "Software Engineers" in "San Francisco" but excluding those with less than "5 years of experience," and your profile fits these criteria (e.g., your title is "Software Engineer," located in San Francisco, with over 5 years of experience), this explains why you're seeing that particular ad.

This feature on LinkedIn is part of a broader effort in digital advertising to increase transparency and give users more control and understanding of their ad experiences.



---

Since we are friends, you are welcome to use my text, but please credit the source: https://alwa.info