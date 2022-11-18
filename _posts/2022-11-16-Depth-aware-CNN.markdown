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

**Core idea**: depth channel is used to adapt the *receptive field* of the convolution.

![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/depth-aware-cnn/3dn-conv-structure.jpg){:height="80%" width="80%"}  
<center style="font-size:14px">Figure 2: Overall structure of 3DN-Conv.</center> 


### Depth locality

<p>
$$
\mathbf{y}_i = f \left( \mathbf{b} + \sum_{j \in \mathcal{N}_i} \mathcal{L}_{ji} \mathbf{W}_{n_{ji}} \mathbf{x}_j \right)
$$
</p>

where $\mathcal{L} _{ji} = \exp (\frac{d _j - d _i}{\sigma})^2$.


### Neighborhood scale selection

<p>
$$
\mathbf{y}_i = f \left( \mathbf{b}_{n_{ji}} + \sum_{j \in \mathcal{N}_i^{S}} \mathbf{W}_{n_{ji}}^{\mathcal{L}} \mathbf{x}_j \right)
$$
</p>

where $\mathbf{W} _{n _{ji}}^{\mathcal{L}} = \mathcal{L} _{ji} \mathbf{W} _{n _{ji}}$, $\mathcal{N} _i^{S}$ is the scaled 2D neighborhood, defined by

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


<br/>

## 2.5D CONVOLUTION FOR RGB-D SEMANTIC SEGMENTATION

**Core idea:** mimic a 3D $k \times k \times k$ convolution kernel by $k$ 2D kernels of size $k \times k$ with help of corresponding depth information.

![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/depth-aware-cnn/2.5d-conv-structure.jpg){:height="80%" width="80%"}  
<center style="font-size:14px">Figure 3: Illustration of a $3 \times 3 \times 3$ 2.5D convolution kernel. We slice the receptive field into 3 layers along the depth dimension and assign each pixel inside receptive depth range to the corresponding layer. Each layer is handled by an individual 2D convolution kernel. We implement the layered scheme by masking each 2D kernel according to the presence of pixels in the layer. The whole process can be conducted on 2D plane. </center> 

### 2.5D convolution
For a $k \times k$ standard 2D convolution kernel with square receptive field, we denote the size of the receptive field as $k \Delta p \times k \Delta p$, and thus each grid in the receptive field has a size of $\Delta p \times \Delta p$.

Given depth $z$, the 3D coordinates $(x, y, z)$ projected from 2D pixel coordinates $(u, v)$ are

<p>
$$
\begin{aligned}
    x &= (u - c_x) \cdot z / f_x \\
    y &= (v - c_y) \cdot z / f_y
\end{aligned}
$$
</p>

When projecting the local grid into 3D space, the size of it will be

<p>
$$
k z(u_i, v_i) \Delta p' / f_x \times k z(u_i, v_i) \Delta p' / f_y,
$$
</p>

where $z(u_ i, v_ i)$ is the depth at pixel $(u_ i, v_ i)$ and $\Delta p'$ is the grid size in the coordinate of original input image. Assume that $f_ x = f_ y = f$, denoting

<p>
$$
s_i = z(u_i, v_i) \Delta p' / f,
$$
</p>

then the cubic 3D receptive field has a size of $ks_ i \times ks_ i \times ks_ i$.

Then the convolution can be written as

<p>
$$
\mathbf{y} (u_i, v_i) = \sum_{l=0}^k \sum_{m=0}^k \sum_{n=0}^k \mathbf{w}_l (m, n) \cdot \mathbf{x}_l (u_m, v_n, z_l)
$$
</p>

$x_ l$ can be easily obtained by a masking operation:

<p>
$$
\mathbf{x}_l (u_m, v_n, z_l) = \mathbf{x} \odot \mathbf{m}_l (u_m, v_n, z_l)
$$
</p>

where $\odot$ is element-wise multiplication and

