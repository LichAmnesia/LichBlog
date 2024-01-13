---
title: NLTK 使用介绍
date: 2016-09-26 08:31:06
tags:
    - NLP
    - Python
---

# 1. 介绍
NLTK 是使用 Python 教学以及实践计算语言学的极好工具。此外，计算语言学与人工 智能、语言/专门语言识别、翻译以及语法检查等领域关系密切。比较适合初学者。
```
pip install nltk
```

<!--more-->

# 3. Sentence Tokenize 和 Word Tokenize
```python
text = “this’s a sent tokenize test. this is sent two. is this sent three? sent 4 is cool! Now it’s your turn.”
from nltk.tokenize import sent_tokenize
sent_tokenize_list = sent_tokenize(text)
```

> [“this’s a sent tokenize test.”, ‘this is sent two.’, ‘is this sent three?’, ‘sent 4 is cool!’, “Now it’s your turn."]

```python
from nltk.tokenize import word_tokenize
word_tokenize(‘Hello World.’)
```
> [‘Hello’, ‘World’, ‘.’]

# 4. POS Tagger 使用
```python
import nltk
text = nltk.word_tokenize(“Dive into NLTK: Part-of-speech tagging and POS Tagger”)
text
nltk.pos_tag(text)
```
> [‘Dive’, ‘into’, ‘NLTK’, ‘:’, ‘Part-of-speech’, ‘tagging’, ‘and’, ‘POS’, ‘Tagger’]
> [(‘Dive’, ‘JJ’), (‘into’, ‘IN’), (‘NLTK’, ‘NNP’), (‘:’, ‘:’), (‘Part-of-speech’, ‘JJ’), (‘tagging’, ‘NN’), (‘and’, ‘CC’), (‘POS’, ‘NNP’), (‘Tagger’, ‘NNP’)]

# 5. Stemming and Lemmatization:
Stemming 是指把一类词map到一个词
lemmatization是把同一个词的不同形式map到一个词

# 6. Stanford POS Tagger 以及 Stanford Parser 在NLTK 使用
记得要下jar文件包。
```python
fom nltk.tag.stanford import POSTagger

english_postagger = POSTagger(‘models/english-bidirectional-distsim.tagger’, ‘stanford-postagger.jar’
```

# 参考
[1] Dive into NLTK： http://textminingonline.com/dive-into-nltk-part-i-getting-started-with-nltk
[2] How to use Stanford Named Entity Recognizer in Python ：http://textminingonline.com/how-to-use-stanford-named-entity-recognizer-ner-in-python-nltk-and-other-programming-languages
----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
