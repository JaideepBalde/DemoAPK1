import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}

export function ProgressBar({ 
  progress, 
  height = 6, 
  backgroundColor,
  progressColor 
}: ProgressBarProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: height,
      backgroundColor: backgroundColor || colors.border,
      borderRadius: height / 2,
      overflow: 'hidden',
    },
    progress: {
      height: '100%',
      backgroundColor: progressColor || colors.primary,
      borderRadius: height / 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${Math.min(progress, 100)}%` }]} />
    </View>
  );
}