"use client";

import React, { useState } from "react";

interface PaymentProcessorProps {
  amount: number;
  currency: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
  onCancel: () => void;
}

export default function PaymentProcessor({ 
  amount, 
  currency, 
  onSuccess, 
  onFailure, 
  onCancel 
}: PaymentProcessorProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handleCardPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock payment ID
      const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      onSuccess(paymentId);
    } catch (error) {
      onFailure('Błąd podczas przetwarzania płatności');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTransferPayment = () => {
    // Show bank transfer details
    const transferDetails = {
      bank: 'Bank SHE',
      account: '12 1234 5678 9012 3456 7890 1234',
      recipient: 'SHE Shop Sp. z o.o.',
      amount: `${amount} ${currency}`,
      title: `Zamówienie SHE-${Date.now()}`
    };

    // Copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(transferDetails, null, 2));
    
    onSuccess(`TRANSFER-${Date.now()}`);
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate PayPal payment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const paymentId = `PAYPAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      onSuccess(paymentId);
    } catch (error) {
      onFailure('Błąd podczas płatności PayPal');
    } finally {
      setIsProcessing(false);
    }
  };

  const processPayment = () => {
    switch (paymentMethod) {
      case 'card':
        handleCardPayment();
        break;
      case 'transfer':
        handleTransferPayment();
        break;
      case 'paypal':
        handlePayPalPayment();
        break;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Płatność online
      </h3>

      {/* Amount Display */}
      <div className="text-center mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="text-2xl font-bold text-gray-900">
          {amount} {currency}
        </div>
        <div className="text-sm text-gray-600">Kwota do zapłaty</div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4 mb-6">
        <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value as 'card')}
            className="mr-3"
          />
          <div className="flex items-center">
            <span className="text-2xl mr-3">💳</span>
            <div>
              <div className="font-medium">Karta płatnicza</div>
              <div className="text-sm text-gray-600">Visa, Mastercard, Maestro</div>
            </div>
          </div>
        </label>

        <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
            className="mr-3"
          />
          <div className="flex items-center">
            <span className="text-2xl mr-3">🔵</span>
            <div>
              <div className="font-medium">PayPal</div>
              <div className="text-sm text-gray-600">Szybka i bezpieczna płatność</div>
            </div>
          </div>
        </label>

        <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="transfer"
            checked={paymentMethod === 'transfer'}
            onChange={(e) => setPaymentMethod(e.target.value as 'transfer')}
            className="mr-3"
          />
          <div className="flex items-center">
            <span className="text-2xl mr-3">🏦</span>
            <div>
              <div className="font-medium">Przelew bankowy</div>
              <div className="text-sm text-gray-600">Przed realizacją zamówienia</div>
            </div>
          </div>
        </label>
      </div>

      {/* Card Details Form */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numer karty
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data ważności
              </label>
              <input
                type="text"
                placeholder="MM/RR"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imię i nazwisko na karcie
            </label>
            <input
              type="text"
              placeholder="Jan Kowalski"
              value={cardDetails.name}
              onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Transfer Details */}
      {paymentMethod === 'transfer' && (
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-3">Dane do przelewu:</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <div><strong>Bank:</strong> Bank SHE</div>
            <div><strong>Konto:</strong> 12 1234 5678 9012 3456 7890 1234</div>
            <div><strong>Odbiorca:</strong> SHE Shop Sp. z o.o.</div>
            <div><strong>Kwota:</strong> {amount} {currency}</div>
            <div><strong>Tytuł:</strong> Zamówienie SHE-{Date.now()}</div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={processPayment}
          disabled={isProcessing || (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name))}
          className="w-full px-6 py-3 bg-amber-700 text-white rounded-xl hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
        >
          {isProcessing ? 'Przetwarzanie...' : `Zapłać ${amount} ${currency}`}
        </button>
        
        <button
          onClick={onCancel}
          className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
        >
          Anuluj
        </button>
      </div>

      {/* Security Notice */}
      <div className="mt-4 text-center">
        <div className="text-xs text-gray-500">
          🔒 Płatności są szyfrowane i bezpieczne
        </div>
      </div>
    </div>
  );
}
