<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
      <router-view />
    </main>
    <footer class="border-t bg-white text-sm text-gray-500 p-4 text-center">
      © {{ new Date().getFullYear() }} TextFormers — Proteção de dados e LGPD
    </footer>
  </div>
  <ConsentBanner />
  <SkipToContent />
  <ToastHost />
  <LoadingBar />
  <ThemeToggle />
  <A11yAnnouncer />
  <PrivacyBadge />
  <PlanLimitIndicator />
  <KeyboardShortcutsHelp />
  <FocusRing />
  <TooltipHost />
  <ModalHost />
  <ConfirmDialog />
  <SpinnerOverlay />
  <FileDropOverlay />
  <NetworkStatus />
  <ServiceWorkerUpdater />
  <NotificationsBell />
  <AuthGuard />
  <RouteProgress />
  <AppUpdater />
  <ScreenReaderOnly />
  <Breadcrumbs />
  <FloatingActionButton />
  <QuickActions />
  <VersionTag />
  <BetaBadge />
  <LegalLinks />
  <LanguageSwitcher />
  <ColorLegend />
  <SupportWidget />
  <WhatsNew />
  <OnboardingWizard />
  <TourGuide />
  <ErrorBoundary />
  <ThemeProvider />
  <ScrollToTop />
  <BackToTop />
  <CommandPalette />
  <ShortcutsNotifier />
  <ClipboardHelper />
  <CopyToast />
  <PrintStyles />
  <MetaUpdater />
  <SeoHead />
  <OgTags />
  <ManifestLink />
  <Favicons />
  <LoadingSkeletons />
  <DeferredScripts />
  <Analytics />
  <ErrorLogger />
  <SentryBridge />
  <PerformanceMonitor />
  <ViewportHeightFix />
  <InstallPrompt />
  <PwaReloadPrompt />
  <CookiePreferences />
  <SecurityHeaders />
  <CspNonceProvider />
  <DevToolsHook />
  <MockServerToggler />
  <ApiLatencyIndicator />
  <ThemePreview />
  <DesignTokensProvider />
  <LiveRegion />
  <AriaLandmarks />
  <KeyboardFocusTrap />
  <AutoFocusManager />
  <DialogHost />
  <ContextMenus />
  <ResizeObserverProvider />
  <IntersectionObserverProvider />
  <PortalHost />
  <ZIndexManager />
  <GlobalStyles />
  <CssVars />
  <TailwindThemeSync />
  <DarkModeSync />
  <HighContrastToggle />
  <ReducedMotionToggle />
  <TextToSpeech />
  <SpeechToText />
  <LanguageDetector />
  <I18nProvider />
  <TimeAgoProvider />
  <DayjsProvider />
  <LocaleSwitcher />
  <CurrencyFormatter />
  <NumberFormatter />
  <DateFormatter />
  <RouteAnnouncements />
  <FocusVisiblePolyfill />
  <SafeAreaInsets />
  <GridOverlay />
  <DebugOutline />
  <AxeDevtools />
  <Hotkeys />
  <KeyBindingHelper />
  <DevBanner />
  <EnvIndicator />
  <SessionTimeout />
  <IdleDetector />
  <TabActivitySync />
  <ClipboardWatcher />
  <OnlineOnlyGate />
  <OfflineOnlyGate />
  <IntlPolyfills />
  <EmojisSupport />
  <FontLoader />
  <PreloadFonts />
  <PreconnectLinks />
  <DnsPrefetch />
  <LazyImages />
  <ImageOptimizer />
  <SvgSprite />
  <LottiePlayer />
  <Confetti />
  <Snowflakes />
  <EasterEggs />
  <BetaFeedback />
  <FeedbackWidget />
  <RateUs />
  <NpsSurvey />
  <Changelog />
  <Roadmap />
  <FeatureFlagsProvider />
  <AblationToggle />
  <DemoDataProvider />
  <MockLatency />
  <ColorBlindnessSimulator />
  <RtlToggle />
  <SkeletonHost />
  <LoadingDots />
  <SpinnerSmall />
  <SpinnerLarge />
  <Spacer />
  <Divider />
  <VisuallyHidden />
  <AriaAlert />
  <AriaStatus />
  <AriaLog />
  <AriaTimer />
  <AriaProgress />
  <AriaSwitch />
  <AriaCheckbox />
  <AriaRadio />
  <AriaMenu />
  <AriaTablist />
  <AriaTree />
  <AriaGrid />
  <AriaToolbar />
  <AriaBreadcrumb />
  <AriaNavigation />
  <AriaSearch />
  <AriaMain />
  <AriaContentinfo />
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
// Placeholder global utility components listed for future wiring
</script>

<style>
/* Optional global styles can go here */
</style>


