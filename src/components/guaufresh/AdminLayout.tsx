"use client"

import { useState, useEffect } from "react"
import { Package, Users, ShoppingCart, BarChart3, Plus, Search, Edit, Trash2, Eye, Loader2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import { baseHref } from "@/lib/base-href"
import { formatPrice } from "@/lib/utils"

type Tab = "products" | "orders" | "customers" | "analytics"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  description?: string
  images?: string[]
}

interface Order {
  id: string
  customer_name: string
  phone: string
  address: string
  status: string
  total: number
  subtotal: number
  discount: number
  created_at: string
}

export function AdminLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("products")
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    ordersToday: 0,
    revenueToday: 0,
    newCustomers: 0,
    totalProducts: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Load products
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      // Load orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      setProducts(productsData || [])
      setOrders(ordersData || [])

      // Calculate stats
      const today = new Date().toISOString().split('T')[0]
      const todayOrders = (ordersData || []).filter(o => 
        o.created_at.startsWith(today)
      )

      setStats({
        ordersToday: todayOrders.length,
        revenueToday: todayOrders.reduce((sum, o) => sum + (o.total || 0), 0),
        newCustomers: 0, // TODO: calculate from profiles
        totalProducts: (productsData || []).length
      })
    } catch (err) {
      console.error('Error loading admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (!error) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)

    if (!error) {
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o))
    }
  }

  const tabs = [
    { id: "products" as Tab, label: "Productos", icon: Package },
    { id: "orders" as Tab, label: "Pedidos", icon: ShoppingCart },
    { id: "customers" as Tab, label: "Clientes", icon: Users },
    { id: "analytics" as Tab, label: "Análisis", icon: BarChart3 },
  ]

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: "bg-green-100 text-green-700",
      processing: "bg-yellow-100 text-yellow-700",
      pending: "bg-gray-100 text-gray-700",
      cancelled: "bg-red-100 text-red-700"
    }
    const labels: Record<string, string> = {
      completed: "Completado",
      processing: "Procesando",
      pending: "Pendiente",
      cancelled: "Cancelado"
    }
    return { style: styles[status] || styles.pending, label: labels[status] || status }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Panel de Administración</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Producto
              </Button>
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = baseHref('/'))}>
                <LogOut className="mr-2 h-4 w-4" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Pedidos Hoy</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.ordersToday}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Ingresos Hoy</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{formatPrice(stats.revenueToday)}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Clientes Nuevos</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.newCustomers}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Productos</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.totalProducts}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex gap-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 py-4 text-sm font-medium transition-colors
                  ${activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-gray-300"
                  }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="rounded-lg bg-white shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Buscar productos..." className="pl-10" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Producto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Precio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Categoría</th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                        No hay productos. Crea el primero.
                      </td>
                    </tr>
                  ) : products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 font-medium text-foreground">{product.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{formatPrice(product.price)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium
                          ${product.stock > 20 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                        `}>
                          {product.stock} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground capitalize">{product.category || 'espuma'}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="rounded-lg bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Pedido</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Teléfono</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Total</th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                        No hay pedidos todavía.
                      </td>
                    </tr>
                  ) : orders.map((order) => {
                    const badge = getStatusBadge(order.status)
                    return (
                      <tr key={order.id}>
                        <td className="px-6 py-4 font-medium text-foreground">
                          #{order.id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{order.customer_name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{order.phone}</td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('es-CO')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${badge.style}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-foreground">
                          {formatPrice(order.total)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <select 
                              className="text-xs border rounded px-2 py-1"
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            >
                              <option value="pending">Pendiente</option>
                              <option value="processing">Procesando</option>
                              <option value="completed">Completado</option>
                              <option value="cancelled">Cancelado</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div className="rounded-lg bg-white p-6 shadow-sm text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Próximamente: gestión de clientes</p>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="rounded-lg bg-white p-6 shadow-sm text-center">
            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Próximamente: análisis y estadísticas</p>
          </div>
        )}
      </div>
    </div>
  )
}
