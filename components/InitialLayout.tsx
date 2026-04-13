import { useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const hasRedirected = useRef(false); // 👈 กันยิงซ้ำ

  useEffect(() => {
    if (!isLoaded || hasRedirected.current) return;

    const inAuthScreen = segments[0] === '(auth)';

    if (!isSignedIn && !inAuthScreen) {
      hasRedirected.current = true;
      router.replace('/(auth)/login');
    } else if (isSignedIn && inAuthScreen) {
      hasRedirected.current = true;
      router.replace('/(tabs)');
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
}
