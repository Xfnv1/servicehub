"use client"

import { useServiceCategories } from "@/hooks/use-database"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

export function CategoriesSection() {
  const { categories, loading } = useServiceCategories()
  const router = useRouter()

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/servicos?categoria=${categoryName.toLowerCase()}`)
  }

  if (loading) {
    return (
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="text-center p-4 md:p-6 rounded-lg">
                <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full" />
                <Skeleton className="h-6 w-24 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

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
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="text-center p-4 md:p-6 rounded-lg hover:shadow-lg transition-shadow cursor-pointer bg-gray-50 md:bg-transparent hover:bg-gray-50"
            >
              <div className={`text-4xl md:text-6xl mb-2 md:mb-4`}>{category.emoji || "🔧"}</div>
              <h3 className="text-lg md:text-2xl font-semibold text-gray-900 mb-1 md:mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
