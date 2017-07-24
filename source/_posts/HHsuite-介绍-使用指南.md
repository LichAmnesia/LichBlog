---
title: HHsuite 介绍 使用指南
date: 2016-03-21 16:34:24
tags:
    - Bioinformatics
---

这是我在使用HHsuite工具包时的一些记录。
<!-- more -->

# 1. 介绍
HH-suite是一个用来高精度序列搜索和对齐匹配的开源工具包。主要包括HHsearch和HHblits。他们都是基于HMMs的成对比较。


# 2. 配置
### 2.1 资源地址和要求
目前HH-suite放在github上了，之前还是在ftp上面下载直接使用的。
GitHub：https://github.com/soedinglab/HHsuite
Databases可以在这里下载：http://wwwuser.gwdg.de/~compbiol/data/hhsuite/databases/hhsuite_dbs/

内存占用的需求计算(num threads表示使用的线程数目用-cpu <int>)：
$$
Memory req. = query length × max db seq length × num threads × (4 (SSE) or 8 (AVX2))B + \\\\
query length × max db seq length × num threads × 8B +1GB
$$
### 2.2 使用源代码安装

```
wget https://github.com/soedinglab/hh-suite/releases/download/v3.0-beta.1/hhsuite-3.0-beta.1-Source.tar.gz
tar -xzvf hhsuite-3.0-beta.1-Source.tar.gz
```
进入相应目录，编译安装：
```
cd hhsuite-<VERSION>/
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo -G "Unix Makefiles" \\
-DCMAKE_INSTALL_PREFIX=${INSTALL_BASE_DIR} ..
make
make install
```
\${INSTALL_BASE_DIR} 为 usr/local/hhsuite
设置 \${INSTALL_BASE_DIR} 作为你要安装HHsuit的地方，比如你可以设置为/usr/local/hhsuite:
```
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX=/usr/local/hhsuite ..
```
make报错。。

```
[ 82%] Linking C executable ffindex_apply_mpi
/opt/intel/impi/5.0.0.028/intel64/lib/libmpicxx.so：对‘operator delete[](void*)’未定义的引用
/opt/intel/impi/5.0.0.028/intel64/lib/libmpicxx.so：对‘operator new(unsigned long)’未定义的引用
/opt/intel/impi/5.0.0.028/intel64/lib/libmpicxx.so：对‘operator delete(void*)’未定义的引用
/opt/intel/impi/5.0.0.028/intel64/lib/libmpicxx.so：对‘operator new[](unsigned long)’未定义的引用
/opt/intel/impi/5.0.0.028/intel64/lib/libmpicxx.so：对‘__cxa_pure_virtual’未定义的引用
/opt/intel/impi/5.0.0.028/intel64/lib/libmpicxx.so：对‘__cxa_allocate_exception’未定义的引用
/opt/intel/impi/5.0.0.028/intel64/lib/libmpicxx.so：对‘__gxx_personality_v0’未定义的引用
/opt/intel/impi/5.0.0.028/intel64/lib/libmpicxx.so：对‘__cxa_throw’未定义的引用
/opt/intel/impi/5.0.0.028/intel64/lib/libmpicxx.so：对‘vtable for __cxxabiv1::__class_type_info’未定义的引用
/opt/intel/impi/5.0.0.028/intel64/lib/libmpicxx.so：对‘vtable for __cxxabiv1::__si_class_type_info’未定义的引用
collect2: 错误：ld 返回 1
make[2]: *** [lib/ffindex/src/ffindex_apply_mpi] 错误 1
make[1]: *** [lib/ffindex/src/CMakeFiles/ffindex_apply_mpi.dir/all] 错误 2
make: *** [all] 错误 2

```

