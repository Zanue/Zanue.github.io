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


<div align=center><img src=https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/bevformer/bevformer-framework.jpg width=80% /></div>
<center style="font-size:14px">Figure 1: Overall architecture of BEVFormer.</center> 


<img src=https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/bevformer/bevformer-framework.jpg width=80% />
