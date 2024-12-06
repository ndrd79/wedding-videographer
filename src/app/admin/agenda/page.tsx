'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';

export default function AgendaPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events] = useState([
    {
      date: new Date(2024, 2, 15),
      title: 'Casamento Ana & João',
      time: '16:00',
      location: 'Espaço Villa Garden',
    },
    {
      date: new Date(2024, 2, 22),
      title: 'Casamento Maria & Pedro',
      time: '17:30',
      location: 'Casa Petra',
    },
  ]);

  const selectedDateEvents = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Agenda</h1>
        <p className="text-gray-400">Gerencie seus eventos e compromissos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-[#1C1F2C] border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">Calendário</h2>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-[#1C1F2C] text-white rounded-md"
          />
        </Card>

        <Card className="p-6 bg-[#1C1F2C] border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4">
            Eventos do Dia {date?.toLocaleDateString()}
          </h2>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-[#282D3F] border border-gray-800"
                >
                  <h3 className="font-medium text-white">{event.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Horário: {event.time}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Local: {event.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Nenhum evento para esta data.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
