// Email Service for SHE Shop
// This service handles sending order confirmations and notifications

export interface EmailData {
  to: string;
  subject: string;
  template: 'order-confirmation' | 'order-status-update' | 'payment-received' | 'shipping-notification';
  data: Record<string, any>;
}

export interface OrderConfirmationData {
  orderId: string;
  customerName: string;
  productName: string;
  totalAmount: number;
  currency: string;
  deliveryMethod: string;
  estimatedDelivery: string;
  orderDate: string;
}

export interface OrderStatusData {
  orderId: string;
  customerName: string;
  status: string;
  statusDescription: string;
  estimatedCompletion?: string;
}

export interface PaymentData {
  orderId: string;
  customerName: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentDate: string;
}

export interface ShippingData {
  orderId: string;
  customerName: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  shippingDate: string;
}

class EmailService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    // In production, these would come from environment variables
    this.apiUrl = process.env.NEXT_PUBLIC_EMAIL_API_URL || 'https://api.sheshop.pl/email';
    this.apiKey = process.env.NEXT_PUBLIC_EMAIL_API_KEY || '';
  }

  // Send order confirmation email
  async sendOrderConfirmation(data: OrderConfirmationData): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: data.customerEmail || 'customer@example.com',
        subject: `Potwierdzenie zamówienia #${data.orderId} - SHE Shop`,
        template: 'order-confirmation',
        data: {
          orderId: data.orderId,
          customerName: data.customerName,
          productName: data.productName,
          totalAmount: data.totalAmount,
          currency: data.currency,
          deliveryMethod: data.deliveryMethod,
          estimatedDelivery: data.estimatedDelivery,
          orderDate: data.orderDate,
        }
      };

      const response = await fetch(`${this.apiUrl}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Order confirmation email sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send order confirmation email:', error);
      return false;
    }
  }

  // Send order status update email
  async sendOrderStatusUpdate(data: OrderStatusData): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: data.customerEmail || 'customer@example.com',
        subject: `Aktualizacja statusu zamówienia #${data.orderId} - SHE Shop`,
        template: 'order-status-update',
        data: {
          orderId: data.orderId,
          customerName: data.customerName,
          status: data.status,
          statusDescription: data.statusDescription,
          estimatedCompletion: data.estimatedCompletion,
        }
      };

      const response = await fetch(`${this.apiUrl}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Order status update email sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send order status update email:', error);
      return false;
    }
  }

  // Send payment confirmation email
  async sendPaymentConfirmation(data: PaymentData): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: data.customerEmail || 'customer@example.com',
        subject: `Potwierdzenie płatności - SHE Shop`,
        template: 'payment-received',
        data: {
          orderId: data.orderId,
          customerName: data.customerName,
          amount: data.amount,
          currency: data.currency,
          paymentMethod: data.paymentMethod,
          paymentDate: data.paymentDate,
        }
      };

      const response = await fetch(`${this.apiUrl}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Payment confirmation email sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send payment confirmation email:', error);
      return false;
    }
  }

  // Send shipping notification email
  async sendShippingNotification(data: ShippingData): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: data.customerEmail || 'customer@example.com',
        subject: `Twoje zamówienie zostało wysłane! - SHE Shop`,
        template: 'shipping-notification',
        data: {
          orderId: data.orderId,
          customerName: data.customerName,
          trackingNumber: data.trackingNumber,
          carrier: data.carrier,
          estimatedDelivery: data.estimatedDelivery,
          shippingDate: data.shippingDate,
        }
      };

      const response = await fetch(`${this.apiUrl}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Shipping notification email sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send shipping notification email:', error);
      return false;
    }
  }

  // Mock email sending for development
  async mockSendEmail(emailData: EmailData): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store email in localStorage for demo purposes
    const emails = JSON.parse(localStorage.getItem('she-emails') || '[]');
    emails.push({
      ...emailData,
      id: `EMAIL-${Date.now()}`,
      sentAt: new Date().toISOString(),
      status: 'sent'
    });
    localStorage.setItem('she-emails', JSON.stringify(emails));

    console.log('Mock email sent:', emailData);
    return true;
  }

  // Get mock emails from localStorage
  getMockEmails() {
    try {
      return JSON.parse(localStorage.getItem('she-emails') || '[]');
    } catch {
      return [];
    }
  }

  // Generate email templates
  generateEmailTemplate(template: EmailData['template'], data: Record<string, any>): string {
    switch (template) {
      case 'order-confirmation':
        return this.generateOrderConfirmationTemplate(data);
      case 'order-status-update':
        return this.generateOrderStatusTemplate(data);
      case 'payment-received':
        return this.generatePaymentTemplate(data);
      case 'shipping-notification':
        return this.generateShippingTemplate(data);
      default:
        return '';
    }
  }

  private generateOrderConfirmationTemplate(data: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Potwierdzenie zamówienia - SHE Shop</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B7355;">SHE Shop</h1>
            <h2 style="color: #333;">Potwierdzenie zamówienia</h2>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3>Szczegóły zamówienia #${data.orderId}</h3>
            <p><strong>Data zamówienia:</strong> ${data.orderDate}</p>
            <p><strong>Produkt:</strong> ${data.productName}</p>
            <p><strong>Kwota:</strong> ${data.totalAmount} ${data.currency}</p>
            <p><strong>Sposób dostawy:</strong> ${data.deliveryMethod}</p>
            <p><strong>Szacowana data dostawy:</strong> ${data.estimatedDelivery}</p>
          </div>
          
          <p>Dziękujemy za złożenie zamówienia w SHE Shop!</p>
          <p>Będziemy informować Cię o statusie realizacji zamówienia.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              SHE Shop - Personalizowane produkty tekstylne<br>
              www.sheshop.pl
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateOrderStatusTemplate(data: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Aktualizacja statusu zamówienia - SHE Shop</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B7355;">SHE Shop</h1>
            <h2 style="color: #333;">Aktualizacja statusu zamówienia</h2>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3>Zamówienie #${data.orderId}</h3>
            <p><strong>Status:</strong> ${data.status}</p>
            <p><strong>Opis:</strong> ${data.statusDescription}</p>
            ${data.estimatedCompletion ? `<p><strong>Szacowane zakończenie:</strong> ${data.estimatedCompletion}</p>` : ''}
          </div>
          
          <p>Twoje zamówienie jest w trakcie realizacji.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              SHE Shop - Personalizowane produkty tekstylne<br>
              www.sheshop.pl
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generatePaymentTemplate(data: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Potwierdzenie płatności - SHE Shop</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B7355;">SHE Shop</h1>
            <h2 style="color: #333;">Potwierdzenie płatności</h2>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3>Płatność za zamówienie #${data.orderId}</h3>
            <p><strong>Kwota:</strong> ${data.amount} ${data.currency}</p>
            <p><strong>Sposób płatności:</strong> ${data.paymentMethod}</p>
            <p><strong>Data płatności:</strong> ${data.paymentDate}</p>
          </div>
          
          <p>Płatność została zrealizowana pomyślnie.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              SHE Shop - Personalizowane produkty tekstylne<br>
              www.sheshop.pl
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateShippingTemplate(data: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Zamówienie wysłane - SHE Shop</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B7355;">SHE Shop</h1>
            <h2 style="color: #333;">Twoje zamówienie zostało wysłane!</h2>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3>Zamówienie #${data.orderId}</h3>
            <p><strong>Numer śledzenia:</strong> ${data.trackingNumber}</p>
            <p><strong>Przewoźnik:</strong> ${data.carrier}</p>
            <p><strong>Data wysłania:</strong> ${data.shippingDate}</p>
            <p><strong>Szacowana data dostawy:</strong> ${data.estimatedDelivery}</p>
          </div>
          
          <p>Twoje zamówienie zostało wysłane i jest w drodze!</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              SHE Shop - Personalizowane produkty tekstylne<br>
              www.sheshop.pl
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const emailService = new EmailService();
