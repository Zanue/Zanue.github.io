function loadVideo(video) {
  if (!video.getAttribute("src")) {
    video.setAttribute("src", video.dataset.src);
    video.load();
  }

  video.play?.().catch(() => {
    // Browsers can block autoplay even for muted videos; controls remain available.
  });
}

const lazyVideos = document.querySelectorAll("video[data-src]");

if ("IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadVideo(entry.target);
          videoObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "900px 0px" },
  );

  lazyVideos.forEach((video) => videoObserver.observe(video));
} else {
  lazyVideos.forEach(loadVideo);
}

document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("error", () => {
    video.closest(".video-card, .video-feature")?.classList.add("load-error");
  });
});

document.querySelectorAll("video[data-playlist]").forEach((video) => {
  const playlist = video.dataset.playlist
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (playlist.length < 2) {
    return;
  }

  let currentIndex = Math.max(0, playlist.indexOf(video.dataset.src));
  const gallery = video.closest(".media-band");
  const promptTarget = gallery?.querySelector("[data-gallery-prompt]");
  const sourceTarget = gallery?.querySelector("[data-gallery-source]");
  const prevButton = gallery?.querySelector("[data-gallery-prev]");
  const nextButton = gallery?.querySelector("[data-gallery-next]");

  const galleryMeta = {
    "demos_small_proxy_blender_part01.mp4": {
      prompt:
        "A person pulls back the leftmost metal ball of the Newton's Cradle on the table and releases it, causing the ball to swing down and strike the adjacent one.",
    },
    "demos_small_proxy_blender_part02.mp4": {
      prompt:
        "A person stands in front of a large floor-to-ceiling window with two panels of light, flowing curtains drawn closed in the center. With both hands, they grasp the inner edges of the curtains and smoothly pull them outward in opposite directions. Sunlight gradually floods into the room as the curtains part, revealing a bright outdoor view.",
    },
    "demos_small_proxy_blender_part03.mp4": {
      prompt:
        "Cinematic shot in a kitchen. Front view of a piece of bread. The bread rests on a wooden table, surrounded by various kitchen utensils. A person stands behind the bread holding a sharp knife. They perform a downward slicing motion through the bread, slide the cut slice away, and repeat this specific sequence three times in a row. Soft natural lighting, 4k resolution.",
    },
    "demos_small_proxy_blender_part04.mp4": {
      prompt: "A cup of milk was placed on a table. A spoon stirred the milk inside the cup.",
    },
    "demos_small_proxy_blender_part05.mp4": {
      prompt:
        "Five books stand upright on a table. A person pushes the leftmost book to the right, causing it to topple and create a domino effect that knocks over the other four books.",
    },
    "demos_small_proxy_articulation_part01.mp4": {
      prompt:
        "A box rests on the wooden desk of a vintage study. Standing behind the table, a person places a hand on the lid and slowly opens it.",
      sourceName: "Articraft3D",
      sourceUrl: "https://articraft3d.github.io/",
    },
    "demos_small_proxy_articulation_part02.mp4": {
      prompt:
        "In a cozy kitchen, a sleek refrigerator stands against the wall. A person stands before it, gently pulling the door open with one hand, revealing neatly arranged fresh food inside-colorful fruits, beverages, and prepared meals illuminated by the fridge's soft interior light.",
      sourceName: "NeoWorld-Pro",
      sourceUrl: "https://raynehe.github.io/PRISM/",
    },
    "demos_small_proxy_articulation_part03.mp4": {
      prompt:
        "In a modern kitchen packed with assorted cookware and utensils, a person crouches in front of the oven. Wearing protective oven mitts, they slowly open the oven door to reveal golden-brown loaves of bread baking inside, with warm interior light spilling out onto the floor.",
      sourceName: "Articraft3D",
      sourceUrl: "https://articraft3d.github.io/",
    },
    "demos_small_proxy_articulation_part04.mp4": {
      prompt:
        "In a softly lit bedroom, an elegant wooden vanity table stands by the window. A person stands before it, gently sliding open the top drawer with their left hand, revealing neatly arranged makeup essentials-lipsticks, compacts, brushes, and perfume bottles-illuminated by warm ambient light.",
      sourceName: "NeoWorld-Pro",
      sourceUrl: "https://raynehe.github.io/PRISM/",
    },
  };

  function currentName() {
    return playlist[currentIndex].split("/").pop();
  }

  function updateGalleryText() {
    const meta = galleryMeta[currentName()] ?? {};
    if (promptTarget) {
      promptTarget.textContent = meta.prompt ? `Text Prompt: ${meta.prompt}` : "";
    }
    if (!sourceTarget) {
      return;
    }
    if (meta.sourceName && meta.sourceUrl) {
      sourceTarget.innerHTML = `Proxy video source: <a href="${meta.sourceUrl}" target="_blank" rel="noreferrer">${meta.sourceName}</a>`;
    } else {
      sourceTarget.textContent = "";
    }
  }

  function playCurrent() {
    video.setAttribute("src", playlist[currentIndex]);
    video.load();
    video.play?.().catch(() => {});
    updateGalleryText();
  }

  function stepVideo(delta) {
    currentIndex = (currentIndex + delta + playlist.length) % playlist.length;
    playCurrent();
  }

  updateGalleryText();

  video.addEventListener("ended", () => {
    stepVideo(1);
  });

  prevButton?.addEventListener("click", () => stepVideo(-1));
  nextButton?.addEventListener("click", () => stepVideo(1));
});

document.querySelectorAll(".prompt-text").forEach((prompt) => {
  if (prompt.closest(".prompt-toggle")) {
    return;
  }

  const details = document.createElement("details");
  details.className = "prompt-toggle";

  const summary = document.createElement("summary");
  summary.className = "prompt-summary";
  summary.textContent = "Click to view Prompt";

  prompt.replaceWith(details);
  details.append(summary, prompt);
});

const copyButton = document.querySelector("[data-copy-target]");
const copyStatus = document.querySelector(".copy-status");

copyButton?.addEventListener("click", async () => {
  const target = document.getElementById(copyButton.dataset.copyTarget);
  const text = target?.textContent ?? "";

  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "BibTeX copied.";
  } catch {
    copyStatus.textContent = "Copy failed. Select the BibTeX text manually.";
  }

  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 2400);
});
