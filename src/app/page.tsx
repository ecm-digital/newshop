import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            {/* Custom SHE Logo */}
            <div className="mx-auto mb-6 w-32 h-32 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-4xl font-bold text-white">SHE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4">
              SHE Shop
            </h1>
            <p className="text-xl sm:text-2xl text-amber-700 mb-8 max-w-3xl mx-auto">
              Twórz unikalne, spersonalizowane produkty z naszym zaawansowanym kreatorem
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalizacja</h3>
            <p className="text-amber-700">Dostosuj każdy detal swojego produktu do swoich preferencji</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Szybkość</h3>
            <p className="text-amber-700">Intuicyjny interfejs pozwala na szybkie tworzenie projektów</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Jakość</h3>
            <p className="text-amber-700">Najwyższej jakości materiały i precyzyjne wykonanie</p>
          </div>
        </div>

        

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Gotowy na rozpoczęcie?</h2>
          <p className="text-amber-700 mb-6">Stwórz swój pierwszy spersonalizowany produkt już dziś!</p>
          <Link
            href="/kreator-v2"
            className="inline-block px-8 py-4 bg-amber-700 text-white rounded-2xl font-semibold text-lg transition-all duration-200 hover:bg-opacity-90 shadow-lg hover:scale-105"
          >
            🚀 Rozpocznij Projektowanie
          </Link>
        </div>
      </div>
    </div>
  );
}
