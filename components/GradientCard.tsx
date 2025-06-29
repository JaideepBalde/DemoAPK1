import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface GradientCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  colors?: string[];
  padding?: number;
}

export function GradientCard({ 
  children, 
  style, 
  colors: gradientColors,
  padding = 16 
}: GradientCardProps) {
  const { colors, theme } = useTheme();

  const defaultColors = theme === 'light' 
    ? [colors.primary + '10', colors.primaryLight + '05']
    : [colors.primary + '20', colors.primary + '10'];

  const styles = StyleSheet.create({
    container: {
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    gradient: {
      padding: padding,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={gradientColors || defaultColors}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  );
}