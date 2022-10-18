---
layout: post
title: BEVFormer&#58; Learning Bird’s-Eye-View Representation from Multi-Camera Images via Spatiotemporal Transformers
image: 91205404_p0_master1200.jpg
date: 2022-10-18 15:52:00 +0800
tags: [Computer Vision, 3D Object Detection]
categories: papers
---

## TL;DR
BEVFormer = **Predefined Grid-shaped BEV Queries** + **BEV Temporal Self-Attention** + **BEV Spatial Cross-Attention** + Det & Seg Heads.


## Motivation
- 3D object detection task requires strong BEV features to support accurate 3D bounding box prediction, but generating BEV from the 2D planes is ill-posed;
- BEV methods based on depth information is sensitive to the accuracy of depth values or the depth distributions.

Therefore, authors are motivated to design *a BEV generating method that does not rely on depth information and can learn BEV features adaptively rather than strictly rely on 3D prior*.


## Architecture

![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/bevformer/bevformer-framework.jpg){:height="80%" width="80%"}  
<center style="font-size:14px">Figure 1: Overall architecture of BEVFormer.</center> 




### BEV Queries
A group of grid-shaped learnable parameters $Q \in \mathbb{R}^{H \times W \times C}$, where $H, W$ are the spatial shape of the BEV plane.

Each grid cell in the BEV plane corresponds to a real-world size of $s$ meters. The center of BEV features corresponds to the position of the ego car by default.

### Spatial Cross-Attention
Spatial cross-attention is based on *deformable attention*, where *each BEV query $Q _p$ only interacts with its regions of interest across camera views*.

**Deformable Attention:**

$$
\mathrm{DeformAttn}(q, p, x) = \sum _{i=1}^{N _{head}} \mathcal{W} _i \sum _{j=1}^{N _{key}} \mathcal{A} _{ij} \cdot \mathcal{W}' _{i} x(p + \Delta p _{ij}), 
$$  

where $q, p, x$ represent the query, reference point and input features, respectively. $\mathcal{A} _{ij} \in [0, 1]$ is the predicted attention weight. $\Delta p _{ij}$ are the predicted offsets to the reference point $p$.


**Spatial Cross-Attention:**

$$
\mathrm{SCA}(Q _p, F _t) = 1 / |\mathcal{V} _{hit}| \cdot \sum _{i \in \mathcal{V} _{hit}} \sum_{j=1}^{N _{ref}} \mathrm{DeformAttn}(Q _p, \mathcal{P}(p, i, j), F _t^i),
$$  

1. Lift each query on the BEV plane to a pillar-like query, sample $N _{ref}$ 3D reference points from the pillar, and then project these points to 2D views;
2. Regard these 2D points as the reference points of the query $Q _p$ and sample the features from the hit views $\mathcal{V} _{hit}$ around these reference points;
3. Perform a weighted sum of the sampled features.

For each query $Q _p$, a pillar of 3D reference points are $(x', y', z') _{j=1}^{N _{ref}}$, where $\{z' _j \} _{j=1}^{N _{ref}}$ are a set of anchor heights.


### Temporal Self-Attention

$$
\mathrm{TSA}(Q _p, \{Q, B'_{t-1} \}) = \sum _{V \in \{Q, B'_{t-1} \}} \mathrm{DeformAttn}(Q _p, p, V)
$$  


1. Align $B _{t−1}$ to $Q$ according to ego-motion to make the features at the same grid correspond to the same real-world location, which is denoted as $B' _{t-1}$;
2. Different from the vanilla deformable attention, the offsets $\Delta p$ in temporal self-attention are predicted by the concatenation of $Q$ and $B' _{t-1}$.

**Advantages**: infer the velocity of moving objects and detect highly occluded objects from static images.


### Applications of BEV Features
- **For 3D object detection,** design an end-to-end 3D detection head based on the 2D detector Deformable DETR[1]. The modifications include using single-scale BEV features $B _t$ as the input of the decoder, predicting 3D bounding boxes and velocity rather than 2D bounding boxes, and only using $L _1$ loss to supervise 3D bounding box regression.
- **For map segmentation,** design a map segmentation head based on a 2D segmentation method Panoptic SegFormer[2].


## Experiments

### Compare with SOTA
![](../images/blog_img/bevformer/bevformer-table1.jpg){:height="80%" width="80%"}  

![](../images/blog_img/bevformer/bevformer-table4.jpg){:height="80%" width="80%"}  

### Ablation

![](../images/blog_img/bevformer/bevformer-table5.jpg){:height="80%" width="80%"}  

![](../images/blog_img/bevformer/bevformer-fig3.jpg){:height="80%" width="80%"}  

![](../images/blog_img/bevformer/bevformer-table6.jpg){:height="80%" width="80%"}  


## References
[1] Zhu, X., Su, W., Lu, L., Li, B., Wang, X., Dai, J.: Deformable detr: Deformable transformers for end-to-end object detection. In: International Conference on Learning Representations (2020)  

[2] Li, Z., Wang, W., Xie, E., Yu, Z., Anandkumar, A., Alvarez, J.M., Lu, T., Luo, P.: Panop- tic segformer: Delving deeper into panoptic segmentation with transformers. arXiv preprint arXiv:2109.03814 (2021)