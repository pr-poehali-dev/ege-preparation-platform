import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Role = 'student' | 'teacher' | 'admin';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'overdue' | 'pending';
  dueDate: string;
  score?: number;
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  trend: 'up' | 'down';
}

const Index = () => {
  const [currentRole, setCurrentRole] = useState<Role>('student');

  const studentAssignments: Assignment[] = [
    { id: 1, title: 'Задачи по теории вероятности', subject: 'Математика', progress: 100, status: 'completed', dueDate: '15 нояб', score: 95 },
    { id: 2, title: 'Решение уравнений', subject: 'Математика', progress: 65, status: 'in-progress', dueDate: '18 нояб' },
    { id: 3, title: 'Электродинамика', subject: 'Физика', progress: 30, status: 'in-progress', dueDate: '20 нояб' },
    { id: 4, title: 'Органическая химия', subject: 'Химия', progress: 0, status: 'pending', dueDate: '22 нояб' },
    { id: 5, title: 'Генетика', subject: 'Биология', progress: 100, status: 'completed', dueDate: '10 нояб', score: 88 },
  ];

  const teacherStats: StatCard[] = [
    { title: 'Всего учеников', value: '124', change: '+12', icon: 'Users', trend: 'up' },
    { title: 'Активных заданий', value: '18', change: '+3', icon: 'BookOpen', trend: 'up' },
    { title: 'Средний балл', value: '87%', change: '+5%', icon: 'TrendingUp', trend: 'up' },
    { title: 'Требуют проверки', value: '23', change: '-8', icon: 'FileCheck', trend: 'down' },
  ];

  const studentStats: StatCard[] = [
    { title: 'Выполнено заданий', value: '28', change: '+4', icon: 'CheckCircle', trend: 'up' },
    { title: 'Средний балл', value: '92%', change: '+3%', icon: 'Award', trend: 'up' },
    { title: 'Активных заданий', value: '5', change: '+2', icon: 'BookOpen', trend: 'up' },
    { title: 'Долгов', value: '1', change: '-2', icon: 'AlertCircle', trend: 'down' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'overdue': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Зачтено';
      case 'in-progress': return 'В работе';
      case 'overdue': return 'Просрочено';
      case 'pending': return 'Ожидает';
      default: return status;
    }
  };

  const renderStudentDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {studentStats.map((stat, index) => (
          <Card key={index} className="hover-scale border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs">{stat.title}</CardDescription>
                <Icon name={stat.icon} className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`flex items-center text-xs ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  <Icon name={stat.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} className="w-3 h-3 mr-1" />
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BookOpen" className="w-5 h-5" />
            Мои задания
          </CardTitle>
          <CardDescription>Текущие домашние работы и их статус</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentAssignments.map((assignment, index) => (
              <div
                key={assignment.id}
                className="p-4 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                  </div>
                  <Badge variant="outline" className={getStatusColor(assignment.status)}>
                    {getStatusText(assignment.status)}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-medium">{assignment.progress}%</span>
                  </div>
                  <Progress value={assignment.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" className="w-4 h-4" />
                      {assignment.dueDate}
                    </div>
                    {assignment.score && (
                      <div className="flex items-center gap-1 text-success">
                        <Icon name="Award" className="w-4 h-4" />
                        {assignment.score}%
                      </div>
                    )}
                  </div>
                  <Button size="sm" variant={assignment.status === 'completed' ? 'outline' : 'default'}>
                    {assignment.status === 'completed' ? 'Посмотреть' : 'Продолжить'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teacherStats.map((stat, index) => (
          <Card key={index} className="hover-scale border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs">{stat.title}</CardDescription>
                <Icon name={stat.icon} className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`flex items-center text-xs ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  <Icon name={stat.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} className="w-3 h-3 mr-1" />
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Users" className="w-5 h-5" />
              Активные группы
            </CardTitle>
            <CardDescription>Успеваемость по группам</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Группа А (Математика)', students: 28, avgScore: 89, color: 'bg-blue-500' },
                { name: 'Группа Б (Физика)', students: 24, avgScore: 85, color: 'bg-purple-500' },
                { name: 'Группа В (Химия)', students: 32, avgScore: 92, color: 'bg-green-500' },
              ].map((group, index) => (
                <div key={index} className="p-3 rounded-lg bg-secondary/30 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{group.name}</h4>
                      <p className="text-sm text-muted-foreground">{group.students} учеников</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{group.avgScore}%</div>
                      <p className="text-xs text-muted-foreground">средний балл</p>
                    </div>
                  </div>
                  <Progress value={group.avgScore} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="FileCheck" className="w-5 h-5" />
              Требуют внимания
            </CardTitle>
            <CardDescription>Задания на проверку</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { student: 'Иванов Петр', task: 'Теория вероятности', time: '2 часа назад', urgent: true },
                { student: 'Сидорова Мария', task: 'Квантовая физика', time: '4 часа назад', urgent: false },
                { student: 'Петров Алексей', task: 'Органика', time: '1 день назад', urgent: true },
                { student: 'Козлова Анна', task: 'Генетика', time: '1 день назад', urgent: false },
              ].map((item, index) => (
                <div key={index} className="p-3 rounded-lg bg-secondary/30 flex items-center justify-between hover:bg-secondary/50 transition-colors animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.student}</h4>
                    <p className="text-xs text-muted-foreground">{item.task}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.urgent && (
                      <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
                        Срочно
                      </Badge>
                    )}
                    <Button size="sm" variant="ghost">
                      <Icon name="Eye" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Всего учителей', value: '12', icon: 'UserCheck', change: '+2', trend: 'up' },
          { title: 'Всего студентов', value: '384', icon: 'GraduationCap', change: '+28', trend: 'up' },
          { title: 'Активных курсов', value: '24', icon: 'BookOpen', change: '+3', trend: 'up' },
          { title: 'Задач в банке', value: '1,247', icon: 'Database', change: '+156', trend: 'up' },
        ].map((stat, index) => (
          <Card key={index} className="hover-scale border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs">{stat.title}</CardDescription>
                <Icon name={stat.icon} className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`flex items-center text-xs ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  <Icon name={stat.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} className="w-3 h-3 mr-1" />
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Activity" className="w-5 h-5" />
            Системная активность
          </CardTitle>
          <CardDescription>Статистика использования платформы</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: 'Выполненных заданий (сегодня)', value: 156, max: 200, color: 'bg-blue-500' },
              { label: 'Активных пользователей', value: 243, max: 384, color: 'bg-green-500' },
              { label: 'Использование хранилища', value: 68, max: 100, color: 'bg-purple-500' },
              { label: 'API запросов (за час)', value: 1847, max: 2000, color: 'bg-orange-500' },
            ].map((item, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value} / {item.max}</span>
                </div>
                <Progress value={(item.value / item.max) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ЕГЭ Платформа</h1>
                <p className="text-xs text-muted-foreground">Подготовка к экзаменам</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Tabs value={currentRole} onValueChange={(value) => setCurrentRole(value as Role)}>
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="student" className="data-[state=active]:bg-primary">
                    <Icon name="User" className="w-4 h-4 mr-2" />
                    Студент
                  </TabsTrigger>
                  <TabsTrigger value="teacher" className="data-[state=active]:bg-primary">
                    <Icon name="UserCheck" className="w-4 h-4 mr-2" />
                    Учитель
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-primary">
                    <Icon name="Shield" className="w-4 h-4 mr-2" />
                    Админ
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="ghost" size="icon">
                <Icon name="Bell" className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Settings" className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            {currentRole === 'student' && 'Добро пожаловать, Студент'}
            {currentRole === 'teacher' && 'Панель учителя'}
            {currentRole === 'admin' && 'Административная панель'}
          </h2>
          <p className="text-muted-foreground">
            {currentRole === 'student' && 'Продолжайте обучение и отслеживайте свой прогресс'}
            {currentRole === 'teacher' && 'Управляйте заданиями и следите за успеваемостью учеников'}
            {currentRole === 'admin' && 'Управление системой и мониторинг активности'}
          </p>
        </div>

        {currentRole === 'student' && renderStudentDashboard()}
        {currentRole === 'teacher' && renderTeacherDashboard()}
        {currentRole === 'admin' && renderAdminDashboard()}
      </main>
    </div>
  );
};

export default Index;
