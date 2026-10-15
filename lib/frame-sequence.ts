// Loads a numbered WebP sequence in the background and answers "what is the
// best frame I can draw right now?" for any index, falling back to the
// nearest frame that has finished loading.

const CONCURRENCY = 6;

export class FrameSequence {
  readonly count: number;
  private readonly urls: string[];
  private readonly images: (HTMLImageElement | null)[];
  private readonly wanted: Set<number>;
  private queue: number[] = [];
  private active = 0;
  private cancelled = false;
  onLoad?: (index: number) => void;

  /**
   * @param dir   folder under /public, e.g. "/hero/desktop"
   * @param count number of frames in the folder
   * @param step  1 loads every frame, 2 loads every second frame (save-data)
   */
  constructor(dir: string, count: number, step = 1) {
    this.count = count;
    this.urls = Array.from({ length: count }, (_, i) => frameUrl(dir, i));
    this.images = new Array(count).fill(null);
    this.wanted = new Set(
      Array.from({ length: count }, (_, i) => i).filter((i) => i % step === 0 || i === count - 1),
    );
  }

  /** Load `first` straight away, then everything else coarse-to-fine. */
  start(first = 0) {
    const order: number[] = [first];
    const seen = new Set(order);
    for (const stride of [16, 8, 4, 2, 1]) {
      for (let i = 0; i < this.count; i += stride) {
        if (!seen.has(i) && this.wanted.has(i)) {
          seen.add(i);
          order.push(i);
        }
      }
    }
    if (!seen.has(this.count - 1) && this.wanted.has(this.count - 1)) order.push(this.count - 1);
    this.queue = order;
    this.pump();
  }

  /** Load a single frame only (reduced motion). */
  loadOnly(index: number) {
    this.queue = [index];
    this.pump();
  }

  cancel() {
    this.cancelled = true;
    this.queue = [];
  }

  get loadedCount() {
    return this.images.filter(Boolean).length;
  }

  /** The loaded frame closest to `index`, and its own index. */
  nearest(index: number): { image: HTMLImageElement; index: number } | null {
    const i = Math.min(this.count - 1, Math.max(0, Math.round(index)));
    for (let d = 0; d < this.count; d++) {
      const before = this.images[i - d];
      if (before) return { image: before, index: i - d };
      const after = this.images[i + d];
      if (after) return { image: after, index: i + d };
    }
    return null;
  }

  private pump() {
    while (!this.cancelled && this.active < CONCURRENCY && this.queue.length) {
      const index = this.queue.shift()!;
      this.active++;
      const img = new Image();
      img.decoding = "async";
      img.src = this.urls[index];
      img
        .decode()
        .then(() => {
          if (this.cancelled) return;
          this.images[index] = img;
          this.onLoad?.(index);
        })
        .catch(() => {})
        .finally(() => {
          this.active--;
          this.pump();
        });
    }
  }
}

export function frameUrl(dir: string, index: number) {
  return `${dir}/${String(index + 1).padStart(4, "0")}.webp`;
}
