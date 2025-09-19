import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Appointment {
  id: string;
  time: string;
  patient: string;
  doctor: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
}

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    time: '',
    patient: '',
    doctor: '',
    type: '',
    status: 'scheduled',
    notes: ''
  });

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      time: '09:00',
      patient: 'Иванов И.И.',
      doctor: 'Терапевт Петров А.В.',
      type: 'Первичный приём',
      status: 'completed',
      notes: 'Профилактический осмотр'
    },
    {
      id: '2',
      time: '09:30',
      patient: 'Петрова А.С.',
      doctor: 'Кардиолог Сидорова М.П.',
      type: 'Повторный приём',
      status: 'completed'
    },
    {
      id: '3',
      time: '10:00',
      patient: 'Сидоров П.М.',
      doctor: 'Терапевт Петров А.В.',
      type: 'Первичный приём',
      status: 'in-progress'
    },
    {
      id: '4',
      time: '10:30',
      patient: 'Козлова М.В.',
      doctor: 'Невролог Иванова Е.К.',
      type: 'Консультация',
      status: 'scheduled'
    },
    {
      id: '5',
      time: '11:00',
      patient: 'Новиков А.А.',
      doctor: 'Терапевт Петров А.В.',
      type: 'Повторный приём',
      status: 'scheduled'
    },
    {
      id: '6',
      time: '14:00',
      patient: 'Смирнова О.Л.',
      doctor: 'Кардиолог Сидорова М.П.',
      type: 'Первичный приём',
      status: 'scheduled'
    }
  ]);

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '14:00', '14:30', 
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const doctors = [
    'Терапевт Петров А.В.',
    'Кардиолог Сидорова М.П.',
    'Невролог Иванова Е.К.',
    'Хирург Козлов Д.И.',
    'Офтальмолог Морозова Т.С.'
  ];

  const appointmentTypes = [
    'Первичный приём',
    'Повторный приём',
    'Консультация',
    'Процедура',
    'Диагностика'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершён';
      case 'in-progress': return 'В процессе';
      case 'cancelled': return 'Отменён';
      default: return 'Запланирован';
    }
  };

  const handleAddAppointment = () => {
    console.log('Добавление записи:', newAppointment);
    setIsAddDialogOpen(false);
    setNewAppointment({
      time: '',
      patient: '',
      doctor: '',
      type: '',
      status: 'scheduled',
      notes: ''
    });
  };

  const getAvailableSlots = () => {
    const busySlots = appointments.map(apt => apt.time);
    return timeSlots.filter(slot => !busySlots.includes(slot));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Расписание приёмов</h1>
          <p className="text-gray-600">Управление записями пациентов к врачам</p>
        </div>
        <div className="flex space-x-4">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-48"
          />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" className="h-4 w-4 mr-2" />
                Новая запись
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Новая запись на приём</DialogTitle>
                <DialogDescription>
                  Создание новой записи пациента к врачу
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="time">Время</Label>
                  <Select value={newAppointment.time} onValueChange={(value) => setNewAppointment({...newAppointment, time: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableSlots().map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="patient">Пациент</Label>
                  <Input
                    id="patient"
                    value={newAppointment.patient}
                    onChange={(e) => setNewAppointment({...newAppointment, patient: e.target.value})}
                    placeholder="ФИО пациента"
                  />
                </div>
                <div>
                  <Label htmlFor="doctor">Врач</Label>
                  <Select value={newAppointment.doctor} onValueChange={(value) => setNewAppointment({...newAppointment, doctor: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите врача" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map(doctor => (
                        <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Тип приёма</Label>
                  <Select value={newAppointment.type} onValueChange={(value) => setNewAppointment({...newAppointment, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Тип приёма" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Примечания</Label>
                  <Textarea
                    id="notes"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    placeholder="Дополнительная информация"
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddAppointment} className="w-full">
                  Создать запись
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Statistics */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Статистика дня</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Всего записей:</span>
                <span className="font-semibold">{appointments.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Завершено:</span>
                <span className="font-semibold text-green-600">
                  {appointments.filter(a => a.status === 'completed').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">В процессе:</span>
                <span className="font-semibold text-blue-600">
                  {appointments.filter(a => a.status === 'in-progress').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Запланировано:</span>
                <span className="font-semibold text-gray-600">
                  {appointments.filter(a => a.status === 'scheduled').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Свободных слотов:</span>
                <span className="font-semibold">{getAvailableSlots().length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Расписание на {new Date(selectedDate).toLocaleDateString('ru-RU')}</CardTitle>
              <CardDescription>Записи пациентов на выбранную дату</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeSlots.map(slot => {
                  const appointment = appointments.find(apt => apt.time === slot);
                  
                  if (appointment) {
                    return (
                      <div key={slot} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm font-mono text-gray-600 w-16">
                            {slot}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{appointment.patient}</div>
                            <div className="text-sm text-gray-600">{appointment.doctor}</div>
                            <div className="text-sm text-gray-500">{appointment.type}</div>
                            {appointment.notes && (
                              <div className="text-xs text-gray-500 mt-1">{appointment.notes}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusText(appointment.status)}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm">
                              <Icon name="Edit" className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Icon name="X" className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={slot} className="flex items-center p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                      <div className="text-sm font-mono text-gray-400 w-16">
                        {slot}
                      </div>
                      <div className="flex-1 text-sm text-gray-500">
                        Свободное время
                      </div>
                      <Button variant="outline" size="sm" onClick={() => {
                        setNewAppointment({...newAppointment, time: slot});
                        setIsAddDialogOpen(true);
                      }}>
                        <Icon name="Plus" className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;