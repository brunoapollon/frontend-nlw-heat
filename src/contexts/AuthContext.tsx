import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  avatar_url: string;
  login: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
    login: string;
  };
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
};

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=fa10ef6d60b9c812befa`;

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('/authentication/', {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);
    setUser(user);
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');
    if (token) {
      api.defaults.headers.common.authorization = `Barer ${token}`;

      api.get<User>('/user/').then(response => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithGithubCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithGithubCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
