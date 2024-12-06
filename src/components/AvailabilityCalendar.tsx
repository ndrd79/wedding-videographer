"use client"

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useSession } from 'next-auth/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addMonths, format, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';

interface Availability {
  id: string;
  date: string;
  isAvailable: boolean;
  isBooked: boolean;
  notes?: string;
}

export function AvailabilityCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isAdmin = session?.user?.role === 'ADMIN';

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setIsLoading(true);
      const startDate = new Date();
      const endDate = addMonths(startDate, 3); // Busca disponibilidade para os próximos 3 meses

      const response = await fetch(
        `/api/availability?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );

      if (!response.ok) {
        throw new Error('Falha ao carregar disponibilidade');
      }

      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar a disponibilidade. Por favor, tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    
    const selectedAvailability = availability.find(a => 
      isSameDay(parseISO(a.date), date)
    );

    setNotes(selectedAvailability?.notes || '');
    setIsDialogOpen(true);
  };

  const handleSaveAvailability = async () => {
    if (!selectedDate) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          isAvailable: true,
          isBooked: false,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar disponibilidade');
      }

      await fetchAvailability();
      setIsDialogOpen(false);
      toast({
        title: 'Sucesso',
        description: 'Disponibilidade atualizada com sucesso!',
      });
    } catch (error) {
      console.error('Error saving availability:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar a disponibilidade. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDayClass = (date: Date) => {
    const dayAvailability = availability.find(a => 
      isSameDay(parseISO(a.date), date)
    );

    if (!dayAvailability) return '';

    if (dayAvailability.isBooked) {
      return 'bg-red-200 text-red-900';
    }
    
    if (dayAvailability.isAvailable) {
      return 'bg-green-200 text-green-900';
    }

    return 'bg-yellow-200 text-yellow-900';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-cormorant font-semibold text-amber-400">
          Calendário de Disponibilidade
        </h2>
        <p className="text-lg font-raleway text-gray-300">
          Selecione uma data para verificar nossa disponibilidade
        </p>
      </div>

      <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="mx-auto border-none font-raleway"
          locale={ptBR}
          modifiers={{
            booked: (date) => {
              return availability.some(
                (a) => isSameDay(parseISO(a.date), date) && a.isBooked
              );
            },
            available: (date) => {
              return availability.some(
                (a) => isSameDay(parseISO(a.date), date) && a.isAvailable && !a.isBooked
              );
            },
          }}
          modifiersStyles={{
            booked: {
              backgroundColor: 'rgb(254 202 202)',
              color: 'rgb(153 27 27)',
            },
            available: {
              backgroundColor: 'rgb(220 252 231)',
              color: 'rgb(22 101 52)',
            },
          }}
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
          }}
          styles={{
            day_today: { color: 'rgb(251 191 36)' },
            day: { color: 'rgb(229 231 235)' },
            day_disabled: { color: 'rgb(75 85 99)' },
            caption: { color: 'rgb(229 231 235)' },
            nav_button_previous: { color: 'rgb(229 231 235)' },
            nav_button_next: { color: 'rgb(229 231 235)' },
            head_cell: { color: 'rgb(156 163 175)' }
          }}
        />

        <div className="mt-6 flex justify-center gap-6 font-raleway text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-100"></div>
            <span className="text-gray-300">Disponível</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-100"></div>
            <span className="text-gray-300">Reservado</span>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="backdrop-blur-sm bg-black/80 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-cormorant text-amber-400">
              {selectedDate && format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {isAdmin ? 'Gerencie a disponibilidade desta data' : 'Verifique a disponibilidade desta data'}
            </DialogDescription>
          </DialogHeader>

          {isAdmin && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-300">Observações</Label>
                <Input
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Adicione observações sobre esta data..."
                  className="bg-black/50 border-gray-700 text-gray-300 placeholder:text-gray-500"
                />
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-start">
            {isAdmin && (
              <Button
                type="button"
                onClick={handleSaveAvailability}
                disabled={isLoading}
                className="bg-amber-400 hover:bg-amber-500 text-black font-semibold"
              >
                {isLoading ? 'Salvando...' : 'Salvar Disponibilidade'}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
