import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface StatsCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('mis_user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('mis_user');
    navigate('/login');
  };

  const stats: StatsCard[] = [
    { title: 'Пациенты сегодня', value: '24', change: '+12%', icon: 'Users', color: 'blue' },
    { title: 'Записи на приём', value: '18', change: '+8%', icon: 'Calendar', color: 'green' },
    { title: 'Выручка за день', value: '₽45,230', change: '+15%', icon: 'TrendingUp', color: 'purple' },
    { title: 'Загруженность', value: '85%', change: '+5%', icon: 'Activity', color: 'orange' }
  ];

  const quickActions = [
    { title: 'Новый пациент', icon: 'UserPlus', route: '/patients/new', color: 'bg-blue-500' },
    { title: 'Расписание', icon: 'Calendar', route: '/schedule', color: 'bg-green-500' },
    { title: 'Медкарты', icon: 'FileText', route: '/medical-records', color: 'bg-purple-500' },
    { title: 'Отчёты', icon: 'BarChart3', route: '/reports', color: 'bg-orange-500' }
  ];

  const recentActivities = [
    { id: 1, type: 'appointment', patient: 'Иванов И.И.', time: '14:30', status: 'completed' },
    { id: 2, type: 'registration', patient: 'Петрова А.С.', time: '15:45', status: 'pending' },
    { id: 3, type: 'payment', patient: 'Сидоров П.М.', time: '16:20', status: 'completed' },
    { id: 4, type: 'appointment', patient: 'Козлова М.В.', time: '17:00', status: 'scheduled' }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Icon name="Stethoscope" className="h-8 w-8 text-primary mr-3" />
                <h1 className="text-xl font-semibold text-gray-900">МИС</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Добро пожаловать, {user.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <Icon name="LogOut" className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <Icon name={stat.icon as any} className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
              <CardDescription>Часто используемые функции</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
                    onClick={() => navigate(action.route)}
                  >
                    <div className={`p-2 rounded-lg ${action.color} mb-2`}>
                      <Icon name={action.icon as any} className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">{action.title}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Последние события</CardTitle>
              <CardDescription>Активность в системе за сегодня</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon name="User" className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.patient}</p>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={activity.status === 'completed' ? 'default' : 'secondary'}
                      className={
                        activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }
                    >
                      {activity.status === 'completed' ? 'Завершено' :
                       activity.status === 'pending' ? 'Ожидает' : 'Запланировано'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;