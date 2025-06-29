import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/Card';
import { Plus, TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface Stock {
  id: string;
  symbol: string;
  buyPrice: number;
  quantity: number;
  currentPrice: number;
  sector: string;
}

export default function PortfolioScreen() {
  const { colors } = useTheme();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    symbol: '',
    buyPrice: '',
    quantity: '',
  });

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const savedPortfolio = await AsyncStorage.getItem('portfolio');
      if (savedPortfolio) {
        setStocks(JSON.parse(savedPortfolio));
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    }
  };

  const savePortfolio = async (newStocks: Stock[]) => {
    try {
      await AsyncStorage.setItem('portfolio', JSON.stringify(newStocks));
    } catch (error) {
      console.error('Error saving portfolio:', error);
    }
  };

  const generateMockCurrentPrice = (buyPrice: number) => {
    // Generate a price within ±20% of buy price
    const variation = (Math.random() - 0.5) * 0.4; // -20% to +20%
    return buyPrice * (1 + variation);
  };

  const getSectorForSymbol = (symbol: string) => {
    const sectors = ['Banking', 'IT', 'Auto', 'Pharma', 'Energy'];
    return sectors[Math.floor(Math.random() * sectors.length)];
  };

  const addStock = () => {
    if (!formData.symbol || !formData.buyPrice || !formData.quantity) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newStock: Stock = {
      id: Date.now().toString(),
      symbol: formData.symbol.toUpperCase(),
      buyPrice: parseFloat(formData.buyPrice),
      quantity: parseInt(formData.quantity),
      currentPrice: generateMockCurrentPrice(parseFloat(formData.buyPrice)),
      sector: getSectorForSymbol(formData.symbol),
    };

    const updatedStocks = [...stocks, newStock];
    setStocks(updatedStocks);
    savePortfolio(updatedStocks);

    setFormData({ symbol: '', buyPrice: '', quantity: '' });
    setShowForm(false);
  };

  const calculatePL = (stock: Stock) => {
    const totalInvestment = stock.buyPrice * stock.quantity;
    const currentValue = stock.currentPrice * stock.quantity;
    const pl = currentValue - totalInvestment;
    const plPercent = (pl / totalInvestment) * 100;
    return { pl, plPercent };
  };

  const getTotalPortfolioValue = () => {
    return stocks.reduce((total, stock) => {
      return total + (stock.currentPrice * stock.quantity);
    }, 0);
  };

  const getTotalInvestment = () => {
    return stocks.reduce((total, stock) => {
      return total + (stock.buyPrice * stock.quantity);
    }, 0);
  };

  const getTotalPL = () => {
    const totalValue = getTotalPortfolioValue();
    const totalInvestment = getTotalInvestment();
    const pl = totalValue - totalInvestment;
    const plPercent = totalInvestment > 0 ? (pl / totalInvestment) * 100 : 0;
    return { pl, plPercent };
  };

  const getSectorDistribution = () => {
    const sectorTotals: { [key: string]: number } = {};
    const totalValue = getTotalPortfolioValue();

    stocks.forEach(stock => {
      const value = stock.currentPrice * stock.quantity;
      sectorTotals[stock.sector] = (sectorTotals[stock.sector] || 0) + value;
    });

    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return Object.entries(sectorTotals).map(([sector, value], index) => ({
      name: sector,
      value: totalValue > 0 ? (value / totalValue) * 100 : 0,
      color: colors[index % colors.length],
      legendFontColor: colors.text,
      legendFontSize: 12,
    }));
  };

  const totalPL = getTotalPL();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    addButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 12,
    },
    section: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    portfolioSummary: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    summaryCard: {
      flex: 1,
      alignItems: 'center',
    },
    summaryValue: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    summaryLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      textAlign: 'center',
    },
    plContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      marginTop: 4,
    },
    plText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
    },
    formContainer: {
      marginBottom: 24,
    },
    formRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    inputContainer: {
      flex: 1,
    },
    label: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      height: 48,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
      backgroundColor: colors.surface,
    },
    formButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    submitButton: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 12,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelButton: {
      flex: 1,
      backgroundColor: colors.border,
      borderRadius: 12,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: '#ffffff',
    },
    cancelButtonText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    stockCard: {
      marginBottom: 12,
    },
    stockHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    stockSymbol: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    stockSector: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      backgroundColor: colors.surface,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    stockDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    stockInfo: {
      flex: 1,
    },
    stockInfoLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    stockInfoValue: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyIcon: {
      padding: 20,
      borderRadius: 20,
      backgroundColor: colors.surface,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 8,
    },
    emptyText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
    },
    chartContainer: {
      alignItems: 'center',
      marginTop: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(!showForm)}
        >
          <Plus size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {stocks.length > 0 && (
          <View style={styles.section}>
            <View style={styles.portfolioSummary}>
              <Card style={styles.summaryCard}>
                <Text style={styles.summaryValue}>
                  ₹{getTotalPortfolioValue().toLocaleString('en-IN', {
                    maximumFractionDigits: 0,
                  })}
                </Text>
                <Text style={styles.summaryLabel}>Current Value</Text>
              </Card>

              <Card style={styles.summaryCard}>
                <Text style={styles.summaryValue}>
                  ₹{getTotalInvestment().toLocaleString('en-IN', {
                    maximumFractionDigits: 0,
                  })}
                </Text>
                <Text style={styles.summaryLabel}>Total Investment</Text>
              </Card>

              <Card style={styles.summaryCard}>
                <View style={styles.plContainer}>
                  {totalPL.pl >= 0 ? (
                    <TrendingUp size={16} color={colors.success} />
                  ) : (
                    <TrendingDown size={16} color={colors.error} />
                  )}
                  <Text style={[
                    styles.plText,
                    { color: totalPL.pl >= 0 ? colors.success : colors.error }
                  ]}>
                    {totalPL.pl >= 0 ? '+' : ''}₹{Math.abs(totalPL.pl).toLocaleString('en-IN', {
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                </View>
                <Text style={[
                  styles.summaryLabel,
                  { color: totalPL.pl >= 0 ? colors.success : colors.error }
                ]}>
                  {totalPL.pl >= 0 ? '+' : ''}{totalPL.plPercent.toFixed(2)}% P&L
                </Text>
              </Card>
            </View>
          </View>
        )}

        {showForm && (
          <View style={styles.section}>
            <Card style={styles.formContainer}>
              <View style={styles.formRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Stock Symbol</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.symbol}
                    onChangeText={(text) => setFormData({ ...formData, symbol: text })}
                    placeholder="e.g., RELIANCE"
                    placeholderTextColor={colors.textSecondary}
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Buy Price (₹)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.buyPrice}
                    onChangeText={(text) => setFormData({ ...formData, buyPrice: text })}
                    placeholder="2500"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Quantity</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.quantity}
                    onChangeText={(text) => setFormData({ ...formData, quantity: text })}
                    placeholder="10"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.formButtons}>
                <TouchableOpacity style={styles.submitButton} onPress={addStock}>
                  <Text style={styles.buttonText}>Add Stock</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowForm(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        )}

        {stocks.length > 0 ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Asset Distribution</Text>
              <Card>
                <View style={styles.chartContainer}>
                  <PieChart
                    data={getSectorDistribution()}
                    width={screenWidth - 80}
                    height={200}
                    chartConfig={{
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    accessor="value"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                  />
                </View>
              </Card>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Holdings</Text>
              {stocks.map((stock) => {
                const { pl, plPercent } = calculatePL(stock);
                return (
                  <Card key={stock.id} style={styles.stockCard}>
                    <View style={styles.stockHeader}>
                      <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                      <Text style={styles.stockSector}>{stock.sector}</Text>
                    </View>

                    <View style={styles.stockDetails}>
                      <View style={styles.stockInfo}>
                        <Text style={styles.stockInfoLabel}>Buy Price</Text>
                        <Text style={styles.stockInfoValue}>₹{stock.buyPrice.toFixed(2)}</Text>
                      </View>
                      <View style={styles.stockInfo}>
                        <Text style={styles.stockInfoLabel}>Current Price</Text>
                        <Text style={styles.stockInfoValue}>₹{stock.currentPrice.toFixed(2)}</Text>
                      </View>
                      <View style={styles.stockInfo}>
                        <Text style={styles.stockInfoLabel}>Quantity</Text>
                        <Text style={styles.stockInfoValue}>{stock.quantity}</Text>
                      </View>
                      <View style={styles.stockInfo}>
                        <Text style={styles.stockInfoLabel}>P&L</Text>
                        <View style={styles.plContainer}>
                          {pl >= 0 ? (
                            <TrendingUp size={12} color={colors.success} />
                          ) : (
                            <TrendingDown size={12} color={colors.error} />
                          )}
                          <Text style={[
                            styles.stockInfoValue,
                            { color: pl >= 0 ? colors.success : colors.error }
                          ]}>
                            {pl >= 0 ? '+' : ''}₹{Math.abs(pl).toFixed(0)}
                          </Text>
                        </View>
                        <Text style={[
                          styles.stockInfoLabel,
                          { color: pl >= 0 ? colors.success : colors.error }
                        ]}>
                          {pl >= 0 ? '+' : ''}{plPercent.toFixed(2)}%
                        </Text>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
          </>
        ) : !showForm ? (
          <View style={styles.section}>
            <Card style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Target size={32} color={colors.textSecondary} />
              </View>
              <Text style={styles.emptyTitle}>No Holdings Yet</Text>
              <Text style={styles.emptyText}>
                Start building your portfolio by adding your first stock
              </Text>
            </Card>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}