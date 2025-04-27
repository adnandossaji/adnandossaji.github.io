import { useState, useEffect } from 'react';
import ResourceCard from './ResourceCard';
import type { Resource } from '../../types';

// Import CSS
import '../../styles/resource-card.css';
import '../../styles/resource-list.css';

interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all unique categories
  const categories = ['All', ...new Set(resources.map(resource => resource.category))];

  // Filter resources based on search query and active category
  useEffect(() => {
    let filtered = resources;
    
    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(resource => resource.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.description.toLowerCase().includes(query) || 
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredResources(filtered);
  }, [resources, activeCategory, searchQuery]);

  return (
    <div className="resource-list-container">
      <div className="resource-filters">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="search-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-filter ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {filteredResources.length > 0 ? (
        <div className="resource-grid">
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-grid-item">
              <ResourceCard resource={resource} />
            </div>
          ))}
        </div>
      ) : (
        <div className="no-resources">
          <p>No resources found matching your criteria.</p>
          <button 
            className="reset-filters"
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
} 