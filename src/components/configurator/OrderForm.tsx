"use client";

import React, { useState } from "react";
import { useConfigurator } from "@/store/configurator";
import { wordpressService, type WordPressOrder } from "@/services/wordpress";

interface OrderFormData {
  customerName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  deliveryMethod: "standard" | "express" | "pickup";
  paymentMethod: "card" | "transfer" | "cash";
  notes: string;
  termsAccepted: boolean;
  marketingConsent: boolean;
}

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OrderFormData) => void;
  totalPrice: number;
}

export default function OrderForm({ isOpen, onClose, onSubmit, totalPrice }: OrderFormProps) {
  const { selectedProduct, material, lining, hardware, embroidery, extras } = useConfigurator();
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "Polska"
    },
    deliveryMethod: "standard",
    paymentMethod: "transfer",
    notes: "",
    termsAccepted: false,
    marketingConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleInputChange = (field: keyof OrderFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field: keyof OrderFormData['address'], value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      alert("Musisz zaakceptować regulamin");
      return;
    }

    if (!selectedProduct) {
      alert("Nie wybrano produktu");
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare order data for WordPress
      const orderData = {
        customer: {
          name: formData.customerName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        product: {
          id: selectedProduct,
          name: selectedProduct, // This would come from product config
          configuration: {
            material: material || '',
            lining: lining || '',
            hardware: hardware || '',
            embroidery: embroidery.text || embroidery.presetId || '',
            extras: extras || [],
          },
        },
        delivery: {
          method: formData.deliveryMethod,
          cost: formData.deliveryMethod === 'standard' ? 15 : 
                formData.deliveryMethod === 'express' ? 25 : 0,
        },
        payment: {
          method: formData.paymentMethod,
          status: 'pending' as const,
        },
        total: totalPrice + (formData.deliveryMethod === 'standard' ? 15 : 
                           formData.deliveryMethod === 'express' ? 25 : 0),
        notes: formData.notes,
      };

      // Submit order to WordPress (or mock for development)
      const order = await wordpressService.mockSubmitOrder(orderData);
      setOrderId(order.id);

      // Show success message
      alert(`Zamówienie zostało złożone pomyślnie! ID: ${order.id}`);
      
      // Call the parent onSubmit callback
      onSubmit(formData);
      
      // Close the form after a delay
      setTimeout(() => {
        onClose();
        setOrderId(null);
      }, 2000);
      
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('Błąd podczas składania zamówienia. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Złóż zamówienie</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {orderId ? (
          // Success state
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h4 className="text-2xl font-bold text-green-600 mb-4">
              Zamówienie złożone!
            </h4>
            <p className="text-lg text-gray-700 mb-4">
              Twoje zamówienie zostało przyjęte i jest w trakcie realizacji.
            </p>
            <div className="bg-gray-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600">Numer zamówienia:</p>
              <p className="text-lg font-mono font-bold text-gray-900">{orderId}</p>
            </div>
            <p className="text-sm text-gray-600">
              Otrzymasz email z potwierdzeniem i szczegółami zamówienia.
            </p>
          </div>
        ) : (
          // Order form
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Dane kontaktowe</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="jan@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="+48 123 456 789"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Adres dostawy</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ulica i numer *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="ul. Przykładowa 123"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Miasto *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Warszawa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kod pocztowy *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address.postalCode}
                      onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="00-000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kraj
                    </label>
                    <input
                      type="text"
                      value={formData.address.country}
                      onChange={(e) => handleAddressChange('country', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Polska"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery & Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Sposób dostawy</h4>
                <div className="space-y-3">
                  {[
                    { value: "standard", label: "Dostawa standardowa", price: 15, time: "3-5 dni roboczych" },
                    { value: "express", label: "Dostawa ekspresowa", price: 25, time: "1-2 dni robocze" },
                    { value: "pickup", label: "Odbiór osobisty", price: 0, time: "W dniu odbioru" }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={option.value}
                        checked={formData.deliveryMethod === option.value}
                        onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.time}</div>
                      </div>
                      <div className="text-sm font-medium">
                        {option.price > 0 ? `+${option.price} PLN` : 'Bezpłatnie'}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Sposób płatności</h4>
                <div className="space-y-3">
                  {[
                    { value: "transfer", label: "Przelew bankowy", description: "Przed realizacją" },
                    { value: "card", label: "Karta płatnicza", description: "Online" },
                    { value: "cash", label: "Płatność przy odbiorze", description: "Gotówka" }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.value}
                        checked={formData.paymentMethod === option.value}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uwagi do zamówienia
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Dodatkowe informacje, preferencje..."
              />
            </div>

            {/* Terms & Marketing */}
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  className="mr-3"
                />
                <span className="text-sm text-gray-700">
                  Akceptuję <a href="#" className="text-amber-600 hover:underline">regulamin</a> i <a href="#" className="text-amber-600 hover:underline">politykę prywatności</a> *
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.marketingConsent}
                  onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                  className="mr-3"
                />
                <span className="text-sm text-gray-700">
                  Wyrażam zgodę na otrzymywanie informacji marketingowych (opcjonalnie)
                </span>
              </label>
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Cena produktu:</span>
                <span>{totalPrice} PLN</span>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold border-t pt-2 mt-2">
                <span>Dostawa:</span>
                <span>
                  {formData.deliveryMethod === 'standard' ? '+15 PLN' : 
                   formData.deliveryMethod === 'express' ? '+25 PLN' : 'Bezpłatnie'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold border-t pt-2 mt-2">
                <span>Razem:</span>
                <span>
                  {totalPrice + (formData.deliveryMethod === 'standard' ? 15 : 
                                formData.deliveryMethod === 'express' ? 25 : 0)} PLN
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium"
              >
                Anuluj
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.termsAccepted}
                className="flex-1 px-6 py-3 bg-amber-700 text-white rounded-xl hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                {isSubmitting ? 'Składanie zamówienia...' : 'Złóż zamówienie'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
