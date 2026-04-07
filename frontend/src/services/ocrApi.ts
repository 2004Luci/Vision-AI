import { logApi } from '@/utils/logger';

export type OcrLine = { text: string };
export type OcrBlock = { lines: OcrLine[] };

export type OcrResult = {
  /** Full text, if available from the OCR engine. */
  text: string;
  /** Structured blocks/lines for fallback rendering. */
  blocks: OcrBlock[];
};

/**
 * OCR implementation placeholder.
 *
 * The UI currently expects an on-device OCR implementation, but no OCR native
 * dependency is wired in this repo yet. This function exists so the app
 * compiles; it throws at runtime with a clear message.
 */
export const recognizeTextFromImage = async (
  imagePath: string,
): Promise<OcrResult> => {
  logApi('error', 'OCR', {
    message: 'OCR service not configured',
    imagePath: imagePath.slice(0, 80),
  });

  throw new Error(
    'OCR is not configured in this build. Add an on-device OCR library (e.g. ML Kit) and implement recognizeTextFromImage().',
  );
};

