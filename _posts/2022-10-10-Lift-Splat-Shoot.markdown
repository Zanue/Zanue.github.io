---
layout: post
title: Lift, Splat, Shoot Encoding Images from Arbitrary Camera Rigs by Implicitly Unprojecting to 3D
image: pixiv_1.jpg
date: 2022-10-10 16:04:20 +0800
tags: [Computer Vision, 3D Object Detection]
categories: [papers]
---


## Lift, Splat, Shoot: Encoding Images from Arbitrary Camera Rigs by Implicitly Unprojecting to 3D


### Contributions
1. A new end-to-end architecture that directly extracts a bird’s-eye-view representation of a scene given image data from an arbitrary number of cameras.

### Model
In Section 3, we explain how our model “lifts” images into 3D by generating a frustum-shaped point cloud of contextual features, “splats” all frustums onto a reference plane as is convenient for the downstream task of motion planning. In Section 3.3, we propose a method for “shooting” proposal trajectories into this reference plane for interpretable end-to-end motion planning.

<!-- <div align=center><img src=https://github.com/Zanue/Zanue.github.io/raw/main/images/lift.jpg width=80% /></div> -->
![](https://github.com/Zanue/Zanue.github.io/raw/main/images/lift.jpg){:height="80%" width="80%"}


<!-- <div align=center><img src=https://github.com/Zanue/Zanue.github.io/raw/main/images/lift-splat-shoot.jpg width=80% /></div> -->
![](https://github.com/Zanue/Zanue.github.io/raw/main/images/lift-splat-shoot.jpg){:height="80%" width="80%"}

