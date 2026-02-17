// Calculates transformer stress score based on load + temperature

export function calculateStress(loadPercent: number, temperature: number) {
  let stress = 0;

  if (loadPercent > 80) stress += 40;
  if (temperature > 90) stress += 40;

  if (loadPercent > 95) stress += 20;

  return {
    stressScore: stress,
    status:
      stress > 80 ? "Critical" : stress > 50 ? "Warning" : "Healthy",
  };
}
