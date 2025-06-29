import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/Card';
import { finbotResponses } from '@/constants/mockData';
import { Send, Bot, User } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  followUp?: string;
}

export default function FinBotScreen() {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm FinBot, your AI financial assistant. I can help you with financial concepts, market psychology, investment strategies, and cybersecurity tips. What would you like to learn about?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const findBestResponse = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    
    // Check for exact matches first
    for (const [key, value] of Object.entries(finbotResponses)) {
      if (lowercaseQuery.includes(key.toLowerCase())) {
        return value;
      }
    }
    
    // Check for partial matches
    if (lowercaseQuery.includes('p/e') || lowercaseQuery.includes('pe ratio') || lowercaseQuery.includes('price earning')) {
      return finbotResponses['what is p/e ratio'];
    }
    if (lowercaseQuery.includes('psychology') || lowercaseQuery.includes('emotion') || lowercaseQuery.includes('behavior')) {
      return finbotResponses['market psychology'];
    }
    if (lowercaseQuery.includes('allocation') || lowercaseQuery.includes('diversif') || lowercaseQuery.includes('portfolio')) {
      return finbotResponses['asset allocation'];
    }
    if (lowercaseQuery.includes('cyber') || lowercaseQuery.includes('security') || lowercaseQuery.includes('safe')) {
      return finbotResponses['cybersecurity tips'];
    }
    if (lowercaseQuery.includes('budget') || lowercaseQuery.includes('invest') || lowercaseQuery.includes('money')) {
      return finbotResponses['budgeting'];
    }
    
    // Default response for unrecognized queries
    return {
      response: "I'd be happy to help! I can provide information about:\n\n• Financial ratios (P/E, P/B, EPS)\n• Market psychology and behavioral finance\n• Asset allocation and portfolio diversification\n• Cybersecurity best practices for trading\n• Investment budgeting and planning\n\nPlease ask me about any of these topics!",
      followUp: "What specific financial topic interests you most?"
    };
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate thinking delay
    setTimeout(() => {
      const response = findBestResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        isUser: false,
        timestamp: new Date(),
        followUp: response.followUp,
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputText('');
  };

  const sendQuickReply = (text: string) => {
    setInputText(text);
  };

  const quickReplies = [
    "What is P/E ratio?",
    "Market psychology tips",
    "Asset allocation basics",
    "Cybersecurity for trading",
    "Budgeting for investments",
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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
    messagesContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    messageWrapper: {
      marginBottom: 16,
    },
    userMessageWrapper: {
      alignItems: 'flex-end',
    },
    botMessageWrapper: {
      alignItems: 'flex-start',
    },
    messageContainer: {
      maxWidth: '80%',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16,
    },
    userMessage: {
      backgroundColor: colors.primary,
      borderBottomRightRadius: 4,
    },
    botMessage: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderBottomLeftRadius: 4,
    },
    messageText: {
      fontSize: 15,
      fontFamily: 'Inter-Regular',
      lineHeight: 20,
    },
    userMessageText: {
      color: '#ffffff',
    },
    botMessageText: {
      color: colors.text,
    },
    messageTime: {
      fontSize: 11,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginTop: 4,
      alignSelf: 'flex-end',
    },
    messageIcon: {
      marginBottom: 4,
    },
    followUpContainer: {
      marginTop: 8,
      padding: 12,
      backgroundColor: colors.surface,
      borderRadius: 8,
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
    },
    followUpText: {
      fontSize: 13,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      fontStyle: 'italic',
    },
    quickRepliesContainer: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    quickRepliesTitle: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 8,
    },
    quickRepliesScroll: {
      marginBottom: 8,
    },
    quickReplyButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginRight: 8,
    },
    quickReplyText: {
      fontSize: 13,
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    inputContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 12,
      paddingBottom: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      alignItems: 'flex-end',
    },
    textInput: {
      flex: 1,
      minHeight: 44,
      maxHeight: 100,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 22,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
      marginRight: 12,
    },
    sendButton: {
      backgroundColor: colors.primary,
      borderRadius: 22,
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonDisabled: {
      backgroundColor: colors.border,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FinBot Assistant</Text>
        <Text style={styles.subtitle}>
          Your AI-powered financial advisor
        </Text>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageWrapper,
                message.isUser ? styles.userMessageWrapper : styles.botMessageWrapper,
              ]}
            >
              {!message.isUser && (
                <View style={styles.messageIcon}>
                  <Bot size={20} color={colors.primary} />
                </View>
              )}
              <View
                style={[
                  styles.messageContainer,
                  message.isUser ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.isUser ? styles.userMessageText : styles.botMessageText,
                  ]}
                >
                  {message.text}
                </Text>
              </View>
              <Text style={styles.messageTime}>
                {message.timestamp.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              {message.followUp && (
                <View style={styles.followUpContainer}>
                  <Text style={styles.followUpText}>{message.followUp}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        <View style={styles.quickRepliesContainer}>
          <Text style={styles.quickRepliesTitle}>Quick questions:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.quickRepliesScroll}
          >
            {quickReplies.map((reply, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickReplyButton}
                onPress={() => sendQuickReply(reply)}
              >
                <Text style={styles.quickReplyText}>{reply}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me about finance, investments, or security..."
            placeholderTextColor={colors.textSecondary}
            multiline
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Send size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}