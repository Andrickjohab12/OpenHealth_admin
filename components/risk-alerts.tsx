"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CloudRain, Thermometer, Wind, Plus, MapPin, Clock } from "lucide-react"

interface Alert {
  id: number
  type: "storm" | "heat" | "cold" | "flood" | "other"
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  location: string
  date: string
  time: string
  active: boolean
}

export function RiskAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: "heat",
      title: "Ola de Calor Extremo",
      description:
        "Se esperan temperaturas superiores a 105°F durante los próximos 3 días. Se recomienda buscar refugio con aire acondicionado.",
      severity: "critical",
      location: "Todo San Diego",
      date: "2025-01-14",
      time: "10:00 AM",
      active: true,
    },
    {
      id: 2,
      type: "storm",
      title: "Tormenta Intensa",
      description:
        "Se pronostica lluvia fuerte y vientos de hasta 50 mph. Evitar áreas bajas propensas a inundaciones.",
      severity: "high",
      location: "Centro de San Diego",
      date: "2025-01-16",
      time: "06:00 PM",
      active: true,
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: "storm",
    title: "",
    description: "",
    severity: "medium",
    location: "",
    date: "",
    time: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAlert: Alert = {
      id: Date.now(),
      type: formData.type as Alert["type"],
      title: formData.title,
      description: formData.description,
      severity: formData.severity as Alert["severity"],
      location: formData.location,
      date: formData.date,
      time: formData.time,
      active: true,
    }
    setAlerts([newAlert, ...alerts])
    setFormData({ type: "storm", title: "", description: "", severity: "medium", location: "", date: "", time: "" })
    setShowForm(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "critical":
        return "Critical"
      case "high":
        return "High"
      case "medium":
        return "Medium"
      case "low":
        return "Low"
      default:
        return severity
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "storm":
        return <CloudRain className="w-6 h-6" />
      case "heat":
        return <Thermometer className="w-6 h-6" />
      case "cold":
        return <Wind className="w-6 h-6" />
      default:
        return <AlertTriangle className="w-6 h-6" />
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "storm":
        return "Storm"
      case "heat":
        return "Heat"
      case "cold":
        return "Cold"
      case "flood":
        return "Flood"
      default:
        return "Other"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-balance">Risk Alerts</h2>
          <p className="text-muted-foreground mt-1">Manage emergency alerts in San Diego</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          New Alert
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Issue New Alert</CardTitle>
            <CardDescription>Notify the community about risk events</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="alertType">Alert Type</Label>
                  <select
                    id="alertType"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="storm">Storm</option>
                    <option value="heat">Heat Wave</option>
                    <option value="cold">Extreme Cold</option>
                    <option value="flood">Flood</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity</Label>
                  <select
                    id="severity"
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alertTitle">Alert Title</Label>
                <Input
                  id="alertTitle"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alertDescription">Description</Label>
                <Textarea
                  id="alertDescription"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="alertLocation">Location</Label>
                  <Input
                    id="alertLocation"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alertDate">Date</Label>
                  <Input
                    id="alertDate"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alertTime">Time</Label>
                  <Input
                    id="alertTime"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Issue Alert</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`border-l-4 ${alert.severity === "critical" ? "border-l-destructive" : alert.severity === "high" ? "border-l-orange-500" : "border-l-yellow-500"}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${alert.severity === "critical" ? "bg-destructive/10 text-destructive" : alert.severity === "high" ? "bg-orange-100 text-orange-600" : "bg-yellow-100 text-yellow-600"}`}
                  >
                    {getTypeIcon(alert.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl text-pretty">{alert.title}</CardTitle>
                      <Badge className={getSeverityColor(alert.severity)}>{getSeverityText(alert.severity)}</Badge>
                      <Badge variant="outline">{getTypeText(alert.type)}</Badge>
                    </div>
                    <CardDescription className="text-base text-pretty">{alert.description}</CardDescription>
                  </div>
                </div>
                {alert.active && <Badge className="bg-secondary text-secondary-foreground">Active</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{alert.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(alert.date).toLocaleDateString("es-ES")} - {alert.time}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
