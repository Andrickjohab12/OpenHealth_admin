"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { UserCircle, Phone, Calendar, MapPin, Plus, Search } from "lucide-react"

interface User {
  id: number
  name: string
  age: number
  phone: string
  registrationDate: string
  currentLocation: string
  status: "active" | "inactive"
  needs: string[]
}

export function UserManager() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      age: 45,
      phone: "(619) 555-0301",
      registrationDate: "2025-01-10",
      currentLocation: "Refugio Central",
      status: "active",
      needs: ["Alimentos", "Médico"],
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      phone: "(619) 555-0302",
      registrationDate: "2025-01-12",
      currentLocation: "Hope Haven",
      status: "active",
      needs: ["Ropa", "Empleo"],
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-balance">User Management</h2>
          <p className="text-muted-foreground mt-1">Manage homeless profiles</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          New User
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Register New User</CardTitle>
            <CardDescription>Complete the person's profile</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="userName">Full Name</Label>
                  <Input id="userName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userAge">Age</Label>
                  <Input id="userAge" type="number" required />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="userPhone">Phone</Label>
                  <Input id="userPhone" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userLocation">Current Location</Label>
                  <Input id="userLocation" />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save User</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <UserCircle className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user.age} years</p>
                </div>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Registered: {new Date(user.registrationDate).toLocaleDateString("en-US")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-pretty">{user.currentLocation}</span>
              </div>
              <div className="pt-3 border-t">
                <p className="text-sm font-medium mb-2">Needs:</p>
                <div className="flex flex-wrap gap-2">
                  {user.needs.map((need, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {need}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
