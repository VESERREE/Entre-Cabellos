"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Calendar, Clock, User, CreditCard } from "lucide-react"

const services = [
  { id: "corte", name: "Corte Clásico", price: 12000 },
  { id: "corte-barba", name: "Corte + Barba", price: 18000 },
  { id: "afeitado", name: "Afeitado Clásico", price: 10000 },
  { id: "tratamiento", name: "Tratamiento Capilar", price: 15000 },
]

const barbers = [
  { id: "carlos", name: "Carlos Muñoz", specialty: "Cortes clásicos" },
  { id: "miguel", name: "Miguel Ángel", specialty: "Barbería y afeitado" },
  { id: "diego", name: "Diego Silva", specialty: "Estilos modernos" },
  { id: "juan", name: "Juan Pablo", specialty: "Tratamientos" },
]

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]

export function Booking() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedBarber, setSelectedBarber] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const selectedServiceData = services.find((s) => s.id === selectedService)

  const handleBooking = () => {
    setStep(2)
  }

  const resetBooking = () => {
    setStep(1)
    setSelectedService("")
    setSelectedBarber("")
    setSelectedDate("")
    setSelectedTime("")
  }

  return (
    <section id="reserva" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Reserva tu Cita</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Agenda tu próxima visita de forma rápida y segura
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {step === 1 ? (
            <Card className="bg-card border-2 border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Selecciona tu servicio</CardTitle>
                <CardDescription className="text-muted-foreground">Completa los datos para tu reserva</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-foreground">
                    <User size={16} className="inline mr-2 text-primary" />
                    Servicio
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger id="service" className="bg-background">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ${service.price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Barber Selection */}
                <div className="space-y-2">
                  <Label htmlFor="barber" className="text-foreground">
                    <User size={16} className="inline mr-2 text-primary" />
                    Barbero
                  </Label>
                  <Select value={selectedBarber} onValueChange={setSelectedBarber}>
                    <SelectTrigger id="barber" className="bg-background">
                      <SelectValue placeholder="Selecciona un barbero" />
                    </SelectTrigger>
                    <SelectContent>
                      {barbers.map((barber) => (
                        <SelectItem key={barber.id} value={barber.id}>
                          {barber.name} - {barber.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-foreground">
                    <Calendar size={16} className="inline mr-2 text-primary" />
                    Fecha
                  </Label>
                  <input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                  />
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-foreground">
                    <Clock size={16} className="inline mr-2 text-primary" />
                    Hora
                  </Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger id="time" className="bg-background">
                      <SelectValue placeholder="Selecciona una hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability Notice */}
                {selectedDate && selectedTime && (
                  <div className="p-4 bg-primary/10 border border-primary rounded-lg">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold text-primary">✓ Disponible</span> El horario seleccionado está
                      disponible
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!selectedService || !selectedBarber || !selectedDate || !selectedTime}
                  onClick={handleBooking}
                >
                  Continuar al Pago
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Booking Summary */}
              <Card className="bg-card border-2 border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Resumen de Reserva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Servicio:</span>
                    <span className="font-semibold text-foreground">{selectedServiceData?.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Barbero:</span>
                    <span className="font-semibold text-foreground">
                      {barbers.find((b) => b.id === selectedBarber)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Fecha:</span>
                    <span className="font-semibold text-foreground">
                      {new Date(selectedDate).toLocaleDateString("es-CL")}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Hora:</span>
                    <span className="font-semibold text-foreground">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between py-4 text-lg">
                    <span className="font-semibold text-foreground">Total:</span>
                    <span className="font-bold text-primary font-serif text-2xl">
                      ${selectedServiceData?.price.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Module */}
              <Card className="bg-card border-2 border-primary">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <CreditCard size={20} className="mr-2 text-primary" />
                    Información de Pago
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">Simulación de WebPay / Stripe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="card-number" className="text-foreground">
                      Número de Tarjeta
                    </Label>
                    <input
                      id="card-number"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-foreground">
                        Vencimiento
                      </Label>
                      <input
                        id="expiry"
                        type="text"
                        placeholder="MM/AA"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-foreground">
                        CVV
                      </Label>
                      <input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Nombre del Titular
                    </Label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Juan Pérez"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                    />
                  </div>

                  <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Pagar ${selectedServiceData?.price.toLocaleString()}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-border text-muted-foreground hover:text-foreground bg-transparent"
                    onClick={resetBooking}
                  >
                    Cancelar y volver
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
