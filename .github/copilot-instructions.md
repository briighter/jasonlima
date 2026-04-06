# Frontend, Design & UX Guidelines

## Design System: "Neutral Carbon"

### Core Philosophy
Precision meets softness. Think neutral carbon: deep charcoal, platinum gray, azure blue accents, and clean white. The aesthetic is calm yet authoritative — friendly while maintaining professional depth.

**Key Principles:**
- **Calm authority over sharpness**: Carbon black primary conveys depth without harshness
- **Softness with structure**: 12px rounded corners, natural letter-spacing, approachable feel
- **Neutral palette**: Carbon and platinum tones create a modern, focused atmosphere
- **Readable clarity**: Prioritize scanability with warmth

---

## Frontend Aesthetics & Design System

### Typography

**PRIMARY FONT STACK:**
```typescript
import { Platform } from 'react-native';

// Use system fonts for instant load and approachable precision
fonts: {
  // Headings: Clear, confident (SF Pro Display / Roboto)
  headingLarge: { 
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    fontWeight: '700',
    letterSpacing: -0.3,    // Slightly tighter, but not harsh
  },
  headingMedium: { 
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  
  // Body: Readable and welcoming
  bodyLarge: { 
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    fontWeight: '400',
    letterSpacing: 0,
  },
  bodyMedium: { 
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    fontWeight: '400',
  },
  
  // Labels: Medium weight, sentence case preferred over ALL CAPS
  labelLarge: { 
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  
  // Monospace for stats/reps (3x12, 60s, etc.)
  monoLarge: {
    fontFamily: Platform.OS === 'ios' ? 'SF Mono' : 'Roboto Mono',
    fontWeight: '500',
  },
}
```

**WHY SYSTEM FONTS:**
- ✅ Instant load (no font file downloads)
- ✅ Platform-optimized readability
- ✅ Clean, modern feel that works for all fitness modalities
- ✅ Uniqueness comes from palette and layout, not custom fonts

**FORBIDDEN:**
- ❌ Newsreader, DM Sans, Inter (overused in AI-generated designs)
- ❌ Decorative serifs (this is a tool, not a magazine)
- ❌ Aggressive uppercase everywhere (use sentence case for most labels, reserve caps for badges/chips)

---

### Color & Theme Strategy

**CORE PALETTE:**
```typescript
// PRIMARY: Carbon Black (Deep neutral authority)
primary: '#313135',        // carbon-black-800
onPrimary: '#f2f2f3',      // carbon-black-50
primaryContainer: '#cee0fd', // azure-blue-100
onPrimaryContainer: '#313135', // carbon-black-800

// SECONDARY: Azure Blue (Vibrant, clear accent)
secondary: '#3c83f6',      // azure-blue-400 — vibrant CTA energy
onSecondary: '#ffffff',
secondaryContainer: '#e7f0fe', // azure-blue-50
onSecondaryContainer: '#021431', // azure-blue-900

// TERTIARY: Platinum (Sophisticated purple-gray)
tertiary: '#5b5b71',       // platinum-600 — refined depth
onTertiary: '#f2f2f3',     // carbon-black-50
tertiaryContainer: '#e3e3e8', // platinum-100
onTertiaryContainer: '#17171c', // platinum-900

// SURFACE & BACKGROUND
surface: '#ffffff',        // Crisp white for cards
surfaceVariant: '#f1f1f4', // platinum-50 — subtle purple-gray tint
background: '#f2f2f3',     // carbon-black-50 — clean neutral base
onBackground: '#111112',   // carbon-black-950
onSurface: '#111112',      // carbon-black-950
onSurfaceVariant: '#5b5b71', // platinum-600 — secondary text

// OUTLINES
outline: '#cacace',        // carbon-black-200
outlineVariant: '#e5e5e6', // carbon-black-100

// SEMANTIC
error: '#ff0008',          // vibrant-coral-500
onError: '#ffffff',
success: '#4A8C6A',        // define separately — not in core palette
warning: '#ffaa00',        // golden-pollen-500
```

