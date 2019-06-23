# SourceBuffer


### URL.createObjectURL()

`URL.createObjectURL()` 方法会根据传入的参数创建一个指向该参数对象的`URL`，这个 `URL` 的生命周期和创建它的窗口中的 `document` 绑定。这个新的`URL` 对象表示指定的 `File` 对象或 `Blob` 对象

```js
objectURL = URL.createObjectURL(object);
```

参数 `object` 是用于创建 `URL` 的 `File` 对象、`Blob` 对象或者 `MediaSource` 对象


在每次调用 `createObjectURL()` 方法时，都会创建一个新的 `URL` 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 `URL` 对象时，每个对象必须通过调用 `URL.revokeObjectURL()` 方法来释放。浏览器会在文档退出的时候自动释放它们+36

### 使用MeadiaSourse

`MediaSource`是`Media Source Extensions(MSE) API`表示媒体资源`HTMLMediaElement`对象的接口。`MediaSource`对象可以附着在`HTMLMediaElement`在客户端进行播放

`MediaSource` 状态：

- `open` 已经和 `HTMLMedia` 连接，并且等待新的数据被添加时触发
- `closed`  并没有和 `HTMLMedia` 元素连接
- `ended` 当调用 `endOfStream` 方法时会触发，并且此时依然和 `HTMLMedia` 元素连接

`MediaSource` 事件：

- `sourceopen`: 当状态变为 `open` 时触发。常常在 `MediaSource` 和 `HTMLMedia` 绑定时触发。
- `sourceended`: 当状态变为 `ended` 时触发。
- `sourceclose`: 当状态变为 `closed` 时触发。

`MediaSource`属性：

- `sourceBuffers`  返回一个`SourceBufferList`对象
- `activeSourceBuffer` 当前正在使用的 `sourceBuffer`
- `readyState`
- `duration`

`MediaSource` 方法：

- `addSourceBuffer()`  触发`sourceopen`监听时进行的，该动作会创建一个`sourceBuffer`对象用于数据流的播放处理
- `removeSourceBuffer()`
- `endOfStream()`

**使用MediaSource**

1. 判断是否`mediaSource`的扩展类，该语句决定了整个播放方式是否可以使用`MediaSource`接口控制播放器
```js
window.MediaSource = window.MediaSource || window.WebkitMediaSource;
```

