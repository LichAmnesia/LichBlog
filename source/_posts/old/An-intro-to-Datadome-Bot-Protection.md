---
title: An intro to DataDome Bot Protection
toc: true
date: 2023-12-30 16:23:20
tags:
 - Web Scraping
 - DataDome
---

# An intro to Datadome Bot Protection 


## Overview


In the ever-expanding world of cybersecurity, Datadome Bot Protection stands as a guardian against the relentless forces of malicious bots. This cutting-edge solution is not just another player in the anti-bot software industry, trusted by prominent websites such as FootLocker, Rakuten, and Reddit etc.

![image](https://storage.googleapis.com/lichamnesia.appspot.com/images/An intro to Datadome Bot Protection.png )

Datadome Bot Protection is meticulously designed to shield your website or application from a barrage of malicious bots. It employs an arsenal of advanced bot detection techniques, including device fingerprinting, behavior analysis, and machine learning algorithms.

Thanks for reading Lich’s Newsletter! Subscribe for free to receive new posts and support my work.

Datadome includes a real-time dashboard. This dashboard allows you to monitor bot activity with eagle-eyed precision and take immediate action when needed. Detailed insights into the number and types of detected bots, coupled with a log of actions taken, provide you with a comprehensive view of your digital domain's security. Plus, you have the power to configure alerts that keep you informed about any suspicious bot activity.

<!-- more -->

### Finance overview

**[DataDome](https://www.crunchbase.com/organization/datadome)** has raised a total of **[$81.2M](https://www.crunchbase.com/search/funding_rounds/field/organizations/funding_total/datadome)** in funding over **[5](https://www.crunchbase.com/search/funding_rounds/field/organizations/num_funding_rounds/datadome)** rounds. Their latest funding was raised on **[Mar 30, 2023](https://www.crunchbase.com/search/funding_rounds/field/organizations/last_funding_at/datadome)** from a **[Series C](https://www.crunchbase.com/search/funding_rounds/field/organizations/last_funding_type/datadome)** round.

**[DataDome](https://www.crunchbase.com/organization/datadome)** is funded by **[16](https://www.crunchbase.com/search/principal.investors/field/organizations/num_investors/datadome)** investors. **[Isai](https://www.crunchbase.com/organization/isai)** and **[Elephant](https://www.crunchbase.com/organization/elephant-venture-capital)** are the most recent investors.

## **Detecting website using Datadome or not**

Utilize tools like [Wappalyzer](https://www.wappalyzer.com/) to identify the anti-bot solutions in use on a website.

![Image 2](https://storage.googleapis.com/lichamnesia.appspot.com/images/An intro to Datadome Bot Protection 2.png )

Another is to find the `datadome` in the browser cookie.

## How does Datadome work?

When it comes to identifying and thwarting bots, Datadome deploys a multi-faceted approach that delves into behavioral and reputational signals. This tech-savvy system aims to differentiate between genuine human behavior and automated bot actions.

### **Behavioral Detection**:

To distinguish between bots and humans, Datadome assesses two key aspects of behavior:

1. **Client-Side Behavioral Signals**: These encompass mouse movements, typing speed, and more. Datadome collects these on the client side using JavaScript code or via an SDK in mobile applications. It collects behavioral data from the client (i.e. the web browser in most cases) such as mouse movements or key strokes. Generic information is also collected about the OS, the browser itself, the GPU, etc.
    1. Mobile SDK allows more information to be exposed to Datadome like IMEI.
2. **Server-Side Behavioral Signals**: This category focuses on the timing and patterns of user requests. It considers factors like how quickly requests are made, which URLs are visited, and the behavior of user sessions based on cookies. Datadome looks for suspicious actions, such as IP address changes, consistent user-agent details, or an unusually high volume of requests – all indicative of bot behavior.
    1. How quickly the session ends
    2. How quickly the request sends
    3. Any suspicious cookie
    4. Requesting only one type of resources or more than average users resources

### **Reputational Detection**:

Bot developers often employ proxies to escape behavioral detection. These proxies can be found in data centers or on real-user devices, adding layers of complexity. Datadome's vigilance extends to identifying requests originating from proxies, a crucial step in detecting distributed attacks.

- Unfortunately, blocking all data center IP traffic is not enough, and worse, it will trigger false positives. A lot of legitimate traffic originates from data center IPs, including VPN users and big corporate proxies.
- Moreover, blocking an entire IP address is dangerous because many IP addresses are heavily shared. In fact, most mobile IP addresses are shared by hundreds or thousands of users at any given time. Thus, blocking the IP can result in many **false positives** (challenging real human users) that hurt whole experience.

### **Forged Fingerprints**:

Every internet user has a unique fingerprint, consisting of various access details. Bots, however, can mimic human fingerprints. Datadome keeps an eye on HTTPS, TLS, browser, and mobile fingerprints to spot suspicious patterns. For instance, Puppeteer Extra Stealth forges fingerprints and CAPTCHAs, but Datadome's watchful eye helps uncover these ruses, ensuring that bots don't slip through the cracks undetected.

- HTTP fingerprints, based on HTTP headers (server side).
- TLS fingerprints, based on metadata extracted during the TLS handshake (server side).
- Browser fingerprints, based on information about the browser, device, and operating system (OS) collected using JS (client side, in the browser).
- Mobile fingerprints, based on information about the device and OS collected using an SDK (client side, in a mobile application).

### **CAPTCHA in Datadome**

In the ever-evolving arms race between bots and safeguards, the role of CAPTCHAs has come under the spotlight. The data from Datadome’s customers reveals that a staggering 50% of traditional CAPTCHAs are effortlessly cracked by bots. With the relentless advancement of machine learning and the emergence of CAPTCHA farms employing human workers, relying solely on CAPTCHAs as a defense line against bots has become an ineffective strategy.

What sets DataDome apart is its commitment to ensuring that 99.99% of real users never encounter a CAPTCHA.

### WAFs

Web Application Firewalls, or WAFs, stand as the digital guardians of websites and web applications. Their primary mission is to shield your digital presence from known threats, such as SQL injections, session hijacking, and cross-site scripting, employing a set of predefined rules. These rules act as a gatekeeper, discerning between benign bot traffic and its sinister counterpart, primarily by scrutinizing requests for well-known attack signatures.

WAFs also heavily rely on the reputation of IP addresses. If an IP address has a tainted reputation, it's deemed untrustworthy, and all activity from it is suspect. Conversely, a pristine IP reputation often grants passage to all requests originating from it. But as bot operators now seamlessly rotate high-quality, residential IPs, this IP-centric approach has lost its effectiveness.

In a dynamic digital realm where bots continuously evolve, WAFs, while valuable in their own right, are no longer the panacea for comprehensive bot detection and prevention.

### Bot as a Services

Some existing providers build the proxy and fingerprint, automated browser to bypass the bot protection on the website. Then expose the API to let customers to easily bypass the protection

![Image3.png](https://storage.googleapis.com/lichamnesia.appspot.com/images/An intro to Datadome Bot Protection 3.png)


## Service infrastructure - AWS example

In the world of web protection, AWS and Datadome join forces. When a request reaches AWS, another travels to Datadome, bearing end-user data. Datadome's mighty machine learning steps in, analyzing the request's intent. It sends back the decision – allow or block – back to AWS, ensuring threats are thwarted with agility.

![Image 4](https://storage.googleapis.com/lichamnesia.appspot.com/images/An intro to Datadome Bot Protection 4.png)

## **Conclusion**

As I didn’t go to much details of what information Datadome is using for protection. But this is the note what I’m used for researching Datadome.



---

Since we are friends, you are welcome to use my text, but please credit the source: https://alwa.info