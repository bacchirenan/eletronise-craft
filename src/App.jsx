import React, { useState, useEffect, useRef } from 'react';
import Element from './components/Element';
import { ELEMENTS } from './data/elements';
import { RECIPES, SPECIAL_RESULTS } from './data/recipes';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [discoveredIds, setDiscoveredIds] = useState(['WATER', 'ENERGY', 'MINERALS', 'AIR']);
  const [workspaceElements, setWorkspaceElements] = useState([]);
  const [newDiscovery, setNewDiscovery] = useState(null);
  const workspaceRef = useRef(null);

  // Carregar progresso salvo (opcional por enquanto)

  const handleSidebarClick = (element) => {
    const newElement = {
      ...element,
      instanceId: Math.random().toString(36).substr(2, 9),
      x: 50 + Math.random() * 50,
      y: 50 + Math.random() * 50
    };
    setWorkspaceElements([...workspaceElements, newElement]);
  };

  const handleDragEnd = (instanceId, info) => {
    const draggedEl = workspaceElements.find(el => el.instanceId === instanceId);
    if (!draggedEl) return;

    // Atualiza posição
    const newElements = workspaceElements.map(el => {
      if (el.instanceId === instanceId) {
        return { ...el, x: el.x + info.offset.x, y: el.y + info.offset.y };
      }
      return el;
    });

    // Checa colisões/combinações
    const currentEl = newElements.find(el => el.instanceId === instanceId);
    let combined = false;

    for (let otherEl of newElements) {
      if (otherEl.instanceId === instanceId) continue;

      const dist = Math.sqrt(
        Math.pow(currentEl.x - otherEl.x, 2) + Math.pow(currentEl.y - otherEl.y, 2)
      );

      if (dist < 60) {
        // Tenta combinar
        const ingredients = [currentEl.id, otherEl.id].sort();
        const recipe = RECIPES.find(r =>
          r.ingredients.length === 2 &&
          r.ingredients.slice().sort().every((val, index) => val === ingredients[index])
        );

        if (recipe) {
          const resultId = recipe.result;
          const resultElement = ELEMENTS[resultId];

          // Se for uma descoberta nova
          if (!discoveredIds.includes(resultId)) {
            setDiscoveredIds([...discoveredIds, resultId]);
            setNewDiscovery(resultElement);
          }

          // Cria o novo elemento no lugar da combinação
          const combinedElement = {
            ...resultElement,
            instanceId: Math.random().toString(36).substr(2, 9),
            x: (currentEl.x + otherEl.x) / 2,
            y: (currentEl.y + otherEl.y) / 2
          };

          // Remove os dois antigos e adiciona o novo
          // Se houver resultados especiais (como H2 + O2)
          if (SPECIAL_RESULTS[resultId]) {
            const extraResults = SPECIAL_RESULTS[resultId].map((id, idx) => ({
              ...ELEMENTS[id],
              instanceId: Math.random().toString(36).substr(2, 9),
              x: combinedElement.x + (idx * 40),
              y: combinedElement.y
            }));

            // Adiciona descoberta dos extras também
            const newDiscovered = [...discoveredIds, resultId];
            SPECIAL_RESULTS[resultId].forEach(id => {
              if (!newDiscovered.includes(id)) newDiscovered.push(id);
            });
            setDiscoveredIds(newDiscovered);

            setWorkspaceElements(
              newElements
                .filter(el => el.instanceId !== instanceId && el.instanceId !== otherEl.instanceId)
                .concat(extraResults)
            );
          } else {
            setWorkspaceElements(
              newElements
                .filter(el => el.instanceId !== instanceId && el.instanceId !== otherEl.instanceId)
                .concat(combinedElement)
            );
          }
          combined = true;
          break;
        }
      }
    }

    if (!combined) {
      setWorkspaceElements(newElements);
    }
  };

  // Lógica para combinação tripla (específica para o Kit)
  // Pode ser implementada depois se o usuário quiser mais complexidade.
  // Por enquanto vamos simplificar a receita do Kit para ser Bateria + Fio + Eletrodo em passos.

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1>Eletrólise Craft</h1>
        <div className="elements-list">
          {discoveredIds.map(id => (
            <Element
              key={id}
              element={ELEMENTS[id]}
              onClick={handleSidebarClick}
            />
          ))}
        </div>
      </aside>

      <main className="workspace" ref={workspaceRef}>
        <AnimatePresence>
          {workspaceElements.map((el) => (
            <motion.div
              key={el.instanceId}
              drag
              dragMomentum={false}
              onDragEnd={(e, info) => handleDragEnd(el.instanceId, info)}
              className="workspace-element"
              initial={{ scale: 0 }}
              animate={{ scale: 1, x: el.x, y: el.y }}
              exit={{ scale: 0 }}
              style={{ position: 'absolute', left: 0, top: 0 }}
            >
              <Element element={el} />
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {newDiscovery && (
          <motion.div
            className="discovery-popup"
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <h2>Nova Descoberta!</h2>
            <Element element={newDiscovery} style={{ margin: '0 auto 20px', width: '120px' }} />
            <p style={{ color: '#7d8590' }}>{newDiscovery.description}</p>
            <button
              onClick={() => setNewDiscovery(null)}
              style={{
                marginTop: '30px',
                padding: '10px 30px',
                background: '#3b82f6',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Continuar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
