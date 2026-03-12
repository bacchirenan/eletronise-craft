import React, { useState, useEffect, useRef } from 'react';
import Element from './components/Element';
import { ELEMENTS } from './data/elements';
import { RECIPES, SPECIAL_RESULTS } from './data/recipes';
import { HINTS } from './data/hints';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import StartScreen from './components/StartScreen';
import EndScreen from './components/EndScreen';

function App() {
  const [discoveredIds, setDiscoveredIds] = useState(['WATER', 'ENERGY', 'MINERALS']);
  const [selectedElements, setSelectedElements] = useState([]);
  const [newDiscovery, setNewDiscovery] = useState(null);
  const [isCombining, setIsCombining] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [failureCount, setFailureCount] = useState(0);

  useEffect(() => {
    if (discoveredIds.includes('ELECTROLYSIS_DONE')) {
      const timer = setTimeout(() => {
        setShowEndScreen(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [discoveredIds]);

  const handleElementClick = (element) => {
    if (selectedElements.length >= 2 || isCombining) return;

    // Criamos uma nova instância com ID único para permitir Metal + Metal
    const newElementInstance = {
      ...element,
      instanceId: Math.random().toString(36).substr(2, 9)
    };

    const newSelection = [...selectedElements, newElementInstance];
    setSelectedElements(newSelection);

    if (newSelection.length === 2) {
      setIsCombining(true);

      // Descobrimos qual é o próximo objetivo baseado na dica atual
      const nextGoal = HINTS.find(h => h.requirement(discoveredIds));

      setTimeout(() => {
        const ingredients = [newSelection[0].id, newSelection[1].id].sort();
        const recipe = RECIPES.find(r =>
          r.ingredients.length === 2 &&
          r.ingredients.slice().sort().every((val, index) => val === ingredients[index])
        );

        // A fusão só ocorre se existir a receita E se o resultado for o que a dica está pedindo (progressão linear)
        if (recipe && recipe.result === nextGoal?.goalId) {
          const resultId = recipe.result;
          const resultElement = ELEMENTS[resultId];

          if (!discoveredIds.includes(resultId)) {
            setDiscoveredIds(prev => [...prev, resultId]);
            setNewDiscovery(resultElement);
            setFailureCount(0);
          }

          if (SPECIAL_RESULTS[resultId]) {
            setDiscoveredIds(prev => {
              const newIds = [...prev];
              SPECIAL_RESULTS[resultId].forEach(id => {
                if (!newIds.includes(id)) newIds.push(id);
              });
              return newIds;
            });
          }

          setSelectedElements([]);
        } else {
          // Se não for a hora certa ou a receita estiver errada, os elementos voltam para a barra
          setFailureCount(prev => prev + 1);
          setTimeout(() => {
            setSelectedElements([]);
          }, 800);
        }
        setIsCombining(false);
      }, 600);
    }
  };

  const currentHint = HINTS.find(h => h.requirement(discoveredIds));

  // Lógica de ajuda: se errar 4 vezes, destaca os ingredientes necessários
  const getHighlightedIds = () => {
    if (failureCount < 4 || !currentHint?.goalId) return [];
    const recipe = RECIPES.find(r => r.result === currentHint.goalId);
    return recipe ? recipe.ingredients : [];
  };

  const highlightedIds = getHighlightedIds();

  const handleReset = () => {
    if (window.confirm('Deseja reiniciar o jogo? Todo o progresso será perdido.')) {
      setDiscoveredIds(['WATER', 'ENERGY', 'MINERALS']);
      setSelectedElements([]);
      setNewDiscovery(null);
      setShowEndScreen(false);
      setFailureCount(0);
    }
  };

  const handleRestart = () => {
    setDiscoveredIds(['WATER', 'ENERGY', 'MINERALS']);
    setSelectedElements([]);
    setNewDiscovery(null);
    setShowEndScreen(false);
    setFailureCount(0);
  };

  return (
    <div className="app-container">
      <AnimatePresence>
        {showStartScreen && (
          <StartScreen onStart={() => setShowStartScreen(false)} />
        )}
        {showEndScreen && (
          <EndScreen onRestart={handleRestart} />
        )}
      </AnimatePresence>

      <header className="game-header">
        <div className="header-left">
          <h1>Eletrólise Craft</h1>
          <div className="progress-counter">
            <span className="count-label">Faltam {Object.keys(ELEMENTS).length - discoveredIds.length} elementos</span>
          </div>
        </div>
        <button className="reset-button" onClick={handleReset} title="Reiniciar Jogo">
          <RotateCcw size={20} />
        </button>
      </header>

      <main className="workspace">
        <div className="fusion-zone">
          {/* Lado Esquerdo (Primeiro Elemento) */}
          <div className="fusion-slot left">
            <AnimatePresence>
              {selectedElements[0] && (
                <motion.div
                  key={selectedElements[0].instanceId}
                  initial={{ opacity: 0, x: -50, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0, y: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Element element={selectedElements[0]} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Centro (Personagem de Dicas) */}
          <div className="fusion-character">
            <AnimatePresence mode="wait">
              {currentHint && (
                <motion.div
                  key={currentHint.image}
                  className="hint-container-inner"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={currentHint.image}
                    alt={currentHint.message}
                    className="hint-image"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Lado Direito (Segundo Elemento) */}
          <div className="fusion-slot right">
            <AnimatePresence>
              {selectedElements[1] && (
                <motion.div
                  key={selectedElements[1].instanceId}
                  initial={{ opacity: 0, x: 50, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0, y: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Element element={selectedElements[1]} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="elements-dock">
        <div className="dock-content">
          {discoveredIds.map(id => (
            <Element
              key={id}
              element={ELEMENTS[id]}
              onClick={() => handleElementClick(ELEMENTS[id])}
              isHighlighted={highlightedIds.includes(id)}
            />
          ))}
        </div>
      </footer>

      <AnimatePresence>
        {newDiscovery && (
          <motion.div
            className="discovery-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="discovery-popup"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{ borderColor: newDiscovery.color }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: newDiscovery.color }}>
                Nova Descoberta!
              </h2>
              <Element element={newDiscovery} style={{ margin: '0 auto 30px', width: '140px', padding: '20px' }} />
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '40px', lineHeight: '1.6' }}>
                {newDiscovery.description}
              </p>
              <button
                onClick={() => setNewDiscovery(null)}
                style={{
                  padding: '15px 50px',
                  background: newDiscovery.color,
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  transition: 'transform 0.2s, filter 0.2s',
                  boxShadow: `0 4px 20px ${newDiscovery.color}66`
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.filter = 'brightness(1)';
                }}
              >
                Continuar Lab
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
