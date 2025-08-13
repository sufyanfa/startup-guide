import React from 'react';

export const formatContent = (content: string) => {
  const lines = content.split('\n');
  return lines.map((line, index) => {
    // Handle headers
    if (line.startsWith('###')) {
      return (
        <h3 key={index} className="text-lg font-semibold mt-6 mb-3 text-gray-800">
          {line.replace('###', '').trim()}
        </h3>
      );
    }
    if (line.startsWith('##')) {
      return (
        <h2 key={index} className="text-xl font-semibold mt-8 mb-4 text-gray-800">
          {line.replace('##', '').trim()}
        </h2>
      );
    }
    if (line.startsWith('#')) {
      return (
        <h1 key={index} className="text-2xl font-bold mt-8 mb-6 text-gray-900">
          {line.replace('#', '').trim()}
        </h1>
      );
    }

    // Handle bold text
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={index} className="font-semibold my-4 text-gray-800">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    }

    // Handle lists
    if (line.startsWith('*') || line.startsWith('-')) {
      return (
        <li key={index} className="mr-6 mb-2 text-gray-700 list-disc">
          {line.replace(/^[*-]\s*/, '')}
        </li>
      );
    }

    // Handle empty lines
    if (line.trim() === '') {
      return <br key={index} />;
    }

    // Handle inline bold text
    const processInlineFormatting = (text: string) => {
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIndex} className="font-semibold text-gray-900">
              {part.replace(/\*\*/g, '')}
            </strong>
          );
        }
        return part;
      });
    };

    // Regular paragraphs
    return (
      <p key={index} className="mb-4 leading-relaxed text-gray-700">
        {processInlineFormatting(line)}
      </p>
    );
  });
};