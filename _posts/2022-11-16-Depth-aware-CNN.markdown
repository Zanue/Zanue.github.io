---
layout: post
title: Depth-aware CNN for RGB-D Segmentation
image: toma.jpg
date: 2022-11-16 15:50:00 +0800
tags: [Computer Vision, RGBD, Convolution]
categories: papers
---

![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/depth-aware-cnn/depth-aware-cnn-structure.jpg){:height="80%" width="80%"}  
<center style="font-size:14px">Figure 1: Overall structure of Depth-aware CNN.</center> 


## Depth-aware CNN
Denote input feature map $\mathbf{x} \in \mathbb{R}^{c _i \times h \times w}$ and the depth image $\mathbf{D} \in \mathbb{R}^{h \times w}$, where $c _i$ is the number of input feature channels, $h$ is the height and $w$ is the width. The output feature map is denoted as $\mathbf{y} \in \mathbb{R}^{c _o \times h \times w}$, where $c _o$ is the number of output feature channels.

### Depth-aware Convolution
For each pixel location $\mathbf{p} _0$ on $\mathbf{y}$, the output of *standard 2D convolution* is

<p>
$$
\mathbf{y} (\mathbf{p}_0) = \sum_{\mathbf{p}_n \in \mathcal{R}} \mathbf{w} (\mathbf{p}_n) \cdot \mathbf{x} (\mathbf{p}_0 + \mathbf{p}_n),
$$
</p>

where $\mathcal{R}$ is the local grid around $\mathbf{p} _0$ in $\mathbf{x}$ and $\mathbf{w}$ is the convolution kernel.

Depth-aware convolution is formulized as

<p>
$$
\mathbf{y} (\mathbf{p}_0) = \sum_{\mathbf{p}_n \in \mathcal{R}} \mathbf{w} (\mathbf{p}_n) \cdot \mathbf{F_D} (\mathbf{p}_0, \mathbf{p}_0 + \mathbf{p}_n) \cdot \mathbf{x} (\mathbf{p}_0 + \mathbf{p}_n),
$$
</p>

And $\mathbf{F _D} (\mathbf{p} _i, \mathbf{p} _j)$ is defined as

<p>
$$
\mathbf{F_D} (\mathbf{p}_i, \mathbf{p}_j) = \exp (-\alpha \vert \mathbf{D}(\mathbf{p}_i) - \mathbf{D}(\mathbf{p}_j)\vert),
$$
</p>

where $\alpha$ is a constant.


### Depth-aware Average Pooling
The conventional average pooling is defined as

<p>
$$
\mathbf{y} (\mathbf{p}_0) = \frac{1}{\vert \mathcal{R} \vert} \sum_{\mathbf{p}_n \in \mathcal{R}} \mathbf{x} (\mathbf{p}_0 + \mathbf{p}_n),
$$
</p>

The depth-aware average pooling operation then becomes

<p>
$$
\mathbf{y} (\mathbf{p}_0) = \frac{1}{\sum_{\mathbf{p}_n \in \mathcal{R}} \mathbf{F_D} (\mathbf{p}_0, \mathbf{p}_0 + \mathbf{p}_n)} \sum_{\mathbf{p}_n \in \mathcal{R}} \mathbf{F_D} (\mathbf{p}_0, \mathbf{p}_0 + \mathbf{p}_n) \cdot \mathbf{x} (\mathbf{p}_0 + \mathbf{p}_n),
$$
</p>

<br/>

## Code
GitHub links:

[https://github.com/laughtervv/DepthAwareCNN](https://github.com/laughtervv/DepthAwareCNN "DepthAwareCNN")

[https://github.com/jshuhnow/DepthAwareCNNplus](https://github.com/jshuhnow/DepthAwareCNNplus "DepthAwareCNNplus")

[https://github.com/crmauceri/DepthAwareCNN-pytorch1.5](https://github.com/crmauceri/DepthAwareCNN-pytorch1.5 "DepthAwareCNN-pytorch1.5")
