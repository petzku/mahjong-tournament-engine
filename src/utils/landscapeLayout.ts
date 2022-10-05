export const landscapeLayout = () => {
  const style = document.createElement("style");
  style.innerHTML = "@page {size: A4 landscape} body { margin: 0; }";
  style.id = "page-orientation";
  document.head.appendChild(style);

  return () => {
    const child = document.getElementById("page-orientation");
    child?.parentNode?.removeChild(child);
  };
};