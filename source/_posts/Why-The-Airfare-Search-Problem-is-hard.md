---
title: Why The Airfare Search Problem is hard
toc: true
date: 2023-12-30 17:11:39
tags:
 - Travel
 - Search 
---


Last month, you booked a one-way flight ticket from San Francisco to Boston, and the price is `$971`. Early this week, you booked a round way flight from San Francisco to Japan, the price is a mere $877. If you have this experience, good, you find something which is common in the airfare world.

The price attached to an airline ticket has got nothing to do with the length of the journey. It has everything to do with supply and demand.

## Airfare search problem

From http://www.demarcken.org/carl/papers/ITA-software-travel-complexity/ITA-software-travel-complexity.pdf

![aifare1](https://storage.googleapis.com/lichamnesia.appspot.com/images/airfare1.png)

<!-- more -->

The airfare search query can be defined as one or more slices. Slice includes user-selected origin, destination, time, airline, or other information like stops. Also, you can define the query as muti-city, round trip.

Let’s use the example above, the user is planning a round trip from SFO to BOS and back. Most likely the query will hit the website(Airline, OTA, Meta). Then the search engine will query all possible flights that can satisfy user needs.

How many possibilities we are talking about? From SFO - BOS, there are around 10,000 paths within one day and 2 stops. That’s a lot, let's narrow down the example to be more specific.

## Fixed one flight and one way

Let's simplify the case, now we are talking about the flight from SFO to BOS on Date_X on the exact route of UA123. But there are still 65 one-way fares for SFO-BOS.

## Multiple flight, one-way example

But from SFO to BOS, it can be multiple flights to connect. For example, you can choose a flight like SFO - ORD - BOS. The fares can grow exponentially.

## Round trip fares

Let’s also consider the round trip. Most airlines offer discounts on round trips. But they have rules like minimal stay. Because business travelers are not sensitive to the prices and are not willing to spend weekends on the flights. So the airfare on weekends or over weekends may be cheaper.

But this additional dimension will increase the airfare problem difficulty.

## Priceable Units

Ok, another dimension. It is called PU or the priceable unit.

If you choose the flight as SFO - ORD - BOS - ORD - SFO, as the ticket for your round trip. Then it counts as one priceable unit.

But if you buy the tickets as SFO-ORD-SFO, ORD-BOS-ORD. The total price may be cheaper. Because they are two price units.

## Fare

Fare: prices for one-way travel between two cities(non-stop). It’s based on the rules defined by airlines. For example, the rule can be before x days, the price is Y.

## Seat availability

When you buy tickets in the movie theatre, the problem is how many seats are available. Each seat has the same price. But for airlines, seat availability is much harder.

The price of seat availability depends on how much you want to pay for the seat. It has availability dynamics, each booking code represents a couple of seats on the plane. And each booking code represents different fares.

## O&D availability

SFO - DEN UA131 nonstop trip availability is competing with the following trips(SFO - DEN uses the same plane):

1. SFO - DEN - BOS
2. SFO - DEN
3. SFO - DEN - MIA

This means to maximize the revenue of this trip, the seat availability also needs to consider all possible trips including 1-stop or multiple stops. Definitely, there will be different fares accordingly.

## Variable Pricing

Airlines also need to prevent rich(business travelers) to use cheap fares. But business travelers may not occupy the whole plan. In order to increase revenue, airlines have to sell tickets cheaper.

## Airfare search problem

Now we can look back what is the airfare search problem:

1. A set of flights that satisfies the travel query
2. A set of fares that covers all the flights exactly once
3. A partition of the fares into priceable units
4. For each fare, the solution must satisfy the fare’s rules which restrict

## Even Basic problems are hard

From Carl de Marcken, even we simplify the problem:

1. Single fixed fare, fixed route, and variable flights is NP-hard
2. Fixed flights, fixed PUs, and variable fares is NP-hard
3. Fixed flights, fixed fares, and variable PUs is NP-hard
4. Full search is undecidable.

If we consider all the possible round trips worldwide, there are380 billion possible round trips.

## The airline industry is evolving

Considering these above chanllenges, the industry is still changing:

1. baggage fees
2. meals
3. paid seat assignments
4. loyalty programs

These are all added to the fares problem.

## ITA Software

But in the 1980s, ITA Software was founded by Jeremy Wertheimer, Dave Baggett, and Carl de Marcken. And Carl de Marcken is the original author of much of ITA's QPX low-fare search engine. Left ITA before the Google acquisition, and decided not to rejoin the circus after the Google acquisition.

The QPX enterprise is still widely used across the industry to provide airfare search services to everyone today.

![aifare2](https://storage.googleapis.com/lichamnesia.appspot.com/images/airfare2.png)

---

Since we are friends, you are welcome to use my text, but please credit the source: https://alwa.info