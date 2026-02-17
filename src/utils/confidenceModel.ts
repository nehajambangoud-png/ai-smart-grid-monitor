// AI confidence estimator

export function getConfidence(dataQuality: number) {
  if (dataQuality > 90) return "98% Confidence";
  if (dataQuality > 70) return "85% Confidence";
  return "Low Confidence";
}
