---
title: Gensim使用指南
date: 2017-03-20 18:47:43
tags:
  - 机器学习
  - DeepLearning
  - Python
---

# 1. 介绍
`Gensim`是一个`python`的包可以自动提取文档语义主题。主要用来对于原始未标记文档进行处理。包括**Latent Semantic Analysis, Latent Dirichlet Allocation, Random Projections**。这些算法都是`unsupervised`意味着不需要人工输入。

一旦概率模式被发现，原始文档可以有效地进行语义表示，并且可以进行主题查询。

本文主要参考`Gensim`官网教程。

<!-- more -->

### 1.1 特征
- Memory Independence
- 有很多以实现算法

### 1.2 核心概念
- Copus 文档集合
- Vector 在`Vector Space Model`中每个文档表示成一个特征数组
- Sparse Vector 使用`Sparse Vector`表示文档
- Model 相当于文档->特征的映射函数

# 2. 安装
```python
pip install --upgrade gensim
```

# 3. 语料以及向量空间
### 3.1 String -> Vectors
```python
In [1]: from gensim import corpora, models, similarities

In [2]: documents = ["Human machine interface for lab abc computer applications",
   ...:               "A survey of user opinion of computer system response time",
   ...:               "The EPS user interface management system",
   ...:               "System and human system engineering testing of EPS",
   ...:               "Relation of user perceived response time to error measurement",
   ...:               "The generation of random binary unordered trees",
   ...:               "The intersection graph of paths in trees",
   ...:               "Graph minors IV Widths of trees and well quasi ordering",
   ...:               "Graph minors A survey"]
```
这是一个九句话的语料库。
首先进行`tokenize`这个文档集，去掉共同词作为`stopwords`以及只在一个文档里出现过一次的词。
```python
In [3]: stoplist = set('for a of the and to in'.split())
In [6]: texts = [[word for word in document.lower().split() if word not in stoplist] for document in documents]

In [7]: texts
Out[7]:
[['human', 'machine', 'interface', 'lab', 'abc', 'computer', 'applications'],
 ['survey', 'user', 'opinion', 'computer', 'system', 'response', 'time'],
 ['eps', 'user', 'interface', 'management', 'system'],
 ['system', 'human', 'system', 'engineering', 'testing', 'eps'],
 ['relation', 'user', 'perceived', 'response', 'time', 'error', 'measurement'],
 ['generation', 'random', 'binary', 'unordered', 'trees'],
 ['intersection', 'graph', 'paths', 'trees'],
 ['graph', 'minors', 'iv', 'widths', 'trees', 'well', 'quasi', 'ordering'],
 ['graph', 'minors', 'survey']]

```

```python
# remove words that appear only once
from collections import defaultdict
frequency = defaultdict(int)
for text in texts:
    for token in text:
        frequency[token] += 1
texts = [[token for token in text if frequency[token] > 1]
         for text in texts]
from pprint import pprint  # pretty-printer
pprint(texts)
```
把这个`word`以及`id`变成`dictionary`。
```python
dictionary = corpora.Dictionary(texts)
dictionary.save('/tmp/deerwester.dict')  # store the dictionary, for future reference
print(dictionary)
```
```python
In [16]: print(dictionary.token2id)
{'user': 3, 'trees': 9, 'eps': 8, 'minors': 11, 'interface': 2, 'survey': 5, 'system': 4, 'computer': 1, 'response': 7, 'human': 0, 'time': 6, 'graph': 10}
```
然后把`tokenized`的文档变成向量。
```python
In [17]: new_doc = "Human computer interaction"
In [18]: new_vec = dictionary.doc2bow(new_doc.lower().split())
In [19]: print(new_vec)
[(0, 1), (1, 1)]
```
函数`doc2bow()`只是简单地计算一下每个不同的单词的出现次数。然后返回结果作为一个`sparse vector`。
```python
In [23]: corpus = [dictionary.doc2bow(text) for text in texts]
In [24]: pprint(corpus)
[[(0, 1), (1, 1), (2, 1)],
 [(1, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1)],
 [(2, 1), (3, 1), (4, 1), (8, 1)],
 [(0, 1), (4, 2), (8, 1)],
 [(3, 1), (6, 1), (7, 1)],
 [(9, 1)],
 [(9, 1), (10, 1)],
 [(9, 1), (10, 1), (11, 1)],
 [(5, 1), (10, 1), (11, 1)]]
```
导出`corpora`
```
In [32]: corpora.MmCorpus.serialize('d.mm',corpus)
```
# 4. 主题以及tranformations
### 4.1 导入已经有的`corpus`
```python
In [33]: if (os.path.exists("d.dict")):
    ...:     dictionary = corpora.Dictionary.load("d.dict")
    ...:     corpus = corpora.MmCorpus('d.mm')
```
下面把文档从一个向量表示转化为另一个。

