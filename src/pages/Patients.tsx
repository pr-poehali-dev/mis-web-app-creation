import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  birthDate: string;
  gender: 'male' | 'female';
  address: string;
  insurance: string;
  status: 'active' | 'inactive';
  lastVisit?: string;
}

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    name: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: 'male',
    address: '',
    insurance: '',
    status: 'active'
  });

  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Иванов Иван Иванович',
      phone: '+7 (999) 123-45-67',
      email: 'ivanov@email.com',
      birthDate: '1985-03-15',
      gender: 'male',
      address: 'г. Москва, ул. Ленина, д. 10, кв. 5',
      insurance: 'ОМС 123456789',
      status: 'active',
      lastVisit: '2024-09-15'
    },
    {
      id: '2',
      name: 'Петрова Анна Сергеевна',
      phone: '+7 (999) 234-56-78',
      email: 'petrova@email.com',
      birthDate: '1990-07-22',
      gender: 'female',
      address: 'г. Москва, пр. Мира, д. 25, кв. 12',
      insurance: 'ОМС 987654321',
      status: 'active',
      lastVisit: '2024-09-18'
    },
    {
      id: '3',
      name: 'Сидоров Петр Михайлович',
      phone: '+7 (999) 345-67-89',
      email: 'sidorov@email.com',
      birthDate: '1975-11-08',
      gender: 'male',
      address: 'г. Москва, ул. Гагарина, д. 3, кв. 8',
      insurance: 'ДМС 456789123',
      status: 'active'
    },
    {
      id: '4',
      name: 'Козлова Мария Владимировна',
      phone: '+7 (999) 456-78-90',
      email: 'kozlova@email.com',
      birthDate: '1988-12-30',
      gender: 'female',
      address: 'г. Москва, ул. Пушкина, д. 15, кв. 3',
      insurance: 'ОМС 321654987',
      status: 'inactive'
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    console.log('Добавление пациента:', newPatient);
    setIsAddDialogOpen(false);
    setNewPatient({
      name: '',
      phone: '',
      email: '',
      birthDate: '',
      gender: 'male',
      address: '',
      insurance: '',
      status: 'active'
    });
  };

  const getAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Управление пациентами</h1>
          <p className="text-gray-600">Регистрация и управление данными пациентов</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="UserPlus" className="h-4 w-4 mr-2" />
              Новый пациент
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Регистрация нового пациента</DialogTitle>
              <DialogDescription>
                Заполните данные для регистрации пациента в системе
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">ФИО</Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  placeholder="patient@email.com"
                />
              </div>
              <div>
                <Label htmlFor="birthDate">Дата рождения</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={newPatient.birthDate}
                  onChange={(e) => setNewPatient({...newPatient, birthDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="gender">Пол</Label>
                <Select value={newPatient.gender} onValueChange={(value) => setNewPatient({...newPatient, gender: value as 'male' | 'female'})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Мужской</SelectItem>
                    <SelectItem value="female">Женский</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="insurance">Страховка</Label>
                <Input
                  id="insurance"
                  value={newPatient.insurance}
                  onChange={(e) => setNewPatient({...newPatient, insurance: e.target.value})}
                  placeholder="ОМС 123456789"
                />
              </div>
              <Button onClick={handleAddPatient} className="w-full">
                Зарегистрировать пациента
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Список пациентов</CardTitle>
              <CardDescription>Всего пациентов: {patients.length}</CardDescription>
            </div>
            <div className="w-64">
              <Input
                placeholder="Поиск по имени, телефону или email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ФИО</TableHead>
                <TableHead>Возраст</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Страховка</TableHead>
                <TableHead>Последний визит</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{getAge(patient.birthDate)} лет</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.insurance}</TableCell>
                  <TableCell>
                    {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString('ru-RU') : 'Не было'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                      {patient.status === 'active' ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Eye" className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Edit" className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="FileText" className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;