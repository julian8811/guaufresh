"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Package, Settings, LogOut, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
}

interface Order {
  id: string
  date: string
  status: string
  total: number
  items: number
}

const mockOrders: Order[] = [
  { id: "ORD-001", date: "2024-01-15", status: "completed", total: 45000, items: 2 },
  { id: "ORD-002", date: "2024-02-01", status: "processing", total: 38000, items: 1 },
]

export function ProfileContent() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+57 300 123 4567",
    location: "Bogotá, Colombia",
  })

  const [editedProfile, setEditedProfile] = useState(profile)

  const handleEdit = () => {
    setEditedProfile(profile)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleLogout = () => {
    alert("Sesión cerrada correctamente")
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-3">
      {/* Profile Info */}
      <div className="lg:col-span-2">
        <div className="rounded-lg bg-card p-6 shadow-sm ring-1 ring-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-card-foreground">Información Personal</h2>
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              {isEditing ? (
                <Input
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="max-w-xs"
                />
              ) : (
                <div>
                  <p className="text-xl font-semibold text-foreground">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">Cliente desde 2024</p>
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Correo Electrónico
                </label>
                {isEditing ? (
                  <Input
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="mt-2"
                    type="email"
                  />
                ) : (
                  <p className="mt-2 text-muted-foreground">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Teléfono
                </label>
                {isEditing ? (
                  <Input
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    className="mt-2"
                    type="tel"
                  />
                ) : (
                  <p className="mt-2 text-muted-foreground">{profile.phone}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Ubicación
                </label>
                {isEditing ? (
                  <Input
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    className="mt-2"
                  />
                ) : (
                  <p className="mt-2 text-muted-foreground">{profile.location}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Order History */}
        <div className="mt-6 rounded-lg bg-card p-6 shadow-sm ring-1 ring-border">
          <div className="flex items-center gap-2 mb-6">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-card-foreground">Mis Pedidos</h2>
          </div>

          {mockOrders.length === 0 ? (
            <p className="text-muted-foreground">No tienes pedidos aún</p>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.date} · {order.items} producto(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      ${order.total.toLocaleString("es-CO")}
                    </p>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium
                      ${order.status === "completed" ? "bg-green-100 text-green-700" : ""}
                      ${order.status === "processing" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${order.status === "pending" ? "bg-gray-100 text-gray-700" : ""}
                    `}>
                      {order.status === "completed" ? "Completado" : 
                       order.status === "processing" ? "Procesando" : "Pendiente"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <div className="rounded-lg bg-card p-6 shadow-sm ring-1 ring-border">
          <h2 className="text-lg font-semibold text-card-foreground">Cuenta</h2>
          
          <div className="mt-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
