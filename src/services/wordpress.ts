// WordPress API Service for SHE Shop
// This service handles communication with WordPress backend

export interface WordPressOrder {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
  };
  product: {
    id: string;
    name: string;
    configuration: {
      material: string;
      lining: string;
      hardware: string;
      embroidery: string;
      extras: string[];
    };
  };
  delivery: {
    method: string;
    cost: number;
  };
  payment: {
    method: string;
    status: 'pending' | 'paid' | 'failed';
  };
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface WordPressProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  available: boolean;
}

class WordPressService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    // In production, these would come from environment variables
    this.baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://sheshop.pl/wp-json/wp/v2';
    this.apiKey = process.env.NEXT_PUBLIC_WORDPRESS_API_KEY || '';
  }

  // Submit a new order
  async submitOrder(orderData: Omit<WordPressOrder, 'id' | 'status' | 'createdAt'>): Promise<WordPressOrder> {
    try {
      const response = await fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          ...orderData,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const order = await response.json();
      return order;
    } catch (error) {
      console.error('Failed to submit order to WordPress:', error);
      throw new Error('Nie udało się złożyć zamówienia. Spróbuj ponownie później.');
    }
  }

  // Get order status
  async getOrderStatus(orderId: string): Promise<WordPressOrder['status']> {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const order = await response.json();
      return order.status;
    } catch (error) {
      console.error('Failed to get order status:', error);
      throw new Error('Nie udało się sprawdzić statusu zamówienia.');
    }
  }

  // Get available products
  async getProducts(): Promise<WordPressProduct[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products?per_page=100&status=publish`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const products: any[] = await response.json();
      return products.map((product) => ({
        id: product.id.toString(),
        name: product.title.rendered,
        price: product.meta?._price || 0,
        description: product.excerpt.rendered,
        category: product.product_cat || 'uncategorized',
        images: product.images || [],
        available: product.meta?._stock_status === 'instock',
      }));
    } catch (error) {
      console.error('Failed to fetch products from WordPress:', error);
      throw new Error('Nie udało się pobrać listy produktów.');
    }
  }

  // Get product by ID
  async getProduct(productId: string): Promise<WordPressProduct | null> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${productId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const product: any = await response.json();
      return {
        id: product.id.toString(),
        name: product.title.rendered,
        price: product.meta?._price || 0,
        description: product.excerpt.rendered,
        category: product.product_cat || 'uncategorized',
        images: product.images || [],
        available: product.meta?._stock_status === 'instock',
      };
    } catch (error) {
      console.error('Failed to fetch product from WordPress:', error);
      return null;
    }
  }

  // Update order status (admin only)
  async updateOrderStatus(orderId: string, status: WordPressOrder['status']): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw new Error('Nie udało się zaktualizować statusu zamówienia.');
    }
  }

  // Send order confirmation email
  async sendOrderConfirmation(orderId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${orderId}/send-confirmation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to send order confirmation:', error);
      throw new Error('Nie udało się wysłać potwierdzenia zamówienia.');
    }
  }

  // Mock order submission for development
  async mockSubmitOrder(orderData: Omit<WordPressOrder, 'id' | 'status' | 'createdAt'>): Promise<WordPressOrder> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockOrder: WordPressOrder = {
      id: `WP-${Date.now()}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage for demo purposes
    const orders = JSON.parse(localStorage.getItem('she-orders') || '[]');
    orders.push(mockOrder);
    localStorage.setItem('she-orders', JSON.stringify(orders));

    return mockOrder;
  }

  // Get mock orders from localStorage
  getMockOrders(): WordPressOrder[] {
    try {
      return JSON.parse(localStorage.getItem('she-orders') || '[]');
    } catch {
      return [];
    }
  }
}

export const wordpressService = new WordPressService();
