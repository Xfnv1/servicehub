"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface RatingSystemProps {
  serviceId: string
  providerId: string
  providerName: string
  serviceName: string
  isServiceCompleted: boolean
  onRatingSubmitted?: () => void
}

export function RatingSystem({
  serviceId,
  providerId,
  providerName,
  serviceName,
  isServiceCompleted,
  onRatingSubmitted,
}: RatingSystemProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitRating = async () => {
    if (!isServiceCompleted) {
      toast({
        title: "Avaliação não permitida",
        description: "Você só pode avaliar após a conclusão do serviço.",
        variant: "destructive",
      })
      return
    }

    if (rating === 0) {
      toast({
        title: "Selecione uma avaliação",
        description: "Por favor, selecione uma nota de 1 a 5 estrelas.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simular envio da avaliação
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Aqui você salvaria no Firebase/banco de dados
      const ratingData = {
        serviceId,
        providerId,
        rating,
        comment,
        timestamp: new Date(),
        clientId: "current-user-id", // Pegar do contexto de autenticação
      }

      console.log("Rating submitted:", ratingData)

      toast({
        title: "Avaliação enviada!",
        description: "Obrigado pelo seu feedback. Sua avaliação ajuda outros usuários.",
      })

      // Reset form
      setRating(0)
      setComment("")

      if (onRatingSubmitted) {
        onRatingSubmitted()
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar avaliação",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isServiceCompleted) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Avaliação Pendente</h3>
          <p className="text-gray-500 mb-4">
            Você poderá avaliar {providerName} após a conclusão do serviço de {serviceName}.
          </p>
          <Badge variant="secondary">Aguardando conclusão</Badge>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avaliar Serviço</CardTitle>
        <p className="text-gray-600">
          Como foi sua experiência com {providerName} no serviço de {serviceName}?
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Stars */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 mb-3">Sua avaliação:</p>
          <div className="flex justify-center space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoverRating || rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            {rating === 0 && "Clique nas estrelas para avaliar"}
            {rating === 1 && "Muito ruim"}
            {rating === 2 && "Ruim"}
            {rating === 3 && "Regular"}
            {rating === 4 && "Bom"}
            {rating === 5 && "Excelente"}
          </p>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comentário (opcional)</label>
          <Textarea
            placeholder="Conte como foi sua experiência com este prestador..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">{comment.length}/500 caracteres</p>
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmitRating} disabled={rating === 0 || isSubmitting} className="w-full">
          {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
        </Button>
      </CardContent>
    </Card>
  )
}
