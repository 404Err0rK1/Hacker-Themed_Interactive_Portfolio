import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{project.name}</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 hover:text-blue-300"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-4">
          <p className="text-gray-300 mb-2">{project.description}</p>
          <div className="mb-2">
            <strong className="text-gray-400">Technologies:</strong>
            <div className="flex flex-wrap mt-1">
              {project.techs.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-blue-300 px-2 py-1 rounded mr-2 mb-2 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center"
          >
            View Project <ExternalLink className="ml-1" size={16} />
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
