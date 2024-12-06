'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Pencil, Trash2, GripVertical, Plus } from 'lucide-react';

interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  order: number;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch plans
  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      if (response.ok) {
        const data = await response.json();
        setPlans(data.sort((a: Plan, b: Plan) => a.order - b.order));
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Delete plan
  const deletePlan = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este plano?')) return;

    try {
      const response = await fetch(`/api/plans/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPlans(plans.filter(plan => plan.id !== id));
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  // Handle drag and drop reordering
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(plans);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    setPlans(updatedItems);

    // Update order in backend
    try {
      await fetch('/api/plans/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plans: updatedItems }),
      });
    } catch (error) {
      console.error('Error updating plan order:', error);
    }
  };

  // Edit plan
  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsEditing(true);
  };

  // Create new plan
  const handleCreate = () => {
    setEditingPlan({
      id: '',
      title: '',
      description: '',
      price: 0,
      features: [''],
      order: plans.length,
    });
    setIsEditing(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Planos</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Novo Plano
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="plans">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {plans.map((plan, index) => (
                <Draggable key={plan.id} draggableId={plan.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-gray-800 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="text-gray-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
                            <p className="text-gray-400">{plan.description}</p>
                            <p className="text-lg font-semibold text-blue-400 mt-2">
                              R$ {plan.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(plan)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Pencil size={20} />
                          </button>
                          <button
                            onClick={() => deletePlan(plan.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <PlanForm
            plan={editingPlan}
            onClose={() => {
              setIsEditing(false);
              setEditingPlan(null);
            }}
            onSave={async (updatedPlan) => {
              try {
                const method = updatedPlan.id ? 'PUT' : 'POST';
                const url = updatedPlan.id ? `/api/plans/${updatedPlan.id}` : '/api/plans';

                const response = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updatedPlan),
                });

                if (response.ok) {
                  fetchPlans();
                  setIsEditing(false);
                  setEditingPlan(null);
                }
              } catch (error) {
                console.error('Error saving plan:', error);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

function PlanForm({ plan, onClose, onSave }: { plan: Plan | null, onClose: () => void, onSave: (plan: Plan) => void }) {
  const [formData, setFormData] = useState(plan || {
    title: '',
    description: '',
    price: 0,
    features: [''],
    order: 0,
  });

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        {plan?.id ? 'Editar Plano' : 'Novo Plano'}
      </h2>

      <form onSubmit={(e) => {
        e.preventDefault();
        onSave(formData as Plan);
      }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Título
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Descrição
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Preço
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Características
          </label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="px-3 py-2 text-red-500 hover:text-red-400"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="text-blue-500 hover:text-blue-400"
          >
            + Adicionar característica
          </button>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
