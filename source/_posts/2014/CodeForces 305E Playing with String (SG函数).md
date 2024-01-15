---
title: CodeForces 305E Playing with String (SG函数)
tags:
  - ACM
date: 2014-01-24 15:42:32
---

<span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;">Let&#39;s consider substring of </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_s_</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_s_[_i_... _j_]</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;">, that all characters from </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_i_</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> to </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_j_</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> are palindrome centers, and </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_i_&thinsp;-&thinsp;1,&thinsp;_j_&thinsp;+&thinsp;1</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> are not. Every such substring can be treated independently from the others, and as we don&#39;t need to know it&#39;sstructure let&#39;s consider only it length </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_len_</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;">. Let&#39;s calculate</span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_grundy_[_len_]</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> &mdash; Grundy function. If we want to cut character at position </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_i_</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">0&thinsp;&le;&thinsp;_i_&thinsp;<&thinsp;_len_</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> then our game splits in to independent ones: first will have length </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_i_&thinsp;-&thinsp;1</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;">, second &mdash; </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_len_&thinsp;-&thinsp;_i_&thinsp;-&thinsp;2</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;">, as </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_s_[_i_&thinsp;-&thinsp;1]</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> and </span><span class="tex-span" style="font-size: 18px; font-family: 'times new roman', sans-serif; color: rgb(34, 34, 34); line-height: 19.59375px;">_s_[_i_&thinsp;+&thinsp;1]</span><span style="color: rgb(34, 34, 34); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 19.59375px;"> are not centers of palindrome any more.</span>

```cpp
#include <cstdio>
#include <memory.h>
#include <cstring>

inline int max(int a, int b) { if (a >= b) return a; return b; }

const int N = 5005;
char s[N];
int grundy[N], mex[N], n, totalXor;

int main(){
	gets(s);
	for(int i = 1; i < N; i++) {
		memset(mex, 0, sizeof mex);
		for(int j = 0; j < i; j++) {
			int left = max(0, j - 1);
			int right = max(0, i - j - 2);
			int tXor = grundy[left] ^ grundy[right];
			if (tXor < N) mex[tXor]++;
		}
		for(int j = 0; ; j++) {
			if (!mex[j]) {
				grundy[i] = j;
				break;
			}
		}
	}
	n = strlen(s);
	for(int i = 1; i < n - 1; i++) {
		if (s[i-1] == s[i + 1]) {
			int j = i;
			while (j + 2 < n && s[j] == s[j + 2]) j++;
			totalXor ^= grundy[j - i + 1];
			i = j + 1;
		}
	}
	if (totalXor != 0) {
		puts("First");
		for(int i = 1; i < n - 1; i++) {
			if (s[i-1] == s[i+1]) {
				int j = i;
				while (j + 2 < n && s[j] == s[j + 2]) j++;
				int len = j - i + 1;
				int nowXor = totalXor ^ grundy[len];
				for(int k = 0; k < len; k++) {
					int left = max(0, k - 1);
					int right = max(0, len - k - 2);
					int resXor = nowXor ^ grundy[left] ^ grundy[right];
					if (resXor == 0) {
						printf("%dn", i + k + 1);
						return 0;
					}
				}
				i = j + 1;
			}
		}
	}
	puts("Second");
}
```

	 

	 