<p>
$$
\mathbf{m}_l (u_m, v_n, z_l) = \left\{
\begin{array}{rcl}
1,       &      & z(u_m, v_n) \in [z_l - \frac{s_i}{2}, z_l + \frac{s_i}{2}) \\
0,     &      & otherwise
\end{array} \right.
$$
</p>


### Integrating 2.5D convolution into pretrained CNN
Each $k \times k \times k$ 2.5D convolution has $k$ 2D convolution kernels, and we can load the pretrained weights of 2D convolution into each of the kernels. In finetuning time, the $k$ kernels starts from the same initialization. Because the masks ml at different layer cannot have intersection, and the sum of all masks have zero only when the pixel falls out of the receptive depth range, this loading method can ensure that besides those fall-out pixels, the initial 2.5D convolution behaves the same of 2D convolution and is gradually trained to model 3D information.


<br/>

## Malleable 2.5D Convolution: Learning Receptive Fields along the Depth-axis for RGB-D Scene Parsing

**Core idea:** A type of 2.5D convolution which learns the receptive field along the depth-axis.
 
### Learning Receptive Fields along the Depth-axis

A malleable 2.5D convolution has $K$ convolution kernels whose receptive fields are sequentially arranged along the depth-axis. And the pixels are assigned to the kernels according to depth map $\mathbf{d}$:

<p>
$$
\mathbf{y}(\mathbf{c}_i) = \sum_{k=1}^K \sum_{\mathbf{c}_p \in \mathcal{R}_p} g_k(\mathbf{d}(\mathbf{c}_i), \mathbf{d}(\mathbf{c}_i + \mathbf{c}_p)) \cdot \mathbf{w}_k (\mathbf{c}_p) \cdot \mathbf{x}(\mathbf{c}_i + \mathbf{c}_p),
$$
</p>

where $g_ k$ is the assigning function for kernel $k$. $g_ k$ defines the depth receptive field of kernel $k$, and satisfies

<p>
$$
\sum_{k=1}^K g_k(\mathbf{d}(\mathbf{c}_i), \mathbf{d}(\mathbf{c}_i + \mathbf{c}_p)) \leq 1, \forall \mathbf{c}_p \in \mathcal{R}_p,
$$
</p>

To make the assigning functions differentiable, we implement them as a soft-max classification:

<p>
$$
g_k(\mathbf{d}(\mathbf{c}_i), \mathbf{d}(\mathbf{c}_i + \mathbf{c}_p)) = \frac{\exp (h_k(\mathbf{d}(\mathbf{c}_i), \mathbf{d}(\mathbf{c}_i + \mathbf{c}_p)))}{\sum_{m=0}^{K+1} \exp (h_m(\mathbf{d}(\mathbf{c}_i), \mathbf{d}(\mathbf{c}_i + \mathbf{c}_p)))}
$$
</p>


For $k = 1, 2, \dots ,K$, $h_ k$ are defined by the relative depth difference as

<p>
$$
h_k(\mathbf{d}(\mathbf{c}_i), \mathbf{d}(\mathbf{c}_i + \mathbf{c}_p)) = - (d(\mathbf{c}_i, \mathbf{c}_i + \mathbf{c}_p) - a_k)^2 / t,
$$
</p>

where $a_ k$ is a learnable parameter that determines the center of the kernel’s depth receptive field, and $t$ is a learnable temperature parameter that can sharpen/soften the activation of softmax. $h_ {0}$ and $h_ {K+1}$ are defined as

<p>
$$
\begin{aligned}
    h_0 &= -\mathrm{sgn}(d(\mathbf{c}_i, \mathbf{c}_i + \mathbf{c}_p) - a_0) \cdot (d(\mathbf{c}_i, \mathbf{c}_i + \mathbf{c}_p) - a_0)^2 / t \\
    h_{K+1}} &= \mathrm{sgn}(d(\mathbf{c}_i, \mathbf{c}_i + \mathbf{c}_p) - a_{K+1}) \cdot (d(\mathbf{c}_i, \mathbf{c}_i + \mathbf{c}_p) - a_{K+1})^2 / t.
\end{aligned}
$$
</p>


### Kernel Rebalancing
we introduce a scale factor $s_ k$ to rebalance the output scales of different kernel:

<p>
$$
\mathbf{y}(\mathbf{c}_i) = \sum_{k=1}^K \sum_{\mathbf{c}_p \in \mathcal{R}_p} s_k \cdot g_k(\mathbf{d}(\mathbf{c}_i), \mathbf{d}(\mathbf{c}_i + \mathbf{c}_p)) \cdot \mathbf{w}_k (\mathbf{c}_p) \cdot \mathbf{x}(\mathbf{c}_i + \mathbf{c}_p),
$$
</p>

where

<p>
$$
s_k = \frac{\exp (b_k)}{\sum_{k=1}^K \exp (b_k)}.
$$
</p>


<br/>

## SurfConv: Bridging 3D and 2D Convolution for RGBD Images

### Surface Convolution Notation.
We can further apply the projection matrix, and obtain the final receptive field definition of SurfConv:
$\mathbf{R}_ {sf}(\mathbf{p}) = \{ \mathbf{p}′ \}$ such that

<p>
$$
\begin{aligned}
    \mathbf{p}^{'}_{i} &\in [\mathbf{p}_i - \frac{\Delta_{sf}}{\mathbf{p}_z}, \mathbf{p}_i + \frac{\Delta_{sf}}{\mathbf{p}_z}] \\
    \mathbf{p}^{'}_{j} &\in [\mathbf{p}_j - \frac{\Delta_{sf}}{\mathbf{p}_z}, \mathbf{p}_j + \frac{\Delta_{sf}}{\mathbf{p}_z}]
\end{aligned}
$$
</p>


Practically, SurfConv can be simply implemented with a depth-aware multi-scale 2D convolution.

### $D^4$: Data-Driven Depth Discretization
define the *importance function* of a point as

<p>
$$
\mathbf{\Theta} (\mathbf{p}) = \mathbf{p}_z^{\gamma}
$$
</p>


where we refer to $\gamma$ as the *importance index*. The best index is determined by $\hat{\gamma} = 2 - \zeta$, where $\zeta$ quantifies this near-far tradeoff.



### Code
[https://github.com/chuhang/SurfConv](https://github.com/chuhang/SurfConv "https://github.com/chuhang/SurfConv")