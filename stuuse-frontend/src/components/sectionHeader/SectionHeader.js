import React from 'react';
import './SectionHeader.css';

const SectionHeader = ({ text }) => {
  return (
    <div className="section-header">
      <span>{text}</span>
    </div>
  );
};

export default SectionHeader;
