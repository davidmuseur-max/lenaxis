import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Shield, TrendingDown, Clock, MapPin, Calendar, ExternalLink, RefreshCw, CheckCircle, Zap, Eye, Bell, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Scenario {
  titre: string;
  type: string;
  date: string;
  lieu: string;
  description: string;
  cout_millions_euros: number | null;
  consequences: string;
  url_source: string;
}

interface ScenariosData {
  [sector: string]: Scenario[];
}

// Modules LENAXIS qui auraient pu prévenir/limiter chaque type de sinistre
const MODULES_BY_TYPE: Record<string, { modules: string[]; prevention: string }> = {
  "Incendie": {
    modules: ["WATCH", "AUDIT", "ALERTES", "CRISE"],
    prevention: "Détection précoce via capteurs IoT, audits de conformité incendie, alertes automatiques et plan de crise activé"
  },
  "Explosion": {
    modules: ["WATCH", "CORE", "AUDIT", "ALERTES", "CRISE"],
    prevention: "Veille ATEX, cartographie des zones à risque, audits de conformité, alertes automatiques"
  },
  "Pollution": {
    modules: ["WATCH", "CORE", "ALERTES", "DASHBOARD"],
    prevention: "Surveillance environnementale, cartographie des rejets, alertes seuils dépassés"
  },
  "Fuite": {
    modules: ["WATCH", "CORE", "ALERTES"],
    prevention: "Détection de fuites en temps réel, cartographie des canalisations, alertes automatiques"
  },
  "Rejet": {
    modules: ["WATCH", "ALERTES", "DASHBOARD"],
    prevention: "Surveillance des émissions, alertes dépassement seuils, tableaux de bord environnementaux"
  },
  "Accident": {
    modules: ["WATCH", "AUDIT", "ALERTES", "CRISE"],
    prevention: "Veille sécurité, audits de prévention, alertes incidents, gestion de crise"
  },
  "Incident": {
    modules: ["WATCH", "AUDIT", "ALERTES"],
    prevention: "Veille continue, audits préventifs, système d'alertes multicanal"
  }
};

// Estimation du pourcentage de réduction du sinistre avec LENAXIS
const REDUCTION_ESTIMATES: Record<string, { min: number; max: number }> = {
  "Incendie": { min: 40, max: 70 },
  "Explosion": { min: 50, max: 80 },
  "Pollution": { min: 30, max: 60 },
  "Fuite": { min: 45, max: 75 },
  "Rejet": { min: 35, max: 65 },
  "Accident": { min: 40, max: 70 },
  "Incident": { min: 30, max: 60 }
};

interface SimulateurSinistreProps {
  sector: string;
  companySize: string;
  onBack?: () => void;
}

