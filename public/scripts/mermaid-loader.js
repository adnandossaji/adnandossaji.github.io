// Process mermaid code blocks
document.addEventListener('DOMContentLoaded', async () => {
  // Find all code blocks with language-mermaid class
  const mermaidCodeBlocks = document.querySelectorAll('pre code.language-mermaid');
  
  if (mermaidCodeBlocks.length > 0) {
    try {
      // Load Mermaid dynamically from CDN
      const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs');
      
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
      });
      
      // Process each mermaid code block
      mermaidCodeBlocks.forEach((codeBlock, index) => {
        // Get the parent pre element
        const preElement = codeBlock.parentElement;
        if (!preElement) return;
        
        // Create a new div for the mermaid diagram
        const diagramDiv = document.createElement('div');
        diagramDiv.className = 'mermaid';
        diagramDiv.id = `mermaid-diagram-${index}`;
        
        // Set the diagram content
        diagramDiv.textContent = codeBlock.textContent;
        
        // Replace the pre element with the mermaid div
        preElement.parentNode?.replaceChild(diagramDiv, preElement);
      });
      
      // Render all diagrams
      mermaid.init(undefined, '.mermaid');
    } catch (error) {
      console.error('Failed to load or render Mermaid diagrams:', error);
    }
  }
}); 