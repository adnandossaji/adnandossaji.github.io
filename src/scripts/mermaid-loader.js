// Dynamically load and initialize Mermaid diagrams
document.addEventListener('DOMContentLoaded', async () => {
  const mermaidElements = document.querySelectorAll('.mermaid');
  
  if (mermaidElements.length > 0) {
    try {
      const { default: mermaid } = await import('mermaid');
      
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'loose',
      });
      
      mermaidElements.forEach((element, index) => {
        // Give each element a unique ID to prevent conflicts
        const id = `mermaid-diagram-${index}`;
        element.id = id;
        
        // Render the diagram
        mermaid.render(id, element.textContent, (svgCode) => {
          element.innerHTML = svgCode;
        });
      });
    } catch (error) {
      console.error('Failed to load Mermaid:', error);
    }
  }
}); 