"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Plus, Utensils, Heart } from "lucide-react"

interface Event {
  id: number
  title: string
  type: "food" | "medical" | "clothing" | "other"
  date: string
  time: string
  location: string
  description: string
  capacity: number
  registered: number
}

export function EventManager() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Distribución de Comida",
      type: "food",
      date: "2025-01-15",
      time: "12:00 PM",
      location: "Refugio Central San Diego",
      description: "Almuerzo comunitario para personas sin hogar",
      capacity: 200,
      registered: 145,
    },
    {
      id: 2,
      title: "Chequeo Médico Gratuito",
      type: "medical",
      date: "2025-01-18",
      time: "09:00 AM",
      location: "Hope Haven",
      description: "Atención médica básica y distribución de medicamentos",
      capacity: 50,
      registered: 38,
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "food",
    date: "",
    time: "",
    location: "",
    description: "",
    capacity: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEvent: Event = {
      id: Date.now(),
      title: formData.title,
      type: formData.type as Event["type"],
      date: formData.date,
      time: formData.time,
      location: formData.location,
      description: formData.description,
      capacity: Number.parseInt(formData.capacity),
      registered: 0,
    }
    setEvents([...events, newEvent])
    setFormData({ title: "", type: "food", date: "", time: "", location: "", description: "", capacity: "" })
    setShowForm(false)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "food":
        return "bg-secondary text-secondary-foreground"
      case "medical":
        return "bg-destructive text-destructive-foreground"
      case "clothing":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "food":
        return "Food"
      case "medical":
        return "Medical"
      case "clothing":
        return "Clothing"
      case "other":
        return "Other"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-balance">Event Management</h2>
          <p className="text-muted-foreground mt-1">Organize help events for the community</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          New Event
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
            <CardDescription>Complete help event information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="food">Food</option>
                    <option value="medical">Medical</option>
                    <option value="clothing">Clothing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Event</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-pretty">{event.title}</CardTitle>
                  <Badge className={`mt-2 ${getTypeColor(event.type)}`}>{getTypeText(event.type)}</Badge>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {event.type === "food" ? (
                    <Utensils className="w-5 h-5 text-primary" />
                  ) : (
                    <Heart className="w-5 h-5 text-primary" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString("es-ES")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-pretty">{event.location}</span>
              </div>
              <p className="text-sm text-muted-foreground text-pretty pt-2 border-t">{event.description}</p>
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Registered
                  </span>
                  <span className="font-semibold">
                    {event.registered}/{event.capacity}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-secondary rounded-full h-2 transition-all"
                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
