import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Wind, Trophy, RotateCcw } from 'lucide-react';
import './EndScreen.css';

const EndScreen = ({ onRestart }) => {
  return (
    <motion.div
      className="end-screen-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="end-screen-card"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
      >
        <motion.div
          className="end-trophy"
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Trophy size={64} className="trophy-icon" />
        </motion.div>

        <motion.h1
          className="end-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Eletrólise Concluída!
        </motion.h1>

        <motion.p
          className="end-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Parabéns! Você separou a água com sucesso em seus componentes.
        </motion.p>

        <motion.div
          className="end-results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="result-item hydrogen">
            <Flame size={32} />
            <span className="result-name">Hidrogênio (H₂)</span>
            <span className="result-desc">Gás inflamável no cátodo (−)</span>
          </div>
          <div className="result-separator">+</div>
          <div className="result-item oxygen">
            <Wind size={32} />
            <span className="result-name">Oxigênio (O₂)</span>
            <span className="result-desc">Gás vital no ânodo (+)</span>
          </div>
        </motion.div>

        <motion.p
          className="end-equation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          2H₂O → 2H₂ + O₂
        </motion.p>

        <motion.button
          className="end-restart-button"
          onClick={onRestart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={18} />
          Jogar Novamente
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default EndScreen;
