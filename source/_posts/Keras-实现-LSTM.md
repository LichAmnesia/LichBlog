---
title: Keras 实现 LSTM
date: 2016-09-26 08:25:25
tags:
    - DeepLearning
    - mathematic
    - 机器学习
---


# 1. 介绍
LSTM(Long Short Term Memory)是一种特殊的循环神经网络，在许多任务中，LSTM表现得比标准的RNN要出色得多。

关于LSTM的介绍可以看参考文献1和2。本文重点在使用`LSTM`实现一个分类器。

<!--more-->

# 2. 如何在 keras 中使用lstm 
本文主要测试`keras`使用`Word Embeddings`并进行分类的测试。
代码是在`keras`官方文档的示例中修改而来。
[Ipython代码链接](https://github.com/LichAmnesia/NLP_Learning/blob/master/lstm/Word%20embedding.ipynb)

### 2.1 Word Embeddings 数据集
使用了stanford的GloVe作为词向量集，这个直接下载训练好的词向量文件。直接字典搜索，得到文本词向量。
[Glove数据集下载](http://nlp.stanford.edu/data/glove.6B.zip)
文本测试数据是[20_newsgroup](http://www.cs.cmu.edu/afs/cs.cmu.edu/project/theo-20/www/data/news20.html
>This data set is a collection of 20,000 messages, collected from 20 different netnews newsgroups. One thousand messages from each of the twenty newsgroups were chosen at random and partitioned by newsgroup name. The list of newsgroups from which the messages were chose is as follows:
alt.atheism
talk.politics.guns
talk.politics.mideast
talk.politics.misc
talk.religion.misc
soc.religion.christian

>comp.sys.ibm.pc.hardware
comp.graphics
comp.os.ms-windows.misc
comp.sys.mac.hardware
comp.windows.x

>rec.autos
rec.motorcycles
rec.sport.baseball
rec.sport.hockey

>sci.crypt
sci.electronics
sci.space
sci.med

>misc.forsale


我们通过label标注把message分成不同的20个类别。每个`newsgroup`被map到一个数值label上。

### 2.2 数据预处理
这部分是设定训练相关参数，并且读入训练好的GloVe词向量文件。把文本读入进list里，一个文本存成一个str，变成一个[str]
```python
BASE_DIR = '/home/lich/Workspace/Learning'
GLOVE_DIR = BASE_DIR + '/glove.6B/'
TEXT_DATA_DIR = BASE_DIR + '/20_newsgroup/'
MAX_SEQUENCE_LENGTH = 1000
MAX_NB_WORDS = 20000
EMBEDDING_DIM = 100
VALIDATION_SPLIT = 0.2
batch_size = 32

# first, build index mapping words in the embeddings set
# to their embedding vector

print('Indexing word vectors.')

embeddings_index = {}
f = open(os.path.join(GLOVE_DIR, 'glove.6B.100d.txt'))
for line in f:
    values = line.split()
    word = values[0]
    coefs = np.asarray(values[1:], dtype='float32')
    embeddings_index[word] = coefs
f.close()

print('Found %s word vectors.' % len(embeddings_index))

# second, prepare text samples and their labels
print('Processing text dataset')

texts = []  # list of text samples
labels_index = {}  # dictionary mapping label name to numeric id
labels = []  # list of label ids
for name in sorted(os.listdir(TEXT_DATA_DIR)):
    path = os.path.join(TEXT_DATA_DIR, name)
    if os.path.isdir(path):
        label_id = len(labels_index)
        labels_index[name] = label_id
        for fname in sorted(os.listdir(path)):
            if fname.isdigit():
                fpath = os.path.join(path, fname)
                if sys.version_info < (3,):
                    f = open(fpath)
                else:
                    f = open(fpath, encoding='latin-1')
                texts.append(f.read())
                f.close()
                labels.append(label_id)

print('Found %s texts.' % len(texts))
```

### 2.3 Tokenize
Tokenizer 所有文本，并且把texts里面的str值先tokenizer然后映射到相应index。下面是举出的一个例子(只是形式一样)：

>"he is a professor"

变成：

>[143, 12, 1, 23]

```python
# finally, vectorize the text samples into a 2D integer tensor
tokenizer = Tokenizer(nb_words=MAX_NB_WORDS)
tokenizer.fit_on_texts(texts)
sequences = tokenizer.texts_to_sequences(texts)

word_index = tokenizer.word_index
print('Found %s unique tokens.' % len(word_index))
```

### 2.4 生成Train和Validate数据集
使用random.shuffle进行随机分割数据集，并声称相关训练验证集。
```python
data = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)

labels = to_categorical(np.asarray(labels))
print('Shape of data tensor:', data.shape)
print('Shape of label tensor:', labels.shape)

# split the data into a training set and a validation set
indices = np.arange(data.shape[0])
np.random.shuffle(indices)
data = data[indices]
labels = labels[indices]
nb_validation_samples = int(VALIDATION_SPLIT * data.shape[0])

x_train = data[:-nb_validation_samples]
y_train = labels[:-nb_validation_samples]
x_val = data[-nb_validation_samples:]
y_val = labels[-nb_validation_samples:]

print('Preparing embedding matrix.')
```

### 2.5 生成Embedding Matrix
把有效出现次数在前面的通过GloVe生成的字典，以及本身所有的Token串进行比对，得到出现在训练集中每个词的词向量。

```python
# prepare embedding matrix
nb_words = min(MAX_NB_WORDS, len(word_index))
embedding_matrix = np.zeros((nb_words + 1, EMBEDDING_DIM))
for word, i in word_index.items():
    if i > MAX_NB_WORDS:
        continue
    embedding_vector = embeddings_index.get(word)
    if embedding_vector is not None:
        # words not found in embedding index will be all-zeros.
        embedding_matrix[i] = embedding_vector

print(embedding_matrix.shape)
```
### 2.6 LSTM训练
注意训练集data的shape是(N_SAMPLES, MAX_SEQUENCE_LENGT)，100是词向量长度，然后根据Embedding层会变成3D的Matrix
```python
embedding_layer = Embedding(nb_words + 1,
                            EMBEDDING_DIM,
                            weights=[embedding_matrix],
                            input_length=MAX_SEQUENCE_LENGTH,
                            trainable=False,
                            dropout=0.2)
batch_size = 32

print('Build model...')
# sequence_input = Input(shape=(MAX_SEQUENCE_LENGTH,), dtype='int32')
# embedded_sequences = embedding_layer()
model = Sequential()
model.add(embedding_layer)
model.add(LSTM(100, dropout_W=0.2, dropout_U=0.2))  # try using a GRU instead, for fun
model.add(Dense(1))
model.add(Activation('sigmoid'))
model.add(Dense(len(labels_index), activation='softmax'))

# try using different optimizers and different optimizer configs
model.compile(loss='binary_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

print('Train...')
model.fit(x_train, y_train, batch_size=batch_size, nb_epoch=5,
          validation_data=(x_val, y_val))
score, acc = model.evaluate(x_val, y_val,
                            batch_size=batch_size)
print('Test score:', score)
print('Test accuracy:', acc)
```

# 参考
[1] Understanding LSTM：http://colah.github.io/posts/2015-08-Understanding-LSTMs/
[2] 理解 LSTM 网络：https://www.yunaitong.cn/understanding-lstm-networks.html
[2] GloVe: Global Vectors for Word Representation：http://nlp.stanford.edu/projects/glove

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info