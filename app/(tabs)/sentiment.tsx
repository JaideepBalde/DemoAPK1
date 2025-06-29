import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { sentimentAnalysis } from '@/constants/mockData';
import { Search, TrendingUp, TrendingDown, ChartBar as BarChart3 } from 'lucide-react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function SentimentScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Simulate search with random data
      setSearchResults({
        query: searchQuery,
        sentiment: Math.floor(Math.random() * 100),
        confidence: Math.floor(Math.random() * 30) + 70,
        phrases: sentimentAnalysis.phrases,
      });
    }
  };

  const getSentimentColor = (score: number) => {
    if (score >= 70) return colors.success;
    if (score >= 40) return colors.warning;
    return colors.error;
  };

  const getSentimentLabel = (score: number) => {
    if (score >= 70) return 'Very Bullish';
    if (score >= 60) return 'Bullish';
    if (score >= 40) return 'Neutral';
    if (score >= 30) return 'Bearish';
    return 'Very Bearish';
  };

  const chartData = {
    labels: sentimentAnalysis.sectors.map(s => s.name),
    datasets: [
      {
        data: sentimentAnalysis.sectors.map(s => s.score),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: colors.card,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `${colors.primary}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
    labelColor: (opacity = 1) => `${colors.text}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontFamily: 'Inter-Regular',
      fontSize: 10,
    },
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
    searchSection: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    searchContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    searchInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      flex: 1,
      height: 48,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
    },
    searchButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingHorizontal: 20,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchButtonText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: '#ffffff',
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
    resultHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    queryText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    sentimentScore: {
      fontSize: 48,
      fontFamily: 'Inter-Bold',
      textAlign: 'center',
      marginBottom: 8,
    },
    sentimentLabel: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      textAlign: 'center',
      marginBottom: 16,
    },
    confidenceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    confidenceLabel: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    confidenceValue: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.primary,
    },
    phrasesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    phraseChip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
    },
    phraseText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
    },
    chartContainer: {
      alignItems: 'center',
      marginTop: 16,
    },
    verdictContainer: {
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    verdictTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 8,
    },
    verdictText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sentiment Analyzer</Text>
        <Text style={styles.subtitle}>
          AI-powered market sentiment analysis
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search company or keyword..."
                placeholderTextColor={colors.textSecondary}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Analyze</Text>
            </TouchableOpacity>
          </View>
        </View>

        {searchResults && (
          <View style={styles.section}>
            <Card>
              <View style={styles.resultHeader}>
                <Text style={styles.queryText}>"{searchResults.query}"</Text>
              </View>

              <Text style={[
                styles.sentimentScore,
                { color: getSentimentColor(searchResults.sentiment) }
              ]}>
                {searchResults.sentiment}
              </Text>
              <Text style={[
                styles.sentimentLabel,
                { color: getSentimentColor(searchResults.sentiment) }
              ]}>
                {getSentimentLabel(searchResults.sentiment)}
              </Text>

              <View style={styles.confidenceRow}>
                <Text style={styles.confidenceLabel}>Confidence Level</Text>
                <Text style={styles.confidenceValue}>{searchResults.confidence}%</Text>
              </View>
              <ProgressBar progress={searchResults.confidence} />
            </Card>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Sentiment Phrases</Text>
          <Card>
            <View style={styles.phrasesContainer}>
              {sentimentAnalysis.phrases.map((phrase, index) => (
                <View
                  key={index}
                  style={[
                    styles.phraseChip,
                    {
                      backgroundColor: phrase.sentiment === 'positive' 
                        ? colors.success + '20' 
                        : colors.error + '20',
                      borderColor: phrase.sentiment === 'positive' 
                        ? colors.success 
                        : colors.error,
                    }
                  ]}
                >
                  <Text style={[
                    styles.phraseText,
                    {
                      color: phrase.sentiment === 'positive' 
                        ? colors.success 
                        : colors.error,
                    }
                  ]}>
                    {phrase.text}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sector Sentiment Analysis</Text>
          <Card>
            <View style={styles.chartContainer}>
              <BarChart
                data={chartData}
                width={screenWidth - 80}
                height={220}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                showValuesOnTopOfBars
              />
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Verdict</Text>
          <View style={styles.verdictContainer}>
            <Text style={styles.verdictTitle}>Market Outlook Analysis</Text>
            <Text style={styles.verdictText}>
              Based on current sentiment analysis, the market outlook appears cautiously optimistic. 
              Positive sentiment in IT and Pharma sectors is offsetting concerns in the banking sector. 
              Key phrases indicate strong fundamentals but with awareness of regulatory headwinds. 
              Recommend maintaining diversified exposure with emphasis on growth sectors.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}