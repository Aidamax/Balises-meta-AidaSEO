"use client";

import { useState } from "react";

export default function MetaGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Ajout des états pour la génération de suggestions
  const [keyword, setKeyword] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate the meta tags based on user input
  const generateMetaTags = () => {
    let metaTags = "";
    
    // Basic meta tags only
    if (title) metaTags += `<title>${title}</title>\n`;
    if (description) metaTags += `<meta name="description" content="${description}" />\n`;
    if (keywords) metaTags += `<meta name="keywords" content="${keywords}" />\n`;
    
    return metaTags;
  };

  // Copy meta tags to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset all fields
  const resetFields = () => {
    setTitle("");
    setDescription("");
    setKeywords("");
    setKeyword("");
    setBusinessDescription("");
    setSuggestions([]);
  };

  // Fill with sample data
  const fillSampleData = () => {
    setTitle("Exemple de Page Web - Votre Entreprise");
    setDescription("Une description captivante de votre page web optimisée pour les moteurs de recherche, entre 150 et 160 caractères.");
    setKeywords("seo, meta tags, optimisation, moteurs de recherche, balises meta");
  };

  // Génération intelligente de suggestions de balises méta
  const generateSuggestions = () => {
    if (!keyword && !businessDescription) {
      alert("Veuillez saisir au moins un mot-clé ou une description de votre activité");
      return;
    }

    setIsGenerating(true);
    
    // Traitement intelligent du mot-clé et de la description
    const processedKeyword = keyword.trim().toLowerCase();
    const processedDescription = businessDescription.trim();
    
    // Extraction des éléments clés de la description
    const mainActivity = processedKeyword || extractMainActivity(processedDescription);
    const location = extractLocation(processedKeyword) || extractLocation(processedDescription) || "";
    
    setTimeout(() => {
      const newSuggestions = [];
      
      // Générer des titres intelligents (max 60 caractères)
      const titleSuggestions = [
        generateTitle(mainActivity, location, 1),
        generateTitle(mainActivity, location, 2),
        generateTitle(mainActivity, location, 3),
        generateTitle(mainActivity, location, 4),
        generateTitle(mainActivity, location, 5),
      ];
      
      // Générer des descriptions intelligentes (max 155-160 caractères)
      const descriptionSuggestions = [
        generateDescription(mainActivity, location, processedDescription, 1),
        generateDescription(mainActivity, location, processedDescription, 2),
        generateDescription(mainActivity, location, processedDescription, 3),
        generateDescription(mainActivity, location, processedDescription, 4),
        generateDescription(mainActivity, location, processedDescription, 5),
      ];
      
      // Créer les suggestions finales
      for (let i = 0; i < 5; i++) {
        newSuggestions.push({
          title: titleSuggestions[i],
          description: descriptionSuggestions[i]
        });
      }
      
      setSuggestions(newSuggestions);
      setIsGenerating(false);
    }, 1500);
  };
  
  // Fonction pour extraire l'activité principale d'une description
  const extractMainActivity = (description) => {
    const activityKeywords = [
      "photographe", "consultant", "coach", "expert", "spécialiste",
      "agence", "entreprise", "service", "professionnel", "studio"
    ];
    
    const words = description.toLowerCase().split(/\s+/);
    
    for (const keyword of activityKeywords) {
      if (words.includes(keyword)) {
        // Récupérer le mot et potentiellement le mot suivant
        const index = words.indexOf(keyword);
        if (index + 1 < words.length && !words[index + 1].match(/^(de|du|des|pour|et|à|en)$/)) {
          return keyword + " " + words[index + 1];
        }
        return keyword;
      }
    }
    
    // Si aucun mot-clé d'activité n'est trouvé, prendre les 2-3 premiers mots significatifs
    return words.slice(0, 3).join(" ");
  };
  
  // Fonction pour extraire une localisation de la description ou du mot-clé
  const extractLocation = (text) => {
    if (!text) return "";
    
    // Liste non exhaustive de villes françaises courantes
    const cities = ["paris", "lyon", "marseille", "bordeaux", "lille", "toulouse", "nantes", 
                   "strasbourg", "montpellier", "nice", "rennes", "grenoble", "toulon", "dijon"];
    
    const words = text.toLowerCase().split(/\s+/);
    
    for (const city of cities) {
      if (words.includes(city)) {
        return city.charAt(0).toUpperCase() + city.slice(1); // Première lettre en majuscule
      }
    }
    
    return "";
  };
  
  // Fonction pour générer un titre optimisé
  const generateTitle = (activity, location, variant) => {
    const capitalizedActivity = activity.charAt(0).toUpperCase() + activity.slice(1);
    const locationStr = location ? ` à ${location}` : "";
    
    // Différentes variantes de titres (max 60 caractères)
    const templates = [
      `${capitalizedActivity}${locationStr} | Services professionnels`,
      `${capitalizedActivity} professionnel${locationStr} - Services de qualité`,
      `Meilleur ${activity}${locationStr} | Services personnalisés`,
      `${capitalizedActivity}${locationStr} - Expertise et qualité garanties`,
      `Services de ${activity}${locationStr} | Professionnalisme`
    ];
    
    let title = templates[variant - 1];
    
    // Tronquer si nécessaire
    if (title.length > 60) {
      title = title.substring(0, 57) + "...";
    }
    
    return title;
  };
  
  // Fonction pour générer une description optimisée
  const generateDescription = (activity, location, originalDescription, variant) => {
    const capitalizedActivity = activity.charAt(0).toUpperCase() + activity.slice(1);
    const locationStr = location ? ` à ${location}` : "";
    
    // Extraire un élément unique de la description originale s'il y en a une
    let uniqueElement = "";
    if (originalDescription) {
      const descWords = originalDescription.split(" ");
      if (descWords.length > 5) {
        uniqueElement = descWords.slice(0, Math.min(8, descWords.length)).join(" ");
        if (uniqueElement.length > 40) {
          uniqueElement = uniqueElement.substring(0, 40);
        }
      }
    }
    
    // Différentes variantes de descriptions (max 160 caractères)
    const templates = [
      `Services professionnels de ${activity}${locationStr}. Expertise et qualité pour tous vos projets. ${uniqueElement ? `${uniqueElement}. ` : ""}Contactez-nous pour un devis personnalisé !`,
      
      `Découvrez nos prestations de ${activity}${locationStr}. Solutions sur mesure et accompagnement personnalisé pour répondre à tous vos besoins. Satisfaction garantie.`,
      
      `${capitalizedActivity}${locationStr} certifié avec des années d'expérience. Qualité, créativité et professionnalisme pour des résultats qui dépasseront vos attentes.`,
      
      `Besoin d'un ${activity} professionnel${locationStr} ? Nous proposons des services complets et personnalisés. ${uniqueElement ? `${uniqueElement}. ` : ""}Prix compétitifs et qualité garantie.`,
      
      `Expert en ${activity}${locationStr} à votre service. ${uniqueElement ? `${uniqueElement}. ` : ""}Approche personnalisée, tarifs transparents et résultats exceptionnels. Contactez-nous dès aujourd'hui !`
    ];
    
    let description = templates[variant - 1];
    
    // Tronquer si nécessaire
    if (description.length > 160) {
      description = description.substring(0, 157) + "...";
    }
    
    return description;
  };

  // Appliquer une suggestion
  const applySuggestion = (suggestion) => {
    setTitle(suggestion.title);
    setDescription(suggestion.description);
  };

  return (
    <div className="flex flex-col p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Générateur de Balises Meta SEO</h1>
      
      {/* Section pour la génération de suggestions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg mb-8 border border-blue-100">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Générer des suggestions de balises meta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot-clé principal</label>
            <input 
              type="text" 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)} 
              placeholder="Ex: photographe paris, plombier lyon"
              className="w-full p-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description de votre activité</label>
            <input 
              type="text" 
              value={businessDescription} 
              onChange={(e) => setBusinessDescription(e.target.value)} 
              placeholder="Ex: Je propose des shootings photos pour mariages"
              className="w-full p-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <button 
          onClick={generateSuggestions}
          disabled={isGenerating}
          className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        >
          {isGenerating ? "Génération en cours..." : "Générer des suggestions de balises meta"}
        </button>
      </div>
      
      {/* Affichage des suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Suggestions générées</h3>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white p-3 rounded-md border border-gray-300 hover:border-blue-400 transition-colors">
                <h4 className="font-medium text-blue-700">Suggestion {index + 1}</h4>
                <div className="my-2">
                  <p className="text-sm font-medium text-gray-600">Titre: <span className="text-gray-800">{suggestion.title}</span> <span className={`text-xs ${suggestion.title.length > 60 ? "text-red-500" : "text-green-600"}`}>({suggestion.title.length} caractères)</span></p>
                  <p className="text-sm font-medium text-gray-600 mt-1">Description: <span className="text-gray-800">{suggestion.description}</span> <span className={`text-xs ${suggestion.description.length > 160 ? "text-red-500" : "text-green-600"}`}>({suggestion.description.length} caractères)</span></p>
                </div>
                <button
                  onClick={() => applySuggestion(suggestion)}
                  className="mt-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Appliquer cette suggestion
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Balises Meta de Base</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la page</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Titre de votre page"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">Recommandé: 50-60 caractères</p>
                <p className={`text-xs font-medium ${title.length > 60 ? "text-red-500" : title.length > 50 ? "text-green-600" : "text-gray-500"}`}>
                  {title.length} caractères
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description de votre page"
                className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">Recommandé: 150-160 caractères</p>
                <p className={`text-xs font-medium ${description.length > 160 ? "text-red-500" : description.length > 145 ? "text-green-600" : "text-gray-500"}`}>
                  {description.length} caractères
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mots-clés</label>
              <input 
                type="text" 
                value={keywords} 
                onChange={(e) => setKeywords(e.target.value)} 
                placeholder="mot-clé1, mot-clé2, mot-clé3"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Séparez les mots-clés par des virgules</p>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Code des balises meta</h2>
            <div className="bg-gray-100 p-3 rounded-md overflow-x-auto max-h-64">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">{generateMetaTags()}</pre>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button 
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {copied ? "Copié !" : "Copier le code"}
              </button>
              <button 
                onClick={resetFields}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Réinitialiser
              </button>
              <button 
                onClick={fillSampleData}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Exemple de données
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Conseils pour des balises meta efficaces :</h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
          <li>La balise title est l&apos;un des facteurs SEO les plus importants - faites-la compacte et pertinente.</li>
          <li>Les meta descriptions n&apos;affectent pas directement le classement mais influencent le taux de clics.</li>
          <li>Utilisez des mots-clés naturellement, sans bourrage excessif.</li>
          <li>Gardez votre titre entre 50-60 caractères pour un affichage optimal dans les résultats de recherche.</li>
          <li>Votre meta description devrait être entre 150-160 caractères pour éviter les troncatures.</li>
        </ul>
      </div>
      
      <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-800 mb-2">Recevez plus d&apos;astuces SEO gratuites</h3>
        <p className="mb-4 text-green-700">Inscrivez-vous à notre newsletter pour recevoir des conseils exclusifs sur l&apos;optimisation de votre site web.</p>
        <form className="flex flex-col sm:flex-row gap-2" name="newsletter" netlify>
          <input 
            type="email" 
            name="email"
            placeholder="Votre email" 
            required 
            className="flex-grow p-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button 
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
          >
            S&apos;inscrire
          </button>
        </form>
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Développé par Votre Nom | <a href="https://votresite.com" className="text-blue-500 hover:underline">votresite.com</a></p>
      </footer>
    </div>
  );
}
