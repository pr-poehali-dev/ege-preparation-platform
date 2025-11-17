import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

type Role = 'student' | 'teacher' | 'admin';

const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    schoolCode: '',
    agreedToTerms: false,
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    
    if (!formData.agreedToTerms) {
      alert('Необходимо принять условия использования');
      return;
    }

    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
    navigate('/dashboard');
  };

  const getRoleInfo = (role: Role) => {
    switch (role) {
      case 'student':
        return {
          title: 'Регистрация студента',
          description: 'Начните подготовку к ЕГЭ',
          icon: 'GraduationCap',
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10',
          features: ['Доступ к заданиям', 'Отслеживание прогресса', 'Автопроверка работ']
        };
      case 'teacher':
        return {
          title: 'Регистрация учителя',
          description: 'Управляйте группами и заданиями',
          icon: 'UserCheck',
          color: 'text-purple-500',
          bgColor: 'bg-purple-500/10',
          features: ['Создание заданий', 'Проверка работ', 'Аналитика учеников']
        };
      case 'admin':
        return {
          title: 'Регистрация администратора',
          description: 'Полный доступ к системе',
          icon: 'Shield',
          color: 'text-orange-500',
          bgColor: 'bg-orange-500/10',
          features: ['Управление пользователями', 'Системная аналитика', 'Настройки платформы']
        };
    }
  };

  const roleInfo = getRoleInfo(selectedRole);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      
      <Card className="w-full max-w-2xl relative z-10 border-border/50 bg-card/50 backdrop-blur-xl animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={`w-16 h-16 ${roleInfo.bgColor} rounded-2xl flex items-center justify-center animate-pulse-glow`}>
              <Icon name={roleInfo.icon} className={`w-8 h-8 ${roleInfo.color}`} />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold mb-2">Создание аккаунта</CardTitle>
            <CardDescription>Присоединяйтесь к платформе подготовки к ЕГЭ</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-secondary/50">
              <TabsTrigger value="student" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <Icon name="User" className="w-4 h-4 mr-2" />
                Студент
              </TabsTrigger>
              <TabsTrigger value="teacher" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <Icon name="UserCheck" className="w-4 h-4 mr-2" />
                Учитель
              </TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <Icon name="Shield" className="w-4 h-4 mr-2" />
                Админ
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedRole} className="space-y-4 animate-fade-in">
              <div className={`p-4 rounded-lg ${roleInfo.bgColor} border border-border/30`}>
                <div className="flex items-center gap-3 mb-3">
                  <Icon name={roleInfo.icon} className={`w-5 h-5 ${roleInfo.color}`} />
                  <h3 className="font-semibold">{roleInfo.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {roleInfo.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className={`w-4 h-4 ${roleInfo.color}`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <div className="relative">
                      <Icon name="User" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Иван"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <div className="relative">
                      <Icon name="User" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Иванов"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Icon name="Mail" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.ru"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {selectedRole === 'student' && (
                  <div className="space-y-2">
                    <Label htmlFor="schoolCode">Код школы / группы</Label>
                    <div className="relative">
                      <Icon name="Hash" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="schoolCode"
                        type="text"
                        placeholder="ABC123"
                        value={formData.schoolCode}
                        onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Опционально: код от вашего учителя для присоединения к группе</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <div className="relative">
                      <Icon name="Lock" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                    <div className="relative">
                      <Icon name="Lock" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreedToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked as boolean })}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Я принимаю{' '}
                    <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                      условия использования
                    </Button>{' '}
                    и{' '}
                    <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                      политику конфиденциальности
                    </Button>
                  </label>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                  Создать аккаунт
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Или</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full" type="button">
                  <Icon name="Chrome" className="w-4 h-4 mr-2" />
                  Зарегистрироваться через Google
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  <Icon name="Github" className="w-4 h-4 mr-2" />
                  Зарегистрироваться через GitHub
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Уже есть аккаунт?{' '}
                <Button variant="link" className="p-0 h-auto font-semibold text-primary" onClick={() => navigate('/')}>
                  Войти
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
