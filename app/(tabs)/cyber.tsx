import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/Card';
import { cyberThreats } from '@/constants/mockData';
import { Shield, TriangleAlert as AlertTriangle, Clock, Filter, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function CyberRiskScreen() {
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return colors.error;
      case 'high': return '#f59e0b';
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return XCircle;
      case 'high': return AlertTriangle;
      case 'medium': return AlertCircle;
      case 'low': return CheckCircle;
      default: return Shield;
    }
  };

  const filteredThreats = cyberThreats.filter(threat => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'recent') {
      const threatDate = new Date(threat.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return threatDate >= weekAgo;
    }
    if (selectedFilter === 'high') {
      return threat.severity === 'high' || threat.severity === 'critical';
    }
    return threat.severity === selectedFilter;
  });

  const getSeverityStats = () => {
    const stats = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };
    
    cyberThreats.forEach(threat => {
      stats[threat.severity as keyof typeof stats]++;
    });
    
    return stats;
  };

  const severityStats = getSeverityStats();

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
    statValue: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      textAlign: 'center',
    },
    filtersSection: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    filtersContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    filterTextActive: {
      color: '#ffffff',
    },
    threatsSection: {
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 16,
    },
    threatCard: {
      marginBottom: 16,
    },
    threatHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    threatInfo: {
      flex: 1,
      marginRight: 12,
    },
    threatTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    threatCompany: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.primary,
      marginBottom: 4,
    },
    threatDate: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    severityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    severityText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      textTransform: 'uppercase',
    },
    threatDescription: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 12,
    },
    impactSection: {
      marginBottom: 12,
    },
    impactTitle: {
      fontSize: 13,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    impactText: {
      fontSize: 13,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    recommendationSection: {
      backgroundColor: colors.surface,
      padding: 12,
      borderRadius: 8,
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
    },
    recommendationTitle: {
      fontSize: 13,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
    },
    recommendationText: {
      fontSize: 13,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
  });

  const filters = [
    { key: 'all', label: 'All Threats' },
    { key: 'recent', label: 'Last 7 Days' },
    { key: 'high', label: 'High Priority' },
    { key: 'critical', label: 'Critical' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cyber Risk Monitor</Text>
        <Text style={styles.subtitle}>
          Financial sector threat intelligence
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.error }]}>
                {severityStats.critical}
              </Text>
              <Text style={styles.statLabel}>Critical</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#f59e0b' }]}>
                {severityStats.high}
              </Text>
              <Text style={styles.statLabel}>High</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.warning }]}>
                {severityStats.medium}
              </Text>
              <Text style={styles.statLabel}>Medium</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.success }]}>
                {severityStats.low}
              </Text>
              <Text style={styles.statLabel}>Low</Text>
            </Card>
          </View>
        </View>

        <View style={styles.filtersSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.key && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.filterTextActive,
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.threatsSection}>
          <Text style={styles.sectionTitle}>
            Threat Alerts ({filteredThreats.length})
          </Text>
          
          {filteredThreats.map((threat) => {
            const SeverityIcon = getSeverityIcon(threat.severity);
            const severityColor = getSeverityColor(threat.severity);
            
            return (
              <Card key={threat.id} style={styles.threatCard}>
                <View style={styles.threatHeader}>
                  <View style={styles.threatInfo}>
                    <Text style={styles.threatTitle}>{threat.title}</Text>
                    <Text style={styles.threatCompany}>{threat.company}</Text>
                    <Text style={styles.threatDate}>
                      {new Date(threat.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Text>
                  </View>
                  <View style={[
                    styles.severityContainer,
                    { backgroundColor: severityColor + '20' }
                  ]}>
                    <SeverityIcon size={12} color={severityColor} />
                    <Text style={[styles.severityText, { color: severityColor }]}>
                      {threat.severity}
                    </Text>
                  </View>
                </View>

                <Text style={styles.threatDescription}>
                  {threat.description}
                </Text>

                <View style={styles.impactSection}>
                  <Text style={styles.impactTitle}>Impact:</Text>
                  <Text style={styles.impactText}>{threat.impact}</Text>
                </View>

                <View style={styles.recommendationSection}>
                  <Text style={styles.recommendationTitle}>Recommendation:</Text>
                  <Text style={styles.recommendationText}>
                    {threat.recommendation}
                  </Text>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}