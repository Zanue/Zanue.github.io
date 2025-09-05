---
layout: post
title: ViP-DeepLab&#58;  Learning Visual Perception with Depth-aware Video Panoptic Segmentation
image: pixiv_2.jpg
date: 2022-10-10 16:04:20 +0800
tags: [Computer Vision, 3D Object Detection]
categories: papers
---




### Contributions:
1. A new task Depth-aware Video Panoptic Segmentation (DVPS), divided into two sub-tasks:
   1. video panoptic segmentation;
   2. monocular depth estimation

2. Two DVPS datasets along with an evaluation metric Depth-aware Video Panoptic Quality (DVPQ)

3. ViP-DeepLab, a unified model for DVPS


### Metrics
With window size $k$ and class $c$,  $\mathrm{VPQ}:$
<!-- <div align=center><img src=https://github.com/Zanue/Zanue.github.io/raw/main/images/bg_img/vpq.jpg width=60%/></div> -->

![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/vpq.jpg){:height="60%" width="60%"}


Realtionship between $\mathrm{VPQ}$ and $\mathrm{PQ}$:

<!-- <div align=center><img src=https://github.com/Zanue/Zanue.github.io/raw/main/images/bg_img/vpq2.jpg width=60% /></div> -->
![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/vpq2.jpg){:height="60%" width="60%" text-align:center}


$\mathrm{DVPQ}$:

<!-- <div align=center><img src=https://github.com/Zanue/Zanue.github.io/raw/main/images/bg_img/dvpq.jpg width=60% /></div> -->
![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/dvpq.jpg){:height="60%" width="60%"}

### Model

<!-- <div align=center><img src=https://github.com/Zanue/Zanue.github.io/raw/main/images/bg_img/vipdeeplab.jpg width=80% /></div> -->
![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/vipdeeplab.jpg){:height="80%" width="80%"}

<!-- <div align=center><img src=https://github.com/Zanue/Zanue.github.io/raw/main/images/bg_img/vipdeeplab2.jpg width=80% /></div> -->
![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/vipdeeplab2.jpg){:height="80%" width="80%"}

