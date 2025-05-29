import React, { useState } from 'react';
import { Search, ArrowRight, RotateCcw, Info } from 'lucide-react';
import ArrayDisplay from './ArrayDisplay';
import { useBinarySearch } from '../utils/binarySearch';

interface BinarySearchVisualizerProps {
  initialArray?: number[];
}

const BinarySearchVisualizer: React.FC<BinarySearchVisualizerProps> = ({ 
  initialArray = [2, 5, 8, 12, 16, 23, 38, 42, 56, 72, 91] 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    searchTarget,
    setSearchTarget,
    startSearch,
    goToNextStep,
    resetSearch,
    currentStep,
    isSearching,
    isLastStep,
    searchCompleted,
    steps,
    currentStepIndex
  } = useBinarySearch(initialArray);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Busca Binária</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-slate-500 hover:text-slate-700 transition-colors"
            aria-label="Informações sobre busca binária"
          >
            <Info size={20} />
          </button>
        </div>
        <p className="text-slate-600 mb-6">Veja como o algoritmo de busca binária funciona, passo a passo!</p>
        
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-slate-500 hover:text-slate-700 p-1"
                aria-label="Fechar modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4 pr-8">Sobre a Busca Binária</h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600">
                <p className="leading-relaxed">
                  A busca binária é um algoritmo eficiente para encontrar um elemento em uma lista ordenada. 
                  Sua complexidade de tempo é O(log n), o que a torna muito mais rápida que a busca linear O(n).
                </p>
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">Como funciona:</h3>
                  <ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 pl-1">
                    <li className="leading-relaxed">O algoritmo começa comparando o elemento do meio da lista com o valor alvo</li>
                    <li className="leading-relaxed">Se o valor alvo for igual ao elemento do meio, a busca termina</li>
                    <li className="leading-relaxed">Se o valor alvo for menor que o elemento do meio, a busca continua na metade inferior da lista</li>
                    <li className="leading-relaxed">Se o valor alvo for maior que o elemento do meio, a busca continua na metade superior da lista</li>
                    <li className="leading-relaxed">O processo se repete até encontrar o elemento ou esgotar a lista</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">Vantagens:</h3>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    <li className="leading-relaxed">Extremamente eficiente para listas grandes</li>
                    <li className="leading-relaxed">Reduz o espaço de busca pela metade a cada iteração</li>
                    <li className="leading-relaxed">Ideal para estruturas de dados ordenadas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Array visualization */}
        <div className="mt-10 mb-10">
          <ArrayDisplay array={initialArray} currentStep={currentStep} />
        </div>
        
        {/* Search controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label htmlFor="searchInput" className="block text-sm font-medium text-slate-700 mb-1">
              Número de busca:
            </label>
            <input
              id="searchInput"
              type="number"
              value={searchTarget}
              onChange={(e) => setSearchTarget(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Informe um número"
              disabled={isSearching}
            />
          </div>
          
          <div className="flex items-end gap-2">
            {!isSearching ? (
              <button
                onClick={startSearch}
                disabled={searchTarget === ''}
                className="flex items-center justify-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                <Search size={18} />
                <span>Iniciar Busca</span>
              </button>
            ) : (
              <>
                <button
                  onClick={goToNextStep}
                  disabled={searchCompleted}
                  className="flex items-center justify-center gap-1 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 transition-colors"
                >
                  <ArrowRight size={18} />
                  <span>Próximo Passo</span>
                </button>
                <button
                  onClick={resetSearch}
                  className="flex items-center justify-center gap-1 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
                >
                  <RotateCcw size={18} />
                  <span>Reiniciar</span>
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Step information and Range Popup */}
        {isSearching && (
          <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-slate-700">Passo Autual: {currentStepIndex + 1} de {steps.length}</h3>
              {searchCompleted && (
                <span className="text-sm px-2 py-1 bg-slate-200 rounded-full text-slate-700">
                  Busca Concluída
                </span>
              )}
            </div>
            
            <div className="space-y-2 text-sm">
              {currentStep && (
                <>
                  <div className="bg-blue-50 p-3 rounded-md mb-4">
                    <p className="text-blue-800">
                      Procurando na faixa [{currentStep.low} até {currentStep.high}]
                      {currentStep.mid >= 0 && (
                        <span>
                          {' '}• Verificando valor na posição {currentStep.mid}: {initialArray[currentStep.mid]}
                          {currentStep.mid >= 0 && searchTarget !== '' && (
                            <span>
                              {initialArray[currentStep.mid] === searchTarget 
                                ? ' (Encontrado!)' 
                                : initialArray[currentStep.mid] > searchTarget 
                                  ? ' (Acima, vamos procurar do meio para baixo)' 
                                  : ' (Abaixo, vamos procurar do meio para cima)'}
                            </span>
                          )}
                        </span>
                      )}
                    </p>
                  </div>
                  <p><span className="font-medium">Menor:</span> {currentStep.low}</p>
                  <p><span className="font-medium">Média:</span> {currentStep.mid >= 0 ? currentStep.mid : 'N/A'}</p>
                  <p><span className="font-medium">Maior:</span> {currentStep.high}</p>
                  
                  {currentStep.found && (
                    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
                      ✓ Número {searchTarget} encontrado na posição {currentStep.foundIndex}!
                    </div>
                  )}
                  
                  {isLastStep && !currentStep.found && (
                    <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
                      ✗ Número {searchTarget} não encontrado no array!
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Legend */}
        <div className="mt-8">
          <h3 className="font-medium text-slate-700 mb-2">Legenda:</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-100 rounded"></div>
              <span className="text-sm text-slate-600">Faixa de busca corrente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-amber-400 rounded"></div>
              <span className="text-sm text-slate-600">Indice do meio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-slate-300 rounded"></div>
              <span className="text-sm text-slate-600">Menor/Maior indices</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded"></div>
              <span className="text-sm text-slate-600">Elemento encontrado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-slate-100 rounded"></div>
              <span className="text-sm text-slate-600">Fora da faixa de busca</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;