// Mock authentication service that works without database
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private static readonly MOCK_USER: User = {
    id: 1,
    email: 'demo@example.com',
    first_name: 'Demo',
    last_name: 'User'
  };

  private static readonly MOCK_TOKEN = 'mock-jwt-token-12345';

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('AuthService.login called with:', credentials);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check against hardcoded demo credentials
    if (credentials.email === 'demo@example.com' && credentials.password === 'demo123') {
      console.log('Demo credentials matched, setting localStorage');
      
      // Store in localStorage
      localStorage.setItem('token', this.MOCK_TOKEN);
      localStorage.setItem('user', JSON.stringify(this.MOCK_USER));
      localStorage.setItem('isLoggedIn', 'true');
      
      console.log('localStorage set, returning response');
      
      return {
        user: this.MOCK_USER,
        token: this.MOCK_TOKEN
      };
    }
    
    console.log('Invalid credentials');
    throw new Error('Invalid email or password');
  }

  static async register(userData: RegisterData): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, always succeed
    const newUser: User = {
      id: Date.now(),
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName
    };
    
    // Store in localStorage
    localStorage.setItem('token', this.MOCK_TOKEN);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');
    
    return {
      user: newUser,
      token: this.MOCK_TOKEN
    };
  }

  static async getCurrentUser(): Promise<User | null> {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  static logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  }

  static isAuthenticated(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log('AuthService.isAuthenticated called, result:', isLoggedIn);
    return isLoggedIn;
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static getUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
}

export default AuthService;
