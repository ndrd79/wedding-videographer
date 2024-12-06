'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings, Bell, Shield, Palette } from 'lucide-react';

export default function ConfiguracoesPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Configurações</h1>
        <p className="text-gray-400">Gerencie as configurações do sistema</p>
      </div>

      <div className="grid gap-6">
        {/* Perfil */}
        <Card className="p-6 bg-[#1C1F2C] border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">Perfil</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Nome</label>
              <Input
                defaultValue="Admin"
                className="mt-1 bg-[#282D3F] border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <Input
                defaultValue="admin@example.com"
                className="mt-1 bg-[#282D3F] border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Bio</label>
              <Textarea
                defaultValue="Administrador do sistema"
                className="mt-1 bg-[#282D3F] border-gray-700 text-white"
              />
            </div>
          </div>
        </Card>

        {/* Notificações */}
        <Card className="p-6 bg-[#1C1F2C] border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">Notificações</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Notificações por Email</p>
              <p className="text-sm text-gray-400">
                Receba notificações sobre novas mensagens e eventos
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </Card>

        {/* Segurança */}
        <Card className="p-6 bg-[#1C1F2C] border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">Segurança</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Autenticação de Dois Fatores</p>
                <p className="text-sm text-gray-400">
                  Adicione uma camada extra de segurança
                </p>
              </div>
              <Switch
                checked={twoFactor}
                onCheckedChange={setTwoFactor}
              />
            </div>
            <div>
              <Button
                variant="outline"
                className="w-full mt-4 bg-[#282D3F] text-white border-gray-700 hover:bg-gray-700"
              >
                Alterar Senha
              </Button>
            </div>
          </div>
        </Card>

        {/* Aparência */}
        <Card className="p-6 bg-[#1C1F2C] border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">Aparência</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Modo Escuro</p>
              <p className="text-sm text-gray-400">
                Alterne entre tema claro e escuro
              </p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-[#D4AF37] text-black hover:bg-[#B39030]">
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
}
