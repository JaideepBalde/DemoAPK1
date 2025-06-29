import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { learningModules } from '@/constants/mockData';
import { BookOpen, Clock, Award, ChevronRight, Play, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function LearnScreen() {
  const { colors } = useTheme();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return colors.success;
      case 'Intermediate': return colors.warning;
      case 'Advanced': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getProgressStatus = (progress: number) => {
    if (progress === 0) return 'Start';
    if (progress === 100) return 'Completed';
    return 'Continue';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
    },
    title: {
      fontSize: 28,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    statsSection: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    statsGrid: {
      flexDirection: 'row',
      gap: 12,
    },
    statCard: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 16,
    },
    statIcon: {
      padding: 12,
      borderRadius: 12,
      backgroundColor: colors.primary + '20',
      marginBottom: 8,
    },
    statValue: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      textAlign: 'center',
    },
    modulesSection: {
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 16,
    },
    moduleCard: {
      marginBottom: 16,
    },
    moduleHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    moduleInfo: {
      flex: 1,
      marginRight: 12,
    },
    moduleTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    moduleDescription: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 8,
    },
    moduleMetadata: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    metadataItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    metadataText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    difficultyBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    difficultyText: {
      fontSize: 11,
      fontFamily: 'Inter-SemiBold',
      textTransform: 'uppercase',
    },
    progressSection: {
      marginBottom: 12,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    progressLabel: {
      fontSize: 13,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    progressValue: {
      fontSize: 13,
      fontFamily: 'Inter-SemiBold',
      color: colors.primary,
    },
    lessonsContainer: {
      marginBottom: 16,
    },
    lessonsTitle: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 8,
    },
    lessonItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      gap: 8,
    },
    lessonBullet: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.textSecondary,
    },
    lessonText: {
      fontSize: 13,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      flex: 1,
    },
    actionButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    completedButton: {
      backgroundColor: colors.success,
    },
    continueButton: {
      backgroundColor: colors.warning,
    },
    actionButtonText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: '#ffffff',
    },
  });

  // Calculate stats
  const totalModules = learningModules.length;
  const completedModules = learningModules.filter(m => m.progress === 100).length;
  const inProgressModules = learningModules.filter(m => m.progress > 0 && m.progress < 100).length;
  const totalLessons = learningModules.reduce((sum, module) => sum + module.lessons.length, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FinLearn Hub</Text>
        <Text style={styles.subtitle}>
          Interactive financial education modules
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <View style={styles.statIcon}>
                <BookOpen size={20} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{totalModules}</Text>
              <Text style={styles.statLabel}>Total Modules</Text>
            </Card>

            <Card style={styles.statCard}>
              <View style={styles.statIcon}>
                <CheckCircle size={20} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{completedModules}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </Card>

            <Card style={styles.statCard}>
              <View style={styles.statIcon}>
                <Play size={20} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{inProgressModules}</Text>
              <Text style={styles.statLabel}>In Progress</Text>
            </Card>

            <Card style={styles.statCard}>
              <View style={styles.statIcon}>
                <Award size={20} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{totalLessons}</Text>
              <Text style={styles.statLabel}>Total Lessons</Text>
            </Card>
          </View>
        </View>

        <View style={styles.modulesSection}>
          <Text style={styles.sectionTitle}>Learning Modules</Text>
          
          {learningModules.map((module) => (
            <Card key={module.id} style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleDescription}>
                    {module.description}
                  </Text>
                  <View style={styles.moduleMetadata}>
                    <View style={styles.metadataItem}>
                      <Clock size={12} color={colors.textSecondary} />
                      <Text style={styles.metadataText}>{module.duration}</Text>
                    </View>
                  </View>
                </View>
                <View style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(module.difficulty) + '20' }
                ]}>
                  <Text style={[
                    styles.difficultyText,
                    { color: getDifficultyColor(module.difficulty) }
                  ]}>
                    {module.difficulty}
                  </Text>
                </View>
              </View>

              {module.progress > 0 && (
                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Progress</Text>
                    <Text style={styles.progressValue}>{module.progress}%</Text>
                  </View>
                  <ProgressBar progress={module.progress} />
                </View>
              )}

              <View style={styles.lessonsContainer}>
                <Text style={styles.lessonsTitle}>
                  Lessons ({module.lessons.length})
                </Text>
                {module.lessons.slice(0, 3).map((lesson, index) => (
                  <View key={index} style={styles.lessonItem}>
                    <View style={styles.lessonBullet} />
                    <Text style={styles.lessonText}>{lesson}</Text>
                  </View>
                ))}
                {module.lessons.length > 3 && (
                  <View style={styles.lessonItem}>
                    <View style={styles.lessonBullet} />
                    <Text style={styles.lessonText}>
                      ... and {module.lessons.length - 3} more lessons
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  module.progress === 100 && styles.completedButton,
                  module.progress > 0 && module.progress  < 100 && styles.continueButton,
                ]}
                onPress={() => {
                  // Navigate to module detail screen
                  console.log('Navigate to module:', module.id);
                }}
              >
                {module.progress === 100 ? (
                  <CheckCircle size={16} color="#ffffff" />
                ) : (
                  <Play size={16} color="#ffffff" />
                )}
                <Text style={styles.actionButtonText}>
                  {getProgressStatus(module.progress)}
                </Text>
                <ChevronRight size={16} color="#ffffff" />
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}