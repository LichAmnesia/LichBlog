---
title: 'Online Advertising 5: Example - Reddit Ads'
toc: true
date: 2024-01-12 18:35:43
tags:
 - Online Advertising
---

## **What are Reddit Ads**

Reddit's advertising platform is a powerful tool for businesses to increase visibility and engagement. It offers a variety of ad formats, including banner ads, video ads, and sponsored posts. These ads can be finely targeted to specific subreddits or demographic groups, enabling businesses to connect effectively with their desired audience.

![banner](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd6.png)

<!-- more -->


## **Background**

Understanding Reddit's ad serving process is crucial. When a user browses Reddit, an ad auction occurs. This auction, based on a generalized second-price model, selects the highest bidder's ad to display. However, the cost paid is equal to the second-highest bid. This system ensures relevance and fair pricing in ad display.

The ad selection process involves multiple stages, including filtering ineligible ads based on criteria like location, ad type, and targeting. This process is distributed across several shards to manage the volume of requests, with each shard conducting its own auction. The final ad selection is made through a comprehensive evaluation of these shard winners.

![Untitled](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd11.png)

### **Targeting**

Reddit's targeting capabilities are robust, offering options like:

1. **Subreddit Targeting**: Target users based on specific subreddit interests.
2. **Demographic Targeting**: Aim your ads at users by age, gender, location, etc.
3. **Custom Audience Targeting**: Utilize a list of Reddit user IDs for precise targeting.
4. **Device Targeting**: Reach users based on their device type.

### **Types of Ads**

1. **Promoted Posts**: Blend seamlessly into user feeds, distinguished by the 'sponsored' tag.
2. **Display Ads**: Traditional banner-style ads.
3. **Video Ads**: Engage users with dynamic video content.

### **Bidding and Pricing**

Advertisers on Reddit participate in a bidding system for ad placements. They can set a budget and a bid amount, either per impression (CPM) or per click (CPC). The ad's visibility is influenced by the bid amount and its relevance to the target audience.

### **Campaign Management**

Reddit Ads Dashboard allows advertisers to craft campaigns, manage budgets, and track key performance indicators like impressions, clicks, and overall expenditure.

### **Ad Objective**

Advertisers can set objectives like:

- CPClicks: Cost per Click.
- Cost per Conversion: Requires the Reddit pixel for website integration.
- CPM: Cost per Thousand Impressions.
- CPV: Cost per View.

### **Ad Slot Placement**

Ads can be placed:

- In the feed.
- Within conversation threads.

### **Ad Formats**

Reddit supports various ad formats including:

- Display Ads: Standard and image-based.
- Video Ads: For more dynamic content.
- Carousel Ads: Multi-image ads.

### **Bid Strategy**

Reddit offers a manual bidding option for all auctions. Advertisers can also set a cost cap, allowing Reddit to manage auctions within the specified budget limit.


## **Set Up Third-Party Measurement**

