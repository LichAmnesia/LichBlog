---
title: Matplot 模板
date: 2017-08-17 11:42:31
tags:
    - Python
    - DataScience
---

# 1. 介绍
Matplot 的一个简单例子，仅供自己参考使用。

<!-- more -->

# 2. ggplot 可视化
[Notebook Link](https://github.com/LichAmnesia/LichBlogPost/blob/master/notebook/matplot.ipynb)
```python
# An example of how your classifier might be called 
title_name, xlabel, ylabel = "Figure for Adaboost classifier(DecisionTree)", "Number of iterations", "Error of Adaboost"
marker = ['', '^-', '*-', 'd-', 'o-', 'x-', '+-', 's-']
qualitative_colormap = ['Accent', 'Dark2', 'Paired', 'Pastel1', 'Pastel2', 'Set1', 'Set2', 'Set3', 'Vega10', 'Vega20', 'Vega20b', 'Vega20c']
color_list = plt.cm.Dark2(np.linspace(0, 1, 12))

plt.style.use('ggplot')
# plt.subplot(111)
gs1 = gridspec.GridSpec(1, 1)
gs1.update(left=0.1, right=0.65)
ax1 = plt.subplot(gs1[:,:])
plt.xlim(0, 550)
plt_train = [[1,2],[2,3],[3,4],[4,5]]
plt_train = np.array(plt_train)
plt.plot(plt_train[:, 0], plt_train[:, 1], marker[0], label="test", linestyle='-', color=color_list[0])

# Place a legend to the right of this smaller subplot.
plt.legend(bbox_to_anchor=(1.05, 1), loc=2, borderaxespad=0.)
plt.title(title_name)
plt.xlabel(xlabel)
plt.ylabel(ylabel)
# plt.legend()
plt.grid(True)
plt.savefig(title_name.replace(' ', '_') + ".png")
plt.show()
```

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info