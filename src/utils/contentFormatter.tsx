import React from 'react';

export const formatContent = (content: string) => {
  // Handle inline formatting (bold text and links)
  const processInlineFormatting = (text: string) => {
    // First process links, then bold text
    let processedContent: React.ReactNode[] = [];
    
    // Split by links pattern [text](url)
    const linkPattern = /(\[([^\]]+)\]\(([^)]+)\))/g;
    const parts = text.split(linkPattern);
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      // Check if this is a link match
      if (i % 4 === 1) { // Full link match
        const linkText = parts[i + 1]; // Link text
        const linkUrl = parts[i + 2];  // Link URL
        processedContent.push(
          <a 
            key={i} 
            href={linkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {linkText}
          </a>
        );
        i += 2; // Skip the text and url parts as we've processed them
      } else if (i % 4 === 0) { // Regular text that might contain bold
        // Process bold formatting in non-link text
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        const boldProcessed = boldParts.map((boldPart, boldIndex) => {
          if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
            return (
              <strong key={`${i}-${boldIndex}`} className="font-semibold text-gray-900 dark:text-gray-100">
                {boldPart.replace(/\*\*/g, '')}
              </strong>
            );
          }
          return boldPart;
        });
        processedContent.push(...boldProcessed);
      }
    }
    
    return processedContent;
  };

  const lines = content.split('\n');
  return lines.map((line, index) => {
    // Handle headers
    if (line.startsWith('###')) {
      return (
        <h3 key={index} className="text-lg font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
          {line.replace('###', '').trim()}
        </h3>
      );
    }
    if (line.startsWith('##')) {
      return (
        <h2 key={index} className="text-xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">
          {line.replace('##', '').trim()}
        </h2>
      );
    }
    if (line.startsWith('#')) {
      return (
        <h1 key={index} className="text-2xl font-bold mt-8 mb-6 text-gray-900 dark:text-gray-100">
          {line.replace('#', '').trim()}
        </h1>
      );
    }

    // Handle bold text
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={index} className="font-semibold my-4 text-gray-800 dark:text-gray-200">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    }

    // Handle lists  
    if (line.startsWith('- ')) {
      const listContent = line.replace(/^-\s*/, '');
      return (
        <li key={index} className="mr-6 mb-2 text-gray-700 list-disc dark:text-gray-300">
          {processInlineFormatting(listContent)}
        </li>
      );
    }

    // Handle empty lines
    if (line.trim() === '') {
      return <br key={index} />;
    }


    // Regular paragraphs
    return (
      <p key={index} className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
        {processInlineFormatting(line)}
      </p>
    );
  });
};