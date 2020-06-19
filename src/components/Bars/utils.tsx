export const getMeasures = (width, height) => {
  const margin = { top: 10, right: 10, bottom: 10, left: 50 };
  let innerHeight = height - margin.top - margin.bottom;
  let innerWidth = width - margin.left - margin.right;

  return { margin, innerWidth, innerHeight };
};
