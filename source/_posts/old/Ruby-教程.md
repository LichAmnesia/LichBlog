---
title: Ruby 教程
date: 2016-09-20 22:16:45
tags:
    - Ruby
---


# 1. 介绍
Ruby是一种纯粹的面向对象编程语言。Ruby 的特性与 Smalltalk、Perl 和 Python 类似。Perl、Python 和 Smalltalk 是脚本语言。Smalltalk 是一个真正的面向对象语言。Ruby，与 Smalltalk 一样，是一个完美的面向对象语言。使用 Ruby 的语法比使用 Smalltalk 的语法要容易得多。

Ruby 是开源的，在 Web 上免费提供，但需要一个许可证。
Ruby 是一种通用的、解释的编程语言。
Ruby 是一种真正的面向对象编程语言。
Ruby 是一种类似于 Python 和 Perl 的服务器端脚本语言。
Ruby 可以用来编写通用网关接口（CGI）脚本。
Ruby 可以被嵌入到超文本标记语言（HTML）。
Ruby 语法简单，这使得新的开发人员能够快速轻松地学习 Ruby。
Ruby 与 C++ 和 Perl 等许多编程语言有着类似的语法。
Ruby 可扩展性强，用 Ruby 编写的大程序易于维护。
Ruby 可用于开发的 Internet 和 Intranet 应用程序。
Ruby 可以安装在 Windows 和 POSIX 环境中。
Ruby 支持许多 GUI 工具，比如 Tcl/Tk、GTK 和 OpenGL。
Ruby 可以很容易地连接到 DB2、MySQL、Oracle 和 Sybase。
Ruby 有丰富的内置函数，可以直接在 Ruby 脚本中使用。

<!--more-->

# 2. 数组
（1）数组通过[]索引访问
（2）通过赋值操作插入、删除、替换元素
（3）通过+，－号进行合并和删除元素，且集合做为新集合出现
（4）通过<<号向原数据追加元素
（5）通过*号重复数组元素
（6）通过｜和&符号做并集和交集操作（注意顺序）


# 3. 哈希
Ruby 哈希是在大括号内放置一系列键/值对，键和值之间使用逗号和序列 => 分隔。尾部的逗号会被忽略。
```ruby
#!/usr/bin/ruby

hsh = colors = { "red" => 0xf00, "green" => 0x0f0, "blue" => 0x00f }
hsh.each do |key, value|
   print key, " is ", value, "\n"
end
```


# 4. 范围类型
一个范围表示一个区间。
范围是通过设置一个开始值和一个结束值来表示。范围可使用 s..e 和 s...e 来构造，或者通过 Range.new 来构造。
使用 .. 构造的范围从开始值运行到结束值（包含结束值）。使用 ... 构造的范围从开始值运行到结束值（不包含结束值）。当作为一个迭代器使用时，范围会返回序列中的每个值。
范围 (1..5) 意味着它包含值 1, 2, 3, 4, 5，范围 (1...5) 意味着它包含值 1, 2, 3, 4 。
```ruby
#!/usr/bin/ruby

(10..15).each do |n|
   print n, ' '
end
```

# 5. 类的定义
在 Ruby 中，类总是以关键字 class 开始，后跟类的名称。类名的首字母应该大写。
### 5.1 四种类型变量
局部变量：局部变量是在方法中定义的变量。局部变量在方法外是不可用的。在后续的章节中，您将看到有关方法的更多细节。局部变量以小写字母或 _ 开始。
实例变量：实例变量可以跨任何特定的实例或对象中的方法使用。这意味着，实例变量可以从对象到对象的改变。实例变量在变量名之前放置符号（@）。
类变量：类变量可以跨不同的对象使用。类变量属于类，且是类的一个属性。类变量在变量名之前放置符号（@@）。
全局变量：类变量不能跨类使用。如果您想要有一个可以跨类使用的变量，您需要定义全局变量。全局变量总是以美元符号（$）开始。


### 5.2 使用 new 方法创建变量
在这里，cust1 和 cust2 是两个对象的名称。对象名称后跟着等号（=），等号后跟着类名，然后是点运算符和关键字 new。
```ruby
cust1 = Customer. new
cust2 = Customer. new
```

### 5.3 使用申明方法创建变量
```ruby
class Customer
   @@no_of_customers=0
   def initialize(id, name, addr)
      @cust_id=id
      @cust_name=name
      @cust_addr=addr
   end
end
```
```
cust1=Customer.new("1", "John", "Wisdom Apartments, Ludhiya")
```


# 6. 变量
### 6.1 全局变量
全局变量以 $ 开头。未初始化的全局变量的值为 nil，在使用 -w 选项后，会产生警告。
给全局变量赋值会改变全局状态，所以不建议使用全局变量。

