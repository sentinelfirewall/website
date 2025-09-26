// src/components/DocPage.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface DocPageProps {
  markdown: string;
}

const DocPage: React.FC<DocPageProps> = ({ markdown }) => {
  return (
    <div className="doc-page">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default DocPage;