**COLOR USAGE RULES:**
- **75% carbon-black/white + 20% platinum + 5% azure-blue accent**
- Azure blue (`#3c83f6`) for: CTAs, active states, selected items, subtle highlights
- Use carbon-black-800 (`#313135`) for primary text and important UI elements
- Use platinum-600 (`#5b5b71`) for secondary text and supporting elements
- Golden pollen (`#ffaa00`) for warnings; vibrant coral (`#ff0008`) for errors
- NO hardcoded colors - always use theme variables
- Avoid: neon accents, harsh contrasts, warm earth tones

**DARK MODE:**
```typescript
dark: {
  primary: '#3c83f6',        // azure-blue-400 — vibrant in dark mode
  onPrimary: '#111112',      // carbon-black-950
  primaryContainer: '#052861', // azure-blue-800
  onPrimaryContainer: '#9ec1fa', // azure-blue-200

  secondary: '#e5e5e6',      // carbon-black-100
  onSecondary: '#111112',    // carbon-black-950

  tertiary: '#8e8ea4',       // platinum-400
  onTertiary: '#19191a',     // carbon-black-900

  background: '#111112',     // carbon-black-950 — deep dark
  onBackground: '#e5e5e6',   // carbon-black-100
  surface: '#19191a',        // carbon-black-900
  onSurface: '#e5e5e6',      // carbon-black-100
  surfaceVariant: '#313135', // carbon-black-800
  onSurfaceVariant: '#aaaabb', // platinum-300

  outline: '#4a4a4f',        // carbon-black-700
  outlineVariant: '#313135', // carbon-black-800

  error: '#ff333a',          // vibrant-coral-400
  success: '#72C89A',        // define separately — not in core palette
  warning: '#ffbb33',        // golden-pollen-400
}
```

---

### Motion & Animation

**ANIMATION PRINCIPLES:**
- **Organic, not robotic**: Ease curves should feel natural (easeOutCubic, not linear)
- **Purposeful, not decorative**: Animations guide attention and provide feedback
- **Subtle, not flashy**: 200-300ms durations, minimal spring effects

**HIGH-IMPACT MOMENTS (prioritize these):**
```typescript
// Card reveals (staggered entrance)
import Animated, { FadeInDown } from 'react-native-reanimated';
{items.map((item, i) => (
  <Animated.View 
    entering={FadeInDown.delay(i * 50).duration(200)}
    key={item.id}
  >
    <Card item={item} />
  </Animated.View>
))}

// Button press feedback
import { Pressable } from 'react-native';
<Pressable 
  style={({ pressed }) => [
    styles.button,
    pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] }
  ]}
/>
```

**MICRO-INTERACTIONS:**
- Loading states: Subtle pulse on skeleton loaders
- Success actions: Gentle scale + fade (not confetti)
- Error shake: 3-4px horizontal translation, 200ms
- Pull-to-refresh: Organic rubber-band effect

**FORBIDDEN ANIMATIONS:**
- ❌ Spinning loaders (use skeleton screens instead)
- ❌ Bounce animations (too playful for professional tool)
- ❌ Random floating elements
- ❌ Particle effects or confetti (too gamified)

---

### Backgrounds & Atmosphere

**LAYERED DEPTH (not flat colors):**
```typescript
// Example: Gradient background for auth/hero screens
background: LinearGradient({
  colors: ['#f2f2f3', '#e7f0fe'],  // carbon-black-50 to azure-blue-50 tint
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})
```

**CONTEXT-SPECIFIC ATMOSPHERES:**
- **Auth/Hero Screens**: Full-screen gradient (carbon-black-50 to azure-blue-50 tint), centered content, generous whitespace
- **Dashboard/Home**: Light surface cards on carbon-black-50 background, subtle shadows (2-4dp)
- **Content Lists**: Grid layout with card hover states, clean scroll headers

