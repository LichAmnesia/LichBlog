---
title: Python实现动态系统：Wilson and Cowan 模型
date: 2016-06-23 16:32:51
tags:
    - 机器学习
    - mathematic
---


你可以在[这里](http://martinosorb.github.io/files/wilsoncowan.ipynb)下载原始的，能直接运行的 IPython 笔记。

Wilson and Cowan，在七十年代，开发出了动态系统的方法来研究神经元群组的大规模行为。他们的方法并不关注单个神经元的行为，但是关注对两个亚群而言神经元群组激活的比值水平（粗略而言，即在一个单元时间内神经元激活数量）：抑制神经元和兴奋性神经元。

如果你对 Wilson and Cowan 的模型感兴趣，那么继续阅读。如果你只想知道一些 Python 实现代码，直接跳到数值求解方法部分。

<!-- more -->

# 1. 理论
### 1.1 假设

我们只关注**群组**大规模行为而不只是个体细胞。


>包含这种群组的细胞被认为是在空间上紧邻的，以及它们的相互作用被假定为是随机的，但足够紧密，使得它很可能会有至少一个路径（直接或通过的中间的神经元）连接的任何两个在群组的细胞。在这些条件下，我们可以忽略空间相互作用，并简单地处理群体的短暂动态。与此方式相一致，我们选择细胞在群组中每单位时间兴奋状态的的比例数目作为相关变量。 [...]
>在这个研究中有一个最终的关键的假设：任何复杂的所有神经过程是依赖于细胞兴奋和抑制的相互作用。

空间交互作用在此作者另外一篇论文有讨论

### 1.2 得到一个方程组
在博文的其余部分，我们将分别称之为$ E(t) $和$ I(t) $分别表示在时间$ t $的即时兴奋比例和抑制比例。点$(E = 0, I = 0)$不应该被解释为无活性状态。而是应该解释为网络的静止状态。因为我们需要这个作为一个稳定驻点。

为了构建一个有意义的模型，我们慢慢地纳入相关的生物假设。什么时候一个神经元被激活？在最简单的模型中，两个条件必须满足：
1. 神经元**不能**在“不应期”，也就是说它不能在激活之后立即被激活。
2. 神经元必须在一个短响应期内接受足够的输入信号。


### 1.3 无“不应期”

在$ t\_1 $和$ t\_2 $之间激活的神经元比例为：

$$ \int \_{t1}^{t2} E(t^{'})dt^{'}.$$

因此，如果$ r $是不应期的长度。在时间$ t $满足条件 1 的神经元比例为：

$$ 1 - \int \_{t-r}^{t} E(t^{'})dt^{'}.$$

对于受抑制群组也是很一样的。

### 1.4充分激活
要查看是否条件2被满足，我们需要输入到子群中，这是$ c\_1 E(t) - c\_2I(t) +  P(t)$，举例来说即从兴奋神经元的权重贡献，从抑制性神经元一个相应的负贡献，以及外部输入 $P$。然后，神经元非线性响应该输入。我们称之为$ S\_e $响应函数，也称为兴奋神经元的输入频率特性，并且相应的$ S\_i $是用于抑制的。

现在，它不仅是瞬时行为：一次激活仍然可以帮助下游神经元引发新的激活，甚至这个时间可以在几毫秒之后。所以在时间$ t $被激活的概率正比于
$$
S\_e \lgroup \int \_{-\infty} ^ t \alpha (t - t^{'}) [c\_1 E(t^{'}) - c\_2 I(t^{'}) + P(t^{'})]dt^{'} \rgroup
$$

### 1.5 粗粒化
在条件(1)和条件(2)中，我们可以摆脱积分，并通过一个一个常数描述的时间影响的长度代替。如果我们感兴趣的是粗粒化的活性时间，也就是我们在函数$ \alpha $专注于在一个时间周期称之为$ k $比响应期$ r $和特征长度稍微长一些。所以，我们可以说在时间$ d + dt $时刻活性取决于条件(1)和(2)的同时实现。
$$
E(t + dt) = (1 - rE(t)) S\_e(kc\_1E(t) - kc\_2I(t) + kP(t))
$$
### 1.6 Wilson and Cowan 模型的最终版本

所有这些近似和假设之后，使用微分形式变换上述公式并适当重新调整$ S\_e $。我们可以获得一个耦合的、非线性的表示兴奋和抑制神经元群组激活概率微分方程组。此微分方程构成了 Wilson and Cowan 模型。

$$
\begin{align}
\tau\_e \frac{dE}{dt} &= - E + (k\_e - r\_e E) S\_e (c\_1 E - c\_2 I + P) \\\\ 
\tau\_i \frac{dI}{dt} &= - I + (k\_i - r\_i I) S\_i (c\_e E - c\_4 I + Q),
\end{align}
$$
其中：
- $ \tau\_e $和$ \tau\_i $是时间常数；
- $ k\_e $和$ k\_i $是维度常数；
- $ r\_e $和$ r\_i $是不应周期；
- $ S\_e $和$ S\_i $是 Sigmoid 函数表示非线性关系
- $ c\_{1,2,3,4} $是代表激活的神经元到激活，抑制的神经元到激活的参数，激活神经元到抑制，以抑制到抑制的相互作用；
- $ P $和$ Q $是外部输入的两个群体。


# 2. 数值求解方法
现在，我们要使用数值方法求解上述方程，而不管它们数学意义。我们将选择一些参数，和一些初始值，并绘制在状态空间和时间的方程状态变化。


```
# for fast array manipulation
import numpy as np
# for plotting
import matplotlib.pyplot as plt
# for numerical ODE integration
from scipy.integrate import odeint
# for nonlinear equations
from scipy.optimize import fsolve
# to display plots in-line
%matplotlib inline
plt.style.use('ggplot')
```

### 2.1 参数定义
为了表示神经元的非线性特性，我们使用了一个 sigmoid 函数，基于两个参数 $a$ 和 $\theta$。

$$S(x)=\frac{1}{1+e^{−a(x−θ)}}$$

```
def sigmoid(x, a, thr):
    return 1 / (1 + np.exp(-a * (x - thr)))
```

确定一个固定极限周期和一个固定点。

```
# couplings
c1 = 16
c2 = 12
c3 = 15
c4 = 3

# refractory periods
rE = 1
rI = 1

# external inputs
P = 1.
Q = 1

# nonlinear functions
def Se(x):
    aE = 1.3
    thrE = 4
    return sigmoid(x, thrE, aE) - sigmoid(0, thrE, aE)

def Si(x):
    aI = 2
    thrI = 3.7
    return sigmoid(x, thrI, aI) - sigmoid(0, thrI, aI)
```


### 2.2 更多准备工作
```
# this function returns the right hand side of the Wilson-Cowan equation
# (both, in a 2-vector)
def WilsonCowan(y, t):
    E = y[0]
    I = y[1]
    y1 = -E + (1 - rE * E) * Se(c1 * E - c2 * I + P)
    y2 = -I + (1 - rI * I) * Si(c3 * E - c4 * I + Q)
    return [y1, y2]
```
```
# minimum and maximum E and I values we want displayed in the graph
minval = -.1
maxval = .6
resolution = 50
# State variables
x1 = np.linspace(minval, maxval, resolution)
x2 = np.linspace(minval, maxval, resolution)
# Create a grid for evaluation of the vector field
x1, x2 = np.meshgrid(x1, x2)
# Evaluate the slopes
X1, X2 = WilsonCowan([x1, x2], 0)
# Compute the magnitude vector
M = np.hypot(X1, X2)
# Normalize the slopes vectors (for the field plot)
#X1, X2 = X1/M, X2/M
```

### 2.3 方程求解和绘图 数值方法搜索驻点

This is a tricky part. To view the stationary points, which are an important property of a dynamical system, we need to study the points where the derivatives of E and I are zero, i.e., where the function called WilsonCowan is zero. Since it’s highly nonlinear, we have to do that numerically.
这是一个棘手的部分。找到驻点，这是一个动态系统的一个重要性质。我们需要研究的是当函数中 $E$ 和 $I$  偏导数是零的点。即其中被称为 WilsonCowan 函数值是 0。由于函数是非线性的，我们要做的就是使用数值方法求解。

Numerical root finding basically works by taking an initial guess, then following the shape of the function until we reach a zero. If we want all of the zeros, we need to try many initial guesses, and we are not guaranteed to succeed.
数值求根基本上通过初始猜测，根据函数的形状求解，直到我们达到零状态。如果我们希望求得所有的零，我们需要尝试很多估计初始值，而且我们还不能保证成功。

In practice, it seems fast enough to use all the points of the grid I’ll use for plotting, and compute a zero for each of them. But this may not always work.
在实践中，这似乎足够求解我们要进行绘图的网格里所有点，并计算每个点的零状态。但是，这可能不能总是成功。

```
fixed_p = []
y1 = x1.ravel()
y2 = x2.ravel()
for i in range(resolution**2):
    # find a zero
    sol, infodict, ier, mesg = fsolve(WilsonCowan,
                                      [y1[i], y2[i]],
                                      args=(0),
                                      full_output=1)
    if ier == 1: # I exclude the cases where fsolve didn't converge
        fixed_p.append(sol)

fixed_p = np.array(fixed_p).T
```

### 2.4 ODE 数值库求积分

Here is where we actually integrate the dynamical system in time. Try changing the values of E0 and I0 to obtain different paths in the phase space.
这段代码有关我们及时求得动态系统的积分。**我们试着改变的$ E_0 $和$ I_0 $的值**来获得相空间不同的路径。

```
# simulation duration and step size
time = np.linspace(0, 100, 2000)

# starting point, hopefully inside the basin of attraction of our attractor
E0, I0 = 0.39, 0.49 # try changing this

# find the solution with scint.odeint
odesol = odeint(WilsonCowan, [E0, I0], time)
# separate the two solutions
exc_timeseries, inh_timeseries = odesol.T
```

### 2.5 绘图
```
# plotting the vector field in the state space (E, I)
plt.figure(figsize=(10, 10))
plt.quiver(x2, x1, X2, X1, pivot='mid', alpha=.5)
plt.xlim([minval, maxval])
plt.ylim([minval, maxval])
plt.xlabel(r'$I$', fontsize=16) # yes, you can use Latex code!
plt.ylabel(r'$E$', fontsize=16)
plt.grid()

# plot the solution in the state space
plt.plot(inh_timeseries, exc_timeseries, '.-');

# plot the fixed points we identified
plt.scatter(fixed_p[1], fixed_p[0], marker='o', c='k', s=50,
            label="Stationary points")

# plot the starting point
plt.scatter(I0, E0, marker='*', c='r', s=300, label="Starting point")
plt.legend(loc="upper left")

# plot the solution in time
plt.figure(figsize=(10.3,3))
plt.ylabel(r'$E, I$')
plt.xlabel(r'$t$')
plt.plot(time, exc_timeseries, '.-', label="excitatory");
plt.plot(time, inh_timeseries, '.-', label="inhibitory");
plt.legend();
```

![0](http://ww4.sinaimg.cn/large/966cf7d3gw1f558penxkcj20hk0h3430.jpg)

![1](http://ww1.sinaimg.cn/large/966cf7d3gw1f558nxnu0kj20hs066gmx.jpg)


我们可以看到整个系统存在：

- 一个稳定的驻点在 (0.5, 0.5)
- 一个不稳定的驻点在 (0.5, 0.4)
- 一个受限的环在驻点 (0.1, 0.05) 周围

驻点的不同性质，以及随之而来对它们其附近函数值的影响（接近驻点函数值呈现线性化）是因为系统的特征值导致。请参阅相关教材！


# 参考文献
[1] Dynamical systems with Python: Wilson and Cowan's model：http://martinosorb.github.io/blog/2016/05/26/wilsoncowan.html#numerical

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info