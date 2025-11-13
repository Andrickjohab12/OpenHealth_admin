"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Download, Filter, RefreshCw, Users, MapPin, Clock } from "lucide-react"

// Datos mock para el heatmap
const mockHeatmapData = [
  { lat: 32.7157, lng: -117.1611, intensity: 0.9 }, // Downtown
  { lat: 32.7208, lng: -117.1525, intensity: 0.7 }, // City College
  { lat: 32.7112, lng: -117.1602, intensity: 0.8 }, // Gaslamp
  { lat: 32.7081, lng: -117.1699, intensity: 0.6 }, // Seaport Village
  { lat: 32.7343, lng: -117.1447, intensity: 0.5 }, // Balboa Park
  { lat: 32.7163, lng: -117.1693, intensity: 0.7 }, // Santa Fe Depot
  { lat: 32.7076, lng: -117.1570, intensity: 0.4 }, // Petco Park
  { lat: 32.7139, lng: -117.1731, intensity: 0.6 }, // Embarcadero
]

export function HeatmapView() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [heatmapConfig, setHeatmapConfig] = useState({
    radius: 25,
    blur: 15,
    opacity: 0.7
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      drawHeatmap()
    }, 1000)

    return () => clearTimeout(timer)
  }, [heatmapConfig])

  const drawHeatmap = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar canvas
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Limpiar canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Dibujar puntos del heatmap
    mockHeatmapData.forEach(point => {
      const x = (point.lng + 117.18) / 0.04 * rect.width
      const y = (32.75 - point.lat) / 0.08 * rect.height

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, heatmapConfig.radius)
      gradient.addColorStop(0, `rgba(255, 0, 0, ${heatmapConfig.opacity * point.intensity})`)
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(x - heatmapConfig.radius, y - heatmapConfig.radius, heatmapConfig.radius * 2, heatmapConfig.radius * 2)
    })

    // Aplicar blur
    ctx.filter = `blur(${heatmapConfig.blur}px)`
    ctx.globalCompositeOperation = 'screen'
    ctx.filter = 'none'
  }

  const exportData = () => {
    const csvContent = [
      ['Latitude', 'Longitude', 'Intensity', 'Users Estimated'],
      ...mockHeatmapData.map(point => [
        point.lat,
        point.lng,
        point.intensity,
        Math.round(point.intensity * 1000)
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `san-diego-heatmap-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="relative h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg z-10">
          <div className="flex items-center gap-2 text-lg">
            <RefreshCw className="w-6 h-6 animate-spin" />
            Loading heatmap data...
          </div>
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-lg"
          />
          
          {/* Controles del heatmap */}
          <div className="absolute top-4 left-4 flex flex-col gap-3">
            <Card className="p-4 bg-background/95 backdrop-blur-sm w-64">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Heatmap Controls</h3>
                  <Button size="sm" variant="outline" onClick={exportData}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Radius: {heatmapConfig.radius}px</label>
                  <Slider
                    value={[heatmapConfig.radius]}
                    onValueChange={([value]) => setHeatmapConfig(prev => ({ ...prev, radius: value }))}
                    min={10}
                    max={50}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Blur: {heatmapConfig.blur}px</label>
                  <Slider
                    value={[heatmapConfig.blur]}
                    onValueChange={([value]) => setHeatmapConfig(prev => ({ ...prev, blur: value }))}
                    min={5}
                    max={25}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Opacity: {heatmapConfig.opacity}</label>
                  <Slider
                    value={[heatmapConfig.opacity]}
                    onValueChange={([value]) => setHeatmapConfig(prev => ({ ...prev, opacity: value }))}
                    min={0.1}
                    max={1}
                    step={0.1}
                  />
                </div>
              </div>
            </Card>

            {/* Estadísticas rápidas */}
            <Card className="p-3 bg-background/95 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">8,500+ users</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-sm">8 hotspots</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Last 30 days</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Leyenda */}
          <Card className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm">
            <div className="p-3">
              <h3 className="text-sm font-medium mb-2">Activity Intensity</h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Low</span>
                <span>High</span>
              </div>
              <div 
                className="h-3 rounded-md w-48"
                style={{
                  background: 'linear-gradient(to right, #2166ac, #4393c3, #92c5de, #d1e5f0, #f7f7f7, #fddbc7, #f4a582, #d6604d, #b2182b)'
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>0.5</span>
                <span>1.0</span>
              </div>
            </div>
          </Card>

          {/* Hotspots destacados */}
          <Card className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm w-64">
            <div className="p-3">
              <h3 className="text-sm font-medium mb-2">Top Hotspots</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Downtown Core</span>
                  <Badge variant="secondary">90%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Gaslamp Quarter</span>
                  <Badge variant="secondary">80%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">City College</span>
                  <Badge variant="secondary">70%</Badge>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}