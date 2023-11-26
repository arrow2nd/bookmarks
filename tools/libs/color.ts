import { createCanvas, Image, loadImage } from "canvas";
import { Color } from "~/types/bookmark.ts";

/**
 * テーマカラーを取得
 * @param url 画像URL
 * @returns カラーコード
 */
export async function getThemeColor(url: string): Promise<Color | undefined> {
  let image: Image;

  try {
    image = await loadImage(url);
  } catch (e) {
    console.error(e);
    return;
  }

  const canvas = createCanvas(image.width(), image.height());
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.drawImage(image, 0, 0, image.width(), image.height());

  // キャンバスからピクセルデータを取得
  const imageData = ctx.getImageData(0, 0, image.width(), image.height());
  const pixels = imageData.data;

  // ピクセルデータを走査してカラーヒストグラムを作成
  const colorHistogram: Record<string, number> = {};
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];

    // 透過部分を無視
    if (a !== 255) {
      continue;
    }

    const rgb = r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0");

    if (colorHistogram[rgb]) {
      colorHistogram[rgb]++;
    } else {
      colorHistogram[rgb] = 1;
    }
  }

  // カラーヒストグラムから最も多く使用されている色を見つける
  let maxCount = 0;
  let themeColor = "";
  for (const color in colorHistogram) {
    if (colorHistogram[color] > maxCount) {
      maxCount = colorHistogram[color];
      themeColor = color;
    }
  }

  // テーマカラーを出力
  return `#${themeColor}`;
}
