import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Zap, Droplets } from 'lucide-react';
import './StartScreen.css';

const StartScreen = ({ onStart }) => {
  return (
    <motion.div
      className="start-screen-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="start-screen-card"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -40, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
      >
        {/* Logo / Ícone */}
        <motion.div
          className="start-icon-row"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Droplets className="start-icon blue" size={36} />
          <Zap className="start-icon yellow" size={36} />
          <FlaskConical className="start-icon purple" size={36} />
        </motion.div>

        <motion.h1
          className="start-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Eletrólise Craft
        </motion.h1>

        <motion.p
          className="start-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Aprenda como a água se separa em Hidrogênio e Oxigênio!
        </motion.p>

        <motion.div
          className="start-instructions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="instruction-item">
            <span className="instruction-number">1</span>
            <span>Clique em dois elementos para combiná-los</span>
          </div>
          <div className="instruction-item">
            <span className="instruction-number">2</span>
            <span>Siga as dicas do personagem no centro</span>
          </div>
          <div className="instruction-item">
            <span className="instruction-number">3</span>
            <span>Descubra todos os elementos para completar a eletrólise!</span>
          </div>
        </motion.div>

        <motion.button
          className="start-button"
          onClick={onStart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Iniciar Experimento ⚗️
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default StartScreen;