#### 6.2 类变量
类变量以 @@ 开头，且必须初始化后才能在方法定义中使用。
引用一个未初始化的类变量会产生错误。类变量在定义它的类或模块的子类或子模块中可共享使用。
在使用 -w 选项后，重载类变量会产生警告。


### 6.3 局部变量
局部变量以小写字母或下划线 _ 开头。局部变量的作用域从 class、module、def 或 do 到相对应的结尾或者从左大括号到右大括号 {}。
### 6.4 常量
常量以大写字母开头。定义在类或模块内的常量可以从类或模块的内部访问，定义在类或模块外的常量可以被全局访问。
常量不能定义在方法内。引用一个未初始化的常量会产生错误。对已经初始化的常量赋值会产生警告。


# 7. 运算符
### 7.1
|运算符 | 描述 | 实例 |
| :--------:   | :-----:  |  :-----:  | 
|.. | 	创建一个从开始点到结束点的范围（包含结束点）|	1..10 创建从 1 到 10 的范围
|...|	创建一个从开始点到结束点的范围（不包含结束点）|	1...10 创建从 1 到 9 的范围

### 7.2 defined? 运算符
defined? 是一个特殊的运算符，以方法调用的形式来判断传递的表达式是否已定义。它返回表达式的描述字符串，如果表达式未定义则返回 nil。
```ruby
defined? variable # 如果 variable 已经初始化，则为 True
foo = 42
defined? foo    # => "local-variable"
defined? $_     # => "global-variable"
defined? bar    # => nil（未定义）  
defined? method_call # 如果方法已经定义，则为 True
defined? puts        # => "method"
defined? puts(bar)   # => nil（在这里 bar 未定义）
defined? unpack      # => nil（在这里未定义）

# 如果存在可被 super 用户调用的方法，则为 True
defined? super
defined? super     # => "super"（如果可被调用）
defined? super     # => nil（如果不可被调用）

defined? yield   # 如果已传递代码块，则为 True
defined? yield    # => "yield"（如果已传递块）
defined? yield    # => nil（如果未传递块）

```


### 7.3 点运算符 "." 和双冒号运算符 "::"
您可以通过在方法名称前加上模块名称和一条下划线来调用模块方法。您可以使用模块名称和两个冒号来引用一个常量。
:: 是一元运算符，允许在类或模块内定义常量、实例方法和类方法，可以从类或模块外的任何地方进行访问。
请记住：在 Ruby 中，类和方法也可以被当作常量。
您只需要在表达式的常量名前加上 :: 前缀，即可返回适当的类或模块对象。
如果未使用前缀表达式，则默认使用主 Object 类。
```ruby
MR_COUNT = 0        # 定义在主 Object 类上的常量
module Foo
  MR_COUNT = 0
  ::MR_COUNT = 1    # 设置全局计数为 1
  MR_COUNT = 2      # 设置局部计数为 2
end
puts MR_COUNT       # 这是全局常量
puts Foo::MR_COUNT  # 这是 "Foo" 的局部常量
```

# 8. 条件语句
### 8.1 if 条件语句
```
if conditional [then]
      code...
[elsif conditional [then]
      code...]...
[else
      code...]
end
```
```ruby
code if condition
```
### 8.2 unless 语句
如果 conditional 为假，则执行 code。如果 conditional 为真，则执行 else 子句中指定的 code。+


```ruby
unless conditional [then]
   code
[else
   code ]
end
```

### 8.3 Case 语句
比较 case 所指定的 expression，当使用 === 运算符指定时，执行匹配的 when 子句的 code。
```
case expression
[when expression [, expression ...] [then]
   code ]...
[else
   code ]
end
```

# 9. yield 语句
```ruby
#!/usr/bin/ruby

def test
   puts "You are in the method"
   yield
   puts "You are again back to the method"
   yield
end
test {puts "You are in the block"}
这将产生以下结果：
You are in the method
You are in the block
You are again back to the method
You are in the block
```
在这里，yield 语句后跟着参数。您甚至可以传递多个参数。在块中，您可以在两个竖线之间放置一个变量来接受参数。因此，在上面的代码中，yield 5 语句向 test 块传递值 5 作为参数。

# 10. Module
### 10.1 Module
模块（Module）是一种把方法、类和常量组合在一起的方式。模块（Module）为您提供了两大好处。
- 模块提供了一个命名空间和避免名字冲突。
- 模块实现了 mixin 装置。 
模块（Module）定义了一个命名空间，相当于一个沙箱，在里边您的方法和常量不会与其他地方的方法常量冲突。
模块常量命名与类常量命名类似，以大写字母开头。方法定义看起来也相似：模块方法定义与类方法定义类似。+