export default function SimulateurSinistre({ sector, companySize, onBack }: SimulateurSinistreProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    // Charger les scénarios depuis le fichier JSON
    fetch('/data/aria_scenarios.json')
      .then(res => res.json())
      .then((data: ScenariosData) => {
        const sectorScenarios = data[sector] || data['industrie'] || [];
        setScenarios(sectorScenarios);
        if (sectorScenarios.length > 0) {
          // Sélectionner un scénario aléatoire avec coût si possible
          const withCost = sectorScenarios.filter(s => s.cout_millions_euros);
          const selected = withCost.length > 0 
            ? withCost[Math.floor(Math.random() * withCost.length)]
            : sectorScenarios[0];
          setCurrentScenario(selected);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [sector]);

  const refreshScenario = () => {
    if (scenarios.length > 1) {
      const others = scenarios.filter(s => s !== currentScenario);
      const newScenario = others[Math.floor(Math.random() * others.length)];
      setCurrentScenario(newScenario);
      setShowAnalysis(false);
    }
  };

  const getReduction = () => {
    if (!currentScenario) return { min: 40, max: 70 };
    return REDUCTION_ESTIMATES[currentScenario.type] || REDUCTION_ESTIMATES["Incident"];
  };

  const getModulesInfo = () => {
    if (!currentScenario) return MODULES_BY_TYPE["Incident"];
    return MODULES_BY_TYPE[currentScenario.type] || MODULES_BY_TYPE["Incident"];
  };

  const calculateSavings = () => {
    if (!currentScenario?.cout_millions_euros) return null;
    const reduction = getReduction();
    const avgReduction = (reduction.min + reduction.max) / 2 / 100;
    return {
      original: currentScenario.cout_millions_euros,
      saved: currentScenario.cout_millions_euros * avgReduction,
      percentage: Math.round((reduction.min + reduction.max) / 2)
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F2A47]"></div>
      </div>
    );
  }

  if (!currentScenario) {
    return (
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-yellow-800">Aucun scénario disponible pour ce secteur.</p>
        </CardContent>
      </Card>
    );
  }

  const modulesInfo = getModulesInfo();
  const savings = calculateSavings();

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F2A47]" style={{ fontFamily: 'Poppins' }}>
            Simulation de Sinistre Évité
          </h2>
          <p className="text-gray-600 mt-1">
            Cas réel issu de la base ARIA (BARPI) - Accidents industriels en France
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={refreshScenario} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Autre exemple
        </Button>
      </div>

      {/* Scénario de sinistre */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={currentScenario.titre}
      >
        <Card className="border-l-4 border-red-500 bg-red-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                    {currentScenario.type.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">Sinistre réel</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentScenario.titre}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {currentScenario.lieu}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {currentScenario.date}
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {currentScenario.description.slice(0, 400)}
                  {currentScenario.description.length > 400 && "..."}
                </p>
                
                {currentScenario.cout_millions_euros && (
                  <div className="mt-4 p-3 bg-red-100 rounded-lg">
                    <p className="text-red-800 font-semibold">
                      💰 Coût du sinistre : {currentScenario.cout_millions_euros.toLocaleString()} millions d'euros
                    </p>
                  </div>
                )}

                {currentScenario.url_source && (
                  <a 
                    href={currentScenario.url_source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-3"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Voir la fiche ARIA complète
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bouton d'analyse */}
      {!showAnalysis && (
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-[#0F2A47] hover:bg-[#1a3d5c]"
            onClick={() => setShowAnalysis(true)}
          >
            <Shield className="mr-2 h-5 w-5" />
            Voir comment LENAXIS aurait pu éviter ce sinistre
          </Button>
        </div>
      )}

      {/* Analyse LENAXIS */}
      <AnimatePresence>
        {showAnalysis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            {/* Solution LENAXIS */}
            <Card className="border-l-4 border-emerald-500 bg-emerald-50/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-3">
                      Comment LENAXIS aurait prévenu ou limité ce sinistre
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {modulesInfo.prevention}
                    </p>
                    
                    {/* Modules recommandés */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Modules LENAXIS activés :</p>
                      <div className="flex flex-wrap gap-2">
                        {modulesInfo.modules.map(module => (
                          <span 
                            key={module}
                            className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium flex items-center gap-1"
                          >
                            {module === "WATCH" && <Eye className="h-3 w-3" />}
                            {module === "ALERTES" && <Bell className="h-3 w-3" />}
                            {module === "AUDIT" && <CheckCircle className="h-3 w-3" />}
                            {module === "CRISE" && <AlertTriangle className="h-3 w-3" />}
                            {module === "DASHBOARD" && <BarChart3 className="h-3 w-3" />}
                            {module === "CORE" && <Zap className="h-3 w-3" />}
                            LENAXIS {module}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Timeline de prévention */}
                    <div className="bg-white rounded-lg p-4 border border-emerald-200">
                      <p className="text-sm font-medium text-gray-600 mb-3">Timeline de détection LENAXIS :</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                          <div>
                            <p className="font-medium text-gray-800">J-30 : Détection précoce</p>
                            <p className="text-sm text-gray-600">LENAXIS WATCH identifie les signaux faibles</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                          <div>
                            <p className="font-medium text-gray-800">J-15 : Audit de conformité</p>
                            <p className="text-sm text-gray-600">LENAXIS AUDIT génère un plan d'action correctif</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                          <div>
                            <p className="font-medium text-gray-800">J-1 : Alerte automatique</p>
                            <p className="text-sm text-gray-600">LENAXIS ALERTES notifie les responsables</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                          <div>
                            <p className="font-medium text-green-700">Sinistre évité ou fortement limité</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Économies estimées */}
            {savings && (
              <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                        <TrendingDown className="h-5 w-5" />
                        Estimation du sinistre évité
                      </h3>
                      <p className="text-blue-100 text-sm">
                        Basé sur les retours d'expérience LENAXIS
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">
                        {savings.saved.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M€
                      </p>
                      <p className="text-blue-100 text-sm">
                        économisés ({savings.percentage}% de réduction)
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-sm">
                      <span>Coût initial du sinistre :</span>
                      <span className="line-through opacity-70">{savings.original.toLocaleString()} M€</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Coût résiduel avec LENAXIS :</span>
                      <span className="font-semibold">
                        {(savings.original - savings.saved).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M€
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Source */}
            <p className="text-xs text-gray-500 text-center">
              Source : Base ARIA (BARPI) - Bureau d'Analyse des Risques et Pollutions Industriels - Ministère de la Transition Écologique
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
