---
layout: post
title: BEVFusion&#58; Multi-Task Multi-Sensor Fusion with Unified Bird’s-Eye View Representation
image: 101003773_p0_master1200.jpg
date: 2022-11-14 20:21:00 +0800
tags: [Computer Vision, 3D Object Detection]
categories: papers
---

## TL;DR
Unify multi-modal features (**Camera image and Lidar**) in the shared bird’s-eye view (BEV) representation space.

<br/>

## Problems on different representations
- **To Camera: geometrically lossy**. Two neighbors on the depth map can be far away from each other in the 3D space.
- **To LiDAR: semantically lossy**. Camera and LiDAR features have drastically different densities, resulting in only less than 5% of camera features being matched to a LiDAR point (for a 32-channel LiDAR scanner).

<br/>


## Method

![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/bevfusion/bevfusion-framework.jpg){:height="80%" width="80%"}  
<center style="font-size:14px">Figure 1: Overall architecture of BEVFusion.</center> 


- Unify Camera features and Lidar features into BEV space
- Efficient Camera-to-BEV Transformation:
  - Precomputation: associate each point in the camera feature point cloud with a BEV grid.
  - Interval Reduction: assign a GPU thread to each grid that calculates its interval sum and writes the result back.
  - Takeaways: 40× faster.
- Fully-Convolutional Fusion

<br/>

## Experiments

![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/bevfusion/bevfusion-comp1.jpg){:height="80%" width="80%"}  


![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/bevfusion/bevfusion-comp2.jpg){:height="80%" width="80%"}  


![](https://github.com/Zanue/Zanue.github.io/raw/main/images/blog_img/bevfusion/bevfusion-ablation.jpg){:height="80%" width="80%"}  