通过类方法，您可以在类方法名称前面放置模块名称和一个点号来调用模块方法，您可以使用模块名称和两个冒号来引用一个常量。
```ruby
#!/usr/bin/ruby

# 定义在 trig.rb 文件中的模块

module Trig
   PI = 3.141592654
   def Trig.sin(x)
   # ..
   end
   def Trig.cos(x)
   # ..
   end
end
```
在这里，我们使用 `$LOAD_PATH << '.'` 让 Ruby 知道必须在当前目录中搜索被引用的文件。如果您不想使用 `$LOAD_PATH`，那么您可以使用 require_relative 来从一个相对目录引用文件。
注意：在这里，文件包含相同的函数名称。所以，这会在引用调用程序时导致代码模糊，但是模块避免了这种代码模糊，而且我们可以使用模块的名称调用适当的函数。
```ruby
$LOAD_PATH << '.'

require 'trig.rb'
require 'moral'

y = Trig.sin(Trig::PI/4)
wrongdoing = Moral.sin(Moral::VERY_BAD)
```
### 10.2 include 语句
```
include modulename
```
可以在类中引用模块
```ruby
#!/usr/bin/ruby
$LOAD_PATH << '.'
require "support"

class Decade
include Week
   no_of_yrs=10
   def no_of_months
      puts Week::FIRST_DAY
      number=10*12
      puts number
   end
end
d1=Decade.new
puts Week::FIRST_DAY
Week.weeks_in_month
Week.weeks_in_year
d1.no_of_months
```

### 10.3 Mixins
当一个类可以从多个父类继承类的特性时，该类显示为多重继承。
Ruby 不直接支持多重继承，但是 Ruby 的模块（Module）有另一个神奇的功能。它几乎消除了多重继承的需要，提供了一种名为 mixin 的装置。
Mixins 向您提供了一种完美的为类添加功能的控制方式。但是，它们真正的强大在于当 mixin 中的代码开始与使用它的类中的代码交互时。
```ruby
module A
   def a1
   end
   def a2
   end
end
module B
   def b1
   end
   def b2
   end
end

class Sample
include A
include B
   def s1
   end
end

samp=Sample.new
samp.a1
samp.a2
samp.b1
samp.b2
samp.s1
```

# 11. 字符串
字符串指令较多，都需要有一个新建一个字符串对象实例
```ruby
#!/usr/bin/ruby

myStr = String.new("THIS IS TEST")
foo = myStr.downcase

puts "#{foo}"
```
```
this is test
```

# 12. Hash
Hash 可以设置默认值。
```ruby
#!/usr/bin/ruby

months = Hash.new( "month" )

puts "#{months[0]}"
puts "#{months[72]}"
```

```ruby
#!/usr/bin/ruby

H = Hash["a" => 100, "b" => 200]

puts "#{H['a']}"
puts "#{H['b']}"
```
这将返回一个使用给定对象进行填充的新的哈希。现在，使用创建的对象，我们可以调用任意可用的实例方法。
```ruby
#!/usr/bin/ruby

$, = ", "
months = Hash.new( "month" )

months = {"1" => "January", "2" => "February"}

keys = months.keys

puts "#{keys}"
```
```
2,1
```
# 13. Range
范围实现了让您可以遍历它们的方法，您可以通过多种方式检查它们的内容：
```ruby
#!/usr/bin/ruby

# Assume a range
digits = 0..9

puts digits.include?(5)
ret = digits.min
puts "Min value is #{ret}"

ret = digits.max
puts "Max value is #{ret}"

ret = digits.reject {|i| i < 5 }
puts "Rejected values are #{ret}"

digits.each do |digit|
   puts "In Loop #{digit}"
end
```
```
true
Min value is 0
Max value is 9
Rejected values are 5, 6, 7, 8, 9
In Loop 0
In Loop 1
In Loop 2
In Loop 3
In Loop 4
In Loop 5
In Loop 6
In Loop 7
In Loop 8
In Loop 9
```

# 14. 迭代器
集合使用迭代器进行遍历
```ruby
collection.each do |variable|
   code
end
```
### 14.2 collect 方法
collect 方法不需要总是与一个块关联。collect 方法返回整个集合，不管它是数组或者是哈希。
```ruby
#!/usr/bin/ruby

a = [1,2,3,4,5]
b = Array.new
b = a.collect
puts b
b = a.collect{|x| 10*x}
puts b
```

# 参考
本文主要参考`Ruby`官方文档。

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info
