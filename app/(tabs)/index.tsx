import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/Card';
import { GradientCard } from '@/components/GradientCard';
import { marketData, newsData } from '@/constants/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Activity,
  Newspaper,
  ChevronRight,
  DollarSign
} from 'lucide-react-native';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatChange = (change: number, percent: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${(percent * 100).toFixed(2)}%)`;
  };

  const getSentimentColor = (score: number) => {
    if (score >= 70) return colors.success;
    if (score >= 40) return colors.warning;
    return colors.error;
  };

  const getSentimentLabel = (score: number) => {
    if (score >= 70) return 'Bullish';
    if (score >= 40) return 'Neutral';
    return 'Bearish';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
    },
    greeting: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    section: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 16,
    },
    marketGrid: {
      flexDirection: 'row',
      gap: 12,
    },
    marketCard: {
      flex: 1,
    },
    marketValue: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    marketLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    marketChange: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    changeText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
    },
    sentimentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    sentimentScore: {
      fontSize: 32,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    sentimentLabel: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      marginTop: 4,
    },
    sentimentIcon: {
      padding: 12,
      borderRadius: 12,
      backgroundColor: colors.surface,
    },
    volatileRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    sectorName: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    sectorChange: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
    },
    newsCard: {
      marginBottom: 12,
    },
    newsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    newsTitle: {
      flex: 1,
      fontSize: 15,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginRight: 8,
    },
    newsTime: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    newsSummary: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 20,
    },
    quickActions: {
      flexDirection: 'row',
      gap: 12,
    },
    actionCard: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
    },
    actionIcon: {
      padding: 12,
      borderRadius: 12,
      backgroundColor: colors.primary + '20',
      marginBottom: 8,
    },
    actionLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Welcome back, {user?.name?.split(' ')[0] || 'Jaideep'}!
          </Text>
          <Text style={styles.subtitle}>
            Your financial intelligence dashboard
          </Text>
        </View>

        {/* Market Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Market Overview</Text>
          <View style={styles.marketGrid}>
            <Card style={styles.marketCard}>
              <Text style={styles.marketLabel}>NIFTY 50</Text>
              <Text style={styles.marketValue}>
                {marketData.nifty.value.toLocaleString('en-IN')}
              </Text>
              <View style={styles.marketChange}>
                {marketData.nifty.change >= 0 ? (
                  <TrendingUp size={16} color={colors.success} />
                ) : (
                  <TrendingDown size={16} color={colors.error} />
                )}
                <Text style={[
                  styles.changeText,
                  { color: marketData.nifty.change >= 0 ? colors.success : colors.error }
                ]}>
                  {formatChange(marketData.nifty.change, marketData.nifty.changePercent)}
                </Text>
              </View>
            </Card>

            <Card style={styles.marketCard}>
              <Text style={styles.marketLabel}>SENSEX</Text>
              <Text style={styles.marketValue}>
                {marketData.sensex.value.toLocaleString('en-IN')}
              </Text>
              <View style={styles.marketChange}>
                {marketData.sensex.change >= 0 ? (
                  <TrendingUp size={16} color={colors.success} />
                ) : (
                  <TrendingDown size={16} color={colors.error} />
                )}
                <Text style={[
                  styles.changeText,
                  { color: marketData.sensex.change >= 0 ? colors.success : colors.error }
                ]}>
                  {formatChange(marketData.sensex.change, marketData.sensex.changePercent)}
                </Text>
              </View>
            </Card>
          </View>
        </View>

        {/* AI Sentiment */}
        <View style={styles.section}>
          <GradientCard>
            <View style={styles.sentimentHeader}>
              <View>
                <Text style={[styles.sectionTitle, { marginBottom: 0, color: colors.text }]}>
                  AI Market Sentiment
                </Text>
                <Text style={styles.sentimentScore}>
                  {marketData.sentimentScore}
                </Text>
                <Text style={[
                  styles.sentimentLabel,
                  { color: getSentimentColor(marketData.sentimentScore) }
                ]}>
                  {getSentimentLabel(marketData.sentimentScore)}
                </Text>
              </View>
              <View style={styles.sentimentIcon}>
                <Brain size={24} color={colors.primary} />
              </View>
            </View>
          </GradientCard>
        </View>

        {/* Volatile Sectors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most Volatile Sectors</Text>
          <Card>
            {marketData.volatileSectors.map((sector, index) => (
              <View key={sector.name} style={styles.volatileRow}>
                <Text style={styles.sectorName}>{sector.name}</Text>
                <Text style={[styles.sectorChange, { color: sector.color }]}>
                  {sector.change >= 0 ? '+' : ''}{sector.change}%
                </Text>
              </View>
            ))}
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity>
              <Card style={styles.actionCard}>
                <View style={styles.actionIcon}>
                  <Brain size={20} color={colors.primary} />
                </View>
                <Text style={styles.actionLabel}>Analyze Sentiment</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card style={styles.actionCard}>
                <View style={styles.actionIcon}>
                  <DollarSign size={20} color={colors.primary} />
                </View>
                <Text style={styles.actionLabel}>Add Stock</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card style={styles.actionCard}>
                <View style={styles.actionIcon}>
                  <Activity size={20} color={colors.primary} />
                </View>
                <Text style={styles.actionLabel}>Risk Monitor</Text>
              </Card>
            </TouchableOpacity>
          </View>
        </View>

        {/* Market News */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Market News</Text>
          {newsData.map((news) => (
            <TouchableOpacity key={news.id}>
              <Card style={styles.newsCard}>
                <View style={styles.newsHeader}>
                  <Text style={styles.newsTitle}>{news.title}</Text>
                  <Text style={styles.newsTime}>{news.time}</Text>
                </View>
                <Text style={styles.newsSummary}>{news.summary}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}