1. `isTypeSupporteed(mime)`:判断是否支持要解码播放的视频文件编码和类型, MIME参考 [MIME doc](https://wiki.whatwg.org/wiki/Video_type_parameters#Browser_Support)
```js
MediaSource.isTypeSupported('video/webm;codecs="vorbis,vp8"');//是否支持webm 
MediaSource.isTypeSupported('video/mp4;codecs="avc1.42E01E,mp4a.40.2"')//是否支持MP4 
MediaSource.isTypeSupported('video/mp2t;codes="avc1.42E01E,mp4a.40.2"')//是否支持ts
```

3. `addSourceBuffer` 创建给定`MIME`类型的`SourceBuffer`
```js
mediaSource.addSourceBuffer('video/mp4;codecs="avc1.42E01E,mp4a.40.2"') 
```

4. `appendBuffer` 用于持续数据的添加播放
```js
sourceBuffer.appendBuffer(Uint8array)
```

`track`切换：

`track` 这个概念其实是音视频播放的轨道， 一个 `SourceBuffer `里面可能会包含一个` track` 或者说是几个 `track`， 所以，推荐某一个 `SourceBuffer` 最好包含一个值包含一个 `track`，这样，后面的 `track` 也方便更换

video 切换：
**移除原有不需要 track**
- 从 `activeSourceBuffers` 移除与当前 `track` 相关的 `SourceBuffer`
- 触发` activeSourceBuffers` 的 `removesourcebuffer` 事件

**添加指定的 track**
- 从 `activeSourceBuffers` 添加指定的 `SourceBuffer`
- 触发 `activeSourceBuffers` 的 `addsourcebuffer` 事件


### SourceBuffer

`SourceBuffer`中的内容包括
```js
interface SourceBuffer : EventTarget {
             attribute AppendMode          mode;
    readonly attribute boolean             updating;
    readonly attribute TimeRanges          buffered;
             attribute double              timestampOffset;
    readonly attribute AudioTrackList      audioTracks;
    readonly attribute VideoTrackList      videoTracks;
    readonly attribute TextTrackList       textTracks;
             attribute double              appendWindowStart;
             attribute unrestricted double appendWindowEnd;
             attribute EventHandler        onupdatestart;
             attribute EventHandler        onupdate;
             attribute EventHandler        onupdateend;
             attribute EventHandler        onerror;
             attribute EventHandler        onabort;
    void appendBuffer(BufferSource data);
    void abort();
    void remove(double start, unrestricted double end);
};
```

`sourceBuffer`中的`mode`。决定了 `A/V segment` 是怎样进行播放的, `mode` 的取值有两个，一个是 `segments`，一个是 `sequence`
- `segments` 表示 A/V 的播放时根据你视频播放流中的 pts 来决定，该模式也是最常使用的。因为音视频播放中，最重要的就是 pts 的排序。因为，pts 可以决定播放的时长和顺序，如果一旦 A/V 的 pts 错开，有可能就会造成 A/V sync drift。

- `sequence` 则是根据空间上来进行播放的。每次通过 `appendBuffer` 来添加指定的 `Buffer` 的时候，实际上就是添加一段 `A/V segment`。此时，播放器会根据其添加的位置，来决定播放顺序。还需要注意，在播放的同时，你需要告诉 `SourceBuffer`，这段 `segment` 有多长，也就是该段 `Buffer` 的实际偏移量。而该段偏移量就是由 `timestampOffset` 决定的。整个过程用代码描述一下就是：
```js
sb.appendBuffer(media.segment);
sb.timestampOffset += media.duration;
```

`track` 和 `SourceBuffer` 并不是一一对应的关系。他们的关系只能是 `SourceBuffer : track = 1: 1 or 2 or 3`。即，一个 `SourceBuffer`可能包含，一个 `A/V track(1)`，或者，一个 `Video track` ，一个`Audio track(2)`，或者 再额外加一个 `text track(3)`, 推荐将`track` 和 `SourceBuffer` 设置为一一对应的关系



`track` 最重要的特性就是 `pts` ，`duration`，`access point flag`。`track` 中 最基本的单位叫做`Coded Frame`，表示具体能够播放的音视频数据， 它本身其实就是一些列的 `media data`，并且这些` media data` 里面必须包含 `pts`，`dts`，`sampleDuration` 的相关信息。

在 `SourceBuffer` 中，有几个基本内部属性是用来标识前面两个字段的。

- `last decode timestamp`: 用来表示最新一个 `frame` 的编码时间（pts）。默认为 null 表示里面没有任何数据
- `last frame duration`: 表示 `coded frame group` 里面最新的 `frame` 时长。
- `highest end timestamp`: 相当于就是最后一个 `frame` 的 `pts` + `duration`
- `need random access point flag`: 这个就相当于是同步帧的意思。主要设置是根据音视频流 里面具体字段决定的，和前端这边编码没关系。
- `track buffer ranges`: 该字段表示的是 `coded frame group` 里面，每一帧对应存储的 `pts` 范围

`SourceBuffer` 内部的状态，通常根据一个属性：`updating` 值来更新。即，它只有 `true` 或者 `false` 两种状态：

- `true`：当前 `SourceBuffer` 正在处理添加或者移除的 `segment`
- `false`：当前 `SourceBuffer` 处于空闲状态。当且仅当 `updating = false `的时候，才可以对 `SourceBuffer` 进行额外的操作

`SourceBuffer` 内部的 `buffer` 管理主要是通过 `appendBuffer(BufferSource data)`和 `remote()` 两个方法来实现的。当然，并不是所有的 `Buffer` 都能随便添加给指定的 `SourceBuffer`，这里面是需要条件和相关顺序的。
- 该 `buffer`，必须满足 `MIME` 限定的类型
- 该 `buffer`，必须包含 `initialization segments（IS`） 和 `media segments（MS）`.

IS 实际上就是：`ftyp + moov`。里面需要包含指定的 `track ID`，相关 `media segment` 的解码内容, 可以把 IS 类比为一个文件描述头，该头可以指定该音视频的类型，`track	` 数，时长等

MS 是具体的音视频流数据，在 FMP4 格式中，就相当于为 `moof + mdat` 两个 box。MS 需要包含已经打包和编码时间后的数据，其会参考最近的 IS 头内容


**控制播放片段**

如果要在 `video` 标签中控制指定片段的播放，一般是不可能的。因为，在加载整个视频 `buffer` 的时候，视频长度就已经固定的，剩下的只是你如果在 `video` 标签中控制播放速度和音量大小。而在 MSE 中，如何在已获得整个视频流 `Buffer` 的前提下，完成底层视频 Buffer 的切割和指定时间段播放呢？

这里，需要利用 `SourceBuffer` 下的 `appendWindowStart` 和 `appendWindowEnd` 这两个属性。他们两个属性主要是为了设置，当有视频 `Buffer` 添加时，只有符合在 `[start,end]` 之间的 `media frame` 才能 `append`，否则，无法 `append`, 如：

```js
// 单位是秒
sourceBuffer.appendWindowStart = 3.0;
sourceBuffer.appendWindowEnd = 8.0;
```

**SourceBuffer内存释放**

在 `SourceBuffer` 中，简单的来说，就是移除指定的 `time ranges' buffer`

```js
remove(double start, unrestricted double end);
```

具体的步骤为：

- 找到具体需要移除的 `segment`。
- 得到其开始（start）的时间戳（以 s 为单位）
- 得到其结束（end）的时间戳（以 s 为单位）
- 此时，`updating` 为 `true`，表明正在移除
- 完成之后，触发 `updateend` 事件

### HTMLMediaElement

HTMLMediaElement 是一个集合概念，里面包含了 Video 和 Audio 元素。也可以说，A/V 两个元素其实就是继承了 HTMLMediaElement 的原型对象。HTMLMediaElement接口定义如下：

```typescript
interface HTMLMediaElement : HTMLElement {

  // error state
  readonly attribute MediaError? error;

  // network state
  attribute DOMString src;
  attribute MediaProvider? srcObject;
  readonly attribute DOMString currentSrc;
  attribute DOMString? crossOrigin;
  const unsigned short NETWORK_EMPTY = 0;
  const unsigned short NETWORK_IDLE = 1;
  const unsigned short NETWORK_LOADING = 2;
  const unsigned short NETWORK_NO_SOURCE = 3;
  readonly attribute unsigned short networkState;
  attribute DOMString preload;
  readonly attribute TimeRanges buffered;
  void load();
  CanPlayTypeResult canPlayType(DOMString type);

  // ready state
  const unsigned short HAVE_NOTHING = 0;
  const unsigned short HAVE_METADATA = 1;
  const unsigned short HAVE_CURRENT_DATA = 2;
  const unsigned short HAVE_FUTURE_DATA = 3;
  const unsigned short HAVE_ENOUGH_DATA = 4;
  readonly attribute unsigned short readyState;
  readonly attribute boolean seeking;

  // playback state
  attribute double currentTime;
  void fastSeek(double time);
  readonly attribute unrestricted double duration;
  object getStartDate();
  readonly attribute boolean paused;
  attribute double defaultPlaybackRate;
  attribute double playbackRate;
  readonly attribute TimeRanges played;
  readonly attribute TimeRanges seekable;
  readonly attribute boolean ended;
  attribute boolean autoplay;
  attribute boolean loop;
  void play();
  void pause();

  // controls
  attribute boolean controls;
  attribute double volume;
  attribute boolean muted;
  attribute boolean defaultMuted;

  // tracks
  [SameObject] readonly attribute AudioTrackList audioTracks;
  [SameObject] readonly attribute VideoTrackList videoTracks;
  [SameObject] readonly attribute TextTrackList textTracks;
  TextTrack addTextTrack(TextTrackKind kind, optional DOMString label = "", optional DOMString language = "");
};
```

`readyState` 本身是代表当前播放片段的 `Buffer` 内容

- `HAVE_NOTHING = 0`: 当前 `video` 没有包含任何可使用的数据。即，它没有和任何流绑定在一起。此时，啥事件都不会触发。
- `HAVE_METADATA = 1`: 得到视频流的基本数据，比如，视频编码格式，视频 `duration` 等。不过，还没有得到实际的数据，当前还不能无法播放。
- `HAVECURRENTDATA = 2`: 拥有当前视频播放数据，但并不包括下一帧的数据。即，很有可能 `Video` 在播放完当前的帧后就停止。并且，当且仅当 `readyState >= HAVE_CURRENT_DATA` 才可以完成播放。
- `HAVEFUTUREDATA = 3`: 这是比上一个状态，数据更丰富的一个状态。这时，不仅拥有当前视频播放数据，还包括下一帧的播放数据。
- `HAVEENOUGHDATA = 4`: 表示当前 `mediaSource` 中的视频流 `Buffer` 已经满了。即，可以流畅的播放一段时间的数据。

这 5 个状态，实际上映射的是上面的 6 个事件：`loadedmetadata` , `loadeddata` , 
`canply`  `canplaythrouh`,`playing,waitig`

总结如下：

![](media/15611713752207/15612436243996.png)


**video 的自动播放**
直接加上 `autoplay` 属性， 在大部分 PC 上播放都没有问题，但在移动平台却是无效的，因为，Video 内部有一个叫做 `autoplaying flag`，如果为 `true` 的话，它会阻塞 `Document` 的 `load` 事件，也就是延长渲染的时间，为了用户体验，手机厂商或者APP开发者手动取消的 `autoplay` 这一过程。

实际上，`Video` 自动播放，可以直接映射为 `HTMLMediaElement` 的 `load` 方法。如果，你没有给 `Video` 添加 `autoplay` 的属性，可以尝试使用 `load` 方法来直接播放。这样，既可以避免无意识延长 `document.onload` 的触发，又可以比较灵活的进行脚本配置。

```js
window.onload = function(){
    video.load();
}
```

### 用 JS 来 seek video
`video` 本身有 `seeking` 和 `seeked` 事件来作为用户` seek` 操作的监听函数。
- `seeking`: 当用户开始拖动进度条的时候触发
- `seeked`: 当用户拖动完进度条时触发


### H5直播实践

![](media/15611713752207/15612726608727.png)


1. `websocket` 提供原始的直播流。比如，`RTMP` 的直播流，或者`WS-FLV`的直播流。但是，里面得到的纯流大部分是 `flv` 格式，我们的 `video` 是不能直接播放的。这时候，就需要把纯流给 `remux/demux` 进行转换，生成可播放的 `mp4` 流

2. `MSE` 将可播放的流，在底层提供给 `Video` 进行播放

```js
// the implementation is as follows
class MSE {
    constructor(video) {
        this.videoEle = video;
        this.mediaSource;
        this.tmpBuffer = []; // in order to save video buffer

        this.initMSE(); // get the global var of MSE
    }
    initMSE() {
        let mediaSource = this.mediaSource = new MediaSource(); 
        this.videoEle.src = URL.createObjectURL(mediaSource);

        mediaSource.addEventListener('sourceopen', e => {
            URL.revokeObjectURL(this.videoEle.src);
        });
    }
    // after getting the mime, then init the specific SB
    initSB(mime) {
        if (this.mediaSource.readyState === 'open') {
            try {
                this.SB = this.mediaSource.addSourceBuffer(MIME);

            } catch (error) {
                console.log(error)
                throw new Error("MSE couldn't support the MIME: " + MIME);
            }
        }

    }
    // when getting the new video buffer, checking the sb.updating, if it isn't using, append new one
    appendSB(buffer) {
        this.tmpBuffer.push(buffer);
        let sb = this.SB;

        if (!sb.updating) {
            sb.appendBuffer(this._mergeBuffer(this.tmpBuffer));

            this.tmpBuffer = []; // clear the buffer
        }
    }
    // just a cheap function
    _mergeBuffer(boxes) {

        let boxLength = boxes.reduce((pre, val) => {
            return pre + val.byteLength;
        }, 0);

        let buffer = new Uint8Array(boxLength);

        let offset = 0;

        boxes.forEach(box => {
            buffer.set(box, offset);
            offset += box.byteLength;
        });

        return buffer;
    }
}

// bind the video.src with MSE
let MSEController = new MSE(video);

ws.initMsg(MIME=>{
    MSEController.initSB(MIME);
});

ws.laterMsg(buffer=>{
    MSEController.appendSB(buffer);
})
```