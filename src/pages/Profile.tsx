import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Role = 'student' | 'teacher' | 'admin';

const Profile = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState<Role>('student');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivan.ivanov@example.com',
    phone: '+7 (999) 123-45-67',
    school: 'Школа №1',
    grade: '11 класс',
    bio: 'Готовлюсь к ЕГЭ по математике и физике',
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const savedRole = localStorage.getItem('userRole') as Role;
    
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    if (savedRole) {
      setCurrentRole(savedRole);
    }
  }, [navigate]);

  const getRoleInfo = (role: Role) => {
    switch (role) {
      case 'student':
        return { title: 'Студент', icon: 'GraduationCap', color: 'bg-blue-500' };
      case 'teacher':
        return { title: 'Учитель', icon: 'UserCheck', color: 'bg-purple-500' };
      case 'admin':
        return { title: 'Администратор', icon: 'Shield', color: 'bg-orange-500' };
    }
  };

  const roleInfo = getRoleInfo(currentRole);

  const handleSave = () => {
    setIsEditing(false);
  };

  const getInitials = () => {
    return `${profileData.firstName[0]}${profileData.lastName[0]}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                <Icon name="ArrowLeft" className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Профиль</h1>
                <p className="text-xs text-muted-foreground">Личные данные и настройки</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="" alt={`${profileData.firstName} ${profileData.lastName}`} />
                    <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="Camera" className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
                  <Badge variant="outline" className={`${roleInfo.color}/20 text-${roleInfo.color.replace('bg-', '')} border-${roleInfo.color.replace('bg-', '')}/30`}>
                    <Icon name={roleInfo.icon} className="w-3 h-3 mr-1" />
                    {roleInfo.title}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">{profileData.bio}</p>

                <Separator />

                <div className="w-full space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Mail" className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Phone" className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="School" className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{profileData.school}</span>
                  </div>
                </div>

                <Separator />

                {currentRole === 'student' && (
                  <div className="w-full space-y-3">
                    <div className="p-3 rounded-lg bg-secondary/30">
                      <div className="text-2xl font-bold">92%</div>
                      <div className="text-xs text-muted-foreground">Средний балл</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-secondary/30 text-center">
                        <div className="text-lg font-bold">28</div>
                        <div className="text-xs text-muted-foreground">Заданий</div>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/30 text-center">
                        <div className="text-lg font-bold">45</div>
                        <div className="text-xs text-muted-foreground">Дней</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Личная информация</CardTitle>
                  <CardDescription>Управление вашим профилем и настройками</CardDescription>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    <Icon name="Pencil" className="w-4 h-4 mr-2" />
                    Редактировать
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleSave}>
                      <Icon name="Check" className="w-4 h-4 mr-2" />
                      Сохранить
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
                  <TabsTrigger value="personal">
                    <Icon name="User" className="w-4 h-4 mr-2" />
                    Основное
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <Icon name="Shield" className="w-4 h-4 mr-2" />
                    Безопасность
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <Icon name="Bell" className="w-4 h-4 mr-2" />
                    Уведомления
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="school">Школа / Учебное заведение</Label>
                      <Input
                        id="school"
                        value={profileData.school}
                        onChange={(e) => setProfileData({ ...profileData, school: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Класс / Группа</Label>
                      <Input
                        id="grade"
                        value={profileData.grade}
                        onChange={(e) => setProfileData({ ...profileData, grade: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">О себе</Label>
                    <Input
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <Icon name="ShieldCheck" className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Пароль</h4>
                            <p className="text-sm text-muted-foreground">Последнее изменение: 15 дней назад</p>
                          </div>
                        </div>
                        <Button variant="outline">Изменить</Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <Icon name="Smartphone" className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Двухфакторная аутентификация</h4>
                            <p className="text-sm text-muted-foreground">Дополнительная защита аккаунта</p>
                          </div>
                        </div>
                        <Button variant="outline">Настроить</Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                            <Icon name="Monitor" className="w-5 h-5 text-purple-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Активные сессии</h4>
                            <p className="text-sm text-muted-foreground">2 активных устройства</p>
                          </div>
                        </div>
                        <Button variant="outline">Управление</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    {[
                      { title: 'Email уведомления', description: 'Получать уведомления на почту', icon: 'Mail' },
                      { title: 'Новые задания', description: 'Уведомлять о новых домашних заданиях', icon: 'BookOpen' },
                      { title: 'Результаты проверки', description: 'Уведомлять о проверенных работах', icon: 'FileCheck' },
                      { title: 'Напоминания о дедлайнах', description: 'Напоминать о приближающихся сроках', icon: 'Clock' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
                        <div className="flex items-center gap-3">
                          <Icon name={item.icon} className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Включено
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
