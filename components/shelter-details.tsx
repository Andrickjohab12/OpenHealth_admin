"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bed, Users, Utensils, UserCheck, Clock, Activity, TrendingUp, Calendar } from "lucide-react"

export function ShelterDetails() {
  const shelterData = {
    name: "Refugio Central San Diego",
    totalBeds: 150,
    occupiedBeds: 142,
    totalPeople: 156,
    breakfasts: 145,
    lunches: 152,
    dinners: 148,
    activeStaff: 12,
    totalStaff: 15,
    operatingHours: "24/7",
    checkInTime: "16:00",
    checkOutTime: "08:00",
  }

  const weeklyStats = [
    { day: "Lun", occupancy: 138 },
    { day: "Mar", occupancy: 145 },
    { day: "Mié", occupancy: 142 },
    { day: "Jue", occupancy: 148 },
    { day: "Vie", occupancy: 151 },
    { day: "Sáb", occupancy: 149 },
    { day: "Dom", occupancy: 142 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">{shelterData.name}</h2>
        <p className="text-muted-foreground mt-1">Real-time information dashboard</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beds</CardTitle>
            <Bed className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {shelterData.occupiedBeds}/{shelterData.totalBeds}
            </div>
            <Progress value={(shelterData.occupiedBeds / shelterData.totalBeds) * 100} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {shelterData.totalBeds - shelterData.occupiedBeds} beds available
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">People</CardTitle>
            <Users className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{shelterData.totalPeople}</div>
            <p className="text-xs text-muted-foreground mt-2">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8 since yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <UserCheck className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {shelterData.activeStaff}/{shelterData.totalStaff}
            </div>
            <p className="text-xs text-muted-foreground mt-2">On current shift</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours</CardTitle>
            <Clock className="h-5 w-5 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{shelterData.operatingHours}</div>
            <p className="text-xs text-muted-foreground mt-2">Check-in: {shelterData.checkInTime}</p>
          </CardContent>
        </Card>
      </div>

      {/* Meals Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            Meal Services (Today)
          </CardTitle>
          <CardDescription>Number of meals served</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Breakfasts</span>
                <span className="text-2xl font-bold text-primary">{shelterData.breakfasts}</span>
              </div>
              <Progress value={(shelterData.breakfasts / shelterData.totalPeople) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Lunches</span>
                <span className="text-2xl font-bold text-secondary">{shelterData.lunches}</span>
              </div>
              <Progress value={(shelterData.lunches / shelterData.totalPeople) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Dinners</span>
                <span className="text-2xl font-bold text-accent">{shelterData.dinners}</span>
              </div>
              <Progress value={(shelterData.dinners / shelterData.totalPeople) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Occupancy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Weekly Occupancy
          </CardTitle>
          <CardDescription>Last 7 days trend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyStats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium w-12">{stat.day}</span>
                  <span className="text-muted-foreground flex-1 ml-4">
                    <Progress value={(stat.occupancy / shelterData.totalBeds) * 100} className="h-3" />
                  </span>
                  <span className="font-semibold w-20 text-right">{stat.occupancy} people</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Staff Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Staff Information
          </CardTitle>
          <CardDescription>Staff on current service</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Morning Shift (6:00 AM - 2:00 PM)</p>
                <p className="text-sm text-muted-foreground">5 active workers</p>
              </div>
              <Badge className="bg-secondary text-secondary-foreground">On duty</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Evening Shift (2:00 PM - 10:00 PM)</p>
                <p className="text-sm text-muted-foreground">4 active workers</p>
              </div>
              <Badge className="bg-secondary text-secondary-foreground">On duty</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Night Shift (10:00 PM - 6:00 AM)</p>
                <p className="text-sm text-muted-foreground">3 active workers</p>
              </div>
              <Badge className="bg-secondary text-secondary-foreground">On duty</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
