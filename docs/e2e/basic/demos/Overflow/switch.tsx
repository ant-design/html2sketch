import React from 'react';
import './switch.css';

export default () => (
  <label className="tea-switch">
    <input type="checkbox" className="tea-switch__input" />
    <span className="tea-switch__toggle"></span>
  </label>
);
