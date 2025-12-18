"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, XCircle, Sparkles } from "lucide-react"

interface ClassificationResult {
  keywords: string[]
  is_for_kids: boolean
}

export function PodcastChecker() {
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ClassificationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const extractKeywords = (text: string): string[] => {
    // Remove common words and punctuation
    const commonWords = [
      "the",
      "a",
      "an",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
      "from",
      "is",
      "are",
      "was",
      "were",
      "be",
      "been",
      "being",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "could",
      "should",
      "may",
      "might",
      "can",
      "about",
      "it",
      "this",
      "that",
      "these",
      "those",
    ]

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !commonWords.includes(word))

    // Get unique words and limit to most relevant
    const uniqueWords = [...new Set(words)]
    return uniqueWords.slice(0, 15)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const keywords = extractKeywords(description)

      if (keywords.length === 0) {
        setError("Please provide a more detailed podcast description")
        setLoading(false)
        return
      }

      console.log("[v0] Extracted keywords:", keywords)

      const response = await fetch("https://api-podcast.tawasol.tn/classify-podcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keywords }),
      })

      if (!response.ok) {
        throw new Error("Failed to classify podcast")
      }

      const data: ClassificationResult = await response.json()
      console.log("[v0] Classification result:", data)
      setResult(data)
    } catch (err) {
      setError("Failed to analyze podcast. Please try again.")
      console.error("[v0] Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Check Podcast Content</CardTitle>
          <CardDescription>
            Paste a podcast description or title below and we'll analyze if it's suitable for kids
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Example: A fun adventure podcast about happy animals learning science and making friends in the forest. Educational content for young listeners."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] resize-none"
                disabled={loading}
              />
            </div>
            <Button type="submit" disabled={loading || !description.trim()} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Podcast
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Classification Result</CardTitle>
              {result.is_for_kids ? (
                <Badge className="bg-primary text-primary-foreground">
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  Kid-Friendly
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="mr-1 h-4 w-4" />
                  Not for Kids
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Recommendation</h4>
              {result.is_for_kids ? (
                <p className="text-foreground">
                  This podcast appears to contain positive, educational, and age-appropriate content suitable for
                  children.
                </p>
              ) : (
                <p className="text-foreground">
                  This podcast may contain content that is not appropriate for children. Please review it yourself
                  before sharing with kids.
                </p>
              )}
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Keywords Analyzed</h4>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
