import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ACCENT_YELLOW = '#FFD54F';
const CARD_BG = '#1a1d24';
const CARD_BG_LIGHT = '#2d3142';
const SCREEN_BG = '#0f1117';
const WHITE = '#ffffff';
const GREY = '#9ca3af';
const GREEN = '#22c55e';

const FEATURE_CARDS = [
  {
    id: 'describe',
    title: 'Describe Object',
    subtitle: 'Identify items around you',
    icon: 'camera',
    highlighted: true,
  },
  {
    id: 'scene',
    title: 'Scene Summary',
    subtitle: 'Get a full room overview',
    icon: 'eye',
    highlighted: false,
  },
  {
    id: 'read',
    title: 'Read Text',
    subtitle: 'Scan documents & signs',
    icon: 'document-text',
    highlighted: false,
  },
  {
    id: 'navigation',
    title: 'Navigation',
    subtitle: 'Find your way safely',
    icon: 'locate',
    highlighted: false,
  },
];

const RECENT_ITEMS = [
  { id: '1', title: 'Find Keys', icon: 'search' },
  { id: '2', title: 'Read Menu', icon: 'book' },
];

const USER_NAME = 'Alex';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardGap = 12;
  const recentCardWidth = (width - 32 - insets.left - insets.right - cardGap) / 2;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hello, <Text style={styles.userName}>{USER_NAME}</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.avatar} activeOpacity={0.8}>
            <Text style={styles.avatarText}>{USER_NAME[0]}</Text>
          </TouchableOpacity>
        </View>

        {/* System Status Card */}
        <View style={styles.systemStatusCard}>
          <View style={styles.systemStatusLeft}>
            <Text style={styles.systemStatusLabel}>System Status</Text>
            <View style={styles.statusRow}>
              <View style={styles.greenDot} />
              <Text style={styles.systemStatusValue}>Online & Ready</Text>
            </View>
          </View>
          <View style={styles.equalizerIcon}>
            <Ionicons name="cellular" size={24} color={ACCENT_YELLOW} />
          </View>
        </View>

        {/* Feature Cards */}
        {FEATURE_CARDS.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[
              styles.featureCard,
              card.highlighted && styles.featureCardHighlighted,
            ]}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.featureIconWrap,
                card.highlighted ? styles.featureIconWrapHighlighted : null,
              ]}
            >
              <Ionicons
                name={card.icon as any}
                size={24}
                color={card.highlighted ? '#000000' : WHITE}
              />
            </View>
            <View style={styles.featureTextWrap}>
              <Text
                style={[
                  styles.featureTitle,
                  card.highlighted && styles.featureTitleDark,
                ]}
              >
                {card.title}
              </Text>
              <Text
                style={[
                  styles.featureSubtitle,
                  card.highlighted && styles.featureSubtitleDark,
                ]}
              >
                {card.subtitle}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* RECENT Section */}
        <Text style={styles.recentHeading}>RECENT</Text>
        <View style={styles.recentRow}>
          {RECENT_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.recentCard, { width: recentCardWidth }]}
              activeOpacity={0.8}
            >
              <View style={styles.recentIconWrap}>
                <Ionicons
                  name={item.icon as any}
                  size={28}
                  color={ACCENT_YELLOW}
                />
              </View>
              <Text style={styles.recentTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: WHITE,
  },
  userName: {
    color: ACCENT_YELLOW,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ACCENT_YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  systemStatusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  systemStatusLeft: {
    flex: 1,
  },
  systemStatusLabel: {
    fontSize: 12,
    color: GREY,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: GREEN,
  },
  systemStatusValue: {
    fontSize: 18,
    fontWeight: '600',
    color: WHITE,
  },
  equalizerIcon: {
    marginLeft: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  featureCardHighlighted: {
    backgroundColor: ACCENT_YELLOW,
  },
  featureIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CARD_BG_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureIconWrapHighlighted: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: WHITE,
    marginBottom: 2,
  },
  featureTitleDark: {
    color: '#000000',
  },
  featureSubtitle: {
    fontSize: 14,
    color: GREY,
  },
  featureSubtitleDark: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  recentHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: WHITE,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 12,
  },
  recentRow: {
    flexDirection: 'row',
    gap: 12,
  },
  recentCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
  },
  recentIconWrap: {
    marginBottom: 12,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: WHITE,
    textAlign: 'center',
  },
});
