"use client"

export function CategoriesSection() {
  const categories = [
    {
      name: "Limpeza",
      description: "Serviços de limpeza residencial e comercial",
      icon: "🧹",
      color: "text-blue-500",
    },
    {
      name: "Reparos",
      description: "Reparos gerais e manutenção",
      icon: "🔧",
      color: "text-green-500",
    },
    {
      name: "Pintura",
      description: "Pintura residencial e comercial",
      icon: "🎨",
      color: "text-yellow-500",
    },
    {
      name: "Técnico",
      description: "Serviços técnicos especializados",
      icon: "💻",
      color: "text-purple-500",
    },
    {
      name: "Beleza",
      description: "Serviços de beleza e estética",
      icon: "✂️",
      color: "text-pink-500",
    },
    {
      name: "Educação",
      description: "Aulas particulares e educação",
      icon: "🎓",
      color: "text-blue-600",
    },
  ]

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Categorias Populares</h2>
          <p className="text-lg md:text-xl text-gray-600">Explore os serviços mais procurados na sua região</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="text-center p-4 md:p-6 rounded-lg hover:shadow-lg transition-shadow cursor-pointer bg-gray-50 md:bg-transparent hover:bg-gray-50"
            >
              <div className={`text-4xl md:text-6xl mb-2 md:mb-4 ${category.color}`}>{category.icon}</div>
              <h3 className="text-lg md:text-2xl font-semibold text-gray-900 mb-1 md:mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
