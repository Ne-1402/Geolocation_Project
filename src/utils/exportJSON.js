export const exportJSON = (journey) => {
  try {
    const dataStr = JSON.stringify(journey, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const safeName = journey.name ? journey.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'journey';
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeName}-export.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error("Failed to export JSON:", error);
    return false;
  }
};
