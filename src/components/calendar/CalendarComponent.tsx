'use client';

import { useState, useEffect, Fragment } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, Transition } from '@headlessui/react';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: 'available' | 'unavailable' | 'pending';
}

export default function CalendarComponent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // TODO: Implementar chamada à API do Google Calendar
      setLoading(false);
      // Dados de exemplo
      const sampleEvents: Event[] = [
        {
          id: '1',
          title: 'Casamento João e Maria',
          start: new Date(2024, 5, 15),
          end: new Date(2024, 5, 15),
          status: 'unavailable',
        },
        {
          id: '2',
          title: 'Disponível',
          start: new Date(2024, 5, 20),
          end: new Date(2024, 5, 20),
          status: 'available',
        },
      ];
      setEvents(sampleEvents);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    setIsModalOpen(true);
  };

  const handlePreReservation = async () => {
    if (!selectedDate) return;

    try {
      // TODO: Implementar lógica de pré-reserva
      alert('Pré-reserva realizada com sucesso! Entraremos em contato em breve.');
      setIsModalOpen(false);
    } catch (err) {
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  const eventStyleGetter = (event: Event) => {
    let backgroundColor = '';
    switch (event.status) {
      case 'available':
        backgroundColor = '#22c55e';
        break;
      case 'unavailable':
        backgroundColor = '#ef4444';
        break;
      case 'pending':
        backgroundColor = '#eab308';
        break;
      default:
        backgroundColor = '#gray-400';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
      },
    };
  };

  return (
    <>
      <div className="h-[600px] bg-white rounded-lg p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={eventStyleGetter}
          onSelectSlot={handleSelectSlot}
          selectable
          popup
          views={['month']}
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            noEventsInRange: "Não há eventos neste período.",
          }}
          formats={{
            dateFormat: 'dd',
            monthHeaderFormat: 'MMMM yyyy',
            dayHeaderFormat: 'cccc',
          }}
        />
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-heading text-gray-900 mb-4"
                  >
                    Pré-reserva de Data
                  </Dialog.Title>

                  <div className="mb-6">
                    <p className="text-gray-700 mb-2">
                      Data selecionada: {selectedDate?.toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-500">
                      A pré-reserva tem validade de 48 horas até a confirmação do pagamento.
                    </p>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#D4AF37] text-white rounded hover:bg-[#B39030] transition-colors"
                      onClick={handlePreReservation}
                    >
                      Fazer Pré-reserva
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