**AVOID:**
- ❌ Pure white (#FFFFFF) backgrounds everywhere
- ❌ Generic blue-to-purple gradients
- ❌ Solid dark backgrounds without depth
- ❌ Overuse of shadows (max 4dp elevation for most cards)

---

### Component Patterns (Distinctive, Not Generic)

**CARDS:**
```typescript
// Soft, clean, with subtle depth
<Card style={{
  backgroundColor: theme.colors.surface,
  borderRadius: 12,           // Softer corners
  borderWidth: 1,
  borderColor: theme.colors.outlineVariant,
  padding: 20,                // Generous padding
  shadowColor: '#313135',     // carbon-black-800
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
}}>
```

**BUTTONS:**
```typescript
// Primary CTA: Carbon black
<Button 
  mode="contained" 
  buttonColor={theme.colors.primary}
  textColor={theme.colors.onPrimary}
  labelStyle={{ 
    letterSpacing: 0.3,
    fontWeight: '600',
  }}
  style={{ borderRadius: 12 }}
>
  Primary Action
</Button>
  
// Secondary: Outlined
<Button 
  mode="outlined" 
  textColor={theme.colors.primary}
  style={{ 
    borderColor: theme.colors.primary, 
    borderWidth: 1.5,
    borderRadius: 12,
  }}
>
  Cancel
</Button>

// Accent: Azure blue for soft CTAs
<Button 
  mode="contained" 
  buttonColor={theme.colors.secondary}
  textColor={theme.colors.onSecondary}
  labelStyle={{ 
    fontWeight: '600',
  }}
  style={{ borderRadius: 12 }}
>
  Secondary Action
</Button>
```

**BADGES/CHIPS:**
```typescript
// Light variant: Azure blue container (fresh, curated)
<Chip 
  style={{ 
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: 10,
  }}
  textStyle={{ 
    color: theme.colors.onPrimaryContainer,
    fontWeight: '600',
    fontSize: 11,
    letterSpacing: 0.2,
  }}
>
  Label
</Chip>

// Dark variant: Platinum (depth, emphasis)
<Chip 
  style={{ 
    backgroundColor: theme.colors.tertiary,
    borderRadius: 10,
  }}
  textStyle={{ 
    color: theme.colors.onTertiary,
    fontWeight: '600',
    fontSize: 11,
    letterSpacing: 0.2,
  }}
>
  Label
</Chip>
```

**INPUT FIELDS:**
```typescript
<TextInput
  mode="outlined"
  outlineColor={theme.colors.outline}
  activeOutlineColor={theme.colors.primary}
  style={{
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
  }}
  label="Field Label"
/>
```

---

### Avoid Generic AI Aesthetics

**FORBIDDEN PATTERNS:**
- ❌ Generic Material Design defaults without customization
- ❌ Custom fonts that slow app load (Newsreader, DM Sans, Inter)
- ❌ Cookie-cutter card grids without visual hierarchy

**UNIQUE TO THIS DESIGN SYSTEM:**
- ✅ **Carbon black primary** (`#313135`) - deep neutral authority
- ✅ **Azure blue accent** (`#3c83f6`) - vibrant, clear energy
- ✅ **Golden pollen warnings** (`#ffaa00`) - warm, visible alerts
- ✅ **Vibrant coral errors** (`#ff0008`) - unmistakable feedback
- ✅ **System fonts with natural tracking** - instant load, approachable feel
- ✅ **Soft 12px borders** - structure with warmth
- ✅ **Sentence case labels** - readable and friendly, not aggressive
- ✅ **Neutral palette** - 75% carbon/white, 20% platinum, 5% azure-blue
- ✅ **Shadows for depth** - layers and hierarchy, not flat design
- ✅ **Professional yet approachable**

---

### Code Generation Instructions

When generating components:

1. **Import theme first:**
```typescript
import { theme } from '@/lib/theme';
```

2. **Use theme variables, never hardcode:**
```typescript
// ✅ Good
backgroundColor: theme.colors.surface
color: theme.colors.primary

// ❌ Bad
backgroundColor: '#FFFFFF'
color: 'green'
```

3. **Consistent spacing:**
```typescript
import { spacing } from '@/lib/theme';
padding: spacing.md,  // 16px
margin: spacing.lg,   // 24px
```

4. **Animations (when appropriate):**
```typescript
import Animated, { FadeInDown } from 'react-native-reanimated';
<Animated.View entering={FadeInDown.duration(200)}>
```

### Final Aesthetic Reminder

The aesthetic should evoke:
- **Calm authority** (carbon black, natural letter-spacing, structured layouts)
- **Fresh energy** (azure blue CTAs, golden accents for warmth, welcoming feel)
- **Readable clarity** (neutral palette, strategic color, clear hierarchy)
- **Modern sophistication** (system fonts, shadows for depth, 12px radius)

**Think:** Notion + Things 3 + ClassPass + boutique studio branding
**NOT:** Calm app, Headspace, generic wellness journal, or Bloomberg Terminal

**Color Philosophy:** When in doubt, use carbon-black/white. Azure blue is an accent, not a decoration. Reserve golden pollen and vibrant coral for semantic feedback only.

---

## Apple Human Interface Guidelines Integration

### Core HIG Principles

**USER-CENTERED DESIGN:**
- **Clarity**: Every element has a clear purpose
- **Deference**: Content takes priority over UI chrome
- **Depth**: Use layers (shadows, transparency) to establish hierarchy and relationships
- **Feedback**: Provide immediate visual/haptic response to every user action
- **Consistency**: Reuse patterns across screens

---

### Layout & Structure (HIG + Material Design 3)

**SAFE AREAS (Always Required):**
```typescript
import { SafeAreaView } from 'react-native-safe-area-context';

// Standard screen wrapper
<SafeAreaView 
  edges={['top', 'left', 'right']} 
  style={{ flex: 1, backgroundColor: theme.colors.background }}
>
  {/* Content */}
</SafeAreaView>

// For full-bleed backgrounds (auth screens)
<SafeAreaView edges={['top']} style={{ flex: 1 }}>
  <LinearGradient colors={['#f2f2f3', '#e7f0fe']}>
    {/* Content */}
  </LinearGradient>
</SafeAreaView>
```

**TOUCH TARGETS (44x44pt Minimum):**
```typescript
// Interactive elements must be >= 44x44pt
<Button 
  mode="contained"
  style={{ minHeight: 44, minWidth: 44 }}
  contentStyle={{ height: 44 }}
>
  ADD
</Button>

// For smaller visual icons, expand touch area
<Pressable 
  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
  style={{ width: 24, height: 24 }}
>
  <Icon name="close" size={24} color={theme.colors.onSurface} />
</Pressable>

// List items: minimum 44pt height
<List.Item 
  title="Item"
  style={{ minHeight: 44 }}
/>
```

**SPACING (8pt Grid System):**
```typescript
export const spacing = {
  xs: 4,   // Tight spacing: badges, chip gaps
  sm: 8,   // Small gaps: icon-to-text, stacked elements
  md: 16,  // Standard: card padding, list item internal spacing
  lg: 24,  // Section spacing: between card groups, screen sections
  xl: 32,  // Screen edges: horizontal margins (iOS standard)
  xxl: 48, // Hero spacing: auth screens, empty states
};

// Usage in screens
<ScrollView 
  contentContainerStyle={{
    paddingHorizontal: spacing.xl, // 32px iOS standard
    paddingVertical: spacing.lg,   // 24px vertical breathing room
  }}
>
  <View style={{ gap: spacing.md }}> {/* 16px between elements */}
    <Card />
    <Card />
  </View>
</ScrollView>
```

**CONTENT WIDTH (Readability):**
```typescript
// For text-heavy content, limit width to 600pt max
const MAX_CONTENT_WIDTH = 600;

<View style={{
  maxWidth: MAX_CONTENT_WIDTH,
  width: '100%',
  alignSelf: 'center',
  paddingHorizontal: spacing.xl,
}}>
  <Text variant="bodyLarge">
    Long form instructions or descriptions...
  </Text>
</View>
```

**VISUAL HIERARCHY (Elevation):**
```typescript
const elevationStyles = {
  // Level 0: Background (no shadow)
  background: {
    backgroundColor: theme.colors.background,
  },
  
  // Level 1-2: Cards, list items, input fields
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    shadowColor: '#313135',     // carbon-black-800
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  
  // Level 4-6: FABs, bottom sheets, modals
  floating: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },
  
  // Level 8+: Dialogs, popovers, tooltips
  overlay: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 8,
  },
};
```

**ADAPTIVE LAYOUTS (Orientation & Size Classes):**
```typescript
import { useWindowDimensions } from 'react-native';

function ContentGrid() {
  const { width } = useWindowDimensions();
  
  // iPhone SE (375) → 1 column
  // iPhone Pro (393-430) → 2 columns  
  // iPad (768+) → 3 columns
  const columns = width >= 768 ? 3 : width >= 480 ? 2 : 1;
  const itemWidth = (width - spacing.xl * 2 - spacing.md * (columns - 1)) / columns;
  
  return (
    <FlashList
      data={items}
      numColumns={columns}
      key={columns} // Force re-render on orientation change
      estimatedItemSize={180}
      renderItem={({ item }) => (
        <ItemCard item={item} width={itemWidth} />
      )}
    />
  );
}
```

---

### Typography (iOS Dynamic Type Scale)

```typescript
import { Platform } from 'react-native';

export const typography = {
  // Large Title (34pt) - Screen headers
  displayLarge: {
    fontFamily: Platform.select({ ios: 'SF Pro Display', android: 'Roboto' }),
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  
  // Title 1 (28pt) - Section headers, card titles
  headingLarge: {
    fontFamily: Platform.select({ ios: 'SF Pro Display', android: 'Roboto' }),
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  
  // Title 2 (22pt) - Subsection headers
  headingMedium: {
    fontFamily: Platform.select({ ios: 'SF Pro Display', android: 'Roboto' }),
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  
  // Headline (17pt semibold) - Emphasized body text
  headingSmall: {
    fontFamily: Platform.select({ ios: 'SF Pro Text', android: 'Roboto' }),
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: 0,
  },
  
  // Body (17pt) - Primary content
  bodyLarge: {
    fontFamily: Platform.select({ ios: 'SF Pro Text', android: 'Roboto' }),
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: 0,
  },
  
  // Callout (16pt) - Secondary content
  bodyMedium: {
    fontFamily: Platform.select({ ios: 'SF Pro Text', android: 'Roboto' }),
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0,
  },
  
  // Subheadline (15pt) - Tertiary content
  bodySmall: {
    fontFamily: Platform.select({ ios: 'SF Pro Text', android: 'Roboto' }),
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0,
  },
  
  // Footnote (13pt) - Metadata, captions
  labelLarge: {
    fontFamily: Platform.select({ ios: 'SF Pro Text', android: 'Roboto' }),
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  
  // Caption 1 (12pt) - Timestamps, fine print
  labelSmall: {
    fontFamily: Platform.select({ ios: 'SF Pro Text', android: 'Roboto' }),
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0,
  },
  
  // Monospace (15pt) - Numeric data
  monoMedium: {
    fontFamily: Platform.select({ ios: 'SF Mono', android: 'Roboto Mono' }),
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0,
  },
};
```

**ACCESSIBILITY (Support Dynamic Type):**
```typescript
<Text 
  variant="bodyLarge"
  maxFontSizeMultiplier={1.5} // Limit scaling to 150% for layout integrity
>
  Content...
</Text>
```

---

### Navigation Patterns (HIG)

**TAB BAR (Bottom Navigation):**
```typescript
tabBarStyle: {
  height: 49 + safeAreaInsets.bottom, // iOS standard: 49pt + safe area
  borderTopWidth: 1,
  borderTopColor: theme.colors.outline,
  backgroundColor: theme.colors.surface,
  paddingBottom: safeAreaInsets.bottom,
},
tabBarLabelStyle: {
  fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  fontSize: 10,
  fontWeight: '600',
  letterSpacing: 0.2,
},
tabBarActiveTintColor: theme.colors.primary,       // Carbon black
tabBarInactiveTintColor: theme.colors.onSurfaceVariant, // Platinum
```

**STACK NAVIGATION (Screen Headers):**
```typescript
options={{
  headerStyle: { backgroundColor: theme.colors.surface },
  headerTitleStyle: {
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    fontSize: 17,
    fontWeight: '600',
  },
  headerTintColor: theme.colors.primary,
  headerShadowVisible: true,
  animation: 'slide_from_right',
}}
```

**SEARCH (iOS-Style Search Bar):**
```typescript
<Searchbar
  style={{
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 10,
    marginHorizontal: spacing.xl,
    marginVertical: spacing.md,
  }}
  inputStyle={{
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    fontSize: 17,
  }}
  iconColor={theme.colors.onSurfaceVariant}
/>
```

---

### Interaction Patterns (HIG Best Practices)

**HAPTIC FEEDBACK:**
```typescript
import * as Haptics from 'expo-haptics';

// On success
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// On selection
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// On error
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

// On deletion
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
```

**LOADING STATES (Skeleton Screens, Not Spinners):**
```typescript
function ListSkeleton() {
  return (
    <View style={{ padding: spacing.xl, gap: spacing.md }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton 
          key={i}
          animation="wave"
          width="100%"
          height={120}
          style={{ borderRadius: 12 }}
        />
      ))}
    </View>
  );
}

{isLoading ? <ListSkeleton /> : <ContentList items={items} />}
```

**PULL-TO-REFRESH:**
```typescript
<ScrollView
  refreshControl={
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      tintColor={theme.colors.primary}
      titleColor={theme.colors.onSurfaceVariant}
    />
  }
>
```

---

### Accessibility (WCAG 2.1 AA + iOS VoiceOver)

**COLOR CONTRAST:**
```
// Minimum ratios (WCAG 2.1 Level AA)
// - Text: 4.5:1 (3:1 for large text 18pt+)
// - UI elements: 3:1

// Palette compliance:
// ✅ Carbon Black 800 (#313135) on White (#ffffff): 12.5:1
// ✅ Platinum 600 (#5b5b71) on White: 4.8:1
// ✅ Carbon Black 950 (#111112) on Carbon Black 50 (#f2f2f3): 18.7:1
// ✅ Azure Blue 400 (#3c83f6) on Carbon Black 800 (#313135): 4.6:1
```

**ACCESSIBILITY LABELS:**
```typescript
// Icon-only buttons
<IconButton
  icon="plus"
  onPress={handleAdd}
  accessibilityLabel="Add item"
  accessibilityHint="Opens item selector"
/>

// Group related elements
<View 
  accessible={true}
  accessibilityLabel="Item title, descriptive detail"
>
  <Text variant="headingMedium">Item Title</Text>
  <Text variant="bodyMedium">Detail</Text>
</View>
```

---

### Performance (60fps Target)

**USE FLASHLIST FOR LONG LISTS:**
```typescript
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  estimatedItemSize={120}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

**MEMO EXPENSIVE COMPONENTS:**
```typescript
import { memo } from 'react';

export const ItemCard = memo(({ item }: { item: Item }) => {
  return <Card>{/* ... */}</Card>;
}, (prev, next) => prev.item.id === next.item.id);
```

---

### Code Generation Rules

When generating components, **ALWAYS**:

1. **Wrap screens in SafeAreaView**
2. **Use theme variables (never hardcode colors)**
3. **Apply minimum touch targets (44x44pt)**
4. **Use spacing constants (8pt grid)**
5. **Add accessibility labels to interactive elements**
6. **Provide haptic feedback on interactions**
7. **Use FlashList for lists with 50+ items**
8. **Support adaptive layouts with `useWindowDimensions`**

---

### Final Design Philosophy

**Checklist:**
- ✅ **Familiar, yet distinctive**: Uses HIG patterns with Neutral Carbon aesthetic
- ✅ **Content-first**: Content is the hero, not decorative UI
- ✅ **Fluid & responsive**: Animations feel organic (200-300ms easeOutCubic), not robotic
- ✅ **Accessible by default**: VoiceOver support, high contrast, 44pt touch targets
- ✅ **Gestural**: Long-press for context, swipe to delete, drag to reorder
- ✅ **Haptic-aware**: Subtle feedback for selections, confirmations, errors
- ✅ **Performant**: 60fps scrolling via FlashList, memoization

  <!-- **Think:** Notion + Things 3 + ClassPass + boutique studio branding
  **NOT:** Generic CRUD app, over-animated/playful UI, cluttered dashboards -->
