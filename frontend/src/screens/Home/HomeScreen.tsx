import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBackHandler } from '@/navigators';
import { useAuth } from '@/auth/AuthContext';
import { navigationActions } from '@/store/actions/navigation';
import type { AppDispatch } from '@/store';

const FEATURE_CARDS = [
  {
    id: 'describe',
    title: 'Describe Object',
    subtitle: 'Identify items around you',
    icon: 'camera',
    accentColor: '#22C55E',
  },
  {
    id: 'scene',
    title: 'Scene Summary',
    subtitle: 'Get a full room overview',
    icon: 'eye',
    accentColor: '#A855F7',
  },
  {
    id: 'read',
    title: 'Read Text',
    subtitle: 'Scan documents & signs',
    icon: 'document-text',
    accentColor: '#38BDF8',
  },
  {
    id: 'navigation',
    title: 'Navigation',
    subtitle: 'Find your way safely',
    icon: 'locate',
    accentColor: '#06B6D4',
  },
];

const RECENT_ITEMS = [
  { id: '1', title: 'Find Keys', icon: 'search', accentColor: '#06B6D4' },
  { id: '2', title: 'Read Menu', icon: 'book', accentColor: '#38BDF8' },
];

export function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const handlePressProfile = () => {
    dispatch(navigationActions.toProfile());
  };
  const displayName = user?.displayName ?? user?.email?.split('@')[0] ?? 'User';

  useBackHandler({
    showExitPrompt: true,
  });

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.visionBadge}>
              <Text style={styles.visionBadgeText}>VISION AI</Text>
            </View>
            <Text style={styles.greetingText}>
              Hello, <Text style={styles.greetingName}>{displayName}</Text>
            </Text>
          </View>
          <Pressable
            style={styles.profileButton}
            onPress={handlePressProfile}
          >
            <Text style={styles.profileInitial}>{displayName[0]?.toUpperCase() ?? 'U'}</Text>
          </Pressable>
        </View>

        <Animated.View style={styles.statusCard}>
          <View style={styles.statusAccentLine} />
          <View style={styles.statusRow}>
            <View style={styles.statusLeft}>
              <Text style={styles.statusLabel}>SYSTEM STATUS</Text>
              <View style={styles.statusOnlineRow}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Online & Ready</Text>
              </View>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>ACTIVE</Text>
            </View>
          </View>
        </Animated.View>

        <Text style={styles.sectionLabel}>FEATURES</Text>

        {FEATURE_CARDS.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.featureCard}
            activeOpacity={0.8}
          >
            <View style={[styles.featureAccentLine, { backgroundColor: card.accentColor }]} />
            <View style={styles.featureRow}>
              <View
                style={[styles.featureIconContainer, { borderColor: `${card.accentColor}40` }]}
              >
                <Ionicons name={card.icon as any} size={24} color={card.accentColor} />
              </View>
              <View style={styles.featureTextBlock}>
                <Text style={styles.featureTitle}>{card.title}</Text>
                <Text style={styles.featureSubtitle}>{card.subtitle}</Text>
              </View>
              <Text style={[styles.featureArrow, { color: card.accentColor }]}>→</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionLabel}>RECENT</Text>
        <View style={styles.recentRow}>
          {RECENT_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.recentCard}
              activeOpacity={0.8}
            >
              <Ionicons
                name={item.icon as any}
                size={26}
                color={item.accentColor}
                style={styles.recentIcon}
              />
              <Text style={styles.recentTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#080B10',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  visionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#22C55E18',
    borderWidth: 1,
    borderColor: '#22C55E35',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
  },
  visionBadgeText: {
    color: '#22C55E',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  greetingText: {
    color: '#F1F5F9',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  greetingName: {
    color: '#22C55E',
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: '#22C55E15',
    borderWidth: 1,
    borderColor: '#22C55E40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '800',
  },
  statusCard: {
    backgroundColor: '#0F1620',
    borderWidth: 1,
    borderColor: '#1E2D3D',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  statusAccentLine: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: '#22C55E',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLeft: {
    flex: 1,
  },
  statusLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 6,
  },
  statusOnlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 8,
  },
  statusText: {
    color: '#F1F5F9',
    fontSize: 17,
    fontWeight: '700',
  },
  statusPill: {
    backgroundColor: '#22C55E18',
    borderWidth: 1,
    borderColor: '#22C55E35',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusPillText: {
    color: '#22C55E',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  sectionLabel: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
    marginTop: 8,
  },
  featureCard: {
    backgroundColor: '#0F1620',
    borderWidth: 1,
    borderColor: '#1E2D3D',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    overflow: 'hidden',
  },
  featureAccentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#0A0F18',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextBlock: {
    flex: 1,
  },
  featureTitle: {
    color: '#F1F5F9',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  featureSubtitle: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '500',
  },
  featureArrow: {
    fontSize: 16,
    fontWeight: '700',
  },
  recentRow: {
    flexDirection: 'row',
    gap: 12,
  },
  recentCard: {
    flex: 1,
    backgroundColor: '#0F1620',
    borderWidth: 1,
    borderColor: '#1E2D3D',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    minHeight: 110,
  },
  recentIcon: {
    marginBottom: 10,
  },
  recentTitle: {
    color: '#F1F5F9',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
