import { useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';
import Input from './components/Input';
import Checkbox from './components/Checkbox';

interface ComponentPreviewProps {
  componentId: string;
  defaultProps: Record<string, any>;
}

export default function ComponentPreview({ componentId, defaultProps }: ComponentPreviewProps) {
  const [props, setProps] = useState(defaultProps);
  const [isEditingProps, setIsEditingProps] = useState(false);

  // Function to render the specific component based on componentId
  const renderComponent = () => {
    switch (componentId) {
      case 'button':
        return <Button {...props} />;
      case 'card':
        return <Card {...props} />;
      case 'input':
        return <Input {...props} />;
      case 'checkbox':
        return <Checkbox {...props} />;
      default:
        return <div>Component not found</div>;
    }
  };

  // Function to render the prop editor UI
  const renderPropEditor = () => {
    return (
      <div className="prop-editor">
        <h4>Edit Properties</h4>
        <div className="prop-fields">
          {Object.entries(props).map(([key, value]) => (
            <div key={key} className="prop-field">
              <label htmlFor={`prop-${key}`}>{key}:</label>
              {renderPropInput(key, value)}
            </div>
          ))}
        </div>
        <div className="prop-actions">
          <button 
            className="done-button"
            onClick={() => setIsEditingProps(false)}
          >
            Done
          </button>
          <button 
            className="reset-button"
            onClick={() => setProps(defaultProps)}
          >
            Reset
          </button>
        </div>
      </div>
    );
  };

  // Function to render the appropriate input based on prop type
  const renderPropInput = (key: string, value: any) => {
    const propType = typeof value;
    
    switch (propType) {
      case 'boolean':
        return (
          <input
            id={`prop-${key}`}
            type="checkbox"
            checked={value}
            onChange={(e) => updateProp(key, e.target.checked)}
          />
        );
      case 'number':
        return (
          <input
            id={`prop-${key}`}
            type="number"
            value={value}
            onChange={(e) => updateProp(key, Number(e.target.value))}
          />
        );
      case 'string':
        // For enum-like string props (like variant, size), render as select
        if (key === 'variant') {
          return (
            <select
              id={`prop-${key}`}
              value={value}
              onChange={(e) => updateProp(key, e.target.value)}
            >
              <option value="primary">primary</option>
              <option value="secondary">secondary</option>
              <option value="danger">danger</option>
              <option value="success">success</option>
            </select>
          );
        } else if (key === 'size') {
          return (
            <select
              id={`prop-${key}`}
              value={value}
              onChange={(e) => updateProp(key, e.target.value)}
            >
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
          );
        } else if (key === 'type' && props.type) {
          return (
            <select
              id={`prop-${key}`}
              value={value}
              onChange={(e) => updateProp(key, e.target.value)}
            >
              <option value="text">text</option>
              <option value="password">password</option>
              <option value="email">email</option>
              <option value="number">number</option>
            </select>
          );
        } else {
          return (
            <input
              id={`prop-${key}`}
              type="text"
              value={value}
              onChange={(e) => updateProp(key, e.target.value)}
            />
          );
        }
      default:
        return <span>Cannot edit this prop type</span>;
    }
  };

  // Function to update a specific prop
  const updateProp = (key: string, value: any) => {
    setProps((prevProps) => ({
      ...prevProps,
      [key]: value
    }));
  };

  return (
    <div className="component-preview-container">
      <div className="preview-render">
        {renderComponent()}
      </div>
      
      {isEditingProps ? (
        renderPropEditor()
      ) : (
        <button 
          className="edit-props-button"
          onClick={() => setIsEditingProps(true)}
        >
          Customize Props
        </button>
      )}

      <style>{`
        .component-preview-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .preview-render {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100px;
          padding: 1rem;
        }
        
        .edit-props-button {
          background-color: var(--theme-accent);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          align-self: center;
          font-size: 0.9rem;
        }
        
        .prop-editor {
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 6px;
          padding: 1rem;
        }
        
        .prop-editor h4 {
          margin-top: 0;
          margin-bottom: 1rem;
        }
        
        .prop-fields {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }
        
        .prop-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .prop-field label {
          font-size: 0.9rem;
          color: var(--theme-text-light);
        }
        
        .prop-field input, 
        .prop-field select {
          padding: 0.4rem;
          border: 1px solid var(--theme-divider);
          border-radius: 4px;
          background-color: var(--theme-bg);
          color: var(--theme-text);
        }
        
        .prop-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        
        .done-button, 
        .reset-button {
          padding: 0.4rem 0.75rem;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
        }
        
        .done-button {
          background-color: var(--theme-accent);
          color: white;
        }
        
        .reset-button {
          background-color: transparent;
          border: 1px solid var(--theme-divider);
        }
      `}</style>
    </div>
  );
} 