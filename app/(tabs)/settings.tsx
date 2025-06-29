import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/Card';
import { 
  Moon,
  Sun,
  DollarSign,
  RotateCcw,
  Info,
  LogOut,
  User,
  ChevronRight
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/auth/login');
          }
        },
      ]
    );
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset App Data',
      'This will clear all your portfolio data and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            // Reset app data logic here
            Alert.alert('Success', 'App data has been reset');
          }
        },
      ]
    );
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
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    profileIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginBottom: 8,
    },
    settingIcon: {
      marginRight: 16,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 2,
    },
    settingDescription: {
      fontSize: 13,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    settingAction: {
      marginLeft: 12,
    },
    versionContainer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    versionText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    logoutButton: {
      backgroundColor: colors.error,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 20,
    },
    logoutButtonText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: '#ffffff',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Customize your FinIntel Pro experience
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Card style={styles.profileCard}>
            <View style={styles.profileIcon}>
              <User size={24} color={colors.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
            </View>
          </Card>
        </View>

        {/* Appearance Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <Card>
            <TouchableOpacity style={styles.settingItem} onPress={toggleTheme}>
              <View style={styles.settingIcon}>
                {theme === 'light' ? (
                  <Moon size={20} color={colors.textSecondary} />
                ) : (
                  <Sun size={20} color={colors.textSecondary} />
                )}
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingDescription}>
                  Switch between light and dark themes
                </Text>
              </View>
              <View style={styles.settingAction}>
                <Switch
                  value={theme === 'dark'}
                  onValueChange={toggleTheme}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor="#ffffff"
                />
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <Card>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <DollarSign size={20} color={colors.textSecondary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Currency</Text>
                <Text style={styles.settingDescription}>
                  Currently set to Indian Rupee (INR)
                </Text>
              </View>
              <View style={styles.settingAction}>
                <ChevronRight size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleResetData}>
              <View style={styles.settingIcon}>
                <RotateCcw size={20} color={colors.error} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: colors.error }]}>
                  Reset App Data
                </Text>
                <Text style={styles.settingDescription}>
                  Clear all portfolio and settings data
                </Text>
              </View>
              <View style={styles.settingAction}>
                <ChevronRight size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Card>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Info size={20} color={colors.textSecondary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>App Version</Text>
                <Text style={styles.settingDescription}>
                  FinIntel Pro v1.0.0
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#ffffff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>
            JD|FinIntel Pro - AI-Powered Financial Intelligence Suite
          </Text>
          <Text style={styles.versionText}>
            Built with ❤️ for financial professionals
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}