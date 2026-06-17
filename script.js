const loveAudio = document.getElementById("loveAudio");
const volumeNote = document.getElementById("volumeNote");

function markAudioPlaying() {
  if (!volumeNote) return;
  volumeNote.classList.add("playing");
  volumeNote.textContent = "tocando nossa música";
}

async function startLoveAudio() {
  if (!loveAudio) return;

  loveAudio.volume = 0.86;

  try {
    await loveAudio.play();
    markAudioPlaying();
  } catch (error) {
    if (volumeNote) {
      volumeNote.textContent = "aumenta o volume kkk";
    }
  }
}

if (loveAudio) {
  window.addEventListener("load", startLoveAudio);

  ["pointerdown", "touchstart", "click"].forEach((eventName) => {
    document.addEventListener(eventName, startLoveAudio, {
      once: true,
      passive: true
    });
  });

  if (volumeNote) {
    volumeNote.addEventListener("click", startLoveAudio);
  }
}

const noBtn = document.getElementById("noBtn");

function stopScroll(event) {
  const target = event.target;
  if (target && target.closest && target.closest("a, button")) return;
  event.preventDefault();
}

document.addEventListener("touchmove", stopScroll, { passive: false });
document.addEventListener("wheel", stopScroll, { passive: false });

function getViewportSize() {
  if (window.visualViewport) {
    return {
      width: window.visualViewport.width,
      height: window.visualViewport.height
    };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

function moveNoButton(event) {
  if (event) event.preventDefault();

  const rect = noBtn.getBoundingClientRect();
  const viewport = getViewportSize();
  const padding = 14;

  const maxX = Math.max(padding, viewport.width - rect.width - padding);
  const maxY = Math.max(padding, viewport.height - rect.height - padding);

  let x = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
  let y = Math.floor(Math.random() * (maxY - padding + 1)) + padding;

  const yesBtn = document.querySelector(".yes");
  if (yesBtn) {
    const yesRect = yesBtn.getBoundingClientRect();
    const tooClose =
      x < yesRect.right + 24 &&
      x + rect.width > yesRect.left - 24 &&
      y < yesRect.bottom + 24 &&
      y + rect.height > yesRect.top - 24;

    if (tooClose) {
      y = y > viewport.height / 2 ? padding : maxY;
    }
  }

  noBtn.classList.add("escape");
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

if (noBtn) {
  noBtn.addEventListener("pointerenter", moveNoButton);
  noBtn.addEventListener("pointerdown", moveNoButton);
  noBtn.addEventListener("touchstart", moveNoButton, { passive: false });
  noBtn.addEventListener("click", moveNoButton);

  setInterval(() => {
    if (noBtn.classList.contains("escape")) moveNoButton();
  }, 1250);
}
