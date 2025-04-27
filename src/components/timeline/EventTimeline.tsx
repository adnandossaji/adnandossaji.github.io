import { useState, useEffect } from 'react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

interface EventTimelineProps {
  events: TimelineEvent[];
}

export default function EventTimeline({ events }: EventTimelineProps) {
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>(events);
  const [viewMode, setViewMode] = useState<'vertical' | 'horizontal'>('vertical');
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Listen for filter changes from the Astro component
  useEffect(() => {
    const handleFilter = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { category } = customEvent.detail;
      
      if (category === 'all') {
        setFilteredEvents(events);
      } else {
        setFilteredEvents(events.filter(event => event.category === category));
      }
    };

    // Listen for view mode changes
    const handleViewChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { view } = customEvent.detail;
      setViewMode(view as 'vertical' | 'horizontal');
    };

    document.addEventListener('timelineFilter', handleFilter);
    document.addEventListener('timelineViewChange', handleViewChange);

    return () => {
      document.removeEventListener('timelineFilter', handleFilter);
      document.removeEventListener('timelineViewChange', handleViewChange);
    };
  }, [events]);

  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'rocket':
        return '🚀';
      case 'palette':
        return '🎨';
      case 'code':
        return '💻';
      case 'users':
        return '👥';
      case 'globe':
        return '🌐';
      case 'chart-line':
        return '📈';
      default:
        return '📌';
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'milestone':
        return 'var(--category-milestone, #e74c3c)';
      case 'design':
        return 'var(--category-design, #3498db)';
      case 'development':
        return 'var(--category-development, #2ecc71)';
      case 'testing':
        return 'var(--category-testing, #f39c12)';
      default:
        return 'var(--theme-accent)';
    }
  };

  return (
    <div className={`timeline-container ${viewMode}`}>
      {viewMode === 'vertical' ? (
        <div className="timeline-vertical">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div
                className="timeline-marker"
                style={{ backgroundColor: getCategoryColor(event.category) }}
              >
                <span className="timeline-icon">{getIconComponent(event.icon)}</span>
              </div>
              <div className="timeline-content">
                <span
                  className="timeline-category"
                  style={{ backgroundColor: getCategoryColor(event.category) }}
                >
                  {event.category}
                </span>
                <div className="timeline-date">{formatDate(event.date)}</div>
                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-description">{event.description}</p>
              </div>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      ) : (
        <div className="timeline-horizontal">
          <div className="timeline-line-horizontal"></div>
          <div className="timeline-events-container">
            {filteredEvents.map((event) => (
              <div key={event.id} className="timeline-item-horizontal">
                <div
                  className="timeline-marker"
                  style={{ backgroundColor: getCategoryColor(event.category) }}
                >
                  <span className="timeline-icon">{getIconComponent(event.icon)}</span>
                </div>
                <div className="timeline-content">
                  <span
                    className="timeline-category"
                    style={{ backgroundColor: getCategoryColor(event.category) }}
                  >
                    {event.category}
                  </span>
                  <div className="timeline-date">{formatDate(event.date)}</div>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .timeline-container {
          position: relative;
          margin: 2rem 0;
        }
        
        /* Vertical Timeline Styles */
        .timeline-vertical {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px 0;
        }
        
        .timeline-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 4px;
          background-color: var(--theme-divider);
          transform: translateX(-50%);
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 60px;
          width: 50%;
          box-sizing: border-box;
        }
        
        .timeline-item.left {
          padding-right: 40px;
          left: 0;
        }
        
        .timeline-item.right {
          padding-left: 40px;
          left: 50%;
        }
        
        .timeline-marker {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 0 0 4px var(--theme-bg), 0 0 0 8px rgba(0,0,0,0.1);
        }
        
        .timeline-item.left .timeline-marker {
          right: -20px;
        }
        
        .timeline-item.right .timeline-marker {
          left: -20px;
        }
        
        .timeline-icon {
          font-size: 1.2rem;
        }
        
        .timeline-content {
          background-color: var(--theme-bg);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          position: relative;
          transition: transform 0.3s;
        }
        
        .timeline-content:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        
        .timeline-category {
          position: absolute;
          top: -10px;
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          color: white;
          font-size: 0.8rem;
          text-transform: capitalize;
        }
        
        .timeline-item.left .timeline-category {
          right: 20px;
        }
        
        .timeline-item.right .timeline-category {
          left: 20px;
        }
        
        .timeline-date {
          color: var(--theme-text-light);
          font-size: 0.9rem;
          margin-top: 15px;
          margin-bottom: 5px;
        }
        
        .timeline-title {
          margin: 0 0 10px 0;
          font-size: 1.2rem;
        }
        
        .timeline-description {
          margin: 0;
          line-height: 1.5;
        }
        
        /* Horizontal Timeline Styles */
        .timeline-horizontal {
          position: relative;
          padding: 60px 0 30px;
          overflow-x: auto;
        }
        
        .timeline-line-horizontal {
          position: absolute;
          top: 125px;
          left: 0;
          right: 0;
          height: 4px;
          background-color: var(--theme-divider);
        }
        
        .timeline-events-container {
          display: flex;
          min-width: 100%;
        }
        
        .timeline-item-horizontal {
          position: relative;
          min-width: 250px;
          max-width: 300px;
          margin-right: 60px;
        }
        
        .timeline-item-horizontal .timeline-marker {
          position: absolute;
          top: 65px;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .timeline-item-horizontal .timeline-content {
          margin-top: 40px;
        }
        
        .timeline-item-horizontal .timeline-category {
          left: 20px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .vertical .timeline-line {
            left: 30px;
          }
          
          .vertical .timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 0;
            left: 0;
          }
          
          .vertical .timeline-item.left .timeline-marker,
          .vertical .timeline-item.right .timeline-marker {
            left: 10px;
          }
          
          .vertical .timeline-item.left .timeline-category,
          .vertical .timeline-item.right .timeline-category {
            left: 20px;
            right: auto;
          }
          
          .horizontal .timeline-events-container {
            padding-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
} 