[Reddit Doc about third-party measurement](https://reddit.my.site.com/helpcenter/s/article/Set-up-third-party-measurement)

Third-party trackers on Reddit provide advertisers with the ability to track data related to impressions and clicks, as well as validate ad delivery, by using an approved third-party vendor. Here's a detailed guide on how to set up these trackers and use dynamic parameters in them:

### **Adding Impression and Click Trackers**

1. **Selecting a Measurement Vendor**: First, choose from Reddit’s approved third-party measurement vendors, which currently include Adjust, Appsflyer, Branch, Google (DCM), Kochava, and Singular.
2. **Tracker Setup in Ad Creation**: When creating an ad, you can add impression and click trackers from these approved providers.
    - In the Trackers section of the ad creation process, select “Add another tracker”.
    - Insert the tracker URL provided by your measurement vendor.
    - You can add multiple trackers or remove existing ones using the trash icon.

### **Measuring App Install Campaigns**

- For specific details on measuring app install campaigns, refer to the guidelines for Android Mobile Measurement and iOS 14 Mobile Measurement provided by Reddit.

### **Adding Macros to Trackers**

Macros are small pieces of code that can dynamically insert relevant data into your trackers. Here's how to add them:

1. **Obtain Parameters**: Get the required parameters from your tracking partner's tag URL.
2. **Copy Corresponding Macros**: From the list provided by Reddit, copy the macros that correspond to your required parameters.
3. **Paste Macros into Tag URL**: Use the format **`parametername={{REDDIT_MACRO}}`** and connect parameters with an ‘&’.

**Example**: **`https://tag.demo.com/ads?campaign={{CAMPAIGN_ID}}&advID={{ADVERTISING_ID}}&redditadgroup={{ADGROUP_ID}}&creative={{CREATIVE_ID}}&timestamp={{CACHEBUSTER}}`**

### **Understanding Reddit Macros**

Each macro serves a specific purpose and is case sensitive. Some common macros include:

- **{{ADVERTISER_ID}}**: Unique Reddit account Advertiser ID.
- **{{ADVERTISING_ID}}**: iOS IDFA or Android GAID.
- **{{CAMPAIGN_ID}}, {{ADGROUP_ID}}, {{AD_ID}}**: IDs for Campaign, Ad Group, and Ad.
- **{{COUNTRY}}, {{OS_GROUP}}, {{DEVICE_GROUP}}, {{PLATFORM_GROUP}}**: User location, operating system, device type, and platform type.
- **{{CACHEBUSTER}}**: A UNIX/System timestamp in UTC.
- **{{CREATIVE_H}}, {{CREATIVE_W}}**: Dimensions of the native ad post.
- **{{DEVICE_OPT_OUT}}**: Indicates if a user has opted out of passing their advertising ID.

These macros enhance the tracking capabilities by providing dynamic, real-time data, making it easier for advertisers to measure and optimize their campaigns on Reddit effectively.

## Serving structure

![Untitled](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd7.png)

### **1. Ad Selector Service**

- **Role**: This is the initial point of contact in the ad serving process. It receives requests from Reddit.com and is responsible for initiating the ad selection process.
- **Functionality**: Utilizes the **`getAds`** function to retrieve ads for display.
- **Subsequent Action**: After getting ads, it communicates with the enrichment service for additional data.
- **Performance Requirement**: Must have a 30ms P99 performance, indicating it can handle complex rules and auction processes efficiently.

### **2. Enrichment Service**

- **Purpose**: Gathers detailed information about the request, user, and other relevant data to aid in selecting the most appropriate ad.
- **Integration**: Provides enriched data back to the ad selector for final ad selection.
- **Characteristics**:
    - Implemented as a Thrift service.
    - Contains an embedded RocksDB database.
    - Has a 4ms P99 performance requirement.
    - Utilizes a prefix scan in Go for data retrieval and computation, minimizing network latency.

### **3. Event Tracker Service**

- **Function**: Records confirmation that an ad has been served to the user.
- **Performance and Reliability**: Requires 1ms P99 performance, emphasizing its need for speed and reliability in acknowledging logs and events.

### **4. Kafka Integration**

- **Role**: Acts as a messaging system for various components.
- **Connected Services**: Receives data from the ad selector and event tracker.
- **Output**: Feeds data into two Apache Spark jobs for further processing.

### **5. Apache Spark Jobs**

- **Event Stats Job**: Constantly runs to gather data for improving ad selection.
- **Pacing Loop**: Involves counting the number of ads shown per advertiser and optimizing ad display.

### **6. Go Services and Tools**

- **Ad Selector**: Handles complex business rules and auction processes.
- **Event Tracker**: Acknowledges logs and events with high reliability.
- **Enrichment Service**: Performs data aggregation and computation with minimal latency.
- **Other Tools**: Includes services like the Reporting Service, Vault administration tool, and Ad event generation service, which are crucial but not the primary focus of this overview.

## First Pass Ranker

The First Pass Ranker (FPR) is a pivotal component in the ad recommendation system, designed to efficiently filter and select the most relevant ad candidates from a vast pool. Here's an in-depth look at its functioning and the underlying architecture:

### **First Pass Ranker Overview**

![Untitled](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd8.png)

1. **Ad Eligibility Filtering**: This initial step assesses which ads are suitable for a specific user, considering factors like targeting criteria, brand safety guidelines, and budget pacing.
2. **First Pass Ranker (FPR) Stage**: Utilizes a light Machine Learning (ML) model to generate and select potential ad candidates. This stage is crucial for narrowing down millions of ads to a manageable subset.
3. **Prediction Model**: A more complex ML model predicts the likelihood of a user engaging with an ad, denoted as P(Charging Event| user).
4. **Ad Auction**: The final ad ranking score (eCPM) is computed by multiplying the ad's bid value with P(Charging Event|user). Adjustments to the bid value can be made based on the advertiser's remaining budget and campaign strategy (like Auto-bid or Max click).

### **Embedding Model**

![Untitled](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd9.png)

- **Two-tower sparse network (TTSN) model**: This ML-based model is specifically designed for ad ranking and recommendation systems. The TTSN model, detailed in a [published paper](https://dlp-kdd.github.io/assets/pdf/DLP-KDD_2021_paper_4.pdf), features a unique architecture:
    - **Dual Towers**: One tower represents the user and the other represents the flight (ad campaign). Each tower processes inputs and learns individual representations.
    - **Interaction Layer**: The final output estimates the similarity between user and flight embeddings, facilitating the ad selection process.
    - **Handling Large, Sparse Data**: TTSN excels in managing extensive and sparse datasets, capturing complex interactions between users and ads.

### **Architecture and Training Pipeline**

- **Data Assessment**: The initial phase involved evaluating the volume of user and flight data, which amounted to several gigabytes of engagement and contextual information.
- **Training Pipeline Development**: To handle this data efficiently, a specialized training pipeline was developed, focusing on:
    - **Efficient Data Processing**: Ensuring the pipeline could manage large data volumes.
    - **Modular Design**: Allowing independent development, testing, monitoring, and optimization of each stage.
    - **Kubeflow Platform**: Implementing the pipeline on Kubeflow, a renowned platform for machine learning operations, enhancing scalability and flexibility.
        
        ![Untitled](https://storage.googleapis.com/lichamnesia.appspot.com/images/OnlineAd10.png)
        

The integration of FPR and the TTSN model into Reddit's ad serving infrastructure signifies a sophisticated approach to ad recommendation. By leveraging advanced machine learning techniques and a well-architected training pipeline, this system ensures that users are presented with ads that are highly relevant and personalized, enhancing user experience and ad effectiveness.



---

Since we are friends, you are welcome to use my text, but please credit the source: https://alwa.info