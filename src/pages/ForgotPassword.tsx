import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        
        <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/50 backdrop-blur-xl animate-scale-in">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center animate-pulse-glow">
                <Icon name="MailCheck" className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold mb-2">Проверьте почту</CardTitle>
              <CardDescription>Письмо с инструкциями отправлено</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm text-center text-muted-foreground">
                Мы отправили письмо с инструкциями по восстановлению пароля на адрес{' '}
                <span className="font-semibold text-foreground">{email}</span>
              </p>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Icon name="Info" className="w-4 h-4 mt-0.5 text-primary" />
                <p>Письмо может прийти в течение нескольких минут</p>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="AlertCircle" className="w-4 h-4 mt-0.5 text-primary" />
                <p>Проверьте папку "Спам", если не видите письмо</p>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Clock" className="w-4 h-4 mt-0.5 text-primary" />
                <p>Ссылка действительна в течение 24 часов</p>
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
                <Icon name="RefreshCw" className="w-4 h-4 mr-2" />
                Отправить еще раз
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Вернуться ко входу
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      
      <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/50 backdrop-blur-xl animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center animate-pulse-glow">
              <Icon name="KeyRound" className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold mb-2">Восстановление пароля</CardTitle>
            <CardDescription>Введите email для получения инструкций</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-border/30">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Как это работает</p>
                  <p className="text-xs text-muted-foreground">
                    Мы отправим вам письмо со ссылкой для сброса пароля. Перейдите по ней и создайте новый пароль.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email адрес</Label>
              <div className="relative">
                <Icon name="Mail" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Укажите email, который вы использовали при регистрации
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Icon name="Send" className="w-4 h-4 mr-2" />
              Отправить инструкции
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Вспомнили пароль?{' '}
            <Button variant="link" className="p-0 h-auto font-semibold text-primary" onClick={() => navigate('/')}>
              Войти
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Нет аккаунта?{' '}
            <Button variant="link" className="p-0 h-auto font-semibold text-primary" onClick={() => navigate('/register')}>
              Зарегистрироваться
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
        <p>© 2024 ЕГЭ Платформа</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
