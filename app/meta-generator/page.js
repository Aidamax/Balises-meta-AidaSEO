'use client';

import { useState } from 'react';

export default function MetaGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [viewport, setViewport] = useState("width=device-width, initial-scale=1.0");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogUrl, setOgUrl] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [twitterImage, setTwitterImage] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Ajout des nouveaux états pour la génération de suggestions
  const [keyword, setKeyword] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate the meta tags based on user input
  const generateMetaTags = () => {
    let metaTags = "";
    
    // Basic meta tags
    if (title) metaTags += `<title>${title}</title>\n`;
    if (description) metaTags += `<meta name="description" content="${description}" />\n`;
    if (keywords) metaTags += `<meta name="keywords" content="${keywords}" />\n`;
    if (author) metaTags += `<meta name="author" content="${author}" />\n`;
    if (viewport) metaTags += `<meta name="viewport" content="${viewport}" />\n`;
    
    // Open Graph meta tags
    if (ogTitle || title) metaTags += `<meta property="og:title" content="${ogTitle || title}" />\n`;
    if (ogDescription || description) metaTags += `<meta property="og:description" content="${ogDescription || description}" />\n`;
    if (ogImage) metaTags += `<meta property="og:image" content="${ogImage}" />\n`;
    if (ogUrl) metaTags += `<meta property="og:url" content="${ogUrl}" />\n`;
    metaTags += `<meta property="og:type" content="website" />\n`;
    
    // Twitter meta tags
    metaTags += `<meta name="twitter:card" content="${twitterCard}" />\n`;
    if (twitterTitle || ogTitle || title) metaTags += `<meta name="twitter:title" content="${twitterTitle || ogTitle || title}" />\n`;
    if (twitterDescription || ogDescription || description) metaTags += `<meta name="twitter:description" content="${twitterDescription || ogDescription || description}" />\n`;
    if (twitterImage || ogImage) metaTags += `<meta name="twitter:image" content="${twitterImage || ogImage}" />\n`;
    
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
    setAuthor("");
    setViewport("width=device-width, initial-scale=1.0");
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setOgUrl("");
    setTwitterCard("summary_large_image");
    setTwitterTitle("");
    setTwitterDescription("");
    setTwitterImage("");
    setKeyword("");
    setBusinessDescription("");
    setSuggestions([]);
  };

  // Fill with sample data
  const fillSampleData = () => {
    setTitle("Exemple de Page Web - Votre Entreprise");
    setDescription("Une description captivante de votre page web optimisée pour les moteurs de recherche, entre 150 et 160 caractères.");
    setKeywords("seo, meta tags, optimisation, moteurs de recherche, balises meta");
    setAuthor("Votre Nom");
    setOgTitle("Titre attrayant pour les réseaux sociaux");
    setOgDescription("Une description plus engageante pour les partages sur les réseaux sociaux.");
    setOgImage("https://example.com/image.jpg");
    setOgUrl("https://votresite.com/votre-page");
    setTwitterTitle("Titre adapté pour Twitter");
    setTwitterDescription("Description spécifique pour Twitter, concise et attrayante.");
    setTwitterImage("https://example.com/twitter-image.jpg");
  };

  // Nouvelle fonction pour générer des suggestions de balises méta
  const generateSuggestions = () => {
    if (!keyword && !businessDescription) {
      alert("Veuillez saisir au moins un mot-clé ou une description de votre activité");
      return;
    }

    setIsGenerating(true);

    // Simulation de génération (dans une vraie application, cela pourrait être une API)
    setTimeout(() => {
      const newSuggestions = [];
      
      // Générer des titres
      const titleSuggestions = [
        `${keyword ? keyword.charAt(0).toUpperCase() + keyword.slice(1) : "Votre Entreprise"} - Services professionnels et solutions sur mesure`,
        `${businessDescription ? "Experts en " + businessDescription : "Services"} | ${keyword || "Votre Domaine"} de qualité`,
        `${keyword ? keyword.charAt(0).toUpperCase() + keyword.slice(1) : "Solutions"} innovantes pour votre entreprise | ${businessDescription || "Votre marché"}`,
        `Découvrez nos services de ${keyword || "qualité"} pour ${businessDescription || "votre entreprise"}`,
        `${keyword ? keyword.charAt(0).toUpperCase() + keyword.slice(1) : "Services"} premium - ${businessDescription || "Votre entreprise"}`
      ];
      
      // Générer des descriptions
      const descriptionSuggestions = [
        `Solutions professionnelles de ${keyword || "qualité"} adaptées à vos besoins. Experts en ${businessDescription || "notre domaine"} avec des années d'expérience pour vous accompagner dans vos projets.`,
        `Notre équipe d'experts en ${keyword || "ce domaine"} vous propose des services personnalisés pour ${businessDescription || "votre activité"}. Contactez-nous dès aujourd'hui pour un devis gratuit.`,
        `${businessDescription ? "Spécialistes en " + businessDescription : "Nous offrons"} des solutions innovantes et efficaces en matière de ${keyword || "notre spécialité"}. Qualité et satisfaction garanties.`,
        `Transformez votre approche de ${keyword || "votre activité"} avec nos services adaptés pour ${businessDescription || "votre secteur"}. Accompagnement personnalisé et résultats concrets.`,
        `Des solutions sur mesure pour optimiser vos performances en ${keyword || "votre domaine"}. Notre expertise en ${businessDescription || "notre spécialité"} au service de votre réussite.`
      ];
      
      // Générer des mots-clés
      let keywordsList = "";
      if (keyword) {
        const variations = [
          keyword,
          `${keyword} professionnel`,
          `service ${keyword}`,
          `${keyword} expert`,
          `${keyword} entreprise`,
          `meilleur ${keyword}`,
          `${keyword} sur mesure`,
          `${keyword} ${businessDescription || "personnalisé"}`
        ];
        keywordsList = variations.join(", ");
      } else if (businessDescription) {
        const words = businessDescription.split(" ").filter(word => word.length > 3);
        keywordsList = words.join(", ") + ", services, expertise, solutions, professionnels";
      }
      
      // Ajouter les suggestions
      for (let i = 0; i < 5; i++) {
        newSuggestions.push({
          title: titleSuggestions[i],
          description: descriptionSuggestions[i],
          keywords: keywordsList
        });
      }
      
      setSuggestions(newSuggestions);
      setIsGenerating(false);
    }, 1500); // Simulation de délai pour donner l'impression de génération
  };

  // Appliquer une suggestion
  const applySuggestion = (suggestion) => {
    setTitle(suggestion.title);
    setDescription(suggestion.description);
    setKeywords(suggestion.keywords);
    
    // Générer aussi des suggestions pour OG et Twitter
    setOgTitle(suggestion.title);
    setOgDescription(suggestion.description);
    setTwitterTitle(suggestion.title);
    setTwitterDescription(suggestion.description);
  };

  return (
    <div className="flex flex-col p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Générateur de Balises Meta SEO</h1>
      
      {/* Nouvelle section pour la génération de suggestions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg mb-8 border border-blue-100">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Générer des suggestions de balises meta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot-clé principal</label>
            <input 
              type="text" 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)} 
              placeholder="Ex: référencement, marketing digital, etc."
              className="w-full p-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description de votre activité</label>
            <input 
              type="text" 
              value={businessDescription} 
              onChange={(e) => setBusinessDescription(e.target.value)} 
              placeholder="Ex: agence web, consultant SEO, etc."
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
                  <p className="text-sm font-medium text-gray-600">Titre: <span className="text-gray-800">{suggestion.title}</span> <span className="text-xs text-gray-500">({suggestion.title.length} caractères)</span></p>
                  <p className="text-sm font-medium text-gray-600 mt-1">Description: <span className="text-gray-800">{suggestion.description}</span> <span className="text-xs text-gray-500">({suggestion.description.length} caractères)</span></p>
                  <p className="text-sm font-medium text-gray-600 mt-1">Mots-clés: <span className="text-gray-800">{suggestion.keywords}</span></p>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
              <input 
                type="text" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
                placeholder="Nom de l'auteur"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Viewport</label>
              <input 
                type="text" 
                value={viewport} 
                onChange={(e) => setViewport(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-700">Balises Open Graph</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OG Titre (optionnel)</label>
              <input 
                type="text" 
                value={ogTitle} 
                onChange={(e) => setOgTitle(e.target.value)} 
                placeholder="Titre pour partage social"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">Si vide, utilisera le titre principal</p>
                <p className={`text-xs font-medium ${ogTitle.length > 90 ? "text-red-500" : "text-gray-500"}`}>
                  {ogTitle.length} caractères
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OG Description (optionnel)</label>
              <textarea 
                value={ogDescription} 
                onChange={(e) => setOgDescription(e.target.value)} 
                placeholder="Description pour partage social"
                className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">Si vide, utilisera la description principale</p>
                <p className={`text-xs font-medium ${ogDescription.length > 200 ? "text-red-500" : "text-gray-500"}`}>
                  {ogDescription.length} caractères
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
              <input 
                type="text" 
                value={ogImage} 
                onChange={(e) => setOgImage(e.target.value)} 
                placeholder="https://example.com/image.jpg"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Recommandé: 1200 x 630 pixels</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OG URL</label>
              <input 
                type="text" 
                value={ogUrl} 
                onChange={(e) => setOgUrl(e.target.value)} 
                placeholder="https://votresite.com/votre-page"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Balises Twitter</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de carte Twitter</label>
              <select 
                value={twitterCard} 
                onChange={(e) => setTwitterCard(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="summary">Summary (petite image)</option>
                <option value="summary_large_image">Summary Large Image (grande image)</option>
                <option value="app">App</option>
                <option value="player">Player</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Titre (optionnel)</label>
              <input 
                type="text" 
                value={twitterTitle} 
                onChange={(e) => setTwitterTitle(e.target.value)} 
                placeholder="Titre pour Twitter"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">Si vide, utilisera le titre Open Graph ou principal</p>
                <p className={`text-xs font-medium ${twitterTitle.length > 70 ? "text-red-500" : "text-gray-500"}`}>
                  {twitterTitle.length} caractères
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Description (optionnel)</label>
              <textarea 
                value={twitterDescription} 
                onChange={(e) => setTwitterDescription(e.target.value)} 
                placeholder="Description pour Twitter"
                className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">Si vide, utilisera la description Open Graph ou principale</p>
                <p className={`text-xs font-medium ${twitterDescription.length > 200 ? "text-red-500" : "text-gray-500"}`}>
                  {twitterDescription.length} caractères
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Image URL (optionnel)</label>
              <input 
                type="text" 
                value={twitterImage} 
                onChange={(e) => setTwitterImage(e.target.value)} 
                placeholder="https://example.com/twitter-image.jpg"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Si vide, utilisera l'image Open Graph</p>
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
          <li>La balise title est l'un des facteurs SEO les plus importants - faites-la compacte et pertinente.</li>
          <li>Les meta descriptions n'affectent pas directement le classement mais influencent le taux de clics.</li>
          <li>Les images Open Graph devraient être au format 1200 x 630 pixels pour un affichage optimal.</li>
          <li>Utilisez des mots-clés naturellement, sans bourrage excessif.</li>
          <li>Personnalisez les balises selon les plateformes (Facebook vs Twitter) pour de meilleurs résultats.</li>
        </ul>
      </div>
      
      <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-800 mb-2">Recevez plus d'astuces SEO gratuites</h3>
        <p className="mb-4 text-green-700">Inscrivez-vous à notre newsletter pour recevoir des conseils exclusifs sur l'optimisation de votre site web.</p>
        <form className="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="Votre email" 
            required 
            className="flex-grow p-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button 
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
          >
            S'inscrire
          </button>
        </form>
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Développé par Votre Nom | <a href="https://votresite.com" className="text-blue-500 hover:underline">votresite.com</a></p>
      </footer>
    </div>
  );
}
