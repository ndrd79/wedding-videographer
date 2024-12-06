'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PlusIcon, Trash2Icon, EditIcon, CheckIcon, XIcon } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  order: number;
}

export default function PlansManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    features: ['']
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
    fetchPlans();
  }, [status, router]);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      const data = await response.json();
      setPlans(data.sort((a: Plan, b: Plan) => a.order - b.order));
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      try {
        await fetch(`/api/plans/${id}`, { method: 'DELETE' });
        setPlans(plans.filter(plan => plan.id !== id));
      } catch (error) {
        console.error('Erro ao excluir plano:', error);
      }
    }
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      price: plan.price.toString(),
      features: plan.features
    });
    setShowForm(true);
  };

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const planData = {
        ...formData,
        price: parseFloat(formData.price),
        features: formData.features.filter(f => f.trim() !== '')
      };

      const method = editingPlan ? 'PUT' : 'POST';
      const url = editingPlan ? `/api/plans/${editingPlan.id}` : '/api/plans';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planData)
      });

      if (response.ok) {
        fetchPlans();
        setShowForm(false);
        setEditingPlan(null);
        setFormData({ name: '', description: '', price: '', features: [''] });
      }
    } catch (error) {
      console.error('Erro ao salvar plano:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Planos</h1>
        <button
          onClick={() => {
            setEditingPlan(null);
            setFormData({ name: '', description: '', price: '', features: [''] });
            setShowForm(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white flex items-center gap-2"
        >
          <PlusIcon size={20} />
          Adicionar Plano
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white">
              {editingPlan ? 'Editar Plano' : 'Novo Plano'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome do Plano
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Características
                </label>
                <div className="space-y-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={e => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ex: Filmagem de 8 horas"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-500 hover:text-red-600 p-2"
                      >
                        <XIcon size={20} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="mt-3 text-blue-400 hover:text-blue-500 text-sm flex items-center gap-1"
                >
                  <PlusIcon size={16} />
                  Adicionar característica
                </button>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPlan(null);
                  }}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white flex items-center gap-2"
                >
                  <CheckIcon size={20} />
                  {editingPlan ? 'Salvar Alterações' : 'Criar Plano'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-gray-800 rounded-lg p-6 relative group"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
              <button
                onClick={() => handleEdit(plan)}
                className="text-blue-400 hover:text-blue-500 p-2"
                title="Editar plano"
              >
                <EditIcon size={20} />
              </button>
              <button
                onClick={() => handleDelete(plan.id)}
                className="text-red-500 hover:text-red-600 p-2"
                title="Excluir plano"
              >
                <Trash2Icon size={20} />
              </button>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
              <p className="text-gray-400 mt-2">{plan.description}</p>
              <div className="text-3xl font-bold text-blue-400 mt-4">
                R$ {plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <ul className="space-y-2 text-gray-300">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckIcon size={16} className="text-blue-400 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {plans.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Nenhum plano cadastrado ainda.
          </div>
        )}
      </div>
    </div>
  );
}
