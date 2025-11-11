"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Phone, Users, Bed, Plus, Pencil, Trash2 } from "lucide-react"

interface Shelter {
  id: number
  name: string
  address: string
  phone: string
  capacity: number
  currentOccupancy: number
  status: "active" | "full" | "maintenance"
}

export function ShelterManager() {
  const [shelters, setShelters] = useState<Shelter[]>([
    {
      id: 1,
      name: "Refugio Central San Diego",
      address: "123 Main St, San Diego, CA 92101",
      phone: "(619) 555-0100",
      capacity: 150,
      currentOccupancy: 142,
      status: "active",
    },
    {
      id: 2,
      name: "Hope Haven",
      address: "456 Park Ave, San Diego, CA 92102",
      phone: "(619) 555-0200",
      capacity: 80,
      currentOccupancy: 80,
      status: "full",
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    capacity: "",
    currentOccupancy: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newShelter: Shelter = {
      id: Date.now(),
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      capacity: Number.parseInt(formData.capacity),
      currentOccupancy: Number.parseInt(formData.currentOccupancy),
      status: "active",
    }
    setShelters([...shelters, newShelter])
    setFormData({ name: "", address: "", phone: "", capacity: "", currentOccupancy: "" })
    setShowForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-secondary text-secondary-foreground"
      case "full":
        return "bg-destructive text-destructive-foreground"
      case "maintenance":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "full":
        return "Full"
      case "maintenance":
        return "Maintenance"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-balance">Shelter Management</h2>
          <p className="text-muted-foreground mt-1">Manage shelters in San Diego</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          New Shelter
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Register New Shelter</CardTitle>
            <CardDescription>Complete shelter information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Shelter Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Total Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentOccupancy">Current Occupancy</Label>
                  <Input
                    id="currentOccupancy"
                    type="number"
                    value={formData.currentOccupancy}
                    onChange={(e) => setFormData({ ...formData, currentOccupancy: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Shelter</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {shelters.map((shelter) => (
          <Card key={shelter.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{shelter.name}</CardTitle>
                    <Badge className={`mt-2 ${getStatusColor(shelter.status)}`}>{getStatusText(shelter.status)}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{shelter.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{shelter.phone}</span>
              </div>
              <div className="pt-3 border-t space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Bed className="w-4 h-4" />
                    Capacity
                  </span>
                  <span className="font-semibold">{shelter.capacity} beds</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Occupancy
                  </span>
                  <span className="font-semibold">{shelter.currentOccupancy} people</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium">
                      {Math.round((shelter.currentOccupancy / shelter.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${(shelter.currentOccupancy / shelter.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
