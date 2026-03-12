import React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

const Element = ({ element, onClick, isGhost = false, isHighlighted = false, style = {} }) => {
    const Icon = LucideIcons[element.icon] || LucideIcons.HelpCircle;

    return (
        <motion.div
            className={`element-card ${isGhost ? 'ghost' : ''} ${isHighlighted ? 'highlighted' : ''}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
                scale: isHighlighted ? [1, 1.1, 1] : 1,
                opacity: 1 
            }}
            transition={isHighlighted ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            } : {}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClick && onClick(element)}
            style={{
                ...style,
                borderBottom: `3px solid ${element.color}`
            }}
        >
            <Icon className="element-icon" style={{ color: element.color }} />
            <span className="element-name">{element.name}</span>
            {isHighlighted && <div className="highlight-glow" style={{ backgroundColor: element.color }} />}
        </motion.div>
    );
};

export default Element;
