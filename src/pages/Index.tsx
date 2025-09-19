import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
  lastVisit: string;
  status: 'active' | 'inactive' | 'critical';
  diagnosis: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  patients: number;
  status: 'available' | 'busy' | 'offline';
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [patients] = useState<Patient[]>([
    { id: 1, name: 'Иванов Петр Сергеевич', age: 45, phone: '+7 (999) 123-45-67', lastVisit: '2024-09-15', status: 'active', diagnosis: 'Гипертония' },
    { id: 2, name: 'Петрова Анна Михайловна', age: 32, phone: '+7 (999) 234-56-78', lastVisit: '2024-09-18', status: 'critical', diagnosis: 'Диабет 2 типа' },
    { id: 3, name: 'Сидоров Алексей Иванович', age: 28, phone: '+7 (999) 345-67-89', lastVisit: '2024-09-10', status: 'inactive', diagnosis: 'Профилактика' },
  ]);

  const [doctors] = useState<Doctor[]>([
    { id: 1, name: 'Доктор Соколова Е.В.', specialty: 'Кардиолог', patients: 15, status: 'available' },
    { id: 2, name: 'Доктор Морозов И.А.', specialty: 'Эндокринолог', patients: 12, status: 'busy' },
    { id: 3, name: 'Доктор Новикова М.С.', specialty: 'Терапевт', patients: 20, status: 'available' },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username && loginForm.password) {
      setIsLoggedIn(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'available': return 'bg-green-600 text-white';
      case 'critical': case 'busy': return 'bg-red-600 text-white';
      case 'inactive': case 'offline': return 'bg-gray-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center font-inter">
        <Card className="w-full max-w-md shadow-xl animate-scale-in">
          <CardHeader className="text-center bg-primary text-white rounded-t-lg">
            <div className="flex items-center justify-center mb-4">
              <Icon name="Heart" size={40} className="text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">МИС Авторизация</CardTitle>
            <p className="text-blue-100 mt-2">Медицинская Информационная Система</p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Введите логин"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="mt-2"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-blue-700 transition-colors">
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти в систему
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon name="Heart" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-gray-900 font-inter">МИС Система</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('dashboard')}
              >
                <Icon name="BarChart3" size={20} className="mr-3" />
                Дашборд
              </Button>
              <Button
                variant={activeTab === 'patients' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('patients')}
              >
                <Icon name="Users" size={20} className="mr-3" />
                Пациенты
              </Button>
              <Button
                variant={activeTab === 'doctors' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('doctors')}
              >
                <Icon name="UserCheck" size={20} className="mr-3" />
                Врачи
              </Button>
              <Button
                variant={activeTab === 'appointments' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('appointments')}
              >
                <Icon name="Calendar" size={20} className="mr-3" />
                Записи
              </Button>
              <Button
                variant={activeTab === 'documents' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('documents')}
              >
                <Icon name="FileText" size={20} className="mr-3" />
                Документы
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 font-inter">Дашборд</h2>
                <p className="text-gray-600 font-source">Обзор медицинской системы</p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Всего пациентов</p>
                        <p className="text-3xl font-bold text-gray-900">{patients.length}</p>
                      </div>
                      <Icon name="Users" size={40} className="text-primary opacity-80" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Активных врачей</p>
                        <p className="text-3xl font-bold text-gray-900">{doctors.filter(d => d.status === 'available').length}</p>
                      </div>
                      <Icon name="UserCheck" size={40} className="text-green-600 opacity-80" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Критических</p>
                        <p className="text-3xl font-bold text-gray-900">{patients.filter(p => p.status === 'critical').length}</p>
                      </div>
                      <Icon name="AlertTriangle" size={40} className="text-red-600 opacity-80" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Записей сегодня</p>
                        <p className="text-3xl font-bold text-gray-900">12</p>
                      </div>
                      <Icon name="Calendar" size={40} className="text-primary opacity-80" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon name="Activity" size={24} className="mr-2 text-primary" />
                      Последние посещения
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patients.slice(0, 3).map(patient => (
                        <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-gray-600">{patient.diagnosis}</p>
                          </div>
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status === 'active' ? 'Активен' : 
                             patient.status === 'critical' ? 'Критично' : 'Неактивен'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon name="UserCheck" size={24} className="mr-2 text-primary" />
                      Статус врачей
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {doctors.map(doctor => (
                        <div key={doctor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{doctor.name}</p>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(doctor.status)}>
                              {doctor.status === 'available' ? 'Доступен' : 
                               doctor.status === 'busy' ? 'Занят' : 'Офлайн'}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">{doctor.patients} пациентов</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="animate-fade-in">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 font-inter">Пациенты</h2>
                  <p className="text-gray-600 font-source">Управление базой пациентов</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-blue-700">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Добавить пациента
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Новый пациент</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="patientName">ФИО пациента</Label>
                        <Input id="patientName" placeholder="Введите ФИО" />
                      </div>
                      <div>
                        <Label htmlFor="patientAge">Возраст</Label>
                        <Input id="patientAge" type="number" placeholder="Введите возраст" />
                      </div>
                      <div>
                        <Label htmlFor="patientPhone">Телефон</Label>
                        <Input id="patientPhone" placeholder="+7 (999) 123-45-67" />
                      </div>
                      <div>
                        <Label htmlFor="patientDiagnosis">Диагноз</Label>
                        <Textarea id="patientDiagnosis" placeholder="Введите диагноз" />
                      </div>
                      <Button className="w-full bg-primary hover:bg-blue-700">
                        Сохранить пациента
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Поиск пациентов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Patients Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPatients.map(patient => (
                  <Card key={patient.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status === 'active' ? 'Активен' : 
                           patient.status === 'critical' ? 'Критично' : 'Неактивен'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Icon name="Calendar" size={16} className="mr-2" />
                          Возраст: {patient.age} лет
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Icon name="Phone" size={16} className="mr-2" />
                          {patient.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Icon name="FileText" size={16} className="mr-2" />
                          {patient.diagnosis}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Icon name="Clock" size={16} className="mr-2" />
                          Последний визит: {patient.lastVisit}
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Icon name="Edit" size={16} className="mr-1" />
                            Изменить
                          </Button>
                          <Button size="sm" className="flex-1 bg-primary hover:bg-blue-700">
                            <Icon name="Eye" size={16} className="mr-1" />
                            Карта
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="animate-fade-in">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 font-inter">Документы</h2>
                  <p className="text-gray-600 font-source">Управление медицинской документацией</p>
                </div>
                <Button className="bg-primary hover:bg-blue-700">
                  <Icon name="Download" size={20} className="mr-2" />
                  Выгрузить в Word
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon name="FileText" size={24} className="mr-2 text-primary" />
                      Шаблоны документов
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Медицинская карта пациента',
                        'Справка о состоянии здоровья',
                        'Направление на анализы',
                        'Выписка из стационара',
                        'Рецепт на лекарства'
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{doc}</span>
                          <Button size="sm" variant="outline">
                            <Icon name="Download" size={16} className="mr-1" />
                            Скачать
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon name="BarChart3" size={24} className="mr-2 text-primary" />
                      Отчеты
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Статистика по пациентам',
                        'Отчет по врачам',
                        'Финансовая отчетность',
                        'Анализ заболеваемости',
                        'Отчет по лекарствам'
                      ].map((report, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{report}</span>
                          <Button size="sm" className="bg-primary hover:bg-blue-700">
                            <Icon name="Eye" size={16} className="mr-1" />
                            Просмотр
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;