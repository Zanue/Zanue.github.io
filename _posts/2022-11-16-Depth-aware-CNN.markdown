---
layout: post
title: Depth-aware CNN
image: toma.jpg
date: 2022-11-16 15:50:00 +0800
tags: [Computer Vision, RGBD, Convolution]
categories: papers
---

![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/depth-aware-cnn/depth-aware-cnn-structure.jpg){:height="80%" width="80%"}  
<center style="font-size:14px">Figure 1: Overall structure of Depth-aware CNN.</center> 


## Depth-aware CNN for RGB-D Segmentation
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


### Code
GitHub links:

[https://github.com/laughtervv/DepthAwareCNN](https://github.com/laughtervv/DepthAwareCNN "DepthAwareCNN")

[https://github.com/jshuhnow/DepthAwareCNNplus](https://github.com/jshuhnow/DepthAwareCNNplus "DepthAwareCNNplus")

[https://github.com/crmauceri/DepthAwareCNN-pytorch1.5](https://github.com/crmauceri/DepthAwareCNN-pytorch1.5 "DepthAwareCNN-pytorch1.5")


<br/>


## 3D Neighborhood Convolution: Learning Depth-Aware Features for RGB-D and RGB Semantic Segmentation

Core idea: depth channel is used to adapt the receptive field of the convolution.

### Depth locality

<p>
$$
\mathbf{y}_i = f \left( \mathbf{b} + \sum_{j \in \mathcal{N}_i} \mathcal{L}_{ji} \mathrm{W}_{n_{ji}} \mathbf{x}_j \right)
$$
</p>

where $\mathcal{L} _{ji} = \exp (\frac{d _j - d _i}{\sigma})^2$


### Neighborhood scale selection

<p>
$$
\mathbf{y}_i = f \left( \mathbf{b}_{n_{ji}} + \sum_{j \in \mathcal{N}_i^{S}} \mathbf{W}_{n_{ji}}^{\mathcal{L}} \mathbf{x}_j \right)
$$
</p>

where $\mathbf{W} _{n _{ji}}^{\mathcal{L}} = \mathcal{L} _{ji} \mathrm{W} _{n _{ji}}$, $\mathcal{N} _i^{S}$ is the scaled 2D neighborhood, defined by

<p>
$$
\mathcal{N}_i^{S} := \{ j \vert \delta (i, j) \leq r^S \},
$$
</p>

where $r^S = \frac{d _0}{d _i} r _0$, $\delta (i, j)$ denotes the distance of the two points $i$ and $j$ in 2D space. $r^S$ is the scaled kernel size, and $r _0$ is the original kernel size and it usually equals to dilation rate. In practice, we need to set a canonical depth value $d _0$ as a hyperparameter.

### Leverage RGB edges

<p>
$$
\mathbf{y}_i = f \left( \mathbf{b} + \sum_{j \in \mathcal{N}_i^{S}} \mathbf{W}_{n_{ji}}^{\mathcal{L}} \mathbf{x}_j + \mathbf{W}_{n_{ji}}^{\mathcal{E}} \mathbf{x}_j \right)
$$
</p>

where $\mathrm{W} _{n _{ji}}^{\mathcal{E}}$ is a standard convolutional filter.
