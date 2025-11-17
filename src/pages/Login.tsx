import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Role = 'student' | 'teacher' | 'admin';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  const getRoleInfo = (role: Role) => {
    switch (role) {
      case 'student':
        return {
          title: 'Вход для студента',
          description: 'Войдите, чтобы продолжить обучение',
          icon: 'GraduationCap',
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10'
        };
      case 'teacher':
        return {
          title: 'Вход для учителя',
          description: 'Управляйте заданиями и учениками',
          icon: 'UserCheck',
          color: 'text-purple-500',
          bgColor: 'bg-purple-500/10'
        };
      case 'admin':
        return {
          title: 'Вход для администратора',
          description: 'Управление системой',
          icon: 'Shield',
          color: 'text-orange-500',
          bgColor: 'bg-orange-500/10'
        };
    }
  };

  const roleInfo = getRoleInfo(selectedRole);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      
      <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/50 backdrop-blur-xl animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={`w-16 h-16 ${roleInfo.bgColor} rounded-2xl flex items-center justify-center animate-pulse-glow`}>
              <Icon name={roleInfo.icon} className={`w-8 h-8 ${roleInfo.color}`} />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold mb-2">ЕГЭ Платформа</CardTitle>
            <CardDescription>Выберите роль для входа в систему</CardDescription>
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
                <div className="flex items-center gap-3 mb-2">
                  <Icon name={roleInfo.icon} className={`w-5 h-5 ${roleInfo.color}`} />
                  <h3 className="font-semibold">{roleInfo.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{roleInfo.description}</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Icon name="Mail" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <div className="relative">
                    <Icon name="Lock" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Icon name="LogIn" className="w-4 h-4 mr-2" />
                  Войти
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
                  Войти через Google
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  <Icon name="Github" className="w-4 h-4 mr-2" />
                  Войти через GitHub
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Нет аккаунта?{' '}
                <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                  Зарегистрироваться
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
        <p>© 2024 ЕГЭ Платформа</p>
      </div>
    </div>
  );
};

export default Login;
