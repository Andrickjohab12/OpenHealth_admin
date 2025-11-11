"use client"

import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)

  const handleLogin = (username: string, password: string) => {
    if (username === "123" && password === "123") {
      setIsAuthenticated(true)
      setUser({ username: "Admin", role: "Director de Refugio" })
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <AdminDashboard user={user} onLogout={handleLogout} />
}
