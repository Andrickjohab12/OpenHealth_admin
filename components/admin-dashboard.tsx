"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  Calendar,
  Users,
  AlertTriangle,
  Bed,
  LogOut,
  Home,
  UserCircle,
  Plus,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react"
import { ShelterManager } from "@/components/shelter-manager"
import { EventManager } from "@/components/event-manager"
import { UserManager } from "@/components/user-manager"
import { RiskAlerts } from "@/components/risk-alerts"
import { ShelterDetails } from "@/components/shelter-details"
import { UserProfile } from "@/components/user-profile"

interface AdminDashboardProps {
  user: { username: string; role: string } | null
  onLogout: () => void
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState("dashboard")

  const renderView = () => {
    switch (activeView) {
      case "shelters":
        return <ShelterManager />
      case "events":
        return <EventManager />
      case "users":
        return <UserManager />
      case "alerts":
        return <RiskAlerts />
      case "shelter-details":
        return <ShelterDetails />
      case "profile":
        return <UserProfile user={user} />
      default:
        return <DashboardOverview onNavigate={setActiveView} />
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">OpenHelp Admin</h1>
              <p className="text-xs text-primary-foreground/80">San Diego, California</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setActiveView("profile")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <UserCircle className="w-5 h-5 mr-2" />
              {user?.username}
            </Button>
            <Button
              variant="ghost"
              onClick={onLogout}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            <Button
              variant={activeView === "dashboard" ? "default" : "ghost"}
              onClick={() => setActiveView("dashboard")}
              className="whitespace-nowrap"
            >
              <Activity className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={activeView === "shelters" ? "default" : "ghost"}
              onClick={() => setActiveView("shelters")}
              className="whitespace-nowrap"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Shelters
            </Button>
            <Button
              variant={activeView === "shelter-details" ? "default" : "ghost"}
              onClick={() => setActiveView("shelter-details")}
              className="whitespace-nowrap"
            >
              <Bed className="w-4 h-4 mr-2" />
              Shelter Details
            </Button>
            <Button
              variant={activeView === "events" ? "default" : "ghost"}
              onClick={() => setActiveView("events")}
              className="whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </Button>
            <Button
              variant={activeView === "users" ? "default" : "ghost"}
              onClick={() => setActiveView("users")}
              className="whitespace-nowrap"
            >
              <Users className="w-4 h-4 mr-2" />
              Users
            </Button>
            <Button
              variant={activeView === "alerts" ? "default" : "ghost"}
              onClick={() => setActiveView("alerts")}
              className="whitespace-nowrap"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alerts
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{renderView()}</main>
    </div>
  )
}

function DashboardOverview({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">Control Panel</h2>
        <p className="text-muted-foreground mt-1">OpenHelp system overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shelters</CardTitle>
            <Building2 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2 since last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">People Served</CardTitle>
            <Users className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">847</div>
            <p className="text-xs text-muted-foreground mt-1">
              <Clock className="inline h-3 w-3 mr-1" />
              Today: 156 people
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
            <Bed className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">234</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 450 total beds</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground mt-1">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("shelters")}>
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Register Shelter</CardTitle>
            <CardDescription>Add a new shelter to the system</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("events")}>
          <CardHeader>
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-secondary" />
            </div>
            <CardTitle>Create Event</CardTitle>
            <CardDescription>Schedule a help event</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("alerts")}>
          <CardHeader>
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <CardTitle>Issue Alert</CardTitle>
            <CardDescription>Notify about risk events</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