---
**解决方案：Update in 2016/03/23**
如果出现这样的报错请参考[Github](https://github.com/soedinglab/hh-suite/issues/6)上我提的一个Bug，作者给出了一个解决方案，使用git上的库，然后把ffindex更新到最新版本，先把ffindex在它的目录cmake和make掉，然后在按照上面的方法进行。就可以了。

---

### 2.3 如果没装Cmake请看
下载源码
```
wget https://cmake.org/files/v3.5/cmake-3.5.0.tar.gz
tar -xzvf cmake-3.5.0.tar.gz
```


解压进入目录
```
./bootstrap
make      
sudo make install
```
这样貌似装出来的要使用你cmake的目录直接打开才行。
### 2.4 HHsuite Database 设置
Databases可以在这里下载：http://wwwuser.gwdg.de/~compbiol/data/hhsuite/databases/hhsuite_dbs/。
选择适合你的数据库文件进行下载。我使用了 uniprot20。

+ **uniprot20** based on UniProt db from EBI/SIB/PIR, clustered to 20 % seq. identity
+ pdb70 representatives from PDB (70% max. sequence identity), updated weekly
+ scop70 representatives from SCOP (70% max. sequence identity)
+ pfamA Pfam A database from Sanger Inst., http://www.sanger.ac.uk/Software/Pfam/

解压下来的数据库文件应该包含如下的文件。
```
<dbname>_cs219.ffdata packed file with column-state sequences for prefiltering
<dbname>_cs219.ffindex index file for packed column-state sequence file
<dbname>_a3m.ffdata packed file with MSAs in A3M format
<dbname>_a3m.ffindex index file for packed A3M file
<dbname>_hhm.ffdata packed file with HHM-formatted HMMs
<dbname>_hhm.ffindex index file for packed HHM file
```

    The packed files <dbname>_cs219.ffdata, <dbname>_hhm.ffdata and <dbname>_a3m.ffdata contain simply the concatenated A3M MSAs and HHMs, respectively, with a \0 character at the beginning of each file. They are therefore human-readable and are parsable for specific MSAs or models using tools such as grep or search functions in text editors (which however should be able to ignore the \0 character). The .ffindex files contain indices to provide fast access to these packed files.
    
下载命令：
```
cd ~/lich/ % change to HHsuite directory
mkdir databases
cd databases
wget http://wwwuser.gwdg.de/~compbiol/data/hhsuite/databases/hhsuite_dbs/uniprot20_2015_06.tgz
tar -xzvf uniprot20_2016_02.tgz
```
其中 pdb70, pfamA, and pdb70数据库无法通过递归搜索建立MSAs

### 2.5 无法源码安装请看，直接使用编译好的程序
下载编译好的程序
```
wget https://github.com/soedinglab/hh-suite/releases/download/v3.0-beta.1/hhsuite-3.0-beta.1-Linux.tar.gz
tar -zxvf hhsuite-3.0-beta.1-Linux.tar.gz 
```

### 2.6 环境变量设置
**设置，每次开机运行都需要**
否则无法运行
把HHsuite和脚本放入搜索PATH里面
```
export HHLIB=${INSTALL_BASE_DIR}
export PATH=$PATH:$HHLIB/bin:$HHLIB/scripts
```
我的是
```
export HHLIB=/usr/local/hhsuite
export PATH=$PATH:$HHLIB/bin:$HHLIB/scripts
```
如果是直接下载的编译好的文件安装的话
```
export HHLIB=/home/fishteam/lich/hhsuite-3.0.1-Linux
export PATH=$PATH:$HHLIB/bin:$HHLIB/scripts
```

也可以修改.bashrc文件，这样就不用每次都设置了。最后一行是默认数据库文件地址
```
export HHLIB=/usr/local/
PATH=$PATH:$HHLIB/bin>:$HHLIB/scripts
alias hhblits=’hhblits -d <path_to/uniprot20>’
```

---
**数据库建立：Update in 2016.03.22**
# 3. 建立自己的数据库
确认好你uniprot20的数据库的path，以及你上传好你自己的fas文件，文件格式是fasta格式的序列全都在一起。
首先是把这个文件分割开来
```
ffindex_from_fasta -s <db>_fas.ff{data,index} <db.fas>
```

```
ffindex_from_fasta -s bdd_fas.ff{data,index} bdd.fas
```
根据刚刚生成的<db>_fas.ff{data,index}文件生成MSA。
```
hhblits_omp -d <path_to/uniprot20> -i <db>_fas -o <db>_a3m_wo_ss -n 2 -cpu <number_threads>
```
<path_to/uniprot20>我是 /home/fishteam/lich/uniprot20_2016_02

```
hhblits_omp -d /home/fishteam/lich/uniprot20_2016_02/uniprot20_2016_02 -i bdd_fas -o bdd_a3m_wo_ss -n 3 -cpu 18

```
加入psipred预测的二级结构，dssp二级结构给MSA
```
mpirun -np <number_threads> ffindex_apply_mpi <db>_a3m_wo_ss.ff{data,index} \\
-i <db>_a3m.ffindex -d <db>_a3m.ffindex -- addss.pl stdin stdout
```
```
mpirun -np 20 ffindex_apply_mpi bdd_a3m_wo_ss.ff{data,index} -i bdd_a3m.ffindex -d bdd_a3m.ffindex -- addss.pl stdin stdout 
```

```
mpirun -np 16 ffindex_apply_mpi bdd_a3m_wo_ss.ff{data,index} -i bdd_hhm.ffindex -d bdd_hhm.ffindex -- hhmake -i stdin -o stdout -v 0
···


----
　

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
