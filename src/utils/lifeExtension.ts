// Calculates transformer life extension after optimization

export function lifeExtension(currentLife: number, improvement: number) {
  const extendedLife = currentLife + improvement;

  return {
    currentLife,
    extendedLife,
    savings: `₹${improvement * 2} Lakhs approx`,
  };
}
