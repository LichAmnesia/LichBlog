---
title: Note for Bayesian inference
date: 2017-08-17 15:42:12
tags:
    - mathematic
---

Note for learning Bayesian inference
<!-- more -->

# 1. conjugate prior （共轭先验）
### 1.1 Posterior Probability
$\theta$ is the model, $x$ is obeserved data.
Marginal likelihood: 
$$
P(x) = \int P(x \vert \theta)P(\theta) d\theta
$$

When face a new point $x_{new}$.
$$
P(x_{new} \vert x) = \int P(x_{new} \vert \theta) P(\theta \vert x) d\theta
$$

### 1.2 How to select prior
If prior is Uniform. The posterior is:
$$
P(\theta \vert x) = \frac{P(x \vert \theta)}{\int P(x \vert \theta)  C d\theta}
$$

{% pdf http://7xrh75.com1.z0.glb.clouddn.com/Bayesian%20Data%20Analysis.pdf %}

