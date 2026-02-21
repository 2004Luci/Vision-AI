import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/theme";

type AlertType = "warning" | "info" | "success";

const ALERTS = [
  {
    id: "1",
    type: "warning" as AlertType,
    title: "Obstacle Detected",
    subtitle: "Object in path ahead",
    timeAgo: "2m ago",
    icon: "warning" as const,
  },
  {
    id: "2",
    type: "info" as AlertType,
    title: "Route Updated",
    subtitle: "New path calculated",
    timeAgo: "15m ago",
    icon: "information-circle" as const,
  },
  {
    id: "3",
    type: "success" as AlertType,
    title: "Destination Reached",
    subtitle: "Navigation complete",
    timeAgo: "1h ago",
    icon: "checkmark-circle" as const,
  },
];

function getAlertAccent(
  theme: import("@/theme/tokens").ThemeTokens,
  type: AlertType,
  themeId: "accessibility" | "neon",
): string {
  switch (type) {
    case "warning":
      return theme.warning;
    case "info":
      return theme.primary;
    case "success":
      return themeId === "accessibility" ? theme.primary : theme.success;
    default:
      return theme.primary;
  }
}

const AlertsScreen = () => {
  const insets = useSafeAreaInsets();
  const { theme, themeId } = useTheme();

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top, backgroundColor: theme.screenBg },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.white }]}>
          Notifications
        </Text>
        <View style={styles.countRow}>
          <Text style={[styles.countText, { color: theme.grey }]}>
            3 recent alerts
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {ALERTS.map((alert) => {
          const accent = getAlertAccent(theme, alert.type, themeId);
          return (
            <View
              key={alert.id}
              style={[
                styles.alertCard,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
              ]}
            >
              <View
                style={[styles.cardAccentLine, { backgroundColor: accent }]}
              />
              <View
                style={[
                  styles.iconContainer,
                  { borderColor: accent, backgroundColor: accent },
                ]}
              >
                <Ionicons name={alert.icon} size={22} color={theme.white} />
              </View>
              <View style={styles.textBlock}>
                <Text style={[styles.alertTitle, { color: theme.white }]}>
                  {alert.title}
                </Text>
                <Text style={[styles.alertSubtitle, { color: theme.grey }]}>
                  {alert.subtitle}
                </Text>
              </View>
              <View
                style={[styles.timeBadge, { backgroundColor: theme.border }]}
              >
                <Text style={[styles.timeText, { color: theme.muted }]}>
                  {alert.timeAgo}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AlertsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  countRow: {
    marginTop: 4,
  },
  countText: {
    fontSize: 13,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  alertCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  cardAccentLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textBlock: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  alertSubtitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  timeBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  timeText: {
    fontSize: 10,
    fontWeight: "600",
  },
});
