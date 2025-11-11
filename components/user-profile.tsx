"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserCircle, Mail, Phone, MapPin, Briefcase, Calendar, Shield, Edit } from "lucide-react"

interface UserProfileProps {
  user: { username: string; role: string } | null
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold text-balance">User Profile</h2>
        <p className="text-muted-foreground mt-1">Personal information and system role</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <UserCircle className="w-12 h-12 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{user?.username || "Admin"}</CardTitle>
                <CardDescription className="text-base mt-1">System Administrator</CardDescription>
              </div>
            </div>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">admin@openhelp.org</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">(619) 555-0100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">San Diego, California</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Shelter Role</p>
                  <p className="font-medium">{user?.role || "Shelter Director"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p className="font-medium">June 15, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Access Level</p>
                  <Badge className="mt-1 bg-primary text-primary-foreground">Full Administrator</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsibilities Card */}
      <Card>
        <CardHeader>
          <CardTitle>Job Responsibilities</CardTitle>
          <CardDescription>Work areas and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Shelter Management</h4>
              <p className="text-sm text-muted-foreground">
                Complete administration of all shelters and their resources
              </p>
            </div>
            <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
              <h4 className="font-semibold text-secondary mb-2">Event Coordination</h4>
              <p className="text-sm text-muted-foreground">Planning and execution of community help events</p>
            </div>
            <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Staff Management</h4>
              <p className="text-sm text-muted-foreground">Staff supervision and shift assignment</p>
            </div>
            <div className="p-4 bg-chart-3/5 rounded-lg border border-chart-3/20">
              <h4 className="font-semibold text-chart-3 mb-2">Emergency Alerts</h4>
              <p className="text-sm text-muted-foreground">Issue and manage risk alerts for the community</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Summary</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Shelters Registered</span>
              <Badge variant="secondary">5</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Events Created</span>
              <Badge variant="secondary">12</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Users Registered</span>
              <Badge variant="secondary">47</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Alerts Issued</span>
              <Badge variant="secondary">8</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
