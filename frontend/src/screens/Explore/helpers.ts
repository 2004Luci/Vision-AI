import type { Code } from "react-native-vision-camera";
import { CODE_TYPE_LABELS } from "./constants";

export const getCodeTypeLabel = (type: Code["type"]): string => {
  const mapped = CODE_TYPE_LABELS[type];
  if (mapped) return mapped;
  return String(type).toUpperCase();
};