### 4.2 Tfidf 表示
```python
In [34]: tfidf = models.TfidfModel(corpus) # step 1 -- initialize a model
In [37]: doc_bow = [(0, 1), (1, 1)]
In [38]: print(tfidf[doc_bow])
[(0, 0.7071067811865476), (1, 0.7071067811865476)]
In [39]: corpus_tfidf = tfidf[corpus]

In [40]: pprint(corpus_tfidf)
<gensim.interfaces.TransformedCorpus object at 0x0129FFD0>

In [41]: for doc in corpus_tfidf:
    ...:     pprint(doc)
    ...:
```
### 4.3 LSI 表示
使用 [Latent semantic analysis](https://en.wikipedia.org/wiki/Latent_semantic_analysis#Latent_semantic_indexing) 来把`Tf-idf`的`corpus`表示到一个`2-D space`(假设我们把`num_tops=2`)。

```python
In [42]: lsi = models.LsiModel(corpus_tfidf, id2word=dictionary, num_topics=2) # initialize an LSI transformation
In [43]: corpus_lsi = lsi[corpus_tfidf] #  create a double wrapper over the original corpus: bow->tfidf->fold-in-lsi
In [47]: lsi.print_topics(2)
Out[47]: [(0, '-0.703*"trees" + -0.538*"graph" + -0.402*"minors" + -0.187*"survey" + -0.061*"system" + -0.060*"time" + -0.060*"response" + -0.058*"user" + -0.049*"computer" + -0.035*"interface"'), (1, '-0.460*"system" + -0.373*"user" + -0.332*"eps" + -0.328*"interface" + -0.320*"time" + -0.320*"response" + -0.293*"computer" + -0.280*"human" + -0.171*"survey" + 0.161*"trees"')]
In [48]: for doc in corpus_lsi:
    ...:     print(doc)
    ...:
[(0, -0.066007833960906648), (1, -0.5200703306361848)]
[(0, -0.19667592859142974), (1, -0.76095631677000308)]
[(0, -0.089926399724468281), (1, -0.72418606267525087)]
[(0, -0.075858476521785109), (1, -0.632055158600343)]
[(0, -0.10150299184980502), (1, -0.57373084830029464)]
[(0, -0.70321089393783032), (1, 0.16115180214026176)]
[(0, -0.87747876731198216), (1, 0.16758906864659895)]
[(0, -0.90986246868185694), (1, 0.14086553628719531)]
[(0, -0.61658253505692839), (1, -0.053929075663890019)]
```
保存模型
```python
lsi.save('/tmp/model.lsi') # same for tfidf, lda, ...
lsi = models.LsiModel.load('/tmp/model.lsi')
```
### 4.4 可以使用的模型
Random Projections
```python
model = models.RpModel(tfidf_corpus, num_topics=500)
```
Latent Dirichlet Allocation, LDA
```python
model = models.LdaModel(corpus, id2word=dictionary, num_topics=100)
```
[Hierarchical Dirichlet Process, HDP](http://jmlr.csail.mit.edu/proceedings/papers/v15/wang11a/wang11a.pdf)。这是一个`non-parameteric bayesian method`
```python
model = models.HdpModel(corpus, id2word=dictionary)
```
# 5. 相似度查询
### 5.1 初始化查询结构
在这里使用上一节的`lsi model`形成的`corpus`。
```python
In [49]: from gensim import similarities
In [50]: index = similarities.MatrixSimilarity(lsi[corpus]) # transform corpus to LSI space and index it
```
### 5.2 对一个新的文档进行查询。
```python
In [51]: doc = "Human computer interaction"

In [52]: vec_bow = dictionary.doc2bow(doc.lower().split())

In [53]: vec_lsi = lsi[vec_bow]

In [54]: print(vec_lsi)
[(0, -0.07910475117445212), (1, -0.57328352430793994)]

In [55]: sims = index[vec_lsi] # perfoem a query against the corpus

In [56]: print(list(enumerate(sims)))
[(0, 0.99994081), (1, 0.99467081), (2, 0.99994278), (3, 0.999879), (4, 0.99935204), (5, -0.08804217), (6, -0.0515742), (7, -0.023664713), (8, 0.1938726)]

In [57]: sims
Out[57]:
array([ 0.99994081,  0.99467081,  0.99994278,  0.999879  ,  0.99935204,
       -0.08804217, -0.0515742 , -0.02366471,  0.1938726 ], dtype=float32)
```
把这个文档查询结果进行排序。
```python
>>> sims = sorted(enumerate(sims), key=lambda item: -item[1])
>>> print(sims) # print sorted (document number, similarity score) 2-tuples
[(2, 0.99844527), # The EPS user interface management system
(0, 0.99809301), # Human machine interface for lab abc computer applications
(3, 0.9865886), # System and human system engineering testing of EPS
(1, 0.93748635), # A survey of user opinion of computer system response time
(4, 0.90755945), # Relation of user perceived response time to error measurement
(8, 0.050041795), # Graph minors A survey
(7, -0.098794639), # Graph minors IV Widths of trees and well quasi ordering
(6, -0.1063926), # The intersection graph of paths in trees
(5, -0.12416792)] # The generation of random binary unordered trees
```
### 5.3 存储Model
```python
index.save('/tmp/deerwester.index')
index = similarities.MatrixSimilarity.load('/tmp/deerwester.index')
```

# 6. Word2Vec
```python
In [60]: texts
Out[60]: [['human', 'interface', 'computer'], ['survey', 'user', 'computer', 'system', 'response', 'time'], ['eps', 'user', 'interface', 'system'], ['system', 'human', 'system', 'eps'], ['user', 'response', 'time'], ['trees'], ['graph', 'trees'], ['graph', 'minors', 'trees'], ['graph', 'minors', 'survey']]
In [61]: from gensim.models import Word2Vec


In [63]: model = Word2Vec(texts, size=100, window=5, min_count=1, workers=4)

In [64]: model.similarity('human','computer')
Out[64]: -0.065643270056819497

In [65]: model.similarity('system','computer')
Out[65]: 0.062655618155398524

In [66]: model.similarity('system','interface')
Out[66]: -0.061593435357977032
In [67]: model['computer']
```
高级模型训练
```python
model = gensim.models.Word2Vec(iter=1)  # an empty model, no training yet
model.build_vocab(some_sentences)  # can be a non-repeatable, 1-pass generator
model.train(other_sentences)  # can be a non-repeatable, 1-pass generator
```

同样`Doc2Vec`的使用是类似的。但是需要新建一个类来进行才行。

# 参考
[1] Gensim 官网教程：https://radimrehurek.com/gensim/index.html
[2] 分析Wikipedia主题分布实例：https://radimrehurek.com/gensim/wiki.html
[3] Word2Vec：https://rare-technologies.com/word2vec-tutorial/
[4] Doc2Vec教程：https://github.com/RaRe-Technologies/gensim/blob/develop/docs/notebooks/doc2vec-IMDB.ipynb
[5] Doc2Vec Wiki教程：https://github.com/RaRe-Technologies/gensim/blob/develop/docs/notebooks/doc2vec-wikipedia.ipynb

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
