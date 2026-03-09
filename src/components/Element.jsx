import React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

const Element = ({ element, onClick, isGhost = false, style = {} }) => {
    const Icon = LucideIcons[element.icon] || LucideIcons.HelpCircle;

    return (
        <motion.div
            className={`element-card ${isGhost ? 'ghost' : ''}`}
            layoutId={element.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
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
        </motion.div>
    );
};

export default Element;
