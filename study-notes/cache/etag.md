### 决定是否使用缓存
对于浏览器端的缓存来说，规则是在http协议头和html的mate标签中定义的，他们
分别从过期机制和校验值来判断是否直接使用该缓存，还是需要从服务器去获取更新
的版本。
1、新鲜度(过期机制)：也就是缓存副本的有效期。一个缓存副本必须满足以下条件
之一，浏览器才会认为它是有效的，足够新的，才会直接使用缓存。
(*)http协议头中存在过期时间等信息，并且仍在有效期内。
(*)浏览器已经使用过这个缓存副本，并且在一个会话中已经检查过新鲜度。
2、校验值(验证机制)：服务器相应中，在响应头中存在Etag标签，用来验证资源是
否更改的标识，如果缓存的标识和服务器的标识相同则无需重新请求资源，如果不相
同，则重新发送资源请求。

#### 浏览器缓存控制
1、html中的mate标签设置缓存
例如
设置过期时间
＜meta http-equiv="expires" content="Wed, 20 Jun 2007 22:33:00 GMT"＞ 
设置缓存
＜meta http-equiv="Pragma" content="no-cache"＞ 

###   强制缓存有关的字段

Cache-control:max-age(单位为s),当某一个资源的响应头设置max-age=3600，
则表示在1h时间内，服务器的资源发生变化，浏览器都不会想服务器发送该资源的请
求，直接使用缓存。并且max-age会覆盖Expires。
````````````
Cache-control:s-maxage,s-maxage表示CDN缓存，也就是代理缓存，如果设置s-maxage=60,表示60秒内无论cdn服务器的该资源发生怎么样的改变，都不会重新请求，并且s-maxage会覆盖max-age和Expires.
````````````
Cache-control:public，指定是否是共享缓存，如果设置Cache-control的值设置为public,则表示多个浏览器之间可以共同使用该资源缓存。
如果没有指定Cache-control是为private还是public，则默认是public.
``````````
Cache-control:private，表示该缓存是私有的，不存在用户共享。
`````````
Cache-control:no-cache；Cache-control的值设置为no-cache并不代表不缓
存，浏览器是缓存的，但是当每一次访问该资源的时候，都要向服务器请求查看资源
是否改变，如果改变，则直接重新下载，如果没有改变，则使用缓存。可以在设置完no-cache之后，在设置private，以及设置过期时间为过去的时间。
```````````
Cache-control:no-store,表示严格不缓存，每一次资源必须从服务器上重新获取。
``````````
Expires:缓存过期时间，Expires=max-age + 最后一次请求的时间。Cache-control和Expires相比，Cache-control的优先级更高。Expires需要和Last-modifyed来一起使用。

#### 协商缓存
Last-Modified和if-modified-since:last-modified是响应头上的属性，if-modifyed-since
是请求头的数据。该属性值需要cache-control配合使用。当再次向服务器发送请求
该资源时，会携带if-modified-since的请求头字段，到服务器比对和last-
modified是否相同。如果相同则直接返回304,直接使用缓存，如果不相同，则再次
请求新的数据，返回200.


######  无法被浏览器缓存的请求
1、http信息头部cache-control:no-cache , pragma: nocache或者使用cache-control:max-age=0
2、根据cookie，认证信息决定输入内容的信息是否可以被缓存的。
3、经过https加密的请求。
4、post请求无法被缓存。
5、在http响应头中不存在last-modified/Etag和cache-control/expires等。


#####  用户行为发生的缓存
用户在浏览器采用一些操作，例如，返回上一阶段，下一阶段，刷新页面，强制刷新
等操作，这些对于一些缓存属性的影响是不一样的。下面将进行详细解读。
1、刷新（仅仅是F5刷新）:此时对于cache-control/Expires是不生效的，但是last-modified/Etag都生效的，所以此时会向服务器发起请求，用来判断目标文件是否发生变化。
2、强制刷新(F5刷新+ctrl):此时对于cache-control/expires和last-modified/Etag都不生效，此时必须从服务器拿到新数据。
3、回车或者转向：此时所有的缓存都生效。





``````
https://blog.csdn.net/weixin_47450807/article/details/122680032